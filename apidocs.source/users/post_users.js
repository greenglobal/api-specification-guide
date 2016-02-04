/**
 * @api {post} /users Create an user
 * @apiVersion 1.0.0
 * @apiName UsersPostUsers
 * @apiGroup Users
 *
 * @apiDescription Create an user. Also use for <code>register</code> feature
 *
 * @apiParam {String} email      Email
 * @apiParam {String} password   Password
 * @apiParam {String} first_name First name
 * @apiParam {String} last_name  Last name
 *
 * @apiSuccess (Success - Created 201) {Object} jsonapi                         Object describing the server's implementation
 * @apiSuccess (Success - Created 201) {String} jsonapi.version                 Version of API
 * @apiSuccess (Success - Created 201) {Object} data                            User object
 * @apiSuccess (Success - Created 201) {String} data.type                       Resource type
 * @apiSuccess (Success - Created 201) {String} data.id                         Id of user
 * @apiSuccess (Success - Created 201) {Object} data.attributes                 Object representing some of the resource's data
 * @apiSuccess (Success - Created 201) {String} data.attributes.email           Email <code>(only show when current user access)</code>
 * @apiSuccess (Success - Created 201) {String} data.attributes.first_name      First name
 * @apiSuccess (Success - Created 201) {String} data.attributes.last_name       Last name
 * @apiSuccess (Success - Created 201) {String} data.attributes.birthday        Birthday (ISO 8601 format)
 *
 * @apiSuccessExample {json} Success
 *     HTTP/1.1 201 Created
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
 */
function postUser() { return; }
