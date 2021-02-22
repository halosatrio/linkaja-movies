const Card = (props) => {
  const showTime = new Date(props.showTime).toLocaleDateString()
  return (
    <div className="h-60 max-h-60 rounded-lg border-black border-2 p-4">
      <p className="mt-24 text-center">
      {props.title}
      </p>
      <p className="text-xs mt-4 text-center">
        Show Time: {showTime}
      </p>
    </div>
  )
}

export default Card
