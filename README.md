# umimock

umimock is simple REST API mock server.

# Usage

Create json File

```
{
    "/hoge/":{
        "get":{
            "data":{
                returns
            }
        },
        "post":{
            "data":{
                returns
            }
        }
    }
}
```

Start

```umimock <filename> <port>```

# License

"umimock" is under [MIT license](https://en.wikipedia.org/wiki/MIT_License).