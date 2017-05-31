<?php class eliminarArticulo extends controllerExtended {

  public function main(\request $request) {
    try {
      $this->loadTablearticulo();

      $articuloDAO = new articuloDAOExt($this->getConfig());
      $respuesta1 = $articuloDAO->delete($request->getParam('id'));
 
      $respuesta2 = array(
          'code' => ($respuesta1 > 0) ? 200 : 500,
          'datos' => $respuesta1
      );

      $this->setParam('rsp', $respuesta2);
      $this->setView('imprimirJson');
    } catch (Exception $exc) {
      echo $exc->getMessage();
    }
  }

  private function loadTablearticulo() {
    require $this->getConfig()->getPath() . 'model/table/table.articulo.php';
    require $this->getConfig()->getPath() . 'model/interface/interface.articulo.php';
    require $this->getConfig()->getPath() . 'model/DAO/class.articuloDAO.php';
    require $this->getConfig()->getPath() . 'model/extended/class.articuloDAOExt.php';
  }

}