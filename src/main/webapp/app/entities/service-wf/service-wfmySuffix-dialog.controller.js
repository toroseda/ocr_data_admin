(function() {
    'use strict';

    angular
        .module('ocrDataAdminApp')
        .controller('ServiceWfMySuffixDialogController', ServiceWfMySuffixDialogController);

    ServiceWfMySuffixDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'ServiceWf'];

    function ServiceWfMySuffixDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, ServiceWf) {
        var vm = this;

        vm.serviceWf = entity;
        vm.clear = clear;
        vm.save = save;

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.serviceWf.id !== null) {
                ServiceWf.update(vm.serviceWf, onSaveSuccess, onSaveError);
            } else {
                ServiceWf.save(vm.serviceWf, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('ocrDataAdminApp:serviceWfUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
