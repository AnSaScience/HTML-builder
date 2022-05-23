const fs = require('fs');
const path = require('path');

const folderPath=path.join(__dirname,'secret-folder');

fs.readdir(folderPath,
  { withFileTypes: true },
  (err,files)=>{
    if(err){
      throw err;
    }   
    files.forEach(x=>{
        
      if(x.isFile()){
        const extRegExp=new RegExp(/\..+/);
        const fileName=x.name.replace(extRegExp,'');
        const extName=x.name.match(extRegExp);
        let fileSize=fs.statSync(path.join(__dirname,'secret-folder',x.name.toString())).size/1000;
        console.log(`${fileName}-${extName.toString().slice(1)}-${fileSize}kb`);
      }
    });
  });

