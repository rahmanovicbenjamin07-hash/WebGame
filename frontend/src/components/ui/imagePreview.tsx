import { useMemo } from "react";
import placeholderImage from "../../assets/placeholder-image.png";

const ImagePreview = ({ file }: { file: File | null }) => {
    const previewUrl = useMemo(() => (file ? URL.createObjectURL(file) : null), [file]);

    return (
        <div 
            className="lg:rounded-[19px] rounded-2xl overflow-hidden shadow-[0_0_15px_rgba(0,0,0,0.1)] bg-gray-100 flex items-center justify-center transition-all"
            style={{ width: "100%", height: "215px" }}
        >
            {previewUrl ? (
                <img src={previewUrl} className="w-full h-full object-cover" alt="Preview" />
            ) : (
                <div className="text-center text-gray-400">
                    <img src={placeholderImage}></img>
                </div>
            )}
        </div>
    );
};

export default ImagePreview;
