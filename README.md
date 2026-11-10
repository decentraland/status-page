# DCL Status Page 

This repository contains the front end for the Decentraland Status page published at https://status.decentraland.org 

## Build and Run

Clone the repo, then run `npm install` and `npm start` (Vite dev server on http://localhost:3000). Use `npm run build` for a production build in `build/`. Node 22 is required (see `.nvmrc`).

## Deploy 

The website is deployed using CloudFlare pages with each merge to the `main` branch. 

## Dependencies 

**Incidents** 
Details and history of the incidents come from the [Crashbot API](https://github.com/decentraland/crashbot/) expose at https://crashbot.decentraland.systems 

**Public Metrics API**
This site uses the [Public Metrics API](https://github.com/decentraland/public-metrics-exporter) at https://public-metrics.decentraland.org/ to populate the Metrics content 


