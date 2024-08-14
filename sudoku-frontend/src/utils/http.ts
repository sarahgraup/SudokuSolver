interface IFetchParams {
  method: string;
  [k: string]: string | number | undefined;
}

const fetchWrapper = async (url: string, { method, params, ...rest }: IFetchParams) => {
  const headers = new Headers();
  headers.set("Accept", "application/json");
  headers.set("Content-Type", "application/json");
  try {
    const response = await fetch(url, {
      method,
      headers,
      ...rest,
    });
    if (!response.ok) {
      let message = response.statusText;
      if (response.status >= 400 && response.status < 500) {
        message = (await response.json()).message;
      }
      throw new Error(message);
    } else if (response.headers.get("content-length") === "0") {
      // Handles HTTP 201, 204 -> no content responses
      return {};
    } else {
      return await response.json();
    }
  } catch (err) {
    /* Catch network/non-API errors */
    console.error(`Request to ${url} failed`, err);
    throw err;
  }
};

const http = {
  delete: async (url: string) => fetchWrapper(url, { method: "DELETE" }),

  get: async (url: string) => fetchWrapper(url, { method: "GET" }),

  patch: async (url: string, payload: object) =>
    fetchWrapper(url, { method: "PATCH", body: JSON.stringify(payload) }),

  post: async (url: string, payload: object) =>
    fetchWrapper(url, { method: "POST", body: JSON.stringify(payload) }),

  put: async (url: string, payload: object) =>
    fetchWrapper(url, { method: "PUT", body: JSON.stringify(payload) }),
};

export default http;