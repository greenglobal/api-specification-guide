/**
 * @api {delete} /users/:id Delete an user
 * @apiVersion 1.0.0
 * @apiName UsersDeleteUsers
 * @apiGroup Users
 * @apiPermission user, admin
 *
 * @apiDescription Delete an user
 *
 * @apiHeader Authorization Access Token
 *
 * @apiHeaderExample {json} Request Header
 *     { "Authorization": "Bearer Qcg6yI1a5qCxXgKWtSAbZ2MIHFChHAq0Vc1Lo4TX" }
 *
 * @apiParam {String} id Id of user
 *
 * @apiSuccessExample {json} Success
 *     HTTP/1.1 204 No Content
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
function deleteUser() { return; }
