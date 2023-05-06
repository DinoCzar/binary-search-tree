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

function levelOrder(root, callback = null) {
	if (root === null) {
		return [];
	}

	const queue = [];
	const result = [];

	queue.push(root);

	while (queue.length > 0) {
		const node = queue.shift();
		result.push(node.data);

		if (callback) {
			callback(node);
		}

		if (node.left !== null) {
			queue.push(node.left);
		}

		if (node.right !== null) {
			queue.push(node.right);
		}
	}

	return result;
}

function inorder(root, callback = null) {
	if (root === null) {
		return [];
	}

	const result = [];

	function traverse(node) {
		if (node.left !== null) {
			traverse(node.left);
		}

		result.push(node.data);

		if (callback) {
			callback(node);
		}

		if (node.right !== null) {
			traverse(node.right);
		}
	}

	traverse(root);

	return result;
}

function preorder(root, callback = null) {
	if (root === null) {
		return [];
	}

	const result = [];

	function traverse(node) {
		result.push(node.data);

		if (callback) {
			callback(node);
		}

		if (node.left !== null) {
			traverse(node.left);
		}

		if (node.right !== null) {
			traverse(node.right);
		}
	}

	traverse(root);

	return result;
}

function postorder(root, callback = null) {
	if (root === null) {
		return [];
	}

	const result = [];

	function traverse(node) {
		if (node.left !== null) {
			traverse(node.left);
		}

		if (node.right !== null) {
			traverse(node.right);
		}

		result.push(node.data);

		if (callback) {
			callback(node);
		}
	}

	traverse(root);

	return result;
}

function height(node) {
	if (node === null) {
		return -1;
	}

	const leftHeight = height(node.left);
	const rightHeight = height(node.right);

	return Math.max(leftHeight, rightHeight) + 1;
}

function depth(root, node) {
	if (root === null) {
		return -1;
	}

	if (root === node) {
		return 0;
	}

	const leftDepth = depth(root.left, node);
	const rightDepth = depth(root.right, node);

	if (leftDepth === -1 && rightDepth === -1) {
		return -1; // Node not found in the subtree
	}

	return Math.max(leftDepth, rightDepth) + 1;
}

function isBalanced(root) {
	if (root === null) {
		return true;
	}

	const leftHeight = height(root.left);
	const rightHeight = height(root.right);

	if (Math.abs(leftHeight - rightHeight) > 1) {
		return false;
	}

	return isBalanced(root.left) && isBalanced(root.right);
}

const root = createNode(1);
root.left = createNode(2);
root.right = createNode(3);
root.left.left = createNode(4);
root.left.right = createNode(5);
root.right.left = createNode(6);
root.right.right = createNode(7);

const balanced = isBalanced(root);
console.log(balanced); // Output: true
