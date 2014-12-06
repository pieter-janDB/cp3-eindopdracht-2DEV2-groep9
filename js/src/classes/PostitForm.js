module.exports = (function(){
	
	var whiteboard = document.querySelector('.whiteboard');

	function PostitForm(el) {

		this.el = this.createForm();

		whiteboard.appendChild(this.el);

		this.postitTitle = this.el.querySelector('.postitTitleInput');
		this.postitText = this.el.querySelector('.postitTextInput');
		this.inputButton = this.el.querySelector('.postitSubmitButton');
		this.inputButton.addEventListener('click', this.addPostit.bind(this));

		
		


	}

	PostitForm.prototype.addPostit = function(e){
		e.preventDefault();

		bean.fire(this, "create-postit", [this.postitTitle.value, this.postitText.value]);
		this.deleteForm();

	}


	PostitForm.prototype.deleteForm = function(){
		this.postitFormDiv.parentElement.removeChild(this.postitFormDiv);

	}

	PostitForm.prototype.createForm = function(event) {

		this.postitFormDiv = document.createElement('div');
		this.postitFormDiv.classList.add('postit');

		var postitForm = document.createElement('form');


		var postitTitleDiv = document.createElement('div');
		postitTitleDiv.classList.add('postitInputDiv');

		var postitTitleInput = document.createElement('input');
		postitTitleInput.type="text";
		postitTitleInput.placeholder="Title";
		postitTitleInput.classList.add('postitTitleInput');

		var postitBodyInput = document.createElement('textarea');
		postitBodyInput.classList.add('postitTextInput');
		postitBodyInput.placeholder="Content";

		var postitSubmitButton = document.createElement('input');
		postitSubmitButton.type="submit";
		postitSubmitButton.classList.add('postitSubmitButton');

		postitTitleDiv.appendChild(postitTitleInput);
		postitForm.appendChild(postitTitleDiv);
		postitForm.appendChild(postitBodyInput);
		postitForm.appendChild(postitSubmitButton);		
		this.postitFormDiv.appendChild(postitForm);
		return this.postitFormDiv;


	};
	
	return PostitForm;
})();