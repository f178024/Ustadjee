function ContentArea(props){
    return (
        <div className="flex flex-col bg-gray-100 flex-1 shadow-inner p-8">
            {props.children}
        </div>
    )
}


export default ContentArea