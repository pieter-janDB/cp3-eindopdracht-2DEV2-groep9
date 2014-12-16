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

	Postit.createWithText = function(title, text, top,left){
		
		var el = document.createElement('div');
		el.classList.add('postit');
		el.style.top = top + "px";
		el.style.left = left + "px";
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

		topBalk.appendChild(deleteKnop);
		topBalk.appendChild(dragKnop);




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