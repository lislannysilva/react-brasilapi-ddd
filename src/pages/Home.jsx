import { useState, useEffect } from "react";

export default function Home() {
  const [ddd, setDdd] = useState("");
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (ddd.length === 2) {
      buscarDDD();
    }
  }, [ddd]);

  async function buscarDDD() {
    try {
      setLoading(true);

      const response = await fetch(`https://brasilapi.com.br/api/ddd/v1/${ddd}`);
      const data = await response.json();

      setInfo(data);
    } catch (error) {
      console.log("Erro ao buscar DDD:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="app-box">
      <h1>📞 Consulta de DDD</h1>

      <div className="input-area">
        <input
          type="text"
          placeholder="Digite o DDD..."
          maxLength={2}
          value={ddd}
          onChange={(e) => setDdd(e.target.value)}
        />

        <button onClick={buscarDDD}>Buscar</button>
      </div>

      {loading && <p className="loading">🔄 Carregando...</p>}

      {info && (
        <div className="result fade-in">
          <h2>📍 Estado: <span>{info.state}</span></h2>

          <h3>🏙️ Cidades:</h3>
          <ul>
            {info.cities.map((cidade, index) => (
              <li key={index}>• {cidade}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
