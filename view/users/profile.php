"<section class="profilepage container">	
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
			<p class="projectName"> <?php echo $project['name'] ?> </p>
			<p class="desc"><?php echo $project['description'] ?></p>
			
			
			
			<p class="whitebrd"><a href="index.php?page=whiteboard&amp;id=<?php echo $project['project_id']; ?>">Open project</a></p>
			
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
