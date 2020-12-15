import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

export default function DeleteButton(props) {
    return (
        <div>
            <button onClick={props.onClick} className="rounded-full w-8 h-8 bg-gray-500">
                <FontAwesomeIcon icon={faTimes} />
            </button>
        </div>
    )
}