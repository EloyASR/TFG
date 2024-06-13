import {useEffect, useState} from "react";

function VerticalBanner({images, interval = 5000}) {

    const [imagesToShow, setImagesToShow] = useState(undefined);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        // Configura el temporizador para cambiar la imagen
        const timer = setInterval(() => {
            setCurrentImageIndex((prevIndex) =>
                (prevIndex + 1) % images.length
            );
        }, interval);

        console.log(imagesToShow);

        // Limpia el temporizador cuando el componente se desmonta
        return () => clearInterval(timer);
    }, [images, interval]);

    useEffect(()=>{
        setImagesToShow(images);
    },[images])

    return <>
        {
            imagesToShow && imagesToShow.length > 0 ?
                <div className="anuncio">
                    <img src={imagesToShow[currentImageIndex]}
                         alt={`Imagen ${currentImageIndex}`}/>
                </div>
                :
                <></>
        }

    </>
}

export default VerticalBanner;