export class JSONAPI {
    /**
     *
     */
    private _json_data: any;
    private _links: any[];
    private _serializeJSON: any;
    private _deSerializeJSON: any;
    private _entityTypes: any;

    constructor(data: any) {
        this._json_data = data;
        this._links = [];
        this._entityTypes = {};
    }
    
    //#region Get 
    get links() {
        return this._links;
    }

    get json() {
        return this._json_data;
    }

    get entityTypes() {
        return this._entityTypes;
    }

    ///
    /// call after serialize method 
    ///
    get serializeJSON() {
        if (this._serializeJSON) {
            return this._serializeJSON;
        }
    }

    ///
    /// call after deserialize method 
    ///
    get deSerializeJSON() {
        if (this._deSerializeJSON) {
            return this._deSerializeJSON;
        }
    }
    //#endregion

    getLink = (type: string, id: number): any => {
        let item = this._links.find(x => {
            return x[type] && x[type].id === id;
        });
        if (item && item[type]["id"])
            delete item[type]["id"];
        return item[type];
    }

    serialize = (): Promise<any> => {

        //#region Private Methods
        const getRelationships = (element: any): any => {
            let relColl = {};
            const rels = element.relationships;

            Object.keys(rels).forEach(key => {
                let plink = {};
                debugger;
                if (rels[key].links) {
                    plink[key] = { id: element.id, ...rels[key].links }
                    this._links.push(plink);
                }

                const data = rels[key].data;
                if (data instanceof Array) {
                    relColl[key] = [];
                    data.forEach(x => {
                        this._entityTypes[key] = x.type;
                        relColl[key].push(getIncludeds(x.type, x.id));
                    });
                } else {
                    this._entityTypes[key] = data.type;
                    relColl[key] = getIncludeds(data.type, data.id);
                }
            });
            if (element.links) {
                let _item = {};
                _item[element.type] = { id: element.id, ...element.links };
                this._links.push(_item);
            }

            return relColl;
        }
        const getIncludeds = (type: string, id: string): any => {
            let item = this._json_data.included.find(x => {
                if (id && type) {
                    return (x.type === type && x.id === id);
                }
                return x.type === type;
            });
            if (item.links) {
                let plink = {};
                plink[item.type] = { id: item.id, ...item.links };
                this._links.push(plink);
            }
            return { ...item.attributes, id: id };
        }
        //#endregion

        const promise = new Promise((resolve, reject) => {
            if (!this._json_data) {
                throw "No jsonapi data found";
            }
            try {
                if (this._serializeJSON) {
                    return resolve(this._serializeJSON);
                }
                // the resolve / reject functions control the fate of the promise
                let instance = []
                const self = this;
                if (this._json_data.links) {
                    this._links.push({ "all": { id: -1, ...this._json_data.links } });
                }
                this._json_data.data.forEach(element => {

                    let item = {};
                    const relationship = getRelationships(element);
                    item[element.type] = { id: element.id, ...element.attributes, ...relationship };
                    instance.push(item);
                });
                this._serializeJSON = instance;
                resolve(instance);
            } catch (error) {
                reject(error);
            }
        });
        return promise;
    }

    deserialize = (param: any[]): Promise<any> => {

        //#region Private Method
        const getJSONAPI = (element) => {
            let attrs = {};
            let relationship = {};
            let included = [];

            Object.keys(element).forEach(key => {
                if (!(element[key] instanceof Array || element[key] instanceof Object || key === "id")) {
                    attrs[key] = element[key];
                } else if (key !== "id") {
                    let link = this._links;
                    let _data;
                    const _type = this._entityTypes[key];
                    if (element[key] instanceof Array) {
                        if (!_data) {
                            _data = [];
                        }
                        element[key].forEach(x => {
                            const _id = x.id;
                            delete x.id;
                            _data.push({ id: _id, type: _type })
                            included.push({ type: _type, id: _id, attributes: x, links: this.getLink(_type, _id) });
                        });
                    } else {
                        const _id = element[key].id;
                        delete element[key].id;
                        _data = { id: _id, type: _type }
                        included.push({ type: _type, id: _id, attributes: element[key], links: this.getLink(_type, _id) });
                    }
                    relationship[key] = { links: this.getLink(key, element["id"]), data: _data };
                }
            });
            return { attributes: attrs, relationships: relationship, included: included };
        }
        //#endregion

        const promise = new Promise((resolve, reject) => {
            try {
                if (this._deSerializeJSON) {
                    return resolve(this._deSerializeJSON);
                }
                // the resolve / reject functions control the fate of the promise
                let instance = { links: this.getLink("all", -1), data: [], included: [] };
                param.forEach(element => {
                    let item = {};
                    let included: any[];
                    Object.keys(element).forEach(key => {
                        debugger;
                        let attributes = getJSONAPI(element[key]);
                        item = {
                            type: key,
                            id: element[key].id,
                            links: this.getLink(key, element[key].id),
                            attributes: attributes.attributes,
                            relationships: attributes.relationships
                        }
                        included = attributes.included;
                    })
                    instance.included = instance.included.concat(included);
                    instance.data.push(item);
                });
                this._deSerializeJSON = instance;
                resolve(instance);
            } catch (error) {
                reject(error);
            }
        });
        return promise;
    }
}