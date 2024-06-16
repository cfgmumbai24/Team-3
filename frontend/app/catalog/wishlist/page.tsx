/**
 * v0 by Vercel.
 * @see https://v0.dev/t/JfRu57pjna5
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import useWishListHook from '@/components/wishlist_hook';
import Image from 'next/image';

interface WishlistItem {
    name: string;
    image: string;
}

export default function Component() {
    const { addToWishList, wishList, removeFromWishList } = useWishListHook();
    console.log(wishList);

    return (
        <section className="w-full py-12">
            <div className="container grid gap-6 md:gap-8 px-4 md:px-6 max-w-3xl mx-auto">
                <div className="grid gap-1">
                    <h1 className="text-2xl font-bold tracking-tight">
                        Your Wishlist
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400">
                        Review the items you{"'"}ve added to your wishlist.
                    </p>
                </div>
                <ul className="grid gap-6">
                    {wishList.map((item, id) => (
                        <li
                            key={id}
                            className="grid grid-cols-[100px_1fr_auto] items-center gap-4"
                        >
                            <Image
                                src={item.imageURL}
                                alt={item.name}
                                width={100}
                                height={100}
                                className="rounded-lg object-cover"
                            />
                            <div className="grid gap-1">
                                <h3 className="font-semibold">{item.name}</h3>
                            </div>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => removeFromWishList(item)}
                            >
                                Remove
                            </Button>
                        </li>
                    ))}
                </ul>
                <div className="flex justify-end">
                    <Link
                        href="#"
                        className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                        prefetch={false}
                    >
                        Proceed
                    </Link>
                </div>
            </div>
        </section>
    );
}
