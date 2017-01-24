(function() {
    'use strict';

    angular
        .module('ocrDataAdminApp')
        .controller('EdmsRequestMySuffixDeleteController',EdmsRequestMySuffixDeleteController);

    EdmsRequestMySuffixDeleteController.$inject = ['$uibModalInstance', 'entity', 'EdmsRequest'];

    function EdmsRequestMySuffixDeleteController($uibModalInstance, entity, EdmsRequest) {
        var vm = this;

        vm.edmsRequest = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            EdmsRequest.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
