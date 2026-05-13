<!-- README.md -->

# sphinx2njs

Experimental documentation platform based on:

- DITA XML for structured content authoring
- Node.js transformers for content normalization
- Next.js for frontend rendering
- Dockerized DITA-OT for validation and reference HTML generation

The goal of this project is to replace the current Sphinx-based documentation portal with a modern architecture where:

```
DITA XML
   ↓
Transformer Layer
   ↓
Normalized JSON AST
   ↓
Next.js Frontend
```

Instead of generating the final website directly from DITA-OT HTML output, this project uses DITA as the authoring source and transforms content into a frontend-friendly JSON model rendered entirely by Next.js.

---

# Architecture Overview

## Content Layer

Technical writers create content using DITA XML.

Example:

```
content/dita/topics/search/quick-search.dita
```

DITA maps define navigation hierarchy:

```
content/dita/user-guide.ditamap
```

---

## Transformation Layer

Custom Node.js transformers parse DITA content and normalize it into a JSON AST.

Example flow:

```
DITA XML
   ↓
parseTopic.js
   ↓
Normalized JSON
```

Example output:

```json
{
  "id": "quick-search",
  "type": "topic",
  "title": "Using Quick Search",
  "body": [
    {
      "type": "section",
      "title": "Open the Search Bar"
    }
  ]
}
```

The frontend never parses XML directly.

---

## Frontend Layer

Next.js will eventually consume generated JSON files and render:

- pages
- navigation
- breadcrumbs
- search
- UI components

The presentation layer is fully separated from DITA internals.

---

# Repository Structure

```
.
├── content/
│   ├── dita/
│   │   ├── maps/
│   │   ├── topics/
│   │   ├── images/
│   │   └── reusable/
│   └── scripts/
│       └── dita-build.sh
│
├── containers/
│   └── Dockerfile.dita
│
├── packages/
│   └── transformer/
│       ├── package.json
│       └── src/
│           └── parseTopic.js
│
└── out/
```

---

# Requirements

- Docker
- Node.js 22+
- npm
- Git

---

# DITA Build

The repository includes a Dockerized DITA-OT build pipeline.

Run:

```bash
./content/scripts/dita-build.sh
```

This generates HTML output inside:

```
out/
```

The DITA-OT HTML output is currently used for:

- validation
- reference rendering
- debugging

It is NOT intended to be the final frontend renderer.

---

# Transformer Prototype

The first transformer prototype is located at:

```
packages/transformer/src/parseTopic.js
```

Run:

```bash
cd packages/transformer
node src/parseTopic.js
```

This converts a DITA topic into a normalized JSON structure.

Currently supported:

- concept/topic/reference/task detection
- sections
- paragraphs

---

# Long-Term Goals

## Planned Features

- DITA map parser
- navigation tree generation
- search index generation
- React component mapping
- syntax highlighting
- reusable content support
- versioned documentation
- localization support

---

# Design Principles

## Structured Authoring

DITA remains the canonical content source.

## Frontend Independence

Next.js never consumes raw XML.

## Semantic Normalization

DITA specializations are normalized into a unified application schema.

## Component-Based Rendering

Frontend rendering is based on semantic JSON nodes rather than generated HTML.

---

# Current Status

## Working

- Dockerized DITA-OT
- DITA HTML5 generation
- XML parsing
- JSON topic normalization

## In Progress

- DITAMAP parsing
- navigation generation
- Next.js integration

---

# Vision

This project aims to evolve from:

```
Static documentation generator
```

to:

```
Structured documentation platform
```

---

*README maintained for sphinx2njs monorepo (DITA → JSON → Next.js pipeline)*

