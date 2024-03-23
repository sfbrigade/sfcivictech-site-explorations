import path from "path";
import { buildConfig } from "payload/config";
import { slateEditor } from "@payloadcms/richtext-slate";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { webpackBundler } from "@payloadcms/bundler-webpack";
import Posts from "@/collections/Posts";
import Users from "@/collections/Users";
import Media from "@/collections/Media";

export default buildConfig({
	db: mongooseAdapter({
		url: process.env.MONGODB_URI,
	}),
	editor: slateEditor({}),
	serverURL: process.env.PAYLOAD_URL,
	admin: {
		bundler: webpackBundler(),
		user: Users.slug,
		webpack: (config) => ({
			...config,
			resolve: {
				...config.resolve,
				alias: {
					...config.resolve.alias,
					"@": path.resolve(__dirname, "./"),
				},
			},
		}),
	},
	collections: [Posts, Users, Media],
	typescript: {
		outputFile: path.resolve("/", "types.ts"),
	},
});
