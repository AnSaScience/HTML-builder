const {stdin,stdout} = process;
const fs = require('fs');
const path = require('path');
const readLine = require('readline');
const filePath = path.join(__dirname,'newFile.txt');

const writeStream=fs.createWriteStream(filePath);

const rl=readLine.createInterface({
    input:stdin,
    output:stdout,
})

stdout.write('Enter some text:\n');

rl.on('line',(input)=>{
  if(input.toString().includes('exit')){
    console.log('The End!');
  process.exit();
}
  writeStream.write(input)
})

rl.on('SIGINT',()=>{
  process.emit('SIGINT');
})

process.on('SIGINT',()=>{
stdout.write("The End!")   
process.exit();
})
