import MenuOptions from "./Menu-option"

const Menu = () => {

    return (
        <div className="menu">

            <div>
                <MenuOptions 
                name = "Equipos"
                icon = "groups"
            />
            </div>
            <div>
                <MenuOptions 
                 name = "Chats"
                icon = "chats"
            />
            </div>
           
           <MenuOptions 
           name = "Tareas"
           icon = "tarea"
           />

        </div>
    )
}

export default Menu