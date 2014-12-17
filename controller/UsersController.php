<?php

require_once WWW_ROOT . 'controller' . DS . 'Controller.php';
require_once WWW_ROOT . 'dao' . DS . 'UserDAO.php';
require_once WWW_ROOT . 'dao' . DS . 'ProjectDAO.php';
require_once WWW_ROOT . 'phpass' .  DS . 'Phpass.php';


class UsersController extends Controller {

	private $userDAO;
	private $projectDAO;
	
	
	function __construct() {

		$this->userDAO = new UserDAO();
		$this->projectDAO = new ProjectDAO();
	}


	public function profile(){

		if(empty($_SESSION['user']['id'])){
			$_SESSION['error'] = 'Fill in your e-mail and password.';
			$this->redirect('index.php');
		}

		$user = $this->userDAO->selectById($_SESSION['user']['id']);
		$this->set('user', $user);

		$projects = $this->projectDAO->selectAllByUserId($_SESSION['user']['id']);
		$this->set('projects', $projects);

	}
	
	public function index() {
		if(!empty($_SESSION['user'])){
			$this->redirect('index.php?page=profile&amp;id=' . $_SESSION['user']['id']);
		}

	}


	public function register() {
        $errors = array();
       	if(!empty($_POST)){

		if(empty($_POST['firstname'])) {
			$errors['firstname'] = 'Please enter your firstname';
		} 
		if(empty($_POST['lastname'])) {
			$errors['lastname'] = 'Please enter your lastname';
		} 

		if(empty($_POST['email'])) {
			$errors['email'] = 'Please enter your email';
		} else {
			$existing = $this->userDAO->selectByEmail($_POST['email']);
			if(!empty($existing)) {
				$errors['email'] = 'Email address is already in use';
			}
		}

		if(empty($_POST['password'])) {
			$errors['password'] = 'Please enter a password';
		}

		if($_POST['confirm_password'] != $_POST['password']) {
			$errors['confirm_password'] = 'Passwords do not match';
		}

		 if(empty($errors)) {
                $hasher = new\Phpass\Hash;
                $passwordHash  = $hasher->hashPassword($_POST['password']);

                $newUser = array(
                	'firstname' => $_POST['firstname'],
                	'lastname' => $_POST['lastname'],
                    'email' => $_POST['email'],
                    'password' => $passwordHash,
                );

                $insertedUser = $this->userDAO->insert($newUser);
                if(!empty($insertedUser)) {
                	$_SESSION['user'] = $insertedUser;
                    $_SESSION['info'] = 'Registration successful';
                    $this->redirect('index.php?page=profile');
                    	$_SESSION['user'] = $insertedUser;
					$this->redirect('index.php?page=profile');

                } else {
                    $_SESSION['error'] = 'Registration failed';
                }
        }
        $this->set('errors',$errors);
}
}
	public function login(){
		$errors = array();
		if(!empty($_POST)) {
			if(empty($_POST['email'])) {
				$errors['email'] = 'Please enter your email';
			}
			if(empty($_POST['password'])) {
				$errors['password'] = 'Please enter your password';
			}
			if(empty($errors)) {
				$existing = $this->userDAO->selectByEmail($_POST['email']);
				if(!empty($existing)) {
					$hasher = new \Phpass\Hash;
					if ($hasher->checkPassword($_POST['password'], $existing['password'])) {
						$_SESSION['info'] = 'Login successful';
						$_SESSION['user'] = $existing;
					} else {
						$_SESSION['error'] = 'Unknown username / password';
					}
				} else {
					$_SESSION['error'] = 'Unknown username / password';
				}
			} else {
				$_SESSION['error'] = 'Unknown username / password';
			}
		}
		$this->redirect('index.php?page=profile');
	}

	public function logout(){
		unset($_SESSION['user']);
		$_SESSION['info'] = 'Logged Out';
		$this->redirect('index.php');
	}

}

	




