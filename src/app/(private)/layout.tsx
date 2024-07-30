import AvatarDropdown from "@/components/layout/avatar-dropdown";
import { MobileSidebar } from "@/components/layout/mobile-sidebar";
import { Sidebar } from "@/components/layout/sidebar";
import { authOptions } from "@/config/authOptions";
import { cn } from "@/lib/utils";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await getServerSession(authOptions);

  if (!session?.user) return redirect("/api/auth/signin");

  return (
    <div className="flex flex-col">
      <nav className="fixed w-full h-16 border-b flex justify-between items-center px-10 bg-background">
        <div className="w-40 flex items-center gap-2">
          <Image
            src="/logo6.png"
            alt="Logo"
            width={633}
            height={134}
            className="hidden md:block"
          />
          <div className={cn("block md:!hidden")}>
            <MobileSidebar session={session} />
          </div>
        </div>
        <AvatarDropdown />
      </nav>
      <div className="flex h-screen w-full overflow-y-hidden pt-16">
        <nav className="w-64 border-r py-6 px-4 hidden md:block">
          <Sidebar session={session} />
        </nav>
        <main className="max-w-full md:max-w-[calc(100vw-200px)] flex-1">
          <div className="hidden" data-test="private"></div>
          {children}
        </main>
      </div>
    </div>
  );
}
