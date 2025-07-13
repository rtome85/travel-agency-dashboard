// @ts-nocheck
import type { Sidebar } from '@syncfusion/ej2-react-navigations'
import { SidebarComponent } from '@syncfusion/ej2-react-navigations'
import React from 'react'
import { Link } from 'react-router'
import { sidebarItems } from '~/constants'
import NavItems from './NavItems'



const MobileSideBar = () => {
  let sidebar: SidebarComponent;

  const toggleSidebar = () => {
    sidebar.toggle();
  }

  return (
    <div className="mobile-sidebar wrapper">
        <header>
            <Link to="/" className="link-logo">
                <img src="/assets/icons/logo.svg" alt="logo" className="size-10 md:size-4" />
                <h1 className="text-2xl font-bold">Tourvisto</h1>
            </Link>
                      
            <button 
                onClick={toggleSidebar}
            >
                <img src="/assets/icons/menu.svg" alt="menu" className="size-7 cursor-pointer" />
            </button>
        </header>

        <SidebarComponent
            width={270}
            ref={(Sidebar) => sidebar = Sidebar }
            created={() => {sidebar.hide()}}
            closeOnDocumentClick={true}
            showBackdrop={true}
            type="over"
        >
            <NavItems handleClick={toggleSidebar}/>
        </SidebarComponent>
    </div>
  )
}

export default MobileSideBar