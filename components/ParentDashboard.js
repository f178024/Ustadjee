import { useEffect, useState } from 'react'
import axios from 'axios'
import Menu from '../components/Menu'
import Topbar from '../components/Topbar'
import ContentArea from '../components/ContentArea'
import { faSearch, faChartPie, faCog, faClipboardList, faBookReader } from '@fortawesome/free-solid-svg-icons'
import ('../node_modules/font-awesome/css/font-awesome.min.css');
function TeacherDashboard(props) {
    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(true)
    const [items, setItems] = useState([
        { name: 'Dashboard', link: '/parent', icon: faChartPie },
        { name: 'Search', link: '/parent/search', icon: faSearch }, 
        { name: 'Teacher', link: '/parent/searchTeacher', icon: faBookReader },
        { name: 'Settings', link: '/parent/settings', icon: faCog },
   
    ])

    useEffect(() => {
        axios.post('/api/user').then(result => {
            setUser(result.data)
            setLoading(false)
        }).catch(err => {
           console.log(err)
            window.location.href = '/signin'
        })
    }, []);


    function Dashboard(){
        return (
            <div className="min-h-screen">
                <Topbar user={user} />
                <div className="flex flex-1 min-h-screen flex-row sm:flex-col">
                    <Menu items={items}/>
                    <ContentArea>
                        {
                            props.children
                        }
                    </ContentArea>
                </div>
            </div>
        )
    }
    return <Dashboard />
}


export default TeacherDashboard