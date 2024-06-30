import HorizontalSpliter from "./components/HorizontalSpliter";

function PrivacyPolicy(props) {
    return <>
            <div className="main">
                <div className="flex vertical gap-medium help-page">
                    <h1>Política de Privacidad</h1>
                    <article className={"flex gap-medium"}>
                        <h2>
                            Datos del responsable
                        </h2>
                        <HorizontalSpliter/>
                        <div className={"content flex gap-medium"}>
                            <p>Nombre de la Aplicación: ToorEII</p>
                            <p>Nombre y Apellidos del Responsable: Eloy Alfredo Schmidt Rodríguez</p>
                            <p>NIF: 32894743M</p>
                            <p>Correo: uo271588@uniovi.es</p>
                            <p>Domicilio: C/Esteban Fernandez Rebollos Nº5, Sama de Langreo, 33900, Asturias, España</p>
                        </div>
                    </article>
                    <article className={"flex gap-medium"}>
                        <h2>
                            ¿Con que finalidad se van a tratar tus datos?
                        </h2>
                        <HorizontalSpliter/>
                        <div className={"content flex gap-medium"}>
                            <table>
                                <thead>
                                <tr>
                                    <th>Finalidad</th>
                                    <th>+info</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>Para gestionar tu registro e identificación como usuario de la Aplicación</td>
                                    <td>En el caso de que quieras registrarte como usuario de la aplicación necesitaremos tratar tus datos para identificarte como usuario de esta y proporcionarte el acceso a las distintas funcionalidades y servicios que proporciona. En cualquier momento podrás eliminar tu cuenta de usuario desde la edición de tu perfil personal o contactando con el responsable de la aplicación</td>
                                </tr>
                                <tr>
                                    <td>Para proporcionarte un histórico de tus datos y al resto de usuarios información de tu perfil</td>
                                    <td>Los datos recogidos estarán vinculados a su cuenta y solo usted será capaz de acceder a ellos a excepción de los datos de su perfil que serán accesibles también para el resto de los usuarios salvo la contraseña que es privada. Además, si así lo desea usted podrá modificar dichos datos en todo momento desde la edición del perfil.</td>
                                </tr>
                                <tr>
                                    <td>Contacto con el responsable</td>
                                    <td>Solo se van a tratar los datos necesarios para gestionar o resolver la solicitud.</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </article>
                    <article className={"flex gap-medium"}>
                        <h2>
                            ¿Cuál es la legitimación para el tratamiento de sus datos?
                        </h2>
                        <HorizontalSpliter/>
                        <div className={"content flex gap-medium"}>
                            <table>
                                <thead>
                                <tr>
                                    <th>Finalidad</th>
                                    <th>+info</th>
                                </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Para gestionar tu registro e identificación como usuario de la Aplicación</td>
                                        <td>El tratamiento de tus datos es necesario para la ejecución de los términos que regulan la aplicación. Dicho en otras palabras, se necesita tratar tus datos personales ya que de lo contrario no se puede gestionar el registro.</td>
                                    </tr>
                                    <tr>
                                        <td>Para proporcionarte un histórico de tus datos y al resto de usuarios información de tu perfil</td>
                                        <td>El tratamiento de los datos físicos es necesario para el propio funcionamiento de la aplicación y de todas sus funcionalidades principales. El propietario de la aplicación considera que tiene un interés legítimo para almacenar dichos datos y vincularlos con la cuenta del usuario.</td>
                                    </tr>
                                    <tr>
                                        <td>Contacto con el responsable</td>
                                        <td>El propietario de la aplicación considera que tiene un interés legítimo para atender solicitudes o consultas que planteé el usuario a través de los métodos de contacto existentes.</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </article>
                    <article className={"flex gap-medium"}>
                        <h2>
                            ¿Durante cuanto tiempo se conservan sus datos?
                        </h2>
                        <HorizontalSpliter/>
                        <div className={"content flex gap-medium"}>
                            <p>El plazo de conservación de los datos dependerá de la finalidad para la que se traten, según lo que se explica a continuación:</p>
                            <table>
                                <thead>
                                <tr>
                                    <th>Finalidad</th>
                                    <th>+info</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>Para gestionar tu registro e identificación como usuario de la Aplicación</td>
                                    <td>Se tratarán los datos durante el tiempo que mantengas la condición de usuario de la Aplicación (hasta el momento en el que decida eliminar la cuenta). </td>
                                </tr>
                                <tr>
                                    <td>Para proporcionarte un histórico de tus datos y al resto de usuarios información de tu perfil</td>
                                    <td>Se tratarán los datos durante el tiempo que usted quiera (hasta que modifique los datos o elimine la cuenta).</td>
                                </tr>
                                <tr>
                                    <td>Contacto con el responsable</td>
                                    <td>Trataremos los datos el tiempo que sea necesario para solventar cualquier solicitud o petición.</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </article>
                    <article className={"flex gap-medium"}>
                        <h2>
                            ¿Se compartirán tus datos con terceros?
                        </h2>
                        <HorizontalSpliter/>
                        <div className={"content flex gap-medium"}>
                            <p>En ningún caso y en ninguna circunstancia los datos serán compartidos con un tercero.</p>
                            <p>En el caso de que se vendiera la totalidad o parte de la Aplicación a otra persona se podrían revelar sus datos al potencial comprador del negocio o los activos.</p>
                        </div>
                    </article>
                    <article className={"flex gap-medium"}>
                        <h2>
                            ¿Cuáles son tus derechos al compartir tus datos?
                        </h2>
                        <HorizontalSpliter/>
                        <div className={"content flex gap-medium"}>
                            <p>Independientemente de la finalidad o la base legal en la que tratemos tus datos, tienes derecho a:</p>
                            <ul>
                                <li>Pedir acceso a los datos de los que dispone la aplicación de ti.</li>
                                <li>Pedir que se cambien datos de los que dispone la aplicación.</li>
                                <li>Pedir que se eliminen tus datos como hemos indicado en secciones anteriores.</li>
                            </ul>
                            <p>Siempre que tengamos un interés legítimo tendrás derecho a oponerte al tratamiento de tus datos.</p>
                        </div>
                    </article>
                </div>
            </div>
    </>
}

export default PrivacyPolicy