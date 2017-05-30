var crypto = require('crypto-js');
var msg = { "users": [
            { name: "Chris", id: "4437" },
            { name: "Bob", id: "2231" },
            { name: "Dave", id: "6677" }
          ]
        };
var key ='abc123';
var JSONmsg = JSON.stringify(msg);
  console.log(JSONmsg)
var encryptmsg = crypto.AES.encrypt(JSONmsg, key);
console.log('Encrypted: ' + encryptmsg);

var bytes = crypto.AES.decrypt(encryptmsg, key);
var JSONstring = bytes.toString(crypto.enc.Utf8);
msg = JSON.parse(JSONstring);
console.log(JSONstring);
console.log(" ");
console.log(msg);
console.log(typeof(msg));
//console.log('decrypted: ' + users[0].name + ' ' + users[0].id);
console.log(msg.users[0].name);
