import React from 'react';

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <p>Thank you to the Ironhack family!</p>
          </div>
          <div className="col-md-6">
            <p>
              Check out the source code on{' '}
              <a
                href="https://github.com/FullStyle-app"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
