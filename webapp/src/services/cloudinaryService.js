import CryptoJS from 'crypto-js';
const uploadUrl = 'https://api.cloudinary.com/v1_1/dyn0vsdqn/image/upload';
const deleteUrl = 'https://api.cloudinary.com/v1_1/dyn0vsdqn/image/destroy';

const sha1 = (input) => {
    return CryptoJS.SHA1(input).toString(CryptoJS.enc.Hex);
};

const cloudinaryService = {
    uploadFile: async (file, fileName) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'jqahs7kz');

        if (fileName) {
            formData.append('public_id', fileName);
        }

        try {
            const response = await fetch(uploadUrl, {
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
        const apiSecret = 'OhpngbiPqMZ8j94zPxjXvOcHqic'; // Reemplaza con tu API Secret
        const apiKey = '526622113586487'; // Reemplaza con tu API Key

        // Genera una firma utilizando SHA-1
        const signature = sha1(`public_id=${publicId}&timestamp=${timestamp}${apiSecret}`);

        const formData = new FormData();
        formData.append('public_id', publicId);
        formData.append('api_key', apiKey);
        formData.append('timestamp', timestamp);
        formData.append('signature', signature);

        try {
            const response = await fetch(deleteUrl, {
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

