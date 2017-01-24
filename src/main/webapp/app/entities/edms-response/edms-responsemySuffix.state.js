(function() {
    'use strict';

    angular
        .module('ocrDataAdminApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('edms-responsemySuffix', {
            parent: 'entity',
            url: '/edms-responsemySuffix',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'ocrDataAdminApp.edmsResponse.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/edms-response/edms-responsesmySuffix.html',
                    controller: 'EdmsResponseMySuffixController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('edmsResponse');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('edms-responsemySuffix-detail', {
            parent: 'entity',
            url: '/edms-responsemySuffix/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'ocrDataAdminApp.edmsResponse.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/edms-response/edms-responsemySuffix-detail.html',
                    controller: 'EdmsResponseMySuffixDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('edmsResponse');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'EdmsResponse', function($stateParams, EdmsResponse) {
                    return EdmsResponse.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'edms-responsemySuffix',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('edms-responsemySuffix-detail.edit', {
            parent: 'edms-responsemySuffix-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/edms-response/edms-responsemySuffix-dialog.html',
                    controller: 'EdmsResponseMySuffixDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['EdmsResponse', function(EdmsResponse) {
                            return EdmsResponse.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('edms-responsemySuffix.new', {
            parent: 'edms-responsemySuffix',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/edms-response/edms-responsemySuffix-dialog.html',
                    controller: 'EdmsResponseMySuffixDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                accountNumber: null,
                                subRequestId: null,
                                requestDocType: null,
                                errorCode: null,
                                errorDescription: null,
                                promisedDirectory: null,
                                responseDocType: null,
                                responseSubRequestId: null,
                                responseAeaCode: null,
                                responseDocCount: null,
                                directoryAvilableFlg: null,
                                fileCount: null,
                                createdBy: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('edms-responsemySuffix', null, { reload: 'edms-responsemySuffix' });
                }, function() {
                    $state.go('edms-responsemySuffix');
                });
            }]
        })
        .state('edms-responsemySuffix.edit', {
            parent: 'edms-responsemySuffix',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/edms-response/edms-responsemySuffix-dialog.html',
                    controller: 'EdmsResponseMySuffixDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['EdmsResponse', function(EdmsResponse) {
                            return EdmsResponse.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('edms-responsemySuffix', null, { reload: 'edms-responsemySuffix' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('edms-responsemySuffix.delete', {
            parent: 'edms-responsemySuffix',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/edms-response/edms-responsemySuffix-delete-dialog.html',
                    controller: 'EdmsResponseMySuffixDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['EdmsResponse', function(EdmsResponse) {
                            return EdmsResponse.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('edms-responsemySuffix', null, { reload: 'edms-responsemySuffix' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
