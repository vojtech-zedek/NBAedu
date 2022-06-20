import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Link } from 'react-router-dom';

const TEAMS = gql`
query GetTeams {
    teams {
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
          featured_player {
            data {
                attributes {
                    url
                }
            }
          }
        }
      }
    }
  }
`;

export default function Cards() {
  const { loading, error, data } = useQuery(TEAMS);

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error...</p>

  return (
    <div className='font-poppinsl' id='teams'>
      <div className='flex items-center justify-center h-screen flex-col'>
        <div className='flex items-center justify-center'>
          <div className='items-center text-3xl md:text-5xl font-helvetica' data-aos='fade' data-aos-once='true'>
            <p>Teams</p>
          </div>
        </div>
        <div className='grid grid-cols-2 md:grid-cols-4 pt-6 md:pt-8'>
          {data.teams.data.map(team => (
            <div key={team.id} data-aos='fade-up' data-aos-delay='600' data-aos-once='true'>
              <Link to={`/teams/${team.id}`}>
                <div className='bg-cover bg-no-repeat bg-center w-36 h-36 md:w-60 md:h-60 m-4 md:m-6 rounded-xl shadow-md hover:shadow-xl hover:scale-110 duration-300'
                  style={{
                    backgroundImage: `url(http://localhost:1337${team.attributes.featured_player.data.attributes.url})`
                  }}>
                  <img className='w-14 md:w-20 p-2' src={`http://localhost:1337${team.attributes.logo.data.attributes.url}`} alt="Logo" />
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
