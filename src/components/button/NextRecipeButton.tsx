"use client"

import { useRouter } from "next/navigation"

export default function NextRecipeButton() {
	const router = useRouter()

	return (
		<button
			className="mt-6 w-full bg-black text-white font-semibold rounded h-12"
			onClick={() => {
				router.refresh()
				window.scrollTo(0, 0)
			}}
		>
			Next Recipe
		</button>
	)
}
