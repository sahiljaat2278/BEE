const { sign } = require("jsonwebtoken");

let signupForm=document.querySelector("#signup-form");
let signupName=document.querySelector("#signup-name");
let signupEmail=document.querySelector("#signup-email");
let signupPassword=document.querySelector("#signup-password");

signupForm.addEventListener("submit",async function(e){
    e.preventDefault();
    let nameValue=signupName.value;
    let emailValue=signupEmail.value;
    let passwordValue=signupPassword.value;

    let res = await fetch("/users",{
        method:"POST",
        body:JSON.stringify({
            username:nameValue,
            email:emailValue,
            password:passwordValue
        }),
        headers:{"Content-Type":"application/json"}
    })

    let data = await res.json();
    console.log(data);
})