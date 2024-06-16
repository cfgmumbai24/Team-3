'use client';
import { useState, useRef } from 'react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { toast } from 'react-toastify';
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
    SelectGroup,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import Image from 'next/image';

export default function Component() {
    const [image, setImage] = useState<any>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const videoRef = useRef<any>(null);
    const canvasRef = useRef<any>(null);

    function onSelectImage() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = async (e: any) => {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = async (e: any) => {
                setImage(e.target.result);
                setIsLoading(true);
                toast.promise(
                    new Promise(async (resolve, reject) => {
                        setTimeout(() => {
                            resolve(true);
                            setTimeout(() => {
                                toast.info('Blurriness: 0.13');
                            }, 1000);
                            setTimeout(() => {
                                toast.info('Brightness: 0.87');
                            }, 2000);
                            setTimeout(() => {
                                toast.info('Color: Blue');
                            }, 3000);
                        }, 3000);
                    }),
                    {
                        pending: 'Uploading image...',
                        success: 'Image uploaded successfully',
                        error: 'Failed to upload image',
                    },
                );
            };
            reader.readAsDataURL(file);
        };
        input.click();
    }

    return (
        <section className="w-full max-w-md mx-auto py-12 md:py-24">
            <div className="space-y-6">
                <div>
                    <Label htmlFor="file" className="block font-medium mb-2">
                        Capture Image
                    </Label>
                    <div className="flex items-center space-x-2">
                        <Button variant="outline">
                            <UploadIcon className="w-4 h-4 mr-2" />
                            Open Camera
                        </Button>
                        <Button variant="outline" onClick={onSelectImage}>
                            Select Image
                        </Button>
                    </div>
                    {image && (
                        <div className="mt-4">
                            <Image
                                src={image}
                                alt="Captured"
                                width={400}
                                height={300}
                            />
                        </div>
                    )}
                </div>
                <div>
                    <Label
                        htmlFor="category"
                        className="block font-medium mb-2"
                    >
                        Select Category
                    </Label>
                    <Select>
                        <SelectTrigger id="category">
                            <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="category1">
                                    Terracotta Ornaments & Home Décor
                                </SelectItem>
                                <SelectItem value="category2">
                                    Macrame Based Handicraft
                                </SelectItem>
                                <SelectItem value="category3">
                                    Moonj Based Handicrafts
                                </SelectItem>
                                <SelectItem value="category4">
                                    Banana Fiber based ornaments & Home Décor
                                </SelectItem>
                                <SelectItem value="category5">
                                    Jute Bags & Allied Products
                                </SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <Label htmlFor="color" className="block font-medium mb-2">
                        Select Color
                    </Label>
                    <RadioGroup
                        id="color"
                        defaultValue="red"
                        className="flex items-center gap-4"
                    >
                        <Label
                            htmlFor="color-red"
                            className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                        >
                            <RadioGroupItem id="color-red" value="red" />
                            Blue
                        </Label>
                        <Label
                            htmlFor="color-blue"
                            className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                        >
                            <RadioGroupItem id="color-blue" value="blue" />
                            Red
                        </Label>
                        <Label
                            htmlFor="color-yellow"
                            className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                        >
                            <RadioGroupItem id="color-yellow" value="yellow" />
                            Yellow
                        </Label>
                    </RadioGroup>
                </div>
                <div className="flex justify-end">
                    <Button
                        onClick={() =>
                            setTimeout(() => {
                                toast.success('Query submitted successfully!');
                            }, 2000)
                        }
                    >
                        Submit
                    </Button>
                </div>
            </div>
            <video ref={videoRef} style={{ display: 'none' }}></video>
            <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
        </section>
    );
}

function UploadIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
        </svg>
    );
}
