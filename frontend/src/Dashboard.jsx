import React, {useEffect} from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { Link, Outlet,useNavigate } from 'react-router-dom'
import axios from 'axios'
import './style.css'


export default function Dashboard() {
    const navigate = useNavigate()
	axios.defaults.withCredentials = true;
	useEffect(()=>{
		axios.get('http://localhost:8081/dashboard')
		.then(res => {
			if(res.data.Status === "Success") {
				if(res.data.role === "admin") {
					navigate('/');
				} else {
					const id = res.data.id;
					navigate('/employeedetail/'+id)
				}
			} else {
				navigate('/Start')
			}
		})
	}, [])

    const handleLogout = () => {
		axios.get('http://localhost:8081/logout')
		.then(res => {
			navigate('/Start')
		}).catch(err => console.log(err));
	}

  return (
    <div className="container-fluid home 3">
    <div className="row flex-nowrap">
        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
            <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                <a href="/" className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                    <span className="fs-5 d-none d-sm-inline">Admin Dashboard</span>
                </a>
          
                <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                <li>
                        <Link to="" data-bs-toggle="collapse" className="nav-link px-0  text-white  align-middle">
                            <i className="fs-4 bi-speedometer2"></i> <span className="ms-1 d-none d-sm-inline">Dashboard</span> </Link>
                        
                    </li>
                    <li className="nav-item">
                        <Link to="/employee" className="nav-link align-middle  text-white  px-0">
                            <i className="fs-4 bi-people"></i> <span className="ms-1 d-none d-sm-inline">Manage Employee</span>
                        </Link>
                    </li>
                 
                  {/*<li>
                        <Link to="/profile" className="nav-link px-0  text-white align-middle">
                            <i className="fs-4 bi-person"></i> <span className="ms-1 d-none d-sm-inline">Profile</span></Link>
                    </li>
  */}
                   
                    <li onClick={handleLogout}>
                        <a href="#" className="nav-link px-0  text-white  align-middle">
                            <i className="fs-4 bi-power"></i> <span className="ms-1 d-none d-sm-inline">Logout</span> </a>
                    </li>
                </ul>
                
                
            </div>
        </div>
        <div className="col p-0 m-0">
            <div className='p-2 d-flex justify-content-center shadow'>
                <h4>Employee Management System</h4>
            </div>
            <Outlet/>
        </div>
    </div>
</div>
  )
}