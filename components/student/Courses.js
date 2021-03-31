import {useState, useEffect} from 'react'
import Link from 'next/link'

import Card from './../Card'
import axios from "axios";

export default function Courses(props){
    const [courses, setCourses] = useState([])

    useEffect(() => {
        axios.get("/api/student/course/registeredCourses").then(result => {
            let data = result.data
            setCourses(data)
            console.log(data)
        })
    }, [])


    return (
        <div>
            <h2>Courses</h2>
            <Card>
                { courses.map(item => (
                    <Link href={"student/course/" + item._id}>
                        <a>{ item.title }</a>
                    </Link>
                )) }
            </Card>
        </div>
    )
}