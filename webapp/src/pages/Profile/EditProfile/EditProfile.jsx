import {images} from "../../../helpers/images";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPen, faTrashCan} from "@fortawesome/free-solid-svg-icons";
import React, {useState,useEffect} from "react";
import InputText from "../../components/InputText";
import InputPassword from "../../components/InputPassword";
import {useForm, Form} from "../../../hooks/profileEditForm";
import HorizontalSpliter from "../../components/HorizontalSpliter";
import userService from "../../../services/userService";
import gameService from "../../../services/gameService";
import AccountCreation from "./AccountCreation";
import {useAlert} from "../../../context/AlertContext";
import leagueOfLegendsService from "../../../services/leagueOfLegendsService";
import valorantService from "../../../services/valorantService";
import "../Profile.css";
import {useNavigate} from "react-router";
import DeleteUserModal from "./DeleteUserModal";
import {applyTheme} from "../../../context/theme";

function EditProfile (props) {

    const [imgModal, setImgModal] = useState(false);
    const [iconSelected, setIconSelected] = useState("icon_default.jpg");
    const [profileInfo, setProfileInfo] = useState(JSON.parse(localStorage.getItem("user")));
    const [games, setGames] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [accounts, setAccounts] = useState([]);
    const { showAlert } = useAlert();
    const navigate = useNavigate();

    useEffect(() => {
        getProfileInfo();
        getGamesInfo();
    }, []);

    const getProfileInfo = async () => {

        let userId = JSON.parse(localStorage.getItem("user")).uid;

        try {
            let response = await userService.getUser(userId)
            setProfileInfo(response);
            setAccounts(response.accounts);
            setIconSelected(response.icon);
        }catch(error){
        }
    }

    const getGamesInfo = async () => {
        try{
            let response = await gameService.getGames();
            setGames(response.games);
        }catch(error){
        }
    }

    const getGameName = (gameId) => {
        for(let game of games) {
            if(game.uid === gameId) {
                return game.name;
            }
        }
    }

    const getGamesNames = () => {
        return games.map((game) => game.name);
    }

    const getGameId = (gameName) => {
        for(let game of games) {
            if(game.name === gameName) {
                return game.uid;
            }
        }
    }

    const validate = (fieldValues = values) => {

        const temp = { ...errors }

        temp.password = '';

        if ('name' in fieldValues) {
            temp.name = fieldValues.name ? '' : 'Campo obligatorio'
        }
        if ('email' in fieldValues) {
            if(!fieldValues.email) {
                temp.email = "Campo obligatorio";
            }else{
                const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                if(emailRegex.test(values.email)){
                    temp.email = "";
                }else{
                    temp.email = "Formato de email invalido"
                }
            }
        }
        if ('password' in fieldValues) {
            if(fieldValues.password === ''){
                temp.password = ''
            }else{
                const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]/;
                if(regex.test(fieldValues.password)){
                    if(fieldValues.password.length<8){
                        temp.password = 'La contraseña debe tener una longitud mínima de 8 caracteres'
                    }else{
                        temp.password = '';
                    }
                }else{
                    temp.password = 'La contraseña debe tener al menos una minúscula, una mayúscula y un número'
                }
            }

            if (fieldValues.password !== values.repeatpassword) {
                temp.repeatpassword = "Las contraseñas deben coincidir";
            } else {
                temp.repeatpassword = '';
            }
        }
        if ('repeatpassword' in fieldValues) {
            if (values.password !== fieldValues.repeatpassword) {
                temp.repeatpassword = "Las contraseñas deben coincidir";
            } else {
                temp.repeatpassword = '';
            }
        }

        setErrors({
            ...temp
        })

        if (fieldValues === values) { return Object.values(temp).every(x => x === '') }
    }

    const {
        values,
        errors,
        setErrors,
        handleInputChange
    } = useForm({...profileInfo, password:"", repeatpassword:""}, true, validate);

    const getAccountInputs = (account) => {
        switch(getGameName(account.game)){
            case "League of Legends":
                return <>
                    <div className="size-2-6">
                        <InputText disabled={true} label={"ID Usuario"} id={"userid"} name={"userid"} placeholder={"ID Usuario"} defaultValue={account.leagueOfLegendsAccountInfo.gameName}  />
                    </div>
                    <div className="size-1-6">
                        <InputText disabled={true} label={"TAG"} id={"tag"} name={"tag"} placeholder={"TAG"} defaultValue={account.leagueOfLegendsAccountInfo.tagLine}  />
                    </div>
                </>
            case "Valorant":
                return <>
                    <div className="size-2-6">
                        <InputText disabled={true} label={"ID Usuario"} id={"userid"} name={"userid"} placeholder={"ID Usuario"} defaultValue={account.valorantAccountInfo.gameName}  />
                    </div>
                    <div className="size-1-6">
                        <InputText disabled={true} label={"TAG"} id={"tag"} name={"tag"} placeholder={"TAG"} defaultValue={account.valorantAccountInfo.tagLine}  />
                    </div>
                </>
            case "Pokemon VGC":
                return <>
                    <div className="size-3-6">
                        <InputText disabled={true} label={"Pokemon ID"} id={"userid"} name={"userid"} placeholder={"ID"} defaultValue={account.pokemonVGCAccountInfo.profileId} />
                    </div>
                </>
            default:
                return <>
                    <div className="size-3-6">
                        <InputText disabled={true} label={"ID Usuario"} id={"userid"} name={"userid"} placeholder={"ID"} defaultValue={""} />
                    </div>
                </>
        }
    }

    const checkExistence = (data) => {
        for (let account of accounts) {
            if(account.game === data.game){
                switch(getGameName(data.game)){
                    case "League of Legends":
                        if(account.leagueOfLegendsAccountInfo.puuid === data.leagueOfLegendsAccountInfo.puuid)
                            return true;
                        break;
                    case "Valorant":
                        if(account.valorantAccountInfo.puuid !== data.valorantAccountInfo.puuid)
                            return true;
                        break;
                    case "Pokemon VGC":
                        if(account.pokemonVGCAccountInfo.profileId !== data.pokemonVGCAccountInfo.profileId)
                            return true;
                        break;
                    default:
                        break;
                }
            }
        }
        return false;
    }

    const addAccount = async (data) => {
        switch (getGameName(data.game)) {
            case "League of Legends":
                try {
                    let result = await leagueOfLegendsService.getAccountData(data.userid, data.tag);

                    if(result.puuid === undefined){
                        showAlert("La cuenta no existe", "error");
                        break;
                    }

                    let newAccount = {
                        game: data.game,
                        leagueOfLegendsAccountInfo: result
                    }

                    if(!checkExistence(newAccount)){
                        let newAccounts = [...accounts, newAccount]

                        setAccounts(newAccounts);
                        showAlert("Cuenta añadida correctamente", "success");
                    }else{
                        showAlert("La cuenta ya existe", "error");
                    }
                } catch (e) {
                    showAlert("Ha ocurrido un problema al añadir la cuenta", "error");
                }
                break;
            case "Valorant":
                try {
                    let result = await valorantService.getAccountData(data.userid, data.tag);

                    if(result.puuid === undefined){
                        showAlert("La cuenta no existe", "error");
                        break;
                    }

                    let newAccount = {
                        game: data.game,
                        valorantAccountInfo: result
                    }

                    if(!checkExistence(newAccount)){
                        let newAccounts = [...accounts, newAccount]

                        setAccounts(newAccounts);
                        showAlert("Cuenta añadida correctamente", "success");
                    }else{
                        showAlert("La cuenta ya existe", "error");
                    }
                } catch (e) {
                    showAlert("Ha ocurrido un problema al añadir la cuenta", "error");
                }
                break;
            case "Pokemon VGC":
                let newAccount = {
                    game: data.game,
                    pokemonVGCAccountInfo: {
                        profileId: data.userid
                    }
                }

                if(!checkExistence(newAccount)) {
                    let newAccounts = [...accounts, newAccount]

                    setAccounts(newAccounts);
                    showAlert("Cuenta añadida correctamente", "success");
                }else{
                    showAlert("La cuenta ya existe", "error");
                }
                break;
            default:
                break;
        }
    }

    const deleteAccount = async (data) => {

        setAccounts(accounts.filter((account) => {

            if(account.game !== data.game){
                return true;
            }else{
                switch(getGameName(data.game)){
                    case "League of Legends":
                        return account.leagueOfLegendsAccountInfo.puuid !== data.leagueOfLegendsAccountInfo.puuid;
                    case "Valorant":
                        return account.valorantAccountInfo.puuid !== data.valorantAccountInfo.puuid;
                    case "Pokemon VGC":
                        return account.pokemonVGCAccountInfo.profileId !== data.pokemonVGCAccountInfo.profileId;
                    default:
                        return false;
                }
            }
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        let checkErrors = { ...errors }

        if (!values.name) {
            checkErrors.name = "Campo obligatorio"
        }
        if (!values.email) {
            checkErrors.email = "Campo obligatorio"
        }else{
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if(emailRegex.test(values.email)){
                checkErrors.email = "";
            }else{
                checkErrors.email = "Formato de email invalido"
            }
        }
        if(values.password) {
            const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]/;
            if(regex.test(values.password)){
                if(values.password.length<8){
                    checkErrors.password = 'La contraseña debe tener una longitud mínima de 8 caracteres'
                }else{
                    checkErrors.password = '';
                }
            }else{
                checkErrors.password = 'La contraseña debe tener al menos una minúscula, una mayúscula y un número'
            }
        }
        if (values.repeatpassword && values.password) {
            if (values.repeatpassword !== values.password) {
                checkErrors.repeatpassword = "Las contraseñas deben coincidir";
            }
        }

        setErrors({ ...checkErrors })

        if (checkErrors.name || checkErrors.email || checkErrors.password || checkErrors.repeatpassword) {
            //SE HACE ALGUNA LIMPIEZA DE CAMPOS SI SE QUIERE
        } else {

            let userId = JSON.parse(localStorage.getItem("user")).uid;

            let newValues = {
                name: values.name !== profileInfo.name ? values.name : undefined,
                email: values.email !== profileInfo.email ? values.email : undefined,
                password: values.password !== "" ? values.password : undefined,
                icon: iconSelected,
                accounts: accounts,
            }

            try{
                await userService.updateUser(userId, {user:newValues});
                let user = await userService.getUser(userId);
                localStorage.setItem("user", JSON.stringify(user));
                showAlert("Cuenta actualizada correctamente", "success")
                navigate("/profile");
            }catch (error){
                if (error.response.status === 400 && error.response.data.msg === "User with name:{" + values.name + "} already exists"){
                    checkErrors.name = "Nombre de usuario ya existente";
                    setErrors({ ...checkErrors });
                }
            }
        }
    }

    const handleDeleteUser = () => {
        setShowDeleteModal(true);
    }

    const handleDeleteUserConfirm = async () => {
        try {
            await userService.deleteUser(profileInfo.uid)
            showAlert("Se ha borrado correctamente la cuenta", "success");
            localStorage.removeItem("session")
            localStorage.removeItem("user")
            applyTheme();
            navigate("/login");
        }catch(e) {
            showAlert("Se ha producido un error al eliminar la cuenta", "error");
        }

        handleDeleteUserCancel();
    }

    const handleDeleteUserCancel = () => {
        setShowDeleteModal(false);
    }

    return <>
        <div className="main">
            <Form onSubmit={handleSubmit}>
                <div className="edit-profile card">
                    <div className="card-header">
                        Editar Cuenta
                    </div>
                    <div className="card-content">
                        <div className="size-content">
                            <div className="flex vertical align-top spacing-large">
                                <div className="signup-img">
                                    <div className="image-container">
                                        <img src={images("./profile_icons/" + iconSelected)} alt="" />
                                        <div className="signup-icon-selector">
                                            <button type="button" onClick={(e) => {
                                                e.preventDefault();
                                                setImgModal(!imgModal)
                                            }}>
                                                <FontAwesomeIcon icon={faPen} size="xl" />
                                            </button>
                                        </div>
                                        {
                                            imgModal ?
                                                <div className="signup-icon-modal">
                                                    <div className="flex">

                                                        <div className="img-picker-item size-1-4">
                                                            <button type="button" onClick={(e) => {
                                                                e.preventDefault();
                                                                setIconSelected("icon_male_01.png");
                                                                setImgModal(false);
                                                            }}>
                                                                <img src={images("./profile_icons/icon_male_01.png")} alt="Icon Male 1" />
                                                            </button>
                                                        </div>
                                                        <div className="img-picker-item size-1-4">
                                                            <button type="button" onClick={(e) => {
                                                                e.preventDefault();
                                                                setIconSelected("icon_male_02.png");
                                                                setImgModal(false);
                                                            }}>
                                                                <img src={images("./profile_icons/icon_male_02.png")} alt="" />
                                                            </button>
                                                        </div>
                                                        <div className="img-picker-item size-1-4">
                                                            <button type="button" onClick={(e) => {
                                                                e.preventDefault();
                                                                setIconSelected("icon_male_03.png");
                                                                setImgModal(false);
                                                            }}>
                                                                <img src={images("./profile_icons/icon_male_03.png")} alt="" />
                                                            </button>
                                                        </div>
                                                        <div className="img-picker-item size-1-4">
                                                            <button type="button" onClick={(e) => {
                                                                e.preventDefault();
                                                                setIconSelected("icon_male_04.png");
                                                                setImgModal(false);
                                                            }}>
                                                                <img src={images("./profile_icons/icon_male_04.png")} alt="" />
                                                            </button>
                                                        </div>
                                                        <div className="img-picker-item size-1-4">
                                                            <button type="button" onClick={(e) => {
                                                                e.preventDefault();
                                                                setIconSelected("icon_female_01.png");
                                                                setImgModal(false);
                                                            }}>
                                                                <img src={images("./profile_icons/icon_female_01.png")} alt="" />
                                                            </button>
                                                        </div>
                                                        <div className="img-picker-item size-1-4">
                                                            <button type="button" onClick={(e) => {
                                                                e.preventDefault();
                                                                setIconSelected("icon_female_02.png");
                                                                setImgModal(false);
                                                            }}>
                                                                <img src={images("./profile_icons/icon_female_02.png")} alt="" />
                                                            </button>
                                                        </div>
                                                        <div className="img-picker-item size-1-4">
                                                            <button type="button" onClick={(e) => {
                                                                e.preventDefault();
                                                                setIconSelected("icon_female_03.png");
                                                                setImgModal(false);
                                                            }}>
                                                                <img src={images("./profile_icons/icon_female_03.png")} alt="" />
                                                            </button>
                                                        </div>
                                                        <div className="img-picker-item size-1-4">
                                                            <button type="button" onClick={(e) => {
                                                                e.preventDefault();
                                                                setIconSelected("icon_female_04.png");
                                                                setImgModal(false);
                                                            }}>
                                                                <img src={images("./profile_icons/icon_female_04.png")} alt="" />
                                                            </button>
                                                        </div>
                                                        <div className="img-picker-item size-1-4">
                                                            <button type="button" onClick={(e) => {
                                                                e.preventDefault();
                                                                setIconSelected("icon_default.jpg");
                                                                setImgModal(false);
                                                            }}>
                                                                <img src={images("./profile_icons/icon_default.jpg")} alt="" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                : <></>
                                        }
                                    </div>
                                </div>
                                <div className="inputs flex vertical gap-large size-1-1">
                                    <div className="flex spacing-large size-1-1">
                                        <div className="size-1-2">
                                            <InputText label={"Nombre de Usuario *"} id={"name"} name={"name"} placeholder={"Nombre de Usuario"} defaultValue={values.name} error={errors.name} onChange={handleInputChange} />
                                        </div>
                                        <div className="size-1-2">
                                            <InputText label={"Email *"} id={"email"} name={"email"} placeholder={"Email"} defaultValue={values.email} error={errors.email} onChange={handleInputChange} />
                                        </div>
                                    </div>
                                    <div className="flex spacing-large size-1-1">
                                        <div className="size-1-2">
                                            <InputPassword label={"Nueva Contraseña"} id={"password"} name={"password"} placeholder={"Nueva Contraseña"} defaultValue={values.password} error={errors.password} onChange={handleInputChange} />
                                        </div>
                                        <div className="size-1-2">
                                            <InputPassword label={"Repita la Contraseña"} id={"repeatpassword"} name={"repeatpassword"} placeholder={"Nueva Contraseña"} defaultValue={values.repeatpassword} error={errors.repeatpassword} onChange={handleInputChange} />
                                        </div>
                                    </div>
                                    {
                                        profileInfo.role === "USER" ?
                                            <>
                                                <div className="flex spacing-large align-end size-1-1">
                                                    <div className="size-2-6 delete">
                                                        <button type="button" onClick={()=>handleDeleteUser()}>
                                                            <FontAwesomeIcon icon={faTrashCan}/> Eliminar Cuenta
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="flex vertical spacing-large size-1-1">
                                                    <div className="flex align-spread spacing-large">
                                                        <div>
                                                            Cuentas
                                                        </div>
                                                        <div className="flex align-middle size-all">
                                                            <HorizontalSpliter color="white"/>
                                                        </div>
                                                    </div>
                                                    {
                                                        accounts.map((account, index) => {
                                                            return <>
                                                                <div className="flex spacing-large size-all">
                                                                    <div className="size-2-6">
                                                                        <InputText disabled={true} id={"game-" + index}
                                                                                   name={"game-" + index} label={"Juego"}
                                                                                   placeholder={"Juego"}
                                                                                   defaultValue={getGameName(account.game)}/>
                                                                    </div>
                                                                    {
                                                                        getAccountInputs(account)
                                                                    }
                                                                    <div className="flex align-bottom size-1-6 delete">
                                                                        <button type={"button"}
                                                                                onClick={() => deleteAccount(account)}>
                                                                            Eliminar
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </>
                                                        })
                                                    }
                                                    <div className="flex size-1-1">
                                                        <div className="size-1-5 accept">
                                                            <button type={"button"} onClick={() => setShowModal(true)}>
                                                                Añadir +
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                            :
                                            <></>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-footer">
                        <div className="flex align-end size-1-1 spacing-large">
                            <div className="size-1-5 accept">
                                <button type="submit">
                                    Aceptar
                                </button>
                            </div>
                            <div className="size-1-5 delete">
                                <button type="button" onClick={()=>navigate(-1)}>
                                    Cancelar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Form>
        </div>
        {
            showModal ? <AccountCreation getGamesNames={getGamesNames} getGameName={getGameName} getGameId={getGameId} functionClose={setShowModal} functionSuccess={addAccount}/> : <></>
        }
        {
            showDeleteModal ? <DeleteUserModal onConfirm={handleDeleteUserConfirm} onCancel={handleDeleteUserCancel}/>: <></>
        }

    </>
}

export default EditProfile