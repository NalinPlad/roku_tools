// Roku command execution using api endpoints
//
// Type > press {button}
// as a shortcut to press a button
const keypress = require('keypress');
const prompt = require('prompt-sync')({ sigint: true });
const { spawn } = require('node:child_process');

const ip = process.argv.slice(2)[0];

function ValidateIPaddress(ipaddress) {  
  if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddress)) {  
    return (true)  
  }  
  return (false)  
}  

if(!ValidateIPaddress(ip)){
  console.error('Invalid IP address');
  process.exit(1);
}

console.log('IP: ' + ip);

// Arrow keys
keypress(process.stdin);


while (true){
    command = prompt("Roku@"+ip+"> ");

    if(command.startsWith('press')){
    command = 'keypress/' + command.split(' ')[1]
    }

    const curl = spawn('curl', ['-d', '', "http://"+ip+":8060/"+command]);
    
    curl.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
    });

    curl.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
    });
}
