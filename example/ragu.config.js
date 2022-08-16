import { bolognese } from '../src/index.js'

export default bolognese({
	site: {
		baseUrl: 'https://my-example-site.com/',
	},
	input: './content',
	output: './public',
	files: /\.(md|txt)$/,
	// normalize: ({ metadata }) => { return metadata },
})
