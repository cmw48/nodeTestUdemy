var grades = [100, 97, 99, 97, 100, 95, 87, 79]; 

var totalgrade = 0;
var count = 0;

grades.forEach(function (nerpo){
  count = count + 1;
  totalgrade += nerpo;
  console.log("WTF.  Grade " + count + " is " + nerpo + ".");
});
	

  console.log("WTF.  The sum of all grades is " + totalgrade);
  console.log("the average grade is " + totalgrade/grades.length + "." )
