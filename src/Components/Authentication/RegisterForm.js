import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';

const RegistrationForm = () => {
  const [loading, setLoading] = useState(false);

  const handleRegistration = async (values) => {
    try {
      setLoading(true);

      const response = await axios.post('https://efkoauthentication.onrender.com/admin/register', values);
      // Handle successful registration
      message.success(response.data.message);
    } catch (error) {
      // Handle error
      message.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form name="registrationForm" onFinish={handleRegistration}>
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
        rules={[
          { required: true, message: 'Please enter your password' },
          { min: 6, message: 'Password must be at least 6 characters long' },
        ]}
      >
        <Input.Password placeholder="Password" />
      </Form.Item>
      <Form.Item
        name="name"
        rules={[{ required: true, message: 'Please enter your name' }]}
      >
        <Input placeholder="Name" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Register
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegistrationForm;