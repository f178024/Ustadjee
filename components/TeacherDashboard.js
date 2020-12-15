import { useEffect, useState } from 'react'
import axios from 'axios'
import Menu from '../components/Menu'
import Topbar from '../components/Topbar'
import ContentArea from '../components/ContentArea'

function TeacherDashboard(props) {
    const [user, setUser] = useState({})
    
    useEffect(() => {
        axios.post('/api/user').then(result => {
            setUser(result.data)
        }).catch(err => {
            window.location.href = '/signin'
        })
    }, []);

    return (
        <div className="min-h-screen">
            <Topbar user={user} />
            <div className="flex flex-1 min-h-screen flex-row sm:flex-col">
                <Menu />
                <ContentArea>
                    {
                        props.children
                    }
                </ContentArea>
            </div>
        </div>
    )
}


export default TeacherDashboard