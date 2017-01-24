'use strict';

describe('Controller Tests', function() {

    describe('EdmsRequest Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockPreviousState, MockEdmsRequest, MockOcrSession, MockRequestWf, MockEdmsResponse;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockPreviousState = jasmine.createSpy('MockPreviousState');
            MockEdmsRequest = jasmine.createSpy('MockEdmsRequest');
            MockOcrSession = jasmine.createSpy('MockOcrSession');
            MockRequestWf = jasmine.createSpy('MockRequestWf');
            MockEdmsResponse = jasmine.createSpy('MockEdmsResponse');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity,
                'previousState': MockPreviousState,
                'EdmsRequest': MockEdmsRequest,
                'OcrSession': MockOcrSession,
                'RequestWf': MockRequestWf,
                'EdmsResponse': MockEdmsResponse
            };
            createController = function() {
                $injector.get('$controller')("EdmsRequestMySuffixDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'ocrDataAdminApp:edmsRequestUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
