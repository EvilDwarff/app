'use client';
import { useState, useEffect } from 'react';

export default function OrdersPage() {
    const [orders, setOrders] = useState([]);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchOrders = async () => {
            const response = await fetch('/api/orders', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await response.json();
            setOrders(data);
        };
        fetchOrders();
    }, [token]);

    return (
        <ul>
            {orders.map(order => (
                <li key={order.id}>Order #{order.id} - Status: {order.id_status}</li>
            ))}
        </ul>
    );
}