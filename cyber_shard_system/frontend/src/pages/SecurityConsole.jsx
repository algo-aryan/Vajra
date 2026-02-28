import { useState } from "react"
import { useRecords } from "../context/RecordsContext"
import * as api from "../services/api"

export default function SecurityConsole() {
  const { documents, fetchDocuments } = useRecords()
  const [recovering, setRecovering] = useState(null)
  const [error, setError] = useState(null)

  const compromisedDocs = documents.filter(d => d.status === "compromised")
  const allVerified = compromisedDocs.length === 0

  const handleRecovery = async (docId) => {
    try {
      setRecovering(docId)
      setError(null)

      // Call backend recovery
      await api.recoverDocument(docId)

      // Refresh documents from backend
      await fetchDocuments()

    } catch (err) {
      console.error("Recovery failed:", err)
      setError("Failed to recover document.")
    } finally {
      setRecovering(null)
    }
  }

  return (
    <div className="p-8">

      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900">
          Security Console
        </h2>
        <p className="text-slate-600">
          Integrity monitoring and distributed recovery operations
        </p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h2 className="text-sm font-medium text-slate-700">
            Compromised Documents ({compromisedDocs.length})
          </h2>
        </div>

        {allVerified ? (
          <div className="px-6 py-12 text-center">
            <div className="w-10 h-10 mx-auto mb-4 rounded-full border-2 border-emerald-500 flex items-center justify-center">
              ✓
            </div>
            <h3 className="text-sm font-medium text-slate-800 mb-1">
              All Documents Verified
            </h3>
            <p className="text-xs text-slate-500">
              No integrity issues detected across distributed nodes.
            </p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left px-6 py-3">Document</th>
                <th className="text-left px-6 py-3">Department</th>
                <th className="text-left px-6 py-3">Last Modified</th>
                <th className="text-right px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {compromisedDocs.map(doc => (
                <tr key={doc.id} className="border-b border-gray-100">
                  <td className="px-6 py-4">{doc.name}</td>
                  <td className="px-6 py-4 text-slate-500">{doc.department}</td>
                  <td className="px-6 py-4 text-slate-500">{doc.lastModified}</td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleRecovery(doc.id)}
                      disabled={recovering === doc.id}
                      className="px-3 py-1 text-xs border rounded"
                    >
                      {recovering === doc.id
                        ? "Recovering..."
                        : "Initiate Recovery"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {error && (
        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded">
          {error}
        </div>
      )}
    </div>
  )
}