import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main className="p-6 bg-gray-100 min-h-screen">{children}</main>
    </>
  );
}
