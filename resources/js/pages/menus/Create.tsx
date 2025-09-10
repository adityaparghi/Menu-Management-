import React, { useState } from "react";
import { useForm } from "@inertiajs/react";
import { iconList } from "@/utils/iconList";

interface Parent {
  id: number;
  name: string;
}

export default function Create({ parents }: { parents: Parent[] }) {
  const [show, setShow] = useState(false);
  console.log("parent:",parents);
  const { data, setData, post, processing, errors } = useForm({
    name: "",
    url: "",
    icon: "",
    parent_id: "",
    status: "Active",
    sort_number: 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post("/", { preserveScroll: true });
  };

  return (
    <div className="p-5">
      <h1 className="text-xl font-bold mb-4">Create Menu</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <input
          type="text"
          placeholder="Menu Name"
          value={data.name}
          onChange={(e) => setData("name", e.target.value)}
          className="border p-2 w-full"
        />
        {errors.name && <div className="text-red-500">{errors.name}</div>}

        {/* URL */}
        <input
          type="text"
          placeholder="URL"
          value={data.url}
          onChange={(e) => setData("url", e.target.value)}
          className="border p-2 w-full"
        />

        {/* Icon selector */}
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
                  className={`p-2 border rounded flex flex-col items-center cursor-pointer ${
                    data.icon === name ? "bg-blue-100 border-blue-500" : ""
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-xs mt-1">{name}</span>
                </button>
             ))}
            </div>
          )}
        </div> 

        {/* Parent */}
        <select
          value={data.parent_id}
          onChange={(e) => setData("parent_id", e.target.value)}
          className="border p-2 w-full cursor-pointer"
        >
          <option value="">No Parent (Main Menu)</option>
          {parents.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>

        {/* Status */}
        <select
          value={data.status}
          onChange={(e) => setData("status", e.target.value)}
          className="border p-2 w-full cursor-pointer"
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>

        {/* Sort Order */}
        <input
          type="number"
          placeholder="Sort Order"
          value={data.sort_number}
          onChange={(e) => setData("sort_number", parseInt(e.target.value))}
          className="border p-2 w-full"
        />

        <button
          type="submit"
          disabled={processing}
          className="bg-green-500 text-white px-4 py-2 rounded cursor-pointer"
        >
          Save Menu
        </button>
      </form>
    </div>
  );
}





//   import React, { useState } from "react";
//   import { useForm } from "@inertiajs/react";
// import { iconList } from "@/utils/iconList";
// import { ArrowBigDown } from "lucide-react";


//   interface Parent {
//     id: number;
//     name: string;
//   }

//   export default function Create({ parents }: { parents: Parent[] }) {
//       const [selectedIcon, setSelectedIcon] = useState<string>("");
//       const [show, setShow] = useState(false);

//     const { data, setData, post, processing, errors } = useForm({
//       name: "",
//       url: "",
//       icon: "",
//       parent_id: "",
//       status: "Active",
//       sort_number: 0,
//     });

//     const handleSubmit = (e: React.FormEvent) => {
//       e.preventDefault(); 
//       post("/", { preserveScroll: true });
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
//             placeholder="Search Icons"
//             value={data.icon}
//             onChange={(e: { target: { value: any; }; }) => setData("icon", e.target.value)}
//             className="border p-2 w-full cursor-pointer"
//             onClick={(e)=>setShow((prev)=> !prev) }
            
//           />
//           {
//             show ? 
//              <div className="grid grid-cols-10 gap-2">
//           {iconList.map(({ name, icon: Icon }) => (
//             <button
//               type="button"
//               key={name}
//               onClick={() => setSelectedIcon(name)}
//               className={`p-2 border rounded flex flex-col items-center cursor-pointer ${
//                 selectedIcon === name ? "bg-blue-100 border-blue-500 " : ""
//               }`}
//             >
//               <Icon className="w-4 h-4" />
//               <span className="text-xs mt-1">{name}</span>
//             </button>
//           ))}
//                </div>

//             : null

//           }
               
//           <select
//             value={data.parent_id}
//             onChange={(e: { target: { value: any; }; }) => setData("parent_id", e.target.value)}
//             className="border p-2 w-full cursor-pointer"
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
//             className="border p-2 w-full cursor-pointer"
//           >
//             <option value="Active">Active</option>
//             <option value="Inactive">Inactive</option>
//           </select>

//           <input
//             type="number"
//             placeholder="Sort Order"
//             value={data.sort_number}
//             onChange={(e: { target: { value: string; }; }) => setData("sort_number", parseInt(e.target.value))}
//             className="border p-2 w-full"
//           />

//           <button
//             type="submit"
//             disabled={processing}
//             className="bg-green-500 text-white px-4 py-2 rounded cursor-pointer"
//           >
//             Save Menu
//           </button>
//         </form>
//       </div>
//     );
//   }