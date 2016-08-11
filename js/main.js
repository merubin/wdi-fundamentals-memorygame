/*
*************************** Module Header *****************************
* Module Name:main.js
*
*   Copyright 2016 RUBIN IT SOLUTIONS
*   (c) RUBIN IT SOLTUIONS All Rights Reserved
*
*   This program code is proprietary and confidential RUBIN IT SOLUIONS Corp.
*
*  Author(s)
*     Michael E. Rubin  
*
*   Description: Memory Game for GA WDI-DC12 Fundamentals Pre-work
* HISTORY:
*    12 Aug 2016 Initial Release 
***********************************************************************
*/

/* 
   Declare global variables, constants
*/
var wins=0;
var losses=0;


/* CSS TAGS CLASSES ETC */
const CSSDIV = 'div'
const CSSMSGLINE = 'msg';
const CSSSCORELINE = 'score';
const DATACARDATT = 'data-card'
const CARDBKGIMG = '<img src="img/cbga.png" alt="background image" />';
const QUEENOFSPADESIMG = '<img src="img/qs.png" alt="Queen of Spades" />';
const QUEENOFHEARTSIMG = '<img src="img/qh.png" alt="Queen of Hearts" />';
const KINGOFSPADESIMG = '<img src="img/ks.png" alt="King of Spades" />';
const KINGOFHEARTSIMG = '<img src="img/kh.png" alt="King of Hearts" />';
const VERBOSE=true;  /* flag for additional console logging */
const LOGLVL=2;      /* only log these  issues and lower  3 most logging 1 least logging */
const MSGLOOSE = "  GAME OVER - Sorry You Lost!(Click Card to Replay)";
const MSGWIN = " GAME OVER - Congratulations You Win! (Click Card to Replay)";
const MSGERRALREADYSELECTED = " You already Picked this Card!";
const MSGNEWGAME = " NEW GAME- Pick your first card -Click on Card- ";
const MSGPICK2 = " GAME IN PROGRESS - Pick your second card -Click on new Card to Match First Card"
const MSGWINS = " WON ";
const MSGLOSSES = " LOSS ";
const MSGGAMESPLAYED = "TOTAL GAMES:";

var cards =[ "QueenS","QueenH","kingS","kingH"];  //card name + suite indicator
var gameOver = false;    /* flag to notify that game is over and stop checking */
var cardsInPlay = [];





/*  
  Functions Declarations
*/

/*******************************************************************
* NAME :logMessage= function(logLvl,logMsg1,logMsg2,logMsg3)        
*
* DESCRIPTION :  Log Message to Console - Single point of logging to be able to turn on/off
*                logging or log only certain errors based on passed in level.
*
* INPUTS :
*       PARAMETERS:
*           logLvl - Integer Depending on Level Log Message to Console Lvls = 1,2,3 3 being most detailed
*
*       GLOBALS :
*            verbose - global flag to turn on/off all logging
*
*       RETURN :
*           None
* PROCESS :
*                   [1]  check verbose flag and log level to determine whether to send msg to console
*          
*
* NOTES :           
*                   
* CHANGES :
*
*/

var logMessage = function (logLvl,logMsg1,logMsg2,logMsg3) {

  /* build error message based on defined variables */
   var errMsg="";
   if (typeof(logMsg1) != "undefined") {
     var errMsg=logMsg1;
   }
   if (typeof(logMsg2) != "undefined") {
     errMsg += logMsg2;
   }
   if (typeof(logMsg3) != "undefined") {
     errMsg += logMsg3;
   }
  if (VERBOSE) {
     if (logLvl <= LOGLVL) {

       console.log(errMsg);
     }
 
  } /* if verbose */
} /* function logMessage */


