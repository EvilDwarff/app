'use client';
import { useState, useEffect } from 'react';

export default function AdminPage() {
    const [orders, setOrders] = useState([]);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchAdminOrders = async () => {
            const response = await fetch('/api/admin', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await response.json();
            setOrders(data);
        };
        fetchAdminOrders();
    }, [token]);

    return (
        <ul>
            {orders.map(order => (
                <li key={order.id}>{order.full_name} - {order.product_name} - Status: {order.id_status}</li>
            ))}
        </ul>
    );
}