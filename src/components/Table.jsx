import React from "react";

const Table = ({ data, handleEdit, handleDelete }) => {
  return (
    <div className="p-6">
      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">No</th>
            <th className="px-4 py-2">Location</th>
            <th className="px-4 py-2">Severity</th>
            <th className="px-4 py-2">Description</th>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item._id}>
              <td className="border px-4 py-2">{index + 1}</td>
              <td className="border px-4 py-2">{item.location}</td>
              <td className="border px-4 py-2">{item.severity}</td>
              <td className="border px-4 py-2">{item.description}</td>
              <td className="border px-4 py-2">
                {new Date(item.date).toLocaleDateString()}
              </td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
