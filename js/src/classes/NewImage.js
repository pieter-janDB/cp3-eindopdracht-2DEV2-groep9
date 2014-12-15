module.exports = (function(){
	
	var whiteboard = document.querySelector('.whiteboard');

	function NewImage(el) {
		this.el = el;
		
		//later nog this.deleteknop / resize / edit?

	}

	NewImage.createWithUpload = function(filename){
		
		var el = document.createElement('img');
		el.classList.add('Image');
		var location = "./images/uploaded/";
		el.src = location + filename;
		return new NewImage(el);


	};


	
	return NewImage;
})();


