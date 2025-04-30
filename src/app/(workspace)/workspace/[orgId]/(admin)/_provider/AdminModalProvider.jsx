"use client";
import { useEffect, useState } from "react";
import { AddUser } from "../(management)/user/AddModal";
import { EditUser } from "../(management)/user/EditModal";
import { DeleteUser } from "../(management)/user/DeleteModal";
import { AddPermission } from "../(management)/permission/AddModal";
import { EditPermission } from "../(management)/permission/EditModal";
import { DeletePermission } from "../(management)/permission/DeleteModal";
import { AddRole } from "../(management)/role/AddModal";
import { EditRole } from "../(management)/role/EditModal";
import { DeleteRole } from "../(management)/role/DeleteModal";
import { FcmNotification } from "../(management)/user/FcmNotification";
import { AddPost } from "../post/AddModal";
import { AddContent } from "../content/AddModal";
import { EditContent } from "../content/EditModal";
import { DeleteContent } from "../content/DeleteModal";



export const AdminModalProvider = () => {

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <>
            <AddUser />
            <EditUser />
            <DeleteUser />
            <FcmNotification />


            <AddPermission />
            <EditPermission />
            <DeletePermission />

            <AddRole />
            <EditRole />
            <DeleteRole />

            <AddPost />
            <AddContent />
            <EditContent />
            <DeleteContent />

        </>
    )
}