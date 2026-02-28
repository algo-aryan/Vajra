const BASE_URL = "http://127.0.0.1:8000"

export async function getDocuments() {
  const res = await fetch(`${BASE_URL}/documents`)
  return res.json()
}

export async function uploadDocument(id, content) {
  await fetch(`${BASE_URL}/upload/${id}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content })
  })
}

export async function recoverDocument(id) {
  await fetch(`${BASE_URL}/recover/${id}`, {
    method: "POST"
  })
}

export async function viewDocument(id) {
  const res = await fetch(`${BASE_URL}/view/${id}`)
  return res.json()
}