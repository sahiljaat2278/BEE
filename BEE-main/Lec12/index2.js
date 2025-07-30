//1. create a new element using createElement
//2. insert require data into the element using innerHTML or innerText
//3. insert new element in parent conatiner using appendChild or append

let todo ={
    id: 234234,
    title: "Study at 9pm",
}

let todoContainer = document.querySelector('.todocontainer');
function addTodo(todo){
    let li = document.createElement('li');
    li.innerHTML = `   <div>
                <input type="checkbox" name="" id="">
                <h1>Todo 1</h1>
                <div>
                    <button>❌</button>
                    <button>✏️</button>
                </div>
            </div>`
    todoContainer.appendChild(li);
}