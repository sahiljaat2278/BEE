///fetch and axios
function getUserData() {
  // Using fetch
  fetch(URL)
    .then((res) => {
        console.log(res);
        return res.json();

    })
    .then((data) => {
        console.log(data);
    })
    .catch((err) => {
        console.error(err);
    });
}
getUserData('https://jsonplaceholder.typicode.com/users');