import Card from './Card'
import AddFile from './AddFile'
import DeleteButton from '../components/DeleteButton'





export default function Files(props) {
    const { files, id, onDelete } = props

    function FilesTable(){
        return(
            <table className="w-full">
                {
                    files.map(function (item, index) {
                        return <tr key={index.toString()}>
                            <td><a href={'/api/course/' + id + '/files/' + item._id}>{item.name}</a></td>
                            <td>{item.date}</td>
                            <td className="text-right"><DeleteButton onClick={() => onDelete(index)}/></td>
                        </tr>
                    })
                }
            </table>

        )
    }

    return (
        <div className="mt-6">
            <div className="flex flex-row justify-between">
                <h2>Files</h2>
                <AddFile id={id}/>
            </div>
            <Card>
                {files.length > 0 ? (<FilesTable />) : <h2 className="text-gray-500">You haven't uploaded any files yet</h2>}
            </Card>
        </div >
    )
}