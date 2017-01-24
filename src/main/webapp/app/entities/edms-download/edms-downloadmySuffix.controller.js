(function() {
    'use strict';

    angular
        .module('ocrDataAdminApp')
        .controller('EdmsDownloadMySuffixController', EdmsDownloadMySuffixController);

    EdmsDownloadMySuffixController.$inject = ['$scope', '$state', 'EdmsDownload', 'EdmsDownloadSearch'];

    function EdmsDownloadMySuffixController ($scope, $state, EdmsDownload, EdmsDownloadSearch) {
        var vm = this;

        vm.edmsDownloads = [];
        vm.clear = clear;
        vm.search = search;
        vm.loadAll = loadAll;

        loadAll();

        function loadAll() {
            EdmsDownload.query(function(result) {
                vm.edmsDownloads = result;
                vm.searchQuery = null;
            });
        }

        function search() {
            if (!vm.searchQuery) {
                return vm.loadAll();
            }
            EdmsDownloadSearch.query({query: vm.searchQuery}, function(result) {
                vm.edmsDownloads = result;
                vm.currentSearch = vm.searchQuery;
            });
        }

        function clear() {
            vm.searchQuery = null;
            loadAll();
        }    }
})();
