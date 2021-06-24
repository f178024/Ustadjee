function Card(props) {
    const {className} = props
    return (
            <div className={"bg-white shadow rounded-2xl px-8 py-4 sm:px-2 mt-6 " + className}>
                {props.children}
            </div>
    )
}


export default Card