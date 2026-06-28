// @ts-check
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, fontProviders } from "astro/config";

// https://astro.build/config
export default defineConfig({
	fonts: [
		{
			provider: fontProviders.local(),
			name: "Syne",
			cssVariable: "--font-syne",
			options: {
				variants: [
					{ src: ["./src/assets/fonts/Syne-Variable.ttf"], weight: "100 900" },
				],
			},
		},
	],
	vite: {
		plugins: [tailwindcss()],
	},
});
