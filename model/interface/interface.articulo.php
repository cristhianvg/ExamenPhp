<?php

interface IArticulo {

    public function select();

    public function selectById($id);

    public function insert(Articulo $Articulo);

    public function update(Articulo $Articulo);

    public function delete($id);

    public function search($codigo);
}

