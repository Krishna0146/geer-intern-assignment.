'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import axios from 'axios'
import styles from './products.module.css'

const API_BASE_URL = 'http://localhost:5000/api'

export default function Products() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/products`)
      setProducts(response.data)
      setLoading(false)
    } catch (error) {
      setError('Failed to fetch products')
      setLoading(false)
    }
  }

  const deleteProduct = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`${API_BASE_URL}/products/${id}`)
        setProducts(products.filter(product => product.id !== id))
      } catch (error) {
        setError('Failed to delete product')
      }
    }
  }

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Loading products...</div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Product Store</h1>
        <Link href="/products/add" className={styles.addButton}>
          Add New Product
        </Link>
      </div>

      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />
      </div>

      {error && <div className={styles.error}>{error}</div>}

      <div className={styles.grid}>
        {filteredProducts.map((product) => (
          <div key={product.id} className={styles.card}>
            <div className={styles.imageContainer}>
              <img 
                src={product.imageUrl || '/placeholder.jpg'} 
                alt={product.name}
                className={styles.productImage}
              />
            </div>
            <div className={styles.cardContent}>
              <h3>{product.name}</h3>
              <p className={styles.price}>₹{product.price}</p>
              <div className={styles.actions}>
                <Link href={`/products/${product.id}`} className={styles.viewButton}>
                  View Details
                </Link>
                <button 
                  onClick={() => deleteProduct(product.id)}
                  className={styles.deleteButton}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && !loading && (
        <div className={styles.empty}>
          <h2>No products found</h2>
          <p>Try adjusting your search or add some products.</p>
        </div>
      )}

      <div className={styles.navigation}>
        <Link href="/" className={styles.backButton}>
          ← Back to Home
        </Link>
      </div>
    </div>
  )
}