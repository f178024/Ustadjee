import { useState } from 'react'
import StudentDashboard from '../../components/ParentDashboard'
import ReactStars from 'react-stars'

function Course(props) {
    const {user, title, subject, topic, rating} = props.course
    return (
        <div className="bg-white rounded-lg shadow inline-block">
            <div className="flex flex-col justify-end">
                <div className="bg-gray-400 h-24 w-full"/>
                <div className="p-4">
                    <div className="flex flex-row items-center">
                        <div className="rounded-full w-6 h-6 bg-gray-400 mr-2"/>
                        <p>{user}</p>
                    </div>
                    <p className="m-0 mt-2 text-md">{title}</p>
                    <p className="m-0 text-sm text-gray-500">{subject} - {topic}</p>
                    <div className="mt-2">
                        <ReactStars value={rating} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function index() {
    const [search, setSearch] = useState([
        {
            user: 'Sinan',
            title: 'C++ 4 lyfe',
            subject: 'Computer Science',
            topic: 'C++',
            rating: 4.5
        },
        {
            user: 'Sinan',
            title: 'C++ 4 lyfe',
            subject: 'Computer Science',
            topic: 'C++',
            rating: 4
        },
        {
            user: 'Sinan',
            title: 'C++ 4 lyfe',
            subject: 'Computer Science',
            topic: 'C++',
            rating: 4
        },
        {
            user: 'Sinan',
            title: 'C++ 4 lyfe',
            subject: 'Computer Science',
            topic: 'C++',
            rating: 4
        }
    ])

    return (
        <div>
            <StudentDashboard>
                <div className="flex flex-row w-full justify-center">
                    <input type="text" name="" id="" />
                    <input type="button" value="Search" />
                </div>

                <div className="grid grid-cols-5 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4">
                {
                    search.map(item => {
                        return <Course course={item} />
                    })
                }
                </div>

            </StudentDashboard>
        </div>
    )

}