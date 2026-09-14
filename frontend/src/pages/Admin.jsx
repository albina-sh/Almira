import { useEffect, useState } from 'react'
import './Admin.css'

function Admin() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('http://localhost:5000/api/orders')
      .then((response) => response.json())
      .then((data) => {
        setOrders(data)
        setLoading(false)
      })
      .catch((error) => {
        console.error('Failed to load orders:', error)
        setLoading(false)
      })
  }, [])

  const totalSales = orders.reduce((total, order) => {
    const amount = Number(
      String(order.orderTotal)
        .replace('Rs. ', '')
        .replace(/,/g, '')
    )

    return total + amount
  }, 0)

  return (
    <div className="admin-page">

      <div className="admin-header">
        <div>
          <p className="admin-small-title">ALMIRA ADMIN</p>

          <h1>Dashboard</h1>

          <p>
            Manage your orders and store activity.
          </p>
        </div>
      </div>

      <div className="admin-stats">

        <div className="admin-stat-card">
          <span>Total Orders</span>
          <strong>{orders.length}</strong>
        </div>

        <div className="admin-stat-card">
          <span>Total Sales</span>
          <strong>
            Rs. {totalSales.toLocaleString()}
          </strong>
        </div>

        <div className="admin-stat-card">
          <span>Customers</span>
          <strong>
            {new Set(orders.map((order) => order.email)).size}
          </strong>
        </div>

      </div>

      <div className="admin-orders">

        <div className="admin-section-header">
          <div>
            <h2>Orders</h2>
            <p>Recent customer orders</p>
          </div>
        </div>

        {loading ? (
          <p className="admin-message">
            Loading orders...
          </p>
        ) : orders.length === 0 ? (
          <p className="admin-message">
            No orders yet.
          </p>
        ) : (
          <div className="orders-table-wrapper">

            <table className="orders-table">

              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Contact</th>
                  <th>Products</th>
                  <th>Total</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>

                {orders.map((order) => (
                  <tr key={order._id}>

                    <td>
                      <strong>{order.name}</strong>
                      <small>
                        {order.city}
                      </small>
                    </td>

                    <td>
                      <small>
                        {order.email}
                      </small>

                      <small>
                        {order.phone}
                      </small>
                    </td>

                    <td>
                      {order.orderItems}
                    </td>

                    <td>
                      <strong>
                        {order.orderTotal}
                      </strong>
                    </td>

                    <td>
                      {new Date(
                        order.createdAt
                      ).toLocaleDateString()}
                    </td>

                    <td>
                        <select
                            className="order-status-select"
                            value={order.status || 'Pending'}
                            onChange={async (event) => {
                                const newStatus = event.target.value

                                setOrders((currentOrders) =>
                                    currentOrders.map((item) =>
                                    item._id === order._id
                                        ? {
                                            ...item,
                                            status: newStatus
                                        }
                                        : item
                                    )
                                )

                                try {
                                    const response = await fetch(
                                    'http://localhost:5000/api/orders/' +
                                        order._id +
                                        '/status',
                                    {
                                        method: 'PATCH',
                                        headers: {
                                        'Content-Type': 'application/json'
                                        },
                                        body: JSON.stringify({
                                        status: newStatus
                                        })
                                    }
                                    )

                                    if (!response.ok) {
                                    throw new Error('Status update failed')
                                    }

                                } catch (error) {
                                    console.error('Status update error:', error)
                                    alert('Could not update order status.')
                                }
                                }}
                        >
                            <option value="Pending">Pending</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                        </select>
                        </td>

                  </tr>
                ))}

              </tbody>

            </table>

          </div>
        )}

      </div>

    </div>
  )
}

export default Admin