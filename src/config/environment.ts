/**
 * Environment configuration
 * 
 * Determines the environment based on the hostname or environment variable.
 * - Production: status.decentraland.org → uses .org domains
 * - Development: status.decentraland.zone → uses .zone domains
 */

type Environment = 'production' | 'development';

function getEnvironment(): Environment {
  // Check environment variable first (set in Cloudflare Pages)
  if (process.env.REACT_APP_ENV === 'development') {
    return 'development';
  }
  if (process.env.REACT_APP_ENV === 'production') {
    return 'production';
  }

  // Auto-detect based on hostname
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    if (hostname.includes('.zone') || hostname === 'localhost') {
      return 'development';
    }
  }

  // Default to production
  return 'production';
}

export const environment = getEnvironment();
export const isProduction = environment === 'production';
export const isDevelopment = environment === 'development';

/**
 * Domain suffix based on environment
 * Production: org
 * Development: zone
 */
export const domainSuffix = isProduction ? 'org' : 'zone';

/**
 * Base domain for Decentraland services
 * Production: decentraland.org
 * Development: decentraland.zone
 */
export const baseDomain = `decentraland.${domainSuffix}`;

/**
 * Catalyst servers for each environment
 */
export const catalystServers = isProduction
  ? [
      { hostname: 'peer-ec1.decentraland.org', label: 'DCL - US East 1' },
      { hostname: 'peer-ec2.decentraland.org', label: 'DCL - US East 2' },
      { hostname: 'peer-wc1.decentraland.org', label: 'DCL - US West' },
      { hostname: 'peer-eu1.decentraland.org', label: 'DCL - EU' },
      { hostname: 'peer-ap1.decentraland.org', label: 'DCL - AP1' },
      { hostname: 'interconnected.online', label: 'Esteban' },
      { hostname: 'peer.decentral.io', label: 'Baus' },
      { hostname: 'peer.melonwave.com', label: 'Ari' },
      { hostname: 'peer.kyllian.me', label: 'Kyllian' },
      { hostname: 'peer.uadevops.com', label: 'SFox' },
      { hostname: 'peer.dclnodes.io', label: 'DSM' },
    ]
  : [
      { hostname: 'peer.decentraland.zone', label: 'DCL - Peer' },
      { hostname: 'peer-ue-2.decentraland.zone', label: 'DCL - US East 2' },
      { hostname: 'peer-ap1.decentraland.zone', label: 'DCL - AP1' },
    ];
