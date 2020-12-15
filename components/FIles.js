import Card from './Card'
import AddFile from './AddFile'
import DeleteButton from '../components/DeleteButton'


export default function Files(props) {
    const { files, id } = props

    return (
        <div className="mt-6">
            <div className="flex flex-row justify-between">
                <h2>Files</h2>
                <AddFile id={id}/>
            </div>
            <Card>
                <table className="w-full">
                {
                    files.map(function (item) {
                        return <tr>
                            <td><a href={'/api/course/' + id + '/files/' + item._id}>{item.name}</a></td>
                            <td>{item.date}</td>
                            <td className="text-right"><DeleteButton /></td>
                        </tr>
                    })
                }
                </table>
            </Card>
        </div >
    )
}