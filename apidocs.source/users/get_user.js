/**
 * @api {get} /users/:id Read an user information
 * @apiVersion 1.0.0
 * @apiName UsersGetUser
 * @apiGroup Users
 *
 * @apiDescription Read data of a User
 *
 * @apiParam {String} id Id of user
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
 *     HTTP/1.1 404 Not Found
 *     {
 *       "jsonapi": {
 *         "version": "1.0.0"
 *       },
 *       "errors": [
 *         {
 *           "code": "404",
 *           "title": "Not Found",
 *           "detail": "User does not exists."
 *         }
 *       ]
 *     }
 */
function getUser() { return; }
