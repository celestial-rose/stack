"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3, Users, FileText, Activity, ArrowUpRight, ArrowDownRight, DollarSign, Clock, CheckCircle } from "lucide-react";

export default function DashboardPage() {
    return (
        <div className="space-y-6">
            {/* Success Banner */}
            <Card className="p-6 bg-gradient-to-r from-purple-500 to-indigo-600 text-white border-none shadow-lg">
                <div className="flex items-center space-x-4">
                    <div className="bg-white/20 rounded-full p-2">
                        <CheckCircle className="h-8 w-8" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold">Congratulations! 🎉</h2>
                        <p className="opacity-90">
                            You've successfully accessed this protected page powered by Better Auth. This dashboard is an example of what you can build with the
                            @celestial-rose/stack.
                        </p>
                    </div>
                </div>
            </Card>

            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
                <Button className="bg-purple-600 hover:bg-purple-700 text-white">Create New Report</Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="p-4 shadow-sm border-purple-100 hover:border-purple-200 transition-colors">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-500">Total Users</p>
                            <h3 className="text-2xl font-bold text-gray-900 mt-1">2,543</h3>
                            <div className="flex items-center mt-1 text-sm">
                                <span className="flex items-center text-green-600 font-medium">
                                    <ArrowUpRight className="h-3 w-3 mr-1" />
                                    12%
                                </span>
                                <span className="text-gray-500 ml-1">from last month</span>
                            </div>
                        </div>
                        <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600">
                            <Users className="h-6 w-6" />
                        </div>
                    </div>
                </Card>

                <Card className="p-4 shadow-sm border-purple-100 hover:border-purple-200 transition-colors">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-500">Active Projects</p>
                            <h3 className="text-2xl font-bold text-gray-900 mt-1">18</h3>
                            <div className="flex items-center mt-1 text-sm">
                                <span className="flex items-center text-green-600 font-medium">
                                    <ArrowUpRight className="h-3 w-3 mr-1" />
                                    4%
                                </span>
                                <span className="text-gray-500 ml-1">from last month</span>
                            </div>
                        </div>
                        <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600">
                            <FileText className="h-6 w-6" />
                        </div>
                    </div>
                </Card>

                <Card className="p-4 shadow-sm border-purple-100 hover:border-purple-200 transition-colors">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-500">Revenue</p>
                            <h3 className="text-2xl font-bold text-gray-900 mt-1">$48,295</h3>
                            <div className="flex items-center mt-1 text-sm">
                                <span className="flex items-center text-red-600 font-medium">
                                    <ArrowDownRight className="h-3 w-3 mr-1" />
                                    3%
                                </span>
                                <span className="text-gray-500 ml-1">from last month</span>
                            </div>
                        </div>
                        <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600">
                            <DollarSign className="h-6 w-6" />
                        </div>
                    </div>
                </Card>

                <Card className="p-4 shadow-sm border-purple-100 hover:border-purple-200 transition-colors">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-500">Avg. Response Time</p>
                            <h3 className="text-2xl font-bold text-gray-900 mt-1">1.2h</h3>
                            <div className="flex items-center mt-1 text-sm">
                                <span className="flex items-center text-green-600 font-medium">
                                    <ArrowUpRight className="h-3 w-3 mr-1" />
                                    18%
                                </span>
                                <span className="text-gray-500 ml-1">from last month</span>
                            </div>
                        </div>
                        <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600">
                            <Clock className="h-6 w-6" />
                        </div>
                    </div>
                </Card>
            </div>

            {/* Activity Chart */}
            <Card className="p-6 shadow-sm border-purple-100">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-medium">Activity Overview</h3>
                    <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm" className="text-purple-600 border-purple-200 hover:bg-purple-50">
                            Weekly
                        </Button>
                        <Button variant="outline" size="sm" className="text-gray-600 border-gray-200 hover:bg-gray-50">
                            Monthly
                        </Button>
                        <Button variant="outline" size="sm" className="text-gray-600 border-gray-200 hover:bg-gray-50">
                            Yearly
                        </Button>
                    </div>
                </div>
                <div className="h-64 flex items-center justify-center bg-purple-50 rounded-lg">
                    <div className="text-center">
                        <Activity className="h-12 w-12 text-purple-400 mx-auto mb-2" />
                        <p className="text-gray-500">Activity chart visualization would appear here</p>
                    </div>
                </div>
            </Card>

            {/* Recent Activity */}
            <Card className="p-6 shadow-sm border-purple-100">
                <h3 className="text-lg font-medium mb-4">Recent Activity</h3>
                <div className="space-y-4">
                    {[1, 2, 3, 4, 5].map((item) => (
                        <div key={item} className="flex items-center p-3 hover:bg-purple-50 rounded-lg transition-colors">
                            <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mr-4">
                                <Users className="h-5 w-5" />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-medium text-gray-900">New user registered</p>
                                <p className="text-xs text-gray-500">2 hours ago</p>
                            </div>
                            <Button variant="ghost" size="sm" className="text-purple-600 hover:bg-purple-100">
                                View
                            </Button>
                        </div>
                    ))}
                </div>
                <div className="mt-4 text-center">
                    <Button variant="link" className="text-purple-600">
                        View All Activity
                    </Button>
                </div>
            </Card>
        </div>
    );
}
