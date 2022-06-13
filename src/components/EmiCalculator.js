import "./EmiCalculator.css";
import React, { useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);


const EmiCalculator = () => {

  const [loanAmount, setLoanAmount] = useState(3000000);
  const [interestRate, setInterestRate] = useState(9);
  const [loanTerm, setLoanTerm] = useState(25);


  let monthlyInterestRate = interestRate / 12 / 100;
  let loanTermMonths = loanTerm * 12;
  let emi = ((loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, loanTermMonths)) /
    (Math.pow(1 + monthlyInterestRate, loanTermMonths) - 1)).toFixed(0);
  let totalAmount = emi * loanTermMonths;
  let interest = totalAmount - loanAmount;
  const data = {
    labels: ["Interest payable", "Principal amount"],
    datasets: [
      {
        data: [interest, loanAmount],
        backgroundColor: ["rgb(255, 165, 0)", "rgb(124, 181, 236)"],
        borderColor: ["rgb(255, 165, 0)", "rgb(124, 181, 236)"],
        borderWidth: 1,
        cutout: '80%',
        pointBackgroundColor: "rgba(255,206,86,0.2)",
      },
    ],
  };
  

  return (
    <div className="container">
      <div className="py-3">
        <div className="emi-article">
          <div className="emi-title text-center mb-4">EMI Calculator</div>
          <div className="row align-items-center">
            <div className="col-lg-7 col-md-12 col-12 pr-sm-4">
              <div className="mt-3">
                <div className="d-flex label-div">
                  <h4 className="label-heading d-inline-block">LOAN AMOUNT</h4>
                  <input type="number" value={loanAmount} onChange={(e)=>{
                      if(e.target.value.length === 12) return false;
                      if(e.target.value>50000000) setLoanAmount(50000000)
                      else if(e.target.value === '') setLoanAmount(0)
                      else setLoanAmount(e.target.value);
                    }}
                    min={0} max={50000000} className="input-class"/>
                </div>
                <div className="slider-parent">
                  <input
                    type="range"
                    min="0"
                    max="50000000"
                    className="input-range"
                    value={loanAmount}
                    onChange={({ target: { value: radius } }) =>
                      setLoanAmount(radius)
                    }
                  />
                </div>
                <span className="text-value">0</span>
                <span className="maxlimit-text text-value">5CR</span>
              </div>
              <div className="mt-3">
                <div className="d-flex label-div">
                  <h4 className="label-heading d-inline-block">
                    INTEREST RATE
                  </h4>
                  <input type="number" value={interestRate} onChange={(e)=>{
                      if(e.target.value.length === 6) return false;
                      if(e.target.value>15) setInterestRate(15)
                      else if(e.target.value === '') setInterestRate(0)
                      else setInterestRate(e.target.value);
                    }} 
                    min={0} max={15} className="input-class"/>
                </div>
                <div className="slider-parent">
                  <input
                    type="range"
                    min="0"
                    max="15"
                    className="input-range"
                    value={interestRate}
                    onChange={({ target: { value: radius } }) =>
                      setInterestRate(radius)
                    }
                  />
                </div>
                <span className="text-value">0</span>
                <span className="maxlimit-text text-value">15%</span>
              </div>
              <div className="mt-3">
                <div className="d-flex label-div">
                  <h4 className="label-heading d-inline-block">
                    LOAN TERM (Years)
                  </h4>
                  <input type="number" value={loanTerm} onChange={(e)=>{
                      if(e.target.value.length === 3) return false;
                      if(e.target.value>30) setLoanTerm(30)
                      else if(e.target.value === '') setLoanTerm(0)
                      else setLoanTerm(e.target.value);
                    }} 
                    min={0} max={30} className="input-class"/>
                </div>
                <div className="slider-parent">
                  <input
                    type="range"
                    min="0"
                    max="30"
                    className="input-range"
                    value={loanTerm}
                    onChange={({ target: { value: radius } }) =>
                      setLoanTerm(radius)
                    }
                  />
                </div>
                <span className="text-value">0</span>
                <span className="maxlimit-text text-value">30 Year</span>
              </div>
            </div>
            <div className="col-lg-5 col-md-12 col-12">
              <div className="loan-chart mb-3">
                <div className="chart">
                  <Doughnut data={data} className="doughnut" options={{
                    responsive: true,
                    maintainAspectRatio: false
                  }} />
                  <div className="text-center chart-center-div">
                    <p className="mb-0">Total Amount</p>
                    <p className="mb-0">(Loan + Interest)</p>
                    <p className="mb-0">{totalAmount.toLocaleString('EN-IN')}</p>
                  </div>
                </div>
              </div>
              <div className="proxy-container">
                <div>
                  <p className="chart-thumbnail" style={{backgroundColor:'#e77817'}}></p>
                  <p className="element-name mb-0">Monthly EMI</p>
                  <p className="value-text">₹ {emi.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</p>
                </div>
                <div>
                  <p className="chart-thumbnail" style={{backgroundColor:'#a0bfdc'}}></p>
                  <p className="element-name mb-0">Principal</p>
                  <p className="value-text">₹ {loanAmount.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</p>
                </div>
                <div>
                  <p className="chart-thumbnail" style={{backgroundColor:'#e77817'}}></p>
                  <p className="element-name mb-0">Interest Payable</p>
                  <p className="value-text">₹ {interest.toLocaleString('EN-IN')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmiCalculator;
