/**
 * @api {get} /users?page[limit]=2&page[offset]=2 Retrieve list of users
 * @apiVersion 1.0.0
 * @apiName UsersGetUsers
 * @apiGroup Users
 *
 * @apiDescription Retrieve list of user
 *
 * @apiParam {String[]} [page]       Pagination
 * @apiParam {String}   [page.limit=25] Limit items on each page
 * @apiParam {String}   [page.offset=0] Offset
 * @apiParam {String}   [page.cursor=0] Cursor
 *
 * @apiSuccess {Object}   jsonapi                    Object describing the server's implementation
 * @apiSuccess {String}   jsonapi.version            Version of API
 * @apiSuccess {Object}   meta                       Object contains non-standard meta-information
 * @apiSuccess {String}   meta.totalObjects         Total objects of current page
 * @apiSuccess {Object[]} data                       Array of user object
 * @apiSuccess {String}   data.type                  Resource type
 * @apiSuccess {String}   data.id                    Id of user
 * @apiSuccess {Object}   data.attributes            Object representing some of the resource's data
 * @apiSuccess {String}   data.attributes.email      Email <code>(only show when current user access)</code>
 * @apiSuccess {String}   data.attributes.firstName First name
 * @apiSuccess {String}   data.attributes.lastName  Last name
 * @apiSuccess {String}   data.attributes.birthday   Birthday (ISO 8601 format)
 * @apiSuccess {Object}   links                      Object contains links of pagination
 * @apiSuccess {Object}   links.self                 Current link
 * @apiSuccess {Object}   [links.first]              First link
 * @apiSuccess {Object}   [links.prev]               Preview link
 * @apiSuccess {Object}   [links.next]               Next link
 * @apiSuccess {Object}   [links.last]               Last link
 *
 * @apiSuccessExample {json} Success
 *     HTTP/1.1 200 OK
 *     {
 *       "jsonapi": {
 *         "version": "1.0.0"
 *       },
 *       "meta": {
 *         "total_objects": 20
 *       },
 *       "data": [
 *         {
 *           "id": "2",
 *           "type": "user",
 *           "attributes": {
 *             "first_name": "Ellie",
 *             "last_name": "Fredricksen",
 *             "birthday": "1990-12-03T00:00Z"
 *           }
 *         },
 *         {
 *           "id": "1",
 *           "type": "user",
 *           "attributes": {
 *             "email": "jack@example.com",
 *             "first_name": "Jack",
 *             "last_name": "Sparrow",
 *             "birthday": "1987-10-12T00:00Z"
 *           }
 *         }
 *       ],
 *       "links": {
 *         "self": "http://example.com/users?page[offset]=2&page[limit]=2",
 *         "first": "http://example.com/users?page[offset]=0&page[limit]=2",
 *         "prev": "http://example.com/users?page[offset]=0&page[limit]=2",
 *         "next": "http://example.com/users?page[offset]=4&page[limit]=2",
 *         "last": "http://example.com/users?page[offset]=10&page[limit]=2"
 *       }
 *     }
 *
 * @apiSuccessExample {json} Empty list
 *     HTTP/1.1 200 OK
 *     {
 *       "jsonapi": {
 *         "version": "1.0.0"
 *       },
 *       "meta": {
 *         "totalObjects": 0
 *       },
 *       "data": [],
 *       "links": {
 *         "self": "http://example.com/users?page[offset]=0&page[limit]=2",
 *       }
 *     }
 */
function getUsers() { return; }
