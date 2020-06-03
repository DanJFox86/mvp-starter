var Trie = function() {
  this.storage = {};
};

Trie.prototype.insert = function(word) {
  if (word === '') return;
  let node = this.storage;
  for (let char of word) {
    let lc = char.toLowerCase();
    if (!node[lc]) node[lc] = {};
    node = node[lc];
  }
  node['end'] = true;
};

Trie.prototype.search = function(word) {
  if (word === '') return true;
  let node = this.storage;
  for (let char of word) {
    let lc = char.toLowerCase();
    if (!node[lc]) {
      return false;
    }
    node = node[lc];
  }
  return node['end'] ? true : false;
};

Trie.prototype.startsWith = function(prefix) {
  if (prefix === '') return true;
  let node = this.storage;
  for (let char of prefix) {
    let lc = char.toLowerCase();
    if (!node[lc]) {
      return false;
    }
    node = node[lc];
  }
  return true;
};

Trie.prototype.allStartsWith = function(prefix) {
  if (prefix === '') return [];
  let node = this.storage;
  let result = [];
  let helper = (node, str) => {
    if (node['end']) {
      result.push(prefix + str);
    }
    for (let key in node) {
      helper(node[key], str + key)
    }
  }

  if (this.startsWith(prefix)) {
    let myPrefix = prefix.slice();
    for (let char of prefix) {
      node = node[char.toLowerCase()];
    }
    helper(node, '');
  }
  return result;
};

export default Trie;