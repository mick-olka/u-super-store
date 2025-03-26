import { Dropdown } from "@/app/[lang]/components/ui/dropdown/dropdown";
import { HTMLAttributes } from "react";

import { classnames } from "@/shared/utils";

type Props<T extends string | number> = {
  list: readonly { name: string; value: T }[];
  value: T | null;
  onItemSelect: (value: T | null) => void;
  defaultPlaceholder?: string;
  hideArrow?: boolean;
} & HTMLAttributes<HTMLDivElement>;

export const Selector = <T extends string | number>({
  list,
  value,
  defaultPlaceholder,
  onItemSelect,
  className,
  hideArrow,
  ...props
}: Props<T>) => {
  const onItemClick = (id: T) => {
    // if (value === id) {
    //   onChange(null);
    // } else onChange(id);
    onItemSelect(id);
  };
  const placeholder = defaultPlaceholder || "---";
  const current = list.find(l => l.value === value);
  const itemsList = list.map(l => {
    const isActive = current && current.value === l.value;
    return (
      <div
        key={l.value}
        className="text-gray-700 block px-4 py-2 text-sm"
        style={isActive ? { backgroundColor: "#eee" } : {}}
        role="menuitem"
        tabIndex={-1}
        id={"menu-item-" + l.value}
        onClick={() => onItemClick(l.value)}
      >
        {l.name}
      </div>
    );
  });
  return (
    <Dropdown hideArrow={hideArrow} itemsList={itemsList} {...props} className={classnames(className)}>
      {current ? current.name : placeholder}
    </Dropdown>
  );
};
