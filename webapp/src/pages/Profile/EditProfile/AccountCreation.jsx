import Combobox from "../../Tournament/List/Combobox";
import InputText from "../../components/InputText";
import React, {useState} from "react";
import {useForm, Form} from "../../../hooks/signupForm";


function AccountCreation({getGamesNames, getGameName, getGameId, functionClose, functionSuccess}) {

    const [gameSelected, setGameSelected] = useState();

    const defaultData = {
        game: "",
        userid: "",
        tag: "",
    }

    const getAccountInputs = () => {
        switch(gameSelected){
            case "League of Legends":
                return <>
                    <div className="size-3-6">
                        <InputText label={"ID Usuario *"} id={"userid"} name={"userid"} placeholder={"ID Usuario"} defaultValue={values.userid} error={errors.userid} onChange={handleInputChange} />
                    </div>
                    <div className="size-1-6">
                        <InputText label={"TAG *"} id={"tag"} name={"tag"} placeholder={"TAG"} defaultValue={values.tag} error={errors.tag} onChange={handleInputChange} />
                    </div>
                </>
            case "Valorant":
                return <>
                    <div className="size-3-6">
                        <InputText label={"ID Usuario *"} id={"userid"} name={"userid"} placeholder={"ID Usuario"} defaultValue={values.userid} error={errors.userid} onChange={handleInputChange} />
                    </div>
                    <div className="size-1-6">
                        <InputText label={"TAG *"} id={"tag"} name={"tag"} placeholder={"TAG"} defaultValue={values.tag} error={errors.tag} onChange={handleInputChange} />
                    </div>
                </>
            case "Pokemon VGC":
                return <>
                    <div className="size-4-6">
                        <InputText label={"Pokemon ID *"} id={"userid"} name={"userid"} placeholder={"ID"} defaultValue={values.userid} error={errors.userid} onChange={handleInputChange} />
                    </div>
                </>
            default:
                return <>
                    <div className="size-4-6">
                        <InputText label={"ID Usuario *"} id={"userid"} name={"userid"} placeholder={"ID Usuario"} defaultValue={values.userid} error={errors.userid} onChange={handleInputChange} />
                    </div>
                </>
        }
    }

    const validate = (fieldValues = values) => {

        const temp = { ...errors }

        if ('game' in fieldValues) {
            temp.game = fieldValues.game ? '' : 'This field is required'
        }

        if ('userid' in fieldValues) {
            temp.userid = fieldValues.userid ? '' : 'This field is required'
        }

        if(gameSelected ==="Valorant" || gameSelected==="League of Legends") {
            if ('tag' in fieldValues) {
                temp.tag = fieldValues.tag ? '' : 'This field is required'
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
    } = useForm(defaultData, true, validate)

    const handleSubmit = async e => {
        e.preventDefault()

        let checkErrors = { ...errors }

        if (!values.game) {
            checkErrors.game = "This field is required"
        }
        if (!values.userid) {
            checkErrors.userid = "This field is required"
        }
        if(gameSelected ==="Valorant" || gameSelected==="League of Legends") {
            if (!values.tag) {
                checkErrors.tag = "This field is required"
            }
        }

        setErrors({ ...checkErrors })

        if (checkErrors.game || checkErrors.userid || (checkErrors.tag && (gameSelected ==="Valorant" || gameSelected==="League of Legends"))) {
            //SE HACE ALGUNA LIMPIEZA DE CAMPOS SI SE QUIERE
        } else {
            let data = {
                game: values.game,
                userid: values.userid,
                tag: values.tag,
            }

            await functionSuccess(data);

            functionClose(false);
        }
    }

    const handleComboChange = (item) => {
        handleInputChange({target: {name: "game", value: getGameId(item)}})
        setGameSelected(item);
    }

    return <>
        <Form onSubmit={handleSubmit}>
            <div className="modal-background">
                <div>
                    <div className="card modal-series-modifier">
                        <div className="card-header">
                            Añadir Cuenta
                        </div>
                        <div className="card-content">
                            <div className="flex vertical spacing-medium">
                                <div className="flex spacing-large">
                                    <div className="flex spacing-large size-all">
                                        <div className="size-2-6">
                                            <Combobox id={"game"} itemsList={getGamesNames()} label={"Juego *"} placeholder={"Juego"} error={errors.game} onChange={(item) => handleComboChange(item)} />
                                        </div>
                                        {
                                            getAccountInputs()
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card-footer">
                            <div className="flex align-end gap-large p-0">
                                <div className="size-1-5 accept">
                                    <button type="submit">
                                        Aceptar
                                    </button>
                                </div>
                                <div className="size-1-5 delete">
                                    <button onClick={()=>functionClose(false)}>
                                        Cancelar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Form>
    </>

}

export default AccountCreation;