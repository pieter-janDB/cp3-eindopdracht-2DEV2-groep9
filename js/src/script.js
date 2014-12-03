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
		var postitTitle = document.createElement('h2');
		postitTitle.classList.add('postitTitle');
		var postitBody = document.createElement('p');
		postitBody.classList.add('postitText');
		var titleText = document.createTextNode('Titel');
		var bodyText = document.createTextNode('Dit is de content van de postit');
		
		
		postitTitle.appendChild(titleText);
		postitBody.appendChild(bodyText);

		postit.appendChild(postitTitle);
		postit.appendChild(postitBody);

		whiteboard.appendChild(postit);

	}


	init(); 



})();