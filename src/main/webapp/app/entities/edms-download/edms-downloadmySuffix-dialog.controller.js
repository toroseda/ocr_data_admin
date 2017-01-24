(function() {
    'use strict';

    angular
        .module('ocrDataAdminApp')
        .controller('EdmsDownloadMySuffixDialogController', EdmsDownloadMySuffixDialogController);

    EdmsDownloadMySuffixDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', '$q', 'entity', 'EdmsDownload', 'EdmsResponse', 'ServiceResp'];

    function EdmsDownloadMySuffixDialogController ($timeout, $scope, $stateParams, $uibModalInstance, $q, entity, EdmsDownload, EdmsResponse, ServiceResp) {
        var vm = this;

        vm.edmsDownload = entity;
        vm.clear = clear;
        vm.save = save;
        vm.edmsresponses = EdmsResponse.query();
        vm.serviceresps = ServiceResp.query({filter: 'edmsdownload-is-null'});
        $q.all([vm.edmsDownload.$promise, vm.serviceresps.$promise]).then(function() {
            if (!vm.edmsDownload.serviceRespId) {
                return $q.reject();
            }
            return ServiceResp.get({id : vm.edmsDownload.serviceRespId}).$promise;
        }).then(function(serviceResp) {
            vm.serviceresps.push(serviceResp);
        });

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.edmsDownload.id !== null) {
                EdmsDownload.update(vm.edmsDownload, onSaveSuccess, onSaveError);
            } else {
                EdmsDownload.save(vm.edmsDownload, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('ocrDataAdminApp:edmsDownloadUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
