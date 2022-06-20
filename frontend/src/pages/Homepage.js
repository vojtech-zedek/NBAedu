import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';

import Navbar from '../components/Navbar';
import About from '../components/About';
import Cards from '../components/Cards';

import Logo from '../img/nba-logo-official.svg';

import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init();

document.onscroll = function () {
  const about = document.querySelector('#about');
  const teams = document.querySelector('#teams');
  const nav = document.querySelector('#nav');
  const navTeams = document.querySelector('#navTeams');
  const navAbout = document.querySelector('#navAbout');

  if (about.getBoundingClientRect().top <= 0) {
    nav.classList.remove('text-white');
    nav.classList.add('text-black');
    navAbout.classList.remove('border-transparent');
    navAbout.classList.add('border-nba-blue-hover');
  } else {
    nav.classList.remove('text-black');
    nav.classList.add('text-white');
    navAbout.classList.remove('border-nba-blue-hover');
    navAbout.classList.add('border-transparent');
  }

  if (teams.getBoundingClientRect().top <= 0) {
    navAbout.classList.remove('border-nba-blue-hover');
    navAbout.classList.add('border-transparent');
    navTeams.classList.remove('border-transparent');
    navTeams.classList.add('border-nba-blue-hover');
  } else {
    navTeams.classList.add('border-transparent');
    navTeams.classList.remove('border-nba-blue-hover');
  }
}

const ABOUT = gql`
query GetAbout {
  about {
    data {
      id
      attributes {
        text
      }
    }
  }
}
`;

export default function Homepage() {
  const { loading, error, data } = useQuery(ABOUT);

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error...</p>

  return (
    <div>
      <div className='bg-img bg-cover bg-no-repeat bg-center font-poppinsl'>
        <Navbar />
        <div className='text-white flex items-center justify-center h-screen flex-col' data-aos='fade' data-aos-delay='100' data-aos-duration='1000'>
          <div className='flex items-center justify-center space-x-[-16%]'>
            <div className='w-11/12'>
              <img src={Logo} alt="Logo" />
            </div>
            <div className='items-center text-3xl md:text-5xl font-helvetica'>
              <p>Where amazing happens.</p>
            </div>
          </div>
          <div className='w-3/4 md:w-1/2 mt-4 md:mt-10 text-lg md:text-xl text-opacity-75 text-white text-center md:text-justify'>
            <ReactMarkdown>
              {data.about.data.attributes.text.substring(0, 281) + '...'}
            </ReactMarkdown>
          </div>
          <div className='w-1/2 mt-4 md:mt-8 text-center font-poppinsm'>
            <a className='text-sm md:text-base text-nba-blue hover:text-nba-blue-hover transition-all duration-300' href="#about">
              <p>Read more</p>
              <p>↓</p>
            </a>
          </div>
        </div>
      </div>
      <About />
      <Cards />
    </div>
  );
}
