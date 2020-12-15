import {useState} from "react";
import Axios from "axios";
import Card from "../components/Card";
import {toast} from 'react-toastify'

export default function settings() {
    const [file, setFile] = useState(null)


    function handleAddPicture() {
        if(file == null){
            console.log('a')
            return
        }

        var formData = new FormData();
        formData.append("file", file)

        Axios.post('/api/user/picture', formData).then(result => {
            console.log(result)
            toast.success('Picture Added')
            
        }).catch(err => {
            toast.error('Could not add picture')
            console.log(err.response.data.err.toString())
        })
    }

    return (
        <div>
            <Card>
                <div>
                    <input type="file" name="file" onChange={e => setFile(e.target.files[0])} />
                    <input type="button" value="Add Picture" onClick={handleAddPicture} />
                </div>
            </Card>
        </div>
    )
}