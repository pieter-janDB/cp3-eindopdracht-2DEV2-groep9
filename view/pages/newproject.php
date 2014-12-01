<section class="newProjectPage">

	<header>
		<h1> Emma Verhelst </h1>
	</header>

	<div class="greenbar">
		<p>new project</p>
	</div>

	<form action="index.php?page=newproject" method="post" >
			<div class="formRegel">
				<label for="name">Project Name:</label>
				<input id="name" name="name" type="text"></input>
                    <?php if(!empty($errors['name'])) echo "<p class=\"validationerror\">" . $errors['name'] . " </p>"; ?>
			</div>
			<div class="formRegel">

				<label for="description">Description:</label>
				<textarea name="description" id="description" cols="40" rows="6" requiredvalue="<?php if(!empty($_POST['vraag'])) echo $_POST['vraag'];?>" /></textarea>
                    <?php if(!empty($errors['description'])) echo "<p class=\"validationerror\">" . $errors['description'] . " </p>"; ?>

			</div>
			<div class="formRegel">
				<label class="memberLabel"for="member1">members:</label>
				<input id="member1" name="member1" class="member" type="text" placeholder="Voornaam Achternaam"></input>
				
			

			</div>

			<div class="addMember">
				<img src="images/plus.png" alt="+"/>
				<p> Add member </p>
			</div>
					<div class="formRegel">
				<label name="deadline" for="deadline">deadline:</label>
				<input class="datum <?php if(!empty($errors['deadline'])) echo "red"; ?>"type="date" name="deadline" >
				<?php if(!empty($errors['deadline'])) echo "<p class=\"validationerror\">" . $errors['deadline'] . " </p>"; ?>
			</div>
		  
		        
		        
		        <input class="createButton" id="createbutton" type="submit" value="CREATE">
		 
			</form>

				<?php 
		
			
			var_dump($test);
			var_dump($fail);
			var_dump($id);

			?>

</section>