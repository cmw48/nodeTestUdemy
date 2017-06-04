/**
udemy test file v2
Chris Westling
June 2017
**/

// define global variables

var typeOf = require('typeof');
var storage = require('node-persist');
var crypto = require('crypto-js');
var foundAccount = []

var util = require('util');



// define command line arguments

var argv = require('yargs')
    .command('add', 'adding accounts', function(yargs) {
        yargs.options({
           description: {
              demand: true,
              alias: 'd',
              description: 'Which account is this?.'
           },
           username: {
              demand: true,
              alias: 'u',
              description: 'Type the user name for the account.'
           },
           master: {
              demand: false,
              alias: 'm',
              description: 'Type the master key for the account.'
           },
           password: {
              demand: true,
              alias: 'p',
              description: 'Please enter your password.'
           }
        })
    })
    .command('search', 'search for an account', function(yargs) {
       yargs.options({
         description: {
            demand: true,
            alias: 'd',
            description: 'Which account is this?.'
        }
      })
    })
    .command('load', 'load test data into array', function(yargs) {
       yargs.options({

       })
    })
    .command('print', 'print all array data to console', function(yargs) {
       yargs.options({

       })
    })
    .command('clear', 'CLEAR ALL ACCOUNTS', function(yargs) {
       yargs.options({

       })
    })
    .help('help')
    .argv;

var command = (argv._[0]);

// uncomment to see raw args
//console.log(argv);




// creates a new password record
function createNewAccount(idno, desc, usr, passw){
  var allAccounts = {};
  var existingAccounts = {};
  var newaccount = {};
  var accountArray = [];
  newaccount.id = idno;
  newaccount.description = desc;
  newaccount.username = usr;
  newaccount.password = passw;
  var existingAccounts = readAccounts(key);
  //console.log(typeOf(allAccounts) + ' -accounttype');
  console.log(existingAccounts);
  if (typeOf(existingAccounts)==='undefined') {
    accountArray = [];
    accountArray.push(newaccount);

  } else {
    // add find account already in vault
  }
  accountArray = existingAccounts;
  accountArray.push(newaccount);
  console.log('Adding new account...');

  return accountArray;
}


// go get all the accounts from disk storage

function readAccounts(key) {
    console.log('Reading data from storage...');
    var dataFromFile = storage.getItemSync('accounts1');
    console.log('heres the data: ' + dataFromFile);
    //console.log(typeOf(dataFromFile));
    if ((typeOf(dataFromFile)==='undefined') || (dataFromFile === '')) {
      console.log('Accounts array is empty. Use add command to add a new account.');
      dataFromFile = undefined;
    } else {
    console.log(typeOf(dataFromFile))
     // accounts = datafromFile;

      //var bytes = crypto.AES.decrypt(dataFromFile, key);
      //accounts = JSON.parse(bytes.toString(crypto.enc.Utf8));
      //console.log('decrypted. ' + accounts);
      console.log(dataFromFile);
    }

    return dataFromFile;
}

function findAccount (accountDesc) {
  console.log('findAccount not yet implemented.');
}


function searchAccounts(finddesc)  {
   var matches = 0;
   var accounts = readAccounts(key);
   if (typeOf(accounts) === 'undefined') {
      console.log('There are no accounts in the vault.');
      matches = 0;
   } else {
       var numberOfAccounts = accounts.length;
       var tempaccount = [];
       var count = 0;
       console.log('There are ' + numberOfAccounts + ' accounts in the vault.');
       accounts.forEach(function (account){
       //console.log("Index:  " + (count + 1) + " Account description: " + accounts[count].description);
        if (finddesc === accounts[count].description) {
           tempaccount.push(accounts[count]);
           matches++;
         } else {
           //not a match
         }
       count = count + 1;
       })
   }
   if (matches > 0) {
     var numMatches = tempaccount.length;
     console.log('Search found '+ numMatches + ' matches.');
     var i = 0;
     tempaccount.forEach(function (account){
     console.log('Result number ' + (i));
     console.log('Your ' + tempaccount[i].description + ' user name is ' + tempaccount[i].username + ' .');
     console.log('Your ' + tempaccount[i].description + ' account password is ' + tempaccount[i].password + ' .');
     i++;
    })
   } else {
   console.log('Account type \'' + finddesc + '\' not found.');
   }
}

function writeAccounts(accounts, key) {
  console.log('writing array to disk.');
  //console.log(accounts);
   if (typeOf(accounts) === 'undefined') {
     var writethis = [];
   } else {
     //var JSONstring = constructJSON(accounts);
     //console.log(JSONstring);
     //var nurt =  "\{ \"id\": 1 , \"description\": \"gmail\" , \"username\": \"mectapus\" , \"password\": \"blargh\" \}"
   /*
        var writethis = [
                 { id: 1233, description: "gmail", username: "4qw437", password: "4sd37" },
                 { id: 1234, description: "Bob", username: "22rr31", password: "4qwdsd7" },
                 { id: 1235, description: "Dave", username: "66ew77", password: "sadasds" }
               ];
   */
  var writethis = accounts;
  //  var writethis = crypto.AES.encrypt(horse, key);
  //  console.log(writethis);
   }
   storage.setItemSync('accounts1', writethis);
   console.log('Wrote data to storage.')
}



function constructJSON (accounts) {
  console.log('constructJSON not yet implemented.');
}

// CLEAR all the accounts from disk storage
function clearAllAccounts() {
   storage.clearSync();
}

function printAllAccounts() {
  var accounts = readAccounts(key);
  console.log(accounts);
}

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
  console.log(typeof(writethis));
    var JSONmsg = JSON.stringify(writethis);
     console.log(JSONmsg);
     console.log(typeof(JSONmsg));
     console.log('   ');
     console.log('   ');
     console.log('about to encrypt');
     var louis = crypto.AES.encrypt(JSONmsg, key);
     console.log('encrypted');
     console.log(typeof(louis));
    //accounts = writethis;
    //  var writethis = crypto.AES.encrypt(horse, key);

     //storage.setItemSync('accounts1', louis);
     console.log('Wrote data to storage.')

}

// initialize disk storage before accssing
function initStorage() {
  storage.initSync();
}





// return the next sequential record id
function getNextId () {
  var lastid = 0;
  var accounts = readAccounts(key);
  console.log(accounts);
  if (typeOf(accounts) ==='undefined') {
    console.log('Accounts array is empty. Setting new index to 0001.');
  } else {
    var numberOfAccounts = accounts.length;
    lastid = accounts[numberOfAccounts-1].id;
        console.log('The last item in the array has ID ' + lastid + '. Setting new index to ' + (lastid + 1) + '.');
      }
  return (lastid + 1);
}




// main
initStorage();
  console.log('initializing...');
// read args
if (command === 'add' ) {
  console.log('Adding ' + argv.description  + '...');
  //createNewAccount();
  var nextid = getNextId();
  var accountsArray = createNewAccount(nextid, argv.description, argv.username, argv.password);
  writeAccounts(accountsArray, key);

} else if (command === 'search') {
  console.log('Searching for ' + argv.description + '...');
  searchAccounts(argv.description);

} else if (command === 'clear') {
  console.log('ARE YOU SURE?');
  clearAllAccounts();

} else if (command === 'load') {
  console.log('load array with test data.');
  loadArray();

} else if (command === 'print') {
  console.log('print all accounts.');
  printAllAccounts();

} else {
  console.log('no command.');

}
