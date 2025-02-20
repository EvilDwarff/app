'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('/api/auth', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({type: 'login', login, password })
        });
        const data = await response.json();
        if (data.token) {
            localStorage.setItem('token', data.token);
            router.push('/orders');
        } else {
            alert('Login failed: ' + data.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Login" value={login} onChange={(e) => setLogin(e.target.value)} required />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <button type="submit">Login</button>
        </form>
    );
}
