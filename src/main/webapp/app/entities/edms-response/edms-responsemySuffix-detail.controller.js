(function() {
    'use strict';

    angular
        .module('ocrDataAdminApp')
        .controller('EdmsResponseMySuffixDetailController', EdmsResponseMySuffixDetailController);

    EdmsResponseMySuffixDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'EdmsResponse', 'EdmsDownload'];

    function EdmsResponseMySuffixDetailController($scope, $rootScope, $stateParams, previousState, entity, EdmsResponse, EdmsDownload) {
        var vm = this;

        vm.edmsResponse = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('ocrDataAdminApp:edmsResponseUpdate', function(event, result) {
            vm.edmsResponse = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
