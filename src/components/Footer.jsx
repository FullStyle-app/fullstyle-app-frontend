import React from 'react';
import '../CSS/Footer.css';
import githubblue from '../img/github-icon-blue.png';

function Footer() {
  return (
    <footer className="footer">

  


      <div className='thankyou'>
        <a
          href="https://github.com/FullStyle-app"
          target="_blank"
        >
          <img src={githubblue} alt="github-logo" />
        </a>
      </div>

    </footer>
  );
}

export default Footer;
