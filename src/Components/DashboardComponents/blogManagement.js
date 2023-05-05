import React, { useEffect, useRef, useState } from 'react'
import { Input, Card, Form, Select, Button, message, Upload, Modal, Space, Image, Empty } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { ArrowRightOutlined, ExclamationCircleOutlined} from '@ant-design/icons';
import { PlusIcon, AdjustmentsHorizontalIcon, PencilSquareIcon  } from '@heroicons/react/24/outline';
const { TextArea } = Input;
const { Option } = Select;
const { Dragger } = Upload;
const { confirm } = Modal;
const { Search } = Input;

const BlogManagement = () => {
  const [service, setService] = useState([

    {
      value: 'web-dev',
      label: 'Web Development',
    },
    {
      value: 'mobile-app-dev',
      label: 'Mobile App Development',
    },
    {
      value: 'graphics-design',
      label: 'Graphics Design',
    },
    {
      value: 'project-consultancy',
      label: 'Project Consultancy',
    },
    {
      value: 'training-support',
      label: 'Training and Support',
    },
    {
      value: 'computer-installation-maintenance',
      label: 'Computer Installation and Maintenance',
    },
    {
      value: 'ui-ux-design',
      label: 'UI/UX Design',
    },
    {
      value: 'software-dev',
      label: 'Software Development',
    },
    {
      value: 'database-management',
      label: 'Database Management',
    },
    {
      value: 'cloud-computing',
      label: 'Cloud Computing',
    },
    {
      value: 'artificial-intelligence',
      label: 'Artificial Intelligence',
    },
    {
      value: 'cybersecurity',
      label: 'Cybersecurity',
    },
    {
      value: 'e-commerce-solutions',
      label: 'E-commerce Solutions',
    },
    {
      value: 'content-management-systems',
      label: 'Content Management Systems (CMS)',
    },
    {
      value: 'digital-marketing',
      label: 'Digital Marketing',
    },
    {
      value: 'data-analysis-visualization',
      label: 'Data Analysis and Visualization',
    },
    {
      value: 'it-infrastructure-management',
      label: 'IT Infrastructure Management',
    },
    {
      value: 'user-interface-design',
      label: 'User Interface Design',
    },
    {
      value: 'quality-assurance-testing',
      label: 'Quality Assurance and Testing',
    },
    {
      value: 'it-consulting',
      label: 'IT Consulting',
    },
    {
      value: 'network-administration',
      label: 'Network Administration',
    },
    {
      value: 'internet-of-things',
      label: 'Internet of Things (IoT)',
    },
    {
      value: 'virtual-reality',
      label: 'Virtual Reality (VR)',
    },
    {
      value: 'augmented-reality',
      label: 'Augmented Reality (AR)',
    },
    {
      value: 'machine-learning',
      label: 'Machine Learning',
    },
    {
      value: 'rpa',
      label: 'Robotic Process Automation (RPA)',
    },
    {
      value: 'big-data-analytics',
      label: 'Big Data Analytics',
    },
    {
      value: 'project-management',
      label: 'Project Management',
    },

  
  ]);
  const [form] = Form.useForm();
  const [fileData,setFileData]=useState(null)
  const [title,setTitle]=useState("")
  const [description, setDescription]=useState("")
  const [category, setCategory]=useState("")
 const [blogs,setBlogs]=useState([])
 const [loading, setLoading] = useState(false);
 const [visible, setVisible] = useState(false);
 const [blogId,setBlogId]=useState("")
 const [coverImagePreview,setCoverImagePreview]=useState("")
 const [filteredBlogs, setFilteredBlogs] = useState(blogs);
 const [searchText, setSearchText] = useState("");
 const [filterText, setFilterText] = useState("");

 const [filteredBLogsVisibility, setFilteredBLogsVisibility]=useState(false)
 const [categoryListAdd, setCategoryListAdd]=useState({
  category:"",
})
const [categoryList,setCategoryList]=useState()
const [isViewFilterModalVisible, setIsViewFilterModalVisible]=useState(false)
// const [paraLen, setParagraphLength]=useState(0)
// const handleDataChange = (event) => {
//   setRole({ ...role, [event.target.name]: event.target.value });
//   setStructureData({...structureData, [event.target.name]: event.target.value})
// };
// const handleCreateRole=()=>{
//   //console.log(categoryList)
//   axios.post("https://efkobend.onrender.com/blog/createCategory",role)
//   setCategoryListAdd({category:""})
// }
// useEffect(()=>{
//   const fetchData=async()=>{

//     try{  const response=await fetch('https://efkobend.onrender.com/blog/getCategory')
//       const result=await response.json()
//         //console.log(result)
//       setBlogs(result)
    
//   }catch(error){
//     //console.log(error)
//   }
//     }
//     fetchData();    
//     const intervalId= setInterval(()=>{
//       fetchData();
//     }, 5000);
  
//     return ()=> clearInterval(intervalId)                         
// },[])
 const handleSearch = (value) => {
  // setSearchText(value);
  const filtered = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(value.toLowerCase())
  );
  setFilteredBlogs(filtered);
  setFilteredBLogsVisibility(true);
};

