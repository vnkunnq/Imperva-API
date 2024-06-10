import Providers from "../providers";
import '../styles/global.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
  session: never;
}) {
  return (
    <html lang='en'>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
