<section class="whiteboard container">

    <div class="sidebar">
    	<ul>
    		<li><img src="images/text.png"></li>
    		<li><img src="images/post-it.png"></li>
    		<li><img src="images/video.png"></li>
    		<li><img src="images/afbeelding.png"></li>
    		<li id=><a href="#" onClick="changeBG();"><img id="changeByClick"src="images/grid.png"></a></li>
    		<li><img src="images/delete.png"></li>
    	</ul>
    </div>

    <div class="members">
        <p onclick="showMenu()">Members:</p>
        <ul id="menu" style="display:none" onmouseout="hideMenu()">
            <li>lala</li>
            <li>llaa</li>
        <ul/>
    </div>

    
<script type="text/javascript">

var action= 1;

// members dropdown
 function showMenu(){
   document.getElementById("menu").style.display="block";
 }
 function hideMenu(){
   document.getElementById("menu").style.display="none";
 }

 // grid

 function changeBG(){
    if(action == 1){
       grid(); 
       document.getElementById("changeByClick").src = "images/solid-icon.png";
       action = 2;
    }else{
       solid();
       action = 1;
    }

 }
 function solid(){
    document.body.style.backgroundImage="url(images/solid.jpg)";
    document.getElementById("changeByClick").src = "images/grid.png";

}

 function grid(){
    document.body.style.backgroundImage="url(images/gridBG.jpg)";
}

</script


</section>