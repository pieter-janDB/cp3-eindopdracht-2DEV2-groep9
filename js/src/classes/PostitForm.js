module.exports = (function(){
	
	var whiteboard = document.querySelector('.whiteboard');

	function PostitForm(el) {

		this.el = this.createForm();

		if(whiteboard.appendChild(this.el)){
			//opslaan in db via ajax


		}

		this.postitTitle = this.el.querySelector('.postitTitleInput');
		this.postitText = this.el.querySelector('.postitTextInput');
		this.inputButton = this.el.querySelector('.postitSubmitButton');
		this.inputButton.addEventListener('click', this.addPostit.bind(this));


	}

	PostitForm.prototype.addPostit = function(e){
		e.preventDefault();

		var Title = document.querySelector('.postitTitleInput').value;
		var BodyText = document.querySelector('.postitTextInput').value;
		if ((/^\s*$/.test(Title)) && (/^\s*$/.test(BodyText))) {
				this.deleteForm();
		}else{
			this.deleteForm();
			bean.fire(this, "create-postit", [this.postitTitle.value, this.postitText.value]);
		}
		

	};


	PostitForm.prototype.deleteForm = function(){
		this.postitFormDiv.parentElement.removeChild(this.postitFormDiv);

	};

	PostitForm.prototype.createForm = function(event) {

		this.postitFormDiv = document.createElement('div');
		this.postitFormDiv.classList.add('postitForm');
		this.postitFormDiv.style.top = "200px";
		this.postitFormDiv.style.left = "150px";

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