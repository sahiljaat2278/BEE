import { createClient } from "redis";

const client = createClient();

client.connect();
client.on("error",function(err){
    console.log(err);
});
async function cacheUserProfile(){
    await client.set("User:1",JSON.stringify({ name: "Sahil", age: 21 }) );
}
async function readProfile(){
   let data= await client.get("User:1");
   return data;
}
