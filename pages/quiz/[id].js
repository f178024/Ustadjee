import { useState } from 'react'
import { useRouter } from 'next/router'
import TeacherDashboard from '../../components/TeacherDashboard'
import Card from '../../components/Card'

const Post = () => {
    const router = useRouter()
    const { id } = router.query

    const [attempts, setAttempts] = useState([
        {
            id: "1",
            name: 'Sinan',
            marks: 10,
            date: "Yesterday"
        },
        {
            id: "1",
            name: 'Sinan',
            marks: 10,
            date: "Yesterday"
        },
        {
            id: "1",
            name: 'Sinan',
            marks: 10,
            date: "Yesterday"
        }
    ])
    const [total, setTotal] = useState(10)

    return (
        <TeacherDashboard>
            <h1>Information of quiz {id}</h1>
            <h2>Details</h2>
            <Card>
                <table className="w-full">
                    <tr>
                        <th>Name</th>
                        <th>Marks</th>
                        <th>Date</th>
                    </tr>
                    {
                        attempts.map(function(item){
                            return <tr>
                                <td>{item.name}</td>
                                <td>{item.marks}</td>
                                <td>{item.date}</td>
                            </tr>
                        })
                    }
                </table>
            </Card>
        </TeacherDashboard>
    )
}

export default Post