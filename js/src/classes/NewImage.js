module.exports = (function(){
	
	var whiteboard = document.querySelector('.whiteboard');

	function NewImage(el) {
		this.el = el;
		
		//later nog this.deleteknop / resize / edit?

	}

	NewImage.createWithUpload = function(file){
		
		var el = document.createElement('img');
		el.classList.add('Image');
		el.src = file;
		return new NewImage(el);


	};


	
	return NewImage;
})();


