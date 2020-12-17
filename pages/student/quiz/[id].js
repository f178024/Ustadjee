import { useState } from 'react'
import StudentDashboard from '../../../components/StudentDashboard'
import Card from '../../../components/Card'

export default function page() {
    const [questions, setQuestions] = useState([
        {
            question: 'Question 1',
            option1: 'First Option',
            option2: 'Second Option',
            option3: 'Third Option',
            option4: 'Fourth Option',
        },
        {
            question: 'Question 2',
            option1: 'First Option',
            option2: 'Second Option',
            option3: 'Third Option',
            option4: 'Fourth Option',
        },
    ])



    return (
        <StudentDashboard>
            <Card>
                {
                    questions.map(item => {
                        return <div>
                            <h2>{item.question}</h2>
                            <tr className="flex flex-row items-center"><td><input type="radio" name="" className="m-0 mr-4" /></td><td><label>{item.option1}</label></td></tr>
                            <tr className="flex flex-row items-center"><td><input type="radio" name="" className="m-0 mr-4" /></td><td><label>{item.option2}</label></td></tr>
                            <tr className="flex flex-row items-center"><td><input type="radio" name="" className="m-0 mr-4" /></td><td><label>{item.option3}</label></td></tr>
                            <tr className="flex flex-row items-center"><td><input type="radio" name="" className="m-0 mr-4" /></td><td><label>{item.option4}</label></td></tr>
                        </div>
                    })
                }
                <div className="flex flex-row justify-end">
                    <input type="submit" value="Submit Quiz" />
                </div>
            </Card>

        </StudentDashboard>
    )

}