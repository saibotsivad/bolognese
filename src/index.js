import { readStreamToMemory } from './read-stream-to-memory.js'
import { parseAsYaml } from './parse-as-yaml.js'
import { metadataNormalizer } from './metadata-normalizer.js'
import { mergeMetadata } from './merge-metadata.js'
import { renderFile } from './render-file.js'
import { canonicalFilepath } from './canonical-filepath.js'

const defaultFilterRegex = /\.md$/

const defaultCollections = [
	{ name: 'authors', keypath: 'author' },
]

const isNotRenderable = metadata => 
	// all content must be published
	!metadata?.published
	// if the "published" property is a date, it needs to be "in the future"
	|| (metadata.published.getTime && metadata.published.getTime() > Date.now())

export default (opts = {}) => {
	return {
		input: opts.input,
		output: opts.output,
		filter: filepath => (opts.files || defaultFilterRegex).test(filepath),
		read: opts.ragu?.read || readStreamToMemory,
		parse: opts.ragu?.parse || parseAsYaml(opts.normalize || metadataNormalizer, opts.yaml),
		merge: mergeMetadata(opts.site || {}, opts.collections || defaultCollections),
		render: ({ filepath, content, metadata, site }, callback) => {
			if (isNotRenderable(metadata)) return callback()
			renderFile({ content, metadata, site })
				.then(
					html => {
						callback(false, {
							string: html,
							filepath: canonicalFilepath({ metadata, filepath }),
						})
					},
					error => callback(error),
				)
		},
	}
}
