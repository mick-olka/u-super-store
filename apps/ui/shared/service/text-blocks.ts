import { globalConfig } from "@/shared/configs/global";
import { I_TextBlock, TextBlocks } from "@/shared/models";

import { revalidation } from "./data";

export async function getTextByName(name: TextBlocks): Promise<I_TextBlock> {
  const link = `${globalConfig.apiUrl}/text_blocks/${name}`;
  const res = await fetch(link, revalidation);
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  return res.json();
}
