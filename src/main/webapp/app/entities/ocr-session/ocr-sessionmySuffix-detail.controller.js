(function() {
    'use strict';

    angular
        .module('ocrDataAdminApp')
        .controller('OcrSessionMySuffixDetailController', OcrSessionMySuffixDetailController);

    OcrSessionMySuffixDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'OcrSession', 'SessionWf', 'EdmsRequest'];

    function OcrSessionMySuffixDetailController($scope, $rootScope, $stateParams, previousState, entity, OcrSession, SessionWf, EdmsRequest) {
        var vm = this;

        vm.ocrSession = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('ocrDataAdminApp:ocrSessionUpdate', function(event, result) {
            vm.ocrSession = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
