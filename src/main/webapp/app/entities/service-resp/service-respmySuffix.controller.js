(function() {
    'use strict';

    angular
        .module('ocrDataAdminApp')
        .controller('ServiceRespMySuffixController', ServiceRespMySuffixController);

    ServiceRespMySuffixController.$inject = ['$scope', '$state', 'DataUtils', 'ServiceResp', 'ServiceRespSearch'];

    function ServiceRespMySuffixController ($scope, $state, DataUtils, ServiceResp, ServiceRespSearch) {
        var vm = this;

        vm.serviceResps = [];
        vm.openFile = DataUtils.openFile;
        vm.byteSize = DataUtils.byteSize;
        vm.clear = clear;
        vm.search = search;
        vm.loadAll = loadAll;

        loadAll();

        function loadAll() {
            ServiceResp.query(function(result) {
                vm.serviceResps = result;
                vm.searchQuery = null;
            });
        }

        function search() {
            if (!vm.searchQuery) {
                return vm.loadAll();
            }
            ServiceRespSearch.query({query: vm.searchQuery}, function(result) {
                vm.serviceResps = result;
                vm.currentSearch = vm.searchQuery;
            });
        }

        function clear() {
            vm.searchQuery = null;
            loadAll();
        }    }
})();
