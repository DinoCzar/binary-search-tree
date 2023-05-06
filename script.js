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

function rebalance(root) {
	const nodes = [];

	// Perform in-order traversal to obtain sorted array of nodes
	inorder(root, (node) => {
		nodes.push(node.data);
	});

	// Clear existing tree structure
	root.left = null;
	root.right = null;

	// Rebuild the tree with the sorted array
	const newRoot = buildTree(nodes);

	return newRoot;
}

// Factory function to create a Tree
function createTree(data) {
	const root = buildTree(data);

	return {
		getRoot: function () {
			return root;
		},
		insert: function (value) {
			insert(root, value);
		},
	};
}

// Function to generate an array of random numbers
function generateRandomNumbers(count, min, max) {
	const numbers = [];
	for (let i = 0; i < count; i++) {
		numbers.push(Math.floor(Math.random() * (max - min + 1) + min));
	}
	return numbers;
}

// Create a binary search tree from an array of random numbers
const randomNumbers = generateRandomNumbers(10, 1, 100);
const bst = createTree(randomNumbers);
const root = bst.getRoot();

// Check if the tree is initially balanced
const initialBalanced = isBalanced(root);
console.log('Is the tree initially balanced?', initialBalanced);

// Print elements in level order
console.log('Level Order Traversal:');
levelOrder(root, (node) => {
	console.log(node.data);
});

// Print elements in pre-order
console.log('Pre-order Traversal:');
preorder(root, (node) => {
	console.log(node.data);
});

// Print elements in post-order
console.log('Post-order Traversal:');
postorder(root, (node) => {
	console.log(node.data);
});

// Print elements in in-order
console.log('In-order Traversal:');
inorder(root, (node) => {
	console.log(node.data);
});

// Unbalance the tree by adding numbers greater than 100
bst.insert(101);
bst.insert(105);
bst.insert(110);

// Check if the tree is unbalanced after adding numbers
const unbalanced = isBalanced(root);
console.log('Is the tree unbalanced?', unbalanced);

// Rebalance the tree
const balancedRoot = rebalance(root);

// Check if the tree is balanced after rebalancing
const balanced = isBalanced(balancedRoot);
console.log('Is the tree balanced after rebalancing?', balanced);

// Print elements in level order after rebalancing
console.log('Level Order Traversal after rebalancing:');
levelOrder(balancedRoot, (node) => {
	console.log(node.data);
});

// Print elements in pre-order after rebalancing
console.log('Pre-order Traversal after rebalancing:');
preorder(balancedRoot, (node) => {
	console.log(node.data);
});

// Print elements in post-order after rebalancing
console.log('Post-order Traversal after rebalancing:');
postorder(balancedRoot, (node) => {
	console.log(node.data);
});

// Print elements in in-order after rebalancing
console.log('In-order Traversal after rebalancing:');
inorder(balancedRoot, (node) => {
	console.log(node.data);
});
