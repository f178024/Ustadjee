import {useState, useEffect} from 'react'
import axios from 'axios'
import Card from './Card'

export default function Quizes(){
    const [quizes, setQuizes] = useState([])

    useEffect(() => {
        axios.get('/api/quiz').then(result => {
            console.log(result.data)
            setQuizes(result.data)
        }).catch(err => {
            console.log(err)
        })
    }, []);

    return (
        <div>
            <h1>Quizes</h1>
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
                                <td>{item.questions.length}</td>
                            </tr>
                        })
                    }
                </table>
            </Card>
        </div>
    )
}