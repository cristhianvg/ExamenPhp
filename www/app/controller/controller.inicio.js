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
        
        $scope.usuarioRegistrado = false;
        $scope.articuloRegistrado = false;

        $scope.pintarTabla = function () {
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

        $scope.pintarTabla();
 
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
                        //window.location.reload();
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
                        //window.location.reload();
                    }, 1000);
                }
            }, function errorCallback(response) {
                console.error(response);
            });
        };
        
        
        
        
    }]);