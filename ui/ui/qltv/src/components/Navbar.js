import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-4">
      <Link className="navbar-brand" to="/">📚 QLTV</Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/login">Đăng nhập</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/register">Đăng ký</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/profile">Trang cá nhân</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
