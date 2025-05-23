
import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="bg-eventease-950 text-white py-10">
      <div className="container mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">EventEase</h3>
            <p className="text-sm text-gray-300">
              Your one-stop platform for discovering and managing events.
            </p>
          </div>
          <div>
            <h4 className="text-md font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-gray-300 hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/events" className="text-sm text-gray-300 hover:text-white">
                  All Events
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-sm text-gray-300 hover:text-white">
                  Login
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-md font-bold mb-4">Event Categories</h4>
            <div className="grid grid-cols-2 gap-2">
              <Link to="/events?category=music" className="text-sm text-gray-300 hover:text-white">
                Music
              </Link>
              <Link to="/events?category=tech" className="text-sm text-gray-300 hover:text-white">
                Tech
              </Link>
              <Link to="/events?category=workshop" className="text-sm text-gray-300 hover:text-white">
                Workshops
              </Link>
              <Link to="/events?category=business" className="text-sm text-gray-300 hover:text-white">
                Business
              </Link>
              <Link to="/events?category=fitness" className="text-sm text-gray-300 hover:text-white">
                Fitness
              </Link>
              <Link to="/events?category=food" className="text-sm text-gray-300 hover:text-white">
                Food
              </Link>
            </div>
          </div>
          <div>
            <h4 className="text-md font-bold mb-4">Contact Us</h4>
            <p className="text-sm text-gray-300 mb-2">
              Have questions? Reach out to our support team.
            </p>
            <p className="text-sm text-gray-300">support@eventease.com</p>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-400">
          &copy; {new Date().getFullYear()} EventEase. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
