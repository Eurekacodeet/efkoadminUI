import { Sidebar, Menu, MenuItem, useProSidebar, } from 'react-pro-sidebar';
import { EnvelopeIcon, ChartBarSquareIcon, ChevronDoubleLeftIcon, UserGroupIcon, WrenchScrewdriverIcon, NewspaperIcon, XMarkIcon,HomeIcon, Square3Stack3DIcon, ArrowLeftCircleIcon, ArrowRightCircleIcon, ChevronDoubleRightIcon, PowerIcon } from '@heroicons/react/24/outline';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';



function LayoutSideBar() {
  const { collapseSidebar, toggleSidebar } = useProSidebar();
  const [isExpanded, setIsExpanded] = useState(true);
  const [username, setUsername] = useState('');
  let navigate=useNavigate()
  useEffect(() => {
    // Fetch the username from the session storage
    const fetchUsername = () => {
      const storedUsername = sessionStorage.getItem('name');
      if (storedUsername) {
        setUsername(storedUsername);
      }
    };
  
    fetchUsername();
  }, []);
  const handleLogout = () => {
    // Clear the session storage
    sessionStorage.removeItem('adminId');
    sessionStorage.removeItem('name');
    setUsername('');
   // Delay the navigation to /dashboard by 1 second (1000 milliseconds)
   setTimeout(() => {
    navigate('/');
    window.location.reload()

  }, 100);

  };
  
  return (
    <div className='flex h-screen items-start justify-center'>
      
      <Sidebar

style={{ position: 'sticky' }}
backgroundColor='black' className=' z-50 h-full text-white'>
  { isExpanded?<div className='flex flex-row items-center justify-center  mt-4 '> 
  <p className='pr-4'>Hi, {username}</p> 
  <button onClick={handleLogout} className='bg-white text-black rounded font-semibold p-2'>Log out</button></div>
  :<div className='flex flex-col items-center justify-center  mt-4 '>
    <button onClick={handleLogout} className='bg-white text-black rounded font-semibold p-2'>
      <PowerIcon className='bg-white rounded text-black' width={15} height={15}/></button></div>}
        <Menu renderExpandIcon={<HomeIcon className='group-hover:text-black text-white hover:text-black' width={20} height={20}/>} className='pt-4'>
          <MenuItem className="group hover:text-black" component={<Link to="/dashboard" />} icon={<HomeIcon className='group-hover:text-black text-white hover:text-black' width={20} height={20}/>}>Dashboard </MenuItem>
          <MenuItem className="group hover:text-black" component={<Link to="/projects" />} icon={<Square3Stack3DIcon className='group-hover:text-black text-white hover:text-black' width={20} height={20}/>}> Projects </MenuItem>
          <MenuItem className="group hover:text-black" component={<Link to="/blog" />} icon={<NewspaperIcon className='group-hover:text-black text-white hover:text-black' width={20} height={20}/>}>Blog</MenuItem>
          <MenuItem className="group hover:text-black" component={<Link to="/services" />} icon={<WrenchScrewdriverIcon className='group-hover:text-black text-white hover:text-black' width={20} height={20}/>}>Services</MenuItem>
          <MenuItem className="group hover:text-black" component={<Link to="/members" />} icon={<UserGroupIcon className='group-hover:text-black text-white hover:text-black' width={20} height={20}/>}>Members</MenuItem>
          <MenuItem className="group hover:text-black" component={<Link to="/messages" />} icon={<EnvelopeIcon className='group-hover:text-black text-white hover:text-black' width={20} height={20}/>}>Messages</MenuItem>
        </Menu>
      </Sidebar>
      <main>
        {isExpanded?
        <button className=" p-[0.1rem] border-[1px] border-gray-400 rounded-full" onClick={() => {collapseSidebar();setIsExpanded(false)}}><ChevronDoubleLeftIcon className='text-gray-300' width={15} height={15}/></button>
        : <button  className=" p-[0.1rem] border-[1px] border-gray-400 rounded-full"  onClick={() => {collapseSidebar();setIsExpanded(true)}}><ChevronDoubleRightIcon className='text-gray-300' width={15} height={15}/></button>
}     

 </main>
    </div>
  );
}
export default LayoutSideBar;