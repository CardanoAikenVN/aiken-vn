// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import { themes as prismThemes } from "prism-react-renderer";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
	title: "Vietnamese Aiken",
	tagline: "Cổng thông tin tài liệu hướng dẫn",
	favicon: "img/logo.jpeg",

	// Set the production url of your site here
	url: "https://uberhub-mentorias.github.io/",
	// Set the /<baseUrl>/ pathname under which your site is served
	// For GitHub pages deployment, it is often '/<projectName>/'
	baseUrl: "/docusaurus/",

	// GitHub pages deployment config.
	organizationName: "uberhub-mentorias", // Usually your GitHub org/user name.
	projectName: "docusaurus", // Usually your repo name.

	// Using 'warn' to allow incremental documentation updates
	// Some links may temporarily break as documentation evolves
	onBrokenLinks: "warn",

	// Set Vietnamese as default with English support
	i18n: {
		defaultLocale: "vi",
		locales: ["vi"],
		localeConfigs: {
			vi: {
				label: "Tiếng Việt",
				direction: "ltr",
				htmlLang: "vi",
			},
		},
	},

	presets: [
		[
			"classic",
			/** @type {import('@docusaurus/preset-classic').Options} */
			({
				docs: {
					sidebarPath: "./sidebars.js",
				},
				blog: false, // Disable blog
				theme: {
					customCss: "./src/css/custom.css",
				},
			}),
		],
	],

	plugins: [],

	themes: ["@docusaurus/theme-mermaid"],
	markdown: { mermaid: true },

	themeConfig:
		/** @type {import('@docusaurus/preset-classic').ThemeConfig} */
		({
			// Replace with your project's social card
			image: "img/logo.jpeg",
			colorMode: {
				defaultMode: "light",
				respectPrefersColorScheme: false,
				disableSwitch: false,
			},
			docs: {
				sidebar: {
					hideable: true,
				},
			},
			navbar: {
				title: "Vietnamese Aiken",
				logo: {
					alt: "Vietnamese Aiken Logo",
					src: "img/logo.jpeg",
				},
				items: [
					{
						type: "docSidebar",
						sidebarId: "docsSidebar",
						position: "left",
						label: "Tài liệu",
					},
				],
			},
			footer: {
				style: "dark",
				links: [],
				copyright: `Bản quyền © ${new Date().getFullYear()
					} Vietnamese Aiken`,
			},
			prism: {
				theme: prismThemes.github,
				darkTheme: prismThemes.dracula,
				additionalLanguages: ["java", "bash", "json", "yaml"],
			},
			tableOfContents: {
				minHeadingLevel: 2,
				maxHeadingLevel: 4,
			},
		}),
};

export default config;
