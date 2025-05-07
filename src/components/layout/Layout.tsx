import React from 'react';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
  onJoinClick: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, onJoinClick }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header onJoinClick={onJoinClick} />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;