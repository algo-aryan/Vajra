import { useState } from "react"

export default function ActivityLogs() {
  const [logs] = useState([
    { id: 1, timestamp: "2026-02-24 16:32:14", action: "Document Access", user: "Admin", details: "Municipal Budget Ordinance FY2026 opened", status: "success" },
    { id: 2, timestamp: "2026-02-24 15:45:22", action: "Integrity Check", user: "System", details: "All shards verified successfully", status: "success" },
    { id: 3, timestamp: "2026-02-24 14:12:08", action: "Document Upload", user: "Records Officer", details: "Zoning Amendment Resolution uploaded", status: "success" },
    { id: 4, timestamp: "2026-02-24 13:28:45", action: "Recovery Operation", user: "Security Team", details: "Parity chunk used to restore shard", status: "warning" },
    { id: 5, timestamp: "2026-02-24 12:15:33", action: "System Sync", user: "System", details: "Distributed nodes synchronized", status: "success" },
    { id: 6, timestamp: "2026-02-24 11:02:10", action: "Access Denied", user: "Unauthorized", details: "Attempted unauthorized document access", status: "error" }
  ])

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-4xl">📊</span>
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Activity Logs</h1>
            <p className="text-slate-600">Complete audit trail of system operations and document access</p>
          </div>
        </div>
      </div>

      {/* Logs Table */}
      <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-slate-50">
              <th className="text-left px-6 py-3 font-semibold text-slate-900">Timestamp</th>
              <th className="text-left px-6 py-3 font-semibold text-slate-900">Action</th>
              <th className="text-left px-6 py-3 font-semibold text-slate-900">User</th>
              <th className="text-left px-6 py-3 font-semibold text-slate-900">Details</th>
              <th className="text-left px-6 py-3 font-semibold text-slate-900">Status</th>
            </tr>
          </thead>
          <tbody>
            {logs.map(log => (
              <tr key={log.id} className="border-b hover:bg-slate-50">
                <td className="px-6 py-3 text-slate-600 font-mono text-xs">{log.timestamp}</td>
                <td className="px-6 py-3 font-medium text-slate-900">{log.action}</td>
                <td className="px-6 py-3 text-slate-600">{log.user}</td>
                <td className="px-6 py-3 text-slate-700">{log.details}</td>
                <td className="px-6 py-3">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    log.status === "success"
                      ? "bg-green-100 text-green-800"
                      : log.status === "warning"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                  }`}>
                    {log.status.charAt(0).toUpperCase() + log.status.slice(1)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm text-slate-600">
          Showing 1 to 6 of 2,341 logs
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 border rounded-lg hover:bg-slate-50">Previous</button>
          <button className="px-4 py-2 border rounded-lg bg-emerald-600 text-white">1</button>
          <button className="px-4 py-2 border rounded-lg hover:bg-slate-50">2</button>
          <button className="px-4 py-2 border rounded-lg hover:bg-slate-50">3</button>
          <button className="px-4 py-2 border rounded-lg hover:bg-slate-50">Next</button>
        </div>
      </div>
    </div>
  )
}
