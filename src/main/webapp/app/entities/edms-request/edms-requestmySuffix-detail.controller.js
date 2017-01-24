(function() {
    'use strict';

    angular
        .module('ocrDataAdminApp')
        .controller('EdmsRequestMySuffixDetailController', EdmsRequestMySuffixDetailController);

    EdmsRequestMySuffixDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'EdmsRequest', 'OcrSession', 'RequestWf', 'EdmsResponse'];

    function EdmsRequestMySuffixDetailController($scope, $rootScope, $stateParams, previousState, entity, EdmsRequest, OcrSession, RequestWf, EdmsResponse) {
        var vm = this;

        vm.edmsRequest = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('ocrDataAdminApp:edmsRequestUpdate', function(event, result) {
            vm.edmsRequest = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
