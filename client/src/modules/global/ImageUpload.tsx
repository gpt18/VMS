import { useRef, useState } from "react";
import { Button } from "../../components/Button";
import compressImage from "../../services/imageCompression";
import axios from "axios";
import { toast } from "react-toastify";
import BeatLoader from "react-spinners/BeatLoader";

export const ImageUploader: React.FC = () => {
    const inputFileRef = useRef<HTMLInputElement>(null);
    const [imageFile, setImageFile] = useState<File | undefined>();
    const [isLoading, setLoading] = useState(false);
    const [response, setResponse] = useState({
        file: '',
        filePath: '',
        fileType: '',
        fileUrl: '',
    });

    const handleUploadImage = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!imageFile) return;

        setLoading(true);

        try {
            const formData = new FormData();
            formData.append('image', imageFile);

            const res = await axios.post('http://192.168.0.102:8042/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            toast.success(res.data.file);

            setImageFile(undefined);
            if (inputFileRef.current) {
                inputFileRef.current.value = '';
            }

            setResponse(res.data);

        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {


        const selectedFile = e.target.files?.[0];

        if (!selectedFile) return;

        setLoading(true);

        setImageFile(selectedFile);

        const compressedFile = await compressImage(selectedFile, 100);

        if (compressedFile) {
            setImageFile(compressedFile);
        }

        setLoading(false);
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <form onSubmit={handleUploadImage} className="flex flex-col space-y-6">
                <input ref={inputFileRef} type="file" name="image" accept=".jpg, .png, .jpeg" onChange={handleImageChange} />
                {
                    imageFile ?
                        <Button type="submit" variant={"contained"}>
                            {
                                isLoading ?
                                    <BeatLoader color="#fff" size={10} /> :
                                    "Upload"
                            }
                        </Button> :
                        <Button type="submit" variant={"disabled"} disabled={!imageFile}>Upload</Button>
                }
            </form>
            {response.fileUrl &&
                <div>
                    <div className="py-4 text-sm font-bold">🎉 Image Compressed and Uploaded Successfully!</div>
                    <img src={response.fileUrl} alt={response.file} className="max-h-sm max-w-sm" />
                </div>
            }
        </div>
    );
}
