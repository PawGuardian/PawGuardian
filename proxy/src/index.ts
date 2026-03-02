export interface Env {
  SUPABASE_URL: string;
}

const CORS_HEADERS: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "apikey, authorization, content-type, content-profile, x-client-info, prefer, range, accept",
  "Access-Control-Expose-Headers": "content-range, x-supabase-api-version",
  "Access-Control-Max-Age": "86400",
};

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: CORS_HEADERS });
    }

    const url = new URL(request.url);
    const supabaseHost = new URL(env.SUPABASE_URL).host;
    const target = `${env.SUPABASE_URL}${url.pathname}${url.search}`;

    // Clone all request headers, fix Host and Origin
    const headers = new Headers(request.headers);
    headers.set("Host", supabaseHost);
    headers.set("Origin", env.SUPABASE_URL);
    headers.delete("cf-connecting-ip");
    headers.delete("cf-ipcountry");
    headers.delete("cf-ray");
    headers.delete("cf-visitor");

    // Debug: return what we're about to send
    if (url.pathname === "/_debug") {
      const hdrs: Record<string, string> = {};
      headers.forEach((v, k) => { hdrs[k] = v; });
      return new Response(JSON.stringify({ target, headers: hdrs }, null, 2), {
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      });
    }

    const response = await fetch(target, {
      method: request.method,
      headers,
      body: request.body,
    });

    // Return full debug info on auth failures
    if (response.status === 401 && url.searchParams.has("_debug")) {
      const body = await response.text();
      const reqHdrs: Record<string, string> = {};
      headers.forEach((v, k) => { reqHdrs[k] = v; });
      return new Response(JSON.stringify({
        status: 401,
        target,
        requestHeaders: reqHdrs,
        responseBody: body,
      }, null, 2), {
        status: 401,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      });
    }

    const responseHeaders = new Headers(response.headers);
    responseHeaders.set("Access-Control-Allow-Origin", "*");

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders,
    });
  },
};
