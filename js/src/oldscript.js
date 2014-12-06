(function(){ 
	var memberAantal= 1;
	var whiteboard = document.querySelector('.whiteboard');
    var actionDropdown= 1, actionBg = 1;


	
	function init(){ 

		if(document.querySelector('.newProjectPage')){
			addMemberButton = document.querySelector('.addMember');
			addMemberButton.addEventListener('click', addMember);
		}

		//postit

		createPostitButton = document.querySelector('.createPostit');
		createPostitButton.addEventListener('click', addPostit);

		// dropdown members
		createMembersDropdown = document.querySelector('.members');
		createMembersDropdown.addEventListener('click', showDropdown);

		// change bg
		createMembersDropdown = document.querySelector('.grid');
		createMembersDropdown.addEventListener('click', changeBG);

		// register validatie
		var registerForm = document.getElementById('regForm');

		var firstnameInput = document.querySelector('input[name=firstname]');
		var lastnameInput = document.querySelector('input[name=lastname]');
		var emailInput = document.querySelector('input[name=email]');
		var passwordInput = document.querySelector('input[name=password]');
		var confPasswordInput = document.querySelector('input[name=confirm_password]');

		firstnameInput.addEventListener('blur', blurHandler);
		lastnameInput.addEventListener('blur', blurHandler);
		emailInput.addEventListener('blur', blurHandler);
		passwordInput.addEventListener('blur', blurHandler);
		confPasswordInput.addEventListener('blur', blurHandler);


	}

	function addMember(e){ 


		memberAantal++;
		var memberLabel = document.querySelector('.memberLabel');
		var newInput = document.createElement('input');
		newInput.type = "text";
		var classname = "member" + memberAantal;
		newInput.id = classname;
		newInput.name = "member" + memberAantal;
		newInput.classList.add(classname, 'newMember');
		newInput.placeholder="Voornaam Achternaam";

		console.log(memberLabel.parentNode);
		memberLabel.parentNode.insertBefore(newInput, document.querySelector('.test'));

	}

	function addPostit(e){

		var postit = document.createElement('div');
		postit.classList.add('postit');

		var postitForm = document.createElement('form');


		var postitTitleDiv = document.createElement('div');
		postitTitleDiv.classList.add('postitInputDiv');

		var postitTitleInput = document.createElement('input');
		postitTitleInput.type="text";
		postitTitleInput.placeholder="Title";

		var postitBodyInput = document.createElement('textarea');
		postitBodyInput.classList.add('postitTextInput');

		var postitSubmitButton = document.createElement('input');
		postitSubmitButton.type="submit";

		postitSubmitButton.classList.add('postitSubmitButton');
		postitBodyInput.placeholder="Content";
		postitTitleDiv.appendChild(postitTitleInput);
		postitForm.appendChild(postitTitleDiv);
		postitForm.appendChild(postitBodyInput);
		postitForm.appendChild(postitSubmitButton);		
		postit.appendChild(postitForm);
		whiteboard.appendChild(postit);

	}
	function addPremadePostit(e){
		
		var postit = document.createElement('div');
		postit.classList.add('postit');
		var postitTitle = document.createElement('h2');
		postitTitle.classList.add('postitTitle');
		var postitBody = document.createElement('p');
		postitBody.classList.add('postitText');
		var titleText = document.createTextNode('Titel');
		var bodyText = document.createTextNode('Dit is de content van de postit Dit is de content van de postit Dit is de content van de postit Dit is de content van de postit');
		
		
		postitTitle.appendChild(titleText);
		postitBody.appendChild(bodyText);

		postit.appendChild(postitTitle);
		postit.appendChild(postitBody);

		whiteboard.appendChild(postit);

	}

    // members dropdown

    function showDropdown(e){
        if(actionDropdown == 1){
           document.querySelector('.menu').style.display="block";
           actionDropdown = 2;
        }else{
           document.querySelector('.menu').style.display="none";
           actionDropdown = 1;
        }

     }
     // grid

     function changeBG(){
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


	function validationNotEmpty(input){

		var errorMessage = document.querySelector('[data-for=' + input.getAttribute('name') + ']');
		if(input.value.length > 0){
			//valid
			errorMessage.classList.add('hidden');
			return true;
		}else{
			//not valid
			console.log('test');
			errorMessage.classList.remove('hidden');
			return false;
		}	
	}

	function blurHandler(event){
	validationNotEmpty(this);
	}


	function submitHandler(event){
		var allValid = true;

		allValid &= validationNotEmpty(firstnameInput);
		allValid &= validationNotEmpty(lastnameInput);
		allValid &= validationNotEmpty(emailInput);
		allValid &= validationNotEmpty(passwordInput);
		allValid &= validationNotEmpty(confPasswordInput);

		if(!allValid){
			event.preventDefault();
		}
		//console.log('contact form submit');
	}

	init(); 



})();