import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import * as api from "../services/api"
import { useRecords } from "../context/RecordsContext"

export default function DocumentView() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getDocument, fetchDocuments } = useRecords()

  const [content, setContent] = useState("")
  const [status, setStatus] = useState("active")
  const [isSaving, setIsSaving] = useState(false)
  const [isRestoring, setIsRestoring] = useState(false)
  const [error, setError] = useState(null)

  const doc = getDocument(id)

  useEffect(() => {
    loadDocument()
  }, [id])

  const loadDocument = async () => {
    try {
      const res = await api.viewDocument(id)
      if (res.error) {
        setError(res.error)
      } else {
        setContent(res.content)
        setStatus(res.status)
      }
    } catch (err) {
      setError("Failed to load document")
    }
  }

  const handleSave = async () => {
    try {
      setIsSaving(true)
      await api.uploadDocument(id, content)
      await fetchDocuments()
      await loadDocument()
    } catch (err) {
      setError("Save failed")
    } finally {
      setIsSaving(false)
    }
  }

  const handleRestore = async () => {
    try {
      setIsRestoring(true)
      await api.recoverDocument(id)
      await fetchDocuments()
      await loadDocument()
    } catch (err) {
      setError("Recovery failed")
    } finally {
      setIsRestoring(false)
    }
  }

  if (!doc) {
    return <div className="p-8">Document not found</div>
  }

  const isCompromised = status === "compromised"

  return (
    <div className="p-8">

      <button
        onClick={() => navigate("/")}
        className="mb-6 text-slate-600 hover:text-slate-900"
      >
        ← Back to Records
      </button>

      <h1 className="text-2xl font-semibold mb-2">{doc.name}</h1>
      <p className="text-sm text-slate-500 mb-6">
        {doc.department} • Last modified: {doc.lastModified}
      </p>

      <div className="bg-white border rounded-lg">

        <div className="flex justify-between px-6 py-4 border-b bg-gray-50">
          <h2 className="font-semibold">DOCUMENT CONTENT</h2>

          <button
            onClick={handleSave}
            disabled={isSaving}
            className="px-4 py-2 text-sm border rounded"
          >
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </div>

        <div className="p-6">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full h-96 border p-4 font-mono text-sm"
          />
        </div>

      </div>

      <div className={`mt-6 p-4 rounded border ${
        isCompromised
          ? "bg-red-50 border-red-200"
          : "bg-green-50 border-green-200"
      }`}>
        <h3 className="font-semibold mb-2">Integrity Status</h3>
        <p className="text-sm">
          {isCompromised
            ? "⚠️ Integrity check failed — Document compromised."
            : "✓ Document integrity verified."}
        </p>

        {isCompromised && (
          <button
            onClick={handleRestore}
            disabled={isRestoring}
            className="mt-3 px-4 py-2 bg-yellow-600 text-white rounded"
          >
            {isRestoring ? "Recovering..." : "Initiate Recovery"}
          </button>
        )}
      </div>

      {error && (
        <div className="mt-4 p-3 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

    </div>
  )
}