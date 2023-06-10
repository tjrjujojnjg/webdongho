const exphbs  = require('express-handlebars');
const hbs_sections = require('express-handlebars-sections');
const numeral=require('numeral')// de chinh so tien co dau phay
module.exports=function(app){
    app.engine('hbs', exphbs.engine({
        defaultLayout:'main.hbs',//doi ten duoi, mac dinh trang main chay chinh
        layoutsDir:'views/_layouts',//doi duong dan
        partialsDir:'views/_partials',
        extname:'.hbs',//doi ten duoi cho doan code nho
        helpers:{
            section: hbs_sections(),
            format_number:(value)=>{
                return numeral(value).format('0,0')+' VNĐ'
            }
        }
    }));
    app.set('view engine', 'hbs');    
}