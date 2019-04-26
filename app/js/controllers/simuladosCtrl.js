var fessmodule = angular.module("simulados", ['angular.filter', 'ngAnimate', 'ngTouch']);

fessmodule.controller('simuladosCtrl', function ($scope, $filter) {


    $scope.tab;
    $scope.sTab = function (res) {
        console.log(res)
        console.log($scope.tab)
    
        $scope.tab = res;
    };

    $scope.aTab = function (deger) {
        return $scope.tab === deger;
    };

    $scope.sort = {
        sortingOrder: 'id',
        reverse: false
    };
    $scope.gap = 5;

    $scope.filteredItems = [];
    $scope.groupedItems = [];
    $scope.itemsPerPage = 5;
    $scope.pagedItems = [];
    $scope.currentPage = 0;
    $scope.items = [
        { "id": 1, "nota": "40", "matricula": "745133", "especialidade": "Clinica Medica", "turma": "2008 MEDCURSO SALVADOR - Turma A/2008 SALVADOR", "filial": "Salvador(BA)" },
        { "id": 2, "nota": "42", "matricula": "897413", "especialidade": "Cirurgia Geral", "turma": "2008 MEDCURSO SÃO PAULO - Turma A/2008 SÃO PAULO", "filial": "São Paulo (SP)" },
        { "id": 3, "nota": "40", "matricula": "897413", "especialidade": "Clinica Medica", "turma": "2008 MEDCURSO SALVADOR - Turma A/2008 SALVADOR", "filial": "Salvador(BA)" },
        { "id": 5, "nota": "38", "matricula": "897413", "especialidade": "Cirurgia Geral", "turma": "2008 MEDCURSO SÃO PAULO - Turma A/2008 SÃO PAULO", "filial": "São Paulo (SP)" },
        { "id": 4, "nota": "39", "matricula": "745133", "especialidade": "Clinica Medica", "turma": "2008 MEDCURSO SALVADOR - Turma A/2008 SALVADOR", "filial": "Salvador(BA)" },
        { "id": 6, "nota": "38", "matricula": "745133", "especialidade": "Cirurgia Geral", "turma": "2008 MEDCURSO SÃO PAULO - Turma A/2008 SÃO PAULO", "filial": "São Paulo (SP)" },
        { "id": 7, "nota": "36", "matricula": "897413", "especialidade": "Clinica Medica", "turma": "2008 MEDCURSO SALVADOR - Turma A/2008 SALVADOR", "filial": "Salvador(BA)" },
        { "id": 8, "nota": "35", "matricula": "745133", "especialidade": "Cirurgia Geral", "turma": "2008 MEDCURSO SÃO PAULO - Turma A/2008 SÃO PAULO", "filial": "São Paulo (SP)" },
        { "id": 9, "nota": "34", "matricula": "897413", "especialidade": "Clinica Medica", "turma": "2008 MEDCURSO SALVADOR - Turma A/2008 SALVADOR", "filial": "Salvador(BA)" },
        { "id": 10, "nota": "33", "matricula": "745133", "especialidade": "Cirurgia Geral", "turma": "2008 MEDCURSO SÃO PAULO - Turma A/2008 SÃO PAULO", "filial": "São Paulo (SP)" }
    ];
    $scope.orders = [
        { id: 1, customer: { name: 'John', id: 10 } },
        { id: 2, customer: { name: 'William', id: 20 } },
        { id: 3, customer: { name: 'John', id: 10 } },
        { id: 4, customer: { name: 'William', id: 20 } },
        { id: 5, customer: { name: 'Clive', id: 30 } }
    ];
    $scope.simulados = [
        { "id": 1 },
        { "id": 2 },
        { "id": 3 },
        { "id": 4 },
        { "id": 5 },
        { "id": 6 },
        { "id": 7 },
        { "id": 8 },
        { "id": 9 },
        { "id": 10 }
    ];
    $scope.prova = [
        { "prova": "Objetiva" },
        { "prova": "Final" }
    ];

    $scope.actualSimulado = ""
    $scope.actualProva = ""
    $scope.actualMatricula = ""

    $scope.setActualSimulado = function (item) {
        $scope.actualProva = ""
        $scope.actualSimulado = item
    }

    $scope.setActualProva = function (item) {
        $scope.actualProva = "Prova " + item
    }

    $scope.setMatricula = function (item) {
        $scope.actualMatricula = item
        $scope.matriculaForm.$setPristine();
    }


    $scope.printToCart = function (printSectionId) {
        var innerContents = document.getElementById(printSectionId).innerHTML;
        var popupWinindow = window.open('', '_blank', 'width=800,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
        popupWinindow.document.open();
        popupWinindow.document.write('<html><head><link rel="stylesheet" type="text/css" href="app.css" /></head><body onload="window.print()">' + innerContents + '</html>');
        popupWinindow.document.close();
    }


    $scope.sizefont = function (xPlus) {
        if (document.body.style.fontSize == "") {
            document.body.style.fontSize = "1.0em";
        }
        document.body.style.fontSize = parseFloat(document.body.style.fontSize) + (xPlus * 0.2) + "em";
    };

    var searchMatch = function (haystack, needle) {
        if (!needle) {
            return true;
        }
        return haystack.toLowerCase().indexOf(needle.toLowerCase()) !== -1;

    };

    $scope.search = function () {
        $scope.filteredItems = $filter('filter')($scope.items, function (item) {
            for (var attr in item) {
                if (searchMatch(item[attr], $scope.query))
                    return true;
            }
            return false;
        });
        if ($scope.sort.sortingOrder !== '') {
            $scope.filteredItems = $filter('orderBy')($scope.filteredItems, $scope.sort.sortingOrder, $scope.sort.reverse);
        }
        $scope.currentPage = 0;
        $scope.groupToPages();
    };


    $scope.groupToPages = function () {
        $scope.pagedItems = [];

        for (var i = 0; i < $scope.filteredItems.length; i++) {
            if (i % $scope.itemsPerPage === 0) {
                $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)] = [$scope.filteredItems[i]];
            } else {
                $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)].push($scope.filteredItems[i]);
            }
        }
    };

    $scope.range = function (size, start, end) {
        var ret = [];

        if (size < end) {
            end = size;
            start = size - $scope.gap;
        }
        for (var i = start; i < end; i++) {
            ret.push(i);
        }
        return ret;
    };

    $scope.prevPage = function () {
        if ($scope.currentPage > 0) {
            $scope.currentPage--;
        }
    };

    $scope.nextPage = function () {
        if ($scope.currentPage < $scope.pagedItems.length - 1) {
            $scope.currentPage++;
        }
    };

    $scope.setPage = function () {
        $scope.currentPage = this.n;
    };

    $scope.search();

    $scope.showModal;

});
