<section class="homepage">

    <h2><a href="index.php?page=index">Whiteboard</a></h2>
    <h3>Online whiteboard and scrum</h3>

    <div id="login">
    	<p>Login</p>
    	<form action="index.php?page=login" method="post" >
    		<div class="loginForm">
    			<ul>
				<li><label for="email">E-mail:</label></li>
				<li><input id="email" type="text" name="email" value="<?php if(!empty($_POST['email'])) echo $_POST['email'];?>"></input></li>
    			<?php if(!empty($errors['email'])) echo '</br> <span>' . $errors['email'] . '</span>'; ?>

                </ul>
			</div>
				<div class="loginForm">
    			<ul>
				<li><label for="pass">Password:</label></li>
				<li><input id="password" type="password" name="password" value="<?php if(!empty($_POST['password'])) echo $_POST['password'];?>"></input></li>
    			<?php if(!empty($errors['password'])) echo '<span>' . $errors['password'] . '</span>'; ?>
                </ul>
			</div>

			<input type="submit" value="LOG IN" id="inloggen">

    	</form>
    </div>
    <p class="register">New here? <a href="index.php?page=register">Register!</a></p>

</section>