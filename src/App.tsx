import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import CitiesPage from './pages/CitiesPage';
import CityDetailPage from './pages/CityDetailPage';
import ComparisonPage from './pages/ComparisonPage';
import MapPage from './pages/MapPage';
import JoinOverlay from './components/JoinOverlay';

function App() {
  const [showJoinOverlay, setShowJoinOverlay] = useState(false);

  return (
    <Router>
      <Layout onJoinClick={() => setShowJoinOverlay(true)}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cities" element={<CitiesPage />} />
          <Route path="/city/:cityId" element={<CityDetailPage />} />
          <Route path="/compare" element={<ComparisonPage />} />
          <Route path="/map" element={<MapPage />} />
        </Routes>
      </Layout>
      {showJoinOverlay && (
        <JoinOverlay onClose={() => setShowJoinOverlay(false)} />
      )}
    </Router>
  );
}

export default App;