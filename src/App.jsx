import React, { useState, useEffect } from "react";


const currencies = ["EUR", "USD", "TRY"];

export default function App() {
  const [fromCurrency, setFromCurrency] = useState("EUR");
  const [toCurrency, setToCurrency] = useState("TRY");
  const [amount, setAmount] = useState(1);
  const [result, setResult] = useState(null);


  

  // Döviz kuru verisini çekmek için async fonksiyon (API'yi sonraki adımda ekleyeceğiz)
  const fetchExchangeRate = async () => {
    try {
    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`
    );
    const data = await res.json();
    console.log("API yanıtı:", data);

    if (data && data.rates && data.rates[toCurrency]) {
      setResult(data.rates[toCurrency]);
    } else {
      setResult(null);
    }
  } catch (error) {
    console.error("Kur alınırken hata:", error);
    setResult(null);
  }
  };

  // Her değişiklikte döviz kuru hesapla
  useEffect(() => {
    if (amount > 0) fetchExchangeRate();
  }, [fromCurrency, toCurrency, amount]);

  return (
    <div style={{ padding: 15, width: 300, fontFamily: "Arial, sans-serif" }}>
      <h2>Döviz Kuru Hesaplayıcı</h2>

      <div>
        <label>Kaynak Para Birimi:</label>
        <select
          value={fromCurrency}
          onChange={(e) => setFromCurrency(e.target.value)}
        >
          {currencies.map((cur) => (
            <option key={cur} value={cur}>
              {cur}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Hedef Para Birimi:</label>
        <select
          value={toCurrency}
          onChange={(e) => setToCurrency(e.target.value)}
        >
          {currencies.map((cur) => (
            <option key={cur} value={cur}>
              {cur}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Miktar:</label>
        <input
          type="number"
          min="0"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>

      <div style={{ marginTop: 15 }}>
        <strong>Sonuç: </strong>
        {result !== null ? result.toFixed(2) : "Yükleniyor..."} {toCurrency}
      </div>
    </div>
  );
}
