module.exports = (function(){
	//var ..... = require('./.....');

	var PostitForm = require('./PostitForm.js');
	var Postit = require('./Postit.js');

	
	
    var actionDropdown= 1, actionBg = 1;


	function Whiteboard() {

		// gaat later element binnen krijgen welke objecten geplaatst zullen worden
		//dan foreach element in database met postit een posti it maken
		//voor elke foto , foto plaatsen etc etc

		//elk object in een array invoeren en bijhouden zoals bij todoApp oef.

		this.whiteboard = document.querySelector('.whiteboard');
		this.postits = Array();

		//postit

		this.createPostitButton = document.querySelector('.createPostit');
		this.createPostitButton.addEventListener('click', this.addPostitForm.bind(this));



		// dropdown members
		createMembersDropdown = document.querySelector('.members');
		createMembersDropdown.addEventListener('click', this.showDropdown);

		// change bg
		createMembersDropdown = document.querySelector('.grid');
		createMembersDropdown.addEventListener('click', this.changeBG);
		




	}
	Whiteboard.prototype.addPostitForm = function(){
		this.postitForm = new PostitForm();
		bean.on(this.postitForm, 'create-postit', this.createPostItHandler.bind(this));

	}

	Whiteboard.prototype.createPostItHandler = function(title, bodyText){
		 this.postit = new Postit.createWithText(title, bodyText);
		 this.postits.push(this.postit);
		 this.whiteboard.appendChild(this.postit.el);
		 
	}


	 // members dropdown


    Whiteboard.prototype.showDropdown = function(e){
        if(actionDropdown == 1){
           document.querySelector('.menu').style.display="block";
           actionDropdown = 2;
        }else{
           document.querySelector('.menu').style.display="none";
           actionDropdown = 1;
        }

     }
     // grid

     Whiteboard.prototype.changeBG = function(){
        if(actionBg == 1){
           document.body.style.backgroundImage="url(images/gridBG.jpg)";
           document.getElementById("changeByClick").src = "images/solid-icon.png";
           actionBg = 2;
        }else{
			document.body.style.backgroundImage="";
			document.getElementById("changeByClick").src = "images/grid.png";
           actionBg = 1;
        }

     }


	return Whiteboard;
})();