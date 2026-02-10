# DCL Status Page 

This repository contains the front end for the Decentraland Status page published at https://status.decentraland.org 

## Build and Run

Just run clone the repo and run `yarn install` and `yarn start`

## Deploy 

The website is deployed using Cloudflare Pages with automatic deployments on push.

### Branches and Environments

| Branch | Environment | Domain | Services Monitored |
|--------|-------------|--------|-------------------|
| `main` | Production | `status.decentraland.org` | `*.decentraland.org` |
| `development` | Development | `status.decentraland.zone` | `*.decentraland.zone` |

### How it works

The environment is automatically detected based on the hostname:
- If the page is served from `*.decentraland.zone` or `localhost`, it uses development configuration
- Otherwise, it defaults to production configuration

This can be overridden by setting the `REACT_APP_ENV` environment variable in Cloudflare Pages:
- `REACT_APP_ENV=production` for production builds
- `REACT_APP_ENV=development` for development builds

### Catalyst Servers

Each environment monitors different catalyst nodes:

**Production** (11 nodes):
- DCL nodes: `peer-ec1`, `peer-ec2`, `peer-wc1`, `peer-eu1`, `peer-ap1` on `.decentraland.org`
- Community nodes: `interconnected.online`, `peer.decentral.io`, `peer.melonwave.com`, `peer.kyllian.me`, `peer.uadevops.com`, `peer.dclnodes.io`

**Development** (3 nodes):
- `peer.decentraland.zone`
- `peer-ue-2.decentraland.zone`
- `peer-ap1.decentraland.zone` 

## Dependencies 

**Incidents** 
Details and history of the incidents come from the [Crashbot API](https://github.com/decentraland/crashbot/) expose at https://crashbot.decentraland.systems 

**Public Metrics API**
This site uses the [Public Metrics API](https://github.com/decentraland/public-metrics-exporter) at https://public-metrics.decentraland.org/ to populate the Metrics content 


