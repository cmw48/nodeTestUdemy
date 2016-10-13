// bank account project for Andrew Mead Udemy Course

/*  all rights reserved
	cmw48
	2016
*/

var account = {
	balance: 0.00
};



// deposit

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
console.log('Your current balance is ' + getBalance(account) + '.')

deposit(account, 3.00);
deposit(account, 1.00);
deposit(account, 50.00);
withdraw(account, 25.00);
withdraw(account, 32.43);
deposit(account, 500);
console.log('Your current balance is ' + getBalance(account) + '.')
