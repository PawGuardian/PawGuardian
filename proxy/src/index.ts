export interface Env {
  SUPABASE_URL: string;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    // Handle CORS preflight before forwarding
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "*",
          "Access-Control-Max-Age": "86400",
        },
      });
    }

    const url = new URL(request.url);

    // Debug endpoint — returns received headers
    if (url.pathname === "/_debug/headers") {
      const hdrs: Record<string, string> = {};
      request.headers.forEach((v, k) => { hdrs[k] = v; });
      return new Response(JSON.stringify(hdrs, null, 2), {
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      });
    }

    const target = new URL(url.pathname + url.search, env.SUPABASE_URL);

    const headers = new Headers(request.headers);
    headers.set("Host", new URL(env.SUPABASE_URL).host);

    // Handle WebSocket upgrades (Realtime)
    if (request.headers.get("Upgrade") === "websocket") {
      return fetch(target.toString(), {
        method: request.method,
        headers,
        body: request.body,
      });
    }

    const response = await fetch(target.toString(), {
      method: request.method,
      headers,
      body: request.body,
    });

    const responseHeaders = new Headers(response.headers);
    responseHeaders.set("Access-Control-Allow-Origin", "*");

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders,
    });
  },
};
