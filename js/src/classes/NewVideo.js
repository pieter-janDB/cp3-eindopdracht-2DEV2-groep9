module.exports = (function(){
	
	var whiteboard = document.querySelector('.whiteboard');

	function NewVideo(el) {
		this.el = el;
		
		//later nog this.deleteknop / draganddrop / edit?

		this.deleteKnop = el.querySelector('.deleteKnop');
		this.deleteKnop.addEventListener('click', this.deleteClickHandler.bind(this));


		this._mouseDownHandler = this.mouseDownHandler.bind(this);
		this._mouseMoveHandler = this.mouseMoveHandler.bind(this);
		this._mouseUpHandler = this.mouseUpHandler.bind(this);


		this.dragKnop = el.querySelector('.dragKnop');
		this.dragKnop.addEventListener('mousedown', this._mouseDownHandler);

		//later nog this.deleteknop / draganddrop / edit?""

	}
	
	NewVideo.prototype.deleteClickHandler = function(event) {
		
		bean.fire(this, "delete");

	};


	NewVideo.prototype.mouseDownHandler = function( event ){

			this.parentOffset = event.currentTarget.parentNode.offsetWidth - 52;

			this.offsetX = this.parentOffset + event.offsetX;
			this.offsetY = event.offsetY;


			window.addEventListener( 'mousemove', this._mouseMoveHandler);
			window.addEventListener( 'mouseup', this._mouseUpHandler);
	}

	NewVideo.prototype.mouseMoveHandler = function( event ){
		
		this.el.style.left = event.x-this.offsetX + 'px';
		this.el.style.top = event.y-this.offsetY + 'px';
		
	}

	NewVideo.prototype.mouseUpHandler = function( event ){
		window.removeEventListener( 'mousemove', this._mouseMoveHandler);
		window.removeEventListener( 'mouseup', this._mouseUpHandler);
		
		$.ajax({
		        type: 'post',
		        url: window.location.href,
		        data: {
		            item_kind: "updatePosition",
		            top: this.el.style.top,
		            left: this.el.style.left,
		            id: this.id
		        },
		        success: function( data ) {
		     		console.log( "ajax success" );		
		       }
		    });


	}

	NewVideo.createWithUpload = function(filename, top, left){
		
		var el = document.createElement('div');
		el.classList.add('videoContainerDiv');
		el.style.top = top + "px";
		el.style.left = left + "px";
	
		var url = "./videos/uploaded/"+ filename +"";
		var controls = "controls"
		var videoDiv = document.createElement('video');
		videoDiv.classList.add('videoDiv');
		videoDiv.setAttribute('src', url);
		videoDiv.setAttribute('controls', controls);
		

		var location = "./videos/uploaded/";
		videoDiv.style.width = "400px";
		videoDiv.style.height = "200px";
		

		var topBalk = document.createElement('div');
		topBalk.classList.add('topBalk');
		var deleteKnop = document.createElement('img');
		deleteKnop.src = "./images/deleteItem.png" ;
		deleteKnop.style.width = "16px";
		deleteKnop.style.height = "16px";
		deleteKnop.classList.add('right', 'deleteKnop');
		var dragKnop = document.createElement('div');
		dragKnop.classList.add('right', 'dragKnop');

		topBalk.appendChild(deleteKnop);
		topBalk.appendChild(dragKnop);
		el.appendChild(topBalk);
		el.appendChild(videoDiv);




		return new NewVideo(el);


	};


	
	return NewVideo;
})();


