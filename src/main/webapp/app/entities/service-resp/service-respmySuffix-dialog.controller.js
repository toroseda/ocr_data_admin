(function() {
    'use strict';

    angular
        .module('ocrDataAdminApp')
        .controller('ServiceRespMySuffixDialogController', ServiceRespMySuffixDialogController);

    ServiceRespMySuffixDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', '$q', 'DataUtils', 'entity', 'ServiceResp', 'ServiceWf'];

    function ServiceRespMySuffixDialogController ($timeout, $scope, $stateParams, $uibModalInstance, $q, DataUtils, entity, ServiceResp, ServiceWf) {
        var vm = this;

        vm.serviceResp = entity;
        vm.clear = clear;
        vm.datePickerOpenStatus = {};
        vm.openCalendar = openCalendar;
        vm.byteSize = DataUtils.byteSize;
        vm.openFile = DataUtils.openFile;
        vm.save = save;
        vm.servicewfs = ServiceWf.query({filter: 'serviceresp-is-null'});
        $q.all([vm.serviceResp.$promise, vm.servicewfs.$promise]).then(function() {
            if (!vm.serviceResp.serviceWfId) {
                return $q.reject();
            }
            return ServiceWf.get({id : vm.serviceResp.serviceWfId}).$promise;
        }).then(function(serviceWf) {
            vm.servicewfs.push(serviceWf);
        });

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.serviceResp.id !== null) {
                ServiceResp.update(vm.serviceResp, onSaveSuccess, onSaveError);
            } else {
                ServiceResp.save(vm.serviceResp, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('ocrDataAdminApp:serviceRespUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


        vm.setDocumentImage = function ($file, serviceResp) {
            if ($file) {
                DataUtils.toBase64($file, function(base64Data) {
                    $scope.$apply(function() {
                        serviceResp.documentImage = base64Data;
                        serviceResp.documentImageContentType = $file.type;
                    });
                });
            }
        };
        vm.datePickerOpenStatus.startDate = false;
        vm.datePickerOpenStatus.endDate = false;
        vm.datePickerOpenStatus.lastRunDate = false;

        function openCalendar (date) {
            vm.datePickerOpenStatus[date] = true;
        }
    }
})();
