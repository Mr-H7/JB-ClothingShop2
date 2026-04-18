import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

const categories = [
  { slugFR: 'Les Sacs',                slugEN: 'bags',         nameFR: 'Les Sacs',                nameEN: 'Bags',                    sortOrder: 1 },
  { slugFR: 'Montres',                 slugEN: 'watches',      nameFR: 'Montres',                 nameEN: 'Watches',                 sortOrder: 2 },
  { slugFR: 'Lunettes',                slugEN: 'eyewear',      nameFR: 'Lunettes',                nameEN: 'Eyewear',                 sortOrder: 3 },
  { slugFR: 'Châles',                  slugEN: 'shawls',       nameFR: 'Châles',                  nameEN: 'Shawls',                  sortOrder: 4 },
  { slugFR: 'Parfum femme',            slugEN: 'perfume',      nameFR: 'Parfum femme',            nameEN: "Women's Perfume",         sortOrder: 5 },
  { slugFR: 'Porte M & accessoires',   slugEN: 'accessories',  nameFR: 'Porte M & accessoires',   nameEN: 'Wallets & Accessories',   sortOrder: 6 },
  { slugFR: 'Voiles en soie',          slugEN: 'silk-veils',   nameFR: 'Voiles en soie',          nameEN: 'Silk Veils',              sortOrder: 7 },
]

