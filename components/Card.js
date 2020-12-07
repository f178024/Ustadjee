function Card(props) {
    return (
            <div className="bg-white shadow rounded-2xl px-8 py-4 sm:w-full sm:px-2">
                {props.children}
            </div>
    )
}


export default Card