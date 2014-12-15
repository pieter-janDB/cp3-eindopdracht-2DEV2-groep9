module.exports = (function(){
	
	var whiteboard = document.querySelector('.whiteboard');

	function NewImage(el) {
		this.el = el;
		
		//later nog this.deleteknop / resize / edit?

		this.deleteKnop = el.querySelector('.deleteKnop');
		this.deleteKnop.addEventListener('click', this.deleteClickHandler.bind(this));


		this._mouseDownHandler = this.mouseDownHandler.bind(this);
		this._mouseMoveHandler = this.mouseMoveHandler.bind(this);
		this._mouseUpHandler = this.mouseUpHandler.bind(this);


		this.dragKnop = el.querySelector('.dragKnop');
		this.dragKnop.addEventListener('mousedown', this._mouseDownHandler);

		//later nog this.deleteknop / resize / edit?""

	}
	
	NewImage.prototype.deleteClickHandler = function(event) {
		
		bean.fire(this, "delete");

	};


	NewImage.prototype.mouseDownHandler = function( event ){
			this.offsetX = 145+ event.offsetX;
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

	NewImage.createWithUpload = function(filename){
		
		var el = document.createElement('div');
		el.classList.add('imageContainerDiv');

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
		var dragKnop = document.createElement('img');
		dragKnop.src = "./images/resize.png";
		dragKnop.style.width = "16px";
		dragKnop.style.height = "16px";
		dragKnop.classList.add('right', 'dragKnop');

		topBalk.appendChild(deleteKnop);
		topBalk.appendChild(dragKnop);
		el.appendChild(topBalk);
		el.appendChild(imageDiv);




		return new NewImage(el);


	};


	
	return NewImage;
})();


