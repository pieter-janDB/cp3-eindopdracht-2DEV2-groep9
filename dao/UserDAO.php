<?php
require_once WWW_ROOT .'dao' . DS .'DAO.php';
class UserDAO extends DAO {

	public function selectAll(){
		$sql = "SELECT * FROM `users` ";
		$stmt = $this->pdo->prepare($sql);
		$stmt->execute();
		return $stmt->fetchAll(PDO::FETCH_ASSOC);
	}
	 

	public function selectByUsername($username){
		$sql = "SELECT * FROM `users` WHERE `username` = :username";
		$stmt = $this->pdo->prepare($sql);
		$stmt->bindValue(':username', $username);
		$stmt->execute();
		return $stmt->fetch(PDO::FETCH_ASSOC);
	}

	public function selectById($id){
		$sql = "SELECT * FROM `users` WHERE `id` = :id";
		$stmt = $this->pdo->prepare($sql);
		$stmt->bindValue(':id', $id);
		$stmt->execute();
		return $stmt->fetch(PDO::FETCH_ASSOC);
	}


	public function insert($data){
		$errors = $this->getValidationErrors($data);
		if (empty($errors)) {
			$sql = "INSERT INTO `users` (`username`, `password`)
				VALUES (:username, :password)";
			$stmt = $this->pdo->prepare($sql);
			$stmt->bindValue(':username', $data['username']);
			$stmt->bindValue(':password', $data['password']);

			if($stmt->execute()) {
				$lastInsertId=$this->pdo->lastInsertId();
				return $this->selectById($lastInsertId);
			}
			
		}
		return false;
	}
	

	
	public function getValidationErrors($data) {
		$errors = array();
		if(empty($data['username'])){
			$errors['username'] = 'insert username please.';
		}
		if(empty($data['password'])){
			$errors['password'] = 'vul een paswoord in';
		}

				
		
		return $errors;
	}
}
