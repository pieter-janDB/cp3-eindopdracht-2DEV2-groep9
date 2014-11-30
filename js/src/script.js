(function(){ 
	var test= 1;


	function init(){ 
		if(document.querySelector('.newProjectPage')){
			addMemberButton = document.querySelector('.addMember');
			addMemberButton.addEventListener('click', addMember);
		}
		
	} 

	function addMember(e){


		test++;
		var memberLabel = document.querySelector('.memberLabel');
		var newInput = document.createElement('input');
		newInput.type = "text";
		var classname = "member" + test;
		newInput.id = classname;
		newInput.classList.add(classname, 'newMember');
		newInput.placeholder="Voornaam Achternaam";

		console.log(memberLabel.parentNode);
		memberLabel.parentNode.insertBefore(newInput, document.querySelector('.test'));

	}

	init(); 



})();