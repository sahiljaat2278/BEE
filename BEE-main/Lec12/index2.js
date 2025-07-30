//1. create a new element using createElement
//2. insert require data into the element using innerHTML or innerText
//3. insert new element in parent conatiner using appendChild or append

let todo = {
    id: 234234,
    title: 'study at 9pm',
}
let todos = [{
    id: 234234,
    title: 'study at 9pm',
},{
    id: 234235,
    title: 'play at 10pm',
}]

let todoContainer = document.querySelector('.todocontainer');
function addTodo(todo){
    let li = document.createElement('li');
    li.innerHTML = `   <div>
                <input type="checkbox" name="" id="">
                <h1>${todo.title}</h1>
                <div>
                    <button>❌</button>
                    <button>✎</button>
                </div>
            </div>`
    todoContainer.appendChild(li);
}
function showAllTodos(todos){
    todos.forEach(todo => {
        addTodo(todo);
    });
}
showAllTodos(todos);