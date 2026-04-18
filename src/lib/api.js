export async function apiFetch(path, opts = {}) {
  const { body, headers, ...rest } = opts
  const isFormData = typeof FormData !== 'undefined' && body instanceof FormData
  const init = {
    credentials: 'include',
    headers: {
      ...(body && !isFormData ? { 'Content-Type': 'application/json' } : {}),
      ...(headers || {}),
    },
    ...rest,
  }
  if (body !== undefined) init.body = isFormData || typeof body === 'string' ? body : JSON.stringify(body)

  const res = await fetch(`/api${path.startsWith('/') ? path : `/${path}`}`, init)
  const contentType = res.headers.get('content-type') || ''
  const data = contentType.includes('application/json') ? await res.json().catch(() => null) : null

  if (!res.ok) {
    const err = new Error(data?.error || `Request failed (${res.status})`)
    err.status = res.status
    err.data = data
    throw err
  }
  return data
}

export const api = {
  get:   (path, opts)         => apiFetch(path, { ...opts, method: 'GET' }),
  post:  (path, body, opts)   => apiFetch(path, { ...opts, method: 'POST', body }),
  patch: (path, body, opts)   => apiFetch(path, { ...opts, method: 'PATCH', body }),
  put:   (path, body, opts)   => apiFetch(path, { ...opts, method: 'PUT', body }),
  del:   (path, opts)         => apiFetch(path, { ...opts, method: 'DELETE' }),
}
