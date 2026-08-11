import "./globals.css";
export const metadata={title:"Beshoy Nashaat — Video Editor",description:"Beshoy Nashaat portfolio"};
export default function RootLayout({children}){return <><nav><div className="wrap nav"><a className="brand" href="/">BESHОY.</a><div className="navlinks"><a href="/#work">Work</a><a href="/#about">About</a><a href="/#contact">Contact</a></div><span style={{fontSize:12,color:"#777"}}>Available for work</span></div></nav>{children}<footer><div className="wrap">© 2026 Beshoy Nashaat · Video Editor · Egypt</div></footer></>}
