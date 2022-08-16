import { sep } from 'node:path'

export const canonicalFilepath = ({ metadata, filepath }) => {
	const out = metadata?.canonical || filepath

	return out.endsWith('index.md')
		? 'index.html'
		: filepath.replace(/\.md$/, sep + 'index.html')
}
