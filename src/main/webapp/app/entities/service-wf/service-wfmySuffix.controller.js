(function() {
    'use strict';

    angular
        .module('ocrDataAdminApp')
        .controller('ServiceWfMySuffixController', ServiceWfMySuffixController);

    ServiceWfMySuffixController.$inject = ['$scope', '$state', 'ServiceWf', 'ServiceWfSearch'];

    function ServiceWfMySuffixController ($scope, $state, ServiceWf, ServiceWfSearch) {
        var vm = this;

        vm.serviceWfs = [];
        vm.clear = clear;
        vm.search = search;
        vm.loadAll = loadAll;

        loadAll();

        function loadAll() {
            ServiceWf.query(function(result) {
                vm.serviceWfs = result;
                vm.searchQuery = null;
            });
        }

        function search() {
            if (!vm.searchQuery) {
                return vm.loadAll();
            }
            ServiceWfSearch.query({query: vm.searchQuery}, function(result) {
                vm.serviceWfs = result;
                vm.currentSearch = vm.searchQuery;
            });
        }

        function clear() {
            vm.searchQuery = null;
            loadAll();
        }    }
})();
