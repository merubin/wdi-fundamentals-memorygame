console.log("JS file is connected to HTML! Woo! Woo!");

  /* 
   Declare global variables
 */


var cardOne = "Queen", 
	cardTwo = "Queen",
	cardThree = "King", 
	cardFour = "King";
var cols,rows;
var maxcards = 4
 

/*  Functions
*/
var calcCols =function (numcards) {
	
	// must at least have 2 cards

	if (numcards < 2 )  {
		return;
	}	

// make cards an even number
     
	if ((numcards % 2 )  > 0 ) {
		numcards--;
	}

// find largest number of rows that contain the number of cards
   var rows =  numcards / 2;
  for (  var i=rows ; i > 1; i--) {}

}

var createBoard = function () {



console.log(" cardOne == cardTwo ", cardOne == cardTwo);
console.log(" cardOne == cardFour", cardOne == cardFour);

var gameboardid=document.getElementById('game-board');

/* calcCols(maxcards); */
for (var i=0;i<maxcards;i++ ) {
	var newcard = document.createElement('div');
	newcard.className='card';
	gameboardid.appendChild(newcard);
}

}


/*   MAIN LINE STARTS HERER */
console.log(" BEGIN HERE");
createBoard();
/*
5 ) Assuming your memory card game consists of four cards, create a for loop that makes an HTML element for each card. Each HTML element should be a div. Each element should also have the class card (this will help when you add CSS).

6 ) Append each newly created card to the div that has the class board

Create functions to organize your code

7 ) Create a function called createBoard in your Javascript file. This function will eventually create the HTML for your cards. It will then append the resulting HTML to your div that has the class board.

8 ) Inside of your createBoard function, you need to...

9 ) Create a for loop that will iterate four times.

10 ) For each iteration in your loop, you will create the required HTML for each card using Javascript.

11 ) You will then append this HTML to the board. All of this logic should be inside the for loop.

12 ) Once you've completed that, you will execute/fire your createBoard function so it runs!

13) Once you've done that, your board will be created! Be sure to check your page in a web browser to verify that everything works as intended!

*/



/*
if (cardOne === cardTwo) {
	alert("You found a match! (cardOne = cardTwo) " + cardOne + " " + cardTwo);
} else {
	alert ("Sorry, try again. cardOne <> cardTwo " + cardOne + " " + cardTwo);
}
if (cardOne === cardThree) {
	alert("You found a match! (cardOne = cardThree) " + cardOne + " " + cardThree);
} else {
	alert ("Sorry, try again. cardOne <> cardThree " + cardOne + " " + cardThree);
}
if (cardThree === cardFour) {
	alert("You found a match! (cardThree = cardFour) " + cardThree + " " + cardFour);
} else {
	alert ("Sorry, try again. cardThree <> cardFour " + cardThree + " " + cardFour );
}
if (cardTwo === cardThree) {
	alert("You found a match! (cardTwo= cardThree) " + cardTwo + " " + cardThree );
} else {
	alert ("Sorry, try again. cardTwo <> cardThree " + cardTwo + " " + cardThree );
}
if (cardTwo === cardFour) {
	alert("You found a match! (cardTwo= cardFour) " + cardTwo + " " + cardFour );
} else {
	alert ("Sorry, try again. cardTwo <> cardFour " + cardTwo + " " + cardFour);
}
if (cardThree === cardFour) {
	alert("You found a match! (cardThree= cardFour) " + cardThree + " " + cardFour);
} else {
	alert ("Sorry, try again. cardThree <> cardFour " + cardThree + " " + cardFour);
}
 */