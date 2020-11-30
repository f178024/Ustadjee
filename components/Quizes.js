import {useState} from 'react'
import Card from './Card'

export default function Quizes(){
    const [quizes, setQuizes] = useState([
        {
            id: "1",
            name: "Open book quiz",
            subject: "Computer Science",
            date: "Yesterday",
            questions: 10
        },

        {
            id: "1",
            name: "Open book quiz",
            subject: "Computer Science",
            date: "Yesterday",
            questions: 10
        },

        {
            id: "1",
            name: "Open book quiz",
            subject: "Computer Science",
            date: "Yesterday",
            questions: 10
        }
    ])

    return (
        <div>
            <h2>Quizes</h2>
            <Card>
                <table className="w-full">
                    <tr>
                        <th>Name</th>
                        <th>Subject</th>
                        <th>Date</th>
                        <th>Questions</th>
                    </tr>
                    {
                        quizes.map(function(item){
                            return <tr>
                                <td><a href={"/quiz/" + item.id}>{item.name}</a></td>
                                <td>{item.subject}</td>
                                <td>{item.date}</td>
                                <td>{item.questions}</td>
                            </tr>
                        })
                    }
                </table>
            </Card>
        </div>
    )
}