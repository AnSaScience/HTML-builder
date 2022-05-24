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
        let fileSize;
        fs.stat(path.join(__dirname,'secret-folder',x.name.toString()),(err,stats)=>{
          if(err) {return;}
          fileSize=stats.size;
          console.log(`${fileName}-${extName.toString().slice(1)}-${fileSize}kb`);
        });        
      }
    });
  });

