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

		

		$user = $this->userDAO->selectById($_SESSION['user']['id']);
		$this->set('user', $user);

		$projects = $this->projectDAO->selectAllByUserId($_SESSION['user']['id']);
		$this->set('projects', $projects);
	}

	public function register(){

		
		if(!empty($_POST)){

			$errors = array();
			
			if(empty($_POST['username'])){

			$errors['username'] = 'Please enter a username.';
			}else{
				
				$existingUser = $this->userDAO->selectByUsername($_POST['username']);

				if(!empty($existingUser)){

					$errors['email'] = 'Email is al in gebruik';
				}
			}
			if(empty($_POST['password'])){
				$errors['password'] = 'Insert password';
			}

			if($_POST['confirm_password'] != $_POST['password']){
				$errors['confirm_password'] = 'Passwords do not match';
			}
			
		}else{

		}
		if(empty($errors)) {

			$hasher = new \Phpass\Hash;
			$passwordHash = $hasher->hashPassword($_POST['password']);
			
			$data = array();
			$data['username'] = $_POST['username'];
			$data['password'] = $passwordHash;


			$insertedUser = $this->userDAO->insert($data);

			if(!empty($insertedUser)) {

				$_SESSION['info'] = 'Registration successful, logged in';
				$_SESSION['user'] = $insertedUser;
				$this->redirect('index.php');
			} else {
				$errors = $this->userDAO->getValidationErrors($data);
			}
		}else{

			$_SESSION['error'] = 'Registration fail';
			$this->set('errors', $errors);
			$this->redirect('index.php?page=reglog');
		}



	}

	public function login(){




		$errors = array();
		if(!empty($_POST)) {
			if(empty($_POST['username'])) {
				$errors['username'] = 'Please enter your username';
			}
			if(empty($_POST['password'])) {
				$errors['password'] = 'Please enter your password';
			}
			if(empty($errors)) {
				$existing = $this->userDAO->selectByUsername($_POST['username']);
				if(!empty($existing)) {
					$hasher = new \Phpass\Hash;
					if ($hasher->checkPassword($_POST['password'], $existing['password'])) {
						$_SESSION['user'] = $existing;
						$_SESSION['info'] = 'logged in';
						$this->redirect('index.php');
					} else {
						$_SESSION['error'] = 'Unknown email / password';
						$this->redirect('index.php');
					}
				} else {
					$_SESSION['error'] = 'Unknown email / password';
				}
			} else {
				$_SESSION['error'] = 'Unknown email / password';
			}
		}
		$this->redirect('index.php');


	}

	public function logout(){
		
		$_SESSION['info'] = 'logged out';
		unset($_SESSION['user']);
		$this->redirect('index.php');
	}

			
	

}


	




