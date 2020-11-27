import { useState } from 'react'
import MenuItem from './MenuItem'
import { faChartPie, faChalkboardTeacher, faBook, faCalendarAlt } from '@fortawesome/free-solid-svg-icons'

export default function Menu() {
    const [items, setItems] = useState([
        { name: 'dashboard', link: '/link', icon: faChartPie },
        { name: 'class', link: '/link', icon: faChalkboardTeacher },
        { name: 'students', link: '/link', icon: faChalkboardTeacher },
        { name: 'courses', link: '/link', icon: faBook },
        { name: 'schedule', link: '/link', icon: faCalendarAlt },
        { name: 'quiz', link: '/quiz', icon: faCalendarAlt }
    ])

    return (
        <nav>
            <ul className="p-0 m-0 w-32 flex flex-col pt-32 h-screen">
                {items.map(item => <MenuItem name={item.name} link={item.link} icon={item.icon} />)}
            </ul>
        </nav>
    )
}