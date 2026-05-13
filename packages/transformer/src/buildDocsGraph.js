const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");
const { XMLParser } = require("fast-xml-parser");

/**
 * -------------------------------------------------------
 * Repo root (stable anchor for monorepo)
 * -------------------------------------------------------
 */
const repoRoot = execSync("git rev-parse --show-toplevel")
  .toString()
  .trim();

/**
 * DITA map entry point
 */
const mapPath = path.join(
  repoRoot,
  "content/dita/user-guide.ditamap"
);

/**
 * XML parser
 */
const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "",
});

/**
 * -------------------------------------------------------
 * BODY NORMALIZATION
 * Converts DITA body → clean JSON AST
 * -------------------------------------------------------
 */
function normalizeBody(body) {
  if (!body) return [];

  const sections = body.section
    ? Array.isArray(body.section)
      ? body.section
      : [body.section]
    : [];

  return sections.map((section) => {
    const paragraphs = section.p
      ? Array.isArray(section.p)
        ? section.p
        : [section.p]
      : [];

    return {
      type: "section",
      id: section.id || null,
      title: section.title || "",
      children: paragraphs.map((p) => ({
        type: "paragraph",
        text: typeof p === "string" ? p : JSON.stringify(p),
      })),
    };
  });
}

/**
 * -------------------------------------------------------
 * LOAD TOPIC
 * Converts a DITA topic file into normalized JSON
 * -------------------------------------------------------
 */
function loadTopic(filePath) {
  if (!fs.existsSync(filePath)) return null;

  const xml = fs.readFileSync(filePath, "utf-8");
  const dita = parser.parse(xml);

  const topic =
    dita.topic ||
    dita.concept ||
    dita.task ||
    dita.reference;

  if (!topic) return null;

  const body =
    topic.body ||
    topic.conbody ||
    topic.taskbody ||
    topic.refbody;

  return {
    id: topic.id || null,
    title: topic.title || "",
    shortdesc: topic.shortdesc || "",
    body: normalizeBody(body),
  };
}

/**
 * -------------------------------------------------------
 * PARSE MAP RECURSIVELY
 * Builds navigation tree + attaches topic content
 * -------------------------------------------------------
 */
function parseTopicRefs(node, baseDir) {
  if (!node) return [];

  const refs = Array.isArray(node) ? node : [node];

  return refs.map((ref) => {
    const filePath = ref.href
      ? path.join(baseDir, ref.href)
      : null;

    const topic = filePath
      ? loadTopic(filePath)
      : null;

    return {
      type: "node",
      href: ref.href || null,
      title: ref.navtitle || topic?.title || null,
      topic,
      children: parseTopicRefs(ref.topicref, baseDir),
    };
  });
}

/**
 * -------------------------------------------------------
 * BUILD FINAL DOCUMENT GRAPH
 * -------------------------------------------------------
 */
function buildGraph() {
  const xml = fs.readFileSync(mapPath, "utf-8");
  const ditaMap = parser.parse(xml);

  const mapRoot = ditaMap.map || ditaMap;

  const baseDir = path.dirname(mapPath);

  return {
    type: "docs",
    title: mapRoot.title || "Documentation",
    navigation: parseTopicRefs(mapRoot.topicref, baseDir),
  };
}

/**
 * Output
 */
const graph = buildGraph();

console.log(JSON.stringify(graph, null, 2));


const outputPath = path.join(repoRoot, "web/data/docs.json");

fs.mkdirSync(path.dirname(outputPath), { recursive: true });

fs.writeFileSync(outputPath, JSON.stringify(graph, null, 2));
