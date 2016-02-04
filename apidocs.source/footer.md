# Error Code Table

## General Errors

| Error number | Constant name   | Error description         |
|--------------|-----------------|---------------------------|
| 0            | API_EC_SUCCESS  | Success                   |
| 1            | API_EC_UNKNOWN  | An unknown error occurred |
| 2            | API_EC_VALIDATE | A validation error        |

## Authorize Errors

| Error number   | Constant name           | Error description        |
|----------------|-------------------------|--------------------------|
| 100            | API_EC_AUTHORIZE        | No Authorize             |
| 101            | API_EC_AUTHORIZE_TOKEN  | Invalid or expired token |


## Authentication Errors

| Error number   | Constant name               | Error description         |
|----------------|-----------------------------|---------------------------|
| 200            | API_EC_AUTH_EMAIL           | Invalid email             |
| 201            | API_EC_AUTH_PASSWORD        | Invalid password          |
| 202            | API_EC_AUTH_EMAIL_PASSWORD  | Invalid email or password |
