'use client';
import Link from 'next/link';
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import client from '@/components/apollo_client';
import { gql } from '@apollo/client';
import { useState, useEffect } from 'react';
import useWishListHook from '@/components/wishlist_hook';

export default function Component() {
    const [catalogs, setCatalogs] = useState<Array<any>>([]);

    useEffect(() => {
        client
            .query({
                query: gql`
                    query GetProducts {
                        getProducts {
                            category
                            name
                            imageURL
                        }
                    }
                `,
            })
            .then((result) => {
                console.log(result);
                if (result.data && result.data.getProducts) {
                    setCatalogs(result.data.getProducts);
                }
            })
            .catch((error) => {
                console.error('Error fetching products:', error);
            });
    }, []);

    return (
        <div className="flex flex-col min-h-screen pt-8">
            <main className="flex-1 py-8 mx-auto">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            className="ml-7 mb-4"
                            variant="outline"
                            size="sm"
                        >
                            Categories
                            <ChevronDownIcon className="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                            Terracotta ornaments and home decor
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            Macrame based handicraft
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            Moonj based handicraft
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            Banana fiber based ornaments and home decor
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            Jute bags and allied products
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {catalogs.map((catalog, id) => (
                        <Catalog key={id} data={catalog} />
                    ))}
                </div>
            </main>
            <footer className="bg-gray-900 text-white py-4">
                <div className="container mx-auto text-center">
                    <p>&copy; 2023 My Ecommerce Site. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}

function ChevronDownIcon(props: any) {
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
            <path d="m6 9 6 6 6-6" />
        </svg>
    );
}

function Catalog({ data }: { data: { imageURL: string; name: string } }) {
    const { addToWishList } = useWishListHook();
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <Image
                src={data.imageURL || '/default_image.jpeg'}
                alt={data.name}
                width={600}
                height={500}
                className="w-full h-48 object-cover"
            />
            <div className="p-4">
                <h3 className="text-lg font-medium mb-2">{data.name}</h3>
                <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => addToWishList(data)}
                >
                    Add to Wishlist
                </Button>
            </div>
        </div>
    );
}
