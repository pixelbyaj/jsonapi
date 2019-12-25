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
    import { JSONAPI } from 'jsonapi-parser';
    let jsonapi = new JSONAPI(JSON_API_OBJECT);
    jsonapi.serialize();
    jsonapi.deserialize();
```
