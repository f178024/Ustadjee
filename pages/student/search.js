import {useEffect, useState} from 'react'
import StudentDashboard from '../../components/StudentDashboard'
import ReactStars from 'react-stars'
import axios from 'axios'

function Course(props) {
    const {_id, user, title, subject, topic, rating} = props.course
    return (
        <div className="bg-white rounded-lg shadow inline-block">
            <div className="flex flex-col justify-end">
                <img src={"/api/course/image/" + _id} alt=""height={200}/>
                
                <div className="p-4">
                    <div className="flex flex-row items-center">
                        <img className="rounded-full w-6 h-6 bg-gray-400 mr-2" src={"/images/user/" + user._id + ".png"}/>
                        <p>{user.username}</p>
                    </div>
                    <a href={"/student/course/" + _id} className="m-0 mt-2 text-md">{title}</a>
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
    const [courses, setCourses] = useState([])

    useEffect(() => {
        axios.get('/api/student/course/search').then(result => {
            console.log(result.data)
            setCourses(result.data)
        })
    }, [])

    return (
        <div>
            <StudentDashboard>
                <div className="flex flex-row w-full justify-center">
                    <input type="text" name="" id="" />
                    <input type="button" value="Search" />
                </div>

                <div className="grid grid-cols-5 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4">
                {
                    courses.map(item => {
                        return <Course course={item} />
                    })
                }
                </div>

            </StudentDashboard>
        </div>
    )

}