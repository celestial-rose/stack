import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
export function FeatureCard({ title, description, icon }: { title: string; description: string; icon: string }) {
    return (
        <Card className="bg-black/40 backdrop-blur-sm border-purple-900/20 text-white transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/30 hover:-translate-y-1 hover:bg-black/60">
            <CardHeader>
                <div className="text-4xl mb-2">{icon}</div>
                <CardTitle className="text-purple-100 font-display">{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <CardDescription className="text-purple-200/70">{description}</CardDescription>
            </CardContent>
        </Card>
    );
}
