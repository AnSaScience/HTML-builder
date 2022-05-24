const fs = require('fs');
const fsPromises = require('fs/promises');
const path = require('path');
const copyDirPath = path.join(__dirname,'files');
const copiedDirPath = path.join(__dirname,'files-copy');

copyDir(copyDirPath,copiedDirPath);

function copyDir(copyDirPath,copiedDirPath){
  //create folder if do not exist
  fs.mkdir(copiedDirPath,(err)=>{if(err){
    return;
  }
  // fsPromises.mkdir(copiedDirPath,{recursive:true});
  });
  
  //copy files if do not exist
  fs.readdir(copyDirPath,{ withFileTypes: true },(err,files)=>{
    //create array of file names:
    const copyFileNames=files.map(file=>{
      return file.name;
    })
    console.log(copyFileNames);

    //find out if the folder is empty
    fs.readdir(copiedDirPath,{ withFileTypes: true },(err,data)=>{
      if(data.length){
        data.forEach(item=>{
          if(!copyFileNames.includes(item.name)){
            fs.rm(path.join(copiedDirPath,item.name),(err)=>{
              if(err) throw err;
            });
          }
        });
      }
    });

    files.forEach(file=>{
      if(file.isFile()){
        let copyFilePath=path.join(copyDirPath,`${file.name}`);
        let copiedFilePath=path.join(copiedDirPath,`${file.name}`);
        fs.cp(copyFilePath,copiedFilePath,{force:true},(err)=>{
          // if(err) throw err;
        });
      }
    });  
  });
  
}
