<section class="newProjectPage">

	<header>
		<h1> Emma Verhelst </h1>
	</header>

	<div class="greenbar">
		<p>new project</p>
	</div>

	<form action="index.php?page=createproject" method="post" >
			<div class="formRegel">
				<label for="name">Project Name:</label>
				<input id="name" type="text"></input>
			</div>
			<div class="formRegel">

				<label for="description">Description:</label>
				<textarea name="description" id="description" cols="40" rows="6" requiredvalue="<?php if(!empty($_POST['vraag'])) echo $_POST['vraag'];?>" /></textarea>

			</div>
			<div class="formRegel">
				<label class="memberLabel"for="member1">members:</label>
				<input id="member1" class="member" type="text" placeholder="Voornaam Achternaam"></input>
				<div class="test"></div>
			</div>

			<div class="addMember">
				<img src="images/plus.png" alt="+"/>
				<p> Add member </p>
			</div>
					<div class="formRegel">
				<label for="deadline">deadline:</label>
				<input class="datum <?php if(!empty($errors['deadline'])) echo "red"; ?>"type="date" name="deadline" >
			</div>
		  
		        
		        
		        <input class="createButton" id="createbutton" type="submit" value="CREATE">
		 
			</form>
</section>