'use strict';
var expect = require('chai').expect;
var index = require('../dist/index.js');

var data = {
    "links": {
        "self": "http://example.com/articles",
        "next": "http://example.com/articles?page[offset]=2",
        "last": "http://example.com/articles?page[offset]=10"
    },
    "data": [
        {
            "type": "articles",
            "id": "1",
            "attributes": {
                "title": "JSON:API paints my bikeshed!"
            },
            "relationships": {
                "author": {
                    "links": {
                        "self": "http://example.com/articles/1/relationships/author",
                        "related": "http://example.com/articles/1/author"
                    },
                    "data": {
                        "type": "people",
                        "id": "9"
                    }
                },
                "comments": {
                    "links": {
                        "self": "http://example.com/articles/1/relationships/comments",
                        "related": "http://example.com/articles/1/comments"
                    },
                    "data": [
                        {
                            "type": "comments",
                            "id": "5"
                        },
                        {
                            "type": "comments",
                            "id": "12"
                        }
                    ]
                }
            },
            "links": {
                "self": "http://example.com/articles/1"
            }
        },
        {
            "type": "articles",
            "id": "2",
            "attributes": {
                "title": "JSON:API paints my bikeshed part 2!"
            },
            "relationships": {
                "author": {
                    "links": {
                        "self": "http://example.com/articles/1/relationships/author",
                        "related": "http://example.com/articles/2/author"
                    },
                    "data": {
                        "type": "people",
                        "id": "10"
                    }
                },
                "comments": {
                    "links": {
                        "self": "http://example.com/articles/1/relationships/comments",
                        "related": "http://example.com/articles/2/comments"
                    },
                    "data": [
                        {
                            "type": "comments",
                            "id": "6"
                        },
                        {
                            "type": "comments",
                            "id": "13"
                        }
                    ]
                }
            },
            "links": {
                "self": "http://example.com/articles/1"
            }
        }
    ],
    "included": [
        {
            "type": "people",
            "id": "9",
            "attributes": {
                "firstName": "Dan",
                "lastName": "Gebhardt",
                "twitter": "dgeb"
            },
            "links": {
                "self": "http://example.com/people/9"
            }
        },
        {
            "type": "people",
            "id": "10",
            "attributes": {
                "firstName": "Joe",
                "lastName": "sdfsd",
                "twitter": "dtgert"
            },
            "links": {
                "self": "http://example.com/people/10"
            }
        },
        {
            "type": "comments",
            "id": "5",
            "attributes": {
                "body": "First!"
            },
            "relationships": {
                "author": {
                    "data": {
                        "type": "people",
                        "id": "2"
                    }
                }
            },
            "links": {
                "self": "http://example.com/comments/5"
            }
        },
        {
            "type": "comments",
            "id": "12",
            "attributes": {
                "body": "I like XML better"
            },
            "relationships": {
                "author": {
                    "data": {
                        "type": "people",
                        "id": "9"
                    }
                }
            },
            "links": {
                "self": "http://example.com/comments/12"
            }
        },
        {
            "type": "comments",
            "id": "6",
            "attributes": {
                "body": "Second!"
            },
            "relationships": {
                "author": {
                    "data": {
                        "type": "people",
                        "id": "3"
                    }
                }
            },
            "links": {
                "self": "http://example.com/comments/6"
            }
        },
        {
            "type": "comments",
            "id": "13",
            "attributes": {
                "body": "Second Thirteen!"
            },
            "relationships": {
                "author": {
                    "data": {
                        "type": "people",
                        "id": "4"
                    }
                }
            },
            "links": {
                "self": "http://example.com/comments/13"
            }
        }
    ]
};
var serObj;
var desObj;
var jsonObj = new index.JSONAPI(data);

describe('serialize function test', () => {
    it('should return serialize object', () => {
        var result = jsonObj.serialize().then(x => {
            serObj = x;
            expect(x).not.be.null;
        });
        expect(result).not.be.null;
    });

});

describe('deserialize function test', () => {
    it('should return deserialize object', () => {
        var res = jsonObj.deserialize(serObj).then(y => {
            desObj=y;
            expect(y).not.be.null;
        });
        expect(res).not.be.null;
    });

});