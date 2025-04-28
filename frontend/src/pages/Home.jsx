<<<<<<< Updated upstream
function Home(){
    return <div>HOME</div>
}

export default Home
=======
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api'; // Import your api utility
import '../styles/Home.css';
import { FaMoneyBillWave, FaChartLine, FaHistory, FaLock, FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';

const Home = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    occupation: '',
    age: '',
    monthlySalary: '',
    budget: '',
    investmentPercentage: '',
    savingsPercentage: ''
  });

  const [previewData, setPreviewData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePreview = (e) => {
    e.preventDefault();
    setPreviewData({
      ...formData,
      investmentAmount: (parseFloat(formData.monthlySalary) * parseFloat(formData.investmentPercentage) / 100).toFixed(2),
      savingsAmount: (parseFloat(formData.monthlySalary) * parseFloat(formData.savingsPercentage) / 100).toFixed(2)
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Calculate remaining balance
      const remainingBalance = parseFloat(formData.monthlySalary) - 
                             parseFloat(formData.budget) -
                             (parseFloat(formData.monthlySalary) * parseFloat(formData.investmentPercentage) / 100) -
                             (parseFloat(formData.monthlySalary) * parseFloat(formData.savingsPercentage) / 100);

      const recordData = {
        name: formData.name,
        age: formData.age,
        occupation: formData.occupation,
        salary: formData.monthlySalary,
        budget: formData.budget,
        investments_pct: formData.investmentPercentage,
        savings_pct: formData.savingsPercentage,
        investments_amount: (parseFloat(formData.monthlySalary) * parseFloat(formData.investmentPercentage) / 100).toFixed(2),
        savings_amount: (parseFloat(formData.monthlySalary) * parseFloat(formData.savingsPercentage) / 100).toFixed(2),
        remaining_balance: remainingBalance.toFixed(2)
      };

      // Using your api utility
      const response = await api.post('/api/financial-records/', recordData);
      
      console.log('Record saved:', response.data);
      
      // Redirect to dashboard after successful save
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save financial record');
      console.error('Error saving record:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="home-container">
      {/* Header */}
      <header className="header">
        <div className="logo-container">
          <FaMoneyBillWave className="main-logo" />
          <h1>FinTrak</h1>
        </div>
        <p className="tagline">Your Personal Finance Companion</p>
      </header>

      {/* Main Content */}
      <main className="main-content">
        {/* About Section */}
        <section className="about-section">
          <h2>Welcome to FinTrak</h2>
          <p className="about-text">
            FinTrak is your ultimate monthly expenses tracker, designed to help you take control of your finances.
            Our platform ensures your financial data is always protected.
          </p>
        </section>

        {/* Services Section */}
        <section className="services-section">
          <h2>Our Services</h2>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">
                <FaMoneyBillWave />
              </div>
              <h3>Personalized Budgeting</h3>
              <p>Create custom budgets tailored to your income and spending habits.</p>
            </div>
            
            <div className="service-card">
              <div className="service-icon">
                <FaChartLine />
              </div>
              <h3>Expense Tracking</h3>
              <p>Monitor your daily expenses and identify spending patterns.</p>
            </div>
            
            <div className="service-card">
              <div className="service-icon">
                <FaHistory />
              </div>
              <h3>Transaction History</h3>
              <p>Maintain a complete record of all your financial transactions.</p>
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section className="form-section">
          <h2>Get Started</h2>
          {error && <div className="error-message">{error}</div>}
          <form className="financial-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={formData.name}
                  onChange={handleChange}
                  required 
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="occupation">Occupation</label>
                <input 
                  type="text" 
                  id="occupation" 
                  name="occupation" 
                  value={formData.occupation}
                  onChange={handleChange}
                  required 
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="age">Age</label>
                <input 
                  type="number" 
                  id="age" 
                  name="age" 
                  value={formData.age}
                  onChange={handleChange}
                  required 
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="monthlySalary">Monthly Salary ($)</label>
                <input 
                  type="number" 
                  id="monthlySalary" 
                  name="monthlySalary" 
                  value={formData.monthlySalary}
                  onChange={handleChange}
                  required 
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="budget">Monthly Budget ($)</label>
                <input 
                  type="number" 
                  id="budget" 
                  name="budget" 
                  value={formData.budget}
                  onChange={handleChange}
                  required 
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="investmentPercentage">Investment (%)</label>
                <input 
                  type="number" 
                  id="investmentPercentage" 
                  name="investmentPercentage" 
                  value={formData.investmentPercentage}
                  onChange={handleChange}
                  min="0"
                  max="100"
                  required 
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="savingsPercentage">Savings (%)</label>
                <input 
                  type="number" 
                  id="savingsPercentage" 
                  name="savingsPercentage" 
                  value={formData.savingsPercentage}
                  onChange={handleChange}
                  min="0"
                  max="100"
                  required 
                />
              </div>
            </div>
            
            <div className="form-buttons">
              <button type="button" className="preview-btn" onClick={handlePreview}>
                Preview
              </button>
            </div>
          </form>

          {/* Preview Section */}
          {previewData && (
            <div className="preview-section">
              <h3>Preview Your Information</h3>
              <div className="preview-data">
                <p><strong>Name:</strong> {previewData.name}</p>
                <p><strong>Occupation:</strong> {previewData.occupation}</p>
                <p><strong>Age:</strong> {previewData.age}</p>
                <p><strong>Monthly Salary:</strong> ${previewData.monthlySalary}</p>
                <p><strong>Monthly Budget:</strong> ${previewData.budget}</p>
                <p><strong>Investment:</strong> {previewData.investmentPercentage}% (${previewData.investmentAmount})</p>
                <p><strong>Savings:</strong> {previewData.savingsPercentage}% (${previewData.savingsAmount})</p>
              </div>
              <button 
                type="button" 
                className="save-btn" 
                onClick={handleSave}
                disabled={isLoading}
              >
                {isLoading ? 'Saving...' : 'Save Information'}
              </button>
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="social-links">
          <a href="#"><FaFacebook /></a>
          <a href="#"><FaTwitter /></a>
          <a href="#"><FaLinkedin /></a>
          <a href="#"><FaInstagram /></a>
        </div>
        <p className="copyright">© 2023 FinTrak. All rights reserved.</p>
        <button className="logout-btn">Logout</button>
      </footer>
    </div>
  );
};

export default Home;
>>>>>>> Stashed changes
