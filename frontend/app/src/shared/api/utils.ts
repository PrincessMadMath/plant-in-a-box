import { config } from "shared/config/config";

export async function getJson<T>(url: string, fakeData: T): Promise<T> {
    if (config.api.useFakeData) {
        return fakeData;
    }

    const response = await fetch(`${config.api.url}/${url}`, {
        method: "GET",
    });

    if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
    }

    const data = await response.json();

    return data;
}
