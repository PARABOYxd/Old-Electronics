import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create admin user
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@ezelectronicspickup.com' },
    update: {},
    create: {
      email: 'admin@ezelectronicspickup.com',
      name: 'Admin User',
      role: 'ADMIN',
    },
  });
  console.log('👤 Created admin user');

  // Create cities
  const cities = await Promise.all([
    prisma.city.upsert({
      where: { name: 'Mumbai' },
      update: {},
      create: { name: 'Mumbai', state: 'Maharashtra', isActive: true },
    }),
    prisma.city.upsert({
      where: { name: 'Delhi' },
      update: {},
      create: { name: 'Delhi', state: 'Delhi', isActive: true },
    }),
    prisma.city.upsert({
      where: { name: 'Bangalore' },
      update: {},
      create: { name: 'Bangalore', state: 'Karnataka', isActive: true },
    }),
    prisma.city.upsert({
      where: { name: 'Hyderabad' },
      update: {},
      create: { name: 'Hyderabad', state: 'Telangana', isActive: true },
    }),
    prisma.city.upsert({
      where: { name: 'Chennai' },
      update: {},
      create: { name: 'Chennai', state: 'Tamil Nadu', isActive: true },
    }),
    prisma.city.upsert({
      where: { name: 'Pune' },
      update: {},
      create: { name: 'Pune', state: 'Maharashtra', isActive: true },
    }),
    prisma.city.upsert({
      where: { name: 'Jaipur' },
      update: {},
      create: { name: 'Jaipur', state: 'Rajasthan', isActive: false, isComingSoon: true },
    }),
    prisma.city.upsert({
      where: { name: 'Lucknow' },
      update: {},
      create: { name: 'Lucknow', state: 'Uttar Pradesh', isActive: false, isComingSoon: true },
    }),
  ]);
  console.log('🏙️ Created cities');

  // Create conditions
  const conditions = await Promise.all([
    prisma.condition.upsert({
      where: { name: 'Excellent' },
      update: {},
      create: { name: 'Excellent', description: 'Like new condition', multiplier: 1.0 },
    }),
    prisma.condition.upsert({
      where: { name: 'Good' },
      update: {},
      create: { name: 'Good', description: 'Minor signs of wear', multiplier: 0.8 },
    }),
    prisma.condition.upsert({
      where: { name: 'Fair' },
      update: {},
      create: { name: 'Fair', description: 'Visible wear and tear', multiplier: 0.6 },
    }),
    prisma.condition.upsert({
      where: { name: 'Poor' },
      update: {},
      create: { name: 'Poor', description: 'Significant damage but functional', multiplier: 0.4 },
    }),
  ]);
  console.log('📱 Created conditions');

  // Create categories
  const mobileCategory = await prisma.category.upsert({
    where: { name: 'Mobile Phones' },
    update: {},
    create: {
      name: 'Mobile Phones',
      slug: 'mobile-phones',
      description: 'Smartphones and feature phones',
      icon: '📱',
    },
  });

  const laptopCategory = await prisma.category.upsert({
    where: { name: 'Laptops' },
    update: {},
    create: {
      name: 'Laptops',
      slug: 'laptops',
      description: 'Laptops and notebooks',
      icon: '💻',
    },
  });

  const tabletCategory = await prisma.category.upsert({
    where: { name: 'Tablets' },
    update: {},
    create: {
      name: 'Tablets',
      slug: 'tablets',
      description: 'Tablets and iPads',
      icon: '📟',
    },
  });

  console.log('📂 Created categories');

  // Create mobile devices
  const mobileDevice = await prisma.device.upsert({
    where: { slug: 'smartphones' },
    update: {},
    create: {
      name: 'Smartphones',
      slug: 'smartphones',
      categoryId: mobileCategory.id,
    },
  });

  // Create laptop device
  const laptopDevice = await prisma.device.upsert({
    where: { slug: 'laptops' },
    update: {},
    create: {
      name: 'Laptops',
      slug: 'laptops',
      categoryId: laptopCategory.id,
    },
  });

  // Create tablet device
  const tabletDevice = await prisma.device.upsert({
    where: { slug: 'tablets' },
    update: {},
    create: {
      name: 'Tablets',
      slug: 'tablets',
      categoryId: tabletCategory.id,
    },
  });

  console.log('📱 Created devices');

  // Create mobile brands
  const appleBrand = await prisma.brand.upsert({
    where: { slug: 'apple-mobile' },
    update: {},
    create: {
      name: 'Apple',
      slug: 'apple-mobile',
      deviceId: mobileDevice.id,
    },
  });

  const samsungBrand = await prisma.brand.upsert({
    where: { slug: 'samsung-mobile' },
    update: {},
    create: {
      name: 'Samsung',
      slug: 'samsung-mobile',
      deviceId: mobileDevice.id,
    },
  });

  const oneplusBrand = await prisma.brand.upsert({
    where: { slug: 'oneplus-mobile' },
    update: {},
    create: {
      name: 'OnePlus',
      slug: 'oneplus-mobile',
      deviceId: mobileDevice.id,
    },
  });

  // Create laptop brands
  const appleLaptopBrand = await prisma.brand.upsert({
    where: { slug: 'apple-laptop' },
    update: {},
    create: {
      name: 'Apple',
      slug: 'apple-laptop',
      deviceId: laptopDevice.id,
    },
  });

  const dellBrand = await prisma.brand.upsert({
    where: { slug: 'dell-laptop' },
    update: {},
    create: {
      name: 'Dell',
      slug: 'dell-laptop',
      deviceId: laptopDevice.id,
    },
  });

  console.log('🏷️ Created brands');

  // Create iPhone models
  const iphoneModels = await Promise.all([
    prisma.model.upsert({
      where: { slug: 'iphone-15-pro' },
      update: {},
      create: {
        name: 'iPhone 15 Pro',
        slug: 'iphone-15-pro',
        brandId: appleBrand.id,
      },
    }),
    prisma.model.upsert({
      where: { slug: 'iphone-14' },
      update: {},
      create: {
        name: 'iPhone 14',
        slug: 'iphone-14',
        brandId: appleBrand.id,
      },
    }),
    prisma.model.upsert({
      where: { slug: 'iphone-13' },
      update: {},
      create: {
        name: 'iPhone 13',
        slug: 'iphone-13',
        brandId: appleBrand.id,
      },
    }),
  ]);

  // Create Samsung models
  const samsungModels = await Promise.all([
    prisma.model.upsert({
      where: { slug: 'galaxy-s24' },
      update: {},
      create: {
        name: 'Galaxy S24',
        slug: 'galaxy-s24',
        brandId: samsungBrand.id,
      },
    }),
    prisma.model.upsert({
      where: { slug: 'galaxy-s23' },
      update: {},
      create: {
        name: 'Galaxy S23',
        slug: 'galaxy-s23',
        brandId: samsungBrand.id,
      },
    }),
  ]);

  // Create MacBook models
  const macbookModels = await Promise.all([
    prisma.model.upsert({
      where: { slug: 'macbook-pro-14' },
      update: {},
      create: {
        name: 'MacBook Pro 14"',
        slug: 'macbook-pro-14',
        brandId: appleLaptopBrand.id,
      },
    }),
    prisma.model.upsert({
      where: { slug: 'macbook-air-13' },
      update: {},
      create: {
        name: 'MacBook Air 13"',
        slug: 'macbook-air-13',
        brandId: appleLaptopBrand.id,
      },
    }),
  ]);

  console.log('📱 Created models');

  // Create variants for iPhone 15 Pro
  const iphone15ProVariants = await Promise.all([
    prisma.variant.upsert({
      where: { name: '128GB' },
      update: {},
      create: {
        name: '128GB',
        description: '128GB Storage',
        modelId: iphoneModels[0].id,
      },
    }),
    prisma.variant.upsert({
      where: { name: '256GB' },
      update: {},
      create: {
        name: '256GB',
        description: '256GB Storage',
        modelId: iphoneModels[0].id,
      },
    }),
    prisma.variant.upsert({
      where: { name: '512GB' },
      update: {},
      create: {
        name: '512GB',
        description: '512GB Storage',
        modelId: iphoneModels[0].id,
      },
    }),
  ]);

  console.log('💾 Created variants');

  // Create pricing rules
  const pricingRules = await Promise.all([
    prisma.pricingRule.upsert({
      where: { id: 'iphone-15-pro-pricing' },
      update: {},
      create: {
        id: 'iphone-15-pro-pricing',
        modelId: iphoneModels[0].id,
        basePrice: 85000,
        minPrice: 60000,
        maxPrice: 100000,
      },
    }),
    prisma.pricingRule.upsert({
      where: { id: 'iphone-14-pricing' },
      update: {},
      create: {
        id: 'iphone-14-pricing',
        modelId: iphoneModels[1].id,
        basePrice: 65000,
        minPrice: 45000,
        maxPrice: 80000,
      },
    }),
    prisma.pricingRule.upsert({
      where: { id: 'galaxy-s24-pricing' },
      update: {},
      create: {
        id: 'galaxy-s24-pricing',
        modelId: samsungModels[0].id,
        basePrice: 75000,
        minPrice: 55000,
        maxPrice: 90000,
      },
    }),
    prisma.pricingRule.upsert({
      where: { id: 'macbook-pro-14-pricing' },
      update: {},
      create: {
        id: 'macbook-pro-14-pricing',
        modelId: macbookModels[0].id,
        basePrice: 150000,
        minPrice: 120000,
        maxPrice: 180000,
      },
    }),
  ]);

  console.log('💰 Created pricing rules');

  // Create stats
  const stats = await prisma.stats.upsert({
    where: { id: 'main-stats' },
    update: {},
    create: {
      id: 'main-stats',
      devicesCollected: 15420,
      energySavedKwh: 98.7,
      treesPreserved: 2847,
      ewasteKg: 125.6,
    },
  });

  console.log('📊 Created stats');

  // Create testimonials
  const testimonials = await Promise.all([
    prisma.testimonial.create({
      data: {
        name: 'Rajesh Kumar',
        location: 'Mumbai, Maharashtra',
        rating: 5,
        content: 'Excellent service! They picked up my old laptop within 2 hours and paid me ₹8,500 on the spot. Very professional and trustworthy.',
        image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?w=150',
      },
    }),
    prisma.testimonial.create({
      data: {
        name: 'Priya Sharma',
        location: 'Delhi, India',
        rating: 5,
        content: 'I was amazed by how quick and easy the process was. Sold 3 old phones and got ₹12,000. Highly recommend EZElectronicsPickup!',
        image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?w=150',
      },
    }),
  ]);

  console.log('💬 Created testimonials');

  // Create sample blog posts
  const blogPosts = await Promise.all([
    prisma.blogPost.create({
      data: {
        title: '5 Tips to Get Maximum Value for Your Old Smartphone',
        slug: '5-tips-maximum-value-old-smartphone',
        excerpt: 'Learn how to prepare your smartphone for sale and get the best price.',
        content: `# 5 Tips to Get Maximum Value for Your Old Smartphone

Getting the best price for your old smartphone requires some preparation. Here are our top tips:

## 1. Clean Your Device Thoroughly
A clean device always fetches a better price. Remove all dust, fingerprints, and grime.

## 2. Include Original Accessories
Having the original charger, earphones, and box can increase your device value by 10-15%.

## 3. Check Device Functionality
Test all features including camera, speakers, charging port, and touchscreen.

## 4. Backup and Wipe Data
Ensure all your personal data is backed up and then perform a factory reset.

## 5. Time Your Sale Right
New model launches often create demand for older models at better prices.

Following these tips can help you get up to 20% more value for your device!`,
        tags: ['smartphone', 'tips', 'selling'],
        isPublished: true,
        author: 'EZElectronicsPickup Team',
        readTime: 5,
      },
    }),
    prisma.blogPost.create({
      data: {
        title: 'The Environmental Impact of E-Waste Recycling',
        slug: 'environmental-impact-ewaste-recycling',
        excerpt: 'Understand how proper e-waste disposal helps protect our planet.',
        content: `# The Environmental Impact of E-Waste Recycling

Electronic waste is one of the fastest-growing waste streams globally. Here's why proper recycling matters:

## The Problem
- 50 million tons of e-waste generated annually worldwide
- Only 20% is properly recycled
- Toxic materials harm soil and water

## Our Solution
At EZElectronicsPickup, we ensure:
- Proper data destruction
- Responsible component recycling
- Refurbishment when possible
- Safe disposal of hazardous materials

## Your Impact
When you sell with us, you help:
- Reduce landfill waste
- Conserve natural resources
- Prevent toxic contamination
- Support circular economy

Join us in making a difference!`,
        tags: ['environment', 'recycling', 'sustainability'],
        isPublished: true,
        author: 'Environmental Team',
        readTime: 7,
      },
    }),
  ]);

  console.log('📰 Created blog posts');

  console.log('✅ Database seed completed successfully!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });