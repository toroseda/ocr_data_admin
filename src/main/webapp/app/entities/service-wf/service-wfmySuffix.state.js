(function() {
    'use strict';

    angular
        .module('ocrDataAdminApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('service-wfmySuffix', {
            parent: 'entity',
            url: '/service-wfmySuffix',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'ocrDataAdminApp.serviceWf.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/service-wf/service-wfsmySuffix.html',
                    controller: 'ServiceWfMySuffixController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('serviceWf');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('service-wfmySuffix-detail', {
            parent: 'entity',
            url: '/service-wfmySuffix/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'ocrDataAdminApp.serviceWf.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/service-wf/service-wfmySuffix-detail.html',
                    controller: 'ServiceWfMySuffixDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('serviceWf');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'ServiceWf', function($stateParams, ServiceWf) {
                    return ServiceWf.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'service-wfmySuffix',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('service-wfmySuffix-detail.edit', {
            parent: 'service-wfmySuffix-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/service-wf/service-wfmySuffix-dialog.html',
                    controller: 'ServiceWfMySuffixDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['ServiceWf', function(ServiceWf) {
                            return ServiceWf.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('service-wfmySuffix.new', {
            parent: 'service-wfmySuffix',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/service-wf/service-wfmySuffix-dialog.html',
                    controller: 'ServiceWfMySuffixDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                statusId: null,
                                createdBy: null,
                                updatedBy: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('service-wfmySuffix', null, { reload: 'service-wfmySuffix' });
                }, function() {
                    $state.go('service-wfmySuffix');
                });
            }]
        })
        .state('service-wfmySuffix.edit', {
            parent: 'service-wfmySuffix',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/service-wf/service-wfmySuffix-dialog.html',
                    controller: 'ServiceWfMySuffixDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['ServiceWf', function(ServiceWf) {
                            return ServiceWf.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('service-wfmySuffix', null, { reload: 'service-wfmySuffix' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('service-wfmySuffix.delete', {
            parent: 'service-wfmySuffix',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/service-wf/service-wfmySuffix-delete-dialog.html',
                    controller: 'ServiceWfMySuffixDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['ServiceWf', function(ServiceWf) {
                            return ServiceWf.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('service-wfmySuffix', null, { reload: 'service-wfmySuffix' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
