export const CATALOG_CATEGORIES = [
  {
    key: 'chales',
    nameFR: 'Châles',
    nameEN: 'Shawls',
    productFR: brand => `Châle ${brand}`,
    productEN: brand => `${brand} Shawl`,
    materialFR: 'Textile premium',
    materialEN: 'Premium textile',
    careFR: 'Entretien doux recommande',
    careEN: 'Gentle care recommended',
    descFR: brand => `Selection ${brand} preparee pour le catalogue JB Clothing. Les photos, coloris et prix definitifs seront ajoutes avec l inventaire reel.`,
    descEN: brand => `${brand} selection prepared for the JB Clothing catalog. Final photos, colors, and prices will be added with live inventory.`,
    brands: ['Fendi', 'Chanel', 'Loewe', 'Versace', 'Guess', 'Christian Dior', 'Coach', 'Louis Vuitton', 'Hermes'],
  },
  {
    key: 'chales-en-soie',
    nameFR: 'Châles en soie',
    nameEN: 'Silk Shawls',
    productFR: brand => `Châle en soie ${brand}`,
    productEN: brand => `${brand} Silk Shawl`,
    materialFR: 'Soie',
    materialEN: 'Silk',
    careFR: 'Nettoyage a sec recommande',
    careEN: 'Dry clean recommended',
    descFR: brand => `Piece en soie ${brand} structuree pour l inventaire JB Clothing. Image et details finaux a remplacer des reception des photos boutique.`,
    descEN: brand => `${brand} silk piece structured for JB Clothing inventory. Final image and details can be swapped in when boutique photos arrive.`,
    brands: ['Fendi', 'Chanel', 'Loewe', 'DKNY', 'Guess', 'Versace', 'Louis Vuitton', 'Hermes', 'Coach'],
  },
  {
    key: 'sacs',
    nameFR: 'Sacs',
    nameEN: 'Bags',
    productFR: brand => `Sac ${brand}`,
    productEN: brand => `${brand} Bag`,
    materialFR: 'Maroquinerie premium',
    materialEN: 'Premium leather goods',
    careFR: 'Proteger de l humidite et nettoyer avec soin',
    careEN: 'Protect from moisture and clean carefully',
    descFR: brand => `Reference sac ${brand} prete pour le catalogue reel. Elle attend les photos produit, dimensions, disponibilite et prix boutique.`,
    descEN: brand => `${brand} bag reference ready for the live catalog. It awaits product photos, dimensions, availability, and boutique pricing.`,
    brands: ['Dolce & Gabbana', 'Chanel', 'Louis Vuitton', 'Miu Miu', 'Yves Saint Laurent', 'Valentino', 'Hermes', 'Longchamp', 'Guess', 'Loro Piana', 'Christian Dior', 'Pinko', 'Fendi', 'Bottega', 'Coach', 'Celine Paris'],
  },
  {
    key: 'montres',
    nameFR: 'Montres',
    nameEN: 'Watches',
    productFR: brand => `Montre ${brand}`,
    productEN: brand => `${brand} Watch`,
    materialFR: 'Horlogerie et finition metal',
    materialEN: 'Watchmaking and metal finish',
    careFR: 'Eviter l eau, les chocs et les parfums',
    careEN: 'Avoid water, impact, and fragrance contact',
    descFR: brand => `Reference montre ${brand} ajoutee a la structure d inventaire. Les specifications et photos seront renseignees article par article.`,
    descEN: brand => `${brand} watch reference added to the inventory structure. Specifications and photos can be completed item by item.`,
    brands: ['Bvlgari', 'Louis Vuitton', 'Cartier', 'Michael Kors', 'Guess', 'Chanel', 'Rolex'],
  },
  {
    key: 'portes-accessoires',
    nameFR: 'Portes & accessoires',
    nameEN: 'Wallets & Accessories',
    productFR: brand => `Porte & accessoire ${brand}`,
    productEN: brand => `${brand} Wallet & Accessory`,
    materialFR: 'Accessoire premium',
    materialEN: 'Premium accessory',
    careFR: 'Conserver dans sa pochette et eviter les frottements',
    careEN: 'Store in its pouch and avoid abrasion',
    descFR: brand => `Accessoire ${brand} prepare pour les futures fiches inventaire JB Clothing avec remplacement rapide des images.`,
    descEN: brand => `${brand} accessory prepared for future JB Clothing inventory records with quick image replacement.`,
    brands: ['Goyard', 'Louis Vuitton', 'Coach', 'Guess', 'Chanel', 'Celine Paris', 'Dior', 'Michael Kors'],
  },
  {
    key: 'lunettes',
    nameFR: 'Lunettes',
    nameEN: 'Sunglasses',
    productFR: brand => `Lunettes ${brand}`,
    productEN: brand => `${brand} Sunglasses`,
    materialFR: 'Monture premium',
    materialEN: 'Premium frame',
    careFR: 'Nettoyer avec chiffon microfibre',
    careEN: 'Clean with a microfiber cloth',
    descFR: brand => `Reference lunettes ${brand} prete pour integration des photos reelles, variantes de verres et disponibilites.`,
    descEN: brand => `${brand} sunglasses reference ready for real photos, lens variants, and availability.`,
    brands: ['Miu Miu', 'Louis Vuitton', 'Hermes', 'Roberto Ferragamo', 'Gucci', 'Fendi', 'Celine Paris', 'Cartier', 'Yves Saint Laurent', 'Prada'],
  },
  {
    key: 'scarves',
    nameFR: 'Scarves',
    nameEN: 'Scarves',
    productFR: brand => `Scarf ${brand}`,
    productEN: brand => `${brand} Scarf`,
    materialFR: 'Textile premium',
    materialEN: 'Premium textile',
    careFR: 'Entretien doux recommande',
    careEN: 'Gentle care recommended',
    descFR: brand => `Scarf ${brand} ajoute au catalogue pour organiser la collection textile avant l arrivee des visuels finaux.`,
    descEN: brand => `${brand} scarf added to organize the textile collection before final visuals arrive.`,
    brands: ['Fendi', 'Chanel', 'Loewe', 'Versace', 'Guess', 'Christian Dior', 'Coach', 'Louis Vuitton', 'Hermes'],
  },
  {
    key: 'parfums',
    nameFR: 'Parfums',
    nameEN: 'Perfumes',
    productFR: brand => `Parfum ${brand}`,
    productEN: brand => `${brand} Perfume`,
    materialFR: 'Parfum',
    materialEN: 'Fragrance',
    careFR: 'Conserver a l abri de la lumiere et de la chaleur',
    careEN: 'Store away from light and heat',
    descFR: brand => `Parfum ${brand} structure dans le catalogue JB Clothing. Volume, concentration, prix et photo seront ajoutes avec l inventaire final.`,
    descEN: brand => `${brand} fragrance structured in the JB Clothing catalog. Volume, concentration, price, and photo can be added with final inventory.`,
    brands: ['Quelques Notes d’Amour', 'Givenchy', 'Jean Paul Gaultier', 'Carolina Herrera 212 Sexy', 'Carolina Herrera Good Girl Blush', 'Chanel Chance', 'Prada Paradoxe', 'Gissah', 'Yves Saint Laurent'],
  },
]

