import Header from "@/components/Header";

const SiteLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};

export default SiteLayout;
