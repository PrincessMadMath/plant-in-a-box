export const config = {
    api: {
        url: process.env.REACT_APP_API_URL,
        useFakeData: process.env.REACT_APP_USE_FAKE_DATA === "fake",
    },
};
