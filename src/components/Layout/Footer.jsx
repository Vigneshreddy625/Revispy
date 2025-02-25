import React from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';

function Footer() {
  return (
    <footer className="border-t py-12 shadow-sm">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Store</h3>
            <p className="mb-4">Your one-stop destination for all your shopping needs. Join our newsletter to stay updated!</p>
            <form className="flex items-center border rounded-lg overflow-hidden">
              <input 
                type="email" 
                placeholder="Your email" 
                className="flex-1 px-4 py-2 text-sm focus:outline-none bg-transparent" 
              />
              <button 
                type="submit" 
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 transition text-white text-sm">
                Subscribe
              </button>
            </form>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-indigo-500 transition">About Us</a></li>
              <li><a href="#" className="hover:text-indigo-500 transition">Contact</a></li>
              <li><a href="#" className="hover:text-indigo-500 transition">Blog</a></li>
              <li><a href="#" className="hover:text-indigo-500 transition">FAQs</a></li>
              <li><a href="#" className="hover:text-indigo-500 transition">Shipping & Returns</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-indigo-500 transition">Track Order</a></li>
              <li><a href="#" className="hover:text-indigo-500 transition">My Account</a></li>
              <li><a href="#" className="hover:text-indigo-500 transition">Wishlist</a></li>
              <li><a href="#" className="hover:text-indigo-500 transition">Customer Support</a></li>
              <li><a href="#" className="hover:text-indigo-500 transition">Payment Methods</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Contact Info</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 " />
                <span>Srinagar colony, Ongole</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-5 w-5 " />
                <span>support@mvr.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-5 w-5 " />
                <span>(123) 456-7890</span>
              </li>
              <li className="flex items-center space-x-2">
                <span>Mon - sat: 9:00 AM - 6:00 PM</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p>&copy; 2025 Store. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-indigo-500 transition">Privacy Policy</a>
            <a href="#" className="hover:text-indigo-500 transition">Terms of Service</a>
            <a href="#" className="hover:text-indigo-500 transition">Cookie Policy</a>
          </div>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-blue-500 transition"><Facebook className="h-6 w-6" /></a>
            <a href="#" className="text-gray-400 hover:text-blue-500 transition"><Twitter className="h-6 w-6" /></a>
            <a href="#" className="text-gray-400 hover:text-blue-500 transition"><Instagram className="h-6 w-6" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
