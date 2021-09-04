import { config } from "shared/config/config";

export function getJson<T>(url: string, fakeData: T): Promise<T> {
    if (config.api.useFakeData) {
        return new Promise((resolve, reject) => resolve(fakeData));
    }

    return fetch(`${config.api.url}/${url}`, {
        method: "GET",
    }).then((response) => {
        return response.json();
    });
}
