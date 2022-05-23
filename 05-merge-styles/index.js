const fs = require('fs');
const path = require('path');
const {pipeline}=require('stream');

const stylesPath = path.join(__dirname,'styles');
const bunblePath = path.join(__dirname,'project-dist');

const bundleCSS=(stylesPath,bunblePath)=>{
//init bundle and write stream
  const writeStream=fs.createWriteStream(path.join(bunblePath,'bundle.css'));
  //find all css files
  fs.readdir(stylesPath, { withFileTypes: true },(err,files)=>{
    if(err){
      throw err;
    }
    files.forEach(file=>{
      if(file.name.toString().includes('.css')){
        const readStream=fs.createReadStream(path.join(stylesPath,file.name.toString()));
        pipeline(readStream,writeStream,err=>{
          if(err){
            throw err;
          }
        });
      }
    });
  });
};

bundleCSS(stylesPath,bunblePath);