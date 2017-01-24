(function() {
    'use strict';

    angular
        .module('ocrDataAdminApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('service-respmySuffix', {
            parent: 'entity',
            url: '/service-respmySuffix',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'ocrDataAdminApp.serviceResp.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/service-resp/service-respsmySuffix.html',
                    controller: 'ServiceRespMySuffixController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('serviceResp');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('service-respmySuffix-detail', {
            parent: 'entity',
            url: '/service-respmySuffix/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'ocrDataAdminApp.serviceResp.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/service-resp/service-respmySuffix-detail.html',
                    controller: 'ServiceRespMySuffixDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('serviceResp');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'ServiceResp', function($stateParams, ServiceResp) {
                    return ServiceResp.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'service-respmySuffix',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('service-respmySuffix-detail.edit', {
            parent: 'service-respmySuffix-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/service-resp/service-respmySuffix-dialog.html',
                    controller: 'ServiceRespMySuffixDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['ServiceResp', function(ServiceResp) {
                            return ServiceResp.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('service-respmySuffix.new', {
            parent: 'service-respmySuffix',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/service-resp/service-respmySuffix-dialog.html',
                    controller: 'ServiceRespMySuffixDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                rawJson: null,
                                documentImage: null,
                                documentImageContentType: null,
                                createdBy: null,
                                startDate: null,
                                endDate: null,
                                lastRunBy: null,
                                lastRunDur: null,
                                lastRunDate: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('service-respmySuffix', null, { reload: 'service-respmySuffix' });
                }, function() {
                    $state.go('service-respmySuffix');
                });
            }]
        })
        .state('service-respmySuffix.edit', {
            parent: 'service-respmySuffix',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/service-resp/service-respmySuffix-dialog.html',
                    controller: 'ServiceRespMySuffixDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['ServiceResp', function(ServiceResp) {
                            return ServiceResp.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('service-respmySuffix', null, { reload: 'service-respmySuffix' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('service-respmySuffix.delete', {
            parent: 'service-respmySuffix',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/service-resp/service-respmySuffix-delete-dialog.html',
                    controller: 'ServiceRespMySuffixDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['ServiceResp', function(ServiceResp) {
                            return ServiceResp.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('service-respmySuffix', null, { reload: 'service-respmySuffix' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
