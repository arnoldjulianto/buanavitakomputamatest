

const RenderOrigin = (props) => {
    const country = props.country_code;
    return(
      <span className="p-2 rounded-pill" style={{backgroundColor:'lightgrey'}}>
        <img src={"https://countryflagsapi.com/png/"+country} style={{width:25, height:25, borderRadius:25}} className="me-2 mb-1" />
        {props.origin}
      </span>
    )
}

export default RenderOrigin;