import { auth } from "@/auth";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
    LayoutDashboard,
    BookOpen,
    FileQuestion,
    Users,
    BarChart3,
    Plus,
    RefreshCw,
    CheckCircle2,
    AlertCircle,
    Smartphone,
    FileText,
    UserPlus,
    Star
} from "lucide-react";

export default async function TeacherDashboardPage() {
    const nextAuthSession = await auth();
    const customSession = await getSession();

    const user = nextAuthSession?.user || customSession?.user;

    if (!user) {
        redirect("/login");
    }

    if (user.role !== "TEACHER") {
        redirect("/dashboard");
    }

    const displayName = user.name || user.fullName || "Teacher";

    return (
        <div className="flex min-h-screen bg-[#f8fbff] text-gray-800 font-sans">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-100 flex flex-col fixed h-full z-10">
                <div className="p-6 pb-2">
                    <div className="flex items-center gap-3 mb-1">
                        <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center font-bold text-lg">R</div>
                        <span className="font-bold text-lg text-gray-900">RuralEdu</span>
                    </div>
                    <p className="text-xs text-blue-500 font-medium pl-11">Admin Panel v2.4</p>
                </div>

                <nav className="flex-1 px-4 py-6 space-y-1">
                    <Link href="/teacher-dashboard" className="flex items-center gap-3 px-4 py-3 bg-blue-50 text-blue-600 rounded-xl font-medium transition-colors">
                        <LayoutDashboard size={20} />
                        Dashboard
                    </Link>
                    <Link href="#" className="flex items-center gap-3 px-4 py-3 text-gray-500 hover:bg-gray-50 hover:text-gray-900 rounded-xl font-medium transition-colors">
                        <BookOpen size={20} />
                        Lessons
                    </Link>
                    <Link href="#" className="flex items-center gap-3 px-4 py-3 text-gray-500 hover:bg-gray-50 hover:text-gray-900 rounded-xl font-medium transition-colors">
                        <FileQuestion size={20} />
                        Quizzes
                    </Link>
                    <Link href="#" className="flex items-center gap-3 px-4 py-3 text-gray-500 hover:bg-gray-50 hover:text-gray-900 rounded-xl font-medium transition-colors">
                        <Users size={20} />
                        Students
                    </Link>
                    <Link href="#" className="flex items-center gap-3 px-4 py-3 text-gray-500 hover:bg-gray-50 hover:text-gray-900 rounded-xl font-medium transition-colors">
                        <BarChart3 size={20} />
                        Reports
                    </Link>
                </nav>

                <div className="p-4 mt-auto">
                    <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">System Status</span>
                            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        </div>
                        <p className="font-semibold text-sm mb-1">All data synced</p>
                        <p className="text-xs text-gray-400 mb-3">Last sync: 2 mins ago</p>
                        <button className="w-full flex items-center justify-center gap-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-xs font-bold py-2 rounded-lg transition-colors">
                            <RefreshCw size={14} />
                            Sync Now
                        </button>
                    </div>

                    <div className="flex items-center gap-3 mt-6 pt-6 border-t border-gray-100">
                        <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-bold border-2 border-white shadow-sm overflow-hidden">
                            {/* Ideally verify if user.image exists, otherwise fallback to initials or placeholder */}
                            <img src="https://ui-avatars.com/api/?name=Sarah+Jenkins&background=random" alt="Profile" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-gray-900 truncate">{displayName}</p>
                            <p className="text-xs text-gray-500 truncate">Lead Teacher</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-64 p-8 overflow-y-auto">
                <header className="flex justify-between items-start mb-8">
                    <div>
                        <h1 className="text-3xl font-black text-gray-900 mb-1">Dashboard</h1>
                        <p className="text-gray-500">Overview of your class progress and daily tasks.</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 font-semibold rounded-lg shadow-sm transition-colors">
                            <Plus size={18} />
                            Create Quiz
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-sm transition-colors shadow-blue-200">
                            <Plus size={18} />
                            Create Lesson
                        </button>
                    </div>
                </header>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {/* Stat Card 1 */}
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                                <Users size={20} />
                            </div>
                            <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full">+2 new</span>
                        </div>
                        <p className="text-sm font-medium text-gray-500 mb-1">Total Students</p>
                        <h3 className="text-3xl font-black text-gray-900">124</h3>
                    </div>

                    {/* Stat Card 2 */}
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-2 bg-purple-50 text-purple-600 rounded-xl">
                                <CheckCircle2 size={20} />
                            </div>
                            <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full">+5%</span>
                        </div>
                        <p className="text-sm font-medium text-gray-500 mb-1">Avg. Completion</p>
                        <h3 className="text-3xl font-black text-gray-900">78%</h3>
                    </div>

                    {/* Stat Card 3 */}
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-2 bg-orange-50 text-orange-600 rounded-xl">
                                <AlertCircle size={20} />
                            </div>
                            <span className="bg-gray-100 text-gray-600 text-xs font-bold px-2 py-1 rounded-full">12 left</span>
                        </div>
                        <p className="text-sm font-medium text-gray-500 mb-1">Pending Grading</p>
                        <h3 className="text-3xl font-black text-gray-900">12</h3>
                    </div>

                    {/* Stat Card 4 */}
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-2 bg-teal-50 text-teal-600 rounded-xl">
                                <Smartphone size={20} />
                            </div>
                            <span className="bg-green-50 text-green-600 text-xs font-bold px-2 py-1 rounded-full">Online</span>
                        </div>
                        <p className="text-sm font-medium text-gray-500 mb-1">Active Devices</p>
                        <h3 className="text-3xl font-black text-gray-900">45</h3>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Student Progress */}
                    <section className="lg:col-span-2 bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                            <h2 className="text-lg font-bold text-gray-900">Student Progress</h2>
                            <button className="text-blue-600 text-sm font-bold hover:underline">View All</button>
                        </div>
                        <div className="p-0">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="text-xs text-gray-400 font-bold uppercase tracking-wider border-b border-gray-50">
                                        <th className="px-6 py-4">Student Name</th>
                                        <th className="px-6 py-4">Current Module</th>
                                        <th className="px-6 py-4">Progress</th>
                                        <th className="px-6 py-4 text-right">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm">
                                    <tr className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 font-bold text-gray-900 flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">JP</div>
                                            Juan Perez
                                        </td>
                                        <td className="px-6 py-4 text-gray-600">Intro to Math</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="flex-1 h-2 bg-gray-100 rounded-full min-w-[60px]">
                                                    <div className="h-full bg-blue-500 rounded-full" style={{ width: '75%' }}></div>
                                                </div>
                                                <span className="text-xs font-bold text-gray-700">75%</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-green-50 text-green-600 border border-green-100">
                                                <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                                                Synced
                                            </span>
                                        </td>
                                    </tr>
                                    <tr className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 font-bold text-gray-900 flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-xs">MG</div>
                                            Maria Garcia
                                        </td>
                                        <td className="px-6 py-4 text-gray-600">Science Basics</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="flex-1 h-2 bg-gray-100 rounded-full min-w-[60px]">
                                                    <div className="h-full bg-blue-500 rounded-full" style={{ width: '45%' }}></div>
                                                </div>
                                                <span className="text-xs font-bold text-gray-700">45%</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-orange-50 text-orange-600 border border-orange-100">
                                                <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                                                Pending
                                            </span>
                                        </td>
                                    </tr>
                                    <tr className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 font-bold text-gray-900 flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center font-bold text-xs">LH</div>
                                            Luis Hernandez
                                        </td>
                                        <td className="px-6 py-4 text-gray-600">History 101</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="flex-1 h-2 bg-gray-100 rounded-full min-w-[60px]">
                                                    <div className="h-full bg-green-500 rounded-full" style={{ width: '100%' }}></div>
                                                </div>
                                                <span className="text-xs font-bold text-gray-700">100%</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-green-50 text-green-600 border border-green-100">
                                                <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                                                Synced
                                            </span>
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 font-bold text-gray-900 flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center font-bold text-xs">AL</div>
                                            Ana Lopez
                                        </td>
                                        <td className="px-6 py-4 text-gray-600">Geography</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="flex-1 h-2 bg-gray-100 rounded-full min-w-[60px]">
                                                    <div className="h-full bg-gray-300 rounded-full" style={{ width: '20%' }}></div>
                                                </div>
                                                <span className="text-xs font-bold text-gray-700">20%</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-500 border border-gray-200">
                                                <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                                                Offline
                                            </span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="p-4 border-t border-gray-50 text-center">
                            <span className="text-xs text-blue-600 font-bold hover:underline cursor-pointer flex items-center justify-center gap-1">
                                Showing 1-4 of 24 students
                            </span>
                        </div>
                    </section>

                    {/* Recent Activity */}
                    <section className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
                        <h2 className="text-lg font-bold text-gray-900 mb-6">Recent Activity</h2>
                        <div className="space-y-6 relative before:absolute before:left-[19px] before:top-2 before:h-[85%] before:w-0.5 before:bg-gray-100">

                            <div className="relative flex gap-4">
                                <div className="absolute left-0 mt-1 w-10 h-10 rounded-full bg-blue-50 text-blue-600 border-2 border-white shadow-sm flex items-center justify-center z-10">
                                    <FileText size={16} />
                                </div>
                                <div className="pl-14">
                                    <p className="text-sm font-bold text-gray-900">Juan submitted <span className="font-extrabold">Math Quiz #3</span></p>
                                    <p className="text-xs text-blue-500 font-medium mt-0.5">10 minutes ago</p>
                                </div>
                            </div>

                            <div className="relative flex gap-4">
                                <div className="absolute left-0 mt-1 w-10 h-10 rounded-full bg-green-50 text-green-600 border-2 border-white shadow-sm flex items-center justify-center z-10">
                                    <CheckCircle2 size={16} />
                                </div>
                                <div className="pl-14">
                                    <p className="text-sm font-bold text-gray-900">Lesson materials synced</p>
                                    <p className="text-xs text-blue-500 font-medium mt-0.5">2 hours ago</p>
                                </div>
                            </div>

                            <div className="relative flex gap-4">
                                <div className="absolute left-0 mt-1 w-10 h-10 rounded-full bg-purple-50 text-purple-600 border-2 border-white shadow-sm flex items-center justify-center z-10">
                                    <UserPlus size={16} />
                                </div>
                                <div className="pl-14">
                                    <p className="text-sm font-bold text-gray-900">New student registered</p>
                                    <p className="text-xs text-blue-500 font-medium mt-0.5">Yesterday at 4:30 PM</p>
                                </div>
                            </div>

                            <div className="relative flex gap-4">
                                <div className="absolute left-0 mt-1 w-10 h-10 rounded-full bg-orange-50 text-orange-600 border-2 border-white shadow-sm flex items-center justify-center z-10">
                                    <Star size={16} />
                                </div>
                                <div className="pl-14">
                                    <p className="text-sm font-bold text-gray-900">Science grading pending</p>
                                    <p className="text-xs text-blue-500 font-medium mt-0.5">2 days ago</p>
                                </div>
                            </div>

                        </div>
                        <button className="w-full mt-6 py-3 border border-gray-200 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors">
                            View Full History
                        </button>
                    </section>
                </div>
            </main>
        </div>
    );
}
