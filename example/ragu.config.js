import { bolognese } from '../src/index.js'
import yaml from 'js-yaml'

export default bolognese({
	site: {
		baseUrl: 'https://my-example-site.com/',
	},
	input: './content',
	output: './public',
	files: /\.(md|txt)$/,
	// These options are passed into the js-yaml `load` function as-is. You
	// probably don't need to modify the options, but if you need to you can!
	yaml: {
		schema: yaml.JSON_SCHEMA,
	},
	normalize: ({ metadata }) => {
		// In theory your own content would be clean and tidy metadata, but
		// in practice it's pretty common to need to massage things.
		if (metadata?.author) {
			metadata.authors [ metadata.author, ...(metadata.authors || []) ].filter(Boolean)
		}
		// If all you need to do is this, that's already cooked in to
		// Bolognese, so you could drop this whole "normalize" function.
		if (typeof metadata?.published === 'string') metadata.published = new Date(metadata.published)
		return metadata
	},
})
