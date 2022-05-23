const fs = require('fs');
const path = require('path');

const readableStream = fs.createReadStream(path.join(__dirname, 'text.txt'), err=>{
  if(err){
    throw err;
  }
},'utf-8');
readableStream.on('data', data => console.log(data.toString()));
  