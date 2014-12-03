<section class="homepage container">

    <h2><a href="index.php?page=index">Whiteboard</a></h2>
    <h3>Online whiteboard and scrum</h3>
</script>
    <div id="login">
    	<p>Login</p>
    	<form name="loginForm"action="index.php?page=login" method="post" >
    		<div class="loginForm">
    		  <ul>
                    <li><label for="email">Email:</label></li>
                    <li><input type="email" id="email" name="email" placeholder="voorbeeld@gmail.com" value="<?php if(!empty($_POST['email'])) echo $_POST['email'];?>"></li>
                    <?php if(!empty($errors['email'])) echo '<span>' . $errors['email'] . '</span>'; ?>
                </ul>
			</div>
				<div class="loginForm">
    		      <ul>
                    <li><label for="password">Password:</label></li>
                    <li><input type="password" id="password" name="password"value="<?php if(!empty($_POST['password'])) echo $_POST['password'];?>"></li>
                    <?php if(!empty($errors['password'])) echo '<span>' . $errors['password'] . '</span>'; ?>
                </ul>
			</div>

			<input type="submit" value="LOG IN" id="inloggen">

    	</form>
    </div>
    <p class="register">New here? <a href="index.php?page=register">Register!</a></p>

</section>