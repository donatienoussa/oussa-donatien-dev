"use client";

import { useDropzone } from "react-dropzone";
import { useCallback, useEffect, useState } from "react";
import { Delete, Upload } from "lucide-react";

interface Props {
    onVideoSelected: (file: File) => void;
}

export default function VideoDropzone({ onVideoSelected }: Props) {
    const [video, setVideo] = useState<{ file: File; url: string } | null>(null);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        const newVideo = {
            file,
            url: URL.createObjectURL(file),
        };
        if (video) URL.revokeObjectURL(video.url);
        setVideo(newVideo);
        onVideoSelected(file);
    }, [onVideoSelected, video]);

    const handleDelete = () => {
        if (video) {
            URL.revokeObjectURL(video.url);
            setVideo(null);
            onVideoSelected(null!);
        }
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { "video/*": [] },
        multiple: false,
    });

    useEffect(() => {
        return () => {
            if (video) URL.revokeObjectURL(video.url);
        };
    }, [video]);

    return (
        <div>
            <div {...getRootProps()} className="border p-4 rounded cursor-pointer">
                <input {...getInputProps()} />
                <div className="flex flex-col items-center border-2 border-dashed border-primary rounded p-5">
                    <Upload className="w-12 h-12 text-primary" />
                    <p className="text-sm mt-3 font-semibold">
                        {isDragActive ? "Déposez votre vidéo ici" : "Cliquez ou déposez votre vidéo ici"}
                    </p>
                </div>
            </div>

            {video && (
                <div className="flex justify-center mt-4">
                    <div className="relative w-[180px] aspect-[9/20] rounded-[2rem] overflow-hidden shadow-lg bg-black">
                        <video
                            src={video.url}
                            controls
                            className="w-full h-full object-cover rounded-[2rem]"
                            preload="metadata"
                        />
                        <button
                            type="button"
                            onClick={handleDelete}
                            className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 text-xs hover:bg-red-800"
                        >
                            <Delete className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
