import { useRef, useState } from "react";
import { Button } from "../../components/Button";
import compressImage from "../../services/imageCompression";
import axios from "axios";
import { toast } from "react-toastify";

export const ImageUploader: React.FC = () => {
    const inputFileRef = useRef<HTMLInputElement>(null);
    const [imageFile, setImageFile] = useState<File | undefined>();

    const handleUploadImage = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!imageFile) return;

        try {
            const formData = new FormData();
            formData.append('image', imageFile);

            const res = await axios.post('http://localhost:8042/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            toast.success(res.data.file);

            setImageFile(undefined);
            if (inputFileRef.current) {
                inputFileRef.current.value = '';
            }
        } catch (error) {
            console.error("Error while uploading image: ", error);
        }
    }

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];

        if (!selectedFile) return;

        setImageFile(selectedFile);

        const compressedFile = await compressImage(selectedFile, 100);

        if (compressedFile) {
            setImageFile(compressedFile);
        }
    }

    return (
        <div>
            <form onSubmit={handleUploadImage}>
                <input ref={inputFileRef} type="file" name="image" accept=".jpg, .png, .jpeg" onChange={handleImageChange}/>
                <Button type="submit" variant={"contained"}>Upload</Button>
            </form>
        </div>
    );
}
