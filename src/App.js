import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import Chart from './components/Chart'

const App = () => {

    const URL = "http://api.marketstack.com/v1/tickers";
    const api_access_key = "01fbdcc45c8b88f9dff8c46a5ea25526";

    const [stockData, setStockData] = useState([]);
    const [stockPrice, setStockPrice] = useState([]);

    useEffect(() => {
        const getStockData = (symbol) => {
            axios.get(`${URL}/${symbol}?access_key=${api_access_key}`)
                .then((res) => {
                    setStockData(res.data);
                    console.log(res.data);
                }).catch((e) => {
                    console.log(e);
                    alert('通信に失敗しました');
                });

            axios.get(`${URL}/${symbol}/eod/latest?access_key=${api_access_key}`)
                .then((res) => {
                    setStockPrice(res.data);
                    console.log(res.data);
                }).catch((e) => {
                    console.log(e);
                    alert('通信に失敗しました');
                })
        }
        getStockData("TSLA")
    }, [])

    return (
        <div>
            <h2 className="companyName">{stockData.name}</h2>
            <p>【日付】{stockPrice.date}</p>
            <p>始値：{stockPrice.open}</p>
            <p>終値：{stockPrice.close}</p>
            <p>最安値：{stockPrice.low}</p>
            <p>最高値：{stockPrice.high}</p>
            <Chart />
        </div>
    )
}

export default App
