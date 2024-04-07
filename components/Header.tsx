"use client";

import Image from "next/image";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { UserButton, useUser } from "@clerk/nextjs";

import { navLinks } from "@/constants";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isSignedIn } = useUser();

  return (
    <header className="fixed top-0 flex items-center justify-between w-full z-10 bg-gray-50 p-6 px-10 shadow-sm">
      <Link href="/" className="flex items-center gap-3">
        <Image
          src="/images/logo.png"
          alt="Logo"
          width={64}
          height={64}
          className="object-cover"
        />
        <h1 className="hidden sm:flex text-2xl font-semibold uppercase">
          Property Sell
        </h1>
      </Link>

      <nav className="hidden md:flex gap-10 text-sm font-medium">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "text-muted-foreground hover:text-primary",
              pathname === link.href && "text-primary"
            )}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="flex items-center gap-3">
        <Button size="sm" className="flex gap-2">
          <span>Post Your Ad</span>
          <PlusCircle className="h-5 w-5" />
        </Button>

        {isSignedIn ? (
          <UserButton afterSignOutUrl="/" />
        ) : (
          <Button
            size="sm"
            onClick={() => router.push("/sign-in")}
            variant="outline"
          >
            Login
          </Button>
        )}
      </div>
    </header>
  );
};

export default Header;
