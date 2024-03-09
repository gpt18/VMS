const compressImage = async (file: File, maxSizeKB: number, crop: boolean = false): Promise<File | null> => {
    const IMAGE_QUALITY_FACTOR = 0.7;
    const SIZE_REDUCTION_PERCENTAGE = 0.2;

    if (isNaN(maxSizeKB) || maxSizeKB <= 0) {
        console.error('Invalid size specified.');
        return file;
    }

    return new Promise((resolve, reject) => {
        var image = new Image();
        image.src = URL.createObjectURL(file);

        image.onload = async () => {
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');

            if (crop && image.width != image.height) {
                const cropWidth = Math.min(image.width, image.height);
                const cropX = (image.width - cropWidth) / 2;
                const cropY = (image.height - cropWidth) / 2;

                canvas.width = canvas.height = cropWidth;

                context!.drawImage(image, cropX, cropY, cropWidth, cropWidth, 0, 0, cropWidth, cropWidth);

                file = await new Promise<File>((resolve, reject) => {
                    canvas.toBlob((blob) => {
                        if (blob) {
                            const croppedFile = new File([blob], file.name, { type: 'image/jpeg' });
                            
                            resolve(croppedFile);
                        } else {
                            reject('Failed to create blob from canvas');
                        }
                    }, 'image/jpeg');
                });

               

                image.src = URL.createObjectURL(file);
                await new Promise(resolve => image.onload = resolve);
            }

            if (file.size > maxSizeKB * 1024) {

                const width = image.width - image.width * SIZE_REDUCTION_PERCENTAGE;
                const height = image.height - image.height * SIZE_REDUCTION_PERCENTAGE;

                canvas.width = width;
                canvas.height = height;

                context!.drawImage(image, 0, 0, width, height);

                canvas.toBlob(async (blob) => {
                    if (blob) {
                        const compressedFile = new File([blob], file.name, { type: 'image/jpeg' });

                        if (compressedFile.size <= maxSizeKB * 1024) {
                            resolve(compressedFile);
                        } else {
                            const furtherCompressedFile = await compressImage(compressedFile, maxSizeKB, false);
                            if (furtherCompressedFile) {
                                resolve(furtherCompressedFile);
                            } else {
                                reject('Unable to compress file to desired size.');
                            }
                        }
                    }
                }, 'image/jpeg', IMAGE_QUALITY_FACTOR);
            } else {
                resolve(file);
            }
        };
    });
};

export default compressImage;