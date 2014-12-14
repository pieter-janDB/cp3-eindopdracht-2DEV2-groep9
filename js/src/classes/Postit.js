module.exports = (function(){
	
	var whiteboard = document.querySelector('.whiteboard');

	function Postit(el) {
		this.el = el;
		this.deleteKnop = el.querySelector('.deleteKnop');
		this.deleteKnop.addEventListener('click', this.deleteClickHandler.bind(this));

		//later nog this.deleteknop / resize / edit?

	}

	Postit.prototype.deleteClickHandler = function(event) {
		
		bean.fire(this, "delete");

	};

	Postit.createWithText = function(title, text){
		
		var el = document.createElement('div');
		el.classList.add('postit');
		var postitTitle = document.createElement('h2');
		postitTitle.classList.add('postitTitle');
		var postitBody = document.createElement('p');
		postitBody.classList.add('postitText');

		var topBalk = document.createElement('div');
		topBalk.classList.add('topBalk');
		var deleteKnop = document.createElement('img');
		deleteKnop.src = "./images/deleteItem.png" ;
		deleteKnop.style.width = "16px";
		deleteKnop.style.height = "16px";
		deleteKnop.classList.add('right', 'deleteKnop');
		var resizeKnop = document.createElement('img');
		resizeKnop.src = "./images/resize.png";
		resizeKnop.style.width = "16px";
		resizeKnop.style.height = "16px";
		resizeKnop.classList.add('right', 'resizeKnop');

		topBalk.appendChild(deleteKnop);
		topBalk.appendChild(resizeKnop);




		var titleText = document.createTextNode(title);
		var bodyText = document.createTextNode(text);
		
		
		postitTitle.appendChild(titleText);
		postitBody.appendChild(bodyText);

		el.appendChild(topBalk);
		el.appendChild(postitTitle);
		el.appendChild(postitBody);

		return new Postit(el);


	}


	
	return Postit;
})();