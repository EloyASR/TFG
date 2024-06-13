import CryptoJS from 'crypto-js';

const {REACT_APP_CLOUDINARY_API_SECRET,
    REACT_APP_CLOUDINARY_API_KEY,
    REACT_APP_CLOUDINARY_UPLOAD_PRESET,
    REACT_APP_CLOUDINARY_UPLOAD_URL,
    REACT_APP_CLOUDINARY_DELETE_URL} = process.env;

const sha1 = (input) => {
    return CryptoJS.SHA1(input).toString(CryptoJS.enc.Hex);
};

const cloudinaryService = {
    uploadFile: async (file, fileName) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', REACT_APP_CLOUDINARY_UPLOAD_PRESET);

        if (fileName) {
            formData.append('public_id', fileName);
        }

        try {
            const response = await fetch(REACT_APP_CLOUDINARY_UPLOAD_URL, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Failed to upload file.');
            }

            const data = await response.json();

            return data.secure_url;
        } catch (error) {
            console.error('Error uploading file:', error);
            throw error;
        }
    },

    deleteFile: async (publicId) => {
        const timestamp = Math.floor(Date.now() / 1000);
        const apiSecret = REACT_APP_CLOUDINARY_API_SECRET; // Reemplaza con tu API Secret
        const apiKey = REACT_APP_CLOUDINARY_API_KEY; // Reemplaza con tu API Key

        // Genera una firma utilizando SHA-1
        const signature = sha1(`public_id=${publicId}&timestamp=${timestamp}${apiSecret}`);

        const formData = new FormData();
        formData.append('public_id', publicId);
        formData.append('api_key', apiKey);
        formData.append('timestamp', timestamp);
        formData.append('signature', signature);

        try {
            const response = await fetch(REACT_APP_CLOUDINARY_DELETE_URL, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Failed to delete file.');
            }

            const data = await response.json();

            return data;
        } catch (error) {
            console.error('Error deleting file:', error);
            throw error;
        }
    }
}

export default cloudinaryService;

