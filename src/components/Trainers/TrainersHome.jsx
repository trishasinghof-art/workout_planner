import React from 'react'
import Header from '../Common/Header';
import Footer from '../Common/Footer';
import Trainers from './Trainers';

function TrainersHome({ title, description }) {
  return (
    <>
    <Header/>
    <Trainers/>
    <Footer/>
    </>
  );
}

export default TrainersHome;
