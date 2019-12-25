# Typescript based JSONAPI Serialize & Deserialize library
Serialize &amp; Dserialize JSON API

## Installation 
```console
    npm i jsonapi-parser --save
    yarn add jsonapi-parser
    bower install jsonapi-parser --save
```
## Usage
### TypeScript
```typescript
    import { JSONAPI } from '@pixelbyaj/jsonapi';
    let jsonapi = new JSONAPI(JSON_API_OBJECT);
    jsonapi.serialize().then(x=>{
        console.log(JSON.stringify(x));
        jsonapi.deserialize(x).then(y=>{
            console.log(JSON.stringify(y));
       })
    });
  })
 
```
