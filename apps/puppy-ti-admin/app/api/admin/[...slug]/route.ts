export const dynamic = "force-dynamic"; // defaults to auto
export async function GET(request: Request) {
  return handler(request);
}

export async function POST(request: Request) {
  return handler(request);
}

export async function PUT(request: Request) {
  return handler(request);
}

export async function PATCH(request: Request) {
  return handler(request);
}

export async function DELETE(request: Request) {
  return handler(request);
}

async function handler(request: Request) {
  const secFetchSite = request.headers.get("sec-fetch-site");

  if (secFetchSite !== "same-origin") {
    return new Response(
      JSON.stringify({ error: "Request must come from same-origin" }),
      {
        headers: { "Content-Type": "application/json" },
        status: 403,
      },
    );
  }

  try {
    const requestUrl = request.url.split("/api/admin")[1];

    const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/${requestUrl}`;

    const options: RequestInit = {
      method: request.method,
      headers: {
        prefer: (request.headers.get("prefer") as string) ?? "",
        accept: request.headers.get("accept") ?? "application/json",
        ["content-type"]:
          request.headers.get("content-type") ?? "application/json",
        Authorization: "Bearer " + process.env.SUPABASE_SERVICE_ROLE_KEY,
        apiKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
      },
    };

    if (request.body) {
      const body = await request.json();
      options.body = JSON.stringify(body);
    }

    // call the CRUD API
    const response = await fetch(url, options);

    const contentRange = response.headers.get("content-range");

    const headers = new Headers();
    if (contentRange) {
      headers.set("Content-Range", contentRange);
    }
    const data = await response.text();
    return new Response(data, {
      status: 200,
      headers,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error }), {
      headers: { "Content-Type": "application/json" },
      status: 400,
    });
  }
}
