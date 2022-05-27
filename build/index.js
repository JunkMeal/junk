import https from "https";
import http from "http";
export default (options) => {
    const url = new URL(options.url);
    let proto = url.protocol == "https:" ? https : http;
    let reqOptions = {
        method: options.method,
        port: url.protocol == "https:" ? 443 : 80,
        hostname: url.hostname,
        path: url.pathname,
        headers: options.headers
    };
    return new Promise((resolve, reject) => {
        const req = proto.request(reqOptions, (res) => {
            switch (options.responseType) {
                case "stream":
                    resolve(res);
                    break;
                case "normal":
                case "json":
                default:
                    let body = "";
                    res.on("data", (chunk) => {
                        body += chunk;
                    });
                    res.on("end", () => {
                        resolve({
                            statusCode: res.statusCode,
                            headers: res.headers,
                            data: options.responseType == "json" ? JSON.parse(body) : body
                        });
                    });
                    break;
            }
        });
        req.end();
    });
};
