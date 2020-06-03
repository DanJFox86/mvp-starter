/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./react-client/src/index.jsx");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./react-client/src/index.jsx":
/*!************************************!*\
  !*** ./react-client/src/index.jsx ***!
  \************************************/
/*! no exports provided */
/***/ (function(module, exports) {

eval("throw new Error(\"Module build failed (from ./node_modules/babel-loader/lib/index.js):\\nSyntaxError: /Users/user01/Desktop/git_tutorial/work/mvp-starter/react-client/src/index.jsx: Unexpected token (106:10)\\n\\n\\u001b[0m \\u001b[90m 104 | \\u001b[39m        }\\u001b[33m,\\u001b[39m\\u001b[0m\\n\\u001b[0m \\u001b[90m 105 | \\u001b[39m        content\\u001b[33m:\\u001b[39m (\\u001b[0m\\n\\u001b[0m\\u001b[31m\\u001b[1m>\\u001b[22m\\u001b[39m\\u001b[90m 106 | \\u001b[39m          \\u001b[33m<\\u001b[39m\\u001b[33mAddIngModal\\u001b[39m onAddIngNameChange\\u001b[33m=\\u001b[39m{\\u001b[36mthis\\u001b[39m\\u001b[33m.\\u001b[39monAddIngNameChange\\u001b[33m.\\u001b[39mbind(\\u001b[36mthis\\u001b[39m)}\\u001b[0m\\n\\u001b[0m \\u001b[90m     | \\u001b[39m          \\u001b[31m\\u001b[1m^\\u001b[22m\\u001b[39m\\u001b[0m\\n\\u001b[0m \\u001b[90m 107 | \\u001b[39m                              ingredients\\u001b[33m=\\u001b[39m{\\u001b[36mthis\\u001b[39m\\u001b[33m.\\u001b[39mstate\\u001b[33m.\\u001b[39mingredients}\\u001b[0m\\n\\u001b[0m \\u001b[90m 108 | \\u001b[39m                                    modal\\u001b[33m=\\u001b[39m{\\u001b[36mthis\\u001b[39m\\u001b[33m.\\u001b[39mstate\\u001b[33m.\\u001b[39mmodal\\u001b[33m.\\u001b[39maddIngredient}\\u001b[33m/\\u001b[39m\\u001b[33m>\\u001b[39m\\u001b[0m\\n\\u001b[0m \\u001b[90m 109 | \\u001b[39m        )\\u001b[0m\\n    at Parser._raise (/Users/user01/Desktop/git_tutorial/work/mvp-starter/node_modules/@babel/parser/lib/index.js:745:17)\\n    at Parser.raiseWithData (/Users/user01/Desktop/git_tutorial/work/mvp-starter/node_modules/@babel/parser/lib/index.js:738:17)\\n    at Parser.raise (/Users/user01/Desktop/git_tutorial/work/mvp-starter/node_modules/@babel/parser/lib/index.js:732:17)\\n    at Parser.unexpected (/Users/user01/Desktop/git_tutorial/work/mvp-starter/node_modules/@babel/parser/lib/index.js:8806:16)\\n    at Parser.parseExprAtom (/Users/user01/Desktop/git_tutorial/work/mvp-starter/node_modules/@babel/parser/lib/index.js:10129:20)\\n    at Parser.parseExprSubscripts (/Users/user01/Desktop/git_tutorial/work/mvp-starter/node_modules/@babel/parser/lib/index.js:9655:23)\\n    at Parser.parseMaybeUnary (/Users/user01/Desktop/git_tutorial/work/mvp-starter/node_modules/@babel/parser/lib/index.js:9635:21)\\n    at Parser.parseExprOps (/Users/user01/Desktop/git_tutorial/work/mvp-starter/node_modules/@babel/parser/lib/index.js:9505:23)\\n    at Parser.parseMaybeConditional (/Users/user01/Desktop/git_tutorial/work/mvp-starter/node_modules/@babel/parser/lib/index.js:9478:23)\\n    at Parser.parseMaybeAssign (/Users/user01/Desktop/git_tutorial/work/mvp-starter/node_modules/@babel/parser/lib/index.js:9433:21)\\n    at Parser.parseParenAndDistinguishExpression (/Users/user01/Desktop/git_tutorial/work/mvp-starter/node_modules/@babel/parser/lib/index.js:10266:28)\\n    at Parser.parseExprAtom (/Users/user01/Desktop/git_tutorial/work/mvp-starter/node_modules/@babel/parser/lib/index.js:10006:21)\\n    at Parser.parseExprSubscripts (/Users/user01/Desktop/git_tutorial/work/mvp-starter/node_modules/@babel/parser/lib/index.js:9655:23)\\n    at Parser.parseMaybeUnary (/Users/user01/Desktop/git_tutorial/work/mvp-starter/node_modules/@babel/parser/lib/index.js:9635:21)\\n    at Parser.parseExprOps (/Users/user01/Desktop/git_tutorial/work/mvp-starter/node_modules/@babel/parser/lib/index.js:9505:23)\\n    at Parser.parseMaybeConditional (/Users/user01/Desktop/git_tutorial/work/mvp-starter/node_modules/@babel/parser/lib/index.js:9478:23)\\n    at Parser.parseMaybeAssign (/Users/user01/Desktop/git_tutorial/work/mvp-starter/node_modules/@babel/parser/lib/index.js:9433:21)\\n    at Parser.parseObjectProperty (/Users/user01/Desktop/git_tutorial/work/mvp-starter/node_modules/@babel/parser/lib/index.js:10585:101)\\n    at Parser.parseObjPropValue (/Users/user01/Desktop/git_tutorial/work/mvp-starter/node_modules/@babel/parser/lib/index.js:10610:101)\\n    at Parser.parseObjectMember (/Users/user01/Desktop/git_tutorial/work/mvp-starter/node_modules/@babel/parser/lib/index.js:10534:10)\\n    at Parser.parseObj (/Users/user01/Desktop/git_tutorial/work/mvp-starter/node_modules/@babel/parser/lib/index.js:10447:25)\\n    at Parser.parseExprAtom (/Users/user01/Desktop/git_tutorial/work/mvp-starter/node_modules/@babel/parser/lib/index.js:10054:28)\\n    at Parser.parseExprSubscripts (/Users/user01/Desktop/git_tutorial/work/mvp-starter/node_modules/@babel/parser/lib/index.js:9655:23)\\n    at Parser.parseMaybeUnary (/Users/user01/Desktop/git_tutorial/work/mvp-starter/node_modules/@babel/parser/lib/index.js:9635:21)\\n    at Parser.parseExprOps (/Users/user01/Desktop/git_tutorial/work/mvp-starter/node_modules/@babel/parser/lib/index.js:9505:23)\\n    at Parser.parseMaybeConditional (/Users/user01/Desktop/git_tutorial/work/mvp-starter/node_modules/@babel/parser/lib/index.js:9478:23)\\n    at Parser.parseMaybeAssign (/Users/user01/Desktop/git_tutorial/work/mvp-starter/node_modules/@babel/parser/lib/index.js:9433:21)\\n    at Parser.parseExprListItem (/Users/user01/Desktop/git_tutorial/work/mvp-starter/node_modules/@babel/parser/lib/index.js:10791:18)\\n    at Parser.parseCallExpressionArguments (/Users/user01/Desktop/git_tutorial/work/mvp-starter/node_modules/@babel/parser/lib/index.js:9849:22)\\n    at Parser.parseSubscript (/Users/user01/Desktop/git_tutorial/work/mvp-starter/node_modules/@babel/parser/lib/index.js:9749:31)\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9yZWFjdC1jbGllbnQvc3JjL2luZGV4LmpzeC5qcyIsInNvdXJjZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./react-client/src/index.jsx\n");

/***/ })

/******/ });