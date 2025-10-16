  import React from 'react';
  import { BrowserRouter, Routes, Route } from 'react-router-dom';
  import HomePage from './components/HomePage';
  import ProductList from './components/ProductList';
  import About from './components/About';
  import AdminDashboard from './pages/AdminDashboard';
  import AdminLogin from './pages/AdminLogin'; 
  import ProtectedRoute from './components/ProtectedRoute'; 
  import ScrollHeader from './components/ScrollHeader';
  import Footer from './components/Footer';
  import './App.css';

  function App() {
    return (
      <BrowserRouter>
        <div className="App">
      
          <ScrollHeader />
          
          {/* Routes */}
          <main className="main-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={<ProductList />} />
              <Route path="/about" element={<About />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              } />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }

  export default App;