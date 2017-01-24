(function() {
    'use strict';

    angular
        .module('ocrDataAdminApp')
        .controller('EdmsResponseMySuffixDeleteController',EdmsResponseMySuffixDeleteController);

    EdmsResponseMySuffixDeleteController.$inject = ['$uibModalInstance', 'entity', 'EdmsResponse'];

    function EdmsResponseMySuffixDeleteController($uibModalInstance, entity, EdmsResponse) {
        var vm = this;

        vm.edmsResponse = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            EdmsResponse.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
