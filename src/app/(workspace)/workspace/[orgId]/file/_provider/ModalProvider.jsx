"use client";

import { useEffect, useState } from "react";
import { FIleCreator } from "../_components/FIleCreator";
import NewFolderModal from "../_components/NewFolderModal";






export const ModalProvider = () => {

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <>
            <FIleCreator />
            <NewFolderModal />
        </>
    )
}