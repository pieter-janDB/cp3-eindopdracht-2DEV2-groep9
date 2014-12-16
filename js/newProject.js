(function(){ 
	var memberAantal= 1;


	function init(){ 

			addMemberButton = document.querySelector('.addMember');
			addMemberButton.addEventListener('click', addMember);
		

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
	
 	init(); 

})();