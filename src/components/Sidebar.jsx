import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaTachometerAlt, FaWater } from 'react-icons/fa'; // Importing icons

const Sidebar = () => {
  const location = useLocation(); // To highlight the active link

  // Sidebar links with icons
  const links = [
    { path: '/admin', label: 'Dashboard', icon: <FaTachometerAlt data-icon="tachometer-alt" /> },
    { path: '/admin/banjir', label: 'Banjir', icon: <FaWater data-icon="faWater" /> },
  ];

  return (
    <aside className="w-64 bg-indigo-900 text-white min-h-screen">
      <div className="p-4">
        <h2 className="text-2xl font-bold">Admin Panel</h2>
        <nav className="ml-4 mt-10">
          <ul>
            {links.map((link) => (
              <li
                key={link.path}
                className={`flex items-center mt-7 my-3 space-x-3 ${
                  location.pathname === link.path ? 'text-indigo-500' : 'hover:text-indigo-500'
                }`}
              >
                <span className="text-xl">{link.icon}</span>
                <Link to={link.path}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
