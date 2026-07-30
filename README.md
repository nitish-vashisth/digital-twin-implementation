# Architecture Twin Explorer

Architecture Twin Explorer is a polished, static prototype for visualizing a Jira Data Center architecture as an interactive dependency graph. It is designed to help enterprise customers understand their architecture before any migration planning begins.

## Overview

This prototype focuses on clarity, beauty, and executive-grade presentation. It highlights:

- project and platform relationships
- workflows, boards, filters, permissions and automations
- cross-cluster dependencies across finance, HR, engineering and marketing
- migration readiness signals and node-level details

## Architecture

The application uses only:

- HTML
- CSS
- Vanilla JavaScript
- Cytoscape.js

Everything runs as a static web app and can be opened directly in a browser or served from a simple static server.

## Folder Structure

- index.html — main shell and dashboard layout
- style.css — Atlassian-inspired visual system
- app.js — graph initialization, interaction, metrics and clustering logic
- data/nodes.json — node catalog for the architecture graph
- data/edges.json — relationships between nodes
- lib/cytoscape.min.js — Cytoscape runtime

## Running Locally

Open the project in a browser:

- open architecture-twin-explorer/index.html directly, or
- run a simple static server from the workspace root, for example:

  python3 -m http.server 8000

Then open http://localhost:8000/architecture-twin-explorer/.

## Future Roadmap

### Phase 2
- automatic graph clustering
- migration wave generation
- risk scoring and graph algorithms
- Neo4j integration and MCP-based data enrichment

### Future Phases
- AI Copilot for architecture insights
- Migration Planner for dependency-aware sequencing
- Architecture Twin simulation and scenario modeling
- Live Jira integration for real-time architecture discovery
