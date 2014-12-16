module.exports = (function(){
	
	var whiteboard = document.querySelector('.whiteboard');

	function Postit(el, title, text) {
		this.el = el;

		this.title = title;
		this.text = text;

		this.deleteKnop = el.querySelector('.deleteKnop');
		this.deleteKnop.addEventListener('click', this.deleteClickHandler.bind(this));


		this._mouseDownHandler = this.mouseDownHandler.bind(this);
		this._mouseMoveHandler = this.mouseMoveHandler.bind(this);
		this._mouseUpHandler = this.mouseUpHandler.bind(this);


		this.dragKnop = el.querySelector('.dragKnop');
		this.dragKnop.addEventListener('mousedown', this._mouseDownHandler);

		//later nog this.deleteknop / resize / edit?""

		this._mouseDownResize = this.mouseDownResize.bind(this);
		this._mouseMoveResize = this.mouseMoveResize.bind(this);
		this._mouseUpResize = this.mouseUpResize.bind(this);


		this.resizeKnop = el.querySelector('.resizeKnop');
		this.resizeKnop.addEventListener('mousedown', this._mouseDownResize);


	}
	
	Postit.prototype.deleteClickHandler = function(event) {
		
		bean.fire(this, "delete");

	};


	Postit.prototype.mouseDownHandler = function( event ){
		
			this.parentOffset = event.currentTarget.parentNode.offsetWidth - 52;

			this.offsetX = this.parentOffset + event.offsetX;
			this.offsetY = event.offsetY;

			window.addEventListener( 'mousemove', this._mouseMoveHandler);
			window.addEventListener( 'mouseup', this._mouseUpHandler);
	}

	Postit.prototype.mouseMoveHandler = function( event ){
		

		this.el.style.left = event.x-this.offsetX + 'px';
		this.el.style.top = event.y-this.offsetY + 'px';
		
	}

	Postit.prototype.mouseUpHandler = function( event ){
		window.removeEventListener( 'mousemove', this._mouseMoveHandler);
		window.removeEventListener( 'mouseup', this._mouseUpHandler);
		
		$.ajax({
		        type: 'post',
		        url: window.location.href,
		        data: {
		            item_kind: "updatePosition",
		            top: event.y-this.offsetY,
		            left: event.x-this.offsetX,
		            id: this.id
		        },
		        success: function( data ) {
		     		console.log( "ajax success" );		
		       }
		    });
	}


	Postit.prototype.mouseDownResize = function( event ){

		console.log(event.currentTarget.parentNode.offsetWidth);
			
			this.startX = event.clientX;
			this.startY = event.clientY;

			this.startWidth = event.currentTarget.parentNode.parentNode.offsetWidth;
			this.startHeight = event.currentTarget.parentNode.parentNode.offsetHeight;

			this.parentOffset = 0;

			this.offsetX = this.parentOffset + event.offsetX;
			this.offsetY = event.offsetY;
			

			window.addEventListener( 'mousemove', this._mouseMoveResize);
			window.addEventListener( 'mouseup', this._mouseUpResize);
	}




	Postit.prototype.mouseMoveResize = function( event ){


		this.stopX = event.clientX;
		this.stopY = event.clientY;

		this.el.style.left = event.x-this.offsetX + 'px';
		this.el.style.top = event.y - this.offsetY + 'px';
	
		
		this.el.style.width = this.startWidth - this.stopX + this.startX + "px";
		this.el.style.height = this.startHeight - this.stopY + this.startY + "px";
		
		
	}

	Postit.prototype.mouseUpResize = function( event ){

		window.removeEventListener( 'mousemove', this._mouseMoveResize);
		window.removeEventListener( 'mouseup', this._mouseUpResize);
		this.stopX = event.clientX;
		this.stopY = event.clientY;

		var width = this.startWidth - this.stopX + this.startX + "px";
		var height = this.startHeight - this.stopY + this.startY + "px";

		this.el.style.width = width;
		this.el.style.height = height;
		

		console.log(this.el);
		
		console.log(this.el.querySelector('.imageDiv'));
		
		
		$.ajax({
		        type: 'post',
		        url: window.location.href,
		        data: {
		            item_kind: "updatePositionAndDimension",
		            top: this.el.style.top,
		            left: this.el.style.left,
		            width: width,
		            height: height,
		            id: this.id
		        },
		        success: function( data ) {
		     		console.log( "ajax success" );		
		       }
		    });


	}


	Postit.createWithText = function(title, text, top,left, width, height){
		
		var el = document.createElement('div');
		el.classList.add('postit');
		el.style.top = top + "px";
		el.style.left = left + "px";
		if(width != 0 ){
			el.style.width = width + "px";
		}else{
			el.style.minWidth = "100px";
		}
		if(height != 0 ){
			el.style.height = height + "px";
		}else{
			el.style.minHeight = "100px";
		}
		
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
		
		var dragKnop = document.createElement('div');
		dragKnop.classList.add('right', 'dragKnop');

		var resizeKnop = document.createElement('div');
		resizeKnop.classList.add('left', 'resizeKnop');

		topBalk.appendChild(deleteKnop);
		topBalk.appendChild(dragKnop);
		topBalk.appendChild(resizeKnop);


		var titleText = document.createTextNode(title);
		var bodyText = document.createTextNode(text);
		
		postitTitle.appendChild(titleText);
		postitBody.appendChild(bodyText);

		el.appendChild(topBalk);
		el.appendChild(postitTitle);
		el.appendChild(postitBody);

		return new Postit(el, title, text);

	}
	
	return Postit;
	
})();