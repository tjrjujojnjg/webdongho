window.onload=function(){
    const iconShopping= document.querySelector('.iconShopping');
    const cartBox = document.querySelector('.cartBox');
    const cartCloseBtn = document.querySelector('.fa-close');
    iconShopping.addEventListener('click',function(){
        cartBox.classList.add('active');
    });
    cartCloseBtn.addEventListener('click',function(){
        cartBox.classList.remove('active');
    });
}
//addtocard
const btn = document.getElementsByClassName('addToCart');
const products =[];
//  console.log(btn);
for(var i=0; i<btn.length ; i++){
    let cartBtn= btn[i];
    cartBtn.addEventListener('click',(event)=>{
        //console.log(event.target.parentElement.parentElement.children[1].children[2].textContent);
        var temp =event.target.parentElement.parentElement.children[1].children[1].textContent;
        temp=temp.replace('VNĐ','');
        temp = temp.replace(/,/g,'');
       // console.log(Number(temp));
        let product = {
            image : event.target.parentElement.parentElement.children[0].src,
            name : event.target.parentElement.parentElement.children[1].children[0].textContent,
            price : event.target.parentElement.parentElement.children[1].children[1].textContent,
            totalPrice : Number(temp),
            quantity:1,
        }
        addItemToLocal(product);
    });
}
function addItemToLocal(product){
    let cartItem =JSON.parse(localStorage.getItem('prdInCart'));
    if(cartItem === null){
        products.push(product);
        localStorage.setItem('prdInCart',JSON.stringify(products));
    }else{
        cartItem.forEach(item => {
            if(product.name === item.name){
                product.quantity = item.quantity +=1;
                product.totalPrice = item.totalPrice += product.totalPrice;
            }else{
                products.push(item);
            }
        });
        products.push(product); 
    }
    localStorage.setItem('prdInCart',JSON.stringify(products));
    //window.location.reload();
    //localStorage.clear();
}
function dispCartItem(){
    let html=`
                <table class="table table-hover cartlist">
                    <thead>
                        <tr>
                        <th scope="col" ">#</th>
                        <th scope="col">Img</th>
                        <th scope="col">Name</th>
                        <th scope="col">Price</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">ItemTotal</th>
                        <th scope="col">Delete</th> 
                        </tr>
                    </thead>
                    <tbody>`;
                    let cartItem =JSON.parse(localStorage.getItem('prdInCart'));
                    let stt=0;
                    cartItem.forEach(item =>{
                        stt++;
                        html +=`
                        <tr>
                        <th scope="row">${stt}</th>
                        <td class="img"><img src="${item.image}" ></td>
                        <td>${item.name}</td>
                        <td class="price">${item.price}</td>
                        <td >${item.quantity}</td>
                        <td class="price">${item.totalPrice.toLocaleString()} VNĐ</td>
                        <td><button type="button" class="btn btn-outline-danger removeItem">Delete</button></td>
                        </tr>
                        `
                    });
                    html+=`</tbody>
                    </table>`;
        document.querySelector('.displayCart').innerHTML=html;
}
dispCartItem();
const removeItem= document.getElementsByClassName('removeItem');
for(var i=0 ; i<removeItem.length ;i++){
    let removeBtn = removeItem[i];
    removeBtn.addEventListener('click',(event)=>{
        let cartItem =JSON.parse(localStorage.getItem('prdInCart'));
        let prName = event.target.parentElement.parentElement.children[2].textContent;
        cartItem.forEach(item =>{
            if( item.name != prName){
                products.push(item);
            }
        });
        localStorage.setItem('prdInCart',JSON.stringify(products));
        window.location.reload();
    });
}
function cartPrice(){
    let subTotal =0;
    let cartItem =JSON.parse(localStorage.getItem('prdInCart'));
    cartItem.map(item =>{
        subTotal = item.totalPrice += subTotal
    });
    document.querySelector('.priceView h6').textContent =`${subTotal.toLocaleString()} VNĐ`;
    document.querySelector('.money').textContent =`${subTotal.toLocaleString()}`;
}
cartPrice();