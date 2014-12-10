!function t(e,i,o){function n(a,s){if(!i[a]){if(!e[a]){var d="function"==typeof require&&require;if(!s&&d)return d(a,!0);if(r)return r(a,!0);var c=new Error("Cannot find module '"+a+"'");throw c.code="MODULE_NOT_FOUND",c}var u=i[a]={exports:{}};e[a][0].call(u.exports,function(t){var i=e[a][1][t];return n(i?i:t)},u,u.exports,t,e,i,o)}return i[a].exports}for(var r="function"==typeof require&&require,a=0;a<o.length;a++)n(o[a]);return n}({1:[function(t){!function(){function e(){new i}var i=t("./classes/Whiteboard");e()}()},{"./classes/Whiteboard":5}],2:[function(t,e){e.exports=function(){function t(t){this.el=t}document.querySelector(".whiteboard");return t.createWithUpload=function(e){var i=document.createElement("img");return i.classList.add("Image"),i.src=e,new t(i)},t}()},{}],3:[function(t,e){e.exports=function(){function t(t){this.el=t}document.querySelector(".whiteboard");return t.createWithText=function(e,i){var o=document.createElement("div");o.classList.add("postit");var n=document.createElement("h2");n.classList.add("postitTitle");var r=document.createElement("p");r.classList.add("postitText");var a=document.createTextNode(e),s=document.createTextNode(i);return n.appendChild(a),r.appendChild(s),o.appendChild(n),o.appendChild(r),new t(o)},t}()},{}],4:[function(t,e){e.exports=function(){function t(){this.el=this.createForm(),e.appendChild(this.el),this.postitTitle=this.el.querySelector(".postitTitleInput"),this.postitText=this.el.querySelector(".postitTextInput"),this.inputButton=this.el.querySelector(".postitSubmitButton"),this.inputButton.addEventListener("click",this.addPostit.bind(this))}var e=document.querySelector(".whiteboard");return t.prototype.addPostit=function(t){t.preventDefault();var e=document.querySelector(".postitTitleInput").value,i=document.querySelector(".postitTextInput").value;/^\s*$/.test(e)&&/^\s*$/.test(i)?this.deleteForm():(this.deleteForm(),bean.fire(this,"create-postit",[this.postitTitle.value,this.postitText.value]))},t.prototype.deleteForm=function(){this.postitFormDiv.parentElement.removeChild(this.postitFormDiv)},t.prototype.createForm=function(){this.postitFormDiv=document.createElement("div"),this.postitFormDiv.classList.add("postit");var t=document.createElement("form"),e=document.createElement("div");e.classList.add("postitInputDiv");var i=document.createElement("input");i.type="text",i.placeholder="Title",i.classList.add("postitTitleInput");var o=document.createElement("textarea");o.classList.add("postitTextInput"),o.placeholder="Content";var n=document.createElement("input");return n.type="submit",n.classList.add("postitSubmitButton"),e.appendChild(i),t.appendChild(e),t.appendChild(o),t.appendChild(n),this.postitFormDiv.appendChild(t),this.postitFormDiv},t}()},{}],5:[function(t,e){e.exports=function(){function e(){this.whiteboard=document.querySelector(".whiteboard"),this.elementDiv=document.createElement("div"),this.postits=new Array,this.uploadedImages=new Array,this.createPostitButton=document.querySelector(".createPostit"),this.createPostitButton.addEventListener("click",this.addPostitForm.bind(this)),this.createImageButton=document.querySelector("input[name=uploadImage]"),this.createImageButton.addEventListener("change",this.addImageElement.bind(this)),this.imageSubmit=document.querySelector(".imageSubmit"),this.createMembersDropdownButton=document.querySelector(".members"),this.createMembersDropdownButton.addEventListener("click",this.showDropdown),this.changeBackgroundButton=document.querySelector(".grid"),this.changeBackgroundButton.addEventListener("click",this.changeBG.bind(this)),this.clearBoardButton=document.querySelector(".clearBoard"),this.clearBoardButton.addEventListener("click",this.clearBoard.bind(this))}function i(t){event.preventDefault();var e=new FormData;e.append("photos[]",t,t.name),e.append("project_id","1"),e.append("user_id","1"),e.append("item_kind","picture"),e.append("url",t.name);var i=new XMLHttpRequest;i.open("POST","index.php?page=whiteboard",!0),i.onload=function(){200===i.status?console.log("file uploaded"):alert("An error occurred!")},i.send(e),this.createImageHandler(t.name)}var o=t("./PostitForm.js"),n=t("./Postit.js"),r=t("./NewImage.js"),a=1,s=1;return e.prototype.addPostitForm=function(){this.postitForm=new o,bean.on(this.postitForm,"create-postit",this.createPostItHandler.bind(this))},e.prototype.createPostItHandler=function(t,e){this.postit=new n.createWithText(t,e),this.postits.push(this.postit),this.whiteboard.appendChild(this.postit.el)},e.prototype.addImageElement=function(){var t;this.createImageButton.files.length>0&&(t=this.createImageButton.files[0],0===t.type.search("image")&&this.imageSubmit.addEventListener("click",i.bind(this,t)))},e.prototype.createImageHandler=function(t){this.uploadedImage=new r.createWithUpload(t),this.uploadedImages.push(this.uploadedImage),this.whiteboard.appendChild(this.uploadedImage.el)},e.prototype.showDropdown=function(){1===a?(document.querySelector(".menu").style.display="block",a=2):(document.querySelector(".menu").style.display="none",a=1)},e.prototype.changeBG=function(){1===s?(this.whiteboard.style.backgroundImage="url(images/gridBG.jpg)",document.getElementById("changeByClick").src="images/solid-icon.png",s=2):(this.whiteboard.style.backgroundImage="",document.getElementById("changeByClick").src="images/grid.png",s=1)},e.prototype.clearBoard=function(){if(1==confirm("Are you sure you want to clear the whole project?")){{var t=($(this).parent().parent().attr("id"),"id"+id);$(this).parent().parent()}$.ajax({type:"POST",url:"index.php?page=whiteboard",data:t})}},e}()},{"./NewImage.js":2,"./Postit.js":3,"./PostitForm.js":4}]},{},[1]);
//# sourceMappingURL=script.dist.js.map