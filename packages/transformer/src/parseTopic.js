const fs = require("fs");
const path = require("path");
const { XMLParser } = require("fast-xml-parser");

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "",
});

const topicPath = path.resolve(
  __dirname,
  "../../../content/dita/topics/search/quick-search.dita"
);

const xml = fs.readFileSync(topicPath, "utf-8");

const dita = parser.parse(xml);

/**
 * Support multiple DITA topic specializations
 */
const topic =
  dita.topic ||
  dita.concept ||
  dita.task ||
  dita.reference;

if (!topic) {
  throw new Error("Unsupported DITA topic type");
}

/**
 * Normalize body specialization names
 */
const body =
  topic.body ||
  topic.conbody ||
  topic.taskbody ||
  topic.refbody;

/**
 * Final normalized JSON structure
 */
const result = {
  id: topic.id || null,
  type: "topic",
  title: topic.title || "",
  shortdesc: topic.shortdesc || "",
  body: [],
};

/**
 * Normalize paragraphs
 */
function normalizeParagraph(p) {
  if (typeof p === "string") {
    return {
      type: "paragraph",
      text: p,
    };
  }

  return {
    type: "paragraph",
    text: JSON.stringify(p),
  };
}

/**
 * Parse body content
 */
if (body) {
  /**
   * Paragraphs directly inside body
   */
  if (body.p) {
    const paragraphs = Array.isArray(body.p)
      ? body.p
      : [body.p];

    paragraphs.forEach((p) => {
      result.body.push(normalizeParagraph(p));
    });
  }

  /**
   * Sections
   */
  if (body.section) {
    const sections = Array.isArray(body.section)
      ? body.section
      : [body.section];

    sections.forEach((section) => {
      const sectionNode = {
        type: "section",
        id: section.id || null,
        title: section.title || "",
        children: [],
      };

      /**
       * Paragraphs inside section
       */
      if (section.p) {
        const sectionParagraphs = Array.isArray(section.p)
          ? section.p
          : [section.p];

        sectionParagraphs.forEach((p) => {
          sectionNode.children.push(
            normalizeParagraph(p)
          );
        });
      }

      result.body.push(sectionNode);
    });
  }
}

/**
 * Output normalized JSON
 */
console.log(JSON.stringify(result, null, 2));
