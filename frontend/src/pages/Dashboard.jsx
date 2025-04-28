import React, { useEffect, useState } from 'react';
import api from '../api'; // Your API utility
import '../styles/Dashboard.css'; // Dashboard styles
import { FaMoneyBillWave, FaChartPie, FaPiggyBank } from 'react-icons/fa';
import { BarChart, Bar, PieChart, Pie, Cell, Tooltip, Legend, XAxis, YAxis, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  const [financialData, setFinancialData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFinancialData = async () => {
      try {
        // Mock data for testing if API fails
        // const res = await api.post('/api/fetch-financial-record/', {});
        const res = { data: { salary: 5000, budget: 2000, investments_pct: 20 } }; // Mocked response
        console.log(res.data); // Log the response data
        setFinancialData(res.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch financial data');
        console.error('Fetch error:', err);
      }
    };

    fetchFinancialData();
  }, []);

  // Dummy data for graphs (expenses breakdown and savings vs investments)
  const expenseData = [
    { category: 'Rent', amount: 800 },
    { category: 'Food', amount: 300 },
    { category: 'Utilities', amount: 150 },
    { category: 'Entertainment', amount: 100 }
  ];

  const savingsInvestmentData = [
    { name: 'Investments', value: 30 },
    { name: 'Savings', value: 20 },
    { name: 'Expenses', value: 50 }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FF8042'];

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Welcome back to FinTrak!</p>
      </header>

      {error && <div className="error-message">{error}</div>}

      {financialData ? (
        <main className="dashboard-main">
          {/* Financial Summary Cards */}
          <section className="summary-cards">
            <div className="card">
              <FaMoneyBillWave className="card-icon" />
              <h3>Monthly Salary</h3>
              <p>{financialData.salary ? `$${financialData.salary}` : 'N/A'}</p>
            </div>

            <div className="card">
              <FaChartPie className="card-icon" />
              <h3>Monthly Budget</h3>
              <p>{financialData.budget ? `$${financialData.budget}` : 'N/A'}</p>
            </div>

            <div className="card">
              <FaPiggyBank className="card-icon" />
              <h3>Investment %</h3>
              <p>{financialData.investments_pct ? `${financialData.investments_pct}%` : 'N/A'}</p>
            </div>
          </section>

          {/* Insights Section */}
          <section className="insights">
            <h2>Financial Insights</h2>
            <div className="charts-container">
              {/* Bar Chart for Monthly Expenses Breakdown */}
              <div className="chart-wrapper">
                <h3>Monthly Expenses Breakdown</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={expenseData}>
                    <XAxis dataKey="category" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="amount" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Pie Chart for Investment vs Savings */}
              <div className="chart-wrapper">
                <h3>Investment vs Savings</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={savingsInvestmentData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#82ca9d"
                      label
                    >
                      {savingsInvestmentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </section>
        </main>
      ) : (
        <div className="loading-message">Loading financial data...</div>
      )}
    </div>
  );
};

export default Dashboard;
