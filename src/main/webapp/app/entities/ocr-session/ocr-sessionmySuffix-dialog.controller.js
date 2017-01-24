(function() {
    'use strict';

    angular
        .module('ocrDataAdminApp')
        .controller('OcrSessionMySuffixDialogController', OcrSessionMySuffixDialogController);

    OcrSessionMySuffixDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'OcrSession', 'SessionWf', 'EdmsRequest'];

    function OcrSessionMySuffixDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, OcrSession, SessionWf, EdmsRequest) {
        var vm = this;

        vm.ocrSession = entity;
        vm.clear = clear;
        vm.save = save;
        vm.sessionwfs = SessionWf.query();
        vm.edmsrequests = EdmsRequest.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.ocrSession.id !== null) {
                OcrSession.update(vm.ocrSession, onSaveSuccess, onSaveError);
            } else {
                OcrSession.save(vm.ocrSession, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('ocrDataAdminApp:ocrSessionUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
