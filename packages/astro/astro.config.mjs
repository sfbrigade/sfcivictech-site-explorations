import { defineConfig } from "astro/config";
import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
	//	site: "https://www.sfcivictech.org/"
	//	base: "/",
	//	site: "https://sfbrigade.github.io",
	base: "/sfcivictech-site-explorations/",
	compressHTML: false,
	integrations: [
		icon({
			include: {
				// Include only three `mdi` icons in the bundle
				// mdi: ['account', 'account-plus', 'account-minus'],
				// Include all `mdi` icons in the bundle
				mdi: ["*"],
				// Include all `fa` icons
				fa: ["*"],
			},
		}),
	],
});
