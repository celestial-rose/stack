import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell, Menu, User } from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Sidebar } from "./Sidebar";

interface HeaderProps {
    className?: string;
}

export function Header({ className }: HeaderProps) {
    return (
        <>
            {/* User controls - top right */}
            <div className={`absolute top-4 right-4 z-50 flex items-center gap-2 ${className}`}>
                <Button variant="ghost" size="icon" className="text-purple-600 hover:bg-purple-100/50 rounded-full">
                    <Bell className="h-5 w-5" />
                    <span className="sr-only">Notifications</span>
                </Button>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="relative h-8 w-8 rounded-full hover:bg-purple-100/50">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src="/avatar.png" alt="User" />
                                <AvatarFallback className="bg-purple-100 text-purple-700">
                                    <User className="h-4 w-4" />
                                </AvatarFallback>
                            </Avatar>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-white">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Profile</DropdownMenuItem>
                        <DropdownMenuItem>Settings</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Logout</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            {/* Mobile menu button - only visible on small screens */}
            <div className="absolute top-4 left-4 z-50 md:hidden">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="text-purple-600 hover:bg-purple-100/50 rounded-full">
                            <Menu className="h-5 w-5" />
                            <span className="sr-only">Toggle menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="p-0 font-display">
                        <SheetTitle className="sr-only">Sidebar</SheetTitle>
                        <Sidebar />
                    </SheetContent>
                </Sheet>
            </div>
        </>
    );
}
