const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { Queue } = require('bullmq');   

let codeQueue = new Queue('code-queue', {
  connection: { host: "localhost",
     port: 6379 } // 
});

app.post('/api/submission', async (req, res) => {
  let { qId, code, language } = req.body;


  let Job = await codeQueue.add("code-queue", {
    qId,
    code,
    language
  });

  console.log(Job.id);

  res.json({
    message: "Your submission is in queue"
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
