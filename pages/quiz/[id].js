import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import TeacherDashboard from '../../components/TeacherDashboard'
import Card from '../../components/Card'
import axios from 'axios'
import useDatabase from "../../mongodb/mongodb";
import {ObjectId} from "mongodb";

export default function Post(props) {
    const {quiz, attemptedQuizes} = props

    function getScore(answers){
        let score = 0

        answers.forEach((item, index) => {
            if(item === quiz.questions[index].correct) score++
        })

        return score
    }

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
                                <tr className="flex flex-row items-center"><td><input type="radio" name="" className="m-0 mr-4" disabled/></td><td><label>{item.option1}</label></td></tr>
                                <tr className="flex flex-row items-center"><td><input type="radio" name="" className="m-0 mr-4" disabled/></td><td><label>{item.option2}</label></td></tr>
                                <tr className="flex flex-row items-center"><td><input type="radio" name="" className="m-0 mr-4" disabled/></td><td><label>{item.option3}</label></td></tr>
                                <tr className="flex flex-row items-center"><td><input type="radio" name="" className="m-0 mr-4" disabled/></td><td><label>{item.option4}</label></td></tr>
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
                        attemptedQuizes.map(function (item) {
                            return <tr>
                                <td>{item.username}</td>
                                <td>{getScore(item.quizes.answers)}</td>
                                <td>{new Date(item.quizes.date).toDateString()}</td>
                            </tr>
                        })
                    }
                </table>
            </Card>
        </TeacherDashboard>
    )
}

export async function getServerSideProps(context){
    const {id} = context.params

    let db = await useDatabase()
    let results = await db.collection('Courses').aggregate([
        {
            $unwind: {
                path: '$quizes',
            }
        }, {
            $match: {
                "quizes._id": ObjectId(id)
            }
        }, {
            $project: {
                quizes: 1
            }
        }]).toArray()

    let quiz = JSON.parse(JSON.stringify(results[0].quizes))

    let attemptedQuizes = await db.collection('Users').aggregate([{$unwind: {
            path: "$quizes",
        }}, {$match: {
            "quizes._id": ObjectId(id)
        }}]).toArray()

    attemptedQuizes = JSON.parse(JSON.stringify(attemptedQuizes))

    return {
        props: {
            quiz,
            attemptedQuizes
        }
    }
}