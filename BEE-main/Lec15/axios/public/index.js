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



///function to add new blog
addBlog('http://localhost:3000/blog', 'My First Blog', 'This is the description of my first blog');
async function addBlog(URL, title,description) {
  try {
  
  let newBlog = {
    title: title,
    description: description
  }
 
    let response = await axios.post(URL, newBlog);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}