import React from 'react';
import { Link } from 'react-router-dom'

const HeaderLeft = () => {
  return (
    <div className="header_lft">
      <div className="logo">
        <a href=" ">
          <img src="/images/logo.png" alt=" " />
        </a>
      </div>
      <div className="navigatn">
        <ul>
          <li>
            <Link to={'/Homepage'}>Home</Link>
          </li>
          <li>
            <a href=" "> E-Coupons </a>
          </li>
          <li>
            <a href=" ">E-Brands </a>
          </li>
          <li>
            <a href=" "> Resuse Market </a>
          </li>
          <li>
            <a href=" "> Lost and Found</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HeaderLeft;
