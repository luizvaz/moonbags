/**
 * IPv4-only fetch wrapper.
 *
 * Some providers (notably GMGN OpenAPI) reject IPv6 connections with 403.
 * Node.js 18+ uses undici for native fetch. We reach into the global fetch's
 * undici internals to create an IPv4-only Agent and pass it as `dispatcher`.
 */

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { Agent } = require("undici") as { Agent: new (opts: object) => object };
const agent = new Agent({ connect: { family: 4 } });

export function ipv4Fetch(
  url: string | URL,
  init?: RequestInit,
): ReturnType<typeof fetch> {
  return fetch(url as string, {
    ...(init ?? {}),
    // undici-specific option — not in the standard RequestInit type
    dispatcher: agent,
  } as RequestInit);
}
