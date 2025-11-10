"use client";

import React, { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { supabase } from '@/lib/supabaseClient';
import { type ProjectImage } from '@/lib/constants';
import { UploadCloud, X, Loader2 } from 'lucide-react';
import Image from 'next/image';

interface ImageUploaderProps {
    onUpload: (images: ProjectImage[]) => void;
    initialImages?: ProjectImage[];
}

type UploadedFile = {
    file: File | null;
    id: string;
    url: string;
    status: 'uploading' | 'success' | 'error';
    dbData: ProjectImage | null;
};

const ImageUploader = ({ onUpload, initialImages = [] }: ImageUploaderProps) => {
    const [files, setFiles] = useState<UploadedFile[]>(
        initialImages.map((img, i) => ({
            file: null,
            id: `initial-${i}`,
            url: img.src,
            status: 'success',
            dbData: img
        }))
    );

    // FIX 1: Use useEffect to report changes back to the parent.
    // This runs *after* the render, solving the React state error.
    useEffect(() => {
        const successfulUploads = files
            .filter(f => f.status === 'success' && f.dbData)
            .map(f => f.dbData!);
        onUpload(successfulUploads);
    }, [files, onUpload]); // 'onUpload' is now a dependency

    const onDrop = useCallback(
        async (acceptedFiles: File[]) => {
            const newFiles: UploadedFile[] = acceptedFiles.map((file: File) => ({
                file,
                id: crypto.randomUUID(),
                url: URL.createObjectURL(file),
                status: 'uploading',
                dbData: null,
            }));

            // Add new files to the list (triggers "uploading" state)
            setFiles(prev => [...prev, ...newFiles]);

            // Upload each file one by one
            for (const fileObj of newFiles) {
                const file = fileObj.file;
                if (!file) continue;

                const fileName = `${crypto.randomUUID()}-${file.name}`;
                const filePath = `${fileName}`;

                const { data, error } = await supabase.storage
                    .from('public_media')
                    .upload(filePath, file);

                if (error) {
                    console.error('Error uploading file:', error);
                    // FIX 2: Only update local state. useEffect will notify parent.
                    setFiles(prev => prev.map(f => f.id === fileObj.id ? { ...f, status: 'error' } : f));
                } else {
                    const { data: { publicUrl } } = supabase.storage
                        .from('public_media')
                        .getPublicUrl(data.path);

                    const dbData: ProjectImage = { src: publicUrl, caption: '' };

                    // FIX 2: Only update local state. useEffect will notify parent.
                    setFiles(prev => prev.map(f => f.id === fileObj.id ? { ...f, status: 'success', dbData } : f));
                }
            }
        },
        [] // FIX 3: Remove 'onUpload' from this dependency array
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'image/*': ['.jpeg', '.png', '.jpg', '.gif', '.webp'] },
    });

    // Handle caption changes
    const handleCaptionChange = (id: string, caption: string) => {
        // FIX 2: Only update local state. useEffect will notify parent.
        setFiles(prev => {
            return prev.map(f => {
                if (f.id === id && f.dbData) {
                    return { ...f, dbData: { ...f.dbData, caption } };
                }
                return f;
            });
        });
    };

    // Handle file removal
    const removeFile = (id: string) => {
        // FIX 2: Only update local state. useEffect will notify parent.
        setFiles(prev => prev.filter(f => f.id !== id));
    };

    return (
        <div className="flex flex-col gap-4">
            <label className="text-sm font-medium text-subtext dark:text-Dark_subtext">Project Images</label>

            <div
                {...getRootProps()}
                className={`border-2 border-dashed border-subtext/50 rounded-lg p-8 text-center cursor-pointer transition-colors
          ${isDragActive ? 'bg-primary/10 border-primary' : 'bg-bg dark:bg-Dark_bg hover:bg-black/5 dark:hover:bg-white/5'}`}
            >
                <input {...getInputProps()} />
                <div className="flex flex-col items-center gap-2 text-subtext dark:text-Dark_subtext">
                    <UploadCloud size={32} />
                    {isDragActive ? (
                        <p>Drop the files here ...</p>
                    ) : (
                        <p>Drag 'n' drop some files here, or click to select files</p>
                    )}
                </div>
            </div>

            <div className="flex flex-col gap-4">
                {files.map(fileObj => (
                    <div key={fileObj.id} className="flex items-center gap-4 bg-surface dark:bg-Dark_surface p-3 rounded-lg border border-subtext/20">
                        <div className="relative w-24 h-16 rounded-lg overflow-hidden flex-shrink-0">
                            <Image src={fileObj.url} alt="Upload preview" fill className="object-cover" />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                                {fileObj.status === 'uploading' && <Loader2 size={24} className="text-white animate-spin" />}
                                {fileObj.status === 'success' && <UploadCloud size={24} className="text-green-400" />}
                                {fileObj.status === 'error' && <X size={24} className="text-red-500" />}
                            </div>
                        </div>

                        <div className="flex-1 flex flex-col gap-2">
                            <label htmlFor={`caption-${fileObj.id}`} className="text-xs font-medium text-subtext">Caption</label>
                            <input
                                id={`caption-${fileObj.id}`}
                                type="text"
                                placeholder="A description of the image."
                                value={fileObj.dbData?.caption || ''}
                                onChange={(e) => handleCaptionChange(fileObj.id, e.target.value)}
                                disabled={fileObj.status !== 'success'}
                                className="bg-bg dark:bg-Dark_bg border border-subtext/20 rounded-lg p-2 text-sm"
                            />
                        </div>

                        <button
                            type="button"
                            onClick={() => removeFile(fileObj.id)}
                            className="p-2 rounded-lg text-red-500 hover:bg-red-500/10"
                        >
                            <X size={20} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ImageUploader;