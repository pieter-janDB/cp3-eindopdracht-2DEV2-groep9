(function(){ 

	function init(){ 


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