import { faFileSignature } from "@fortawesome/free-solid-svg-icons"
import Card from './Card'
import AddFile from './AddFile'


export default function Files(props) {
    const { files, id } = props

    return (
        <div className="mt-6">
            <div className="flex flex-row justify-between">
                <h2>Files</h2>
                <AddFile />
            </div>
            <Card>
                <table className="w-full">
                    <tr className="mb-2">
                        <th>Name</th>
                        <th>Type</th>
                        <th>Uploaded</th>
                        <th>Delete</th>
                    </tr>
                    {
                        files.map(function (item) {
                            return <tr>
                                <td><a href={'/api/course/' + id + '/files/' + item._id}>{item.name}</a></td>
                                <td>{item.type}</td>
                                <td>{item.date}</td>
                                <td>Blank</td>
                            </tr>
                        })
                    }
                </table>
            </Card>
        </div>
    )
}