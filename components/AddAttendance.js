import {useEffect, useState} from 'react'
import axios from 'axios'
import Card from "./Card";

export default function AddAttendance(props) {
    const {students, courseId} = props
    const [attendance, setAttendance] = useState([])
    const [date, setDate] = useState(new Date().toLocaleDateString('en-CA'))

    async function addAttendance(id, status){
        let temp = [...attendance]
        for(let i = 0; i < temp.length; i++){
            if(temp.id === id) temp.status = status
        }
        setAttendance(temp)
    }

    async function updateAttendance(){
        let result = await axios.post("/api/course/attendance/update", {attendance, date, courseId})

    }

    useEffect(() => {
        let temp = students.map(item => {return {id: item._id, username: item.username, status: 'N/A'}})
        setAttendance(temp)
    }, [])

    return (
        <div>
            <h2>Attendance</h2>
            <Card>
                <input type="date" name="" id="" onChange={e => setDate(e.target.value)} value={date}/>
                <table className="w-full">
                    <tr>
                        <th className="text-left">Name</th>
                        <th className="text-left">Status</th>
                    </tr>
                    {
                        attendance.map(function (item) {
                            return <tr>
                                <td>{item.username}</td>
                                <td>
                                    <select defaultValue={item.status} onChange={(e) => addAttendance(item._id, e.target.value)}>
                                        <option value="Present">Present</option>
                                        <option>Absent</option>
                                        <option>N/A</option>
                                    </select>
                                </td>
                            </tr>
                        })
                    }
                </table>
                <button onClick={updateAttendance}>Update</button>
            </Card>
        </div>
    )
}