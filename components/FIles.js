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
                    <th className="text-left text-xl text-gray-600">Name</th>
                    <th className="text-left text-xl text-gray-600">Type</th>
                    <th className="text-left text-xl text-gray-600">Uploaded</th>
                    <th className="text-left text-xl text-gray-600">Delete</th>
                </tr>
                {
                    files.map(function(item){
                        return <tr>
                            <td className="py-2 w-auto">{ item.name }</td>
                            <td className="py-2 w-auto">{ item.type }</td>
                            <td className="py-2 w-auto">{ item.date }</td>
                            <td>Blank</td>
                        </tr>
                    })
                }
            </table>
        </Card>
    )
}