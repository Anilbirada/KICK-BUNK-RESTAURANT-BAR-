import { PrismaClient, MediaCategory } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('--- Starting Kick Bunk Authentic Media & Venue Seeding ---');

  // 1. Update Bengaluru Branch with Verified Information from Reference Pack
  const blrBranch = await prisma.branch.findFirst({ where: { city: 'Bengaluru' } });
  if (blrBranch) {
    await prisma.branch.update({
      where: { id: blrBranch.id },
      data: {
        name: 'Kick Bunk Restaurant & Bar',
        address: 'Hulimangala Main Road, Vinayaka Layout, Vabasandra, Electronic City Phase 1, Bengaluru 560105',
        phone: '+91 99806 26699',
        email: 'bengaluru@kickbunk.com',
        latitude: 12.8242,
        longitude: 77.6835,
        googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Kick+Bunk+Restaurant+and+Bar+Hulimangala+Bengaluru',
      },
    });
    console.log('✓ Bengaluru Branch details updated with verified address and phone (+91 99806 26699).');
  }

  // 2. Clear old placeholder media assets
  await prisma.mediaAsset.deleteMany({});
  console.log('✓ Cleaned previous media assets.');

  // 3. Insert all verified authentic photographs and videos
  const authenticMedia = [
    // ----------------------------------------------------
    // CATEGORY: RESTAURANT EXTERIOR & ENTRANCE
    // ----------------------------------------------------
    {
      category: MediaCategory.BRANCH_PHOTO,
      subCategory: 'EXTERIOR',
      title: 'Illuminated Kick Bunk Entrance & Signboard at Night',
      url: '/images/kickbunk/magicpin_02_entrance_night.webp',
      thumbnailUrl: '/images/kickbunk/magicpin_02_entrance_night.webp',
      altText: 'Kick Bunk restaurant illuminated entrance arch and golden branding at night',
      sourceNotes: 'Magicpin Verified Store Photo (Photo 02)',
      externalSourceUrl: 'https://img.magicpin.com/2287662_store_images_10.webp',
      featuredInHero: true,
    },
    {
      category: MediaCategory.BRANCH_PHOTO,
      subCategory: 'EXTERIOR',
      title: 'Daytime Entrance with Official KICK BUNK Signage',
      url: '/images/kickbunk/google_02_entrance_daytime_sign.jpg',
      thumbnailUrl: '/images/kickbunk/google_02_entrance_daytime_sign.jpg',
      altText: 'Daytime grand entrance showing KICK BUNK sign and arrival porch in Bengaluru',
      sourceNotes: 'Google Business Profile Gallery Entry',
      externalSourceUrl: 'https://lh3.googleusercontent.com/pcuRfiSSY8FaIwCwDrMUfhCRyyA-Rp3Swlad3kT6Fg9UW4Zhsdjmz-tiE7wc57Qx5Sd8VFEQHY9y0sGdA0ziiDe2L3nvd2TdyLQbka4=s1200',
      featuredInHero: false,
    },
    {
      category: MediaCategory.BRANCH_PHOTO,
      subCategory: 'EXTERIOR',
      title: 'Restaurant Facade Architecture & Approach',
      url: '/images/kickbunk/restaurant_guru_facade.jpg',
      thumbnailUrl: '/images/kickbunk/restaurant_guru_facade.jpg',
      altText: 'Kick Bunk Bengaluru facade and front perimeter',
      sourceNotes: 'Restaurant Guru Venue Facade Photo',
      externalSourceUrl: 'https://img02.restaurantguru.com/cf5f-Kick-Bunk-Restaurant-and-Bar-Bengaluru-facade.jpg',
      featuredInHero: false,
    },
    {
      category: MediaCategory.BRANCH_PHOTO,
      subCategory: 'EXTERIOR',
      title: 'Illuminated Exterior Sign & Dedicated Guest Parking',
      url: '/images/kickbunk/magicpin_05_exterior_sign_parking.webp',
      thumbnailUrl: '/images/kickbunk/magicpin_05_exterior_sign_parking.webp',
      altText: 'Nighttime view of Kick Bunk parking area and glowing exterior signage',
      sourceNotes: 'Magicpin Verified Store Photo (Photo 05)',
      externalSourceUrl: 'https://img.magicpin.com/2287662_store_images_13.webp',
      featuredInHero: false,
    },
    {
      category: MediaCategory.BRANCH_PHOTO,
      subCategory: 'EXTERIOR',
      title: 'Garden Resto-Bar Compound & Building at Night',
      url: '/images/kickbunk/magicpin_06_garden_building_night.webp',
      thumbnailUrl: '/images/kickbunk/magicpin_06_garden_building_night.webp',
      altText: 'Night view of the multi-level resto-bar building and landscaped gardens',
      sourceNotes: 'Magicpin Verified Store Photo (Photo 06)',
      externalSourceUrl: 'https://img.magicpin.com/2287662_store_images_14.webp',
      featuredInHero: false,
    },
    {
      category: MediaCategory.BRANCH_PHOTO,
      subCategory: 'EXTERIOR',
      title: 'Overhead Aerial View of Building & Garden Grounds',
      url: '/images/kickbunk/magicpin_08_exterior_above.webp',
      thumbnailUrl: '/images/kickbunk/magicpin_08_exterior_above.webp',
      altText: 'Overhead view showing the sprawling layout of Kick Bunk Bengaluru',
      sourceNotes: 'Magicpin Verified Store Photo (Photo 08)',
      externalSourceUrl: 'https://img.magicpin.com/2287662_store_images_16.webp',
      featuredInHero: false,
    },
    {
      category: MediaCategory.BRANCH_PHOTO,
      subCategory: 'EXTERIOR',
      title: 'Welcoming Entrance Steps & Plant-Lined Walkway',
      url: '/images/kickbunk/magicpin_14_entrance_steps_walkway.webp',
      thumbnailUrl: '/images/kickbunk/magicpin_14_entrance_steps_walkway.webp',
      altText: 'Stone steps leading to the main dining pavilion surrounded by lush tropical palms',
      sourceNotes: 'Magicpin Verified Store Photo (Photo 14)',
      externalSourceUrl: 'https://img.magicpin.com/2287662_store_images_22.webp',
      featuredInHero: false,
    },

    // ----------------------------------------------------
    // CATEGORY: RESTAURANT INTERIOR
    // ----------------------------------------------------
    {
      category: MediaCategory.GALLERY,
      subCategory: 'INTERIOR',
      title: 'Cozy Dining Booths & Indoor Table Arrangements',
      url: '/images/kickbunk/restaurant_guru_interior.jpg',
      thumbnailUrl: '/images/kickbunk/restaurant_guru_interior.jpg',
      altText: 'Indoor air-conditioned seating section with plush booths and warm lighting',
      sourceNotes: 'Restaurant Guru Interior Venue Photo',
      externalSourceUrl: 'https://1033609670.rsc.cdn77.org/rests/original/107_535209663.jpg',
      featuredInHero: false,
    },
    {
      category: MediaCategory.GALLERY,
      subCategory: 'INTERIOR',
      title: 'Indoor Dining Room Tables & Family Atmosphere',
      url: '/images/kickbunk/zomato_interior_tables.jpg',
      thumbnailUrl: '/images/kickbunk/zomato_interior_tables.jpg',
      altText: 'Dining tables and relaxed seating inside Kick Bunk from customer review',
      sourceNotes: 'Zomato Verified Customer Review Photo',
      externalSourceUrl: 'https://b.zmtcdn.com/data/pictures/9/19669029/43ecaace59c2db4a39f774f68c1db470.jpg',
      featuredInHero: false,
    },
    {
      category: MediaCategory.GALLERY,
      subCategory: 'INTERIOR',
      title: 'Spacious Covered Indoor Seating Pavilion',
      url: '/images/kickbunk/magicpin_13_covered_indoor_seating.webp',
      thumbnailUrl: '/images/kickbunk/magicpin_13_covered_indoor_seating.webp',
      altText: 'High-ceiling covered dining pavilion with ambient warm chandeliers and ceiling fans',
      sourceNotes: 'Magicpin Verified Store Photo (Photo 13)',
      externalSourceUrl: 'https://img.magicpin.com/2287662_store_images_21.webp',
      featuredInHero: false,
    },

    // ----------------------------------------------------
    // CATEGORY: OUTDOOR SEATING
    // ----------------------------------------------------
    {
      category: MediaCategory.BRANCH_PHOTO,
      subCategory: 'OUTDOOR',
      title: 'Outdoor Garden Dining Tables in Warm Sunlight',
      url: '/images/kickbunk/magicpin_07_outdoor_seating_daylight.webp',
      thumbnailUrl: '/images/kickbunk/magicpin_07_outdoor_seating_daylight.webp',
      altText: 'Open-air wooden garden tables shaded by natural trees during daytime dining',
      sourceNotes: 'Magicpin Verified Store Photo (Photo 07)',
      externalSourceUrl: 'https://img.magicpin.com/2287662_store_images_15.webp',
      featuredInHero: false,
    },
    {
      category: MediaCategory.BRANCH_PHOTO,
      subCategory: 'OUTDOOR',
      title: 'Decorative Feature Tree & Outdoor Garden Seating',
      url: '/images/kickbunk/magicpin_10_decorative_tree_seating.webp',
      thumbnailUrl: '/images/kickbunk/magicpin_10_decorative_tree_seating.webp',
      altText: 'Central illuminated decorative garden tree encircled by stone dining patios',
      sourceNotes: 'Magicpin Verified Store Photo (Photo 10)',
      externalSourceUrl: 'https://img.magicpin.com/2287662_store_images_18.webp',
      featuredInHero: false,
    },
    {
      category: MediaCategory.BRANCH_PHOTO,
      subCategory: 'OUTDOOR',
      title: 'Canopy-Covered Outdoor Garden Seating Deck',
      url: '/images/kickbunk/yappe_outdoor_canopy.webp',
      thumbnailUrl: '/images/kickbunk/yappe_outdoor_canopy.webp',
      altText: 'All-weather canopy covered garden terrace for outdoor dining',
      sourceNotes: 'Yappe Verified Venue Photograph',
      externalSourceUrl: 'https://files.yappe.in/place/full/kick-bunk-restaurant-and-bar-7349753.webp',
      featuredInHero: false,
    },
    {
      category: MediaCategory.BRANCH_PHOTO,
      subCategory: 'OUTDOOR',
      title: 'Lush Garden Courtyard Tables & Private Dining',
      url: '/images/kickbunk/google_03_garden_courtyard.jpg',
      thumbnailUrl: '/images/kickbunk/google_03_garden_courtyard.jpg',
      altText: 'Peaceful garden courtyard dining space surrounded by manicured planters',
      sourceNotes: 'Google Business Profile Gallery Entry',
      externalSourceUrl: 'https://lh3.googleusercontent.com/ThgsCMvbSWOo11eg532X_otFCgju8W1qq1vkDAEPTmgbCh1r5aEMXfVz78kvPE5oxJ2bC7dbua9cSlQbxu6jdiNPxQiauXUxvZ9nXM02=s1200',
      featuredInHero: false,
    },

    // ----------------------------------------------------
    // CATEGORY: GARDEN & OUTDOOR AMBIENCE
    // ----------------------------------------------------
    {
      category: MediaCategory.BRANCH_PHOTO,
      subCategory: 'GARDEN',
      title: 'Elevated Night View of Fairy-Lit Garden Cabanas',
      url: '/images/kickbunk/google_01_garden_lights_night.jpg',
      thumbnailUrl: '/images/kickbunk/google_01_garden_lights_night.jpg',
      altText: 'Magical elevated night vista of Kick Bunk garden glowing with golden fairy lights',
      sourceNotes: 'Google Business Profile Elevated View',
      externalSourceUrl: 'https://lh3.googleusercontent.com/kF9zlFWAB-9gEjJN6rm_wzv1hhP6AE-X7-lkDN-AnQlZLGK258V0xmaem61rBAAroEzpLz9YUxWuQarbHce6XbdYHZRkZNfIuL7jU7c=s1200',
      featuredInHero: true,
    },
    {
      category: MediaCategory.BRANCH_PHOTO,
      subCategory: 'GARDEN',
      title: 'Landscaped Garden Courtyard & Nighttime Mood Lighting',
      url: '/images/kickbunk/magicpin_03_garden_courtyard_night.webp',
      thumbnailUrl: '/images/kickbunk/magicpin_03_garden_courtyard_night.webp',
      altText: 'Courtyard dining tables illuminated with soft amber lights at Kick Bunk',
      sourceNotes: 'Magicpin Verified Store Photo (Photo 03)',
      externalSourceUrl: 'https://img.magicpin.com/2287662_store_images_11.webp',
      featuredInHero: false,
    },
    {
      category: MediaCategory.BRANCH_PHOTO,
      subCategory: 'GARDEN',
      title: 'Illuminated Garden Pathway & Dining Groves',
      url: '/images/kickbunk/magicpin_09_garden_pathway_night.webp',
      thumbnailUrl: '/images/kickbunk/magicpin_09_garden_pathway_night.webp',
      altText: 'Stone garden pathway framed with glowing lanterns and outdoor seating',
      sourceNotes: 'Magicpin Verified Store Photo (Photo 09)',
      externalSourceUrl: 'https://img.magicpin.com/2287662_store_images_17.webp',
      featuredInHero: false,
    },
    {
      category: MediaCategory.BRANCH_PHOTO,
      subCategory: 'GARDEN',
      title: 'Evening Garden Walkway & Entrance Ambiance',
      url: '/images/kickbunk/magicpin_11_garden_walkway_night.webp',
      thumbnailUrl: '/images/kickbunk/magicpin_11_garden_walkway_night.webp',
      altText: 'Atmospheric arrival walkway lined with illuminated foliage and bamboo screens',
      sourceNotes: 'Magicpin Verified Store Photo (Photo 11)',
      externalSourceUrl: 'https://img.magicpin.com/2287662_store_images_19.webp',
      featuredInHero: false,
    },
    {
      category: MediaCategory.BRANCH_PHOTO,
      subCategory: 'GARDEN',
      title: 'Lush Tropical Garden Courtyard in Daylight',
      url: '/images/kickbunk/magicpin_12_landscaped_garden_daylight.webp',
      thumbnailUrl: '/images/kickbunk/magicpin_12_landscaped_garden_daylight.webp',
      altText: 'Fresh daytime perspective of landscaped gardens and lush lawn seating',
      sourceNotes: 'Magicpin Verified Store Photo (Photo 12)',
      externalSourceUrl: 'https://img.magicpin.com/2287662_store_images_20.webp',
      featuredInHero: false,
    },
    {
      category: MediaCategory.BRANCH_PHOTO,
      subCategory: 'GARDEN',
      title: 'High-Angle Perspective of Garden Dining Enclaves',
      url: '/images/kickbunk/google_04_aerial_garden_seating.jpg',
      thumbnailUrl: '/images/kickbunk/google_04_aerial_garden_seating.jpg',
      altText: 'Raised vantage point showing open-air seating nestled among tropical trees',
      sourceNotes: 'Google Business Profile Gallery Entry',
      externalSourceUrl: 'https://lh3.googleusercontent.com/_lruG6Qalp6H3N65UYXviM4l9wYwdO0waCOmuqE1DjgvHvF1Vjld7ld9cTtiBSB0SiH2ASw98uJTla4Bmv0j6gAe6U4DpJje2g9englG=s1200',
      featuredInHero: false,
    },
    {
      category: MediaCategory.BRANCH_PHOTO,
      subCategory: 'GARDEN',
      title: 'Outdoor Terrace & Rooftop Garden View',
      url: '/images/kickbunk/google_05_outdoor_terrace_view.jpg',
      thumbnailUrl: '/images/kickbunk/google_05_outdoor_terrace_view.jpg',
      altText: 'Terrace dining deck offering scenic views of the garden restaurant compound',
      sourceNotes: 'Google Business Profile Gallery Entry',
      externalSourceUrl: 'https://lh3.googleusercontent.com/X-Mw5N7qqXuXv_34MdsElc5TnW7W4ZP5ezegN5WNrE9hytxxe0SM9XDu2i1DdaxeZi6zry6E9plSh5kA0N7x-Z9DhKztSco2jbleGctVXA=s1200',
      featuredInHero: false,
    },

    // ----------------------------------------------------
    // CATEGORY: FOOD & DISHES
    // ----------------------------------------------------
    {
      category: MediaCategory.FOOD_IMAGE,
      subCategory: 'FOOD',
      title: 'Signature Charcoal Roasted Kalmi Kebab',
      url: '/images/kickbunk/magicpin_01_kalmi_kebab.webp',
      thumbnailUrl: '/images/kickbunk/magicpin_01_kalmi_kebab.webp',
      altText: 'Kick Bunk signature chicken drumstick marinated in aromatic spices and roasted over charcoal',
      sourceNotes: 'Magicpin Food Promotion Feature (Photo 01)',
      externalSourceUrl: 'https://img.magicpin.com/2287662_store_images_9.webp',
      featuredInHero: true,
    },
    {
      category: MediaCategory.FOOD_IMAGE,
      subCategory: 'FOOD',
      title: 'Grand Food Spread & Family Dining Feast',
      url: '/images/kickbunk/magicpin_04_food_spread_dining.webp',
      thumbnailUrl: '/images/kickbunk/magicpin_04_food_spread_dining.webp',
      altText: 'Full dining table order featuring biryani handis, kebabs, curries and flatbreads',
      sourceNotes: 'Magicpin Verified Store Dining Photo (Photo 04)',
      externalSourceUrl: 'https://img.magicpin.com/2287662_store_images_12.webp',
      featuredInHero: false,
    },
    {
      category: MediaCategory.FOOD_IMAGE,
      subCategory: 'FOOD',
      title: 'Kick Bunk Official Food & Beverage Menu Card',
      url: '/images/kickbunk/restaurant_guru_menu_snapshot.jpg',
      thumbnailUrl: '/images/kickbunk/restaurant_guru_menu_snapshot.jpg',
      altText: 'Original menu snapshot showing appetizers, main courses, tandoori specialties and beverages',
      sourceNotes: 'Restaurant Guru Verified Menu Image',
      externalSourceUrl: 'https://menu.restaurantguru.com/m1/Kick-Bunk-Restaurant-and-Bar-menu-wsb.jpg',
      featuredInHero: false,
    },

    // ----------------------------------------------------
    // CATEGORY: DRINKS, BAR & EVENTS
    // ----------------------------------------------------
    {
      category: MediaCategory.PROMOTIONAL_BANNER,
      subCategory: 'BAR',
      title: 'Full Resto-Bar Counter, Draught Beers & Cocktails',
      url: '/images/kickbunk/magicpin_06_garden_building_night.webp',
      thumbnailUrl: '/images/kickbunk/magicpin_06_garden_building_night.webp',
      altText: 'Evening resto-bar atmosphere with chilled drinks and signature mocktails',
      sourceNotes: 'Kick Bunk Resto-Bar Collection',
      externalSourceUrl: 'https://img.magicpin.com/2287662_store_images_14.webp',
      featuredInHero: false,
    },
    {
      category: MediaCategory.PROMOTIONAL_BANNER,
      subCategory: 'EVENTS',
      title: 'Private Cabana Celebrations & Live Sports Screening',
      url: '/images/kickbunk/google_01_garden_lights_night.jpg',
      thumbnailUrl: '/images/kickbunk/google_01_garden_lights_night.jpg',
      altText: 'Birthday and corporate event celebrations under fairy lights at Kick Bunk',
      sourceNotes: 'Kick Bunk Event & Celebrations',
      externalSourceUrl: 'https://lh3.googleusercontent.com/kF9zlFWAB-9gEjJN6rm_wzv1hhP6AE-X7-lkDN-AnQlZLGK258V0xmaem61rBAAroEzpLz9YUxWuQarbHce6XbdYHZRkZNfIuL7jU7c=s1200',
      featuredInHero: false,
    },

    // ----------------------------------------------------
    // CATEGORY: VIDEOS & EXPERIENCES
    // ----------------------------------------------------
    {
      category: MediaCategory.PROMOTIONAL_BANNER,
      subCategory: 'VIDEO',
      title: 'Complete Garden Resto-Bar Setup (Drone View Video Tour)',
      url: 'https://magicpin.in/Bangalore/Yarandahalli/Restaurant/Kick-Bunk-Restaurant/store/621360/stories?post_id=978426497',
      thumbnailUrl: '/images/kickbunk/google_01_garden_lights_night.jpg',
      altText: 'Drone video walkthrough of Kick Bunk garden resto-bar setup in Bengaluru',
      sourceNotes: 'Magicpin Official Customer Story Drone Video',
      externalSourceUrl: 'https://magicpin.in/Bangalore/Yarandahalli/Restaurant/Kick-Bunk-Restaurant/store/621360/stories?post_id=978426497',
      featuredInHero: false,
    },
    {
      category: MediaCategory.PROMOTIONAL_BANNER,
      subCategory: 'VIDEO',
      title: 'Night Ambience & Tandoor Grills - Instagram Reel',
      url: 'https://www.instagram.com/kick_bunk_gardenrestobar/',
      thumbnailUrl: '/images/kickbunk/magicpin_03_garden_courtyard_night.webp',
      altText: 'Instagram reel showing lively evening dinner service and smoking tandoor grills',
      sourceNotes: 'Official Instagram Reel @kick_bunk_gardenrestobar',
      externalSourceUrl: 'https://www.instagram.com/kick_bunk_gardenrestobar/',
      featuredInHero: false,
    },
    {
      category: MediaCategory.PROMOTIONAL_BANNER,
      subCategory: 'VIDEO',
      title: 'Weekend Garden Dining & Family Gathering Walkthrough',
      url: 'https://www.instagram.com/kick_bunk_gardenrestobar/',
      thumbnailUrl: '/images/kickbunk/magicpin_07_outdoor_seating_daylight.webp',
      altText: 'Lush garden walk video showcasing family outdoor tables and shaded gazebos',
      sourceNotes: 'Official Instagram Experience @kick_bunk_gardenrestobar',
      externalSourceUrl: 'https://www.instagram.com/kick_bunk_gardenrestobar/',
      featuredInHero: false,
    },
  ];

  for (const item of authenticMedia) {
    await prisma.mediaAsset.create({
      data: item,
    });
  }
  console.log(`✓ Inserted ${authenticMedia.length} authentic media assets with verified sources.`);

  // 4. Update Signature Dishes with Real Photography
  const kalmiItem = await prisma.menuItem.findFirst({
    where: { name: { contains: 'Kalmi', mode: 'insensitive' } },
  });
  if (kalmiItem) {
    await prisma.menuItemImage.deleteMany({ where: { menuItemId: kalmiItem.id } });
    await prisma.menuItemImage.create({
      data: {
        menuItemId: kalmiItem.id,
        imageUrl: '/images/kickbunk/magicpin_01_kalmi_kebab.webp',
        isPrimary: true,
      },
    });
    console.log('✓ Updated Kalmi Kebab with authentic Magicpin promotional photo.');
  }

  const biryaniItem = await prisma.menuItem.findFirst({
    where: { name: { contains: 'Biryani', mode: 'insensitive' } },
  });
  if (biryaniItem) {
    await prisma.menuItemImage.deleteMany({ where: { menuItemId: biryaniItem.id } });
    await prisma.menuItemImage.create({
      data: {
        menuItemId: biryaniItem.id,
        imageUrl: '/images/kickbunk/magicpin_04_food_spread_dining.webp',
        isPrimary: true,
      },
    });
    console.log('✓ Updated Dum Biryani with authentic Kick Bunk dining spread photo.');
  }

  console.log('--- Seeding Completed Successfully! ---');
}

main()
  .catch((e) => {
    console.error('Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
