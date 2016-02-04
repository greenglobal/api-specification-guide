/**
 * @api {patch} /users/:id Update an user
 * @apiVersion 1.0.0
 * @apiName UsersPatchUsers
 * @apiGroup Users
 * @apiPermission user, admin
 *
 * @apiDescription Update an user. Also use for <code>edit profile</code>, <code>change password</code> features
 *
 * @apiHeader Authorization Access Token
 *
 * @apiHeaderExample {json} Request Header
 *     { "Authorization": "Bearer Qcg6yI1a5qCxXgKWtSAbZ2MIHFChHAq0Vc1Lo4TX" }
 *
 * @apiParam {String} [password]   Password
 * @apiParam {String} [firstName] First name
 * @apiParam {String} [lastName]  Last name
 *
 * @apiSuccess (Success - Created 201) {Object} jsonapi                         Object describing the server's implementation
 * @apiSuccess (Success - Created 201) {String} jsonapi.version                 Version of API
 * @apiSuccess (Success - Created 201) {Object} data                            User object
 * @apiSuccess (Success - Created 201) {String} data.type                       Resource type
 * @apiSuccess (Success - Created 201) {String} data.id                         Id of user
 * @apiSuccess (Success - Created 201) {Object} data.attributes                 Object representing some of the resource's data
 * @apiSuccess (Success - Created 201) {String} data.attributes.email           Email <code>(only show when current user access)</code>
 * @apiSuccess (Success - Created 201) {String} data.attributes.firstName      First name
 * @apiSuccess (Success - Created 201) {String} data.attributes.lastName       Last name
 * @apiSuccess (Success - Created 201) {String} data.attributes.birthday        Birthday (ISO 8601 format)
 *
 * @apiSuccessExample {json} Success
 *     HTTP/1.1 200 OK
 *     {
 *       "jsonapi": {
 *         "version": "1.0.0"
 *       },
 *       "data": {
 *         "id": "1",
 *         "type": "user",
 *         "attributes": {
 *           "email": "jack@example.com",
 *           "firstName": "Jack",
 *           "lastName": "Sparrow",
 *           "birthday": "2010-10-12T08:50Z"
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
 *             "password": [
 *               "The password must be at least 6 characters."
 *             ]
 *           }
 *         }
 *       ]
 *     }
 *
 * @apiErrorExample {json} General Error
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "jsonapi": {
 *         "version": "1.0.0"
 *       },
 *       "errors": [
 *         {
 *           "code": "101",
 *           "title": "Unauthorized",
 *           "detail": "Invalid or expired token."
 *         }
 *       ]
 *     }
 */
function postUser() { return; }
