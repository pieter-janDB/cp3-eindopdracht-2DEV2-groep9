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
		$sql = "INSERT INTO `whiteboarditems` (`title`, `message`, `project_id`, `user_id`, `item_kind`, `top`, `left`, `width`, `height`)
			VALUES (:title, :message, :project_id, :user_id, :item_kind, :top, :left, :width, :height)";
		$stmt = $this->pdo->prepare($sql);
		$stmt->bindValue(':title', $data['title']);
		$stmt->bindValue(':message', $data['text']);
		$stmt->bindValue(':project_id', $data['project_id']);
		$stmt->bindValue(':user_id', $data['user_id']);
		$stmt->bindValue(':item_kind', $data['item_kind']);
		$stmt->bindValue(':top', $data['top']);
		$stmt->bindValue(':left', $data['left']);
		$stmt->bindValue(':width', $data['width']);
		$stmt->bindValue(':height', $data['height']);

		if($stmt->execute()) {
			
			$lastInsertId=$this->pdo->lastInsertId();
			return $this->selectById($lastInsertId);
		}else{
			return false;
		}
	}

	public function updatePosition($data){
		$sql = "UPDATE `whiteboarditems` 	SET `left` = :left, `top`= :top WHERE `whiteboarditems`.`id` = :id";
		$stmt = $this->pdo->prepare($sql);
		$stmt->bindValue(':id', $data['id']);
		$stmt->bindValue(':left', $data['left']);
		$stmt->bindValue(':top', $data['top']);
		if($stmt->execute()) {
			$lastInsertId=$this->pdo->lastInsertId();
			return $this->selectById($lastInsertId);
		}
	}

	public function updatePositionAndDimension($data){
		$sql = "UPDATE `whiteboarditems` 	SET `left` = :left, `top`= :top, `width`= :width, `height`= :height WHERE `whiteboarditems`.`id` = :id";
		$stmt = $this->pdo->prepare($sql);
		$stmt->bindValue(':id', $data['id']);
		$stmt->bindValue(':left', $data['left']);
		$stmt->bindValue(':top', $data['top']);
		$stmt->bindValue(':width', $data['width']);
		$stmt->bindValue(':height', $data['height']);

		if($stmt->execute()) {
			$lastInsertId=$this->pdo->lastInsertId();
			return $this->selectById($lastInsertId);
		}
	}

	public function deleteProjectItems($project_id){
		$sql = "DELETE FROM `whiteboarditems` WHERE `project_id` = :project_id";
		$stmt = $this->pdo->prepare($sql);
		$stmt->bindValue(':project_id', $project_id);
		$stmt->execute();
	}

	public function deleteItemById($id){
		$sql = "DELETE FROM `whiteboarditems` WHERE `id` = :id";
		$stmt = $this->pdo->prepare($sql);
		$stmt->bindValue(':id', $id);
		$stmt->execute();
	}

	public function getItemsByProject($id){
		$sql = "SELECT * FROM `whiteboarditems` WHERE `project_id` = :id";
		$stmt = $this->pdo->prepare($sql);
		$stmt->bindValue(':id', $id);
		$stmt->execute();
		return $stmt->fetchAll(PDO::FETCH_ASSOC);

	}

	public function insertImage($data){
		$sql = "INSERT INTO `whiteboarditems` (`project_id`, `user_id`, `item_kind`, `top`, `left`, `width`, `height`, `filename`)
			VALUES (:project_id, :user_id, :item_kind, :top, :left, :width, :height, :filename)";
		$stmt = $this->pdo->prepare($sql);
		$stmt->bindValue(':project_id', $data['project_id']);
		$stmt->bindValue(':user_id', $data['user_id']);
		$stmt->bindValue(':item_kind', $data['item_kind']);
		$stmt->bindValue(':top', $data['top']);
		$stmt->bindValue(':left', $data['left']);
		$stmt->bindValue(':width', $data['width']);
		$stmt->bindValue(':height', $data['height']);
		$stmt->bindValue(':filename', $data['filename']);

		if($stmt->execute()) {
			
			$lastInsertId=$this->pdo->lastInsertId();
			return $this->selectById($lastInsertId);
		}else{
			return false;
		}
	}

		public function insertVideo($data){
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
