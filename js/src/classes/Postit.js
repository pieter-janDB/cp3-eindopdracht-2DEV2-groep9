module.exports = (function(){
	
	var whiteboard = document.querySelector('.whiteboard');

	function Postit(el) {
		this.el = el;

		//later nog this.deleteknop / resize / edit?

	}

	Postit.createWithText = function(title, text){
		
		var el = document.createElement('div');
		el.classList.add('postit');
		var postitTitle = document.createElement('h2');
		postitTitle.classList.add('postitTitle');
		var postitBody = document.createElement('p');
		postitBody.classList.add('postitText');

		var titleText = document.createTextNode(title);
		var bodyText = document.createTextNode(text);
		
		
		postitTitle.appendChild(titleText);
		postitBody.appendChild(bodyText);

		el.appendChild(postitTitle);
		el.appendChild(postitBody);

		return new Postit(el);


	}


	
	return Postit;
})();