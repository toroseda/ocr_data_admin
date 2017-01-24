(function() {
    'use strict';

    angular
        .module('ocrDataAdminApp')
        .controller('SessionWfMySuffixDeleteController',SessionWfMySuffixDeleteController);

    SessionWfMySuffixDeleteController.$inject = ['$uibModalInstance', 'entity', 'SessionWf'];

    function SessionWfMySuffixDeleteController($uibModalInstance, entity, SessionWf) {
        var vm = this;

        vm.sessionWf = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            SessionWf.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
