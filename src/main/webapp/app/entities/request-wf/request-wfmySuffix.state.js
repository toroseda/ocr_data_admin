(function() {
    'use strict';

    angular
        .module('ocrDataAdminApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('request-wfmySuffix', {
            parent: 'entity',
            url: '/request-wfmySuffix',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'ocrDataAdminApp.requestWf.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/request-wf/request-wfsmySuffix.html',
                    controller: 'RequestWfMySuffixController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('requestWf');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('request-wfmySuffix-detail', {
            parent: 'entity',
            url: '/request-wfmySuffix/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'ocrDataAdminApp.requestWf.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/request-wf/request-wfmySuffix-detail.html',
                    controller: 'RequestWfMySuffixDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('requestWf');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'RequestWf', function($stateParams, RequestWf) {
                    return RequestWf.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'request-wfmySuffix',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('request-wfmySuffix-detail.edit', {
            parent: 'request-wfmySuffix-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/request-wf/request-wfmySuffix-dialog.html',
                    controller: 'RequestWfMySuffixDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['RequestWf', function(RequestWf) {
                            return RequestWf.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('request-wfmySuffix.new', {
            parent: 'request-wfmySuffix',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/request-wf/request-wfmySuffix-dialog.html',
                    controller: 'RequestWfMySuffixDialogController',
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
                    $state.go('request-wfmySuffix', null, { reload: 'request-wfmySuffix' });
                }, function() {
                    $state.go('request-wfmySuffix');
                });
            }]
        })
        .state('request-wfmySuffix.edit', {
            parent: 'request-wfmySuffix',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/request-wf/request-wfmySuffix-dialog.html',
                    controller: 'RequestWfMySuffixDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['RequestWf', function(RequestWf) {
                            return RequestWf.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('request-wfmySuffix', null, { reload: 'request-wfmySuffix' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('request-wfmySuffix.delete', {
            parent: 'request-wfmySuffix',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/request-wf/request-wfmySuffix-delete-dialog.html',
                    controller: 'RequestWfMySuffixDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['RequestWf', function(RequestWf) {
                            return RequestWf.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('request-wfmySuffix', null, { reload: 'request-wfmySuffix' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
