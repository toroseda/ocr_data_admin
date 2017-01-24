(function() {
    'use strict';

    angular
        .module('ocrDataAdminApp')
        .controller('OcrSessionMySuffixDeleteController',OcrSessionMySuffixDeleteController);

    OcrSessionMySuffixDeleteController.$inject = ['$uibModalInstance', 'entity', 'OcrSession'];

    function OcrSessionMySuffixDeleteController($uibModalInstance, entity, OcrSession) {
        var vm = this;

        vm.ocrSession = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            OcrSession.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
