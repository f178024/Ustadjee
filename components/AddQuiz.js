import Axios from 'axios'
import {useState} from 'react'
import Card from '../components/Card'

function Question(props){
    return (
        <div className="flex flex-row items-center">
            <div className="mr-4">
                {props.index}. {props.question}
            </div>
            <button onClick={props.onRemove}>X</button>
        </div>
    )

}

export default function AddQuiz() {
    const [question, setQuestion] = useState('')
    const [option1, setOption1] = useState('')
    const [option2, setOption2] = useState('')
    const [option3, setOption3] = useState('')
    const [option4, setOption4] = useState('')
    const [questions, setQuestions] = useState([
        
    ])

    function handleValue(event){
        const id = event.target.id
        const val = event.target.value
        
        switch (id) {
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

    function handleAddQuestion(){
        var addQuestion = {
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

        setQuestions([...questions, addQuestion])
    }

    function handleRemoveQuestion(index){
        let temp = [...questions];
        temp.splice(index, 1)
        setQuestions(temp)

        console.log(index, temp)
    }

    function handleAddQuiz(){
        Axios.post('/api/quiz', {questions: JSON.stringify(questions)}).then(result => {
            console.log(result.data)
        }).catch(err => {

        })
    }

    return (
        <div>
            <Card>
                <h2>Add Quiz</h2>
                <div className="mb-4">
                    {questions.map(function(item, index){
                        return <Question index={index + 1} question={item.question} onRemove={() => {handleRemoveQuestion(index)}}/>
                    })}
                </div>
                <div>
                    <input type="text" placeholder="Question" onChange={handleValue} id="question"/>
                    <input type="text" placeholder="Option 1" onChange={handleValue} id="option1"/>
                    <input type="text" placeholder="Option 2" onChange={handleValue} id="option2"/>
                    <input type="text" placeholder="Option 3" onChange={handleValue} id="option3"/>
                    <input type="text" placeholder="Option 4" onChange={handleValue} id="option4"/>
                    <div className="flex flex-row items-center">
                        <label className="mr-4">Correct: </label>
                        <select>
                            <option value="">1</option>
                            <option value="">2</option>
                            <option value="">3</option>
                            <option value="">4</option>
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
