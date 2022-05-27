/// <reference types="node" />
import http from "http";
declare type responseType = "stream" | "json" | "normal";
interface JunkOptions {
    url: string;
    method: string;
    data?: string;
    headers?: http.OutgoingHttpHeaders;
    responseType?: responseType;
}
interface JunkResponse {
    statusCode: number | undefined;
    headers: object;
    data: string | object;
}
declare const _default: (options: JunkOptions) => Promise<JunkResponse | http.IncomingMessage>;
export default _default;
