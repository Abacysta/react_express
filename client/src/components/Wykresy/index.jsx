import React, { useEffect, useState } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, BarChart, Bar, Brush } from 'recharts';
import styles from './styles.module.css';
import { Link } from 'react-router-dom'; 
import axios from 'axios';

const Wykresy = () => {
  const [kobietyData, setKobietyData] = useState(null);
  const [mezczyzniData, setMezczyzniData] = useState(null);
  const [transformedData, setTransformedData] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("OPOLSKIE");
  const [selectedYearGirls, setSelectedYearGirls] = useState(2005);
  const [selectedYearBoys, setSelectedYearBoys] = useState(2005);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Pobierz dane kobiet
        const responseKobiety = await axios.get('http://localhost:8080/api/kobiety');
        const kobietyJson = await responseKobiety.data;
        setKobietyData(kobietyJson);

        // Pobierz dane mężczyzn
        const responseMezczyzni = await axios.get('http://localhost:8080/api/mezczyzni');
        const mezczyzniJson = await responseMezczyzni.data;
        setMezczyzniData(mezczyzniJson);

        // Przekształć dane
        const years = Object.keys(kobietyJson[0]).slice(1, -1); // Założenie, że wszystkie obiekty mają takie same lata
        const newData = years.map(year => {
          const yearData = { "ROK": year };

          // Dodaj dane o dziewczynkach dla każdego regionu
          kobietyJson.forEach(region => {
            yearData[region.NAZWA + "_dziewczynki"] = region[year];
          });

          // Dodaj dane o chłopcach dla każdego regionu
          mezczyzniJson.forEach(region => {
            yearData[region.NAZWA + "_chłopcy"] = region[year];
          });

          return yearData;
        });

        // Ustaw przekształcone dane w stanie komponentu
        setTransformedData(newData);
      } catch (error) {
        console.error('Błąd podczas pobierania danych:', error);
      }
    };

    fetchData();
  }, []);

  const handleRegionChange = (event) => {
    setSelectedRegion(event.target.value);
  };

  const handleYearGirlsChange = (event) => {
    setSelectedYearGirls(event.target.value);
  };

  const handleYearBoysChange = (event) => {
    setSelectedYearBoys(event.target.value);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  if (!kobietyData || !mezczyzniData) {
    return <div>Ładowanie danych...</div>;
  }

  // Function to dynamically calculate the Y axis domain
  const calculateDomain = (data, key) => {
    const values = data.map(item => item[key]).filter(val => val != null);
    const min = Math.min(...values);
    const max = Math.max(...values);
    return [0, max + 500 - (max % 500)]; // Round up to the next 500
  };

  // Calculate the domain for both boys and girls data in the selected region
  const calculateCombinedDomain = (data, region) => {
    const values = data.map(item => ({
      girls: item[`${region}_dziewczynki`],
      boys: item[`${region}_chłopcy`]
    })).flatMap(item => [item.girls, item.boys]).filter(val => val != null);

    const min = Math.min(...values);
    const max = Math.max(...values);
    return [0, max + 2500 - (max % 2500)]; // Round up to the next 500
  };

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

      <div className={styles.wykres}>
        <h2>Liczba urodzeń dziewczynek w województwach według lat</h2>
        <label htmlFor="year-select">Wybierz rok: </label>
        <select id="year-select" onChange={handleYearGirlsChange} value={selectedYearGirls}>
          {Array.from({ length: 2022 - 2004 + 1 }, (_, i) => 2004 + i).map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>

        <BarChart width={1000} height={300} data={kobietyData} margin={{ top: 10, right: 30, left: 0, bottom: 50 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="NAZWA" angle={-30} textAnchor="end" interval={0} tick={{ fontSize: 10 }} />
          <YAxis domain={calculateDomain(kobietyData, selectedYearGirls)} />
          <Tooltip />
          <Bar dataKey={selectedYearGirls} fill="pink" />
        </BarChart>
      </div>

      <div className={styles.wykres}>
        <h2>Liczba urodzeń chłopców w województwach według lat</h2>
        <label htmlFor="year-select">Wybierz rok: </label>
        <select id="year-select" onChange={handleYearBoysChange} value={selectedYearBoys}>
          {Array.from({ length: 2022 - 2004 + 1 }, (_, i) => 2004 + i).map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>

        <BarChart width={1000} height={300} data={mezczyzniData} margin={{ top: 10, right: 30, left: 0, bottom: 50 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="NAZWA" angle={-30} textAnchor="end" interval={0} tick={{ fontSize: 10 }} />
          <YAxis domain={calculateDomain(mezczyzniData, selectedYearBoys)} />
          <Tooltip />
          <Bar dataKey={selectedYearBoys} fill="#90e0ef" />
        </BarChart>
      </div>

      <div className={styles.wykres}>
        <h2>Liczba urodzeń chłopców i dziewcząt w danym województwie</h2>
        <label htmlFor="region-select">Wybierz województwo: </label>
        <select id="region-select" onChange={handleRegionChange} value={selectedRegion}>
          {kobietyData && kobietyData.map(region => (
            <option key={region.NAZWA} value={region.NAZWA}>{region.NAZWA}</option>
          ))}
        </select>

        <LineChart width={1000} height={300} data={transformedData}>
          <Brush dataKey="name" height={30} stroke="grey" />
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="ROK"/>
          <YAxis domain={calculateCombinedDomain(transformedData, selectedRegion)} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey={`${selectedRegion}_dziewczynki`} stroke="pink" animationDuration={1000} />
          <Line type="monotone" dataKey={`${selectedRegion}_chłopcy`} stroke="#90e0ef" animationDuration={1000} />
        </LineChart>
      </div>
    </div>
  );
};

export default Wykresy;
