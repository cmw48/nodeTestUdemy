/**
udemy test file
Chris Westling
May 2017
**/


var typeOf = require('typeof');
var storage = require('node-persist');
var CryptoJS = require('crypto-js');
var foundAccount = []
var key = '1234';
var util = require('util');

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
  var newaccount = [];
  newaccount.id = idno;
  newaccount.description = desc;
  newaccount.username = usr;
  newaccount.password = passw;
  var allAccounts = readAccounts(key);
  console.log(typeOf(allAccounts) + ' -accounttype');
    console.log(allAccounts);
  if (typeOf(allAccounts)==='undefined') {
    allAccounts = [];
  } else {
    // add find account already in vault
  }
  allAccounts.push(newaccount);
  console.log('Adding new account...');
  return allAccounts;
}


// given an account description, return the username and password
// if there are multiple entries, return them all
// if string does not exist, return undefined

function findAccount (accountDesc) {
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
        if (accountDesc === accounts[count].description) {
           tempaccount.push(accounts[count]);
           matches++;
         } else {
           //not a match
         }
       count = count + 1;
       })
   }
   if (matches > 0) {
     return tempaccount
   } else {
     return undefined;
   }
}

// manage setup for search function
// if there are multiple entries, list them all
// if account is undefined, return an error.

function searchAccounts(finddesc)  {
  foundAccount = findAccount(finddesc);
  var count = 0;
  if (foundAccount === undefined) {
    console.log('Account type \'' + finddesc + '\' not found.');
  } else {
    console.log('Search found '+ foundAccount.length + ' matches.');
    foundAccount.forEach(function (account){
      console.log('Result number ' + (count+1));
      console.log('Your ' + foundAccount[count].description + ' user name is ' + foundAccount[count].username + ' .');
      console.log('Your ' + foundAccount[count].description + ' account password is ' + foundAccount[count].password + ' .');
      count++;
    })
  }
}

// go get all the accounts from disk storage

function readAccounts(key) {
    console.log('Reading data from storage...');
    var dataFromFile = storage.getItemSync('accounts');
    console.log(dataFromFile);
    console.log(typeOf(dataFromFile));
    if ((typeOf(dataFromFile)==='undefined') || (dataFromFile === '')) {
      console.log('Accounts array is empty. Use add command to add a new account.');
      accounts = undefined;
    } else {
      var bytes = CryptoJS.AES.decrypt(dataFromFile, key);
      accounts = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      console.log('decrypted. ' + accounts);
      console.log(accounts);
    }

    return accounts;
}

// CLEAR all the accounts from disk storage
function clearAllAccounts() {
   storage.clearSync();
}

function constructJSON (accounts) {
  var count = 0;
  console.log('Here you go 2...');
  console.log(accounts);
  //JSONstring = "\{ \"accounts\":  \[ ";
  var JSONstring = "";
    console.log('Here you go 2.5...');
  accounts.forEach(function (account){

    if (count < accounts.length) {
      console.log(count + "  -  " + accounts.length);
      JSONstring = JSONstring + "\{ \"id\": " + (accounts[count].id ) + " , " +
      "\"description\": \"" + (accounts[count].description ) + "\" , " +
      "\"username\": \"" + (accounts[count].username ) + "\" , " +
      "\"password\": \"" + (accounts[count].password ) + "\" } ";
    } else {

    }
    count = count + 1;
  })
  // when you hit the last record, finish off JSON file
  //JSONstring = JSONstring + " \] \} ";

  console.log(typeOf(JSONstring));
  return JSONstring;
}

// write all the accounts to disk storage
function writeAccounts(accounts, key) {
   if (typeOf(accounts) === 'undefined') {
     var writethis = '';
   } else {
     console.log('Here you go 1...');
     var JSONstring = constructJSON(accounts);
     console.log('Here you go 3...');
     console.log(JSONstring);
     var nurt =  "\{ \"id\": 1 , \"description\": \"gmail\" , \"username\": \"mectapus\" , \"password\": \"blargh\" \}"
     var urp = { "users": [
                 { name: "Chris", id: "4437" },
                 { name: "Bob", id: "2231" },
                 { name: "Dave", id: "6677" }
               ]
             };
     console.log(nurt);
     var writethis = "happy";
     console.log(horse);

  //  var writethis = CryptoJS.AES.encrypt(horse, key);
  //  console.log(writethis);
   }
   storage.setItemSync('accounts', nurt);
   console.log('Wrote data to storage.')
}

