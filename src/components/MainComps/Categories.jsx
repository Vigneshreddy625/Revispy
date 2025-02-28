import React, { useState, useEffect } from 'react';
import { faker } from '@faker-js/faker';
import { Checkbox } from "../ui/checkbox";




const Categories = () => {
  
  return (
    <div className="md:w-full flex items-center justify-center">
      <div className="rounded-lg p-8 w-full max-w-md shadow-sm border">
        <h1 className="text-xl font-semibold text-center mb-2">
          Please mark your interests!
        </h1>
        <p className="text-center text-sm text-gray-700 dark:text-gray-400 mb-1">
          We will keep you notified.
        </p>
        <hr className='mb-6' />
      </div>
    </div>
  );
};

export default Categories;