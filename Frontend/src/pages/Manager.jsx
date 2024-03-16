import React , {useEffect} from 'react'
import Header from '../components/Header'
import Sidebar from "../components/SideBar";
import SidebarData from '../assets/Data/ManagerSideBarData';
import { useSelector, useDispatch } from 'react-redux'
import { setActivePage } from '../features/pageSlice'

const Manager = () => {

    const dispatch = useDispatch()

    useEffect(() => {
    
    
        dispatch(setActivePage("manager")) 
      
    }, [])

    return (
        <div>
            <Sidebar SidebarData={SidebarData}/>
            <Header />
        </div>
    )
}

export default Manager;