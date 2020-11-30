function Card(props) {
    return (
            <div className="bg-white shadow rounded-2xl px-8 py-4">
                {props.children}
            </div>
    )
}


export default Card