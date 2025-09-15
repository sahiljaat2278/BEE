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
// adduser("sahilthory@gmail.com", "sahil", "1234")
// .then(() => {
//     console.log("User added");
// })

function getallusers() {
    let allusers = prisma.user.findMany();
    return allusers;
}
getallusers().then((data) => {
    console.log(data);
})