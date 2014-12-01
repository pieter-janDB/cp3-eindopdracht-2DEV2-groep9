<?php
require_once WWW_ROOT .'dao' . DS .'DAO.php';


class UserDAO extends DAO {

	public function selectAll(){
		$sql = "SELECT * FROM `users` ";
		$stmt = $this->pdo->prepare($sql);
		$stmt->execute();
		return $stmt->fetchAll(PDO::FETCH_ASSOC);
	}
	 

	public function selectById($id){
		$sql = "SELECT * FROM `users` WHERE `id` = :id";
		$stmt = $this->pdo->prepare($sql);
		$stmt->bindValue(':id', $id);
		$stmt->execute();
		return $stmt->fetch(PDO::FETCH_ASSOC);
	}

	public function selectByEmail($email){
		$sql = "SELECT * FROM `users` WHERE `email` = :email";
		$stmt = $this->pdo->prepare($sql);
		$stmt->bindValue(':email', $email);
		$stmt->execute();
		return $stmt->fetch(PDO::FETCH_ASSOC);
	}


	public function insert($data){
		$errors = $this->getValidationErrors($data);
		
		if (empty($errors)) {
			$sql = "INSERT INTO `users` (`firstname`, `lastname`, `email`, `password` )
				VALUES (:firstname, :lastname, :email, :password)";
			$stmt = $this->pdo->prepare($sql);
			$stmt->bindValue(':firstname', $data['firstname']);
			$stmt->bindValue(':lastname', $data['lastname']);
			$stmt->bindValue(':email', $data['email']);
			$stmt->bindValue(':password', $data['password']);
			if($stmt->execute()) {
				$lastInsertId=$this->pdo->lastInsertId();
				return $this->selectById($lastInsertId);
			}
			
		}
		return false;

	}


	public function selectByName($voornaam, $achternaam){

		$sql = "SELECT * FROM `users` WHERE `firstname` = :voornaam AND `lastname` = :achternaam";
		$stmt = $this->pdo->prepare($sql);
		$stmt->bindValue(':voornaam', $voornaam);
		$stmt->bindValue(':achternaam', $achternaam);
		$stmt->execute();

		return $stmt->fetch(PDO::FETCH_ASSOC);
	}
	


	
	public function getValidationErrors($data) {
		$errors = array();
		if(empty($data['firstname'])){
			$errors['firstname'] = 'please fill in your firstname';
		}
		if(empty($data['lastname'])){
			$errors['lastname'] = 'please fill in your firstname';
		}
		if(empty($data['email'])){
			$errors['email'] = 'please fill in your email';
		}
		if(empty($data['password'])){
			$errors['password'] = 'please fill in your password';
		}

				
		
		return $errors;
	}
}
