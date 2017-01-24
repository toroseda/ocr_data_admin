(function() {
    'use strict';

    angular
        .module('ocrDataAdminApp')
        .controller('OcrSessionMySuffixController', OcrSessionMySuffixController);

    OcrSessionMySuffixController.$inject = ['$scope', '$state', 'OcrSession', 'OcrSessionSearch'];

    function OcrSessionMySuffixController ($scope, $state, OcrSession, OcrSessionSearch) {
        var vm = this;

        vm.ocrSessions = [];
        vm.clear = clear;
        vm.search = search;
        vm.loadAll = loadAll;

        loadAll();

        function loadAll() {
            OcrSession.query(function(result) {
                vm.ocrSessions = result;
                vm.searchQuery = null;
            });
        }

        function search() {
            if (!vm.searchQuery) {
                return vm.loadAll();
            }
            OcrSessionSearch.query({query: vm.searchQuery}, function(result) {
                vm.ocrSessions = result;
                vm.currentSearch = vm.searchQuery;
            });
        }

        function clear() {
            vm.searchQuery = null;
            loadAll();
        }    }
})();
