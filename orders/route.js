export async function GET(req) {
    const db = await mysql.createConnection(dbConfig);
    const { userId } = req.nextUrl.searchParams;
    const [orders] = await db.execute('SELECT * FROM order WHERE id_user = ?', [userId]);
    return NextResponse.json(orders);
}

export async function POST(req) {
    const { id_user, id_product, count, address } = await req.json();
    const db = await mysql.createConnection(dbConfig);
    
    try {
        await db.execute(
            'INSERT INTO order (id_user, id_product, id_status, count, address) VALUES (?, ?, 1, ?, ?)',
            [id_user, id_product, count, address]
        );
        return NextResponse.json({ message: 'Order created' });
    } catch (err) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}