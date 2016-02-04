# JSON API Specification (v1.0)

A guide for writing consistent and aesthetically pleasing JSON API in [Green Global Co.,Ltd](http://greenglobal.vn). 

This specification refer from [http://jsonapi.org](http://jsonapi.org)

## Table of contents

* [Conventions](#conventions)
* [Document Structure](#document-structure)
  + [Top Level](#top-level)
  + [Resource Objects](#resource-objects)
  + [Compound Documents](#compound-documents)
  + [Meta Information](#meta-information)
  + [Links](#links)
* [Fetching Data](#fetching-data)
  + [Fetching Resources](#fetching-resources)
  + [Fetching Relationships](#fetching-relationships)
  + [Sparse Fieldsets](#sparse-fieldsets)
  + [Sorting](#sorting)
  + [Pagination](#pagination)
  + [Filtering](#filtering)
* [Creating, Updating and Deleting Resources](#creating-updating-and-deleting-resources)
  + [Creating Resources](#creating-resources)
  + [Updating Resources](#updating-resources)
  + [Updating Relationships](#updating-relationships)
  + [Deleting Resources](#deleting-resources)
* [Errors](#errors)
  + [Processing Errors](#processing-errors)
  + [Error Objects](#error-objects)
* [Resource Naming](#resource-naming)
* [Popular API Templates](#popular-api-templates)

## Conventions

The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be interpreted as described in RFC 2119 [[RFC2119](http://tools.ietf.org/html/rfc2119)].

## Document Structure

Here's an example response from a blog that implements JSON API:

```js
{
  "links": {
    "self": "http://example.com/articles",
    "next": "http://example.com/articles?page[offset]=2",
    "last": "http://example.com/articles?page[offset]=10"
  },
  "data": [{
    "type": "articles",
    "id": "1",
    "attributes": {
      "title": "JSON API paints my bikeshed!"
    },
    "relationships": {
      "author": {
        "links": {
          "self": "http://example.com/articles/1/relationships/author",
          "related": "http://example.com/articles/1/author"
        },
        "data": { "type": "people", "id": "9" }
      },
      "comments": {
        "links": {
          "self": "http://example.com/articles/1/relationships/comments",
          "related": "http://example.com/articles/1/comments"
        },
        "data": [
          { "type": "comments", "id": "5" },
          { "type": "comments", "id": "12" }
        ]
      }
    },
    "links": {
      "self": "http://example.com/articles/1"
    }
  }],
  "included": [{
    "type": "people",
    "id": "9",
    "attributes": {
      "first-name": "Dan",
      "last-name": "Gebhardt",
      "twitter": "dgeb"
    },
    "links": {
      "self": "http://example.com/people/9"
    }
  }, {
    "type": "comments",
    "id": "5",
    "attributes": {
      "body": "First!"
    },
    "relationships": {
      "author": {
        "data": { "type": "people", "id": "2" }
      }
    },
    "links": {
      "self": "http://example.com/comments/5"
    }
  }, {
    "type": "comments",
    "id": "12",
    "attributes": {
      "body": "I like XML better"
    },
    "relationships": {
      "author": {
        "data": { "type": "people", "id": "9" }
      }
    },
    "links": {
      "self": "http://example.com/comments/12"
    }
  }]
}
```

### Top Level

A JSON object **MUST** be at the root of every JSON API request and response containing data. This object defines a document's "top level".

A document **MUST** contain at least one of the following top-level members:

* `data`: the document's "primary data"
* `errors`: an array of [error objects](#errors)
* `meta`: a [meta object](#meta-information) that contains non-standard meta-information.

The members `data` and `errors` **MUST NOT** coexist in the same document.

Here's an example normal response:

```js
{
  "meta": {},
  "data" {
    // primary data
  }
}
```

Here's an example error response:

```js
{
  "meta": {},
  "errors" {
    // error object
  }
}
```

### Resource Objects

"Resource objects" appear in a JSON API document to represent resources.

A resource object **MUST** contain at least the following top-level members:

* `id`
* `type`

In addition, a resource object **MAY** contain any of these top-level members:

* `attributes`: an attributes object representing some of the resource's data.
* `relationships`: a relationships object describing relationships between the resource and other JSON API resources.
* `links`: a links object containing links related to the resource.
* `meta`: a meta object containing non-standard meta-information about a resource that can not be represented as an attribute or relationship.

Here's how an article (i.e. a resource of type "articles") might appear in a document:

```js
// ...
{
  "type": "articles",
  "id": "1",
  "attributes": {
    "title": "Rails is Omakase",
    "content" "Lorem ipsum dolor ..."
  },
  "relationships": {
    "author": {
      "links": {
        "self": "/articles/1/relationships/author",
        "related": "/articles/1/author"
      },
      "data": { "type": "people", "id": "9" }
    }
  }
}
// ...
```

#### Identification

Every [resource object](#resource-objects) **MUST** contain an `id` member and a `type` member. The values of the `id` and `type` members **MUST** be strings.

Within a given API, each resource object's `type` and `id` pair **MUST** identify a single, unique resource. (The set of URIs controlled by a server, or multiple servers acting as one, constitute an API.)

The `type` member is used to describe [resource objects](#resource-objects) that share common attributes and relationships.

> Note: This spec is agnostic about inflection rules, so the value of type can be either plural or singular. However, the same value should be used consistently throughout an implementation.

#### Attributes

The value of the `attributes` key **MUST** be an object (an "attributes object"). Members of the attributes object ("attributes") represent information about the [resource objects](#resource-objects) in which it's defined.

Attributes may contain any valid JSON value.

Complex data structures involving JSON objects and arrays are allowed as attribute values. However, any object that constitutes or is contained in an attribute **MUST NOT** contain a `relationships` or `links` member, as those members are reserved by this specification for future use.

Although has-one foreign keys (e.g. `author_id`) are often stored internally alongside other information to be represented in a resource object, these keys **SHOULD NOT** appear as attributes.

#### Relationships

The value of the `relationships` key **MUST** be an object (a "relationships object"). Members of the relationships object ("relationships") represent references from the [resource object](#resource-objects) in which it's defined to other resource objects.

Relationships may be to-one or to-many.

A "relationship object" **MUST** contain at least one of the following:

* `links`: a [links object](#links) containing at least one of the following:
  * `self`: a link for the relationship itself (a "relationship link"). This link allows the client to directly manipulate the relationship. For example, removing an `author` through an `article`'s relationship URL would disconnect the person from the `article` without deleting the `people` resource itself. When fetched successfully, this link returns the [linkage](#resource-linkage) for the related resources as its primary data. (See [Fetching Relationships](#fetching-relationships).)
  * `related`: a [related resource link](#related-resource-links)
* `data`: [resource linkage](#resource-linkage)
* `meta`: a [meta object](#meta-information) that contains non-standard meta-information about the relationship.

A relationship object that represents a to-many relationship **MAY** also contain [pagination](#pagination) links under the `links` member, as described below.

#### Related Resource Links

A "related resource link" provides access to [resource objects] [linked](#links) in a [relationship](#relationships). When fetched, the related resource object(s) are returned as the response's primary data.

For example, an `article`'s `comments` [relationship](#relationships) could specify a [link](#links) that returns a collection of comment [resource objects](#resource-objects) when retrieved through a `GET` request.

If present, a related resource link **MUST** reference a valid URL, even if the relationship isn't currently associated with any target resources. Additionally, a related resource link **MUST NOT** change because its relationship's content changes.

#### Resource Linkage

Resource linkage in a [compound document](#compound-documents) allows a client to link together all of the included [resource objects](#resource-objects) without having to `GET` any URLs via [links](#links).

Resource linkage **MUST** be represented as one of the following:

* `null` for empty to-one relationships.
* an empty array (`[]`) for empty to-many relationships.
* a single [resource identifier object](#resource-identifier-objects) for non-empty to-one relationships.
* an array of [resource identifier objects](#resource-identifier-objects) for non-empty to-many relationships.

> Note: The spec does not impart meaning to order of resource identifier objects in linkage arrays of to-many relationships, although implementations may do that. Arrays of resource identifier objects may represent ordered or unordered relationships, and both types can be mixed in one response object.

For example, the following article is associated with an `author`:

```js
// ...
{
  "type": "articles",
  "id": "1",
  "attributes": {
    "title": "Rails is Omakase"
  },
  "relationships": {
    "author": {
      "links": {
        "self": "http://example.com/articles/1/relationships/author",
        "related": "http://example.com/articles/1/author"
      },
      "data": { "type": "people", "id": "9" }
    }
  },
  "links": {
    "self": "http://example.com/articles/1"
  }
}
// ...
```

The `author` relationship includes a link for the relationship itself (which allows the client to change the related author directly), a related resource link to fetch the resource objects, and linkage information.

#### Resource Links

The optional links member within each [resource object](#resource-objects) contains [links](#links) related to the resource.

If present, this links object **MAY** contain a `self` [link](#links) that identifies the resource represented by the resource object.

```js
// ...
{
  "type": "articles",
  "id": "1",
  "attributes": {
    "title": "Rails is Omakase"
  },
  "links": {
    "self": "http://example.com/articles/1"
  }
}
// ...
```

A server **MUST** respond to a `GET` request to the specified URL with a response that includes the resource as the primary data.

#### Resource Identifier Objects

A "resource identifier object" is an object that identifies an individual resource.

A "resource identifier object" **MUST** contain `type` and `id` members.

A "resource identifier object" **MAY** also include a `meta` member, whose value is a meta object that contains non-standard [meta-information](#meta-information).

### Compound Documents

To reduce the number of HTTP requests, servers **MAY** allow responses that include related resources along with the requested primary resources. Such responses are called "compound documents".

In a compound document, all included resources **MUST** be represented as an array of resource objects in a top-level `included` member.

Compound documents require "full linkage", meaning that every included resource **MUST** be identified by at least one [resource identifier object](#resource-identifier-objects) in the same document. These resource identifier objects could either be primary data or represent resource linkage contained within primary or included resources.

The only exception to the full linkage requirement is when relationship fields that would otherwise contain linkage data are excluded via [sparse fieldsets](#sparse-fieldsets).

> Note: Full linkage ensures that included resources are related to either the primary data (which could be resource objects or resource identifier objects) or to each other.

A complete example document with multiple included relationships:

```js
{
  "data": [{
    "type": "articles",
    "id": "1",
    "attributes": {
      "title": "JSON API paints my bikeshed!"
    },
    "links": {
      "self": "http://example.com/articles/1"
    },
    "relationships": {
      "author": {
        "links": {
          "self": "http://example.com/articles/1/relationships/author",
          "related": "http://example.com/articles/1/author"
        },
        "data": { "type": "people", "id": "9" }
      },
      "comments": {
        "links": {
          "self": "http://example.com/articles/1/relationships/comments",
          "related": "http://example.com/articles/1/comments"
        },
        "data": [
          { "type": "comments", "id": "5" },
          { "type": "comments", "id": "12" }
        ]
      }
    }
  }],
  "included": [{
    "type": "people",
    "id": "9",
    "attributes": {
      "first-name": "Dan",
      "last-name": "Gebhardt",
      "twitter": "dgeb"
    },
    "links": {
      "self": "http://example.com/people/9"
    }
  }, {
    "type": "comments",
    "id": "5",
    "attributes": {
      "body": "First!"
    },
    "relationships": {
      "author": {
        "data": { "type": "people", "id": "2" }
      }
    },
    "links": {
      "self": "http://example.com/comments/5"
    }
  }, {
    "type": "comments",
    "id": "12",
    "attributes": {
      "body": "I like XML better"
    },
    "relationships": {
      "author": {
        "data": { "type": "people", "id": "9" }
      }
    },
    "links": {
      "self": "http://example.com/comments/12"
    }
  }]
}
```

A [compound document](#compound-documents) **MUST NOT** include more than one [resource object](#resource-objects) for each `type` and `id` pair.

> Note: In a single document, you can think of the `type` and `id` as a composite key that uniquely references [resource objects](#resource-objects) in another part of the document.

> Note: This approach ensures that a single canonical [resource object](#resource-objects) is returned with each response, even when the same resource is referenced multiple times.

### Meta Information

Where specified, a `meta` member can be used to include non-standard meta-information. The value of each `meta` member **MUST** be an object (a "meta object").

Any members **MAY** be specified within `meta` objects.

For example:

```js
{
  "meta": {
    "copyright": "Copyright 2015 Example Corp.",
    "authors": [
      "Yehuda Katz",
      "Steve Klabnik",
      "Dan Gebhardt",
      "Tyler Kellen"
    ]
  },
  "data": {
    // ...
  }
}
```

### Links

Where specified, a links member can be used to represent `links`. The value of each `links` member **MUST** be an object (a "links object").

Each member of a links object is a "link". A link **MUST** be represented as either:

* a string containing the link's URL.
* an object ("link object") which can contain the following members:
  * `href`: a string containing the link's URL.
  * `meta`: a meta object containing non-standard meta-information about the link.

The following `self` link is simply a URL:

```js
"links": {
  "self": "http://example.com/posts",
}
```

The following `related` link includes a URL as well as meta-information about a related resource collection:

```js
"links": {
  "related": {
    "href": "http://example.com/articles/1/comments",
    "meta": {
      "count": 10
    }
  }
}
```

> Note: Additional members may be specified for links objects and link objects in the future. It is also possible that the allowed values of additional members will be expanded (e.g. a `collection` link may support an array of values, whereas a `self` link does not).

## Fetching Data

Data, including resources and relationships, can be fetched by sending a `GET` request to an endpoint.

Responses can be further refined with the optional features described below.

### Fetching Resources

A server **MUST** support fetching resource data for every URL provided as:

* a `self` link as part of the top-level links object
* a `self` link as part of a resource-level links object
* a `related` link as part of a relationship-level links object

For example, the following request fetches a collection of articles:

```
GET /articles HTTP/1.1
Accept: application/vnd.api+json
```

The following request fetches an article:

```
GET /articles/1 HTTP/1.1
Accept: application/vnd.api+json
```

And the following request fetches an article's author:

```
GET /articles/1/author HTTP/1.1
Accept: application/vnd.api+json
```

#### Responses

##### 200 OK

A server **MUST** respond to a successful request to fetch an individual resource or resource collection with a `200 OK` response.

A server **MUST** respond to a successful request to fetch a resource collection with an array of [resource objects](#resource-objects) or an empty array (`[]`) as the response document's primary data.

For example, a `GET` request to a collection of articles could return:

```js
HTTP/1.1 200 OK
Content-Type: application/vnd.api+json

{
  "links": {
    "self": "http://example.com/articles"
  },
  "data": [{
    "type": "articles",
    "id": "1",
    "attributes": {
      "title": "JSON API paints my bikeshed!"
    }
  }, {
    "type": "articles",
    "id": "2",
    "attributes": {
      "title": "Rails is Omakase"
    }
  }]
}
```

A similar response representing an empty collection would be:

```js
HTTP/1.1 200 OK
Content-Type: application/vnd.api+json

{
  "links": {
    "self": "http://example.com/articles"
  },
  "data": []
}
```

A server **MUST** respond to a successful request to fetch an individual resource with a [resource object](#resource-objects) or `null` provided as the response document's primary data.

`null` is only an appropriate response when the requested URL is one that might correspond to a single resource, but doesn't currently.

> Note: Consider, for example, a request to fetch a to-one related resource link. This request would respond with `null` when the relationship is empty (such that the link is corresponding to no resources) but with the single related resource's [resource object](#resource-objects) otherwise.

For example, a `GET` request to an individual article could return:

```js
HTTP/1.1 200 OK
Content-Type: application/vnd.api+json

{
  "links": {
    "self": "http://example.com/articles/1"
  },
  "data": {
    "type": "articles",
    "id": "1",
    "attributes": {
      "title": "JSON API paints my bikeshed!"
    },
    "relationships": {
      "author": {
        "links": {
          "related": "http://example.com/articles/1/author"
        }
      }
    }
  }
}
```

If the above article's author is missing, then a `GET` request to that related resource would return:

```js
HTTP/1.1 200 OK
Content-Type: application/vnd.api+json

{
  "links": {
    "self": "http://example.com/articles/1/author"
  },
  "data": null
}
```

##### 404 Not Found

A server **MUST** respond with `404 Not Found` when processing a request to fetch a single resource that does not exist, except when the request warrants a `200 OK` response with `null` as the primary data (as described above).

##### Other Responses

A server **MAY** respond with other HTTP status codes.

A server **MAY** include [error details](#errors) with error responses.

A server **MUST** prepare responses, and a client **MUST** interpret responses, in accordance with [HTTP semantics](http://tools.ietf.org/html/rfc7231).

### Fetching Relationships

A server **MUST** support fetching relationship data for every relationship URL provided as a `self` link as part of a relationship's `links` object.

For example, the following request fetches data about an article's comments:

```
GET /articles/1/relationships/comments HTTP/1.1
Accept: application/vnd.api+json
```

And the following request fetches data about an article's author:

```
GET /articles/1/relationships/author HTTP/1.1
Accept: application/vnd.api+json
```

#### Responses

##### 200 OK

A server **MUST** respond to a successful request to fetch a relationship with a `200 OK` response.

The primary data in the response document **MUST** match the appropriate value for [resource linkage](#resource-linkage), as described above for [relationship objects](#relationships).

The top-level [links object](#links) **MAY** contain `self` and `related` links, as described above for [relationship objects](#relationships).

For example, a `GET` request to a URL from a to-one relationship link could return:

```js
HTTP/1.1 200 OK
Content-Type: application/vnd.api+json

{
  "links": {
    "self": "/articles/1/relationships/author",
    "related": "/articles/1/author"
  },
  "data": {
    "type": "people",
    "id": "12"
  }
}
```

If the above relationship is empty, then a `GET` request to the same URL would return:

```js
HTTP/1.1 200 OK
Content-Type: application/vnd.api+json

{
  "links": {
    "self": "/articles/1/relationships/author",
    "related": "/articles/1/author"
  },
  "data": null
}
```

A `GET` request to a URL from a to-many relationship link could return:

```js
HTTP/1.1 200 OK
Content-Type: application/vnd.api+json

{
  "links": {
    "self": "/articles/1/relationships/tags",
    "related": "/articles/1/tags"
  },
  "data": [
    { "type": "tags", "id": "2" },
    { "type": "tags", "id": "3" }
  ]
}
```

If the above relationship is empty, then a `GET` request to the same URL would return:

```js
HTTP/1.1 200 OK
Content-Type: application/vnd.api+json

{
  "links": {
    "self": "/articles/1/relationships/tags",
    "related": "/articles/1/tags"
  },
  "data": []
}
```

##### 404 Not Found

A server **MUST** return `404 Not Found` when processing a request to fetch a relationship link URL that does not exist.

> Note: This can happen when the parent resource of the relationship does not exist. For example, when `/articles/1` does not exist, request to `/articles/1/relationships/tags` returns `404 Not Found`.

If a relationship link URL exists but the relationship is empty, then `200 OK` **MUST** be returned, as described above.

##### Other Responses

A server **MAY** respond with other HTTP status codes.

A server **MAY** include [error details](#errors) with error responses.

A server **MUST** prepare responses, and a client **MUST** interpret responses, in accordance with [HTTP semantics](http://tools.ietf.org/html/rfc7231).

### Sparse Fieldsets

A client **MAY** request that an endpoint return only specific fields in the response on a per-type basis by including a `fields[TYPE]` parameter.

The value of the `fields` parameter **MUST** be a comma-separated (U+002C COMMA, ",") list that refers to the name(s) of the fields to be returned.

If a client requests a restricted set of fields for a given resource type, an endpoint **MUST NOT** include additional fields in resource objects of that type in its response.

```
GET /articles?include=author&fields[articles]=title,body&fields[people]=name HTTP/1.1
Accept: application/vnd.api+json
```

> Note: The above example URI shows unencoded `[` and `]` characters simply for readability. In practice, these characters must be percent-encoded, per the requirements [in RFC 3986](http://tools.ietf.org/html/rfc3986#section-3.4).

> Note: This section applies to any endpoint that responds with resources as primary or included data, regardless of the request type. For instance, a server could support sparse fieldsets along with a `POST` request to create a resource.

### Sorting

A server **MAY** choose to support requests to sort resource collections according to one or more criteria ("sort fields").

> Note: Although recommended, sort fields do not necessarily need to correspond to resource attribute and association names.

> Note: It is recommended that dot-separated (U+002E FULL-STOP, ".") sort fields be used to request sorting based upon relationship attributes. For example, a sort field of `author.name` could be used to request that the primary data be sorted based upon the `name` attribute of the `author` relationship.

An endpoint **MAY** support requests to sort the primary data with a `sort` query parameter. The value for sort **MUST** represent `sort` fields.

```
GET /people?sort=age HTTP/1.1
Accept: application/vnd.api+json
```

An endpoint **MAY** support multiple sort fields by allowing comma-separated (U+002C COMMA, ",") sort fields. Sort fields **SHOULD** be applied in the order specified.

```
GET /people?sort=age,name HTTP/1.1
Accept: application/vnd.api+json
```

The sort order for each sort field **MUST** be ascending unless it is prefixed with a minus (U+002D HYPHEN-MINUS, "-"), in which case it **MUST** be descending.

```
GET /articles?sort=-created,title HTTP/1.1
Accept: application/vnd.api+json
```

The above example should return the newest articles first. Any articles created on the same date will then be sorted by their title in ascending alphabetical order.

If the server does not support sorting as specified in the query parameter `sort`, it **MUST** return `400 Bad Request`.

If sorting is supported by the server and requested by the client via query parameter `sort`, the server **MUST** return elements of the top-level `data` array of the response ordered according to the criteria specified. The server **MAY** apply default sorting rules to top-level `data` if request parameter `sort` is not specified.

> Note: This section applies to any endpoint that responds with a resource collection as primary data, regardless of the request type.

### Pagination

A server **MAY** choose to limit the number of resources returned in a response to a subset ("page") of the whole set available.

A server **MAY** provide links to traverse a paginated data set ("pagination links").

Pagination links **MUST** appear in the links object that corresponds to a collection. To paginate the primary data, supply pagination links in the top-level `links` object. To paginate an included collection returned in a [compound document](#compound-documents), supply pagination links in the corresponding links object.

The following keys **MUST** be used for pagination links:

* `first`: the first page of data
* `last`: the last page of data
* `prev`: the previous page of data
* `next`: the next page of data

Keys **MUST** either be omitted or have a `null` value to indicate that a particular link is unavailable.

Concepts of order, as expressed in the naming of pagination links, **MUST** remain consistent with JSON API's [sorting rules](#sorting).

The `page` query parameter is reserved for pagination. Servers and clients **SHOULD** use this key for pagination operations.

> Note: JSON API is agnostic about the pagination strategy used by a server. Effective pagination strategies include (but are not limited to): page-based, offset-based, and cursor-based. The page query parameter can be used as a basis for any of these strategies. For example, a page-based strategy might use query parameters such as `page[number]` and `page[size]`, an offset-based strategy might use `page[offset]` and `page[limit]`, while a cursor-based strategy might use `page[cursor]`.

> Note: The example query parameters above use unencoded `[` and `]` characters simply for readability. In practice, these characters must be percent-encoded, per the requirements in [RFC 3986](http://tools.ietf.org/html/rfc3986#section-3.4).

> Note: This section applies to any endpoint that responds with a resource collection as primary data, regardless of the request type.

### Filtering

The `filter` query parameter is reserved for filtering data. Servers and clients **SHOULD** use this key for filtering operations.

> Note: JSON API is agnostic about the strategies supported by a server. The `filter` query parameter can be used as the basis for any number of filtering strategies.

## Creating, Updating and Deleting Resources

A server **MAY** allow resources of a given type to be created. It **MAY** also allow existing resources to be modified or deleted.

A request **MUST** completely succeed or fail (in a single "transaction"). No partial updates are allowed.

> Note: The `type` member is required in every [resource object](#resource-objects) throughout requests and responses in JSON API. There are some cases, such as when `POST`ing to an endpoint representing heterogenous data, when the `type` could not be inferred from the endpoint. However, picking and choosing when it is required would be confusing; it would be hard to remember when it was required and when it was not. Therefore, to improve consistency and minimize confusion, `type` is always required.

### Creating Resources

A resource can be created by sending a `POST` request to a URL that represents a collection of resources. The request **MUST** include a single [resource object](#resource-objects) as primary data. The [resource object](#resource-objects) **MUST** contain at least a `type` member.

For instance, a new photo might be created with the following request:

```js
POST /photos HTTP/1.1
Content-Type: application/vnd.api+json
Accept: application/vnd.api+json

{
  "data": {
    "type": "photos",
    "attributes": {
      "title": "Ember Hamster",
      "src": "http://example.com/images/productivity.png"
    },
    "relationships": {
      "photographer": {
        "data": { "type": "people", "id": "9" }
      }
    }
  }
}
```

If a relationship is provided in the `relationships` member of the [resource object](#resource-objects), its value **MUST** be a relationship object with a `data` member. The value of this key represents the linkage the new resource is to have.

#### Client-Generated IDs

A server **MAY** accept a client-generated ID along with a request to create a resource. An ID **MUST** be specified with an `id` key, the value of which **MUST** be a universally unique identifier. The client **SHOULD** use a properly generated and formatted UUID as described in RFC 4122 [[RFC4122](http://tools.ietf.org/html/rfc4122.html)].

> NOTE: In some use-cases, such as importing data from another source, it may be possible to use something other than a UUID that is still guaranteed to be globally unique. Do not use anything other than a UUID unless you are 100% confident that the strategy you are using indeed generates globally unique identifiers.

For example:

```js
POST /photos HTTP/1.1
Content-Type: application/vnd.api+json
Accept: application/vnd.api+json

{
  "data": {
    "type": "photos",
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "attributes": {
      "title": "Ember Hamster",
      "src": "http://example.com/images/productivity.png"
    }
  }
}
```

A server **MUST** return `403 Forbidden` in response to an unsupported request to create a resource with a client-generated ID.

#### Responses

##### 201 Created

If a `POST` request did not include a [Client-Generated ID](#client-generated-ids) and the requested resource has been created successfully, the server **MUST** return a `201 Created` status code.

The response **SHOULD** include a `Location` header identifying the location of the newly created resource.

The response **MUST** also include a document that contains the primary resource created.

If the [resource object](#resource-objects) returned by the response contains a `self` key in its `links` member and a `Location` header is provided, the value of the `self` member **MUST** match the value of the `Location` header.

```js
HTTP/1.1 201 Created
Location: http://example.com/photos/550e8400-e29b-41d4-a716-446655440000
Content-Type: application/vnd.api+json

{
  "data": {
    "type": "photos",
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "attributes": {
      "title": "Ember Hamster",
      "src": "http://example.com/images/productivity.png"
    },
    "links": {
      "self": "http://example.com/photos/550e8400-e29b-41d4-a716-446655440000"
    }
  }
}
```

##### 202 Accepted

If a request to create a resource has been accepted for processing, but the processing has not been completed by the time the server responds, the server **MUST** return a `202 Accepted` status code.

##### 204 No Content

If a `POST` request did include a [Client-Generated ID](#client-generated-ids) and the requested resource has been created successfully, the server **MUST** return either a `201 Created` status code and response document (as described above) or a `204 No Content` status code with no response document.

> Note: If a `204` response is received the client should consider the resource object sent in the request to be accepted by the server, as if the server had returned it back in a `201` response.

##### 403 Forbidden

A server **MAY** return `403 Forbidden` in response to an unsupported request to create a resource.

##### 409 Conflict

A server **MUST** return `409 Conflict` when processing a `POST` request to create a resource with a client-generated ID that already exists.

A server **MUST** return `409 Conflict` when processing a `POST` request in which the [resource object](#resource-objects)'s `type` is not among the type(s) that constitute the collection represented by the endpoint.

A server **SHOULD** include error details and provide enough information to recognize the source of the conflict.

##### Other Responses

A server **MAY** respond with other HTTP status codes.

A server **MAY** include [error details](#errors) with error responses.

A server **MUST** prepare responses, and a client **MUST** interpret responses, in accordance with [HTTP semantics](http://tools.ietf.org/html/rfc7231).

### Updating Resources

A resource can be updated by sending a `PATCH` request to the URL that represents the resource.

The URL for a resource can be obtained in the `self` link of the resource object. Alternatively, when a `GET` request returns a single [resource object](#resource-objects) as primary data, the same request URL can be used for updates.

The `PATCH` request **MUST** include a single [resource object](#resource-objects) as primary data. The [resource object](#resource-objects) **MUST** contain `type` and `id` members.

For example:

```js
PATCH /articles/1 HTTP/1.1
Content-Type: application/vnd.api+json
Accept: application/vnd.api+json

{
  "data": {
    "type": "articles",
    "id": "1",
    "attributes": {
      "title": "To TDD or Not"
    }
  }
}
```

#### Updating a Resource's Attributes

Any or all of a resource's [attributes](#attributes) **MAY** be included in the resource object included in a `PATCH` request.

If a request does not include all of the [attributes](#attributes) for a resource, the server **MUST** interpret the missing [attributes](#attributes) as if they were included with their current values. The server **MUST NOT** interpret missing [attributes](#attributes) as `null` values.

For example, the following `PATCH` request is interpreted as a request to update only the `title` and `text` attributes of an article:

```js
PATCH /articles/1 HTTP/1.1
Content-Type: application/vnd.api+json
Accept: application/vnd.api+json

{
  "data": {
    "type": "articles",
    "id": "1",
    "attributes": {
      "title": "To TDD or Not",
      "text": "TLDR; It's complicated... but check your test coverage regardless."
    }
  }
}
```

#### Updating a Resource's Relationships

Any or all of a resource's [relationships](#relationships) **MAY** be included in the resource object included in a `PATCH` request.

If a request does not include all of the [relationships](#relationships) for a resource, the server **MUST** interpret the missing [relationships](#relationships) as if they were included with their current values. It **MUST NOT** interpret them as `null` or empty values.

If a relationship is provided in the `relationships` member of a resource object in a `PATCH` request, its value **MUST** be a relationship object with a `data` member. The relationship's value will be replaced with the value specified in this member.

For instance, the following `PATCH` request will update the `author` relationship of an article:

```js
PATCH /articles/1 HTTP/1.1
Content-Type: application/vnd.api+json
Accept: application/vnd.api+json

{
  "data": {
    "type": "articles",
    "id": "1",
    "relationships": {
      "author": {
        "data": { "type": "people", "id": "1" }
      }
    }
  }
}
```

Likewise, the following `PATCH` request performs a complete replacement of the `tags` for an article:

```js
PATCH /articles/1 HTTP/1.1
Content-Type: application/vnd.api+json
Accept: application/vnd.api+json

{
  "data": {
    "type": "articles",
    "id": "1",
    "relationships": {
      "tags": {
        "data": [
          { "type": "tags", "id": "2" },
          { "type": "tags", "id": "3" }
        ]
      }
    }
  }
}
```

A server **MAY** reject an attempt to do a full replacement of a to-many relationship. In such a case, the server **MUST** reject the entire update, and return a `403 Forbidden` response.

> Note: Since full replacement may be a very dangerous operation, a server may choose to disallow it. For example, a server may reject full replacement if it has not provided the client with the full list of associated objects, and does not want to allow deletion of records the client has not seen.

#### Responses

##### 202 Accepted

If an update request has been accepted for processing, but the processing has not been completed by the time the server responds, the server **MUST** return a `202 Accepted` status code.

##### 200 OK

If a server accepts an update but also changes the resource(s) in ways other than those specified by the request (for example, updating the `updated-at` attribute or a computed `sha`), it **MUST** return a `200 OK` response. The response document **MUST** include a representation of the updated resource(s) as if a `GET` request was made to the request URL.

A server **MUST** return a `200 OK` status code if an update is successful, the client's current attributes remain up to date, and the server responds only with top-level meta data. In this case the server **MUST NOT** include a representation of the updated resource(s).

##### 204 No Content

If an update is successful and the server doesn't update any attributes besides those provided, the server **MUST** return either a `200 OK` status code and response document (as described above) or a `204 No Content` status code with no response document.

##### 403 Forbidden

A server **MUST** return `403 Forbidden` in response to an unsupported request to update a resource or relationship.

##### 404 Not Found

A server **MUST** return `404 Not Found` when processing a request to modify a resource that does not exist.

A server **MUST** return `404 Not Found` when processing a request that references a related resource that does not exist.

##### 409 Conflict

A server **MAY** return `409 Conflict` when processing a `PATCH` request to update a resource if that update would violate other server-enforced constraints (such as a uniqueness constraint on a property other than `id`).

A server **MUST** return `409 Conflict` when processing a `PATCH` request in which the resource object's `type` and `id` do not match the server's endpoint.

A server **SHOULD** include error details and provide enough information to recognize the source of the conflict.

##### Other Responses

A server **MAY** respond with other `HTTP status` codes.

A server **MAY** include [error details](#errors) with error responses.

A server **MUST** prepare responses, and a client **MUST** interpret responses, in accordance with [HTTP semantics](http://tools.ietf.org/html/rfc7231).

### Updating Relationships

Although relationships can be modified along with resources (as described above), JSON API also supports updating of relationships independently at URLs from [relationship links](#relationships).

> Note: Relationships are updated without exposing the underlying server semantics, such as foreign keys. Furthermore, relationships can be updated without necessarily affecting the related resources. For example, if an article has many authors, it is possible to remove one of the authors from the article without deleting the person itself. Similarly, if an article has many tags, it is possible to add or remove tags. Under the hood on the server, the first of these examples might be implemented with a foreign key, while the second could be implemented with a join table, but the JSON API protocol would be the same in both cases.

> Note: A server may choose to delete the underlying resource if a relationship is deleted (as a garbage collection measure).

#### Updating To-One Relationships

A server **MUST** respond to `PATCH` requests to a URL from a to-one [relationship link](#relationships) as described below.

The `PATCH` request **MUST** include a top-level member named `data` containing one of:

* a [resource identifier object](#resource-identifier-objects) corresponding to the new related resource.
* `null`, to remove the relationship.

For example, the following request updates the author of an article:

```js
PATCH /articles/1/relationships/author HTTP/1.1
Content-Type: application/vnd.api+json
Accept: application/vnd.api+json

{
  "data": { "type": "people", "id": "12" }
}
```

And the following request clears the author of the same article:

```js
PATCH /articles/1/relationships/author HTTP/1.1
Content-Type: application/vnd.api+json
Accept: application/vnd.api+json

{
  "data": null
}
```

If the relationship is updated successfully then the server **MUST** return a successful response.

#### Updating To-Many Relationships

A server **MUST** respond to `PATCH`, `POST`, and `DELETE` requests to a URL from a to-many [relationship link](#relationships) as described below.

For all request types, the body **MUST** contain a `data` member whose value is an empty array or an array of [resource identifier objects](#resource-identifier-objects).

If a client makes a `PATCH` request to a URL from a to-many [relationship link](#relationships), the server **MUST** either completely replace every member of the relationship, return an appropriate error response if some resources can not be found or accessed, or return a `403 Forbidden` response if complete replacement is not allowed by the server.

For example, the following request replaces every tag for an article:

```js
PATCH /articles/1/relationships/tags HTTP/1.1
Content-Type: application/vnd.api+json
Accept: application/vnd.api+json

{
  "data": [
    { "type": "tags", "id": "2" },
    { "type": "tags", "id": "3" }
  ]
}
```

And the following request clears every tag for an article:

```js
PATCH /articles/1/relationships/tags HTTP/1.1
Content-Type: application/vnd.api+json
Accept: application/vnd.api+json

{
  "data": []
}
```

If a client makes a `POST` request to a URL from a [relationship link](#relationships), the server **MUST** add the specified members to the relationship unless they are already present. If a given `type` and `id` is already in the relationship, the server **MUST NOT** add it again.

> Note: This matches the semantics of databases that use foreign keys for has-many relationships. Document-based storage should check the has-many relationship before appending to avoid duplicates.

If all of the specified resources can be added to, or are already present in, the relationship then the server **MUST** return a successful response.

> Note: This approach ensures that a request is successful if the server's state matches the requested state, and helps avoid pointless race conditions caused by multiple clients making the same changes to a relationship.

In the following example, the comment with ID `123` is added to the list of comments for the article with ID `1`:

```js
POST /articles/1/relationships/comments HTTP/1.1
Content-Type: application/vnd.api+json
Accept: application/vnd.api+json

{
  "data": [
    { "type": "comments", "id": "123" }
  ]
}
```

If the client makes a `DELETE` request to a URL from a [relationship link](#relationships) the server **MUST** delete the specified members from the relationship or return a `403 Forbidden` response. If all of the specified resources are able to be removed from, or are already missing from, the relationship then the server **MUST** return a successful response.

> Note: As described above for POST requests, this approach helps avoid pointless race conditions between multiple clients making the same changes.

Relationship members are specified in the same way as in the `POST` request.

In the following example, comments with IDs of `12` and `13` are removed from the list of comments for the article with ID `1`:

```js
DELETE /articles/1/relationships/comments HTTP/1.1
Content-Type: application/vnd.api+json
Accept: application/vnd.api+json

{
  "data": [
    { "type": "comments", "id": "12" },
    { "type": "comments", "id": "13" }
  ]
}
```

> Note: RFC 7231 specifies that a DELETE request may include a body, but that a server may reject the request. This spec defines the semantics of a server, and we are defining its semantics for JSON API.

#### Responses

##### 202 Accepted

If a relationship update request has been accepted for processing, but the processing has not been completed by the time the server responds, the server **MUST** return a `202 Accepted` status code.

##### 204 No Content

A server **MUST** return a `204 No Content` status code if an update is successful and the representation of the resource in the request matches the result.

> Note: This is the appropriate response to a `POST` request sent to a URL from a to-many [relationship link](#relationships) when that relationship already exists. It is also the appropriate response to a `DELETE` request sent to a URL from a to-many [relationship link](#relationships) when that relationship does not exist.

##### 200 OK

If a server accepts an update but also changes the targeted relationship(s) in other ways than those specified by the request, it **MUST** return a `200 OK` response. The response document **MUST** include a representation of the updated relationship(s).

A server **MUST** return a `200 OK` status code if an update is successful, the client's current data remain up to date, and the server responds only with top-level [meta](#meta-information) data. In this case the server **MUST NOT** include a representation of the updated relationship(s).

##### 403 Forbidden

A server **MUST** return `403 Forbidden` in response to an unsupported request to update a relationship.

##### Other Responses

A server **MAY** respond with other `HTTP status` codes.

A server **MAY** include [error details](#errors) with error responses.

A server **MUST** prepare responses, and a client **MUST** interpret responses, in accordance with [HTTP semantics](http://tools.ietf.org/html/rfc7231).

### Deleting Resources

An individual resource can be deleted by making a `DELETE` request to the resource's URL:

```
DELETE /photos/1 HTTP/1.1
Accept: application/vnd.api+json
```

#### Responses

##### 202 Accepted

If a deletion request has been accepted for processing, but the processing has not been completed by the time the server responds, the server **MUST** return a `202 Accepted` status code.

##### 204 No Content

A server **MUST** return a `204 No Content` status code if a deletion request is successful and no content is returned.

##### 200 OK

A server **MUST** return a `200 OK` status code if a deletion request is successful and the server responds with only top-level [meta](#meta-information) data.

##### Other Responses

A server **MAY** respond with other `HTTP status` codes.

A server **MAY** include [error details](#errors) with error responses.

A server **MUST** prepare responses, and a client **MUST** interpret responses, in accordance with [HTTP semantics](http://tools.ietf.org/html/rfc7231).

## Errors

### Processing Errors

A server **MAY** choose to stop processing as soon as a problem is encountered, or it **MAY** continue processing and encounter multiple problems. For instance, a server might process multiple attributes and then return multiple validation problems in a single response.

When a server encounters multiple problems for a single request, the most generally applicable HTTP error code **SHOULD** be used in the response. For instance, `400 Bad Request` might be appropriate for multiple 4xx errors or `500 Internal Server Error` might be appropriate for multiple 5xx errors.

### Error Objects

Error objects provide additional information about problems encountered while performing an operation. Error objects **MUST** be returned as an array keyed by `errors` in the top level of a JSON API document.

An error object **MAY** have the following members:

* `id`: a unique identifier for this particular occurrence of the problem.
* `links`: a [links object](#links) containing the following members:
  + `about`: a [link](#links) that leads to further details about this particular occurrence of the problem.
* `status`: the HTTP status code applicable to this problem, expressed as a string value.
* `code`: an application-specific error code, expressed as a string value.
* `title`: a short, human-readable summary of the problem that **SHOULD NOT** change from occurrence to occurrence of the problem, except for purposes of localization.
* `detail`: a human-readable explanation specific to this occurrence of the problem. Like title, this field's value can be localized.
* `source`: an object containing references to the source of the error, optionally including any of the following members:
  + `pointer`: a JSON Pointer [[RFC6901](https://tools.ietf.org/html/rfc6901)] to the associated entity in the request document [e.g. `"/data"` for a primary data object, or `"/data/attributes/title"` for a specific attribute].
  + `parameter`: a string indicating which URI query parameter caused the error.
* `meta`: a [meta object](#meta-information) containing non-standard meta-information about the error.

## Resource Naming

Resource naming **SHOULD** define follow RESTful convention, name them as nouns as opposed to verbs or actions. In other words, a RESTful URI should refer to a resource that is a thing instead of referring to an action. Nouns have properties as verbs do not, just another distinguishing factor.

Principle: `"Nouns are good; verbs are bad"`

Some example resources are:

* Users of the system.
* Courses in which a student is enrolled.
* A user's timeline of posts.
* The users that follow another user.
* An article about horseback riding.

Resource URL Examples

```
// To insert (create) a new customer in the system, we might use:
POST http://www.example.com/customers

// To read a customer with Customer ID# 33245:
GET http://www.example.com/customers/33245 // The same URI would be used for PUT/PATCH and DELETE, to update and delete, respectively.

// Here are proposed URIs for products:
POST http://www.example.com/products // for creating a new product.

// To read, update, delete product 66432, respectively.
GET|PUT|PATCH|DELETE http://www.example.com/products/66432
```

## Popular API Templates

### Installation

```
npm install apidoc -g
apidoc -i ./apidocs.source -t ./apidocs.template -o ./
```