const slugify = value =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/&/g, 'and')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase()

const CATEGORY_IMAGE_COUNTS = {
  chales: 9,
  'chales-en-soie': 9,
  sacs: 16,
  montres: 7,
  'portes-accessoires': 8,
  lunettes: 10,
  scarves: 9,
  parfums: 9,
}

function imageFor(categoryKey, index) {
  const count = CATEGORY_IMAGE_COUNTS[categoryKey] || 0
  if (index >= count) return null
  return `/assets/catalog/${categoryKey}/${String(index + 1).padStart(2, '0')}.png`
}

export const products = CATALOG_CATEGORIES.flatMap(category =>
  category.brands.map((brand, brandIndex) => {
    const img = imageFor(category.key, brandIndex)
    return {
    id: 0,
    slug: `${category.key}-${slugify(brand)}`,
    brand,
    nameFR: category.productFR(brand),
    nameEN: category.productEN(brand),
    price: null,
    priceValue: null,
    priceLabel: { FR: 'Prix en boutique', EN: 'In-store price' },
    cat: category.nameFR,
    catKey: category.key,
    tag: { FR: 'Catalogue', EN: 'Catalog' },
    img,
    isPlaceholder: !img,
    descFR: category.descFR(brand),
    descEN: category.descEN(brand),
    material: { FR: category.materialFR, EN: category.materialEN },
    origin: { FR: 'JB Clothing, Temara', EN: 'JB Clothing, Temara' },
    care: { FR: category.careFR, EN: category.careEN },
    }
  })
).map((product, index) => ({ ...product, id: index + 1 }))

export function formatProductPrice(product, lang) {
  if (product.priceValue == null) return product.priceLabel?.[lang] || product.priceLabel?.EN || ''
  const value = (product.priceValue / 100).toLocaleString(lang === 'FR' ? 'fr-MA' : 'en-MA', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })
  return lang === 'FR' ? `${value} MAD` : `MAD ${value}`
}