// initialize disk storage before accssing
function initStorage() {
  storage.initSync();
}

function encryptMe() {
  var mersg = '{ \"accounts\":  \[ \{ \"id\": 1 , \"description\": \"gmail\" , \"username\": \"mectapus\" , \"password\": \"blargh\" \} ,  \{ \"id\": 2 , \"description\": \"natflix\" , \"username\": \"merkel\" , \"password\": \"yatahey\" \} \] \} '


  var key ='abc123';
  var JSONmsg = JSON.stringify(mersg);
  console.log(JSONmsg);
  var encryptmsg = CryptoJS.AES.encrypt(JSONmsg, key);
  console.log('Encrypted: ' + encryptmsg);
  //var JSONencryptmsg = JSON.stringify(encryptmsg);

 //var bob = 'U2FsdGVkX19H5W/H0KLRK/99Jub+n9KBxGm+6PZWbG1la5hKXUGrjTtEYSgF7Team+jfsuHr29h/gm9wqSBwOcjraF3FnHBuz3+5Y5zE2v1eZ6xs+t/djFS2vhbBXU3HcdmF8ol87Ed1UZ6CC2x/3jPRdVSffVr7xzpOogTpGURLbNJ7LQYSmKmTLRdHsqFP5ZL7G0NlCh/uvN8K0c/Y9hUz+vtU9SJEfvTK7XztkdWHOKZ4a2SL2FgUZVsIm3qzR9cWPuYrobp0kOhSnrUkfCzwazaU0oNM8rzdURJLsc5PycqIdcpIvo3ilCnlXRFIWj95OIeP7U1bn/ugOM/41A=='
 //storage.setItemSync('accounts', bob);

  var bytes = CryptoJS.AES.decrypt(encryptmsg, key);
  var parsedstring = bytes.toString(CryptoJS.enc.Utf8);
  msg = JSON.parse(parsedstring);
  console.log(parsedstring);
  console.log("BEEP ");
  console.log(msg);
  console.log(typeof(msg));
  var newman = JSON.parse(msg);
  //console.log('decrypted: ' + users[0].name + ' ' + users[0].id);
  console.log(newman.accounts[0]);

}

// return the next sequential record id
function getNextId () {
  var lastid = 0;
  var accounts = readAccounts(key);
  if (typeOf(accounts) ==='undefined') {
    console.log('Accounts array is empty. Setting new index to 0001.');
  } else {
    var numberOfAccounts = accounts.length;
    lastid = accounts[numberOfAccounts-1].id;
  }
  return (lastid + 1);
}

// main
initStorage();
// read args
if (command === 'add' ) {
  console.log('Adding ' + argv.description  + '...');
  encryptMe();
  var nextid = getNextId();

  //var accountsArray = createNewAccount(nextid, argv.description, argv.username, argv.password);
  //writeAccounts(accountsArray, key);

} else if (command === 'search') {
  console.log('Searching for ' + argv.description + '...');
  searchAccounts(argv.description);

} else if (command === 'clear') {
  console.log('ARE YOU SURE?');
  clearAllAccounts();

} else if (command === 'print') {
  console.log('print all accounts.');
  clearAllAccounts();

} else {
  console.log('no command.');

}


//clearAllAccounts();
//createNewAccount(1497, 'Hulu', 'lulu', 'lulu34');







//storage.setItemSync('accounts', accounts);
/*
storage.setItemSync('accounts', [{
  id: '4001',
  balance: 0.0,
  username: 'Ignatius',
  password:'Reilly'
}]);
/*
var name = storage.getItemSync('name');
console.log('name is ' + name);


storage.setItemSync('accounts', [{
  username: 'Ignatius',
  balance: 0
}]);
*/


//storage.setItemSync('accounts', {});
//var accounts = storage.getItemSync(accounts);
