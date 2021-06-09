import Axios from 'axios'
import { useState } from 'react'
import Card from '../components/Card'
import DeleteButton from '../components/DeleteButton'
import {toast} from 'react-toastify'

function Question(props) {
    return (
        <div className="flex flex-row items-center">
            <div className="mr-4">
                {props.index}. {props.question}
            </div>
            <DeleteButton onClick={props.onRemove} />
        </div>
    )
}

export default function AddQuiz(props) {
    let {courseId} = props
    const [name, setName] = useState('')
    const [question, setQuestion] = useState('')
    const [option1, setOption1] = useState('')
    const [option2, setOption2] = useState('')
    const [option3, setOption3] = useState('')
    const [option4, setOption4] = useState('')
    const [correct, setCorrect] = useState('')
    const [questions, setQuestions] = useState([])

    function handleValue(event) {
        const id = event.target.id
        const val = event.target.value

        switch (id) {
            case 'name':
                setName(val)
                break

            case "question":
                setQuestion(val)
                break;

            case "option1":
                setOption1(val)
                break;

            case "option2":
                setOption2(val)
                break;

            case "option3":
                setOption3(val)
                break;

            case "option4":
                setOption4(val)
                break;

            default:
                break;
        }
    }

    function handleAddQuestion() {
        let addQuestion = {
            name: "",
            question: "",
            option1: "",
            option2: "",
            option3: "",
            option4: "",
            correct: ""
        }
        

        addQuestion.question = question
        addQuestion.option1 = option1
        addQuestion.option2 = option2
        addQuestion.option3 = option3
        addQuestion.option4 = option4
        addQuestion.correct = correct

        if(question == '' || option1 == '' || option2 == '' || option3 == '' || option4 == '') return

        setQuestions([...questions, addQuestion])
    }

    function handleRemoveQuestion(index) {
        let temp = [...questions];
        temp.splice(index, 1)
        setQuestions(temp)

        console.log(index, temp)
    }

    function resetQuiz(){
        setName('')
        setQuestion('')
        setOption1('')
        setOption2('')
        setOption3('')
        setOption4('')
        setQuestions([])
    }

    function handleAddQuiz() {
        Axios.post('/api/course/quiz/add',
            {
                courseId,
                name,
                questions: JSON.stringify(questions)
            }).then(result => {
            toast.success('Quiz Added!')
            resetQuiz()
        }).catch(err => {
            toast.error('Could not add quiz.')
        })
    }

    return (
        <div>
            <Card>
                <h2>Add Quiz</h2>
                <div className="mb-4">
                    {questions.map(function (item, index) {
                        return <Question index={index + 1} question={item.question} onRemove={() => { handleRemoveQuestion(index) }} />
                    })}
                </div>
                <div>
                    <input className="w-full text-xl p-2" type="text" id="name" placeholder="Quiz Name" onChange={handleValue} />
                    <input type="text" placeholder="Question" onChange={handleValue} id="question" className="w-1/2"/>
                    <div className="flex flex-row flex-wrap">
                        <input type="text" placeholder="Option 1" onChange={handleValue} id="option1" className="mr-2" />
                        <input type="text" placeholder="Option 2" onChange={handleValue} id="option2" className="mr-2" />
                        <input type="text" placeholder="Option 3" onChange={handleValue} id="option3" className="mr-2" />
                        <input type="text" placeholder="Option 4" onChange={handleValue} id="option4" className="mr-2" />
                    </div>
                    <div className="flex flex-row items-center">
                        <label className="mr-4">Correct: </label>
                        <select onClick={e => setCorrect(e.target.value)}>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                        </select>
                    </div>
                    <button onClick={handleAddQuestion}>Add Question</button>
                </div>

                <div className="flex flex-row justify-end">
                    <button onClick={handleAddQuiz}>Create Quiz</button>
                </div>
            </Card>
        </div>
    )
}
