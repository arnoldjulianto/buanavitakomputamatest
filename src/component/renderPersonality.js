
const RenderPersonality = (props) => {
    return(
      <span className={props.text != "" ? "bg-danger text-white p-2 mx-2 rounded-pill " : ""}>
          {props.text}
      </span>
    )
}

export default RenderPersonality;  