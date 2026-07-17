import React from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';

export default function Footer() {

    
  return (
    <footer className='footer text-center py-5 mt-5'>
      <div className='container'>
        
        {/* Internal Navigation Links */}
        <div className='mb-3'>
          <Link to='/info' className='mx-2 text-decoration-none'>About</Link>
          <span className='text-muted'>|</span>
          <Link to='/info' className='mx-2 text-decoration-none'>Privacy Policy</Link>
          <span className='text-muted'>|</span>
          <Link to='/info' className='mx-2 text-decoration-none'>Contact</Link>
        </div>

        {/* External Social Links */}
        <div className='mb-3 fs-4'>
          <a href='https://github.com/Anoop-2005' target='_blank' rel='noreferrer' className='mx-3'>
            <FaGithub />
          </a>
          <a href='https://twitter.com' target='_blank' rel='noreferrer' className='mx-3'>
            <FaTwitter />
          </a>
          <a href='https://www.linkedin.com/in/anoop-chauhan-0b5253315' target='_blank' rel='noreferrer' className='mx-3'>
            <FaLinkedin />
          </a>
        </div>

        <p className='mb-0 text-muted small'>
          © {new Date().getFullYear()} Enjoying Computer Science? All rights reserved.
        </p>

      </div>
    </footer>
  );
}