const express = require('express');


require('express-async-errors');//neu trang category bi loi thi trang product ko bi anh huong
//de nhet nhung doan code vao nhung vi tri tuy thich


const app = express();

app.use(express.urlencoded({ //de co body su dung cho post
    extended:true,
}));


app.use('/public',express.static('public'));
require('./middlewares/session.mdw')(app);
require('./middlewares/view.mdw')(app);
require('./middlewares/locals.mdw')(app);

app.get('/', function (req, res) {
    res.render('home');
});

app.get('/about',(req,res)=>{
    res.render('about')
})
app.get('/services',(req,res)=>{
    res.render('services')
})
app.get('/portfolio',(req,res)=>{
    res.render('portfolio')
})
app.get('/ourteam',(req,res)=>{
    res.render('ourteam')
})
app.get('/contact',(req,res)=>{
    res.render('contact')
})
app.get('/err',(req,res)=>{
    throw new Error('beng beng')
})
//trang admin
app.use('/admin/categories',require('./routes/category.route'));
app.use('/admin/products',require('./routes/product.route'));
//trang user
//tai khoan ng dung
app.use('/account',require('./routes/_account.route'))

//ng dung xem san pham
app.use('/products',require('./routes/_product.route'))

//chi tiet hoa don
app.use('/receiptdetails',require('./routes/receiptDetails.route'))

app.use((req,res)=>{//sự cố đường dẫn
    res.render('404',{layout:false}); //trang khác, 0 chui vô trang chính
});
app.use((err, req, res, next) => {//đúng đường dẫn, lỗi kết nối hoặc hư ổ đĩa
    console.error(err.stack);
    res.status(500).render('500',{layout:false});
});
const PORT=1080
    app.listen(PORT,()=>{
        console.log(`Server is runing at http://localhost:${PORT}`);
    });