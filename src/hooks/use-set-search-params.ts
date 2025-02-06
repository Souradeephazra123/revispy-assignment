import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { startTransition, useCallback } from "react";

export function useSetSearchParams() {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const setSearchParam = useCallback(
		(
			obj: Record<string, string | number | boolean | null | undefined>,
			replace?: boolean,
		) => {
			const params = new URLSearchParams(searchParams);
			const entries = Object.entries(obj);

			for (const [key, value] of entries) {
				if (!value) {
					params.delete(key);
				} else {
					params.set(key, value.toString());
				}
			}

			startTransition(() => {
				if (replace) {
					router.replace(`${pathname}?${params.toString()}`);
				} else {
					router.push(`${pathname}?${params.toString()}`);
				}
			});
		},
		[pathname, router, searchParams],
	);

	return {
		searchParams,
		setSearchParam,
		router,
	};
}
