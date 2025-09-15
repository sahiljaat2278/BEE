const { PrismaClient } = require('/generated/prisma');
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