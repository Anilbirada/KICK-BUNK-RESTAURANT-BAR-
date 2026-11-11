import { PrismaClient, MediaCategory } from '@prisma/client';

const prisma = new PrismaClient();

async function addMediaAndInquiries() {
  const blrBranch = await prisma.branch.findFirst({ where: { city: 'Bengaluru' } });
  const tptBranch = await prisma.branch.findFirst({ where: { city: 'Tirupati' } });

  // 1. Add Media Assets
  const assets = [
    {
      category: MediaCategory.FOOD_IMAGE,
      title: 'Charcoal Roasted Kalmi Kebab',
      url: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=1200&q=80',
      thumbnailUrl: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=400&q=80',
      altText: 'Kick Bunk Signature Kalmi Kebab charcoal grilled',
      sourceNotes: 'Official Kick Bunk Bengaluru Menu Shoot',
    },
    {
      category: MediaCategory.FOOD_IMAGE,
      title: 'Royal Dum Chicken Biryani',
      url: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=1200&q=80',
      thumbnailUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=400&q=80',
      altText: 'Authentic dum biryani in traditional handi',
      sourceNotes: 'Official Kick Bunk Dish Collection',
    },
    {
      category: MediaCategory.BRANCH_PHOTO,
      title: 'Open Air Garden Dining & Ambient Lighting',
      url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
      thumbnailUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=400&q=80',
      altText: 'Bengaluru Flagship outdoor garden dining cabanas',
      sourceNotes: 'Kick Bunk Yarandahalli Ambience',
    },
    {
      category: MediaCategory.BRANCH_PHOTO,
      title: 'Private Family Dining Gazebo',
      url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
      thumbnailUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=400&q=80',
      altText: 'Private cabana setting for celebrations',
      sourceNotes: 'Kick Bunk Garden Cabana',
    },
    {
      category: MediaCategory.GALLERY,
      title: 'Live Tandoor Clay Oven Skewers',
      url: 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=1200&q=80',
      thumbnailUrl: 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=400&q=80',
      altText: 'Live tandoor station at Kick Bunk',
      sourceNotes: 'Kitchen Action Shots',
    },
    {
      category: MediaCategory.PROMOTIONAL_BANNER,
      title: 'Weekend Live Sports Screening & Bar Specials',
      url: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=1200&q=80',
      thumbnailUrl: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=400&q=80',
      altText: 'Cocktails and sports evening atmosphere',
      sourceNotes: 'Kick Bunk Lounge',
    },
  ];

  for (const a of assets) {
    const existing = await prisma.mediaAsset.findFirst({ where: { title: a.title } });
    if (!existing) {
      await prisma.mediaAsset.create({ data: a });
    }
  }

  // 2. Add Sample Inquiries
  const sampleInquiry = await prisma.contactInquiry.findFirst();
  if (!sampleInquiry && blrBranch) {
    await prisma.contactInquiry.createMany({
      data: [
        {
          branchId: blrBranch.id,
          name: 'Pooja Hegde',
          email: 'pooja.hegde@example.com',
          phone: '+91 98450 77112',
          subject: 'Private Cabana Booking for Birthday Event (15 Pax)',
          message: 'Hello, looking to book a garden cabana for 15 guests on this upcoming Saturday with tandoori platters and cake arrangement. Please share banquet package details.',
          status: 'NEW',
        },
        {
          branchId: blrBranch.id,
          name: 'Karthik Rao',
          email: 'karthik.rao@techcorp.in',
          phone: '+91 97412 88390',
          subject: 'Corporate Team Dinner Enquiry',
          message: 'Hi Kick Bunk team, we have a team of 25 engineers from Electronic City looking for outdoor dinner and sports screening. Do you offer set buffet menus?',
          status: 'IN_PROGRESS',
          response: 'Shared corporate buffet menu options with Karthik on WhatsApp.',
        },
      ],
    });
  }

  console.log('Media assets and inquiries seeded successfully.');
}

addMediaAndInquiries()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
