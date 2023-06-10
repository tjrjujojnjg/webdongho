const categoryModel=require('../models/category.model');
module.exports = function(app){
    app.use(function(req,res,next){
        if(req.session.isAuthenticated === null){
            req.session.isAuthenticated = false;
        }
        res.locals.lcIsAuthenticated = req.session.isAuthenticated;
        res.locals.lcAuthUser = req.session.authUser;
        next();
    })
    
    app.use(async(req,res,next)=>{
        const rows=await categoryModel.allWithDetails()
        res.locals.lcCategories=rows //tao doi tuong lcCategories
        next()
    })
}