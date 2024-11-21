export default function Img(props){
    const {...rest}=props
    return(
        <img src={props.img} {...rest} alt="" />
    )
}