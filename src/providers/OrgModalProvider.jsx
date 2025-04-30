"use client";
import CreateWorkspaceModal from "@/app/(workspace)/workspace/[orgId]/_components/org/CreateWorkspaceModal";
import CreateChannelModal from "@/app/(workspace)/workspace/[orgId]/channel/_components/CreateChannelModal";
import DeleteChannelModal from "@/app/(workspace)/workspace/[orgId]/channel/_components/DeleteChannelModal";
import EditChannelModal from "@/app/(workspace)/workspace/[orgId]/channel/_components/EditChannelModal";
import DeleteServerModal from "@/app/(workspace)/workspace/_components/DeleteServerModal";
import InviteModal from "@/app/(workspace)/workspace/_components/InviteModal";
import LeaveServerModal from "@/app/(workspace)/workspace/_components/LeaveServerModal";
import ManageAccount from "@/app/(workspace)/workspace/_components/ManageAccount";
import { useEffect, useState } from "react";





export const OrgModalProvider = () => {

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <>
            {/* <OrgCreateModal /> */}
            {/* <DefaultOrgCreator /> */}
            {/* <CreateOrgModal /> */}
            <InviteModal />
            {/* <EditOrgModal /> */}
            {/* <ManageMemberModam /> */}
            <CreateChannelModal />
            <EditChannelModal />
            <DeleteChannelModal />
            <CreateWorkspaceModal />

            <LeaveServerModal />
            <DeleteServerModal />

            {/* <GaleryModal /> */}
            <ManageAccount />

            {/* <MessageFIleModal /> */}
            {/* <DeleteMessage /> */}
            {/* <OrgSettings /> */}
            {/* <BoardCreator /> */}
            {/* <DeleteBoardModal /> */}
            {/* <FIleCreator /> */}
            {/* <NewFolderModal /> */}

            {/* <ManageAccount /> */}


            {/* <CreateWorkflowModal /> */}
            {/* <DeleteWorkflowModal /> */}

            {/* <EditCardModal /> */}


        </>
    )
}