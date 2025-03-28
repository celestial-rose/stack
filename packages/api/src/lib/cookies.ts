import cookie, { type SerializeOptions } from "cookie";

export function getCookies(req: Request) {
    const cookieHeader = req.headers.get("Cookie");
    if (!cookieHeader) return {};
    return cookie.parse(cookieHeader);
}

export function getCookie(req: Request, name: string) {
    const cookieHeader = req.headers.get("Cookie");
    if (!cookieHeader) return;
    const cookies = cookie.parse(cookieHeader);
    return cookies[name];
}

export function setCookie(resHeaders: Headers, name: string, value: string, options?: SerializeOptions) {
    resHeaders.append("Set-Cookie", cookie.serialize(name, value, options));
}
