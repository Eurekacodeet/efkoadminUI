import React, { createContext, useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const UserContext = createContext();

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const [adminId, setAdminId] = useState(null); // Add setAdminId state

  let navigate = useNavigate();

  const handleLogin = async (values) => {
    try {
      setLoading(true);

      const response = await axios.post('https://efkoauthentication.onrender.com/admin/login', values);

      message.success(response.data.message);

      sessionStorage.setItem('adminId', response.data.adminData.id);
      sessionStorage.setItem('name', response.data.adminData.name);

      setAdminId(response.data.adminData.id); // Set adminId using setAdminId
      setTimeout(() => {
        navigate('/dashboard');
        window.location.reload()
      }, 1000);
    
    } catch (error) {
      message.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <UserContext.Provider value={{ adminId, setAdminId }}> {/* Update the UserContext.Provider value */}
      <div className="flex justify-center items-center">
        <Form name="loginForm" onFinish={handleLogin}>
        <Form.Item
        name="email"
        rules={[
          { required: true, message: 'Please enter your email' },
          { type: 'email', message: 'Please enter a valid email' },
        ]}
      >
        <Input placeholder="Email" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please enter your password' }]}
      >
        <Input.Password placeholder="Password" />
      </Form.Item>
      <Form.Item>
        <Button className='bg-black text-white font-medium' type="primary" htmlType="submit" loading={loading}>
          Login
        </Button>
      </Form.Item>
        </Form>
      </div>
    </UserContext.Provider>
  );
};

export default LoginForm;
