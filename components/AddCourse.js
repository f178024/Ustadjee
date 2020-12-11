import Card from '../components/Card'
import { useState } from 'react'
// import UseDatabase from '../mongodb/mongodb'

function TimeDropdown() {
    const times = ["No Class", "08:00 am", "09:00 am", "10:00 am", "11:00 am", "12:00 pm", "01:00 pm", "02:00 pm", "03:00 pm", "04:00 pm", "05:00 pm", "06:00 pm", "07:00 pm", "08:00 pm"]

    return (
        <div>
            <select name="" id="" className="ml-4">
                {times.map(function (item) {
                    return (
                        <option>{item}</option>
                    )
                })}
            </select>
        </div>
    )

}

export default function AddCourse() {
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    // const db = useDatabase()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    function handleAddCourse() {

        let courseData = {
            title,
            description
        }

        console.log(courseData)


        fetch('/api/addcourse', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(courseData)
        }).then(result => {
            return result.text()
        }).then(result => {
            console.log(result)
        })

    }

    return (
        <div>
            <Card>
                <input type="text" name="title" id="title" placeholder="Title" onChange={event => setTitle(event.target.value)} /><br />
                <select name="" id="">
                    <option value="" selected disabled>Subject</option>
                    <option value="">Physics</option>
                    <option value="">Maths</option>
                    <option value="">Chemistry</option>
                    <option value="">English</option>
                </select>
                <select name="" id="">
                    <option value="" selected disabled>Topic</option>
                    <option value="">Maths</option>
                    <option value="">Maths</option>
                    <option value="">Chemistry</option>
                    <option value="">English</option>
                </select>
                <br />
                <table>
                    {days.map(function (item) {
                        return (
                            <tr>
                                <td>
                                    <label>{item}</label>
                                </td>
                                <td className="flex justify-center items-center">
                                    <TimeDropdown />
                                </td>
                            </tr>
                        )
                    })}
                </table>
                <input type="file" name="" />
                <br />
                <br />
                <textarea name="description" id="" cols="50" rows="8" placeholder="Description" onChange={event => setDescription(event.target.value)}></textarea><br />
                <input type="button" value="Add Course" onClick={handleAddCourse} />
            </Card>
        </div>
    )
}

