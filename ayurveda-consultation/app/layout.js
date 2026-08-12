import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "ARAYAL Ayurveda Consultation",
  description: "Online Ayurveda Consultation System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="m-0 p-0">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}