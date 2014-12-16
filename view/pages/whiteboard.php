
<section class="whiteboardpage" data-projectid="<?php echo $_GET['id']?>" data-userid="<?php echo $_SESSION['user']['id'] ?>">


    <div class="whiteboard">

        <!-- voor elk element in database een element maken op whiteboard.-->

        <div class="sidebar">
        	<ul>
        		<li><img class="createPostit"src="images/post-it.png"></li>

              
                
        		<li><img class="createVideo"src="images/video.png"></li>
                  <form id="uploadFormVideo" action="#" method="post" enctype="multipart/form-data">
                    <input type="file" id="videoInput" class="uploadVideo" name="uploadVideo" accept="video/mp4"></input>  
                    <input id="targetVideo" class="videoSubmit" type="submit" value="upload" />
                </form>
        		<li><img src="images/afbeelding.png"></li>
                <form id="uploadForm" action="#" method="post" enctype="multipart/form-data">
                    <input type="file"class="uploadImage" name="uploadImage"></input>  
                    <input id="target" class="imageSubmit" type="submit" value="upload" />
                </form>
        		<li><img class="grid" id="changeByClick" src="images/grid.png"></li>
        		<li><img class="clearBoard"src="images/delete.png"></li>
        	</ul>
        </div>

        <div class="members">
            <p>Members</p>
            <ul class="menu">
                <?php 
                   
                    forEach($members as $member) {
                        echo "<li>";
                        echo $member['firstname'];
                        echo " ";
                        echo $member['lastname'];
                        echo "</li>";
                    }
                ?>
            <ul/>
        </div>

        <div class="databaseItems">
            <ul>
                <?php 
                    forEach ($items as $item){
                            
                        echo "<li class=\"itemToAdd\" ";
                        echo "data-title=\"" . $item['title'] . "\"";
                        echo "data-id=\"" . $item['id'] . "\"";
                        echo "data-item_kind=\"" . $item['item_kind'] . "\"";
                        echo "data-title=\"" . $item['title'] . "\"";
                        echo "data-message=\"" . $item['message'] . "\"";
                        echo "data-filename=\"" . $item['filename'] . "\"";
                        echo "data-left=\"" . $item['left'] . "\"";
                        echo "data-top=\"" . $item['top'] . "\"";
                        echo ">";
                        echo "</li>";
                
                  
                    }
                ?>
            </ul>
        <div>
  
    </div>

</script>
   
</section>
<script src="js/bean.min.js"></script>
<script src="js/script.dist.js" type="text/javascript"></script>
<script src="js/jquery.min.js" type="text/javascript"></script>
