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
let data3 = ul.innerText;
let data4 = ul.textContent;
console.log(data3);
console.log(data4);

ul.innerHTML = `<li class = "item">Item 5</li>
                <li class = "item">Item 6</li>
                 <li class = "item">Item 7</li>`;
     

/*
getAttribute
setAttribute
classList
*/
let ele5=document.querySelector(".item");
console.dir(ele5);
console.dir(ele5.getAttribute("id"));
console.dir(ele5.getAttribute("class"));
ele5.setAttribute("id","js");
console.log(ele5.getAttribute("id"));
ele5.classList.add("delete")
console.log(ele5.classList.contains("delete"));
ele5.classList.remove("item");
console.log(ele5.classList);

/*
Element.addEventListener("event name", function(){
})
*/
let signup = document.querySelector(".signup");
let form = document.querySelector("Signup");
signup.addEventListener("click", function(event) {
    form.classList.toggle("hide");

    
    // You can add code here to send this data to the server if needed
});


