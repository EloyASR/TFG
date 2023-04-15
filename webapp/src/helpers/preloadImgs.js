const cacheImages = async (srcArray) => {
    const promises = await srcArray.map((src)=> {
        return new Promise(function (resolve, reject){
            const img = new Image();
            img.src = src;
            img.onload = resolve();
            img.onerror = reject();
        });
    });

    await Promise.all(promises);
}

export default cacheImages;