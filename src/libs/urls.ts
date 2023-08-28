const BASE_URL = "https://api.urworkhelper.net";

const USER = "/user";
const GPT = "/gpt";

export const URLs = {
    USER: {
        NEW: BASE_URL + USER + "/new",
        LOGIN: BASE_URL + USER + "/in",
        LOGOUT: BASE_URL + USER + "/out",
        RESET: BASE_URL + USER + "/reset",
        DELETE: BASE_URL + USER + "/delete",
        LOG: BASE_URL + USER + "/log",
    },
    GPT: {
        COVERLETTER: BASE_URL + GPT + "/coverletter",
        INTERVIEW: BASE_URL + GPT + "/interview",
        JOB: BASE_URL + GPT + "/job",
    },
};
