import Image from "next/image";
import { classNames } from "@/app/utils";
import { PiCaretDown } from "react-icons/pi";
import { Dropdown, type DropdownItem } from "./Dropdown";

interface FormDropdownProps {
	defaultTitle: string;
	defaultSelectedItem: string;
	onSelect?: (name: string) => void;
	data: DropdownItem[];
	className?: string;
}

export const FormDropdown = ({
	defaultTitle,
	defaultSelectedItem,
	onSelect,
	data,
	className,
}: FormDropdownProps) => {
	return (
		<Dropdown
			data={data}
			defaultSelectedItem={defaultSelectedItem}
			onSelect={onSelect}
			className={className}
		>
			{({ selectedItem, isOpen, toggleDropdown }) => (
				<button
					id="dropdown"
					aria-label="Toggle dropdown"
					type="button"
					onClick={toggleDropdown}
					className="flex items-center gap-2 rounded-full bg-gray-50 p-2.5 shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-white active:scale-95"
				>
					{selectedItem?.name ? (
						<div className="flex items-center gap-1.5">
							<Image
								alt={selectedItem?.name}
								src={selectedItem?.imageUrl ?? ""}
								width={20}
								height={20}
								className="size-5 object-contain"
							/>
							<p className="">{selectedItem?.name}</p>
						</div>
					) : (
						<p className="whitespace-nowrap">
							{defaultTitle ? defaultTitle : "Select an option"}
						</p>
					)}

					<PiCaretDown
						className={classNames(
							"text-lg text-gray-400 transition-transform",
							isOpen ? "rotate-180" : "",
							selectedItem?.name ? "ml-5" : "",
						)}
					/>
				</button>
			)}
		</Dropdown>
	);
};
