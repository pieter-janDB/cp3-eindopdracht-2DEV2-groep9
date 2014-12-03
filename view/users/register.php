<section class="homepage container">

	<h2><a href="index.php">Whiteboard</a></h2>
    <h3>Online whiteboard and scrum</h3>

	<div id="register">
			<p>Register</p>
    	<form action="index.php?page=register" method="post" enctype="multipart/form-data" >
    		<div class="registerForm">
				<label for="firstname">Firstname:</label>
				<input id="firstname" type="text" name="firstname" placeholder="Firstname" value="<?php if(!empty($_POST['firstname'])) echo $_POST['firstname'];?>"></input>
				<?php if(!empty($errors['firstname'])) echo '</br> <span>' . $errors['firstname'] . '</span>'; ?>
			</div>
			<div class="registerForm">
				<label for="lastname">Lastname:</label>
				<input id="lastname" type="text" name="lastname" placeholder="lastname" value="<?php if(!empty($_POST['lastname'])) echo $_POST['lastname'];?>"></input>
				<?php if(!empty($errors['lastname'])) echo '</br> <span>' . $errors['lastname'] . '</span>'; ?>
			</div>

			<div>

			</div>

			<div class="registerForm">
				<label for="email">E-mail:</label>
				<input id="email" type="email" name="email" placeholder="voorbeeld@gmail.com" value="<?php if(!empty($_POST['email'])) echo $_POST['email'];?>"></input>
				<?php if(!empty($errors['email'])) echo '</br> <span>' . $errors['email'] . '</span>'; ?>
			</div>
				<div class="registerForm">
				<label for="chsPass">Choose password:</label>
				<input id="chsPass" type="password" name="password" value="<?php if(!empty($_POST['password'])) echo $_POST['password'];?>"></input>
				<?php if(!empty($errors['password'])) echo '</br> <span>' . $errors['password'] . '</span>'; ?>
			</div>
			<div class="registerForm">
				<label for="rptPass">Repeat password:</label>
				<input id="rptPass" type="password" name="confirm_password" value="<?php if(!empty($_POST['confirm_password'])) echo $_POST['confirm_password'];?>"></input>
				<?php if(!empty($errors['confirm_password'])) echo '</br> <span>' . $errors['confirm_password'] . '</span>'; ?>
			</div>

			<input type="submit" value="REGISTER" id="regstr">

    	</form>

	</div>

</section>