function updateMenu(){
    let html=`
                <table class="table table-hover cartlist">
                    <thead>
                        <tr>
                        <th scope="col" ">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Price</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">ItemTotal</th>
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
                        <td>${item.name}</td>
                        <td class="price">${item.price}</td>
                        <td >${item.quantity}</td>
                        <td class="price">${item.totalPrice.toLocaleString()} VNĐ</td>
                        </tr>
                        `
                    });
                    html+=`
                        <tr>
                            <th scope="row" class="text-end">Total:</th>
                            <td colspan="4" class="TotalDetail"></td>
                        </tr>
                    </tbody>
                    </table>`;
  document.querySelector('.invoiceDetail').innerHTML=html;
}
updateMenu();
function cartPrice(){
    let subTotal =0;
    let cartItem =JSON.parse(localStorage.getItem('prdInCart'));
    cartItem.map(item =>{
        subTotal = item.totalPrice += subTotal
    });
    document.querySelector('.TotalDetail').textContent =`${subTotal.toLocaleString()} VNĐ`;
}
cartPrice();