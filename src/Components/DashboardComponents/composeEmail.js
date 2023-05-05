import { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Input, Button, message } from 'antd';
import Inbox from './contactsFromEmail'


const { TextArea } = Input;

function Compose(props) {
    const [to, setTo] = useState(props.to);
    const [subject, setSubject] = useState('');
    const [text, setText] = useState('');
    const [form] = Form.useForm();
    const [viewEmailCompose, setViewEmailCompose] = useState(true)
    //console.log("view state",viewEmailCompose)
    const handleSubmit = () => {
      // event.preventDefault();
      
  //console.log("props to",props.to)
      axios.post('https://efkobend.onrender.com/email/send', { to, subject, text })
        .then((response) => {
        setViewEmailCompose(false);
        message.success('Email sent successfully!')
        //console.log(response.data);
        setTo("");
        setSubject("");
        setText("");
        form.resetFields();
    
        })
        .catch((error) => {
          console.error(error);
          message.error('Error sending email!')
        });
        setTo("");
        setSubject("");
        setText("");
        <Inbox buttonState={false}/>
    };
  
    return (
      <div>
      {viewEmailCompose && 
      <div>
         <h1>Compose</h1>
         <p>To: {to}</p>
        <Form form={form} onFinish={handleSubmit}>
          <Form.Item name="to" label="To:">
            <Input defaultValue={to} value={to} placeholder={to} onChange={(e)=>setTo(e.target.value)} type="email" />
          </Form.Item>
          <Form.Item name="subject" label="Subject:" rules={[{ required: true, message: 'Please enter the subject' }]}>
            <Input value={subject} onChange={(e)=>setSubject(e.target.value)} type="text" />
          </Form.Item>
          <Form.Item name="text" label="Text:">
            <TextArea value={text} onChange={(e)=>setText(e.target.value)} rows={4} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" className='bg-black text-white' htmlType="submit">
              Send
            </Button>
          </Form.Item>
        </Form>
        </div>}
      </div>
    );
  }
  export default Compose;