/*******************************************************************
* NAME :updateScoreboard = function()        
*
* DESCRIPTION :  update screen scoreboard
*
* INPUTS :
*       PARAMETERS:
*           None
*
*       GLOBALS :
*            cards
*
*       RETURN :
*           None
* PROCESS :
*                   [1]  build current win/loss score message
*                   [2]  update score element on page
*
* NOTES :           
*                   
* CHANGES :
*
*/
var updateScoreboard = function() {

 var currentScoreMsg = MSGGAMESPLAYED + (wins+losses) + MSGWINS + wins + MSGLOSSES+losses;


     logMessage(2,currentScoreMsg);


var msgScore = document.getElementById(CSSSCORELINE);
msgScore.innerHTML = currentScoreMsg;

return null;

} /* function updateScoreboard */





/*******************************************************************
* NAME :shuffleCards = function()        
*
* DESCRIPTION :  Reset Match Game from previous game
*
* INPUTS :
*       PARAMETERS:
*           None
*
*       GLOBALS :
*            cards
*
*       RETURN :
*           Boolean - True - match found False No Match found 
* PROCESS :
*                   [1]  get number of times to shuffle
*                   [2]  swap array elements 
*
* NOTES :           
*                   
* CHANGES :
*
*/
 var shuffleCards = function() {
 var swapTimes =  Math.floor((Math.random() * 100) + 1);
 var temp;
 var idx1,idx2;

 logMessage(2,"Shuffleing Cards "+ swapTimes + " times")
 logMessage(2,"before = ",cards);

 for (i=1; i < swapTimes;i++) {
   idx1 = Math.floor(Math.random() * cards.length);
   idx2 = Math.floor(Math.random() * cards.length);

    temp=cards[idx1];
    cards[idx1]=cards[idx2];
    cards[idx2]=temp;
 

 } 
 

 logMessage(2,"after = ",cards);
 return;
} /* function shuffleCards */


/*******************************************************************
* NAME :resetGame = function()        
*
* DESCRIPTION :  Reset Match Game from previous game
*
* INPUTS :
*       PARAMETERS:
*           None
*
*       GLOBALS :
*            document, cardsInPlay,gameOver,

*
*       RETURN :
*           Boolean - True - match found False No Match found 
* PROCESS :
*                   [1]  re-iniatialize current cards selected
*                   [2]  build and display won/loss record
*                   [3]  delete card elements and rebuild again
*
* NOTES :           
*                   
* CHANGES :
*
*/
 var resetGame=function() {

 	  cardsInPlay = [];  


    var newGameMsg = MSGNEWGAME ;
     logMessage(2,newGameMsg);


    var msgid = document.getElementById(CSSMSGLINE);
    msgid.innerHTML = newGameMsg;


    var cards = document.getElementById("game-board");

    // As long as board has a child node, remove it
    while (cards.hasChildNodes()) {   
        cards.removeChild(cards.firstChild);
    }
    createBoard();   // recreate game board
    updateScoreboard();     
    gameOver=false;
    return null;
 }



/*******************************************************************
* NAME :isMatch = function(cardsInPlay)        
*
* DESCRIPTION :  Check that two cards have been selected
*
* INPUTS :
*       PARAMETERS:
*           cardsInPlay  Array of Strings - Input param with cards played so far
*
*       GLOBALS :
*            this, document
*
*       RETURN :
*           Boolean - True - match found False No Match found 
* PROCESS :
*                   [1]  parse strings for removal of suit
*                   [2]  compare strings for match
*
* NOTES :           
*                   
* CHANGES :
*
*/

var  isMatch= function ( cardsInPlay ) {
	logMessage(2,"cardsInPlay 1 is " + cardsInPlay[0]);
	logMessage(2,"cardsInPlay 2 is " + cardsInPlay[1]);
   
 
    var str1 = cardsInPlay[0];
    var str2 = cardsInPlay[1];
    str1=str1.substr(0,str1.length-1);
    str2=str2.substr(0,str2.length-1);

    logMessage(2,str1 ,str2);
    return str1 === str2;
 
 	
} /* function isMatch */


/*******************************************************************
* NAME :isTwoCards = function()        
*
* DESCRIPTION :  Check that two cards have been selected
*
* INPUTS :
*       PARAMETERS:
*           None
*
*       GLOBALS :
*            this, document, cardsInPlay
*
*       RETURN :
*           null   
* PROCESS :
*                   [1]  check for valid pick must not have been previously selected
*                   [2]  if new selection set image for card
*                   [3]  if two cards check for match and notify win or loss  
*
* NOTES :           
*                   
* CHANGES :
*
*/

