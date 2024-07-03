import {images} from "../helpers/images";
import HorizontalSpliter from "./components/HorizontalSpliter";

function Help(props) {
    return <>
            <div className="main">
                <div className="flex vertical gap-medium help-page">
                    <h1>Ayuda</h1>
                    <article className={"flex gap-medium"}>
                        <h2>
                            Registro e Inicio de Sesión
                        </h2>
                        <HorizontalSpliter/>
                        <div className={"content flex gap-medium"}>
                            <p>Para acceder al Registro o al Inicio de Sesión en la aplicación se debe acceder mediante el botón "LOG IN", que se encuentra en la esquina superior derecha de la pantalla en el menú de navegación, como se muestra en la siguiente captura:</p>
                            <img src={images("./help/login-link.png")} alt={"Imagen del Link de Login"}/>
                            <p>Una vez que nos encontremos en la pestaña podemos o bien iniciar directamente sesión si ya disponemos de una cuenta registrada o registrar una cuenta nueva accediendo desde el botón "SIGN UP" que se encuentra encima del formulario de inicio de sesión.</p>
                            <img src={images("./help/signup-link.png")} alt={"Imagen del Link de Signup"}/>
                            <p>Hay que rellenar todos los campos obligatorios. La contraseña debe de tener una longitud de al menos 8 caracteres y contener al menos una minúscula, una mayúscula y un dígito. El correo debe el formato de correo siguiente "nombreusuario@proveedor.tdl".</p>
                        </div>
                    </article>
                    <article className={"flex gap-medium"}>
                        <h2>
                            Cierre de Sesión y Navegación
                        </h2>
                        <HorizontalSpliter/>
                        <div className={"content flex gap-medium"}>
                            <p>Para navegar por la aplicación se dispone de un menú de navegación que nos proporciona acceso a las diferentes funcionalidades de la misma. Este menú de navegación variará de un tipo de usuario a otro.</p>

                            <p>Para los usuarios normales el menú de navegación contendrá las siguientes opciones:</p>
                            <ul>
                                <li> Perfil: Nos redireccionará a nuestro perfil personal. Además, una vez en nuestro perfil podremos acceder al resto de opciones como la edición del mismo o la eliminación de la cuenta. </li>
                                <li> Torneos: Esta opción redireccionará a página donde se mostrará la lista de todos los torneos del sistema. Desde esta opción también se puede acceder a la visualización detallada de torneos y registro dentro de estos.</li>
                            </ul>
                            <img src={images("./help/nav-user.png")} alt={"Imagen del Menú de Navegación para usuarios normales"}/>
                            <p>Para los administradores de torneos el menú de navegación contendrá las siguientes opciones:</p>
                            <ul>
                                <li> Perfil: Al igual que para los usuarios normales nos redirecciona a nuestro perfil de usuario</li>
                                <li> Mis torneos: Nos redirecciona a la página donde se mostrará la lista con todos los torneos creados por el usuario. Desde esta opción también se puede acceder a la creación, visualización detallada, edición y eliminación de torneos.</li>
                                <li> Mis premios: Nos redirecciona a la página donde se mostrará la lista con todos los premios creados por el usuario. Desde esta opción también se puede acceder a la creación, eliminación y edición de premios.</li>
                            </ul>
                            <img src={images("./help/nav-admin.png")} alt={"Imagen del Menú de Navegación para administradores de torneos"}/>
                            <p>Para las empresas el menu de navegación contendrá las siguientes opciones:</p>
                            <ul>
                                <li> Perfil: Al igual que para los usuarios normales y los administradores de torneos nos redirecciona a nuestro perfil de usuario y desde ahí ya podremos acceder a todas las funcionalidades de las cuentas como la edición de las mismas.</li>
                                <li> Torneos: Nos redirecciona a la página donde se mostrará la lista con todos los torneos del sistema. Desde esta opción también se puede acceder a la visualización detallada y patrocinio de torneos.</li>
                                <li> Torneos patrocinados: Nos redirecciona a la página donde se mostrará la lista con todos los torneos patrocinados, tanto los que se encuentran pendientes de aceptación del patrocinio como los ya aceptados.</li>
                                <li> Mis premios: Al igual que con los administradores de torneos esta opción nos redirecciona a la página donde se mostrará la lista con todos los premios creados por el usuario. Desde esta opción también se puede acceder a la creación, eliminación y edición de premios.</li>
                            </ul>
                            <img src={images("./help/nav-company.png")} alt={"Imagen del Menú de Navegación para empresas"}/>
                            <p>Para cerrar sesión en la aplicación tendremos que dirigirnos al botón de "LOG OUT" que se encuentra en la parte superior derecha de la página en el menú de navegación como se puede observar en la siguiente captura:</p>
                            <img src={images("./help/logout-link.png")} alt={"Imagen del Link de Logout"}/>
                        </div>
                    </article>
                    <article className={"flex gap-medium"}>
                        <h2>
                            Gestión del Perfil
                        </h2>
                        <HorizontalSpliter/>
                        <div className={"content flex gap-medium"}>
                            <p>Para editar el perfil tenemos que acceder desde el botón de "Editar perfil" que se encuentra en la página de Perfil de Usuario tal y como se muestra en la siguiente captura:</p>
                            <img src={images("./help/boton-edit-profile.png")} alt={"Imagen del Botón de Editar perfil"}/>
                            <p>Una vez que nos encontremos dentro de la página de edición de perfil podremos modificar todos los campos base del usuario. Para modificar la contraseña tendremos que escribir la nueva contraseña dos veces y deberán coincidir ambas. Al igual que en el registro la contraseña debe contener al menos una minúscula, una mayúscula y un dígito y tener una longitud mínima de 8 caracteres y el correo se tiene que adecuar al formato nombreusuario@proveedor.tdl</p>
                            <p>También en el caso de los usuarios normales se podrá añadir cuentas de juegos utilizando el botón que pone Añadir en el apartado de cuentas</p>
                            <img src={images("./help/boton-add-account.png")} alt={"Imagen del Botón de Añadir cuentas de Juegos"}/>
                            <p>Para añadir una cuenta se tiene que seleccionar el juego mediante el selector de juego y rellenar los campos que se indican en cada caso para cada tipo de juego</p>
                            <img src={images("./help/add-account.png")} alt={"Imagen del Popup de Añadir Cuenta de Juego"}/>
                            <p>Para eliminar las cuentas de juegos vinculadas simplemente tendremos que darle al botón de "Eliminar" que se encuentra al lado de la cuenta que queremos eliminar.</p>
                            <img src={images("./help/delete-account.png")} alt={"Imagen del Botón de Eliminar Cuenta de Juego"}/>
                            <p>Si quisiéramos eliminar nuestra cuenta de usuario para siempre tenemos que darle a botón de "Eliminar cuenta" que se encuentra debajo de los datos básicos tal y como se indica en la siguiente captura:</p>
                            <img src={images("./help/delete-user-account.png")} alt={"Imagen del Botón de Eliminar Cuenta de Usuario"}/>
                        </div>
                    </article>
                    <article className={"flex gap-medium"}>
                        <h2>
                            Creación de premios
                        </h2>
                        <HorizontalSpliter/>
                        <div className={"content flex gap-medium"}>
                            <p>Para crear un premio tanto los patrocinadores de torneos como las empresas tendrán que acceder mediante la opción de "Mis premios" a la lista de premios y una vez dentro de la lista de premios podrán crear uno haciendo click en el botón "Crear Premio" que se encuentra en la parte superior de la lista tal y como se muestra en la siguiente captura: </p>
                            <img src={images("./help/boton-create-prize.png")} alt={"Imagen del Botón de Crear premio"}/>
                            <p>Una vez dentro de la pestaña de creación de premios se tendrán que rellenar los campos obligatorios que se muestran a continuación y si el usuario así lo desea también le podrá añadir una imagen al premio para que sea mas reconocible</p>
                            <img src={images("./help/create-prize.png")} alt={"Imagen del página de creación de premio"}/>
                            <p>Cuando se haya terminado la configuración se da al botón "Aceptar" y se creará el premio y aparecerá en la lista de premios creados por el usuario.</p>
                        </div>
                    </article>
                    <article className={"flex gap-medium"}>
                        <h2>
                            Edición y Eliminación de Premios
                        </h2>
                        <HorizontalSpliter/>
                        <div className={"content flex gap-medium"}>
                            <p>Los administradores de torneos y las empresas podrán gestionar sus propios premios desde la página de "Mis premios" accesible desde el menú de navegación de la aplicación. Una vez dentro de la lista de premios se le darán al usuario dos opciones.</p>
                            <ul>
                                <li>Podrá eliminar los premios que el considere mediante el botón "Eliminar" que aparece al lado de cada premio.</li>
                                <li>También podrá modificar los premios cambiando su nombre, descripción e imagen mediante el botón de "Editar" que aparece al lado de cada premio.</li>
                            </ul>
                            <img src={images("./help/boton-edit-delete-prize.png")} alt={"Imagen de los botones de Editar y Eliminar premio"}/>
                        </div>
                    </article>
                    <article className={"flex gap-medium"}>
                        <h2>
                            Creación de torneos
                        </h2>
                        <HorizontalSpliter/>
                        <div className={"content flex gap-medium"}>
                            <div className={"content flex gap-medium"}>
                                <p>Los administradores de torneos pueden crear torneos accediendo a la pestaña de "Mis torneos" desde el menú de navegación y posteriormente haciendo click en el botón que pone "Crear Torneo" y que se encuentra en la encima de la lista de torneos.</p>
                                <img src={images("./help/boton-create-tournament.png")} alt={"Imagen del Botón de Crear Torneo"}/>
                                <p>Una vez dentro de la creación de torneos si se quiere cancelar se tendrá que hacer moviéndose a otra página desde el menú de navegación. El usuario deberá rellenar todos aquellos campos que sean obligatorios que son los que se muestran a continuación:</p>
                                <img src={images("./help/step1-create-tournament.png")} alt={"Imagen del paso 1 de creación de torneos"}/>
                                <p>En el caso del premio del torneo si se desea establecer, se tiene que poner el valor del campo "¿Torneo con premio?" a "Si" y ademas añadir un premio que se haya creado con anterioridad. En caso de que se deje vacío el premio no nos dejará avanzar al siguiente paso.</p>
                                <img src={images("./help/step2-create-tournament.png")} alt={"Imagen del paso 2 de creación de torneos"}/>
                                <p>En el caso de la descripción del torneo y de las reglas no es necesario el establecerlas si el usuario no quiere hacerlo.</p>
                                <img src={images("./help/step3-create-tournament.png")} alt={"Imagen del paso 3 de creación de torneos"}/>
                                <p>Para las fases del torneo se pueden crear dos tipos de fase League y Bracket. Se debe establecer siempre un nombre para las fases y se deben rellenar todos los campos obligatorios. Para que un torneo pueda tener más de una fase la primera deberá ser de tipo League puesto que la fase de Bracket solo permite de un ganador y no se podría generar a partir de esta otra fase de torneo. Para añadir una nueva fase se tiene que hacer con el botón que indica "Añadir Fase" tal y como se muestra en la captura superior.</p>
                                <img src={images("./help/step3-delete-phase.png")} alt={"Imagen del botón de eliminar fase en el paso 3 de creación de torneos"}/>
                                <p>Si queremos eliminar alguna fase lo podremos hacer siempre que haya al menos dos fases mediante el botón "Eliminar" que aparece al lado de la configuración de cada fase como se observa en la anterior captura.</p>
                                <img src={images("./help/step4-create-tournament.png")} alt={"Imagen del paso 4 de creación de torneos"}/>
                                <p>Por último se tienen que establecer las fechas en las que se va a desarrollar el torneo, para esto las fechas de inicio, fin, inicio de inscripción y fin de inscripción tienen que ser posteriores a la fecha actual. Ademas las fechas del torneo tienen que ser posteriores a las fechas de inscripción si es que está se establece. Ademas las fechas de fin tanto del torneo como de la inscripción tienen que ser posteriores a las de inicio del torneo y de la inscripción respectivamente. Si no se hace así nos dará un error a la hora de crear el torneo</p>
                                <p>Siempre que queramos modificar algo que nos hemos olvidado o nos hemos equivocado nos podremos mover hacía atras en la configuración del torneo mediante los botones debajo de los formularios que ponen "Atras". Cuando terminemos con toda la configuración en el paso 4 nos aparecerá un botón de "Crear" para finalizar con la creación del torneo.</p>
                            </div>
                        </div>
                    </article>
                    <article className={"flex gap-medium"}>
                        <h2>
                            Edición y Eliminación de torneos
                        </h2>
                        <HorizontalSpliter/>
                        <div className={"content flex gap-medium"}>
                            <p>Los administradores de torneos podrán gestionar sus torneos accediendo desde la información detallada del torneo. Para esto se debe hacer click en el torneo que se desea gestionar como se muestra a continuación:</p>
                            <img src={images("./help/boton-tournament.png")} alt={"Imagen del acceso a la información detallada de un torneo"}/>
                            <p>Si se desean modificar los datos básicos del torneo como pueden ser el estado en el que se encuentra el nombre, descripción, reglas o el premio se tendrá que hacer click en el botón de "Editar torneo" que aparece en la pestaña de info del torneo como se observa a continuación:</p>
                            <img src={images("./help/boton-edit-tournament.png")} alt={"Imagen del botón de edición de torneo"}/>
                            <p>Nos redirigirá a una pantalla como la de la siguiente imagen donde podremos modificar los campos que nosotros queramos. Todos los campos con el (*) son campos obligatorios y por tanto si se encuentran vacíos no nos dejará modificar la información del torneo. Para confirmar la modificación tenemos que hacer click en el botón de "Aceptar" que se encuentra al pie del formulario.</p>
                            <img src={images("./help/edit-tournament.png")} alt={"Página de edición de torneo"}/>
                            <p>Si lo que queremos es modificar las series de un torneo lo primero que se debe de hacer es que el torneo se encuentre en estado de "Inscripciones Cerradas" o "En Curso". Cuando esto suceda si nos vamos a la pestaña de fases podremos editar los partidos haciendo click encima de los mismos tal y como se muestra en la siguiente imagen:</p>
                            <img src={images("./help/boton-edit-serie.png")} alt={"Imagen del como acceder a la edición de series"}/>
                            <p>Esto nos mostrará una pestaña de modificación donde podremos establecer los participantes de esa serie o partido mediante los selectores así como también establecer los resultados de los mismos.</p>
                            <img src={images("./help/edit-serie.png")} alt={"Imagen del modal de edición de series"}/>
                            <p>Si se desea también se podrán añadir partidas para mostrar más información de la serie tal y como se muestra en la imagen anterior mediante el botón de "Añadir partida". Se podrán modificar cambiando el valor del campo y también eliminar con el botón de "Eliminar".</p>
                            <p>Una vez que lo tengamos configurado le damos a "Aceptar" y ya tendríamos la serie modificada.</p>
                        </div>
                    </article>
                    <article className={"flex gap-medium"}>
                        <h2>
                            Patrocinio de torneos
                        </h2>
                        <HorizontalSpliter/>
                        <div className={"content flex gap-medium"}>
                            <p>Las empresas y compañías podrán si asi lo desean patrocinar torneos. Para hacerlo tendrán que acceder a la información detallada del torneo y en la pestaña de información aparecerá un botón que pone "Patrocinar" tal y como se muestra en la siguiente captura:</p>
                            <img src={images("./help/boton-sponsor-tournament.png")} alt={"Imagen del botón de patrocinar torneo"}/>
                            <p>Se aparecerá un modal donde nos dará tres opciones de patrocinio:</p>
                            <img src={images("./help/sponsor-tournament.png")} alt={"Imagen de la página de patrocinar torneo"}/>
                            <ul>
                                <li>Premio: Nos permite añadir un premio para el ganador del torneo entre los que tenga creados la empresa o compañía.</li>
                                <li>Banners Laterales (300x600): Aparecerá en aquellos dispositivos con un tamaño de pantalla lo suficientemente amplio a los laterales de la información detallada del torneo como se muestra en las capturas posteriores. Solo se podrá seleccionar un número máximo de dos Banners Laterales</li>
                                <li>Banner Horizontal (1100x300): Aparecerá debajo del menú de navegación entre pestañas de la información detallada del torneo como se muestra a continuación. Solo se podrá seleccionar un Banner Horizontal</li>
                            </ul>
                            <img src={images("./help/banners.png")} alt={"Imagen de como se muestran los banners"}/>
                            <p>Una vez que la empresa le de al botón de "Aceptar" será el turno del administrador del torneo para revisar el patrocinio desde la pestaña "Patrocinadores" a la que accederá desde el menú de navegación de la información detallada del torneo como se muestra a continuación:</p>
                            <img src={images("./help/boton-review-sponsor.png")} alt={"Imagen del botón de revision de patrocinios"}/>
                            <p>En esta pestaña le aparecerán al administrador del torneo todos aquellos patrocinios en estado pendiente como aquellos que se encuentren en estado aceptado. Podrá revisar ambos si así lo desea mediante el botón de "Revisar" que aparecerá debajo del patrocinio correspondiente como se muestra en la captura superior.</p>
                            <p>Cuando sea el caso de patrocinios pendientes aparecerá como se ve en la siguiente captura un botón de "Aceptar" en el modal de revisión del patrocinio. Si se acepta el patrocinio este pasará a estado aceptado y aparecerá dentro de la lista de patrocinios aceptados.</p>
                            <img src={images("./help/review-sponsor.png")} alt={"Imagen del modal de revisión de patrocinio"}/>
                            <p>Siempre que lo desee, el administrador del torneo podrá eliminar los patrocinios mediante el botón de eliminar que aparece debajo de cada uno como se muestra a continuación.</p>
                            <img src={images("./help/delete-sponsor.png")} alt={"Imagen del botón de eliminar de patrocinio"}/>
                            <p>También la propia empresa podrá decidir cancelar el patrocinio mediante el botón de "Dejar de patrocinar" que se encuentra en la pestaña de Información tal y como se muestra en la siguiente captura.</p>
                            <img src={images("./help/cancel-sponsor.png")} alt={"Imagen del botón de cancelar patrocinio"}/>
                        </div>
                    </article>
                </div>
            </div>
    </>
}

export default Help