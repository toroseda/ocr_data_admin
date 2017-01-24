(function() {
    'use strict';

    angular
        .module('ocrDataAdminApp')
        .controller('ServiceWfMySuffixDetailController', ServiceWfMySuffixDetailController);

    ServiceWfMySuffixDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'ServiceWf'];

    function ServiceWfMySuffixDetailController($scope, $rootScope, $stateParams, previousState, entity, ServiceWf) {
        var vm = this;

        vm.serviceWf = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('ocrDataAdminApp:serviceWfUpdate', function(event, result) {
            vm.serviceWf = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
