(function() {
    'use strict';

    angular
        .module('ocrDataAdminApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('session-wfmySuffix', {
            parent: 'entity',
            url: '/session-wfmySuffix',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'ocrDataAdminApp.sessionWf.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/session-wf/session-wfsmySuffix.html',
                    controller: 'SessionWfMySuffixController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('sessionWf');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('session-wfmySuffix-detail', {
            parent: 'entity',
            url: '/session-wfmySuffix/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'ocrDataAdminApp.sessionWf.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/session-wf/session-wfmySuffix-detail.html',
                    controller: 'SessionWfMySuffixDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('sessionWf');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'SessionWf', function($stateParams, SessionWf) {
                    return SessionWf.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'session-wfmySuffix',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('session-wfmySuffix-detail.edit', {
            parent: 'session-wfmySuffix-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/session-wf/session-wfmySuffix-dialog.html',
                    controller: 'SessionWfMySuffixDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['SessionWf', function(SessionWf) {
                            return SessionWf.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('session-wfmySuffix.new', {
            parent: 'session-wfmySuffix',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/session-wf/session-wfmySuffix-dialog.html',
                    controller: 'SessionWfMySuffixDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                statusId: null,
                                wfTypeId: null,
                                createdBy: null,
                                updatedBy: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('session-wfmySuffix', null, { reload: 'session-wfmySuffix' });
                }, function() {
                    $state.go('session-wfmySuffix');
                });
            }]
        })
        .state('session-wfmySuffix.edit', {
            parent: 'session-wfmySuffix',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/session-wf/session-wfmySuffix-dialog.html',
                    controller: 'SessionWfMySuffixDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['SessionWf', function(SessionWf) {
                            return SessionWf.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('session-wfmySuffix', null, { reload: 'session-wfmySuffix' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('session-wfmySuffix.delete', {
            parent: 'session-wfmySuffix',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/session-wf/session-wfmySuffix-delete-dialog.html',
                    controller: 'SessionWfMySuffixDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['SessionWf', function(SessionWf) {
                            return SessionWf.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('session-wfmySuffix', null, { reload: 'session-wfmySuffix' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
