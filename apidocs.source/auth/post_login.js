/**
 * @api {post} /auth/login Login with email
 * @apiVersion 1.0.0
 * @apiName AuthLogin
 * @apiGroup Auth
 * @apiPermission guest
 *
 * @apiDescription Login with email.
 *
 * @apiParam {String} email    Email of user
 * @apiParam {String} password Password
 *
 * @apiSuccess {Object} jsonapi                         Object describing the server's implementation
 * @apiSuccess {String} jsonapi.version                 Version of API
 * @apiSuccess {Object} data                            Token object
 * @apiSuccess {String} data.type                       Resource type
 * @apiSuccess {String} data.id                         Resource id
 * @apiSuccess {Object} data.attributes                 Object representing some of the resource's data
 * @apiSuccess {String} data.attributes.accessToken     Access Token
 * @apiSuccess {String} data.attributes.tokenType       Token type
 * @apiSuccess {String} data.attributes.expiresIn       Time to expiry
 *
 * @apiSuccessExample {json} Success
 *     HTTP/1.1 200 OK
 *     {
 *       "jsonapi": {
 *         "version": "1.0.0"
 *       },
 *       "data": {
 *         "id": "Qcg6yI1a5qCxXgKWtSAbZ2MIHFChHAq0Vc1Lo4TX",
 *         "type": "token",
 *         "attributes": {
 *           "accessToken": "Qcg6yI1a5qCxXgKWtSAbZ2MIHFChHAq0Vc1Lo4TX",
 *           "tokenType": "Bearer",
 *           "expiresIn": 3600
 *         }
 *       }
 *     }
 *
 * @apiError {Object}   jsonapi         Object describing the server's implementation
 * @apiError {String}   jsonapi.version Version of API
 * @apiError {Object[]} errors          Array of error objects
 *
 * @apiErrorExample {json} Validation Error
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "jsonapi": {
 *         "version": "1.0.0"
 *       },
 *       "errors": [
 *         {
 *           "code": "2",
 *           "title": "Validation error",
 *           "detail": "The email field is required."
 *           "source": {
 *             "email": [
 *               "The email field is required.",
 *               "The email field must be string."
 *             ],
 *             "password": [
 *               "The password field is required."
 *             ]
 *           }
 *         }
 *       ]
 *     }
 *
 * @apiErrorExample {json} General Error
 *     HTTP/1.1 403 Forbidden
 *     {
 *       "jsonapi": {
 *         "version": "1.0.0"
 *       },
 *       "errors": [
 *         {
 *           "code": "123",
 *           "title": "Login failure",
 *           "detail": "This application only allow Green Global account access."
 *         }
 *       ]
 *     }
 */
function authLogin() { return; }
