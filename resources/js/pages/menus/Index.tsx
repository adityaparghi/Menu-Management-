import React, { useState } from "react";
import { Link } from "@inertiajs/react";
import * as LucideIcons from "lucide-react";
import { Plus, Trash2, Edit, ChevronRight } from "lucide-react";

interface Menu {
  id: number;
  name: string;
  url?: string;
  icon?: string | null;
  status?: string;
  sort_number?: number;
  children_recursive?: Menu[];
}

export default function Index({ menus }: { menus: Menu[] }) {
  // Helper to detect absolute/external URLs
  const isExternal = (u?: string) => !!u && /^https?:\/\//i.test(u || "");

  // Render a single menu row + recursively render children when expanded
  function RecursiveMenuRow({ menu, level = 0 }: { menu: Menu; level?: number }) {
    const [open, setOpen] = useState(false);
    const children = menu.children_recursive || [];
    const hasChildren = children.length > 0;


    const IconComponent: any = menu.icon ? (LucideIcons as any)[menu.icon] : null;

    return (
      <li>
        <div
          className={`flex items-center justify-between border rounded p-3 mb-2 bg-white`}
          role="group"
        >
          {/* Left: icon + title */}
          <div className="flex items-center gap-3 min-w-0">
            {/* indentation by level using padding-left */}
            <div style={{ paddingLeft: level * 14 }}>
              {/* Icon */}
              {IconComponent ? (
                <IconComponent className="inline-block w-5 h-5 mr-3 text-black/80" />
              ) : (
                <span className="inline-block w-5 h-5 mr-3" />
              )}
            </div>

            <div className="min-w-0">
              {menu.url ? (
                isExternal(menu.url) ? (
                  <a
                    href={menu.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block font-medium truncate hover:underline"
                    title={menu.url}
                  >
                    {menu.name}
                  </a>
                ) : (
                  <Link
                    href={menu.url}
                    className="block font-medium truncate hover:underline"
                    title={menu.url}
                  >
                    {menu.name}
                  </Link>
                )
              ) : (
                <div className="block font-medium truncate">{menu.name}</div>
              )}

              {typeof menu.sort_number !== "undefined" && (
                <div className="text-xs text-gray-500 mt-0.5">Sort: {menu.sort_number}</div>
              )}
            </div>
          </div>

          {/* Right: Action column (fixed width so all rows align) */}
          <div className="flex items-center gap-2 ml-4 w-56 justify-end">
            <Link
              href={`/create?parent=${menu.id}`}
              className="inline-flex items-center gap-2 px-3 py-1 text-sm bg-black text-white rounded hover:bg-gray-800"
            >
              <Plus size={14} />
              <span>Add</span>
            </Link>

            <Link
              href={`/menus/${menu.id}/edit`}
              className="inline-flex items-center gap-2 px-3 py-1 text-sm border rounded hover:bg-gray-50"
            >
              <Edit size={14} />
              <span>Edit</span>
            </Link>

            <Link
              href={`/menus/${menu.id}`}
              method="delete"
              as="button"
              onClick={(e: React.MouseEvent) => {
                if (!confirm("Delete this menu?")) {
                  e.preventDefault();
                }
              }}
              className="inline-flex items-center gap-2 px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded"
            >
              <Trash2 size={14} />
              <span>Delete</span>
            </Link>

            {/* Chevron (only if it has children). Clicking toggles the subtree */}
            {hasChildren && (
              <button
                type="button"
                aria-expanded={open}
                onClick={() => setOpen((s) => !s)}
                className="p-1 rounded hover:bg-gray-100"
                title={open ? "Collapse" : "Expand"}
              >
                <ChevronRight
                  size={18}
                  className={`transition-transform ${open ? "rotate-90" : ""} text-gray-600`}
                />
              </button>
            )}
          </div>
        </div>

        {/* children (recursive) */}
        {hasChildren && open && (
          <ul className="ml-6 mt-1">
            {children.map((c) => (
              <RecursiveMenuRow key={c.id} menu={c} level={(level || 0) + 1} />
            ))}
          </ul>
        )}
      </li>
    );
  }

  return (
    <div className="p-5">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Menus</h1>
        <Link href="/create" className="px-4 py-2 bg-black text-white rounded">
          Create Menu
        </Link>
      </div>

      <ul>
        {menus && menus.length > 0 ? (
          menus.map((m) => <RecursiveMenuRow key={m.id} menu={m} />)
        ) : (
          <div className="text-gray-500">No menus found.</div>
        )}
      </ul>
    </div>
  );
}














// import { Button } from "@headlessui/react";
// import { Link, usePage } from "@inertiajs/react";
// import { Plus, Trash2 } from "lucide-react";
// import { useState } from "react";

// interface Menu {
//   id: number;
//   name: string;
//   url?: string;
//   icon?: string;
//   status: string;
//   sort_number: number;
//   children_recursive: Menu[];
// }
// //— Sort: {menu.sort_number}

// export default function Index({ menus }: { menus: Menu[] }) {
  
//   console.log("Index menus: ",menus);
//   const [down, setDown] = useState(false);

//   // const renderMenu = (menu: Menu) => ( 
//   //   <li key={menu.id} className="border p-2 rounded mb-2">
//   //     <div className="flex justify-between items-center">
//   //       <span>
//   //         {menu.icon && <i className={`mr-2 ${menu.icon}`}></i>}
//   //         {menu.name} - {menu.sort_number}
//   //       </span>
//   //         <span className="text-blue-500" ></span>

//   //       <Link href={`/create?parent=${menu.id}`} className="text-blue-500 hover:underline">
//   //         Add Menu
//   //       </Link>

//   //       <Link href={`/menus/${menu.id}/edit`} className="text-blue-500 hover:underline " >
//   //         Update
//   //       </Link>

//   //       <Link href={`/menus/${menu.id}`}
//   //         method="delete"
//   //         as="button"
//   //         className="text-red-500 cursor-pointer 
//   //         hover:bg-gray-200 "
//   //         onClick={(e) => {
//   //           if (!confirm("Delete this menu")) {
//   //             e.preventDefault();
//   //           }
//   //         }}>
//   //         <Trash2 />
//   //       </Link>

//   //     </div>
//   //     {menu.children_recursive && menu.children_recursive.length > 0 && (
//   //       <ul className="ml-5 mt-2">
//   //         {menu.children_recursive.map((child) => renderMenu(child))}
//   //       </ul>
//   //     )}
//   //   </li>
//   // );

// const renderMenu = (menu: Menu) => ( 
//   <li key={menu.id} className="border p-2 rounded mb-2">
//     <div className="flex justify-between items-center">
      
//       {/* Left side: icon + text */}
//       <div className="flex items-center gap-2">
//         {menu.icon && <i className={`mr-2 ${menu.icon}`}></i>}
//         <span>{menu.name} - {menu.sort_number}</span>
//       </div>

//       {/* Right side: actions always aligned */}
//       <div className="flex items-center gap-3 shrink-0">
//         <Link 
//           href={`/create?parent=${menu.id}`} 
//           className="text-black hover:underline cursor-pointer"
//         >
//           Add
//         </Link>

//         <Link 
//           href={`/menus/${menu.id}/edit`} 
//           className="text-black hover:underline cursor-pointer"
//         >
//           Update
//         </Link>

//         <Link 
//           href={`/menus/${menu.id}`}
//           method="delete"
//           as="button"
//           className="text-red-500 hover:bg-gray-200 p-1 rounded"
//           onClick={(e) => {
//             if (!confirm("Delete this menu")) {
//               e.preventDefault();
//             }
//           }}
//         >
//           <Trash2 size={16} />
//         </Link>
//       </div>
//     </div>

//     {/* Recursive children */}
//     {menu.children_recursive && menu.children_recursive.length > 0 && (
//       <ul className="ml-6 mt-2 space-y-2">
//         {menu.children_recursive.map((child) => renderMenu(child))}
//       </ul>
//     )}
//   </li>
// );


//   return (
//     <div className="p-5">
//       <div className="flex gap-220" >
//         <h1 className="text-xl font-bold mb-4">Menus</h1>
//         {/* <Link href={'/dashboard'} className="text-blue-900 px-3 py-2 bg-purple-200 rounded" >
//           Dashboard
//         </Link> */}
//         <Link href="/create" className="bg-black text-white px-3 py-2 hover:bg-blue-600 rounded">
//           Create Menu
//         </Link>
//       </div>
        
//       <ul className="mt-4">{menus.map((menu) => renderMenu(menu))}</ul> 
     
//     </div>
//   );
// }

// import { useState } from "react";
// import { ChevronRight } from "lucide-react";
// import { Link } from "@inertiajs/react";

// interface MenuItem {
//   id: number;
//   name: string;
//   url: string;
//   icon?: string;
//   children?: MenuItem[];
// }

// export default function Sidebar({ menus }: { menus: MenuItem[] }) {
//   return (
//     <div className="w-64 bg-white border-r">
//       <ul className="p-2">
//         {menus.map((menu) => (
//           <SidebarItem key={menu.id} item={menu} />
//         ))}
//       </ul>
//     </div>
//   );
// }

// function SidebarItem({ item }: { item: MenuItem }) {
//   const [open, setOpen] = useState(false);

//   const hasChildren = item.children && item.children.length > 0;

//   return (
//     <li className="mb-1">
//       <div
//         className="flex items-center justify-between px-3 py-2 cursor-pointer hover:bg-gray-100 rounded"
//         onClick={() => hasChildren && setOpen(!open)}
//       >
//         {/* Left side: text with link */}
//         {item.url ? (
//           <Link href={item.url} className="flex-1 text-sm font-medium">
//             {item.name}
//           </Link>
//         ) : (
//           <span className="flex-1 text-sm font-medium">{item.name}</span>
//         )}

//         {/* Right side: Chevron if has children */}
//         {hasChildren && (
//           <ChevronRight
//             size={16}
//             className={`transition-transform ${open ? "rotate-90" : ""}`}
//           />
//         )}
//       </div>

//       {/* Submenu */}
//       {hasChildren && open && (
//         <ul className="ml-4 mt-1 border-l border-gray-200 pl-2">
//           {item.children?.map((child) => (
//             <SidebarItem key={child.id} item={child} />
//           ))}
//         </ul>
//       )}
//     </li>
//   );
// }

 








































































