import { useEffect, useState } from 'react';

interface WishListItem {
    imageURL: string;
    name: string;
}

export default function useWishListHook() {
    const [wishList, setWishList] = useState<WishListItem[]>(() => {
        const storedWishList = localStorage.getItem('wishList');
        return storedWishList ? JSON.parse(storedWishList) : [];
    });

    useEffect(() => {
        console.log(wishList);
        localStorage.setItem('wishList', JSON.stringify(wishList));
    }, [wishList]);

    function addToWishList(item: WishListItem) {
        setWishList([...wishList, item]);
    }

    function removeFromWishList(item: WishListItem) {
        setWishList(wishList.filter((wishListItem) => wishListItem !== item));
    }

    return { wishList, addToWishList, removeFromWishList };
}
