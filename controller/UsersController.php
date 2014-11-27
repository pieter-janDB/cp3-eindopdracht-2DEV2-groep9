<?php

require_once WWW_ROOT . 'controller' . DS . 'Controller.php';
require_once WWW_ROOT . 'dao' . DS . 'UserDAO.php';
require_once WWW_ROOT . 'phpass' .  DS . 'Phpass.php';
require_once WWW_ROOT . 'php-image-resize' . DS . 'ImageResize.php';



class UsersController extends Controller {

  private $userDAO;
  
  

  function __construct() {
    $this->userDAO = new UserDAO();

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
            $_SESSION['user'] = $existing;
            $_SESSION['info'] = 'logged in';
          } else {
            $_SESSION['error'] = 'Unknown email / password';
          }
        } else {
          $_SESSION['error'] = 'Unknown email / password';
        }
      } else {
        $_SESSION['error'] = 'Unknown email / password';
      }
    }
    //sowieso laatste regel want op login.php moet je niet zijn, enkel de functionaliteit voor inloggen uitvoeren
    $this->redirect('index.php?page=profile');
  }

  
  public function logout(){

    $_SESSION['info'] = 'logged out';
    unset($_SESSION['user']);
    $this->redirect('index.php');
  }

  public function register(){

    if(!empty($_POST)){
      $errors = array();
      if(empty($_POST['voornaam'])){
        $errors['voornaam'] = 'vul een voornaam in';
      }     
      if(empty($_POST['achternaam'])){
        $errors['achternaam'] = 'X';
      }
      if(empty($_POST['password'])){
        $errors['password'] = 'Insert password';
      }

      if($_POST['confirm_password'] != $_POST['password']){
        $errors['confirm_password'] = 'Passwords do not match';
      }
      if(empty($_POST['email'])){
        $errors['email'] = 'Insert email';  
      }else{
        $existingUser = $this->userDAO->selectByEmail($_POST['email']);
        if(!empty($existingUser)){
          $errors['email'] = 'Email is al in gebruik';
        }
      }
      
      //als er geen fouten zijn -> password hashen etc
      if(empty($errors)) {
        
        $hasher = new \Phpass\Hash;
        $passwordHash = $hasher->hashPassword($_POST['password']);
        $data = array();

        $data['voornaam'] = $_POST['voornaam'];
        $data['achternaam'] = $_POST['achternaam'];
        $data['password'] = $passwordHash;
        $data['email'] = $_POST['email'];
        
        $sourcefile = $_FILES['image']['tmp_name'];
        $destFile = WWW_ROOT . 'images' . DS . 'profilepics' . DS.$_FILES['image']['name'];
        move_uploaded_file($sourcefile, $destFile);
        $data['profielfoto'] = $_FILES['image']['name'];

        
        $insertedUser = $this->userDAO->insert($data);
        if(!empty($insertedUser)) {
          $_SESSION['info'] = 'Registration successful, logged in';
            $_SESSION['user'] = $insertedUser;
          $this->redirect('index.php?page=profile');
        } else {
          $errors = $this->userDAO->getValidationErrors($data);
        }
      }
      else{

        $_SESSION['error'] = 'Registration fail';
        $this->set('errors', $errors);
      }
      
      

    }
    
  }

  public function profile(){


  }




}



  




