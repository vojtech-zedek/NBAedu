import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';

const TEAM = gql`
query GetTeam($id: ID!) {
  team(id: $id) {
    data {
      id
      attributes {
        logo {
          data {
            attributes {
              url
            }
          }
        }
        name
        about
        arena
        arena_photo {
          data {
            attributes {
              url
            }
          }
        }
        players {
          data {
            attributes {
              name
              number
            }
          }
        }
      }
    }
  }
}
`;

export default function Teams() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(TEAM, {
    variables: { id: id }
  });

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error...</p>

  return (
    <div className='font-poppinsl'>
      <div className='h-screen'>
        <div className='p-4'>
          <Link to={'/#teams'}><span className='border-b-2 border-transparent hover:border-nba-blue-hover duration-300 font-poppinsm'>← Go back</span></Link>
        </div>
        <div className='flex items-center flex-col'>
          <div className='flex items-center justify-center'>
            <div className='flex items-center text-3xl md:text-5xl font-helvetica md:mt-8' data-aos='fade' data-aos-once='true'>
              <div><img className='w-14 md:w-20 pr-2' src={`http://localhost:1337${data.team.data.attributes.logo.data.attributes.url}`} alt="Logo" /></div>
              <div>{data.team.data.attributes.name}</div>
            </div>
          </div>
          <div className='w-3/4 md:w-3/5 pt-6 md:pt-8 text-md md:text-xl text-start md:text-justify' data-aos='fade-up' data-aos-delay='600' data-aos-once='true'>
            <ReactMarkdown>{data.team.data.attributes.about}</ReactMarkdown>
            <div className='flex justify-center flex-col mb-8'>
              <img className='pt-6 pb-2 max-w-xs md:max-w-lg self-center' src={`http://localhost:1337${data.team.data.attributes.arena_photo.data.attributes.url}`} alt="" />
              <p className='text-center'><span className='font-poppinsm'>Arena: </span>{data.team.data.attributes.arena}</p>
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}
