import fs from "fs";
import path from "path";

export function getDocs() {
  const filePath = path.join(process.cwd(), "data/docs.json");
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}
