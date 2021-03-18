import React, { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2'
import './Chart.css'
import axios from 'axios';

const Chart = () => {

    const URL = "http://api.marketstack.com/v1/eod";
    const api_access_key = "01fbdcc45c8b88f9dff8c46a5ea25526";

    const [stockData, setStockData] = useState([]);

    useEffect(() => {
        const getStockData = async (symbol) => {
            let data = []; //横軸:株価            
            let labels = []; //縦軸:日付            

            await axios.get(`${URL}?access_key=${api_access_key}&symbols=${symbol}&date_from=2021-01-01&date_to=2021-03-01&sort=ASC`)
                //最後の「sort=ASC」とすることで、日付の小さい方からデータを取得できる
                .then((res) => {
                    for (let stock of res.data.data) {
                        data.push(stock.close) //「close」は1日の終値
                        labels.push(stock.date)
                    }
                });
            setStockData({
                labels: labels,
                datasets: [
                    {
                        borderColor: 'rgba(35, 200, 153, 1)',
                        data: data,
                        lineTension: 0
                    }
                ]
            })
        }
        getStockData('TSLA');
    }, [])




    const options = {
        //上部に表示される「凡例」の説明をfalseにする
        legend: {
            display: false
        },
        // scales: {
        //     xAes: [{
        //         display: true
        //     }],
        //     yAxes: [{
        //         display: false
        //     }],
        // }
    }


    return (
        <div>
            <div className="line">
                <Line data={stockData} options={options} />
            </div>
        </div>
    )
}

export default Chart
