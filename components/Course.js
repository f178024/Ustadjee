import { useState, useEffect } from 'react'
import axios from 'axios'

import ReactStars from 'react-stars'
import Card from './Card'
import Link from "next/link";
import AddQuiz from "./AddQuiz";


export default function Course() {
    const [courses, setCourses] = useState([])

    useEffect(() => {
        axios.get('/api/courses').then(result => {
            setCourses(result.data)
        }).catch(err => {
            console.log(err)
        })
    }, []);

    return (
        <div>
            <Card>
                <table className="w-full">
                    {
                        courses.map(function (item) {
                            return <tr>
                                <td><Link href={"/course/" + item._id}><a><img src={'/api/course/image/' + item._id} className="h-12"/></a></Link></td>
                                <td><Link href={"/course/" + item._id}><a>{item.title}</a></Link></td>
                                <td>{0} Students</td>
                                <td><ReactStars count={5} /></td>
                                <td className="text-sm text-gray-500">{new Date(item.created).toDateString()}</td>
                            </tr>

                        })
                    }
                </table>
            </Card>
        </div>
    )
}
