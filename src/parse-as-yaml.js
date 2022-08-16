import yaml from 'js-yaml'

export const parseAsYaml = normalizeMetadata => ({ frontmatter, filepath }) => {
	if (!frontmatter) return { ignore: true }
	try {
		const metadata = yaml.load(frontmatter)
		return { metadata: normalizeMetadata({ metadata }) }
	} catch (error) {
		console.error('Could not load frontmatter YAML for:', filepath)
		if (process.env.DEBUG) console.debug(error)
		return { ignore: true }
	}
}
