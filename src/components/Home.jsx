import React from 'react';
import '../App.css';
import Header from './Common/Header';
import Hero from './Hero';
import Programs from './Programs/Programs';  
import Trainers from './Trainers/Trainers';
import Overview from './Overview';
import Membership from './Membership';
import Testimonials from './Testimonials';
import Blog from './Blog/Blog';
import JoinCta from './JoinCta';
import SignIn from './Signin/SignIn';
import Footer from './Common/Footer';


function Home() {
  return (
    <>
      <Header />
      <Hero />
      <Programs />
      <Trainers />
      <Overview />
      <Membership />
      <Testimonials />
      <Blog />
      <JoinCta />
      <SignIn />
      <Footer />
    </>
  );
}

export default Home;