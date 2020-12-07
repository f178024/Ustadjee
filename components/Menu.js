import { useState } from 'react'
import {useRouter} from 'next/router'
import MenuItem from './MenuItem'
import { faChartPie, faChalkboardTeacher, faBook, faCalendarAlt, faUserGraduate, faCog } from '@fortawesome/free-solid-svg-icons'

export default function Menu() {
    const [items, setItems] = useState([
        { name: 'dashboard', link: '/', icon: faChartPie },
        { name: 'class', link: '/class', icon: faChalkboardTeacher },
        { name: 'students', link: '/students', icon: faUserGraduate },
        { name: 'courses', link: '/courses', icon: faBook },
        { name: 'quiz', link: '/quiz', icon: faCalendarAlt },
        { name: 'settings', link: '/settings', icon: faCog },
    ])

    const router = useRouter()

    return (
        <div>
            <nav>
                <ul className="p-0 m-0 w-20 flex flex-col pt-32 h-screen bg-gray-800 sm:flex-row sm:w-full sm:h-auto sm:pt-0">
                    {
                        items.map(
                            item => <MenuItem name={item.name} link={item.link} icon={item.icon} active={router.pathname == item.link}/>
                            )
                        }
                </ul>
            </nav>
        </div>
    )
}