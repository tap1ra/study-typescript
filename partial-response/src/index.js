"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class APIClient {
    constructor(endpoint) {
        this.endpoint = endpoint;
    }
    fetch(fields) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const queryString = this.buildQueryString(fields);
                const response = yield fetch(`${this.endpoint}?fields=${queryString}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = yield response.json();
                return this.filterResponse(data, fields);
            }
            catch (error) {
                console.error("Error fetching data:", error);
                throw error;
            }
        });
    }
    buildQueryString(fields) {
        return fields.map(encodeURIComponent).join(",");
    }
    filterResponse(response, fields) {
        // `filtered` の型を `{ [K in T[number]]: APIResponse[K] | undefined }` として定義
        const filtered = {};
        fields.forEach((field) => {
            const value = response[field];
            // `value` が `undefined` でない場合のみ filtered に追加
            if (value !== undefined) {
                // `value` の型を `APIResponse[K]` にキャストして代入
                filtered[field] = value; // 型キャストを追加
            }
        });
        return filtered;
    }
}
(() => __awaiter(void 0, void 0, void 0, function* () {
    const client = new APIClient("https://localhost/users");
    try {
        const data = yield client.fetch(["id", "name"]);
        console.log("Filtered response id:", data.id);
        console.log("Filtered response name:", data.name);
    }
    catch (error) {
        console.error("Error:", error);
    }
}))();
