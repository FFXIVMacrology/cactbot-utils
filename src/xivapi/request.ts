import Axios, { Method } from "axios";

const xivapi = Axios.create({
  baseURL: "https://xivapi.com/",
  responseType: "json",
});

xivapi.interceptors.request.use(
  (config) => {
    if (process.env['XIVAPI_KEY']) {
      config.data.private_key = process.env['XIVAPI_KEY'];
    }

    return config;
  },
  (error) => {
    return console.error(error);
  }
)

export async function request(method: Method, url: string, columns: string[], page = 1) {
  const resp = await xivapi.request({
    method: method,
    url: url,
    data: {
      columns: columns,
      page: page,
    },
  });

  return resp.data;
}

export function get(url: string, columns: string[], page = 1) {
  return request("get", url, columns, page);
}

export function post(url: string, columns: string[], page = 1) {
  return request("post", url, columns, page);
}

export async function all(array: any[]) {
  return await Axios.all(array);
}
