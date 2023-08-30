import Image from 'next/image'
import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <a href="/new-transaction">Create new transaction</a> <br />
        <a href="/transactions">List transactions</a>
      </div>
    </main>
  )
}
