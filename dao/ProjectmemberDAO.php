<?php
require_once WWW_ROOT .'dao' . DS .'DAO.php';
class ProjectmemberDAO extends DAO {

	public function selectAll(){
		$sql = "SELECT * FROM `projectmembers` ";
		$stmt = $this->pdo->prepare($sql);
		$stmt->execute();
		return $stmt->fetchAll(PDO::FETCH_ASSOC);
	}
	 
	public function selectById($id){
		$sql = "SELECT * FROM `projectmembers` WHERE `id` = :id";
		$stmt = $this->pdo->prepare($sql);
		$stmt->bindValue(':id', $id);
		$stmt->execute();
		return $stmt->fetch(PDO::FETCH_ASSOC);
	}


	public function insert($data){
		$errors = $this->getValidationErrors($data);

		if (empty($errors)) {


			$sql = "INSERT INTO `projectmembers` (`project_id`, `member_id`, `color`)
				VALUES (:project_id, :member_id, :color)";
			$stmt = $this->pdo->prepare($sql);
			$stmt->bindValue(':project_id', $data['project_id']);
			$stmt->bindValue(':member_id', $data['member_id']);
			$stmt->bindValue(':color', $data['color']);

			if($stmt->execute()) {
				
				$lastInsertId=$this->pdo->lastInsertId();
				return $this->selectById($lastInsertId);
			}
		}
		
		return false;
	}
	
	public function selectAllMembers($projectid){
		$sql = "SELECT `users`.`firstname`, `users`.`lastname` FROM `projectmembers`LEFT JOIN `users` ON `Projectmembers`.`member_id` = `users`.`id` WHERE `project_id` = :projectid";
		$stmt = $this->pdo->prepare($sql);
		$stmt->bindValue(':projectid', $projectid);
		$stmt->execute();
		return $stmt->fetchAll(PDO::FETCH_ASSOC);

	}

	
	public function getValidationErrors($data) {
		$errors = array();
	/*	if(empty($data['name'])){
			$errors['name'] = 'Insert name please.';
		}
		if(empty($data['description'])){
			$errors['description'] = 'Insert a description please.';
		}
		if(empty($data['deadline'])){
			$errors['deadline'] = 'Choose a deadline please.';
		}

	*/			
		
		return $errors;
	}
}
