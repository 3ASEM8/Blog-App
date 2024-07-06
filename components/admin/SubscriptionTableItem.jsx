import React from "react";

const SubscriptionTableItem = ({ email, date, mongoId, deleteEmail }) => {
  return (
    <tr className="bg-white border-b text-left">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
      >
        {email ? email : "No Email"}
      </th>
      <td className="hidden sm:block px-6 py-4">
        {new Date(date).toLocaleDateString()}
      </td>
      <td
        onClick={() => deleteEmail(mongoId)}
        className="px-6 py-4 cursor-pointer"
      >
        ❌
      </td>
    </tr>
  );
};

export default SubscriptionTableItem;
