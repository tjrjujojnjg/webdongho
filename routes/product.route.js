const express=require('express');
const router= express.Router();
const productModel = require('../models/product.model');
router.get('/list',async(req,res)=>{
    const list=await productModel.all();
    res.render('vwProducts/list',{
        products:list,
        empty:list.length===0
    });
});
router.get('/add',(req,res)=>{
    res.render('vwProducts/add')
})
router.post('/add',async(req,res)=>{
    const entity={
        ProName:req.body.txtProName,
        Year:req.body.txtYear,
        FullDes:req.body.txtFullDes,
        Price:req.body.txtPrice,
        CatID:req.body.CatID,
        Quantity:req.body.txtQuantity,
        Img:req.body.txtImg
    }
    const rs=await productModel.add(entity)
    res.render('vwProducts/add')
})
router.get('/edit',async(req,res)=>{
    const id=+req.query.id||-1
    const rows=await productModel.single(id)
    if (rows.length===0) {
        res.send('Invalid paramaeter')
    }
    const product=rows[0]
    res.render('vwProducts/edit',{product})
})
router.post('/update',async(req,res)=>{
    await productModel.patch(req.body)
    res.redirect('/admin/products/list')
})

router.get('/del',async(req,res)=>{
    const id=+req.query.id||-1
    await productModel.del(id)
    res.redirect('/admin/products/list')
})
module.exports=router;