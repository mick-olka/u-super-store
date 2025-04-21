import { TrashBinIcon } from "@/app/[lang]/assets/icons/trash-bin";
import { useDictionary } from "@/shared/hooks";
import { I_OrderItem } from "@/shared/models";
import { useEffect, useState } from "react";

interface Props {
  onItemRemove?: (productId: string) => void;
  items: I_OrderItem[];
  total: number;
}

export const CartList = ({ items, onItemRemove, total }: Props) => {
  const dictionary = useDictionary();
  return (
    <div className="mx-auto w-full max-w-2xl border border-gray-200 bg-white shadow-lg">
      <div className="overflow-x-auto p-3">
        <table className="w-full table-auto">
          <thead className="bg-gray-50 text-xs font-semibold uppercase text-gray-400">
            <tr>
              <th></th>
              <th className="p-2">
                <div className="text-left font-semibold">{dictionary.cart.product_name}</div>
              </th>
              <th className="p-2">
                <div className="text-left font-semibold">{dictionary.cart.quantity}</div>
              </th>
              <th className="p-2">
                <div className="text-left font-semibold">{dictionary.cart.price}</div>
              </th>
              {onItemRemove ? (
                <th className="p-2">
                  <div className="text-center font-semibold"></div>
                </th>
              ) : null}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm">
            {items.map((item, i) => (
              <tr key={"item" + i}>
                <td className="p-2"></td>
                <td className="p-2">
                  <div className="font-medium text-gray-800">{item.name}</div>
                </td>
                <td className="p-2">
                  <div className="text-left">{item.count}</div>
                </td>
                <td className="p-2">
                  <div className="text-left font-medium text-green-500">UAH {item.price * 40}</div>
                </td>
                {onItemRemove ? (
                  <td className="p-2">
                    <div className="flex justify-center">
                      <button onClick={() => onItemRemove(item.product)}>
                        <TrashBinIcon />
                      </button>
                    </div>
                  </td>
                ) : null}
              </tr>
            ))}
          </tbody>
        </table>
        {items.length ? null : <div className="w-full text-center">Пусто</div>}
      </div>

      <div className="flex justify-end space-x-4 border-t border-gray-100 px-5 py-4 text-2xl font-bold">
        <div>{dictionary.cart.sum}:</div>
        <div className="text-blue-600">
          UAH <span>{total}</span>
        </div>
      </div>

      <div className="flex justify-end">
        <input type="hidden" className="border border-black bg-gray-50" x-model="selected" />
      </div>
    </div>
  );
};
