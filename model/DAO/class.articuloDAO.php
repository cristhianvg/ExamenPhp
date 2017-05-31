<?php

class articuloDAO extends dataSource implements Iarticulo {

  public function delete($id, $logico = true) {
	if ($logico === true) {
	  $sql = 'UPDATE articulo SET art_deleted_at = now() WHERE art_id = :id';
	  $params = array(
		  ':id' => $id
	  );
	  return $this->execute($sql, $params);
	} else if ($logico === false) {
	  $sql = 'DELETE FROM articulo WHERE art_id = :id AND art_deleted_at IS NULL';
	  $params = array(
		  ':id' => (integer) $id
	  );
	  return $this->execute($sql, $params);
	}
  }

  public function insert(\articulo $articulo) {
	$sql = 'INSERT INTO articulo (art_codigo, art_nombre, art_descripcion) VALUES (:codigo, :nombre, :descripcion)';
	$params = array(
		':codigo' => $articulo->getCodigo(),
		':nombre' => $articulo->getNombre(),
		':descripcion' => $articulo->getDescripcion()
	);
	return $this->execute($sql, $params);
  }

  public function search($codigo) {
	$sql = 'SELECT art_id, art_codigo, art_nombre, art_descripcion FROM articulo WHERE art_codigo = :codigo';
	$params = array(
		':codigo' => $codigo
	);
	return $this->query($sql, $params);
  }

  public function select() {
	$sql = 'SELECT art_id, art_codigo, art_nombre, art_descripcion, art_created_at FROM articulo WHERE art_deleted_at IS NULL';
	return $this->query($sql);
  }

  public function selectById($id) {
	$sql = 'SELECT art_id, art_codigo, art_nombre, art_descripcion, FROM articulo WHERE art_id = :id';
	$params = array(
		':id' => $id
	);
	return $this->query($sql, $params);
  }

  public function update(\articulo $articulo) {
	$sql = 'UPDATE articulo SET art_codigo = :codigo, art_nombre = :nombre, art_descripcion = :descripcion WHERE art_id = :id';
	$params = array(
		':codigo' => $articulo->getCodigo(),
		':nombre' => $articulo->getNombre(),
		':descripcion' => $articulo->getDescripcion(),
		':id' => $articulo->getId()
	);
	return $this->execute($sql, $params);
  }

}
