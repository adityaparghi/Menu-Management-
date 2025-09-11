import React, { useState } from "react";
import { useForm } from "@inertiajs/react";
import { iconList } from "@/utils/iconList";

interface Parent {
  id: number;
  name: string;
}


export default function Edit({ parents, menu }: { parents: Parent[], menu: any }) {

  const [show, setShow] = useState(false);
  const { data, setData, put, processing, errors } = useForm({
    name: menu.name || "",
    url: menu.url || "",
    icon: menu.icon || "",
    parent_id: menu.parent_id || "",
    status: menu.status || "Active",
  });
  console.log(menu);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    put(`/menus/${menu.id}`, { preserveScroll: true });
  };

  return (
    <div className="p-5">
      <h1 className="text-xl font-bold mb-4">Update Menu</h1>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          placeholder="Menu Name"
          value={data.name}
          onChange={(e) => setData("name", e.target.value)}
          className="border p-2 w-full cursor-pointer"
        />
        {errors.name && <div className="text-red-500">{errors.name}</div>}

        <input
          type="text"
          placeholder="URL"
          value={data.url}
          onChange={(e) => setData("url", e.target.value)}

          className="border p-2 w-full cursor-pointer"
        />

        {/* <input
          type="text"
          placeholder="Icon"
          value={data.icon}
          onChange={(e) => setData("icon", e.target.value)}
          className="border p-2 w-full cursor-pointer"
        /> */}
        <div className="relative">
          <div
            className="border p-2 w-full flex items-center cursor-pointer rounded"
            onClick={() => setShow((prev) => !prev)}
          >
            {data.icon && (
              <span className="mr-2">
                {
                  (() => {
                    const Icon =
                      iconList.find((ic) => ic.name === data.icon)?.icon;
                    return Icon ? <Icon className="w-5 h-5" /> : null;
                  })()
                }
              </span>
            )}
            <input
              type="text"
              placeholder="Search Icons"
              value={data.icon}
              readOnly
              className="flex-1 cursor-pointer outline-none"
            />
          </div>

          {show && (
            <div className="absolute bg-white border mt-1 w-full max-h-60 overflow-y-auto grid grid-cols-10 gap-2 p-2 rounded shadow-lg z-50">
              {iconList.map(({ name, icon: Icon }) => (
                <button
                  type="button"
                  key={name}
                  onClick={() => {
                    setData("icon", name); // save to form
                    setShow(false); // hide after i select
                  }}
                  className={`p-2 border rounded flex flex-col items-center cursor-pointer ${data.icon === name ? "bg-blue-100 border-blue-500" : ""
                    }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-xs mt-1">{name}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* <select
          value={data.parent_id}
          onChange={(e) => setData("parent_id", e.target.value ? parseInt(e.target.value) : "") }
          className="border p-2 w-full cursor-pointer"
        >
          <option value="">No Parent (Main Menu)</option>
          {parents.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select> */}
        

        {/*Select all the menus and submenus excluding it's submenus */}
        <select
          value={data.parent_id}
          onChange={(e) => setData("parent_id", e.target.value ? parseInt(e.target.value) : "")}
          className="border p-2 w-full cursor-pointer"
        >
          <option value="">No Parent (Main Menu)</option>
          {parents.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>


        <select
          value={data.status}
          onChange={(e) => setData("status", e.target.value)}
          className="border p-2 w-full cursor-pointer"
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>

        <input
          type="number"
          //  placeholder="Sort Order"
          placeholder={``}
          value={data.sort_number}
          onChange={(e: { target: { value: string; }; }) => setData("sort_number", parseInt(e.target.value))}
          className="border p-2 w-full"
        />

        <button
          type="submit"
          disabled={processing}
          className="bg-green-500 border-green cursor-pointer text-white px-4 py-2 rounded"
        >
          Update Menu
        </button>
      </form>
    </div>
  );
}



//   import React, { useState } from "react";
//   import { useForm } from "@inertiajs/react";

//   interface Parent {
//     id: number;
//     name: string;
//   }

//   export default function Edit({ parents }: { parents: Parent[] }) {
//     const { data, setData, put, processing, errors } = useForm({
//       name: "",
//       url: "",
//       icon: "",
//       parent_id: "",
//       status: "Active",
//       sort_number: 0,
//     });

//     const handleSubmit = (e: React.FormEvent) => {
//       e.preventDefault();
//       put("/", { preserveScroll: true });
//     };

//     return (
//       <div className="p-5">
//         <h1 className="text-xl font-bold mb-4">Create Menu</h1>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input
//             type="text"
//             placeholder="Menu Name"
//             value={data.name}
//             onChange={(e: { target: { value: any; }; }) => setData("name", e.target.value)}
//             className="border p-2 w-full"
//           />
//           {errors.name && <div className="text-red-500">{errors.name}</div>}

//           <input
//             type="text"
//             placeholder="URL"
//             value={data.url}
//             onChange={(e: { target: { value: any; }; }) => setData("url", e.target.value)}
//             className="border p-2 w-full"
//           />

//           <input
//             type="text"
//             placeholder="Icon class (e.g., fa fa-home)"
//             value={data.icon}
//             onChange={(e: { target: { value: any; }; }) => setData("icon", e.target.value)}
//             className="border p-2 w-full"
//           />

//           <select
//             value={data.parent_id}
//             onChange={(e: { target: { value: any; }; }) => setData("parent_id", e.target.value)}
//             className="border p-2 w-full"
//           >
//             <option value="">No Parent (Main Menu)</option>
//             {parents.map((p) => (
//               <option key={p.id} value={p.id}>
//                 {p.name}
//               </option>
//             ))}
//           </select>

//           <select
//             value={data.status}
//             onChange={(e: { target: { value: any; }; }) => setData("status", e.target.value)}
//             className="border p-2 w-full"
//           >
//             <option value="Active">Active</option>
//             <option value="Inactive">Inactive</option>
//           </select>

// {/* <input
//   type="number"
//   placeholder="Sort Order"
//   value={data.sort_number}
//   onChange={(e: { target: { value: string; }; }) => setData("sort_number", parseInt(e.target.value))}
//   className="border p-2 w-full"
// /> */}

//           <button
//             type="submit"
//             disabled={processing}
//             className="bg-green-500 text-white px-4 py-2 rounded"
//           >
//             Update Menu
//           </button>
//         </form>
//       </div>
//     );
//   }