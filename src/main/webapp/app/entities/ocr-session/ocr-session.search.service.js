(function() {
    'use strict';

    angular
        .module('ocrDataAdminApp')
        .factory('OcrSessionSearch', OcrSessionSearch);

    OcrSessionSearch.$inject = ['$resource'];

    function OcrSessionSearch($resource) {
        var resourceUrl =  'api/_search/ocr-sessions/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true}
        });
    }
})();
