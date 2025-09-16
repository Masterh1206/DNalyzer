import type { AvailabilityStatus } from '../types.ts';

// Using Cloudflare's DNS over HTTPS resolver
const DOH_ENDPOINT = 'https://cloudflare-dns.com/dns-query';

/**
 * Checks domain availability by querying DNS records.
 * A domain with existing NS/A records is considered "Taken".
 * A domain that returns NXDOMAIN is considered "Available".
 */
export const checkDomainAvailability = async (domain: string): Promise<Exclude<AvailabilityStatus, 'IDLE' | 'CHECKING'>> => {
  try {
    const url = `${DOH_ENDPOINT}?name=${encodeURIComponent(domain)}&type=NS`;
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/dns-json',
      },
    });

    if (!response.ok) {
      throw new Error(`DNS query failed with status ${response.status}`);
    }

    const data = await response.json();

    // Status 3 is NXDOMAIN (Non-Existent Domain), which means it's likely available.
    if (data.Status === 3) {
      return 'AVAILABLE';
    }

    // Status 0 is NOERROR, which means records were found or the authority responded.
    // The presence of an authority section usually means it's registered.
    if (data.Status === 0) {
       return 'TAKEN';
    }

    // Any other status is treated as an error/unknown state.
    return 'ERROR';
  } catch (error) {
    console.error(`Error checking domain ${domain}:`, error);
    return 'ERROR';
  }
};
