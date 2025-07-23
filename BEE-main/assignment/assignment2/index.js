const fs = require('fs');
const title = process.argv[2];
const description = process.argv[3];
const todoItem = 'Title: '+ title + ' Description: '+ description + '\n';
fs.appendFile('todo.txt', todoItem, function(err) {
  if (err) {
    console.log(err);
  }
  console.log('Added');
});
