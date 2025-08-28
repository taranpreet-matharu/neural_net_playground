import "./globals.css";
import ThemeRegistry from "./components/ThemeRegistry";

export const metadata = {
  title: "Neural Playground",
  description: "Neural network playground UI - polished"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>{children}</ThemeRegistry>
      </body>
    </html>
  );
}
