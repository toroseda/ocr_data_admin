(function() {
    'use strict';

    angular
        .module('ocrDataAdminApp')
        .controller('EdmsRequestMySuffixDialogController', EdmsRequestMySuffixDialogController);

    EdmsRequestMySuffixDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', '$q', 'entity', 'EdmsRequest', 'OcrSession', 'RequestWf', 'EdmsResponse'];

    function EdmsRequestMySuffixDialogController ($timeout, $scope, $stateParams, $uibModalInstance, $q, entity, EdmsRequest, OcrSession, RequestWf, EdmsResponse) {
        var vm = this;

        vm.edmsRequest = entity;
        vm.clear = clear;
        vm.datePickerOpenStatus = {};
        vm.openCalendar = openCalendar;
        vm.save = save;
        vm.ocrsessions = OcrSession.query();
        vm.requestwfs = RequestWf.query({filter: 'edmsrequest-is-null'});
        $q.all([vm.edmsRequest.$promise, vm.requestwfs.$promise]).then(function() {
            if (!vm.edmsRequest.requestWfId) {
                return $q.reject();
            }
            return RequestWf.get({id : vm.edmsRequest.requestWfId}).$promise;
        }).then(function(requestWf) {
            vm.requestwfs.push(requestWf);
        });
        vm.edmsresponses = EdmsResponse.query({filter: 'edmsrequest-is-null'});
        $q.all([vm.edmsRequest.$promise, vm.edmsresponses.$promise]).then(function() {
            if (!vm.edmsRequest.edmsResponseId) {
                return $q.reject();
            }
            return EdmsResponse.get({id : vm.edmsRequest.edmsResponseId}).$promise;
        }).then(function(edmsResponse) {
            vm.edmsresponses.push(edmsResponse);
        });

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.edmsRequest.id !== null) {
                EdmsRequest.update(vm.edmsRequest, onSaveSuccess, onSaveError);
            } else {
                EdmsRequest.save(vm.edmsRequest, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('ocrDataAdminApp:edmsRequestUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }

        vm.datePickerOpenStatus.startDate = false;
        vm.datePickerOpenStatus.endDate = false;
        vm.datePickerOpenStatus.lastRunDate = false;

        function openCalendar (date) {
            vm.datePickerOpenStatus[date] = true;
        }
    }
})();
