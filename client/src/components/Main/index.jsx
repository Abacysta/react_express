import React from 'react';
import { Link } from 'react-router-dom'; 
import styles from "./styles.module.css";

const Main = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  }

  return (
    <div className={styles.main_container}>
      <nav className={styles.navbar}>
        <div className={styles.navbarleft}>
          <h1>Urodziny!</h1>
        </div>
        <div className={styles.navbarright}>
          <Link to="/wykresy">
            <button type="button" className={styles.white_btn}>
              Wykresy
            </button>
          </Link>
          <Link to="/tabeleD">
            <button type="button" className={styles.white_btn}>
              Tabela - dziewczynki
            </button>
          </Link>
          <Link to="/tabeleC">
            <button type="button" className={styles.white_btn}>
              Tabela - chłopcy
            </button>
          </Link>
          <button className={styles.white_btn} onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>

      <div className={styles.pole}>
        <h2>Dlaczego w Polsce rodzi się więcej chłopców niż dziewcząt?</h2>
        <img src="/strollers.png" alt="Strollers" className={styles.strollersImage} />
        <p>
        W Polsce, jak i w wielu innych krajach, rodzi się
           nieco więcej chłopców niż dziewcząt. Jest to naturalne zjawisko, które występuje z różnych powodów biologicznych i ewolucyjnych.
            Jedna z teorii australijskich naukowców mówi, że o płci dziecka mogą decydować warunki społeczno-ekonomiczne, w jakich żyje jego matka. 
            Im są one lepsze, im kobieta ma większe poczucie bezpieczeństwa i dostatku tym wyższa szansa na urodzenie chłopca. 
            Płody męskie są z reguły słabsze i potrzebują lepszych warunków, by przetrwać. 
            Dlatego też w zamożniejszych rejonach świata rodzi się więcej chłopców, a w biedniejszych dziewczynki. 
        </p>
      </div>
    </div>
  );
}

export default Main;
