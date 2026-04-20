export const WHATSAPP_NUMBER = '212666200124'

function formatPrice(pence, lang) {
  const v = (pence / 100).toLocaleString(lang === 'FR' ? 'fr-FR' : 'en-GB', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })
  return lang === 'FR' ? `${v} £` : `£${v}`
}

export function buildSingleProductMessage(product, quantity, variant, lang) {
  const name = lang === 'FR' ? product.nameFR : product.nameEN
  const lines = lang === 'FR'
    ? [
        'Bonjour JB Clothing,',
        '',
        'Je souhaite commander :',
        `• ${name}`,
        `  Quantité : ${quantity}`,
      ]
    : [
        'Hello JB Clothing,',
        '',
        "I'd like to order:",
        `• ${name}`,
        `  Quantity: ${quantity}`,
      ]
  if (variant) {
    lines.push(lang === 'FR' ? `  Option : ${variant}` : `  Option: ${variant}`)
  }
  if (product.price != null) {
    lines.push(lang === 'FR' ? `  Prix : ${formatPrice(product.price * quantity, lang)}` : `  Price: ${formatPrice(product.price * quantity, lang)}`)
  }
  lines.push('', lang === 'FR' ? 'Merci.' : 'Thank you.')
  return lines.join('\n')
}

export function buildCartMessage(items, lang) {
  if (!items?.length) return ''
  const intro = lang === 'FR'
    ? ['Bonjour JB Clothing,', '', 'Je souhaite passer la commande suivante :', '']
    : ['Hello JB Clothing,', '', "I'd like to place the following order:", '']
  const body = items.map((it, i) => {
    const name = lang === 'FR' ? it.nameFR : it.nameEN
    const line = [`${i + 1}. ${name}`]
    line.push(lang === 'FR' ? `   Quantité : ${it.quantity}` : `   Quantity: ${it.quantity}`)
    if (it.variant) line.push(lang === 'FR' ? `   Option : ${it.variant}` : `   Option: ${it.variant}`)
    line.push(lang === 'FR'
      ? `   Prix : ${formatPrice(it.price * it.quantity, lang)}`
      : `   Price: ${formatPrice(it.price * it.quantity, lang)}`)
    return line.join('\n')
  })
  const total = items.reduce((s, it) => s + it.price * it.quantity, 0)
  const footer = [
    '',
    lang === 'FR' ? `Total : ${formatPrice(total, lang)}` : `Total: ${formatPrice(total, lang)}`,
    '',
    lang === 'FR' ? 'Merci.' : 'Thank you.',
  ]
  return [...intro, ...body, ...footer].join('\n')
}

export function whatsappUrl(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

export function openWhatsapp(message) {
  window.open(whatsappUrl(message), '_blank', 'noopener,noreferrer')
}
