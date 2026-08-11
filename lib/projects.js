export const projects=[
 {slug:"ramez-khairallah",title:"Ramez & Khairallah",behance:"https://www.behance.net/gallery/253821149/Ramez-Khairallah",description:"Video editing, motion design and football content.",fallback:{youtube:1,instagram:0}},
 {slug:"dr-samuel-safwat",title:"Dr. Samuel Safwat",behance:"https://www.behance.net/gallery/253819061/Dr-Samuel-Safwat",description:"Medical social content and video editing.",fallback:{youtube:2,instagram:0}},
 {slug:"ahlan-podcast",title:"Ahlan Podcast — بودكاست أهلًا",behance:"https://www.behance.net/gallery/238005039/Ahlan-Podast-",description:"Podcast episodes and social-first reels.",fallback:{youtube:4,instagram:5}},
 {slug:"ashab-el-sa3ada",title:"Ashab El Sa3ada — أصحاب السعادة",behance:"https://www.behance.net/gallery/238045891/Ashab-El-Sa3ada-",description:"Music video, album production and social content.",fallback:{youtube:7,instagram:7}},
 {slug:"sha2a-11",title:"Sha2a 11 — شقة ١١",behance:"https://www.behance.net/gallery/238007067/Sha2a-11-",description:"Podcast full episodes and reels.",fallback:{youtube:12,instagram:6}}
];
export function getProject(slug){return projects.find(p=>p.slug===slug)}
