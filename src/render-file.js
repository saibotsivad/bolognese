
const renderThroughMdast = async ({ markdown, metadata, site }) => {
	// TODO need to be able to pass in mdast extensions and plugins
	return markdown + metadata + site
}

export const renderFile = async ({ content, metadata, site }) => {
	let html = ''
	for (const { name, content: string } of content) {
		if (name === 'markdown') html += await renderThroughMdast({ markdown: string, metadata, site })
		// TODO other names
	}
	// TODO what about a wrapper, e.g. a layout thing
	return html
}
