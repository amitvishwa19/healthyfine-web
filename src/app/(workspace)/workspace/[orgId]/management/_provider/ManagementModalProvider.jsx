"use client";
import { useEffect, useState } from "react";
import { AddPermission } from "../permission/AddModal";
import { EditPermission } from "../permission/EditModal";
import { DeletePermission } from "../permission/DeleteModal";
import { AddRole } from "../role/AddModal";
import { EditRole } from "../role/EditModal";
import { DeleteRole } from "../role/DeleteModal";
import { AddUser } from "../user/AddModal";
import { EditUser } from "../user/EditModal";
import { DeleteUser } from "../user/DeleteModal";
import { FcmNotification } from "../user/FcmNotification";




export const ManagementModalProvider = () => {

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


        </>
    )
}