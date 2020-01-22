console.log('Starting JavaScript...');
console.log('')
// Comienza JavaScripts Basics
console.log('JavaScript Basics')
let myName = 'Nicolas';
console.log('My name: ' + myName);

let age = 20;
console.log('My age: ' + age);

let ignasiAge=32;
let ageDiff=(age-ignasiAge);
console.log('Difference with Ignasi age: ' + ageDiff);

if(age<21){
	console.log('You are not older than 21');
}
else{
	console.log('You are older than 21');
}


if(age<ignasiAge){
	console.log('Ignasi is older than you');
}
else{
	if(age>ignasiAge){
		console.log('Ignasi is younger than you');
	}
	else{
		console.log('You have the same age as Ignasi');
	}
}
console.log('')

// Comienza Array Functions
console.log('Array Functions');
console.log('');
// Ejercicio 1
console.log('Excercise 1');
let classNames = ['Nicolas S.','Agustin', 'Meji', 'Gian','Lucio','Ivan','Erica','Teo','Ariel','Leandro','Nahuel1','Alan','Diego', 'Lucas1', 'Roman', 'Lucas2', 'Rocio', 'Gabriel', 'Nahuel2', 'Matias', 'Eduardo', 'Ezequiel', 'Elias', 'Jose', 'Nicolas F.', 'Rodri', 'Branko'];
classNames.sort();

console.log('First name of my class: ' + classNames[0]);
console.log('Last name of my class: ' + classNames[classNames.length-1]);
console.log('My class ordered alphabetically: ');
for(let i=0; i<(classNames.length); i++){
	console.log(classNames[i]);
}
console.log('');

// Ejercicio 2
console.log('Excercise 2');
let classAges=[17,17,17,20,20,20,20,20,20,26,32,25,23,23,20,21,21,21,22,25,18,18,18,19,19,19,19];
let j=0;
console.log('All ages of my class: ')
while (j<classAges.length){
	console.log(classAges[j]);
	j++;
}

j=0;
console.log('Only even ages: ')
while(j<classAges.length){
	if(classAges[j]%2==0){
		console.log(classAges[j]);
	}
	j++;
}
j=0;

console.log('Using a "for" loop: ');
for(j=0; j<classAges.length; j++){
	if(classAges[j]%2==0){
		console.log(classAges[j]);
	}
}
console.log(' ');

// Ejercicio 3
console.log('Excercise 3')

function lowestNumberArray(numbersArray){
	let z=0;
	let number;
	while(z<numbersArray.length){
		if(z==0){
			number=numbersArray[z];
		}
		else{
			if(numbersArray[z]<number){
			number=numbersArray[z];
			}	
		}
		z++;
	}

	console.log('The lowest number of the array is: ' + number);
}

lowestNumberArray(classAges);
console.log(' ');

// Ejercicio 4
console.log('Excercise 4');

function biggestNumberArray(numbersArray){
	let z=0;
	let number;
	while(z<numbersArray.length){
		if(z==0){
			number=numbersArray[z];
		}
		else{
			if(numbersArray[z]>number){
			number=numbersArray[z];
			}	
		}
		z++;
	}

	console.log('The biggest number of the array is: ' + number);
}

biggestNumberArray(classAges);
console.log(' ');

//Ejercicio 5
console.log('Excercise 5');

function arrayPosition(numbersArray, index){
	if(index>=0 && index<numbersArray.length){
		console.log('This array has a ' + numbersArray[index] + ' on position N.' + index);
	}
	else{
		console.log('The index recieved is invalid.')
	}

}

arrayPosition(classAges, 14);
console.log(' ');

// Ejercicio 6
console.log('Excercise 6');

function repeatedNumbers(numbersArray){
	let z=0;
	let repeated=[];
	let r=0;
	let timesRepeated=0;

	while(z<numbersArray.length){
		let number = numbersArray[z];
		for(let y=0; y<numbersArray.length; y++){
			if(numbersArray[y]==number){
				timesRepeated++;
			}
		}
		if(timesRepeated>1 && repeated.indexOf(number)<0){
			repeated[r]=number;
			r++;
		}
		timesRepeated=0;
		z++;
	}

	if(repeated.length>0){	
		let b=0;
		console.log('The numbers that repeat are: ')
		while(b<repeated.length){
			console.log(repeated[b])
			b++;
		}
	}
	else{
		console.log('There are not repeated numbers in this array.')
	}

}
repeatedNumbers(classAges);
