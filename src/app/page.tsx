import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div>
          <h1>Notes</h1>
        </div>
        <div>
          <div className={styles.add}>+</div>
        </div>
      </header>
      <hr />
      <main className={styles.main}>
        <div className={styles.card}>
          <h4>Note title</h4>
          <p>Date</p>
        </div>
        <div className={styles.card}>
          <h4>Note title 2</h4>
          <p>Date</p>
        </div>
        <div className={styles.card}>
          <h4>Note title 3</h4>
          <p>Date</p>
        </div>
        <div className={styles.card}>
          <h4>Note title 4</h4>
          <p>Date</p>
        </div>
      </main>
    </div>
  );
}
