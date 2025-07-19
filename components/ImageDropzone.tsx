"use client";

import { useDropzone } from "react-dropzone";
import { useCallback, useEffect, useState } from "react";
import { Delete, Upload } from "lucide-react";

interface Props {
    onImageSelected: (files: File) => void;
}

export default function ImageDropzone({ onImageSelected }: Props) {
    const [image, setImage] = useState<{ file: File; url: string } | null>(null);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        const newImage = {
            file,
            url: URL.createObjectURL(file),
        };
        if (image) URL.revokeObjectURL(image.url); // nettoyage de l'ancienne URL
        setImage(newImage);
        onImageSelected(file);
    }, [onImageSelected, image]);

    const handleDelete = () => {
        if (image) {
            URL.revokeObjectURL(image.url);
            setImage(null);
            onImageSelected(null!);
        }
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { "image/*": [] },
        multiple: false,
    });

    useEffect(() => {
        return () => {
            if (image) URL.revokeObjectURL(image.url);
        };
    }, [image]);

    return (
        <div>
            <div {...getRootProps()} className="border p-4 rounded cursor-pointer">
                <input {...getInputProps()} />
                {isDragActive ? (
                    <div className="flex flex-col items-center border-2 border-dashed border-primary rounded">
                        <Upload className="w-12 h-12 text-primary" />
                        <p className="text-sm mt-3 font-semibold">Déposez votre image ici</p>
                    </div>
                ) : (
                    <div className="flex flex-col items-center border-2 border-dashed border-primary rounded p-5">
                        <Upload className="w-12 h-12 text-primary" />
                        <p className="text-sm mt-3 font-semibold">Cliquez ou déposez votre image ici</p>
                    </div>
                )}
            </div>

            {image && (
                <div className="flex gap-2 mt-4 flex-wrap">
                    <div className="relative w-full">
                        <img
                            src={image.url}
                            alt="preview"
                            className="w-full h-full object-cover rounded"
                        />
                        <button
                            type="button"
                            onClick={handleDelete}
                            className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 text-xs hover:bg-red-800"
                        >
                            <Delete />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
