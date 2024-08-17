import React, { useContext } from 'react';
import { Navbar, Dropdown, Avatar } from 'flowbite-react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../Providers/AuthProvider';

const Header = () => {
  const { logOutUser, user } = useContext(AuthContext); // Get authentication status and logOutUser function from AuthContext
  const navigate = useNavigate(); // Initialize useNavigate for redirection

  const navLinks = [
    { path: '/', label: 'Shop', active: true, status: '' }, // Home is enabled
    { path: '/about', label: 'About', active: false, status: 'disable' },
    { path: '/services', label: 'Services', active: false, status: 'disable' },
    { path: '/pricing', label: 'Pricing', active: false, status: 'disable' },
    { path: '/contact', label: 'Contact', active: false, status: 'disable' },
  ];

  const handleSignOut = async () => {
    await logOutUser();
    navigate('/login');
  };

  return (
    <Navbar fluid={true} rounded={true} className='bg-[D1E9F6]'>
      <Navbar.Brand as={Link} to="/">
        {/* <img
          src="/public/logo.png"
          className="mr-3 w-10 md:w-60 md:h-24"
          alt="Logo"
        /> */}
        <span className="self-center whitespace-nowrap text-xl md:text-3xl lg:text-4xl font-semibold dark:text-white">
         Products Planet
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        {user ? (
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
            <Dropdown.Item onClick={handleSignOut}>Sign out</Dropdown.Item> {/* Add onClick to handle sign-out */}
          </Dropdown>
        ) : (
          <Link to="/login" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Login</Link>
        )}
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
