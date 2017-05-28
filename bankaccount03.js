// bank account project for Andrew Mead Udemy Course

/*  all rights reserved
	cmw48
	2016
*/

var accounts = [];
var count = 0;
var account = {};
var transactAccount = {};

var i=0;
var top = 0;
var bottom = 0;

//Account Object needs
// id
// balance
// username
// password

function createAccount(idno, bal, usr, passw){
  var newaccount = {};
  newaccount.id = idno;
  newaccount.balance = bal;
  newaccount.username = usr;
  newaccount.password = passw
  accounts.push(newaccount);
}

function getAccount(username){
   var transactAccount = {};
   var found = false;
   accounts.forEach(function (account){
      if (account.username === username) {
      	found = true;
      	transactAccount = account;
      }
   });
   if (found) {
     return transactAccount;
   } else {
     console.log("Account username not found.  Transaction cancelled.")
     return username;
   }
   return transactAccount;
}

function listAccounts(){
  accounts.forEach(function (account){
    console.log("Index:  " + count + " Account Number: " + accounts[count].balance);
    count = count + 1;
  });
}


function deposit(account, amount) {

    console.log('TRANSACTION: Deposit for USER: ' + account.username + "-")

account.balance += amount
console.log('You have deposited the amount of ' + amount + '.  Your current balance is ' + account.balance + '.')

}

// withdraw

function withdraw(account, amount) {

      console.log('TRANSACTION: Withdrawal for USER: ' + account.username + "-")

  account.balance -= amount
  console.log('You have withdrawn the amount of ' + amount + '.  Your current balance is ' + account.balance + '.')

}


// getBalance

function getBalance(username) {

    console.log('TRANSACTION: Balance inquiry for USER: ' + account.username + "-")

  //console.log(username)
  //console.log(getAccount(username).balance)
  //console.log('You have NOT DONE A GODDAMN THING, yet the amount of ' + getAccount(username).balance + ' is in your account. ' )
  return getAccount(username).balance;
}


function countdown(top, bottom) {
  for(i=top; bottom <= i ; i--) {
    console.log("COUNT IS " + i)
  }
  console.log('countdown over.')
}

function countwhile(top,bottom) {
  i=top;
  while(bottom <= i) {
    console.log('count: ' + i);
    i--;
  }
    console.log('countdown over.')
}


countdown(20,10);
countwhile(30,10);
createAccount(1233, 132.50, 'bamf', 'vince');
createAccount(1232, 232.00, 'cmwestling', 'nerp');
createAccount(1235, 0.09, 'Keiran', 'oops');
createAccount(1239, 300, "jackship", "poop");
listAccounts();
console.log('Your dadgum balance is ' + (getBalance('bamf')) + '.')

deposit(getAccount('cmwestling'), 40);
//console.log('Your current balance is ' + getBalance(getAccount('cmwestling')) + '.')
withdraw(getAccount('cmwestling'),100);
getBalance('cmwestling');

getBalance('dave');
withdraw(getAccount('cmwestling'),24);
getBalance('cmwestling');

console.log('Your current balance is ' + (getBalance('cmwestling')) + '.')
//console.log(transactAccount.username);

//deposit(account, 1.00);
//deposit(account, 50.00);
//withdraw(account, 25.00);
//withdraw(account, 32.43);
//deposit(account, 500);
//console.log('also here');
//console.log('Your current balance is ' + getBalance(account) + '.')
