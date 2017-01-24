(function() {
    'use strict';

    angular
        .module('ocrDataAdminApp')
        .controller('RequestWfMySuffixDetailController', RequestWfMySuffixDetailController);

    RequestWfMySuffixDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'RequestWf'];

    function RequestWfMySuffixDetailController($scope, $rootScope, $stateParams, previousState, entity, RequestWf) {
        var vm = this;

        vm.requestWf = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('ocrDataAdminApp:requestWfUpdate', function(event, result) {
            vm.requestWf = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
