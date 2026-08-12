import { Analytics } from '@vercel/analytics/next';
import "./globals.css";
export const metadata={title:"Beshoy Nashaat — Video Editor",description:"Beshoy Nashaat — video editing, motion design and social storytelling."};
export default function Layout({children}){
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}