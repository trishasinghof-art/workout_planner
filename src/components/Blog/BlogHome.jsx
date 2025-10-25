import React from 'react'
import Header from '../Common/Header';
import Footer from '../Common/Footer';
import Blog from './Blog';

function BlogHome({ title, description }) {
  return (
    <>
    <Header/>
    <Blog/>
    <Footer/>
    </>
  );
}

export default BlogHome;
