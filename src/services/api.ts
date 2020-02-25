import {withConfiguration} from "./config.js"


export const fetcher = (root: string, verb: string) => (url: string, payload: any = undefined, lang : string = "fr") => {
    return withConfiguration((config: any) => {
        return fetch(`${config[root]}${url}`, {
            method: verb,
            headers: new Headers({
                "Content-Type": "application/json;charset=UTF-8",
                "Accept-Language": lang,
                "Access-Control-Allow-Origin": "*"
            }),
            body: payload !== undefined ? JSON.stringify(payload) : undefined
        }).then(result => {
            if (result.ok === false) return Promise.reject(`Error while fetching ${url}`);
            return result.json();
        });
    });
}

// verbs
export const post = fetcher("serverUrl", "POST");

export const get = fetcher("serverUrl", "GET");

export const put = fetcher("serverUrl", "PUT");


// Requests
export const fetchCraftablesItems = get(`craft`);

export const getPriceByIdArray = (ids: number[], server: number) => post(`valuearray`, [ids, server]);

export const fetchItems = get("");

export const fetchPrice = (item: number, serverId: number) => get(`value/${serverId}/${item}`);

export const getLastPrice = (code: number, serverId: number) => get(`lastvalue/${serverId}/${code}`);

export const getReceipeById = (id: number) => post("receipe", id);