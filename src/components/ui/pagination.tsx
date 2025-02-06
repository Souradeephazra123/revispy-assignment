"use client";

import { useCallback } from "react";
import { twMerge } from "tailwind-merge";

import { useFullURL } from "./use-full-url";

import { ChevronIcon } from "../icons/chevron";
import type { RACLinkProps } from "./link";
import { RACLink } from "./link";
import type { LinkProps } from "react-aria-components";
import { Link } from "react-aria-components";

export type RACProps<CompProps> = Omit<CompProps, "className"> & {
	className?: string;
};

// export interface RACLinkProps extends RACProps<LinkProps> {
// 	prefetch?: boolean;
// }

interface PaginationProps {
	page: number;
	total: number;
	classname?: string;
	prefetch?: boolean;
}

export function Pagination({
	page,
	total,
	classname,
	prefetch = true,
}: PaginationProps) {
	const { pathname, searchParams } = useFullURL();

	const getHref = useCallback(
		(page: number) => {
			const newSearchParams = new URLSearchParams(searchParams);
			newSearchParams.set("page", page.toString());

			return `${pathname}?${newSearchParams.toString()}`;
		},
		[pathname, searchParams],
	);

	return (
		<div className={twMerge("flex flex-wrap items-center gap-2", classname)}>
			<PaginationItem
				prefetch={prefetch}
				className="border-0"
				label="Previous page"
				isDisabled={page === 1}
				href={getHref(page - 1)}
			>
				<ChevronIcon className="text-grey" />
			</PaginationItem>

			{page > 3 && (
				<PaginationItem prefetch={prefetch} label="Page 1" href={getHref(1)}>
					1
				</PaginationItem>
			)}
			{page > 4 && <Ellipsis />}
			{page > 2 && (
				<PaginationItem
					prefetch={prefetch}
					label={`Page ${page - 2}`}
					href={getHref(page - 2)}
				>
					{page - 2}
				</PaginationItem>
			)}
			{page > 1 && (
				<PaginationItem
					prefetch={prefetch}
					label={`Page ${page - 1}`}
					href={getHref(page - 1)}
				>
					{page - 1}
				</PaginationItem>
			)}
			<PaginationItem
				prefetch={prefetch}
				isActive
				href={getHref(page)}
				label={`Page ${page}`}
			>
				{page}
			</PaginationItem>
			{page < total && (
				<PaginationItem
					prefetch={prefetch}
					label={`Page ${page + 1}`}
					href={getHref(page + 1)}
				>
					{page + 1}
				</PaginationItem>
			)}
			{page < total - 1 && (
				<PaginationItem
					prefetch={prefetch}
					label={`Page ${page + 2}`}
					href={getHref(page + 2)}
				>
					{page + 2}
				</PaginationItem>
			)}
			{page < total - 3 && <Ellipsis />}
			{page < total - 2 && (
				<PaginationItem
					prefetch={prefetch}
					label={`Page ${total}`}
					href={getHref(total)}
				>
					{total}
				</PaginationItem>
			)}
			<PaginationItem
				prefetch={prefetch}
				label="Next page"
				className="border-0"
				href={getHref(page + 1)}
				isDisabled={page === total}
			>
				<ChevronIcon className="rotate-180 text-grey" />
			</PaginationItem>
		</div>
	);
}

type PaginationItemProps = {
	label: string;
	isActive?: boolean;
	className?: string;
} & Omit<RACLinkProps, "aria-label">;

export function PaginationItem({
	label,
	isActive,
	className,
	...props
}: PaginationItemProps) {
	return (
		<RACLink
			{...props}
			aria-label={label}
			className={`${PAGINATION_ITEM_CLASS} ${isActive ? "border-transparent bg-[#867E7EB2] text-white" : ""} ${className}`}
		/>
	);
}

function Ellipsis() {
	return <div className={PAGINATION_ITEM_CLASS}>...</div>;
}

const PAGINATION_ITEM_CLASS =
	"inline-flex aspect-[1.25] md:aspect-[1.5] h-9 text-sm select-none items-center justify-center rounded-6 border font-semibold ring-accent transition";
