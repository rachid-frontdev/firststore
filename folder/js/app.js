/* Global console, var */
//document.querySelector('.cart-list')
let amount = document.querySelectorAll('.amount');
let closeBtn =  document.querySelector('#grey');
let price = document.querySelectorAll('.itemPrice'),
    total = document.getElementById('total');
let up = document.querySelectorAll('.fa-chevron-up');


let down = document.querySelector('.fa-chevron-down');
// ---------------------

          function here() {

          window.onload =  () => total.textContent = Number(price[0].textContent) + Number(price[1].textContent);

    for (let i =0; i < up.length ;i+= 1) {
        let item1 =  Number(price[i].textContent);

        up[i].onclick = () => {
            if (Number(amount[i].textContent) < 10) {
                amount[i].textContent = Number(amount[i].textContent) + 1;
                price[i].textContent = Number(price[i].textContent) + item1;

//    let totalArr = [];
//       totalArr.push(item1)
//    total.textContent =Number(total.textContent)  + Number(price[i].textContent)
//     console.log(totalArr)
// 322

total.textContent = Number(price[0].textContent) + Number(price[1].textContent);
            }
        }


    }

}
here()

          function runUpper(num) {
                      up.onclick = () => {
        if (parseInt(amount.textContent) < 10) {

    amount.textContent = Number(amount.textContent) + 1;
             price.textContent = Number(price.textContent) + num;

        }
 return total.textContent = price.textContent;
                     }

          }
//runUpper(item1);

   function runDown(num) {
           down.onclick = () => {
        if(Number(amount.textContent) > 1) {
        amount.textContent = Number(amount.textContent) - 1;
                           setTimeout(function() {
        price.textContent = Number(price.textContent) - num;

               }, 200)

        }
               setTimeout(function() {
                    return total.textContent = price.textContent;

               }, 700)

            }

   }
//runDown(item1);
  closeBtn.onclick = () => closeBtn.nextElementSibling.classList.toggle('hide')
