import {useState} from 'react'
import Card from './Card'

export default function CourseDetails(){
    const [details, setDetails] = useState({
        description: 'Very nice description. This is a very nice course. Please take this course',
        subject: 'Computer Science',
        topic: 'C++',
        times: {
            monday: '08:00am',
            tuesday: '08:00am',
            wednesday: '08:00am',
            thursday: 'No Class',
            friday: 'No Class',
            saturday: 'No Class',
            sunday: 'No Class'
        }
    })
    return (
        <div>
            <h2>Details</h2>
            <Card>
                <h3>Description</h3>
                <p>{details.description}</p>

                <h3>Subject</h3>
                <p>{details.subject}</p>

                <h3>Subject</h3>
                <p>{details.topic}</p>

                <h3>Subject</h3>
                <p>{details.subject}</p>
            </Card>
        </div>
    )
}