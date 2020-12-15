import {useState} from 'react'
import { toast } from 'react-toastify';

import Axios from 'axios'

export default function AddFile(props){
    const {id} = props
    const [file, setFile] = useState(null)

    function handleFile(){
        if(file == null){
            toast.error('Could not upload file')
            return
        }
        
        var formData = new FormData();
        
        formData.append("file", file)
        formData.append("id", id)
        Axios.post('/api/course/files', formData)
        .then(res => {
            toast.success('File Added')
        })
        .catch(err => {
            toast.error('Could not upload file')
            
            console.log(err)
        })
    }

    return (
        <div className="flex flex-row justify-end items-center mb-4">
            
            <input type="file" name="file" id="file" onChange={e => setFile(e.target.files[0])}/>
            <input type="button" value="Upload File" onClick={handleFile} />
            
        </div>
    )
}