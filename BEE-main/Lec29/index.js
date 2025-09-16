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

// addUser("vansh@gmail.com","vansh","12345")
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

    getUserTweet(1).then(tweets => {
        console.log(tweets);
    });

//user who's id is 1 wants to update his tweet-->tweet id is 1

function updateTweet(tweetid,userId,updatecontent){
    
}