const handleFilter = (value) => {

  const filtered = blogs.filter((blog) =>
    blog.category.toLowerCase().includes(value.toLowerCase())
  );
  //console.log(filtered)
  setFilteredBlogs(filtered);
  setFilteredBLogsVisibility(true);
};

  const handleServiceChange = (value) => {
    setService(value);
  };
  const showDeleteConfirm = (blogId) => {
    confirm({
      title: 'Are you sure you want to delete this blog?',
      icon: <ExclamationCircleOutlined />,
      content: 'This action cannot be undone.',
      onOk() {
        deleteBlog(blogId);
      },
      onCancel() {

      },
    });
  };
  const onFinish = (values) => {
    setLoading(true);

 const formData= new FormData()
 //console.log('Received values of form: ', formData);
 formData.append('title',title)
 //console.log(title)
 formData.append('description',description)
 //console.log(description)
 formData.append('category',category)
 //console.log(category)
 formData.append('image',fileData)
 //console.log(fileData)

fetch('https://efkobend.onrender.com/blog/',{
  method: 'POST',
  body: formData
}).then((response)=>response.json()).then((data)=>{
  //console.log('Success',data)
  message.success('Blog posted successfully')
  form.resetFields();

  setBlogs((prevBlogs)=>[data, ...prevBlogs]);
  setLoading(false);
}).catch((error)=>{
  //console.log('Error',error)
  message.error("Blog post failed")
  setLoading(false);
})
  };
  const deleteBlog = async (blogId) => {
    setLoading(true);

    try {
      const response = await fetch(`https://efkobend.onrender.com/blog/${blogId}/`, {
        method: 'DELETE',
      });

      //console.log('Success', response);
      message.success('Blog deleted successfully');
      setBlogs((prevBlogs) => {
        const updatedBlogs = prevBlogs.filter((blog) => blog.id !== blogId);
        return [...updatedBlogs];
      });
      // setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== blogId));
      setLoading(false);
    } catch (error) {
      //console.log('Error', error);
      message.error('Blog deletion failed');
      setLoading(false);
    }
  };

  const updateBlog = async (blogId) => {
    setLoading(true);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('image', fileData);
    //console.log(fileData);
    if (fileData) {  
    
    }try {
      const response = await fetch(`https://efkobend.onrender.com/blog/${blogId}/`, {
        method: 'PUT',
        body: formData,
      });
    
      const data = await response.json();
    
      //console.log('Success', data);
      message.success('Blog updated successfully');
    
      const updatedBlogs = blogs.map((blog) => {
        if (blog._id === data._id) {
          return data;
        } else {
          return blog;
        }
      });
    
      setBlogs(updatedBlogs);
      setLoading(false);
      setVisible(false);


      setTitle('');
  setDescription('');
  setCategory('');
  setFileData(null);

  form.resetFields(['title','description','category','image'])
    } catch (error) {
      //console.log('Error', error);
      message.error('Blog update failed');
      setLoading(false);
    }
    };
  
    const handleFileChange = (file) => {
      setCoverImagePreview(URL.createObjectURL(file.file));   
      };
      const handleEdit = (blog) => {
        //console.log(blog._id,"blog id inside edit")
        setTitle(blog.title);
        setDescription(blog.description);
        setCategory(blog.category);
        //console.log("category",blog.category)
        setFileData(<img src={blog.imageSrc}/>);
        setVisible(true);
        };
        const handleView = (blog) => {
          setIsModalVisible(false);
         
          setIsViewFilterModalVisible(false);
          setVisible(false)
          setIsModalViewVisible(true);
          //console.log(blog._id,"blog id inside edit")
          setTitle(blog.title);
          setDescription(blog.description);
          setCategory(blog.category);
          //console.log("category",blog.category)
          setFileData(blog.imageSrc);
     
          };
          const handleFilteredView = (blog) => {
            setIsModalVisible(false);
            setIsModalViewVisible(false);
        
            setVisible(false)
          setIsViewFilterModalVisible(true);
          //console.log(blog._id,"blog id inside edit")
          setTitle(blog.title);
          setDescription(blog.description);
          setCategory(blog.category);
          //console.log("category",blog.category)
          setFileData(blog.imageSrc);
     
          };
          
        const handleCancel = () => {
             setTitle('');
        setDescription('');
        setCategory('');
        setFileData(null);
        setVisible(false);
     form.resetFields(['title','description','category','image']);

        };   
