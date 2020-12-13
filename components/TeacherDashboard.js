import { useEffect } from 'react'

import Menu from '../components/Menu'
import Topbar from '../components/Topbar'
import ContentArea from '../components/ContentArea'

function TeacherDashboard(props) {
    

    return (
        <div className="min-h-screen">
            <Topbar />
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