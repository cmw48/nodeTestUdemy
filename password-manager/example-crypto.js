var typeOf = require('typeof');
var storage = require('node-persist');
var crypto = require('crypto-js');

function encryptme() {
var msg01 = { "users": [
            { name: "Chris", id: "4437" },
            { name: "Bob", id: "2231" },
            { name: "Dave", id: "6677" }
          ]
        };
//var mersg = "\{ \"id\": 1 , \"description\": \"gmail\" , \"username\": \"mectapus\" , \"password\": \"blargh\" \}"

var msg02 = '{ \"accounts\":  \[ \{ \"id\": 1 , \"description\": \"gmail\" , \"username\": \"mectapus\" , \"password\": \"blargh\" \} \] \} '
var msg03 = { "accounts":
                 [
                   { "id": 1 ,
                     "description": "gmail" ,
                     "username": "mectapus" ,
                     "password": "blargh"
                   }
                 ]
               }

var writethis = { "norman":
                   [
                      { "id": 1233, "description": "gmail", "username": "4qw437", "password": "4sd37" },
                      { "id": 1234, "description": "Bob", "username": "22rr31", "password": "4qwdsd7" },
                      { "id": 1235, "description": "Dave", "username": "66ew77", "password": "sadasds" }
                   ]
                };

var masterkey ='abc123';
  console.log(writethis);
  console.log('writethis is type ' + typeof(writethis));
var JSONmsg = (JSON.stringify(writethis));
console.log(JSONmsg);
console.log('JSONmsg is type ' + typeof(JSONmsg));
var encryptmsg = crypto.AES.encrypt(JSONmsg, 'abc123');

//uncomment this line to see how the sausage is stuffed
//console.log(encryptmsg);


console.log('encryptmsg is type ' + typeof(encryptmsg));
var nerp = ('' + encryptmsg);
//var writeme = encryptmsg;
//var writeme = toString(encryptmsg);
console.log('not strung');
//console.log('writeme is type ' + typeof(writeme));
storage.setItemSync('accounts1', nerp);


var dataFromFile = storage.getItemSync('accounts1');
console.log('definitely got this from the file');

var bytes = crypto.AES.decrypt(dataFromFile, 'abc123');
var JSONstring = bytes.toString(crypto.enc.Utf8);
msg = JSON.parse(JSONstring);
console.log(JSONstring);
console.log(" ");
console.log(msg);
console.log(typeof(msg));
//console.log('decrypted: ' + users[0].name + ' ' + users[0].id);
console.log(msg.norman[0].username);
}


// initialize disk storage before accssing
function initStorage() {
  storage.initSync();
}

initStorage();
encryptme();
