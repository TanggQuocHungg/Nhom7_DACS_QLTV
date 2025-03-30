import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    fetch('http://localhost:5243/api/users/profile', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
      .then(async res => {
        if (res.ok) {
          const data = await res.json();
          setUser(data);
        } else if (res.status === 401) {
          localStorage.removeItem('token');
          navigate('/login');
        } else {
          setError('Không thể tải thông tin người dùng.');
        }
      })
      .catch(() => {
        setError('Lỗi kết nối đến máy chủ.');
      });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (error) return <div className="container mt-5 text-danger">{error}</div>;

  if (!user) return <div className="container mt-5">⏳ Đang tải...</div>;

  return (
    <div className="container mt-5" style={{ maxWidth: '500px' }}>
      <h2 className="mb-4">Thông tin người dùng</h2>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Tên đăng nhập:</strong> {user.userName}</p>
      <p><strong>Quyền:</strong> {user.role || 'Chưa xác định'}</p>

      <button onClick={handleLogout} className="btn btn-danger mt-3">
        Đăng xuất
      </button>
    </div>
  );
}

export default Profile;
