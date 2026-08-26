import "./globals.css";
import { Analytics } from '@vercel/analytics/next';

export const metadata={title:"Beshoy Nashaat — Video Editor",description:"Beshoy Nashaat — video editing, motion design and social storytelling."};
export default function Layout({children}){
  return (
    <>
      {children}
      <Analytics />
    </>
  );
}