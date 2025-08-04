//fetch mai 2 baar .then lagta hai

function getUserData(URL) {
   fetch(URL)
    .then((res) => {
        console.log(res);
        return res.json()
    })
    .then((data) => {
        const ul = document.createElement('ul');
         data.forEach(user => {
            const li = document.createElement('li');
            li.textContent = user.name;
            ul.appendChild(li);
        });
        document.body.appendChild(ul);
    })
    .catch((err) => {
        console.error(err);
    })
}
getUserData('https://jsonplaceholder.typicode.com/users');