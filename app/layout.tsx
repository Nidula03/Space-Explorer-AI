import "@/styles/globals.css";

export const metadata = {
  title: "Space Explorer AI",
  description: "NASA data explained with AI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-surface-lowest text-on-surface font-body">
        {children}
      </body>
    </html>
  );
}
