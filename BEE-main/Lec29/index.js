const {PrismaClient} = require('./generated/prisma');
const prisma = new PrismaClient();

//Add User
async function addUser(email,name,password){
   let newUser = await prisma.user.create({
    data:{
       email:email,
       name:name,
       password:password
    }

  })
  return newUser;
}

// addUser("sahil@gmail.com","sahil","12345")
// .then(()=>{console.log("User added");})

//Add Tweet
async function addTweet(content,userId){
    let newTweet = await prisma.tweet.create({
        data:{
            content:content,
            userId:userId
        }
    })
    return newTweet;

}

// addTweet("My first tweet",3)
// .then(()=>{
//     console.log("Tweet added");
// })

//Get User Tweet
async function getUserTweet(userId){
    let tweets = await prisma.tweet.findMany({
        where:{
            userId:Number(userId)
        }
    })
    return tweets;
}

   //  getUserTweet(1).then(tweets => {
   //      console.log(tweets);
   //  });

//Update Tweet
async function updateTweet(tweetId,userId,updatedContent){
   let tweet = await prisma.tweet.findUnique({
      where: {
         id: Number(tweetId)
      }
   });
   if(!tweet){
      return "Tweet not found";
   }
   if(tweet.userId != Number(userId)){
      return "user can not update";
   }
   await prisma.tweet.update({
      where:{
         id:Number(tweetId)
      },
      data:{ 
         content:updatedContent
      }
   });
}
// updateTweet("1","1","Updated tweet content")
// .then(()=>{
//    console.log("Tweet updated");
// });


//Delete User
async function deleteUser(userId){
   await prisma.user.delete({
      where:{
         id:Number(userId)
      }
   });
}

// deleteUser(1)
// .then(()=>{
//    console.log("User deleted");
// })



   async function printAllUserEmailName() {
      const users = await prisma.user.findMany({
         select: {
            email: true,
            name: true
         }
      });
      users.forEach(user => {
         console.log(`Email: ${user.email}, Name: ${user.name}`);
      });
   }

   printAllUserEmailName();