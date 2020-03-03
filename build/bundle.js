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
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : undefined;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && btoa) {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join('');
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === 'string') {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || ''; // eslint-disable-next-line prefer-destructuring

  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || '').concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
  return "/*# ".concat(data, " */");
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(0);
            var content = __webpack_require__(3);

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);

var exported = content.locals ? content.locals : {};



module.exports = exported;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(1);
exports = ___CSS_LOADER_API_IMPORT___(false);
exports.push([module.i, "@import url(https://fonts.googleapis.com/css?family=Oswald:400,700&display=swap);"]);
// Module
exports.push([module.i, "body{font-family:'Oswald'}*{margin:0;padding:0;overflow:hidden;scrollbar-width:none}::-webkit-scrollbar{width:0px;height:0px;background:transparent}body{background-color:#2E1B40}.grid_Wrapper{display:grid;grid-template-columns:6fr 1.2fr 12fr 12fr 12fr;grid-template-rows:7vh 23vh 40vh 23vh 7vh;grid-gap:0px}.grid_Wrapper .grid_aside{grid-column:1/2;grid-row:1/6;background-color:#2E1B40;position:relative;height:100vh;width:100%;overflow:scroll}.grid_Wrapper .grid_div{grid-column:2/2;grid-row:1/6;background-color:#C8942F}.grid_Wrapper .grid_main{grid-column:3/6;grid-row:2/5;background-color:#4B2832}.grid_Wrapper .grid_header{grid-column:3/6;grid-row:1/2;background-color:#1A0929}.grid_Wrapper .grid_footer{grid-column:3/6;grid-row:5/6;background-color:#1A0929}.imgContainer{position:relative;height:24%;width:80%;margin:auto;margin-top:2%}.imgContainer .imgUserBack{position:absolute;height:150px;width:150px;animation:colorfull 5s 0s normal infinite;border-radius:60%;filter:hue-rotate(5deg);background-color:#C8942F}.imgContainer .imgUserFront{position:absolute;height:140px;width:140px;border-radius:60%;background-color:#1A0929;left:3%;top:2.5%}.nameUser{position:relative;height:7%;width:100%;color:white;font-size:2em;text-align:center;margin-bottom:3%}.followContainer{position:relative;height:13%;width:95%;background-color:#C85D2F;margin:auto}.followContainer .followUser{position:initial;height:100%;width:50%;float:left;text-align:center;color:white;font-size:0.9em}.followContainer .followUser p{font-size:2.2em}.followContainer .followingUser{position:initial;height:100%;width:50%;float:right;text-align:center;color:white;font-size:0.9em}.followContainer .followingUser p{font-size:2.2em}.barFriends{position:relative;height:4%;width:100%;background-color:#AA7818;margin-top:2%}.barFriends p{color:#fff;margin-left:10%}.sideColum{position:absolute;height:100%;width:10%;float:left;background-color:#1A0929}.friendsContainer{position:relative;height:100%;width:100%}.friendsContainer .friends{position:relative;height:10%;width:100%}.friendsContainer .friends .wrapperFriend{position:relative;height:100%;width:10%;float:left;margin:0}.friendsContainer .friends .wrapperFriend .friend_On_or_Off{position:relative;height:15%;width:50%;top:40%;margin:auto;background-color:#2ffb48;border-radius:60%}.friendsContainer .friends .friendImage{position:relative;height:70%;width:25%;background-color:#2ffb48;border-radius:60%;margin-left:3%;top:15%;float:left}.friendsContainer .friends .friendName{position:relative;height:40%;width:55%;font-size:1rem;color:#fff;left:4%;top:15%}.friendsContainer .friends .friendStatus{position:relative;height:40%;width:55%;font-size:0.7rem;color:#fff;left:4%;top:10%}.headerContainer{position:relative;height:100%;width:100%;display:initial}.headerContainer .appName{position:relative;height:100%;width:7%;left:5%;float:left;color:#fff;font-size:1.8rem}.headerContainer .search{position:relative;height:100%;width:73%;left:8%;float:left}.headerContainer .search input{position:relative;height:70%;width:100%;top:15%;font-size:1rem;border-radius:2%}.headerContainer .searchLogo{position:relative;height:100%;width:20%;left:10%;top:10%;float:left}.headerContainer .searchLogo #searchIcon{color:white;font-size:2rem}.iconbarContainer{position:relative;height:100%;width:100%;transition:3s}.iconbarContainer button{text-decoration:none;outline:none;background-color:transparent;cursor:pointer}.iconbarContainer #personIcon{color:#2E1B40;font-size:2.9em;position:relative;margin-top:9%;margin-bottom:59%}.iconbarContainer #personIcon:hover{color:#C85D2F;transition:2s;animation:rotateButton 1s 0s normal forwards}.iconbarContainer #homeIcon{color:#2E1B40;font-size:2.9em;position:relative;margin-bottom:59%}.iconbarContainer #homeIcon:hover{color:#C85D2F;transition:2s;animation:rotateButton 1s 0s normal forwards}.iconbarContainer #headsetIcon{color:#2E1B40;font-size:2.9em;position:relative;margin-bottom:59%}.iconbarContainer #headsetIcon:hover{color:#C85D2F;transition:2s;animation:rotateButton 1s 0s normal forwards}.iconbarContainer #queue_musicIcon{color:#2E1B40;font-size:2.9em;position:relative;margin-bottom:59%}.iconbarContainer #queue_musicIcon:hover{color:#C85D2F;transition:2s;animation:rotateButton 1s 0s normal forwards}.iconbarContainer #settingsIcon{color:#2E1B40;font-size:2.9em;position:absolute;bottom:0.5%}.iconbarContainer #settingsIcon:hover{color:#C85D2F;transition:2s;animation:rotateButton 1s 0s normal forwards}.iconbarContainer:hover{background-color:#1A0929;transition:1s}.containerMainUser{position:relative;height:100%;width:91%;margin:auto;overflow:scroll}.containerMainUser .mainNews{margin-top:0.5%;position:relative;height:45%;width:100%}.containerMainUser .mainNews .mainlyNews{position:relative;height:100%;width:39%;float:left;background-color:#fff}.containerMainUser .mainNews .oneNews{position:relative;height:100%;width:20%;float:left;margin-left:0.2%;background-color:#fff}.containerMainUser .mainNews .twoNews{position:relative;height:100%;width:20%;float:left;margin-left:0.2%;background-color:#fff}.containerMainUser .mainNews .threeNews{position:relative;height:100%;width:20%;float:left;margin-left:0.2%;background-color:#fff}.containerMainUser .NameNews{color:#fff;font-size:1.3rem;margin-top:0.5%;margin-bottom:0.5%}.containerMainUser .podcastMDS{position:relative;height:45%;width:100%;overflow-x:scroll}.containerMainUser .podcastMDS .track{position:relative;height:100%;width:19.5%;background-color:#C85D2F;margin-right:0.5%;margin-top:0.5%;float:left}.containerMainUser .podcastMDS .track .hoverTrack{position:relative;height:100%;width:100%;opacity:0;transition:0.5s;z-index:3;background-color:rgba(0,0,0,0.8)}.containerMainUser .podcastMDS .track .hoverTrack button{position:relative;height:100%;width:100%;text-decoration:none;outline:none;background-color:transparent;cursor:pointer}.containerMainUser .podcastMDS .track .hoverTrack button #play_circle_outline{font-size:8rem;color:#fff}.containerMainUser .podcastMDS .track .hoverTrack:hover{transition:0.3s;opacity:1}.containerMainUser .podcastMDS .track .informationTrack{position:absolute;height:20%;width:100%;background-color:#2E1B40;bottom:0;float:left}.containerMainUser .podcastMDS .track .informationTrack .trackName{position:absolute;height:50%;width:65%;color:#fff;font-size:1.2em;right:0;top:0}.containerMainUser .podcastMDS .track .informationTrack .authorName{position:absolute;height:30%;width:65%;color:#fff;font-size:0.6em;bottom:15%;right:0}.containerMainUser .podcastMDS .track .authorImg{position:absolute;height:60px;width:60px;border-radius:50%;background-color:#C8942F;bottom:3.5%;left:2%;z-index:2}#containerMainPerson{display:none}#containerMainHeadPhone{display:none}.containerMainPerson{position:relative;height:100%;width:91%;margin:auto;overflow-y:scroll}.containerMainPerson .header{position:relative;height:100%;width:91%;background-color:#fff}@keyframes rotateButton{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}@keyframes colorfull{from{filter:hue-rotate(5deg)}to{filter:hue-rotate(360deg)}}\n", ""]);
// Exports
module.exports = exports;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(0);
            var content = __webpack_require__(5);

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);

