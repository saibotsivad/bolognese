import { parse } from '@saibotsivad/blockdown'

export const readStreamToMemory = ({ stream, callback }) => {
	let file = ''
	stream.on('data', data => { file += data })
	stream.on('close', () => {
		const { blocks } = parse(file)
		callback(false, {
			frontmatter: blocks[0].content,
			content: blocks.slice(1),
		})
	})
	stream.on('error', error => callback(error))
}
