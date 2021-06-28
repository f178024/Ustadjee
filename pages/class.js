import Room from '../components/video/room'
import TeacherDashboard from '../components/TeacherDashboard'
import React, { useEffect, useState } from 'react';
import axios from 'axios'
import Card from '../components/Card'
import withSession from "../session/session";
import useDatabase from "../mongodb/mongodb";
import { ObjectId } from 'mongodb'
import { toast } from 'react-toastify';



function home(props) {
    const [token, setToken] = useState(null)
    const [name, setName] = useState('')
    const [dropdown, setDropdown] = useState('none')
    const { courses2 } = props
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
              
                {courses2.map(function (item) {
                    return (
                        <option>{item.subject} - {item.topic}</option>
                    )
                })}
            </select>


            {
                token != null && dropdown != 'none'?
                    // null
                    <Room token={token} roomName={dropdown} handleLogout={() => { }} />
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
    let courses2 = await db.collection("Courses").aggregate([
        {
            '$match': {
                'id': ObjectId(userId)
            }
        },

        { '$sort': { 'rating': -1 } }

    ]).project({ subject: 1, topic: 1, _id: 0 }).toArray()


    console.log(courses2)
    //  courses2 = JSON.parse(JSON.stringify(courses2))
    return {
        props: {
            courses2
        }
    }
})
