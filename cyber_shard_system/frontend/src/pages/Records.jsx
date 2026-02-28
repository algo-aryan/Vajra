import { useNavigate } from "react-router-dom"
import { useRecords } from "../context/RecordsContext"
import StatusBadge from "../components/StatusBadge"

export default function Records() {
    const { documents } = useRecords()
    const navigate = useNavigate()

    const activeCount = documents.filter(d => d.status === "active").length
    const compromisedCount = documents.filter(d => d.status === "compromised").length
    const recoveryCount = documents.filter(d => d.status === "recovery").length

    return (
        <div className="p-8">
            {/* Header */}
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-slate-900">Records Dashboard</h2>
                <p className="text-slate-600">Municipal document registry — {documents.length} records on file</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
                <StatCard title="Active Records" value={activeCount} color="text-green-600" />
                <StatCard title="Integrity Alerts" value={compromisedCount} color="text-red-600" />
                <StatCard title="Under Recovery" value={recoveryCount} color="text-yellow-600" />
            </div>

            {/* Table */}
            <div className="bg-white rounded-lg border border-gray-200">
                <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                    <h2 className="font-semibold text-slate-900">Official Documents</h2>
                </div>

                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-gray-200 bg-gray-50">
                            <th className="text-left px-6 py-3 font-semibold text-slate-900">Document Name</th>
                            <th className="text-left px-6 py-3 font-semibold text-slate-900">Department</th>
                            <th className="text-left px-6 py-3 font-semibold text-slate-900">Status</th>
                            <th className="text-left px-6 py-3 font-semibold text-slate-900">Last Modified</th>
                            <th className="text-left px-6 py-3 font-semibold text-slate-900">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {documents.map(doc => (
                            <tr key={doc.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                                <td className="px-6 py-3 font-medium text-slate-900 flex items-center gap-2">
                                    <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 8V6a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H8a2 2 0 01-2-2v-2" /><path strokeLinecap="round" strokeLinejoin="round" d="M6 12h6" /></svg>
                                    {doc.name}
                                </td>

                                <td className="px-6 py-3 text-slate-600">
                                    {doc.department}
                                </td>

                                <td className="px-6 py-3">
                                    <StatusBadge status={doc.status} />
                                </td>

                                <td className="px-6 py-3 text-slate-600">
                                    {doc.lastModified}
                                </td>

                                <td className="px-6 py-3">
                                    <button
                                        onClick={() => navigate(`/document/${doc.id}`)}
                                        className="inline-flex items-center gap-2 px-3 py-1 text-xs bg-gray-100 text-slate-700 border border-gray-200 hover:bg-gray-200 transition"
                                    >
                                        <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                        </svg>
                                        Open
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

function StatCard({ title, value, color }) {
    return (
        <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className={`text-3xl font-semibold ${color} mb-1`}>
                {value}
            </div>
            <div className="text-sm text-slate-500">
                {title}
            </div>
        </div>
    )
}