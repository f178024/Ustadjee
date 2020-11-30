import { faFileSignature } from "@fortawesome/free-solid-svg-icons";
import Card from './Card'


export default function Files(){
    const files = [
        {
            name: 'syllabus.pdf',
            type: 'document/pdf',
            date: '2 days ago',
        },
        {
            name: 'syllabus.pdf',
            type: 'document/pdf',
            date: '2 days ago',
        },
        {
            name: 'syllabus.pdf',
            type: 'document/pdf',
            date: '2 days ago',
        },
    ]
    return (
        <Card>
            <table className="w-full">
                <tr className="mb-2">
                    <th>Name</th>
                    <th>Type</th>
                    <th>Uploaded</th>
                    <th>Delete</th>
                </tr>
                {
                    files.map(function(item){
                        return <tr>
                            <td>{ item.name }</td>
                            <td>{ item.type }</td>
                            <td>{ item.date }</td>
                            <td>Blank</td>
                        </tr>
                    })
                }
            </table>
        </Card>
    )
}