import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import { Button } from "./ui/button";

interface GradientButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    gradientFrom?: string;
    gradientTo?: string;
    hoverFrom?: string;
    hoverTo?: string;
    className?: string;
}

export function GradientButton({
    children,
    gradientFrom = "from-indigo-500",
    gradientTo = "to-purple-600",
    hoverFrom = "hover:from-indigo-600",
    hoverTo = "hover:to-purple-700",
    className,
    ...props
}: GradientButtonProps) {
    return (
        <div className={`bg-gradient-to-r ${gradientFrom} ${gradientTo} ${hoverFrom} ${hoverTo} rounded-lg transition duration-300 ease-in-out`}>
            <Button className={cn("w-full text-white py-2", className)} {...props}>
                {children}
            </Button>
        </div>
    );
}
