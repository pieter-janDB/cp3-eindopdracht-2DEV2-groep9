(function(){ 
	var memberAantal= 1;
	var whiteboard = document.querySelector('.whiteboard');


	
	function init(){ 

		if(document.querySelector('.newProjectPage')){
			addMemberButton = document.querySelector('.addMember');
			addMemberButton.addEventListener('click', addMember);
		}


		createPostitButton = document.querySelector('.createPostit');
		createPostitButton.addEventListener('click', addPostit);

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

	init(); 



})();