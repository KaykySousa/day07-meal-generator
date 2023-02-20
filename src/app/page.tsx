import NextRecipeButton from "@/components/button/NextRecipeButton"
import axios from "axios"
import {} from "next/navigation"

export const revalidate = 0

export default async function Home() {
	const { data } = await axios.get(
		"https://www.themealdb.com/api/json/v1/1/random.php"
	)

	const meal = data.meals[0]

	const ingredients = []

	for (let index = 1; index <= 20; index++) {
		const ingredient = meal[`strIngredient${index}`]
		const measure = meal[`strMeasure${index}`]

		if (!ingredient || !measure) continue

		ingredients.push({
			name: ingredient,
			measure,
		})
	}

	return (
		<div className="min-h-screen w-full flex flex-col md:flex-row">
			<div
				className="w-full aspect-square max-h-[30rem] bg-no-repeat [background-position-x:center] bg-contain bg-fixed md:w-3/5 md:bg-cover md:bg-center md:max-h-none md:aspect-auto"
				style={{ backgroundImage: `url('${meal.strMealThumb}')` }}
			></div>
			<div className="p-6 w-full flex flex-col bg-white -my-2 rounded-t-lg md:my-0 md:w-2/5">
				<h1 className="font-serif text-3xl mb-1">{meal.strMeal}</h1>
				<p className="uppercase text-gray-500 mb-6">
					{meal.strCategory} | {meal.strArea}
				</p>

				<h2 className="font-serif text-2xl mb-2">Ingredients</h2>
				<ul className="mb-6">
					{ingredients.map(({ name, measure }, index) => (
						<li key={index}>
							{name} - {measure}
						</li>
					))}
				</ul>

				<h2 className="font-serif text-2xl mb-2">Instructions</h2>
				<p className="text-justify">{meal.strInstructions}</p>

				<NextRecipeButton />
			</div>
		</div>
	)
}
