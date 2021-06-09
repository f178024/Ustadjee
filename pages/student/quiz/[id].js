import StudentDashboard from '../../../components/StudentDashboard'
import Card from '../../../components/Card'
import useDatabase from "../../../mongodb/mongodb";
import withSession from "session/session";
import {ObjectId} from "mongodb"
import axios from "axios"
import Router from "next/router";



export default function page(props) {
    const { quiz, submitted } = props

    async function submitForm(e){
        e.preventDefault()

        const form = new FormData(e.target)
        const answers = []

        quiz.questions.forEach(item => {
            answers.push(form.get(item.question))
        })

        try {
            const result = await axios.post("/api/student/quiz/submit", {
                answers,
                quizId: quiz._id
            })
            console.log(result.data)

            Router.reload(window.location.pathname);
        } catch (e) {

        }

        return false
    }

    function getScore(){
        let score = 0

        quiz.questions.forEach(item => {
            if(item.answer === item.correct) score++
        })
        return score
    }

    return (
        <StudentDashboard>
            <Card>
                <h1>{ quiz.name }</h1>
                {
                    submitted ?
                        <h2>Score: { getScore() }/{ quiz.questions.length }</h2>
                        :
                        null
                }
                <form action="" onSubmit={submitForm}>
                {
                    quiz.questions.map(item => {
                        return <div key={item.question}>
                            <h2>{item.question}</h2>
                            <tr className="flex flex-row items-center"><td><input type="radio" name={item.question} className="m-0 mr-4" value="1" disabled={submitted} required/></td><td><label>{item.option1}</label></td></tr>
                            <tr className="flex flex-row items-center"><td><input type="radio" name={item.question} className="m-0 mr-4" value="2" disabled={submitted} required/></td><td><label>{item.option2}</label></td></tr>
                            <tr className="flex flex-row items-center"><td><input type="radio" name={item.question} className="m-0 mr-4" value="3" disabled={submitted} required/></td><td><label>{item.option3}</label></td></tr>
                            <tr className="flex flex-row items-center"><td><input type="radio" name={item.question} className="m-0 mr-4" value="4" disabled={submitted} required/></td><td><label>{item.option4}</label></td></tr>
                        </div>
                    })
                }
                <div className="flex flex-row justify-end">
                    { submitted ? null : <input type="submit" value="Submit Quiz" /> }

                </div>
                </form>
            </Card>

        </StudentDashboard>
    )

}

export const getServerSideProps = withSession(async function (context){
    let userId = context.req.session.get('id')
    let quizId = context.params.id

    let db = await useDatabase()
    let result = await db.collection('Courses').aggregate([{
        $unwind: {
            path: '$quizes',
        }
    }, {
        $match: {
            "quizes._id": ObjectId(quizId)
        }
    }, {
        $project: {
            quizes: 1
        }
    }]).toArray()

    if(result.length < 1){
        return {
            notFound: true
        }
    }
    const quiz = JSON.parse(JSON.stringify(result[0].quizes))

    let submittedQuizes = await db.collection('Users').findOne({
        _id: ObjectId(userId)
    }, {
        projection: {
            quizes: 1
        }
    })

    console.log(submittedQuizes)
    submittedQuizes = submittedQuizes.quizes

    let thisSubmittedQuiz = submittedQuizes.filter(item => item._id == quizId)
    let submitted = thisSubmittedQuiz.length > 0
    if(submitted){
        let answers = thisSubmittedQuiz[0].answers
        answers.forEach((item, index) => quiz.questions[index].answer = item)
    }

    console.log(quiz)



    return {
        props: {
            quiz,
            submitted,
        }
    }
})