'use client';

import React from 'react';

export default function ErrorPage() {
  return (
    <div className='bg-gray-800 text-white text-center p-14 min-h-screen flex items-center justify-center'>
      <div>
        <h1 className='text-3xl font-semibold mb-4'>
          Oops something went wrong!
        </h1>
        <p>
          Make sure you have set up your .env file correctly. If you started app
          while localhost:3000 is busy app will use localhost:3001 by default.{' '}
        </p>
      </div>
    </div>
  );
}
