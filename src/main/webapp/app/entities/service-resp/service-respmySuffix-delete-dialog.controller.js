(function() {
    'use strict';

    angular
        .module('ocrDataAdminApp')
        .controller('ServiceRespMySuffixDeleteController',ServiceRespMySuffixDeleteController);

    ServiceRespMySuffixDeleteController.$inject = ['$uibModalInstance', 'entity', 'ServiceResp'];

    function ServiceRespMySuffixDeleteController($uibModalInstance, entity, ServiceResp) {
        var vm = this;

        vm.serviceResp = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            ServiceResp.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
