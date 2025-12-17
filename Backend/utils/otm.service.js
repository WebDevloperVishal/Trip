import fetch from "node-fetch";

const OTM_KEY = process.env.OTM_API_KEY;
const OTM_BASE = "https://api.opentripmap.com/0.1/en/places";

export async function getNearbyPOIs({ lat, lon, radius = 2000, kinds = " hoteli,accommodations,transport,hospitals,cafes " , limit = 20 }) {
  
  const listUrl = `${OTM_BASE}/radius?radius=${radius}&lon=${lon}&lat=${lat}&apikey=${OTM_KEY}&limit=${limit}&kinds=${encodeURIComponent(kinds)}`;
  const listRes = await fetch(listUrl);
  if (!listRes.ok) throw new Error(`OTM list fetch failed: ${listRes.status}`);
  const listJson = await listRes.json();

  const items = [];
  for (const item of listJson.features || []) {
    const xid = item.properties.xid || item.properties.xid; 
    if (!xid) continue;
    try {
      const detailUrl = `${OTM_BASE}/xid/${xid}?apikey=${OTM_KEY}`;
      const dres = await fetch(detailUrl);
      if (!dres.ok) continue;
      const djson = await dres.json();
      items.push(djson);
    } catch (e) {
      
      continue;
    }
  }
  return items;
}
