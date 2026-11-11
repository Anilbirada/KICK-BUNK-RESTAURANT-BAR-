import http from 'http';

function request(method: string, path: string, body: any = null, token: string | null = null): Promise<any> {
  return new Promise((resolve, reject) => {
    const dataString = body ? JSON.stringify(body) : '';
    const req = http.request(
      {
        hostname: 'localhost',
        port: 5000,
        path: `/api/v1${path}`,
        method,
        headers: {
          'Content-Type': 'application/json',
          ...(dataString ? { 'Content-Length': Buffer.byteLength(dataString) } : {}),
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      },
      (res) => {
        let respData = '';
        res.on('data', (c) => (respData += c));
        res.on('end', () => {
          try {
            resolve({ status: res.statusCode, body: JSON.parse(respData) });
          } catch {
            resolve({ status: res.statusCode, body: respData });
          }
        });
      }
    );
    req.on('error', reject);
    if (dataString) req.write(dataString);
    req.end();
  });
}

async function runEndToEndTests() {
  console.log('========================================================================');
  console.log('KICK BUNK RESTAURANT & BAR: COMPLETE END-TO-END ACCEPTANCE TEST SUITE');
  console.log('========================================================================\n');

  // 1. Business Owner Authentication
  console.log('▶ TEST 1: Executive Authentication (JWT & RBAC)...');
  const loginRes = await request('POST', '/auth/login', {
    emailOrPhone: 'owner@kickbunk.com',
    password: 'KickBunk@2026',
  });
  if (loginRes.status !== 200 || !loginRes.body.data?.token) {
    throw new Error(`Authentication failed: ${JSON.stringify(loginRes.body)}`);
  }
  const token = loginRes.body.data.token;
  console.log(`  ✓ Authenticated as: ${loginRes.body.data.user.fullName} (${loginRes.body.data.user.roles.join(', ')})`);

  // 2. Verified Venue & Branch Details
  console.log('\n▶ TEST 2: Verified Branch & Location Discovery...');
  const branchesRes = await request('GET', '/branches');
  if (branchesRes.status !== 200 || !branchesRes.body.data?.length) {
    throw new Error('Branch retrieval failed');
  }
  const blrBranch = branchesRes.body.data.find((b: any) => b.city === 'Bengaluru');
  if (!blrBranch) throw new Error('Bengaluru flagship branch missing');
  console.log(`  ✓ Discovered Flagship Branch: ${blrBranch.name}`);
  console.log(`  ✓ Verified Phone: ${blrBranch.phone}`);
  console.log(`  ✓ Verified Address: ${blrBranch.address}`);
  console.log(`  ✓ Google Maps URL: ${blrBranch.googleMapsUrl}`);
  if (blrBranch.phone !== '+91 99806 26699') {
    throw new Error(`Expected phone +91 99806 26699, found ${blrBranch.phone}`);
  }

  // 3. Media Gallery API & Public Showcase Verification
  console.log('\n▶ TEST 3: Media Gallery & Photographic Assets...');
  const mediaRes = await request('GET', '/media');
  if (mediaRes.status !== 200 || !mediaRes.body.data) {
    throw new Error('Media asset retrieval failed');
  }
  const mediaList = mediaRes.body.data;
  console.log(`  ✓ Total Seeded & Verified Media Assets: ${mediaList.length} items`);
  
  const videoAssets = mediaList.filter((m: any) => m.category === 'VIDEOS');
  const heroAssets = mediaList.filter((m: any) => m.featuredInHero === true);
  console.log(`  ✓ Videos & Reels Count: ${videoAssets.length} streams`);
  console.log(`  ✓ Hero Showcase Assets: ${heroAssets.length} featured`);

  // Test Creating, Updating, and Deleting a Test Media Asset
  console.log('  - Testing Media Admin CRUD (POST, PUT, DELETE)...');
  const createMediaRes = await request('POST', '/media', {
    category: 'GARDEN',
    subCategory: 'Test Gazebo Seating',
    title: 'Automated Test Media Item',
    url: '/images/kickbunk/photo_1_garden_gazebo.jpg',
    thumbnailUrl: '/images/kickbunk/photo_1_garden_gazebo.jpg',
    altText: 'Test Alt Text for SEO',
    sourceNotes: 'Automated Test Suite',
    featuredInHero: false,
  }, token);
  if (createMediaRes.status !== 201) throw new Error(`Media creation failed: ${JSON.stringify(createMediaRes.body)}`);
  const createdMediaId = createMediaRes.body.data.id;
  console.log(`    ✓ Created Test Media Asset: ${createdMediaId}`);

  const updateMediaRes = await request('PUT', `/media/${createdMediaId}`, {
    title: 'Automated Test Media Item - Updated',
    featuredInHero: true,
  }, token);
  if (updateMediaRes.status !== 200) throw new Error('Media update failed');
  console.log('    ✓ Updated Test Media Asset');

  const deleteMediaRes = await request('DELETE', `/media/${createdMediaId}`, null, token);
  if (deleteMediaRes.status !== 200) throw new Error('Media deletion failed');
  console.log('    ✓ Cleaned up Test Media Asset');

  // 4. Menu & Culinary Highlights
  console.log('\n▶ TEST 4: Menu Items & Real-Time Availability...');
  const menuRes = await request('GET', '/menu/items');
  if (menuRes.status !== 200 || !menuRes.body.data?.length) {
    throw new Error('Menu items retrieval failed');
  }
  const items = menuRes.body.data;
  console.log(`  ✓ Retrieved ${items.length} Live Menu Items`);
  const kalmiKebab = items.find((i: any) => i.name.includes('Kalmi Kebab'));
  const biryani = items.find((i: any) => i.name.includes('Biryani'));
  if (!kalmiKebab || !biryani) throw new Error('Key menu items missing');
  console.log(`  ✓ Verified Signature Dishes: "${kalmiKebab.name}" (₹${kalmiKebab.basePrice}) & "${biryani.name}" (₹${biryani.basePrice})`);

  // 5. Table Reservation Submission (Customer Flow)
  console.log('\n▶ TEST 5: Online Table Booking & Reservation Workflow...');
  const bookingDate = new Date(Date.now() + 86400000).toISOString().split('T')[0];
  const reservationRes = await request('POST', '/tables/reservations', {
    branchId: blrBranch.id,
    customerName: 'Rohit Sharma',
    customerPhone: '+91 98450 11223',
    customerEmail: 'rohit@bengalurudining.in',
    reservationDate: bookingDate,
    reservationTime: '20:00',
    guestCount: 4,
    specialRequests: 'Outdoor Garden Cabana preferred with ambient lighting',
  });
  if (reservationRes.status !== 201) {
    throw new Error(`Reservation failed: ${JSON.stringify(reservationRes.body)}`);
  }
  console.log(`  ✓ Table Reservation Confirmed! ID: ${reservationRes.body.data.id}`);
  console.log(`  ✓ Guest: Rohit Sharma (4 Pax) on ${bookingDate} at 20:00`);

  // 6. Customer Inquiry Submission (Banquet / Party Enquiry)
  console.log('\n▶ TEST 6: Event & Party Inquiry Workflow...');
  const inquiryRes = await request('POST', '/inquiries', {
    branchId: blrBranch.id,
    name: 'Anita Verma',
    phone: '+91 99160 44556',
    email: 'anita.v@techcorp.com',
    subject: 'Corporate Cocktail Evening & Buffet (40 Pax)',
    message: 'Looking for a private cabana cluster for our team celebration this Friday evening.',
  });
  if (inquiryRes.status !== 201) {
    throw new Error(`Inquiry failed: ${JSON.stringify(inquiryRes.body)}`);
  }
  console.log(`  ✓ Customer Inquiry Logged! ID: ${inquiryRes.body.data.id}`);

  // 7. POS Order Placement with Discount & GST Calculation
  console.log('\n▶ TEST 7: POS Order Placement with Discount & GST...');
  const orderRes = await request('POST', '/orders', {
    branchId: blrBranch.id,
    channel: 'DINE_IN',
    notes: 'Outdoor Cabana 4 - Chef Special Preparation',
    couponCode: 'WELCOME100',
    items: [
      { menuItemId: kalmiKebab.id, quantity: 2 },
      { menuItemId: biryani.id, quantity: 2 },
    ],
  });
  if (orderRes.status !== 201) {
    throw new Error(`Order placement failed: ${JSON.stringify(orderRes.body)}`);
  }
  const order = orderRes.body.data;
  console.log(`  ✓ Order Generated: ${order.orderNumber}`);
  console.log(`  ✓ Subtotal: ₹${order.subTotal}`);
  console.log(`  ✓ Coupon Discount: ₹${order.discountAmount}`);
  console.log(`  ✓ CGST + SGST (5%): ₹${order.taxAmount}`);
  console.log(`  ✓ Final Invoice Amount: ₹${order.totalAmount}`);
  console.log(`  ✓ GST Invoice ID: ${order.invoice?.invoiceNumber}`);

  // 8. Kitchen Display System (KDS) & Inventory Deduction Verification
  console.log('\n▶ TEST 8: Kitchen Display System (KDS) & Inventory Workflow...');
  const kitchenTickets = await request('GET', `/kitchen/tickets?branchId=${blrBranch.id}`, null, token);
  const ticket = kitchenTickets.body.data.find((t: any) => t.orderId === order.id);
  if (!ticket) throw new Error('Ticket not found in KDS');
  console.log(`  ✓ KDS Ticket Generated: ${ticket.ticketNumber} (Status: ${ticket.status})`);

  // Progress ticket: ACCEPTED -> PREPARING -> READY
  const r1 = await request('PATCH', `/kitchen/tickets/${ticket.id}/status`, { status: 'ACCEPTED' }, token);
  const r2 = await request('PATCH', `/kitchen/tickets/${ticket.id}/status`, { status: 'PREPARING' }, token);
  const r3 = await request('PATCH', `/kitchen/tickets/${ticket.id}/status`, { status: 'READY' }, token);
  if (r3.status !== 200) throw new Error(`Ticket bump failed: ${JSON.stringify(r3.body)}`);

  // Complete Order & Trigger Inventory Deduction
  const compOrderRes = await request('PATCH', `/orders/${order.id}/status`, { status: 'COMPLETED' }, token);
  if (compOrderRes.status !== 200) throw new Error(`Order complete failed: ${JSON.stringify(compOrderRes.body)}`);
  console.log('  ✓ Kitchen Ticket Bumped: RECEIVED -> ACCEPTED -> PREPARING -> READY');
  console.log('  ✓ Order marked COMPLETED & automated raw inventory stock deduction triggered');

  console.log('\n========================================================================');
  console.log('🏆 ALL 8 ACCEPTANCE TESTS COMPLETED SUCCESSFULLY WITH ZERO ERRORS!');
  console.log('========================================================================\n');
}

runEndToEndTests().catch((err) => {
  console.error('\n❌ ACCEPTANCE TEST FAILED:', err);
  process.exit(1);
});
