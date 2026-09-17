import type { Metadata } from "next";
import "./globals.css";
import { Web3Provider } from "../context/Web3Context";
import { NotificationProvider } from "../context/NotificationContext";
import { BountyProvider } from "../context/BountyContext";
import Navbar from "../components/layout/Navbar";
import MobileNav from "../components/layout/MobileNav";
import Footer from "../components/layout/Footer";
import WalletModal from "../components/modals/WalletModal";
import NetworkSelectorModal from "../components/modals/NetworkSelectorModal";
import NotificationDrawer from "../components/modals/NotificationDrawer";

export const metadata: Metadata = {
  title: "bagwork — Small tasks. Real rewards.",
  description: "Small tasks. Real rewards. bagwork connects people with funded bounties. Help someone, share something useful, and earn rewards after your proof is approved.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <body className="bg-[#fffdf9] text-[#09090b] antialiased selection:bg-black selection:text-white">
        <NotificationProvider>
          <Web3Provider>
            <BountyProvider>
              <div className="flex min-h-screen flex-col">
                <Navbar />
                <main className="flex-1 pb-16 md:pb-0">{children}</main>
                <Footer />
              </div>
              <WalletModal />
              <NetworkSelectorModal />
              <NotificationDrawer />
            </BountyProvider>
          </Web3Provider>
        </NotificationProvider>
      </body>
    </html>
  );
}
