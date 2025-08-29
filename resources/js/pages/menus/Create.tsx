  import React, { useState } from "react";
  import { useForm } from "@inertiajs/react";

  interface Parent {
    id: number;
    name: string;
  }

  export default function Create({ parents }: { parents: Parent[] }) {
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
          <input
            type="text"
            placeholder="Menu Name"
            value={data.name}
            onChange={(e: { target: { value: any; }; }) => setData("name", e.target.value)}
            className="border p-2 w-full"
          />
          {errors.name && <div className="text-red-500">{errors.name}</div>}

          <input
            type="text"
            placeholder="URL"
            value={data.url}
            onChange={(e: { target: { value: any; }; }) => setData("url", e.target.value)}
            className="border p-2 w-full"
          />

          <input
            type="text"
            placeholder="Icon class (e.g., fa fa-home)"
            value={data.icon}
            onChange={(e: { target: { value: any; }; }) => setData("icon", e.target.value)}
            className="border p-2 w-full"
          />

          <select
            value={data.parent_id}
            onChange={(e: { target: { value: any; }; }) => setData("parent_id", e.target.value)}
            className="border p-2 w-full"
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
            onChange={(e: { target: { value: any; }; }) => setData("status", e.target.value)}
            className="border p-2 w-full"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

          <input
            type="number"
            placeholder="Sort Order"
            value={data.sort_number}
            onChange={(e: { target: { value: string; }; }) => setData("sort_number", parseInt(e.target.value))}
            className="border p-2 w-full"
          />

          <button
            type="submit"
            disabled={processing}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Save Menu
          </button>
        </form>
      </div>
    );
  }