<section class="profilepage">
 <div class="container">
  <nav>
                <header>

                    <h1>
                <?php if($_GET['page'] == "profile"){
                    echo "<a href=\"index.php\">";
                    echo "whiteboard";
                    echo "</a>";
                }else if($_GET['page'] == "newproject"){
                     echo "<a href=\"index.php?page=profile\">";
                    echo "Back to profile";
                    echo "</a>";
                    
                }else{
                    echo "other";
                }
                ?>
                    </h1>
                </header>
                <ul>
                    <li class="useremail">Logged in as<?php echo $_SESSION['user']['email'];?></li>
                    <li class="logoutknop"><a href="index.php?page=logout"> log out</a></li>
                </ul>
    </nav>
        <?php
            if(!empty($_SESSION['user']['id'])){
                echo "<p>";
                echo $_SESSION['user']['email'];
                echo "</p>";
                echo "<a href=index.php?page=logout>";
                echo "LOGOUT";
                echo "</a>";
            }
        ?>


            <?php if(!empty($_SESSION['info'])): ?><div class="alert-success"><?php echo $_SESSION['info'];?></div><?php endif; ?>
            <?php if(!empty($_SESSION['error'])): ?><div class="alert-danger"><?php echo $_SESSION['error'];?></div><?php endif; ?>

            <?php echo $content; ?>


        </div>	
	<header>
		<h1> <?php echo $user['firstname']; echo " "; echo $user['lastname'];?></h1>
	</header>


	<div class="greenbar">
		<p>My projects</p>
	</div>

	<div class="projecten">
		<?php 
		forEach($projects as $project):

		?>
		<div class="projectBox">
			<p> <?php echo $project['name'] ?> </p>
			<a href="index.php?page=scrum&amp;id=1">
			<div class="leftProject"><p>scrum</p></div>
			</a>
			<a href="index.php?page=whiteboard&amp;id=1">
			<div class="rightProject"><p>White Board</p></div>
			</a>
		</div>

		<?php endForEach;?>
		
	</div>

	<div class="addproject">
		<a href="index.php?page=newproject">
		<img src="images/plus.png" alt="+"/>
		
			<p> Create new project </p>
		</a>
	</div>
</section>