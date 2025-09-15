const { PrismaClient } = require('./generated/prisma');
const prisma = new PrismaClient();
 async function adduser(email, name, password) {
    await prisma.user.create({
        data: {
            email: email,
            name: name,
            password: password
        }
    })

}
// adduser("sahilthory1@gmail.com", "sahil", "1234")
// .then(() => {
//     console.log("User added");
// })

async function getallusers() {
    let allusers = await prisma.user.findMany();
    return allusers;
}
getallusers().then((data) => {
    console.log(data);
})