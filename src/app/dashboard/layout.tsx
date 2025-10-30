import Sidebar from "@/src/components/sidebar";
import TopBar from "@/src/components/topbar";
import { auth } from "@/src/lib/auth";
import { redirect } from "next/navigation";

export default async function LayoutDashboard({ children, }: Readonly<{ children: React.ReactNode; }>) {

    const session = await auth();

    if (!session?.user) {
        redirect("/login");
    }

    return (
        <div className="flex h-full justify-between items-center">
            <Sidebar />
            <div className="bg-gray-200 w-full h-full">
                <TopBar />
                {children}
            </div>
        </div>
    )
}