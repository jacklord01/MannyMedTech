import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { clientInfo, items } = body;

    // Validation
    if (!clientInfo || !items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { message: "Missing required fields or inquiry items list is empty." },
        { status: 400 }
      );
    }

    const { fullName, facilityName, phone, email, location } = clientInfo;
    if (!fullName || !facilityName || !phone || !email || !location) {
      return NextResponse.json(
        { message: "Contact information, hospital name, and delivery region are required." },
        { status: 400 }
      );
    }

    // Generate unique Quote/RFQ Reference ID
    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const quoteId = `MMT-${dateStr}-${randomSuffix}`;

    // Log to simulated storage (ready for Vercel Postgres / AWS RDS)
    console.log("=========================================");
    console.log(`[RFQ RECEIVED] Reference: ${quoteId}`);
    console.log("-----------------------------------------");
    console.log("Facility Name:", facilityName);
    console.log("Contact Name :", fullName);
    console.log("Phone        :", phone);
    console.log("Email        :", email);
    console.log("Location     :", location);
    console.log("Notes        :", clientInfo.shippingNotes || "None");
    console.log("-----------------------------------------");
    console.log("Items List:");
    items.forEach((item, idx) => {
      console.log(`  ${idx + 1}. [Qty: ${item.quantity}] ${item.name} (${item.category})`);
      if (item.notes) console.log(`      * Requirement: ${item.notes}`);
    });
    console.log("=========================================");

    // Simulate saving to DB and sending confirmation email
    // ... insert into database query ...
    // ... transport.sendMail() ...

    return NextResponse.json(
      { 
        success: true, 
        message: "Inquiry registered successfully.", 
        quoteId 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error processing RFQ API request:", error);
    return NextResponse.json(
      { message: "Internal server error. Failed to process quote request." },
      { status: 500 }
    );
  }
}
