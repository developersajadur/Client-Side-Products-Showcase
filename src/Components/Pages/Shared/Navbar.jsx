// src/components/Navbar.js
import React from 'react';
import { Navbar, Dropdown, Avatar } from 'flowbite-react';
import { Link } from 'react-router-dom';

const Header = () => {
  const navLinks = [
    { path: '/', label: 'Home', active: true, status: '' }, // Home is enabled
    { path: '/about', label: 'About', active: false, status: 'disable' },
    { path: '/services', label: 'Services', active: false, status: 'disable' },
    { path: '/pricing', label: 'Pricing', active: false, status: 'disable' },
    { path: '/contact', label: 'Contact', active: false, status: 'disable' },
  ];

  return (
    <Navbar fluid={true} rounded={true} className='bg-[D1E9F6]'>
      <Navbar.Brand as={Link} to="/">
        <img
          src="https://flowbite.com/docs/images/logo.svg"
          className="mr-3 h-6 sm:h-9"
          alt="Logo"
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Flowbite Navbar
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Dropdown
          arrowIcon={false}
          inline={true}
          label={<Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded={true} />}
        >
          <Dropdown.Header>
            <span className="block text-sm">Bonnie Green</span>
            <span className="block truncate text-sm font-medium">name@flowbite.com</span>
          </Dropdown.Header>
          <Dropdown.Item>Dashboard</Dropdown.Item>
          <Dropdown.Item>Settings</Dropdown.Item>
          <Dropdown.Item>Earnings</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item>Sign out</Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        {navLinks.map((link) => (
          <Navbar.Link
            key={link.path}
            as={link.status !== 'disable' ? Link : 'span'}
            to={link.status !== 'disable' ? link.path : '#'}
            active={link.active}
            className={link.status === 'disable' ? 'text-gray-400 cursor-not-allowed' : ''}
            onClick={(e) => link.status === 'disable' && e.preventDefault()}
          >
            {link.label}
          </Navbar.Link>
        ))}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
