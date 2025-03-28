import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { LayoutDashboard, Settings, Users, FileText, BarChart3, LogOut } from "lucide-react";
import { APP_NAME } from "@celestial/shared";

interface SidebarProps {
    className?: string;
}

export function Sidebar({ className }: SidebarProps) {
    return (
        <div className={`flex h-full w-full flex-col bg-gradient-to-b from-purple-900 via-purple-950 to-indigo-950 text-white ${className}`}>
            <div className="flex h-16 items-center px-6 py-4 bg-gradient-to-r from-purple-800/30 to-transparent">
                <h2 className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-purple-200 to-indigo-100">{APP_NAME}</h2>
            </div>
            <Separator className="bg-gradient-to-r from-purple-700 to-indigo-700 opacity-50" />
            <div className="flex-1 overflow-auto py-6">
                <nav className="grid gap-2 px-4">
                    <Button asChild variant="ghost" className="justify-start text-white hover:bg-white/10 hover:text-purple-200 transition-all duration-200">
                        <Link href="/dashboard">
                            <LayoutDashboard className="mr-3 h-5 w-5 text-purple-300" />
                            Dashboard
                        </Link>
                    </Button>
                    <Button asChild variant="ghost" className="justify-start text-white hover:bg-white/10 hover:text-purple-200 transition-all duration-200">
                        <Link href="/users">
                            <Users className="mr-3 h-5 w-5 text-purple-300" />
                            Users
                        </Link>
                    </Button>
                    <Button asChild variant="ghost" className="justify-start text-white hover:bg-white/10 hover:text-purple-200 transition-all duration-200">
                        <Link href="/reports">
                            <FileText className="mr-3 h-5 w-5 text-purple-300" />
                            Reports
                        </Link>
                    </Button>
                    <Button asChild variant="ghost" className="justify-start text-white hover:bg-white/10 hover:text-purple-200 transition-all duration-200">
                        <Link href="/analytics">
                            <BarChart3 className="mr-3 h-5 w-5 text-purple-300" />
                            Analytics
                        </Link>
                    </Button>
                    <Button asChild variant="ghost" className="justify-start text-white hover:bg-white/10 hover:text-purple-200 transition-all duration-200">
                        <Link href="/settings">
                            <Settings className="mr-3 h-5 w-5 text-purple-300" />
                            Settings
                        </Link>
                    </Button>
                </nav>
            </div>
            <Separator className="bg-gradient-to-r from-purple-700 to-indigo-700 opacity-50" />
            <div className="p-4 bg-gradient-to-t from-purple-900/50 to-transparent">
                <Button variant="ghost" className="w-full justify-start text-white hover:bg-white/10 hover:text-purple-200 transition-all duration-200">
                    <LogOut className="mr-3 h-5 w-5 text-purple-300" />
                    Logout
                </Button>
            </div>
        </div>
    );
}
