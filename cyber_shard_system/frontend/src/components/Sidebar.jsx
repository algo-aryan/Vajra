
import { Link, useLocation } from "react-router-dom"

function SidebarIcon({ type }) {
    switch (type) {
        case "records":
            return (
                <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 8V6a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H8a2 2 0 01-2-2v-2" /><path strokeLinecap="round" strokeLinejoin="round" d="M6 12h6" /></svg>
            )
        case "security":
            return (
                <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3l8 4v5c0 5.25-3.5 10-8 12-4.5-2-8-6.75-8-12V7l8-4z" /></svg>
            )
        case "logs":
            return (
                <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>
            )
        default:
            return null
    }
}

export default function Sidebar() {
    const location = useLocation()
    const navItems = [
        { path: "/", label: "Records", icon: "records" },
        { path: "/security", label: "Security Console", icon: "security" },
        // { path: "/logs", label: "Activity Logs", icon: "logs" }
    ]

    return (
        <div className="fixed left-0 top-0 w-60 h-screen bg-[#111F3B] border-r border-slate-800 text-slate-200 p-6 flex flex-col">
            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-9 h-9 bg-emerald-500 rounded-md flex items-center justify-center font-bold text-white text-lg">G</div>
                    <div>
                        <div className="font-semibold text-base tracking-tight text-white">GREENFIELD</div>
                        <div className="text-xs text-slate-400">RECORDS MANAGEMENT</div>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-1">
                {navItems.map(item => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition text-sm font-medium ${location.pathname === item.path
                                ? "bg-[#1E2F55] text-white border border-slate-600"
                                : "text-slate-300 hover:bg-[#1A2948] hover:text-white"
                            }`}
                    >
                        <SidebarIcon type={item.icon} />
                        <span>{item.label}</span>
                    </Link>
                ))}
            </nav>

            {/* Footer */}
            <div className="mt-auto text-xs text-slate-400 border-t border-slate-100 pt-4">
                <div className="text-emerald-500 font-semibold">System Status: Operational</div>
                <div>v3.2.1 • TLS 1.3 Secured</div>
            </div>
        </div>
    )
}
