export function getSupabaseEnvStatus() {
  return {
    hasUrl: Boolean(process.env.SUPABASE_URL),
    hasServiceRoleKey: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY),
  }
}

function getConfig() {
  return {
    url: process.env.SUPABASE_URL,
    serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
  }
}

function assertConfigured() {
  const { url, serviceRoleKey } = getConfig()
  if (!url || !serviceRoleKey) {
    const err = new Error('Supabase environment variables are not configured')
    err.status = 500
    throw err
  }
}

async function request(table, { method = 'GET', query = '', body, headers = {} } = {}) {
  assertConfigured()

  const { url: supabaseUrl, serviceRoleKey } = getConfig()
  const baseUrl = supabaseUrl.replace(/\/$/, '')
  const url = `${baseUrl}/rest/v1/${table}${query ? `?${query}` : ''}`
  const res = await fetch(url, {
    method,
    headers: {
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
      ...(body ? { 'Content-Type': 'application/json' } : {}),
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  })

  if (!res.ok) {
    const detail = await res.text().catch(() => '')
    const err = new Error(`Supabase request failed (${res.status})${detail ? `: ${detail}` : ''}`)
    err.status = res.status
    throw err
  }

  const contentType = res.headers.get('content-type') || ''
  if (contentType.includes('application/json')) return res.json()
  return null
}

function encodeFilter(value) {
  return encodeURIComponent(value)
}

async function count(table) {
  assertConfigured()
  const { url: supabaseUrl, serviceRoleKey } = getConfig()
  const baseUrl = supabaseUrl.replace(/\/$/, '')
  const res = await fetch(`${baseUrl}/rest/v1/${table}?select=id`, {
    method: 'HEAD',
    headers: {
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
      Prefer: 'count=exact',
    },
  })

  if (!res.ok) {
    const err = new Error(`Supabase count failed (${res.status})`)
    err.status = res.status
    throw err
  }

  const range = res.headers.get('content-range') || '0-0/0'
  return Number(range.split('/')[1] || 0)
}

export const supabase = {
  upsertNewsletterLead({ email, language }) {
    return request('newsletter_leads', {
      method: 'POST',
      query: 'on_conflict=email',
      body: { email, language },
      headers: { Prefer: 'resolution=merge-duplicates,return=minimal' },
    })
  },

  createContactSubmission(data) {
    return request('contact_submissions', {
      method: 'POST',
      body: data,
      headers: { Prefer: 'return=minimal' },
    })
  },

  createCollaborationSubmission(data) {
    return request('collaboration_submissions', {
      method: 'POST',
      body: data,
      headers: { Prefer: 'return=minimal' },
    })
  },

  list(table, limit = 10) {
    return request(table, {
      query: `select=*&order=created_at.desc&limit=${limit}`,
    })
  },

  count,
  encodeFilter,
}
