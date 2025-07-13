import React from "react";
import { Outlet, redirect } from "react-router";
import { SidebarComponent } from "@syncfusion/ej2-react-navigations";
import { MobileSideBar, NavItems } from "../../../components";
import { account } from "~/appwrite/client";
import { getExistingUser, storeUserData } from "~/appwrite/auth";

// const clientLoader = async () => {
//     try {
//         const user = await account.get();
        
//         if(!user.$id) return redirect('/sign-in');

//         const existingUser = await getExistingUser(user.$id);

//         if(existingUser?.status === 'user') {
//             return redirect('/');
//         }


//         return existingUser?.$id ? existingUser : await storeUserData(); 

//     } catch (error) {
//         console.error('Error in clientLoader', error);
//         return redirect('/sign-in');
//     }
// }

const AdminLayout = () => {
    return (
        <div className="admin-layout">
            <MobileSideBar />
            <aside className="w-full max-w-64 hidden lg:block">
                <SidebarComponent width={270} enableGestures={false}>
                    <NavItems />
                </SidebarComponent>
            </aside>
            <aside className="children">
                <Outlet />
            </aside>
        </div>

    );
};

export default AdminLayout;
export { clientLoader };