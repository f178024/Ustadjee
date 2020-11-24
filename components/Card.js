function Card(props) {
    return (
            <div className="bg-white shadow rounded-2xl p-8">
                {props.children}
            </div>
    )
}


export default Card