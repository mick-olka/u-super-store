import styles from "./page.module.css";

export default function Home() {
	return (
		<div className={styles.page}>
			<main className={styles.main}>HOME PAGE (CLIENT)</main>
			<footer className={styles.footer}>FOOTER</footer>
		</div>
	);
}
