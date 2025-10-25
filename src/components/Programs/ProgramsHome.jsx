import React from 'react'
import Programs from './Programs';
import Header from '../Common/Header';
import Footer from '../Common/Footer';

function ProgramsHome({ title, description }) {
  return (
    <>
    <Header/>
    <Programs/>
    <Footer/>
    </>
  );
}

export default ProgramsHome;
