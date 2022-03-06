import { config } from "shared/config/config";

export async function getJson<T>(url: string): Promise<T> {
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

export async function postJson<T>(url: string, data: T): Promise<any> {
    const response = await fetch(`${config.api.url}/${url}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
    }

    if (!response.bodyUsed) {
        return;
    }

    return await response.json();
}