const props = {
  name: 'file',
  multiple: false,
  action: null,
 beforeUpload: (file)=>{
//  setFileData(URL.createObjectURL(file.file));
  setFileData(file);
 
  return false;
 },
};
useEffect(()=>{
  const fetchData=async()=>{

  try{  const response=await fetch('https://efkobend.onrender.com/blog/')
    const result=await response.json()
      //console.log(result)
    setBlogs(result)
  //console.log("length of blogs",blogs.length)
}catch(error){
  //console.log(error)
}
  }
  fetchData();    
  const intervalId= setInterval(()=>{
    fetchData();
  }, 5000);

  return ()=> clearInterval(intervalId)                                                                                                                                                                                                                                                       
},[])
const containerRef=useRef()
const [isModalVisible, setIsModalVisible] = useState(false);
const [isViewModalVisible, setIsModalViewVisible]=useState(false)
const [filterVisible, setFilterVisible] = useState(false);

const handleAddBlog = () => {
  setIsModalVisible(true);
};

const handleModalCancel = () => {
  setIsModalVisible(false);
  setIsModalViewVisible(false);
  setIsViewFilterModalVisible(false);
  setVisible(false)
};
const handleModalCancelFiltered = () => {
  setIsViewFilterModalVisible(false);
};
const handleFilterVisibility = () => {
  setFilterVisible(!filterVisible);
};

const handleFilterSubmit = (values) => {
  // Handle filter submission here
  //console.log(values);
};
const [paragraphLength, setParagraphLength] = useState(0);

