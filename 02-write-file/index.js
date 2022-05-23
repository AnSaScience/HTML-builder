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

rl.on('SIGINT',()=>{
    process.emit('SIGINT');
})

stdin.on('data', (chunk)=>{
  if(chunk.toString().includes('exit')){
      console.log('The End!');
    process.exit();
  }
  writeStream.write(chunk);
});
stdout.write('Enter some text:\n');

process.on('SIGINT',()=>{
stdout.write("The End!")   
process.exit();
})






// if (process.platform === "win32") {
//     var rl = require("readline").createInterface({
//       input: process.stdin,
//       output: process.stdout
//     });
  
//     rl.on("SIGINT", function () {
//       process.emit("SIGINT");
//     });
//   }
  
//   process.on("SIGINT", function () {
//     //graceful shutdown
//     console.log("hey2")
//     process.exit();
//   });







// const rl=readLine.createInterface({
//     input:stdin,
//     output:stdout,
// });


// stdin.on('data',(chunk)=>{
//   if(chunk.toString().includes('exit')){
//     process.exit();
//   }
//   writeStream.write(chunk);
// });
// stdout.write('Enter some text:\n');

// process.on('exit', () => {
//   stdout.write('Good luck!');
// });

// if (process.platform === "win32") {
//     stdout.write(process.platform)
//   var rl = require("readline").createInterface({
//     input: process.stdin,
//     output: process.stdout
//   });

//   rl.on("SIGINT", function () {
//     process.emit("SIGINT");
//   });
// }


// rl.question('Enter some text',()=>{
//     rl.on('line',(input)=>{
//         if(input=='exit'){
//             rl.close();
//         }
//         else{
//             writeStream.write(input);
//         }
//     })
//     rl.on('close',()=>{
//         stdout.write('Pa pa')
//     })
// })