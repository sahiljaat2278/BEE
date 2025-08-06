//function to get coments data
console.log(axios);

async function getComentData(URL) {

    // axios.get(URL).then((data) => {
    //     console.log(data);
    // })
    // .catch(err =>console.error(err));
  try{
    let coments = await axios.get(URL);
    console.log(coments);
  }
  catch(err){
    console.error(err);
  } 
}
getComentData('https://jsonplaceholder.typicode.com/comments')