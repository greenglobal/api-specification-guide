/**
 * @api {get} /me Read authenticated user
 * @apiVersion 1.0.0
 * @apiName UsersGetMe
 * @apiGroup Users
 * @apiPermission user
 *
 * @apiDescription Read data of authenticated user
 *
 * @apiHeader Authorization Access Token
 *
 * @apiHeaderExample {json} Request Header
 *     { "Authorization": "Bearer Qcg6yI1a5qCxXgKWtSAbZ2MIHFChHAq0Vc1Lo4TX" }
 *
 * @apiSuccess {Object} jsonapi                         Object describing the server's implementation
 * @apiSuccess {String} jsonapi.version                 Version of API
 * @apiSuccess {Object} data                            User object
 * @apiSuccess {String} data.type                       Resource type
 * @apiSuccess {String} data.id                         Id of user
 * @apiSuccess {Object} data.attributes                 Object representing some of the resource's data
 * @apiSuccess {String} data.attributes.email           Email <code>(only show when current user access)</code>
 * @apiSuccess {String} data.attributes.first_name      First name
 * @apiSuccess {String} data.attributes.last_name       Last name
 * @apiSuccess {String} data.attributes.birthday        Birthday (ISO 8601 format)
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
 *           "first_name": "Jack",
 *           "last_name": "Sparrow",
 *           "birthday": "2010-10-12T08:50Z"
 *         }
 *       }
 *     }
 *
 * @apiError {Object}   jsonapi         Object describing the server's implementation
 * @apiError {String}   jsonapi.version Version of API
 * @apiError {Object[]} errors          Array of error objects
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
function getMe() { return; }
