import React from "react";
import styles from "@/styles/Footer.module.scss";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footer__columns}>
          <div className={styles.footer__col}>
            <h3 className={styles.footer__colTitle}>
              <i data-feather="shopping-bag"></i> <span>Logo</span>
            </h3>
            <nav className={styles.footer__nav}>
              <ul className={styles.footer__navList}>
                <li className={styles.footer__navItem}>
                  <Link href="/dashboard" className={styles.footer__navLink}>
                    Anasayfa
                  </Link>
                </li>
                <li className={styles.footer__navItem}>
                  <Link href="/services" className={styles.footer__navLink}>
                    Ayarlar
                  </Link>
                </li>
                <li className={styles.footer__navItem}>
                  <Link href="/contact" className={styles.footer__navLink}>
                    İletişim
                  </Link>
                </li>
                <li className={styles.footer__navItem}>
                  <Link href="/profile" className={styles.footer__navLink}>
                    Hesabım
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          <div className={styles.footer__col}>
            <h3 className={styles.footer__colTitle}>
              <i data-feather="share-2"></i> <span>Socials</span>
            </h3>
            <nav className={styles.footer__nav}>
              <ul className={styles.footer__navList}>
                <li className={styles.footer__navItem}>
                  <Link href="https://www.linkedin.com/in/hasimkilic/" target="_blank"  className={styles.footer__navLink}>
                    <i data-feather="linkedin"></i>
                    <span>Linkedin</span>
                  </Link>
                </li>
                <li className={styles.footer__navItem}>
                  <Link href="https://github.com/hasimkilic" target="_blank" className={styles.footer__navLink}>
                    <i data-feather="github"></i>
                    <span>Github</span>
                  </Link>
                </li>
                <li className={styles.footer__navItem}>
                  <Link href="https://www.instagram.com/hhasimkk/" target="_blank"  className={styles.footer__navLink}>
                    <i data-feather="instagram"></i>
                    <span>Instagram</span>
                  </Link>
                </li>
                <li className={styles.footer__navItem}>
                  <Link href="https://hasimkilicdev.vercel.app/" target="_blank"  className={styles.footer__navLink}>
                    <i data-feather="instagram"></i>
                    <span>Portfolio</span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          <div className={styles.footer__col}>
            <h3 className={styles.footer__colTitle}>
              <i data-feather="send"></i> <span>Contact</span>
            </h3>
            <nav className={styles.footer__nav}>
              <ul className={styles.footer__navList}>
                <li className={styles.footer__navItem}>
                  <Link
                    href="mailto:hasimkilic.dev@gmail.com"
                    className={styles.footer__navLink}
                  >
                    hasimkilic.dev@gmail.com
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <div className={styles.footer__copyrights}>
          <p>
            Tasarlayan
            <Link href="https://hasimkilicdev.vercel.app/" target="_blank">
              HaşimK
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
