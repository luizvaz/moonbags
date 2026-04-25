/**
 * IPv4-only fetch wrapper.
 *
 * GMGN OpenAPI rejects IPv6 connections with 403. We force IPv4-first DNS
 * resolution at the module level so Node resolves hostnames to IPv4 addresses
 * before making any connections. This avoids the TLS SNI mismatch that occurs
 * when manually substituting the hostname with a raw IP in the URL.
 */

import dns from "dns";
dns.setDefaultResultOrder("ipv4first");

export async function ipv4Fetch(
  url: string | URL,
  init?: RequestInit,
): Promise<Response> {
  return fetch(url, init);
}
