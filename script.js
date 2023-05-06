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

function insert(root, value) {
	if (root === null) {
		return createNode(value);
	}

	if (value < root.data) {
		root.left = insert(root.left, value);
	} else if (value > root.data) {
		root.right = insert(root.right, value);
	}

	return root;
}

function deleteNode(root, value) {
	if (root === null) {
		return null;
	}

	if (value < root.data) {
		root.left = deleteNode(root.left, value);
	} else if (value > root.data) {
		root.right = deleteNode(root.right, value);
	} else {
		if (root.left === null && root.right === null) {
			return null;
		} else if (root.left === null) {
			return root.right;
		} else if (root.right === null) {
			return root.left;
		}

		const minValue = findMinValue(root.right);
		root.data = minValue;
		root.right = deleteNode(root.right, minValue);
	}

	return root;
}

function findMinValue(node) {
	let current = node;
	while (current.left !== null) {
		current = current.left;
	}
	return current.data;
}

function find(root, value) {
	if (root === null || root.data === value) {
		return root;
	}

	if (value < root.data) {
		return find(root.left, value);
	} else {
		return find(root.right, value);
	}
}

const root = createNode(5);
insert(root, 3);
insert(root, 8);
insert(root, 2);
insert(root, 4);
insert(root, 7);

const node = find(root, 4);
console.log(node); // Output: { data: 4, left: null, right: null }
