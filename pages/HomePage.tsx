import React from 'react';
import type { Page } from '../types';

interface HomePageProps {
  onNavigate: (page: Page) => void;
}

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
    <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300">
        <div className="flex justify-center items-center mb-4 text-brand-green">{icon}</div>
        <h3 className="text-xl font-bold mb-2 text-gray-800">{title}</h3>
        <p className="text-gray-600">{description}</p>
    </div>
);

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <div className="text-center">
      <section 
        className="bg-cover bg-center rounded-lg shadow-lg text-white py-20 px-4 mb-12" 
        style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://picsum.photos/1200/400?image=1059')` }}
      >
        <h1 className="text-5xl font-extrabold mb-4">Fresh from the Farm, Directly to You</h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto">KisanBazaar connects you with local farmers for the freshest produce, dairy, and more. Empowering farmers, nourishing communities.</p>
        <button
          onClick={() => onNavigate('marketplace')}
          className="bg-brand-green text-white font-bold py-3 px-8 rounded-full hover:bg-brand-green-dark transition-transform duration-300 transform hover:scale-105 text-lg"
        >
          Explore Marketplace
        </button>
      </section>

      <section className="py-12">
        <h2 className="text-3xl font-bold mb-8 text-gray-800">Why Choose Kisan-Marketplace?</h2>
        <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
                icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" /></svg>}
                title="Support Local Farmers"
                description="Buy directly from the hands that grow your food. Ensure fair prices and support local economies."
            />
            <FeatureCard 
                icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-12v4m-2-2h4m6 4v4m-2-2h4M17 3l4 4M3 17l4 4" /></svg>}
                title="Guaranteed Freshness"
                description="Get produce that's harvested just for you. Shorter supply chains mean fresher, more nutritious food."
            />
            <FeatureCard 
                icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>}
                title="AI-Powered Farming"
                description="Our Gemini-powered tools help farmers with crop suggestions and weather insights for smarter farming."
            />
        </div>
      </section>
    </div>
  );
};

export default HomePage;