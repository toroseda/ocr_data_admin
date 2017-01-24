(function() {
    'use strict';

    angular
        .module('ocrDataAdminApp')
        .controller('EdmsResponseMySuffixDialogController', EdmsResponseMySuffixDialogController);

    EdmsResponseMySuffixDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'EdmsResponse', 'EdmsDownload'];

    function EdmsResponseMySuffixDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, EdmsResponse, EdmsDownload) {
        var vm = this;

        vm.edmsResponse = entity;
        vm.clear = clear;
        vm.save = save;
        vm.edmsdownloads = EdmsDownload.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.edmsResponse.id !== null) {
                EdmsResponse.update(vm.edmsResponse, onSaveSuccess, onSaveError);
            } else {
                EdmsResponse.save(vm.edmsResponse, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('ocrDataAdminApp:edmsResponseUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
