import React from 'react';
import logo from '../logo.svg';
import './Home.css'; // nếu cần style riêng

function Home() {
  return (
    <div className="text-center mt-5">
      <img src={logo} alt="Logo" className="App-logo" />
      <h2 className="mt-3">📚 Chào mừng đến với Thư viện Trường</h2>
      <p>Quản lý sách, học sinh, mượn – trả, và nhiều hơn nữa.</p>
    </div>
  );
}

export default Home;
