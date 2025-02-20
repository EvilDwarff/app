import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mysql from 'mysql2/promise';

const dbConfig = {
    host: '127.0.0.1',
    user: 'root',
    password: 'Smirn0v1221',
    database: 'v1'
};

export async function POST(req) {
    const { login, password, full_name, phone, email, id_role } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10);
    const db = await mysql.createConnection(dbConfig);
    
    try {
        await db.execute(
            'INSERT INTO user (login, password, full_name, phone, email, id_role) VALUES (?, ?, ?, ?, ?, ?)',
            [login, hashedPassword, full_name, phone, email, id_role]
        );
        return NextResponse.json({ message: 'User registered' });
    } catch (err) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

export async function GET(req) {
    const { login, password } = await req.json();
    const db = await mysql.createConnection(dbConfig);
    
    const [rows] = await db.execute('SELECT * FROM user WHERE login = ?', [login]);
    if (rows.length === 0) return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    
    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    
    const token = jwt.sign({ id: user.id, role: user.id_role }, 'secret', { expiresIn: '1h' });
    return NextResponse.json({ message: 'Logged in', token });
}

