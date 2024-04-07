import { LoaderIcon } from "lucide-react";

const Loading = () => {
  return (
    <main className="flex items-center justify-center h-screen w-full">
      <LoaderIcon className="h-10 w-10 text-muted-foreground animate-spin" />
    </main>
  );
};

export default Loading;
