'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import axios from 'axios'
import styles from './productDetail.module.css'

const API_BASE_URL = 'http://localhost:5000/api'

export default function ProductDetail() {
  const params = useParams()
  const id = params.id
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (id) {
      fetchProduct()
    }
  }, [id])

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/products`)
      const foundProduct = response.data.find(p => p.id === parseInt(id))
      if (foundProduct) {
        setProduct(foundProduct)
      } else {
        setError('Product not found')
      }
      setLoading(false)
    } catch (error) {
      setError('Failed to fetch product')
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Loading product...</div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>{error || 'Product not found'}</div>
        <Link href="/products" className={styles.backButton}>
          ← Back to Products
        </Link>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.productDetail}>
        <div className={styles.imageSection}>
          <img 
            src={product.imageUrl || '/placeholder.jpg'} 
            alt={product.name}
            className={styles.productImage}
          />
        </div>
        <div className={styles.infoSection}>
          <h1>{product.name}</h1>
          <p className={styles.price}>₹{product.price}</p>
          <div className={styles.description}>
            <h3>Description</h3>
            <p>{product.description || 'No description available.'}</p>
          </div>
          <div className={styles.actions}>
            <button className={styles.addToCart}>Add to Cart</button>
            <Link href="/products" className={styles.backButton}>
              ← Back to Products
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}