module.exports = (function(){
	//var ..... = require('./.....');

	var PostitForm = require('./PostitForm.js');
	var Postit = require('./Postit.js');
	var NewImage = require('./NewImage.js');
	var NewVideo = require('./NewVideo.js');

	
    var actionDropdown= 1, actionBg = 1;


	function Whiteboard() {

		this.whiteboard = document.querySelector('.whiteboard');
		this.whiteboardPage = document.querySelector('.whiteboardpage');
		this.project_id = this.whiteboardPage.getAttribute('data-projectid');
		this.user_id = this.whiteboardPage.getAttribute('data-userid');

		this.postits = new Array();
		this.uploadedImages = new Array();
		this.uploadedVideos = new Array();


		//items ophalen uit database en plaatsen...
		this.itemsToAdd = [];
		this.itemsToAdd = this.whiteboard.querySelectorAll('.itemToAdd');
		
		

		[].forEach.call(this.itemsToAdd, function(itemToAdd){

			switch(itemToAdd.getAttribute('data-item_kind')) {
			    case "postit":
			        console.log('postit');
			        this.createPostitFromDatabase(itemToAdd);
			        break;
			    case "image":
			        console.log('image');
			         this.createImageFromDatabase(itemToAdd);
			        break;
			    case "video":
			        console.log('video');
			         this.createVideoFromDatabase(itemToAdd);
			        break;
				}

			

		}, this);


		// gaat later element binnen krijgen welke objecten geplaatst zullen worden
		//dan foreach element in database met postit een posti it maken
		//voor elke foto , foto plaatsen etc etc

		//elk object in een array invoeren en bijhouden zoals bij todoApp oef.


		//postit

		this.createPostitButton = document.querySelector('.createPostit');
		this.createPostitButton.addEventListener('click', this.addPostitForm.bind(this));


		//image

		this.createImageButton = document.querySelector('input[name=uploadImage]');
		this.createImageButton.addEventListener('change', this.addImageElement.bind(this));
		this.imageSubmit = document.querySelector('.imageSubmit');


		//video
		this.createVideoButton = document.querySelector('input[name=uploadVideo]');
		this.createVideoButton.addEventListener('change', this.addVideoElement.bind(this));
		this.videoSubmit = document.querySelector('.videoSubmit');

		


		// dropdown members
		this.createMembersDropdownButton = document.querySelector('.members');
		this.createMembersDropdownButton.addEventListener('click', this.showDropdown);

		// change bg
		this.changeBackgroundButton = document.querySelector('.grid');
		this.changeBackgroundButton.addEventListener('click', this.changeBG.bind(this));
		
		//clear board

		this.clearBoardButton = document.querySelector('.clearBoard');
		this.clearBoardButton.addEventListener('click', this.clearBoard.bind(this));

		


	}

	// postit
	Whiteboard.prototype.addPostitForm = function(){
		var postitForm = new PostitForm();
		bean.on(postitForm, 'create-postit', this.createPostItHandler.bind(this));

	};

	Whiteboard.prototype.createPostItHandler = function(title, bodyText){
		 var postit = new Postit.createWithText(title, bodyText, 200, 150);
		 this.postits.push(postit);
		 if(this.whiteboard.appendChild(postit.el)){

		    $.ajax({
		        type: 'post',
		        url: window.location.href,
		        data: {
		            title: title,
		            text: bodyText,
		            item_kind: "postit",
		            top: "200px",
		            left: "150px"
		        },
		        success: function( data ) {
		        	console.log(data);
					var segments = data.split("<!DOCTYPE html>");
					//geef postit id van in database
					postit.id = segments[0];			
		       }
		    });

		 };
		 
		bean.on(postit, 'delete', this.deletePostitHandler.bind(this, postit));
		 
	};

	Whiteboard.prototype.deletePostitHandler = function(postit){
		//remove from array
		var postitIndex = this.postits.indexOf(postit);
		if (postitIndex > -1) {
		    this.postits.splice(postitIndex, 1);
		}
		//remove from screen
		this.whiteboard.removeChild(postit.el);
		
		//remove from database


		$.ajax({
	        type: 'post',
	        url: window.location.href,
	        data: {
	            item_kind: "delete",
	            id: postit.id
	        },
	        success: function( data ) {		
	        		console.log('ajax success');
	       }
	    });


	}


	Whiteboard.prototype.createPostitFromDatabase = function(itemToAdd){

		 var postit = new Postit.createWithText(itemToAdd.getAttribute('data-title'), itemToAdd.getAttribute('data-message'), itemToAdd.getAttribute('data-top'), itemToAdd.getAttribute('data-left'));
		 this.postits.push(postit);
		 this.whiteboard.appendChild(postit.el);
		 postit.id = itemToAdd.getAttribute('data-id');
		 bean.on(postit, 'delete', this.deletePostitHandler.bind(this, postit));

	}




	//image

	Whiteboard.prototype.addImageElement = function(e){
		var file, reader;
		//check of gebruiker bestand heeft gekozen
		if(this.createImageButton.files.length > 0){

			file = this.createImageButton.files['0'];

			//check of het foto is kijken of type image is
			if(file.type.search('image') === 0){

				this._imageUploadHandler = this.imageUploadHandler.bind(this, file, this);
				this.imageSubmit.addEventListener('click' ,this._imageUploadHandler);
				
				};			
			}	
	};

	Whiteboard.prototype.imageUploadHandler = function(file, thisX){

		//ik gebruik thisX on this mee te geven in ajax en om daarna in de ajax succes te kunnen meegeven
		// aan de andere functie, bestaat hiervoor betere methode? zoja graag vermelding bij feedback.

        event.preventDefault(); // Totally stop stuff happening
        // Create a formdata object and add the files
		var data = new FormData( document.getElementById("uploadForm") );	
		
        $.ajax({
            url: window.location.href,
            type: 'POST',
            data: data,
            cache: false,
            processData: false, // Don't process the files
            contentType: false, // Set content type to false as jQuery will tell the server its a query string request
            success: function(data, textStatus, jqXHR)
            {
 				console.log( 'ajax success');
 				thisX.uploadImageToDatabase(file, thisX);

 				// hoe kan ik hier this aan meegeven ???? 
 				
            },
            error: function(jqXHR, textStatus, errorThrown)
            {	
            	console.log('ERRORS: ' + textStatus);
            }
        });
        this.imageSubmit.removeEventListener( 'click', this._imageUploadHandler);
		this.createImageButton.value = '';
	}

	Whiteboard.prototype.uploadImageToDatabase = function(file, thisX){

		$.ajax({
	        type: 'post',
	        url: window.location.href,
	        data: {
	            item_kind: "image",
	            top: "200px",
	            left: "150px",
	            filename: file.name
	        },
	        success: function( data ) {
	        	console.log(thisX);
	        	var imageDiv = new NewImage.createWithUpload(file.name, 200, 150);
	        	var segments = data.split("<!DOCTYPE html>");
				//geef image id van in database
				imageDiv.id = segments[0];	
				thisX.whiteboard.appendChild(imageDiv.el);
				thisX.uploadedImages.push(imageDiv);
				bean.on(imageDiv, 'delete', thisX.deleteImageHandler.bind(this, imageDiv, thisX));
				console.log(thisX.uploadedImages);
	        		
	       }
	    });
	}

	Whiteboard.prototype.deleteImageHandler = function(imageDiv, thisX){
		//remove from array
		var imageIndex = thisX.uploadedImages.indexOf(imageDiv);
		if (imageIndex > -1) {
		    thisX.uploadedImages.splice(imageIndex, 1);
		}

		//remove from screen
		document.querySelector('.whiteboard').removeChild(imageDiv.el);

		//remove from database
		$.ajax({
	        type: 'post',
	        url: window.location.href,
	        data: {
	            item_kind: "delete",
	            id: imageDiv.id
	        },
	        success: function( data ) {		
	        		console.log('ajax success');
	       }
	    });		

	};



	Whiteboard.prototype.createImageFromDatabase = function(itemToAdd){

		var imageDiv = new NewImage.createWithUpload(itemToAdd.getAttribute('data-filename'), itemToAdd.getAttribute('data-top'), itemToAdd.getAttribute('data-left'));		 
		this.uploadedImages.push(imageDiv);
		this.whiteboard.appendChild(imageDiv.el);
		imageDiv.id = itemToAdd.getAttribute('data-id');
		bean.on(imageDiv, 'delete', this.deleteImageHandler.bind(this, imageDiv, this));

	}




	//video

	Whiteboard.prototype.addVideoElement = function(e){
		var file, reader;
		//check of gebruiker bestand heeft gekozen
		if(this.createVideoButton.files.length > 0){

			file = this.createVideoButton.files['0'];

			//check of het foto is kijken of type image is
			if(file.type.search('video/mp4') === 0){

				this._videoUploadHandler = this.videoUploadHandler.bind(this, file, this);
				this.videoSubmit.addEventListener('click' ,this._videoUploadHandler);
				
				};			
			}	
	};

	Whiteboard.prototype.videoUploadHandler = function(file, thisX){

        event.preventDefault(); // Totally stop stuff happening
        // Create a formdata object and add the files
		var data = new FormData( document.getElementById("uploadFormVideo") );	
		
        $.ajax({
            url: window.location.href,
            type: 'POST',
            data: data,
            cache: false,
            processData: false, // Don't process the files
            contentType: false, // Set content type to false as jQuery will tell the server its a query string request
            success: function(data, textStatus, jqXHR)
            {
 				console.log( 'ajax success');
 				thisX.uploadVideoToDatabase(file, thisX);

 				// hoe kan ik hier this aan meegeven ???? 
 				
            },
            error: function(jqXHR, textStatus, errorThrown)
            {	
            	console.log('ERRORS: ' + textStatus);
            }
        });
        this.videoSubmit.removeEventListener( 'click', this._videoUploadHandler);
		this.createVideoButton.value = '';
	}
	Whiteboard.prototype.uploadVideoToDatabase = function(file, thisX){

		$.ajax({
	        type: 'post',
	        url: window.location.href,
	        data: {
	            item_kind: "video",
	            top: "200px",
	            left: "150px",
	            filename: file.name
	        },
	        success: function( data ) {
	        	console.log(thisX);
	        	var videoDiv = new NewVideo.createWithUpload(file.name, 200, 150);
	        	var segments = data.split("<!DOCTYPE html>");
				//geef video id van in database
				videoDiv.id = segments[0];	
				thisX.whiteboard.appendChild(videoDiv.el);
				thisX.uploadedVideos.push(videoDiv);
				bean.on(videoDiv, 'delete', thisX.deleteVideoHandler.bind(this, videoDiv, thisX));
				console.log(thisX.uploadedVideos);
	        		
	       }
	    });
	}

	Whiteboard.prototype.deleteVideoHandler = function(videoDiv, thisX){
		//remove from array
		var videoIndex = thisX.uploadedVideos.indexOf(videoDiv);
		if (videoIndex > -1) {
		    thisX.uploadedVideos.splice(videoIndex, 1);
		}

		//remove from screen
		document.querySelector('.whiteboard').removeChild(videoDiv.el);

		//remove from database
		$.ajax({
	        type: 'post',
	        url: window.location.href,
	        data: {
	            item_kind: "delete",
	            id: videoDiv.id
	        },
	        success: function( data ) {		
	        		console.log('ajax success');
	       }
	    });		

	};

	Whiteboard.prototype.createVideoFromDatabase = function(itemToAdd){
		var videoDiv = new NewVideo.createWithUpload(itemToAdd.getAttribute('data-filename'), itemToAdd.getAttribute('data-top'), itemToAdd.getAttribute('data-left'));	 
		this.uploadedVideos.push(videoDiv);
		this.whiteboard.appendChild(videoDiv.el);
		videoDiv.id = itemToAdd.getAttribute('data-id');
		bean.on(videoDiv, 'delete', this.deleteVideoHandler.bind(this, videoDiv, this));

	}


	 // members dropdown


    Whiteboard.prototype.showDropdown = function(e){
        if(actionDropdown === 1){
           document.querySelector('.menu').style.display="block";
           actionDropdown = 2;
        }else{
           document.querySelector('.menu').style.display="none";
           actionDropdown = 1;
        }
     };
     // grid

     Whiteboard.prototype.changeBG = function(){

        if(actionBg === 1){
           this.whiteboard.style.backgroundImage="url(images/gridBG.jpg)";
           document.getElementById("changeByClick").src = "images/solid-icon.png";
           actionBg = 2;
        }else{
			this.whiteboard.style.backgroundImage="";
			document.getElementById("changeByClick").src = "images/grid.png";
           actionBg = 1;
        }

     };

     //clear board

     Whiteboard.prototype.clearBoard = function(){
     	var project_id = this.project_id;
	    if (confirm("Are you sure you want to clear the whole project?") == true) {
	       	
	    	//DELETE ALL ENTRIES IN WHITEBOARDITEMS WHERE PROJECT_ID = project id 
			$.ajax({
		        type: 'post',
		        url: window.location.href,
		        data: {
		            item_kind: "deleteAll",
		            project_id: project_id,
		
		        },
		        success: function( data ) {		
		        		console.log('ajax success');
		        		location.reload();
		       }
	    	});

	    	// maak veld leeg

	    } else {

	        return;
	    }

     }

	return Whiteboard;
})();