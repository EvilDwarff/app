'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Layout({ children }) {
    const [userRole, setUserRole] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = JSON.parse(atob(token.split('.')[1]));
            setUserRole(decodedToken.role);
        }
    }, []);

    return (
        <html>
            <body>
        <div>
            <nav>
                <ul>
                    <li><Link href="/">Home</Link></li>
                    <li><Link href="/login">Login</Link></li>
                    <li><Link href="/register">Register</Link></li>
                    <li><Link href="/orders">Orders</Link></li>
                    {userRole === 2 && <li><Link href="/admin">Admin</Link></li>}
                </ul>
            </nav>
            <main>{children}</main>
        </div>
        </body>
        </html>
    );
}