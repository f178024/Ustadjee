import {useState} from "react";
import Axios from "axios";
import Card from "../components/Card";
import {toast} from 'react-toastify'
import {useRouter} from "next/router";

export default function settings() {
    const [file, setFile] = useState(null)
    const router = useRouter()

    function handleAddPicture() {
        if(file == null){
            console.log('a')
            return
        }

        let formData = new FormData();
        formData.append("file", file)

        Axios.post('/api/user/picture', formData).then(result => {
            console.log(result)
            router.reload()
            
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