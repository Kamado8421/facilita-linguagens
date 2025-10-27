import Sidebar from "@/src/components/sidebar";
import TopBar from "@/src/components/topbar";

export default function LayoutDashboard({ children, }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <div className="flex h-full justify-between items-center">
            <Sidebar />
            <div className="bg-gray-200 w-full h-full">
                <TopBar/>
                {children}
            </div>
        </div>
    )
}