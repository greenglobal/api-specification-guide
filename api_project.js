define({
  "name": "API Templates",
  "version": "1.0.0",
  "description": "API Templates",
  "title": "API Templates",
  "url": "/v1",
  "header": {
    "title": "Intro",
    "content": "<h1>Intro</h1>\n<p>This is used to provide the example of popular apis.</p>\n<p>This follow by <a href=\"http://pm.greenglobal.vn/articles/json-api-specification/1798\">JSON API Specification</a>.</p>\n"
  },
  "footer": {
    "title": "Error Code Table",
    "content": "<h1>Error Code Table</h1>\n<h2>General Errors</h2>\n<table>\n<thead>\n<tr>\n<th>Error number</th>\n<th>Constant name</th>\n<th>Error description</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>0</td>\n<td>API_EC_SUCCESS</td>\n<td>Success</td>\n</tr>\n<tr>\n<td>1</td>\n<td>API_EC_UNKNOWN</td>\n<td>An unknown error occurred</td>\n</tr>\n<tr>\n<td>2</td>\n<td>API_EC_VALIDATE</td>\n<td>A validation error</td>\n</tr>\n</tbody>\n</table>\n<h2>Authorize Errors</h2>\n<table>\n<thead>\n<tr>\n<th>Error number</th>\n<th>Constant name</th>\n<th>Error description</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>100</td>\n<td>API_EC_AUTHORIZE</td>\n<td>No Authorize</td>\n</tr>\n<tr>\n<td>101</td>\n<td>API_EC_AUTHORIZE_TOKEN</td>\n<td>Invalid or expired token</td>\n</tr>\n</tbody>\n</table>\n<h2>Authentication Errors</h2>\n<table>\n<thead>\n<tr>\n<th>Error number</th>\n<th>Constant name</th>\n<th>Error description</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>200</td>\n<td>API_EC_AUTH_EMAIL</td>\n<td>Invalid email</td>\n</tr>\n<tr>\n<td>201</td>\n<td>API_EC_AUTH_PASSWORD</td>\n<td>Invalid password</td>\n</tr>\n<tr>\n<td>202</td>\n<td>API_EC_AUTH_EMAIL_PASSWORD</td>\n<td>Invalid email or password</td>\n</tr>\n</tbody>\n</table>\n"
  },
  "order": [
    "Auth",
    "AuthLogin",
    "AuthLogout",
    "Users",
    "UsersPostUsers",
    "UsersGetMe",
    "UsersGetUser",
    "UsersGetUsers",
    "UsersPatchUsers",
    "UsersDeleteUsers"
  ],
  "template": {
    "withCompare": true,
    "withGenerator": true
  },
  "sampleUrl": false,
  "apidoc": "0.2.0",
  "generator": {
    "name": "apidoc",
    "time": "2016-02-04T07:22:26.491Z",
    "url": "http://apidocjs.com",
    "version": "0.14.0"
  }
});
