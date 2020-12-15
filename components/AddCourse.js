import Card from '../components/Card'
import { toast } from 'react-toastify';
import { useState } from 'react'
import axios from 'axios'



function TimeDropdown(props) {
    const times = ["No Class", "08:00 am", "09:00 am", "10:00 am", "11:00 am", "12:00 pm", "01:00 pm", "02:00 pm", "03:00 pm", "04:00 pm", "05:00 pm", "06:00 pm", "07:00 pm", "08:00 pm"]

    return (
        <div>
            <select name="" id="" className="ml-4" onChange={e => props.onChange(props.day, e.target.value)}>
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
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [subject, setSubject] = useState('')
    const [topic, setTopic] = useState('')
    const [file, setFile] = useState(null)
    const [times, setTimes] = useState(['No Class', 'No Class', 'No Class', 'No Class', 'No Class', 'No Class', 'No Class'])

    function handleAddCourse() {
        let oTimes = {}
        times.forEach((time, index) => {
            oTimes[index] = time
        });

        let formData = new FormData()
        formData.append('title', title)
        formData.append('description', description)
        formData.append('subject', subject)
        formData.append('topic', topic)
        formData.append('times', JSON.stringify(oTimes))
        formData.append('file', file)
        

        axios.post('/api/addcourse', formData).then(result => {
            if(!result.data.err){
                toast.success('✔ Course Added')
            } else {
                toast.error('Could not process your request')
            }
        }).then(result => {
            console.log(result)
        })

    }

    function handleTimeChange(day, time){
        const index = days.indexOf(day)
        let temp = [...times]
        temp.splice(index, 1, time)
        setTimes(temp)
    }

    

    return (
        <div>
            <Card>
                <input type="text" name="title" id="title" placeholder="Title" onChange={event => setTitle(event.target.value)} /><br />
                <select name="" id="" onChange={e => setSubject(e.target.value)}>
                    <option value="" selected disabled>Subject</option>
                    <option value="">Physics</option>
                    <option value="">Maths</option>
                    <option value="">Chemistry</option>
                    <option value="">English</option>
                </select>
                <select name="" id="" onChange={e => setTopic(e.target.value)}>
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
                                    <TimeDropdown day={item} onChange={handleTimeChange} />
                                </td>
                            </tr>
                        )
                    })}
                </table>
                <input type="file" name="" onChange={e => setFile(e.target.files[0])}/>
                <br />
                <br />
                <textarea name="description" id="" cols="50" rows="8" placeholder="Description" onChange={event => setDescription(event.target.value)}></textarea><br />
                <input type="button" value="Add Course" onClick={handleAddCourse} />
            </Card>
            
        </div>
    )
}

