import jsQR from "jsqr";

export async function extractQrData(file) {
    const reader = new FileReader();

    return new Promise((resolve, reject) => {
        reader.onload = function (e) {
            const imageData = e.target.result;
            const image = new Image();
            image.src = imageData;

            image.onload = () => {
                try {
                    const canvas = document.createElement('canvas');
                    canvas.width = image.width;
                    canvas.height = image.height;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(image, 0, 0);

                    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                    const code = jsQR(imgData.data, canvas.width, canvas.height);

                    if (code && code.data) {
                        resolve(code.data); // This is your qrData
                    } else {
                        reject(new Error("QR Code not found or invalid"));
                    }
                } catch (error) {
                    reject(error);
                }
            };
        };

        reader.onerror = function (error) {
            reject(error);
        };

        reader.readAsDataURL(file);
    });
}