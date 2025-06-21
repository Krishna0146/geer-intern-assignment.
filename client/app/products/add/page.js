'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import axios from 'axios'
import styles from './addProduct.module.css'

const API_BASE_URL = 'http://localhost:5000/api'

export default function AddProduct() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    imageUrl: '',
    description: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      await axios.post(`${API_BASE_URL}/products`, {
        ...formData,
        price: parseFloat(formData.price)
      })
      router.push('/products')
    } catch (error) {
      setError('Failed to add product')
      setLoading(false)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1>Add New Product</h1>
        
        {error && <div className={styles.error}>{error}</div>}
        
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Product Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="price">Price (₹)</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              step="0.01"
              min="0"
              required
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="imageUrl">Image URL</label>
            <input
              type="url"
              id="imageUrl"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className={styles.textarea}
              placeholder="Enter product description..."
            />
          </div>

          <div className={styles.actions}>
            <button 
              type="submit" 
              disabled={loading}
              className={styles.submitButton}
            >
              {loading ? 'Adding...' : 'Add Product'}
            </button>
            <Link href="/products" className={styles.cancelButton}>
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}