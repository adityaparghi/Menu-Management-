import { Link } from "@inertiajs/react";
import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";

interface Menu {
  id: number;
  name: string;
  url?: string;
  icon?: string;
  status: string;
  sort_number: number;
  children: Menu[];
}
//— Sort: {menu.sort_number}


export default function Index({ menus }: { menus: Menu[] }) {
  console.log("Index menus: ",menus);
  const [down, setDown] = useState(false);
  const renderMenu = (menu: Menu) => ( 
    <li key={menu.id} className="border p-2 rounded mb-2">
      <div className="flex justify-between items-center">
        <span>
          {menu.icon && <i className={`mr-2 ${menu.icon}`}></i>}
          {menu.name} - {menu.sort_number}
        </span>
          <span className="text-blue-500" ></span>

        <Link href={`/create?parent=${menu.id}`} className="text-blue-500 hover:underline">
          Add Menu
        </Link>

        <Link href={`/menus/${menu.id}/edit`} className="text-blue-500 hover:underline " >
          Update
        </Link>

        <Link href={`/menus/${menu.id}`}
          method="delete"
          as="button"
          className="text-red-500 cursor-pointer 
          hover:bg-gray-200 "
          onClick={(e) => {
            if (!confirm("Delete this menu")) {
              e.preventDefault();
            }
          }}>
          <Trash2 />
        </Link>

      </div>
      {menu.children && menu.children.length > 0 && (
        <ul className="ml-5 mt-2">
          {menu.children.map((child) => renderMenu(child))}
        </ul>
      )}
    </li>
  );

  return (
    <div className="p-5">
      <div className="flex gap-220" >
        <h1 className="text-xl font-bold mb-4">Menus</h1>
        {/* <Link href={'/dashboard'} className="text-blue-900 px-3 py-2 bg-purple-200 rounded" >
          Dashboard
        </Link> */}
        <Link href="/create" className="bg-blue-500 text-white px-3 py-2 hover:bg-blue-600 rounded">
          Create Menu
        </Link>
      </div>
       
      <ul className="mt-4">{menus.map((menu) => renderMenu(menu))}</ul> 
     
    </div>
  );
}

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

 