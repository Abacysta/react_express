import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import styles from './styles.module.css';
import { Link } from 'react-router-dom'; 

const TabeleD = () => {

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  }

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/kobiety');
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    
    fetchData();
  }, []);

  const downloadFile = () => {
    fetch('http://localhost:8080/api/kobiety')
      .then(response => response.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'Dziewczynki.json');
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      })
      .catch(error => console.error('Error downloading the file:', error));
  };

  const columns = data.length > 0 ? [
    {
      title: 'NAZWA',
      dataIndex: 'NAZWA',
      key: 'NAZWA',
      fixed: 'left',
    },
    ...Object.keys(data[0]).filter(key => key !== 'NAZWA').map(key => ({
      title: key,
      dataIndex: key,
      key: key,
    })),
  ] : [];

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
      <h2>Liczba dziewczynek urodzonych w poszczególnych województwach w kolejnych latach</h2>
      <div className={styles.tablecontainer}>
        <Table dataSource={data} columns={columns} />
      </div>
      <div className={styles.download_container}>
        <button className={styles.download_btn} onClick={downloadFile}>
          Pobierz plik Kobiety.json
        </button>
      </div>
    </div>
  )
};

export default TabeleD;
