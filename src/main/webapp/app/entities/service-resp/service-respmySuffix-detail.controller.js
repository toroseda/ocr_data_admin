(function() {
    'use strict';

    angular
        .module('ocrDataAdminApp')
        .controller('ServiceRespMySuffixDetailController', ServiceRespMySuffixDetailController);

    ServiceRespMySuffixDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'DataUtils', 'entity', 'ServiceResp', 'ServiceWf'];

    function ServiceRespMySuffixDetailController($scope, $rootScope, $stateParams, previousState, DataUtils, entity, ServiceResp, ServiceWf) {
        var vm = this;

        vm.serviceResp = entity;
        vm.previousState = previousState.name;
        vm.byteSize = DataUtils.byteSize;
        vm.openFile = DataUtils.openFile;

        var unsubscribe = $rootScope.$on('ocrDataAdminApp:serviceRespUpdate', function(event, result) {
            vm.serviceResp = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
