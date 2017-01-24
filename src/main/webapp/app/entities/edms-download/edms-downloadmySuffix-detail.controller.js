(function() {
    'use strict';

    angular
        .module('ocrDataAdminApp')
        .controller('EdmsDownloadMySuffixDetailController', EdmsDownloadMySuffixDetailController);

    EdmsDownloadMySuffixDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'EdmsDownload', 'EdmsResponse', 'ServiceResp'];

    function EdmsDownloadMySuffixDetailController($scope, $rootScope, $stateParams, previousState, entity, EdmsDownload, EdmsResponse, ServiceResp) {
        var vm = this;

        vm.edmsDownload = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('ocrDataAdminApp:edmsDownloadUpdate', function(event, result) {
            vm.edmsDownload = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
