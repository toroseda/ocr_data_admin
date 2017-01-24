(function() {
    'use strict';

    angular
        .module('ocrDataAdminApp')
        .controller('SessionWfMySuffixDetailController', SessionWfMySuffixDetailController);

    SessionWfMySuffixDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'SessionWf', 'OcrSession'];

    function SessionWfMySuffixDetailController($scope, $rootScope, $stateParams, previousState, entity, SessionWf, OcrSession) {
        var vm = this;

        vm.sessionWf = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('ocrDataAdminApp:sessionWfUpdate', function(event, result) {
            vm.sessionWf = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
