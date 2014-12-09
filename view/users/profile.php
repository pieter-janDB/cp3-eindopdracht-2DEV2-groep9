<section class="profilepage container">	
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
			<a href="index.php?page=whiteboard&amp;id=<?php echo $project['project_id']; ?>">
			<div class="rightProject"><p>Whiteboard</p></div>
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
