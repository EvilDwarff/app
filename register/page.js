'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';


export default function RegisterPage() {
    const [formData, setFormData] = useState({ login: '', password: '', full_name: '', phone: '', email: '', id_role: 1 });
    const router = useRouter();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('/api/auth', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
        const data = await response.json();
        if (data.message) {
            router.push('/login');
        } else {
            alert('Registration failed');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="login" placeholder="Login" onChange={handleChange} required />
            <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
            <input type="text" name="full_name" placeholder="Full Name" onChange={handleChange} required />
            <input type="text" name="phone" placeholder="Phone" onChange={handleChange} required />
            <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
            <button type="submit">Register</button>
        </form>
    );
}
