import Detail from "./Detail"

function DetailList( {details} ) {


  return (
    <ul className="ml-4">
        {details?.map((detail, index) => {
            return <Detail detailText={detail.detail_text} key={index}/>
        })}
    </ul>
  )
}

export default DetailList