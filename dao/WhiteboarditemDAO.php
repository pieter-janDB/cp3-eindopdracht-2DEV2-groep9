<?php
require_once WWW_ROOT .'dao' . DS .'DAO.php';
class WhiteboarditemDAO extends DAO {

	public function selectAll(){
		$sql = "SELECT * FROM `whiteboarditems` ";
		$stmt = $this->pdo->prepare($sql);
		$stmt->execute();
		return $stmt->fetchAll(PDO::FETCH_ASSOC);
	}
	 
	public function selectById($id){
		$sql = "SELECT * FROM `whiteboarditems` WHERE `id` = :id";
		$stmt = $this->pdo->prepare($sql);
		$stmt->bindValue(':id', $id);
		$stmt->execute();
		return $stmt->fetch(PDO::FETCH_ASSOC);
	}


	public function insertPostit($data){


		$sql = "INSERT INTO `whiteboarditems` (`title`, `message`, `project_id`, `user_id`, `item_kind`, `top`, `left`)
			VALUES (:title, :message, :project_id, :user_id, :item_kind, :top, :left)";
		$stmt = $this->pdo->prepare($sql);
		$stmt->bindValue(':title', $data['title']);
		$stmt->bindValue(':message', $data['text']);
		$stmt->bindValue(':project_id', $data['project_id']);
		$stmt->bindValue(':user_id', $data['user_id']);
		$stmt->bindValue(':item_kind', $data['item_kind']);
		$stmt->bindValue(':top', $data['top']);
		$stmt->bindValue(':left', $data['left']);

		if($stmt->execute()) {
			
			$lastInsertId=$this->pdo->lastInsertId();
			return $this->selectById($lastInsertId);
		}else{
			return false;
		}
	}

	public function insertImage($data){


		$sql = "INSERT INTO `whiteboarditems` (`project_id`, `user_id`, `item_kind`, `top`, `left`, `filename`)
			VALUES (:project_id, :user_id, :item_kind, :top, :left, :filename)";
		$stmt = $this->pdo->prepare($sql);
		$stmt->bindValue(':project_id', $data['project_id']);
		$stmt->bindValue(':user_id', $data['user_id']);
		$stmt->bindValue(':item_kind', $data['item_kind']);
		$stmt->bindValue(':top', $data['top']);
		$stmt->bindValue(':left', $data['left']);
		$stmt->bindValue(':filename', $data['filename']);

		if($stmt->execute()) {
			
			$lastInsertId=$this->pdo->lastInsertId();
			return $this->selectById($lastInsertId);
		}else{
			return false;
		}
	}
	
	
	

}
