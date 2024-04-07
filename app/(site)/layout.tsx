import { Header } from "@/components/Header";

const SiteLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Header />
      <main>{children}</main>
    </div>
  );
};

export default SiteLayout;
