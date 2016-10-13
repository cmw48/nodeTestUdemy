// bank account project for Andrew Mead Udemy Course

/*  all rights reserved
	cmw48
	2016
*/

var accounts = [];
var count = 0;
var account = {};
var transactAccount = {};

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
        
      	//console.log("The account balance for " + account.username + " is " + account.balance)
      } else {
        if (found) {
        	found = true;
        } else {
        	found = false;
        }

      }

   });
if (found) {
  return transactAccount;
} else {
	console.log("Account username not found.")
}
}
  
function listAccounts(){
  accounts.forEach(function (account){
    console.log("Index:  " + count + " Account Number: " + accounts[count].balance);
    count = count + 1;
  });	
}


function deposit (account, amount) {
account.balance += amount
console.log('You have deposited the amount of ' + amount + '.  Your current balance is ' + account.balance + '.')

}

// withdraw

function withdraw (account, amount) {
account.balance -= amount
console.log('You have withdrawn the amount of ' + amount + '.  Your current balance is ' + account.balance + '.')

}


// getBalance	

function getBalance (account) {
return account.balance;
}

//console.log('Your current balance is ' + getBalance(account) + '.')
createAccount(1233, 132.50, 'bamf', 'vince');
createAccount(1232, 232.00, 'cmwestling', 'nerp');
getAccount("cmwestling")
createAccount(1235, 0.09, 'Keiran', 'oops');
getAccount("Keiran")
createAccount(1239, 300, "jackship", "poop");
getAccount("jackship")
listAccounts();

deposit(getAccount('cmwestling'), 40);
console.log('Your current balance is ' + getBalance(getAccount('cmwestling')) + '.')
withdraw(getAccount('cmwestling'),100);
getBalance(getAccount('cmwestling'));

getBalance(getAccount('dave'));
withdraw(getAccount('cmwestling'),24);
getBalance(getAccount('cmwestling'));
//console.log(transactAccount.username);

//deposit(account, 1.00);
//deposit(account, 50.00);
//withdraw(account, 25.00);
//withdraw(account, 32.43);
//deposit(account, 500);
//console.log('also here');
//console.log('Your current balance is ' + getBalance(account) + '.')