const rawProducts = [
  {
    slug: 'sac-noir-eclat', nameFR: 'Sac Noir Éclat', nameEN: 'Black Éclat Bag', pricePence: 49500,
    catSlugFR: 'Les Sacs',
    tagFR: 'Nouveau', tagEN: 'New',
    imgUrl: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=600&q=80',
    descFR: "Sac en cuir pleine fleur noir mat aux lignes architecturales. Doublure en satin, fermoir magnétique doré et bandoulière amovible. Un indispensable intemporel.",
    descEN: "Matte black full-grain leather bag with architectural lines. Satin lining, gold magnetic clasp, and removable strap. A timeless essential.",
    materialFR: 'Cuir pleine fleur', materialEN: 'Full-grain leather',
    originFR: 'Fabriqué en Italie', originEN: 'Made in Italy',
    careFR: 'Entretien avec crème cuir', careEN: 'Condition with leather cream',
  },
  {
    slug: 'sac-bandouliere-bordeaux', nameFR: 'Sac Bandoulière Bordeaux', nameEN: 'Bordeaux Crossbody Bag', pricePence: 38500,
    catSlugFR: 'Les Sacs',
    tagFR: 'Bestseller', tagEN: 'Bestseller',
    imgUrl: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80',
    descFR: "Sac bandoulière en cuir bordeaux aux reflets profonds. Chaîne dorée, poche zippée intérieure et compartiments multiples pour une organisation parfaite.",
    descEN: "Bordeaux leather crossbody with deep undertones. Gold chain, interior zip pocket, and multiple compartments for effortless organisation.",
    materialFR: 'Cuir vélin bordeaux', materialEN: 'Bordeaux vellum leather',
    originFR: 'Fabriqué en Espagne', originEN: 'Made in Spain',
    careFR: 'Entretien avec crème cuir', careEN: 'Condition with leather cream',
  },
  {
    slug: 'montre-or-rose-imperial', nameFR: 'Montre Or Rose Impérial', nameEN: 'Imperial Rose Gold Watch', pricePence: 89000,
    catSlugFR: 'Montres',
    tagFR: 'Exclusif', tagEN: 'Exclusive',
    imgUrl: 'https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?auto=format&fit=crop&w=600&q=80',
    descFR: "Montre en or rose avec cadran guilloché et bracelet en cuir havane. Mouvement à quartz de précision suisse. Étanche à 30 mètres.",
    descEN: "Rose gold watch with guilloché dial and tan leather strap. Swiss precision quartz movement. Water-resistant to 30 metres.",
    materialFR: 'Boîtier en acier or rose, cuir havane', materialEN: 'Rose gold steel case, tan leather',
    originFR: 'Mouvement suisse', originEN: 'Swiss movement',
    careFR: 'Révision recommandée tous les 3 ans', careEN: 'Service recommended every 3 years',
  },
  {
    slug: 'montre-minimaliste-noire', nameFR: 'Montre Minimaliste Noire', nameEN: 'Black Minimalist Watch', pricePence: 75000,
    catSlugFR: 'Montres',
    tagFR: '', tagEN: '',
    imgUrl: 'https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?auto=format&fit=crop&w=600&q=80',
    descFR: "Montre minimaliste à cadran noir mat avec index dorés. Bracelet en cuir noir gaufré. L'élégance dans sa forme la plus pure.",
    descEN: "Minimalist watch with matte black dial and gold indices. Embossed black leather strap. Elegance in its purest form.",
    materialFR: 'Boîtier en acier, cuir gaufré', materialEN: 'Steel case, embossed leather',
    originFR: 'Mouvement japonais', originEN: 'Japanese movement',
    careFR: "Éviter l'eau et les chocs", careEN: 'Avoid water and impact',
  },
  {
    slug: 'lunettes-aviateur-dorees', nameFR: 'Lunettes Aviateur Dorées', nameEN: 'Gold Aviator Sunglasses', pricePence: 18000,
    catSlugFR: 'Lunettes',
    tagFR: 'Nouveau', tagEN: 'New',
    imgUrl: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=600&q=80',
    descFR: "Lunettes de soleil aviateur à monture dorée et verres dégradés fumés. Protection UV 400. Livrées avec étui en cuir et chiffon en microfibre.",
    descEN: "Gold aviator sunglasses with gradient smoked lenses. UV 400 protection. Delivered with leather case and microfibre cloth.",
    materialFR: 'Monture métal doré, verres polarisés', materialEN: 'Gold metal frame, polarised lenses',
    originFR: 'Fabriqué en Italie', originEN: 'Made in Italy',
    careFR: 'Nettoyer avec le chiffon fourni', careEN: 'Clean with the included cloth',
  },
  {
    slug: 'lunettes-cat-eye-noires', nameFR: 'Lunettes Cat-Eye Noires', nameEN: 'Black Cat-Eye Sunglasses', pricePence: 16500,
    catSlugFR: 'Lunettes',
    tagFR: 'Limité', tagEN: 'Limited',
    imgUrl: 'https://images.unsplash.com/photo-1556306535-0f09a537f0a3?auto=format&fit=crop&w=600&q=80',
    descFR: "Lunettes cat-eye en acétate noir avec verres noirs intenses. Design iconique revisité avec une touche contemporaine dorée sur les charnières.",
    descEN: "Black acetate cat-eye sunglasses with intense black lenses. Iconic design revisited with a contemporary gold touch on hinges.",
    materialFR: 'Acétate noir, charnières dorées', materialEN: 'Black acetate, gold hinges',
    originFR: 'Fabriqué en France', originEN: 'Made in France',
    careFR: 'Nettoyer avec le chiffon fourni', careEN: 'Clean with the included cloth',
  },
  {
    slug: 'chale-cachemire-marine', nameFR: 'Châle Cachemire Marine', nameEN: 'Navy Cashmere Shawl', pricePence: 22000,
    catSlugFR: 'Châles',
    tagFR: '', tagEN: '',
    imgUrl: 'https://images.unsplash.com/photo-1545291730-faff8ca1d4b0?auto=format&fit=crop&w=600&q=80',
    descFR: "Châle en cachemire 100% d'une douceur incomparable. Coloris bleu marine profond avec finitions effilochées à la main. Dimensions 200 × 70 cm.",
    descEN: "100% cashmere shawl of incomparable softness. Deep navy blue with hand-frayed finishes. Dimensions 200 × 70 cm.",
    materialFR: 'Cachemire 100% grade A', materialEN: '100% Grade A cashmere',
    originFR: 'Fabriqué au Népal', originEN: 'Made in Nepal',
    careFR: "Lavage à la main à l'eau froide", careEN: 'Hand-wash in cold water',
  },
  {
    slug: 'chale-soie-ivoire', nameFR: 'Châle Soie Ivoire', nameEN: 'Ivory Silk Shawl', pricePence: 19500,
    catSlugFR: 'Châles',
    tagFR: 'Bestseller', tagEN: 'Bestseller',
    imgUrl: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=80',
    descFR: "Châle en soie de mûrier ivoire à reflets nacrés. Léger et fluide, il s'adapte à toutes les occasions avec une grâce naturelle.",
    descEN: "Ivory mulberry silk shawl with pearlescent shimmer. Lightweight and fluid, it adapts to every occasion with effortless grace.",
    materialFR: 'Soie de mûrier 100%', materialEN: '100% mulberry silk',
    originFR: 'Fabriqué en Chine', originEN: 'Made in China',
    careFR: 'Nettoyage à sec recommandé', careEN: 'Dry clean recommended',
  },
  {
    slug: 'essence-noire-edp', nameFR: 'Essence Noire EDP', nameEN: 'Essence Noire EDP', pricePence: 14500,
    catSlugFR: 'Parfum femme',
    tagFR: 'Exclusif', tagEN: 'Exclusive',
    imgUrl: 'https://images.unsplash.com/photo-1541643600914-78b084683702?auto=format&fit=crop&w=600&q=80',
    descFR: "Un sillage profond et envoûtant composé de notes de oud, de patchouli et de rose absolue. Un parfum de caractère pour la femme qui s'affirme.",
    descEN: "A deep and captivating sillage of oud, patchouli, and rose absolute. A character fragrance for the woman who makes a statement.",
    materialFR: 'Eau de Parfum, 50 ml', materialEN: 'Eau de Parfum, 50 ml',
    originFR: 'Créé à Grasse, France', originEN: 'Created in Grasse, France',
    careFR: "Conserver à l'abri de la lumière", careEN: 'Store away from light and heat',
  },
  {
    slug: 'rose-imperiale-edp', nameFR: 'Rose Impériale EDP', nameEN: 'Rose Impériale EDP', pricePence: 16500,
    catSlugFR: 'Parfum femme',
    tagFR: 'Nouveau', tagEN: 'New',
    imgUrl: 'https://images.unsplash.com/photo-1588776814546-1ffbb172d3da?auto=format&fit=crop&w=600&q=80',
    descFR: "Une ode florale à la rose de Turquie, rehaussée de bergamote dorée et de musc blanc. Féminité et raffinement en un seul flacon.",
    descEN: "A floral ode to Turkish rose, enhanced with golden bergamot and white musk. Femininity and refinement in a single bottle.",
    materialFR: 'Eau de Parfum, 50 ml', materialEN: 'Eau de Parfum, 50 ml',
    originFR: 'Créé à Grasse, France', originEN: 'Created in Grasse, France',
    careFR: "Conserver à l'abri de la lumière", careEN: 'Store away from light and heat',
  },
  {
    slug: 'porte-monnaie-cuir-noir', nameFR: 'Porte-Monnaie Cuir Noir', nameEN: 'Black Leather Wallet', pricePence: 8500,
    catSlugFR: 'Porte M & accessoires',
    tagFR: '', tagEN: '',
    imgUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80',
    descFR: "Porte-monnaie compact en cuir de veau noir avec coutures dorées. Six emplacements cartes, un compartiment monnaie et une poche billet.",
    descEN: "Compact black calf leather wallet with gold stitching. Six card slots, coin compartment, and a note pocket.",
    materialFR: 'Cuir de veau, coutures dorées', materialEN: 'Calf leather, gold stitching',
    originFR: 'Fabriqué en Italie', originEN: 'Made in Italy',
    careFR: 'Entretien avec crème cuir', careEN: 'Condition with leather cream',
  },
  {
    slug: 'porte-cartes-dore', nameFR: 'Porte-Cartes Doré', nameEN: 'Gold Card Holder', pricePence: 6500,
    catSlugFR: 'Porte M & accessoires',
    tagFR: 'Nouveau', tagEN: 'New',
    imgUrl: 'https://images.unsplash.com/photo-1548171915-e1db7e4af8d3?auto=format&fit=crop&w=600&q=80',
    descFR: "Porte-cartes slim en cuir noir avec passepoil doré. Quatre emplacements cartes, finitions à la main. L'élégance dans votre poche.",
    descEN: "Slim black leather card holder with gold piping. Four card slots, hand-finished edges. Elegance in your pocket.",
    materialFR: 'Cuir vachette, bords peints or', materialEN: 'Cowhide leather, gold-painted edges',
    originFR: 'Fabriqué en France', originEN: 'Made in France',
    careFR: 'Entretien avec crème cuir', careEN: 'Condition with leather cream',
  },
  {
    slug: 'voile-soie-doree', nameFR: 'Voile Soie Dorée', nameEN: 'Gold Silk Veil', pricePence: 12500,
    catSlugFR: 'Voiles en soie',
    tagFR: 'Limité', tagEN: 'Limited',
    imgUrl: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=600&q=80',
    descFR: "Voile en soie naturelle aux reflets dorés. Ourlet roulé à la main, tissu fluide et léger idéal pour toutes occasions. Dimensions 180 × 90 cm.",
    descEN: "Natural silk veil with golden shimmer. Hand-rolled hem, fluid and lightweight fabric ideal for any occasion. 180 × 90 cm.",
    materialFR: 'Soie naturelle 100%', materialEN: '100% natural silk',
    originFR: 'Tissé en Inde', originEN: 'Woven in India',
    careFR: 'Nettoyage à sec uniquement', careEN: 'Dry clean only',
  },
  {
    slug: 'voile-soie-nuit', nameFR: 'Voile Soie Nuit', nameEN: 'Midnight Silk Veil', pricePence: 11500,
    catSlugFR: 'Voiles en soie',
    tagFR: '', tagEN: '',
    imgUrl: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=600&q=80',
    descFR: "Voile en soie noir nuit, subtile et raffinée. La légèreté de la soie au service d'un style discret et élégant. Dimensions 180 × 90 cm.",
    descEN: "Midnight black silk veil, subtle and refined. The lightness of silk in service of a discreet and elegant style. 180 × 90 cm.",
    materialFR: 'Soie naturelle 100%', materialEN: '100% natural silk',
    originFR: 'Tissé en Inde', originEN: 'Woven in India',
    careFR: 'Nettoyage à sec uniquement', careEN: 'Dry clean only',
  },
]

