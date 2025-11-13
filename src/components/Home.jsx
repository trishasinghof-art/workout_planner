import React from 'react';
import '../App.css';
import Header from './Common/Header';
import Hero from './Hero';
import Programs from './Programs/Programs';
import Overview from './Overview';
import Testimonials from './Testimonials';
import Blog from './Blog/Blog';
import JoinCta from './JoinCta';

import Footer from './Common/Footer';


function Home() {
  return (
    <>
      <Header />
      <Hero />
      <Programs />
      <Overview />
      <Testimonials />
      <Blog />
      <JoinCta />
      <Footer />
    </>
  );
}

export default Home;