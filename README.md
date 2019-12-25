# Typescript based JSONAPI Serialize & Deserialize library
Serialize &amp; Dserialize JSON API


[![npm](https://img.shields.io/npm/dt/@pixelbyaj/jsonapi?style=social)](https://www.npmjs.com/package/@pixelbyaj/jsonapi)
[![npm](https://img.shields.io/github/license/pixelbyaj/jsonapi?style=social)](https://github.com/pixelbyaj/jsonapi/blob/master/LICENSE)

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
