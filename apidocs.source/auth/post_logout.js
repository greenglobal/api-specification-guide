/**
 * @api {post} /auth/logout Logout
 * @apiVersion 1.0.0
 * @apiName AuthLogout
 * @apiGroup Auth
 * @apiPermission user
 *
 * @apiDescription Logout
 *
 * @apiHeader Authorization Access Token
 *
 * @apiHeaderExample {json} Request Header
 *     { "Authorization": "Bearer Qcg6yI1a5qCxXgKWtSAbZ2MIHFChHAq0Vc1Lo4TX" }
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
function authLogout() { return; }
