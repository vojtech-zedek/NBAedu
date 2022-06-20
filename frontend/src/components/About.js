import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';

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

export default function About() {
  const { loading, error, data } = useQuery(ABOUT);

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error...</p>

  return (
    <div className='font-poppinsl' id='about'>
      <div className='flex items-center justify-center h-screen flex-col'>
        <div className='flex items-center justify-center'>
          <div className='items-center text-3xl md:text-5xl font-helvetica' data-aos='fade' data-aos-once='true'>
            <p>About</p>
          </div>
        </div>
        <div className='w-3/4 md:w-3/5 pt-6 md:pt-8 text-md md:text-xl text-start md:text-justify' data-aos='fade-up' data-aos-delay='600' data-aos-once='true'>
          <ReactMarkdown>{data.about.data.attributes.text.substring(0,856)}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
