"use client";
import React, { useState } from "react";
import styles from "@/styles/Header.module.scss";
import Link from "next/link";
import Image from "next/image";
import darkModeIcon from "../../public/darkMode.svg";
import lightModeIcon from "../../public/lightMode.svg";

export default function Header() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const themeClass = isDarkMode ? styles.darkMode : styles.lightMode;

  return (
    <header className={`${styles.header} ${themeClass}`}>
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
            onClick={toggleDarkMode}
          >
            <Image src={"/menu.svg"} width={24} height={24} alt="menu" />
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
            onClick={toggleDarkMode}
          >
            <Image
              width={20}
              height={20}
              src={isDarkMode ? lightModeIcon : darkModeIcon}
              alt={isDarkMode ? "Light Mode" : "Dark Mode"}
            />
          </button>
          <Link href="/profile" className={styles.navItem}>
            Hesabım
          </Link>
        </div>
      </div>
    </header>
  );
}
