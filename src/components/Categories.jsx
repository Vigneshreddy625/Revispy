import React, { useState, useEffect } from 'react';
import { faker } from '@faker-js/faker';
import { Checkbox } from "./ui/checkbox";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";

const generateInterests = () => {
  return Array.from({ length: 50 }, () => ({
    id: faker.string.uuid(),
    name: faker.commerce.department(),
    checked: false
  }));
};

const ITEMS_PER_PAGE = 6;

const Categories = () => {
  const [interests, setInterests] = useState(() => {
    const savedInterests = sessionStorage.getItem('userInterests');
    return savedInterests ? JSON.parse(savedInterests) : generateInterests();
  });
  
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    sessionStorage.setItem('userInterests', JSON.stringify(interests));
  }, [interests]);

  const handleInterestToggle = (id) => {
    setInterests(interests.map(interest =>
      interest.id === id ? { ...interest, checked: !interest.checked } : interest
    ));
  };

  const totalPages = Math.ceil(interests.length / ITEMS_PER_PAGE);
  const currentInterests = interests.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

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

        <div className="mb-4">
          <h2 className="text-sm font-medium mb-4">My saved interests!</h2>
          <div className="space-y-4">
            {currentInterests.map((interest) => (
              <div key={interest.id} className="flex items-center space-x-2">
                <Checkbox
                  id={interest.id}
                  checked={interest.checked}
                  onCheckedChange={() => handleInterestToggle(interest.id)}
                  className="rounded border-gray-300"
                />
                <label
                  htmlFor={interest.id}
                  className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {interest.name}
                </label>
              </div>
            ))}
          </div>
        </div>

        <Pagination className="mt-6">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                className={currentPage === 1 ? 'cursor-not-allowed opacity-50' : ''}
              />
            </PaginationItem>
            
            {currentPage > 2 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            
            {pageNumbers
              .filter(num => Math.abs(num - currentPage) <= 1)
              .map((num) => (
                <PaginationItem key={num}>
                  <PaginationLink
                    onClick={() => setCurrentPage(num)}
                    isActive={currentPage === num}
                  >
                    {num}
                  </PaginationLink>
                </PaginationItem>
              ))}
            
            {currentPage < totalPages - 1 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            
            <PaginationItem>
              <PaginationNext
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                className={currentPage === totalPages ? 'cursor-not-allowed opacity-50' : ''}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default Categories;