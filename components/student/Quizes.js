import {useState, useEffect} from 'react'
import axios from 'axios'
import Card from './../Card'

export default function Quizes(props){
    const {courseId, quizes} = props

    function QuizTable(){
        return (
            <table className="w-full">
                {
                    quizes.map(function(item){
                        return <tr>
                            <td><a href={"/student/quiz/" + item._id}>{item.name}</a></td>
                            <td>{item.subject}</td>
                            <td>{new Date(item.date).toDateString()}</td>
                            <td>{item.questions.length} Questions</td>
                        </tr>
                    })
                }
            </table>
        )
    }

    return (
        <div>
            <h1>Quiz</h1>
            <Card>
                {quizes.length > 0 ? <QuizTable /> : <h1 className="text-gray-500">You haven't added any quiz yet</h1>}
            </Card>
        </div>
    )
}