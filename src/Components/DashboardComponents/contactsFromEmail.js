import { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'antd';
import { Form, Input, Button } from 'antd';
import Compose from './composeEmail';
const { TextArea } = Input;
function Inbox() {
  const [emails, setEmails] = useState([]);
  const [extractedEmail, setExtractedEmail] = useState("");
  const [sentEmails, setSentEmails] = useState([]);

 const [isInboxVisible,setIsInboxVisible] = useState(true)
 const [activeTab, setActiveTab] = useState(1);
 const columns = [
  {
    title: 'From',
    dataIndex: 'from',
    key: 'from',
  },
  {
    title: 'Subject',
    dataIndex: 'subject',
    key: 'subject',
  },
  {
    title: 'Reply',
    dataIndex: 'reply',
    key: 'reply',
    render: (text, record) => (
      <button
        className='text-blue-400 underline'
        onClick={() => {
          const email = record.from;
          setExtractedEmail(email);
          //console.log("extracted email", email);
        }}
      >
        Reply
      </button>
    ),
  },
];
const columnsSent = [
  {
    title: 'To',
    dataIndex: 'to',
    key: 'to',
  },
  {
    title: 'Subject',
    dataIndex: 'subject',
    key: 'subject',
  },
  {
    title: 'View',
    dataIndex: 'view',
    key: 'view',
    render: (text, record) => (
      <button
        className='text-blue-400 underline'
        onClick={() => {
          const email = record.from;
          // setExtractedEmail(email);
          // //console.log("extracted email", email);
        }}
      >
        View
      </button>
    ),
  },
];
 useEffect(() => {
  axios
    .get('https://efkoauthentication.onrender.com/email/viewInbox')
    .then((response) => {
      setEmails(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
}, [emails]);
useEffect(() => {
  axios
    .get('https://efkoauthentication.onrender.com/email/viewSent')
    .then((response) => {
      setSentEmails(response.data.sentEmails);
      //console.log("sentemails",sentEmails)
    })
    .catch((error) => {
      console.error(error);
    });
}, [sentEmails]);
 const tabs = [
  {
    id: 1,
    label: "Inbox",
    content: () => (<div>
       <div>
    <Table
        columns={columns}
        expandable={{
          expandedRowRender: (record) => (
            <p
              className='truncate text-ellipsis w-2/5'
              style={{
                margin: 0,
              }}
            >
              {record.text}
            </p>
          ),
          rowExpandable: (record) => record.name !== 'Not Expandable',
        }}
        dataSource={emails}
        pagination={{
          pageSize: 50,
        }}
        scroll={{
          y: 240,
        }}
      />
      {extractedEmail && <Compose to={extractedEmail} />}
     
    </div>
    </div>) },
  { id: 2, label: "Sent", content: () => (<div>
  {activeTab===2 && sentEmails.length>0 && (   <div>
<Table
     columns={columnsSent}
     expandable={{
       expandedRowRender: (record) => (
         <p
           className='truncate text-ellipsis w-2/5'
           style={{
             margin: 0,
           }}
         >
           {record.text}
         </p>
       ),
       rowExpandable: (record) => record.name !== 'Not Expandable',
     }}
     dataSource={sentEmails}
     pagination={{
       pageSize: 50,
     }}
     scroll={{
       y: 240,
     }}
   />
   {extractedEmail && <Compose to={extractedEmail} />}
   
  
 </div>)}
 </div>) }
  
];


  
  return (
    <div>
   
    <div className=' bg-white p-10 text-black'>
      <div className='relative group inline-block'>
        <h1 className='text-3xl py-4 font-bold hover:text-black hover:cursor-default mb-0'>Messages</h1>
        <div className='rounded-full bg-black w-10 h-[0.4rem] mt-2 
               absolute left-0 bottom-0 transition-all duration-500 ease-in-out shadow
                shadow-black group-hover:w-full'></div>
      </div>
      <div className="lg:block hidden">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex" aria-label="Tabs">
            {tabs.map((tab) => (
              <p
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-1/4 py-4 px-1 text-center text-sm border-b-2 ${
                  activeTab === tab.id
                    ? "border-black text-black font-bold hover:cursor-pointer"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 hover:cursor-pointer focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out"
                }`}
              >
                {tab.label}
              </p>
            ))}
          </nav>
        </div>

        <div className="mt-8">
          {tabs.map((tab) => (
            <div
              key={tab.id}
              className={`${activeTab === tab.id ? "block" : "hidden"} tab-content flex flex-row items-start`}
            >
              {tab.content()}
            </div>
          ))}
        </div>
      </div>
    </div>
    
    </div>
  );
}



// function EmailContact() {
//   return (
//     <div>
//       <Inbox />

//     </div>
//   );
// }

export default Inbox;
