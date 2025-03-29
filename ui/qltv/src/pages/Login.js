import React, { useState } from 'react';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5243/api/Auth/login", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("token", data.token);
      alert("Đăng nhập thành công!");
      window.location.href = "/profile";
    } else {
      alert("Sai tài khoản hoặc mật khẩu");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Đăng nhập</h2>
      <form onSubmit={handleLogin}>
        <input className="form-control my-2" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
        <input className="form-control my-2" placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <button className="btn btn-primary">Đăng nhập</button>
      </form>
    </div>
  );
}

export default Login;
