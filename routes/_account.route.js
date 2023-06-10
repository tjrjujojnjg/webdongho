const express=require('express');
const router= express.Router();
const moment=require('moment');
var bcrypt = require('bcryptjs');//ma hoa mat khau
const userModel = require('../models/user.model');
const config=require('../config/default.json');
router.get('/login',async(req,res)=>{
    res.render('vwAccount/login',{layout:false})
});
router.post('/login',async function(req,res){
    const user = await userModel.singleByUserName(req.body.username);
    if(user === null){
        return res.render('vwAccount/login',{
            layout : false,
            err: 'Invalid username or password.'
        });
    }
    const rs =bcrypt.compareSync(req.body.password,user.password_hash);
    if(rs === false){
        return res.render('vwAccount/login',{
            layout : false,
            err: 'Invalid username or password.'
        });
    }
    if(user.permission===1){
        //delete user.password_hash;
        req.session.isAuthenticated = true;
        req.session.authUser = user;
        res.redirect('/admin/categories/list')
    }
    else if(user.permission===2){
        //delete user.password_hash;
        req.session.isAuthenticated = true;
        req.session.authUser = user;
        res.redirect('/admin/products/list')
    }
    else{
        //delete user.password_hash;   
        req.session.isAuthenticated = true;
        req.session.authUser = user;
        res.redirect('/account/profile');
    }
});
router.get('/logout',async function(req,res){
    req.session.isAuthenticated=false;
    req.session.authUser = null;
    res.redirect('/account/login');
})
router.get('/register',async(req,res)=>{
    res.render('vwAccount/register')
})
router.post('/register', async(req,res)=>{
    const dob=moment(req.body.dob,'DD/MM/YYYY').format('YYYY-MM-DD')
    const password_hash= bcrypt.hashSync(req.body.password,config.authentication.saltRounds)
    const entity={
        username:req.body.username,
        name:req.body.name,
        email:req.body.email,
        dob,
        permission:0,
        password_hash
    }
    await userModel.add(entity)
    res.render('vwAccount/register')
});
const restrict=require('../middlewares/auth.mdw');
const res = require('express/lib/response');
router.get('/profile',restrict,async(req,res)=>{
   // console.log(req.session.authUser);
    res.render('vwAccount/profile')
})
module.exports=router