const express=require('express');
const router= express.Router();
const productModel = require('../models/product.model');
const config=require('../config/default.json')
router.get('/byCat/:catId',async(req,res)=>{
    for(const c of res.locals.lcCategories){
        if(c.CatID===+req.params.catId){
            c.isActive=true;
        }
    }
    const page=+req.query.page||1
    if (page<0) page=1
    const offset=(page-1)*config.pagination.limit
    const list=await productModel.pageByCat(req.params.catId,config.pagination.limit,offset)
    const total=await productModel.countByCat(req.params.catId)
    const nPages=Math.ceil(total/config.pagination.limit)
    const page_items=[]
    for (let i = 1; i <= nPages; i++) {
        const item = {
            value:i,
            isActive: i===page //tra ve gia tri true false
        };
        page_items.push(item)
    }
    res.render('vwProducts/byCat',{
        products:list,
        empty:list.length===0,
        page_items,
        prev_value:page-1,
        next_value:page+1,
        can_go_prev:page>1,
        can_go_next:page<nPages
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


//detail
router.get('/detail/:proid',async(req,res)=>{
    res.render('vwProducts/detail',{layout:false})
})
router.get('/getdetail/:proid',async(req,res)=>{
    const row = await productModel.single(req.params.proid)
    res.send(row[0]);
})


router.get('/listKL1/:proid',async(req,res)=>{
    const row = await productModel.singleKl1(req.params.proid)
    res.send(row);
})

router.get('/listCl1/:proid',async(req,res)=>{
    const row = await productModel.singleCL1(req.params.proid)
    res.send(row);
})

router.get('/listKL2/:proid',async(req,res)=>{
    const row = await productModel.singleKl2(req.params.proid)
    res.send(row);
})

router.get('/listCl2/:proid',async(req,res)=>{
    const row = await productModel.singleCL2(req.params.proid)
    res.send(row);
})

router.get('/listKL3/:proid',async(req,res)=>{
    const row = await productModel.singleKl3(req.params.proid)
    res.send(row);
})

router.get('/listCl3/:proid',async(req,res)=>{
    const row = await productModel.singleCL3(req.params.proid)
    res.send(row);
})

router.get('/listKL4/:proid',async(req,res)=>{
    const row = await productModel.singleKl1(req.params.proid)
    res.send(row);
})

router.get('/listCl4/:proid',async(req,res)=>{
    const row = await productModel.singleCL4(req.params.proid)
    res.send(row);
})
router.get('/listKL5/:proid',async(req,res)=>{
    const row = await productModel.singleKl5(req.params.proid)
    res.send(row);
})

router.get('/listCl5/:proid',async(req,res)=>{
    const row = await productModel.singleCL5(req.params.proid)
    res.send(row);
})
router.get('/listKL6/:proid',async(req,res)=>{
    const row = await productModel.singleKl6(req.params.proid)
    res.send(row);
})

router.get('/listCl6/:proid',async(req,res)=>{
    const row = await productModel.singleCL6(req.params.proid)
    res.send(row);
})
router.get('/listKL7/:proid',async(req,res)=>{
    const row = await productModel.singleKl7(req.params.proid)
    res.send(row);
})

router.get('/listCl7/:proid',async(req,res)=>{
    const row = await productModel.singleCL7(req.params.proid)
    res.send(row);
})
router.get('/listKL8/:proid',async(req,res)=>{
    const row = await productModel.singleKl8(req.params.proid)
    res.send(row);
})

router.get('/listCl8/:proid',async(req,res)=>{
    const row = await productModel.singleCL8(req.params.proid)
    res.send(row);
})
router.get('/listKL9/:proid',async(req,res)=>{
    const row = await productModel.singleKl9(req.params.proid)
    res.send(row);
})

router.get('/listCl9/:proid',async(req,res)=>{
    const row = await productModel.singleCL9(req.params.proid)
    res.send(row);
})
router.get('/listKL10/:proid',async(req,res)=>{
    const row = await productModel.singleKl10(req.params.proid)
    res.send(row);
})

router.get('/listCl10/:proid',async(req,res)=>{
    const row = await productModel.singleCL10(req.params.proid)
    res.send(row);
})


module.exports=router;