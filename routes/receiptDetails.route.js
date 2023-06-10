const express=require('express')
const router=express.Router()
const receiptDetailsModel=require('../models/receiptDetails.model')
router.get('/list',async(req,res)=>{
    const list=await receiptDetailsModel.all();
    res.render('vwReceiptDetails/list',{
         receiptDetails:list,
        empty:list.length===0
    });
});
router.get('/add',(req,res)=>{
    res.render('vwReceiptDetails/add');
});
router.post('/add',async (req,res)=>{
    const entity=[ //doi tuong
       // CatName:req.body.txtCatName
       ['001','AAA',15.9,1,15.9],
       ['002','BBB',15.5,2,31],
       ['003','CCC',15,3,45],
    ];
    const rs=await receiptDetailsModel.add([entity]);
    res.redirect('/receiptdetails/list')
});
module.exports=router