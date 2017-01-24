(function() {
    'use strict';

    angular
        .module('ocrDataAdminApp')
        .controller('RequestWfMySuffixDialogController', RequestWfMySuffixDialogController);

    RequestWfMySuffixDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'RequestWf'];

    function RequestWfMySuffixDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, RequestWf) {
        var vm = this;

        vm.requestWf = entity;
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
            if (vm.requestWf.id !== null) {
                RequestWf.update(vm.requestWf, onSaveSuccess, onSaveError);
            } else {
                RequestWf.save(vm.requestWf, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('ocrDataAdminApp:requestWfUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