var isTwoCards = function() {
      logMessage(1,"just got a click");
 
      var cardName=this.getAttribute(DATACARDATT);
      logMessage(2,"Card Selected is:"+cardName);
      logMessage(2,"Current Image:"+this.innerHTML+ this.innerHTML.length);
      var newimage="";
      var currentimage=this.innerHTML;
      
      /* check if game is over and needs to be reset */
      if (gameOver) {
        resetGame();
        return;
      }


      /* check to see if the current card image has already been flipped if  notify of error */
            var validPick=true;
      if (currentimage !="")  {
      	logMessage(2," before background reset Current Image:"+this.innerHTML+ this.innerHTML.length);
      	/* this.innerHTML=""; */
      	var msgid=document.getElementById(CSSMSGLINE);
      	msgid.innerHTML = MSGERRALREADYSELECTED;

      	logMessage(2," after background resert Current Image:"+this.innerHTML+ this.innerHTML.length);
        validPick=false;      
      } else {
      switch (cardName) {
    		case "QueenS":
    		this.innerHTML = QUEENOFSPADESIMG;
         			break;
     		case "QueenH":
     		this.innerHTML = QUEENOFHEARTSIMG;
     				break;
      		case "kingS":
     		this.innerHTML = KINGOFSPADESIMG;
      				break;
      		case "kingH":
      		 this.innerHTML = KINGOFHEARTSIMG;
      				break;
    		default:
				break;

      }/* Else Switch */
  }
   if (validPick) {
  //checks to see if there are cards in play
  // add card to array of cards in play
  // 'this' hasn't been covered in this prework, but
  // for now, just know it gives you access to the card the user clicked on
  cardsInPlay.push(this.getAttribute(DATACARDATT));

  // if you have two cards in play check for a match
  if (cardsInPlay.length === 2) {
    gameOver=true;  /* flag for game over */
    // pass the cardsInPlay as an argument to isMatch function
    if (isMatch(cardsInPlay)){

    	/* YOU WIN */
    	var msgid=document.getElementById(CSSMSGLINE);
      	msgid.innerHTML = MSGWIN;
        wins++;

    } else {
    	/* YOU LOSE */
        var msgid=document.getElementById(CSSMSGLINE);
      	msgid.innerHTML = MSGLOOSE;
        losses++;
    }

    /* win or loss now update the scoreboard */
    updateScoreboard ();

  } /* if 2 cards */
  else {
    /* pick second card * update message */
    var msgid=document.getElementById(CSSMSGLINE);
        msgid.innerHTML = MSGPICK2;

  }
  } /* validPick */
 return null;
} /* fuction isTwoCards */



/*******************************************************************
* NAME :createBoard = function()        
*
* DESCRIPTION :  Create the board of cards
*
* INPUTS :
*       PARAMETERS:
*           None
*       GLOBALS :
*            document
*
*       RETURN :
*           Boolean - True - match found False No Match found 
* PROCESS :
*                   [1]  create the card elements for class
*                   [2]  register click listener for clicking on cards
*
* NOTES :           
*                   
* CHANGES :
*
*/
var createBoard = function () {


  var gameboardid=document.getElementById('game-board');

  shuffleCards();   /* shuffle the cards   */
  for (var i=0; i < cards.length; i++ ) {
  	var newcard = document.createElement(CSSDIV);
  	newcard.className='card';
  	newcard.setAttribute(DATACARDATT, cards[i]);
  	newcard.innerHTML="";
  	gameboardid.appendChild(newcard);

  }/* for */


   var cardList = document.getElementsByClassName("card");
   for ( var i=0; i < cards.length; i++) {
    cardList[i].addEventListener('click', isTwoCards); 
   } /* for i */ 
  


}/* function createBoard */


/*   MAIN LINE STARTS HERER */


logMessage(3," BEGIN HERE");
resetGame ();



