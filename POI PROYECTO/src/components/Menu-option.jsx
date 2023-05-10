
const menuOption = (props) => {

    return (
        <div className="menuOptions">
            <img alt="" src={require(`../img/icons/icon-${props.icon}.png`)}/>
            <p>{props.name}</p>
        </div>
    )
}

export default menuOption