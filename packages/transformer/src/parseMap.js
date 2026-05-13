const fs = require("fs");
const path = require("path");
const { XMLParser } = require("fast-xml-parser");

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "",
});

const mapPath = path.resolve(
  __dirname,
  "../../../content/dita/user-guide.ditamap"
);

const xml = fs.readFileSync(mapPath, "utf-8");
const ditaMap = parser.parse(xml);

/**
 * Extract topicref recursively
 */
function parseTopicRef(node) {
  if (!node) return [];

  const refs = Array.isArray(node) ? node : [node];

  return refs.map((ref) => {
    const item = {
      type: "topic",
      href: ref.href || null,
      title: ref.navtitle || ref.title || null,
      children: [],
    };

    if (ref.topicref) {
      item.children = parseTopicRef(ref.topicref);
    }

    return item;
  });
}

/**
 * Root map object (DITA maps usually have <map>)
 */
const mapRoot = ditaMap.map || ditaMap;

/**
 * Build navigation tree
 */
const navigation = {
  type: "map",
  title: mapRoot.title || "Documentation",
  children: parseTopicRef(mapRoot.topicref),
};

console.log(JSON.stringify(navigation, null, 2));
