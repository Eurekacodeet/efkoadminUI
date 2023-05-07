import React, { useEffect, useState } from 'react';
import { Card, Statistic, Row, Col } from 'antd';
import { UserOutlined, MailOutlined, ProjectOutlined, ToolOutlined, ReadOutlined } from '@ant-design/icons';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

import 'tailwindcss/tailwind.css';
import { PencilIcon, WrenchScrewdriverIcon } from '@heroicons/react/24/outline';

const DashboardPage = () => {
  const [projects,setProjects]=useState(0)
  const [blogs,setBlogs]=useState(0)
  const [emailsSent,setEmailsSent]=useState(0)
  const [emailsRecieved,setEmailsRecieved]=useState(0)



  const data = [
    { name: 'Jan', engagement: 400 },
    { name: 'Feb', engagement: 600 },
    { name: 'Mar', engagement: 800 },
    { name: 'Apr', engagement: 1000 },
    { name: 'May', engagement: 1200 },
    { name: 'Jun', engagement: 1500 },
    // Add more data points as needed
  ];
  const fetchProjects=async()=>{

    const response=await fetch('https://efkobend.onrender.com/count/projectCount')
    const result=await response.json();
    setProjects(result.length)
    //console.log("no of projects",projects)
        }
        const fetchBlogs=async()=>{

          const response=await fetch('https://efkobend.onrender.com/count/blogCount')
          const result=await response.json();
          setBlogs(result.length)
          //console.log("no of blogs",projects)
              }
              const fetchEmailsSent=async()=>{

                const response=await fetch('https://efkobend.onrender.com/email/viewSent')
                const result=await response.json();
                setEmailsSent(result.length)
                //console.log("no of emails sent",projects)
                    }
                    const fetchEmailsRecieved=async()=>{

                      const response=await fetch('https://efkobend.onrender.com/count/emailCount/')
                      const result=await response.json();
                      setEmailsRecieved(result.length)
                      //console.log("no of emails recieved",projects)
                          }
  useEffect(()=>{

    fetchProjects();
    fetchBlogs();
    fetchEmailsSent();
    fetchEmailsRecieved();
  },[projects,blogs,emailsSent, emailsRecieved])

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      <Row gutter={[16, 16]}>
        <Col span={6}>
          <Card>
            <Statistic title="Visits" value={1000} prefix={<UserOutlined />} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Emails Sent" value={emailsSent} prefix={<MailOutlined />} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Members" value={50} prefix={<UserOutlined />} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Projects" value={projects} prefix={<ProjectOutlined />} />
          </Card>
        </Col>
      </Row>
      <Row className='pt-4' gutter={[16, 16]}>
        <Col span={6}>
          <Card>
            <Statistic title="Blogs posted" value={blogs} prefix={<ReadOutlined />} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Emails Recieved" value={emailsRecieved} prefix={<MailOutlined />} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Testimonies" value={50} prefix={<UserOutlined />} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Services" value={10} prefix={<ToolOutlined />} />
          </Card>
        </Col>
      </Row>

      <Card className="mt-8">
        <h2 className="text-lg font-bold mb-4">User Engagement</h2>
        <LineChart width={500} height={300} data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="engagement" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </Card>
    </div>
  );
};

export default DashboardPage;