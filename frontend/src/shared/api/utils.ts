import axios from "axios";
import { config } from "shared/config/config";

export async function getJson<T>(url: string): Promise<T> {
    const response = await fetch(`${url}`, {
        method: "GET",
    });

    if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
    }

    const data = await response.json();

    return data;
}

export async function getJsonAxios<T>(url: string): Promise<T> {
    try {
        const result = await axios.get(url);

        return result.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
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

    const isJson = response.headers.get("content-type")?.includes("application/json");

    if (isJson) {
        return response.json();
    }
}

export async function postJsonAxios<T>(url: string, data: T): Promise<any> {
    try {
        const result = await axios.post(url, data);

        return result.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function postFile(url: string, data: File): Promise<any> {
    const formData = new FormData();
    formData.append("file", data);

    const response = await fetch(`${config.api.url}/${url}`, {
        method: "POST",
        body: formData,
    });

    if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
    }

    const isJson = response.headers.get("content-type")?.includes("application/json");

    if (isJson) {
        return response.json();
    }
}

// https://maximorlov.com/send-a-file-with-axios-in-nodejs/
export async function postFileAxios(url: string, data: File): Promise<any> {
    const formData = new FormData();
    formData.append("file", data);

    const response = await axios.post(`${config.api.url}/${url}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return response.data;
}
