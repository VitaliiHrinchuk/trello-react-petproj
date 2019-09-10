import React from 'react';
import './Header.scss';

function Header(props) {
  return (
    <header className="header">
      <div className="header_btns">
        <a className="new_btn" href="#">
          + Board
        </a>
      </div>
      <div className="header_title">
        <h1>React-Trelo</h1>
      </div>
    </header>
  );
}

export default Header;
