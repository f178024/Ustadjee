import { useEffect, useState } from 'react'
import Card from './Card'
import axios from 'axios'
import { toast } from 'react-toastify';


function AddExpertSubject(props) {
    const [subject, setSubject] = useState('')
    function handleAddSubject() {
        axios.post('/api/user/subject', {
            subject
        }).then(result => {
            toast.success('Expert Subject Added!')
            props.onAdd(subject)
        }).catch(err => {
            toast.error('Could not add Subject')
            console.log(err)
        })
    }

    return (
        <div>
            <input type="text" name="subject" placeholder="Subject" onChange={e => setSubject(e.target.value)} />
            <input type="button" value="Add Subject" onClick={handleAddSubject} />
            
        </div>
    )
}

export default function Subject(props) {
    const [expertSubjects, setexpertSubjects] = useState([])

    useEffect(() => {
        axios.get('/api/user/subject').then(result => {
            setexpertSubjects(result.data.subject)
            console.log(result.data.subject)
        }).catch(err => {
            console.log(err)
        })
    }, [])

    function handleAddSubject(subject){
        setexpertSubjects([...subject, {subject}])
    }

    return (
        <div>
            <Card>
                {
                    expertSubjects.map(item => {
                        return (
                            <div className="mb-6">
                                <h2 className="py-0 my-0 text-base">{item}</h2>
                              
                            </div>
                        )
                    })
                }
                <AddExpertSubject onAdd={handleAddSubject}/>
            </Card>
        </div>
    )
}