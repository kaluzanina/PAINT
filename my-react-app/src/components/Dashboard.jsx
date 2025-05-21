import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { useStats } from "../context/StatsContext";
import { useEffect } from "react";
import "./Dashboard.css";
import AccordionChart from "../components/AccordionChart";
import UserMenu from "./UserMenu";

export default function Dashboard() {
//  const { logout, user } = useUser();
  const navigate = useNavigate();
  const { stats, setStats } = useStats();
  const { user } = useUser();

//dark mode
  useEffect(() => {
  if (stats.power > 90) { //do zmiany jak ustalimy próg
    document.body.classList.add("dark-mode");
  } else {
    document.body.classList.remove("dark-mode");
  }
}, [stats.power]);

  const demoVoltageData = [
    { time: "10:00", voltage: 60 },
    { time: "10:05", voltage: 231 },
    { time: "10:10", voltage: 230 },
    { time: "10:15", voltage: 150 },
    { time: "10:20", voltage: 230 },
    { time: "10:25", voltage: 232 },
    { time: "10:30", voltage: 229 },
  ];

  const demoPowerData = [
    { time: "10:00", power: 85 },
    { time: "10:05", power: 90 },
    { time: "10:10", power: 92 },
    { time: "10:15", power: 95 },
    { time: "10:20", power: 94 },
    { time: "10:25", power: 91 },
  ];

  const demoEnergyData = [
    { time: "10:00", energy: 0.12 },
    { time: "10:05", energy: 0.17 },
    { time: "10:10", energy: 0.21 },
    { time: "10:15", energy: 0.27 },
    { time: "10:20", energy: 0.34 },
    { time: "10:25", energy: 0.42 },
  ];

  const demoCurrentData = [
    { time: "10:00", led: 0.12, halogen: 0.34 },
    { time: "10:05", led: 0.13, halogen: 0.35 },
    { time: "10:10", led: 0.14, halogen: 0.36 },
    { time: "10:15", led: 0.13, halogen: 0.37 },
    { time: "10:20", led: 0.15, halogen: 0.39 },
    { time: "10:25", led: 0.14, halogen: 0.38 },
  ];


//funkcja przygotowana dka backend(trzeba uzupełnić api do odświeżania)
//   async function fetchLatestSample() {
//   try {
//     const response = await fetch("/api/measurements/latest", {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//       },
//     });

//     if (!response.ok) throw new Error("Błąd pobierania danych");

//     const data = await response.json();
//     return {
//       time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
//       voltage: data.voltage,
//       currentHalogen: data.currentHalogen,
//       currentLED: data.currentLED,
//       power: data.power,
//       energy: data.energy,
//     };
//   } catch (error) {
//     console.error("Błąd pobierania danych z backendu:", error);
//     return null;
//   }
// }

//!!!funkcja przygotowana dka backend(trzeba uzupełnić api do odświeżania)
// useEffect(() => {
//   const interval = setInterval(async () => {
//     const newSample = await fetchLatestSample();

//     if (!newSample) return;

//     setStats({
//       voltage: newSample.voltage,
//       currentHalogen: newSample.currentHalogen,
//       currentLED: newSample.currentLED,
//       power: newSample.power,
//       energy: newSample.energy,
//     });

//     setVoltageData(prev => [
//       ...prev.slice(-49),
//       { time: newSample.time, voltage: newSample.voltage },
//     ]);

//     // analogicznie: powerData, energyData...
//   }, 60000); // co minutę

//   return () => clearInterval(interval);
// }, []);

  return (
    <div className="dashboard-container">
      <UserMenu />
      <header className="dashboard-header">
        <h1 className="dasboard-title">Witaj, {user?.email}!</h1>
      </header>
      <div className="dashboard-content">
        <section className="stats-section">
          <h2>Aktualne dane</h2>
          <ul>
            <li>Napięcie: {stats.voltage} V</li>
            <li>Natężenie halogeny: {stats.currentHalogen} A</li>
            <li>Natężenie LED-y: {stats.currentLED} A</li>
            <li>Moc: {stats.power} W</li>
            <li>Zużycie energii: {stats.energy} Wh</li>
          </ul>
        </section>

        <section className="charts-section">
          <h2>Wykresy (demo)</h2>

          {/* --- Napięcie --- */}
          <AccordionChart
            title="Wykres napięcia [V]"
            data={demoVoltageData}
            dataKey="voltage"
            color="#FF00FF"
          />

          {/* --- Moc --- */}
          <AccordionChart
            title="Wykres mocy [W]"
            data={demoPowerData}
            dataKey="power"
            color="#ff0000"
          />

          {/* --- Energia --- */}
          <AccordionChart
            title="Wykres energii [Wh]"
            data={demoEnergyData}
            dataKey="energy"
            color="#ffb600"
          />

          {/* --- Natężenie LED/Halogen --- */}
          <AccordionChart
            title="Natężenie prądu: LED vs Halogeny [A]"
            data={demoCurrentData}
            multipleLines={[
              { dataKey: "led", color: "#00FFFF", label: "LED" },
              { dataKey: "halogen", color: "#00ff00", label: "Halogeny" },
            ]}
          />

        </section>
      </div>
    </div>
  );
}
