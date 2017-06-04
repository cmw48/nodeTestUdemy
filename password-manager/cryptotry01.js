var typeOf = require('typeof');
var storage = require('node-persist');
var crypto = require('crypto-js');

function loadArray() {
  var accounts = {};
  var accountArray= [];

  /*
  var writethis = { "norman":
                    [
                      { id: 1233, description: "gmail", username: "4qw437", password: "4sd37" },
                      { id: 1234, description: "Bob", username: "22rr31", password: "4qwdsd7" },
                      { id: 1235, description: "Dave", username: "66ew77", password: "sadasds" }
                    ]
                  };
  */

  var writethis = { "norman":
                     [
                       { "id": 1233, "description": "gmail", "username": "4qw437", "password": "4sd37" },
                       { "id": 1234, "description": "Bob", "username": "22rr31", "password": "4qwdsd7" },
                       { "id": 1235, "description": "Dave", "username": "66ew77", "password": "sadasds" }
                     ]
                   };
  var key = 'abc123';
  console.log(writethis);
  console.log('writethis is type ' + typeof(writethis));
    var JSONmsg = JSON.stringify(writethis);
     console.log(JSONmsg);
     console.log('JSONmsg is type ' + typeof(JSONmsg));
     console.log('   ');
     console.log('   ');
     console.log('about to encrypt');
     var louis = crypto.AES.encrypt(JSONmsg, key);
     console.log('encrypted');
     console.log('louis is type ' + typeof(louis));
     console.log(louis);


    //if you don't toString this, it fails
    var writeme = toString(louis);
    console.log('strung')
    console.log('writeme is type ' + typeof(writeme));
    console.log(writeme);


    storage.setItemSync('accounts1', writeme);
     console.log('Wrote data to storage.')
     var bytes = crypto.AES.decrypt(louis, key);
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
loadArray();
