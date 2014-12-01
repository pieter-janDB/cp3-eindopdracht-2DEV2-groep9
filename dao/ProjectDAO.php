<?php
require_once WWW_ROOT .'dao' . DS .'DAO.php';
class ProjectDAO extends DAO {

	public function selectAll(){
		$sql = "SELECT * FROM `projects` ";
		$stmt = $this->pdo->prepare($sql);
		$stmt->execute();
		return $stmt->fetchAll(PDO::FETCH_ASSOC);
	}
	 
	public function selectById($id){
		$sql = "SELECT * FROM `projects` WHERE `id` = :id";
		$stmt = $this->pdo->prepare($sql);
		$stmt->bindValue(':id', $id);
		$stmt->execute();
		return $stmt->fetch(PDO::FETCH_ASSOC);
	}

	public function selectByName($name){
		$sql = "SELECT * FROM `projects` WHERE `name` = :name";
		$stmt = $this->pdo->prepare($sql);
		$stmt->bindValue(':name', $name);
		$stmt->execute();
		return $stmt->fetch(PDO::FETCH_ASSOC);
	}

	public function selectAllByUserId($id){
		$sql = "SELECT * FROM `projects` LEFT JOIN `projectmembers` ON `projectmembers`.`project_id` = `projects`.`id` WHERE `projectmembers`.`member_id` = $id";

		$stmt = $this->pdo->prepare($sql);
		$stmt->execute();
		return $stmt->fetchAll(PDO::FETCH_ASSOC);

	}



	public function insert($data){
		$errors = $this->getValidationErrors($data);

		if (empty($errors)) {
			$sql = "INSERT INTO `projects` (`name`, `description`, `deadline`, `moderator_id`)
				VALUES (:name, :description, :deadline, :moderator_id)";
			$stmt = $this->pdo->prepare($sql);
			$stmt->bindValue(':name', $data['name']);
			$stmt->bindValue(':description', $data['description']);
			$stmt->bindValue(':deadline', $data['deadline']);
			$stmt->bindValue(':moderator_id', $data['moderator_id']);

			if($stmt->execute()) {
				
				$lastInsertId=$this->pdo->lastInsertId();
				return $this->selectById($lastInsertId);
			}
	
		}
		return false;
	}
	

	
	public function getValidationErrors($data) {
		$errors = array();
		if(empty($data['name'])){
			$errors['name'] = 'Insert name please.';
		}
		if(empty($data['description'])){
			$errors['description'] = 'Insert a description please.';
		}
		if(empty($data['deadline'])){
			$errors['deadline'] = 'Choose a deadline please.';
		}

				
		
		return $errors;
	}
}
