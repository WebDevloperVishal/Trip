import React from "react";
import { motion } from "framer-motion";

const DashboardTable = ({ title, columns, data, onDelete, onVerify, onApprove }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-[#012b45] rounded-xl p-6 shadow-lg border border-cyan-800/40 text-white/90 overflow-x-auto"
    >
      <h3 className="text-xl font-semibold mb-4 text-cyan-300">{title}</h3>
      <table className="min-w-full text-sm">
        <thead>
          <tr className="bg-cyan-900/50 text-cyan-200">
            {columns.map((col) => (
              <th key={col} className="py-2 px-3 text-left">{col}</th>
            ))}
            {(onDelete || onVerify || onApprove) && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {data?.length ? (
            data.map((item, i) => (
              <tr key={i} className="border-b border-cyan-800/40 hover:bg-cyan-900/30 transition">
                {Object.values(item).slice(0, columns.length).map((val, j) => (
                  <td key={j} className="py-2 px-3">{val || "-"}</td>
                ))}
                <td className="py-2 px-3 flex gap-2">
                  {onDelete && (
                    <button onClick={() => onDelete(item._id)} className="px-3 py-1 bg-red-500 hover:bg-red-600 rounded text-white text-xs">
                      Delete
                    </button>
                  )}
                  {onVerify && (
                    <button onClick={() => onVerify(item._id)} className="px-3 py-1 bg-green-500 hover:bg-green-600 rounded text-white text-xs">
                      Verify
                    </button>
                  )}
                  {onApprove && (
                    <button onClick={() => onApprove(item._id)} className="px-3 py-1 bg-cyan-500 hover:bg-cyan-600 rounded text-white text-xs">
                      Approve
                    </button>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length + 1} className="text-center py-4 text-cyan-400">
                No records found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </motion.div>
  );
};

export default DashboardTable;
