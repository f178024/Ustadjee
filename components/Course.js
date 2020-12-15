import { useState, useEffect } from 'react'
import axios from 'axios'

import ReactStars from 'react-stars'
import Card from './Card'


export default function Course() {
    const [courses, setCourses] = useState([])

    useEffect(() => {
        axios.get('/api/courses').then(result => {
            // console.log(result.data)
            setCourses(result.data)
        }).catch(err => {
            console.log(err)
        })
    }, []);

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
                                <td><a href={"/course/" + item._id}>{item.title}</a></td>
                                <td>{0}</td>
                                <ReactStars count={5} />
                                <td>{new Date(item.created).toGMTString()}</td>
                            </tr>

                        })
                    }
                </table>
            </Card>
        </div>
    )
}
