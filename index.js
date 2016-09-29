#!/usr/bin/env node
const system = require('fs');
const readline = require('readline-sync');
const args = process.argv.slice(2, 4);

class IO {
  static createDirectory(directoryName) {
    let filePath = `./${directoryName}`;
    if(!system.existsSync(filePath))
      system.mkdirSync(filePath);
    console.log("Directory created");
  }

  static createFile(directoryName, fileName, data) {
    let success = false;
    let filePath =`./${directoryName}/${fileName}`;
    if(!system.existsSync(filePath)) {
      system.writeFileSync(filePath);
      success = true;
    } else {
      console.log(`Couldn't write file at :${filePath}`);
      success = false;
    }
    return success;
  }
}


IO.buffer = null;
class Processor {
  static processArguments(command, directoryName) {
    console.log(command, directoryName);
    if(command === "init") {
      let packageStructure = {};
      let buffer = null;
      console.log("NW Initializer");
      packageStructure.name = readline.question("Name: " );
      packageStructure.description = readline.question("Description: ");
      packageStructure.version = readline.question("Version: ");
      buffer = readline.question("Window Title: ");
      packageStructure.window = {
        title: buffer
      };
      initializeDirectory(directoryName,'index',packageStructure);
    }
  }
}

function initializeDirectory(directoryName, entryPointFile, packageStructure) {
  IO.createDirectory(directoryName);
  IO.createFile(directoryName, `${entryPointFile}.html`);
  IO.createFile(directoryName, "package.json", packageStructure);
}

Processor.processArguments(args[0], args[1]); 

