<section class="homepage container">

	<h2><a href="index.php">Whiteboard</a></h2>
    <h3>Online whiteboard and scrum</h3>

	<div id="register">
			<p class="title">Register</p>
    	<form id="regForm" action="index.php?page=register" method="post" enctype="multipart/form-data" >
    		<div class="registerForm">
				<label for="firstname">Firstname:</label>
				<input id="firstname" type="text" name="firstname" placeholder="Firstname" value=""></input>
				 <span>
            	<p class="<?php if(empty($errors['firstname'])) echo ' hidden';?>" data-for="firstname">Please enter your firstname</p>
				</span>
			</div>
			<div class="registerForm">
				<label for="lastname">Lastname:</label>
				<input id="lastname" type="text" name="lastname" placeholder="lastname" value=""></input>
				 <span>
            	<p class="<?php if(empty($errors['lastname'])) echo ' hidden';?>" data-for="lastname">Please enter your lastname</p>
				</span>
			</div>

			<div>

			</div>

			<div class="registerForm">
				<label for="email">E-mail:</label>
				<input id="email" type="email" name="email" placeholder="voorbeeld@gmail.com" value=""></input>
				 <span>
            	<p class="<?php if(empty($errors['email'])) echo ' hidden';?>" data-for="email">Please fill in your email</p>
				</span>
			</div>
				<div class="registerForm">
				<label for="chsPass">Choose password:</label>
				<input id="chsPass" type="password" name="password" value=""></input>
				 <span>
            	<p class="<?php if(empty($errors['password'])) echo ' hidden';?>" data-for="password">Please fill in your password</p>
				</span>
			</div>
			<div class="registerForm">
				<label for="rptPass">Repeat password:</label>
				<input id="rptPass" type="password" name="confirm_password" value=""></input>
				<span>
				<?php if(!empty($errors['confirm_password'])){ ?><p><?= $errors['confirm_password']; ?></p> <?php } ?>
				</span>
			</div>

			<input type="submit" value="REGISTER" id="regstr">

    	</form>

	</div>

</section>
 <script src="js/register.js" type="text/javascript"></script>