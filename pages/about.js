import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const about = () => {
  return (
    <>
      <div className='navbar'>
        <Link href='/'>
          <a>Home {''}</a>
        </Link>
        <Link href='/about'>
          <a>About Author</a>
        </Link>
      </div>

      <section className='heading'>
        <a>
          <Image
            priority
            src='/images/profile.jpg'
            className='borderCircle'
            height={100}
            width={130}
            alt='name'
          />
        </a>
        <p>
          I am a Associate Software Engineer with hands on experience in
          ReactJS.
        </p>
        <p>
          (This is a sample website - you’ll be building a site like this on{' '}
          <a href='https://nextjs.org/learn'>our Next.js tutorial</a>.)
        </p>
      </section>
    </>
  );
};

export default about;
