import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { BookOpen, Folder, Grip, KeyRound, LayoutGrid } from 'lucide-react';
import AppLogo from './app-logo';

interface Menu {
  id: number;
  name: string;
  url?: string;
  icon?: string;
  parent_id?: number | null;
  children?: Menu[];
}

// 1. Convert flat menus (with parent_id) into nested tree
function buildMenuTree(menus: Menu[]): Menu[] {
  const map: Record<number, Menu> = {};
  const roots: Menu[] = [];

  menus.forEach((menu) => {
    map[menu.id] = { ...menu, children: [] };
  });

  menus.forEach((menu) => {
    if (menu.parent_id === null || menu.parent_id === undefined) {
      roots.push(map[menu.id]);
    } else {
      if (map[menu.parent_id]) {
        map[menu.parent_id].children?.push(map[menu.id]);
      }
    }
  });

  return roots;
}

// 2. Convert Menu[] into NavItem[]
function mapMenusToNavItems(menus: Menu[]): NavItem[] {
  return menus.map((menu) => ({
    title: menu.name,
    href: menu.url || "#",
    icon: Folder,
    items: menu.children && menu.children.length > 0 
      ? mapMenusToNavItems(menu.children) 
      : [],
  }));
}

interface AppSidebarProps {
  menus: Menu[];
}

const footerNavItems: NavItem[] = [
  {
    title: 'Create Menu',
    href: '/create',
    icon: Folder,
  },
  {
    title: 'All Menu',
    href: 'http://localhost:8000/all',
    icon: Grip,
  },
];

export function AppSidebar({ menus }: AppSidebarProps) {
  const { props } = usePage();
  const backendMenus: Menu[] = props.menus || [];

  // Convert flat → nested → NavItem[]
  const nestedMenus = buildMenuTree(backendMenus);
  const navItems: NavItem[] = [
    {
      title: 'Dashboard',
      href: dashboard(),
      icon: LayoutGrid,
    },
    ...mapMenusToNavItems(nestedMenus),
  ];

  console.log("Nested Menus:", nestedMenus);

  return (
    <Sidebar collapsible="icon" variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href={dashboard()} prefetch>
                <AppLogo />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={navItems} /> 
      </SidebarContent>

      <SidebarFooter>
        <NavFooter items={footerNavItems} className="mt-auto" />
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}




// import { NavFooter } from '@/components/nav-footer';
// import { NavMain } from '@/components/nav-main';
// import { NavUser } from '@/components/nav-user';
// import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
// import { dashboard } from '@/routes';
// import { type NavItem } from '@/types';
// import { Link, usePage } from '@inertiajs/react';
// import { BookOpen, Folder, LayoutGrid } from 'lucide-react';
// import AppLogo from './app-logo';

// interface Menu {
//   id: number;
//   name: string;
//   url?: string;
//   icon?: string;
//   children?: Menu[];
// }

// function mapMenusToNavItems(menus: Menu[]): NavItem[] {
//   return menus.map((menu) => ({
//     title: menu.name,
//     href: menu.url || "#",
//     icon: Folder,
//     items: menu.children && menu.children.length > 0 
//       ? mapMenusToNavItems(menu.children)  // recu.
//       : [],
//   }));
// }


// interface AppSidebarProps {
//   menus: Menu[];
// }

// const footerNavItems: NavItem[] = [
//   {
//     title: 'Create Menu',
//     href: '/create',
//     icon: Folder,
//   },
//   {
//     title: 'Documentation',
//     href: 'https://laravel.com/docs/starter-kits#react',
//     icon: BookOpen,
//   },
// ];

// export function AppSidebar({ menus }: AppSidebarProps) {

//   const mainNavItems: NavItem[] = [
//     {
//       title: 'Dashboard',
//       href: dashboard(),
//       icon: LayoutGrid,
//     },

//     // ...menus.map((menu) => ({
//     //   title: menu.name,
//     //   href: menu.url || "#",
//     //   icon: Folder, 
//     //   items: menu.children
//     //     ? menu.children.map((child) => ({
//     //         title: child.name,
//     //         href: child.url || "#",
//     //         icon: Folder,
//     //       }))
//     //     : [],
//     // })),
//      ...mapMenusToNavItems(menus),
//   ];

//     const {props} = usePage();
//   const menu = props.menus || [];
//   console.log(menu);

//   return (
//     <Sidebar collapsible="icon" variant="inset">
//       <SidebarHeader>
//         <SidebarMenu>
//           <SidebarMenuItem>
//             <SidebarMenuButton size="lg" asChild>
//               <Link href={dashboard()} prefetch>
//                 <AppLogo />
//               </Link>
//             </SidebarMenuButton>
//           </SidebarMenuItem>
//         </SidebarMenu>
//       </SidebarHeader>

//       <SidebarContent>
//         <NavMain items={mapMenusToNavItems(menu)} /> 
//       </SidebarContent>

//       <SidebarFooter>
//         <NavFooter items={footerNavItems} className="mt-auto" />
//         <NavUser />
//       </SidebarFooter>

      
//     </Sidebar>
//   );
// }




// import { NavFooter } from '@/components/nav-footer';
// import { NavMain } from '@/components/nav-main';
// import { NavUser } from '@/components/nav-user';
// import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
// import { dashboard } from '@/routes';
// import { type NavItem } from '@/types';
// import { Link } from '@inertiajs/react';
// import { BookOpen, Folder, LayoutGrid } from 'lucide-react';
// import AppLogo from './app-logo';

// const mainNavItems: NavItem[] = [
//     {
//         title: 'Dashboard',
//         href: dashboard(),
//         icon: LayoutGrid,
//     },
// ];

// const footerNavItems: NavItem[] = [
//     {
//         title: 'New Menu',
//         href: 'http://localhost:8000/create',
//         icon: Folder,
//     },
//     {
//         title: 'Documentation',
//         href: 'https://laravel.com/docs/starter-kits#react',
//         icon: BookOpen,
//     },
// ];

// export function AppSidebar() {
//     return (
//         <Sidebar collapsible="icon" variant="inset">
            
//             <SidebarHeader>
//                 <SidebarMenu>
//                     <SidebarMenuItem>
//                         <SidebarMenuButton size="lg" asChild>
//                             <Link href={dashboard()} prefetch>
//                                 <AppLogo />
//                             </Link>
//                         </SidebarMenuButton>
//                     </SidebarMenuItem>
//                 </SidebarMenu>
//             </SidebarHeader>

//             <SidebarContent>
//                 <NavMain items={mainNavItems} />

//             </SidebarContent>

//             <SidebarFooter>
//                 <NavFooter items={footerNavItems} className="mt-auto" />
//                 <NavUser />
//             </SidebarFooter>
//         </Sidebar>
//     );
// }