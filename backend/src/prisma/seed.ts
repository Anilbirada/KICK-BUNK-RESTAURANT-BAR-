import { PrismaClient, UserRoleType, TableStatus, KitchenTicketStatus, PaymentMethod, PaymentStatus, OrderStatus, OrderChannel, MediaCategory, LoyaltyTier } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Kick Bunk 360 database...');

  // 1. Roles
  const roles = [
    { code: UserRoleType.SUPER_ADMIN, name: 'Super Admin', description: 'Global administrative privileges' },
    { code: UserRoleType.BUSINESS_OWNER, name: 'Business Owner', description: 'Executive visibility, financial reports, all branches' },
    { code: UserRoleType.BRANCH_MANAGER, name: 'Branch Manager', description: 'Operations manager for specific branch' },
    { code: UserRoleType.CASHIER, name: 'Cashier / POS Operator', description: 'Counter POS order placement and payment billing' },
    { code: UserRoleType.WAITER, name: 'Server / Waiter', description: 'Floor table management and order taking' },
    { code: UserRoleType.KITCHEN_STAFF, name: 'Kitchen Staff / Chef', description: 'Kitchen Display System operator' },
    { code: UserRoleType.INVENTORY_MANAGER, name: 'Inventory Manager', description: 'Stock, recipes, and supplier POs' },
    { code: UserRoleType.MARKETING_MANAGER, name: 'Marketing Manager', description: 'Campaigns, loyalty, and customer promotions' },
    { code: UserRoleType.ACCOUNTANT, name: 'Accountant', description: 'Financial statements, taxes, expenses' },
    { code: UserRoleType.REPORTS_VIEWER, name: 'Reports Viewer', description: 'Read-only analytics and audit reports' },
    { code: UserRoleType.CUSTOMER, name: 'Customer', description: 'Online ordering, table bookings, loyalty member' },
  ];

  for (const r of roles) {
    await prisma.role.upsert({
      where: { code: r.code },
      update: {},
      create: r,
    });
  }

  // Check if database is already seeded
  const existingBranch = await prisma.branch.findFirst({ where: { code: 'KB-BLR-01' } });
  if (existingBranch) {
    console.log('✓ Database already seeded with baseline records. Skipping duplicate seed.');
    return;
  }

  // 2. Organization
  const org = await prisma.organization.create({
    data: {
      name: 'Kick Bunk Hospitality Group',
      legalName: 'Kick Bunk Foods & Beverages Private Limited',
      taxNumber: '29ABCDE1234F1Z5',
      website: 'https://kickbunk.com',
      logoUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=400&q=80',
    },
  });

  // 3. Branches
  const blrBranch = await prisma.branch.create({
    data: {
      organizationId: org.id,
      name: 'Kick Bunk Family Garden Restaurant & Bar',
      code: 'KB-BLR-01',
      address: 'Yarandahalli Main Road, Near Hulimangala Cross, Jigani Hobli, Electronic City Phase 1',
      city: 'Bengaluru',
      state: 'Karnataka',
      postalCode: '560105',
      phone: '+91 99453 21367',
      email: 'bangalore@kickbunk.com',
      latitude: 12.8012,
      longitude: 77.6745,
      googleMapsUrl: 'https://maps.google.com/?q=Kick+Bunk+Yarandahalli',
      supportsDineIn: true,
      supportsTakeaway: true,
      supportsDelivery: true,
    },
  });

  const tptBranch = await prisma.branch.create({
    data: {
      organizationId: org.id,
      name: 'Kick Bunk Garden Bar & Restaurant',
      code: 'KB-TPT-01',
      address: 'Korramenugunta Road, Tata Nagar',
      city: 'Tirupati',
      state: 'Andhra Pradesh',
      postalCode: '517501',
      phone: '+91 77605 94868',
      email: 'tirupati@kickbunk.com',
      latitude: 13.6288,
      longitude: 79.4192,
      googleMapsUrl: 'https://maps.google.com/?q=Kick+Bunk+Tirupati',
      supportsDineIn: true,
      supportsTakeaway: true,
      supportsDelivery: false,
    },
  });

  // Branch Hours (All 7 days 11:30 AM to 11:30 PM)
  for (let day = 0; day < 7; day++) {
    await prisma.branchHour.createMany({
      data: [
        { branchId: blrBranch.id, dayOfWeek: day, openTime: '11:30', closeTime: '23:30', isClosed: false },
        { branchId: tptBranch.id, dayOfWeek: day, openTime: '11:30', closeTime: '23:00', isClosed: false },
      ],
    });
  }

  // 4. Default Users
  const defaultPasswordHash = await bcrypt.hash('KickBunk@2026', 10);
  const customerPasswordHash = await bcrypt.hash('Customer@2026', 10);

  const superAdminRole = await prisma.role.findUniqueOrThrow({ where: { code: UserRoleType.SUPER_ADMIN } });
  const ownerRole = await prisma.role.findUniqueOrThrow({ where: { code: UserRoleType.BUSINESS_OWNER } });
  const managerRole = await prisma.role.findUniqueOrThrow({ where: { code: UserRoleType.BRANCH_MANAGER } });
  const cashierRole = await prisma.role.findUniqueOrThrow({ where: { code: UserRoleType.CASHIER } });
  const kitchenRole = await prisma.role.findUniqueOrThrow({ where: { code: UserRoleType.KITCHEN_STAFF } });
  const customerRole = await prisma.role.findUniqueOrThrow({ where: { code: UserRoleType.CUSTOMER } });

  // Admin User
  const adminUser = await prisma.user.create({
    data: {
      organizationId: org.id,
      fullName: 'Chief Technology Administrator',
      email: 'admin@kickbunk.com',
      phone: '+91 9800000001',
      passwordHash: defaultPasswordHash,
      userRoles: { create: { roleId: superAdminRole.id } },
    },
  });

  // Business Owner
  const ownerUser = await prisma.user.create({
    data: {
      organizationId: org.id,
      fullName: 'Kick Bunk Managing Director',
      email: 'owner@kickbunk.com',
      phone: '+91 9800000002',
      passwordHash: defaultPasswordHash,
      userRoles: { create: { roleId: ownerRole.id } },
    },
  });

  // Branch Manager
  const managerUser = await prisma.user.create({
    data: {
      organizationId: org.id,
      fullName: 'Suresh Gowda (General Manager)',
      email: 'manager.blr@kickbunk.com',
      phone: '+91 9800000003',
      passwordHash: defaultPasswordHash,
      userRoles: { create: { roleId: managerRole.id } },
      employee: {
        create: {
          branchId: blrBranch.id,
          employeeCode: 'EMP-BLR-001',
          designation: 'General Manager',
          salary: 65000,
        },
      },
    },
  });

  // Cashier
  const cashierUser = await prisma.user.create({
    data: {
      organizationId: org.id,
      fullName: 'Kiran Kumar (Senior Cashier)',
      email: 'cashier.blr@kickbunk.com',
      phone: '+91 9800000004',
      passwordHash: defaultPasswordHash,
      userRoles: { create: { roleId: cashierRole.id } },
      employee: {
        create: {
          branchId: blrBranch.id,
          employeeCode: 'EMP-BLR-002',
          designation: 'Cashier & POS Lead',
          salary: 32000,
        },
      },
    },
  });

  // Kitchen Head Chef
  const chefUser = await prisma.user.create({
    data: {
      organizationId: org.id,
      fullName: 'Chef Rakesh Rawat',
      email: 'kitchen.blr@kickbunk.com',
      phone: '+91 9800000005',
      passwordHash: defaultPasswordHash,
      userRoles: { create: { roleId: kitchenRole.id } },
      employee: {
        create: {
          branchId: blrBranch.id,
          employeeCode: 'EMP-BLR-003',
          designation: 'Executive Chef',
          salary: 55000,
        },
      },
    },
  });

  // Customer Profile
  const customerUser = await prisma.user.create({
    data: {
      fullName: 'Rahul Sharma',
      email: 'rahul.sharma@example.com',
      phone: '+91 9876543210',
      passwordHash: customerPasswordHash,
      userRoles: { create: { roleId: customerRole.id } },
      customer: {
        create: {
          name: 'Rahul Sharma',
          phone: '+91 9876543210',
          email: 'rahul.sharma@example.com',
          preferredBranchId: blrBranch.id,
          loyaltyBalance: 450,
          totalVisits: 6,
          totalSpend: 7850,
          loyaltyAccount: {
            create: {
              pointsBalance: 450,
              tier: LoyaltyTier.GOLD,
              lifetimePoints: 850,
            },
          },
          addresses: {
            create: {
              tag: 'Home',
              addressLine: 'Villa 14, Neo Town, Electronic City Phase 1',
              city: 'Bengaluru',
              postalCode: '560100',
              isDefault: true,
            },
          },
        },
      },
    },
  });

  // 5. Kitchen Stations
  const stationTandoor = await prisma.kitchenStation.create({
    data: { branchId: blrBranch.id, name: 'Tandoor & Kebab Station', code: 'ST-TANDOOR', sortOrder: 1 },
  });
  const stationChinese = await prisma.kitchenStation.create({
    data: { branchId: blrBranch.id, name: 'Chinese & Appetizers', code: 'ST-CHINESE', sortOrder: 2 },
  });
  const stationCurry = await prisma.kitchenStation.create({
    data: { branchId: blrBranch.id, name: 'Main Curry & Gravies', code: 'ST-CURRY', sortOrder: 3 },
  });
  const stationBar = await prisma.kitchenStation.create({
    data: { branchId: blrBranch.id, name: 'Bar & Refreshers', code: 'ST-BEVERAGE', sortOrder: 4 },
  });

  // 6. Tables for Bangalore Outlet
  const zones = [
    { zone: 'Open Air Garden', count: 8, capacity: 4 },
    { zone: 'Private Cabanas', count: 4, capacity: 6 },
    { zone: 'Family Dining Hall', count: 6, capacity: 6 },
    { zone: 'Lounge & Bar', count: 5, capacity: 2 },
  ];

  let tCount = 1;
  for (const z of zones) {
    for (let i = 1; i <= z.count; i++) {
      await prisma.table.create({
        data: {
          branchId: blrBranch.id,
          tableNumber: `T-${tCount < 10 ? '0' + tCount : tCount}`,
          zone: z.zone,
          capacity: z.capacity,
          status: TableStatus.AVAILABLE,
        },
      });
      tCount++;
    }
  }

  // 7. Menu Categories
  const catTandoor = await prisma.menuCategory.create({
    data: { name: 'Tandoori & Kebabs', slug: 'tandoori-kebabs', description: 'Charcoal-grilled delicacies with signature marinades', displayOrder: 1 },
  });
  const catChinese = await prisma.menuCategory.create({
    data: { name: 'Chinese & Appetizers', slug: 'chinese-appetizers', description: 'Wok-tossed starters, spicy bites and crispy platters', displayOrder: 2 },
  });
  const catBiryani = await prisma.menuCategory.create({
    data: { name: 'Biryani Specials', slug: 'biryani-specials', description: 'Fragrant Dum Biryani cooked with aged basmati and royal spices', displayOrder: 3 },
  });
  const catCurry = await prisma.menuCategory.create({
    data: { name: 'North Indian Gravies', slug: 'north-indian-gravies', description: 'Rich, aromatic butter curries and home-style gravies', displayOrder: 4 },
  });
  const catBreads = await prisma.menuCategory.create({
    data: { name: 'Breads & Rice', slug: 'breads-rice', description: 'Tandoor baked naans, rotis, and aromatic rice preparations', displayOrder: 5 },
  });
  const catBeverages = await prisma.menuCategory.create({
    data: { name: 'Mocktails & Beverages', slug: 'mocktails-beverages', description: 'Chilled mojitos, fruit refreshers, shakes and cooler blends', displayOrder: 6 },
  });

  // 8. Menu Items & Ingredients & Recipes
  const menuData = [
    {
      category: catTandoor,
      name: 'Kick Bunk Special Kalmi Kebab (3 Pcs)',
      slug: 'kick-bunk-kalmi-kebab',
      description: 'Succulent chicken drumsticks slow-roasted in charcoal tandoor with rich cashew and yoghurt marinade',
      basePrice: 340,
      isVeg: false,
      spiceLevel: 2,
      isBestSeller: true,
      imageUrl: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=600&q=80',
    },
    {
      category: catTandoor,
      name: 'Murgh Tandoori Platter (Half / Full)',
      slug: 'murgh-tandoori-platter',
      description: 'Classic clay-oven roasted chicken infused with Kashmiri deggi mirch, mustard oil, and ground garam masala',
      basePrice: 320,
      isVeg: false,
      spiceLevel: 3,
      isBestSeller: true,
      imageUrl: 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=600&q=80',
    },
    {
      category: catTandoor,
      name: 'Paneer Malai Tikka',
      slug: 'paneer-malai-tikka',
      description: 'Silken cubes of fresh cottage cheese marinated in cardamom cream, hung curd, and bell pepper skewers',
      basePrice: 280,
      isVeg: true,
      spiceLevel: 1,
      isBestSeller: false,
      imageUrl: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=600&q=80',
    },
    {
      category: catChinese,
      name: 'Crispy Hong Kong Chicken',
      slug: 'crispy-hong-kong-chicken',
      description: 'Crispy shredded chicken strips tossed in sweet spicy chilli garlic sauce with bell peppers and roasted sesame',
      basePrice: 295,
      isVeg: false,
      spiceLevel: 3,
      isBestSeller: true,
      imageUrl: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=600&q=80',
    },
    {
      category: catChinese,
      name: 'Dragon Paneer Dry',
      slug: 'dragon-paneer-dry',
      description: 'Batter-fried paneer batons tossed with schezwan peppers, spring onions, and cashews',
      basePrice: 270,
      isVeg: true,
      spiceLevel: 3,
      isBestSeller: false,
      imageUrl: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80',
    },
    {
      category: catBiryani,
      name: 'Kick Bunk Royal Dum Chicken Biryani',
      slug: 'kick-bunk-royal-dum-chicken-biryani',
      description: 'Aromatic basmati rice layered with tender marinated chicken, saffron milk, fried onions, served with mirchi ka salan & raita',
      basePrice: 310,
      isVeg: false,
      spiceLevel: 2,
      isBestSeller: true,
      imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80',
    },
    {
      category: catCurry,
      name: 'Butter Chicken Masala',
      slug: 'butter-chicken-masala',
      description: 'Tender tandoori chicken cooked in a velvety tomato gravy finished with churned butter and dried fenugreek',
      basePrice: 330,
      isVeg: false,
      spiceLevel: 2,
      isBestSeller: true,
      imageUrl: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&w=600&q=80',
    },
    {
      category: catCurry,
      name: 'Paneer Butter Masala',
      slug: 'paneer-butter-masala',
      description: 'Fresh malai paneer simmered in a mildly sweet, rich cashew and butter tomato reduction',
      basePrice: 275,
      isVeg: true,
      spiceLevel: 1,
      isBestSeller: true,
      imageUrl: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=600&q=80',
    },
    {
      category: catBreads,
      name: 'Garlic Butter Naan',
      slug: 'garlic-butter-naan',
      description: 'Leavened flatbread brushed with crushed garlic butter and freshly chopped coriander',
      basePrice: 65,
      isVeg: true,
      spiceLevel: 1,
      isBestSeller: true,
      imageUrl: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80',
    },
    {
      category: catBeverages,
      name: 'Kick Bunk Electric Blue Curacao',
      slug: 'kick-bunk-electric-blue',
      description: 'Chilled refresher crafted with blue curacao, freshly squeezed lemon juice, sparkling soda, and mint sprigs',
      basePrice: 160,
      isVeg: true,
      spiceLevel: 1,
      isBestSeller: true,
      imageUrl: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80',
    },
  ];

  for (const item of menuData) {
    const createdItem = await prisma.menuItem.create({
      data: {
        categoryId: item.category.id,
        name: item.name,
        slug: item.slug,
        description: item.description,
        basePrice: item.basePrice,
        isVeg: item.isVeg,
        spiceLevel: item.spiceLevel,
        isBestSeller: item.isBestSeller,
        images: {
          create: {
            imageUrl: item.imageUrl,
            altText: item.name,
            isPrimary: true,
          },
        },
        variants: {
          createMany: {
            data: [
              { name: 'Regular', price: item.basePrice, isDefault: true },
              { name: 'Large / Full Portion', price: Math.round(item.basePrice * 1.6), isDefault: false },
            ],
          },
        },
        addons: {
          createMany: {
            data: [
              { name: 'Extra Mint Chutney & Salad', price: 20 },
              { name: 'Extra Raita Bowl', price: 30 },
              { name: 'Extra Butter Gravy Dip', price: 45 },
            ],
          },
        },
        branchItems: {
          createMany: {
            data: [
              { branchId: blrBranch.id, isAvailable: true },
              { branchId: tptBranch.id, isAvailable: true },
            ],
          },
        },
      },
    });

    // Link recipe to inventory
    // (We will create raw inventory items and link)
  }

  // 9. Inventory Raw Ingredients
  const invChicken = await prisma.inventoryItem.create({
    data: { branchId: blrBranch.id, name: 'Fresh Farm Chicken (Curry Cut)', sku: 'RAW-CHK-01', category: 'Meat', unit: 'kg', currentStock: 45.0, minStockLevel: 10.0, costPerUnit: 220 },
  });
  const invPaneer = await prisma.inventoryItem.create({
    data: { branchId: blrBranch.id, name: 'Malai Cottage Cheese (Paneer)', sku: 'RAW-PAN-01', category: 'Dairy', unit: 'kg', currentStock: 25.0, minStockLevel: 5.0, costPerUnit: 340 },
  });
  const invRice = await prisma.inventoryItem.create({
    data: { branchId: blrBranch.id, name: 'Aged Daawat Basmati Rice', sku: 'RAW-RIC-01', category: 'Grocery', unit: 'kg', currentStock: 120.0, minStockLevel: 25.0, costPerUnit: 140 },
  });
  const invButter = await prisma.inventoryItem.create({
    data: { branchId: blrBranch.id, name: 'Amul Butter Block', sku: 'RAW-BUT-01', category: 'Dairy', unit: 'kg', currentStock: 18.0, minStockLevel: 5.0, costPerUnit: 480 },
  });

  // 10. Sample Completed & In-Flight Orders for Live Real Dashboard
  const table1 = await prisma.table.findFirstOrThrow({ where: { branchId: blrBranch.id, tableNumber: 'T-01' } });
  const kalmiKebab = await prisma.menuItem.findFirstOrThrow({ where: { slug: 'kick-bunk-kalmi-kebab' } });
  const biryani = await prisma.menuItem.findFirstOrThrow({ where: { slug: 'kick-bunk-royal-dum-chicken-biryani' } });
  const naan = await prisma.menuItem.findFirstOrThrow({ where: { slug: 'garlic-butter-naan' } });

  const order1 = await prisma.order.create({
    data: {
      branchId: blrBranch.id,
      orderNumber: 'KB-BLR-1001',
      channel: OrderChannel.DINE_IN,
      status: OrderStatus.COMPLETED,
      tableId: table1.id,
      customerId: (await prisma.customer.findFirst())?.id,
      subTotal: 715,
      taxAmount: 35.75, // 5% GST
      discountAmount: 0,
      totalAmount: 750.75,
      notes: 'Customer requested medium spicy',
      items: {
        create: [
          { menuItemId: kalmiKebab.id, quantity: 1, unitPrice: 340, totalPrice: 340 },
          { menuItemId: biryani.id, quantity: 1, unitPrice: 310, totalPrice: 310 },
          { menuItemId: naan.id, quantity: 1, unitPrice: 65, totalPrice: 65 },
        ],
      },
      payments: {
        create: {
          method: PaymentMethod.UPI,
          amount: 750.75,
          status: PaymentStatus.COMPLETED,
          transactionRef: 'UPI-RAZOR-99881122',
        },
      },
      invoice: {
        create: {
          invoiceNumber: 'INV-2026-BLR-001',
          subTotal: 715,
          cgstAmount: 17.88,
          sgstAmount: 17.88,
          discountAmount: 0,
          totalAmount: 750.75,
        },
      },
    },
  });

  // Second active in-flight order for POS / KDS real-time display
  const table2 = await prisma.table.findFirstOrThrow({ where: { branchId: blrBranch.id, tableNumber: 'T-02' } });
  await prisma.table.update({ where: { id: table2.id }, data: { status: TableStatus.OCCUPIED } });

  const order2 = await prisma.order.create({
    data: {
      branchId: blrBranch.id,
      orderNumber: 'KB-BLR-1002',
      channel: OrderChannel.DINE_IN,
      status: OrderStatus.PREPARING,
      tableId: table2.id,
      subTotal: 650,
      taxAmount: 32.5,
      discountAmount: 0,
      totalAmount: 682.5,
      items: {
        create: [
          { menuItemId: kalmiKebab.id, quantity: 1, unitPrice: 340, totalPrice: 340, specialNotes: 'Extra mint chutney' },
          { menuItemId: biryani.id, quantity: 1, unitPrice: 310, totalPrice: 310 },
        ],
      },
      kitchenOrders: {
        create: {
          stationId: stationTandoor.id,
          ticketNumber: 'KDS-001',
          status: KitchenTicketStatus.PREPARING,
          startedAt: new Date(),
        },
      },
    },
  });

  // 11. Customer Feedback
  await prisma.customerFeedback.createMany({
    data: [
      {
        customerName: 'Vikramaditya Hegde',
        rating: 5,
        foodQuality: 5,
        ambienceRating: 5,
        serviceRating: 5,
        comments: 'Outstanding open-air garden ambience and the Kalmi Kebab is simply the best in Electronic City!',
        isPublic: true,
      },
      {
        customerName: 'Deepa Narayan',
        rating: 5,
        foodQuality: 5,
        ambienceRating: 4,
        serviceRating: 5,
        comments: 'Great family dining spot! The private cabanas are peaceful and Biryani was rich and flavourful.',
        isPublic: true,
      },
      {
        customerName: 'Anand R.',
        rating: 4,
        foodQuality: 5,
        ambienceRating: 4,
        serviceRating: 4,
        comments: 'Loved the Hong Kong Chicken and tandoori breads. Very fast service at the tables.',
        isPublic: true,
      },
    ],
  });

  // 12. Active Coupons
  await prisma.coupon.createMany({
    data: [
      {
        code: 'WELCOME100',
        description: 'Flat ₹100 off on first online order above ₹500',
        discountType: 'FLAT',
        discountValue: 100,
        minOrderAmount: 500,
        validFrom: new Date('2026-01-01'),
        validUntil: new Date('2026-12-31'),
        usageLimit: 1000,
        isActive: true,
      },
      {
        code: 'GARDEN15',
        description: '15% discount up to ₹150 on dining above ₹800',
        discountType: 'PERCENTAGE',
        discountValue: 15,
        minOrderAmount: 800,
        maxDiscount: 150,
        validFrom: new Date('2026-01-01'),
        validUntil: new Date('2026-12-31'),
        usageLimit: 500,
        isActive: true,
      },
    ],
  });

  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
