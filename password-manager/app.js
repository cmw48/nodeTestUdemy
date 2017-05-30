var typeOf = require('typeof');
var storage = require('node-persist');
//var accounts = [];
var foundAccount = [];

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


function clearAllAccounts() {
  accounts = [];
  writeAccounts();
}


function writeAccounts(accounts) {
    storage.setItemSync('accounts', accounts);
    console.log('Wrote data to storage.')
}

function initStorage() {
  storage.initSync();
}

initStorage();
//clearAllAccounts();
//createNewAccount(1497, 'Hulu', 'lulu', 'lulu34');
searchAccounts('Hulu');






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
