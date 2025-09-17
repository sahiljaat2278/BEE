const {PrismaClient} = require('./generated/prisma');
const prisma = new PrismaClient();
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

// addUser("sahil2@gmail.com","sahil2","12345")
// .then(()=>{console.log("User added");})

async function addTweet(content,userId){
    let newTweet = await prisma.tweet.create({
        data:{
            content:content,
            userId:userId
        }
    })
    return newTweet;

}

// addTweet("My first tweet",1)
// .then(()=>{
//     console.log("Tweet added");
// })

async function getUserTweet(userId){
    let tweets = await prisma.tweet.findMany({
        where:{
            userId:Number(userId)
        }
    })
    return tweets;
}

    // getUserTweet(1).then(tweets => {
    //     console.log(tweets);
    // });

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


async function deleteUser(userId){
   await prisma.user.delete({
      where:{
         id:Number(userId)
      }
   });
}
deleteUser(3)
.then(()=>{
   console.log("User deleted");
})

async function printAllUsers() {
    const users = await prisma.user.findMany();
    users.forEach(user => {
        console.log(`Name: ${user.name}, Email: ${user.email}`);
    });
}
// printAllUsers();