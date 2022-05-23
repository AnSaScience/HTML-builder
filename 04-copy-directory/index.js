const fs = require('fs');
const path = require('path');
const copyDirPath = path.join(__dirname,'files');
const copiedDirPath = path.join(__dirname,'files-copy');

copyDir(copyDirPath,copiedDirPath);

function copyDir(copyDirPath,copiedDirPath){
  //create folder if do not exist
  fs.mkdir(copiedDirPath,(err)=>{if(err){
    return;
  }
  });
  
  //copy files if do not exist
  fs.readdir(copyDirPath,{ withFileTypes: true },(err,files)=>{
    files.forEach(file=>{
      if(file.isFile()){
        let copyFilePath=path.join(copyDirPath,`${file.name}`);
        let copiedFilePath=path.join(copiedDirPath,`${file.name}`);
        fs.cp(copyFilePath,copiedFilePath,{force:false},(err)=>{
          if(err) throw err;
        });
      }
    });  
  });
  
}