var exported = content.locals ? content.locals : {};



module.exports = exported;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(1);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "* {\n  margin: 0;\n  padding: 0;\n  text-decoration: none;\n  border: none; }\n\nbody {\n  background-color: #2E1B40; }\n", ""]);
// Exports
module.exports = exports;


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./src/js/Tabs.js
/* harmony default export */ var Tabs = (window.tabpagePerson = function buttonPerson() {
  personIcon.classList.remove = "personIcon";
  void personIcon.offsetWidth;
  personIcon.classList.add = "personIcon";
  document.getElementById("containerMainHeadPhone").style.display = "none";
  document.getElementById("containerMainPerson").style.display = "block";
  document.getElementById("containerMainUser").style.display = "none";
});

window.tabpageHome = function buttonPerson() {
  personIcon.classList.remove = "homeIcon";
  void personIcon.offsetWidth;
  personIcon.classList.add = "homeIcon";
  document.getElementById("containerMainHeadPhone").style.display = "none";
  document.getElementById("containerMainUser").style.display = "block";
  document.getElementById("containerMainPerson").style.display = "none";
};

window.tabpageHeadPhone = function buttonPerson() {
  headsetIcon.classList.remove = "headsetIcon";
  void headsetIcon.offsetWidth;
  headsetIcon.classList.add = "headsetIcon";
  document.getElementById("containerMainHeadPhone").style.display = "block";
  document.getElementById("containerMainUser").style.display = "none";
  document.getElementById("containerMainPerson").style.display = "none";
};
// EXTERNAL MODULE: ./src/scss/index.scss
var scss = __webpack_require__(2);

// EXTERNAL MODULE: ./src/css/index.css
var css = __webpack_require__(4);

// CONCATENATED MODULE: ./src/js/app.js




/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map