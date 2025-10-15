const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const {Queue} = require('bullmq');
const { Worker } = require('bullmq');

let codeQueue = new Queue('code-queue',{
    connection:{
        host:'localhost',
        port:6379,
    }
});
    

app.post("/api/submission", async function (req, res) {
    let {qId, code, language} = req.body;
    let job = await codeQueue.add('submission', { qId, code, language });
    console.log(job.id);
    

    //offload the job to message queue, so that a worker can do the task
    res.json({
        submissionId: job.id
    });
});

let worker = new Worker('code-queue',function(job){
    let {qId, code, language} = job.data;
    return {
        qId:qId,
        status:"success",
        time: "4ms",
        beat: "top 10%"
    };

},{
    connection: {
        host: 'localhost',
        port: 6379,
    }
});

worker.on('error', err => {
    console.error(err)
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});