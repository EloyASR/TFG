import React, { useEffect, useState, useRef } from "react";

const imageTypeRegex = /image\/(png|jpg|jpeg)/gm;

function ImageSelector({ name, id, label, onChange, maxImages }) {
    const [imageFiles, setImageFiles] = useState([]);
    const [images, setImages] = useState([]);
    const fileInputRef = useRef(null);

    useEffect(() => {
        const images = [], fileReaders = [];
        let isCancel = false;
        if (imageFiles.length) {
            imageFiles.forEach((file) => {
                const fileReader = new FileReader();
                fileReaders.push(fileReader);
                fileReader.onload = (e) => {
                    const { result } = e.target;
                    if (result) {
                        images.push(result);
                    }
                    if (images.length === imageFiles.length && !isCancel) {
                        setImages(images);
                    }
                };
                fileReader.readAsDataURL(file);
            });
        }
        return () => {
            isCancel = true;
            fileReaders.forEach((fileReader) => {
                if (fileReader.readyState === 1) {
                    fileReader.abort();
                }
            });
        };
    }, [imageFiles]);

    const changeHandler = (e) => {
        console.log(e);
        const { files } = e.target;
        const { name } = e.target;
        const validImageFiles = [];
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            if (file.type.match(imageTypeRegex)) {
                validImageFiles.push(file);
            }
        }
        if (validImageFiles.length > maxImages) {
            alert(`You can only select up to ${maxImages} images.`);
            return;
        }
        setImageFiles(validImageFiles);
        if (onChange) {
            onChange({target:{name, value:validImageFiles}});
        }
    };

    const clearSelection = () => {
        setImageFiles([]);
        setImages([]);

        if (onChange) {
            onChange({ target: { name, value: [] } });
        }

        if (fileInputRef.current) {
            fileInputRef.current.value = null; // Resetear el campo de entrada de archivos
        }
    };

    return (
        <div className="form-row image-selector">
            <div className={"form-label"}>
                <span >{label}</span>
            </div>
            <div className="flex gap-medium ">
                <div className="size-1-5 form-field-file">
                    <label className={"label"} htmlFor={id}>
                        <span>Elegir archivos</span>
                    </label>
                    <input type="file" onChange={changeHandler} name={name} id={id} ref={fileInputRef} accept="image/*" multiple />
                </div>
                <div className="size-1-5 delete">
                    <button type="button" onClick={clearSelection}>Borrar</button>
                </div>
            </div>
            <div className="flex mt-3">
                {images.length > 0 ? (
                    images.map((image, idx) => (
                        <div key={idx} className="size-1-4 image-selected">
                            <img src={image} alt={"Imagen " + idx + " seleccionada"} />
                        </div>
                    ))
                ) : null}
            </div>
        </div>
    );
}

ImageSelector.defaultProps = {
    maxImages: 5
};

export default ImageSelector;