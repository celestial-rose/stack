import { useAuthGuard } from "@/lib/hooks/useAuthGuard";
import { Header } from "@/components/dashboard/Header";
import { Sidebar } from "@/components/dashboard/Sidebar";

async function Layout({ children }: { children: React.ReactNode }) {
    await useAuthGuard();

    return (
        <div className="min-h-screen bg-purple-50 font-display">
            <div className="flex h-screen">
                {/* Sidebar - full height */}
                <aside className="hidden w-64 flex-shrink-0 md:block">
                    <Sidebar />
                </aside>

                {/* Main content area with floating header */}
                <div className="relative flex-1 flex flex-col overflow-hidden">
                    {/* Floating header elements */}
                    <Header />

                    {/* Main content */}
                    <main className="flex-1 overflow-auto p-6">
                        <div className="mx-auto max-w-7xl pt-10">{children}</div>
                        <p className="text-sm font-semibold text-purple-700 mt-10 text-center bg-transparent">
                            @celestial-rose/stack, an idea by Celestial &copy; 2025
                        </p>
                    </main>
                </div>
            </div>
        </div>
    );
}

export default Layout;
