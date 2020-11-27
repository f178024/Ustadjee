import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPlus} from '@fortawesome/free-solid-svg-icons'

export default function AddFile(){
    return (
        <div className="flex flex-row justify-end items-center mb-4">
            Add File
            <button className="rounded-full p-4 ml-4">
                <FontAwesomeIcon icon={faPlus} />
            </button>
        </div>
    )
}