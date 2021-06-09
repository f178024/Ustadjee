import { useEffect, useState } from 'react'
import axios from 'axios'
import Menu from '../components/Menu'
import Topbar from '../components/Topbar'
import ContentArea from '../components/ContentArea'
import { faSearch, faChartPie, faCog, faClipboardList } from '@fortawesome/free-solid-svg-icons'

function TeacherDashboard(props) {
    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(true)
    const [items, setItems] = useState([
        { name: 'dashboard', link: '/parent', icon: faChartPie },
        { name: 'search', link: '/parent/search', icon: faSearch }, 
        { name: 'settings', link: '/parent/settings', icon: faCog },
   
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