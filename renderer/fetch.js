import fetch from "node-fetch";

export default async function fetcher(url, payload) {
  const res = await fetch(url, {
    headers: {
      authorization:
        "eyJhbGciOiJIUzUxMiJ9.eyJhY2Nlc3NfdG9rZW4iOiJCZWFyZXIgdG9rZW46bG9naW5fdG9rZW5zOjE6MTphY2Nlc3NfdG9rZW46YTVkYThmMTQtNjg0YS00YjA5LWEzYzctMGQwOGQxMDk3ZjU3IiwicmVmcmVzaF90b2tlbiI6IkJlYXJlciB0b2tlbjpsb2dpbl90b2tlbnM6MToxOnJlZnJlc2hfdG9rZW46WW1haEV0OGtqYndjb2ZOSUg2NlhJUlNZNWp1aW5uT0dTd19aNHItZ0plOFRIODVtOWx5VTl2MjhaUEdjTFlGTTJScjZodjRXSURwQ2F2UlNBS0p2Wk1RYU9aSDhxVVRDUlJveGxGdmdSbGJwYVFhQzB6VkMxSEwxMzA5akNsRTQiLCJhY2NvdW50X3R5cGUiOiJhZG1pbiIsInVzZXJfdHlwZSI6IjAwIiwidXNlcl9pZCI6MSwidXNlcl9uYW1lIjoiYWRtaW4iLCJpc19sZXNzb3IiOiJZIiwiZW50ZXJwcmlzZV9pZCI6MSwiZW50ZXJwcmlzZV9uYW1lIjoiYWRtaW5pc3RyYXRvciIsInNvdXJjZV9uYW1lIjoic2xhdmUifQ.LBBtEPlr-S1NvAJDuaoqE4utBwnWmV6CGhsBjTrArFnS4jrI7QWFeD9BueOIgG_0t0XiZ6lipqTgO-2Wb1zf2w",
    },
    ...payload,
  });

  if (!res.ok) {
    throw new Error(
      `fetch() failed: ${response.status} ${response.statusText}`
    );
  }
  const data = await res.json();
  return data;
}
