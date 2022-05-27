import https from "https"
import http from "http"

type responseType = "stream" | "json" | "normal"

interface JunkOptions {
    url: string,
    method?: string,
    data?: string,
    headers?: http.OutgoingHttpHeaders,
    responseType?: responseType
}

interface JunkResponse {
    statusCode: number | undefined,
    headers: object,
    data: string | object
}

export default (options: JunkOptions) : Promise<JunkResponse | http.IncomingMessage> => {
    const url = new URL(options.url)
    let proto: typeof https | typeof http = url.protocol == "https:" ? https : http;
    let reqOptions: https.RequestOptions | http.RequestOptions = {
        method: options.method,
        port: url.protocol == "https:" ? 443 : 80,
        hostname: url.hostname,
        path: url.pathname,
        headers: options.headers
    }

    return new Promise((resolve, reject) => {
        const req = proto.request(reqOptions, (res) => {
        switch(options.responseType) {
            case "stream":
                resolve(res)
            break;
            case "normal":
            case "json":
            default:
                let body: string = "";
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
    })
}