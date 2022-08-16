export const metadataNormalizer = ({ metadata }) => {
	// TODO some opinions about certain strings.
	if (typeof metadata?.published === 'string') metadata.published = new Date(metadata.published)
	return metadata
}
