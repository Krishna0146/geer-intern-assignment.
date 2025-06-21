import Link from 'next/link'
import styles from './page.module.css'

export default function Home() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }} className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <span>Product Store</span>
        </h1>
        <p className={styles.description}>
          Manage your products with ease
        </p>
        <div className={styles.grid}>
          <Link href="/products" className={styles.card}>
            <h2>View Products &rarr;</h2>
            <p>Browse all available products in our store</p>
          </Link>
          <Link href="/products/add" className={styles.card}>
            <h2>Add Product &rarr;</h2>
            <p>Add new products to your inventory</p>
          </Link>
        </div>
      </main>
    </div>
  )
}