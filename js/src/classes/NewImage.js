module.exports = (function(){
	
	var whiteboard = document.querySelector('.whiteboard');

	function NewImage(el) {
		this.el = el;

		this.deleteKnop = el.querySelector('.deleteKnop');
		this.deleteKnop.addEventListener('click', this.deleteClickHandler.bind(this));

		this._mouseDownHandler = this.mouseDownHandler.bind(this);
		this._mouseMoveHandler = this.mouseMoveHandler.bind(this);
		this._mouseUpHandler = this.mouseUpHandler.bind(this);

		this.dragKnop = el.querySelector('.dragKnop');
		this.dragKnop.addEventListener('mousedown', this._mouseDownHandler);


	}
	
	NewImage.prototype.deleteClickHandler = function(event) {
		
		bean.fire(this, "delete");

	};


	NewImage.prototype.mouseDownHandler = function( event ){
		console.log(event.currentTarget.parentNode.offsetWidth);
			this.parentOffset = event.currentTarget.parentNode.offsetWidth - 52;

			this.offsetX = this.parentOffset + event.offsetX;
			this.offsetY = event.offsetY;

			window.addEventListener( 'mousemove', this._mouseMoveHandler);
			window.addEventListener( 'mouseup', this._mouseUpHandler);
	}

	NewImage.prototype.mouseMoveHandler = function( event ){
		
		this.el.style.left = event.x-this.offsetX + 'px';
		this.el.style.top = event.y-this.offsetY + 'px';
		
	}

	NewImage.prototype.mouseUpHandler = function( event ){
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

	NewImage.createWithUpload = function(filename, top, left){
		
		var el = document.createElement('div');
		el.classList.add('imageContainerDiv');
		el.style.top = top + "px";
		el.style.left = left + "px";
	
		var imageDiv = document.createElement('div');
		imageDiv.classList.add('imageDiv');

		var location = "./images/uploaded/";
		imageDiv.style.width = "200px";
		imageDiv.style.height = "200px";
		imageDiv.style.backgroundImage = "url(" + location + filename + ")";

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
		el.appendChild(imageDiv);

		return new NewImage(el);

	};

	return NewImage;
	
})();


