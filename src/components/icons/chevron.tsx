export function ChevronIcon({ className = "" }) {
	return (
		<svg
			width="20"
			height="20"
			viewBox="0 0 24 24"
			className={className}
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				fill="currentColor"
				d="M16 22L6 12L16 2l1.775 1.775L9.55 12l8.225 8.225L16 22Z"
			/>
		</svg>
	);
}

export function DoubleChevronIcon({ className = "" }) {
	return (
		<svg
			width="24"
			height="24"
			viewBox="0 0 24 24"
			className={className}
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				fill="currentColor"
				d="m11 18l-6-6l6-6l1.4 1.4L7.825 12l4.575 4.6zm6.6 0l-6-6l6-6L19 7.4L14.425 12L19 16.6z"
			/>
		</svg>
	);
}
