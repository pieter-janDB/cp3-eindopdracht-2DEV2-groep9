module.exports = (function(){
	
	var whiteboard = document.querySelector('.whiteboard');

	function NewVideo(el) {
		this.el = el;
		
		//later nog this.deleteknop / resize / edit?

}

	NewVideo.createWithUpload = function(filename){
		
		var el = document.createElement('div');
		el.classList.add('videoDiv');
		var location = "./videos/uploaded/";
		el.style.width = "200px";
		el.style.height = "200px";
		el.style.backgroundImage = "url(" + location + filename + ")";
		return new NewVideo(el);


	};


	
	return NewVideo;
})();


