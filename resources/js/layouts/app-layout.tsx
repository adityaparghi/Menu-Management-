// AppLayout.tsx
// import AppSidebar from "@/components/app-sidebar";
import { BreadcrumbItem } from "@/types";
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

type Menu = {
  id: number
  name: string
  parent_id?: number | null
  children?: Menu[]
}

interface AppLayoutProps {
  children: React.ReactNode;
  breadcrumbs: BreadcrumbItem[];
  menus: Menu[];
}

export default function AppLayout({ children, breadcrumbs, menus }: AppLayoutProps) {
  return (

    
    <SidebarProvider>
      <AppSidebar menus={menus} />
      <SidebarInset>
        <main className="flex-1 p-6 overflow-y-auto bg-white">
          {/* breadcrumbs UI */}
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>



    // <SidebarProvider>
    // <div className="flex h-screen">
    //   <AppSidebar menus={menus} />  {/* pass menus */}
    //   <main className="flex-1 p-6 bg-white overflow-y-auto">
    //     {/* render breadcrumbs */}
    //     {children}
    //   </main>
    // </div>
    // </SidebarProvider>
  );
}



// import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
// import { type BreadcrumbItem } from '@/types';
// import { type ReactNode } from 'react';

// interface AppLayoutProps {
//     children: ReactNode;
//     breadcrumbs?: BreadcrumbItem[];
// }

// export default ({ children, breadcrumbs, ...props }: AppLayoutProps) => (
//     <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
//         {children}
//     </AppLayoutTemplate>
// );