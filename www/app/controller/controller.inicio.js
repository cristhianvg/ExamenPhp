angular.module('ExamenPhp').controller('inicioController', ['$scope', 'registroUsuarioService', '$sessionStorage', '$location', 'rolAdmin', '$route', '$timeout', function ($scope, agregarUsuario, $sessionStorage, $location, rolAdmin, $route, $timeout) {

        $scope.dataRegistrarUsuario = {
            cedula: '',
            alias: '',
            contrasena: '',
            rol: ''
        };
        
        $scope.dataRegistrarArticulo = {
            codigo: '',
            nombre: '',
            descripcion: ''
        };
        
        $scope.usuarios=[];
        $scope.articulos=[];
        $scope.edit = {};
        $scope.editArt = {};
        $scope.usuarioRegistrado = false;
        $scope.articuloRegistrado = false;
        $scope.usuarioEditado = false;
        $scope.articuloEditado = false;
        $scope.usuarioEliminado = false;

        $scope.pintarTablaUsu = function () {
            agregarUsuario.obtenerUsu.then(function successCallback(response) {
                switch (response.data.code) {
                    case 200:
                        $scope.usuarios = response.data.datos;
                        break;
                    case 500:
                        $scope.usuarios = [];
                }
            });
        };
        
        $scope.pintarTablaUsu();
        
        $scope.pintarTablaArt = function () {
            agregarUsuario.obtenerArt.then(function successCallback(response) {
                switch (response.data.code) {
                    case 200:
                        $scope.articulos = response.data.datos;
                        break;
                    case 500:
                        $scope.articulos = [];
                }
            });
        };

        
        $scope.pintarTablaArt();
 
        $scope.submitNuevoUsuario = function () {
            agregarUsuario.agregarUsu($scope.dataRegistrarUsuario).then(function successCallback(response) {
                // console.log(response);

                $scope.usuarioRegistrado = false;
                $scope.dataRegistrarUsuario = {};
                if (response.data.code == 500) {
                } else {
                    $scope.usuarioRegistrado = true;
                    $scope.dataRegistrarUsuario = '';
                    $timeout(function () {
                        $('#nuevoUsuario').modal('toggle');
                    }, 700);
                    $timeout(function () {
                        // $route.reload();
                        window.location.reload();
                    }, 1000);
                }
            }, function errorCallback(response) {
                console.error(response);
            });
        };
        
        
        
        $scope.submitNuevoArticulo = function () {
            agregarUsuario.agregarArt($scope.dataRegistrarArticulo).then(function successCallback(response) {
                // console.log(response);

                $scope.articuloRegistrado = false;
                $scope.dataRegistrarArticulo = {};
                if (response.data.code == 500) {
                } else {
                    $scope.articuloRegistrado = true;
                    $scope.dataRegistrarArticulo = '';
                    $timeout(function () {
                        $('#nuevoArticulo').modal('toggle');
                    }, 700);
                    $timeout(function () {
                        // $route.reload();
                        window.location.reload();
                    }, 1000);
                }
            }, function errorCallback(response) {
                console.error(response);
            });
        };
        
        
        
        $scope.editar = function (dato) {
            $scope.edit.id = dato.usu_id;
            $scope.edit.cedula = dato.usu_cedula;
            $scope.edit.alias = dato.usu_alias;
            $scope.edit.rol = dato.usu_rol;
            $('#editarUsuario').modal('toggle');
        };
        
        $scope.submitEditarUsuario = function () {
            agregarUsuario.editarUsu($scope.edit).then(function successCallback(response) {
                $scope.usuarioEditado = false;
                $scope.edit = {};
                if (response.data.code == 500) {
                } else {
                    $scope.usuarioEditado = true;
                    $scope.edit = '';
                    $timeout(function () {
                        $('#editarUsuario').modal('toggle');
                    }, 700);
                    $timeout(function () {
                        // $route.reload();
                        window.location.reload();
                    }, 1000);
                }
            }, function errorCallback(response) {
                console.error(response);
            });
        };
        
        
        
        $scope.editarArt = function (dato) {
            $scope.editArt.id = dato.art_id;
            $scope.editArt.codigo = dato.art_codigo;
            $scope.editArt.nombre = dato.art_nombre;
            $scope.editArt.descripcion = dato.art_descripcion;
            $('#editarArticulo').modal('toggle');
        };
        
        $scope.submitEditarArticulo = function () {
            agregarUsuario.editarArt($scope.editArt).then(function successCallback(response) {
                $scope.articuloEditado = false;
                $scope.editArt = {};
                if (response.data.code == 500) {
                } else {
                    $scope.articuloEditado = true;
                    $scope.editArt = '';
                    $timeout(function () {
                        $('#editarArticulo').modal('toggle');
                    }, 700);
                    $timeout(function () {
                        // $route.reload();
                        //window.location.reload();
                    }, 1000);
                }
            }, function errorCallback(response) {
                console.error(response);
            });
        };
        
        
        $scope.eliminar = function (dato) {
            $('#eliminarUsuario').modal('toggle');
            $scope.alias = dato.usu_alias;
            $scope.ideliminar = dato.usu_id;
        };
        
        $scope.submitEliminarUsuario = function () {
            agregarUsuario.eliminarUsu({id: $scope.ideliminar}).then(function successCallback(response) {
                $scope.usuarioEliminado = false;
                if (response.data.code == 500) {
                } else {
                    $scope.usuarioEliminado = true;
                    $timeout(function () {
                        $('#eliminarUsuario').modal('toggle');
                    }, 700);
                    $timeout(function () {
                        // $route.reload();
                        window.location.reload();
                    }, 1000);
                }
            }, function errorCallback(response) {
                console.error(response);
            });
        };
        
    }]);