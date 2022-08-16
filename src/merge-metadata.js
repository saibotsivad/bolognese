import dlv from 'dlv' // TODO or is it {dlv} ?

export const mergeMetadata = (sitewideProperties, collections) => ({ filepathToMetadata }) => {
	const merged = {
		...sitewideProperties,
	}
	for (const { name, keypath, unique } of collections) {
		merged[name] = merged[name] || {}
		for (const filepath in filepathToMetadata) {
			let values = dlv(filepathToMetadata[filepath], keypath)
			if (!Array.isArray(values)) values = [ values ]
			for (const val of values) {
				const key = unique ? dlv(val, unique) : val
				if (key !== undefined && val !== undefined) {
					merged[name][key] = merged[name][key] || new Set()
					merged[name][key].add(filepath)
				}
			}
		}
	}
	/*
	= {
		authors: {
			'Johnjacob Jingleheimerschmidt': Set([
				'path/to/file1.md',
				'path/to/file2.md'
			]),
		},
		tags: {
			'Johnjacob Jingleheimerschmidt': Set([
				'path/to/file1.md',
				'path/to/file2.md'
			]),
		},
	}
	*/
	return merged
}
