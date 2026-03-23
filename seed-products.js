const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const products = [
  { sku: 'KHF-001', slug: 'ethiopia-yirgacheffe', name: 'Ethiopia Yirgacheffe', description: 'Yüksek rakımlı bölgelerin eşsiz lezzeti. Çiçeksi ve narenciye notalarıyla dengeli bir gövde sunar.', price: 320, salePrice: 270, discountRate: 16, vatRate: 20, categoryName: 'Çekirdek', stock: 100, warehouse: 'Merkez Depo', isActive: true, images: JSON.stringify(['https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=800&auto=format&fit=crop']) },
  { sku: 'KHF-002', slug: 'colombia-supremo', name: 'Colombia Supremo', description: 'Geleneksel Kolombiya kahvesi. Karamel ve fındık tatlarının muhteşem uyumu.', price: 280, salePrice: null, discountRate: 0, vatRate: 20, categoryName: 'Çekirdek', stock: 150, warehouse: 'Merkez Depo', isActive: true, images: JSON.stringify(['https://images.unsplash.com/photo-1580915411954-282cb1b0d780?q=80&w=800&auto=format&fit=crop']) },
  { sku: 'EKP-001', slug: 'hario-v60-set', name: 'Hario V60 Starter Set', description: 'Evde kaliteli kahve demlemek için ihtiyacınız olan her şey bu sette.', price: 650, salePrice: 520, discountRate: 20, vatRate: 20, categoryName: 'Ekipman', stock: 50, warehouse: 'Merkez Depo', isActive: true, images: JSON.stringify(['https://images.unsplash.com/photo-1544787210-2213d2496e95?q=80&w=800&auto=format&fit=crop']) },
  { sku: 'EKP-002', slug: 'chemex-8-cup', name: 'Chemex 8 Cup', description: 'Zarif tasarımıyla en sevilen üçüncü dalga demleme ekipmanı.', price: 890, salePrice: null, discountRate: 0, vatRate: 20, categoryName: 'Ekipman', stock: 30, warehouse: 'Merkez Depo', isActive: true, images: JSON.stringify(['https://images.unsplash.com/photo-1542332606-b4d11598ceea?q=80&w=800&auto=format&fit=crop']) },
  { sku: 'KHF-003', slug: 'brazil-cerrado', name: 'Brazil Cerrado', description: 'Düşük asidite ve yoğun gövde. Sütlü içecekler için ideal bir tercih.', price: 230, salePrice: null, discountRate: 0, vatRate: 20, categoryName: 'Çekirdek', stock: 200, warehouse: 'Merkez Depo', isActive: true, images: JSON.stringify(['https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=800&auto=format&fit=crop']) },
  { sku: 'EKP-003', slug: 'fellow-stagg-kettle', name: 'Fellow Stagg Kettle', description: 'Hassas akış kontrolü ve mat siyah tasarımıyla profesyonel bir demleme deneyimi.', price: 1250, salePrice: 999, discountRate: 20, vatRate: 20, categoryName: 'Ekipman', stock: 20, warehouse: 'Merkez Depo', isActive: true, images: JSON.stringify(['https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800&auto=format&fit=crop']) },
  { sku: 'KHF-004', slug: 'kenya-aa', name: 'Kenya AA', description: 'Keskin asidite ve meyvemsi tatlar. Kenyasnın en iyi kahve sınıfı.', price: 310, salePrice: null, discountRate: 0, vatRate: 20, categoryName: 'Çekirdek', stock: 80, warehouse: 'Merkez Depo', isActive: true, images: JSON.stringify(['https://images.unsplash.com/photo-1504630083234-14187a9df0f5?q=80&w=800&auto=format&fit=crop']) },
  { sku: 'AKS-001', slug: 'hario-dripper', name: 'Hario V60 Dripper', description: 'Klasik seramik damlatıcı. Şeffaf ve temiz bir kahve içimi için.', price: 185, salePrice: null, discountRate: 0, vatRate: 20, categoryName: 'Aksesuar', stock: 120, warehouse: 'Merkez Depo', isActive: true, images: JSON.stringify(['https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=800&auto=format&fit=crop']) },
  { sku: 'EKP-004', slug: 'timemore-grinder', name: 'Timemore C2 Değirmen', description: 'Taşınabilir ve ayarlanabilir el değirmeni. Paslanmaz çelik bıçaklar.', price: 750, salePrice: 620, discountRate: 17, vatRate: 20, categoryName: 'Ekipman', stock: 40, warehouse: 'Merkez Depo', isActive: true, images: JSON.stringify(['https://images.unsplash.com/photo-1442512595331-e89e73853f31?q=80&w=800&auto=format&fit=crop']) },
  { sku: 'KHF-005', slug: 'guatemala-antigua', name: 'Guatemala Antigua', description: 'Volkanik toprakların zenginliği. Baharatlı ve çikolatalı notalar.', price: 295, salePrice: null, discountRate: 0, vatRate: 20, categoryName: 'Çekirdek', stock: 90, warehouse: 'Merkez Depo', isActive: true, images: JSON.stringify(['https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=800&auto=format&fit=crop']) },
  { sku: 'AKS-002', slug: 'goat-story-mug', name: 'Goat Story Kupa', description: 'Keçi boynuzu tasarımıyla ikonik bir taşıma kupası.', price: 420, salePrice: null, discountRate: 0, vatRate: 20, categoryName: 'Aksesuar', stock: 60, warehouse: 'Merkez Depo', isActive: true, images: JSON.stringify(['https://images.unsplash.com/photo-1572119865084-43c285814d63?q=80&w=800&auto=format&fit=crop']) },
  { sku: 'SET-001', slug: 'hediye-set-1', name: 'Barista Başlangıç Seti', description: 'Kahve dünyasına adım atanlar için en iyi hediye seçeneği.', price: 1200, salePrice: 980, discountRate: 18, vatRate: 20, categoryName: 'Hediye', stock: 15, warehouse: 'Merkez Depo', isActive: true, images: JSON.stringify(['https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800&auto=format&fit=crop']) },
];

async function main() {
  console.log('Seeding ALL professional products...');
  
  // Create categories first
  const catNames = Array.from(new Set(products.map(p => p.categoryName)));
  for (const name of catNames) {
    await prisma.category.upsert({
      where: { name },
      update: {},
      create: { name, slug: name.toLowerCase().replace(/ /g, '-') }
    });
  }

  const allCats = await prisma.category.findMany();

  for (const p of products) {
    const category = allCats.find(c => c.name === p.categoryName);
    await prisma.product.upsert({
      where: { slug: p.slug },
      update: { ...p, categoryId: category.id },
      create: { ...p, categoryId: category.id }
    });
  }
  console.log('Seeding complete.');
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
