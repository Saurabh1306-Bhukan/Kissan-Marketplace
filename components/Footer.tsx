import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-6 text-center">
        <p>&copy; {new Date().getFullYear()} KisanMarketplace. All rights reserved.</p>
        <p className="text-sm text-gray-400 mt-1">Connecting Farmers, Empowering Communities.</p>
        <p className="text-xs text-gray-500 mt-2">Inspired by the work of CodeWithSaurabh.</p>
      </div>
    </footer>
  );
};

export default Footer;