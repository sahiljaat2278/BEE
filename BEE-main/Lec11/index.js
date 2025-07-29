//Client side javascript
///accessing the DOM element
//1.using id
//2.using class
//3.using tag name
//4.using query selector
// let el1= document.getElementById('heading');
// console.log(el1[0]);
// let el2= document.getElementsByClassName('item');
// console.log(el2[0]);
// let el3= document.getElementsByTagName('p');
// console.log(el3[0]);
let el4= document.querySelector("p");//. for class, # for id
console.log(el4);
let el5= document.querySelectorAll(".item");
console.log(el5);
let el6= document.querySelectorAll(".item");
console.log(el6);
let ul = document.querySelector("#container");

//properties of DOM element
/*
1. innerHTML
2. innerText
3. textContent
*/
let data = el4.innerText;
console.log(data);
el4.innerText = "Hello World";
let data2 = ul.innerHTML;
console.log(data2);


