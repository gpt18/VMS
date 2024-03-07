const compressImage = async (file: File, maxSizeKB: number, crop: boolean = false): Promise<File | null> => {
    if (isNaN(maxSizeKB) || maxSizeKB <= 0) {
        console.error('Invalid size specified.');
        return null;
    }

    return new Promise((resolve, reject) => {
        const image = new Image();
        image.src = URL.createObjectURL(file);

        image.onload = () => {
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');

            const originalWidth = image.width;
            const originalHeight = image.height;

            if (crop) {
                const cropWidth = Math.min(originalWidth, originalHeight);
                const cropX = (originalWidth - cropWidth) / 2;
                const cropY = (originalHeight - cropWidth) / 2;

                canvas.width = canvas.height = cropWidth;
                context!.drawImage(image, cropX, cropY, cropWidth, cropWidth, 0, 0, cropWidth, cropWidth);
            } 

            if (file.size > maxSizeKB * 1024) {
                const width = originalWidth / 2;
                const height = originalHeight / 2;

                canvas.width = width;
                canvas.height = height;

                context!.drawImage(image, 0, 0, width, height);

                canvas.toBlob(async (blob) => {
                    if (blob) {
                        const compressedFile = new File([blob], file.name, { type: 'image/jpeg' });

                        if (compressedFile.size <= maxSizeKB * 1024) {
                            console.log("compressed success");
                            resolve(compressedFile);
                        } else {
                            
                            const furtherCompressedFile = await compressImage(compressedFile, maxSizeKB, crop);
                            if (furtherCompressedFile) {
                                resolve(furtherCompressedFile);
                            } else {
                                reject('Unable to compress file to desired size.');
                            }
                        }
                    }
                }, 'image/jpeg', 0.5);
            } else {
                resolve(file);
            }
        };
    });
};

export default compressImage;