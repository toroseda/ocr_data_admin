(function() {
    'use strict';

    angular
        .module('ocrDataAdminApp')
        .controller('EdmsDownloadMySuffixDeleteController',EdmsDownloadMySuffixDeleteController);

    EdmsDownloadMySuffixDeleteController.$inject = ['$uibModalInstance', 'entity', 'EdmsDownload'];

    function EdmsDownloadMySuffixDeleteController($uibModalInstance, entity, EdmsDownload) {
        var vm = this;

        vm.edmsDownload = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            EdmsDownload.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
