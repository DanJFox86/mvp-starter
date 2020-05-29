var Trie = function() {
  this.storage = {};
};

Trie.prototype.insert = function(word) {
  if (word === '') return;
  let node = this.storage;
  while (word.length) {
      if (!node[word[0]]) node[word[0]] = {};
      node = node[word[0]];
      word = word.slice(1);
  }
  node['end'] = true;
};

Trie.prototype.search = function(word) {
  if (word === '') return true;
  let node = this.storage;
  while (word.length) {
      if (!node[word[0]]) {
          return false;
      }
      node = node[word[0]];
      word = word.slice(1);
  }
  return node['end'] ? true : false;
};

Trie.prototype.startsWith = function(prefix) {
  if (prefix === '') return true;
  let node = this.storage;
  while (prefix.length) {
      if (!node[prefix[0]]) {
          return false;
      }
      node = node[prefix[0]];
      prefix = prefix.slice(1);
  }
  return true;
};

Trie.prototype.allStartsWith = function(prefix) {
  if (prefix === '') return [];
  let node = this.storage;
  let result = [];

  let helper = (node, str) => {
    if (node['end']) {
      result.push(str));
    }
    for (let key in node) {
      helper(node[key], str + key)
    }
  }

  if (this.startsWith(prefix)) {
    let myPrefix = prefix;
    while (myPrefix.length > 0) {
      node = node[myPrefix[0]];
      myPrefix = myPrefix.slice(1);
    }
    helper(node, '');
  }
  return result;
};

export default Trie;