import { usePathname, useSearchParams } from "next/navigation";

export function useFullURL() {
	const pathname = usePathname();
	const searchParams = useSearchParams();

	return { pathname, searchParams };
}
