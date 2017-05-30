/**
udemy test file
Chris Westling
May 2017
**/


var typeOf = require('typeof');
var storage = require('node-persist');
var foundAccount = [];

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
  var newaccount = {};
  newaccount.id = idno;
  newaccount.description = desc;
  newaccount.username = usr;
  newaccount.password = passw;
  var accounts = readAccounts();
  accounts.push(newaccount);
  console.log('Adding new account...');
  writeAccounts(accounts);
}


// given an account description, return the username and password
// if there are multiple entries, return them all
// if string does not exist, return undefined

function findAccount (accountDesc) {
   var accounts = readAccounts();
   var numberOfAccounts = accounts.length;
   var tempaccount = [];
   var count = 0;
   var matches = 0;
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

function readAccounts() {
    var accounts = storage.getItemSync('accounts');

    if (typeOf(accounts)==='array') {
      console.log('Reading data from storage...');
      //console.log(accounts);
    } else {
      console.log('Accounts array is empty.');
    }

    return accounts;
}

// CLEAR all the accounts from disk storage
function clearAllAccounts() {
  accounts = [];
  writeAccounts();
}

// write all the accounts to disk storage
function writeAccounts(accounts) {
    storage.setItemSync('accounts', accounts);
    console.log('Wrote data to storage.')
}

// initialize disk storage before accssing
function initStorage() {
  storage.initSync();
}

// return the next sequential record id
function getNextId () {
   var accounts = readAccounts();
   var numberOfAccounts = accounts.length;
   var lastid = 0;
   lastid = accounts[numberOfAccounts-1].id;
   return (lastid + 1);
}

// main
initStorage();
// read args
if (command === 'add' ) {
  console.log('Adding ' + argv.description  + '...');
  var nextid = getNextId();
  createNewAccount(nextid, argv.description, argv.username, argv.password);
} else if (command === 'search') {
  console.log('Searching for ' + argv.description + '...');
  searchAccounts(argv.description);
} else if (command === 'clear') {
  console.log('ARE YOU SURE?');
  clearAllAccounts();
} else if (command === 'print') {
  console.log('print all accounts.');
  clearAllAccounts();
} } else {
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


//storage.setItemSync('accounts', []);
//var accounts = storage.getItemSync(accounts);
