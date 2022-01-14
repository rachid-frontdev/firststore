const amountInput = document.querySelectorAll('.amount');
const wrong = document.querySelectorAll('.wrong');
for(let i=0;i<amountInput.length;i+=1){
  const numberIt = parseInt(amountInput[i].value);
amountInput[i].onblur =  function() {
  if(amountInput[i].value === '') {
  wrong[i].innerHTML = 'incorrect format';
  return amountInput[i].focus();
}else if(parseInt(amountInput[i].value) <= 0){
  wrong[i].innerHTML = 'amount should bigger than 0';
  return amountInput[i].focus();
} else {
    wrong[i].innerHTML = '';
}
}
// amountInput[i].onfocus =  function() {
//   if(amountInput[i].value === '') {
//     return wrong[i].style.display = 'none';
//   } else return wrong[i].style.display = '';
// }
}
