import { useState } from 'react'


import courses from "../pages/courses";
import Card from './Card'


export default function Course() {
    const [courses, setCourses] = useState([
        {
            id: "1",
            name: "Course 1",
            students: 69,
            rating: 5,
            created: "25 Nov, 2020"
        },
        {
            id: "2",
            name: "Course 2",
            students: 69,
            rating: 5,
            created: "25 Nov, 2020"
        },
        {
            id: "3",
            name: "Course 3",
            students: 69,
            rating: 5,
            created: "25 Nov, 2020"
        },
    ])

    return (
        <div>
            <Card>
                <table className="w-full">
                    <tr>
                        <th>Name</th>
                        <th>Students</th>
                        <th>Rating</th>
                        <th>Created</th>
                    </tr>
                    {
                        courses.map(function (item) {
                            return <tr>
                                <td><a href={"/course/" + item.id}>{item.name}</a></td>
                                <td>{item.students}</td>
                                <td>{item.rating}</td>
                                <td>{item.created}</td>
                            </tr>

                        })
                    }
                </table>
            </Card>
        </div>
    )
}
