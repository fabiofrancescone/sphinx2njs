import Link from "next/link";

function renderNodes(nodes, base = "/docs") {
  return (
    <ul style={{ paddingLeft: 16 }}>
      {nodes.map((node, i) => {
        const href = node.route ? `${base}/${node.route}` : base;

        return (
          <li key={i}>
            {node.route ? (
              <Link href={href}>{node.title}</Link>
            ) : (
              <span>{node.title}</span>
            )}

            {node.children?.length > 0 &&
              renderNodes(node.children, base)}
          </li>
        );
      })}
    </ul>
  );
}

export default function Sidebar({ navigation }) {
  return (
    <div style={{ width: 280, padding: 20, borderRight: "1px solid #ddd" }}>
      {renderNodes(navigation)}
    </div>
  );
}
