export const metadataNormalizer = ({ metadata }) => {
	if (typeof metadata?.published === 'string') metadata.published = new Date(metadata.published)
	return metadata
}
