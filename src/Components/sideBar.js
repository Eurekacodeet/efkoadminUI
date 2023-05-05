import { Sidebar, Menu, MenuItem, useProSidebar, } from 'react-pro-sidebar';
import { EnvelopeIcon, ChartBarSquareIcon, ChevronDoubleLeftIcon, UserGroupIcon, WrenchScrewdriverIcon, NewspaperIcon, XMarkIcon,HomeIcon, Square3Stack3DIcon, ArrowLeftCircleIcon, ArrowRightCircleIcon, ChevronDoubleRightIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { useState } from 'react';



function LayoutSideBar() {
  const { collapseSidebar, toggleSidebar } = useProSidebar();
  const [isExpanded, setIsExpanded] = useState(true);
 
  return (
    <div className='flex h-screen'>
      
      <Sidebar

style={{ position: 'sticky' }}
backgroundColor='black' className=' z-50 h-full text-white'>
     
        <Menu renderExpandIcon={<HomeIcon className='group-hover:text-black text-white hover:text-black' width={20} height={20}/>} className='pt-8'>
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