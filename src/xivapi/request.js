const Axios = require("axios").default;

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

/**
 * @param {import("axios").Method} method
 * @param {string} url
 * @param {string[]} columns
 * @param {number} page
 * @returns {Promise<any>}
 */
async function request(method, url, columns, page = 1) {
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

/**
 * @param {string} url
 * @param {string[]} columns
 */
function get(url, columns, page = 1) {
  return request("get", url, columns, page);
}

/**
 * @param {string} url
 * @param {string[]} columns
 */
function post(url, columns, page = 1) {
  return request("post", url, columns, page);
}

/**
 * @param {any[]} array
 */
async function all(array) {
  return await Axios.all(array);
}

module.exports = {
  all,
  get,
  post,
  request,
}