(function() {
    'use strict';

    angular
        .module('ocrDataAdminApp')
        .controller('RequestWfMySuffixController', RequestWfMySuffixController);

    RequestWfMySuffixController.$inject = ['$scope', '$state', 'RequestWf', 'RequestWfSearch'];

    function RequestWfMySuffixController ($scope, $state, RequestWf, RequestWfSearch) {
        var vm = this;

        vm.requestWfs = [];
        vm.clear = clear;
        vm.search = search;
        vm.loadAll = loadAll;

        loadAll();

        function loadAll() {
            RequestWf.query(function(result) {
                vm.requestWfs = result;
                vm.searchQuery = null;
            });
        }

        function search() {
            if (!vm.searchQuery) {
                return vm.loadAll();
            }
            RequestWfSearch.query({query: vm.searchQuery}, function(result) {
                vm.requestWfs = result;
                vm.currentSearch = vm.searchQuery;
            });
        }

        function clear() {
            vm.searchQuery = null;
            loadAll();
        }    }
})();
