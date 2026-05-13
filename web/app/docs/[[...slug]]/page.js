import { getDocs } from "@/lib/docs";

function findNode(nodes, slug) {
  for (const node of nodes) {
    if (node.route === slug) return node;

    if (node.children?.length) {
      const found = findNode(node.children, slug);
      if (found) return found;
    }
  }
  return null;
}

export default function Page({ params }) {
  const docs = getDocs();

  const slug = params.slug ? params.slug.join("/") : "";

  const node = slug
    ? findNode(docs.navigation, slug)
    : null;

  if (!slug) {
    return (
      <div style={{ padding: 40 }}>
        <h1>Documentation Home</h1>
      </div>
    );
  }

  if (!node?.topic) {
    return <div>Not found</div>;
  }

  const topic = node.topic;

  return (
    <div style={{ padding: 40 }}>
      <h1>{topic.title}</h1>
      <p>{topic.shortdesc}</p>

      {topic.body?.map((section, i) => (
        <div key={i}>
          <h2>{section.title}</h2>

          {section.children?.map((p, j) => (
            <p key={j}>{p.text}</p>
          ))}
        </div>
      ))}
    </div>
  );
}
