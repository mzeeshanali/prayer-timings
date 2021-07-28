import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import Link from 'next/link';

const Index = () => {
  const [cityName, setCityName] = useState('');
  const [countryName, setCountryName] = useState('');
  const [result, setResult] = useState([]);
  const [isError, setIsError] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();

    fetch(
      `http://api.aladhan.com/v1/timingsByCity?city=${cityName}&country=${countryName}&method=8`
    )
      .then((response) => response.json())
      .then((data) => {
        setResult([...result, data]);

        Object.values(data?.data?.timings);
        setTimings(Object.values(data?.data?.timings));
        setParsedTimings(moment(Object.values(data?.data?.timings)));
        console.log('code', data?.data?.code);
        data?.code === 200 ? setIsError(false) : setIsError(true);
      })
      .catch(() => {
        console.log('Request Failed');
        setIsError(true);
      });
  };

  return (
    <>
      <div className='page-wrapper bg-color-1'>
        <div className='navbar'>
          <Link href='/'>
            <a>Home {''}</a>
          </Link>
          <Link href='/about'>
            <a>About Author</a>
          </Link>
        </div>
        <div className='title-text'> Search Prayer Timings</div>
        <div className=' p-b-120'>
          <div className='wrapper display-flex'>
            <div className='card card-7'>
              <div className='card-body'>
                <form className='form' method='POST' action='#'>
                  <div className='input-group input--large'>
                    <label className='label'>City Name</label>
                    <input
                      className='input--style-1'
                      type='text'
                      placeholder='Lahore, Islamabad...'
                      name='going'
                      value={cityName}
                      onChange={(e) => {
                        setCityName(e?.target?.value);
                      }}
                    />
                  </div>

                  <div className='input-group input--medium'>
                    <label className='label'>Country Name</label>
                    <input
                      className='input--style-1'
                      type='text'
                      name='checkout'
                      placeholder='Pakistan, UK...'
                      id='input-end'
                      value={countryName}
                      onChange={(e) => {
                        setCountryName(e?.target?.value);
                      }}
                    />
                  </div>
                  {console.log(result)}
                  <button
                    className='btn-submit'
                    type='submit'
                    onClick={(e) => {
                      handleSearch(e);
                    }}
                  >
                    search
                  </button>
                </form>
              </div>
            </div>
          </div>

          {result?.length !== 0 ? (
            <div className='table-container'>
              <table className='styled-table'>
                <thead>
                  <tr>
                    <th>Gregorian Date</th>
                    <th>Hijri</th>
                    <th>TimeZone</th>
                    <th>Timings</th>
                  </tr>
                </thead>
                <tbody>
                  {result?.map((res) => {
                    return (
                      <>
                        <tr>
                          <td>{res?.data?.date?.gregorian?.date}</td>
                          <td>{res?.data?.date?.hijri?.date}</td>
                          <td>{res?.data?.meta?.timezone}</td>
                          <td>
                            <table className='styled-table'>
                              <thead>
                                <tr>
                                  <th>Fajr</th>
                                  <th>Duhr</th>
                                  <th>Asr</th>
                                  <th>Maghrib</th>
                                  <th>Isha</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>{res?.data?.timings?.Fajr}</td>
                                  <td>{res?.data?.timings?.Dhuhr}</td>
                                  <td>{res?.data?.timings?.Asr}</td>
                                  <td>{res?.data?.timings?.Maghrib}</td>
                                  <td>{res?.data?.timings?.Isha}</td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>{' '}
                      </>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
    </>
  );
};

export default Index;
