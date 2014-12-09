module.exports = (function(){
	
	var whiteboard = document.querySelector('.whiteboard');

	function NewImage(el) {
		this.el = el;

		//later nog this.deleteknop / resize / edit?

	}

	Image.createWithUpload = function(file){
		
		var el = document.createElement('img');
		el.classList.add('Image');
		el.src ="../images/uploaded/" . file.name;

		return new NewImage(el);


	}


	
	return NewImage;
})();