async function main() {
  console.log('Seeding categories...')
  const catMap = {}
  for (const cat of categories) {
    const created = await prisma.category.upsert({
      where: { slugFR: cat.slugFR },
      update: { nameFR: cat.nameFR, nameEN: cat.nameEN, sortOrder: cat.sortOrder },
      create: cat,
    })
    catMap[cat.slugFR] = created.id
  }

  console.log('Seeding products...')
  for (const p of rawProducts) {
    const categoryId = catMap[p.catSlugFR]
    await prisma.product.upsert({
      where: { slug: p.slug },
      update: {
        nameFR: p.nameFR, nameEN: p.nameEN, descFR: p.descFR, descEN: p.descEN,
        price: p.pricePence, categoryId, imgUrl: p.imgUrl,
        materialFR: p.materialFR, materialEN: p.materialEN,
        originFR: p.originFR, originEN: p.originEN,
        careFR: p.careFR, careEN: p.careEN,
        tagFR: p.tagFR || '', tagEN: p.tagEN || '',
      },
      create: {
        slug: p.slug, nameFR: p.nameFR, nameEN: p.nameEN, descFR: p.descFR, descEN: p.descEN,
        price: p.pricePence, categoryId, imgUrl: p.imgUrl,
        materialFR: p.materialFR, materialEN: p.materialEN,
        originFR: p.originFR, originEN: p.originEN,
        careFR: p.careFR, careEN: p.careEN,
        tagFR: p.tagFR || '', tagEN: p.tagEN || '',
        inventory: { create: { stock: 999 } },
      },
    })
  }

  console.log('Seeding admin user...')
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@jbclothing.co.uk'
  const adminPassword = process.env.ADMIN_PASSWORD || 'Admin1234!'
  const adminHash = await bcrypt.hash(adminPassword, 12)
  await prisma.user.upsert({
    where: { email: adminEmail },
    update: { role: 'ADMIN' },
    create: {
      email: adminEmail,
      passwordHash: adminHash,
      role: 'ADMIN',
      profile: { create: { firstName: 'Admin', lastName: 'JB' } },
    },
  })

  console.log('Seed complete.')
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
