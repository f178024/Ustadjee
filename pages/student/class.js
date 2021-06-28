import Room from '../../components/video/room'
import TeacherDashboard from '../../components/StudentDashboard'
import React, { useEffect, useState } from 'react';
import axios from 'axios'
import withSession from "../../session/session";
import useDatabase from "../../mongodb/mongodb";
import { ObjectId } from 'mongodb'
import Card from '../../components/Card'


function home(props) {
    const [token, setToken] = useState(null)
    const [name, setName] = useState('')
    const [dropdown, setDropdown] = useState('none')
    const {finalTitles} = props

    console.log("titles", finalTitles)

        useEffect(() => {
            axios.post('/api/video/token', { roomName: dropdown}).then(response => {
                setToken(response.data.token)
                console.log(token)
           
        }).catch(err => { toast.error('Could not connect to twilio')})
        })

   
   
        return (
       <TeacherDashboard>

<Card>   <h1>Select the course to Start the Class</h1>   </Card>

<h3>Courses:</h3>
<select name="" id="" className="ml-4" onChange={e => setDropdown(e.target.value)}>

  <option disabled selected>Select course</option>
    {finalTitles?.map(function (item) {
        return (
            <option>{item.subject} - {item.topic}</option>
        )
    })}
</select>

          {
               
                token != null && dropdown !='none'?
                // null
                <Room token={token} roomName={dropdown} handleLogout={() => {}} />
                :
                null
            }
        </TeacherDashboard>
    )
 }
export default home


export const getServerSideProps = withSession(async function (context) {
    const userId = context.req.session.get('id')


    const db = await useDatabase()
    let courses2 = await db.collection("Users").aggregate([
        {
            '$match': {
                '_id': ObjectId(userId)
            }
        }
    ]).project({courses: 1, _id: 0}).toArray()

    // courses2 = JSON.parse(JSON.stringify(courses2))
    courses2 = courses2[0].courses

    console.log(courses2)
  //  console.log(courses2[0].courses[1])
 
     let subjectandTitle
     let finalTitles = new Array()
    for (var i=0; i < courses2.length; i++)
    {
         subjectandTitle = await db.collection("Courses").aggregate([
            {
                '$match': {
                    '_id': ObjectId(courses2[i])
                }
            }
        ]).project({ subject: 1, topic: 1, _id: 0 }).toArray()

        console.log(subjectandTitle)
        finalTitles.push(subjectandTitle[0])
    }
  
    return {
        props: {
            finalTitles
        }
    }
})
