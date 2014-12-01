<?php

require_once WWW_ROOT . 'controller' . DS . 'Controller.php';
require_once WWW_ROOT . 'dao' . DS . 'ProjectDAO.php';
require_once WWW_ROOT . 'dao' . DS . 'UserDAO.php';
require_once WWW_ROOT . 'dao' . DS . 'ProjectmemberDAO.php';



class PagesController extends Controller {

	private $projectDAO;
	private $userDAO;
	private $projectmemberDAO;
	

	function __construct() {
		$this->projectDAO = new ProjectDAO();
		$this->userDAO = new UserDAO();
		$this->projectmemberDAO = new ProjectmemberDAO();

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
			array_push($toAdd, $_SESSION['user']['firstname'] . " " . $_SESSION['user']['lastname']);
		
			foreach($_POST as $memberX => $naam) {
				//memberX = member1/2/3/4
				//Naam = naam persoon
			    if(strpos($memberX, 'member') === 0) {
			    	$toAdd[$memberX] = $naam;
			    	if(empty($toAdd[$memberX])){
			    		unset($toAdd[$memberX]);
			    	}
			    }
			}
					

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
					
					forEach($toAdd as $member => $value){
						$namen = array();
						$namen = explode(" ", $value);

						if(!empty($namen[2])){
							$namen[1] = $namen[1] . " " . $namen[2];
						}

						$member = $this->userDAO->selectByName($namen[0], $namen[1]);
						
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
		if(empty($_SESSION['user']['id'])){
			$_SESSION['error'] = 'you need to login to visit this page.';
			$this->redirect('index.php');
		}
		
	}

	

	
	

}



	




