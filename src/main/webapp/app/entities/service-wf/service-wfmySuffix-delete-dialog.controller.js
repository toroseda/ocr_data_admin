(function() {
    'use strict';

    angular
        .module('ocrDataAdminApp')
        .controller('ServiceWfMySuffixDeleteController',ServiceWfMySuffixDeleteController);

    ServiceWfMySuffixDeleteController.$inject = ['$uibModalInstance', 'entity', 'ServiceWf'];

    function ServiceWfMySuffixDeleteController($uibModalInstance, entity, ServiceWf) {
        var vm = this;

        vm.serviceWf = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            ServiceWf.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
