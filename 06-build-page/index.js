const fs = require('fs');
const path = require('path');

//create bundle dirrectory
fs.mkdir(path.join(__dirname,'project-dist'),(err)=>{
  if(err) return;
});

//read main html file
const templateHTMLPath=path.join(__dirname,'template.html');
const readStream=fs.createReadStream(templateHTMLPath,'utf-8');
let htmlStr='';

readStream.on('data',function (chunk){
  htmlStr+=chunk.toString();    
});

readStream.on('end',()=>{
  //work with readed main html file
  const changeRegExp = new RegExp(/{{.+}}/,'gi');
  //find names of changes in main html file
  let changes = htmlStr.match(changeRegExp);
  for(let change of changes){
    //create readStream for target file
    let workStr='';
    const readStream = fs.createReadStream(path.join(__dirname,'components',`${change.slice(2,-2)}.html`),'utf-8');

    //read target file and write data to variable
    readStream.on('data',(chunk)=>{
      workStr+=chunk;
    });
    
    //replace targets with reader info
    readStream.on('end',()=>{
      htmlStr = htmlStr.replace(change,workStr);

      //if last change => create index.html with changes
      if(changes.indexOf(change)===changes.length-1)
      {
        const indexHTMLPath=path.join(__dirname,'project-dist','index.html');
        fs.writeFile(indexHTMLPath,htmlStr,(err)=>{
          if(err) throw err;
        });
      }
    });
  
}});

//work with css bundle

const {pipeline}=require('stream');

const stylesPath = path.join(__dirname,'styles');
const bunblePath = path.join(__dirname,'project-dist');

const bundleCSS=(stylesPath,bunblePath)=>{
//init bundle and write stream
  const writeStream=fs.createWriteStream(path.join(bunblePath,'style.css'));
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

//copy assets

const copyDirPath = path.join(__dirname,'assets');
const copiedDirPath = path.join(__dirname,'project-dist','assets');

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
      else if(file.isDirectory()){
        const newCopyPath = path.join(copyDirPath,file.name);
        const newCopiedPath=path.join(copiedDirPath,file.name);
        copyDir(newCopyPath,newCopiedPath);  
      }
    });  
  });
  
}