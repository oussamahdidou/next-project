import Sidebar from "./components/sidebar";
import Topbar from "./components/topbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  return (
    <html lang="en">
      <body>
        <Topbar />
        <Sidebar />
        <main className="container pt-[92px] pl-[238px] pr-5 min-h-screen min-w-full bg-gray-200">
          {children}
        </main>
      </body>
    </html>
  );
}
