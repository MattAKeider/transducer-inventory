import styles from "./Header.module.css";

const Header = () => {
  return (
    <header>
      <div className={styles.container}>
        <h1 className={styles.title}>Transducer Inventory</h1>
        <nav className={styles.navbar}>
          <button className={styles.add_item}>Add Item</button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
