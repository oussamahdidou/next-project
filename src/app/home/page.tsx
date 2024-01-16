import Navbar from "./dashboard/components/navbar";
import LandingPage from "./dashboard/components/landingPage";
export default async function Home() {
  return (
    <main className="flex flex-col">
      <Navbar />
      <LandingPage />
    </main>
  );
}
