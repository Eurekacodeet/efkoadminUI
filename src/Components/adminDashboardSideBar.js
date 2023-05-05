import { useState } from 'react';
import { ChatBubbleLeftRightIcon, ChartBarSquareIcon, ServerIcon, UserGroupIcon, PhoneIcon } from '@heroicons/react/24/outline';

const SidebarCustommade = () => {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [isExpanded, setIsExpanded] = useState(true);

  const handleClick = (tabName) => {
    setActiveTab(tabName);
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <nav className={`bg-black text-white h-screen w-64 flex flex-col transition-all duration-300 ${isExpanded ? '' : 'hidden'}`}>
        <div className="flex flex-col justify-center mt-8">
          <button
            className={`flex items-center p-4 font-medium text-sm ${activeTab === 'Dashboard' ? 'bg-white text-black' : ''}`}
            onClick={() => handleClick('Dashboard')}
          >
            <ChartBarSquareIcon className="h-6 w-6 mr-2" />
            Dashboard
          </button>
          <button
            className={`flex items-center p-4 font-medium text-sm ${activeTab === 'Services' ? 'bg-white text-black' : ''}`}
            onClick={() => handleClick('Services')}
          >
            <ServerIcon className="h-6 w-6 mr-2" />
            Services
          </button>
          <button
            className={`flex items-center p-4 font-medium text-sm ${activeTab === 'Blog' ? 'bg-white text-black' : ''}`}
            onClick={() => handleClick('Blog')}
          >
            <ChatBubbleLeftRightIcon className="h-6 w-6 mr-2" />
            Blog
          </button>
          <button
            className={`flex items-center p-4 font-medium text-sm ${activeTab === 'Testimonies' ? 'bg-white text-black' : ''}`}
            onClick={() => handleClick('Testimonies')}
          >
            <UserGroupIcon className="h-6 w-6 mr-2" />
            Testimonies
          </button>
          <button
            className={`flex items-center p-4 font-medium text-sm ${activeTab === 'Contact' ? 'bg-white text-black' : ''}`}
            onClick={() => handleClick('Contact')}
          >
            <PhoneIcon className="h-6 w-6 mr-2" />
            Contact
          </button>
        </div>
      </nav>
      {/* Expand button */}
      <button
        className={`fixed bottom-4  ${isExpanded===true?'left-48' :' left-6'} border-[1px] border-black p-2 rounded-full bg-white text-black z-10`}
        onClick={toggleExpand}
      >
        {isExpanded ? ( <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6  " fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        
        ) : (
           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 left-32" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h8m-8 6h16" />
          </svg>
          )}
          </button>
      {/* View content buttons */}

<div className="flex flex-col w-full p-4">
{activeTab === 'Dashboard' && (
  <h1 className="text-3xl font-bold">Dashboard</h1>
)}
{activeTab === 'Services' && (
  <h1 className="text-3xl font-bold">Services</h1>
)}
{activeTab === 'Blog' && (
  <h1 className="text-3xl font-bold">Blog</h1>
)}
{activeTab === 'Testimonies' && (
  <h1 className="text-3xl font-bold">Testimonies</h1>
)}
{activeTab === 'Contact' && (
  <h1 className="text-3xl font-bold">Contact</h1>
)}
</div>
</div>
);
};

export default SidebarCustommade;