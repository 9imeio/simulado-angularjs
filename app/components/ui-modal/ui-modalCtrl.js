var fessmodule = angular.module("simulados", []);

fessmodule.controller('ctrlModal', function ($scope, $filter) {

    $scope.openModal = function () {
        document.getElementById('myModal').style.display = "block";
    }
    $scope.closeModal = function () {
        document.getElementById('myModal').style.display = "none";
    }
});