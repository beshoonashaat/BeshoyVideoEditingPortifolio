import * as cheerio from "cheerio";

function normalize(u){
  if(!u) return null;
  try{
    const x=new URL(u);
    if(x.hostname.includes("youtube.com")||x.hostname==="youtu.be"){
      let id=x.searchParams.get("v");
      if(!id && x.pathname.startsWith("/embed/")) id=x.pathname.split("/")[2];
      if(!id && x.hostname==="youtu.be") id=x.pathname.slice(1).split("/")[0];
      return id?{type:"youtube",id}:null;
    }
    if(x.hostname.includes("instagram.com")){
      const m=x.pathname.match(/\\/(reel|p|tv)\\/([^/?#]+)/);
      return m?{type:"instagram",id:m[2],kind:m[1]}:null;
    }
  }catch{}
  return null;
}
export async function scrapeProject(url){
  const res=await fetch(url,{headers:{"User-Agent":"Mozilla/5.0 (compatible; BeshoyPortfolio/1.0)","Accept":"text/html,application/xhtml+xml"},cache:"no-store"});
  if(!res.ok) throw new Error("Behance returned "+res.status);
  const html=await res.text();
  const $=cheerio.load(html);
  const found=[];
  $("a[href],iframe[src],video[src]").each((_,el)=>{
    const u=$(el).attr("href")||$(el).attr("src");
    const item=normalize(u);
    if(item && !found.some(x=>x.type===item.type&&x.id===item.id)) found.push(item);
  });
  // Behance can put embed URLs in JSON/script data rather than visible anchors.
  const patterns=[
    /https?:\\\\?\/\\\\?\/(?:www\\.)?youtube(?:-nocookie)?\\.com\\\\?\/(?:embed\\\\?\/|watch\\?v=)([A-Za-z0-9_-]{6,})/g,
    /https?:\\\\?\/\\\\?\/(?:www\\.)?youtu\\.be\\\\?\/([A-Za-z0-9_-]{6,})/g,
    /https?:\\\\?\/\\\\?\/(?:www\\.)?instagram\\.com\\\\?\/(?:reel|p|tv)\\\\?\/([A-Za-z0-9_-]+)/g
  ];
  for(const re of patterns){let m;while((m=re.exec(html))){const type=re.source.includes("instagram")?"instagram":"youtube";const id=m[1];if(!found.some(x=>x.type===type&&x.id===id))found.push({type,id,kind:"reel"});}}
  return found;
}
