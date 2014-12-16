<?php

require_once WWW_ROOT . 'controller' . DS . 'Controller.php';
require_once WWW_ROOT . 'dao' . DS . 'ProjectDAO.php';
require_once WWW_ROOT . 'dao' . DS . 'UserDAO.php';
require_once WWW_ROOT . 'dao' . DS . 'ProjectmemberDAO.php';
require_once WWW_ROOT . 'dao' . DS . 'WhiteboarditemDAO.php';


class PagesController extends Controller {

	private $projectDAO;
	private $userDAO;
	private $projectmemberDAO;
	private $whiteboarditemDAO;
	

	function __construct() {
		$this->projectDAO = new ProjectDAO();
		$this->userDAO = new UserDAO();
		$this->projectmemberDAO = new ProjectmemberDAO();
		$this->whiteboarditemDAO = new WhiteboarditemDAO();
	}

	public function index(){

	}

	public function newproject(){
		if(empty($_SESSION['user']['id'])){
			$_SESSION['error'] = 'you need to login to visit this page.';
			$this->redirect('index.php');
		}

		$user = $this->userDAO->selectById($_SESSION['user']['id']);
		$this->set('user', $user);

		if(!empty($_POST)){
			
			$errors = array();
			if(empty($_POST['name'])){
				$errors['name'] = 'Please fill in a name';
			}else{
				$existing = $this->projectDAO->selectByName($_POST['name']);
				if(!empty($existing)){
					$errors['name'] = 'Name is allready in use';
				}
			}
			if(empty($_POST['description'])){
				$errors['description'] = 'please fill in a description';
			}	
			if(empty($_POST['deadline'])){
				$errors['deadline'] = 'please fill in a deadline';
			}	
			$toAdd = array();

			
			for($i = 2; $i <= count($_POST)-2; $i++){
				$member_nr = $i-1;
				$naam =  ("member" . ($i-1));

				$toAdd[$i-2] = $_POST[$naam];		    	
			
			}
			array_push($toAdd, $_SESSION['user']['email']);

			if(empty($errors)) {

				$data = array();

				$data['moderator_id'] = $_SESSION['user']['id'];
				$data['name'] = $_POST['name'];
				$data['description'] = $_POST['description'];
				$data['deadline'] = $_POST['deadline'];

				$insertedProject = $this->projectDAO->insert($data);


				if(!empty($insertedProject)) {

					//insert members

					$userdata = array();
					$failedToAdd = array();

					$userdata['project_id'] = $insertedProject['id'];
					$userdata['color'] = "#000";
					
					forEach($toAdd as $email => $value){
						if(empty($value)){
							continue;
						}
						$member = $this->userDAO->selectByEmail($value);
			
						if(!empty($member)){

							$userdata['member_id'] = $member['id'];
							$insertedUser = $this->projectmemberDAO->insert($userdata);
						
						}else{
							array_push($failedToAdd, $value);
						}

						
					}

					$_SESSION['info'] = 'Project created';
					$failList = implode(', ', $failedToAdd);
					if(!empty($failList)){
					$_SESSION['error'] = "We were unable to add following user(s) to your project: " . "<span class=\"failList\">" . $failList . "</span>" ." Try to add them again in scrum or whiteboard";
					}
					$this->redirect('index.php?page=profile');
				} 
			}
			else{

				$_SESSION['error'] = 'failed to create project';
				$this->set('errors', $errors);
			}
			
		}		

	}


	public function scrum(){
		if(empty($_SESSION['user']['id'])){
			$_SESSION['error'] = 'you need to login to visit this page.';
			$this->redirect('index.php');

		}
		
	}

