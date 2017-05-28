var username = '';
var greetAndrew = greetMaker('Andrew');
var greetPete = greetMaker('Pete');

function greetMaker(name) {
  function greet() {
    console.log('Hello ' + name + '!')
  }
  return greet;
}

function createAdder(baseNumber){
  return function (numberToAdd) {
    console.log('baseNumber is ' + baseNumber)
     theSum = baseNumber + numberToAdd;
    return theSum

  }

}

var baseTen = createAdder(10);
var baseFour = createAdder(4);
console.log(baseTen(2));
console.log(baseTen(20));
console.log(baseFour(2));
console.log(baseFour(20));


baseTen();
console.log(theSum);
greetAndrew();
greetAndrew();
greetMaker('Bob');
greetPete();
