type Method = "GET" | "POST" | "PUT" | "DELETE";
type useFetchType = <T, R>(
    url: URL | RequestInfo,
    method: Method,
    data?: T
) => Promise<R>;

const useFetch: useFetchType = async (url, method, data) => {
    const body = data ? JSON.stringify(data) : undefined;
    const response = await fetch(url, {
        method,
        headers: {
            "Content-Type": "application/json",
        },
        body,
    });

    console.log(response);

    const json = await response.json();

    return json;
};

export default useFetch;
