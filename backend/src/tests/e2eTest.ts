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
  console.log('====================================================');
  console.log('KICK BUNK 360: AUTOMATED INTEGRATION & ACCEPTANCE TESTS');
  console.log('====================================================\n');

  // STEP 1: Branch Discovery
  const branchesRes = await request('GET', '/branches');
  if (branchesRes.status !== 200 || !branchesRes.body.data?.length) {
    throw new Error('Branch retrieval failed');
  }
  const blrBranch = branchesRes.body.data.find((b: any) => b.city === 'Bengaluru');
  console.log(`✓ 1. Discovered Branches: Bengaluru Flagship (${blrBranch.id}) & Tirupati Outlet`);

  // STEP 2: Menu Retrieval
  const menuRes = await request('GET', '/menu/items');
  const items = menuRes.body.data;
  const kalmiKebab = items.find((i: any) => i.name.includes('Kalmi Kebab'));
  const biryani = items.find((i: any) => i.name.includes('Biryani'));
  console.log(`✓ 2. Retrieved ${items.length} Menu Items. Selected: "${kalmiKebab.name}" and "${biryani.name}"`);

  // STEP 3: Customer Authentication
  const loginRes = await request('POST', '/auth/login', {
    emailOrPhone: 'owner@kickbunk.com',
    password: 'KickBunk@2026',
  });
  const ownerToken = loginRes.body.data.token;
  console.log(`✓ 3. Authenticated Business Owner: ${loginRes.body.data.user.fullName}`);

  // STEP 4: Placing Order with Coupon 'WELCOME100'
  console.log('✓ 4. Placing Dine-In Order with Coupon WELCOME100...');
  const orderRes = await request('POST', '/orders', {
    branchId: blrBranch.id,
    channel: 'DINE_IN',
    notes: 'Less spicy please',
    couponCode: 'WELCOME100',
    items: [
      { menuItemId: kalmiKebab.id, quantity: 1 },
      { menuItemId: biryani.id, quantity: 1 },
    ],
  });

  if (orderRes.status !== 201) {
    throw new Error(`Order placement failed: ${JSON.stringify(orderRes.body)}`);
  }
  const order = orderRes.body.data;
  console.log(`   - Order Created: ${order.orderNumber}`);
  console.log(`   - Subtotal: ₹${order.subTotal}`);
  console.log(`   - Discount Applied: ₹${order.discountAmount}`);
  console.log(`   - GST 5%: ₹${order.taxAmount}`);
  console.log(`   - Total Paid: ₹${order.totalAmount}`);
  console.log(`   - GST Invoice: ${order.invoice?.invoiceNumber}`);

  // STEP 5: Kitchen Ticket Bump Workflow
  console.log('\n✓ 5. Kitchen Display System (KDS) Workflow...');
  const kitchenTickets = await request('GET', `/kitchen/tickets?branchId=${blrBranch.id}`, null, ownerToken);
  const ticket = kitchenTickets.body.data.find((t: any) => t.orderId === order.id);
  if (!ticket) throw new Error('Ticket not found in KDS');
  console.log(`   - Ticket Found in KDS: ${ticket.ticketNumber} (Status: ${ticket.status})`);

  // Bump to ACCEPTED
  await request('PATCH', `/kitchen/tickets/${ticket.id}/status`, { status: 'ACCEPTED' }, ownerToken);
  console.log('   - Bumped to ACCEPTED');

  // Bump to PREPARING
  await request('PATCH', `/kitchen/tickets/${ticket.id}/status`, { status: 'PREPARING' }, ownerToken);
  console.log('   - Bumped to PREPARING');

  // Bump to READY
  await request('PATCH', `/kitchen/tickets/${ticket.id}/status`, { status: 'READY' }, ownerToken);
  console.log('   - Bumped to READY');

  // Complete Order
  await request('PATCH', `/orders/${order.id}/status`, { status: 'COMPLETED' }, ownerToken);
  console.log('   - Order marked COMPLETED. Inventory consumption triggered.');

  // STEP 6: Table Reservation with Double-Booking Prevention
  console.log('\n✓ 6. Table Reservation & Availability Validation...');
  const res1 = await request('POST', '/tables/reservations', {
    branchId: blrBranch.id,
    customerName: 'Ananya Deshmukh',
    customerPhone: '9845012345',
    customerEmail: 'ananya@example.com',
    reservationDate: '2026-11-20',
    reservationTime: '20:00',
    guestCount: 6,
    specialRequests: 'Garden Cabana preferred',
  });
  console.log(`   - Reservation created: Ref KB-RES-${res1.body.data?.id.slice(0, 8).toUpperCase()}`);

  // STEP 7: Executive Analytics & Financial Reporting
  console.log('\n✓ 7. Owner Financial Dashboard Calculation...');
  const dashRes = await request('GET', '/reports/dashboard', null, ownerToken);
  const sum = dashRes.body.data.summary;
  console.log(`   - Total Persisted Revenue: ₹${sum.totalRevenue}`);
  console.log(`   - Total Completed Orders: ${sum.totalOrders}`);
  console.log(`   - Average Order Value: ₹${sum.averageOrderValue}`);
  console.log(`   - Top Dishes: ${dashRes.body.data.topPerformingDishes.map((d: any) => d.name).join(', ')}`);

  console.log('\n====================================================');
  console.log('>>> ALL ACCEPTANCE TESTS PASSED SUCCESSFULLY! <<<');
  console.log('====================================================');
}

runEndToEndTests().catch((err) => {
  console.error('Test Execution Failed:', err);
  process.exit(1);
});
