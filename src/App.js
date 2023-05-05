import logo from './logo.svg';
import './App.css';
import Sidebar from './Components/adminDashboardSideBar';
import LayoutSideBar from '../src/Components/sideBar'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import BlogManagement from './Components/DashboardComponents/blogManagement';
import ProjectManagement from './Components/DashboardComponents/projectsManagement';
import EmailContact from './Components/DashboardComponents/contactsFromEmail';
import DashboardPage from './Components/DashboardComponents/analyticsDashboard';
function App() {
  return (
    <div className=" flex flex-row">
    

      <Router>
   <LayoutSideBar/>
        <Routes>
          <Route path='/dashboard' element={<DashboardPage/>} />   
          <Route path='/projects' element={<ProjectManagement />} />
          <Route path='/blog' element={<BlogManagement />} />
          <Route path='/services' element="{<Contactus />}" />
          <Route path='/members' element="{<Contactus />}" />
          <Route path='/messages' element={<EmailContact />} />

          <Route path='*' element="{<PageNotFound />}" />
          {/* <Route path='/aboutus' element={user ?<Aboutroute/>: <Login/>} />
               <Route path='/services' element={user ?<Servicesroute/>: <Login/>} />
               <Route path='/register' element={<Register/>} />
               <Route path='/contact' element={user ?<Contactroute/>: <Login/>} />
               <Route path='/login' element={user ?<Home/>: <Login/>} /> */}
          {/* <Route path='/registeruser' element={''} />
               <Route path='/main' element={'<Layout><Posts/></Layout>'} />
               <Route path='/videos' element={'<Layout><VideoPage/></Layout>'} />
               <Route path='/jobs' element={'<Layout><JobPage/></Layout>'} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
