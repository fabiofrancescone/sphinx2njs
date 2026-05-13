# 📚 sphinx2njs (DITA → Next.js Documentation Engine)

A modern documentation pipeline that replaces Sphinx with a **DITA-based content system + Next.js renderer**.

It transforms structured DITA XML into a **clean JSON documentation graph**, which is then rendered by a Next.js frontend.

---

## 🧭 Architecture Overview

DITA XML (authoring layer)  
↓  
DITA-OT (validation & build)  
↓  
Transformer (Node.js)  
↓  
Normalized JSON Graph  
↓  
Next.js (UI + routing)

---

## ✨ Key Features

- 📄 DITA-based structured content  
- 🔄 Automated transformation pipeline (XML → JSON)  
- 🌳 Navigation tree generation from `.ditamap`  
- 🧼 Clean content normalization (no XML in frontend)  
- ⚡ Next.js App Router integration  
- 📦 Dockerized DITA-OT build environment  
- 🧩 Ready for sidebar, search, and full docs portal UI  

---

## 📁 Repository Structure

sphinx2njs/  
├── content/  
│   └── dita/  
│       ├── maps/  
│       ├── topics/  
│       ├── images/  
│       └── reusable/  
│  
├── packages/  
│   └── transformer/  
│       └── src/  
│           ├── buildDocsGraph.js  
│           ├── parseMap.js  
│           └── parseTopic.js  
│  
├── web/  
│   └── app/  
│       ├── docs/  
│       │   └── [[...slug]]/  
│       ├── layout.tsx  
│       └── page.tsx  
│  
├── containers/  
│   └── Dockerfile.dita  
│  
└── scripts/  
    └── dita-build.sh  

---

## ⚙️ How It Works

### 1. Write documentation in DITA

<concept id="quick-search">
  <title>Using Quick Search</title>
  <shortdesc>Learn how to quickly search items in Carbonio.</shortdesc>

  <conbody>
    <section id="open-search">
      <title>Open the Search Bar</title>
      <p>Use the search field located at the top of the interface.</p>
    </section>
  </conbody>
</concept>

---

### 2. Build DITA output (optional validation step)

./content/scripts/dita-build.sh

---

### 3. Generate JSON documentation graph

node packages/transformer/src/buildDocsGraph.js

---

### 4. Run Next.js frontend

cd web  
npm install  
npm run dev  

Open:  
http://localhost:3000/docs  

---

## 🧠 Core Design Principles

### 1. DITA is only for authoring
Frontend never parses XML.

### 2. Transformer is the single source of truth
It produces a clean JSON graph.

### 3. Next.js is only a renderer
No knowledge of DITA structure required.

---

## 🚧 Current Status

### Completed
- DITA parsing  
- map → navigation tree  
- topic normalization  
- Next.js routing  
- docs layout integration  

### In progress
- Sidebar navigation UI  
- Route indexing improvements  

### Next steps
- Search index generation  
- Breadcrumb system  
- Incremental builds (watch mode)  
- GitBook-style UI enhancements  

---

## 📌 Example Routes

/docs  
/docs/search  
/docs/search/quick-search  

---

## 🧩 Tech Stack

- DITA-OT 4.x  
- Node.js (Transformer layer)  
- fast-xml-parser  
- Next.js App Router  
- Docker (build isolation)  

---

## 🚀 Goal

Replace traditional documentation systems (Sphinx / static HTML pipelines) with a:

modern, structured, UI-driven documentation platform powered by DITA + Next.js
