<?php

require_once WWW_ROOT . 'dao' . DS . 'DAO.php';

class UserDAO extends DAO {

  public function selectAll(){

		$sql = "SELECT * FROM `users`";
		$stmt = $this->pdo->prepare($sql);
		$stmt->execute();
		return $stmt->fetchAll(PDO::FETCH_ASSOC);

  }

  public function selectById($id){

		$sql = "SELECT *
						FROM `users`
						WHERE `id` = :id";
		$stmt = $this->pdo->prepare($sql);
	  $stmt->bindValue(':id', $id);
		$stmt->execute();
		return $stmt->fetch(PDO::FETCH_ASSOC);

  }

	public function getValidationErrors($data){

		$errors = array();

		if(empty($data['nickname'])) {
			$errors['nickname'] = "Please fill in an email";
		}else if(strlen($data['nickname']) < 2){
			$errors['nickname'] = "at least 2 characters required";			
		}
		if(empty($data['subject'])) {
			$errors['subject'] = "Please fill in a subject";
		}else if(strlen($data['subject']) < 2){
			$errors['subject'] = "at least 2 characters required";			
		}
		if(empty($data['message'])) {
			$errors['message'] = "Please fill in a message";
		}else if(str_word_count($data['message']) < 2){
			$errors['message'] = "min 2 words required";
		}

		

		return $errors;

	}

  public function insert($data){

 		$errors = $this->getValidationErrors($data);

  	if(empty($errors)){

	    $sql = 'INSERT INTO users(nickname, subject, message)
	    				VALUES(:nickname, :subject, :message)';

	    $stmt = $this->pdo->prepare($sql);

	    $stmt->bindValue(':nickname', $data['nickname']);
	    $stmt->bindValue(':subject', $data['subject']);
	    $stmt->bindValue(':message', $data['message']);

			if($stmt->execute()) {
				$insertedId = $this->pdo->lastInsertId();
				return $this->selectById($insertedId);
			}

  	}

  	return false;

  }

}
