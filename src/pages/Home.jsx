import React from 'react';
import HeroSection from "../components/HeroSection"
import MealPlannerForm from '../components/MealPlannerForm';
import ScrollToTop from '../components/ScrollToTop';

const Home = () => {
  return (
    <div>
      <ScrollToTop/>
      <HeroSection/>
      <MealPlannerForm/>
    </div>
  );
}

export default Home;
