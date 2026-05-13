import Sidebar from "@/components/Sidebar";
import { getDocs } from "@/lib/docs";

export default function DocsLayout({ children }) {
  const docs = getDocs();

  return (
    <div style={{ display: "flex" }}>
      <Sidebar navigation={docs.navigation} />

      <main style={{ flex: 1, padding: 40 }}>
        {children}
      </main>
    </div>
  );
}
