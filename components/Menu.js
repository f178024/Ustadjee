import { useState } from 'react'
import {useRouter} from 'next/router'
import MenuItem from './MenuItem'
import { faChartPie, faChalkboardTeacher, faBook, faCalendarAlt, faClipboardList, faCog } from '@fortawesome/free-solid-svg-icons'

export default function Menu() {
    const [items, setItems] = useState([
        { name: 'dashboard', link: '/', icon: faChartPie },
        { name: 'class', link: '/class', icon: faChalkboardTeacher },
        { name: 'courses', link: '/courses', icon: faBook },
        { name: 'quiz', link: '/quiz', icon: faClipboardList },
        { name: 'settings', link: '/settings', icon: faCog },
    ])

    const router = useRouter()

    return (
        <div>
            <nav className="h-full">
                <ul className="p-0 m-0 w-20 h-full flex flex-col pt-32 bg-gray-800 sm:flex-row sm:w-full sm:h-auto sm:pt-0">
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