export const config = {
    api: {
        url: process.env.REACT_APP_API_URL,
        useFakeData: process.env.REACT_APP_USE_FAKE_DATA === "fake",
    },
    auth: {
        domain: process.env.REACT_APP_AUTH0_DOMAIN || "",
        clientId: process.env.REACT_APP_AUTH0_CLIENT_ID || "",
    },
};
