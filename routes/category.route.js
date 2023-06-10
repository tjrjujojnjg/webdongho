const express=require('express');
const router= express.Router();
const categoryModel = require('../models/category.model');
router.get('/list',async(req,res)=>{
    //throw new Error('Category Error'); //tao loi
    const list=await categoryModel.all();
    res.render('vwCategories/list',{
        categories:list,
        empty:list.length===0
    });
});
router.get('/add',(req,res)=>{
    res.render('vwCategories/add');
});
router.post('/add',async (req,res)=>{
    const entity={ //doi tuong
        CatName:req.body.txtCatName
    }
    const rs=await categoryModel.add(entity)
    res.render('vwCategories/add')
});
router.get('/edit',async (req,res)=>{
    const id=+req.query.id ||-1
    const rows=await categoryModel.single(id)
    if (rows.length===0) {
        res.send('Invalid paramaeter')
    }
    const category=rows[0]
    res.render('vwCategories/edit',{category})
})
router.post('/update',async(req,res)=>{
    await categoryModel.patch(req.body)
    res.redirect('/admin/categories/list')
})
router.get('/del',async(req,res)=>{
    const id=+req.query.id||-1
    await categoryModel.del(id)
    res.redirect('/admin/categories/list')
})
module.exports=router;