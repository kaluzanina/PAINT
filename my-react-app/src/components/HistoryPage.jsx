import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { useStats } from "../context/StatsContext";
import { useState, useEffect } from "react";
import UserMenu from "./UserMenu";
import "./HistoryPage.css"


export default function HistoryPage() {
    const { user } = useUser();
    const { stats } = useStats();
    const navigate = useNavigate();
    const [timeRange, setTimeRange] = useState("24h");
    
    const [data, setData] = useState([
    { time: "2025-05-21T08:00:00", voltage: 229, current: 0.3, power: 68, energy: 0.12 },
    { time: "2025-05-21T10:00:00", voltage: 231, current: 0.4, power: 92, energy: 0.18 },
    { time: "2025-05-21T12:00:00", voltage: 230, current: 0.35, power: 81, energy: 0.21 },
    { time: "2025-05-21T14:00:00", voltage: 228, current: 0.38, power: 86, energy: 0.27 },
    { time: "2025-05-21T16:00:00", voltage: 230, current: 0.36, power: 83, energy: 0.34 },
    { time: "2025-05-21T18:00:00", voltage: 232, current: 0.37, power: 86, energy: 0.42 },
  ]);

    const getHoursAgo = (hours) => {
        const now = new Date();
        return new Date(now.getTime() - hours * 60 * 60 * 1000);
    };
    const filteredData = data.filter((d) => {
        const entryTime = new Date(d.time);
        const cutoff = timeRange === "6h"
            ? getHoursAgo(6)
            : timeRange === "12h"
                ? getHoursAgo(12)
                : getHoursAgo(24);
        return entryTime >= cutoff;
    });

    //dark mode
    useEffect(() => {
    if (stats.power > 90) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [stats.power]);

    // Eksport danych do CSV
    const handleExport = () => {
        const csv = [
            ["Godzina", "Napięcie [V]", "Natężenie [A]", "Moc [W]", "Energia [Wh]"],
            ...data.map(d => [d.time, d.voltage, d.current, d.power, d.energy]),
        ]
            .map(row => row.join(","))
            .join("\n");

        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "historia_pomiarow.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="history-page">
            <UserMenu />
            <header className="history-header">
                <h1>Historia pomiarów – ostatnie 24h</h1>
            </header>
<section className="setters">
            <button onClick={handleExport} className="export-button">
                Eksportuj do CSV
            </button>

            <div className="time-filter">
  <label>Zakres danych: </label>
  <button onClick={() => setTimeRange("6h")} className={timeRange === "6h" ? "active" : ""}>6h</button>
  <button onClick={() => setTimeRange("12h")} className={timeRange === "12h" ? "active" : ""}>12h</button>
  <button onClick={() => setTimeRange("24h")} className={timeRange === "24h" ? "active" : ""}>24h</button>
</div>
</section>
<div className="history-table">
  <table>
    <thead>
      <tr>
        <th>Godzina</th>
        <th>Napięcie [V]</th>
        <th>Natężenie [A]</th>
        <th>Moc [W]</th>
        <th>Energia [Wh]</th>
      </tr>
    </thead>
    <tbody>
      {filteredData.length > 0 ? (
        filteredData.map((row, i) => (
          <tr key={i}>
            <td>{new Date(row.time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</td>
            <td>{row.voltage}</td>
            <td>{row.current}</td>
            <td>{row.power}</td>
            <td>{row.energy}</td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="5">Brak danych w wybranym zakresie.</td>
        </tr>
      )}
    </tbody>
  </table>
</div>



        </div>
    );
}