useEffect(() => {
  if (containerRef.current) {
    const { scrollHeight } = containerRef.current;
    const newParagraphLength = scrollHeight > 100 ? scrollHeight : 0;
    setParagraphLength(newParagraphLength);
  }
}, []);
  return (
    <div className='flex flex-col pt-4 w-screen'>
       <div className='flex flex-row items-center pt-8 pl-8'>
       
        <Search
      placeholder="Search blogs"
      allowClear
      onChange={(e)=>{setSearchText(e.target.value);handleSearch(e.target.value);}}
      className='w-3/5'
      // onClick={}
      // style={{
      //   width: 200,
      // }}
    />
      <Button onClick={handleFilterVisibility}><AdjustmentsHorizontalIcon className='text-black' width={18} height={18}/>
</Button>
        <Button className='bg-black ml-2' type="primary" onClick={handleAddBlog}>
          
         <div className='flex flex-row items-center text-center justify-center'>
          <PlusIcon className='text-white mr-2' width={18} height={18}/> Add Blog</div> 
        </Button>
      
      </div>
      <div className='relative'>
      {filterVisible && (
        <Card className='w-3/5 ml-8 mt-20' style={{ position: 'fixed', top: 0, zIndex: 999 }}>
        <Form onFinish={handleFilterSubmit}>
          <Form.Item>
            <Input
              placeholder="Filter by category"
              allowClear
              size="large"
              onPressEnter={(e) => { handleFilter(e.target.value); setFilterText(e.target.value); }}
              onChange={(e) => { setFilterText(e.target.value); }}
            />
          </Form.Item>
          <div className='flex flex-row pt-4'>
            <Button onClick={() => handleFilter(filterText)} className='bg-black text-white mr-2' type="primary" htmlType="submit">
              Apply Filter
            </Button>
            <Button onClick={() => setFilteredBLogsVisibility(false)} className='bg-black text-white' type="primary" htmlType="submit">
              Clear Filter
            </Button>
          </div>
        </Form>
      </Card>
      )}</div>
        <Modal
        title="Add New Blog"
        open={isModalVisible}
        onCancel={handleModalCancel}
        footer={null}
      >
          <Form
              form={form}
              name="blog-form"
              onFinish={onFinish}
              layout="vertical"
              style={{ marginBottom: '20px' }}
            >
              <Form.Item
                name="Title"
                label="Title"
                rules={[
                  {
                    required: true,
                    message: 'Please input your blog title!',
                  },
                ]}
              >
                <Input placeholder="Title" value={title} onChange={(e)=>setTitle(e.target.value)}/>
              </Form.Item>
              <Form.Item
                name="Description"
                label="Description"
                rules={[
                  {
                    required: true,
                    message: 'Please input description!',
                  },
                ]}
              >
                <Input.TextArea rows={4} placeholder="Description"  value={description} onChange={(e)=>setDescription(e.target.value)} />
              </Form.Item>
              <Form.Item
                name="projectContent"
                label="Type of Category"
                value={category}
              >
                <select
  value={category}
  className="w-full border-[0.5px] border-[#D9D9D9] p-[0.3rem] rounded hover:border-[#4096FF] hover:transition-all"
  onChange={(value)=>{setCategory(value);}}

>
  <option value="web-dev">Web App</option>
  <option value="mobile-app-dev">Mobile App</option>
  <option value="graphics-design">Graphics Design</option>
  <option value="project-consultancy">Project Consultancy</option>
  <option value="training-support">Training and Support</option>
  <option value="computer-installation-maintenance">Computer Installation and Maintenance</option>
  <option value="ui-ux-design">UI/UX Design</option>
  <option value="software-dev">Software Development</option>
  <option value="database-management">Database Management</option>
  <option value="cloud-computing">Cloud Computing</option>
  <option value="artificial-intelligence">Artificial Intelligence</option>
  <option value="cybersecurity">Cybersecurity</option>
  <option value="e-commerce-solutions">E-commerce Solutions</option>
  <option value="content-management-systems">Content Management Systems (CMS)</option>
  <option value="digital-marketing">Digital Marketing</option>
  <option value="data-analysis-visualization">Data Analysis and Visualization</option>
  <option value="it-infrastructure-management">IT Infrastructure Management</option>
  <option value="user-interface-design">User Interface Design</option>
  <option value="quality-assurance-testing">Quality Assurance and Testing</option>
  <option value="it-consulting">IT Consulting</option>
  <option value="network-administration">Network Administration</option>
  <option value="internet-of-things">Internet of Things (IoT)</option>
  <option value="virtual-reality">Virtual Reality (VR)</option>
  <option value="augmented-reality">Augmented Reality (AR)</option>
  <option value="machine-learning">Machine Learning</option>
  <option value="rpa">Robotic Process Automation (RPA)</option>
  <option value="big-data-analytics">Big Data Analytics</option>
  <option value="project-management">Project Management</option>
</select>
              </Form.Item>
          <Form.Item  name='Cover image' label="Cover image"  rules={[
                  {
                    required: true,
                    message: 'Please select the category!',
                  },
                ]}>
          <Dragger {...props}>
    <p className="ant-upload-drag-icon">
      <InboxOutlined />
    </p>
    <p className="ant-upload-text">Click or drag file to this area to upload</p>
    <p className="ant-upload-hint">
      Support for a single or bulk upload. Strictly prohibited from uploading company data or other
      banned files.
    </p>
  </Dragger>
  </Form.Item>
  <Form.Item>
            <Button className="bg-black" type="primary" htmlType="submit">
              Post blog
            </Button>
          </Form.Item>
        </Form>
      </Modal>
   
        <div className="bg-white flex flex-col p-10">
      <div className='flex flex-col items-start relative group'> 
        <p className="text-sm pb-4">Blogs</p>
  <h1 className='text-3xl pb-4 font-bold hover:text-black hover:cursor-default'>Latest Blogs</h1>
  <div className='rounded-full bg-black w-10 h-[0.4rem] mt-2 
               absolute left-0 bottom-0 transition-all duration-500 ease-in-out shadow
                shadow-black group-hover:w-[10.6rem]'></div>
</div>
      <div className="mx-auto max-w-2xl px-8 py-16 sm:px-6 sm:py-10 lg:max-w-7xl lg:px-8">
   
     
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
       

       
       {/* filtered blog listing */}
       
        {filteredBLogsVisibility ?(  ( filteredBlogs?.length>0?
         ( filteredBlogs?.map((blog) => (
            <>
            <div key={blog._id} className="group flex flex-col items-center ">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden object-fill rounded-lg xl:aspect-h-8 xl:aspect-w-7">
              <Image
    width={250}
    height={110}
    src={blog.imageSrc}
    alt="Image was here."
    className="object-cover object-center group-hover:opacity-75"
  />
              </div>
              <h3 className="mt-4 text-md font-bold text-center text-gray-700 truncate w-4/5">{blog.title}</h3>
              <div className='flex flex-row mt-4'> <Button className='bg-black text-white' key="edit" onClick={() =>{ handleEdit(blog);setBlogId(blog._id)}}>
          <div className='flex flex-row justify-center text-center items-center'><PencilSquareIcon className='text-white mr-2' width={18} height={18}/>Edit</div>
        </Button>
        <Button className='border-[1px] ml-2 border-red-400 text-red-400' key="delete" type="danger" onClick={() => showDeleteConfirm(blog._id)}>
          Delete
        </Button></div>
             
              <button
             onClick={()=>{handleFilteredView(blog);setBlogId(blog._id)}}
                className=" mt-10 block w-full rounded-md bg-white hover:shadow-lg px-3 py-2 
                text-center text-sm font-semibold text-black shadow-[2px_2px_10px_0px_rgba(0,0,0,0.1)]
                 hover:bg-black hover:text-white focus-visible:outline focus-visible:outline-2 
                 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                <div className='flex flex-row justify-center items-center'>Read More
                  <ArrowRightOutlined className='pl-12' width={24} height={24}/></div>
              </button>
           
            </div>
               <Modal
               title="View blog"
               open={isViewFilterModalVisible}
               onCancel={()=>{handleModalCancelFiltered();setIsViewFilterModalVisible(false);}}
               afterClose={()=>{setIsViewFilterModalVisible(false)}}
               footer={null}
               className='h-[80vh] mb-10 pb-4'
               >
                 <p>Blog title:</p>
                <h1 className='text-xl font-bold'>{title}</h1> 
               <p className='pb-1 pt-2'>Blog description:</p>
               <div className="max-h-[30vh] overflow-y-scroll">
                <p>
                   {description}</p></div>
               <p className='pb-4 pt-2'>Blog image:</p>
                <Image
                 width={470}
                 height={235}
                 src={fileData}
                 alt="Image was here."
                 className="h-[30vh] w-[50vw] object-cover object-center group-hover:opacity-75"
               />
               </Modal>
               </>
          ))):
       <Empty
 image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
 imageStyle={{
   height: 60,
 }}
 description={
   <span>
     No Blogs found
   </span>
 }
 className=''
>
 
</Empty>
          )):
          
          
          //Normal blog listing
          
          ( blogs?.length>0&&(blogs?.map((blog) => (
            
            <div key={blog._id} className="group flex flex-col items-center ">
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden object-fill rounded-lg xl:aspect-h-8 xl:aspect-w-7">
              <Image
    width={250}
    height={110}
    src={blog.imageSrc}
    alt="Image was here."
    className="object-cover object-center group-hover:opacity-75"
  />
              </div>
            <h3 className="mt-4 text-md font-bold text-gray-700 truncate w-4/5">{blog.title}</h3>
            <div className='flex flex-row mt-4'> <Button className='bg-black text-white' key="edit" onClick={() =>{ handleEdit(blog);setBlogId(blog._id)}}>
            <div className='flex flex-row justify-center text-center items-center'><PencilSquareIcon className='text-white mr-2' width={18} height={18}/>Edit</div> 
      </Button>
      <Button className='border-[1px] ml-2 border-red-400 text-red-400' key="delete" type="danger" onClick={() => showDeleteConfirm(blog._id)}>
        Delete
      </Button></div>
           
            <button
               onClick={()=>{handleView(blog);setBlogId(blog._id)}}
              href="#"
              className=" mt-10 block w-full rounded-md bg-white hover:shadow-lg px-3 py-2 text-center text-sm font-semibold text-black shadow-[2px_2px_10px_0px_rgba(0,0,0,0.1)] hover:bg-black hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              Read More
                <ArrowRightOutlined className='pl-12' width={24} height={24}/>
            </button>
            <Modal
title="View blog"
open={isViewModalVisible}
onCancel={handleModalCancel}
footer={null}
className='h-[80vh]'
>
  <p>Blog title:</p>
 <h1 className='text-xl font-bold'>{title}</h1> 
<p className='pb-1 pt-2'>Blog description:</p>
<div className="max-h-[30vh] overflow-y-scroll">
 <p>
    {description}</p></div>
<p className='pb-4 pt-2'>Blog image:</p>
 <Image
  width={470}
  height={235}
  src={fileData}
  alt="Image was here."
  className="h-[30vh] w-[50vw] object-cover object-center group-hover:opacity-75"
/>
</Modal>
          </div>
          )
          ))
          )
          
          }



{blogs.length==0  && !filteredBLogsVisibility ?(<Empty
 image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
 imageStyle={{
   height: 60,
 }}
 description={
   <span>
     No Blogs Posted
   </span>
 }
>
 <Button type="primary" className='bg-black' onClick={handleAddBlog}><div className='flex flex-row items-center text-center text-white justify-center'>
          <PlusIcon className='text-white mr-2' width={18} height={18}/><p>Add Blog</p> </div></Button>
</Empty>):<></>}
  

          <Modal
title="Edit Blog"
open={visible}
onOk={() => updateBlog(blogId)}
onCancel={handleCancel}
afterClose={()=>{
  setTitle('');
setDescription('');
setCategory('');
setFileData(null);
form.resetFields();
}
}
confirmLoading={loading}>
<Form layout="vertical">
  <Form.Item label="Title" name="title">
    <Input 
      placeholder={title}
    
    value="title" onChange={(e) => setTitle(e.target.value)} />
  </Form.Item>

  <Form.Item label="Description" name="description">
    <TextArea
      rows={4}
      value="description"
      placeholder={description}
      onChange={(e) => setDescription(e.target.value)}
    />
  </Form.Item>
  <Form.Item
                name="projectContent"
                label="Type of Category"
                value={category}
              >
                <select
  value={category}
  className="w-full border-[0.5px] border-[#D9D9D9] p-[0.3rem] rounded hover:border-[#4096FF] hover:transition-all"
  onChange={(value)=>{setCategory(value);}}

>
  <option value="web-dev">Web App</option>
  <option value="mobile-app-dev">Mobile App</option>
  <option value="graphics-design">Graphics Design</option>
  <option value="project-consultancy">Project Consultancy</option>
  <option value="training-support">Training and Support</option>
  <option value="computer-installation-maintenance">Computer Installation and Maintenance</option>
  <option value="ui-ux-design">UI/UX Design</option>
  <option value="software-dev">Software Development</option>
  <option value="database-management">Database Management</option>
  <option value="cloud-computing">Cloud Computing</option>
  <option value="artificial-intelligence">Artificial Intelligence</option>
  <option value="cybersecurity">Cybersecurity</option>
  <option value="e-commerce-solutions">E-commerce Solutions</option>
  <option value="content-management-systems">Content Management Systems (CMS)</option>
  <option value="digital-marketing">Digital Marketing</option>
  <option value="data-analysis-visualization">Data Analysis and Visualization</option>
  <option value="it-infrastructure-management">IT Infrastructure Management</option>
  <option value="user-interface-design">User Interface Design</option>
  <option value="quality-assurance-testing">Quality Assurance and Testing</option>
  <option value="it-consulting">IT Consulting</option>
  <option value="network-administration">Network Administration</option>
  <option value="internet-of-things">Internet of Things (IoT)</option>
  <option value="virtual-reality">Virtual Reality (VR)</option>
  <option value="augmented-reality">Augmented Reality (AR)</option>
  <option value="machine-learning">Machine Learning</option>
  <option value="rpa">Robotic Process Automation (RPA)</option>
  <option value="big-data-analytics">Big Data Analytics</option>
  <option value="project-management">Project Management</option>
</select>
              </Form.Item>

<Form.Item label="Cover Image" name="cover_image">
<Dragger {...props} onChange={handleFileChange}>
{fileData ? (
<img src={coverImagePreview} alt="cover" style={{ width: '100%' }} />
) : (
<>
<p className="ant-upload-drag-icon">
<InboxOutlined />
</p>
<p className="ant-upload-text">Click or drag file to this area to upload</p>
</>
)}
</Dragger>
</Form.Item>

</Form>
</Modal>
        </div>
      </div>
    </div>
    </div>
  )
}

export default BlogManagement