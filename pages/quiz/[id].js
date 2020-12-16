import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import TeacherDashboard from '../../components/TeacherDashboard'
import Card from '../../components/Card'
import axios from 'axios'

const Post = () => {
    const router = useRouter()


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
    const [id, setId] = useState(null)
    const [quiz, setQuiz] = useState({ questions: [] })
    const [total, setTotal] = useState(10)

    useEffect(() => {
        const { id } = router.query
        if (id == null) return
        setId(id)

        axios.get('/api/quiz/' + id).then(result => {
            setQuiz(result.data)
            console.log(result.data)
        })
    }, [router])

    return (
        <TeacherDashboard>
            <h1>Information of {quiz.name}</h1>
            <h2>Qustions</h2>
            <Card>
                <table className="w-full">
                    {
                        quiz.questions.map((item, index) => {
                            return <div>
                                <h2>{index + 1}. {item.question}</h2>
                                <tr className="flex flex-row items-center"><td><input type="radio" name="" className="m-0 mr-4" /></td><td><label>1. {item.option1}</label></td></tr>
                                <tr className="flex flex-row items-center"><td><input type="radio" name="" className="m-0 mr-4" /></td><td><label>2. {item.option2}</label></td></tr>
                                <tr className="flex flex-row items-center"><td><input type="radio" name="" className="m-0 mr-4" /></td><td><label>3. {item.option3}</label></td></tr>
                                <tr className="flex flex-row items-center"><td><input type="radio" name="" className="m-0 mr-4" /></td><td><label>4. {item.option4}</label></td></tr>
                            </div>
                        })
                    }
                </table>
            </Card>
            <h2>Details</h2>
            <Card>
                <table className="w-full">
                    <tr>
                        <th>Name</th>
                        <th>Marks</th>
                        <th>Date</th>
                    </tr>
                    {
                        attempts.map(function (item) {
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