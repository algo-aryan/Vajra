export default function StatusBadge({ status }) {
  const statusConfig = {
    active: { bg: "bg-green-100", text: "text-green-700", label: "Active" },
    compromised: { bg: "bg-red-100", text: "text-red-700", label: "Integrity Alert" },
    recovery: { bg: "bg-yellow-100", text: "text-yellow-700", label: "Under Recovery" },
  }

  const config = statusConfig[status] || statusConfig.active

  return (
    <span className={`px-2 py-1 rounded text-xs font-semibold ${config.bg} ${config.text}`}>
      {config.label}
    </span>
  )
}