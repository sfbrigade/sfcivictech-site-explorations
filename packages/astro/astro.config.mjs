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
				// Include all `mdi` icons in the bundle
				// mdi: ["*"],
				// Include only specific `fa` icons in the bundle
				fa: ["twitter", "facebook", "linkedin", "github", "slack", "meetup"],
			},
		}),
	],
});
