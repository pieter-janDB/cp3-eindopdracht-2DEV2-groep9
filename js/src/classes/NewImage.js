module.exports = (function(){
	
	var whiteboard = document.querySelector('.whiteboard');

	function NewImage(el) {
		this.el = el;
		
		//later nog this.deleteknop / resize / edit?

	}

	NewImage.createWithUpload = function(filename){
		
		var el = document.createElement('div');
		el.classList.add('imageDiv');
		var location = "./images/uploaded/";
		el.style.width = "200px";
		el.style.height = "200px";
		el.style.backgroundImage = "url(" + location + filename + ")";
		return new NewImage(el);


	};


	
	return NewImage;
})();


