import React from "react";
import styles from "@/styles/Header.module.scss";
import Link from "next/link";
import Image from "next/image";
import dark from "../../public/darkMode.svg";
export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.siteHeaderWrapper}>
        <div>
          <Link href="/dashboard" className={styles.brand}>
            Logo
          </Link>
        </div>
        <nav className={styles.nav}>
          <button
            className={styles.navToggle}
            aria-expanded="false"
            type="button"
          >
            <Image src={"./menu.svg"} width={24} height={24} alt="menu" />
          </button>
          <ul className={styles.navWrapper}>
            <li className={styles.navItem}>
              <Link href="/dashboard">Anasayfa</Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/services">Ayarlar</Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/contact">İletişim</Link>
            </li>
          </ul>
        </nav>
        <div className={styles.navAccount}>
          <button
            className={styles.darkModeBtn}
            aria-expanded="false"
            type="button"
          >
            <Image width={20} height={20} src="https://img.icons8.com/external-linear-outline-icons-papa-vector/78/external-Light-Mode-interface-linear-outline-icons-papa-vector.png" alt="Light"/>
            {/* <Image src={dark} width={20} height={20} alt="dark" /> */}
          </button>
          <Link href="/profile" className={styles.navItem}>
            Hesabım
          </Link>
        </div>
      </div>
    </header>
  );
}
