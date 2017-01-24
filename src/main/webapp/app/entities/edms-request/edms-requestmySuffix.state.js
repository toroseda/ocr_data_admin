(function() {
    'use strict';

    angular
        .module('ocrDataAdminApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('edms-requestmySuffix', {
            parent: 'entity',
            url: '/edms-requestmySuffix',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'ocrDataAdminApp.edmsRequest.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/edms-request/edms-requestsmySuffix.html',
                    controller: 'EdmsRequestMySuffixController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('edmsRequest');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('edms-requestmySuffix-detail', {
            parent: 'entity',
            url: '/edms-requestmySuffix/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'ocrDataAdminApp.edmsRequest.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/edms-request/edms-requestmySuffix-detail.html',
                    controller: 'EdmsRequestMySuffixDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('edmsRequest');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'EdmsRequest', function($stateParams, EdmsRequest) {
                    return EdmsRequest.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'edms-requestmySuffix',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('edms-requestmySuffix-detail.edit', {
            parent: 'edms-requestmySuffix-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/edms-request/edms-requestmySuffix-dialog.html',
                    controller: 'EdmsRequestMySuffixDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['EdmsRequest', function(EdmsRequest) {
                            return EdmsRequest.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('edms-requestmySuffix.new', {
            parent: 'edms-requestmySuffix',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/edms-request/edms-requestmySuffix-dialog.html',
                    controller: 'EdmsRequestMySuffixDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                accountNumber: null,
                                subRequestId: null,
                                areaCode: null,
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
                    $state.go('edms-requestmySuffix', null, { reload: 'edms-requestmySuffix' });
                }, function() {
                    $state.go('edms-requestmySuffix');
                });
            }]
        })
        .state('edms-requestmySuffix.edit', {
            parent: 'edms-requestmySuffix',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/edms-request/edms-requestmySuffix-dialog.html',
                    controller: 'EdmsRequestMySuffixDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['EdmsRequest', function(EdmsRequest) {
                            return EdmsRequest.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('edms-requestmySuffix', null, { reload: 'edms-requestmySuffix' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('edms-requestmySuffix.delete', {
            parent: 'edms-requestmySuffix',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/edms-request/edms-requestmySuffix-delete-dialog.html',
                    controller: 'EdmsRequestMySuffixDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['EdmsRequest', function(EdmsRequest) {
                            return EdmsRequest.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('edms-requestmySuffix', null, { reload: 'edms-requestmySuffix' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
