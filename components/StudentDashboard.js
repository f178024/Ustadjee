import { useEffect, useState } from 'react'
import axios from 'axios'
import Menu from '../components/Menu'
import Topbar from '../components/Topbar'
import ContentArea from '../components/ContentArea'
import { faSearch, faChartPie, faCog, faClipboardList, faChalkboardTeacher ,faBookReader } from '@fortawesome/free-solid-svg-icons'
import ('../node_modules/font-awesome/css/font-awesome.min.css');

function TeacherDashboard(props) {
    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(true)
    const [items, setItems] = useState([
        { name: 'Dashboard', link: '/student', icon: faChartPie },
        { name: 'Search', link: '/student/search', icon: faSearch },
        { name: 'Teacher', link: '/student/searchTeacher', icon: faBookReader },
        { name: 'Join Class', link: '/student/class', icon: faChalkboardTeacher },
      //  { name: 'quiz', link: '/student/quiz', icon: faClipboardList },
        { name: 'Settings', link: '/student/settings', icon: faCog },
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