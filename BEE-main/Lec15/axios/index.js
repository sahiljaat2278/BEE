//function to get coments data
console.log(axios);

function getComentData(URL) {

    axios.get(URL).then((data) => {
        console.log(data);
    })
    .catch(err =>console.error(err));
  
}
getComentData('https://jsonplaceholder.typicode.com/comments')