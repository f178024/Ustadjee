import {useState} from 'react'
import Card from './Card'

export default function CourseDetails(props){
    const {description, subject, topic} = props.course
    
    return (
        <div>
            <h2>Details</h2>
            <Card>
                <h3>Description</h3>
                <p>{description}</p><br/>

                <h3>Subject</h3>
                <p>{subject}</p><br/>

                <h3>Topic</h3>
                <p>{topic}</p><br/>

                
            </Card>
        </div>
    )
}