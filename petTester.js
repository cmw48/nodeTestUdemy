var pet = {
	type: 'dog',
	name: 'Biggie Smalls',
	disease: 'canine leukemia'
}

function printPet () {
	console.log('You own a ' + pet.type + '.  Your ' + pet.type + '\'s name is ' + pet.name + '.')
	console.log('Your ' + pet.type + ' has ' + pet.disease + '.')
}

printPet();