	public function whiteboard(){


		if(!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
			
			if(!empty($_FILES['uploadImage'])){

				//images

				$file = $_FILES['uploadImage'];
				$uploaddir = './images/uploaded/';
				move_uploaded_file($file['tmp_name'], $uploaddir .basename($file['name']));
				$this->set('file', $file);
			}else{
					$file = $_FILES['uploadVideo'];
				$uploaddir = './videos/uploaded/';
				move_uploaded_file($file['tmp_name'], $uploaddir .basename($file['name']));
				$this->set('file', $file);

			}
			
			
			if(!empty($_POST)){

					if($_POST['item_kind'] == 'postit'){
						//new postits

						$data = [];

						$data['title'] = $_POST['title'];
						$data['text'] = $_POST['text'];
						$data['project_id'] = $_GET['id'];
						$data['user_id'] = $_SESSION['user']['id'];
						$data['item_kind'] = $_POST['item_kind'];
						$data['top'] = $_POST['top'];
						$data['left'] = $_POST['left'];

						$postit = $this->whiteboarditemDAO->insertPostit($data);
						//print_r laten staan!! is om id door te geven
						print_r($postit['id']);

					}else if($_POST['item_kind'] == 'updatePosition'){
						$data = [];
						$data['left'] = $_POST['left'];
						$data['top'] = $_POST['top'];
						$data['id'] = $_POST['id'];
						$this->whiteboarditemDAO->updatePosition($data);
					
					}else if($_POST['item_kind'] == 'image'){
						//images

						$data = [];
						$data['project_id'] = $_GET['id'];
						$data['user_id'] = $_SESSION['user']['id'];
						$data['item_kind'] = $_POST['item_kind'];
						$data['top'] = $_POST['top'];
						$data['left'] = $_POST['left'];
						$data['filename'] = $_POST['filename'];

						$image = $this->whiteboarditemDAO->insertImage($data);
						//print_r laten staan!! is om id door te geven
						print_r($image['id']);



					}else if($_POST['item_kind'] == 'deleteAll'){
						$this->whiteboarditemDAO->deleteProjectItems($_POST['project_id']);
					
					}else if($_POST['item_kind'] == 'delete'){
						$this->whiteboarditemDAO->deleteItemById($_POST['id']);
					
					}
						else if($_POST['item_kind'] == 'video'){
						//video

						$data = [];
						$data['project_id'] = $_GET['id'];
						$data['user_id'] = $_SESSION['user']['id'];
						$data['item_kind'] = $_POST['item_kind'];
						$data['top'] = $_POST['top'];
						$data['left'] = $_POST['left'];
						$data['filename'] = $_POST['filename'];

						$video = $this->whiteboarditemDAO->insertImage($data);
						//print_r laten staan!! is om id door te geven
						print_r($video['id']);
				}

			}
		}//einde ajax handlers

		

		if(empty($_SESSION['user']['id'])){
			$_SESSION['error'] = 'you need to login to visit this page.';
			$this->redirect('index.php');
		}

		$projects = $this->projectDAO->selectById($_GET['id']);
		$this->set('projects', $projects); 
		
		$members = $this->projectmemberDAO->selectAllMembers($_GET['id']);
		$this->set('members', $members);

		$items = $this->whiteboarditemDAO->getItemsByProject($_GET['id']);
		$this->set('items', $items);
	
	}

	public function addMember(){
		$url = $_SERVER['HTTP_REFERER'];

		if(empty($_GET['id'])){
			$_SESSION['error'] = "unknown project";
			$this->redirect($url);
		}else{
			$project = $this->projectDAO->selectById($_GET['id']);
			if(empty($project)){
				$_SESSION['error'] = "unknown project";
				$this->redirect($url);
			}
		}

		
		if(!empty($_POST['email'])) {

			$member = $this->userDAO->selectByEmail($_POST['email']);

			if(!empty($member)){

				$userdata['project_id'] = $_GET['id'];
				$userdata['color'] = "#000";
				$userdata['member_id'] = $member['id'];
				$insertedUser = $this->projectmemberDAO->insert($userdata);
				if(!empty($insertedUser)){
					$_SESSION['info'] = $insertedUser['email'] . "successfully added";
					$this->redirect($url);
				}else{
					$_SESSION['error'] = "failed to add to database.";
					$this->redirect($url);
				}

			}else{
				$_SESSION['error'] = "unknown email.";
				$this->redirect($url);
			}
		}else{
			$_SESSION['error'] = "please fill in an email to add.";
			$this->redirect($url);
		}

	}	

}



	




