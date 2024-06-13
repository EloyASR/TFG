import {useEffect, useState} from "react";

function HorizontalBanner({images, interval = 5000}) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        // Configura el temporizador para cambiar la imagen
        const timer = setInterval(() => {
            setCurrentImageIndex((prevIndex) =>
                (prevIndex + 1) % images.length
            );
        }, interval);

        // Limpia el temporizador cuando el componente se desmonta
        return () => clearInterval(timer);
    }, [images, interval]);

    return <>
        {
            images && images.length > 0 ?
                <div className="anuncio-horizontal">
                    <img src={images[currentImageIndex]}
                         alt={`Imagen ${currentImageIndex}`}/>
                </div>
                :
                <></>
        }

    </>
}

export default  HorizontalBanner;