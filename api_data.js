define({ "api": [
  {
    "type": "post",
    "url": "/auth/login",
    "title": "Login with email",
    "version": "1.0.0",
    "name": "AuthLogin",
    "group": "Auth",
    "permission": [
      {
        "name": "guest"
      }
    ],
    "description": "<p>Login with email.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email of user</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "jsonapi",
            "description": "<p>Object describing the server's implementation</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "jsonapi.version",
            "description": "<p>Version of API</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Token object</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.type",
            "description": "<p>Resource type</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.id",
            "description": "<p>Resource id</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.attributes",
            "description": "<p>Object representing some of the resource's data</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.attributes.access_token",
            "description": "<p>Access Token</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.attributes.token_type",
            "description": "<p>Token type</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.attributes.expires_in",
            "description": "<p>Time to expiry</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n  \"jsonapi\": {\n    \"version\": \"1.0.0\"\n  },\n  \"data\": {\n    \"id\": \"Qcg6yI1a5qCxXgKWtSAbZ2MIHFChHAq0Vc1Lo4TX\",\n    \"type\": \"token\",\n    \"attributes\": {\n      \"access_token\": \"Qcg6yI1a5qCxXgKWtSAbZ2MIHFChHAq0Vc1Lo4TX\",\n      \"token_type\": \"Bearer\",\n      \"expires_in\": 3600\n    }\n  }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "jsonapi",
            "description": "<p>Object describing the server's implementation</p>"
          },
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "jsonapi.version",
            "description": "<p>Version of API</p>"
          },
          {
            "group": "Error 4xx",
            "type": "Object[]",
            "optional": false,
            "field": "errors",
            "description": "<p>Array of error objects</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Validation Error",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"jsonapi\": {\n    \"version\": \"1.0.0\"\n  },\n  \"errors\": [\n    {\n      \"code\": \"2\",\n      \"title\": \"Validation error\",\n      \"detail\": \"The email field is required.\"\n      \"source\": {\n        \"email\": [\n          \"The email field is required.\",\n          \"The email field must be string.\"\n        ],\n        \"password\": [\n          \"The password field is required.\"\n        ]\n      }\n    }\n  ]\n}",
          "type": "json"
        },
        {
          "title": "General Error",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"jsonapi\": {\n    \"version\": \"1.0.0\"\n  },\n  \"errors\": [\n    {\n      \"code\": \"123\",\n      \"title\": \"Login failure\",\n      \"detail\": \"This application only allow Green Global account access.\"\n    }\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "apidocs.source/auth/post_login.js",
    "groupTitle": "Auth"
  },
  {
    "type": "post",
    "url": "/auth/logout",
    "title": "Logout",
    "version": "1.0.0",
    "name": "AuthLogout",
    "group": "Auth",
    "permission": [
      {
        "name": "user"
      }
    ],
    "description": "<p>Logout</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Access Token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request Header",
          "content": "{ \"Authorization\": \"Bearer Qcg6yI1a5qCxXgKWtSAbZ2MIHFChHAq0Vc1Lo4TX\" }",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 204 No Content",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "jsonapi",
            "description": "<p>Object describing the server's implementation</p>"
          },
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "jsonapi.version",
            "description": "<p>Version of API</p>"
          },
          {
            "group": "Error 4xx",
            "type": "Object[]",
            "optional": false,
            "field": "errors",
            "description": "<p>Array of error objects</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "General Error",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"jsonapi\": {\n    \"version\": \"1.0.0\"\n  },\n  \"errors\": [\n    {\n      \"code\": \"101\",\n      \"title\": \"Unauthorized\",\n      \"detail\": \"Invalid or expired token.\"\n    }\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "apidocs.source/auth/post_logout.js",
    "groupTitle": "Auth"
  },
  {
    "type": "delete",
    "url": "/users/:id",
    "title": "Delete an user",
    "version": "1.0.0",
    "name": "UsersDeleteUsers",
    "group": "Users",
    "permission": [
      {
        "name": "user, admin"
      }
    ],
    "description": "<p>Delete an user</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Access Token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request Header",
          "content": "{ \"Authorization\": \"Bearer Qcg6yI1a5qCxXgKWtSAbZ2MIHFChHAq0Vc1Lo4TX\" }",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Id of user</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 204 No Content",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "jsonapi",
            "description": "<p>Object describing the server's implementation</p>"
          },
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "jsonapi.version",
            "description": "<p>Version of API</p>"
          },
          {
            "group": "Error 4xx",
            "type": "Object[]",
            "optional": false,
            "field": "errors",
            "description": "<p>Array of error objects</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "General Error",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"jsonapi\": {\n    \"version\": \"1.0.0\"\n  },\n  \"errors\": [\n    {\n      \"code\": \"101\",\n      \"title\": \"Unauthorized\",\n      \"detail\": \"Invalid or expired token.\"\n    }\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "apidocs.source/users/delete_users.js",
    "groupTitle": "Users"
  },
  {
    "type": "get",
    "url": "/me",
    "title": "Read authenticated user",
    "version": "1.0.0",
    "name": "UsersGetMe",
    "group": "Users",
    "permission": [
      {
        "name": "user"
      }
    ],
    "description": "<p>Read data of authenticated user</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Access Token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request Header",
          "content": "{ \"Authorization\": \"Bearer Qcg6yI1a5qCxXgKWtSAbZ2MIHFChHAq0Vc1Lo4TX\" }",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "jsonapi",
            "description": "<p>Object describing the server's implementation</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "jsonapi.version",
            "description": "<p>Version of API</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>User object</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.type",
            "description": "<p>Resource type</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.id",
            "description": "<p>Id of user</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.attributes",
            "description": "<p>Object representing some of the resource's data</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.attributes.email",
            "description": "<p>Email <code>(only show when current user access)</code></p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.attributes.first_name",
            "description": "<p>First name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.attributes.last_name",
            "description": "<p>Last name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.attributes.birthday",
            "description": "<p>Birthday (ISO 8601 format)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n  \"jsonapi\": {\n    \"version\": \"1.0.0\"\n  },\n  \"data\": {\n    \"id\": \"1\",\n    \"type\": \"user\",\n    \"attributes\": {\n      \"email\": \"jack@example.com\",\n      \"first_name\": \"Jack\",\n      \"last_name\": \"Sparrow\",\n      \"birthday\": \"2010-10-12T08:50Z\"\n    }\n  }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "jsonapi",
            "description": "<p>Object describing the server's implementation</p>"
          },
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "jsonapi.version",
            "description": "<p>Version of API</p>"
          },
          {
            "group": "Error 4xx",
            "type": "Object[]",
            "optional": false,
            "field": "errors",
            "description": "<p>Array of error objects</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "General Error",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"jsonapi\": {\n    \"version\": \"1.0.0\"\n  },\n  \"errors\": [\n    {\n      \"code\": \"101\",\n      \"title\": \"Unauthorized\",\n      \"detail\": \"Invalid or expired token.\"\n    }\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "apidocs.source/users/get_me.js",
    "groupTitle": "Users"
  },
  {
    "type": "get",
    "url": "/users/:id",
    "title": "Read an user information",
    "version": "1.0.0",
    "name": "UsersGetUser",
    "group": "Users",
    "description": "<p>Read data of a User</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Id of user</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "jsonapi",
            "description": "<p>Object describing the server's implementation</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "jsonapi.version",
            "description": "<p>Version of API</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>User object</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.type",
            "description": "<p>Resource type</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.id",
            "description": "<p>Id of user</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.attributes",
            "description": "<p>Object representing some of the resource's data</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.attributes.email",
            "description": "<p>Email <code>(only show when current user access)</code></p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.attributes.first_name",
            "description": "<p>First name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.attributes.last_name",
            "description": "<p>Last name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.attributes.birthday",
            "description": "<p>Birthday (ISO 8601 format)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n  \"jsonapi\": {\n    \"version\": \"1.0.0\"\n  },\n  \"data\": {\n    \"id\": \"1\",\n    \"type\": \"user\",\n    \"attributes\": {\n      \"email\": \"jack@example.com\",\n      \"first_name\": \"Jack\",\n      \"last_name\": \"Sparrow\",\n      \"birthday\": \"2010-10-12T08:50Z\"\n    }\n  }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "jsonapi",
            "description": "<p>Object describing the server's implementation</p>"
          },
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "jsonapi.version",
            "description": "<p>Version of API</p>"
          },
          {
            "group": "Error 4xx",
            "type": "Object[]",
            "optional": false,
            "field": "errors",
            "description": "<p>Array of error objects</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "General Error",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"jsonapi\": {\n    \"version\": \"1.0.0\"\n  },\n  \"errors\": [\n    {\n      \"code\": \"404\",\n      \"title\": \"Not Found\",\n      \"detail\": \"User does not exists.\"\n    }\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "apidocs.source/users/get_user.js",
    "groupTitle": "Users"
  },
  {
    "type": "get",
    "url": "/users?page[limit]=2&page[offset]=2",
    "title": "Retrieve list of users",
    "version": "1.0.0",
    "name": "UsersGetUsers",
    "group": "Users",
    "description": "<p>Retrieve list of user</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String[]",
            "optional": true,
            "field": "page",
            "description": "<p>Pagination</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "page.limit",
            "defaultValue": "25",
            "description": "<p>Limit items on each page</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "page.offset",
            "defaultValue": "0",
            "description": "<p>Offset</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "page.cursor",
            "defaultValue": "0",
            "description": "<p>Cursor</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "jsonapi",
            "description": "<p>Object describing the server's implementation</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "jsonapi.version",
            "description": "<p>Version of API</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "meta",
            "description": "<p>Object contains non-standard meta-information</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "meta.total_objects",
            "description": "<p>Total objects of current page</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data",
            "description": "<p>Array of user object</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.type",
            "description": "<p>Resource type</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.id",
            "description": "<p>Id of user</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.attributes",
            "description": "<p>Object representing some of the resource's data</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.attributes.email",
            "description": "<p>Email <code>(only show when current user access)</code></p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.attributes.first_name",
            "description": "<p>First name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.attributes.last_name",
            "description": "<p>Last name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.attributes.birthday",
            "description": "<p>Birthday (ISO 8601 format)</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "links",
            "description": "<p>Object contains links of pagination</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "links.self",
            "description": "<p>Current link</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": true,
            "field": "links.first",
            "description": "<p>First link</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": true,
            "field": "links.prev",
            "description": "<p>Preview link</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": true,
            "field": "links.next",
            "description": "<p>Next link</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": true,
            "field": "links.last",
            "description": "<p>Last link</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n  \"jsonapi\": {\n    \"version\": \"1.0.0\"\n  },\n  \"meta\": {\n    \"total_objects\": 20\n  },\n  \"data\": [\n    {\n      \"id\": \"2\",\n      \"type\": \"user\",\n      \"attributes\": {\n        \"first_name\": \"Ellie\",\n        \"last_name\": \"Fredricksen\",\n        \"birthday\": \"1990-12-03T00:00Z\"\n      }\n    },\n    {\n      \"id\": \"1\",\n      \"type\": \"user\",\n      \"attributes\": {\n        \"email\": \"jack@example.com\",\n        \"first_name\": \"Jack\",\n        \"last_name\": \"Sparrow\",\n        \"birthday\": \"1987-10-12T00:00Z\"\n      }\n    }\n  ],\n  \"links\": {\n    \"self\": \"http://example.com/users?page[offset]=2&page[limit]=2\",\n    \"first\": \"http://example.com/users?page[offset]=0&page[limit]=2\",\n    \"prev\": \"http://example.com/users?page[offset]=0&page[limit]=2\",\n    \"next\": \"http://example.com/users?page[offset]=4&page[limit]=2\",\n    \"last\": \"http://example.com/users?page[offset]=10&page[limit]=2\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "Empty list",
          "content": "HTTP/1.1 200 OK\n{\n  \"jsonapi\": {\n    \"version\": \"1.0.0\"\n  },\n  \"meta\": {\n    \"total_objects\": 0\n  },\n  \"data\": [],\n  \"links\": {\n    \"self\": \"http://example.com/users?page[offset]=0&page[limit]=2\",\n  }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "apidocs.source/users/get_users.js",
    "groupTitle": "Users"
  },
  {
    "type": "patch",
    "url": "/users/:id",
    "title": "Update an user",
    "version": "1.0.0",
    "name": "UsersPatchUsers",
    "group": "Users",
    "permission": [
      {
        "name": "user, admin"
      }
    ],
    "description": "<p>Update an user. Also use for <code>edit profile</code>, <code>change password</code> features</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Access Token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request Header",
          "content": "{ \"Authorization\": \"Bearer Qcg6yI1a5qCxXgKWtSAbZ2MIHFChHAq0Vc1Lo4TX\" }",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "password",
            "description": "<p>Password</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "first_name",
            "description": "<p>First name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "last_name",
            "description": "<p>Last name</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success - Created 201": [
          {
            "group": "Success - Created 201",
            "type": "Object",
            "optional": false,
            "field": "jsonapi",
            "description": "<p>Object describing the server's implementation</p>"
          },
          {
            "group": "Success - Created 201",
            "type": "String",
            "optional": false,
            "field": "jsonapi.version",
            "description": "<p>Version of API</p>"
          },
          {
            "group": "Success - Created 201",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>User object</p>"
          },
          {
            "group": "Success - Created 201",
            "type": "String",
            "optional": false,
            "field": "data.type",
            "description": "<p>Resource type</p>"
          },
          {
            "group": "Success - Created 201",
            "type": "String",
            "optional": false,
            "field": "data.id",
            "description": "<p>Id of user</p>"
          },
          {
            "group": "Success - Created 201",
            "type": "Object",
            "optional": false,
            "field": "data.attributes",
            "description": "<p>Object representing some of the resource's data</p>"
          },
          {
            "group": "Success - Created 201",
            "type": "String",
            "optional": false,
            "field": "data.attributes.email",
            "description": "<p>Email <code>(only show when current user access)</code></p>"
          },
          {
            "group": "Success - Created 201",
            "type": "String",
            "optional": false,
            "field": "data.attributes.first_name",
            "description": "<p>First name</p>"
          },
          {
            "group": "Success - Created 201",
            "type": "String",
            "optional": false,
            "field": "data.attributes.last_name",
            "description": "<p>Last name</p>"
          },
          {
            "group": "Success - Created 201",
            "type": "String",
            "optional": false,
            "field": "data.attributes.birthday",
            "description": "<p>Birthday (ISO 8601 format)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n  \"jsonapi\": {\n    \"version\": \"1.0.0\"\n  },\n  \"data\": {\n    \"id\": \"1\",\n    \"type\": \"user\",\n    \"attributes\": {\n      \"email\": \"jack@example.com\",\n      \"first_name\": \"Jack\",\n      \"last_name\": \"Sparrow\",\n      \"birthday\": \"2010-10-12T08:50Z\"\n    }\n  }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "jsonapi",
            "description": "<p>Object describing the server's implementation</p>"
          },
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "jsonapi.version",
            "description": "<p>Version of API</p>"
          },
          {
            "group": "Error 4xx",
            "type": "Object[]",
            "optional": false,
            "field": "errors",
            "description": "<p>Array of error objects</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Validation Error",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"jsonapi\": {\n    \"version\": \"1.0.0\"\n  },\n  \"errors\": [\n    {\n      \"code\": \"2\",\n      \"title\": \"Validation error\",\n      \"detail\": \"The email field is required.\"\n      \"source\": {\n        \"password\": [\n          \"The password must be at least 6 characters.\"\n        ]\n      }\n    }\n  ]\n}",
          "type": "json"
        },
        {
          "title": "General Error",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"jsonapi\": {\n    \"version\": \"1.0.0\"\n  },\n  \"errors\": [\n    {\n      \"code\": \"101\",\n      \"title\": \"Unauthorized\",\n      \"detail\": \"Invalid or expired token.\"\n    }\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "apidocs.source/users/patch_users.js",
    "groupTitle": "Users"
  },
  {
    "type": "post",
    "url": "/users",
    "title": "Create an user",
    "version": "1.0.0",
    "name": "UsersPostUsers",
    "group": "Users",
    "description": "<p>Create an user. Also use for <code>register</code> feature</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "first_name",
            "description": "<p>First name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "last_name",
            "description": "<p>Last name</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success - Created 201": [
          {
            "group": "Success - Created 201",
            "type": "Object",
            "optional": false,
            "field": "jsonapi",
            "description": "<p>Object describing the server's implementation</p>"
          },
          {
            "group": "Success - Created 201",
            "type": "String",
            "optional": false,
            "field": "jsonapi.version",
            "description": "<p>Version of API</p>"
          },
          {
            "group": "Success - Created 201",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>User object</p>"
          },
          {
            "group": "Success - Created 201",
            "type": "String",
            "optional": false,
            "field": "data.type",
            "description": "<p>Resource type</p>"
          },
          {
            "group": "Success - Created 201",
            "type": "String",
            "optional": false,
            "field": "data.id",
            "description": "<p>Id of user</p>"
          },
          {
            "group": "Success - Created 201",
            "type": "Object",
            "optional": false,
            "field": "data.attributes",
            "description": "<p>Object representing some of the resource's data</p>"
          },
          {
            "group": "Success - Created 201",
            "type": "String",
            "optional": false,
            "field": "data.attributes.email",
            "description": "<p>Email <code>(only show when current user access)</code></p>"
          },
          {
            "group": "Success - Created 201",
            "type": "String",
            "optional": false,
            "field": "data.attributes.first_name",
            "description": "<p>First name</p>"
          },
          {
            "group": "Success - Created 201",
            "type": "String",
            "optional": false,
            "field": "data.attributes.last_name",
            "description": "<p>Last name</p>"
          },
          {
            "group": "Success - Created 201",
            "type": "String",
            "optional": false,
            "field": "data.attributes.birthday",
            "description": "<p>Birthday (ISO 8601 format)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 201 Created\n{\n  \"jsonapi\": {\n    \"version\": \"1.0.0\"\n  },\n  \"data\": {\n    \"id\": \"1\",\n    \"type\": \"user\",\n    \"attributes\": {\n      \"email\": \"jack@example.com\",\n      \"first_name\": \"Jack\",\n      \"last_name\": \"Sparrow\",\n      \"birthday\": \"2010-10-12T08:50Z\"\n    }\n  }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "jsonapi",
            "description": "<p>Object describing the server's implementation</p>"
          },
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "jsonapi.version",
            "description": "<p>Version of API</p>"
          },
          {
            "group": "Error 4xx",
            "type": "Object[]",
            "optional": false,
            "field": "errors",
            "description": "<p>Array of error objects</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Validation Error",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"jsonapi\": {\n    \"version\": \"1.0.0\"\n  },\n  \"errors\": [\n    {\n      \"code\": \"2\",\n      \"title\": \"Validation error\",\n      \"detail\": \"The email field is required.\"\n      \"source\": {\n        \"email\": [\n          \"The email field is required.\",\n          \"The email field must be string.\"\n        ],\n        \"password\": [\n          \"The password field is required.\"\n        ]\n      }\n    }\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "apidocs.source/users/post_users.js",
    "groupTitle": "Users"
  }
] });