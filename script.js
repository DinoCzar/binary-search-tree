function createNode(data) {
	return {
		data: data,
		left: null,
		right: null,
	};
}

function buildTree(data) {
	const sortedData = Array.from(new Set(data)).sort((a, b) => a - b);
	return constructTree(sortedData, 0, sortedData.length - 1);
}

function constructTree(data, start, end) {
	if (start > end) {
		return null;
	}

	const mid = Math.floor((start + end) / 2);
	const node = createNode(data[mid]);

	node.left = constructTree(data, start, mid - 1);
	node.right = constructTree(data, mid + 1, end);

	return node;
}

const prettyPrint = (node, prefix = '', isLeft = true) => {
	if (node === null) {
		return;
	}
	if (node.right !== null) {
		prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
	}
	console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
	if (node.left !== null) {
		prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
	}
};

const data = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const root = buildTree(data);
prettyPrint(root);
