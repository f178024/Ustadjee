import Card from '../components/Card'

function TimeDropdown() {
    const times = ["No Class", "08:00 am", "09:00 am", "10:00 am", "11:00 am", "12:00 pm", "01:00 pm", "02:00 pm", "03:00 pm", "04:00 pm", "05:00 pm", "06:00 pm", "07:00 pm", "08:00 pm"]

    return (
        <div>
            <select name="" id="" className="ml-4">
                {times.map(function (item) {
                    return (
                        <option>{item}</option>
                    )
                })}
            </select>
        </div>
    )

}

export default function AddCourse() {
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]


    return (
        <div>
            <form>
                <Card>
                    <input type="text" name="title" id="title" placeholder="Title" /><br />



                    <select name="" id="">
                        <option value="" selected disabled>Subject</option>
                        <option value="">Physics</option>
                        <option value="">Maths</option>
                        <option value="">Chemistry</option>
                        <option value="">English</option>
                    </select>
                    <select name="" id="">
                        <option value="" selected disabled>Topic</option>
                        <option value="">Maths</option>
                        <option value="">Maths</option>
                        <option value="">Chemistry</option>
                        <option value="">English</option>
                    </select>
                    <br />
                    <table>
                        {days.map(function (item) {
                            return (
                                <tr>
                                    <td>
                                        <label>{item}</label>
                                    </td>
                                    <td className="flex justify-center items-center">
                                        <TimeDropdown />
                                    </td>
                                </tr>
                            )
                        })}
                    </table>
                    <input type="file" name=""/>
                    <br />
                    <br />
                    <textarea name="description" id="" cols="50" rows="8" placeholder="Description"></textarea><br />
                    <input type="button" value="Add Course" />
                </Card>
            </form>
        </div>

    )
}