(function() {
    'use strict';

    angular
        .module('ocrDataAdminApp')
        .controller('RequestWfMySuffixDeleteController',RequestWfMySuffixDeleteController);

    RequestWfMySuffixDeleteController.$inject = ['$uibModalInstance', 'entity', 'RequestWf'];

    function RequestWfMySuffixDeleteController($uibModalInstance, entity, RequestWf) {
        var vm = this;

        vm.requestWf = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            RequestWf.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
