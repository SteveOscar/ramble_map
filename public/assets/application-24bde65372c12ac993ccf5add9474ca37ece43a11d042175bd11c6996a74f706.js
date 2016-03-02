/*!
 * jQuery JavaScript Library v1.12.0
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-01-08T19:56Z
 */


(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Support: Firefox 18+
// Can't be in strict mode, several libs including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
//"use strict";
var deletedIds = [];

var document = window.document;

var slice = deletedIds.slice;

var concat = deletedIds.concat;

var push = deletedIds.push;

var indexOf = deletedIds.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	version = "1.12.0",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1, IE<9
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: deletedIds.sort,
	splice: deletedIds.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var src, copyIsArray, copy, name, options, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = jQuery.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray( src ) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type( obj ) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type( obj ) === "array";
	},

	isWindow: function( obj ) {
		/* jshint eqeqeq: false */
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {

		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		// adding 1 corrects loss of precision from parseFloat (#15100)
		var realStringObj = obj && obj.toString();
		return !jQuery.isArray( obj ) && ( realStringObj - parseFloat( realStringObj ) + 1 ) >= 0;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	isPlainObject: function( obj ) {
		var key;

		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {

			// Not own constructor property must be Object
			if ( obj.constructor &&
				!hasOwn.call( obj, "constructor" ) &&
				!hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
				return false;
			}
		} catch ( e ) {

			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Support: IE<9
		// Handle iteration over inherited properties before own properties.
		if ( !support.ownFirst ) {
			for ( key in obj ) {
				return hasOwn.call( obj, key );
			}
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call( obj ) ] || "object" :
			typeof obj;
	},

	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && jQuery.trim( data ) ) {

			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data ); // jscs:ignore requireDotNotation
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1, IE<9
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		var len;

		if ( arr ) {
			if ( indexOf ) {
				return indexOf.call( arr, elem, i );
			}

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {

				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		while ( j < len ) {
			first[ i++ ] = second[ j++ ];
		}

		// Support: IE<9
		// Workaround casting of .length to NaN on otherwise arraylike objects (e.g., NodeLists)
		if ( len !== len ) {
			while ( second[ j ] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var args, proxy, tmp;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: function() {
		return +( new Date() );
	},

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

// JSHint would error on this code due to the Symbol not being defined in ES5.
// Defining this global in .jshintrc would create a danger of using the global
// unguarded in another place, it seems safer to just disable JSHint for these
// three lines.
/* jshint ignore: start */
if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = deletedIds[ Symbol.iterator ];
}
/* jshint ignore: end */

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: iOS 8.2 (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.2.1
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2015-10-17
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// http://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, nidselect, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

				// ID selector
				if ( (m = match[1]) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!compilerCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

				if ( nodeType !== 1 ) {
					newContext = context;
					newSelector = selector;

				// qSA looks outside Element context, which is not what we want
				// Thanks to Andrew Dupont for this workaround technique
				// Support: IE <=8
				// Exclude object elements
				} else if ( context.nodeName.toLowerCase() !== "object" ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rescape, "\\$&" );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					nidselect = ridentifier.test( nid ) ? "#" + nid : "[id='" + nid + "']";
					while ( i-- ) {
						groups[i] = nidselect + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch ( qsaError ) {
					} finally {
						if ( nid === expando ) {
							context.removeAttribute( "id" );
						}
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, parent,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if ( (parent = document.defaultView) && parent.top !== parent ) {
		// Support: IE 11
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( document.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var m = context.getElementById( id );
				return m ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibing-combinator selector` fails
			if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		!compilerCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {
							// Use previously-cached element index if available
							if ( useCache ) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

						if ( (oldCache = uniqueCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = ( /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/ );



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		} );

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( jQuery.inArray( elem, qualifier ) > -1 ) !== not;
	} );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i,
			ret = [],
			self = this,
			len = self.length;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// init accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt( 0 ) === "<" &&
				selector.charAt( selector.length - 1 ) === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {

						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[ 2 ] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[ 0 ] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof root.ready !== "undefined" ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var i,
			targets = jQuery( target, this ),
			len = targets.length;

		return this.filter( function() {
			for ( i = 0; i < len; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

				// Always skip document fragments
				if ( cur.nodeType < 11 && ( pos ?
					pos.index( cur ) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector( cur, selectors ) ) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[ 0 ], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem, this );
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	do {
		cur = cur[ dir ];
	} while ( cur && cur.nodeType !== 1 );

	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				ret = jQuery.uniqueSort( ret );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				ret = ret.reverse();
			}
		}

		return this.pushStack( ret );
	};
} );
var rnotwhite = ( /\S+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( jQuery.isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && jQuery.type( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = true;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks( "once memory" ), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks( "memory" ) ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];

							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this === promise ? newDefer.promise() : this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add( function() {

					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 ||
				( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred.
			// If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );

					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.progress( updateFunc( i, progressContexts, progressValues ) )
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
} );


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {

	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
} );

/**
 * Clean-up method for dom ready events
 */
function detach() {
	if ( document.addEventListener ) {
		document.removeEventListener( "DOMContentLoaded", completed );
		window.removeEventListener( "load", completed );

	} else {
		document.detachEvent( "onreadystatechange", completed );
		window.detachEvent( "onload", completed );
	}
}

/**
 * The ready event handler and self cleanup method
 */
function completed() {

	// readyState === "complete" is good enough for us to call the dom ready in oldIE
	if ( document.addEventListener ||
		window.event.type === "load" ||
		document.readyState === "complete" ) {

		detach();
		jQuery.ready();
	}
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called
		// after the browser event has already occurred.
		// we once tried to use readyState "interactive" here,
		// but it caused issues like the one
		// discovered by ChrisS here:
		// http://bugs.jquery.com/ticket/12282#comment:15
		if ( document.readyState === "complete" ) {

			// Handle it asynchronously to allow scripts the opportunity to delay ready
			window.setTimeout( jQuery.ready );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {

			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed );

		// If IE event model is used
		} else {

			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", completed );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", completed );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch ( e ) {}

			if ( top && top.doScroll ) {
				( function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {

							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll( "left" );
						} catch ( e ) {
							return window.setTimeout( doScrollCheck, 50 );
						}

						// detach all dom ready events
						detach();

						// and execute any waiting functions
						jQuery.ready();
					}
				} )();
			}
		}
	}
	return readyList.promise( obj );
};

// Kick off the DOM ready check even if the user does not
jQuery.ready.promise();




// Support: IE<9
// Iteration over object's inherited properties before its own
var i;
for ( i in jQuery( support ) ) {
	break;
}
support.ownFirst = i === "0";

// Note: most support tests are defined in their respective modules.
// false until the test is run
support.inlineBlockNeedsLayout = false;

// Execute ASAP in case we need to set body.style.zoom
jQuery( function() {

	// Minified: var a,b,c,d
	var val, div, body, container;

	body = document.getElementsByTagName( "body" )[ 0 ];
	if ( !body || !body.style ) {

		// Return for frameset docs that don't have a body
		return;
	}

	// Setup
	div = document.createElement( "div" );
	container = document.createElement( "div" );
	container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
	body.appendChild( container ).appendChild( div );

	if ( typeof div.style.zoom !== "undefined" ) {

		// Support: IE<8
		// Check if natively block-level elements act like inline-block
		// elements when setting their display to 'inline' and giving
		// them layout
		div.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1";

		support.inlineBlockNeedsLayout = val = div.offsetWidth === 3;
		if ( val ) {

			// Prevent IE 6 from affecting layout for positioned elements #11048
			// Prevent IE from shrinking the body in IE 7 mode #12869
			// Support: IE<8
			body.style.zoom = 1;
		}
	}

	body.removeChild( container );
} );


( function() {
	var div = document.createElement( "div" );

	// Support: IE<9
	support.deleteExpando = true;
	try {
		delete div.test;
	} catch ( e ) {
		support.deleteExpando = false;
	}

	// Null elements to avoid leaks in IE.
	div = null;
} )();
var acceptData = function( elem ) {
	var noData = jQuery.noData[ ( elem.nodeName + " " ).toLowerCase() ],
		nodeType = +elem.nodeType || 1;

	// Do not set data on non-element DOM nodes because it will not be cleared (#8335).
	return nodeType !== 1 && nodeType !== 9 ?
		false :

		// Nodes accept data unless otherwise specified; rejection can be conditional
		!noData || noData !== true && elem.getAttribute( "classid" ) === noData;
};




var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :

					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	var name;
	for ( name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[ name ] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}

function internalData( elem, name, data, pvt /* Internal Use Only */ ) {
	if ( !acceptData( elem ) ) {
		return;
	}

	var ret, thisCache,
		internalKey = jQuery.expando,

		// We have to handle DOM nodes and JS objects differently because IE6-7
		// can't GC object references properly across the DOM-JS boundary
		isNode = elem.nodeType,

		// Only DOM nodes need the global jQuery cache; JS object data is
		// attached directly to the object so GC can occur automatically
		cache = isNode ? jQuery.cache : elem,

		// Only defining an ID for JS objects if its cache already exists allows
		// the code to shortcut on the same path as a DOM node with no cache
		id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

	// Avoid doing any more work than we need to when trying to get data on an
	// object that has no data at all
	if ( ( !id || !cache[ id ] || ( !pvt && !cache[ id ].data ) ) &&
		data === undefined && typeof name === "string" ) {
		return;
	}

	if ( !id ) {

		// Only DOM nodes need a new unique ID for each element since their data
		// ends up in the global cache
		if ( isNode ) {
			id = elem[ internalKey ] = deletedIds.pop() || jQuery.guid++;
		} else {
			id = internalKey;
		}
	}

	if ( !cache[ id ] ) {

		// Avoid exposing jQuery metadata on plain JS objects when the object
		// is serialized using JSON.stringify
		cache[ id ] = isNode ? {} : { toJSON: jQuery.noop };
	}

	// An object can be passed to jQuery.data instead of a key/value pair; this gets
	// shallow copied over onto the existing cache
	if ( typeof name === "object" || typeof name === "function" ) {
		if ( pvt ) {
			cache[ id ] = jQuery.extend( cache[ id ], name );
		} else {
			cache[ id ].data = jQuery.extend( cache[ id ].data, name );
		}
	}

	thisCache = cache[ id ];

	// jQuery data() is stored in a separate object inside the object's internal data
	// cache in order to avoid key collisions between internal data and user-defined
	// data.
	if ( !pvt ) {
		if ( !thisCache.data ) {
			thisCache.data = {};
		}

		thisCache = thisCache.data;
	}

	if ( data !== undefined ) {
		thisCache[ jQuery.camelCase( name ) ] = data;
	}

	// Check for both converted-to-camel and non-converted data property names
	// If a data property was specified
	if ( typeof name === "string" ) {

		// First Try to find as-is property data
		ret = thisCache[ name ];

		// Test for null|undefined property data
		if ( ret == null ) {

			// Try to find the camelCased property
			ret = thisCache[ jQuery.camelCase( name ) ];
		}
	} else {
		ret = thisCache;
	}

	return ret;
}

function internalRemoveData( elem, name, pvt ) {
	if ( !acceptData( elem ) ) {
		return;
	}

	var thisCache, i,
		isNode = elem.nodeType,

		// See jQuery.data for more information
		cache = isNode ? jQuery.cache : elem,
		id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

	// If there is already no cache entry for this object, there is no
	// purpose in continuing
	if ( !cache[ id ] ) {
		return;
	}

	if ( name ) {

		thisCache = pvt ? cache[ id ] : cache[ id ].data;

		if ( thisCache ) {

			// Support array or space separated string names for data keys
			if ( !jQuery.isArray( name ) ) {

				// try the string as a key before any manipulation
				if ( name in thisCache ) {
					name = [ name ];
				} else {

					// split the camel cased version by spaces unless a key with the spaces exists
					name = jQuery.camelCase( name );
					if ( name in thisCache ) {
						name = [ name ];
					} else {
						name = name.split( " " );
					}
				}
			} else {

				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = name.concat( jQuery.map( name, jQuery.camelCase ) );
			}

			i = name.length;
			while ( i-- ) {
				delete thisCache[ name[ i ] ];
			}

			// If there is no data left in the cache, we want to continue
			// and let the cache object itself get destroyed
			if ( pvt ? !isEmptyDataObject( thisCache ) : !jQuery.isEmptyObject( thisCache ) ) {
				return;
			}
		}
	}

	// See jQuery.data for more information
	if ( !pvt ) {
		delete cache[ id ].data;

		// Don't destroy the parent cache unless the internal data object
		// had been the only thing left in it
		if ( !isEmptyDataObject( cache[ id ] ) ) {
			return;
		}
	}

	// Destroy the cache
	if ( isNode ) {
		jQuery.cleanData( [ elem ], true );

	// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
	/* jshint eqeqeq: false */
	} else if ( support.deleteExpando || cache != cache.window ) {
		/* jshint eqeqeq: true */
		delete cache[ id ];

	// When all else fails, undefined
	} else {
		cache[ id ] = undefined;
	}
}

jQuery.extend( {
	cache: {},

	// The following elements (space-suffixed to avoid Object.prototype collisions)
	// throw uncatchable exceptions if you attempt to set expando properties
	noData: {
		"applet ": true,
		"embed ": true,

		// ...but Flash objects (which have this classid) *can* handle expandos
		"object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[ jQuery.expando ] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data ) {
		return internalData( elem, name, data );
	},

	removeData: function( elem, name ) {
		return internalRemoveData( elem, name );
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return internalData( elem, name, data, true );
	},

	_removeData: function( elem, name ) {
		return internalRemoveData( elem, name, true );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Special expections of .data basically thwart jQuery.access,
		// so implement the relevant behavior ourselves

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					jQuery._data( elem, "parsedAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				jQuery.data( this, key );
			} );
		}

		return arguments.length > 1 ?

			// Sets one value
			this.each( function() {
				jQuery.data( this, key, value );
			} ) :

			// Gets one value
			// Try to fetch any internally stored data first
			elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : undefined;
	},

	removeData: function( key ) {
		return this.each( function() {
			jQuery.removeData( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray( data ) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object,
	// or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				jQuery._removeData( elem, type + "queue" );
				jQuery._removeData( elem, key );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = jQuery._data( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );


( function() {
	var shrinkWrapBlocksVal;

	support.shrinkWrapBlocks = function() {
		if ( shrinkWrapBlocksVal != null ) {
			return shrinkWrapBlocksVal;
		}

		// Will be changed later if needed.
		shrinkWrapBlocksVal = false;

		// Minified: var b,c,d
		var div, body, container;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {

			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		// Support: IE6
		// Check if elements with layout shrink-wrap their children
		if ( typeof div.style.zoom !== "undefined" ) {

			// Reset CSS: box-sizing; display; margin; border
			div.style.cssText =

				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;" +
				"padding:1px;width:1px;zoom:1";
			div.appendChild( document.createElement( "div" ) ).style.width = "5px";
			shrinkWrapBlocksVal = div.offsetWidth !== 3;
		}

		body.removeChild( container );

		return shrinkWrapBlocksVal;
	};

} )();
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {

		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" ||
			!jQuery.contains( elem.ownerDocument, elem );
	};



function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted,
		scale = 1,
		maxIterations = 20,
		currentValue = tween ?
			function() { return tween.cur(); } :
			function() { return jQuery.css( elem, prop, "" ); },
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		do {

			// If previous iteration zeroed out, double until we get *something*.
			// Use string for doubling so we don't accidentally see scale as unchanged below
			scale = scale || ".5";

			// Adjust and apply
			initialInUnit = initialInUnit / scale;
			jQuery.style( elem, prop, initialInUnit + unit );

		// Update scale, tolerating zero or NaN from tween.cur()
		// Break the loop if scale is unchanged or perfect, or if we've just had enough.
		} while (
			scale !== ( scale = currentValue() / initial ) && scale !== 1 && --maxIterations
		);
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}


// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		length = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < length; i++ ) {
				fn(
					elems[ i ],
					key,
					raw ? value : value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			length ? fn( elems[ 0 ], key ) : emptyGet;
};
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([\w:-]+)/ );

var rscriptType = ( /^$|\/(?:java|ecma)script/i );

var rleadingWhitespace = ( /^\s+/ );

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|" +
		"details|dialog|figcaption|figure|footer|header|hgroup|main|" +
		"mark|meter|nav|output|picture|progress|section|summary|template|time|video";



function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
		safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}


( function() {
	var div = document.createElement( "div" ),
		fragment = document.createDocumentFragment(),
		input = document.createElement( "input" );

	// Setup
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

	// IE strips leading whitespace when .innerHTML is used
	support.leadingWhitespace = div.firstChild.nodeType === 3;

	// Make sure that tbody elements aren't automatically inserted
	// IE will insert them into empty tables
	support.tbody = !div.getElementsByTagName( "tbody" ).length;

	// Make sure that link elements get serialized correctly by innerHTML
	// This requires a wrapper element in IE
	support.htmlSerialize = !!div.getElementsByTagName( "link" ).length;

	// Makes sure cloning an html5 element does not cause problems
	// Where outerHTML is undefined, this still works
	support.html5Clone =
		document.createElement( "nav" ).cloneNode( true ).outerHTML !== "<:nav></:nav>";

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	input.type = "checkbox";
	input.checked = true;
	fragment.appendChild( input );
	support.appendChecked = input.checked;

	// Make sure textarea (and checkbox) defaultValue is properly cloned
	// Support: IE6-IE11+
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// #11217 - WebKit loses check when the name is after the checked attribute
	fragment.appendChild( div );

	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input = document.createElement( "input" );
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// old WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<9
	// Cloned elements keep attachEvent handlers, we use addEventListener on IE9+
	support.noCloneEvent = !!div.addEventListener;

	// Support: IE<9
	// Since attributes and properties are the same in IE,
	// cleanData must set properties to undefined rather than use removeAttribute
	div[ jQuery.expando ] = 1;
	support.attributes = !div.getAttribute( jQuery.expando );
} )();


// We have to close these tags to support XHTML (#13200)
var wrapMap = {
	option: [ 1, "<select multiple='multiple'>", "</select>" ],
	legend: [ 1, "<fieldset>", "</fieldset>" ],
	area: [ 1, "<map>", "</map>" ],

	// Support: IE8
	param: [ 1, "<object>", "</object>" ],
	thead: [ 1, "<table>", "</table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
	// unless wrapped in a div with non-breaking characters in front of it.
	_default: support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>" ]
};

// Support: IE8-IE9
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {
	var elems, elem,
		i = 0,
		found = typeof context.getElementsByTagName !== "undefined" ?
			context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== "undefined" ?
				context.querySelectorAll( tag || "*" ) :
				undefined;

	if ( !found ) {
		for ( found = [], elems = context.childNodes || context;
			( elem = elems[ i ] ) != null;
			i++
		) {
			if ( !tag || jQuery.nodeName( elem, tag ) ) {
				found.push( elem );
			} else {
				jQuery.merge( found, getAll( elem, tag ) );
			}
		}
	}

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], found ) :
		found;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var elem,
		i = 0;
	for ( ; ( elem = elems[ i ] ) != null; i++ ) {
		jQuery._data(
			elem,
			"globalEval",
			!refElements || jQuery._data( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/,
	rtbody = /<tbody/i;

function fixDefaultChecked( elem ) {
	if ( rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

function buildFragment( elems, context, scripts, selection, ignored ) {
	var j, elem, contains,
		tmp, tag, tbody, wrap,
		l = elems.length,

		// Ensure a safe fragment
		safe = createSafeFragment( context ),

		nodes = [],
		i = 0;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( jQuery.type( elem ) === "object" ) {
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || safe.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;

				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Manually add leading whitespace removed by IE
				if ( !support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
					nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[ 0 ] ) );
				}

				// Remove IE's autoinserted <tbody> from table fragments
				if ( !support.tbody ) {

					// String was a <table>, *may* have spurious <tbody>
					elem = tag === "table" && !rtbody.test( elem ) ?
						tmp.firstChild :

						// String was a bare <thead> or <tfoot>
						wrap[ 1 ] === "<table>" && !rtbody.test( elem ) ?
							tmp :
							0;

					j = elem && elem.childNodes.length;
					while ( j-- ) {
						if ( jQuery.nodeName( ( tbody = elem.childNodes[ j ] ), "tbody" ) &&
							!tbody.childNodes.length ) {

							elem.removeChild( tbody );
						}
					}
				}

				jQuery.merge( nodes, tmp.childNodes );

				// Fix #12392 for WebKit and IE > 9
				tmp.textContent = "";

				// Fix #12392 for oldIE
				while ( tmp.firstChild ) {
					tmp.removeChild( tmp.firstChild );
				}

				// Remember the top-level container for proper cleanup
				tmp = safe.lastChild;
			}
		}
	}

	// Fix #11356: Clear elements from fragment
	if ( tmp ) {
		safe.removeChild( tmp );
	}

	// Reset defaultChecked for any radios and checkboxes
	// about to be appended to the DOM in IE 6/7 (#8060)
	if ( !support.appendChecked ) {
		jQuery.grep( getAll( nodes, "input" ), fixDefaultChecked );
	}

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}

			continue;
		}

		contains = jQuery.contains( elem.ownerDocument, elem );

		// Append to fragment
		tmp = getAll( safe.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( contains ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	tmp = null;

	return safe;
}


( function() {
	var i, eventName,
		div = document.createElement( "div" );

	// Support: IE<9 (lack submit/change bubble), Firefox (lack focus(in | out) events)
	for ( i in { submit: true, change: true, focusin: true } ) {
		eventName = "on" + i;

		if ( !( support[ i ] = eventName in window ) ) {

			// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
			div.setAttribute( eventName, "t" );
			support[ i ] = div.attributes[ eventName ].expando === false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
} )();


var rformElems = /^(?:input|select|textarea)$/i,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE9
// See #13393 for more info
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {
		var tmp, events, t, handleObjIn,
			special, eventHandle, handleObj,
			handlers, type, namespaces, origType,
			elemData = jQuery._data( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" &&
					( !e || jQuery.event.triggered !== e.type ) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};

			// Add elem as a property of the handle fn to prevent a memory leak
			// with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {
		var j, handleObj, tmp,
			origCount, t, events,
			special, handlers, type,
			namespaces, origType,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery._removeData( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		var handle, ontype, cur,
			bubbleType, special, tmp, i,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] &&
				jQuery._data( cur, "handle" );

			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if (
				( !special._default ||
				 special._default.apply( eventPath.pop(), data ) === false
				) && acceptData( elem )
			) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					try {
						elem[ type ]();
					} catch ( e ) {

						// IE<9 dies on focus/blur to hidden element (#1486,#12518)
						// only reproducible on winXP IE8 native, not IE9 in IE8 mode
					}
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, j, ret, matched, handleObj,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, matches, sel, handleObj,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Support (at least): Chrome, IE9
		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		//
		// Support: Firefox<=42+
		// Avoid non-left-click in FF but don't block IE radio events (#3861, gh-2343)
		if ( delegateCount && cur.nodeType &&
			( event.type !== "click" || isNaN( event.button ) || event.button < 1 ) ) {

			/* jshint eqeqeq: false */
			for ( ; cur != this; cur = cur.parentNode || this ) {
				/* jshint eqeqeq: true */

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && ( cur.disabled !== true || event.type !== "click" ) ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push( { elem: cur, handlers: matches } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: this, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: IE<9
		// Fix target property (#1925)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Support: Safari 6-8+
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// Support: IE<9
		// For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
		event.metaKey = !!event.metaKey;

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: ( "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase " +
		"metaKey relatedTarget shiftKey target timeStamp view which" ).split( " " ),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split( " " ),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: ( "button buttons clientX clientY fromElement offsetX offsetY " +
			"pageX pageY screenX screenY toElement" ).split( " " ),
		filter: function( event, original ) {
			var body, eventDoc, doc,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX +
					( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) -
					( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY +
					( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) -
					( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ?
					original.toElement :
					fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {

			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					try {
						this.focus();
						return false;
					} catch ( e ) {

						// Support: IE<9
						// If we error on focus to hidden element (#1486, #12518),
						// let .trigger() run the handlers
					}
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {

			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	// Piggyback on a donor event to simulate a different one
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true

				// Previously, `originalEvent: {}` was set here, so stopPropagation call
				// would not be triggered on donor event, since in our own
				// jQuery.event.stopPropagation function we had a check for existence of
				// originalEvent.stopPropagation method, so, consequently it would be a noop.
				//
				// Guard for simulated events was moved to jQuery.event.stopPropagation function
				// since `originalEvent` should point to the original event for the
				// constancy with other events and for more focused logic
			}
		);

		jQuery.event.trigger( e, null, elem );

		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {

		// This "if" is needed for plain objects
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8
			// detachEvent needed property on element, by name of that event,
			// to properly expose it to GC
			if ( typeof elem[ name ] === "undefined" ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
		}
	};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: IE < 9, Android < 4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;
		if ( !e ) {
			return;
		}

		// If preventDefault exists, run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// Support: IE
		// Otherwise set the returnValue property of the original event to false
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( !e || this.isSimulated ) {
			return;
		}

		// If stopPropagation exists, run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}

		// Support: IE
		// Set the cancelBubble property of the original event to true
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://code.google.com/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

// IE submit delegation
if ( !support.submit ) {

	jQuery.event.special.submit = {
		setup: function() {

			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {

				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ?

						// Support: IE <=8
						// We use jQuery.prop instead of elem.form
						// to allow fixing the IE8 delegated submit issue (gh-2332)
						// by 3rd party polyfills/workarounds.
						jQuery.prop( elem, "form" ) :
						undefined;

				if ( form && !jQuery._data( form, "submit" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submitBubble = true;
					} );
					jQuery._data( form, "submit", true );
				}
			} );

			// return undefined since we don't need an event listener
		},

		postDispatch: function( event ) {

			// If form was submitted by the user, bubble the event up the tree
			if ( event._submitBubble ) {
				delete event._submitBubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event );
				}
			}
		},

		teardown: function() {

			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !support.change ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {

				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._justChanged = true;
						}
					} );
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._justChanged && !event.isTrigger ) {
							this._justChanged = false;
						}

						// Allow triggered, simulated change events (#11500)
						jQuery.event.simulate( "change", this, event );
					} );
				}
				return false;
			}

			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "change" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event );
						}
					} );
					jQuery._data( elem, "change", true );
				}
			} );
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger ||
				( elem.type !== "radio" && elem.type !== "checkbox" ) ) {

				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return !rformElems.test( this.nodeName );
		}
	};
}

// Support: Firefox
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome, Safari
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://code.google.com/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				jQuery._data( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					jQuery._removeData( doc, fix );
				} else {
					jQuery._data( doc, fix, attaches );
				}
			}
		};
	} );
}

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	},

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


var rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rnoshimcache = new RegExp( "<(?:" + nodeNames + ")[\\s/>]", "i" ),
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,

	// Support: IE 10-11, Edge 10240+
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement( "div" ) );

// Support: IE<8
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName( "tbody" )[ 0 ] ||
			elem.appendChild( elem.ownerDocument.createElement( "tbody" ) ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( jQuery.find.attr( elem, "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );
	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute( "type" );
	}
	return elem;
}

function cloneCopyEvent( src, dest ) {
	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type, events[ type ][ i ] );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function fixCloneNodeIssues( src, dest ) {
	var nodeName, e, data;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	nodeName = dest.nodeName.toLowerCase();

	// IE6-8 copies events bound via attachEvent when using cloneNode.
	if ( !support.noCloneEvent && dest[ jQuery.expando ] ) {
		data = jQuery._data( dest );

		for ( e in data.events ) {
			jQuery.removeEvent( dest, e, data.handle );
		}

		// Event data gets referenced instead of copied if the expando gets copied too
		dest.removeAttribute( jQuery.expando );
	}

	// IE blanks contents when cloning scripts, and tries to evaluate newly-set text
	if ( nodeName === "script" && dest.text !== src.text ) {
		disableScript( dest ).text = src.text;
		restoreScript( dest );

	// IE6-10 improperly clones children of object elements using classid.
	// IE10 throws NoModificationAllowedError if parent is null, #12132.
	} else if ( nodeName === "object" ) {
		if ( dest.parentNode ) {
			dest.outerHTML = src.outerHTML;
		}

		// This path appears unavoidable for IE9. When cloning an object
		// element in IE9, the outerHTML strategy above is not sufficient.
		// If the src has innerHTML and the destination does not,
		// copy the src.innerHTML into the dest.innerHTML. #10324
		if ( support.html5Clone && ( src.innerHTML && !jQuery.trim( dest.innerHTML ) ) ) {
			dest.innerHTML = src.innerHTML;
		}

	} else if ( nodeName === "input" && rcheckableType.test( src.type ) ) {

		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.defaultSelected = dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var first, node, hasScripts,
		scripts, doc, fragment,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		isFunction = jQuery.isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( isFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( isFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android<4.1, PhantomJS<2
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!jQuery._data( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl ) {
								jQuery._evalUrl( node.src );
							}
						} else {
							jQuery.globalEval(
								( node.text || node.textContent || node.innerHTML || "" )
									.replace( rcleanScript, "" )
							);
						}
					}
				}
			}

			// Fix #11809: Avoid leaking memory
			fragment = first = null;
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		elems = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = elems[ i ] ) != null; i++ ) {

		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var destElements, node, clone, i, srcElements,
			inPage = jQuery.contains( elem.ownerDocument, elem );

		if ( support.html5Clone || jQuery.isXMLDoc( elem ) ||
			!rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {

			clone = elem.cloneNode( true );

		// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		if ( ( !support.noCloneEvent || !support.noCloneChecked ) &&
				( elem.nodeType === 1 || elem.nodeType === 11 ) && !jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			// Fix all IE cloning issues
			for ( i = 0; ( node = srcElements[ i ] ) != null; ++i ) {

				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[ i ] ) {
					fixCloneNodeIssues( node, destElements[ i ] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0; ( node = srcElements[ i ] ) != null; i++ ) {
					cloneCopyEvent( node, destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		destElements = srcElements = node = null;

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems, /* internal */ forceAcceptData ) {
		var elem, type, id, data,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			attributes = support.attributes,
			special = jQuery.event.special;

		for ( ; ( elem = elems[ i ] ) != null; i++ ) {
			if ( forceAcceptData || acceptData( elem ) ) {

				id = elem[ internalKey ];
				data = id && cache[ id ];

				if ( data ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Remove cache only if it was not already removed by jQuery.event.remove
					if ( cache[ id ] ) {

						delete cache[ id ];

						// Support: IE<9
						// IE does not allow us to delete expando properties from nodes
						// IE creates expando attributes along with the property
						// IE does not have a removeAttribute function on Document nodes
						if ( !attributes && typeof elem.removeAttribute !== "undefined" ) {
							elem.removeAttribute( internalKey );

						// Webkit & Blink performance suffers when deleting properties
						// from DOM nodes, so set to undefined instead
						// https://code.google.com/p/chromium/issues/detail?id=378607
						} else {
							elem[ internalKey ] = undefined;
						}

						deletedIds.push( id );
					}
				}
			}
		}
	}
} );

jQuery.fn.extend( {

	// Keep domManip exposed until 3.0 (gh-2225)
	domManip: domManip,

	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append(
					( this[ 0 ] && this[ 0 ].ownerDocument || document ).createTextNode( value )
				);
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {

			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem, false ) );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}

			// If this is a select, ensure that it displays empty (#12336)
			// Support: IE<9
			if ( elem.options && jQuery.nodeName( elem, "select" ) ) {
				elem.options.length = 0;
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( support.htmlSerialize || !rnoshimcache.test( value )  ) &&
				( support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {

						// Remove element nodes and prevent memory leaks
						elem = this[ i ] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			i = 0,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );


var iframe,
	elemdisplay = {

		// Support: Firefox
		// We have to pre-define these values for FF (#10227)
		HTML: "block",
		BODY: "block"
	};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */

// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		display = jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = ( iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" ) )
				.appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = ( iframe[ 0 ].contentWindow || iframe[ 0 ].contentDocument ).document;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}
var rmargin = ( /^margin/ );

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var documentElement = document.documentElement;



( function() {
	var pixelPositionVal, pixelMarginRightVal, boxSizingReliableVal,
		reliableHiddenOffsetsVal, reliableMarginRightVal, reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	div.style.cssText = "float:left;opacity:.5";

	// Support: IE<9
	// Make sure that element opacity exists (as opposed to filter)
	support.opacity = div.style.opacity === "0.5";

	// Verify style float existence
	// (IE uses styleFloat instead of cssFloat)
	support.cssFloat = !!div.style.cssFloat;

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container = document.createElement( "div" );
	container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" +
		"padding:0;margin-top:1px;position:absolute";
	div.innerHTML = "";
	container.appendChild( div );

	// Support: Firefox<29, Android 2.3
	// Vendor-prefix box-sizing
	support.boxSizing = div.style.boxSizing === "" || div.style.MozBoxSizing === "" ||
		div.style.WebkitBoxSizing === "";

	jQuery.extend( support, {
		reliableHiddenOffsets: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableHiddenOffsetsVal;
		},

		boxSizingReliable: function() {

			// We're checking for pixelPositionVal here instead of boxSizingReliableVal
			// since that compresses better and they're computed together anyway.
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return boxSizingReliableVal;
		},

		pixelMarginRight: function() {

			// Support: Android 4.0-4.3
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelMarginRightVal;
		},

		pixelPosition: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelPositionVal;
		},

		reliableMarginRight: function() {

			// Support: Android 2.3
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableMarginRightVal;
		},

		reliableMarginLeft: function() {

			// Support: IE <=8 only, Android 4.0 - 4.3 only, Firefox <=3 - 37
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableMarginLeftVal;
		}
	} );

	function computeStyleTests() {
		var contents, divStyle,
			documentElement = document.documentElement;

		// Setup
		documentElement.appendChild( container );

		div.style.cssText =

			// Support: Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;box-sizing:border-box;" +
			"position:relative;display:block;" +
			"margin:auto;border:1px;padding:1px;" +
			"top:1%;width:50%";

		// Support: IE<9
		// Assume reasonable values in the absence of getComputedStyle
		pixelPositionVal = boxSizingReliableVal = reliableMarginLeftVal = false;
		pixelMarginRightVal = reliableMarginRightVal = true;

		// Check for getComputedStyle so that this code is not run in IE<9.
		if ( window.getComputedStyle ) {
			divStyle = window.getComputedStyle( div );
			pixelPositionVal = ( divStyle || {} ).top !== "1%";
			reliableMarginLeftVal = ( divStyle || {} ).marginLeft === "2px";
			boxSizingReliableVal = ( divStyle || { width: "4px" } ).width === "4px";

			// Support: Android 4.0 - 4.3 only
			// Some styles come back with percentage values, even though they shouldn't
			div.style.marginRight = "50%";
			pixelMarginRightVal = ( divStyle || { marginRight: "4px" } ).marginRight === "4px";

			// Support: Android 2.3 only
			// Div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container (#3333)
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			contents = div.appendChild( document.createElement( "div" ) );

			// Reset CSS: box-sizing; display; margin; border; padding
			contents.style.cssText = div.style.cssText =

				// Support: Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
			contents.style.marginRight = contents.style.width = "0";
			div.style.width = "1px";

			reliableMarginRightVal =
				!parseFloat( ( window.getComputedStyle( contents ) || {} ).marginRight );

			div.removeChild( contents );
		}

		// Support: IE6-8
		// First check that getClientRects works as expected
		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		div.style.display = "none";
		reliableHiddenOffsetsVal = div.getClientRects().length === 0;
		if ( reliableHiddenOffsetsVal ) {
			div.style.display = "";
			div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
			contents = div.getElementsByTagName( "td" );
			contents[ 0 ].style.cssText = "margin:0;border:0;padding:0;display:none";
			reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
			if ( reliableHiddenOffsetsVal ) {
				contents[ 0 ].style.display = "";
				contents[ 1 ].style.display = "none";
				reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
			}
		}

		// Teardown
		documentElement.removeChild( container );
	}

} )();


var getStyles, curCSS,
	rposition = /^(top|right|bottom|left)$/;

if ( window.getComputedStyle ) {
	getStyles = function( elem ) {

		// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};

	curCSS = function( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles( elem );

		// getPropertyValue is only needed for .css('filter') in IE9, see #12537
		ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

		if ( computed ) {

			if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
				ret = jQuery.style( elem, name );
			}

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value"
			// instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values,
			// but width seems to be reliably pixels
			// this is against the CSSOM draft spec:
			// http://dev.w3.org/csswg/cssom/#resolved-values
			if ( !support.pixelMarginRight() && rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "";
	};
} else if ( documentElement.currentStyle ) {
	getStyles = function( elem ) {
		return elem.currentStyle;
	};

	curCSS = function( elem, name, computed ) {
		var left, rs, rsLeft, ret,
			style = elem.style;

		computed = computed || getStyles( elem );
		ret = computed ? computed[ name ] : undefined;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret == null && style && style[ name ] ) {
			ret = style[ name ];
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		// but not position css attributes, as those are
		// proportional to the parent element instead
		// and we can't measure the parent instead because it
		// might trigger a "stacking dolls" problem
		if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

			// Remember the original values
			left = style.left;
			rs = elem.runtimeStyle;
			rsLeft = rs && rs.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				rs.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ret;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				rs.left = rsLeft;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "" || "auto";
	};
}




function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var

		ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity\s*=\s*([^)]*)/i,

	// swappable if display is none or starts with table except
	// "table", "table-cell", or "table-caption"
	// see here for display values:
	// https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style;


// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in emptyStyle ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt( 0 ).toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = jQuery._data( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {

			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] =
					jQuery._data( elem, "olddisplay", defaultDisplay( elem.nodeName ) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display && display !== "none" || !hidden ) {
				jQuery._data(
					elem,
					"olddisplay",
					hidden ? display : jQuery.css( elem, "display" )
				);
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?

		// If we already have the right measurement, avoid augmentation
		4 :

		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {

		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {

			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {

			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = support.boxSizing &&
			jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// Support: IE11 only
	// In IE 11 fullscreen elements inside of an iframe have
	// 100x too small dimensions (gh-1764).
	if ( document.msFullscreenElement && window.top !== window ) {

		// Support: IE11 only
		// Running getBoundingClientRect on a disconnected node
		// in IE throws an error.
		if ( elem.getClientRects().length ) {
			val = Math.round( elem.getBoundingClientRect()[ name ] * 100 );
		}
	}

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {

		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test( val ) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox &&
			( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {

		// normalize float css property
		"float": support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set. See: #7116
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			if ( type === "number" ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
			// but it would mean to define eight
			// (for every problematic property) identical functions
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				// Support: IE
				// Swallow errors from 'invalid' CSS values (#5509)
				try {
					style[ name ] = value;
				} catch ( e ) {}
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var num, val, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}
		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&
					elem.offsetWidth === 0 ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, name, extra );
						} ) :
						getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					support.boxSizing &&
						jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
} );

if ( !support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {

			// IE uses filters for opacity
			return ropacity.test( ( computed && elem.currentStyle ?
				elem.currentStyle.filter :
				elem.style.filter ) || "" ) ?
					( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
					computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist -
			// attempt to remove filter attribute #6652
			// if value === "", then remove inline opacity #12685
			if ( ( value >= 1 || value === "" ) &&
					jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
					style.removeAttribute ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there is no filter style applied in a css rule
				// or unset inline opacity, we are done
				if ( value === "" || currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			return swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return (
				parseFloat( curCSS( elem, "marginLeft" ) ) ||

				// Support: IE<=11+
				// Running getBoundingClientRect on a disconnected node in IE throws an error
				// Support: IE8 only
				// getClientRects() errors on disconnected elems
				( jQuery.contains( elem.ownerDocument, elem ) ?
					elem.getBoundingClientRect().left -
						swap( elem, { marginLeft: 0 }, function() {
							return elem.getBoundingClientRect().left;
						} ) :
					0
				)
			) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 &&
				( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
					jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// we're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = jQuery._data( elem, "fxshow" );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {

		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			jQuery._data( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !support.inlineBlockNeedsLayout || defaultDisplay( elem.nodeName ) === "inline" ) {
				style.display = "inline-block";
			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !support.shrinkWrapBlocks() ) {
			anim.always( function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			} );
		}
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show
				// and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = jQuery._data( elem, "fxshow", {} );
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done( function() {
				jQuery( elem ).hide();
			} );
		}
		anim.done( function() {
			var prop;
			jQuery._removeData( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		} );
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( ( display === "none" ? defaultDisplay( elem.nodeName ) : display ) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( jQuery.isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					jQuery.proxy( result.stop, result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnotwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ?
			jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || jQuery._data( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = jQuery._data( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = jQuery._data( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = window.setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	window.clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var a,
		input = document.createElement( "input" ),
		div = document.createElement( "div" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	// Setup
	div = document.createElement( "div" );
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName( "a" )[ 0 ];

	// Support: Windows Web Apps (WWA)
	// `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "checkbox" );
	div.appendChild( input );

	a = div.getElementsByTagName( "a" )[ 0 ];

	// First batch of tests.
	a.style.cssText = "top:1px";

	// Test setAttribute on camelCase class.
	// If it works, we need attrFixes when doing get/setAttribute (ie6/7)
	support.getSetAttribute = div.className !== "t";

	// Get the style information from getAttribute
	// (IE uses .cssText instead)
	support.style = /top/.test( a.getAttribute( "style" ) );

	// Make sure that URLs aren't manipulated
	// (IE normalizes it by default)
	support.hrefNormalized = a.getAttribute( "href" ) === "/a";

	// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
	support.checkOn = !!input.value;

	// Make sure that a selected-by-default option has a working selected property.
	// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
	support.optSelected = opt.selected;

	// Tests for enctype support on a form (#6743)
	support.enctype = !!document.createElement( "form" ).enctype;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE8 only
	// Check if we can trust getAttribute("value")
	input = document.createElement( "input" );
	input.setAttribute( "value", "" );
	support.input = input.getAttribute( "value" ) === "";

	// Check if an input maintains its value after becoming a radio
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";
} )();


var rreturn = /\r/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if (
					hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?

					// handle most common string cases
					ret.replace( rreturn, "" ) :

					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					jQuery.trim( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// oldIE doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ?
								!option.disabled :
								option.getAttribute( "disabled" ) === null ) &&
							( !option.parentNode.disabled ||
								!jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					if ( jQuery.inArray( jQuery.valHooks.option.get( option ), values ) >= 0 ) {

						// Support: IE6
						// When new option element is added to select box we need to
						// force reflow of newly added node in order to workaround delay
						// of initialization properties
						try {
							option.selected = optionSet = true;

						} catch ( _ ) {

							// Will be executed only in IE6
							option.scrollHeight;
						}

					} else {
						option.selected = false;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}

				return options;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle,
	ruseDefault = /^(?:checked|selected)$/i,
	getSetAttribute = support.getSetAttribute,
	getSetInput = support.input;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					jQuery.nodeName( elem, "input" ) ) {

					// Setting the type on a radio button after the value resets the value in IE8-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {

					// Set corresponding property to false
					if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
						elem[ propName ] = false;

					// Support: IE<9
					// Also clear defaultChecked/defaultSelected (if appropriate)
					} else {
						elem[ jQuery.camelCase( "default-" + name ) ] =
							elem[ propName ] = false;
					}

				// See #9699 for explanation of this approach (setting first, then removal)
				} else {
					jQuery.attr( elem, name, "" );
				}

				elem.removeAttribute( getSetAttribute ? name : propName );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {

			// IE<8 needs the *property* name
			elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );

		} else {

			// Support: IE<9
			// Use defaultChecked and defaultSelected for oldIE
			elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
		attrHandle[ name ] = function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {

				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		};
	} else {
		attrHandle[ name ] = function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem[ jQuery.camelCase( "default-" + name ) ] ?
					name.toLowerCase() :
					null;
			}
		};
	}
} );

// fix oldIE attroperties
if ( !getSetInput || !getSetAttribute ) {
	jQuery.attrHooks.value = {
		set: function( elem, value, name ) {
			if ( jQuery.nodeName( elem, "input" ) ) {

				// Does not return so that setAttribute is also used
				elem.defaultValue = value;
			} else {

				// Use nodeHook if defined (#1954); otherwise setAttribute is fine
				return nodeHook && nodeHook.set( elem, value, name );
			}
		}
	};
}

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = {
		set: function( elem, value, name ) {

			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				elem.setAttributeNode(
					( ret = elem.ownerDocument.createAttribute( name ) )
				);
			}

			ret.value = value += "";

			// Break association with cloned elements by also using setAttribute (#9646)
			if ( name === "value" || value === elem.getAttribute( name ) ) {
				return value;
			}
		}
	};

	// Some attributes are constructed with empty-string values when not defined
	attrHandle.id = attrHandle.name = attrHandle.coords =
		function( elem, name, isXML ) {
			var ret;
			if ( !isXML ) {
				return ( ret = elem.getAttributeNode( name ) ) && ret.value !== "" ?
					ret.value :
					null;
			}
		};

	// Fixing value retrieval on a button requires this module
	jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			if ( ret && ret.specified ) {
				return ret.value;
			}
		},
		set: nodeHook.set
	};

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		set: function( elem, value, name ) {
			nodeHook.set( elem, value === "" ? false : value, name );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each( [ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		};
	} );
}

if ( !support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {

			// Return undefined in the case of empty string
			// Note: IE uppercases css property names, but if we were to .toLowerCase()
			// .cssText, that would destroy case sensitivity in URL's, like in "background"
			return elem.style.cssText || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = value + "" );
		}
	};
}




var rfocusable = /^(?:input|select|textarea|button|object)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each( function() {

			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch ( e ) {}
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) ||
						rclickable.test( elem.nodeName ) && elem.href ?
							0 :
							-1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !support.hrefNormalized ) {

	// href/src property should get the full normalized URL (#10299/#12915)
	jQuery.each( [ "href", "src" ], function( i, name ) {
		jQuery.propHooks[ name ] = {
			get: function( elem ) {
				return elem.getAttribute( name, 4 );
			}
		};
	} );
}

// Support: Safari, IE9+
// mis-reports the default selected property of an option
// Accessing the parent's selectedIndex property fixes it
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );

// IE6/7 call enctype encoding
if ( !support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}




var rclass = /[\t\r\n\f]/g;

function getClass( elem ) {
	return jQuery.attr( elem, "class" ) || "";
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						jQuery.attr( elem, "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						jQuery.attr( elem, "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( type === "string" ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = value.match( rnotwhite ) || [];

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// store className if set
					jQuery._data( this, "__className__", className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				jQuery.attr( this, "class",
					className || value === false ?
					"" :
					jQuery._data( this, "__className__" ) || ""
				);
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + getClass( elem ) + " " ).replace( rclass, " " )
					.indexOf( className ) > -1
			) {
				return true;
			}
		}

		return false;
	}
} );




// Return jQuery for attributes-only inclusion


jQuery.each( ( "blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu" ).split( " " ),
	function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
} );

jQuery.fn.extend( {
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );


var location = window.location;

var nonce = jQuery.now();

var rquery = ( /\?/ );



var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;

jQuery.parseJSON = function( data ) {

	// Attempt to parse using the native JSON parser first
	if ( window.JSON && window.JSON.parse ) {

		// Support: Android 2.3
		// Workaround failure to string-cast null input
		return window.JSON.parse( data + "" );
	}

	var requireNonComma,
		depth = null,
		str = jQuery.trim( data + "" );

	// Guard against invalid (and possibly dangerous) input by ensuring that nothing remains
	// after removing valid tokens
	return str && !jQuery.trim( str.replace( rvalidtokens, function( token, comma, open, close ) {

		// Force termination if we see a misplaced comma
		if ( requireNonComma && comma ) {
			depth = 0;
		}

		// Perform no more replacements after returning to outermost depth
		if ( depth === 0 ) {
			return token;
		}

		// Commas must not follow "[", "{", or ","
		requireNonComma = open || comma;

		// Determine new depth
		// array/object open ("[" or "{"): depth += true - false (increment)
		// array/object close ("]" or "}"): depth += false - true (decrement)
		// other cases ("," or primitive): depth += true - true (numeric cast)
		depth += !close - !open;

		// Remove this token
		return "";
	} ) ) ?
		( Function( "return " + str ) )() :
		jQuery.error( "Invalid JSON: " + data );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	try {
		if ( window.DOMParser ) { // Standard
			tmp = new window.DOMParser();
			xml = tmp.parseFromString( data, "text/xml" );
		} else { // IE
			xml = new window.ActiveXObject( "Microsoft.XMLDOM" );
			xml.async = "false";
			xml.loadXML( data );
		}
	} catch ( e ) {
		xml = undefined;
	}
	if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,

	// IE leaves an \r character at EOL
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Document location
	ajaxLocation = location.href,

	// Segment location into parts
	ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType.charAt( 0 ) === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var deep, key,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {
	var firstDataType, ct, finalDataType, type,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) { // jscs:ignore requireDotNotation
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var

			// Cross-domain detection vars
			parts,

			// Loop variable
			i,

			// URL without anti-cache param
			cacheURL,

			// Response headers as string
			responseHeadersString,

			// timeout handle
			timeoutTimer,

			// To know if global events are to be dispatched
			fireGlobals,

			transport,

			// Response headers
			responseHeaders,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// The jqXHR state
			state = 0,

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {

								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" )
			.replace( rhash, "" )
			.replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( state === 2 ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );

				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );


jQuery._evalUrl = function( url ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,
		"throws": true
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapAll( html.call( this, i ) );
			} );
		}

		if ( this[ 0 ] ) {

			// The elements to wrap the target around
			var wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function() {
		return this.parent().each( function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		} ).end();
	}
} );


function getDisplay( elem ) {
	return elem.style && elem.style.display || jQuery.css( elem, "display" );
}

function filterHidden( elem ) {
	while ( elem && elem.nodeType === 1 ) {
		if ( getDisplay( elem ) === "none" || elem.type === "hidden" ) {
			return true;
		}
		elem = elem.parentNode;
	}
	return false;
}

jQuery.expr.filters.hidden = function( elem ) {

	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return support.reliableHiddenOffsets() ?
		( elem.offsetWidth <= 0 && elem.offsetHeight <= 0 &&
			!elem.getClientRects().length ) :
			filterHidden( elem );
};

jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {

			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is(":disabled") so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					} ) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ?

	// Support: IE6-IE8
	function() {

		// XHR cannot access local files, always use ActiveX for that case
		if ( this.isLocal ) {
			return createActiveXHR();
		}

		// Support: IE 9-11
		// IE seems to error on cross-domain PATCH requests when ActiveX XHR
		// is used. In IE 9+ always use the native XHR.
		// Note: this condition won't catch Edge as it doesn't define
		// document.documentMode but it also doesn't support ActiveX so it won't
		// reach this code.
		if ( document.documentMode > 8 ) {
			return createStandardXHR();
		}

		// Support: IE<9
		// oldIE XHR does not support non-RFC2616 methods (#13240)
		// See http://msdn.microsoft.com/en-us/library/ie/ms536648(v=vs.85).aspx
		// and http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9
		// Although this check for six methods instead of eight
		// since IE also does not support "trace" and "connect"
		return /^(get|post|head|put|delete|options)$/i.test( this.type ) &&
			createStandardXHR() || createActiveXHR();
	} :

	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

var xhrId = 0,
	xhrCallbacks = {},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE<10
// Open requests must be manually aborted on unload (#5280)
// See https://support.microsoft.com/kb/2856746 for more info
if ( window.attachEvent ) {
	window.attachEvent( "onunload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]( undefined, true );
		}
	} );
}

// Determine support properties
support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
xhrSupported = support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
if ( xhrSupported ) {

	jQuery.ajaxTransport( function( options ) {

		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !options.crossDomain || support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr(),
						id = ++xhrId;

					// Open the socket
					xhr.open(
						options.type,
						options.url,
						options.async,
						options.username,
						options.password
					);

					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
						headers[ "X-Requested-With" ] = "XMLHttpRequest";
					}

					// Set headers
					for ( i in headers ) {

						// Support: IE<9
						// IE's ActiveXObject throws a 'Type Mismatch' exception when setting
						// request header to a null-value.
						//
						// To keep consistent with other XHR implementations, cast the value
						// to string and ignore `undefined`.
						if ( headers[ i ] !== undefined ) {
							xhr.setRequestHeader( i, headers[ i ] + "" );
						}
					}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( options.hasContent && options.data ) || null );

					// Listener
					callback = function( _, isAbort ) {
						var status, statusText, responses;

						// Was never called and is aborted or complete
						if ( callback && ( isAbort || xhr.readyState === 4 ) ) {

							// Clean up
							delete xhrCallbacks[ id ];
							callback = undefined;
							xhr.onreadystatechange = jQuery.noop;

							// Abort manually if needed
							if ( isAbort ) {
								if ( xhr.readyState !== 4 ) {
									xhr.abort();
								}
							} else {
								responses = {};
								status = xhr.status;

								// Support: IE<10
								// Accessing binary-data responseText throws an exception
								// (#11426)
								if ( typeof xhr.responseText === "string" ) {
									responses.text = xhr.responseText;
								}

								// Firefox throws an exception when accessing
								// statusText for faulty cross-domain requests
								try {
									statusText = xhr.statusText;
								} catch ( e ) {

									// We normalize with Webkit giving an empty statusText
									statusText = "";
								}

								// Filter status for non standard behaviors

								// If the request is local and we have data: assume a success
								// (success with no data won't get notified, that's the best we
								// can do given current implementations)
								if ( !status && options.isLocal && !options.crossDomain ) {
									status = responses.text ? 200 : 404;

								// IE - #1450: sometimes returns 1223 when it should be 204
								} else if ( status === 1223 ) {
									status = 204;
								}
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, xhr.getAllResponseHeaders() );
						}
					};

					// Do send the request
					// `xhr.send` may raise an exception, but it will be
					// handled in jQuery.ajax (so no try/catch here)
					if ( !options.async ) {

						// If we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {

						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						window.setTimeout( callback );
					} else {

						// Register the callback, but delay it in case `xhr.send` throws
						// Add to the list of active xhr callbacks
						xhr.onreadystatechange = xhrCallbacks[ id ] = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback( undefined, true );
					}
				}
			};
		}
	} );
}

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject( "Microsoft.XMLHTTP" );
	} catch ( e ) {}
}




// Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
jQuery.ajaxPrefilter( function( s ) {
	if ( s.crossDomain ) {
		s.contents.script = false;
	}
} );

// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || jQuery( "head" )[ 0 ] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement( "script" );

				script.async = true;

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( script.parentNode ) {
							script.parentNode.removeChild( script );
						}

						// Dereference the script
						script = null;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};

				// Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
				// Use native DOM manipulation to avoid our domManip AJAX trickery
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( undefined, true );
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// Support: Safari 8+
// In Safari 8 documents created via document.implementation.createHTMLDocument
// collapse sibling forms: the second one becomes a child of the first one.
// Because of that, this security measure has to be disabled in Safari 8.
// https://bugs.webkit.org/show_bug.cgi?id=137337
support.createHTMLDocument = ( function() {
	if ( !document.implementation.createHTMLDocument ) {
		return false;
	}
	var doc = document.implementation.createHTMLDocument( "" );
	doc.body.innerHTML = "<form></form><form></form>";
	return doc.body.childNodes.length === 2;
} )();


// data: string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}

	// document.implementation stops scripts or inline event handlers from
	// being executed immediately
	context = context || ( support.createHTMLDocument ?
		document.implementation.createHTMLDocument( "" ) :
		document );

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = jQuery.trim( url.slice( off, url.length ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( self, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};





/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			jQuery.inArray( "auto", [ curCSSTop, curCSSLeft ] ) > -1;

		// need to be able to calculate position if either top or left
		// is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var docElem, win,
			box = { top: 0, left: 0 },
			elem = this[ 0 ],
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// If we don't have gBCR, just use 0,0 rather than error
		// BlackBerry 5, iOS 3 (original iPhone)
		if ( typeof elem.getBoundingClientRect !== "undefined" ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
			left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			parentOffset = { top: 0, left: 0 },
			elem = this[ 0 ];

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
		// because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// we assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();
		} else {

			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			// Subtract offsetParent scroll positions
			parentOffset.top += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true ) -
				offsetParent.scrollTop();
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true ) -
				offsetParent.scrollLeft();
		}

		// Subtract parent offsets and element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		return {
			top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) &&
				jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? ( prop in win ) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
} );

// Support: Safari<7-8+, Chrome<37-44+
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// getComputedStyle returns percent when specified for top/left/bottom/right
// rather than make the css module depend on the offset module, we just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// if curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
	function( defaultExtra, funcName ) {

		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {

					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only,
					// but there is currently no good, small way to fix it.
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	} );
} );


jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	}
} );

// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	} );
}



var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}

return jQuery;
}));
!function($){var apiParams={set:{colors:1,values:1,backgroundColor:1,scaleColors:1,normalizeFunction:1,focus:1},get:{selectedRegions:1,selectedMarkers:1,mapObject:1,regionName:1}};$.fn.vectorMap=function(options){var map,methodName,map=this.children(".jvectormap-container").data("mapObject");if("addMap"===options)jvm.Map.maps[arguments[1]]=arguments[2];else{if(("set"===options||"get"===options)&&apiParams[options][arguments[1]])return methodName=arguments[1].charAt(0).toUpperCase()+arguments[1].substr(1),map[options+methodName].apply(map,Array.prototype.slice.call(arguments,2));options=options||{},options.container=this,map=new jvm.Map(options)}return this}}(jQuery),function(factory){"function"==typeof define&&define.amd?define(["jquery"],factory):"object"==typeof exports?module.exports=factory:factory(jQuery)}(function($){function handler(event){var orgEvent=event||window.event,args=slice.call(arguments,1),delta=0,deltaX=0,deltaY=0,absDelta=0;if(event=$.event.fix(orgEvent),event.type="mousewheel","detail"in orgEvent&&(deltaY=-1*orgEvent.detail),"wheelDelta"in orgEvent&&(deltaY=orgEvent.wheelDelta),"wheelDeltaY"in orgEvent&&(deltaY=orgEvent.wheelDeltaY),"wheelDeltaX"in orgEvent&&(deltaX=-1*orgEvent.wheelDeltaX),"axis"in orgEvent&&orgEvent.axis===orgEvent.HORIZONTAL_AXIS&&(deltaX=-1*deltaY,deltaY=0),delta=0===deltaY?deltaX:deltaY,"deltaY"in orgEvent&&(deltaY=-1*orgEvent.deltaY,delta=deltaY),"deltaX"in orgEvent&&(deltaX=orgEvent.deltaX,0===deltaY&&(delta=-1*deltaX)),0!==deltaY||0!==deltaX){if(1===orgEvent.deltaMode){var lineHeight=$.data(this,"mousewheel-line-height");delta*=lineHeight,deltaY*=lineHeight,deltaX*=lineHeight}else if(2===orgEvent.deltaMode){var pageHeight=$.data(this,"mousewheel-page-height");delta*=pageHeight,deltaY*=pageHeight,deltaX*=pageHeight}return absDelta=Math.max(Math.abs(deltaY),Math.abs(deltaX)),(!lowestDelta||lowestDelta>absDelta)&&(lowestDelta=absDelta,shouldAdjustOldDeltas(orgEvent,absDelta)&&(lowestDelta/=40)),shouldAdjustOldDeltas(orgEvent,absDelta)&&(delta/=40,deltaX/=40,deltaY/=40),delta=Math[delta>=1?"floor":"ceil"](delta/lowestDelta),deltaX=Math[deltaX>=1?"floor":"ceil"](deltaX/lowestDelta),deltaY=Math[deltaY>=1?"floor":"ceil"](deltaY/lowestDelta),event.deltaX=deltaX,event.deltaY=deltaY,event.deltaFactor=lowestDelta,event.deltaMode=0,args.unshift(event,delta,deltaX,deltaY),nullLowestDeltaTimeout&&clearTimeout(nullLowestDeltaTimeout),nullLowestDeltaTimeout=setTimeout(nullLowestDelta,200),($.event.dispatch||$.event.handle).apply(this,args)}}function nullLowestDelta(){lowestDelta=null}function shouldAdjustOldDeltas(orgEvent,absDelta){return special.settings.adjustOldDeltas&&"mousewheel"===orgEvent.type&&absDelta%120===0}var nullLowestDeltaTimeout,lowestDelta,toFix=["wheel","mousewheel","DOMMouseScroll","MozMousePixelScroll"],toBind="onwheel"in document||document.documentMode>=9?["wheel"]:["mousewheel","DomMouseScroll","MozMousePixelScroll"],slice=Array.prototype.slice;if($.event.fixHooks)for(var i=toFix.length;i;)$.event.fixHooks[toFix[--i]]=$.event.mouseHooks;var special=$.event.special.mousewheel={version:"3.1.9",setup:function(){if(this.addEventListener)for(var i=toBind.length;i;)this.addEventListener(toBind[--i],handler,!1);else this.onmousewheel=handler;$.data(this,"mousewheel-line-height",special.getLineHeight(this)),$.data(this,"mousewheel-page-height",special.getPageHeight(this))},teardown:function(){if(this.removeEventListener)for(var i=toBind.length;i;)this.removeEventListener(toBind[--i],handler,!1);else this.onmousewheel=null},getLineHeight:function(elem){return parseInt($(elem)["offsetParent"in $.fn?"offsetParent":"parent"]().css("fontSize"),10)},getPageHeight:function(elem){return $(elem).height()},settings:{adjustOldDeltas:!0}};$.fn.extend({mousewheel:function(fn){return fn?this.bind("mousewheel",fn):this.trigger("mousewheel")},unmousewheel:function(fn){return this.unbind("mousewheel",fn)}})});var jvm={inherits:function(child,parent){function temp(){}temp.prototype=parent.prototype,child.prototype=new temp,child.prototype.constructor=child,child.parentClass=parent},mixin:function(target,source){var prop;for(prop in source.prototype)source.prototype.hasOwnProperty(prop)&&(target.prototype[prop]=source.prototype[prop])},min:function(values){var i,min=Number.MAX_VALUE;if(values instanceof Array)for(i=0;i<values.length;i++)values[i]<min&&(min=values[i]);else for(i in values)values[i]<min&&(min=values[i]);return min},max:function(values){var i,max=Number.MIN_VALUE;if(values instanceof Array)for(i=0;i<values.length;i++)values[i]>max&&(max=values[i]);else for(i in values)values[i]>max&&(max=values[i]);return max},keys:function(object){var key,keys=[];for(key in object)keys.push(key);return keys},values:function(object){var key,i,values=[];for(i=0;i<arguments.length;i++){object=arguments[i];for(key in object)values.push(object[key])}return values},whenImageLoaded:function(url){var deferred=new jvm.$.Deferred,img=jvm.$("<img/>");return img.error(function(){deferred.reject()}).load(function(){deferred.resolve(img)}),img.attr("src",url),deferred},isImageUrl:function(s){return/\.\w{3,4}$/.test(s)}};jvm.$=jQuery,Array.prototype.indexOf||(Array.prototype.indexOf=function(searchElement,fromIndex){var k;if(null==this)throw new TypeError('"this" is null or not defined');var O=Object(this),len=O.length>>>0;if(0===len)return-1;var n=+fromIndex||0;if(1/0===Math.abs(n)&&(n=0),n>=len)return-1;for(k=Math.max(n>=0?n:len-Math.abs(n),0);len>k;){if(k in O&&O[k]===searchElement)return k;k++}return-1}),jvm.AbstractElement=function(name,config){this.node=this.createElement(name),this.name=name,this.properties={},config&&this.set(config)},jvm.AbstractElement.prototype.set=function(property,value){var key;if("object"==typeof property)for(key in property)this.properties[key]=property[key],this.applyAttr(key,property[key]);else this.properties[property]=value,this.applyAttr(property,value)},jvm.AbstractElement.prototype.get=function(property){return this.properties[property]},jvm.AbstractElement.prototype.applyAttr=function(property,value){this.node.setAttribute(property,value)},jvm.AbstractElement.prototype.remove=function(){jvm.$(this.node).remove()},jvm.AbstractCanvasElement=function(container,width,height){this.container=container,this.setSize(width,height),this.rootElement=new jvm[this.classPrefix+"GroupElement"],this.node.appendChild(this.rootElement.node),this.container.appendChild(this.node)},jvm.AbstractCanvasElement.prototype.add=function(element,group){group=group||this.rootElement,group.add(element),element.canvas=this},jvm.AbstractCanvasElement.prototype.addPath=function(config,style,group){var el=new jvm[this.classPrefix+"PathElement"](config,style);return this.add(el,group),el},jvm.AbstractCanvasElement.prototype.addCircle=function(config,style,group){var el=new jvm[this.classPrefix+"CircleElement"](config,style);return this.add(el,group),el},jvm.AbstractCanvasElement.prototype.addImage=function(config,style,group){var el=new jvm[this.classPrefix+"ImageElement"](config,style);return this.add(el,group),el},jvm.AbstractCanvasElement.prototype.addText=function(config,style,group){var el=new jvm[this.classPrefix+"TextElement"](config,style);return this.add(el,group),el},jvm.AbstractCanvasElement.prototype.addGroup=function(parentGroup){var el=new jvm[this.classPrefix+"GroupElement"];return parentGroup?parentGroup.node.appendChild(el.node):this.node.appendChild(el.node),el.canvas=this,el},jvm.AbstractShapeElement=function(name,config,style){this.style=style||{},this.style.current=this.style.current||{},this.isHovered=!1,this.isSelected=!1,this.updateStyle()},jvm.AbstractShapeElement.prototype.setStyle=function(property,value){var styles={};"object"==typeof property?styles=property:styles[property]=value,jvm.$.extend(this.style.current,styles),this.updateStyle()},jvm.AbstractShapeElement.prototype.updateStyle=function(){var attrs={};jvm.AbstractShapeElement.mergeStyles(attrs,this.style.initial),jvm.AbstractShapeElement.mergeStyles(attrs,this.style.current),this.isHovered&&jvm.AbstractShapeElement.mergeStyles(attrs,this.style.hover),this.isSelected&&(jvm.AbstractShapeElement.mergeStyles(attrs,this.style.selected),this.isHovered&&jvm.AbstractShapeElement.mergeStyles(attrs,this.style.selectedHover)),this.set(attrs)},jvm.AbstractShapeElement.mergeStyles=function(styles,newStyles){var key;newStyles=newStyles||{};for(key in newStyles)null===newStyles[key]?delete styles[key]:styles[key]=newStyles[key]},jvm.SVGElement=function(){jvm.SVGElement.parentClass.apply(this,arguments)},jvm.inherits(jvm.SVGElement,jvm.AbstractElement),jvm.SVGElement.svgns="http://www.w3.org/2000/svg",jvm.SVGElement.prototype.createElement=function(tagName){return document.createElementNS(jvm.SVGElement.svgns,tagName)},jvm.SVGElement.prototype.addClass=function(className){this.node.setAttribute("class",className)},jvm.SVGElement.prototype.getElementCtr=function(ctr){return jvm["SVG"+ctr]},jvm.SVGElement.prototype.getBBox=function(){return this.node.getBBox()},jvm.SVGGroupElement=function(){jvm.SVGGroupElement.parentClass.call(this,"g")},jvm.inherits(jvm.SVGGroupElement,jvm.SVGElement),jvm.SVGGroupElement.prototype.add=function(element){this.node.appendChild(element.node)},jvm.SVGCanvasElement=function(){this.classPrefix="SVG",jvm.SVGCanvasElement.parentClass.call(this,"svg"),this.defsElement=new jvm.SVGElement("defs"),this.node.appendChild(this.defsElement.node),jvm.AbstractCanvasElement.apply(this,arguments)},jvm.inherits(jvm.SVGCanvasElement,jvm.SVGElement),jvm.mixin(jvm.SVGCanvasElement,jvm.AbstractCanvasElement),jvm.SVGCanvasElement.prototype.setSize=function(width,height){this.width=width,this.height=height,this.node.setAttribute("width",width),this.node.setAttribute("height",height)},jvm.SVGCanvasElement.prototype.applyTransformParams=function(scale,transX,transY){this.scale=scale,this.transX=transX,this.transY=transY,this.rootElement.node.setAttribute("transform","scale("+scale+") translate("+transX+", "+transY+")")},jvm.SVGShapeElement=function(name,config){jvm.SVGShapeElement.parentClass.call(this,name,config),jvm.AbstractShapeElement.apply(this,arguments)},jvm.inherits(jvm.SVGShapeElement,jvm.SVGElement),jvm.mixin(jvm.SVGShapeElement,jvm.AbstractShapeElement),jvm.SVGShapeElement.prototype.applyAttr=function(attr,value){var patternEl,imageEl,that=this;"fill"===attr&&jvm.isImageUrl(value)?jvm.SVGShapeElement.images[value]?this.applyAttr("fill","url(#image"+jvm.SVGShapeElement.images[value]+")"):jvm.whenImageLoaded(value).then(function(img){imageEl=new jvm.SVGElement("image"),imageEl.node.setAttributeNS("http://www.w3.org/1999/xlink","href",value),imageEl.applyAttr("x","0"),imageEl.applyAttr("y","0"),imageEl.applyAttr("width",img[0].width),imageEl.applyAttr("height",img[0].height),patternEl=new jvm.SVGElement("pattern"),patternEl.applyAttr("id","image"+jvm.SVGShapeElement.imageCounter),patternEl.applyAttr("x",0),patternEl.applyAttr("y",0),patternEl.applyAttr("width",img[0].width/2),patternEl.applyAttr("height",img[0].height/2),patternEl.applyAttr("viewBox","0 0 "+img[0].width+" "+img[0].height),patternEl.applyAttr("patternUnits","userSpaceOnUse"),patternEl.node.appendChild(imageEl.node),that.canvas.defsElement.node.appendChild(patternEl.node),jvm.SVGShapeElement.images[value]=jvm.SVGShapeElement.imageCounter++,that.applyAttr("fill","url(#image"+jvm.SVGShapeElement.images[value]+")")}):jvm.SVGShapeElement.parentClass.prototype.applyAttr.apply(this,arguments)},jvm.SVGShapeElement.imageCounter=1,jvm.SVGShapeElement.images={},jvm.SVGPathElement=function(config,style){jvm.SVGPathElement.parentClass.call(this,"path",config,style),this.node.setAttribute("fill-rule","evenodd")},jvm.inherits(jvm.SVGPathElement,jvm.SVGShapeElement),jvm.SVGCircleElement=function(config,style){jvm.SVGCircleElement.parentClass.call(this,"circle",config,style)},jvm.inherits(jvm.SVGCircleElement,jvm.SVGShapeElement),jvm.SVGImageElement=function(config,style){jvm.SVGImageElement.parentClass.call(this,"image",config,style)},jvm.inherits(jvm.SVGImageElement,jvm.SVGShapeElement),jvm.SVGImageElement.prototype.applyAttr=function(attr,value){var that=this;"image"==attr?jvm.whenImageLoaded(value).then(function(img){that.node.setAttributeNS("http://www.w3.org/1999/xlink","href",value),that.width=img[0].width,that.height=img[0].height,that.applyAttr("width",that.width),that.applyAttr("height",that.height),that.applyAttr("x",that.cx-that.width/2),that.applyAttr("y",that.cy-that.height/2),jvm.$(that.node).trigger("imageloaded",[img])}):"cx"==attr?(this.cx=value,this.width&&this.applyAttr("x",value-this.width/2)):"cy"==attr?(this.cy=value,this.height&&this.applyAttr("y",value-this.height/2)):jvm.SVGImageElement.parentClass.prototype.applyAttr.apply(this,arguments)},jvm.SVGTextElement=function(config,style){jvm.SVGTextElement.parentClass.call(this,"text",config,style)},jvm.inherits(jvm.SVGTextElement,jvm.SVGShapeElement),jvm.SVGTextElement.prototype.applyAttr=function(attr,value){"text"===attr?this.node.textContent=value:jvm.SVGTextElement.parentClass.prototype.applyAttr.apply(this,arguments)},jvm.VMLElement=function(){jvm.VMLElement.VMLInitialized||jvm.VMLElement.initializeVML(),jvm.VMLElement.parentClass.apply(this,arguments)},jvm.inherits(jvm.VMLElement,jvm.AbstractElement),jvm.VMLElement.VMLInitialized=!1,jvm.VMLElement.initializeVML=function(){try{document.namespaces.rvml||document.namespaces.add("rvml","urn:schemas-microsoft-com:vml"),jvm.VMLElement.prototype.createElement=function(tagName){return document.createElement("<rvml:"+tagName+' class="rvml">')}}catch(e){jvm.VMLElement.prototype.createElement=function(tagName){return document.createElement("<"+tagName+' xmlns="urn:schemas-microsoft.com:vml" class="rvml">')}}document.createStyleSheet().addRule(".rvml","behavior:url(#default#VML)"),jvm.VMLElement.VMLInitialized=!0},jvm.VMLElement.prototype.getElementCtr=function(ctr){return jvm["VML"+ctr]},jvm.VMLElement.prototype.addClass=function(className){jvm.$(this.node).addClass(className)},jvm.VMLElement.prototype.applyAttr=function(attr,value){this.node[attr]=value},jvm.VMLElement.prototype.getBBox=function(){var node=jvm.$(this.node);return{x:node.position().left/this.canvas.scale,y:node.position().top/this.canvas.scale,width:node.width()/this.canvas.scale,height:node.height()/this.canvas.scale}},jvm.VMLGroupElement=function(){jvm.VMLGroupElement.parentClass.call(this,"group"),this.node.style.left="0px",this.node.style.top="0px",this.node.coordorigin="0 0"},jvm.inherits(jvm.VMLGroupElement,jvm.VMLElement),jvm.VMLGroupElement.prototype.add=function(element){this.node.appendChild(element.node)},jvm.VMLCanvasElement=function(){this.classPrefix="VML",jvm.VMLCanvasElement.parentClass.call(this,"group"),jvm.AbstractCanvasElement.apply(this,arguments),this.node.style.position="absolute"},jvm.inherits(jvm.VMLCanvasElement,jvm.VMLElement),jvm.mixin(jvm.VMLCanvasElement,jvm.AbstractCanvasElement),jvm.VMLCanvasElement.prototype.setSize=function(width,height){var paths,groups,i,l;if(this.width=width,this.height=height,this.node.style.width=width+"px",this.node.style.height=height+"px",this.node.coordsize=width+" "+height,this.node.coordorigin="0 0",this.rootElement){for(paths=this.rootElement.node.getElementsByTagName("shape"),i=0,l=paths.length;l>i;i++)paths[i].coordsize=width+" "+height,paths[i].style.width=width+"px",paths[i].style.height=height+"px";for(groups=this.node.getElementsByTagName("group"),i=0,l=groups.length;l>i;i++)groups[i].coordsize=width+" "+height,groups[i].style.width=width+"px",groups[i].style.height=height+"px"}},jvm.VMLCanvasElement.prototype.applyTransformParams=function(scale,transX,transY){this.scale=scale,this.transX=transX,this.transY=transY,this.rootElement.node.coordorigin=this.width-transX-this.width/100+","+(this.height-transY-this.height/100),this.rootElement.node.coordsize=this.width/scale+","+this.height/scale},jvm.VMLShapeElement=function(name,config){jvm.VMLShapeElement.parentClass.call(this,name,config),this.fillElement=new jvm.VMLElement("fill"),this.strokeElement=new jvm.VMLElement("stroke"),this.node.appendChild(this.fillElement.node),this.node.appendChild(this.strokeElement.node),this.node.stroked=!1,jvm.AbstractShapeElement.apply(this,arguments)},jvm.inherits(jvm.VMLShapeElement,jvm.VMLElement),jvm.mixin(jvm.VMLShapeElement,jvm.AbstractShapeElement),jvm.VMLShapeElement.prototype.applyAttr=function(attr,value){switch(attr){case"fill":this.node.fillcolor=value;break;case"fill-opacity":this.fillElement.node.opacity=Math.round(100*value)+"%";break;case"stroke":this.node.stroked="none"===value?!1:!0,this.node.strokecolor=value;break;case"stroke-opacity":this.strokeElement.node.opacity=Math.round(100*value)+"%";break;case"stroke-width":this.node.stroked=0===parseInt(value,10)?!1:!0,this.node.strokeweight=value;break;case"d":this.node.path=jvm.VMLPathElement.pathSvgToVml(value);break;default:jvm.VMLShapeElement.parentClass.prototype.applyAttr.apply(this,arguments)}},jvm.VMLPathElement=function(config,style){var scale=new jvm.VMLElement("skew");jvm.VMLPathElement.parentClass.call(this,"shape",config,style),this.node.coordorigin="0 0",scale.node.on=!0,scale.node.matrix="0.01,0,0,0.01,0,0",scale.node.offset="0,0",this.node.appendChild(scale.node)},jvm.inherits(jvm.VMLPathElement,jvm.VMLShapeElement),jvm.VMLPathElement.prototype.applyAttr=function(attr,value){"d"===attr?this.node.path=jvm.VMLPathElement.pathSvgToVml(value):jvm.VMLShapeElement.prototype.applyAttr.call(this,attr,value)},jvm.VMLPathElement.pathSvgToVml=function(path){var ctrlx,ctrly,cx=0,cy=0;return path=path.replace(/(-?\d+)e(-?\d+)/g,"0"),path.replace(/([MmLlHhVvCcSs])\s*((?:-?\d*(?:\.\d+)?\s*,?\s*)+)/g,function(segment,letter,coords){coords=coords.replace(/(\d)-/g,"$1,-").replace(/^\s+/g,"").replace(/\s+$/g,"").replace(/\s+/g,",").split(","),coords[0]||coords.shift();for(var i=0,l=coords.length;l>i;i++)coords[i]=Math.round(100*coords[i]);switch(letter){case"m":return cx+=coords[0],cy+=coords[1],"t"+coords.join(",");case"M":return cx=coords[0],cy=coords[1],"m"+coords.join(",");case"l":return cx+=coords[0],cy+=coords[1],"r"+coords.join(",");case"L":return cx=coords[0],cy=coords[1],"l"+coords.join(",");case"h":return cx+=coords[0],"r"+coords[0]+",0";case"H":return cx=coords[0],"l"+cx+","+cy;case"v":return cy+=coords[0],"r0,"+coords[0];case"V":return cy=coords[0],"l"+cx+","+cy;case"c":return ctrlx=cx+coords[coords.length-4],ctrly=cy+coords[coords.length-3],cx+=coords[coords.length-2],cy+=coords[coords.length-1],"v"+coords.join(",");case"C":return ctrlx=coords[coords.length-4],ctrly=coords[coords.length-3],cx=coords[coords.length-2],cy=coords[coords.length-1],"c"+coords.join(",");case"s":return coords.unshift(cy-ctrly),coords.unshift(cx-ctrlx),ctrlx=cx+coords[coords.length-4],ctrly=cy+coords[coords.length-3],cx+=coords[coords.length-2],cy+=coords[coords.length-1],"v"+coords.join(",");case"S":return coords.unshift(cy+cy-ctrly),coords.unshift(cx+cx-ctrlx),ctrlx=coords[coords.length-4],ctrly=coords[coords.length-3],cx=coords[coords.length-2],cy=coords[coords.length-1],"c"+coords.join(",")}return""}).replace(/z/g,"e")},jvm.VMLCircleElement=function(config,style){jvm.VMLCircleElement.parentClass.call(this,"oval",config,style)},jvm.inherits(jvm.VMLCircleElement,jvm.VMLShapeElement),jvm.VMLCircleElement.prototype.applyAttr=function(attr,value){switch(attr){case"r":this.node.style.width=2*value+"px",this.node.style.height=2*value+"px",this.applyAttr("cx",this.get("cx")||0),this.applyAttr("cy",this.get("cy")||0);break;case"cx":if(!value)return;this.node.style.left=value-(this.get("r")||0)+"px";break;case"cy":if(!value)return;this.node.style.top=value-(this.get("r")||0)+"px";break;default:jvm.VMLCircleElement.parentClass.prototype.applyAttr.call(this,attr,value)}},jvm.VectorCanvas=function(container,width,height){return this.mode=window.SVGAngle?"svg":"vml",this.impl="svg"==this.mode?new jvm.SVGCanvasElement(container,width,height):new jvm.VMLCanvasElement(container,width,height),this.impl.mode=this.mode,this.impl},jvm.SimpleScale=function(scale){this.scale=scale},jvm.SimpleScale.prototype.getValue=function(value){return value},jvm.OrdinalScale=function(scale){this.scale=scale},jvm.OrdinalScale.prototype.getValue=function(value){return this.scale[value]},jvm.OrdinalScale.prototype.getTicks=function(){var key,ticks=[];for(key in this.scale)ticks.push({label:key,value:this.scale[key]});return ticks},jvm.NumericScale=function(scale,normalizeFunction,minValue,maxValue){this.scale=[],normalizeFunction=normalizeFunction||"linear",scale&&this.setScale(scale),normalizeFunction&&this.setNormalizeFunction(normalizeFunction),"undefined"!=typeof minValue&&this.setMin(minValue),"undefined"!=typeof maxValue&&this.setMax(maxValue)},jvm.NumericScale.prototype={setMin:function(min){this.clearMinValue=min,this.minValue="function"==typeof this.normalize?this.normalize(min):min},setMax:function(max){this.clearMaxValue=max,this.maxValue="function"==typeof this.normalize?this.normalize(max):max},setScale:function(scale){var i;for(this.scale=[],i=0;i<scale.length;i++)this.scale[i]=[scale[i]]},setNormalizeFunction:function(f){"polynomial"===f?this.normalize=function(value){return Math.pow(value,.2)}:"linear"===f?delete this.normalize:this.normalize=f,this.setMin(this.clearMinValue),this.setMax(this.clearMaxValue)},getValue:function(value){var l,c,lengthes=[],fullLength=0,i=0;for("function"==typeof this.normalize&&(value=this.normalize(value)),i=0;i<this.scale.length-1;i++)l=this.vectorLength(this.vectorSubtract(this.scale[i+1],this.scale[i])),lengthes.push(l),fullLength+=l;for(c=(this.maxValue-this.minValue)/fullLength,i=0;i<lengthes.length;i++)lengthes[i]*=c;for(i=0,value-=this.minValue;value-lengthes[i]>=0;)value-=lengthes[i],i++;return value=this.vectorToNum(i==this.scale.length-1?this.scale[i]:this.vectorAdd(this.scale[i],this.vectorMult(this.vectorSubtract(this.scale[i+1],this.scale[i]),value/lengthes[i])))},vectorToNum:function(vector){var i,num=0;for(i=0;i<vector.length;i++)num+=Math.round(vector[i])*Math.pow(256,vector.length-i-1);return num},vectorSubtract:function(vector1,vector2){var i,vector=[];for(i=0;i<vector1.length;i++)vector[i]=vector1[i]-vector2[i];return vector},vectorAdd:function(vector1,vector2){var i,vector=[];for(i=0;i<vector1.length;i++)vector[i]=vector1[i]+vector2[i];return vector},vectorMult:function(vector,num){var i,result=[];for(i=0;i<vector.length;i++)result[i]=vector[i]*num;return result},vectorLength:function(vector){var i,result=0;for(i=0;i<vector.length;i++)result+=vector[i]*vector[i];return Math.sqrt(result)},getTicks:function(){var tick,v,m=5,extent=[this.clearMinValue,this.clearMaxValue],span=extent[1]-extent[0],step=Math.pow(10,Math.floor(Math.log(span/m)/Math.LN10)),err=m/span*step,ticks=[];for(.15>=err?step*=10:.35>=err?step*=5:.75>=err&&(step*=2),extent[0]=Math.floor(extent[0]/step)*step,extent[1]=Math.ceil(extent[1]/step)*step,tick=extent[0];tick<=extent[1];)v=tick==extent[0]?this.clearMinValue:tick==extent[1]?this.clearMaxValue:tick,ticks.push({label:tick,value:this.getValue(v)}),tick+=step;return ticks}},jvm.ColorScale=function(){jvm.ColorScale.parentClass.apply(this,arguments)},jvm.inherits(jvm.ColorScale,jvm.NumericScale),jvm.ColorScale.prototype.setScale=function(scale){var i;for(i=0;i<scale.length;i++)this.scale[i]=jvm.ColorScale.rgbToArray(scale[i])},jvm.ColorScale.prototype.getValue=function(value){return jvm.ColorScale.numToRgb(jvm.ColorScale.parentClass.prototype.getValue.call(this,value))},jvm.ColorScale.arrayToRgb=function(ar){var d,i,rgb="#";for(i=0;i<ar.length;i++)d=ar[i].toString(16),rgb+=1==d.length?"0"+d:d;return rgb},jvm.ColorScale.numToRgb=function(num){for(num=num.toString(16);num.length<6;)num="0"+num;return"#"+num},jvm.ColorScale.rgbToArray=function(rgb){return rgb=rgb.substr(1),[parseInt(rgb.substr(0,2),16),parseInt(rgb.substr(2,2),16),parseInt(rgb.substr(4,2),16)]},jvm.Legend=function(params){this.params=params||{},this.map=this.params.map,this.series=this.params.series,this.body=jvm.$("<div/>"),this.body.addClass("jvectormap-legend"),this.params.cssClass&&this.body.addClass(this.params.cssClass),params.vertical?this.map.legendCntVertical.append(this.body):this.map.legendCntHorizontal.append(this.body),this.render()},jvm.Legend.prototype.render=function(){var i,tick,sample,label,ticks=this.series.scale.getTicks(),inner=jvm.$("<div/>").addClass("jvectormap-legend-inner");for(this.body.html(""),this.params.title&&this.body.append(jvm.$("<div/>").addClass("jvectormap-legend-title").html(this.params.title)),this.body.append(inner),i=0;i<ticks.length;i++){switch(tick=jvm.$("<div/>").addClass("jvectormap-legend-tick"),sample=jvm.$("<div/>").addClass("jvectormap-legend-tick-sample"),this.series.params.attribute){case"fill":jvm.isImageUrl(ticks[i].value)?sample.css("background","url("+ticks[i].value+")"):sample.css("background",ticks[i].value);break;case"stroke":sample.css("background",ticks[i].value);break;case"image":sample.css("background","url("+ticks[i].value+") no-repeat center center");break;case"r":jvm.$("<div/>").css({"border-radius":ticks[i].value,border:this.map.params.markerStyle.initial["stroke-width"]+"px "+this.map.params.markerStyle.initial.stroke+" solid",width:2*ticks[i].value+"px",height:2*ticks[i].value+"px",background:this.map.params.markerStyle.initial.fill}).appendTo(sample)}tick.append(sample),label=ticks[i].label,this.params.labelRender&&(label=this.params.labelRender(label)),tick.append(jvm.$("<div>"+label+" </div>").addClass("jvectormap-legend-tick-text")),inner.append(tick)}inner.append(jvm.$("<div/>").css("clear","both"))},jvm.DataSeries=function(params,elements,map){var scaleConstructor;params=params||{},params.attribute=params.attribute||"fill",this.elements=elements,this.params=params,this.map=map,params.attributes&&this.setAttributes(params.attributes),jvm.$.isArray(params.scale)?(scaleConstructor="fill"===params.attribute||"stroke"===params.attribute?jvm.ColorScale:jvm.NumericScale,this.scale=new scaleConstructor(params.scale,params.normalizeFunction,params.min,params.max)):this.scale=params.scale?new jvm.OrdinalScale(params.scale):new jvm.SimpleScale(params.scale),this.values=params.values||{},this.setValues(this.values),this.params.legend&&(this.legend=new jvm.Legend($.extend({map:this.map,series:this},this.params.legend)))},jvm.DataSeries.prototype={setAttributes:function(key,attr){var code,attrs=key;if("string"==typeof key)this.elements[key]&&this.elements[key].setStyle(this.params.attribute,attr);else for(code in attrs)this.elements[code]&&this.elements[code].element.setStyle(this.params.attribute,attrs[code])},setValues:function(values){var val,cc,max=-Number.MAX_VALUE,min=Number.MAX_VALUE,attrs={};if(this.scale instanceof jvm.OrdinalScale||this.scale instanceof jvm.SimpleScale)for(cc in values)attrs[cc]=values[cc]?this.scale.getValue(values[cc]):this.elements[cc].element.style.initial[this.params.attribute];else{if("undefined"==typeof this.params.min||"undefined"==typeof this.params.max)for(cc in values)val=parseFloat(values[cc]),val>max&&(max=val),min>val&&(min=val);"undefined"==typeof this.params.min?(this.scale.setMin(min),this.params.min=min):this.scale.setMin(this.params.min),"undefined"==typeof this.params.max?(this.scale.setMax(max),this.params.max=max):this.scale.setMax(this.params.max);for(cc in values)"indexOf"!=cc&&(val=parseFloat(values[cc]),attrs[cc]=isNaN(val)?this.elements[cc].element.style.initial[this.params.attribute]:this.scale.getValue(val))}this.setAttributes(attrs),jvm.$.extend(this.values,values)},clear:function(){var key,attrs={};for(key in this.values)this.elements[key]&&(attrs[key]=this.elements[key].element.shape.style.initial[this.params.attribute]);this.setAttributes(attrs),this.values={}},setScale:function(scale){this.scale.setScale(scale),this.values&&this.setValues(this.values)},setNormalizeFunction:function(f){this.scale.setNormalizeFunction(f),this.values&&this.setValues(this.values)}},jvm.Proj={degRad:180/Math.PI,radDeg:Math.PI/180,radius:6381372,sgn:function(n){return n>0?1:0>n?-1:n},mill:function(lat,lng,c){return{x:this.radius*(lng-c)*this.radDeg,y:-this.radius*Math.log(Math.tan((45+.4*lat)*this.radDeg))/.8}},mill_inv:function(x,y,c){return{lat:(2.5*Math.atan(Math.exp(.8*y/this.radius))-5*Math.PI/8)*this.degRad,lng:(c*this.radDeg+x/this.radius)*this.degRad}},merc:function(lat,lng,c){return{x:this.radius*(lng-c)*this.radDeg,y:-this.radius*Math.log(Math.tan(Math.PI/4+lat*Math.PI/360))}},merc_inv:function(x,y,c){return{lat:(2*Math.atan(Math.exp(y/this.radius))-Math.PI/2)*this.degRad,lng:(c*this.radDeg+x/this.radius)*this.degRad}},aea:function(lat,lng,c){var fi0=0,lambda0=c*this.radDeg,fi1=29.5*this.radDeg,fi2=45.5*this.radDeg,fi=lat*this.radDeg,lambda=lng*this.radDeg,n=(Math.sin(fi1)+Math.sin(fi2))/2,C=Math.cos(fi1)*Math.cos(fi1)+2*n*Math.sin(fi1),theta=n*(lambda-lambda0),ro=Math.sqrt(C-2*n*Math.sin(fi))/n,ro0=Math.sqrt(C-2*n*Math.sin(fi0))/n;return{x:ro*Math.sin(theta)*this.radius,y:-(ro0-ro*Math.cos(theta))*this.radius}},aea_inv:function(xCoord,yCoord,c){var x=xCoord/this.radius,y=yCoord/this.radius,fi0=0,lambda0=c*this.radDeg,fi1=29.5*this.radDeg,fi2=45.5*this.radDeg,n=(Math.sin(fi1)+Math.sin(fi2))/2,C=Math.cos(fi1)*Math.cos(fi1)+2*n*Math.sin(fi1),ro0=Math.sqrt(C-2*n*Math.sin(fi0))/n,ro=Math.sqrt(x*x+(ro0-y)*(ro0-y)),theta=Math.atan(x/(ro0-y));return{lat:Math.asin((C-ro*ro*n*n)/(2*n))*this.degRad,lng:(lambda0+theta/n)*this.degRad}},lcc:function(lat,lng,c){var fi0=0,lambda0=c*this.radDeg,lambda=lng*this.radDeg,fi1=33*this.radDeg,fi2=45*this.radDeg,fi=lat*this.radDeg,n=Math.log(Math.cos(fi1)*(1/Math.cos(fi2)))/Math.log(Math.tan(Math.PI/4+fi2/2)*(1/Math.tan(Math.PI/4+fi1/2))),F=Math.cos(fi1)*Math.pow(Math.tan(Math.PI/4+fi1/2),n)/n,ro=F*Math.pow(1/Math.tan(Math.PI/4+fi/2),n),ro0=F*Math.pow(1/Math.tan(Math.PI/4+fi0/2),n);return{x:ro*Math.sin(n*(lambda-lambda0))*this.radius,y:-(ro0-ro*Math.cos(n*(lambda-lambda0)))*this.radius}},lcc_inv:function(xCoord,yCoord,c){var x=xCoord/this.radius,y=yCoord/this.radius,fi0=0,lambda0=c*this.radDeg,fi1=33*this.radDeg,fi2=45*this.radDeg,n=Math.log(Math.cos(fi1)*(1/Math.cos(fi2)))/Math.log(Math.tan(Math.PI/4+fi2/2)*(1/Math.tan(Math.PI/4+fi1/2))),F=Math.cos(fi1)*Math.pow(Math.tan(Math.PI/4+fi1/2),n)/n,ro0=F*Math.pow(1/Math.tan(Math.PI/4+fi0/2),n),ro=this.sgn(n)*Math.sqrt(x*x+(ro0-y)*(ro0-y)),theta=Math.atan(x/(ro0-y));return{lat:(2*Math.atan(Math.pow(F/ro,1/n))-Math.PI/2)*this.degRad,lng:(lambda0+theta/n)*this.degRad}}},jvm.MapObject=function(){},jvm.MapObject.prototype.getLabelText=function(key){var text;return text=this.config.label?"function"==typeof this.config.label.render?this.config.label.render(key):key:null},jvm.MapObject.prototype.getLabelOffsets=function(key){var offsets;return this.config.label&&("function"==typeof this.config.label.offsets?offsets=this.config.label.offsets(key):"object"==typeof this.config.label.offsets&&(offsets=this.config.label.offsets[key])),offsets||[0,0]},jvm.MapObject.prototype.setHovered=function(isHovered){this.isHovered!==isHovered&&(this.isHovered=isHovered,this.shape.isHovered=isHovered,this.shape.updateStyle(),this.label&&(this.label.isHovered=isHovered,this.label.updateStyle()))},jvm.MapObject.prototype.setSelected=function(isSelected){this.isSelected!==isSelected&&(this.isSelected=isSelected,this.shape.isSelected=isSelected,this.shape.updateStyle(),this.label&&(this.label.isSelected=isSelected,this.label.updateStyle()),jvm.$(this.shape).trigger("selected",[isSelected]))},jvm.MapObject.prototype.setStyle=function(){this.shape.setStyle.apply(this.shape,arguments)},jvm.MapObject.prototype.remove=function(){this.shape.remove(),this.label&&this.label.remove()},jvm.Region=function(config){var bbox,text,offsets;this.config=config,this.map=this.config.map,this.shape=config.canvas.addPath({d:config.path,"data-code":config.code},config.style,config.canvas.rootElement),this.shape.addClass("jvectormap-region jvectormap-element"),bbox=this.shape.getBBox(),text=this.getLabelText(config.code),this.config.label&&text&&(offsets=this.getLabelOffsets(config.code),this.labelX=bbox.x+bbox.width/2+offsets[0],this.labelY=bbox.y+bbox.height/2+offsets[1],this.label=config.canvas.addText({text:text,"text-anchor":"middle","alignment-baseline":"central",x:this.labelX,y:this.labelY,"data-code":config.code},config.labelStyle,config.labelsGroup),this.label.addClass("jvectormap-region jvectormap-element"))
},jvm.inherits(jvm.Region,jvm.MapObject),jvm.Region.prototype.updateLabelPosition=function(){this.label&&this.label.set({x:this.labelX*this.map.scale+this.map.transX*this.map.scale,y:this.labelY*this.map.scale+this.map.transY*this.map.scale})},jvm.Marker=function(config){var text;this.config=config,this.map=this.config.map,this.isImage=!!this.config.style.initial.image,this.createShape(),text=this.getLabelText(config.index),this.config.label&&text&&(this.offsets=this.getLabelOffsets(config.index),this.labelX=config.cx/this.map.scale-this.map.transX,this.labelY=config.cy/this.map.scale-this.map.transY,this.label=config.canvas.addText({text:text,"data-index":config.index,dy:"0.6ex",x:this.labelX,y:this.labelY},config.labelStyle,config.labelsGroup),this.label.addClass("jvectormap-marker jvectormap-element"))},jvm.inherits(jvm.Marker,jvm.MapObject),jvm.Marker.prototype.createShape=function(){var that=this;this.shape&&this.shape.remove(),this.shape=this.config.canvas[this.isImage?"addImage":"addCircle"]({"data-index":this.config.index,cx:this.config.cx,cy:this.config.cy},this.config.style,this.config.group),this.shape.addClass("jvectormap-marker jvectormap-element"),this.isImage&&jvm.$(this.shape.node).on("imageloaded",function(){that.updateLabelPosition()})},jvm.Marker.prototype.updateLabelPosition=function(){this.label&&this.label.set({x:this.labelX*this.map.scale+this.offsets[0]+this.map.transX*this.map.scale+5+(this.isImage?(this.shape.width||0)/2:this.shape.properties.r),y:this.labelY*this.map.scale+this.map.transY*this.map.scale+this.offsets[1]})},jvm.Marker.prototype.setStyle=function(property){var isImage;jvm.Marker.parentClass.prototype.setStyle.apply(this,arguments),"r"===property&&this.updateLabelPosition(),isImage=!!this.shape.get("image"),isImage!=this.isImage&&(this.isImage=isImage,this.config.style=jvm.$.extend(!0,{},this.shape.style),this.createShape())},jvm.Map=function(params){var e,map=this;if(this.params=jvm.$.extend(!0,{},jvm.Map.defaultParams,params),!jvm.Map.maps[this.params.map])throw new Error("Attempt to use map which was not loaded: "+this.params.map);this.mapData=jvm.Map.maps[this.params.map],this.markers={},this.regions={},this.regionsColors={},this.regionsData={},this.container=jvm.$("<div>").addClass("jvectormap-container"),this.params.container&&this.params.container.append(this.container),this.container.data("mapObject",this),this.defaultWidth=this.mapData.width,this.defaultHeight=this.mapData.height,this.setBackgroundColor(this.params.backgroundColor),this.onResize=function(){map.updateSize()},jvm.$(window).resize(this.onResize);for(e in jvm.Map.apiEvents)this.params[e]&&this.container.bind(jvm.Map.apiEvents[e]+".jvectormap",this.params[e]);this.canvas=new jvm.VectorCanvas(this.container[0],this.width,this.height),this.params.bindTouchEvents&&("ontouchstart"in window||window.DocumentTouch&&document instanceof DocumentTouch?this.bindContainerTouchEvents():window.MSGesture&&this.bindContainerPointerEvents()),this.bindContainerEvents(),this.bindElementEvents(),this.createTip(),this.params.zoomButtons&&this.bindZoomButtons(),this.createRegions(),this.createMarkers(this.params.markers||{}),this.updateSize(),this.params.focusOn&&("string"==typeof this.params.focusOn?this.params.focusOn={region:this.params.focusOn}:jvm.$.isArray(this.params.focusOn)&&(this.params.focusOn={regions:this.params.focusOn}),this.setFocus(this.params.focusOn)),this.params.selectedRegions&&this.setSelectedRegions(this.params.selectedRegions),this.params.selectedMarkers&&this.setSelectedMarkers(this.params.selectedMarkers),this.legendCntHorizontal=jvm.$("<div/>").addClass("jvectormap-legend-cnt jvectormap-legend-cnt-h"),this.legendCntVertical=jvm.$("<div/>").addClass("jvectormap-legend-cnt jvectormap-legend-cnt-v"),this.container.append(this.legendCntHorizontal),this.container.append(this.legendCntVertical),this.params.series&&this.createSeries()},jvm.Map.prototype={transX:0,transY:0,scale:1,baseTransX:0,baseTransY:0,baseScale:1,width:0,height:0,setBackgroundColor:function(backgroundColor){this.container.css("background-color",backgroundColor)},resize:function(){var curBaseScale=this.baseScale;this.width/this.height>this.defaultWidth/this.defaultHeight?(this.baseScale=this.height/this.defaultHeight,this.baseTransX=Math.abs(this.width-this.defaultWidth*this.baseScale)/(2*this.baseScale)):(this.baseScale=this.width/this.defaultWidth,this.baseTransY=Math.abs(this.height-this.defaultHeight*this.baseScale)/(2*this.baseScale)),this.scale*=this.baseScale/curBaseScale,this.transX*=this.baseScale/curBaseScale,this.transY*=this.baseScale/curBaseScale},updateSize:function(){this.width=this.container.width(),this.height=this.container.height(),this.resize(),this.canvas.setSize(this.width,this.height),this.applyTransform()},reset:function(){var key,i;for(key in this.series)for(i=0;i<this.series[key].length;i++)this.series[key][i].clear();this.scale=this.baseScale,this.transX=this.baseTransX,this.transY=this.baseTransY,this.applyTransform()},applyTransform:function(){var maxTransX,maxTransY,minTransX,minTransY;this.defaultWidth*this.scale<=this.width?(maxTransX=(this.width-this.defaultWidth*this.scale)/(2*this.scale),minTransX=(this.width-this.defaultWidth*this.scale)/(2*this.scale)):(maxTransX=0,minTransX=(this.width-this.defaultWidth*this.scale)/this.scale),this.defaultHeight*this.scale<=this.height?(maxTransY=(this.height-this.defaultHeight*this.scale)/(2*this.scale),minTransY=(this.height-this.defaultHeight*this.scale)/(2*this.scale)):(maxTransY=0,minTransY=(this.height-this.defaultHeight*this.scale)/this.scale),this.transY>maxTransY?this.transY=maxTransY:this.transY<minTransY&&(this.transY=minTransY),this.transX>maxTransX?this.transX=maxTransX:this.transX<minTransX&&(this.transX=minTransX),this.canvas.applyTransformParams(this.scale,this.transX,this.transY),this.markers&&this.repositionMarkers(),this.repositionLabels(),this.container.trigger("viewportChange",[this.scale/this.baseScale,this.transX,this.transY])},bindContainerEvents:function(){var oldPageX,oldPageY,mouseDown=!1,map=this;this.params.panOnDrag&&(this.container.mousemove(function(e){return mouseDown&&(map.transX-=(oldPageX-e.pageX)/map.scale,map.transY-=(oldPageY-e.pageY)/map.scale,map.applyTransform(),oldPageX=e.pageX,oldPageY=e.pageY),!1}).mousedown(function(e){return mouseDown=!0,oldPageX=e.pageX,oldPageY=e.pageY,!1}),this.onContainerMouseUp=function(){mouseDown=!1},jvm.$("body").mouseup(this.onContainerMouseUp)),this.params.zoomOnScroll&&this.container.mousewheel(function(event){var offset=jvm.$(map.container).offset(),centerX=event.pageX-offset.left,centerY=event.pageY-offset.top,zoomStep=Math.pow(1+map.params.zoomOnScrollSpeed/1e3,event.deltaFactor*event.deltaY);map.tip.hide(),map.setScale(map.scale*zoomStep,centerX,centerY),event.preventDefault()})},bindContainerTouchEvents:function(){var touchStartScale,touchStartDistance,touchX,touchY,centerTouchX,centerTouchY,lastTouchesLength,map=this,handleTouchEvent=function(e){var offset,scale,transXOld,transYOld,touches=e.originalEvent.touches;"touchstart"==e.type&&(lastTouchesLength=0),1==touches.length?(1==lastTouchesLength&&(transXOld=map.transX,transYOld=map.transY,map.transX-=(touchX-touches[0].pageX)/map.scale,map.transY-=(touchY-touches[0].pageY)/map.scale,map.applyTransform(),map.tip.hide(),(transXOld!=map.transX||transYOld!=map.transY)&&e.preventDefault()),touchX=touches[0].pageX,touchY=touches[0].pageY):2==touches.length&&(2==lastTouchesLength?(scale=Math.sqrt(Math.pow(touches[0].pageX-touches[1].pageX,2)+Math.pow(touches[0].pageY-touches[1].pageY,2))/touchStartDistance,map.setScale(touchStartScale*scale,centerTouchX,centerTouchY),map.tip.hide(),e.preventDefault()):(offset=jvm.$(map.container).offset(),centerTouchX=touches[0].pageX>touches[1].pageX?touches[1].pageX+(touches[0].pageX-touches[1].pageX)/2:touches[0].pageX+(touches[1].pageX-touches[0].pageX)/2,centerTouchY=touches[0].pageY>touches[1].pageY?touches[1].pageY+(touches[0].pageY-touches[1].pageY)/2:touches[0].pageY+(touches[1].pageY-touches[0].pageY)/2,centerTouchX-=offset.left,centerTouchY-=offset.top,touchStartScale=map.scale,touchStartDistance=Math.sqrt(Math.pow(touches[0].pageX-touches[1].pageX,2)+Math.pow(touches[0].pageY-touches[1].pageY,2)))),lastTouchesLength=touches.length};jvm.$(this.container).bind("touchstart",handleTouchEvent),jvm.$(this.container).bind("touchmove",handleTouchEvent)},bindContainerPointerEvents:function(){var map=this,gesture=new MSGesture,element=this.container[0],handlePointerDownEvent=function(e){gesture.addPointer(e.pointerId)},handleGestureEvent=function(e){var transXOld,transYOld;(0!=e.translationX||0!=e.translationY)&&(transXOld=map.transX,transYOld=map.transY,map.transX+=e.translationX/map.scale,map.transY+=e.translationY/map.scale,map.applyTransform(),map.tip.hide(),(transXOld!=map.transX||transYOld!=map.transY)&&e.preventDefault()),1!=e.scale&&(map.setScale(map.scale*e.scale,e.offsetX,e.offsetY),map.tip.hide(),e.preventDefault())};gesture.target=element,element.addEventListener("MSGestureChange",handleGestureEvent,!1),element.addEventListener("pointerdown",handlePointerDownEvent,!1)},bindElementEvents:function(){var pageX,pageY,mouseMoved,map=this;this.container.mousemove(function(e){Math.abs(pageX-e.pageX)+Math.abs(pageY-e.pageY)>2&&(mouseMoved=!0)}),this.container.delegate("[class~='jvectormap-element']","mouseover mouseout",function(e){var baseVal=jvm.$(this).attr("class").baseVal||jvm.$(this).attr("class"),type=-1===baseVal.indexOf("jvectormap-region")?"marker":"region",code=jvm.$(this).attr("region"==type?"data-code":"data-index"),element="region"==type?map.regions[code].element:map.markers[code].element,tipText="region"==type?map.mapData.paths[code].name:map.markers[code].config.name||"",tipShowEvent=jvm.$.Event(type+"TipShow.jvectormap"),overEvent=jvm.$.Event(type+"Over.jvectormap");"mouseover"==e.type?(map.container.trigger(overEvent,[code]),overEvent.isDefaultPrevented()||element.setHovered(!0),map.tip.text(tipText),map.container.trigger(tipShowEvent,[map.tip,code]),tipShowEvent.isDefaultPrevented()||(map.tip.show(),map.tipWidth=map.tip.width(),map.tipHeight=map.tip.height())):(element.setHovered(!1),map.tip.hide(),map.container.trigger(type+"Out.jvectormap",[code]))}),this.container.delegate("[class~='jvectormap-element']","mousedown",function(e){pageX=e.pageX,pageY=e.pageY,mouseMoved=!1}),this.container.delegate("[class~='jvectormap-element']","mouseup",function(){var baseVal=jvm.$(this).attr("class").baseVal?jvm.$(this).attr("class").baseVal:jvm.$(this).attr("class"),type=-1===baseVal.indexOf("jvectormap-region")?"marker":"region",code=jvm.$(this).attr("region"==type?"data-code":"data-index"),clickEvent=jvm.$.Event(type+"Click.jvectormap"),element="region"==type?map.regions[code].element:map.markers[code].element;mouseMoved||(map.container.trigger(clickEvent,[code]),("region"===type&&map.params.regionsSelectable||"marker"===type&&map.params.markersSelectable)&&(clickEvent.isDefaultPrevented()||(map.params[type+"sSelectableOne"]&&map.clearSelected(type+"s"),element.setSelected(!element.isSelected))))})},bindZoomButtons:function(){var map=this;jvm.$("<div/>").addClass("jvectormap-zoomin").text("+").appendTo(this.container),jvm.$("<div/>").addClass("jvectormap-zoomout").html("&#x2212;").appendTo(this.container),this.container.find(".jvectormap-zoomin").click(function(){map.setScale(map.scale*map.params.zoomStep,map.width/2,map.height/2,!1,map.params.zoomAnimate)}),this.container.find(".jvectormap-zoomout").click(function(){map.setScale(map.scale/map.params.zoomStep,map.width/2,map.height/2,!1,map.params.zoomAnimate)})},createTip:function(){var map=this;this.tip=jvm.$("<div/>").addClass("jvectormap-tip").appendTo(jvm.$("body")),this.container.mousemove(function(e){var left=e.pageX-15-map.tipWidth,top=e.pageY-15-map.tipHeight;5>left&&(left=e.pageX+15),5>top&&(top=e.pageY+15),map.tip.css({left:left,top:top})})},setScale:function(scale,anchorX,anchorY,isCentered,animate){var interval,scaleStart,scaleDiff,transXStart,transXDiff,transYStart,transYDiff,transX,transY,viewportChangeEvent=jvm.$.Event("zoom.jvectormap"),that=this,i=0,count=Math.abs(Math.round(60*(scale-this.scale)/Math.max(scale,this.scale))),deferred=new jvm.$.Deferred;return scale>this.params.zoomMax*this.baseScale?scale=this.params.zoomMax*this.baseScale:scale<this.params.zoomMin*this.baseScale&&(scale=this.params.zoomMin*this.baseScale),"undefined"!=typeof anchorX&&"undefined"!=typeof anchorY&&(zoomStep=scale/this.scale,isCentered?(transX=anchorX+this.defaultWidth*(this.width/(this.defaultWidth*scale))/2,transY=anchorY+this.defaultHeight*(this.height/(this.defaultHeight*scale))/2):(transX=this.transX-(zoomStep-1)/scale*anchorX,transY=this.transY-(zoomStep-1)/scale*anchorY)),animate&&count>0?(scaleStart=this.scale,scaleDiff=(scale-scaleStart)/count,transXStart=this.transX*this.scale,transYStart=this.transY*this.scale,transXDiff=(transX*scale-transXStart)/count,transYDiff=(transY*scale-transYStart)/count,interval=setInterval(function(){i+=1,that.scale=scaleStart+scaleDiff*i,that.transX=(transXStart+transXDiff*i)/that.scale,that.transY=(transYStart+transYDiff*i)/that.scale,that.applyTransform(),i==count&&(clearInterval(interval),that.container.trigger(viewportChangeEvent,[scale/that.baseScale]),deferred.resolve())},10)):(this.transX=transX,this.transY=transY,this.scale=scale,this.applyTransform(),this.container.trigger(viewportChangeEvent,[scale/this.baseScale]),deferred.resolve()),deferred},setFocus:function(config){var bbox,itemBbox,newBbox,codes,i,point;if(config=config||{},config.region?codes=[config.region]:config.regions&&(codes=config.regions),codes){for(i=0;i<codes.length;i++)this.regions[codes[i]]&&(itemBbox=this.regions[codes[i]].element.shape.getBBox(),itemBbox&&("undefined"==typeof bbox?bbox=itemBbox:(newBbox={x:Math.min(bbox.x,itemBbox.x),y:Math.min(bbox.y,itemBbox.y),width:Math.max(bbox.x+bbox.width,itemBbox.x+itemBbox.width)-Math.min(bbox.x,itemBbox.x),height:Math.max(bbox.y+bbox.height,itemBbox.y+itemBbox.height)-Math.min(bbox.y,itemBbox.y)},bbox=newBbox)));return this.setScale(Math.min(this.width/bbox.width,this.height/bbox.height),-(bbox.x+bbox.width/2),-(bbox.y+bbox.height/2),!0,config.animate)}return config.lat&&config.lng?(point=this.latLngToPoint(config.lat,config.lng),config.x=this.transX-point.x/this.scale,config.y=this.transY-point.y/this.scale):config.x&&config.y&&(config.x*=-this.defaultWidth,config.y*=-this.defaultHeight),this.setScale(config.scale*this.baseScale,config.x,config.y,!0,config.animate)},getSelected:function(type){var key,selected=[];for(key in this[type])this[type][key].element.isSelected&&selected.push(key);return selected},getSelectedRegions:function(){return this.getSelected("regions")},getSelectedMarkers:function(){return this.getSelected("markers")},setSelected:function(type,keys){var i;if("object"!=typeof keys&&(keys=[keys]),jvm.$.isArray(keys))for(i=0;i<keys.length;i++)this[type][keys[i]].element.setSelected(!0);else for(i in keys)this[type][i].element.setSelected(!!keys[i])},setSelectedRegions:function(keys){this.setSelected("regions",keys)},setSelectedMarkers:function(keys){this.setSelected("markers",keys)},clearSelected:function(type){var i,select={},selected=this.getSelected(type);for(i=0;i<selected.length;i++)select[selected[i]]=!1;this.setSelected(type,select)},clearSelectedRegions:function(){this.clearSelected("regions")},clearSelectedMarkers:function(){this.clearSelected("markers")},getMapObject:function(){return this},getRegionName:function(code){return this.mapData.paths[code].name},createRegions:function(){var key,region,map=this;this.regionLabelsGroup=this.regionLabelsGroup||this.canvas.addGroup();for(key in this.mapData.paths)region=new jvm.Region({map:this,path:this.mapData.paths[key].path,code:key,style:jvm.$.extend(!0,{},this.params.regionStyle),labelStyle:jvm.$.extend(!0,{},this.params.regionLabelStyle),canvas:this.canvas,labelsGroup:this.regionLabelsGroup,label:"vml"!=this.canvas.mode?this.params.labels&&this.params.labels.regions:null}),jvm.$(region.shape).bind("selected",function(e,isSelected){map.container.trigger("regionSelected.jvectormap",[jvm.$(this.node).attr("data-code"),isSelected,map.getSelectedRegions()])}),this.regions[key]={element:region,config:this.mapData.paths[key]}},createMarkers:function(markers){var i,marker,point,markerConfig,markersArray,map=this;if(this.markersGroup=this.markersGroup||this.canvas.addGroup(),this.markerLabelsGroup=this.markerLabelsGroup||this.canvas.addGroup(),jvm.$.isArray(markers))for(markersArray=markers.slice(),markers={},i=0;i<markersArray.length;i++)markers[i]=markersArray[i];for(i in markers)markerConfig=markers[i]instanceof Array?{latLng:markers[i]}:markers[i],point=this.getMarkerPosition(markerConfig),point!==!1&&(marker=new jvm.Marker({map:this,style:jvm.$.extend(!0,{},this.params.markerStyle,{initial:markerConfig.style||{}}),labelStyle:jvm.$.extend(!0,{},this.params.markerLabelStyle),index:i,cx:point.x,cy:point.y,group:this.markersGroup,canvas:this.canvas,labelsGroup:this.markerLabelsGroup,label:"vml"!=this.canvas.mode?this.params.labels&&this.params.labels.markers:null}),jvm.$(marker.shape).bind("selected",function(e,isSelected){map.container.trigger("markerSelected.jvectormap",[jvm.$(this.node).attr("data-index"),isSelected,map.getSelectedMarkers()])}),this.markers[i]&&this.removeMarkers([i]),this.markers[i]={element:marker,config:markerConfig})},repositionMarkers:function(){var i,point;for(i in this.markers)point=this.getMarkerPosition(this.markers[i].config),point!==!1&&this.markers[i].element.setStyle({cx:point.x,cy:point.y})},repositionLabels:function(){var key;for(key in this.regions)this.regions[key].element.updateLabelPosition();for(key in this.markers)this.markers[key].element.updateLabelPosition()},getMarkerPosition:function(markerConfig){return jvm.Map.maps[this.params.map].projection?this.latLngToPoint.apply(this,markerConfig.latLng||[0,0]):{x:markerConfig.coords[0]*this.scale+this.transX*this.scale,y:markerConfig.coords[1]*this.scale+this.transY*this.scale}},addMarker:function(key,marker,seriesData){var values,i,markers={},data=[],seriesData=seriesData||[];for(markers[key]=marker,i=0;i<seriesData.length;i++)values={},"undefined"!=typeof seriesData[i]&&(values[key]=seriesData[i]),data.push(values);this.addMarkers(markers,data)},addMarkers:function(markers,seriesData){var i;for(seriesData=seriesData||[],this.createMarkers(markers),i=0;i<seriesData.length;i++)this.series.markers[i].setValues(seriesData[i]||{})},removeMarkers:function(markers){var i;for(i=0;i<markers.length;i++)this.markers[markers[i]].element.remove(),delete this.markers[markers[i]]},removeAllMarkers:function(){var i,markers=[];for(i in this.markers)markers.push(i);this.removeMarkers(markers)},latLngToPoint:function(lat,lng){var point,inset,bbox,proj=jvm.Map.maps[this.params.map].projection,centralMeridian=proj.centralMeridian;return-180+centralMeridian>lng&&(lng+=360),point=jvm.Proj[proj.type](lat,lng,centralMeridian),inset=this.getInsetForPoint(point.x,point.y),inset?(bbox=inset.bbox,point.x=(point.x-bbox[0].x)/(bbox[1].x-bbox[0].x)*inset.width*this.scale,point.y=(point.y-bbox[0].y)/(bbox[1].y-bbox[0].y)*inset.height*this.scale,{x:point.x+this.transX*this.scale+inset.left*this.scale,y:point.y+this.transY*this.scale+inset.top*this.scale}):!1},pointToLatLng:function(x,y){var i,inset,bbox,nx,ny,proj=jvm.Map.maps[this.params.map].projection,centralMeridian=proj.centralMeridian,insets=jvm.Map.maps[this.params.map].insets;for(i=0;i<insets.length;i++)if(inset=insets[i],bbox=inset.bbox,nx=x-(this.transX*this.scale+inset.left*this.scale),ny=y-(this.transY*this.scale+inset.top*this.scale),nx=nx/(inset.width*this.scale)*(bbox[1].x-bbox[0].x)+bbox[0].x,ny=ny/(inset.height*this.scale)*(bbox[1].y-bbox[0].y)+bbox[0].y,nx>bbox[0].x&&nx<bbox[1].x&&ny>bbox[0].y&&ny<bbox[1].y)return jvm.Proj[proj.type+"_inv"](nx,-ny,centralMeridian);return!1},getInsetForPoint:function(x,y){var i,bbox,insets=jvm.Map.maps[this.params.map].insets;for(i=0;i<insets.length;i++)if(bbox=insets[i].bbox,x>bbox[0].x&&x<bbox[1].x&&y>bbox[0].y&&y<bbox[1].y)return insets[i]},createSeries:function(){var i,key;this.series={markers:[],regions:[]};for(key in this.params.series)for(i=0;i<this.params.series[key].length;i++)this.series[key][i]=new jvm.DataSeries(this.params.series[key][i],this[key],this)},remove:function(){this.tip.remove(),this.container.remove(),jvm.$(window).unbind("resize",this.onResize),jvm.$("body").unbind("mouseup",this.onContainerMouseUp)}},jvm.Map.maps={},jvm.Map.defaultParams={map:"world_mill_en",backgroundColor:"#505050",zoomButtons:!0,zoomOnScroll:!0,zoomOnScrollSpeed:3,panOnDrag:!0,zoomMax:8,zoomMin:1,zoomStep:1.6,zoomAnimate:!0,regionsSelectable:!1,markersSelectable:!1,bindTouchEvents:!0,regionStyle:{initial:{fill:"white","fill-opacity":1,stroke:"none","stroke-width":0,"stroke-opacity":1},hover:{"fill-opacity":.8,cursor:"pointer"},selected:{fill:"yellow"},selectedHover:{}},regionLabelStyle:{initial:{"font-family":"Verdana","font-size":"12","font-weight":"bold",cursor:"default",fill:"black"},hover:{cursor:"pointer"}},markerStyle:{initial:{fill:"grey",stroke:"#505050","fill-opacity":1,"stroke-width":1,"stroke-opacity":1,r:5},hover:{stroke:"black","stroke-width":2,cursor:"pointer"},selected:{fill:"blue"},selectedHover:{}},markerLabelStyle:{initial:{"font-family":"Verdana","font-size":"12","font-weight":"bold",cursor:"default",fill:"black"},hover:{cursor:"pointer"}}},jvm.Map.apiEvents={onRegionTipShow:"regionTipShow",onRegionOver:"regionOver",onRegionOut:"regionOut",onRegionClick:"regionClick",onRegionSelected:"regionSelected",onMarkerTipShow:"markerTipShow",onMarkerOver:"markerOver",onMarkerOut:"markerOut",onMarkerClick:"markerClick",onMarkerSelected:"markerSelected",onViewportChange:"viewportChange"},jvm.MultiMap=function(params){var that=this;this.maps={},this.params=jvm.$.extend(!0,{},jvm.MultiMap.defaultParams,params),this.params.maxLevel=this.params.maxLevel||Number.MAX_VALUE,this.params.main=this.params.main||{},this.params.main.multiMapLevel=0,this.history=[this.addMap(this.params.main.map,this.params.main)],this.defaultProjection=this.history[0].mapData.projection.type,this.mapsLoaded={},this.params.container.css({position:"relative"}),this.backButton=jvm.$("<div/>").addClass("jvectormap-goback").text("Back").appendTo(this.params.container),this.backButton.hide(),this.backButton.click(function(){that.goBack()}),this.spinner=jvm.$("<div/>").addClass("jvectormap-spinner").appendTo(this.params.container),this.spinner.hide()},jvm.MultiMap.prototype={addMap:function(name,config){var cnt=jvm.$("<div/>").css({width:"100%",height:"100%"});return this.params.container.append(cnt),this.maps[name]=new jvm.Map(jvm.$.extend(config,{container:cnt})),this.params.maxLevel>config.multiMapLevel&&this.maps[name].container.on("regionClick.jvectormap",{scope:this},function(e,code){var multimap=e.data.scope,mapName=multimap.params.mapNameByCode(code,multimap);multimap.drillDownPromise&&"pending"===multimap.drillDownPromise.state()||multimap.drillDown(mapName,code)}),this.maps[name]},downloadMap:function(code){var that=this,deferred=jvm.$.Deferred();return this.mapsLoaded[code]?deferred.resolve():jvm.$.get(this.params.mapUrlByCode(code,this)).then(function(){that.mapsLoaded[code]=!0,deferred.resolve()},function(){deferred.reject()}),deferred},drillDown:function(name,code){var currentMap=this.history[this.history.length-1],that=this,focusPromise=currentMap.setFocus({region:code,animate:!0}),downloadPromise=this.downloadMap(code);focusPromise.then(function(){"pending"===downloadPromise.state()&&that.spinner.show()}),downloadPromise.always(function(){that.spinner.hide()}),this.drillDownPromise=jvm.$.when(downloadPromise,focusPromise),this.drillDownPromise.then(function(){currentMap.params.container.hide(),that.maps[name]?that.maps[name].params.container.show():that.addMap(name,{map:name,multiMapLevel:currentMap.params.multiMapLevel+1}),that.history.push(that.maps[name]),that.backButton.show()})},goBack:function(){var currentMap=this.history.pop(),prevMap=this.history[this.history.length-1],that=this;currentMap.setFocus({scale:1,x:.5,y:.5,animate:!0}).then(function(){currentMap.params.container.hide(),prevMap.params.container.show(),prevMap.updateSize(),1===that.history.length&&that.backButton.hide(),prevMap.setFocus({scale:1,x:.5,y:.5,animate:!0})})}},jvm.MultiMap.defaultParams={mapNameByCode:function(code,multiMap){return code.toLowerCase()+"_"+multiMap.defaultProjection+"_en"},mapUrlByCode:function(code,multiMap){return"jquery-jvectormap-data-"+code.toLowerCase()+"-"+multiMap.defaultProjection+"-en.js"}};
jQuery.fn.vectorMap('addMap', 'world_mill',{"insets": [{"width": 900, "top": 0, "height": 440.7063107441331, "bbox": [{"y": -12671671.123330014, "x": -20004297.151525836}, {"y": 6930392.025135122, "x": 20026572.394749384}], "left": 0}], "paths": {"BD": {"path": "M651.84,230.21l-0.6,-2.0l-1.36,-1.71l-2.31,-0.11l-0.41,0.48l0.2,0.94l-0.53,0.99l-0.72,-0.36l-0.68,0.35l-1.2,-0.36l-0.37,-2.0l-0.81,-1.86l0.39,-1.46l-0.22,-0.47l-1.14,-0.53l0.29,-0.5l1.48,-0.94l0.03,-0.65l-1.55,-1.22l0.55,-1.14l1.61,0.94l1.04,0.15l0.18,1.54l0.34,0.35l5.64,0.63l-0.84,1.64l-1.22,0.34l-0.77,1.51l0.07,0.47l1.37,1.37l0.67,-0.19l0.42,-1.39l1.21,3.84l-0.03,1.21l-0.33,-0.15l-0.4,0.28Z", "name": "Bangladesh"}, "BE": {"path": "M429.29,144.05l1.91,0.24l2.1,-0.63l2.63,1.99l-0.21,1.66l-0.69,0.4l-0.18,1.2l-1.66,-1.13l-1.39,0.15l-2.73,-2.7l-1.17,-0.18l-0.16,-0.52l1.54,-0.5Z", "name": "Belgium"}, "BF": {"path": "M421.42,247.64l-0.11,0.95l0.34,1.16l1.4,1.71l0.07,1.1l0.32,0.37l2.55,0.51l-0.04,1.28l-0.38,0.53l-1.07,0.21l-0.72,1.18l-0.63,0.21l-3.22,-0.25l-0.94,0.39l-5.4,-0.05l-0.39,0.38l0.16,2.73l-1.23,-0.43l-1.17,0.1l-0.89,0.57l-2.27,-1.72l-0.13,-1.11l0.61,-0.96l0.02,-0.93l1.87,-1.98l0.44,-1.81l0.43,-0.39l1.28,0.26l1.05,-0.52l0.47,-0.73l1.84,-1.09l0.55,-0.83l2.2,-1.0l1.15,-0.3l0.72,0.45l1.13,-0.01Z", "name": "Burkina Faso"}, "BG": {"path": "M491.65,168.18l-0.86,0.88l-0.91,2.17l0.48,1.34l-1.6,-0.24l-2.55,0.95l-0.28,1.51l-1.8,0.22l-2.0,-1.0l-1.92,0.79l-1.42,-0.07l-0.15,-1.63l-1.05,-0.97l0.0,-0.8l1.2,-1.57l0.01,-0.56l-1.14,-1.23l-0.05,-0.94l0.88,0.97l0.88,-0.2l1.91,0.47l3.68,0.16l1.42,-0.81l2.72,-0.66l2.55,1.24Z", "name": "Bulgaria"}, "BA": {"path": "M463.49,163.65l2.1,0.5l1.72,-0.03l1.52,0.68l-0.36,0.78l0.08,0.45l1.04,1.02l-0.25,0.98l-1.81,1.15l-0.38,1.38l-1.67,-0.87l-0.89,-1.2l-2.11,-1.83l-1.63,-2.22l0.23,-0.57l0.48,0.38l0.55,-0.06l0.43,-0.51l0.94,-0.06Z", "name": "Bosnia and Herz."}, "BN": {"path": "M707.48,273.58l0.68,-0.65l1.41,-0.91l-0.15,1.63l-0.81,-0.05l-0.61,0.58l-0.53,-0.6Z", "name": "Brunei"}, "BO": {"path": "M263.83,340.69l-3.09,-0.23l-0.38,0.23l-0.7,1.52l-1.31,-1.53l-3.28,-0.64l-2.37,2.4l-1.31,0.26l-0.88,-3.26l-1.3,-2.86l0.74,-2.37l-0.13,-0.43l-1.2,-1.01l-0.37,-1.89l-1.08,-1.55l1.45,-2.56l-0.96,-2.33l0.47,-1.06l-0.34,-0.73l0.91,-1.32l0.16,-3.84l0.5,-1.18l-1.81,-3.41l2.46,0.07l0.8,-0.85l3.4,-1.91l2.66,-0.35l-0.19,1.38l0.3,1.07l-0.05,1.97l2.72,2.27l2.88,0.49l0.89,0.86l1.79,0.58l0.98,0.7l1.71,0.05l1.17,0.61l0.6,2.7l-0.7,0.54l0.96,2.99l0.37,0.28l4.3,0.1l-0.25,1.2l0.27,1.02l1.43,0.9l0.5,1.35l-0.41,1.86l-0.65,1.08l0.12,1.35l-2.69,-1.65l-2.4,-0.03l-4.36,0.76l-1.49,2.5l-0.11,1.52l-0.75,2.37Z", "name": "Bolivia"}, "JP": {"path": "M781.12,166.87l1.81,0.68l1.62,-0.97l0.39,2.42l-3.35,0.75l-2.23,2.88l-3.63,-1.9l-0.56,0.2l-1.26,3.05l-2.16,0.03l-0.29,-2.51l1.08,-2.03l2.45,-0.16l0.37,-0.33l1.25,-5.94l2.47,2.71l2.03,1.12ZM773.56,187.34l-0.91,2.22l0.37,1.52l-1.14,1.75l-3.02,1.26l-4.58,0.27l-3.34,3.01l-1.25,-0.8l-0.09,-1.9l-0.46,-0.38l-4.35,0.62l-3.0,1.32l-2.85,0.05l-0.37,0.27l0.13,0.44l2.32,1.89l-1.54,4.34l-1.26,0.9l-0.79,-0.7l0.56,-2.27l-0.21,-0.45l-1.47,-0.75l-0.74,-1.4l2.12,-0.84l1.26,-1.7l2.45,-1.42l1.83,-1.91l4.78,-0.81l2.6,0.57l0.44,-0.21l2.39,-4.66l1.29,1.06l0.5,0.01l5.1,-4.02l1.69,-3.73l-0.38,-3.4l0.9,-1.61l2.14,-0.44l1.23,3.72l-0.07,2.18l-2.23,2.84l-0.04,3.16ZM757.78,196.26l0.19,0.56l-1.01,1.21l-1.16,-0.68l-1.28,0.65l-0.69,1.45l-1.02,-0.5l0.01,-0.93l1.14,-1.38l1.57,0.14l0.85,-0.98l1.4,0.46Z", "name": "Japan"}, "BI": {"path": "M495.45,295.49l-1.08,-2.99l1.14,-0.11l0.64,-1.19l0.76,0.09l0.65,1.83l-2.1,2.36Z", "name": "Burundi"}, "BJ": {"path": "M429.57,255.75l-0.05,0.8l0.5,1.34l-0.42,0.86l0.17,0.79l-1.81,2.12l-0.57,1.76l-0.08,5.42l-1.41,0.2l-0.48,-1.36l0.11,-5.71l-0.52,-0.7l-0.2,-1.35l-1.48,-1.48l0.21,-0.9l0.89,-0.43l0.42,-0.92l1.27,-0.36l1.22,-1.34l0.61,-0.0l1.62,1.24Z", "name": "Benin"}, "BT": {"path": "M650.32,213.86l0.84,0.71l-0.12,1.1l-3.76,-0.11l-1.57,0.4l-1.93,-0.87l1.48,-1.96l1.13,-0.57l1.63,0.57l1.33,0.08l0.99,0.65Z", "name": "Bhutan"}, "JM": {"path": "M228.38,239.28l-0.8,0.4l-2.26,-1.06l0.84,-0.23l2.14,0.3l1.17,0.56l-1.08,0.03Z", "name": "Jamaica"}, "BW": {"path": "M483.92,330.07l2.27,4.01l2.83,2.86l0.96,0.31l0.78,2.43l2.13,0.61l1.02,0.76l-3.0,1.64l-2.32,2.02l-1.54,2.69l-1.52,0.45l-0.64,1.94l-1.34,0.52l-1.85,-0.12l-1.21,-0.74l-1.35,-0.3l-1.22,0.62l-0.75,1.37l-2.31,1.9l-1.4,0.21l-0.35,-0.59l0.16,-1.75l-1.48,-2.54l-0.62,-0.43l-0.0,-7.1l2.08,-0.08l0.39,-0.4l0.07,-8.9l5.19,-0.93l0.8,0.89l0.51,0.07l1.5,-0.95l2.21,-0.49Z", "name": "Botswana"}, "BR": {"path": "M259.98,275.05l3.24,0.7l0.65,-0.53l4.55,-1.32l1.08,-1.06l-0.02,-0.63l0.55,-0.05l0.28,0.28l-0.26,0.87l0.22,0.48l0.73,0.32l0.4,0.81l-0.62,0.86l-0.4,2.13l0.82,2.56l1.69,1.43l1.43,0.2l3.17,-1.68l3.18,0.3l0.65,-0.75l-0.27,-0.92l1.9,-0.09l2.39,0.99l1.06,-0.61l0.84,0.78l1.2,-0.18l1.18,-1.06l0.84,-1.94l1.36,-2.11l0.37,-0.05l1.89,5.45l1.33,0.59l0.05,1.28l-1.77,1.94l0.02,0.56l1.02,0.87l4.07,0.36l0.08,2.16l0.66,0.29l1.74,-1.5l6.97,2.32l1.02,1.22l-0.35,1.18l0.49,0.5l2.81,-0.74l4.77,1.3l3.75,-0.08l3.57,2.0l3.29,2.86l1.93,0.72l2.12,0.12l0.71,0.62l1.21,4.51l-0.95,3.98l-4.72,5.06l-1.64,2.92l-1.72,2.05l-0.8,0.3l-0.72,2.03l0.18,4.75l-0.94,5.53l-0.81,1.13l-0.43,3.36l-2.55,3.5l-0.4,2.51l-1.86,1.04l-0.67,1.53l-2.54,0.01l-3.94,1.01l-1.83,1.2l-2.87,0.82l-3.03,2.19l-2.2,2.83l-0.36,2.0l0.4,1.58l-0.44,2.6l-0.51,1.2l-1.77,1.54l-2.75,4.78l-3.83,3.42l-1.24,2.74l-1.18,1.15l-0.36,-0.83l0.95,-1.14l0.01,-0.5l-1.52,-1.97l-4.56,-3.32l-1.03,-0.0l-2.38,-2.02l-0.81,-0.0l5.34,-5.45l3.77,-2.58l0.22,-2.46l-1.35,-1.81l-0.91,0.07l0.58,-2.33l0.01,-1.54l-1.11,-0.83l-1.75,0.3l-0.44,-3.11l-0.52,-0.95l-1.88,-0.88l-1.24,0.47l-2.17,-0.41l0.15,-3.21l-0.62,-1.34l0.66,-0.73l-0.22,-1.34l0.66,-1.13l0.44,-2.04l-0.61,-1.83l-1.4,-0.86l-0.2,-0.75l0.34,-1.39l-0.38,-0.5l-4.52,-0.1l-0.72,-2.22l0.59,-0.42l-0.03,-1.1l-0.5,-0.87l-0.32,-1.7l-1.45,-0.76l-1.63,-0.02l-1.05,-0.72l-1.6,-0.48l-1.13,-0.99l-2.69,-0.4l-2.47,-2.06l0.13,-4.35l-0.45,-0.45l-3.46,0.5l-3.44,1.94l-0.6,0.74l-2.9,-0.17l-1.47,0.42l-0.72,-0.18l0.15,-3.52l-0.63,-0.34l-1.94,1.41l-1.87,-0.06l-0.83,-1.18l-1.37,-0.26l0.21,-1.01l-1.35,-1.49l-0.88,-1.91l0.56,-0.6l-0.0,-0.81l1.29,-0.62l0.22,-0.43l-0.22,-1.19l0.61,-0.91l0.15,-0.99l2.65,-1.58l1.99,-0.47l0.42,-0.36l2.06,0.11l0.42,-0.33l1.19,-8.0l-0.41,-1.56l-1.1,-1.0l0.01,-1.33l1.91,-0.42l0.08,-0.96l-0.33,-0.43l-1.14,-0.2l-0.02,-0.83l4.47,0.05l0.82,-0.67l0.82,1.81l0.8,0.07l1.15,1.1l2.26,-0.05l0.71,-0.83l2.78,-0.96l0.48,-1.13l1.6,-0.64l0.24,-0.47l-0.48,-0.82l-1.83,-0.19l-0.36,-3.22Z", "name": "Brazil"}, "BS": {"path": "M226.4,223.87l-0.48,-1.15l-0.84,-0.75l0.36,-1.11l0.95,1.95l0.01,1.06ZM225.56,216.43l-1.87,0.29l-0.04,-0.22l0.74,-0.14l1.17,0.06Z", "name": "Bahamas"}, "BY": {"path": "M493.84,128.32l0.29,0.7l0.49,0.23l1.19,-0.38l2.09,0.72l0.19,1.26l-0.45,1.24l1.57,2.26l0.89,0.59l0.17,0.81l1.58,0.56l0.4,0.5l-0.53,0.41l-1.87,-0.11l-0.73,0.38l-0.13,0.52l1.04,2.74l-1.91,0.26l-0.89,0.99l-0.11,1.18l-2.73,-0.04l-0.53,-0.62l-0.52,-0.08l-0.75,0.46l-0.91,-0.42l-1.92,-0.07l-2.75,-0.79l-2.6,-0.28l-2.0,0.07l-1.5,0.92l-0.67,0.07l-0.08,-1.22l-0.59,-1.19l1.36,-0.88l0.01,-1.35l-0.7,-1.41l-0.07,-1.0l2.16,-0.02l2.72,-1.3l0.75,-2.04l1.91,-1.04l0.2,-0.41l-0.19,-1.25l3.8,-1.78l2.3,0.77Z", "name": "Belarus"}, "BZ": {"path": "M198.03,244.38l0.1,-4.49l0.69,-0.06l0.74,-1.3l0.34,0.28l-0.4,1.3l0.17,0.58l-0.34,2.25l-1.3,1.42Z", "name": "Belize"}, "RU": {"path": "M491.55,115.25l2.55,-1.85l-0.01,-0.65l-2.2,-1.5l7.32,-6.76l1.03,-2.11l-0.13,-0.49l-3.46,-2.52l0.86,-2.7l-2.11,-2.81l1.56,-3.67l-2.77,-4.52l2.15,-2.99l-0.08,-0.55l-3.65,-2.73l0.3,-2.54l1.81,-0.37l4.26,-1.77l2.42,-1.45l4.06,2.61l6.79,1.04l9.34,4.85l1.78,1.88l0.14,2.46l-2.55,2.02l-3.9,1.06l-11.07,-3.14l-2.06,0.53l-0.13,0.7l3.94,2.94l0.31,5.86l0.26,0.36l5.14,2.24l0.58,-0.29l0.32,-1.94l-1.35,-1.78l1.13,-1.09l6.13,2.42l2.11,-0.98l0.18,-0.56l-1.51,-2.67l5.41,-3.76l2.07,0.22l2.26,1.41l0.57,-0.16l1.46,-2.87l-0.05,-0.44l-1.92,-2.32l1.12,-2.32l-1.32,-2.27l5.87,1.16l1.04,1.75l-2.59,0.43l-0.33,0.4l0.02,2.36l2.46,1.83l3.87,-0.91l0.86,-2.8l13.69,-5.65l0.99,0.11l-1.92,2.06l0.23,0.67l3.11,0.45l2.0,-1.48l4.56,-0.12l3.64,-1.73l2.65,2.44l0.56,-0.01l2.85,-2.88l-0.01,-0.57l-2.35,-2.29l0.9,-1.01l7.14,1.3l3.41,1.36l9.05,4.97l0.51,-0.11l1.67,-2.27l-0.05,-0.53l-2.43,-2.21l-0.06,-0.78l-0.34,-0.36l-2.52,-0.36l0.64,-1.93l-1.32,-3.46l-0.06,-1.21l4.48,-4.06l1.69,-4.29l1.6,-0.81l6.23,1.18l0.44,2.21l-2.29,3.64l0.06,0.5l1.47,1.39l0.76,3.0l-0.56,6.03l2.69,2.82l-0.96,2.57l-4.86,5.95l0.23,0.64l2.86,0.61l0.42,-0.17l0.93,-1.4l2.64,-1.03l0.87,-2.24l2.09,-1.96l0.07,-0.5l-1.36,-2.28l1.09,-2.69l-0.32,-0.55l-2.47,-0.33l-0.5,-2.06l1.94,-4.38l-0.06,-0.42l-2.96,-3.4l4.12,-2.88l0.16,-0.4l-0.51,-2.93l0.54,-0.05l1.13,2.25l-0.96,4.35l0.27,0.47l2.68,0.84l0.5,-0.51l-1.02,-2.99l3.79,-1.66l5.01,-0.24l4.53,2.61l0.48,-0.06l0.07,-0.48l-2.18,-3.82l-0.23,-4.67l3.98,-0.9l5.97,0.21l5.49,-0.64l0.27,-0.65l-1.83,-2.31l2.56,-2.9l2.87,-0.17l4.8,-2.47l6.54,-0.67l1.03,-1.42l6.25,-0.45l2.32,1.11l5.53,-2.7l4.5,0.08l0.39,-0.28l0.66,-2.15l2.26,-2.12l5.69,-2.11l3.21,1.29l-2.46,0.94l-0.25,0.42l0.34,0.35l5.41,0.77l0.61,2.33l0.58,0.25l2.2,-1.22l7.13,0.07l5.51,2.47l1.79,1.72l-0.53,2.24l-9.16,4.15l-1.97,1.52l0.16,0.71l6.77,1.91l2.16,-0.78l1.13,2.74l0.67,0.11l1.01,-1.15l3.81,-0.73l7.7,0.77l0.54,1.99l0.36,0.29l10.47,0.71l0.43,-0.38l0.13,-3.23l4.87,0.78l3.95,-0.02l3.83,2.4l1.03,2.71l-1.35,1.79l0.02,0.5l3.15,3.64l4.07,1.96l0.53,-0.18l2.23,-4.47l3.95,1.93l4.16,-1.21l4.73,1.39l2.05,-1.26l3.94,0.62l0.43,-0.55l-1.68,-4.02l2.89,-1.8l22.31,3.03l2.16,2.75l6.55,3.51l10.29,-0.81l4.82,0.73l1.85,1.66l-0.29,3.08l0.25,0.41l3.08,1.26l3.56,-0.88l4.35,-0.11l4.8,0.87l4.57,-0.47l4.23,3.79l0.43,0.07l3.1,-1.4l0.16,-0.6l-1.88,-2.62l0.85,-1.52l7.71,1.21l5.22,-0.26l7.09,2.09l9.59,5.22l6.35,4.11l-0.2,2.38l1.88,1.41l0.6,-0.42l-0.48,-2.53l6.15,0.57l4.4,3.51l-1.97,1.43l-4.0,0.41l-0.36,0.39l-0.06,3.79l-0.74,0.62l-2.07,-0.11l-1.91,-1.39l-3.14,-1.11l-0.78,-1.85l-2.72,-0.68l-2.63,0.49l-1.04,-1.1l0.46,-1.31l-0.5,-0.51l-3.0,0.98l-0.22,0.58l0.99,1.7l-1.21,1.48l-3.04,1.68l-3.12,-0.28l-0.4,0.23l0.09,0.46l2.2,2.09l1.46,3.2l1.15,1.1l0.24,1.33l-0.42,0.67l-4.63,-0.77l-6.96,2.9l-2.19,0.44l-7.6,5.06l-0.84,1.45l-3.61,-2.37l-6.24,2.82l-0.94,-1.15l-0.53,-0.08l-2.28,1.52l-3.2,-0.49l-0.44,0.27l-0.78,2.37l-3.05,3.78l0.09,1.47l0.29,0.36l2.54,0.72l-0.29,4.53l-1.97,0.11l-0.35,0.26l-1.07,2.94l0.8,1.45l-3.91,1.58l-1.05,3.95l-3.48,0.77l-0.3,0.3l-0.72,3.29l-3.09,2.65l-0.7,-1.74l-2.44,-12.44l1.16,-4.71l2.04,-2.06l0.22,-1.64l3.8,-0.86l4.46,-4.61l4.28,-3.81l4.48,-3.01l2.17,-5.63l-0.42,-0.54l-3.04,0.33l-1.77,3.31l-5.86,3.86l-1.86,-4.25l-0.45,-0.23l-6.46,1.3l-6.47,6.44l-0.01,0.55l1.58,1.74l-8.24,1.17l0.15,-2.2l-0.34,-0.42l-3.89,-0.56l-3.25,1.81l-7.62,-0.62l-8.45,1.19l-17.71,15.41l0.22,0.7l3.74,0.41l1.36,2.17l2.43,0.76l1.88,-1.68l2.4,0.2l3.4,3.54l0.08,2.6l-1.95,3.42l-0.21,3.9l-1.1,5.06l-3.71,4.54l-0.87,2.21l-8.29,8.89l-3.19,1.7l-1.32,0.03l-1.45,-1.36l-0.49,-0.04l-2.27,1.5l0.41,-3.65l-0.59,-2.47l1.75,-0.89l2.91,0.53l0.42,-0.2l1.68,-3.03l0.87,-3.46l0.97,-1.18l1.32,-2.88l-0.45,-0.56l-4.14,0.95l-2.19,1.25l-3.41,-0.0l-1.06,-2.93l-2.97,-2.3l-4.28,-1.06l-1.75,-5.07l-2.66,-5.01l-2.29,-1.29l-3.75,-1.01l-3.44,0.08l-3.18,0.62l-2.24,1.77l0.05,0.66l1.18,0.69l0.02,1.43l-1.33,1.05l-2.26,3.51l-0.04,1.43l-3.16,1.84l-2.82,-1.16l-3.01,0.23l-1.35,-1.07l-1.5,-0.35l-3.9,2.31l-3.22,0.52l-2.27,0.79l-3.05,-0.51l-2.21,0.03l-1.48,-1.6l-2.6,-1.63l-2.63,-0.43l-5.46,1.01l-3.23,-1.25l-0.72,-2.57l-5.2,-1.24l-2.75,-1.36l-0.5,0.12l-2.59,3.45l0.84,2.1l-2.06,1.93l-3.41,-0.77l-2.42,-0.12l-1.83,-1.54l-2.53,-0.05l-2.42,-0.98l-3.86,1.57l-4.72,2.78l-3.3,0.75l-1.55,-1.92l-3.0,0.41l-1.11,-1.33l-1.62,-0.59l-1.31,-1.94l-1.38,-0.6l-3.7,0.79l-3.31,-1.83l-0.51,0.11l-0.99,1.29l-5.29,-8.05l-2.96,-2.48l0.65,-0.77l0.01,-0.51l-0.5,-0.11l-6.2,3.21l-1.84,0.15l0.15,-1.39l-0.26,-0.42l-3.22,-1.17l-2.46,0.7l-0.69,-3.16l-0.32,-0.31l-4.5,-0.75l-2.47,1.47l-6.19,1.27l-1.29,0.86l-9.51,1.3l-1.15,1.17l-0.03,0.53l1.47,1.9l-1.89,0.69l-0.22,0.56l0.31,0.6l-2.11,1.44l0.03,0.68l3.75,2.12l-0.39,0.98l-3.23,-0.13l-0.86,0.86l-3.09,-1.59l-3.97,0.07l-2.66,1.35l-8.32,-3.56l-4.07,0.06l-5.39,3.68l-0.39,2.0l-2.03,-1.5l-0.59,0.13l-2.0,3.59l0.57,0.93l-1.28,2.16l0.06,0.48l2.13,2.17l1.95,0.04l1.37,1.82l-0.23,1.46l0.25,0.43l0.83,0.33l-0.8,1.31l-2.49,0.62l-2.49,3.2l0.0,0.49l2.17,2.78l-0.15,2.18l2.5,3.24l-1.58,1.59l-0.7,-0.13l-1.63,-1.72l-2.29,-0.84l-0.94,-1.31l-2.34,-0.63l-1.48,0.4l-0.43,-0.47l-3.51,-1.48l-5.76,-1.01l-0.45,0.19l-2.89,-2.34l-2.9,-1.2l-1.53,-1.29l1.29,-0.43l2.08,-2.61l-0.05,-0.55l-0.89,-0.79l3.05,-1.06l0.27,-0.42l-0.07,-0.69l-0.49,-0.35l-1.73,0.39l0.04,-0.68l1.04,-0.72l2.66,-0.48l0.4,-1.32l-0.5,-1.6l0.92,-1.54l0.03,-1.17l-0.29,-0.37l-3.69,-1.06l-1.41,0.02l-1.42,-1.41l-2.19,0.38l-2.77,-1.01l-0.03,-0.59l-0.89,-1.43l-2.0,-0.32l-0.11,-0.54l0.49,-0.53l0.01,-0.53l-1.6,-1.9l-3.58,0.02l-0.88,0.73l-0.46,-0.07l-1.0,-2.79l2.22,-0.02l0.97,-0.74l0.07,-0.57l-0.9,-1.04l-1.35,-0.48l-0.11,-0.7l-0.95,-0.58l-1.38,-1.99l0.46,-0.98l-0.51,-1.96l-2.45,-0.84l-1.21,0.3l-0.46,-0.76l-2.46,-0.83l-0.72,-1.87l-0.21,-1.69l-0.99,-0.85l0.85,-1.17l-0.7,-3.21l1.66,-1.97l-0.16,-0.79ZM749.2,170.72l-0.6,0.4l-0.13,0.16l-0.01,-0.51l0.74,-0.05ZM871.88,65.81l2.17,-0.13l3.19,1.16l-2.39,1.09l-5.63,0.48l-0.26,-0.84l2.92,-1.76ZM797.39,48.49l-2.0,1.36l-3.8,-0.42l-4.25,-1.8l0.35,-0.97l9.69,1.83ZM783.67,46.12l-1.63,3.09l-8.98,-0.13l-4.09,1.14l-4.54,-2.97l1.16,-3.01l3.05,-0.89l6.5,0.22l8.54,2.56ZM778.2,134.98l-0.56,-0.9l0.27,-0.12l0.29,1.01ZM778.34,135.48l0.94,3.53l-0.05,3.38l1.05,3.39l2.18,5.0l-2.89,-0.83l-0.49,0.26l-1.54,4.65l2.42,3.5l-0.04,1.13l-1.24,-1.24l-0.61,0.06l-1.09,1.61l-0.28,-1.61l0.27,-3.1l-0.28,-3.4l0.58,-2.47l0.11,-4.39l-1.46,-3.36l0.21,-4.32l2.15,-1.46l0.07,-0.34ZM771.95,56.61l1.76,-1.42l2.89,-0.42l3.28,1.71l0.14,0.6l-3.27,0.03l-4.81,-0.5ZM683.76,31.09l-13.01,1.93l4.03,-6.35l1.82,-0.56l1.73,0.34l5.99,2.98l-0.56,1.66ZM670.85,27.93l-5.08,0.64l-6.86,-1.57l-3.99,-2.05l-2.1,-4.16l-2.6,-0.87l5.72,-3.5l5.2,-1.28l4.69,2.85l5.59,5.4l-0.56,4.53ZM564.15,68.94l-0.64,0.17l-7.85,-0.57l-0.86,-2.04l-4.28,-1.17l-0.28,-1.94l2.27,-0.89l0.25,-0.39l-0.08,-2.38l4.81,-3.97l-0.15,-0.7l-1.47,-0.38l5.3,-3.81l0.15,-0.44l-0.58,-1.94l5.28,-2.51l8.21,-3.27l8.28,-0.96l4.35,-1.94l4.6,-0.64l1.36,1.61l-1.34,1.28l-16.43,4.94l-7.97,4.88l-7.74,9.63l0.66,4.14l4.16,3.27ZM548.81,18.48l-5.5,1.18l-0.58,1.02l-2.59,0.84l-2.13,-1.07l1.12,-1.42l-0.3,-0.65l-2.33,-0.07l1.68,-0.36l3.47,-0.06l0.42,1.29l0.66,0.16l1.38,-1.34l2.15,-0.88l2.94,1.01l-0.39,0.36ZM477.37,133.15l-4.08,0.05l-2.56,-0.32l0.33,-0.87l3.17,-1.03l3.24,0.96l-0.09,1.23Z", "name": "Russia"}, "RW": {"path": "M497.0,288.25l0.71,1.01l-0.11,1.09l-1.63,0.03l-1.04,1.39l-0.83,-0.11l0.51,-1.2l0.08,-1.34l0.42,-0.41l0.7,0.14l1.19,-0.61Z", "name": "Rwanda"}, "RS": {"path": "M469.4,163.99l0.42,-0.5l-0.01,-0.52l-1.15,-1.63l1.43,-0.62l1.33,0.12l1.17,1.06l0.46,1.13l1.34,0.64l0.35,1.35l1.46,0.9l0.76,-0.29l0.2,0.69l-0.48,0.78l0.22,1.12l1.05,1.22l-0.77,0.8l-0.37,1.52l-1.21,0.08l0.24,-0.64l-0.39,-0.54l-2.08,-1.64l-0.9,0.05l-0.48,0.94l-2.12,-1.37l0.53,-1.6l-1.11,-1.37l0.51,-1.1l-0.41,-0.57Z", "name": "Serbia"}, "TL": {"path": "M734.55,307.93l-0.1,-0.97l4.5,-0.86l-2.82,1.28l-1.59,0.55Z", "name": "Timor-Leste"}, "TM": {"path": "M553.03,173.76l-0.04,0.34l-0.09,-0.22l0.13,-0.12ZM555.87,172.66l0.45,-0.1l1.48,0.74l2.06,2.43l4.07,-0.18l0.38,-0.51l-0.32,-1.19l1.92,-0.94l1.91,-1.59l2.94,1.39l0.43,2.47l1.19,0.67l2.58,-0.13l0.62,0.4l1.32,3.12l4.54,3.44l2.67,1.45l3.06,1.14l-0.04,1.05l-1.33,-0.75l-0.59,0.19l-0.32,0.84l-2.2,0.81l-0.46,2.13l-1.21,0.74l-1.91,0.42l-0.73,1.33l-1.56,0.31l-2.22,-0.94l-0.2,-2.17l-0.38,-0.36l-1.73,-0.09l-2.76,-2.46l-2.14,-0.4l-2.84,-1.48l-1.78,-0.27l-1.24,0.53l-1.57,-0.08l-2.0,1.69l-1.7,0.43l-0.36,-1.58l0.36,-2.98l-0.22,-0.4l-1.65,-0.84l0.54,-1.69l-0.34,-0.52l-1.22,-0.13l0.36,-1.64l2.22,0.59l2.2,-0.95l0.12,-0.65l-1.77,-1.74l-0.66,-1.57Z", "name": "Turkmenistan"}, "TJ": {"path": "M597.75,178.82l-2.54,-0.44l-0.47,0.34l-0.24,1.7l0.43,0.45l2.64,-0.22l3.18,0.95l4.39,-0.41l0.56,2.37l0.52,0.29l0.67,-0.24l1.11,0.49l0.21,2.13l-3.76,-0.21l-1.8,1.32l-1.76,0.74l-0.61,-0.58l0.21,-2.23l-0.64,-0.49l-0.07,-0.93l-1.36,-0.66l-0.45,0.07l-1.08,1.01l-0.55,1.48l-1.31,-0.05l-0.95,1.16l-0.9,-0.35l-1.86,0.74l1.26,-2.83l-0.54,-2.17l-1.67,-0.82l0.33,-0.66l2.18,-0.04l1.19,-1.63l0.76,-1.79l2.43,-0.5l-0.26,1.0l0.73,1.05Z", "name": "Tajikistan"}, "RO": {"path": "M487.53,154.23l0.6,0.24l2.87,3.98l-0.17,2.69l0.45,1.42l1.32,0.81l1.35,-0.42l0.76,0.36l0.02,0.31l-0.83,0.45l-0.59,-0.22l-0.54,0.3l-0.62,3.3l-1.0,-0.22l-2.07,-1.13l-2.95,0.71l-1.25,0.76l-3.51,-0.15l-1.89,-0.47l-0.87,0.16l-0.82,-1.3l0.29,-0.26l-0.06,-0.64l-1.09,-0.34l-0.56,0.5l-1.05,-0.64l-0.39,-1.39l-1.36,-0.65l-0.35,-1.0l-0.83,-0.75l1.54,-0.54l2.66,-4.21l2.4,-1.24l2.96,0.34l1.48,0.73l0.79,-0.45l1.78,-0.3l0.75,-0.74l0.79,0.0Z", "name": "Romania"}, "GW": {"path": "M386.23,253.6l-0.29,0.84l0.15,0.6l-2.21,0.59l-0.86,0.96l-1.04,-0.83l-1.09,-0.23l-0.54,-1.06l-0.66,-0.49l2.41,-0.48l4.13,0.1Z", "name": "Guinea-Bissau"}, "GT": {"path": "M195.08,249.77l-2.48,-0.37l-1.03,-0.45l-1.14,-0.89l0.3,-0.99l-0.24,-0.68l0.96,-1.66l2.98,-0.01l0.4,-0.37l-0.19,-1.28l-1.67,-1.4l0.51,-0.4l0.0,-1.05l3.85,0.02l-0.21,4.53l0.4,0.43l1.46,0.38l-1.48,0.98l-0.35,0.7l0.12,0.57l-2.2,1.96Z", "name": "Guatemala"}, "GR": {"path": "M487.07,174.59l-0.59,1.43l-0.37,0.21l-2.84,-0.35l-3.03,0.77l-0.18,0.68l1.28,1.23l-0.61,0.23l-1.14,0.0l-1.2,-1.39l-0.63,0.03l-0.53,1.01l0.56,1.76l1.03,1.19l-0.56,0.38l-0.05,0.62l2.52,2.12l0.02,0.87l-1.78,-0.59l-0.48,0.56l0.5,1.0l-1.07,0.2l-0.3,0.53l0.75,2.01l-0.98,0.02l-1.84,-1.12l-1.37,-4.2l-2.21,-2.95l-0.11,-0.56l1.04,-1.28l0.2,-0.95l0.85,-0.66l0.03,-0.46l1.32,-0.21l1.01,-0.64l1.22,0.05l0.65,-0.56l2.26,-0.0l1.82,-0.75l1.85,1.0l2.28,-0.28l0.35,-0.39l0.01,-0.77l0.34,0.22ZM480.49,192.16l0.58,0.4l-0.68,-0.12l0.11,-0.28ZM482.52,192.82l2.51,0.06l0.24,0.32l-1.99,0.13l-0.77,-0.51Z", "name": "Greece"}, "GQ": {"path": "M448.79,279.62l0.02,2.22l-4.09,0.0l0.69,-2.27l3.38,0.05Z", "name": "Eq. Guinea"}, "GY": {"path": "M277.42,270.07l-0.32,1.83l-1.32,0.57l-0.23,0.46l-0.28,2.0l1.11,1.82l0.83,0.19l0.32,1.25l1.13,1.62l-1.21,-0.19l-1.08,0.71l-1.77,0.5l-0.44,0.46l-0.86,-0.09l-1.32,-1.01l-0.77,-2.27l0.36,-1.9l0.68,-1.23l-0.57,-1.17l-0.74,-0.43l0.12,-1.16l-0.9,-0.69l-1.1,0.09l-1.31,-1.48l0.53,-0.72l-0.04,-0.84l1.99,-0.86l0.05,-0.59l-0.71,-0.78l0.14,-0.57l1.66,-1.24l1.36,0.77l1.41,1.49l0.06,1.15l0.37,0.38l0.8,0.05l2.06,1.86Z", "name": "Guyana"}, "GE": {"path": "M521.71,168.93l5.29,0.89l4.07,2.01l1.41,-0.44l2.07,0.56l0.68,1.1l1.07,0.55l-0.12,0.59l0.98,1.29l-1.01,-0.13l-1.81,-0.83l-0.94,0.47l-3.23,0.43l-2.29,-1.39l-2.33,0.05l0.21,-0.97l-0.76,-2.26l-1.45,-1.12l-1.43,-0.39l-0.41,-0.42Z", "name": "Georgia"}, "GB": {"path": "M412.61,118.72l-2.19,3.22l-0.0,0.45l5.13,-0.3l-0.53,2.37l-2.2,3.12l0.29,0.63l2.37,0.21l2.33,4.3l1.76,0.69l2.2,5.12l2.94,0.77l-0.23,1.62l-1.15,0.88l-0.1,0.52l0.82,1.42l-1.86,1.43l-3.3,-0.02l-4.12,0.87l-1.04,-0.58l-0.47,0.06l-1.51,1.41l-2.12,-0.34l-1.86,1.18l-0.6,-0.29l3.19,-3.0l2.16,-0.69l0.28,-0.41l-0.34,-0.36l-3.73,-0.53l-0.4,-0.76l2.2,-0.87l0.17,-0.61l-1.26,-1.67l0.36,-1.7l3.38,0.28l0.43,-0.33l0.37,-1.99l-1.79,-2.49l-3.11,-0.72l-0.38,-0.59l0.79,-1.35l-0.04,-0.46l-0.82,-0.97l-0.61,0.01l-0.68,0.84l-0.1,-2.34l-1.23,-1.88l0.85,-3.47l1.77,-2.68l1.85,0.26l2.17,-0.22ZM406.26,132.86l-1.01,1.77l-1.57,-0.59l-1.16,0.01l0.37,-1.54l-0.39,-1.39l1.45,-0.1l2.3,1.84Z", "name": "United Kingdom"}, "GA": {"path": "M453.24,279.52l-0.08,0.98l0.7,1.29l2.36,0.24l-0.98,2.63l1.18,1.79l0.25,1.78l-0.29,1.52l-0.6,0.93l-1.84,-0.09l-1.23,-1.11l-0.66,0.23l-0.15,0.84l-1.42,0.26l-1.02,0.7l-0.11,0.52l0.77,1.35l-1.34,0.97l-3.94,-4.3l-1.44,-2.45l0.06,-0.6l0.54,-0.81l1.05,-3.46l4.17,-0.07l0.4,-0.4l-0.02,-2.66l2.39,0.21l1.25,-0.27Z", "name": "Gabon"}, "GN": {"path": "M391.8,254.11l0.47,0.8l1.11,-0.32l0.98,0.7l1.07,0.2l2.26,-1.22l0.64,0.44l1.13,1.56l-0.48,1.4l0.8,0.3l-0.08,0.48l0.46,0.68l-0.35,1.36l1.05,2.61l-1.0,0.69l0.03,1.41l-0.72,-0.06l-1.08,1.0l-0.24,-0.27l0.07,-1.11l-1.05,-1.54l-1.79,0.21l-0.35,-2.01l-1.6,-2.18l-2.0,-0.0l-1.31,0.54l-1.95,2.18l-1.86,-2.19l-1.2,-0.78l-0.3,-1.11l-0.8,-0.85l0.65,-0.72l0.81,-0.03l1.64,-0.8l0.23,-1.87l2.67,0.64l0.89,-0.3l1.21,0.15Z", "name": "Guinea"}, "GM": {"path": "M379.31,251.39l0.1,-0.35l2.43,-0.07l0.74,-0.61l0.51,-0.03l0.77,0.49l-1.03,-0.3l-1.87,0.9l-1.65,-0.04ZM384.03,250.91l0.91,0.05l0.75,-0.24l-0.59,0.31l-1.08,-0.13Z", "name": "Gambia"}, "GL": {"path": "M353.02,1.2l14.69,4.67l-3.68,1.89l-22.97,0.86l-0.36,0.27l0.12,0.43l1.55,1.18l8.79,-0.66l7.48,2.07l4.86,-1.77l1.66,1.73l-2.53,3.19l-0.01,0.48l0.46,0.15l6.35,-2.2l12.06,-2.31l7.24,1.13l1.09,1.99l-9.79,4.01l-1.44,1.32l-7.87,0.98l-0.35,0.41l0.38,0.38l5.07,0.24l-2.53,3.58l-2.07,3.81l0.08,6.05l2.57,3.11l-3.22,0.2l-4.12,1.66l-0.05,0.72l4.45,2.65l0.51,3.75l-2.3,0.4l-0.25,0.64l2.79,3.69l-4.82,0.31l-0.36,0.29l0.16,0.44l2.62,1.8l-0.59,1.22l-3.3,0.7l-3.45,0.01l-0.29,0.68l3.03,3.12l0.02,1.34l-4.4,-1.73l-1.72,1.35l0.15,0.66l3.31,1.15l3.13,2.71l0.81,3.16l-3.85,0.75l-4.89,-4.26l-0.47,-0.03l-0.17,0.44l0.79,2.86l-2.71,2.21l-0.13,0.44l0.37,0.27l8.73,0.34l-12.32,6.64l-7.24,1.48l-2.94,0.08l-2.69,1.75l-3.43,4.41l-5.24,2.84l-1.73,0.18l-7.12,2.1l-2.15,2.52l-0.13,2.99l-1.19,2.45l-4.01,3.09l-0.14,0.44l0.97,2.9l-2.28,6.48l-3.1,0.2l-3.83,-3.07l-4.86,-0.02l-2.25,-1.93l-1.7,-3.79l-4.3,-4.84l-1.21,-2.49l-0.44,-3.8l-3.32,-3.63l0.84,-2.86l-1.56,-1.7l2.28,-4.6l3.83,-1.74l1.03,-1.96l0.52,-3.47l-0.59,-0.41l-4.17,2.21l-2.07,0.58l-2.72,-1.28l-0.15,-2.71l0.85,-2.09l2.01,-0.06l5.06,1.2l0.46,-0.23l-0.14,-0.49l-6.54,-4.47l-2.67,0.55l-1.58,-0.86l2.56,-4.01l-0.03,-0.48l-1.5,-1.74l-4.98,-8.5l-3.13,-1.96l0.03,-1.88l-0.24,-0.37l-6.85,-3.02l-5.36,-0.38l-12.7,0.58l-2.78,-1.57l-3.66,-2.77l5.73,-1.45l5.0,-0.28l0.38,-0.38l-0.35,-0.41l-10.67,-1.38l-5.3,-2.06l0.25,-1.54l18.41,-5.26l1.22,-2.27l-0.25,-0.55l-6.14,-1.86l1.68,-1.77l8.55,-4.03l3.59,-0.63l0.3,-0.54l-0.88,-2.27l5.47,-1.47l7.65,-0.95l7.55,-0.05l3.04,1.85l6.48,-3.27l5.81,2.22l3.56,0.5l5.16,1.94l0.5,-0.21l-0.17,-0.52l-5.71,-3.13l0.28,-2.13l8.12,-3.6l8.7,0.28l3.35,-2.34l8.71,-0.6l19.93,0.8Z", "name": "Greenland"}, "GH": {"path": "M420.53,257.51l-0.01,0.72l0.96,1.2l0.24,3.73l0.59,0.95l-0.51,2.1l0.19,1.41l1.02,2.21l-6.97,2.84l-1.8,-0.57l0.04,-0.89l-1.02,-2.04l0.61,-2.65l1.07,-2.32l-0.96,-6.47l5.01,0.07l0.94,-0.39l0.61,0.11Z", "name": "Ghana"}, "OM": {"path": "M568.09,230.93l-0.91,1.67l-1.22,0.04l-0.6,0.76l-0.41,1.51l0.27,1.58l-1.16,0.05l-1.56,0.97l-0.76,1.74l-1.62,0.05l-0.98,0.65l-0.17,1.15l-0.89,0.52l-1.49,-0.18l-2.4,0.94l-2.47,-5.4l7.35,-2.71l1.67,-5.23l-1.12,-2.09l0.05,-0.83l0.67,-1.0l0.07,-1.05l0.9,-0.42l-0.05,-2.07l0.7,-0.01l1.0,1.62l1.51,1.08l3.3,0.84l1.73,2.29l0.81,0.37l-1.23,2.35l-0.99,0.79Z", "name": "Oman"}, "TN": {"path": "M448.1,188.24l-1.0,1.27l-0.02,1.32l0.84,0.88l-0.28,2.09l-1.53,1.32l-0.12,0.42l0.48,1.54l1.42,0.32l0.53,1.11l0.9,0.52l-0.11,1.67l-3.54,2.64l-0.1,2.38l-0.58,0.3l-0.96,-4.45l-1.54,-1.25l-0.16,-0.78l-1.92,-1.56l-0.18,-1.76l1.51,-1.62l0.59,-2.34l-0.38,-2.78l0.42,-1.21l2.45,-1.05l1.29,0.26l-0.06,1.11l0.58,0.38l1.47,-0.73Z", "name": "Tunisia"}, "JO": {"path": "M518.64,201.38l-5.14,1.56l-0.19,0.65l2.16,2.39l-0.89,1.14l-1.71,0.34l-1.71,1.8l-2.34,-0.37l1.21,-4.32l0.56,-4.07l2.8,0.94l4.46,-2.71l0.79,2.66Z", "name": "Jordan"}, "HR": {"path": "M455.59,162.84l1.09,0.07l-0.82,0.94l-0.27,-1.01ZM456.96,162.92l0.62,-0.41l1.73,0.45l0.42,-0.4l-0.01,-0.59l0.86,-0.52l0.2,-1.05l1.63,-0.68l2.57,1.68l2.07,0.6l0.87,-0.31l1.05,1.57l-0.52,0.63l-1.05,-0.56l-1.68,0.04l-2.1,-0.5l-1.29,0.06l-0.57,0.49l-0.59,-0.47l-0.62,0.16l-0.46,1.7l1.79,2.42l2.79,2.75l-1.18,-0.87l-2.21,-0.87l-1.67,-1.78l0.13,-0.63l-1.05,-1.19l-0.32,-1.27l-1.42,-0.43Z", "name": "Croatia"}, "HT": {"path": "M237.05,238.38l-1.16,0.43l-0.91,-0.55l0.05,-0.2l2.02,0.31ZM237.53,238.43l1.06,0.12l-0.05,0.01l-1.01,-0.12ZM239.25,238.45l0.79,-0.51l0.06,-0.62l-1.02,-1.0l0.02,-0.82l-0.3,-0.4l-0.93,-0.32l3.16,0.45l0.02,1.84l-0.48,0.34l-0.08,0.58l0.54,0.72l-1.78,-0.26Z", "name": "Haiti"}, "HU": {"path": "M462.08,157.89l0.65,-1.59l-0.09,-0.44l0.64,-0.0l0.39,-0.34l0.1,-0.69l1.75,0.87l2.32,-0.37l0.43,-0.66l3.49,-0.78l0.69,-0.78l0.57,-0.14l2.57,0.93l0.67,-0.23l1.03,0.65l0.08,0.37l-1.42,0.71l-2.59,4.14l-1.8,0.53l-1.68,-0.1l-2.74,1.23l-1.85,-0.54l-2.54,-1.66l-0.66,-1.1Z", "name": "Hungary"}, "HN": {"path": "M199.6,249.52l-1.7,-1.21l0.06,-0.94l3.04,-2.14l2.37,0.28l1.27,-0.09l1.1,-0.52l1.3,0.28l1.14,-0.25l1.38,0.37l2.23,1.37l-2.36,0.93l-1.23,-0.39l-0.88,1.3l-1.28,0.99l-0.98,-0.22l-0.42,0.52l-0.96,0.05l-0.36,0.41l0.04,0.88l-0.52,0.6l-0.3,0.04l-0.3,-0.55l-0.66,-0.31l0.11,-0.67l-0.48,-0.65l-0.87,-0.26l-0.73,0.2Z", "name": "Honduras"}, "PR": {"path": "M256.17,238.73l-0.26,0.27l-2.83,0.05l-0.07,-0.55l1.95,-0.1l1.22,0.33Z", "name": "Puerto Rico"}, "PS": {"path": "M509.21,203.07l0.1,-0.06l-0.02,0.03l-0.09,0.03ZM509.36,202.91l-0.02,-0.63l-0.33,-0.16l0.31,-1.09l0.24,0.1l-0.2,1.78Z", "name": "Palestine"}, "PT": {"path": "M401.84,187.38l-0.64,0.47l-1.13,-0.35l-0.91,0.17l0.28,-1.78l-0.24,-1.78l-1.25,-0.56l-0.45,-0.84l0.17,-1.66l1.01,-1.18l0.69,-2.92l-0.04,-1.39l-0.59,-1.9l1.3,-0.85l0.84,1.35l3.1,-0.3l0.46,0.99l-1.05,0.94l-0.03,2.16l-0.41,0.57l-0.08,1.1l-0.79,0.18l-0.26,0.59l0.91,1.6l-0.63,1.75l0.76,1.09l-1.1,1.52l0.07,1.05Z", "name": "Portugal"}, "PY": {"path": "M274.9,336.12l0.74,1.52l-0.16,3.45l0.32,0.41l2.64,0.5l1.11,-0.47l1.4,0.59l0.36,0.6l0.53,3.42l1.27,0.4l0.98,-0.38l0.51,0.27l-0.0,1.18l-1.21,5.32l-2.09,1.9l-1.8,0.4l-4.71,-0.98l2.2,-3.63l-0.32,-1.5l-2.78,-1.28l-3.03,-1.94l-2.07,-0.44l-4.34,-4.06l0.91,-2.9l0.08,-1.42l1.07,-2.04l4.13,-0.72l2.18,0.03l2.05,1.17l0.03,0.59Z", "name": "Paraguay"}, "PA": {"path": "M213.8,263.68l0.26,-1.52l-0.36,-0.26l-0.01,-0.49l0.44,-0.1l0.93,1.4l1.26,0.03l0.77,0.49l1.38,-0.23l2.51,-1.11l0.86,-0.72l3.45,0.85l1.4,1.18l0.41,1.74l-0.21,0.34l-0.53,-0.12l-0.47,0.29l-0.16,0.6l-0.68,-1.28l0.45,-0.49l-0.19,-0.66l-0.47,-0.13l-0.54,-0.84l-1.5,-0.75l-1.1,0.16l-0.75,0.99l-1.62,0.84l-0.18,0.96l0.85,0.97l-0.58,0.45l-0.69,0.08l-0.34,-1.18l-1.27,0.03l-0.71,-1.05l-2.59,-0.46Z", "name": "Panama"}, "PG": {"path": "M808.58,298.86l2.54,2.56l-0.13,0.26l-0.33,0.12l-0.87,-0.78l-1.22,-2.16ZM801.41,293.04l0.5,0.29l0.26,0.27l-0.49,-0.35l-0.27,-0.21ZM803.17,294.58l0.59,0.5l0.08,1.06l-0.29,-0.91l-0.38,-0.65ZM796.68,298.41l0.52,0.75l1.43,-0.19l2.27,-1.81l-0.01,-1.43l1.12,0.16l-0.04,1.1l-0.7,1.28l-1.12,0.18l-0.62,0.79l-2.46,1.11l-1.17,-0.0l-3.08,-1.25l3.41,0.0l0.45,-0.68ZM789.15,303.55l2.31,1.8l1.59,2.61l1.34,0.13l-0.06,0.66l0.31,0.43l1.06,0.24l0.06,0.65l2.25,1.05l-1.22,0.13l-0.72,-0.63l-4.56,-0.65l-3.22,-2.87l-1.49,-2.34l-3.27,-1.1l-2.38,0.72l-1.59,0.86l-0.2,0.42l0.27,1.55l-1.55,0.68l-1.36,-0.4l-2.21,-0.09l-0.08,-15.41l8.39,2.93l2.95,2.4l0.6,1.64l4.02,1.49l0.31,0.68l-1.76,0.21l-0.33,0.52l0.55,1.68Z", "name": "Papua New Guinea"}, "PE": {"path": "M244.96,295.21l-1.26,-0.07l-0.57,0.42l-1.93,0.45l-2.98,1.75l-0.36,1.36l-0.58,0.8l0.12,1.37l-1.24,0.59l-0.22,1.22l-0.62,0.84l1.04,2.27l1.28,1.44l-0.41,0.84l0.32,0.57l1.48,0.13l1.16,1.37l2.21,0.07l1.63,-1.08l-0.13,3.02l0.3,0.4l1.14,0.29l1.31,-0.34l1.9,3.59l-0.48,0.85l-0.17,3.85l-0.94,1.59l0.35,0.75l-0.47,1.07l0.98,1.97l-2.1,3.82l-0.98,0.5l-2.17,-1.28l-0.39,-1.16l-4.95,-2.58l-4.46,-2.79l-1.84,-1.51l-0.91,-1.84l0.3,-0.96l-2.11,-3.33l-4.82,-9.68l-1.04,-1.2l-0.87,-1.94l-3.4,-2.48l0.58,-1.18l-1.13,-2.23l0.66,-1.49l1.45,-1.15l-0.6,0.98l0.07,0.92l0.47,0.36l1.74,0.03l0.97,1.17l0.54,0.07l1.42,-1.03l0.6,-1.84l1.42,-2.02l3.04,-1.04l2.73,-2.62l0.86,-1.74l-0.1,-1.87l1.44,1.02l0.9,1.25l1.06,0.59l1.7,2.73l1.86,0.31l1.45,-0.61l0.96,0.39l1.36,-0.19l1.45,0.89l-1.4,2.21l0.31,0.61l0.59,0.05l0.47,0.5Z", "name": "Peru"}, "PK": {"path": "M615.09,192.34l-1.83,1.81l-2.6,0.39l-3.73,-0.68l-1.58,1.33l-0.09,0.42l1.77,4.39l1.7,1.23l-1.69,1.27l-0.12,2.14l-2.33,2.64l-1.6,2.8l-2.46,2.67l-3.03,-0.07l-2.76,2.83l0.05,0.6l1.5,1.11l0.26,1.9l1.44,1.5l0.37,1.68l-5.01,-0.01l-1.78,1.7l-1.42,-0.52l-0.76,-1.87l-2.27,-2.15l-11.61,0.86l0.71,-2.34l3.43,-1.32l0.25,-0.44l-0.21,-1.24l-1.2,-0.65l-0.28,-2.46l-2.29,-1.14l-1.28,-1.94l2.82,0.94l2.62,-0.38l1.42,0.33l0.76,-0.56l1.71,0.19l3.25,-1.14l0.27,-0.36l0.08,-2.19l1.18,-1.32l1.68,0.0l0.58,-0.82l1.6,-0.3l1.19,0.16l0.98,-0.78l0.02,-1.88l0.93,-1.47l1.48,-0.66l0.19,-0.55l-0.66,-1.25l2.04,-0.11l0.69,-1.01l-0.02,-1.16l1.11,-1.06l-0.17,-1.78l-0.49,-1.03l1.15,-0.98l5.42,-0.91l2.6,-0.82l1.6,1.16l0.97,2.34l3.45,0.97Z", "name": "Pakistan"}, "PH": {"path": "M737.01,263.84l0.39,2.97l-0.44,1.18l-0.55,-1.53l-0.67,-0.14l-1.17,1.28l0.65,2.09l-0.42,0.69l-2.48,-1.23l-0.57,-1.49l0.65,-1.03l-0.1,-0.54l-1.59,-1.19l-0.56,0.08l-0.65,0.87l-1.23,0.0l-1.58,0.97l0.83,-1.8l2.56,-1.42l0.65,0.84l0.45,0.13l1.9,-0.69l0.56,-1.11l1.5,-0.06l0.38,-0.43l-0.09,-1.19l1.21,0.71l0.36,2.02ZM733.59,256.58l0.05,0.75l0.08,0.26l-0.8,-0.42l-0.18,-0.71l0.85,0.12ZM734.08,256.1l-0.12,-1.12l-1.0,-1.27l1.36,0.03l0.53,0.73l0.51,2.04l-1.27,-0.4ZM733.76,257.68l0.38,0.98l-0.32,0.15l-0.07,-1.13ZM724.65,238.43l1.46,0.7l0.72,-0.31l-0.32,1.17l0.79,1.71l-0.57,1.84l-1.53,1.04l-0.39,2.25l0.56,2.04l1.63,0.57l1.16,-0.27l2.71,1.23l-0.19,1.08l0.76,0.84l-0.08,0.36l-1.4,-0.9l-0.88,-1.27l-0.66,0.0l-0.38,0.55l-1.6,-1.31l-2.15,0.36l-0.87,-0.39l0.07,-0.61l0.66,-0.55l-0.01,-0.62l-0.75,-0.59l-0.72,0.44l-0.74,-0.87l-0.39,-2.49l0.32,0.27l0.66,-0.28l0.26,-3.97l0.7,-2.02l1.14,0.0ZM731.03,258.87l-0.88,0.85l-1.19,1.94l-1.05,-1.19l0.93,-1.1l0.32,-1.47l0.52,-0.06l-0.27,1.15l0.22,0.45l0.49,-0.12l1.0,-1.32l-0.08,0.85ZM726.83,255.78l0.83,0.38l1.17,-0.0l-0.02,0.48l-2.0,1.4l0.03,-2.26ZM724.81,252.09l-0.38,1.27l-1.42,-1.95l1.2,0.05l0.6,0.63ZM716.55,261.82l1.1,-0.95l0.03,-0.03l-0.28,0.36l-0.85,0.61ZM719.22,259.06l0.04,-0.06l0.8,-1.53l0.16,0.75l-1.0,0.84Z", "name": "Philippines"}, "PL": {"path": "M468.44,149.42l-1.11,-1.54l-1.86,-0.33l-0.48,-1.05l-1.72,-0.37l-0.65,0.69l-0.72,-0.36l0.11,-0.61l-0.33,-0.46l-1.75,-0.27l-1.04,-0.93l-0.94,-1.94l0.16,-1.22l-0.62,-1.8l-0.78,-1.07l0.57,-1.04l-0.48,-1.43l1.41,-0.83l6.91,-2.71l2.14,0.5l0.52,0.91l5.51,0.44l4.55,-0.05l1.07,0.31l0.48,0.84l0.15,1.58l0.65,1.2l-0.01,0.99l-1.27,0.58l-0.19,0.54l0.73,1.48l0.08,1.55l1.2,2.76l-0.17,0.58l-1.23,0.44l-2.27,2.72l0.18,0.95l-1.97,-1.03l-1.98,0.4l-1.36,-0.28l-1.24,0.58l-1.07,-0.97l-1.16,0.24Z", "name": "Poland"}, "ZM": {"path": "M481.47,313.3l0.39,0.31l2.52,0.14l0.99,1.17l2.01,0.35l1.4,-0.64l0.69,1.17l1.78,0.33l1.84,2.35l2.23,0.18l0.4,-0.43l-0.21,-2.74l-0.62,-0.3l-0.48,0.32l-1.98,-1.17l0.72,-5.29l-0.51,-1.18l0.57,-1.3l3.68,-0.62l0.26,0.63l1.21,0.63l0.9,-0.22l2.16,0.67l1.33,0.71l1.07,1.02l0.56,1.87l-0.88,2.7l0.43,2.09l-0.73,0.87l-0.76,2.37l0.59,0.68l-6.6,1.83l-0.29,0.44l0.19,1.45l-1.68,0.35l-1.43,1.02l-0.38,0.87l-0.87,0.26l-3.48,3.69l-4.16,-0.53l-1.52,-1.0l-1.77,-0.13l-1.83,0.52l-3.04,-3.4l0.11,-7.59l4.82,0.03l0.39,-0.49l-0.18,-0.76l0.33,-0.83l-0.4,-1.36l0.24,-1.05Z", "name": "Zambia"}, "EH": {"path": "M384.42,230.28l0.25,-0.79l1.06,-1.29l0.8,-3.51l3.38,-2.78l0.7,-1.81l0.06,4.84l-1.98,0.2l-0.94,1.59l0.39,3.56l-3.7,-0.01ZM392.01,218.1l0.7,-1.8l1.77,-0.24l2.09,0.34l0.95,-0.62l1.28,-0.07l-0.0,2.51l-6.79,-0.12Z", "name": "W. Sahara"}, "EE": {"path": "M485.71,115.04l2.64,0.6l2.56,0.11l-1.6,1.91l0.61,3.54l-0.81,0.87l-1.78,-0.01l-3.22,-1.76l-1.8,0.45l0.21,-1.53l-0.58,-0.41l-0.69,0.34l-1.26,-1.03l-0.17,-1.63l2.83,-0.92l3.05,-0.52Z", "name": "Estonia"}, "EG": {"path": "M492.06,205.03l1.46,0.42l2.95,-1.64l2.04,-0.21l1.53,0.3l0.59,1.19l0.69,0.04l0.41,-0.64l1.81,0.58l1.95,0.16l1.04,-0.51l1.42,4.08l-2.03,4.54l-1.66,-1.77l-1.76,-3.85l-0.64,-0.12l-0.36,0.67l1.04,2.88l3.44,6.95l1.78,3.04l2.03,2.65l-0.36,0.53l0.23,2.01l2.7,2.19l-28.41,0.0l0.0,-18.96l-0.73,-2.2l0.59,-1.56l-0.32,-1.26l0.68,-0.99l3.06,-0.04l4.82,1.52Z", "name": "Egypt"}, "ZA": {"path": "M467.14,373.21l-0.13,-1.96l-0.68,-1.56l0.7,-0.68l-0.13,-2.33l-4.56,-8.19l0.77,-0.86l0.6,0.45l0.69,1.31l2.83,0.72l1.5,-0.26l2.24,-1.39l0.19,-9.55l1.35,2.3l-0.21,1.5l0.61,1.2l0.4,0.19l1.79,-0.27l2.6,-2.07l0.69,-1.32l0.96,-0.48l2.19,1.04l2.04,0.13l1.77,-0.65l0.85,-2.12l1.38,-0.33l1.59,-2.76l2.15,-1.89l3.41,-1.87l2.0,0.45l1.02,-0.28l0.99,0.2l1.75,5.29l-0.38,3.25l-0.81,-0.23l-1.0,0.46l-0.87,1.68l-0.05,1.16l1.97,1.84l1.47,-0.29l0.69,-1.18l1.09,0.01l-0.76,3.69l-0.58,1.09l-2.2,1.79l-3.17,4.76l-2.8,2.83l-3.57,2.88l-2.53,1.05l-1.22,0.14l-0.51,0.7l-1.18,-0.32l-1.39,0.5l-2.59,-0.52l-1.61,0.33l-1.18,-0.11l-2.55,1.1l-2.1,0.44l-1.6,1.07l-0.85,0.05l-0.93,-0.89l-0.93,-0.15l-0.97,-1.13l-0.25,0.05ZM491.45,364.19l0.62,-0.93l1.48,-0.59l1.18,-2.19l-0.07,-0.49l-1.99,-1.69l-1.66,0.56l-1.43,1.14l-1.34,1.73l0.02,0.51l1.88,2.11l1.31,-0.16Z", "name": "South Africa"}, "EC": {"path": "M231.86,285.53l0.29,1.59l-0.69,1.45l-2.61,2.51l-3.13,1.11l-1.53,2.18l-0.49,1.68l-1.0,0.73l-1.02,-1.11l-1.78,-0.16l0.67,-1.15l-0.24,-0.86l1.25,-2.13l-0.54,-1.09l-0.67,-0.08l-0.72,0.87l-0.87,-0.64l0.35,-0.69l-0.36,-1.96l0.81,-0.51l0.45,-1.51l0.92,-1.57l-0.07,-0.97l2.65,-1.33l2.75,1.35l0.77,1.05l2.12,0.35l0.76,-0.32l1.96,1.21Z", "name": "Ecuador"}, "IT": {"path": "M451.59,158.63l3.48,0.94l-0.21,1.17l0.3,0.83l-1.49,-0.24l-2.04,1.1l-0.21,0.39l0.13,1.45l-0.25,1.12l0.82,1.57l2.39,1.63l1.31,2.54l2.79,2.43l2.05,0.08l0.21,0.23l-0.39,0.33l0.09,0.67l4.05,1.97l2.17,1.76l-0.16,0.36l-1.17,-1.08l-2.18,-0.49l-0.44,0.2l-1.05,1.91l0.14,0.54l1.57,0.95l-0.19,0.98l-1.06,0.33l-1.25,2.34l-0.37,0.08l0.0,-0.33l1.0,-2.45l-1.73,-3.17l-1.12,-0.51l-0.88,-1.33l-1.51,-0.51l-1.27,-1.25l-1.75,-0.18l-4.12,-3.21l-1.62,-1.65l-1.03,-3.19l-3.53,-1.36l-1.3,0.51l-1.69,1.41l0.16,-0.72l-0.28,-0.47l-1.14,-0.33l-0.53,-1.96l0.72,-0.78l0.04,-0.48l-0.65,-1.17l0.8,0.39l1.4,-0.23l1.11,-0.84l0.52,0.35l1.19,-0.1l0.75,-1.2l1.53,0.33l1.36,-0.56l0.35,-1.14l1.08,0.32l0.68,-0.64l1.98,-0.44l0.42,0.82ZM459.19,184.75l-0.65,1.65l0.32,1.05l-0.31,0.89l-1.5,-0.85l-4.5,-1.67l0.19,-0.82l2.67,0.23l3.78,-0.48ZM443.93,176.05l1.18,1.66l-0.3,3.32l-1.06,-0.01l-0.77,0.73l-0.53,-0.44l-0.1,-3.37l-0.39,-1.22l1.04,0.01l0.92,-0.68Z", "name": "Italy"}, "VN": {"path": "M690.56,230.25l-2.7,1.82l-2.09,2.46l-0.63,1.95l4.31,6.45l2.32,1.65l1.43,1.94l1.11,4.59l-0.32,4.24l-1.93,1.54l-2.84,1.61l-2.11,2.15l-2.73,2.06l-0.59,-1.05l0.63,-1.53l-0.13,-0.47l-1.34,-1.04l1.51,-0.71l2.55,-0.18l0.3,-0.63l-0.82,-1.14l4.0,-2.07l0.31,-3.05l-0.57,-1.77l0.42,-2.66l-0.73,-1.97l-1.86,-1.76l-3.63,-5.29l-2.72,-1.46l0.36,-0.47l1.5,-0.64l0.21,-0.52l-0.97,-2.27l-0.37,-0.24l-2.83,-0.02l-2.24,-3.9l0.83,-0.4l4.39,-0.29l2.06,-1.31l1.15,0.89l1.88,0.4l-0.17,1.51l1.35,1.16l1.67,0.45Z", "name": "Vietnam"}, "SB": {"path": "M826.69,311.6l-0.61,0.09l-0.2,-0.33l0.37,0.15l0.44,0.09ZM824.18,307.38l-0.26,-0.3l-0.31,-0.91l0.03,0.0l0.54,1.21ZM823.04,309.33l-1.66,-0.22l-0.2,-0.52l1.16,0.28l0.69,0.46ZM819.28,304.68l1.14,0.65l0.02,0.03l-0.81,-0.44l-0.35,-0.23Z", "name": "Solomon Is."}, "ET": {"path": "M516.04,247.79l1.1,0.84l1.63,-0.45l0.68,0.47l1.63,0.03l2.01,0.94l1.73,1.66l1.64,2.07l-1.52,2.04l0.16,1.72l0.39,0.38l2.05,0.0l-0.36,1.03l2.86,3.58l8.32,3.08l1.31,0.02l-6.32,6.75l-3.1,0.11l-2.36,1.77l-1.47,0.04l-0.86,0.79l-1.38,-0.0l-1.32,-0.81l-2.29,1.05l-0.76,0.98l-3.29,-0.41l-3.07,-2.07l-1.8,-0.07l-0.62,-0.6l0.0,-1.24l-0.28,-0.38l-1.15,-0.37l-1.4,-2.59l-1.19,-0.68l-0.47,-1.0l-1.27,-1.23l-1.16,-0.22l0.43,-0.72l1.45,-0.28l0.41,-0.95l-0.03,-2.21l0.68,-2.44l1.05,-0.63l1.43,-3.06l1.57,-1.37l1.02,-2.51l0.35,-1.88l2.52,0.46l0.44,-0.24l0.58,-1.43Z", "name": "Ethiopia"}, "SO": {"path": "M525.13,288.48l-1.13,-1.57l-0.03,-8.86l2.66,-3.38l1.67,-0.13l2.13,-1.69l3.41,-0.23l7.08,-7.55l2.91,-3.69l0.08,-4.82l2.98,-0.67l1.24,-0.86l0.45,-0.0l-0.2,3.0l-1.21,3.62l-2.73,5.97l-2.13,3.65l-5.03,6.16l-8.56,6.4l-2.78,3.08l-0.8,1.56Z", "name": "Somalia"}, "ZW": {"path": "M498.91,341.09l-1.11,-0.22l-0.92,0.28l-2.09,-0.44l-1.5,-1.11l-1.89,-0.43l-0.62,-1.4l-0.01,-0.84l-0.3,-0.38l-0.97,-0.25l-2.71,-2.74l-1.92,-3.32l3.83,0.45l3.73,-3.82l1.08,-0.44l0.26,-0.77l1.25,-0.9l1.41,-0.26l0.5,0.89l1.99,-0.05l1.72,1.17l1.11,0.17l1.05,0.66l0.01,2.99l-0.59,3.76l0.38,0.86l-0.23,1.23l-0.39,0.35l-0.63,1.81l-2.43,2.75Z", "name": "Zimbabwe"}, "ES": {"path": "M416.0,169.21l1.07,1.17l4.61,1.38l1.06,-0.57l2.6,1.26l2.71,-0.3l0.09,1.12l-2.14,1.8l-3.11,0.61l-0.31,0.31l-0.2,0.89l-1.54,1.69l-0.97,2.4l0.84,1.74l-1.32,1.27l-0.48,1.68l-1.88,0.65l-1.66,2.07l-5.36,-0.01l-1.79,1.08l-0.89,0.98l-0.88,-0.17l-0.79,-0.82l-0.68,-1.59l-2.37,-0.63l-0.11,-0.5l1.21,-1.82l-0.77,-1.13l0.61,-1.68l-0.76,-1.62l0.87,-0.49l0.09,-1.25l0.42,-0.6l0.03,-2.11l0.99,-0.69l0.13,-0.5l-1.03,-1.73l-1.46,-0.11l-0.61,0.38l-1.06,0.0l-0.52,-1.23l-0.53,-0.21l-1.32,0.67l-0.01,-1.49l-0.75,-0.96l3.03,-1.88l2.99,0.53l3.32,-0.02l2.63,0.51l6.01,-0.06Z", "name": "Spain"}, "ER": {"path": "M520.38,246.23l3.42,2.43l3.5,3.77l0.84,0.54l-0.95,-0.01l-3.51,-3.89l-2.33,-1.15l-1.73,-0.07l-0.91,-0.51l-1.26,0.51l-1.34,-1.02l-0.61,0.17l-0.66,1.61l-2.35,-0.43l-0.17,-0.67l1.29,-5.29l0.61,-0.61l1.95,-0.53l0.87,-1.01l1.17,2.41l0.68,2.33l1.49,1.43Z", "name": "Eritrea"}, "ME": {"path": "M468.91,172.53l-1.22,-1.02l0.47,-1.81l0.89,-0.72l2.26,1.51l-0.5,0.57l-0.75,-0.27l-1.14,1.73Z", "name": "Montenegro"}, "MD": {"path": "M488.41,153.73l1.4,-0.27l1.72,0.93l1.07,0.15l0.85,0.65l-0.14,0.84l0.96,0.85l1.12,2.47l-1.15,-0.07l-0.66,-0.41l-0.52,0.25l-0.09,0.86l-1.08,1.89l-0.27,-0.86l0.25,-1.34l-0.16,-1.6l-3.29,-4.34Z", "name": "Moldova"}, "MG": {"path": "M545.91,319.14l0.4,3.03l0.62,1.21l-0.21,1.02l-0.57,-0.8l-0.69,-0.01l-0.47,0.76l0.41,2.12l-0.18,0.87l-0.73,0.78l-0.15,2.14l-4.71,15.2l-1.06,2.88l-3.92,1.64l-3.12,-1.49l-0.6,-1.21l-0.19,-2.4l-0.86,-2.05l-0.21,-1.77l0.38,-1.62l1.21,-0.75l0.01,-0.76l1.19,-2.04l0.23,-1.66l-1.06,-2.99l-0.19,-2.21l0.81,-1.33l0.32,-1.46l4.63,-1.22l3.44,-3.0l0.85,-1.4l-0.08,-0.7l0.78,-0.04l1.38,-1.77l0.13,-1.64l0.45,-0.61l1.16,1.69l0.59,1.6Z", "name": "Madagascar"}, "MA": {"path": "M378.78,230.02l0.06,-0.59l0.92,-0.73l0.82,-1.37l-0.09,-1.04l0.79,-1.7l1.31,-1.58l0.96,-0.59l0.66,-1.55l0.09,-1.47l0.81,-1.48l1.72,-1.07l1.55,-2.69l1.16,-0.96l2.44,-0.39l1.94,-1.82l1.31,-0.78l2.09,-2.28l-0.51,-3.65l1.24,-3.7l1.5,-1.75l4.46,-2.57l2.37,-4.47l1.44,0.01l1.68,1.21l2.32,-0.19l3.47,0.65l0.8,1.54l0.16,1.71l0.86,2.96l0.56,0.59l-0.26,0.61l-3.05,0.44l-1.26,1.05l-1.33,0.22l-0.33,0.37l-0.09,1.78l-2.68,1.0l-1.07,1.42l-4.47,1.13l-4.04,2.01l-0.54,4.64l-1.15,0.06l-0.92,0.61l-1.96,-0.35l-2.42,0.54l-0.74,1.9l-0.86,0.4l-1.14,3.26l-3.53,3.01l-0.8,3.55l-0.96,1.1l-0.29,0.82l-4.95,0.18Z", "name": "Morocco"}, "UZ": {"path": "M598.64,172.75l-1.63,1.52l0.06,0.64l1.85,1.12l1.97,-0.64l2.21,1.17l-2.52,1.68l-2.59,-0.22l-0.18,-0.41l0.46,-1.23l-0.45,-0.53l-3.35,0.69l-2.1,3.51l-1.87,-0.12l-1.03,1.51l0.22,0.55l1.64,0.62l0.46,1.83l-1.19,2.49l-2.66,-0.53l0.05,-1.36l-0.26,-0.39l-3.3,-1.23l-2.56,-1.4l-4.4,-3.34l-1.34,-3.14l-1.08,-0.6l-2.58,0.13l-0.69,-0.44l-0.47,-2.52l-3.37,-1.6l-0.43,0.05l-2.07,1.72l-2.1,1.01l-0.21,0.47l0.28,1.01l-1.91,0.03l-0.09,-10.5l5.99,-1.7l6.19,3.54l2.71,2.84l7.05,-0.67l2.71,2.01l-0.17,2.81l0.39,0.42l0.9,0.02l0.44,2.14l0.38,0.32l2.94,0.09l0.95,1.42l1.28,-0.24l1.05,-2.04l4.43,-2.5Z", "name": "Uzbekistan"}, "MM": {"path": "M673.9,230.21l-1.97,1.57l-0.57,0.96l-1.4,0.6l-1.36,1.05l-1.99,0.36l-1.08,2.66l-0.91,0.4l-0.19,0.55l1.21,2.27l2.52,3.43l-0.79,1.91l-0.74,0.41l-0.17,0.52l0.65,1.37l1.61,1.95l0.25,2.58l0.9,2.13l-1.92,3.57l0.68,-2.25l-0.81,-1.74l0.19,-2.65l-1.05,-1.53l-1.24,-6.17l-1.12,-2.26l-0.6,-0.13l-4.34,3.02l-2.39,-0.65l0.77,-2.84l-0.52,-2.61l-1.91,-2.96l0.25,-0.75l-0.29,-0.51l-1.33,-0.3l-1.61,-1.93l-0.1,-1.3l0.82,-0.24l0.04,-1.64l1.02,-0.52l0.21,-0.45l-0.23,-0.95l0.54,-0.96l0.08,-2.22l1.46,0.45l0.47,-0.2l1.12,-2.19l0.16,-1.35l1.33,-2.16l-0.0,-1.52l2.89,-1.66l1.63,0.44l0.5,-0.44l-0.17,-1.4l0.64,-0.36l0.08,-1.04l0.77,-0.11l0.71,1.35l1.06,0.69l-0.03,3.86l-2.38,2.37l-0.3,3.15l0.46,0.43l2.28,-0.38l0.51,2.08l1.47,0.67l-0.6,1.8l0.19,0.48l2.97,1.48l1.64,-0.55l0.02,0.32Z", "name": "Myanmar"}, "ML": {"path": "M392.61,254.08l-0.19,-2.37l-0.99,-0.87l-0.44,-1.3l-0.09,-1.28l0.81,-0.58l0.35,-1.24l2.37,0.65l1.31,-0.47l0.86,0.15l0.66,-0.56l9.83,-0.04l0.38,-0.28l0.56,-1.8l-0.44,-0.65l-2.35,-21.95l3.27,-0.04l16.7,11.38l0.74,1.31l2.5,1.09l0.02,1.38l0.44,0.39l2.34,-0.21l0.01,5.38l-1.28,1.61l-0.26,1.49l-5.31,0.57l-1.07,0.92l-2.9,0.1l-0.86,-0.48l-1.38,0.36l-2.4,1.08l-0.6,0.87l-1.85,1.09l-0.43,0.7l-0.79,0.39l-1.44,-0.21l-0.81,0.84l-0.34,1.64l-1.91,2.02l-0.06,1.03l-0.67,1.22l0.13,1.16l-0.97,0.39l-0.23,-0.64l-0.52,-0.24l-1.35,0.4l-0.34,0.55l-2.69,-0.28l-0.37,-0.35l-0.02,-0.9l-0.65,-0.35l0.45,-0.64l-0.03,-0.53l-2.12,-2.44l-0.76,-0.01l-2.0,1.16l-0.78,-0.15l-0.8,-0.67l-1.21,0.23Z", "name": "Mali"}, "MN": {"path": "M676.61,146.48l3.81,1.68l5.67,-1.0l2.37,0.41l2.34,1.5l1.79,1.75l2.29,-0.03l3.12,0.52l2.47,-0.81l3.41,-0.59l3.53,-2.21l1.25,0.29l1.53,1.13l2.27,-0.21l-2.66,5.01l0.64,1.68l0.47,0.21l1.32,-0.38l2.38,0.48l2.02,-1.11l1.76,0.89l2.06,2.02l-0.13,0.53l-1.72,-0.29l-3.77,0.46l-1.88,0.99l-1.76,1.99l-3.71,1.17l-2.45,1.6l-3.83,-0.87l-0.41,0.17l-1.31,1.99l1.04,2.24l-1.52,0.9l-1.74,1.57l-2.79,1.02l-3.78,0.13l-4.05,1.05l-2.77,1.52l-1.16,-0.85l-2.94,0.0l-3.62,-1.79l-2.58,-0.49l-3.4,0.41l-5.12,-0.67l-2.63,0.06l-1.31,-1.6l-1.4,-3.0l-1.48,-0.33l-3.13,-1.94l-6.16,-0.93l-0.71,-1.06l0.86,-3.82l-1.93,-2.71l-3.5,-1.18l-1.95,-1.58l-0.5,-1.72l2.34,-0.52l4.75,-2.8l3.62,-1.47l2.18,0.97l2.46,0.05l1.81,1.53l2.46,0.12l3.95,0.71l2.43,-2.28l0.08,-0.48l-0.9,-1.72l2.24,-2.98l2.62,1.27l4.94,1.17l0.43,2.24Z", "name": "Mongolia"}, "MK": {"path": "M472.8,173.98l0.49,-0.71l3.57,-0.71l1.0,0.77l0.13,1.45l-0.65,0.53l-1.15,-0.05l-1.12,0.67l-1.39,0.22l-0.79,-0.55l-0.29,-1.03l0.19,-0.6Z", "name": "Macedonia"}, "MW": {"path": "M505.5,309.31l0.85,1.95l0.15,2.86l-0.69,1.65l0.71,1.8l0.06,1.28l0.49,0.64l0.07,1.06l0.4,0.55l0.8,-0.23l0.55,0.61l0.69,-0.21l0.34,0.6l0.19,2.94l-1.04,0.62l-0.54,1.25l-1.11,-1.08l-0.16,-1.56l0.51,-1.31l-0.32,-1.3l-0.99,-0.65l-0.82,0.12l-2.36,-1.64l0.63,-1.96l0.82,-1.18l-0.46,-2.01l0.9,-2.86l-0.94,-2.51l0.96,0.18l0.29,0.4Z", "name": "Malawi"}, "MR": {"path": "M407.36,220.66l-2.58,0.03l-0.39,0.44l2.42,22.56l0.36,0.43l-0.39,1.24l-9.75,0.04l-0.56,0.53l-0.91,-0.11l-1.27,0.45l-1.61,-0.66l-0.97,0.03l-0.36,0.29l-0.38,1.35l-0.42,0.23l-2.93,-3.4l-2.96,-1.52l-1.62,-0.03l-1.27,0.54l-1.12,-0.2l-0.65,0.4l-0.08,-0.49l0.68,-1.29l0.31,-2.43l-0.57,-3.91l0.23,-1.21l-0.69,-1.5l-1.15,-1.02l0.25,-0.39l9.58,0.02l0.4,-0.45l-0.46,-3.68l0.47,-1.04l2.12,-0.21l0.36,-0.4l-0.08,-6.4l7.81,0.13l0.41,-0.4l0.01,-3.31l7.76,5.35Z", "name": "Mauritania"}, "UG": {"path": "M498.55,276.32l0.7,-0.46l1.65,0.5l1.96,-0.57l1.7,0.01l1.45,-0.98l0.91,1.33l1.33,3.95l-2.57,4.03l-1.46,-0.4l-2.54,0.91l-1.37,1.61l-0.01,0.81l-2.42,-0.01l-2.26,1.01l-0.17,-1.59l0.58,-1.04l0.14,-1.94l1.37,-2.28l1.78,-1.58l-0.17,-0.65l-0.72,-0.24l0.13,-2.43Z", "name": "Uganda"}, "MY": {"path": "M717.47,273.46l-1.39,0.65l-2.12,-0.41l-2.88,-0.0l-0.38,0.28l-0.84,2.75l-0.99,0.96l-1.21,3.29l-1.73,0.45l-2.45,-0.68l-1.39,0.31l-1.33,1.15l-1.59,-0.14l-1.41,0.44l-1.44,-1.19l-0.18,-0.73l1.34,0.53l1.93,-0.47l0.75,-2.22l4.02,-1.03l2.75,-3.21l0.82,0.94l0.64,-0.05l0.4,-0.65l0.96,0.06l0.42,-0.36l0.24,-2.68l1.81,-1.64l1.21,-1.86l0.63,-0.01l1.07,1.05l0.34,1.28l3.44,1.35l-0.06,0.35l-1.37,0.1l-0.35,0.54l0.32,0.88ZM673.68,269.59l0.17,1.09l0.47,0.33l1.65,-0.3l0.87,-0.94l1.61,1.52l0.98,1.56l-0.12,2.81l0.41,2.29l0.95,0.9l0.88,2.44l-1.27,0.12l-5.1,-3.67l-0.34,-1.29l-1.37,-1.59l-0.33,-1.97l-0.88,-1.4l0.25,-1.68l-0.46,-1.05l1.63,0.84Z", "name": "Malaysia"}, "MX": {"path": "M133.12,200.41l0.2,0.47l9.63,3.33l6.96,-0.02l0.4,-0.4l0.0,-0.74l3.77,0.0l3.55,2.93l1.39,2.83l1.52,1.04l2.08,0.82l0.47,-0.14l1.46,-2.0l1.73,-0.04l1.59,0.98l2.05,3.35l1.47,1.56l1.26,3.14l2.18,1.02l2.26,0.58l-1.18,3.72l-0.42,5.04l1.79,4.89l1.62,1.89l0.61,1.52l1.2,1.42l2.55,0.66l1.37,1.1l7.54,-1.89l1.86,-1.3l1.14,-4.3l4.1,-1.21l3.57,-0.11l0.32,0.3l-0.06,0.94l-1.26,1.45l-0.67,1.71l0.38,0.7l-0.72,2.27l-0.49,-0.3l-1.0,0.08l-1.0,1.39l-0.47,-0.11l-0.53,0.47l-4.26,-0.02l-0.4,0.4l-0.0,1.06l-1.1,0.26l0.1,0.44l1.82,1.44l0.56,0.91l-3.19,0.21l-1.21,2.09l0.24,0.72l-0.2,0.44l-2.24,-2.18l-1.45,-0.93l-2.22,-0.69l-1.52,0.22l-3.07,1.16l-10.55,-3.85l-2.86,-1.96l-3.78,-0.92l-1.08,-1.19l-2.62,-1.43l-1.18,-1.54l-0.38,-0.81l0.66,-0.63l-0.18,-0.53l0.52,-0.76l0.01,-0.91l-2.0,-3.82l-2.21,-2.63l-2.53,-2.09l-1.19,-1.62l-2.2,-1.17l-0.3,-0.43l0.34,-1.48l-0.21,-0.45l-1.23,-0.6l-1.36,-1.2l-0.59,-1.78l-1.54,-0.47l-2.44,-2.55l-0.16,-0.9l-1.33,-2.03l-0.84,-1.99l-0.16,-1.33l-1.81,-1.1l-0.97,0.05l-1.31,-0.7l-0.57,0.22l-0.4,1.12l0.72,3.77l3.51,3.89l0.28,0.78l0.53,0.26l0.41,1.43l1.33,1.73l1.58,1.41l0.8,2.39l1.43,2.41l0.13,1.32l0.37,0.36l1.04,0.08l1.67,2.28l-0.85,0.76l-0.66,-1.51l-1.68,-1.54l-2.91,-1.87l0.06,-1.82l-0.54,-1.68l-2.91,-2.03l-0.55,0.09l-1.95,-1.1l-0.88,-0.94l0.68,-0.08l0.93,-1.01l0.08,-1.78l-1.93,-1.94l-1.46,-0.77l-3.75,-7.56l4.88,-0.42Z", "name": "Mexico"}, "IL": {"path": "M507.76,203.05l0.4,-0.78l0.18,0.4l-0.33,1.03l0.52,0.44l0.68,-0.22l-0.86,3.6l-1.16,-3.32l0.59,-0.74l-0.03,-0.41ZM508.73,200.34l0.37,-1.02l0.64,0.0l0.52,-0.51l-0.49,1.53l-0.56,-0.24l-0.48,0.23Z", "name": "Israel"}, "FR": {"path": "M444.48,172.62l-0.64,1.78l-0.58,-0.31l-0.49,-1.72l0.4,-0.89l1.0,-0.72l0.3,1.85ZM429.64,147.1l1.78,1.58l1.46,-0.13l2.1,1.42l1.35,0.27l1.23,0.83l3.04,0.5l-1.03,1.85l-0.3,2.12l-0.41,0.32l-0.95,-0.24l-0.5,0.43l0.06,0.61l-1.81,1.92l-0.04,1.42l0.55,0.38l0.88,-0.36l0.61,0.97l-0.03,1.0l0.57,0.91l-0.75,1.09l0.65,2.39l1.27,0.57l-0.18,0.82l-2.01,1.53l-4.77,-0.8l-3.82,1.0l-0.53,1.85l-2.49,0.34l-2.71,-1.31l-1.16,0.57l-4.31,-1.29l-0.72,-0.86l1.19,-1.78l0.39,-6.45l-2.58,-3.3l-1.9,-1.66l-3.72,-1.23l-0.19,-1.72l2.81,-0.61l4.12,0.81l0.47,-0.48l-0.6,-2.77l1.94,0.95l5.83,-2.54l0.92,-2.74l1.6,-0.49l0.24,0.78l1.36,0.33l1.05,1.19ZM289.01,278.39l-0.81,0.8l-0.78,0.12l-0.5,-0.66l-0.56,-0.1l-0.91,0.6l-0.46,-0.22l1.09,-2.96l-0.96,-1.77l-0.17,-1.49l1.07,-1.77l2.32,0.75l2.51,2.01l0.3,0.74l-2.14,3.96Z", "name": "France"}, "XS": {"path": "M531.15,258.94l1.51,0.12l5.13,-0.95l5.3,-1.48l-0.01,4.4l-2.67,3.39l-1.85,0.01l-8.04,-2.94l-2.55,-3.17l1.12,-1.71l2.04,2.34Z", "name": "Somaliland"}, "FI": {"path": "M492.17,76.39l-0.23,3.5l3.52,2.63l-2.08,2.88l-0.02,0.44l2.8,4.56l-1.59,3.31l2.16,3.24l-0.94,2.39l0.14,0.47l3.44,2.51l-0.77,1.62l-7.52,6.95l-4.5,0.31l-4.38,1.37l-3.8,0.74l-1.44,-1.96l-2.17,-1.11l0.5,-3.66l-1.16,-3.33l1.09,-2.08l2.21,-2.42l5.67,-4.32l1.64,-0.83l0.21,-0.42l-0.46,-2.02l-3.38,-1.89l-0.75,-1.43l-0.22,-6.74l-6.79,-4.8l0.8,-0.62l2.54,2.12l3.46,-0.12l3.0,0.96l2.51,-2.11l1.17,-3.08l3.55,-1.38l2.76,1.53l-0.95,2.79Z", "name": "Finland"}, "FJ": {"path": "M869.95,326.98l-1.21,0.41l-0.08,-0.23l2.97,-1.21l-0.14,0.42l-1.54,0.61ZM867.58,329.25l0.43,0.37l-0.27,0.88l-1.24,0.28l-1.04,-0.24l-0.14,-0.66l0.63,-0.58l0.92,0.26l0.7,-0.31Z", "name": "Fiji"}, "FK": {"path": "M274.36,425.85l1.44,1.08l-0.47,0.73l-3.0,0.89l-0.96,-1.0l-0.52,-0.05l-1.83,1.29l-0.73,-0.88l2.46,-1.64l1.93,0.76l1.67,-1.19Z", "name": "Falkland Is."}, "NI": {"path": "M202.33,252.67l0.81,-0.18l1.03,-1.02l-0.04,-0.88l0.68,-0.0l0.63,-0.54l0.97,0.22l1.53,-1.26l0.58,-0.99l1.17,0.34l2.41,-0.94l0.13,1.32l-0.81,1.94l0.1,2.74l-0.36,0.37l-0.11,1.75l-0.47,0.81l0.18,1.14l-1.73,-0.85l-0.71,0.27l-1.47,-0.6l-0.52,0.16l-4.01,-3.81Z", "name": "Nicaragua"}, "NL": {"path": "M430.31,143.39l0.6,-0.5l2.13,-4.8l3.2,-1.33l1.74,0.08l0.33,0.8l-0.59,2.92l-0.5,0.99l-1.26,0.0l-0.4,0.45l0.33,2.7l-2.2,-1.78l-2.62,0.58l-0.75,-0.11Z", "name": "Netherlands"}, "NO": {"path": "M491.44,67.41l6.8,2.89l-2.29,0.86l-0.15,0.65l2.33,2.38l-4.98,1.79l0.84,-2.45l-0.18,-0.48l-3.55,-1.8l-3.89,1.52l-1.42,3.38l-2.12,1.72l-2.64,-1.0l-3.11,0.21l-2.66,-2.22l-0.5,-0.01l-1.41,1.1l-1.44,0.17l-0.35,0.35l-0.32,2.47l-4.32,-0.64l-0.44,0.29l-0.58,2.11l-2.45,0.2l-4.15,7.68l-3.88,5.76l0.78,1.62l-0.64,1.16l-2.24,-0.06l-0.38,0.24l-1.66,3.89l0.15,5.17l1.57,2.04l-0.78,4.16l-2.02,2.48l-0.85,1.63l-1.3,-1.75l-0.58,-0.07l-4.87,4.19l-3.1,0.79l-3.16,-1.7l-0.85,-3.77l-0.77,-8.55l2.14,-2.31l6.55,-3.27l5.02,-4.17l10.63,-13.84l10.98,-8.7l5.35,-1.91l4.34,0.12l3.69,-3.64l4.49,0.19l4.37,-0.89ZM484.55,20.04l4.26,1.75l-3.1,2.55l-7.1,0.65l-7.08,-0.9l-0.37,-1.31l-0.37,-0.29l-3.44,-0.1l-2.08,-2.0l6.87,-1.44l3.9,1.31l2.39,-1.64l6.13,1.4ZM481.69,33.93l-4.45,1.74l-3.54,-0.99l1.12,-0.9l0.05,-0.58l-1.06,-1.22l4.22,-0.89l1.09,1.97l2.57,0.87ZM466.44,24.04l7.43,3.77l-5.41,1.86l-1.58,4.08l-2.26,1.2l-1.12,4.11l-2.61,0.18l-4.79,-2.86l1.84,-1.54l-0.1,-0.68l-3.69,-1.53l-4.77,-4.51l-1.73,-3.89l6.11,-1.82l1.54,1.92l3.57,-0.08l1.2,-1.96l3.32,-0.18l3.05,1.92Z", "name": "Norway"}, "NA": {"path": "M474.26,330.66l-0.97,0.04l-0.38,0.4l-0.07,8.9l-2.09,0.08l-0.39,0.4l-0.0,17.42l-1.98,1.23l-1.17,0.17l-2.44,-0.66l-0.48,-1.13l-0.99,-0.74l-0.54,0.05l-0.9,1.01l-1.53,-1.68l-0.93,-1.88l-1.99,-8.56l-0.06,-3.12l-0.33,-1.52l-2.3,-3.34l-1.91,-4.83l-1.96,-2.43l-0.12,-1.57l2.33,-0.79l1.43,0.07l1.81,1.13l10.23,-0.25l1.84,1.23l5.87,0.35ZM474.66,330.64l6.51,-1.6l1.9,0.39l-1.69,0.4l-1.31,0.83l-1.12,-0.94l-4.29,0.92Z", "name": "Namibia"}, "VU": {"path": "M839.04,322.8l0.22,1.14l-0.44,0.03l-0.2,-1.45l0.42,0.27Z", "name": "Vanuatu"}, "NC": {"path": "M838.78,341.24l-0.33,0.22l-2.9,-1.75l-3.26,-3.37l1.65,0.83l4.85,4.07Z", "name": "New Caledonia"}, "NE": {"path": "M454.75,226.53l1.33,1.37l0.48,0.07l1.27,-0.7l0.53,3.52l0.94,0.83l0.17,0.92l0.81,0.69l-0.44,0.95l-0.96,5.26l-0.13,3.22l-3.04,2.31l-1.22,3.57l1.02,1.24l-0.0,1.46l0.39,0.4l1.13,0.04l-0.9,1.25l-1.47,-2.42l-0.86,-0.29l-2.09,1.37l-1.74,-0.67l-1.45,-0.17l-0.85,0.35l-1.36,-0.07l-1.64,1.09l-1.06,0.05l-2.94,-1.28l-1.44,0.59l-1.01,-0.03l-0.97,-0.94l-2.7,-0.98l-2.69,0.3l-0.87,0.64l-0.47,1.6l-0.75,1.16l-0.12,1.53l-1.57,-1.1l-1.31,0.24l0.03,-0.81l-0.32,-0.41l-2.59,-0.52l-0.15,-1.16l-1.35,-1.6l-0.29,-1.0l0.13,-0.84l1.29,-0.08l1.08,-0.92l3.31,-0.22l2.22,-0.41l0.32,-0.34l0.2,-1.47l1.39,-1.88l-0.01,-5.66l3.36,-1.12l7.24,-5.12l8.42,-4.92l3.69,1.06Z", "name": "Niger"}, "NG": {"path": "M456.32,253.89l0.64,0.65l-0.28,1.04l-2.11,2.01l-2.03,5.18l-1.37,1.16l-1.15,3.18l-1.33,0.66l-1.46,-0.97l-1.21,0.16l-1.38,1.36l-0.91,0.24l-1.79,4.06l-2.33,0.81l-1.11,-0.07l-0.86,0.5l-1.71,-0.05l-1.19,-1.39l-0.89,-1.89l-1.77,-1.66l-3.95,-0.08l0.07,-5.21l0.42,-1.43l1.95,-2.3l-0.14,-0.91l0.43,-1.18l-0.53,-1.41l0.25,-2.92l0.72,-1.07l0.32,-1.34l0.46,-0.39l2.47,-0.28l2.34,0.89l1.15,1.02l1.28,0.04l1.22,-0.58l3.03,1.27l1.49,-0.14l1.36,-1.0l1.33,0.07l0.82,-0.35l3.45,0.8l1.82,-1.32l1.84,2.67l0.66,0.16Z", "name": "Nigeria"}, "NZ": {"path": "M857.8,379.65l1.86,3.12l0.44,0.18l0.3,-0.38l0.03,-1.23l0.38,0.27l0.57,2.31l2.02,0.94l1.81,0.27l1.57,-1.06l0.7,0.18l-1.15,3.59l-1.98,0.11l-0.74,1.2l0.2,1.11l-2.42,3.98l-1.49,0.92l-1.04,-0.85l1.21,-2.05l-0.81,-2.01l-2.63,-1.25l0.04,-0.57l1.82,-1.19l0.43,-2.34l-0.16,-2.03l-0.95,-1.82l-0.06,-0.72l-3.11,-3.64l-0.79,-1.52l1.56,1.45l1.76,0.66l0.65,2.34ZM853.83,393.59l0.57,1.24l0.59,0.16l1.42,-0.97l0.46,0.79l0.0,1.03l-2.47,3.48l-1.26,1.2l-0.06,0.5l0.55,0.87l-1.41,0.07l-2.33,1.38l-2.03,5.02l-3.02,2.16l-2.06,-0.06l-1.71,-1.04l-2.47,-0.2l-0.27,-0.73l1.22,-2.1l3.05,-2.94l1.62,-0.59l4.02,-2.82l1.57,-1.67l1.07,-2.16l0.88,-0.7l0.48,-1.75l1.24,-0.97l0.35,0.79Z", "name": "New Zealand"}, "NP": {"path": "M641.14,213.62l0.01,3.19l-1.74,0.04l-4.8,-0.86l-1.58,-1.39l-3.37,-0.34l-7.65,-3.7l0.8,-2.09l2.33,-1.7l1.77,0.75l2.49,1.76l1.38,0.41l0.99,1.35l1.9,0.52l1.99,1.17l5.49,0.9Z", "name": "Nepal"}, "XK": {"path": "M472.77,172.64l-1.08,-1.29l0.96,-0.77l0.29,-0.83l1.98,1.64l-0.36,0.67l-1.79,0.58Z", "name": "Kosovo"}, "CI": {"path": "M407.4,259.27l0.86,0.42l0.56,0.9l1.13,0.53l1.19,-0.61l0.97,-0.08l1.42,0.54l0.6,3.24l-1.03,2.08l-0.65,2.84l1.06,2.33l-0.06,0.53l-2.54,-0.47l-1.66,0.03l-3.06,0.46l-4.11,1.6l0.32,-3.06l-1.18,-1.31l-1.32,-0.66l0.42,-0.85l-0.2,-1.4l0.5,-0.67l0.01,-1.59l0.84,-0.32l0.26,-0.5l-1.15,-3.01l0.12,-0.5l0.51,-0.25l0.66,0.31l1.93,0.02l0.67,-0.71l0.71,-0.14l0.25,0.69l0.57,0.22l1.4,-0.61Z", "name": "C\u00f4te d'Ivoire"}, "CH": {"path": "M444.62,156.35l-0.29,0.87l0.18,0.53l1.13,0.58l1.0,0.1l-0.1,0.65l-0.79,0.38l-1.72,-0.37l-0.45,0.23l-0.45,1.04l-0.75,0.06l-0.84,-0.4l-1.32,1.0l-0.96,0.12l-0.88,-0.55l-0.81,-1.3l-0.49,-0.16l-0.63,0.26l0.02,-0.65l1.71,-1.66l0.1,-0.56l0.93,0.08l0.58,-0.46l1.99,0.02l0.66,-0.61l2.19,0.79Z", "name": "Switzerland"}, "CO": {"path": "M242.07,254.93l-1.7,0.59l-0.59,1.18l-1.7,1.69l-0.38,1.93l-0.67,1.43l0.31,0.57l1.03,0.13l0.25,0.9l0.57,0.64l-0.04,2.34l1.64,1.42l3.16,-0.24l1.26,0.28l1.67,2.06l0.41,0.13l4.09,-0.39l0.45,0.22l-0.92,1.95l-0.2,1.8l0.52,1.83l0.75,1.05l-1.12,1.1l0.07,0.63l0.84,0.51l0.74,1.29l-0.39,-0.45l-0.59,-0.01l-0.71,0.74l-4.71,-0.05l-0.4,0.41l0.03,1.57l0.33,0.39l1.11,0.2l-1.68,0.4l-0.29,0.38l-0.01,1.82l1.16,1.14l0.34,1.25l-1.05,7.05l-1.04,-0.87l1.26,-1.99l-0.13,-0.56l-2.18,-1.23l-1.38,0.2l-1.14,-0.38l-1.27,0.61l-1.55,-0.26l-1.38,-2.46l-1.23,-0.75l-0.85,-1.2l-1.67,-1.19l-0.86,0.13l-2.11,-1.32l-1.01,0.31l-1.8,-0.29l-0.52,-0.91l-3.09,-1.68l0.77,-0.52l-0.1,-1.12l0.41,-0.64l1.34,-0.32l2.0,-2.88l-0.11,-0.57l-0.66,-0.43l0.39,-1.38l-0.52,-2.1l0.49,-0.83l-0.4,-2.13l-0.97,-1.35l0.17,-0.66l0.86,-0.08l0.47,-0.75l-0.46,-1.63l1.41,-0.07l1.8,-1.69l0.93,-0.24l0.3,-0.38l0.45,-2.76l1.22,-1.0l1.44,-0.04l0.45,-0.5l1.91,0.12l2.93,-1.84l1.15,-1.14l0.91,0.46l-0.25,0.45Z", "name": "Colombia"}, "CN": {"path": "M740.23,148.97l4.57,1.3l2.8,2.17l0.98,2.9l0.38,0.27l3.8,0.0l2.32,-1.28l3.29,-0.75l-0.96,2.09l-1.02,1.28l-0.85,3.4l-1.52,2.73l-2.76,-0.5l-2.4,1.13l-0.21,0.45l0.64,2.57l-0.32,3.2l-0.94,0.06l-0.37,0.89l-0.91,-1.01l-0.64,0.07l-0.92,1.57l-3.73,1.25l-0.26,0.48l0.26,1.06l-1.5,-0.08l-1.09,-0.86l-0.56,0.06l-1.67,2.06l-2.7,1.56l-2.03,1.88l-3.4,0.83l-1.93,1.4l-1.15,0.34l0.33,-0.7l-0.41,-0.89l1.79,-1.79l0.02,-0.54l-1.32,-1.56l-0.48,-0.1l-2.24,1.09l-2.83,2.06l-1.51,1.83l-2.28,0.13l-1.55,1.49l-0.04,0.5l1.32,1.97l2.0,0.58l0.31,1.35l1.98,0.84l3.0,-1.96l2.0,1.02l1.49,0.11l0.22,0.83l-3.37,0.86l-1.12,1.48l-2.5,1.52l-1.29,1.99l0.14,0.56l2.57,1.48l0.97,2.7l3.17,4.63l-0.03,1.66l-1.35,0.65l-0.2,0.51l0.6,1.47l1.4,0.91l-0.89,3.82l-1.43,0.38l-3.85,6.44l-2.27,3.11l-6.78,4.57l-2.73,0.29l-1.45,1.04l-0.62,-0.61l-0.55,-0.01l-1.36,1.25l-3.39,1.27l-2.61,0.4l-1.1,2.79l-0.81,0.09l-0.49,-1.42l0.5,-0.85l-0.25,-0.59l-3.36,-0.84l-1.3,0.4l-2.31,-0.62l-0.94,-0.84l0.33,-1.28l-0.3,-0.49l-2.19,-0.46l-1.13,-0.93l-0.47,-0.02l-2.06,1.36l-4.29,0.28l-2.76,1.05l-0.28,0.43l0.32,2.53l-0.59,-0.03l-0.19,-1.34l-0.55,-0.34l-1.68,0.7l-2.46,-1.23l0.62,-1.87l-0.26,-0.51l-1.37,-0.44l-0.54,-2.22l-0.45,-0.3l-2.13,0.35l0.24,-2.48l2.39,-2.4l0.03,-4.31l-1.19,-0.92l-0.78,-1.49l-0.41,-0.21l-1.41,0.19l-1.98,-0.3l0.46,-1.07l-1.17,-1.7l-0.55,-0.11l-1.63,1.05l-2.25,-0.57l-2.89,1.73l-2.25,1.98l-1.75,0.29l-1.17,-0.71l-3.31,-0.65l-1.48,0.79l-1.04,1.27l-0.12,-1.17l-0.54,-0.34l-1.44,0.54l-5.55,-0.86l-1.98,-1.16l-1.89,-0.54l-0.99,-1.35l-1.34,-0.37l-2.55,-1.79l-2.01,-0.84l-1.21,0.56l-5.57,-3.45l-0.53,-2.31l1.19,0.25l0.48,-0.37l0.08,-1.42l-0.98,-1.56l0.15,-2.44l-2.69,-3.32l-4.12,-1.23l-0.67,-2.0l-1.92,-1.48l-0.38,-0.7l-0.51,-3.01l-1.52,-0.66l-0.7,0.13l-0.48,-2.05l0.55,-0.51l-0.09,-0.82l2.03,-1.19l1.6,-0.54l2.56,0.38l0.42,-0.22l0.85,-1.7l3.0,-0.33l1.1,-1.26l4.05,-1.77l0.39,-0.91l-0.17,-1.44l1.45,-0.67l0.2,-0.52l-2.07,-4.9l4.51,-1.12l1.37,-0.73l1.89,-5.51l4.98,0.86l1.51,-1.7l0.11,-2.87l1.99,-0.38l1.83,-2.06l0.49,-0.13l0.68,2.08l2.23,1.77l3.44,1.16l1.55,2.29l-0.92,3.49l0.96,1.67l6.54,1.13l2.95,1.87l1.47,0.35l1.06,2.62l1.53,1.91l3.05,0.08l5.14,0.67l3.37,-0.41l2.36,0.43l3.65,1.8l3.06,0.04l1.45,0.88l2.87,-1.59l3.95,-1.02l3.83,-0.14l3.06,-1.14l1.77,-1.6l1.72,-1.01l0.17,-0.49l-1.1,-2.05l1.02,-1.54l4.02,0.8l2.45,-1.61l3.76,-1.19l1.96,-2.13l1.63,-0.83l3.51,-0.4l1.92,0.34l0.46,-0.3l0.17,-1.5l-2.27,-2.22l-2.11,-1.09l-2.18,1.11l-2.32,-0.47l-1.29,0.32l-0.4,-0.82l2.73,-5.16l3.02,1.06l3.53,-2.06l0.18,-1.68l2.16,-3.35l1.49,-1.35l-0.03,-1.85l-1.07,-0.85l1.54,-1.26l2.98,-0.59l3.23,-0.09l3.64,0.99l2.04,1.16l3.29,6.71l0.92,3.19ZM696.92,237.31l-1.87,1.08l-1.63,-0.64l-0.06,-1.79l1.03,-0.98l2.58,-0.69l1.16,0.05l0.3,0.54l-0.98,1.06l-0.53,1.37Z", "name": "China"}, "CM": {"path": "M457.92,257.49l1.05,1.91l-1.4,0.16l-1.05,-0.23l-0.45,0.22l-0.54,1.19l0.08,0.45l1.48,1.47l1.05,0.45l1.01,2.46l-1.52,2.99l-0.68,0.68l-0.13,3.69l2.38,3.84l1.09,0.8l0.24,2.48l-3.67,-1.14l-11.27,-0.13l0.23,-1.79l-0.98,-1.66l-1.19,-0.54l-0.44,-0.97l-0.6,-0.42l1.71,-4.27l0.75,-0.13l1.38,-1.36l0.65,-0.03l1.71,0.99l1.93,-1.12l1.14,-3.18l1.38,-1.17l2.0,-5.14l2.17,-2.13l0.3,-1.64l-0.86,-0.88l0.03,-0.33l0.94,1.28l0.07,3.22Z", "name": "Cameroon"}, "CL": {"path": "M246.5,429.18l-3.14,1.83l-0.57,3.16l-0.64,0.05l-2.68,-1.06l-2.82,-2.33l-3.04,-1.89l-0.69,-1.85l0.63,-2.14l-1.21,-2.11l-0.31,-5.37l1.01,-2.91l2.57,-2.38l-0.18,-0.68l-3.16,-0.77l2.05,-2.47l0.77,-4.65l2.32,0.9l0.54,-0.29l1.31,-6.31l-0.22,-0.44l-1.68,-0.8l-0.56,0.28l-0.7,3.36l-0.81,-0.22l1.56,-9.41l1.15,-2.24l-0.71,-2.82l-0.18,-2.84l1.01,-0.33l3.26,-9.14l1.07,-4.22l-0.56,-4.21l0.74,-2.34l-0.29,-3.27l1.46,-3.34l2.04,-16.59l-0.66,-7.76l1.03,-0.53l0.54,-0.9l0.79,1.14l0.32,1.78l1.25,1.16l-0.69,2.55l1.33,2.9l0.97,3.59l0.46,0.29l1.5,-0.3l0.11,0.23l-0.76,2.44l-2.57,1.23l-0.23,0.37l0.08,4.33l-0.46,0.77l0.56,1.21l-1.58,1.51l-1.68,2.62l-0.89,2.47l0.2,2.7l-1.48,2.73l1.12,5.09l0.64,0.61l-0.01,2.29l-1.38,2.68l0.01,2.4l-1.89,2.04l0.02,2.75l0.69,2.57l-1.43,1.13l-1.26,5.68l0.39,3.51l-0.97,0.89l0.58,3.5l1.02,1.14l-0.65,1.02l0.15,0.57l1.0,0.53l0.16,0.69l-1.03,0.85l0.26,1.75l-0.89,4.03l-1.31,2.66l0.24,1.75l-0.71,1.83l-1.99,1.7l0.3,3.67l0.88,1.19l1.58,0.01l0.01,2.21l1.04,1.95l5.98,0.63ZM248.69,430.79l0.0,7.33l0.4,0.4l3.52,0.05l-0.44,0.75l-1.94,0.98l-2.49,-0.37l-1.88,-1.06l-2.55,-0.49l-5.59,-3.71l-2.38,-2.63l4.1,2.48l3.32,1.23l0.45,-0.12l1.29,-1.57l0.83,-2.32l2.05,-1.24l1.31,0.29Z", "name": "Chile"}, "XC": {"path": "M504.91,192.87l0.34,0.01l0.27,-0.07l-0.29,0.26l-0.31,-0.2Z", "name": "N. Cyprus"}, "CA": {"path": "M280.06,145.6l-1.67,2.88l0.07,0.49l0.5,0.04l1.46,-0.98l1.0,0.42l-0.56,0.72l0.17,0.62l2.22,0.89l1.35,-0.71l1.95,0.78l-0.66,2.01l0.5,0.51l1.32,-0.42l0.98,3.17l-0.91,2.41l-0.8,0.08l-1.23,-0.45l0.47,-2.25l-0.89,-0.83l-0.48,0.06l-2.78,2.63l-0.34,-0.02l1.02,-0.85l-0.14,-0.69l-2.4,-0.77l-7.4,0.08l-0.17,-0.41l1.3,-0.94l0.02,-0.64l-0.73,-0.58l1.85,-1.74l2.57,-5.16l1.47,-1.79l1.99,-1.05l0.46,0.06l-1.53,2.45ZM68.32,74.16l4.13,0.95l4.02,2.14l2.61,0.4l2.47,-1.89l2.88,-1.31l3.85,0.48l3.71,-1.94l3.82,-1.04l1.56,1.68l0.49,0.08l1.87,-1.04l0.65,-1.98l1.24,0.35l4.16,3.94l0.54,0.01l2.75,-2.49l0.26,2.59l0.49,0.35l3.08,-0.73l1.04,-1.27l2.73,0.23l3.83,1.86l5.86,1.61l3.47,0.75l2.44,-0.26l2.73,1.78l-2.98,1.81l-0.19,0.41l0.31,0.32l4.53,0.92l6.87,-0.5l2.0,-0.69l2.49,2.39l0.53,0.02l2.72,-2.16l-0.02,-0.64l-2.16,-1.54l1.15,-1.06l4.83,-0.61l1.84,0.95l2.48,2.31l3.01,-0.23l4.55,1.92l3.85,-0.67l3.61,0.1l0.41,-0.44l-0.25,-2.36l1.79,-0.61l3.49,1.32l-0.01,3.77l0.31,0.39l0.45,-0.22l1.48,-3.16l1.74,0.1l0.41,-0.3l1.13,-4.37l-2.78,-3.11l-2.8,-1.74l0.19,-4.64l2.71,-3.07l2.98,0.67l2.41,1.95l3.19,4.8l-1.99,1.97l0.21,0.68l4.33,0.84l-0.01,4.15l0.25,0.37l0.44,-0.09l3.07,-3.15l2.54,2.39l-0.61,3.33l2.42,2.88l0.61,0.0l2.61,-3.08l1.88,-3.82l0.17,-4.58l6.72,0.94l3.13,2.04l0.13,1.82l-1.76,2.19l-0.01,0.49l1.66,2.16l-0.26,1.71l-4.68,2.8l-3.28,0.61l-2.47,-1.2l-0.55,0.23l-0.73,2.04l-2.38,3.43l-0.74,1.77l-2.74,2.57l-3.44,0.25l-2.21,1.78l-0.28,2.53l-2.82,0.55l-3.12,3.22l-2.72,4.31l-1.03,3.17l-0.14,4.31l0.33,0.41l3.44,0.57l2.24,5.95l0.45,0.23l3.4,-0.69l4.52,1.51l2.43,1.31l1.91,1.73l3.1,0.96l2.62,1.46l6.6,0.54l-0.35,2.74l0.81,3.53l1.81,3.78l3.83,3.3l0.45,0.04l2.1,-1.28l1.37,-3.69l-1.31,-5.38l-1.45,-1.58l3.57,-1.47l2.84,-2.46l1.52,-2.8l-0.25,-2.55l-1.7,-3.07l-2.85,-2.61l2.8,-3.95l-1.08,-3.37l-0.79,-5.67l1.36,-0.7l6.76,1.41l2.12,-0.96l5.12,3.36l1.05,1.61l4.08,0.26l-0.06,2.87l0.83,4.7l0.3,0.32l2.16,0.54l1.73,2.06l0.5,0.09l3.63,-2.03l2.52,-4.19l1.26,-1.32l7.6,11.72l-0.92,2.04l0.16,0.51l3.3,1.97l2.22,1.98l4.1,0.98l1.43,0.99l0.95,2.79l2.1,0.68l0.84,1.08l0.17,3.45l-3.37,2.26l-4.22,1.24l-3.06,2.63l-4.06,0.51l-5.35,-0.69l-6.39,0.2l-2.3,2.41l-3.26,1.51l-6.47,7.15l-0.06,0.48l0.44,0.19l2.13,-0.52l4.17,-4.24l5.12,-2.62l3.52,-0.3l1.69,1.21l-2.12,2.21l0.81,3.47l1.02,2.61l3.47,1.6l4.14,-0.45l2.15,-2.8l0.26,1.48l1.14,0.8l-2.56,1.69l-5.5,1.82l-2.54,1.27l-2.74,2.15l-1.4,-0.16l-0.07,-2.01l4.14,-2.44l0.18,-0.45l-0.39,-0.29l-6.63,0.45l-1.39,-1.49l-0.14,-4.43l-1.11,-0.91l-1.82,0.39l-0.66,-0.66l-0.6,0.03l-1.91,2.39l-0.82,2.52l-0.8,1.27l-1.67,0.56l-0.46,0.76l-8.31,0.07l-1.21,0.62l-2.35,1.97l-0.71,-0.14l-1.37,0.96l-1.12,-0.48l-4.74,1.26l-0.9,1.17l0.21,0.62l1.73,0.3l-1.81,0.31l-1.85,0.81l-2.11,-0.13l-2.95,1.78l-0.69,-0.09l1.39,-2.1l1.73,-1.21l0.1,-2.29l1.16,-1.99l0.49,0.53l2.03,0.42l1.2,-1.16l0.02,-0.47l-2.66,-3.51l-2.28,-0.61l-5.64,-0.71l-0.4,-0.57l-0.79,0.13l0.2,-0.41l-0.22,-0.55l-0.68,-0.26l0.19,-1.26l-0.78,-0.73l0.31,-0.64l-0.29,-0.57l-2.6,-0.44l-0.75,-1.63l-0.94,-0.66l-4.31,-0.65l-1.13,1.19l-1.48,0.59l-0.85,1.06l-2.83,-0.76l-2.09,0.39l-2.39,-0.97l-4.24,-0.7l-0.57,-0.4l-0.41,-1.63l-0.4,-0.3l-0.85,0.02l-0.39,0.4l-0.01,0.85l-69.13,-0.01l-6.51,-4.52l-4.5,-1.38l-1.26,-2.66l0.33,-1.93l-0.23,-0.43l-3.01,-1.35l-0.55,-2.77l-2.89,-2.38l-0.04,-1.45l1.39,-1.83l-0.28,-2.55l-4.16,-2.2l-4.07,-6.6l-4.02,-3.22l-1.3,-1.88l-0.5,-0.13l-2.51,1.21l-2.23,1.87l-3.85,-3.88l-2.44,-1.04l-2.22,-0.13l0.03,-37.49ZM260.37,148.65l3.04,0.76l2.26,1.2l-3.78,-0.95l-1.53,-1.01ZM249.4,3.81l6.68,0.49l5.32,0.79l4.26,1.57l-0.07,1.1l-5.85,2.53l-6.02,1.21l-2.39,1.39l-0.18,0.45l0.39,0.29l4.01,-0.02l-4.65,2.82l-4.2,1.74l-4.19,4.59l-5.03,0.92l-1.67,1.15l-7.47,0.59l-0.37,0.37l0.32,0.42l2.41,0.49l-0.81,0.47l-0.12,0.59l1.83,2.41l-2.02,1.59l-3.81,1.51l-1.32,2.16l-3.38,1.53l-0.22,0.48l0.35,1.19l0.4,0.29l3.88,-0.18l0.03,0.61l-6.33,2.95l-6.41,-1.4l-7.43,0.79l-3.72,-0.62l-4.4,-0.25l-0.23,-1.83l4.29,-1.11l0.28,-0.51l-1.1,-3.45l1.0,-0.25l6.58,2.28l0.47,-0.16l-0.05,-0.49l-3.41,-3.45l-3.58,-0.98l1.48,-1.55l4.34,-1.29l0.97,-2.19l-0.16,-0.48l-3.42,-2.13l-0.81,-2.26l6.2,0.22l2.24,0.58l3.91,-2.1l0.2,-0.43l-0.35,-0.32l-5.64,-0.67l-8.73,0.36l-4.26,-1.9l-2.12,-2.4l-2.78,-1.66l-0.41,-1.52l3.31,-1.03l2.93,-0.2l4.91,-0.99l3.7,-2.27l2.87,0.3l2.62,1.67l0.56,-0.14l1.82,-3.2l3.13,-0.94l4.44,-0.69l7.53,-0.26l1.48,0.67l7.19,-1.06l10.8,0.79ZM203.85,57.54l0.01,0.42l1.97,2.97l0.68,-0.02l2.24,-3.72l5.95,-1.86l4.01,4.64l-0.35,2.91l0.5,0.43l4.95,-1.36l2.32,-1.8l5.31,2.28l3.27,2.11l0.3,1.84l0.48,0.33l4.42,-0.99l2.64,2.87l5.97,1.77l2.06,1.72l2.11,3.71l-4.19,1.86l-0.01,0.73l5.9,2.83l3.94,0.94l3.78,3.95l3.46,0.25l-0.63,2.37l-4.11,4.47l-2.76,-1.56l-3.9,-3.94l-3.59,0.41l-0.33,0.34l-0.19,2.72l2.63,2.38l3.42,1.89l0.94,0.97l1.55,3.75l-0.7,2.29l-2.74,-0.92l-6.25,-3.15l-0.51,0.13l0.05,0.52l6.07,5.69l0.18,0.59l-6.09,-1.39l-5.31,-2.24l-2.63,-1.66l0.6,-0.77l-0.12,-0.6l-7.39,-4.01l-0.59,0.37l0.03,0.79l-6.73,0.6l-1.69,-1.1l1.36,-2.46l4.51,-0.07l5.15,-0.52l0.31,-0.6l-0.74,-1.3l0.78,-1.84l3.21,-4.05l-0.67,-2.35l-1.11,-1.6l-3.84,-2.1l-4.35,-1.28l0.91,-0.63l0.06,-0.61l-2.65,-2.75l-2.34,-0.36l-1.89,-1.46l-0.53,0.03l-1.24,1.23l-4.36,0.55l-9.04,-0.99l-9.26,-1.98l-1.6,-1.22l2.22,-1.77l0.13,-0.44l-0.38,-0.27l-3.22,-0.02l-0.72,-4.25l1.83,-4.04l2.42,-1.85l5.5,-1.1l-1.39,2.35ZM261.19,159.33l2.07,0.61l1.44,-0.04l-1.15,0.63l-2.94,-1.23l-0.4,-0.68l0.36,-0.37l0.61,1.07ZM230.83,84.39l-2.37,0.18l-0.49,-1.63l0.93,-2.09l1.94,-0.51l1.62,0.99l0.02,1.52l-1.66,1.54ZM229.43,58.25l0.11,0.65l-4.87,-0.21l-2.72,0.62l-3.1,-2.57l0.08,-1.26l0.86,-0.23l5.57,0.51l4.08,2.5ZM222.0,105.02l-0.72,1.49l-0.63,-0.19l-0.48,-0.84l0.81,-0.99l0.65,0.05l0.37,0.46ZM183.74,38.32l2.9,1.7l4.79,-0.01l1.84,1.46l-0.49,1.68l0.23,0.48l2.82,1.14l1.76,1.26l7.01,0.65l4.1,-1.1l5.03,-0.43l3.93,0.35l2.48,1.77l0.46,1.7l-1.3,1.1l-3.56,1.01l-3.23,-0.59l-7.17,0.76l-5.09,0.09l-3.99,-0.6l-6.42,-1.54l-0.79,-2.51l-0.3,-2.49l-2.64,-2.5l-5.32,-0.72l-2.52,-1.4l0.68,-1.57l4.78,0.31ZM207.38,91.35l0.4,1.56l0.56,0.26l1.06,-0.52l1.32,0.96l5.42,2.57l0.2,1.68l0.46,0.35l1.68,-0.28l1.15,0.85l-1.55,0.87l-3.61,-0.88l-1.32,-1.69l-0.57,-0.06l-2.45,2.1l-3.12,1.79l-0.7,-1.87l-0.42,-0.26l-2.16,0.24l1.39,-1.39l0.32,-3.14l0.76,-3.35l1.18,0.22ZM215.49,102.6l-2.67,1.95l-1.4,-0.07l-0.3,-0.58l1.53,-1.48l2.84,0.18ZM202.7,24.12l2.53,1.59l-2.87,1.4l-4.53,4.05l-4.25,0.38l-5.03,-0.68l-2.45,-2.04l0.03,-1.62l1.82,-1.37l0.14,-0.45l-0.38,-0.27l-4.45,0.04l-2.59,-1.76l-1.41,-2.29l1.57,-2.32l1.62,-1.66l2.44,-0.39l0.25,-0.65l-0.6,-0.74l4.86,-0.25l3.24,3.11l8.16,2.3l1.9,3.61ZM187.47,59.2l-2.76,3.49l-2.38,-0.15l-1.44,-3.84l0.04,-2.2l1.19,-1.88l2.3,-1.23l5.07,0.17l4.11,1.02l-3.24,3.72l-2.88,0.89ZM186.07,48.79l-1.08,1.53l-3.34,-0.34l-2.56,-1.1l1.03,-1.75l3.25,-1.23l1.95,1.58l0.75,1.3ZM185.71,35.32l-5.3,-0.2l-0.32,-0.71l4.31,0.07l1.3,0.84ZM180.68,32.48l-3.34,1.0l-1.79,-1.1l-0.98,-1.87l-0.15,-1.73l4.1,0.53l2.67,1.7l-0.51,1.47ZM180.9,76.31l-1.1,1.08l-3.13,-1.23l-2.12,0.43l-2.71,-1.57l1.72,-1.09l1.55,-1.72l3.81,1.9l1.98,2.2ZM169.74,54.87l2.96,0.97l4.17,-0.57l0.41,0.88l-2.14,2.11l0.09,0.64l3.55,1.92l-0.4,3.72l-3.79,1.65l-2.17,-0.35l-1.72,-1.74l-6.02,-3.5l0.03,-0.85l4.68,0.54l0.4,-0.21l-0.05,-0.45l-2.48,-2.81l2.46,-1.95ZM174.45,40.74l1.37,1.73l0.07,2.44l-1.05,3.45l-3.79,0.47l-2.32,-0.69l0.05,-2.64l-0.44,-0.41l-3.68,0.35l-0.12,-3.1l2.45,0.1l3.67,-1.73l3.41,0.29l0.37,-0.26ZM170.05,31.55l0.67,1.56l-3.33,-0.49l-4.22,-1.77l-4.35,-0.16l1.4,-0.94l-0.06,-0.7l-2.81,-1.23l-0.12,-1.39l4.39,0.68l6.62,1.98l1.81,2.47ZM134.5,58.13l-1.02,1.82l0.45,0.58l5.4,-1.39l3.33,2.29l0.49,-0.03l2.6,-2.23l1.94,1.32l2.0,4.5l0.7,0.06l1.3,-2.29l-1.63,-4.46l1.69,-0.54l2.31,0.71l2.65,1.81l2.49,7.92l8.48,4.27l-0.19,1.35l-3.79,0.33l-0.26,0.67l1.4,1.49l-0.58,1.1l-4.23,-0.64l-4.43,-1.19l-3.0,0.28l-4.66,1.47l-10.52,1.04l-1.43,-2.02l-3.42,-1.2l-2.21,0.43l-2.51,-2.86l4.84,-1.05l3.6,0.19l3.27,-0.78l0.31,-0.39l-0.31,-0.39l-4.84,-1.06l-8.79,0.27l-0.85,-1.07l5.26,-1.66l0.27,-0.45l-0.4,-0.34l-3.8,0.06l-3.81,-1.06l1.81,-3.01l1.66,-1.79l6.48,-2.81l1.97,0.71ZM158.7,56.61l-1.7,2.44l-3.2,-2.75l0.37,-0.3l3.11,-0.18l1.42,0.79ZM149.61,42.73l1.01,1.89l0.5,0.18l2.14,-0.82l2.23,0.19l0.36,2.04l-1.33,2.09l-8.28,0.76l-6.35,2.15l-3.41,0.1l-0.19,-0.96l4.9,-2.08l0.23,-0.46l-0.41,-0.31l-11.25,0.59l-2.89,-0.74l3.04,-4.44l2.14,-1.32l6.81,1.69l4.58,3.06l4.37,0.39l0.36,-0.63l-3.36,-4.6l1.85,-1.53l2.18,0.51l0.77,2.26ZM144.76,34.41l-4.36,1.44l-3.0,-1.4l1.46,-1.24l3.47,-0.52l2.96,0.71l-0.52,1.01ZM145.13,29.83l-1.9,0.66l-3.67,-0.0l2.27,-1.61l3.3,0.95ZM118.92,65.79l-6.03,2.02l-1.33,-1.9l-5.38,-2.28l2.59,-5.05l2.16,-3.14l-0.02,-0.48l-1.97,-2.41l7.64,-0.7l3.6,1.02l6.3,0.27l4.42,2.95l-2.53,0.98l-6.24,3.43l-3.1,3.28l-0.11,2.01ZM129.54,35.53l-0.28,3.37l-1.72,1.62l-2.33,0.28l-4.61,2.19l-3.86,0.76l-2.64,-0.87l3.72,-3.4l5.01,-3.34l3.72,0.07l3.0,-0.67ZM111.09,152.69l-0.67,0.24l-3.85,-1.37l-0.83,-1.17l-2.12,-1.07l-0.66,-1.02l-2.4,-0.55l-0.74,-1.71l6.02,1.45l2.0,2.55l2.52,1.39l0.73,1.27ZM87.8,134.64l0.89,0.29l1.86,-0.21l-0.65,3.34l1.69,2.33l-1.31,-1.33l-0.99,-1.62l-1.17,-0.98l-0.33,-1.82Z", "name": "Canada"}, "CG": {"path": "M466.72,276.48l-0.1,1.03l-1.25,2.97l-0.19,3.62l-0.46,1.78l-0.23,0.63l-1.61,1.19l-1.21,1.39l-1.09,2.43l0.04,2.09l-3.25,3.24l-0.5,-0.24l-0.5,-0.83l-1.36,-0.02l-0.98,0.89l-1.68,-0.99l-1.54,1.24l-1.52,-1.96l1.57,-1.14l0.11,-0.52l-0.77,-1.35l2.1,-0.66l0.39,-0.73l1.05,0.82l2.21,0.11l1.12,-1.37l0.37,-1.81l-0.27,-2.09l-1.13,-1.5l1.0,-2.69l-0.13,-0.45l-0.92,-0.58l-1.6,0.17l-0.51,-0.94l0.1,-0.61l2.75,0.09l3.97,1.24l0.51,-0.33l0.17,-1.28l1.24,-2.21l1.28,-1.14l2.76,0.49Z", "name": "Congo"}, "CF": {"path": "M461.16,278.2l-0.26,-1.19l-1.09,-0.77l-0.84,-1.17l-0.29,-1.0l-1.04,-1.15l0.08,-3.43l0.58,-0.49l1.16,-2.35l1.85,-0.17l0.61,-0.62l0.97,0.58l3.15,-0.96l2.48,-1.92l0.02,-0.96l2.81,0.02l2.36,-1.17l1.93,-2.85l1.16,-0.93l1.11,-0.3l0.27,0.86l1.34,1.47l-0.39,2.01l0.3,1.01l4.01,2.75l0.17,0.93l2.63,2.31l0.6,1.44l2.08,1.4l-3.84,-0.21l-1.94,0.88l-1.23,-0.49l-2.67,1.2l-1.29,-0.18l-0.51,0.36l-0.6,1.22l-3.35,-0.65l-1.57,-0.91l-2.42,-0.83l-1.45,0.91l-0.97,1.27l-0.26,1.56l-3.22,-0.43l-1.49,1.33l-0.94,1.62Z", "name": "Central African Rep."}, "CD": {"path": "M487.01,272.38l2.34,-0.14l1.35,1.84l1.34,0.45l0.86,-0.39l1.21,0.12l1.07,-0.41l0.54,0.89l2.04,1.54l-0.14,2.72l0.7,0.54l-1.38,1.13l-1.53,2.54l-0.17,2.05l-0.59,1.08l-0.02,1.72l-0.72,0.84l-0.66,3.01l0.63,1.32l-0.44,4.26l0.64,1.47l-0.37,1.22l0.86,1.8l1.53,1.41l0.3,1.26l0.44,0.5l-4.08,0.75l-0.92,1.81l0.51,1.34l-0.74,5.43l0.17,0.38l2.45,1.46l0.54,-0.1l0.12,1.62l-1.28,-0.01l-1.85,-2.35l-1.94,-0.45l-0.48,-1.13l-0.55,-0.2l-1.41,0.74l-1.71,-0.3l-1.01,-1.18l-2.49,-0.19l-0.44,-0.77l-1.98,-0.21l-2.88,0.36l0.11,-2.41l-0.85,-1.13l-0.16,-1.36l0.32,-1.73l-0.46,-0.89l-0.04,-1.49l-0.4,-0.39l-2.53,0.02l0.1,-0.41l-0.39,-0.49l-1.28,0.01l-0.43,0.45l-1.62,0.32l-0.83,1.79l-1.09,-0.28l-2.4,0.52l-1.37,-1.91l-1.3,-3.3l-0.38,-0.27l-7.39,-0.03l-2.46,0.42l0.5,-0.45l0.37,-1.47l0.66,-0.38l0.92,0.08l0.73,-0.82l0.87,0.02l0.31,0.68l1.4,0.36l3.59,-3.63l0.01,-2.23l1.02,-2.29l2.69,-2.39l0.43,-0.99l0.49,-1.96l0.17,-3.51l1.25,-2.95l0.36,-3.14l0.86,-1.13l1.1,-0.66l3.57,1.73l3.65,0.73l0.46,-0.21l0.8,-1.46l1.24,0.19l2.61,-1.17l0.81,0.44l1.04,-0.03l0.59,-0.66l0.7,-0.16l1.81,0.25Z", "name": "Dem. Rep. Congo"}, "CZ": {"path": "M458.46,144.88l1.22,1.01l1.47,0.23l0.13,0.93l1.36,0.68l0.54,-0.2l0.24,-0.55l1.15,0.25l0.53,1.09l1.68,0.18l0.6,0.84l-1.04,0.73l-0.96,1.28l-1.6,0.17l-0.55,0.56l-1.04,-0.46l-1.05,0.15l-2.12,-0.96l-1.05,0.34l-1.2,1.12l-1.56,-0.87l-2.57,-2.1l-0.53,-1.88l4.7,-2.52l0.71,0.26l0.9,-0.28Z", "name": "Czech Rep."}, "CY": {"path": "M504.36,193.47l0.43,0.28l-1.28,0.57l-0.92,-0.28l-0.24,-0.46l2.01,-0.13Z", "name": "Cyprus"}, "CR": {"path": "M211.34,258.05l0.48,0.99l1.6,1.6l-0.54,0.45l0.29,1.42l-0.25,1.19l-1.09,-0.59l-0.05,-1.25l-2.46,-1.42l-0.28,-0.77l-0.66,-0.45l-0.45,-0.0l-0.11,1.04l-1.32,-0.95l0.31,-1.3l-0.36,-0.6l0.31,-0.27l1.42,0.58l1.29,-0.14l0.56,0.56l0.74,0.17l0.55,-0.27Z", "name": "Costa Rica"}, "CU": {"path": "M221.21,227.25l1.27,1.02l2.19,-0.28l4.43,3.33l2.08,0.43l-0.1,0.38l0.36,0.5l1.75,0.1l1.48,0.84l-3.11,0.51l-4.15,-0.03l0.77,-0.67l-0.04,-0.64l-1.2,-0.74l-1.49,-0.16l-0.7,-0.61l-0.56,-1.4l-0.4,-0.25l-1.34,0.1l-2.2,-0.66l-0.88,-0.58l-3.18,-0.4l-0.27,-0.16l0.58,-0.74l-0.36,-0.29l-2.72,-0.05l-1.7,1.29l-0.91,0.03l-0.61,0.69l-1.01,0.22l1.11,-1.29l1.01,-0.52l3.69,-1.01l3.98,0.21l2.21,0.84Z", "name": "Cuba"}, "SZ": {"path": "M500.35,351.36l0.5,2.04l-0.38,0.89l-1.05,0.21l-1.23,-1.2l-0.02,-0.64l0.83,-1.57l1.34,0.27Z", "name": "Swaziland"}, "SY": {"path": "M511.0,199.79l0.05,-1.33l0.54,-1.36l1.28,-0.99l0.13,-0.45l-0.41,-1.11l-1.14,-0.36l-0.19,-1.74l0.52,-1.0l1.29,-1.21l0.2,-1.18l0.59,0.23l2.62,-0.76l1.36,0.52l2.06,-0.01l2.95,-1.08l3.25,-0.26l-0.67,0.94l-1.28,0.66l-0.21,0.4l0.23,2.01l-0.88,3.19l-10.15,5.73l-2.15,-0.85Z", "name": "Syria"}, "KG": {"path": "M621.35,172.32l-3.87,1.69l-0.96,1.18l-3.04,0.34l-1.13,1.86l-2.36,-0.35l-1.99,0.63l-2.39,1.4l0.06,0.95l-0.4,0.37l-4.52,0.43l-3.02,-0.93l-2.37,0.17l0.11,-0.79l2.32,0.42l1.13,-0.88l1.99,0.2l3.21,-2.14l-0.03,-0.69l-2.97,-1.57l-1.94,0.65l-1.22,-0.74l1.71,-1.58l-0.12,-0.67l-0.36,-0.15l0.32,-0.77l1.36,-0.35l4.02,1.02l0.49,-0.3l0.35,-1.59l1.09,-0.48l3.42,1.22l1.11,-0.31l7.64,0.39l1.16,1.0l1.23,0.39Z", "name": "Kyrgyzstan"}, "KE": {"path": "M506.26,284.69l1.87,-2.56l0.93,-2.15l-1.38,-4.08l-1.06,-1.6l2.82,-2.75l0.79,0.26l0.12,1.41l0.86,0.83l1.9,0.11l3.28,2.13l3.57,0.44l1.05,-1.12l1.96,-0.9l0.82,0.68l1.16,0.09l-1.78,2.45l0.03,9.12l1.3,1.94l-1.37,0.78l-0.67,1.03l-1.08,0.46l-0.34,1.67l-0.81,1.07l-0.45,1.55l-0.68,0.56l-3.2,-2.23l-0.35,-1.58l-8.86,-4.98l0.14,-1.6l-0.57,-1.04Z", "name": "Kenya"}, "SS": {"path": "M481.71,263.34l1.07,-0.72l1.2,-3.18l1.36,-0.26l1.61,1.99l0.87,0.34l1.1,-0.41l1.5,0.07l0.57,0.53l2.49,0.0l0.44,-0.63l1.07,-0.4l0.45,-0.84l0.59,-0.33l1.9,1.33l1.6,-0.2l2.83,-3.33l-0.32,-2.21l1.59,-0.52l-0.24,1.6l0.3,1.83l1.35,1.18l0.2,1.87l0.35,0.41l0.02,1.53l-0.23,0.47l-1.42,0.25l-0.85,1.44l0.3,0.6l1.4,0.16l1.11,1.08l0.59,1.13l1.03,0.53l1.28,2.36l-4.41,3.98l-1.74,0.01l-1.89,0.55l-1.47,-0.52l-1.15,0.57l-2.96,-2.62l-1.3,0.49l-1.06,-0.15l-0.79,0.39l-0.82,-0.22l-1.8,-2.7l-1.91,-1.1l-0.66,-1.5l-2.62,-2.32l-0.18,-0.94l-2.37,-1.6Z", "name": "S. Sudan"}, "SR": {"path": "M283.12,270.19l2.1,0.53l-1.08,1.95l0.2,1.72l0.93,1.49l-0.59,2.03l-0.43,0.71l-1.12,-0.42l-1.32,0.22l-0.93,-0.2l-0.46,0.26l-0.25,0.73l0.33,0.7l-0.89,-0.13l-1.39,-1.97l-0.31,-1.34l-0.97,-0.31l-0.89,-1.47l0.35,-1.61l1.45,-0.82l0.33,-1.87l2.61,0.44l0.57,-0.47l1.75,-0.16Z", "name": "Suriname"}, "KH": {"path": "M689.52,249.39l0.49,1.45l-0.28,2.74l-4.0,1.86l-0.16,0.6l0.68,0.95l-2.06,0.17l-2.05,0.97l-1.82,-0.32l-2.12,-3.7l-0.55,-2.85l1.4,-1.85l3.02,-0.45l2.23,0.35l2.01,0.98l0.51,-0.14l0.95,-1.48l1.74,0.74Z", "name": "Cambodia"}, "SV": {"path": "M195.8,250.13l1.4,-1.19l2.24,1.45l0.98,-0.27l0.44,0.2l-0.27,1.05l-1.14,-0.03l-3.64,-1.21Z", "name": "El Salvador"}, "SK": {"path": "M476.82,151.17l-1.14,1.9l-2.73,-0.92l-0.82,0.2l-0.74,0.8l-3.46,0.73l-0.47,0.69l-1.76,0.33l-1.88,-1.0l-0.18,-0.81l0.38,-0.75l1.87,-0.32l1.74,-1.89l0.83,0.16l0.79,-0.34l1.51,1.04l1.34,-0.63l1.25,0.3l1.65,-0.42l1.81,0.95Z", "name": "Slovakia"}, "KR": {"path": "M737.51,185.84l0.98,-0.1l0.87,-1.17l2.69,-0.32l0.33,-0.29l1.76,2.79l0.58,1.76l0.02,3.12l-0.8,1.32l-2.21,0.55l-1.93,1.13l-1.8,0.19l-0.2,-1.1l0.43,-2.28l-0.95,-2.56l1.43,-0.37l0.23,-0.62l-1.43,-2.06Z", "name": "Korea"}, "SI": {"path": "M456.18,162.07l-0.51,-1.32l0.18,-1.05l1.69,0.2l1.42,-0.71l2.09,-0.07l0.62,-0.51l0.21,0.47l-1.61,0.67l-0.44,1.34l-0.66,0.24l-0.26,0.82l-1.22,-0.49l-0.84,0.46l-0.69,-0.04Z", "name": "Slovenia"}, "KP": {"path": "M736.77,185.16l-0.92,-0.42l-0.88,0.62l-1.21,-0.88l0.96,-1.15l0.59,-2.59l-0.46,-0.74l-2.09,-0.77l1.64,-1.52l2.72,-1.58l1.58,-1.91l1.11,0.78l2.17,0.11l0.41,-0.5l-0.3,-1.22l3.52,-1.18l0.94,-1.4l0.98,1.08l-2.19,2.18l0.01,2.14l-1.06,0.54l-1.41,1.4l-1.7,0.52l-1.25,1.09l-0.14,1.98l0.94,0.45l1.15,1.04l-0.13,0.26l-2.6,0.29l-1.13,1.29l-1.22,0.08Z", "name": "Dem. Rep. Korea"}, "KW": {"path": "M540.81,207.91l0.37,0.86l-0.17,0.76l0.6,1.53l-0.95,0.04l-0.82,-1.28l-1.57,-0.18l1.31,-1.88l1.22,0.17Z", "name": "Kuwait"}, "SN": {"path": "M390.09,248.21l0.12,1.55l0.49,1.46l0.96,0.82l0.05,1.28l-1.26,-0.19l-0.75,0.33l-1.84,-0.61l-5.84,-0.13l-2.54,0.51l-0.22,-1.03l1.77,0.04l2.01,-0.91l1.03,0.48l1.09,0.04l1.29,-0.62l0.14,-0.58l-0.51,-0.74l-1.81,0.25l-1.13,-0.63l-0.79,0.04l-0.72,0.61l-2.31,0.06l-0.92,-1.77l-0.81,-0.64l0.64,-0.35l2.46,-3.74l1.04,0.19l1.38,-0.56l1.19,-0.02l2.72,1.37l3.03,3.48Z", "name": "Senegal"}, "SL": {"path": "M394.46,264.11l-1.73,1.98l-0.58,1.33l-2.07,-1.06l-1.22,-1.26l-0.65,-2.39l1.16,-0.96l0.67,-1.17l1.21,-0.52l1.66,0.0l1.03,1.64l0.52,2.41Z", "name": "Sierra Leone"}, "KZ": {"path": "M552.8,172.89l0.46,-1.27l-0.48,-1.05l-2.96,-1.19l-1.06,-2.58l-1.37,-0.87l-0.03,-0.3l1.95,0.23l0.45,-0.38l0.08,-1.96l1.75,-0.41l2.1,0.45l0.48,-0.33l0.45,-3.04l-0.45,-2.09l-0.41,-0.31l-2.42,0.15l-2.36,-0.73l-2.87,1.37l-2.17,0.61l-0.85,-0.34l0.13,-1.61l-1.6,-2.12l-2.02,-0.08l-1.78,-1.82l1.29,-2.18l-0.57,-0.95l1.62,-2.91l2.21,1.63l0.63,-0.27l0.29,-2.22l4.92,-3.43l3.71,-0.08l8.4,3.6l2.92,-1.36l3.77,-0.06l3.11,1.66l0.51,-0.11l0.6,-0.81l3.31,0.13l0.39,-0.25l0.63,-1.57l-0.17,-0.5l-3.5,-1.98l1.87,-1.27l-0.13,-1.03l1.98,-0.72l0.18,-0.62l-1.59,-2.06l0.81,-0.82l9.23,-1.18l1.33,-0.88l6.18,-1.26l2.26,-1.42l4.08,0.68l0.73,3.33l0.51,0.3l2.48,-0.8l2.79,1.02l-0.17,1.56l0.43,0.44l2.55,-0.24l4.89,-2.53l0.03,0.32l3.15,2.61l5.56,8.47l0.65,0.02l1.12,-1.46l3.15,1.74l3.76,-0.78l1.15,0.49l1.14,1.8l1.84,0.76l0.99,1.29l3.35,-0.25l1.02,1.52l-1.6,1.81l-1.93,0.28l-0.34,0.38l-0.11,3.05l-1.13,1.16l-4.75,-1.0l-0.46,0.27l-1.76,5.47l-1.1,0.59l-4.91,1.23l-0.27,0.54l2.1,4.97l-1.37,0.63l-0.23,0.41l0.13,1.13l-0.88,-0.25l-1.42,-1.13l-7.89,-0.4l-0.92,0.31l-3.73,-1.22l-1.42,0.63l-0.53,1.66l-3.72,-0.94l-1.85,0.43l-0.76,1.4l-4.65,2.62l-1.13,2.08l-0.44,0.01l-0.92,-1.4l-2.87,-0.09l-0.45,-2.14l-0.38,-0.32l-0.8,-0.01l0.0,-2.96l-3.0,-2.22l-7.31,0.58l-2.35,-2.68l-6.71,-3.69l-6.45,1.83l-0.29,0.39l0.1,10.85l-0.7,0.08l-1.62,-2.17l-1.83,-0.96l-3.11,0.59l-0.64,0.51Z", "name": "Kazakhstan"}, "SA": {"path": "M537.53,210.34l2.0,0.24l0.9,1.32l1.49,-0.06l0.87,2.08l1.29,0.76l0.51,0.99l1.56,1.03l-0.1,1.9l0.32,0.9l1.58,2.47l0.76,0.53l0.7,-0.04l1.68,4.23l7.53,1.33l0.51,-0.29l0.77,1.25l-1.55,4.87l-7.29,2.52l-7.3,1.03l-2.34,1.17l-1.88,2.74l-0.76,0.28l-0.82,-0.78l-0.91,0.12l-2.88,-0.51l-3.51,0.25l-0.86,-0.56l-0.57,0.15l-0.66,1.27l0.16,1.11l-0.43,0.32l-0.93,-1.4l-0.33,-1.16l-1.23,-0.88l-1.27,-2.06l-0.78,-2.22l-1.73,-1.79l-1.14,-0.48l-1.54,-2.31l-0.21,-3.41l-1.44,-2.93l-1.27,-1.16l-1.33,-0.57l-1.31,-3.37l-0.77,-0.67l-0.97,-1.97l-2.8,-4.03l-1.06,-0.17l0.37,-1.96l0.2,-0.72l2.74,0.3l1.08,-0.84l0.6,-0.94l1.74,-0.35l0.65,-1.03l0.71,-0.4l0.1,-0.62l-2.06,-2.28l4.39,-1.22l0.48,-0.37l2.77,0.69l3.66,1.9l7.03,5.5l4.87,0.3Z", "name": "Saudi Arabia"}, "SE": {"path": "M480.22,89.3l-4.03,1.17l-2.43,2.86l0.26,2.57l-8.77,6.64l-1.78,5.79l1.78,2.68l2.22,1.96l-2.07,3.77l-2.72,1.13l-0.95,6.04l-1.29,3.01l-2.74,-0.31l-0.4,0.22l-1.31,2.59l-2.34,0.13l-0.75,-3.09l-2.08,-4.03l-1.83,-4.96l1.0,-1.93l2.14,-2.7l0.83,-4.45l-1.6,-2.17l-0.15,-4.94l1.48,-3.39l2.58,-0.15l0.87,-1.59l-0.78,-1.57l3.76,-5.59l4.04,-7.48l2.17,0.01l0.39,-0.29l0.57,-2.07l4.37,0.64l0.46,-0.34l0.33,-2.56l1.1,-0.13l6.94,4.87l0.06,6.32l0.66,1.36Z", "name": "Sweden"}, "SD": {"path": "M505.98,259.4l-0.34,-0.77l-1.17,-0.9l-0.26,-1.61l0.29,-1.81l-0.34,-0.46l-1.16,-0.17l-0.54,0.59l-1.23,0.11l-0.28,0.65l0.53,0.65l0.17,1.22l-2.44,3.0l-0.96,0.19l-2.39,-1.4l-0.95,0.52l-0.38,0.78l-1.11,0.41l-0.29,0.5l-1.94,0.0l-0.54,-0.52l-1.81,-0.09l-0.95,0.4l-2.45,-2.35l-2.07,0.54l-0.73,1.26l-0.6,2.1l-1.25,0.58l-0.75,-0.62l0.27,-2.65l-1.48,-1.78l-0.22,-1.48l-0.92,-0.96l-0.02,-1.29l-0.57,-1.16l-0.68,-0.16l0.69,-1.29l-0.18,-1.14l0.65,-0.62l0.03,-0.55l-0.36,-0.41l1.55,-2.97l1.91,0.16l0.43,-0.4l-0.1,-10.94l2.49,-0.01l0.4,-0.4l-0.0,-4.82l29.02,0.0l0.64,2.04l-0.49,0.66l0.36,2.69l0.93,3.16l2.12,1.55l-0.89,1.04l-1.72,0.39l-0.98,0.9l-1.43,5.65l0.24,1.15l-0.38,2.06l-0.96,2.38l-1.53,1.31l-1.32,2.91l-1.22,0.86l-0.37,1.34Z", "name": "Sudan"}, "DO": {"path": "M241.8,239.2l0.05,-0.65l-0.46,-0.73l0.42,-0.44l0.19,-1.0l-0.09,-1.53l1.66,0.01l1.99,0.63l0.33,0.67l1.28,0.19l0.33,0.76l1.0,0.08l0.8,0.62l-0.45,0.51l-1.13,-0.47l-1.88,-0.01l-1.27,0.59l-0.75,-0.55l-1.01,0.54l-0.79,1.4l-0.23,-0.61Z", "name": "Dominican Rep."}, "DJ": {"path": "M528.43,256.18l-0.45,0.66l-0.58,-0.25l-1.51,0.13l-0.18,-1.01l1.45,-1.95l0.83,0.17l0.77,-0.44l0.2,1.0l-1.2,0.51l-0.06,0.7l0.73,0.47Z", "name": "Djibouti"}, "DK": {"path": "M452.28,129.07l-1.19,2.24l-2.13,-1.6l-0.23,-0.95l2.98,-0.95l0.57,1.26ZM447.74,126.31l-0.26,0.57l-0.88,-0.07l-1.8,2.53l0.48,1.69l-1.09,0.36l-1.61,-0.39l-0.89,-1.69l-0.07,-3.43l0.96,-1.73l2.02,-0.2l1.09,-1.07l1.33,-0.67l-0.05,1.06l-0.73,1.41l0.3,1.0l1.2,0.64Z", "name": "Denmark"}, "DE": {"path": "M453.14,155.55l-0.55,-0.36l-1.2,-0.1l-1.87,0.57l-2.13,-0.13l-0.56,0.63l-0.86,-0.6l-0.96,0.09l-2.57,-0.93l-0.85,0.67l-1.47,-0.02l0.24,-1.75l1.23,-2.14l-0.28,-0.59l-3.52,-0.58l-0.92,-0.66l0.12,-1.2l-0.48,-0.88l0.27,-2.17l-0.37,-3.03l1.41,-0.22l0.63,-1.26l0.66,-3.19l-0.41,-1.18l0.26,-0.39l1.66,-0.15l0.33,0.54l0.62,0.07l1.7,-1.69l-0.54,-3.02l1.37,0.33l1.31,-0.37l0.31,1.18l2.25,0.71l-0.02,0.92l0.5,0.4l2.55,-0.65l1.34,-0.87l2.57,1.24l1.06,0.98l0.48,1.44l-0.57,0.74l-0.0,0.48l0.87,1.15l0.57,1.64l-0.14,1.29l0.82,1.7l-1.5,-0.07l-0.56,0.57l-4.47,2.15l-0.22,0.54l0.68,2.26l2.58,2.16l-0.66,1.11l-0.79,0.36l-0.23,0.43l0.32,1.87Z", "name": "Germany"}, "YE": {"path": "M528.27,246.72l0.26,-0.42l-0.22,-1.01l0.19,-1.5l0.92,-0.69l-0.07,-1.35l0.39,-0.75l1.01,0.47l3.34,-0.27l3.76,0.41l0.95,0.81l1.36,-0.58l1.74,-2.62l2.18,-1.09l6.86,-0.94l2.48,5.41l-1.64,0.76l-0.56,1.9l-6.23,2.16l-2.29,1.8l-1.93,0.05l-1.41,1.02l-4.24,0.74l-1.72,1.49l-3.28,0.19l-0.52,-1.18l0.02,-1.51l-1.34,-3.29Z", "name": "Yemen"}, "DZ": {"path": "M441.46,188.44l-0.32,1.07l0.39,2.64l-0.54,2.16l-1.58,1.82l0.37,2.39l1.91,1.55l0.18,0.8l1.42,1.03l1.84,7.23l0.12,1.16l-0.57,5.0l0.2,1.51l-0.87,0.99l-0.02,0.51l1.41,1.86l0.14,1.2l0.89,1.48l0.5,0.16l0.98,-0.41l1.73,1.08l0.82,1.23l-8.22,4.81l-7.23,5.11l-3.43,1.13l-2.3,0.21l-0.28,-1.59l-2.56,-1.09l-0.67,-1.25l-26.12,-17.86l0.01,-3.47l3.77,-1.88l2.44,-0.41l2.12,-0.75l1.08,-1.42l2.81,-1.05l0.35,-2.08l1.33,-0.29l1.04,-0.94l3.47,-0.69l0.46,-1.08l-0.1,-0.45l-0.58,-0.52l-0.82,-2.81l-0.19,-1.83l-0.78,-1.49l2.03,-1.31l2.63,-0.48l1.7,-1.22l2.31,-0.84l8.24,-0.73l1.49,0.38l2.28,-1.1l2.46,-0.02l0.92,0.6l1.35,-0.05Z", "name": "Algeria"}, "US": {"path": "M892.72,99.2l1.31,0.53l1.41,-0.37l1.89,0.98l1.89,0.42l-1.32,0.58l-2.9,-1.53l-2.08,0.22l-0.26,-0.15l0.07,-0.67ZM183.22,150.47l0.37,1.47l1.12,0.85l4.23,0.7l2.39,0.98l2.17,-0.38l1.85,0.5l-1.55,0.65l-3.49,2.61l-0.16,0.77l0.5,0.39l2.33,-0.61l1.77,1.02l5.15,-2.4l-0.31,0.65l0.25,0.56l1.36,0.38l1.71,1.16l4.7,-0.88l0.67,0.85l1.31,0.21l0.58,0.58l-1.34,0.17l-2.18,-0.32l-3.6,0.89l-2.71,3.25l0.35,0.9l0.59,-0.0l0.55,-0.6l-1.36,4.65l0.29,3.09l0.67,1.58l0.61,0.45l1.77,-0.44l1.6,-1.96l0.14,-2.21l-0.82,-1.96l0.11,-1.13l1.19,-2.37l0.44,-0.33l0.48,0.75l0.4,-0.29l0.4,-1.37l0.6,-0.47l0.24,-0.8l1.69,0.49l1.65,1.08l-0.03,2.37l-1.27,1.13l-0.0,1.13l0.87,0.36l1.66,-1.29l0.5,0.17l0.5,2.6l-2.49,3.75l0.17,0.61l1.54,0.62l1.48,0.17l1.92,-0.44l4.72,-2.15l2.16,-1.8l-0.05,-1.24l0.75,-0.22l3.92,0.36l2.12,-1.05l0.21,-0.4l-0.28,-1.48l3.27,-2.4l8.32,-0.02l0.56,-0.82l1.9,-0.77l0.93,-1.51l0.74,-2.37l1.58,-1.98l0.92,0.62l1.47,-0.47l0.8,0.66l-0.0,4.09l1.96,2.6l-2.34,1.31l-5.37,2.09l-1.83,2.72l0.02,1.79l0.83,1.59l0.54,0.23l-6.19,0.94l-2.2,0.89l-0.23,0.48l0.45,0.29l2.99,-0.46l-2.19,0.56l-1.13,0.0l-0.15,-0.32l-0.48,0.08l-0.76,0.82l0.22,0.67l0.32,0.06l-0.41,1.62l-1.27,1.58l-1.48,-1.07l-0.49,-0.04l-0.16,0.46l0.52,1.58l0.61,0.59l0.03,0.79l-0.95,1.38l-1.21,-1.22l-0.27,-2.27l-0.35,-0.35l-0.42,0.25l-0.48,1.27l0.33,1.41l-0.97,-0.27l-0.48,0.24l0.18,0.5l1.52,0.83l0.1,2.52l0.79,0.51l0.52,3.42l-1.42,1.88l-2.47,0.8l-1.71,1.66l-1.31,0.25l-1.27,1.03l-0.43,0.99l-2.69,1.78l-2.64,3.03l-0.45,2.12l0.45,2.08l0.85,2.38l1.09,1.9l0.04,1.2l1.16,3.06l-0.18,2.69l-0.55,1.43l-0.47,0.21l-0.89,-0.23l-0.49,-1.18l-0.87,-0.56l-2.75,-5.16l0.48,-1.68l-0.72,-1.78l-2.01,-2.38l-1.12,-0.53l-2.72,1.18l-1.47,-1.35l-1.57,-0.68l-2.99,0.31l-2.17,-0.3l-2.0,0.19l-1.15,0.46l-0.19,0.58l0.39,0.63l0.14,1.34l-0.84,-0.2l-0.84,0.46l-1.58,-0.07l-2.08,-1.44l-2.09,0.33l-1.91,-0.62l-3.73,0.84l-2.39,2.07l-2.54,1.22l-1.45,1.41l-0.61,1.38l0.34,3.71l-0.29,0.02l-3.5,-1.33l-1.25,-3.11l-1.44,-1.5l-2.24,-3.56l-1.76,-1.09l-2.27,-0.01l-1.71,2.07l-1.76,-0.69l-1.16,-0.74l-1.52,-2.98l-3.93,-3.16l-4.34,-0.0l-0.4,0.4l-0.0,0.74l-6.5,0.02l-9.02,-3.14l-0.34,-0.71l-5.7,0.49l-0.43,-1.29l-1.62,-1.61l-1.14,-0.38l-0.55,-0.88l-1.28,-0.13l-1.01,-0.77l-2.22,-0.27l-0.43,-0.3l-0.36,-1.58l-2.4,-2.83l-2.01,-3.85l-0.06,-0.9l-2.92,-3.26l-0.33,-2.29l-1.3,-1.66l0.52,-2.37l-0.09,-2.57l-0.78,-2.3l0.95,-2.82l0.61,-5.68l-0.47,-4.27l-1.46,-4.08l3.19,0.79l1.26,2.83l0.69,0.08l0.69,-1.14l-1.1,-4.79l68.76,-0.0l0.4,-0.4l0.14,-0.86ZM32.44,67.52l1.73,1.97l0.55,0.05l0.99,-0.79l3.65,0.24l-0.09,0.62l0.32,0.45l3.83,0.77l2.61,-0.43l5.19,1.4l4.84,0.43l1.89,0.57l3.42,-0.7l6.14,1.87l-0.03,38.06l0.38,0.4l2.39,0.11l2.31,0.98l3.9,3.99l0.55,0.04l2.4,-2.03l2.16,-1.04l1.2,1.71l3.95,3.14l4.09,6.63l4.2,2.29l0.06,1.83l-1.02,1.23l-1.16,-1.08l-2.04,-1.03l-0.67,-2.89l-3.28,-3.03l-1.65,-3.57l-6.35,-0.32l-2.82,-1.01l-5.26,-3.85l-6.77,-2.04l-3.53,0.3l-4.81,-1.69l-3.25,-1.63l-2.78,0.8l-0.28,0.46l0.44,2.21l-3.91,0.96l-2.26,1.27l-2.3,0.65l-0.27,-1.65l1.05,-3.42l2.49,-1.09l0.16,-0.6l-0.69,-0.96l-0.55,-0.1l-3.19,2.12l-1.78,2.56l-3.55,2.61l-0.04,0.61l1.56,1.52l-2.07,2.29l-5.11,2.57l-0.77,1.66l-3.76,1.77l-0.92,1.73l-2.69,1.38l-1.81,-0.22l-6.95,3.32l-3.97,0.91l4.85,-2.5l2.59,-1.86l3.26,-0.52l1.19,-1.4l3.42,-2.1l2.59,-2.27l0.42,-2.68l1.23,-2.1l-0.04,-0.46l-0.45,-0.11l-2.68,1.03l-0.63,-0.49l-0.53,0.03l-1.05,1.04l-1.36,-1.54l-0.66,0.08l-0.32,0.62l-0.58,-1.14l-0.56,-0.16l-2.41,1.42l-1.07,-0.0l-0.17,-1.75l0.3,-1.71l-1.61,-1.33l-3.41,0.59l-1.96,-1.63l-1.57,-0.84l-0.15,-2.21l-1.7,-1.43l0.82,-1.88l1.99,-2.12l0.88,-1.92l1.71,-0.24l2.04,0.51l1.87,-1.77l1.91,0.25l1.91,-1.23l0.17,-0.43l-0.47,-1.82l-1.07,-0.7l1.39,-1.17l0.12,-0.45l-0.39,-0.26l-1.65,0.07l-2.66,0.88l-0.75,0.78l-1.92,-0.8l-3.46,0.44l-3.44,-0.91l-1.06,-1.61l-2.65,-1.99l2.91,-1.43l5.5,-2.0l1.52,0.0l-0.26,1.62l0.41,0.46l5.29,-0.16l0.3,-0.65l-2.03,-2.59l-3.14,-1.68l-1.79,-2.12l-2.4,-1.83l-3.09,-1.24l1.04,-1.69l4.23,-0.14l3.36,-2.07l0.73,-2.27l2.39,-1.99l2.42,-0.52l4.65,-1.97l2.46,0.23l3.71,-2.35l3.5,0.89ZM37.6,123.41l-2.25,1.23l-0.95,-0.69l-0.29,-1.24l3.21,-1.63l1.42,0.21l0.67,0.7l-1.8,1.42ZM31.06,234.03l0.98,0.47l0.74,0.87l-1.77,1.07l-0.44,-1.53l0.49,-0.89ZM29.34,232.07l0.18,0.05l0.08,0.05l-0.16,0.03l-0.11,-0.14ZM25.16,230.17l0.05,-0.03l0.18,0.22l-0.13,-0.01l-0.1,-0.18ZM5.89,113.26l-1.08,0.41l-2.21,-1.12l1.53,-0.4l1.62,0.28l0.14,0.83Z", "name": "United States"}, "UY": {"path": "M286.85,372.74l-0.92,1.5l-2.59,1.44l-1.69,-0.52l-1.42,0.26l-2.39,-1.19l-1.52,0.08l-1.27,-1.3l0.16,-1.5l0.56,-0.79l-0.02,-2.73l1.21,-4.74l1.19,-0.21l2.37,2.0l1.08,0.03l4.36,3.17l1.22,1.6l-0.96,1.5l0.61,1.4Z", "name": "Uruguay"}, "LB": {"path": "M510.37,198.01l-0.88,0.51l1.82,-3.54l0.62,0.08l0.22,0.61l-1.13,0.88l-0.65,1.47Z", "name": "Lebanon"}, "LA": {"path": "M689.54,248.53l-1.76,-0.74l-0.49,0.15l-0.94,1.46l-1.32,-0.64l0.62,-0.98l0.11,-2.17l-2.04,-2.42l-0.25,-2.65l-1.9,-2.1l-2.15,-0.31l-0.78,0.91l-1.12,0.06l-1.05,-0.4l-2.06,1.2l-0.04,-1.59l0.61,-2.68l-0.36,-0.49l-1.35,-0.1l-0.11,-1.23l-0.96,-0.88l1.96,-1.89l0.39,0.36l1.33,0.07l0.42,-0.45l-0.34,-2.66l0.7,-0.21l1.28,1.81l1.11,2.35l0.36,0.23l2.82,0.02l0.71,1.67l-1.39,0.65l-0.72,0.93l0.13,0.6l2.91,1.51l3.6,5.25l1.88,1.78l0.56,1.62l-0.35,1.96Z", "name": "Lao PDR"}, "TW": {"path": "M724.01,226.68l-0.74,1.48l-0.9,-1.52l-0.25,-1.74l1.38,-2.44l1.73,-1.74l0.64,0.44l-1.85,5.52Z", "name": "Taiwan"}, "TT": {"path": "M266.64,259.32l0.28,-1.16l1.13,-0.22l-0.06,1.2l-1.35,0.18Z", "name": "Trinidad and Tobago"}, "TR": {"path": "M513.21,175.47l3.64,1.17l3.05,-0.44l2.1,0.26l3.11,-1.56l2.46,-0.13l2.19,1.33l0.33,0.82l-0.22,1.33l0.25,0.44l2.28,1.13l-1.17,0.57l-0.21,0.45l0.75,3.2l-0.41,1.16l1.13,1.92l-0.55,0.22l-0.9,-0.67l-2.91,-0.37l-1.24,0.46l-4.23,0.41l-2.81,1.05l-1.91,0.01l-1.52,-0.53l-2.58,0.75l-0.66,-0.45l-0.62,0.3l-0.12,1.45l-0.89,0.84l-0.47,-0.67l0.79,-1.3l-0.41,-0.2l-1.43,0.23l-2.0,-0.63l-2.02,1.65l-3.51,0.3l-2.13,-1.53l-2.7,-0.1l-0.86,1.24l-1.38,0.27l-2.29,-1.44l-2.71,-0.01l-1.37,-2.65l-1.68,-1.52l1.07,-1.99l-0.09,-0.49l-1.27,-1.12l2.37,-2.41l3.7,-0.11l1.28,-2.24l4.49,0.37l3.21,-1.97l2.81,-0.82l3.99,-0.06l4.29,2.07ZM488.79,176.72l-1.72,1.31l-0.5,-0.88l1.37,-2.57l-0.7,-0.85l1.7,-0.63l1.8,0.34l0.46,1.17l1.76,0.78l-2.87,0.32l-1.3,1.01Z", "name": "Turkey"}, "LK": {"path": "M624.16,268.99l-1.82,0.48l-0.99,-1.67l-0.42,-3.46l0.95,-3.43l1.21,0.98l2.26,4.19l-0.34,2.33l-0.85,0.58Z", "name": "Sri Lanka"}, "LV": {"path": "M489.16,122.85l0.96,0.66l0.22,1.65l0.68,1.76l-3.65,1.7l-2.23,-1.58l-1.29,-0.26l-0.68,-0.77l-2.42,0.34l-4.16,-0.23l-2.47,0.9l0.06,-1.98l1.13,-2.06l1.95,-1.02l2.12,2.58l2.01,-0.07l0.38,-0.33l0.44,-2.52l1.76,-0.53l3.06,1.7l2.15,0.07Z", "name": "Latvia"}, "LT": {"path": "M486.93,129.3l0.17,1.12l-1.81,0.98l-0.72,2.02l-2.47,1.18l-2.1,-0.02l-0.73,-1.05l-1.06,-0.3l-0.09,-1.87l-3.56,-1.13l-0.43,-2.36l2.48,-0.94l4.12,0.22l2.25,-0.31l0.52,0.69l1.24,0.21l2.19,1.56Z", "name": "Lithuania"}, "LU": {"path": "M436.08,149.45l-0.48,-0.07l0.3,-1.28l0.27,0.4l-0.09,0.96Z", "name": "Luxembourg"}, "LR": {"path": "M399.36,265.97l0.18,1.54l-0.48,0.99l0.08,0.47l2.47,1.8l-0.33,2.8l-2.65,-1.13l-5.78,-4.61l0.58,-1.32l2.1,-2.33l0.86,-0.22l0.77,1.14l-0.14,0.85l0.59,0.87l1.0,0.14l0.76,-0.99Z", "name": "Liberia"}, "LS": {"path": "M491.06,363.48l-0.49,0.15l-1.49,-1.67l1.1,-1.43l2.19,-1.44l1.51,1.27l-0.98,1.82l-1.23,0.38l-0.62,0.93Z", "name": "Lesotho"}, "TH": {"path": "M670.27,255.86l-1.41,3.87l0.15,2.0l0.38,0.36l1.38,0.07l0.9,2.04l0.55,2.34l1.4,1.44l1.61,0.38l0.96,0.97l-0.5,0.64l-1.1,0.2l-0.34,-1.18l-2.04,-1.1l-0.63,0.23l-0.63,-0.62l-0.48,-1.3l-2.56,-2.63l-0.73,0.41l0.95,-3.89l2.16,-4.22ZM670.67,254.77l-0.92,-2.18l-0.26,-2.61l-2.14,-3.06l0.71,-0.49l0.89,-2.59l-3.61,-5.45l0.87,-0.51l1.05,-2.58l1.74,-0.18l2.6,-1.59l0.76,0.56l0.13,1.39l0.37,0.36l1.23,0.09l-0.51,2.28l0.05,2.42l0.6,0.34l2.43,-1.42l0.77,0.39l1.47,-0.07l0.71,-0.88l1.48,0.14l1.71,1.88l0.25,2.65l1.92,2.11l-0.1,1.89l-0.61,0.86l-2.22,-0.33l-3.5,0.64l-1.6,2.12l0.36,2.58l-1.51,-0.79l-1.84,-0.01l0.28,-1.52l-0.4,-0.47l-2.21,0.01l-0.4,0.37l-0.19,2.74l-0.34,0.93Z", "name": "Thailand"}, "TF": {"path": "M596.68,420.38l-3.2,0.18l-0.05,-1.26l0.39,-1.41l1.3,0.78l2.08,0.35l-0.52,1.36Z", "name": "Fr. S. Antarctic Lands"}, "TG": {"path": "M422.7,257.63l-0.09,1.23l1.53,1.52l0.08,1.09l0.5,0.65l-0.11,5.62l0.49,1.47l-1.31,0.35l-1.02,-2.13l-0.18,-1.12l0.53,-2.19l-0.63,-1.16l-0.22,-3.68l-1.01,-1.4l0.07,-0.28l1.37,0.03Z", "name": "Togo"}, "TD": {"path": "M480.25,235.49l0.12,9.57l-2.1,0.05l-1.14,1.89l-0.69,1.63l0.34,0.73l-0.66,0.91l0.24,0.89l-0.86,1.95l0.45,0.5l0.6,-0.1l0.34,0.64l0.03,1.38l0.9,1.04l-1.45,0.43l-1.27,1.03l-1.83,2.76l-2.16,1.07l-2.31,-0.15l-0.86,0.25l-0.26,0.49l0.17,0.61l-2.11,1.68l-2.85,0.87l-1.09,-0.57l-0.73,0.66l-1.12,0.1l-1.1,-3.12l-1.25,-0.64l-1.22,-1.22l0.29,-0.64l3.01,0.04l0.35,-0.6l-1.3,-2.2l-0.08,-3.31l-0.97,-1.66l0.22,-1.04l-0.38,-0.48l-1.22,-0.04l0.0,-1.25l-0.98,-1.07l0.96,-3.01l3.25,-2.65l0.13,-3.33l0.95,-5.18l0.52,-1.07l-0.1,-0.48l-0.91,-0.78l-0.2,-0.96l-0.8,-0.58l-0.55,-3.65l2.1,-1.2l19.57,9.83Z", "name": "Chad"}, "LY": {"path": "M483.48,203.15l-0.75,1.1l0.29,1.39l-0.6,1.83l0.73,2.14l0.0,24.12l-2.48,0.01l-0.41,0.85l-19.41,-9.76l-4.41,2.28l-1.37,-1.33l-3.82,-1.1l-1.14,-1.65l-1.98,-1.23l-1.22,0.32l-0.66,-1.11l-0.17,-1.26l-1.28,-1.69l0.87,-1.19l-0.07,-4.34l0.43,-2.27l-0.86,-3.45l1.13,-0.76l0.22,-1.16l-0.2,-1.03l3.48,-2.61l0.29,-1.94l2.45,0.8l1.18,-0.21l1.98,0.44l3.15,1.18l1.37,2.54l5.72,1.67l2.64,1.35l1.61,-0.72l1.29,-1.34l-0.44,-2.34l0.66,-1.13l1.67,-1.21l1.57,-0.35l3.14,0.53l1.08,1.28l3.99,0.78l0.36,0.54Z", "name": "Libya"}, "AE": {"path": "M550.76,223.97l1.88,-0.4l3.84,0.02l4.78,-4.75l0.19,0.36l0.26,1.58l-0.81,0.01l-0.39,0.35l-0.08,2.04l-0.81,0.63l-0.01,0.96l-0.66,0.99l-0.39,1.41l-7.08,-1.25l-0.7,-1.96Z", "name": "United Arab Emirates"}, "VE": {"path": "M240.68,256.69l0.53,0.75l-0.02,1.06l-1.07,1.78l0.95,2.0l0.42,0.22l1.4,-0.44l0.56,-1.83l-0.77,-1.17l-0.1,-1.47l2.82,-0.93l0.26,-0.49l-0.28,-0.96l0.3,-0.28l0.66,1.31l1.96,0.26l1.4,1.22l0.08,0.68l0.39,0.35l4.81,-0.22l1.49,1.11l1.92,0.31l1.67,-0.84l0.22,-0.6l3.44,-0.14l-0.17,0.55l0.86,1.19l2.19,0.35l1.67,1.1l0.37,1.86l0.41,0.32l1.55,0.17l-1.66,1.35l-0.22,0.92l0.65,0.97l-1.67,0.54l-0.3,0.4l0.04,0.99l-0.56,0.57l-0.01,0.55l1.85,2.27l-0.66,0.69l-4.47,1.29l-0.72,0.54l-3.69,-0.9l-0.71,0.27l-0.02,0.7l0.91,0.53l-0.08,1.54l0.35,1.58l0.35,0.31l1.66,0.17l-1.3,0.52l-0.48,1.13l-2.68,0.91l-0.6,0.77l-1.57,0.13l-1.17,-1.13l-0.8,-2.52l-1.25,-1.26l1.02,-1.23l-1.29,-2.95l0.18,-1.62l1.0,-2.21l-0.2,-0.49l-1.14,-0.46l-4.02,0.36l-1.82,-2.1l-1.57,-0.33l-2.99,0.22l-1.06,-0.97l0.25,-1.23l-0.2,-1.01l-0.59,-0.69l-0.29,-1.06l-1.08,-0.39l0.78,-2.79l1.9,-2.11Z", "name": "Venezuela"}, "AF": {"path": "M600.7,188.88l-1.57,1.3l-0.1,0.48l0.8,2.31l-1.09,1.04l-0.03,1.27l-0.48,0.71l-2.16,-0.08l-0.37,0.59l0.78,1.48l-1.38,0.69l-1.06,1.69l0.06,1.7l-0.65,0.52l-0.91,-0.21l-1.91,0.36l-0.48,0.77l-1.88,0.13l-1.4,1.56l-0.18,2.32l-2.91,1.02l-1.65,-0.23l-0.71,0.55l-1.41,-0.3l-2.41,0.39l-3.52,-1.17l1.96,-2.35l-0.21,-1.78l-0.3,-0.34l-1.63,-0.4l-0.19,-1.58l-0.75,-2.03l0.95,-1.36l-0.19,-0.6l-0.73,-0.28l1.47,-4.8l2.14,0.9l2.12,-0.36l0.74,-1.34l1.77,-0.39l1.54,-0.92l0.63,-2.31l1.87,-0.5l0.49,-0.81l0.94,0.56l2.13,0.11l2.55,0.92l1.95,-0.83l0.65,0.43l0.56,-0.13l0.69,-1.12l1.57,-0.08l0.72,-1.66l0.79,-0.74l0.8,0.39l-0.17,0.56l0.71,0.58l-0.08,2.39l1.11,0.95ZM601.37,188.71l1.73,-0.71l1.43,-1.18l4.03,0.35l-2.23,0.74l-4.95,0.8Z", "name": "Afghanistan"}, "IQ": {"path": "M530.82,187.47l0.79,0.66l1.26,-0.28l1.46,3.08l1.63,0.94l0.14,1.23l-1.22,1.05l-0.53,2.52l1.73,2.67l3.12,1.62l1.15,1.88l-0.38,1.85l0.39,0.48l0.41,-0.0l0.02,1.07l0.76,0.94l-2.47,-0.1l-1.71,2.44l-4.31,-0.2l-7.02,-5.48l-3.73,-1.94l-2.88,-0.73l-0.85,-2.87l5.45,-3.02l0.95,-3.43l-0.19,-1.96l1.27,-0.7l1.22,-1.7l0.87,-0.36l2.69,0.34Z", "name": "Iraq"}, "IS": {"path": "M384.14,88.06l-0.37,2.61l2.54,2.51l-2.9,2.75l-9.19,3.4l-9.25,-1.66l1.7,-1.22l-0.1,-0.7l-4.05,-1.47l2.96,-0.53l0.33,-0.43l-0.11,-1.2l-0.33,-0.36l-4.67,-0.85l1.28,-2.04l3.45,-0.56l3.77,2.72l0.44,0.02l3.64,-2.16l3.3,1.08l3.98,-2.16l3.58,0.26Z", "name": "Iceland"}, "IR": {"path": "M533.43,187.16l-1.27,-2.15l0.42,-0.98l-0.71,-3.04l1.03,-0.5l0.33,0.83l1.26,1.35l2.05,0.51l1.11,-0.16l2.89,-2.11l0.62,-0.14l0.39,0.46l-0.72,1.2l0.06,0.49l1.56,1.53l0.65,0.04l0.67,1.81l2.56,0.83l1.87,1.48l3.69,0.49l3.91,-0.76l0.47,-0.73l2.17,-0.6l1.66,-1.54l1.51,0.08l1.18,-0.53l1.59,0.24l2.83,1.48l1.88,0.3l2.77,2.47l1.77,0.18l0.18,1.99l-1.68,5.49l0.24,0.5l0.61,0.23l-0.82,1.48l0.8,2.18l0.19,1.71l0.3,0.34l1.63,0.4l0.15,1.32l-2.15,2.35l-0.01,0.53l2.21,3.03l2.34,1.24l0.06,2.14l1.24,0.72l0.11,0.69l-3.31,1.27l-1.08,3.03l-9.68,-1.68l-0.99,-3.05l-1.43,-0.73l-2.17,0.46l-2.47,1.26l-2.83,-0.82l-2.46,-2.02l-2.41,-0.8l-3.42,-6.06l-0.48,-0.2l-1.18,0.39l-1.44,-0.82l-0.5,0.08l-0.65,0.74l-0.97,-1.01l-0.02,-1.31l-0.71,-0.39l0.26,-1.81l-1.29,-2.11l-3.13,-1.63l-1.58,-2.43l0.5,-1.9l1.31,-1.26l-0.19,-1.66l-1.74,-1.1l-1.57,-3.3Z", "name": "Iran"}, "AM": {"path": "M536.99,182.33l-0.28,0.03l-1.23,-2.13l-0.93,0.01l-0.62,-0.66l-0.69,-0.07l-0.96,-0.81l-1.56,-0.62l0.19,-1.12l-0.26,-0.79l2.72,-0.36l1.09,1.01l-0.17,0.92l1.02,0.78l-0.47,0.62l0.08,0.56l2.04,1.23l0.04,1.4Z", "name": "Armenia"}, "AL": {"path": "M470.32,171.8l0.74,0.03l0.92,0.89l-0.17,1.95l0.36,1.28l1.01,0.82l-1.82,2.83l-0.19,-0.61l-1.25,-0.89l-0.18,-1.2l0.53,-2.82l-0.54,-1.47l0.6,-0.83Z", "name": "Albania"}, "AO": {"path": "M461.55,300.03l1.26,3.15l1.94,2.36l2.47,-0.53l1.25,0.32l0.44,-0.18l0.93,-1.92l1.31,-0.08l0.41,-0.44l0.47,-0.0l-0.1,0.41l0.39,0.49l2.65,-0.02l0.03,1.19l0.48,1.01l-0.34,1.52l0.18,1.55l0.83,1.04l-0.13,2.85l0.54,0.39l3.96,-0.41l-0.1,1.79l0.39,1.05l-0.24,1.43l-4.7,-0.03l-0.4,0.39l-0.12,8.13l2.92,3.49l-3.83,0.88l-5.89,-0.36l-1.88,-1.24l-10.47,0.22l-1.3,-1.01l-1.85,-0.16l-2.4,0.77l-0.15,-1.06l0.33,-2.16l1.0,-3.45l1.35,-3.2l2.24,-2.8l0.33,-2.06l-0.13,-1.53l-0.8,-1.08l-1.21,-2.87l0.87,-1.62l-1.27,-4.12l-1.17,-1.53l2.47,-0.63l7.03,0.03ZM451.71,298.87l-0.47,-1.25l1.25,-1.11l0.32,0.3l-0.99,1.03l-0.12,1.03Z", "name": "Angola"}, "AR": {"path": "M249.29,428.93l-2.33,-0.52l-5.83,-0.43l-0.89,-1.66l0.05,-2.37l-0.45,-0.4l-1.43,0.18l-0.67,-0.91l-0.2,-3.13l1.88,-1.47l0.79,-2.04l-0.25,-1.7l1.3,-2.68l0.91,-4.15l-0.22,-1.69l0.85,-0.45l0.2,-0.44l-0.27,-1.16l-0.98,-0.68l0.59,-0.92l-0.05,-0.5l-1.04,-1.07l-0.52,-3.1l0.97,-0.86l-0.42,-3.58l1.2,-5.43l1.38,-0.98l0.16,-0.43l-0.75,-2.79l-0.01,-2.43l1.78,-1.75l0.06,-2.57l1.43,-2.85l0.01,-2.58l-0.69,-0.74l-1.09,-4.52l1.47,-2.7l-0.18,-2.79l0.85,-2.35l1.59,-2.46l1.73,-1.64l0.05,-0.52l-0.6,-0.84l0.44,-0.85l-0.07,-4.19l2.7,-1.44l0.86,-2.75l-0.21,-0.71l1.76,-2.01l2.9,0.57l1.38,1.78l0.68,-0.08l0.87,-1.87l2.39,0.09l4.95,4.77l2.17,0.49l3.0,1.92l2.47,1.0l0.25,0.82l-2.37,3.93l0.23,0.59l5.39,1.16l2.12,-0.44l2.45,-2.16l0.5,-2.38l0.76,-0.31l0.98,1.2l-0.04,1.8l-3.67,2.51l-2.85,2.66l-3.43,3.88l-1.3,5.07l0.01,2.72l-0.54,0.73l-0.36,3.28l3.14,2.64l-0.16,2.11l1.4,1.11l-0.1,1.09l-2.29,3.52l-3.55,1.49l-4.92,0.6l-2.71,-0.29l-0.43,0.51l0.5,1.65l-0.49,2.1l0.38,1.42l-1.19,0.83l-2.36,0.38l-2.3,-1.04l-1.38,0.83l0.41,3.64l1.69,0.91l1.4,-0.71l0.36,0.76l-2.04,0.86l-2.01,1.89l-0.97,4.63l-2.34,0.1l-2.09,1.78l-0.61,2.75l2.46,2.31l2.17,0.63l-0.7,2.32l-2.83,1.73l-1.73,3.86l-2.17,1.22l-1.16,1.67l0.75,3.76l1.04,1.28ZM256.71,438.88l-2.0,0.15l-1.4,-1.22l-3.82,-0.1l-0.0,-5.83l1.6,3.05l3.26,2.07l3.08,0.78l-0.71,1.1Z", "name": "Argentina"}, "AU": {"path": "M705.8,353.26l0.26,0.04l0.17,-0.47l-0.48,-1.42l0.92,1.11l0.45,0.15l0.27,-0.39l-0.1,-1.56l-1.98,-3.63l1.09,-3.31l-0.24,-1.57l0.34,-0.62l0.38,1.06l0.43,-0.19l0.99,-1.7l1.91,-0.83l1.29,-1.15l1.81,-0.91l0.96,-0.17l0.92,0.26l1.92,-0.95l1.47,-0.28l1.03,-0.8l1.43,0.04l2.78,-0.84l1.36,-1.15l0.71,-1.45l1.41,-1.26l0.3,-2.58l1.27,-1.59l0.78,1.65l0.54,0.19l1.07,-0.51l0.15,-0.6l-0.73,-1.0l0.45,-0.71l0.78,0.39l0.58,-0.3l0.28,-1.82l1.87,-2.14l1.12,-0.39l0.28,-0.58l0.62,0.17l0.53,-0.73l1.87,-0.57l1.65,1.05l1.35,1.48l3.39,0.38l0.43,-0.54l-0.46,-1.23l1.05,-1.79l1.04,-0.61l0.14,-0.55l-0.25,-0.41l0.88,-1.17l1.31,-0.77l1.3,0.27l2.1,-0.48l0.31,-0.4l-0.05,-1.3l-0.92,-0.77l1.48,0.56l1.41,1.07l2.11,0.65l0.81,-0.2l1.4,0.7l1.69,-0.66l0.8,0.19l0.64,-0.33l0.71,0.77l-1.33,1.94l-0.71,0.07l-0.35,0.51l0.24,0.86l-1.52,2.35l0.12,1.05l2.15,1.65l1.97,0.85l3.04,2.36l1.97,0.65l0.55,0.88l2.72,0.85l1.84,-1.1l2.07,-5.97l-0.42,-3.59l0.3,-1.73l0.47,-0.87l-0.31,-0.68l1.09,-3.28l0.46,-0.47l0.4,0.71l0.16,1.51l0.65,0.52l0.16,1.04l0.85,1.21l0.12,2.38l0.9,2.0l0.57,0.18l1.3,-0.78l1.69,1.7l-0.2,1.08l0.53,2.2l0.39,1.3l0.68,0.48l0.6,1.95l-0.19,1.48l0.81,1.76l6.01,3.69l-0.11,0.76l1.38,1.58l0.95,2.77l0.58,0.22l0.72,-0.41l0.8,0.9l0.61,0.01l0.46,2.41l4.81,4.71l0.66,2.02l-0.07,3.31l1.14,2.2l-0.13,2.24l-1.1,3.68l0.03,1.64l-0.47,1.89l-1.05,2.4l-1.9,1.47l-1.72,3.51l-2.38,6.09l-0.24,2.82l-1.14,0.8l-2.85,0.15l-2.31,1.19l-2.51,2.25l-3.09,-1.57l0.3,-1.15l-0.54,-0.47l-1.5,0.63l-2.01,1.94l-7.12,-2.18l-1.48,-1.63l-1.14,-3.74l-1.45,-1.26l-1.81,-0.26l0.56,-1.18l-0.61,-2.1l-0.72,-0.1l-1.14,1.82l-0.9,0.21l0.63,-0.82l0.36,-1.55l0.92,-1.31l-0.13,-2.34l-0.7,-0.22l-2.0,2.34l-1.51,0.93l-0.94,2.01l-1.35,-0.81l-0.02,-1.52l-1.57,-2.04l-1.09,-0.88l0.24,-0.33l-0.14,-0.59l-3.21,-1.69l-1.83,-0.12l-2.54,-1.35l-4.58,0.28l-6.02,1.9l-2.53,-0.13l-2.62,1.41l-2.13,0.63l-1.49,2.6l-3.49,0.31l-2.29,-0.5l-3.48,0.43l-1.6,1.47l-0.81,-0.04l-2.37,1.63l-3.26,-0.1l-3.72,-2.21l0.04,-1.05l1.19,-0.46l0.49,-0.89l0.21,-2.97l-0.28,-1.64l-1.34,-2.86l-0.38,-1.47l0.05,-1.72l-0.95,-1.7l-0.18,-0.97l-1.01,-0.99l-0.29,-1.98l-1.13,-1.75ZM784.92,393.44l2.65,1.02l3.23,-0.96l1.09,0.14l0.15,3.06l-0.85,1.13l-0.17,1.63l-0.87,-0.24l-1.57,1.91l-1.68,-0.18l-1.4,-2.36l-0.37,-2.04l-1.39,-2.51l0.04,-0.8l1.15,0.18Z", "name": "Australia"}, "AT": {"path": "M462.89,152.8l0.04,2.25l-1.07,0.0l-0.33,0.63l0.36,0.51l-1.04,2.13l-2.02,0.07l-1.33,0.7l-5.29,-0.99l-0.47,-0.93l-0.44,-0.21l-2.47,0.55l-0.42,0.51l-3.18,-0.81l0.43,-0.91l1.12,0.78l0.6,-0.17l0.25,-0.58l1.93,0.12l1.86,-0.56l1.0,0.08l0.68,0.57l0.62,-0.15l0.26,-0.77l-0.3,-1.78l0.8,-0.44l0.68,-1.15l1.52,0.85l0.47,-0.06l1.34,-1.25l0.64,-0.17l1.81,0.92l1.28,-0.11l0.7,0.37Z", "name": "Austria"}, "IN": {"path": "M623.34,207.03l-1.24,1.04l-0.97,2.55l0.22,0.51l8.04,3.87l3.42,0.37l1.57,1.38l4.92,0.88l2.18,-0.04l0.38,-0.3l0.29,-1.24l-0.32,-1.64l0.14,-0.87l0.82,-0.31l0.45,2.48l2.28,1.02l1.77,-0.38l4.14,0.1l0.38,-0.36l0.18,-1.66l-0.5,-0.65l1.37,-0.29l2.25,-1.99l2.7,-1.62l1.93,0.62l1.8,-0.98l0.79,1.14l-0.68,0.91l0.26,0.63l2.42,0.36l0.09,0.47l-0.83,0.75l0.13,1.07l-1.52,-0.29l-3.24,1.86l-0.13,1.78l-1.32,2.14l-0.18,1.39l-0.93,1.82l-1.64,-0.5l-0.52,0.37l-0.09,2.63l-0.56,1.11l0.19,0.81l-0.53,0.27l-1.18,-3.73l-1.08,-0.27l-0.38,0.31l-0.24,1.0l-0.66,-0.66l0.54,-1.06l1.22,-0.34l1.15,-2.25l-0.24,-0.56l-1.57,-0.47l-4.34,-0.28l-0.18,-1.56l-0.35,-0.35l-1.11,-0.12l-1.91,-1.12l-0.56,0.17l-0.88,1.82l0.11,0.49l1.36,1.07l-1.09,0.69l-0.69,1.11l0.18,0.56l1.24,0.57l-0.32,1.54l0.85,1.94l0.36,2.01l-0.22,0.59l-4.58,0.52l-0.33,0.42l0.13,1.8l-1.17,1.36l-3.65,1.81l-2.79,3.03l-4.32,3.28l-0.18,1.27l-4.65,1.79l-0.77,2.16l0.64,5.3l-1.06,2.49l-0.01,3.94l-1.24,0.28l-1.14,1.93l0.39,0.84l-1.68,0.53l-1.04,1.83l-0.65,0.47l-2.06,-2.05l-2.1,-6.02l-2.2,-3.64l-1.05,-4.75l-2.29,-3.57l-1.76,-8.2l0.01,-3.11l-0.49,-2.53l-0.55,-0.29l-3.53,1.52l-1.53,-0.27l-2.86,-2.77l0.85,-0.67l0.08,-0.55l-0.74,-1.03l-2.67,-2.06l1.24,-1.32l5.34,0.01l0.39,-0.49l-0.5,-2.29l-1.42,-1.46l-0.27,-1.93l-1.43,-1.2l2.31,-2.37l3.05,0.06l2.62,-2.85l1.6,-2.81l2.4,-2.73l0.07,-2.04l1.97,-1.48l-0.02,-0.65l-1.93,-1.31l-0.82,-1.78l-0.8,-2.21l0.9,-0.89l3.59,0.65l2.92,-0.42l2.33,-2.19l2.31,2.85l-0.24,2.13l0.99,1.59l-0.05,0.82l-1.34,-0.28l-0.47,0.48l0.7,3.06l2.62,1.99l2.99,1.65Z", "name": "India"}, "TZ": {"path": "M495.56,296.42l2.8,-3.12l-0.02,-0.81l-0.64,-1.3l0.68,-0.52l0.14,-1.47l-0.76,-1.25l0.31,-0.11l2.26,0.03l-0.51,2.76l0.76,1.3l0.5,0.12l1.05,-0.53l1.19,-0.12l0.61,0.24l1.43,-0.62l0.1,-0.67l-0.71,-0.62l1.57,-1.7l8.65,4.86l0.32,1.53l3.34,2.33l-1.05,2.8l0.13,1.61l1.63,1.12l-0.6,1.76l-0.01,2.33l1.89,4.03l0.57,0.43l-1.46,1.08l-2.61,0.94l-1.43,-0.04l-1.06,0.77l-2.29,0.36l-2.87,-0.68l-0.83,0.07l-0.63,-0.75l-0.31,-2.78l-1.32,-1.35l-3.25,-0.77l-3.96,-1.58l-1.18,-2.41l-0.32,-1.75l-1.76,-1.49l0.42,-1.05l-0.44,-0.89l0.08,-0.96l-0.46,-0.58l0.06,-0.56Z", "name": "Tanzania"}, "AZ": {"path": "M539.29,175.73l1.33,0.32l1.94,-1.8l2.3,3.34l1.43,0.43l-1.26,0.15l-0.35,0.32l-0.8,3.14l-0.99,0.96l0.05,1.11l-1.26,-1.13l0.7,-1.18l-0.04,-0.47l-0.74,-0.86l-1.48,0.15l-2.34,1.71l-0.03,-1.27l-2.03,-1.35l0.47,-0.62l-0.08,-0.56l-1.03,-0.79l0.29,-0.43l-0.14,-0.58l-1.13,-0.86l1.89,0.68l1.69,0.06l0.37,-0.87l-0.81,-1.37l0.42,0.06l1.63,1.72ZM533.78,180.57l0.61,0.46l0.69,-0.0l0.59,1.15l-0.68,-0.15l-1.21,-1.45Z", "name": "Azerbaijan"}, "IE": {"path": "M405.08,135.42l0.35,2.06l-1.75,2.78l-4.22,1.88l-2.84,-0.4l1.73,-3.0l-1.18,-3.53l4.6,-3.74l0.32,1.15l-0.49,1.74l0.4,0.51l1.47,-0.04l1.6,0.6Z", "name": "Ireland"}, "ID": {"path": "M756.47,287.89l0.69,4.01l2.79,1.78l0.51,-0.1l2.04,-2.59l2.71,-1.43l2.05,-0.0l3.9,1.73l2.46,0.45l0.08,15.12l-1.75,-1.54l-2.54,-0.51l-0.88,0.71l-2.32,0.06l0.69,-1.33l1.45,-0.64l0.23,-0.46l-0.65,-2.74l-1.24,-2.21l-5.04,-2.29l-2.09,-0.23l-3.68,-2.27l-0.55,0.13l-0.65,1.07l-0.52,0.12l-0.55,-1.89l-1.21,-0.78l1.84,-0.62l1.72,0.05l0.39,-0.52l-0.21,-0.66l-0.38,-0.28l-3.45,-0.0l-1.13,-1.48l-2.1,-0.43l-0.52,-0.6l2.69,-0.48l1.28,-0.78l3.66,0.94l0.3,0.71ZM757.91,300.34l-0.62,0.82l-0.1,-0.8l0.59,-1.12l0.13,1.1ZM747.38,292.98l0.34,0.72l-1.22,-0.57l-4.68,-0.1l0.27,-0.62l2.78,-0.09l2.52,0.67ZM741.05,285.25l-0.67,-2.88l0.64,-2.01l0.41,0.86l1.21,0.18l0.16,0.7l-0.1,1.68l-0.84,-0.16l-0.46,0.3l-0.34,1.34ZM739.05,293.5l-0.5,0.44l-1.34,-0.36l-0.17,-0.37l1.73,-0.08l0.27,0.36ZM721.45,284.51l-0.19,1.97l2.24,2.23l0.54,0.02l1.27,-1.07l2.75,-0.5l-0.9,1.21l-2.11,0.93l-0.16,0.6l2.22,3.01l-0.3,1.07l1.36,1.74l-2.26,0.85l-0.28,-0.31l0.12,-1.19l-1.64,-1.34l0.17,-2.23l-0.56,-0.39l-1.67,0.76l-0.23,0.39l0.3,6.17l-1.1,0.25l-0.69,-0.47l0.64,-2.21l-0.39,-2.42l-0.39,-0.34l-0.8,-0.01l-0.58,-1.29l0.98,-1.6l0.35,-1.96l1.32,-3.87ZM728.59,296.27l0.38,0.49l-0.02,1.28l-0.88,0.49l-0.53,-0.47l1.04,-1.79ZM729.04,286.98l0.27,-0.05l-0.02,0.13l-0.24,-0.08ZM721.68,284.05l0.16,-0.32l1.89,-1.65l1.83,0.68l3.16,0.35l2.94,-0.1l2.39,-1.66l-1.73,2.13l-1.66,0.43l-2.41,-0.48l-4.17,0.13l-2.39,0.51ZM730.55,310.47l1.11,-1.93l2.03,-0.82l0.08,0.62l-1.45,1.67l-1.77,0.46ZM728.12,305.88l-0.1,0.38l-3.46,0.66l-2.91,-0.27l-0.0,-0.25l1.54,-0.41l1.66,0.73l1.67,-0.19l1.61,-0.65ZM722.9,310.24l-0.64,0.03l-2.26,-1.2l1.11,-0.24l1.78,1.41ZM716.26,305.77l0.88,0.51l1.28,-0.17l0.2,0.35l-4.65,0.73l0.39,-0.67l1.15,-0.02l0.75,-0.73ZM711.66,293.84l-0.38,-0.16l-2.54,1.01l-1.12,-1.44l-1.69,-0.13l-1.16,-0.75l-3.04,0.77l-1.1,-1.15l-3.31,-0.11l-0.35,-3.05l-1.35,-0.95l-1.11,-1.98l-0.33,-2.06l0.27,-2.14l0.9,-1.01l0.37,1.15l2.09,1.49l1.53,-0.48l1.82,0.08l1.38,-1.19l1.0,-0.18l2.28,0.67l2.26,-0.53l1.52,-3.64l1.01,-0.99l0.78,-2.57l4.1,0.3l-1.11,1.77l0.02,0.46l1.7,2.2l-0.23,1.39l2.07,1.71l-2.33,0.42l-0.88,1.9l0.1,2.05l-2.4,1.9l-0.06,2.45l-0.7,2.79ZM692.58,302.03l0.35,0.26l4.8,0.25l0.78,-0.97l4.17,1.09l1.13,1.68l3.69,0.45l2.13,1.04l-1.8,0.6l-2.77,-0.99l-4.8,-0.12l-5.24,-1.41l-1.84,-0.25l-1.11,0.3l-4.26,-0.97l-0.7,-1.14l-1.59,-0.13l1.18,-1.65l2.74,0.13l2.87,1.13l0.26,0.68ZM685.53,299.17l-2.22,0.04l-2.06,-2.03l-3.15,-2.01l-2.93,-3.51l-3.11,-5.33l-2.2,-2.12l-1.64,-4.06l-2.32,-1.69l-1.27,-2.07l-1.96,-1.5l-2.51,-2.65l-0.11,-0.66l4.81,0.53l2.15,2.38l3.31,2.74l2.35,2.66l2.7,0.17l1.95,1.59l1.54,2.17l1.59,0.95l-0.84,1.71l0.15,0.52l1.44,0.87l0.79,0.1l0.4,1.58l0.87,1.4l1.96,0.39l1.0,1.31l-0.6,3.01l-0.09,3.5Z", "name": "Indonesia"}, "UA": {"path": "M492.5,162.44l1.28,-2.49l1.82,0.19l0.66,-0.23l0.09,-0.71l-0.25,-0.75l-0.79,-0.72l-0.33,-1.21l-0.86,-0.62l-0.02,-1.19l-1.13,-0.86l-1.15,-0.19l-2.04,-1.0l-1.66,0.32l-0.66,0.47l-0.92,-0.0l-0.84,0.78l-2.48,0.7l-1.18,-0.71l-3.07,-0.36l-0.89,0.43l-0.24,-0.55l-1.11,-0.7l0.35,-0.93l1.26,-1.02l-0.54,-1.23l2.04,-2.43l1.4,-0.62l0.25,-1.19l-1.04,-2.39l0.83,-0.13l1.28,-0.84l1.8,-0.07l2.47,0.26l2.86,0.81l1.88,0.06l0.86,0.44l1.04,-0.41l0.77,0.66l2.18,-0.15l0.92,0.3l0.52,-0.34l0.15,-1.53l0.56,-0.54l2.85,-0.05l0.84,-0.72l3.04,-0.18l1.23,1.46l-0.48,0.77l0.21,1.03l0.36,0.32l1.8,0.14l0.93,2.08l3.18,1.15l1.94,-0.45l1.67,1.49l1.4,-0.03l3.35,0.96l0.02,0.54l-0.96,1.59l0.47,1.97l-0.26,0.7l-2.36,0.28l-1.29,0.89l-0.23,1.38l-1.83,0.27l-1.58,0.97l-2.41,0.21l-2.16,1.17l-0.21,0.38l0.34,2.26l1.23,0.75l2.13,-0.08l-0.14,0.31l-2.65,0.53l-3.23,1.69l-0.87,-0.39l0.42,-1.1l-0.25,-0.52l-2.21,-0.73l2.35,-1.06l0.12,-0.65l-0.93,-0.82l-3.62,-0.74l-0.13,-0.89l-0.46,-0.34l-2.61,0.59l-0.91,1.69l-1.71,2.04l-0.86,-0.4l-1.62,0.27Z", "name": "Ukraine"}, "QA": {"path": "M549.33,221.64l-0.76,-0.23l-0.14,-1.64l0.84,-1.29l0.47,0.52l0.04,1.34l-0.45,1.3Z", "name": "Qatar"}, "MZ": {"path": "M508.58,318.75l-0.34,-2.57l0.51,-2.05l3.55,0.63l2.5,-0.38l1.02,-0.76l1.49,0.01l2.74,-0.98l1.66,-1.2l0.5,9.24l0.41,1.23l-0.68,1.67l-0.93,1.71l-1.5,1.5l-5.16,2.28l-2.78,2.73l-1.02,0.53l-1.71,1.8l-0.98,0.57l-0.35,2.41l1.16,1.94l0.49,2.17l0.43,0.31l-0.06,2.06l-0.39,1.17l0.5,0.72l-0.25,0.73l-0.92,0.83l-5.12,2.39l-1.22,1.36l0.21,1.13l0.58,0.39l-0.11,0.72l-1.22,-0.01l-0.73,-2.97l0.42,-3.09l-1.78,-5.37l2.49,-2.81l0.69,-1.89l0.44,-0.43l0.28,-1.53l-0.39,-0.93l0.59,-3.65l-0.01,-3.26l-1.49,-1.16l-1.2,-0.22l-1.74,-1.17l-1.92,0.01l-0.29,-2.08l7.06,-1.96l1.28,1.09l0.89,-0.1l0.67,0.44l0.1,0.73l-0.51,1.29l0.19,1.81l1.75,1.83l0.65,-0.13l0.71,-1.65l1.17,-0.86l-0.26,-3.47l-1.05,-1.85l-1.04,-0.94Z", "name": "Mozambique"}}, "height": 440.7063107441331, "projection": {"type": "mill", "centralMeridian": 11.5}, "width": 900.0});
(function($, undefined) {

/**
 * Unobtrusive scripting adapter for jQuery
 * https://github.com/rails/jquery-ujs
 *
 * Requires jQuery 1.8.0 or later.
 *
 * Released under the MIT license
 *
 */

  // Cut down on the number of issues from people inadvertently including jquery_ujs twice
  // by detecting and raising an error when it happens.
  'use strict';

  if ( $.rails !== undefined ) {
    $.error('jquery-ujs has already been loaded!');
  }

  // Shorthand to make it a little easier to call public rails functions from within rails.js
  var rails;
  var $document = $(document);

  $.rails = rails = {
    // Link elements bound by jquery-ujs
    linkClickSelector: 'a[data-confirm], a[data-method], a[data-remote]:not([disabled]), a[data-disable-with], a[data-disable]',

    // Button elements bound by jquery-ujs
    buttonClickSelector: 'button[data-remote]:not([form]):not(form button), button[data-confirm]:not([form]):not(form button)',

    // Select elements bound by jquery-ujs
    inputChangeSelector: 'select[data-remote], input[data-remote], textarea[data-remote]',

    // Form elements bound by jquery-ujs
    formSubmitSelector: 'form',

    // Form input elements bound by jquery-ujs
    formInputClickSelector: 'form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])',

    // Form input elements disabled during form submission
    disableSelector: 'input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled',

    // Form input elements re-enabled after form submission
    enableSelector: 'input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled',

    // Form required input elements
    requiredInputSelector: 'input[name][required]:not([disabled]), textarea[name][required]:not([disabled])',

    // Form file input elements
    fileInputSelector: 'input[type=file]:not([disabled])',

    // Link onClick disable selector with possible reenable after remote submission
    linkDisableSelector: 'a[data-disable-with], a[data-disable]',

    // Button onClick disable selector with possible reenable after remote submission
    buttonDisableSelector: 'button[data-remote][data-disable-with], button[data-remote][data-disable]',

    // Up-to-date Cross-Site Request Forgery token
    csrfToken: function() {
     return $('meta[name=csrf-token]').attr('content');
    },

    // URL param that must contain the CSRF token
    csrfParam: function() {
     return $('meta[name=csrf-param]').attr('content');
    },

    // Make sure that every Ajax request sends the CSRF token
    CSRFProtection: function(xhr) {
      var token = rails.csrfToken();
      if (token) xhr.setRequestHeader('X-CSRF-Token', token);
    },

    // Make sure that all forms have actual up-to-date tokens (cached forms contain old ones)
    refreshCSRFTokens: function(){
      $('form input[name="' + rails.csrfParam() + '"]').val(rails.csrfToken());
    },

    // Triggers an event on an element and returns false if the event result is false
    fire: function(obj, name, data) {
      var event = $.Event(name);
      obj.trigger(event, data);
      return event.result !== false;
    },

    // Default confirm dialog, may be overridden with custom confirm dialog in $.rails.confirm
    confirm: function(message) {
      return confirm(message);
    },

    // Default ajax function, may be overridden with custom function in $.rails.ajax
    ajax: function(options) {
      return $.ajax(options);
    },

    // Default way to get an element's href. May be overridden at $.rails.href.
    href: function(element) {
      return element[0].href;
    },

    // Checks "data-remote" if true to handle the request through a XHR request.
    isRemote: function(element) {
      return element.data('remote') !== undefined && element.data('remote') !== false;
    },

    // Submits "remote" forms and links with ajax
    handleRemote: function(element) {
      var method, url, data, withCredentials, dataType, options;

      if (rails.fire(element, 'ajax:before')) {
        withCredentials = element.data('with-credentials') || null;
        dataType = element.data('type') || ($.ajaxSettings && $.ajaxSettings.dataType);

        if (element.is('form')) {
          method = element.data('ujs:submit-button-formmethod') || element.attr('method');
          url = element.data('ujs:submit-button-formaction') || element.attr('action');
          data = $(element[0].elements).serializeArray();
          // memoized value from clicked submit button
          var button = element.data('ujs:submit-button');
          if (button) {
            data.push(button);
            element.data('ujs:submit-button', null);
          }
          element.data('ujs:submit-button-formmethod', null);
          element.data('ujs:submit-button-formaction', null);
        } else if (element.is(rails.inputChangeSelector)) {
          method = element.data('method');
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + '&' + element.data('params');
        } else if (element.is(rails.buttonClickSelector)) {
          method = element.data('method') || 'get';
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + '&' + element.data('params');
        } else {
          method = element.data('method');
          url = rails.href(element);
          data = element.data('params') || null;
        }

        options = {
          type: method || 'GET', data: data, dataType: dataType,
          // stopping the "ajax:beforeSend" event will cancel the ajax request
          beforeSend: function(xhr, settings) {
            if (settings.dataType === undefined) {
              xhr.setRequestHeader('accept', '*/*;q=0.5, ' + settings.accepts.script);
            }
            if (rails.fire(element, 'ajax:beforeSend', [xhr, settings])) {
              element.trigger('ajax:send', xhr);
            } else {
              return false;
            }
          },
          success: function(data, status, xhr) {
            element.trigger('ajax:success', [data, status, xhr]);
          },
          complete: function(xhr, status) {
            element.trigger('ajax:complete', [xhr, status]);
          },
          error: function(xhr, status, error) {
            element.trigger('ajax:error', [xhr, status, error]);
          },
          crossDomain: rails.isCrossDomain(url)
        };

        // There is no withCredentials for IE6-8 when
        // "Enable native XMLHTTP support" is disabled
        if (withCredentials) {
          options.xhrFields = {
            withCredentials: withCredentials
          };
        }

        // Only pass url to `ajax` options if not blank
        if (url) { options.url = url; }

        return rails.ajax(options);
      } else {
        return false;
      }
    },

    // Determines if the request is a cross domain request.
    isCrossDomain: function(url) {
      var originAnchor = document.createElement('a');
      originAnchor.href = location.href;
      var urlAnchor = document.createElement('a');

      try {
        urlAnchor.href = url;
        // This is a workaround to a IE bug.
        urlAnchor.href = urlAnchor.href;

        // If URL protocol is false or is a string containing a single colon
        // *and* host are false, assume it is not a cross-domain request
        // (should only be the case for IE7 and IE compatibility mode).
        // Otherwise, evaluate protocol and host of the URL against the origin
        // protocol and host.
        return !(((!urlAnchor.protocol || urlAnchor.protocol === ':') && !urlAnchor.host) ||
          (originAnchor.protocol + '//' + originAnchor.host ===
            urlAnchor.protocol + '//' + urlAnchor.host));
      } catch (e) {
        // If there is an error parsing the URL, assume it is crossDomain.
        return true;
      }
    },

    // Handles "data-method" on links such as:
    // <a href="/users/5" data-method="delete" rel="nofollow" data-confirm="Are you sure?">Delete</a>
    handleMethod: function(link) {
      var href = rails.href(link),
        method = link.data('method'),
        target = link.attr('target'),
        csrfToken = rails.csrfToken(),
        csrfParam = rails.csrfParam(),
        form = $('<form method="post" action="' + href + '"></form>'),
        metadataInput = '<input name="_method" value="' + method + '" type="hidden" />';

      if (csrfParam !== undefined && csrfToken !== undefined && !rails.isCrossDomain(href)) {
        metadataInput += '<input name="' + csrfParam + '" value="' + csrfToken + '" type="hidden" />';
      }

      if (target) { form.attr('target', target); }

      form.hide().append(metadataInput).appendTo('body');
      form.submit();
    },

    // Helper function that returns form elements that match the specified CSS selector
    // If form is actually a "form" element this will return associated elements outside the from that have
    // the html form attribute set
    formElements: function(form, selector) {
      return form.is('form') ? $(form[0].elements).filter(selector) : form.find(selector);
    },

    /* Disables form elements:
      - Caches element value in 'ujs:enable-with' data store
      - Replaces element text with value of 'data-disable-with' attribute
      - Sets disabled property to true
    */
    disableFormElements: function(form) {
      rails.formElements(form, rails.disableSelector).each(function() {
        rails.disableFormElement($(this));
      });
    },

    disableFormElement: function(element) {
      var method, replacement;

      method = element.is('button') ? 'html' : 'val';
      replacement = element.data('disable-with');

      if (replacement !== undefined) {
        element.data('ujs:enable-with', element[method]());
        element[method](replacement);
      }

      element.prop('disabled', true);
      element.data('ujs:disabled', true);
    },

    /* Re-enables disabled form elements:
      - Replaces element text with cached value from 'ujs:enable-with' data store (created in `disableFormElements`)
      - Sets disabled property to false
    */
    enableFormElements: function(form) {
      rails.formElements(form, rails.enableSelector).each(function() {
        rails.enableFormElement($(this));
      });
    },

    enableFormElement: function(element) {
      var method = element.is('button') ? 'html' : 'val';
      if (element.data('ujs:enable-with') !== undefined) {
        element[method](element.data('ujs:enable-with'));
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.prop('disabled', false);
      element.removeData('ujs:disabled');
    },

   /* For 'data-confirm' attribute:
      - Fires `confirm` event
      - Shows the confirmation dialog
      - Fires the `confirm:complete` event

      Returns `true` if no function stops the chain and user chose yes; `false` otherwise.
      Attaching a handler to the element's `confirm` event that returns a `falsy` value cancels the confirmation dialog.
      Attaching a handler to the element's `confirm:complete` event that returns a `falsy` value makes this function
      return false. The `confirm:complete` event is fired whether or not the user answered true or false to the dialog.
   */
    allowAction: function(element) {
      var message = element.data('confirm'),
          answer = false, callback;
      if (!message) { return true; }

      if (rails.fire(element, 'confirm')) {
        try {
          answer = rails.confirm(message);
        } catch (e) {
          (console.error || console.log).call(console, e.stack || e);
        }
        callback = rails.fire(element, 'confirm:complete', [answer]);
      }
      return answer && callback;
    },

    // Helper function which checks for blank inputs in a form that match the specified CSS selector
    blankInputs: function(form, specifiedSelector, nonBlank) {
      var inputs = $(), input, valueToCheck,
          selector = specifiedSelector || 'input,textarea',
          allInputs = form.find(selector);

      allInputs.each(function() {
        input = $(this);
        valueToCheck = input.is('input[type=checkbox],input[type=radio]') ? input.is(':checked') : !!input.val();
        if (valueToCheck === nonBlank) {

          // Don't count unchecked required radio if other radio with same name is checked
          if (input.is('input[type=radio]') && allInputs.filter('input[type=radio]:checked[name="' + input.attr('name') + '"]').length) {
            return true; // Skip to next input
          }

          inputs = inputs.add(input);
        }
      });
      return inputs.length ? inputs : false;
    },

    // Helper function which checks for non-blank inputs in a form that match the specified CSS selector
    nonBlankInputs: function(form, specifiedSelector) {
      return rails.blankInputs(form, specifiedSelector, true); // true specifies nonBlank
    },

    // Helper function, needed to provide consistent behavior in IE
    stopEverything: function(e) {
      $(e.target).trigger('ujs:everythingStopped');
      e.stopImmediatePropagation();
      return false;
    },

    //  Replace element's html with the 'data-disable-with' after storing original html
    //  and prevent clicking on it
    disableElement: function(element) {
      var replacement = element.data('disable-with');

      if (replacement !== undefined) {
        element.data('ujs:enable-with', element.html()); // store enabled state
        element.html(replacement);
      }

      element.bind('click.railsDisable', function(e) { // prevent further clicking
        return rails.stopEverything(e);
      });
      element.data('ujs:disabled', true);
    },

    // Restore element to its original state which was disabled by 'disableElement' above
    enableElement: function(element) {
      if (element.data('ujs:enable-with') !== undefined) {
        element.html(element.data('ujs:enable-with')); // set to old enabled state
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.unbind('click.railsDisable'); // enable element
      element.removeData('ujs:disabled');
    }
  };

  if (rails.fire($document, 'rails:attachBindings')) {

    $.ajaxPrefilter(function(options, originalOptions, xhr){ if ( !options.crossDomain ) { rails.CSRFProtection(xhr); }});

    // This event works the same as the load event, except that it fires every
    // time the page is loaded.
    //
    // See https://github.com/rails/jquery-ujs/issues/357
    // See https://developer.mozilla.org/en-US/docs/Using_Firefox_1.5_caching
    $(window).on('pageshow.rails', function () {
      $($.rails.enableSelector).each(function () {
        var element = $(this);

        if (element.data('ujs:disabled')) {
          $.rails.enableFormElement(element);
        }
      });

      $($.rails.linkDisableSelector).each(function () {
        var element = $(this);

        if (element.data('ujs:disabled')) {
          $.rails.enableElement(element);
        }
      });
    });

    $document.delegate(rails.linkDisableSelector, 'ajax:complete', function() {
        rails.enableElement($(this));
    });

    $document.delegate(rails.buttonDisableSelector, 'ajax:complete', function() {
        rails.enableFormElement($(this));
    });

    $document.delegate(rails.linkClickSelector, 'click.rails', function(e) {
      var link = $(this), method = link.data('method'), data = link.data('params'), metaClick = e.metaKey || e.ctrlKey;
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      if (!metaClick && link.is(rails.linkDisableSelector)) rails.disableElement(link);

      if (rails.isRemote(link)) {
        if (metaClick && (!method || method === 'GET') && !data) { return true; }

        var handleRemote = rails.handleRemote(link);
        // Response from rails.handleRemote() will either be false or a deferred object promise.
        if (handleRemote === false) {
          rails.enableElement(link);
        } else {
          handleRemote.fail( function() { rails.enableElement(link); } );
        }
        return false;

      } else if (method) {
        rails.handleMethod(link);
        return false;
      }
    });

    $document.delegate(rails.buttonClickSelector, 'click.rails', function(e) {
      var button = $(this);

      if (!rails.allowAction(button) || !rails.isRemote(button)) return rails.stopEverything(e);

      if (button.is(rails.buttonDisableSelector)) rails.disableFormElement(button);

      var handleRemote = rails.handleRemote(button);
      // Response from rails.handleRemote() will either be false or a deferred object promise.
      if (handleRemote === false) {
        rails.enableFormElement(button);
      } else {
        handleRemote.fail( function() { rails.enableFormElement(button); } );
      }
      return false;
    });

    $document.delegate(rails.inputChangeSelector, 'change.rails', function(e) {
      var link = $(this);
      if (!rails.allowAction(link) || !rails.isRemote(link)) return rails.stopEverything(e);

      rails.handleRemote(link);
      return false;
    });

    $document.delegate(rails.formSubmitSelector, 'submit.rails', function(e) {
      var form = $(this),
        remote = rails.isRemote(form),
        blankRequiredInputs,
        nonBlankFileInputs;

      if (!rails.allowAction(form)) return rails.stopEverything(e);

      // Skip other logic when required values are missing or file upload is present
      if (form.attr('novalidate') === undefined) {
        if (form.data('ujs:formnovalidate-button') === undefined) {
          blankRequiredInputs = rails.blankInputs(form, rails.requiredInputSelector, false);
          if (blankRequiredInputs && rails.fire(form, 'ajax:aborted:required', [blankRequiredInputs])) {
            return rails.stopEverything(e);
          }
        } else {
          // Clear the formnovalidate in case the next button click is not on a formnovalidate button
          // Not strictly necessary to do here, since it is also reset on each button click, but just to be certain
          form.data('ujs:formnovalidate-button', undefined);
        }
      }

      if (remote) {
        nonBlankFileInputs = rails.nonBlankInputs(form, rails.fileInputSelector);
        if (nonBlankFileInputs) {
          // Slight timeout so that the submit button gets properly serialized
          // (make it easy for event handler to serialize form without disabled values)
          setTimeout(function(){ rails.disableFormElements(form); }, 13);
          var aborted = rails.fire(form, 'ajax:aborted:file', [nonBlankFileInputs]);

          // Re-enable form elements if event bindings return false (canceling normal form submission)
          if (!aborted) { setTimeout(function(){ rails.enableFormElements(form); }, 13); }

          return aborted;
        }

        rails.handleRemote(form);
        return false;

      } else {
        // Slight timeout so that the submit button gets properly serialized
        setTimeout(function(){ rails.disableFormElements(form); }, 13);
      }
    });

    $document.delegate(rails.formInputClickSelector, 'click.rails', function(event) {
      var button = $(this);

      if (!rails.allowAction(button)) return rails.stopEverything(event);

      // Register the pressed submit button
      var name = button.attr('name'),
        data = name ? {name:name, value:button.val()} : null;

      var form = button.closest('form');
      if (form.length === 0) {
        form = $('#' + button.attr('form'));
      }
      form.data('ujs:submit-button', data);

      // Save attributes from button
      form.data('ujs:formnovalidate-button', button.attr('formnovalidate'));
      form.data('ujs:submit-button-formaction', button.attr('formaction'));
      form.data('ujs:submit-button-formmethod', button.attr('formmethod'));
    });

    $document.delegate(rails.formSubmitSelector, 'ajax:send.rails', function(event) {
      if (this === event.target) rails.disableFormElements($(this));
    });

    $document.delegate(rails.formSubmitSelector, 'ajax:complete.rails', function(event) {
      if (this === event.target) rails.enableFormElements($(this));
    });

    $(function(){
      rails.refreshCSRFTokens();
    });
  }

})( jQuery );
$(document).ready(function(){

  $(function(){
    $('#africa-map').vectorMap({
    map: 'africa_mill',
    backgroundColor: ['white'],
    regionStyle: {
                  initial: {
                    fill: 'grey',
                    "fill-opacity": 1,
                    stroke: 'none',
                    "stroke-width": 0,
                    "stroke-opacity": 1
                  },
                  hover: {
                    "fill-opacity": 0.5,
                    cursor: 'pointer'
                  },
                  selected: {
                    fill: 'red'
                  },
                  selectedHover: {
                  }
                },
    series: {
              regions: [{
                values: gon.percent,
                scale: ['#C8EEFF', '#0071A4'],
                min: -0.15,
                max: 0.5,
                normalizeFunction: 'linear'
              }]
            },
    onRegionTipShow: function(e, el, code){
      el.html(el.html()+' (Change: '+gon.percent[code]*100+'%)');
    }
    });
  })
});
$(document).ready(function(){

  $(function(){
    $('#asia-map').vectorMap({
    map: 'asia_mill',
    backgroundColor: ['white'],
    regionStyle: {
                  initial: {
                    fill: 'grey',
                    "fill-opacity": 1,
                    stroke: 'none',
                    "stroke-width": 0,
                    "stroke-opacity": 1
                  },
                  hover: {
                    "fill-opacity": 0.5,
                    cursor: 'pointer'
                  },
                  selected: {
                    fill: 'red'
                  },
                  selectedHover: {
                  }
                },
    series: {
              regions: [{
                values: gon.percent,
                scale: ['#C8EEFF', '#0071A4'],
                min: -0.15,
                max: 0.5,
                normalizeFunction: 'linear'
              }]
            },
    onRegionTipShow: function(e, el, code){
      el.html(el.html()+' (Change: '+gon.percent[code]*100+'%)');
    }
    });
  })
});
$(document).ready(function(){
  $(function(){
    $('#blank-map').vectorMap({
    map: 'world_mill',
    zoomButtons : false,
    backgroundColor: ['white'],
    regionStyle: {
                  initial: {
                    fill: 'black',
                    "fill-opacity": 1,
                    stroke: 'none',
                    "stroke-width": 0,
                    "stroke-opacity": 1
                  },
                  hover: {
                    "fill-opacity": 0,
                    cursor: 'pointer'
                  },
                  selected: {
                    fill: 'red'
                  },
                  selectedHover: {
                  }
                },
              });
            })
          });
$(document).ready(function(){

  $(function(){
    $('#europe-map').vectorMap({
    map: 'europe_mill',
    backgroundColor: ['white'],
    regionStyle: {
                  initial: {
                    fill: 'grey',
                    "fill-opacity": 1,
                    stroke: 'none',
                    "stroke-width": 0,
                    "stroke-opacity": 1
                  },
                  hover: {
                    "fill-opacity": 0.5,
                    cursor: 'pointer'
                  },
                  selected: {
                    fill: 'red'
                  },
                  selectedHover: {
                  }
                },
    series: {
              regions: [{
                values: gon.percent,
                scale: ['#C8EEFF', '#0071A4'],
                min: -0.15,
                max: 0.5,
                normalizeFunction: 'linear'
              }]
            },
    onRegionTipShow: function(e, el, code){
      el.html(el.html()+' (Change: '+gon.percent[code]*100+'%)');
    }
    });
  })
});
jQuery.fn.vectorMap('addMap', 'africa_mill',{"insets": [{"width": 900, "top": 0, "height": 1054.4456598737515, "bbox": [{"y": -4361143.781154416, "x": -2822439.5658800667}, {"y": 5651492.432223669, "x": 5723636.287018039}], "left": 0}], "paths": {"BF": {"path": "M264.1,336.73l-0.38,0.6l0.64,1.4l-0.24,0.6l0.45,4.56l-0.35,0.78l0.96,2.95l-0.52,0.38l-1.13,-1.12l-1.14,-1.92l-3.05,-2.52l-6.67,-0.25l-5.65,2.08l-0.81,1.11l-1.3,-0.33l-0.81,-0.58l-1.06,0.11l-0.97,-0.44l-2.77,-1.95l-0.31,-1.37l-1.35,-2.42l-2.01,-0.98l-1.43,0.04l-1.31,-1.03l0.73,-3.93l-0.35,-3.1l1.58,-1.01l1.2,-3.07l0.23,-1.91l-0.71,-1.89l0.01,-1.44l1.9,-1.47l3.57,-0.76l1.28,-0.57l1.37,-0.98l1.89,-2.21l0.18,-3.18l-0.55,-0.89l2.84,-1.62l-0.0,-1.17l-1.15,-2.62l1.92,-2.04l1.07,-0.83l1.03,-0.2l4.85,2.6l2.89,-1.19l0.65,-1.69l0.16,-2.87l2.6,0.33l0.84,-0.24l0.52,-0.67l-0.09,-1.24l0.56,-1.81l1.04,-1.38l2.19,-1.78l1.28,-0.48l4.22,1.21l0.87,-0.55l0.92,-2.93l3.12,-0.59l2.38,-1.42l5.16,-2.3l3.42,-2.74l2.42,-0.33l1.68,0.77l1.87,-0.53l4.84,1.61l-0.54,4.66l2.53,3.13l-0.28,1.32l0.93,2.11l2.22,3.21l3.45,1.25l0.77,0.57l0.62,1.12l1.49,0.83l-1.54,-0.34l-0.49,0.28l-0.2,2.42l0.31,1.85l1.36,0.54l5.62,4.39l2.81,0.25l2.58,-1.21l0.76,0.11l0.56,0.66l0.68,2.06l-1.55,0.4l-0.37,0.74l0.45,1.07l3.34,4.38l-1.06,2.14l-3.38,3.04l-1.4,-0.26l-2.79,0.47l-0.58,-0.54l-1.85,0.09l-1.35,1.84l-1.84,0.43l-1.01,2.24l-1.1,0.01l-0.52,0.8l-4.55,0.45l-0.36,-0.43l-9.2,-2.08l-0.8,0.93l-1.17,0.12l-0.64,0.9l-1.44,0.83l-0.73,-0.69l-3.99,-0.25l-21.0,0.14l-0.48,0.5l-0.82,3.01l-0.1,1.69l0.51,1.27l0.95,0.91Z", "name": "Burkina Faso"}, "DJ": {"path": "M800.21,310.86l2.49,-0.89l2.06,2.6l1.22,3.04l-0.29,1.0l-1.15,1.3l-2.56,1.63l-2.88,1.05l-1.89,2.09l-1.18,-0.12l-0.43,0.5l0.21,0.81l0.84,0.38l3.96,-1.06l2.72,0.22l0.63,0.5l-3.48,5.46l-1.25,-0.1l-1.52,-0.81l-1.29,-0.06l-7.07,1.65l-1.47,-0.35l-0.35,-6.88l0.5,-1.41l2.1,-2.23l4.78,-6.87l0.41,-0.18l2.18,1.59l0.67,0.03l1.08,-0.76l0.97,-2.11Z", "name": "Djibouti"}, "BI": {"path": "M645.42,511.17l-3.4,-6.8l-0.35,-5.31l-0.5,-0.69l-0.91,-0.23l0.15,-3.04l-2.45,-3.14l0.12,-1.27l0.29,-0.52l1.17,0.22l1.0,0.53l0.56,1.26l0.68,0.41l3.89,-0.15l2.23,-1.13l0.73,-4.21l1.87,0.92l1.43,-0.81l1.84,-0.36l1.16,0.82l-1.21,2.39l0.44,0.94l-0.49,1.29l0.1,0.79l1.2,0.8l3.01,0.8l0.04,2.71l-1.83,0.84l-0.27,0.31l0.11,0.7l-2.25,1.87l-0.64,1.8l-1.27,1.37l-1.42,2.74l-2.26,2.52l-2.81,1.65Z", "name": "Burundi"}, "BJ": {"path": "M308.12,330.21l0.86,-0.9l0.64,0.14l0.6,-0.3l0.86,-2.1l1.82,-0.46l1.23,-1.76l1.22,-0.03l0.73,0.59l2.95,-0.5l1.71,0.19l3.64,-3.28l0.95,-1.86l0.61,-1.99l-0.56,-2.46l3.11,-0.81l1.69,-0.98l0.63,0.14l3.09,2.89l1.79,2.3l1.82,0.94l1.42,1.5l-1.11,2.16l-0.07,1.39l2.7,3.89l0.46,3.62l0.9,1.82l-0.57,1.92l-0.76,-0.15l-0.67,0.27l-0.97,1.57l0.01,0.66l0.72,1.13l-0.93,2.67l-2.37,1.13l-0.44,0.68l0.04,1.14l-2.2,2.49l0.07,1.73l-1.05,2.47l-2.97,0.39l-0.35,0.34l-0.49,3.14l-0.55,10.76l0.42,3.23l0.74,1.58l-0.4,0.87l0.07,3.84l-0.41,1.09l0.59,3.12l-0.76,3.68l-10.19,1.27l-0.39,-1.8l-1.68,-2.19l-0.17,-0.62l0.25,-0.77l-0.62,-2.49l0.9,-0.43l-0.29,-24.23l-0.51,-1.3l-2.01,-2.49l-0.45,-2.39l-0.22,-5.16l-6.61,-4.58l0.26,-3.59l1.26,-3.12Z", "name": "Benin"}, "ZA": {"path": "M740.97,1053.87l-0.3,0.16l-2.08,-0.34l0.77,-0.88l0.95,0.15l0.83,0.6l-0.17,0.3ZM513.38,877.36l-0.7,-2.43l0.21,-1.52l1.33,-0.97l-0.39,-2.31l-2.04,-3.95l-1.28,-0.93l-0.91,-1.89l-0.98,-0.79l-0.44,-1.41l-0.87,-1.03l-0.28,-1.52l0.86,-1.1l1.02,0.73l1.17,-0.42l1.58,-1.41l0.87,-1.92l-0.14,-5.2l-1.18,-4.99l-6.3,-9.48l-3.86,-7.37l-1.84,-4.4l-2.82,-8.97l-2.49,-5.08l-3.19,-4.84l1.71,-1.23l1.58,-0.5l1.51,-4.23l0.55,-0.6l1.17,-0.4l0.86,0.51l0.67,1.49l1.71,0.81l0.27,0.89l-0.5,1.25l0.06,0.63l1.46,2.85l2.93,0.89l3.23,0.54l1.6,0.79l8.58,-0.04l2.15,0.73l1.89,0.12l1.15,-0.62l0.66,-2.0l1.14,-0.28l0.89,-0.67l0.72,-1.13l1.41,-0.82l2.31,-0.66l1.14,0.02l0.41,-0.4l0.0,-45.51l3.59,2.68l0.95,1.39l4.2,9.51l0.27,2.9l-2.22,3.62l0.17,3.82l0.55,1.14l1.12,0.53l1.45,-0.47l2.34,0.53l4.45,-0.24l2.39,0.25l1.22,-0.68l1.03,-1.55l2.03,-0.52l1.07,-0.76l1.54,-2.45l4.44,-3.21l0.59,-0.91l2.77,-7.63l0.78,-1.0l1.09,-0.64l2.32,-0.54l1.33,0.28l3.19,1.73l2.71,2.14l0.99,0.34l2.51,0.09l1.71,1.37l4.87,0.93l1.67,-0.08l1.44,-0.71l2.47,0.03l2.89,-0.6l1.77,-1.52l3.74,-10.56l5.64,-1.65l0.77,-0.5l1.88,-2.25l2.53,-1.91l1.9,-6.79l1.09,-1.48l2.61,-1.84l2.17,-0.7l0.76,-0.54l0.84,-1.24l1.42,-0.32l0.29,-0.74l1.83,-1.35l0.14,-0.7l3.09,-3.46l1.9,-1.17l3.64,-0.71l1.74,-0.69l1.35,-1.12l0.83,-1.45l1.19,-0.7l6.13,-0.81l2.7,0.45l3.43,1.33l3.27,0.47l5.28,-0.47l1.78,0.2l2.22,1.0l2.84,10.65l0.18,2.57l3.01,5.17l2.14,6.91l-0.02,14.51l-0.75,1.88l0.25,2.05l-0.38,0.1l-5.35,-2.92l-1.09,0.12l-1.7,1.23l-1.4,1.72l-0.68,1.53l-2.73,4.04l-0.07,4.73l0.46,0.47l0.66,0.07l2.05,3.86l2.6,1.72l2.49,0.78l3.2,0.18l2.56,-0.05l0.39,-0.43l-0.14,-1.63l0.52,-4.16l3.87,0.62l5.77,-0.15l-0.36,2.4l-2.25,6.66l-1.43,7.49l-1.84,3.72l-1.01,1.51l-2.97,2.73l-1.48,0.86l-1.49,0.43l-5.23,5.67l-1.94,2.72l-1.74,4.0l-1.71,2.2l-4.74,8.26l-2.14,3.28l-3.68,4.5l-2.75,1.91l-2.96,2.65l-7.38,8.08l-4.73,4.27l-2.78,1.91l-4.1,3.69l-5.83,4.03l-3.32,2.09l-7.45,3.08l-5.07,-0.62l-2.27,0.34l-1.99,1.57l-0.29,2.16l-0.44,0.19l-4.58,-0.97l-2.09,0.16l-1.39,1.25l-0.86,1.33l-2.44,0.07l-4.83,-1.48l-5.72,-0.91l-1.5,-0.07l-3.6,1.24l-3.92,-0.23l-2.3,-0.7l-2.13,-0.0l-3.86,0.86l-5.25,3.93l-2.63,0.0l-2.42,0.46l-4.2,-0.54l-1.32,0.26l-1.31,0.71l-2.94,0.34l-5.89,4.21l-4.29,-0.41l-2.76,-1.89l-0.65,-0.02l0.02,-1.4l-1.07,-1.12l-1.17,-0.04l-0.78,-0.87l-2.78,0.16l-0.24,-3.04l-0.95,-0.65l-2.91,0.11l-0.94,1.2l-0.06,1.39ZM623.55,807.58l-1.33,0.56l-5.08,7.29l-2.34,1.04l-0.45,0.34l-0.22,0.76l0.97,2.51l2.58,4.01l-0.03,1.17l0.48,0.94l1.3,0.73l3.08,3.04l3.47,0.6l1.11,-0.88l0.57,-1.81l2.77,-3.68l3.97,-0.58l2.01,-0.85l2.35,-1.56l0.64,-2.92l1.77,-1.76l1.17,-3.92l-1.08,-2.49l-4.17,-2.79l-3.9,-3.86l-2.17,0.4l-2.81,1.09l-3.25,2.21l-1.44,0.43Z", "name": "South Africa"}, "BW": {"path": "M592.94,670.5l-0.23,1.26l0.71,1.59l1.23,1.28l2.04,3.62l2.35,2.48l0.65,1.85l1.45,1.67l0.11,1.69l2.56,5.57l6.11,4.47l5.85,2.54l0.78,1.38l0.27,2.94l0.41,0.38l4.41,0.23l0.15,2.87l-0.36,3.84l2.09,2.49l2.0,3.59l0.63,0.38l5.67,0.95l5.59,1.71l-0.22,1.52l0.42,1.17l0.85,0.66l1.53,0.2l0.68,0.71l-1.78,0.15l-1.53,0.86l-0.91,1.53l-1.14,0.97l-1.61,0.64l-3.77,0.75l-2.01,1.24l-2.24,2.32l-1.09,1.4l-0.12,0.65l-1.8,1.31l-0.2,0.62l-1.22,0.19l-1.62,1.81l-2.2,0.71l-2.77,1.97l-1.27,1.76l-1.75,6.53l-2.49,1.88l-2.45,2.61l-3.1,0.72l-2.77,1.1l-3.86,10.72l-1.49,1.23l-2.54,0.49l-2.51,-0.03l-1.61,0.75l-1.29,0.04l-4.76,-0.92l-1.79,-1.39l-3.3,-0.35l-2.6,-2.07l-3.36,-1.81l-1.52,-0.33l-1.57,0.28l-1.61,0.5l-1.77,1.76l-3.29,8.45l-4.38,3.15l-1.55,2.46l-0.82,0.61l-1.99,0.51l-0.68,0.47l-1.05,1.61l-7.08,0.09l-2.33,-0.53l-1.57,0.47l-0.8,-1.03l-0.17,-3.51l2.21,-3.57l-0.28,-3.35l-4.29,-9.69l-1.09,-1.56l-4.12,-3.05l-0.04,-33.77l11.25,0.0l0.39,-0.32l0.05,-44.66l11.82,-1.44l14.08,-2.4l0.71,0.26l1.82,2.37l1.36,2.58l0.7,0.36l1.27,-0.46l2.42,-2.43l3.94,-2.42l1.22,-0.5l2.22,0.81l3.02,-2.24l1.27,-0.49l3.45,-0.39Z", "name": "Botswana"}, "DZ": {"path": "M221.33,99.35l5.55,-0.16l6.56,-1.62l1.94,-1.36l1.39,-1.43l2.48,-3.82l2.1,-1.06l5.33,-1.88l3.96,-2.76l3.8,-0.7l0.66,-0.8l-0.08,-1.13l-2.32,-1.51l0.5,-2.08l-0.68,-3.22l0.65,-0.61l3.77,-0.18l5.04,-1.7l0.6,-0.79l0.62,-2.04l0.54,-0.29l4.79,-0.71l13.74,0.53l0.74,-0.27l0.25,-0.37l-0.41,-2.14l0.19,-0.64l1.95,-1.62l0.11,-0.49l-0.64,-1.23l-3.91,-2.98l-0.64,-1.1l-0.52,-2.63l-1.44,-3.04l0.54,-3.16l-0.97,-2.93l0.25,-2.74l-0.17,-2.45l-0.95,-2.48l0.64,-1.41l-1.32,-1.83l0.6,-1.91l-4.07,-3.16l-0.72,-1.01l3.05,0.07l2.93,-1.21l4.11,-2.52l2.84,-2.79l7.62,-3.71l2.73,0.57l1.86,-0.27l1.23,-1.02l1.17,-2.1l1.79,-1.26l7.68,-3.75l3.27,-0.99l12.68,-1.21l2.9,0.13l4.55,-2.47l6.35,-0.14l3.11,-1.36l11.33,-0.0l2.63,1.13l2.44,1.81l1.39,0.39l1.59,-0.39l3.49,-1.65l4.02,-0.89l2.16,-1.0l1.01,-1.47l1.48,-0.43l1.07,1.05l4.12,1.13l3.87,-0.66l0.27,-0.48l-0.26,-1.08l2.04,0.34l1.97,0.77l2.11,1.58l1.54,0.39l2.7,-0.72l4.92,-0.34l0.15,0.75l-1.6,0.85l-1.01,1.82l-1.55,1.12l-0.44,0.7l0.24,0.66l1.01,0.49l0.39,0.87l-1.18,7.58l0.84,2.07l-0.03,3.22l0.88,2.63l-0.87,1.43l-0.46,1.49l-0.37,3.25l-1.33,2.08l-3.26,1.97l-1.16,2.14l-2.75,2.31l-0.25,3.53l2.8,7.65l0.48,0.56l4.0,2.24l1.11,1.61l1.56,5.14l8.2,5.98l5.48,23.47l-2.2,1.33l-0.13,0.55l3.85,6.11l1.91,5.8l0.42,2.6l-0.31,5.2l0.5,6.57l0.66,3.21l-1.96,5.8l0.58,3.71l0.49,1.63l0.65,0.87l-0.12,2.54l-0.23,0.81l-4.32,2.79l-0.68,1.25l-0.17,1.41l0.36,1.12l6.44,9.15l0.31,3.47l1.07,3.25l1.71,2.65l1.86,1.42l0.67,0.05l2.78,-0.85l9.44,2.89l5.07,9.39l-52.31,32.38l-19.32,17.03l-0.94,0.5l-28.22,5.41l-2.21,-1.53l1.57,-2.44l0.16,-0.76l-0.64,-1.89l0.02,-2.73l-1.0,-1.05l-3.24,-1.37l-5.26,-1.26l-1.41,-1.71l-0.82,-0.54l-3.55,-0.36l-1.93,-0.67l-0.68,-0.49l-0.88,-2.15l-3.87,-2.03l-1.27,-1.07l0.08,-1.93l-0.49,-1.74l-66.42,-45.76l-11.74,-7.74l-36.95,-23.29l0.16,-17.66l11.35,-8.01l2.34,-0.55l3.78,-2.8l5.93,0.6l0.75,-0.22l0.97,-1.1l0.25,-1.88Z", "name": "Algeria"}, "ET": {"path": "M725.94,291.31l1.59,-0.58l1.43,-0.08l2.7,0.48l0.61,-0.32l0.82,-1.39l1.01,-0.41l0.96,0.83l1.77,2.54l1.16,0.25l3.75,-8.2l1.03,1.12l2.48,0.99l1.79,2.1l0.92,0.64l4.56,-0.65l2.86,-1.74l1.54,1.78l0.99,0.1l2.98,-0.77l2.55,0.43l1.76,0.7l2.77,-0.18l0.84,0.26l3.51,2.43l2.92,1.0l1.85,1.82l2.18,2.98l2.82,2.82l4.68,3.74l2.17,3.56l2.21,1.42l2.63,3.35l-4.31,6.33l-2.45,2.83l-0.34,3.34l0.4,5.17l0.27,0.35l2.11,0.47l7.0,-1.64l0.99,0.03l1.51,0.81l1.06,0.14l-1.56,1.9l-1.21,1.96l-0.07,0.61l1.49,2.73l0.69,2.0l2.69,3.32l1.34,0.64l1.39,3.09l2.16,2.79l1.75,0.62l4.76,4.15l34.61,11.66l10.92,0.04l-17.54,17.0l-17.34,18.6l-10.93,-0.52l-4.87,1.14l-5.48,2.53l-1.37,1.04l-1.78,2.71l-7.25,1.39l-2.4,0.75l-1.75,1.86l-6.41,0.41l-1.94,-0.21l-3.04,-2.61l-1.65,-1.03l-10.87,4.97l-2.27,3.29l-1.66,1.29l-6.08,-0.75l-4.27,-0.94l-5.97,-0.55l-13.9,-8.97l-10.28,-0.64l-2.84,-3.78l-0.07,-1.51l0.51,-2.54l-0.17,-1.57l-0.77,-0.92l-3.24,-0.88l-1.76,0.59l-0.34,-0.26l-0.05,-1.06l-2.16,-2.09l-1.1,-2.08l-0.32,-2.25l-3.0,-7.36l-1.7,-1.38l-1.03,-1.48l-2.35,-1.2l-2.43,-2.53l-0.51,-1.66l-1.49,-1.78l-2.88,-1.96l-5.15,-1.06l-2.36,-1.3l3.05,-5.92l7.75,-0.06l1.97,-1.84l-0.12,-11.17l0.91,-3.93l1.79,-4.02l-0.39,-4.04l1.71,-2.87l1.37,-0.92l2.44,1.52l0.66,-0.22l1.4,-1.3l0.53,-3.71l-0.08,-1.4l1.71,-6.24l1.65,-1.69l4.82,-7.84l1.58,-0.64l3.63,-0.69l0.37,-1.06l0.29,-3.43l0.59,-2.06l2.1,-4.28l0.66,-2.58l-0.02,-1.8l0.85,-2.9Z", "name": "Ethiopia"}, "RW": {"path": "M636.22,488.26l1.26,-0.91l1.11,-0.31l3.12,-3.45l0.23,-0.83l-1.49,-3.68l1.28,-1.64l2.53,-1.49l2.72,-0.58l0.72,1.41l1.45,-0.17l1.44,-1.01l2.6,-3.03l0.8,-0.44l0.3,0.02l0.44,1.46l1.5,1.94l1.0,0.44l0.5,0.61l0.54,1.12l0.07,4.67l0.54,0.99l0.12,1.02l-0.7,2.22l-2.66,0.4l-1.82,-1.01l-2.16,0.44l-1.14,0.76l-1.49,-0.87l-0.74,-0.03l-0.38,0.37l-0.64,4.17l-1.74,0.8l-3.47,0.17l-0.99,-1.54l-2.37,-0.94l-0.91,0.27l-0.5,1.03l-0.74,-0.57l-0.32,-1.82Z", "name": "Rwanda"}, "TZ": {"path": "M644.97,516.58l0.34,-4.61l0.73,-0.07l2.75,-1.8l2.34,-2.61l1.44,-2.77l1.32,-1.45l0.54,-1.65l2.32,-1.91l0.01,-0.89l1.73,-0.74l0.51,-1.14l-0.4,-2.83l-3.35,-0.98l-0.71,-0.33l-0.07,-0.35l0.54,-1.4l-0.47,-0.77l1.15,-2.31l2.85,-0.57l0.51,-0.36l0.71,-2.54l-0.14,-1.28l-0.54,-0.98l-0.11,-4.79l-1.25,-2.03l-0.99,-0.42l-1.36,-1.75l-0.34,-0.99l2.03,-0.25l1.49,-0.64l11.95,0.24l-0.4,3.55l-0.73,1.55l-1.17,5.25l0.13,4.05l1.26,2.01l-0.54,1.03l0.18,0.62l0.62,0.55l-0.27,0.69l0.26,1.29l0.42,0.3l0.53,-0.25l0.27,-0.85l0.41,-0.17l0.39,0.57l0.66,0.23l0.44,-0.51l-0.24,-2.1l1.79,-0.16l0.18,-0.44l-0.51,-1.29l1.57,-1.06l0.72,1.22l1.06,0.65l0.89,0.12l0.26,0.53l0.53,0.05l0.89,-0.65l0.47,0.59l1.22,0.21l-0.07,1.31l0.5,1.15l-0.97,0.97l-0.19,1.62l0.62,0.4l1.52,-1.4l0.71,-0.13l0.28,-0.57l-0.87,-2.06l0.09,-1.95l0.42,-0.49l1.11,-0.09l1.72,0.93l2.65,0.47l0.49,-0.38l0.02,-0.58l4.25,-3.12l-0.1,-1.24l-0.74,-0.36l-2.13,0.64l-3.59,-0.58l1.78,-0.61l1.16,-0.01l0.39,-0.48l-0.77,-1.09l-1.56,-0.14l0.58,-0.45l1.09,0.08l1.33,-0.78l0.22,-0.91l0.88,-0.93l-0.29,-0.75l0.22,-0.55l2.55,0.33l0.33,-0.73l-1.08,-0.91l0.08,-0.38l1.28,-0.24l0.04,-0.69l-0.44,-0.51l1.47,-1.96l41.71,23.3l0.4,2.07l-0.91,2.38l0.09,0.83l1.23,0.54l1.04,1.59l16.48,11.86l-2.76,9.33l-0.79,1.29l-1.08,2.96l-0.19,2.37l0.91,3.37l1.26,1.46l1.69,1.19l1.16,1.46l0.67,1.48l2.25,0.91l0.72,1.43l-0.25,0.93l-0.99,0.98l-0.94,1.58l-0.81,2.28l-0.02,3.18l0.68,0.29l0.28,-0.26l0.72,0.49l0.13,2.05l-1.16,2.69l-0.42,2.58l0.86,3.27l1.26,1.67l-0.33,1.1l2.14,2.83l-0.14,2.6l1.73,5.01l0.08,0.71l-0.6,0.9l0.27,0.62l1.51,0.24l1.23,1.45l1.38,0.17l3.45,2.23l0.64,0.9l-5.28,4.01l-1.96,1.06l-2.98,0.79l-2.85,1.71l-1.64,0.49l-2.22,0.02l-2.26,0.73l-3.44,2.1l-1.86,-1.09l-1.74,-0.43l-3.31,0.24l-0.55,0.43l-0.66,1.93l-1.1,1.05l-2.05,1.07l-1.85,0.39l-1.7,-0.27l-2.93,-1.43l-1.38,0.08l-2.36,1.34l-1.68,0.35l-2.4,-0.11l-1.08,-0.34l-0.27,-0.73l-1.09,-0.86l-2.25,-1.07l-1.76,0.1l-0.92,0.92l-1.46,0.75l-6.7,-0.3l-0.8,-2.01l-0.72,-0.67l-0.78,-0.14l-1.78,-2.85l0.71,-3.19l-0.06,-1.07l-0.9,-2.23l-0.18,-3.36l-0.59,-2.65l-2.47,-3.64l-2.72,-2.29l-1.18,-0.56l-0.46,0.09l-0.62,0.96l0.06,0.99l-2.57,-0.86l-3.12,0.15l-1.19,-1.08l-2.29,-0.28l-1.74,-1.13l-0.85,0.04l-4.84,-2.19l-0.8,-0.73l-2.44,-0.36l-1.17,-0.63l-1.97,-0.2l-0.31,-1.29l-1.28,-0.52l-1.64,0.09l-1.18,-1.05l-0.39,-1.22l-1.0,-0.7l-1.39,-0.63l-1.67,0.03l-0.42,-1.69l-2.07,-2.49l-0.06,-1.31l-2.75,-5.02l-1.4,-1.85l-0.05,-1.9l-0.96,-2.74l0.48,-0.66l0.06,-1.01l-0.46,-1.02l-0.91,-0.88l-1.81,-2.8l-1.67,-1.67l-1.13,-0.35l-1.39,0.42l-2.51,-2.66l0.27,-2.19l1.84,-0.96l0.58,-1.21l-1.05,-2.93l-1.22,-1.91l0.69,-3.57l-0.3,-1.39l-0.66,-0.88l-1.43,-0.88ZM762.78,552.69l-0.45,-0.03l2.18,-1.95l-0.46,1.08l-0.77,0.24l-0.51,0.66ZM764.47,517.47l-0.18,3.41l-0.94,1.84l-0.66,-0.51l0.6,-2.83l-0.24,-1.79l1.42,-0.13ZM760.15,532.01l0.83,2.31l-0.43,0.34l-0.52,-0.95l-0.74,-0.16l-0.92,-0.93l-0.6,-0.04l-0.52,-0.88l0.25,-1.03l-0.15,-1.61l1.05,-1.58l0.23,1.82l0.76,1.93l0.77,0.77ZM683.58,482.55l0.38,0.28l1.24,-0.06l0.79,1.43l-3.05,-1.0l-0.14,-1.03l0.6,-0.17l0.18,0.55ZM670.5,485.68l0.64,0.7l1.71,-0.3l-0.03,0.36l-1.27,0.27l-0.41,0.62l-0.7,-0.98l0.06,-0.68Z", "name": "Tanzania"}, "GQ": {"path": "M410.07,446.64l-1.07,-0.77l-1.18,-0.22l1.11,-3.0l1.66,-1.63l0.99,-2.55l1.02,-1.6l-0.11,-3.49l1.8,0.85l15.42,0.0l0.07,12.9l-14.92,-0.05l-1.36,0.5l-1.02,-0.39l-0.73,-0.94l-1.1,0.01l-0.59,0.36ZM399.74,415.59l1.81,-0.01l0.26,0.34l-0.04,0.66l-1.74,2.58l-0.37,1.17l-0.56,0.76l-0.36,0.05l-1.91,-0.51l-0.27,-0.45l0.22,-1.02l1.41,-0.56l0.73,-2.22l0.81,-0.78Z", "name": "Eq. Guinea"}, "NA": {"path": "M466.74,733.07l0.38,0.14l0.53,-0.3l0.29,-1.49l0.06,-1.38l-0.78,-3.22l-1.69,-3.26l-4.06,-5.17l-1.58,-3.62l-4.54,-6.79l-3.29,-8.89l-1.52,-2.0l-6.83,-13.38l-1.6,-2.24l-3.3,-3.31l-1.06,-2.44l-2.01,-3.19l-0.48,-2.93l0.08,-5.67l1.56,-0.23l1.36,-0.7l0.99,-0.04l1.23,0.54l3.93,0.03l6.56,-2.95l4.09,0.79l1.02,1.22l1.56,1.11l2.97,1.93l0.99,0.26l4.73,-0.25l46.65,0.14l0.82,0.42l2.79,3.2l2.87,1.25l5.01,0.28l3.11,0.53l6.52,-0.06l2.21,0.27l2.71,1.31l1.59,0.3l4.32,-0.77l1.91,0.08l1.68,0.45l33.47,-6.28l7.59,0.74l1.71,1.01l1.22,1.2l-3.15,0.36l-1.47,0.55l-2.98,2.19l-1.88,-0.83l-1.58,0.57l-2.92,1.63l-3.54,3.27l-0.86,0.33l-1.39,-2.56l-1.91,-2.5l-1.28,-0.49l-14.2,2.41l-9.11,1.31l-3.01,0.14l-0.38,0.4l0.04,44.55l-11.33,0.0l-0.4,0.4l0.04,80.24l-3.33,0.69l-1.64,0.94l-0.77,1.18l-0.76,0.57l-1.24,0.35l-0.49,0.57l0.02,1.07l-0.29,0.46l-0.78,0.38l-1.43,-0.12l-2.25,-0.75l-2.8,-0.18l-3.43,0.39l-2.32,-0.18l-1.49,-0.76l-6.0,-1.39l-1.09,-2.32l0.46,-1.7l-0.33,-1.21l-0.66,-0.69l-1.17,-0.31l-0.68,-1.49l-1.21,-0.76l-1.78,0.45l-0.85,0.85l-1.42,4.13l-1.43,0.38l-1.94,1.43l-6.19,-5.65l-1.96,-2.31l-5.01,-8.64l-1.8,-6.11l-0.09,-1.33l0.45,-1.04l-0.28,-1.16l-0.62,-1.24l-1.39,-1.25l-0.41,-4.36l-1.0,-2.93l0.21,-2.32l-0.53,-3.62l0.2,-2.77l-0.81,-3.06l-1.66,-3.05l-1.46,-4.23l-0.32,-11.33l-0.81,-3.84l0.15,-0.39Z", "name": "Namibia"}, "NE": {"path": "M321.81,313.66l1.53,-0.4l0.4,-0.89l-0.22,-1.1l-1.45,-2.12l-1.95,-0.1l-1.94,1.11l-2.45,-0.24l-5.39,-4.29l-1.15,-0.38l-0.09,-3.16l1.82,0.33l0.68,-0.44l-0.04,-0.61l-2.08,-1.29l-0.5,-1.0l-1.0,-0.75l-3.25,-1.11l-2.12,-3.07l-0.8,-1.8l0.24,-1.49l-2.48,-2.91l0.68,-5.15l5.45,0.19l2.78,-0.35l4.15,-3.46l19.81,-0.82l0.66,-1.03l5.16,0.84l0.46,-0.35l0.17,-1.37l2.04,-1.75l1.66,-0.81l1.31,-3.09l0.79,-2.94l1.26,-2.04l0.73,-2.79l0.23,-4.44l0.38,-0.57l-0.08,-25.67l17.51,-3.48l1.14,-0.59l19.35,-17.05l52.45,-32.47l17.54,4.13l1.29,0.7l7.35,6.23l0.48,-0.02l8.29,-4.41l2.16,12.67l0.17,5.07l1.36,1.45l3.48,5.3l-0.67,1.12l0.55,1.73l4.36,4.66l-2.64,5.31l-3.05,36.2l-12.92,13.89l-6.58,9.41l-1.95,4.04l-2.24,2.94l1.66,7.95l-2.93,0.41l-1.59,1.19l-3.77,1.49l-2.64,1.53l-1.7,1.58l-0.55,1.13l-3.62,0.02l-1.52,-1.2l-3.53,-1.28l-3.33,-0.67l-5.41,-0.22l-5.67,0.49l-3.48,0.73l-1.75,0.81l-1.44,0.91l-3.55,3.74l-4.66,-0.12l-5.18,-1.01l-3.4,-1.78l-4.22,-2.75l-3.26,-0.65l-0.74,0.08l-4.95,2.7l-2.18,0.27l-1.39,1.02l-1.14,-0.09l-1.38,-1.06l-2.54,-3.62l-3.47,-3.04l-1.54,-0.13l-8.22,-2.48l-1.61,0.45l-1.39,0.93l-4.84,-0.04l-3.14,0.7l-1.76,0.72l-2.05,1.71l-1.11,0.52l-0.9,5.04l-0.54,1.37l-1.02,1.82l-3.62,3.17l-0.08,6.6l-0.33,1.1l0.59,1.46l-0.27,0.23l-1.57,-1.62l-1.7,-0.84l-1.78,-2.28l-3.39,-3.09l-1.09,-0.17l-1.79,1.01l-3.36,0.92l-0.28,0.74l0.48,2.67l-3.22,-4.6Z", "name": "Niger"}, "NG": {"path": "M338.89,383.6l2.54,-1.3l-0.03,-0.73l-0.68,-0.18l-3.28,0.84l-1.28,1.51l-6.76,0.28l0.76,-3.44l-0.58,-3.21l0.4,-1.07l-0.07,-3.83l0.41,-1.05l-0.77,-1.74l-0.38,-3.03l0.54,-10.63l0.44,-2.81l3.16,-0.57l0.81,-1.34l0.44,-1.57l-0.11,-1.56l2.13,-2.36l0.08,-1.47l2.54,-1.34l0.66,-1.31l0.54,-1.9l-0.79,-1.5l0.27,-0.67l0.61,-0.69l0.99,0.13l0.54,-0.54l0.61,-2.19l-0.92,-2.01l-0.46,-3.61l-2.67,-3.8l0.03,-1.02l0.7,-1.48l1.32,-1.61l-0.59,-1.61l0.33,-1.04l0.07,-6.43l3.4,-2.82l1.15,-2.01l0.62,-1.58l0.68,-4.61l1.0,-0.46l2.05,-1.71l4.52,-1.29l4.94,0.02l1.55,-1.0l1.31,-0.37l8.03,2.47l1.3,0.04l3.27,2.88l2.53,3.62l1.77,1.29l1.51,0.1l1.52,-1.06l2.17,-0.26l5.34,-2.74l2.96,0.57l4.18,2.72l3.58,1.86l5.33,1.04l4.91,0.13l3.94,-3.96l1.29,-0.81l1.58,-0.74l3.34,-0.7l5.62,-0.49l5.27,0.21l3.23,0.65l3.39,1.23l1.67,1.25l2.36,0.2l1.78,-0.24l0.83,-1.36l1.6,-1.49l2.51,-1.44l3.83,-1.51l1.47,-1.12l2.92,-0.36l5.2,7.23l1.55,8.19l1.14,0.62l1.71,0.16l1.06,0.48l1.05,1.56l-0.27,3.59l-0.42,1.35l0.04,2.5l-4.04,2.55l-2.67,0.72l-1.12,0.93l-2.27,3.19l-1.98,3.29l-1.38,5.02l-1.73,1.72l-0.81,5.49l-1.97,0.77l-1.19,0.9l-0.66,1.55l-0.81,4.89l-0.8,1.5l-1.58,1.31l-2.31,0.53l-1.99,3.69l-0.93,4.05l-1.56,2.65l-0.11,1.52l-2.86,3.7l0.97,1.91l-3.18,2.63l-0.57,2.7l-2.25,1.88l-1.77,0.5l-0.54,-0.53l-0.86,-2.8l-3.25,-3.02l-1.62,-0.94l-0.8,0.12l-0.77,1.58l-0.93,0.43l-2.2,-0.14l-0.59,-1.08l-0.57,-0.11l-4.23,2.76l-1.51,2.76l-3.3,2.46l-3.76,3.74l-1.53,2.82l-1.56,6.81l-2.8,5.0l-0.32,0.25l-0.57,-0.15l-0.36,-0.64l-0.74,-0.3l-0.96,-1.07l-0.78,0.16l-0.11,0.44l1.05,2.82l-0.27,0.76l-7.24,0.38l-0.69,-0.32l-0.35,-0.95l-0.61,-0.18l-0.74,1.1l-1.77,0.08l-1.48,-1.46l-0.92,-0.48l-0.55,0.49l0.99,1.21l-0.08,0.83l-1.43,1.19l-0.76,0.06l-0.45,-0.41l-0.92,-3.27l-0.6,-0.23l-0.39,0.5l0.29,2.91l0.54,0.89l-1.76,0.21l-0.6,-1.48l-0.67,0.21l-0.25,1.31l-2.68,0.38l0.1,-1.13l-0.65,-0.28l-0.8,0.82l-0.08,0.87l-1.03,-0.1l-3.13,-1.87l-2.38,-2.16l-1.09,-2.2l-1.1,-2.87l0.83,-0.4l-0.21,-0.65l-0.94,-0.26l-0.02,-1.24l1.51,-0.54l0.61,-1.2l-0.54,-0.51l-1.74,0.77l-1.75,-1.15l2.03,-0.1l0.74,-0.44l-0.08,-0.72l-1.21,-0.16l-0.03,-0.57l-0.61,-0.36l-0.67,0.8l-0.89,0.33l-0.37,-0.24l-0.23,-1.38l-2.79,-3.17l-5.14,-3.88l-3.8,-0.8l-6.74,0.03ZM382.56,407.1l-0.87,0.28l-0.02,-0.0l0.45,-0.68l0.44,0.41Z", "name": "Nigeria"}, "TN": {"path": "M393.95,11.16l1.69,-1.28l0.94,-1.75l1.74,-0.94l0.03,-1.47l2.63,-0.77l3.65,-2.61l6.28,-1.93l1.22,0.27l-0.47,1.25l0.54,1.03l0.6,0.12l0.78,-0.63l-0.06,-0.91l1.95,0.05l0.97,0.47l-0.08,2.06l1.65,2.34l-0.39,0.92l0.2,0.52l1.4,0.67l1.63,-0.83l0.68,-1.19l2.26,-0.71l2.09,-1.67l0.72,-0.11l0.65,2.05l-1.66,1.69l-1.96,3.31l-1.73,0.93l-1.45,1.35l-0.7,2.23l0.38,2.14l1.07,2.04l1.15,1.17l1.21,0.45l2.36,1.69l0.47,3.82l0.81,1.23l-4.84,7.19l-1.78,1.72l-4.9,3.52l-1.05,2.18l0.14,1.24l1.29,2.72l1.8,1.72l2.07,0.97l2.54,-0.29l0.17,1.91l0.41,0.33l2.13,-0.26l0.76,-1.06l1.0,0.56l0.72,2.39l1.13,0.83l-0.39,0.32l0.07,0.66l3.32,0.78l-0.51,3.44l-0.06,3.37l0.96,2.13l-0.26,0.57l-7.85,4.28l-0.71,0.81l-1.87,1.17l-1.54,2.48l-1.86,0.38l-0.61,0.42l-1.38,1.86l-0.56,1.34l1.5,5.57l0.14,1.99l-0.42,0.94l-3.67,4.98l-3.88,1.77l-5.51,-23.48l-8.3,-6.14l-0.33,-1.91l-1.09,-3.01l-1.2,-1.77l-4.43,-2.74l-2.68,-7.3l0.14,-3.04l2.61,-2.15l1.12,-2.09l3.28,-2.0l0.93,-1.22l0.67,-1.32l0.75,-4.52l0.94,-1.54l-0.85,-2.92l0.01,-3.35l-0.83,-1.99l1.18,-7.61l-0.6,-1.31l-1.0,-0.53ZM429.08,34.41l0.05,-0.04l-0.0,0.02l-0.05,0.02ZM425.59,47.89l-0.94,0.42l-1.23,-0.47l0.15,-1.38l1.64,-0.05l1.05,0.9l-0.66,0.58Z", "name": "Tunisia"}, "LR": {"path": "M182.44,359.46l0.23,0.58l0.47,0.24l0.48,-0.27l1.56,1.32l0.86,5.09l0.9,2.38l-0.16,1.38l-0.9,1.59l0.14,0.72l2.35,0.46l1.98,1.95l1.88,-0.62l0.71,0.07l2.06,-2.86l0.41,-1.94l0.86,-0.18l0.23,0.6l1.41,1.2l1.6,5.06l-0.4,3.01l-3.07,3.32l-0.02,0.55l0.88,0.56l1.08,0.13l1.92,1.64l1.09,0.35l2.5,0.04l0.9,0.5l1.14,3.08l0.99,0.75l2.94,0.87l0.57,3.05l-0.33,0.87l-0.01,1.69l-0.59,0.94l-0.16,1.24l-0.89,0.8l-0.26,3.02l0.23,5.05l-7.51,-2.68l-10.18,-5.43l-2.8,-2.16l-10.57,-9.84l-1.72,-1.1l-2.19,-0.56l-2.02,-1.05l-0.86,-1.9l-5.16,-2.62l-2.18,-2.21l2.51,-3.59l2.12,-1.94l2.46,-1.67l2.6,-2.53l1.07,-3.83l2.4,-1.31l0.98,-3.42l1.53,-0.28l0.28,0.68l0.51,0.25l3.12,-1.1Z", "name": "Liberia"}, "LS": {"path": "M634.16,822.85l-4.19,0.68l-2.99,3.91l-0.2,1.11l-0.69,1.14l-3.16,-0.43l-2.91,-2.91l-1.25,-0.68l-0.33,-0.65l-0.02,-1.31l-2.6,-4.03l-0.85,-2.36l2.71,-1.31l5.14,-7.34l2.48,-0.8l3.26,-2.21l4.38,-1.45l3.67,3.7l4.02,2.67l0.94,2.02l-1.08,3.55l-1.82,1.85l-0.49,2.65l-2.12,1.4l-1.88,0.8Z", "name": "Lesotho"}, "ZW": {"path": "M619.52,667.32l1.52,-1.13l1.42,-2.83l1.6,-0.75l1.18,-1.13l0.85,0.25l0.79,-0.39l0.36,-0.77l-0.19,-0.61l0.53,-0.97l2.1,-0.57l1.33,0.92l0.84,-1.35l1.5,-0.62l0.21,0.77l0.48,0.37l0.76,0.08l0.76,-0.44l0.55,-1.03l0.84,-0.17l0.52,-0.76l-0.02,-0.65l-0.48,-0.38l-1.81,-0.41l0.65,-1.04l0.29,-3.44l0.54,-1.6l4.29,-2.48l2.29,-0.94l2.77,-0.61l7.38,-0.02l0.15,3.65l0.52,0.52l9.44,0.4l2.95,1.85l2.3,0.42l2.88,2.51l3.74,0.33l4.47,1.65l1.34,1.1l2.08,0.36l-0.79,1.76l0.12,1.98l0.97,2.52l-0.17,9.97l0.44,3.27l-1.23,4.36l-1.91,1.23l-0.31,1.56l0.43,1.1l1.33,0.98l-0.83,3.48l0.65,2.13l2.02,3.74l-0.14,1.15l-3.67,6.34l-1.62,1.14l-0.59,0.8l-0.2,3.53l-1.38,2.2l0.74,2.07l-11.51,12.13l-1.41,1.08l-2.38,-1.05l-1.92,-0.23l-5.39,0.47l-3.06,-0.45l-3.34,-1.3l-2.89,-0.49l-3.45,0.57l-1.32,-1.27l-1.7,-0.28l-0.55,-0.43l-0.24,-0.74l0.24,-1.52l-0.36,-0.6l-5.85,-1.81l-5.67,-0.96l-0.62,-0.64l-1.54,-3.01l-1.98,-2.29l0.4,-3.6l-0.05,-2.82l-0.31,-0.6l-0.94,-0.41l-3.68,-0.07l-0.29,-2.75l-1.0,-1.73l-5.96,-2.62l-5.89,-4.28l-2.44,-5.32l-0.17,-1.82l-1.52,-1.78l-0.65,-1.86l-2.36,-2.5l-2.0,-3.57l-1.22,-1.26l-0.6,-1.32l0.24,-0.97l2.0,0.54l2.22,-0.23l1.01,0.35l1.57,1.18l1.76,0.19l1.59,-0.67l2.12,0.2l2.81,1.11l2.65,0.23l3.66,-1.15l2.42,-3.38l0.75,-0.83l1.22,-0.47l-0.01,-0.38Z", "name": "Zimbabwe"}, "TG": {"path": "M297.58,329.02l5.02,1.16l0.41,0.5l4.27,-0.43l-1.21,2.91l-0.23,4.07l6.74,4.89l0.05,4.61l0.5,2.61l0.52,1.0l1.61,1.69l0.34,0.89l0.29,23.77l-0.72,0.04l-0.35,0.56l0.57,1.3l0.2,3.15l1.71,2.23l0.29,1.1l-1.57,0.41l-0.26,0.49l-4.23,1.18l-0.32,-0.43l-1.07,-0.3l-1.32,-1.77l-0.76,-0.09l-1.87,-1.33l-0.36,-1.41l-2.02,-3.08l0.05,-1.2l0.71,-0.89l0.49,-3.74l-1.49,-1.17l-0.09,-1.04l1.24,-2.27l-0.25,-4.87l0.14,-0.58l0.99,-1.08l0.07,-0.86l-0.87,-1.65l-1.64,-1.23l-1.12,-1.56l1.31,-1.36l-0.27,-3.1l0.74,-2.97l-0.15,-0.72l-1.1,-1.08l-1.07,-0.07l-0.96,0.6l0.16,-0.87l0.84,-0.48l-0.21,-0.65l-0.32,-0.08l0.41,-0.48l0.67,-7.15l-5.49,-4.69l0.85,-2.38l0.12,-2.09Z", "name": "Togo"}, "TD": {"path": "M578.03,273.18l-3.93,-0.49l-1.78,0.39l-4.06,0.13l-1.4,1.01l-0.94,1.17l0.33,2.92l-0.38,1.56l-2.0,2.01l-0.95,1.7l-0.15,1.58l-2.18,0.91l-1.13,1.08l0.69,3.53l1.01,1.3l-4.1,2.79l-0.9,1.48l0.01,1.14l1.31,3.02l0.08,1.52l-0.7,1.15l-2.02,1.29l-1.81,3.11l-0.18,1.11l0.84,1.32l1.56,0.36l2.71,-0.44l1.16,0.49l0.58,1.09l-0.24,1.06l0.95,4.57l0.28,0.53l0.98,0.47l-0.28,3.72l0.43,1.24l2.34,2.15l0.9,0.19l0.67,0.54l0.13,1.52l-0.79,2.84l-4.16,-0.83l-3.05,1.22l-0.89,0.77l-1.27,0.05l-1.09,1.08l-2.3,1.14l-0.9,1.11l0.23,2.36l-0.43,0.77l-0.48,0.5l-1.29,0.43l-1.57,2.45l-1.53,0.31l-2.98,3.09l-0.36,0.99l-2.37,2.61l-4.93,3.21l-3.03,-0.07l-1.54,0.71l-3.23,0.62l-6.19,0.07l-1.27,0.3l-1.1,0.68l-0.91,0.7l-0.08,0.78l2.5,2.18l-2.17,2.71l-3.17,2.77l-0.67,1.34l-10.77,0.76l-4.72,2.01l-1.56,1.33l-2.55,0.76l-1.02,0.93l-2.07,-2.05l-0.46,-1.29l-0.49,-0.32l-1.81,1.18l-0.37,1.04l-3.88,1.25l-0.93,0.78l-1.16,0.33l-3.54,-0.51l0.55,-1.29l-0.04,-1.55l-1.31,-0.92l-2.2,-5.47l-1.62,-2.83l-3.08,-2.96l-1.52,-0.81l-4.63,-3.94l-3.79,-4.5l-0.24,-0.91l1.76,-2.31l1.06,-0.81l6.79,0.46l3.55,-0.49l2.16,0.34l2.59,-0.07l1.48,-0.59l0.07,-0.7l-1.41,-0.93l-2.93,-3.11l-1.64,-3.35l-0.73,-2.36l-0.44,-3.05l0.29,-2.9l0.77,-2.02l-0.48,-1.41l0.03,-2.37l-2.37,-5.15l-0.43,-2.84l-1.01,-1.83l-1.71,-1.01l-0.8,-0.94l-0.32,-1.79l-0.79,-0.75l-2.69,-0.74l-2.02,-0.03l-5.2,-7.24l-1.79,-7.81l2.17,-2.87l1.95,-4.05l6.54,-9.36l13.06,-14.17l3.05,-36.28l2.66,-5.37l-0.48,-1.05l-3.96,-4.05l-0.45,-1.41l0.67,-1.28l-3.68,-5.61l-1.25,-1.27l-0.11,-4.85l-2.21,-12.95l11.33,-5.34l93.4,48.28l-0.08,45.21Z", "name": "Chad"}, "ER": {"path": "M725.98,290.45l-1.08,-9.87l1.07,-1.39l1.84,-5.7l1.57,-3.22l1.19,-3.67l-0.27,-4.02l1.01,-2.0l0.29,-2.92l1.67,0.22l3.06,-0.38l1.52,-3.09l2.72,-1.6l2.69,-0.91l1.01,0.09l1.86,-0.73l1.52,-1.7l0.59,-1.3l1.73,-1.8l3.31,6.53l1.43,4.09l1.26,4.26l0.93,6.42l0.91,3.33l1.48,1.71l0.96,2.98l1.01,0.37l0.48,0.66l1.03,2.81l0.81,1.16l0.69,-0.07l0.4,-0.92l-0.29,-1.59l0.51,-1.27l1.63,1.29l0.51,2.14l1.63,1.88l4.01,0.97l3.0,2.29l4.31,1.43l5.66,7.61l6.8,4.67l1.12,2.14l0.61,2.17l0.41,0.29l1.27,-0.09l2.29,2.23l0.94,1.99l2.03,0.67l0.51,-0.26l0.16,-0.49l0.44,0.4l0.27,0.93l-2.78,1.01l-1.16,2.36l-0.56,0.38l-2.39,-1.59l-0.67,-0.04l-0.58,0.41l-2.59,-3.3l-2.15,-1.36l-2.21,-3.6l-4.73,-3.78l-2.78,-2.78l-3.55,-4.5l-3.59,-1.45l-3.5,-2.43l-1.06,-0.36l-2.94,0.16l-1.53,-0.66l-2.68,-0.47l-3.79,0.7l-0.72,-1.17l-0.72,-0.56l-0.84,-0.08l-2.63,1.77l-4.17,0.63l-2.39,-2.59l-2.53,-1.03l-1.42,-1.39l-0.6,0.17l-3.59,8.22l-2.01,-2.62l-1.44,-1.07l-0.85,0.09l-0.82,0.56l-1.09,1.51l-2.45,-0.51l-1.56,0.09l-1.44,0.51ZM766.22,272.78l0.48,-0.41l0.03,-0.47l0.53,0.36l0.91,2.23l-1.05,-0.03l0.45,-0.33l-0.04,-0.49l-0.64,-0.68l-0.67,-0.19ZM769.17,274.55l0.38,-0.41l1.15,0.55l-0.68,0.02l-0.84,-0.16ZM767.02,269.46l0.02,0.06l-0.07,-0.03l0.04,-0.04Z", "name": "Eritrea"}, "LY": {"path": "M432.51,55.96l1.38,0.62l1.77,0.32l5.52,3.09l5.6,0.76l6.2,-1.47l2.92,1.16l3.54,0.43l3.69,1.05l4.24,2.61l7.66,1.54l0.93,0.91l1.01,1.84l0.07,2.47l1.57,4.11l2.63,3.18l4.95,2.13l7.8,0.67l6.6,1.71l5.58,1.96l1.45,1.0l2.76,0.94l5.64,4.66l3.13,1.61l2.32,0.35l2.19,-0.32l5.0,-2.61l3.6,-4.1l1.2,-2.18l0.49,-1.56l-0.1,-1.66l-2.12,-4.73l-0.39,-3.28l0.53,-2.25l1.66,-2.73l2.87,-2.72l2.89,-1.92l5.07,-2.5l4.24,-0.32l2.53,-1.81l2.26,0.38l4.02,-0.12l10.29,3.8l0.39,1.92l-0.1,1.87l2.3,1.61l5.95,0.71l3.97,1.95l4.11,0.17l2.4,-0.25l2.18,0.39l1.51,1.16l1.29,2.64l-3.38,4.27l0.29,3.57l1.12,3.66l-0.13,1.16l-0.95,2.74l-2.09,3.53l3.25,13.05l-0.01,114.09l-11.32,-0.01l-0.4,0.4l0.0,5.43l-93.2,-48.18l-12.16,5.56l-8.69,4.61l-7.05,-6.08l-1.45,-0.8l-17.67,-4.18l-4.98,-9.44l-0.57,-0.48l-9.64,-2.95l-3.37,0.82l-1.45,-1.16l-1.58,-2.44l-1.03,-3.13l-0.39,-3.67l-6.44,-9.16l-0.26,-0.86l0.7,-2.02l4.25,-2.71l0.44,-1.21l0.15,-2.82l-0.71,-1.06l-0.46,-1.54l-0.55,-3.46l1.96,-5.89l-0.67,-3.24l-0.5,-6.52l0.31,-5.16l-0.45,-2.79l-1.96,-5.95l-3.69,-5.86l6.61,-3.36l3.84,-5.21l0.47,-1.05l0.04,-1.2l-1.64,-6.67l1.74,-2.63l2.37,-0.68l0.85,-0.94l0.76,-1.6l1.76,-1.09l0.71,-0.81l8.06,-4.48l0.38,-1.64l-0.94,-1.63l0.06,-3.19l0.47,-3.16Z", "name": "Libya"}, "GW": {"path": "M102.75,314.04l2.01,-0.15l3.14,-1.06l3.53,0.23l3.21,-0.63l4.46,-2.25l16.69,0.07l0.02,0.75l0.64,1.26l-0.54,1.98l-1.27,0.14l-1.39,0.92l0.14,0.78l2.35,1.93l0.04,2.71l-2.28,0.75l-3.76,0.09l-2.18,1.22l-2.78,0.61l-1.26,1.37l-2.71,5.05l-0.18,-0.26l0.4,-1.37l-0.4,-0.51l-0.79,0.17l-0.73,0.93l0.04,-0.85l-0.36,-0.42l-1.1,0.02l-0.63,-0.55l-0.0,-1.0l0.43,-0.41l0.03,-0.63l-1.26,-0.26l0.29,-0.52l1.89,-0.81l2.09,-0.29l0.24,-0.64l-0.81,-0.9l-1.27,-0.3l-1.19,0.21l-0.88,0.6l-0.81,-1.0l0.31,-0.99l0.41,-0.23l2.3,0.01l1.58,-0.65l0.36,-1.03l-0.76,-0.31l-1.01,0.5l-2.93,-0.17l-1.03,0.37l-1.56,1.14l-1.82,0.6l-0.9,-0.17l0.34,-1.16l-0.84,-0.93l-2.27,0.43l-1.37,-0.62l-0.48,-0.67l0.08,-0.8l0.87,-1.17l-0.35,-0.52l-0.95,-0.05l-1.3,0.41l-1.74,-0.97ZM112.9,326.69l0.12,-0.11l0.02,0.0l-0.05,0.06l-0.09,0.04ZM110.3,324.02l-0.59,-0.08l0.44,-0.86l0.04,0.01l0.1,0.93ZM108.31,319.69l0.84,-0.06l-0.27,0.64l-0.57,-0.57ZM107.34,328.61l0.47,-0.15l0.65,-0.58l-0.03,0.58l-1.09,0.15Z", "name": "Guinea-Bissau"}, "ZM": {"path": "M578.83,587.79l0.57,0.09l0.9,1.63l1.94,0.49l0.41,0.52l0.31,1.3l-0.6,1.66l0.66,0.65l1.04,0.36l0.81,-0.09l1.84,-1.04l6.98,-1.64l-0.32,1.99l0.92,2.81l1.87,1.51l1.5,0.02l4.75,1.72l6.71,0.98l2.85,-0.1l1.64,-0.9l1.15,-3.33l0.93,-0.3l0.75,2.3l2.11,1.86l1.24,2.89l0.6,0.54l1.03,0.56l2.46,0.22l6.31,2.67l1.54,3.66l1.6,0.52l0.56,0.64l2.18,3.35l0.35,1.25l0.84,0.74l2.45,0.45l4.15,-1.77l0.53,0.36l0.42,1.55l1.15,0.51l0.87,-0.41l0.27,-0.68l-0.0,-14.77l-0.48,-0.39l-3.47,0.9l-0.38,0.66l0.12,1.47l-0.48,0.23l-4.08,-0.94l-2.45,-2.65l-4.23,-3.58l-1.39,-3.69l2.15,-7.93l1.13,-1.72l0.08,-1.41l-0.44,-1.86l0.26,-6.68l-0.31,-1.88l-2.38,-5.09l3.16,-2.4l2.27,-2.77l0.64,-1.18l0.2,-1.3l-0.31,-1.03l18.7,-2.93l-1.02,0.9l-0.41,1.25l0.48,1.04l0.86,0.1l-0.31,0.61l0.36,0.26l1.56,-0.81l1.29,0.58l2.05,2.1l1.03,0.63l1.28,-0.7l0.67,-0.01l0.32,-1.43l1.31,-0.02l1.89,1.09l0.32,1.13l1.42,1.26l1.88,0.0l0.84,0.3l0.08,0.89l0.53,0.6l2.13,0.23l1.15,0.62l2.33,0.33l0.66,0.66l4.88,2.21l0.68,1.21l0.2,1.17l1.25,0.47l0.59,-0.42l0.56,0.16l0.61,1.47l1.12,1.15l-0.33,2.25l2.45,2.21l0.31,1.85l1.23,1.86l-2.11,2.29l-1.44,0.39l-1.06,1.03l1.27,3.42l-1.16,2.57l-0.53,0.46l-0.03,1.61l0.71,0.92l0.15,0.78l-0.03,2.25l-0.54,2.88l1.16,2.49l0.58,0.33l1.12,0.01l-1.01,1.15l-4.53,1.8l-0.94,2.18l0.61,1.37l-0.34,3.58l-1.32,2.73l-2.19,1.84l0.25,0.57l1.27,0.75l-0.34,0.47l0.11,0.55l1.17,0.66l1.59,2.48l-17.08,5.92l-10.13,2.9l-5.19,2.06l-0.33,0.44l0.01,0.94l0.35,1.48l1.14,1.98l0.46,2.96l-7.37,0.02l-2.93,0.64l-2.44,1.0l-4.42,2.56l-0.62,0.85l-0.49,4.58l-0.64,0.98l-1.53,-0.37l-2.6,1.01l-1.11,-0.43l-0.51,0.83l-1.06,0.52l-0.31,0.78l-1.33,1.19l-1.56,-0.61l-1.27,0.61l-0.34,0.5l0.37,0.69l-1.24,0.36l-0.34,1.46l-0.84,0.2l-2.09,2.74l-1.07,2.03l0.28,0.56l-2.25,2.1l-1.87,3.23l-2.45,0.87l-2.23,-0.22l-2.92,-1.13l-2.27,-0.21l-1.78,0.69l-1.34,-0.19l-1.34,-1.07l-1.31,-0.48l-2.27,0.23l-2.12,-0.58l-3.08,-2.74l-3.24,-0.64l-5.5,-0.44l-10.3,1.89l-4.83,-4.16l-5.83,-5.69l-3.54,-2.57l-1.25,-3.88l-0.7,-3.64l-0.01,-34.94l21.47,0.0l1.47,-0.15l0.34,-0.33l0.02,-0.63l-0.95,-1.78l0.29,-1.74l0.97,-2.63l-0.38,-3.68l0.15,-5.67l0.87,-2.84l-0.85,-5.77ZM685.33,624.73l0.57,-0.41l0.12,0.17l-0.69,0.24Z", "name": "Zambia"}, "CI": {"path": "M196.93,382.8l2.89,-3.19l0.43,-2.32l0.05,-1.25l-1.95,-5.59l2.65,0.26l1.4,-2.46l-0.07,-1.4l1.32,-2.37l-0.2,-1.26l-2.64,-1.14l0.19,-2.03l1.8,-0.25l2.48,0.33l1.19,1.09l0.5,-0.0l0.54,-0.65l-0.08,-1.98l-0.43,-1.18l-0.92,-1.03l-1.72,-0.69l0.14,-1.82l1.69,-1.03l0.15,-0.57l-1.54,-1.29l0.22,-2.44l-0.47,-0.41l-1.42,0.2l-0.94,-0.89l-0.2,-5.46l1.75,-1.9l1.13,-0.28l0.94,-0.66l1.71,-2.17l1.57,-0.14l1.2,1.15l0.49,0.96l2.9,0.63l0.7,0.63l0.7,0.09l0.8,-0.68l-0.24,-1.02l0.28,-0.64l3.14,-0.28l0.32,-0.77l-0.12,-2.48l0.84,0.63l1.75,0.34l0.59,-0.68l-0.25,-0.8l1.38,-0.4l0.08,1.59l0.56,1.82l-0.55,1.65l1.67,1.02l1.39,-0.0l2.13,-2.23l3.13,-0.56l1.92,1.43l1.56,-0.01l1.64,0.79l1.18,2.2l0.43,1.55l4.1,2.6l1.18,-0.07l1.4,0.85l1.01,0.06l1.05,-1.24l5.38,-1.98l6.5,0.29l1.39,1.61l1.16,0.7l2.0,3.06l0.9,0.17l0.48,-0.23l-0.11,1.32l0.27,0.37l-0.75,1.69l-0.05,0.95l1.17,1.19l0.56,1.83l1.07,6.74l-1.2,0.72l0.04,1.01l-2.14,1.56l-1.25,2.9l-0.74,2.72l-0.32,2.93l-2.9,4.63l-0.14,2.06l0.52,3.62l2.38,7.52l0.74,1.08l1.69,0.35l0.4,1.76l-0.53,2.87l-1.4,0.37l-2.08,-0.82l0.17,-1.41l-0.35,-0.44l-0.57,-0.07l-0.86,0.46l-1.04,2.14l-5.87,-1.01l-1.43,-0.87l-1.66,-0.2l-5.1,0.35l-0.86,0.6l-0.13,0.46l0.24,0.16l-3.28,0.45l-0.63,-0.08l-0.81,-0.68l-3.17,-0.06l-0.81,0.35l-0.38,0.48l0.21,0.38l-2.29,0.19l-4.15,0.94l-10.94,4.0l-2.52,1.5l-2.05,0.7l-2.23,1.26l-1.09,0.23l-0.31,-5.08l0.26,-2.79l0.84,-0.77l0.14,-1.18l0.66,-1.17l0.01,-1.71l0.32,-0.84l-0.63,-3.6l-0.32,-0.39l-0.7,0.03l-1.32,-0.71l-1.13,-0.16l-0.56,-0.47l-1.27,-3.21l-1.23,-0.65l-2.59,-0.06l-0.89,-0.3l-1.79,-1.61l-1.47,-0.29Z", "name": "C\u00f4te d'Ivoire"}, "EH": {"path": "M98.08,205.07l0.08,-0.53l4.61,-0.68l7.72,-0.24l5.41,0.61l5.74,0.12l1.56,-0.12l1.34,-0.77l1.0,-1.33l0.7,-1.83l-0.17,-1.39l3.6,-3.91l1.16,-1.68l0.59,-5.54l0.82,-4.2l0.93,-3.8l1.48,-3.37l1.25,-1.1l5.4,-2.37l3.07,-5.33l0.75,-0.79l4.19,-2.59l2.47,-2.01l1.44,-3.57l1.65,-6.62l1.03,-2.84l-0.07,29.53l-3.82,1.71l-3.02,0.64l-4.82,3.35l-1.56,2.38l-0.19,1.07l0.84,3.16l0.89,13.84l-46.06,0.2ZM157.4,147.05l2.57,-0.61l1.1,-2.54l1.47,-2.19l2.08,-2.13l0.27,-1.55l-0.77,-1.45l5.06,-1.49l1.86,-0.12l2.33,0.36l3.62,1.65l2.5,-0.62l1.43,0.71l1.21,0.04l1.17,-0.23l3.65,-2.79l4.69,-0.01l2.5,-0.39l0.81,-0.78l-0.51,-2.08l0.27,-1.89l-0.47,-2.03l0.74,0.0l0.01,20.13l-37.6,0.0Z", "name": "W. Sahara"}, "CM": {"path": "M398.03,403.42l2.82,-5.07l1.56,-6.82l0.7,-1.54l4.33,-4.63l3.33,-2.48l1.48,-2.73l3.85,-2.5l0.77,1.06l3.39,0.0l0.65,-0.58l0.66,-1.41l1.37,0.78l3.12,2.89l1.1,3.23l0.74,0.41l1.2,-0.12l1.18,-0.46l1.88,-1.4l0.92,-1.25l0.3,-2.19l3.23,-2.63l0.05,-0.68l-0.95,-1.47l2.76,-3.48l0.19,-1.76l1.53,-2.56l0.92,-4.0l1.86,-3.45l2.06,-0.36l0.87,-0.57l1.58,-1.83l1.16,-5.86l0.56,-1.3l0.91,-0.64l1.78,-0.59l0.53,-0.56l0.81,-5.49l1.72,-1.7l1.41,-5.1l1.89,-3.12l2.21,-3.11l0.96,-0.78l2.6,-0.68l4.35,-2.85l0.28,-1.28l-0.22,-1.64l0.65,-3.05l0.02,-2.08l-1.41,-2.05l-1.21,-0.55l-2.37,-0.41l-1.43,-7.58l1.58,0.01l2.42,0.63l0.45,0.36l0.4,1.94l1.03,1.17l1.52,0.83l0.92,1.66l0.43,2.83l2.31,4.93l-0.04,2.29l0.48,1.26l-0.74,1.97l-0.31,3.08l0.46,3.19l0.77,2.5l1.76,3.56l3.9,3.8l-3.05,0.31l-2.23,-0.34l-3.5,0.49l-6.96,-0.45l-1.52,1.09l-1.89,2.46l0.35,1.76l3.85,4.57l4.71,4.0l1.55,0.84l2.88,2.74l1.56,2.71l2.23,5.53l1.32,1.21l-0.26,1.38l-1.73,2.8l-1.5,1.07l-0.56,0.78l-2.02,4.94l-2.03,2.73l-1.17,2.86l-0.59,0.61l-2.27,1.1l-0.87,0.92l-0.17,1.0l0.88,1.5l0.99,0.19l0.27,0.34l0.0,4.08l-0.63,2.62l0.93,1.38l0.8,6.0l0.8,1.4l2.94,2.34l0.41,0.75l0.84,2.49l-0.87,0.14l-0.29,0.54l0.34,0.86l0.83,1.49l7.59,8.23l1.64,0.47l1.66,2.0l-0.07,1.5l0.47,1.61l0.09,1.92l0.88,2.36l-0.05,0.45l-1.1,1.19l-0.17,1.15l0.77,3.32l-0.42,0.3l-3.71,-2.71l-1.74,-0.43l-2.99,0.05l-2.09,-1.04l-0.92,0.38l-1.87,-0.13l-0.45,-0.73l-1.33,-0.01l-2.52,-1.41l-1.03,0.48l-13.6,-0.08l-0.34,-0.67l-0.79,-0.44l-4.15,0.11l-5.9,-0.58l-9.45,-0.07l-2.47,0.03l-0.39,0.45l-0.17,1.1l-15.4,-0.0l-1.15,-0.48l-0.6,-1.01l0.96,-6.81l0.72,-1.86l-0.37,-2.11l-2.68,-3.39l0.9,-1.2l-0.4,-0.23l-1.12,0.11l-0.72,-1.57l0.47,-0.59l1.05,0.16l0.46,-0.45l-0.17,-0.57l-0.95,-0.85l0.42,-1.2l-0.75,-0.29l-1.01,0.5l-0.86,-0.44l-0.46,0.49l0.16,0.59l-0.55,0.59l-0.95,-0.14l-0.84,-0.7l-2.75,-1.02l-0.24,-1.42l-0.75,-1.51l-0.12,-2.56l-1.84,-0.35l-1.21,-1.05l-0.58,0.45l0.29,1.2l-0.69,0.03l-0.29,-0.55l0.31,-1.81Z", "name": "Cameroon"}, "EG": {"path": "M655.53,78.07l-0.21,0.35l0.36,0.35l1.61,0.17l3.64,-0.77l0.94,-1.8l1.14,0.18l3.97,1.69l1.1,0.01l3.14,-1.05l-1.65,2.54l0.15,0.61l2.72,0.93l0.97,1.48l0.46,0.19l1.43,-0.47l0.88,-1.06l-0.14,-0.7l2.53,2.05l1.11,0.5l5.96,-1.22l1.05,1.0l2.1,-0.59l3.42,-0.0l2.85,-0.68l3.12,-1.55l3.69,10.84l1.5,3.26l2.79,8.89l-1.89,2.68l-1.39,6.51l-1.99,5.07l-0.55,4.32l-1.88,2.86l-1.71,-0.68l-3.26,-2.7l-1.92,-2.6l-2.13,-1.76l-1.9,-2.18l-1.38,-5.22l-0.69,-1.29l-2.37,-2.68l-1.71,-2.94l-0.86,-3.49l-0.98,-2.31l-0.57,-0.19l-1.09,0.62l-0.04,1.2l-0.9,1.26l-0.58,1.8l0.54,1.4l1.92,1.84l0.35,0.72l0.43,1.69l-0.04,2.52l0.38,0.93l1.44,1.76l1.33,2.8l3.63,4.62l2.0,2.0l1.43,0.97l0.51,0.81l0.08,3.75l1.71,3.32l1.28,1.04l0.5,0.94l1.26,6.66l1.12,1.4l3.28,6.61l2.75,4.15l7.37,15.17l3.35,4.03l2.71,1.97l-1.8,0.35l-0.67,2.14l0.22,4.24l0.51,2.18l1.57,4.02l2.67,2.73l3.69,1.38l2.18,2.88l4.79,3.59l0.28,0.58l-62.68,0.01l0.41,-1.64l-0.55,-0.76l-0.75,-0.13l-0.92,0.38l-1.05,2.11l-0.37,0.06l-72.63,-0.01l0.0,-89.62l-3.24,-13.0l2.01,-3.21l1.01,-2.95l0.14,-1.41l-1.12,-3.66l-0.28,-3.32l2.97,-3.67l0.94,1.36l1.84,0.27l6.06,-1.39l15.73,3.12l3.47,2.15l1.06,0.29l2.32,-0.04l1.71,1.26l6.36,0.6l6.65,2.85l2.52,-0.49l1.84,-0.82l5.87,-3.87l1.26,-0.44l2.0,0.08l2.21,-2.6l1.58,-0.15Z", "name": "Egypt"}, "SL": {"path": "M165.73,342.66l1.63,1.75l4.17,5.64l-0.74,2.31l0.41,0.45l1.16,0.27l0.13,2.11l1.18,2.05l-1.46,1.62l-0.99,2.31l0.19,0.48l2.24,0.2l1.92,-1.94l0.63,-0.04l-0.81,2.95l-1.78,0.68l-0.74,0.82l-0.86,3.51l-2.61,2.56l-2.42,1.64l-2.15,1.96l-2.54,3.61l-2.43,-1.92l-2.36,-1.16l-6.28,-2.31l0.53,-1.8l-0.81,-1.26l0.29,-0.85l-0.38,-0.53l-1.19,0.6l-1.19,-0.14l-1.72,-1.16l-1.23,-3.82l-0.97,-0.75l-1.27,-0.14l-1.3,-2.27l2.07,0.42l1.94,-1.79l0.37,-1.04l-0.12,-0.31l-0.63,-0.17l-0.45,0.38l-1.42,-0.11l-0.88,0.52l-0.4,-1.02l0.17,-1.3l1.31,-0.13l0.46,-0.52l-0.29,-0.56l-1.01,-0.18l-1.29,-1.17l1.56,0.14l0.69,-0.3l1.03,-1.02l0.45,-1.28l1.3,-0.4l1.04,-0.94l2.42,-4.06l0.62,-1.73l0.66,-0.33l1.59,-0.34l1.71,0.62l2.58,-0.56l0.39,-0.82l7.08,-0.04l0.57,0.16l0.21,0.45ZM150.0,371.51l-0.53,-0.45l-3.08,-0.87l2.81,-0.26l0.92,0.47l-0.12,1.11Z", "name": "Sierra Leone"}, "CG": {"path": "M433.42,487.21l1.46,0.55l2.4,-0.56l1.54,0.77l4.48,-0.97l0.31,-0.36l0.38,-2.57l-0.54,-1.98l1.55,-0.98l1.97,1.09l2.51,4.59l4.34,1.09l1.37,-0.11l2.01,-1.45l1.27,-1.44l1.17,1.9l-0.19,0.83l0.33,0.82l1.68,0.45l1.3,-0.4l1.29,-1.29l0.14,-0.92l-0.44,-0.81l0.43,-0.47l0.59,-2.07l1.57,-1.38l0.46,-2.09l-0.23,-1.35l0.52,-0.89l0.1,-1.31l-0.52,-5.19l0.74,-4.75l-1.44,-1.48l-1.88,-0.53l-1.61,-1.82l-2.25,-0.59l0.27,-4.43l0.69,-1.73l1.47,-2.0l1.73,-0.23l1.13,-0.89l1.42,-2.45l-0.06,-1.17l-1.53,-2.72l-0.71,-2.27l-0.98,-0.83l-4.06,-0.56l-6.96,2.03l0.37,-1.14l-0.98,-3.22l0.1,-1.55l1.4,-4.04l13.58,0.08l1.08,-0.46l2.22,1.39l1.15,-0.05l0.48,0.79l2.32,0.12l0.75,-0.36l2.1,1.03l2.95,-0.06l1.54,0.39l4.07,2.79l1.13,-0.93l-0.78,-3.49l0.11,-0.86l1.14,-1.24l0.07,-0.69l3.31,-6.52l0.14,-4.02l1.05,-3.37l0.36,-0.37l7.04,-1.03l2.53,-1.01l4.94,1.51l2.66,0.03l0.86,0.63l1.92,-0.97l1.69,-0.38l0.59,1.03l0.63,0.42l0.12,1.75l-1.5,4.35l-3.29,6.01l-1.64,4.71l-0.18,5.65l-1.83,4.96l-0.19,3.14l0.46,3.7l-0.43,3.46l-1.32,3.31l-0.59,2.7l0.31,3.13l-2.32,2.5l-3.03,2.57l-3.56,1.65l-1.18,1.06l-4.04,7.27l-3.8,3.94l-0.37,1.47l0.3,8.77l-0.81,4.99l-3.1,5.33l-3.04,1.07l-1.0,0.74l-0.6,1.05l-2.47,1.56l-5.69,6.29l-0.7,0.35l-2.98,-0.39l-0.49,-2.66l0.94,-1.72l-1.13,-1.89l-0.38,-0.18l-3.82,1.45l-1.14,0.73l-1.66,-0.57l-1.04,0.27l-0.55,2.93l-2.86,1.5l-1.96,-1.42l-0.96,-1.18l-1.17,0.06l-1.93,-2.01l-1.33,-0.17l-1.86,1.19l-2.92,1.0l-0.99,1.73l-1.36,0.32l-1.79,2.28l-2.02,-2.53l-0.43,-0.88l-0.13,-1.42l-7.43,-7.49l1.06,-2.28l2.93,-1.84l1.95,1.87l1.98,0.18l0.8,-0.71l-0.06,-0.81l-0.48,-0.73l1.17,-2.53l-0.16,-0.38l-2.49,-1.6l-0.19,-0.36l0.72,-1.02l0.09,-0.67l-1.56,-1.76l-0.94,-0.23l0.66,-2.47l-0.31,-2.57Z", "name": "Congo"}, "CF": {"path": "M474.14,412.46l0.6,-0.07l0.43,-0.47l-0.9,-3.12l-0.56,-0.97l-2.96,-2.34l-0.6,-1.05l-0.8,-6.02l-0.9,-1.17l0.63,-2.48l0.0,-4.35l-0.53,-0.82l-0.99,-0.17l-0.64,-1.1l0.78,-1.08l2.75,-1.48l1.46,-3.29l2.04,-2.73l2.02,-4.95l2.0,-1.76l1.06,-1.74l4.03,0.55l1.47,-0.39l0.95,-0.79l4.0,-1.29l0.53,-1.2l1.01,-0.76l1.43,2.22l1.74,1.32l0.61,-0.19l0.77,-0.82l2.62,-0.8l1.56,-1.33l4.57,-1.94l3.36,-0.03l7.48,-0.76l0.5,-0.38l0.46,-1.18l1.28,-0.85l1.86,-1.9l2.4,-3.0l-0.52,-1.18l-2.03,-1.58l1.67,-1.11l1.03,-0.22l6.16,-0.06l3.37,-0.65l1.4,-0.67l3.29,0.0l5.12,-3.35l2.49,-2.75l0.34,-0.96l2.79,-2.9l0.85,0.05l0.78,-0.46l1.51,-2.4l1.15,-0.35l0.74,-0.71l0.62,-1.18l-0.05,-2.6l2.63,-1.43l0.97,-1.01l1.33,-0.08l0.94,-0.8l2.84,-1.14l4.0,0.86l1.16,1.87l4.08,4.31l2.7,4.2l1.15,2.37l-0.28,5.52l-0.27,0.81l-1.54,1.91l-0.03,0.99l0.99,1.2l-0.05,1.65l0.7,0.7l1.13,0.39l5.92,0.9l-0.29,2.04l0.44,1.26l0.97,0.92l2.11,0.71l3.26,0.56l1.24,0.58l1.8,2.02l2.21,1.8l0.45,0.8l-0.75,1.98l0.2,0.63l1.04,1.08l1.28,1.18l5.95,3.16l1.64,1.23l1.56,2.04l2.1,1.6l-0.55,1.87l0.19,0.91l1.15,1.54l1.11,2.41l1.06,0.74l1.62,0.27l4.76,3.13l0.89,1.67l0.33,3.21l0.86,1.25l-2.75,-0.64l-2.83,1.59l-15.36,-2.89l-1.64,0.82l-1.65,2.58l-1.96,0.61l-1.09,-0.16l-2.4,0.6l-3.76,-0.92l-1.52,0.18l-10.6,3.89l-1.07,-0.0l-2.37,-0.86l-3.03,0.16l-2.04,1.7l-2.44,4.54l-0.73,0.65l-8.48,-1.69l-1.78,0.41l-2.16,-0.76l-1.52,0.07l-1.03,-0.3l-2.05,-0.97l-4.52,-0.54l-1.89,-2.58l-1.96,-1.69l-2.69,-1.4l-2.21,-1.63l-1.69,-0.5l-2.31,-0.05l-2.19,0.72l-2.99,2.11l-2.86,4.41l-1.45,1.56l-1.4,0.66l-0.3,1.3l0.6,1.61l0.15,1.81l-0.43,3.19l0.1,1.59l-0.6,-0.98l-0.64,-0.29l-1.9,0.52l-1.53,0.88l-0.63,-0.56l-2.75,-0.06l-4.63,-1.55l-3.2,1.05l-6.39,0.73l-1.02,0.47l-0.57,0.66l-1.08,3.45l-0.14,4.01l-2.93,5.77l-0.5,-1.57l-0.59,-5.29l-1.63,-2.02l-1.84,-0.65l-3.64,-3.79l-3.83,-4.31l-0.87,-1.68Z", "name": "Central African Rep."}, "AO": {"path": "M441.82,531.2l5.51,-1.02l3.33,-1.64l1.19,-0.09l1.33,0.29l8.0,-0.28l4.95,0.42l22.42,-0.32l1.26,0.37l1.14,0.71l1.79,2.25l0.1,3.42l0.4,1.79l2.1,3.81l0.49,1.37l-0.13,1.2l0.44,1.3l1.98,2.39l4.47,7.24l0.9,0.45l3.78,-0.36l1.27,0.46l2.2,-1.0l4.3,-1.02l4.37,0.77l2.35,0.0l2.39,-0.42l0.33,-0.35l0.36,-3.62l1.27,-2.22l0.05,-2.25l0.46,-1.41l1.39,-1.13l2.4,-0.57l7.93,-0.79l-0.65,2.71l0.29,0.87l0.73,0.59l13.96,0.54l0.34,0.88l-0.09,2.02l-0.63,3.19l0.24,2.91l1.12,2.76l0.11,4.05l-0.88,5.58l-0.2,3.59l0.58,1.73l2.74,3.2l1.23,2.03l0.88,2.52l0.36,5.0l-0.24,0.86l-0.77,0.46l-0.47,0.94l0.61,3.11l0.62,0.86l0.7,0.22l3.01,-1.69l6.04,0.37l4.49,-1.4l4.32,0.52l0.97,-0.4l0.33,-0.83l0.12,0.75l0.66,4.66l-0.87,2.86l-0.15,5.66l0.44,2.8l-1.33,5.29l0.97,1.94l-22.89,0.1l-0.4,0.4l0.01,35.38l0.73,3.82l1.44,4.23l3.58,2.59l3.09,3.14l7.11,6.3l-22.18,4.19l-1.47,-0.46l-2.05,-0.09l-4.31,0.77l-2.64,-0.77l-1.47,-0.82l-2.4,-0.29l-6.44,0.06l-3.08,-0.52l-4.9,-0.26l-2.61,-1.13l-2.74,-3.16l-1.29,-0.6l-46.71,-0.14l-4.64,0.25l-0.75,-0.2l-2.84,-1.86l-1.5,-1.07l-1.11,-1.29l-0.96,-0.42l-3.59,-0.49l-6.59,2.95l-3.74,-0.03l-1.09,-0.51l-1.36,0.01l-1.42,0.71l-1.3,0.19l0.84,-6.11l-0.26,-8.66l-0.49,-1.66l1.62,-1.29l0.85,-1.13l0.57,-1.45l0.68,-3.23l2.42,-7.3l1.16,-7.18l1.47,-3.45l0.53,-3.68l4.0,-4.81l1.03,-3.01l4.94,-2.94l2.29,-2.96l1.06,-2.0l1.17,-3.7l0.01,-3.95l0.74,-5.12l-0.16,-1.58l-1.12,-2.13l-0.27,-1.57l-2.1,-2.5l-0.54,-1.94l-1.88,-3.01l-0.51,-1.98l-0.91,-1.49l-0.63,-3.68l-1.83,-4.02l0.0,-0.28l0.54,0.15l3.67,-3.94l0.21,-4.04l-3.37,-6.95l-2.66,-6.41l-0.54,-3.41l-3.52,-4.26l-2.62,-5.27ZM440.92,526.36l-0.23,0.06l-0.46,-1.04l0.57,-1.98l-0.34,-1.69l-1.72,-3.63l1.89,-2.34l1.27,-0.25l0.93,-1.67l2.84,-0.99l0.98,-0.75l1.21,-0.42l2.01,1.99l-2.43,0.95l-2.71,2.81l-1.66,1.07l-0.15,0.59l0.81,0.81l-0.21,6.12l-2.58,0.35Z", "name": "Angola"}, "CD": {"path": "M441.08,527.14l2.62,-0.32l0.5,-0.41l0.31,-6.68l-0.67,-0.81l1.41,-0.9l2.69,-2.79l2.59,-0.98l0.6,-0.53l2.73,2.56l0.9,0.14l3.0,-1.47l0.38,-0.55l0.36,-2.58l2.25,0.5l4.69,-2.15l0.85,1.26l-0.93,1.82l0.66,3.06l0.65,0.43l3.26,0.2l0.95,-0.51l5.66,-6.27l1.52,-0.76l2.34,-2.46l3.17,-1.13l1.55,-2.11l1.91,-3.71l0.83,-5.09l-0.29,-8.85l0.24,-1.04l3.8,-3.95l3.94,-7.14l2.54,-1.79l2.1,-0.82l3.1,-2.63l2.5,-2.68l-0.23,-3.43l0.55,-2.55l1.36,-3.43l0.44,-3.56l-0.46,-3.81l0.19,-2.97l1.83,-4.94l0.17,-5.58l1.6,-4.62l3.26,-5.95l1.57,-4.52l-0.28,-4.52l0.43,-3.28l-0.16,-1.91l-0.59,-1.64l0.22,-0.72l1.21,-0.47l1.55,-1.65l2.78,-4.32l2.88,-2.03l1.96,-0.63l3.32,0.4l2.3,1.68l2.61,1.35l1.88,1.62l2.12,2.74l4.65,0.58l2.01,0.95l1.22,0.35l1.43,-0.1l2.16,0.77l1.91,-0.4l2.5,0.31l6.01,1.39l1.36,-0.97l2.45,-4.55l1.62,-1.41l2.72,-0.14l2.23,0.83l1.38,0.04l10.7,-3.9l1.25,-0.17l3.78,0.92l2.61,-0.6l1.12,0.16l2.34,-0.79l1.75,-2.67l1.24,-0.56l15.09,2.92l0.87,-0.23l1.71,-1.24l0.86,-0.12l3.17,0.98l0.98,1.57l2.08,1.49l1.47,2.37l2.25,1.33l1.15,1.25l1.59,0.98l2.81,0.3l3.57,-2.11l2.31,0.2l2.36,1.11l1.09,0.02l2.08,-1.32l1.01,-1.32l0.71,-0.21l1.26,0.5l1.11,1.15l1.11,1.86l3.78,4.03l3.69,1.75l0.49,1.88l0.43,0.58l2.05,0.06l0.84,1.41l0.67,0.41l-1.38,3.1l-0.32,1.5l1.12,1.86l-0.93,2.39l-0.49,2.71l1.4,1.0l1.6,0.02l1.31,1.27l1.03,0.18l0.8,1.0l-4.36,3.23l-4.04,3.9l-1.68,2.79l0.19,0.89l-0.92,0.36l-0.95,0.97l-0.71,1.55l-2.86,1.9l-0.14,3.81l-1.76,3.74l-0.71,0.84l-0.39,2.38l-2.23,0.93l-2.0,4.12l0.1,0.9l0.81,0.94l1.86,-0.41l0.81,-0.64l-0.85,4.62l0.2,4.56l-2.58,1.52l-1.19,1.5l-1.68,-0.6l-0.86,0.61l-0.61,2.37l-0.9,1.96l0.03,0.96l-0.5,1.34l0.48,1.07l-0.59,0.83l-0.15,1.1l0.89,2.99l1.03,0.51l0.14,0.94l2.33,2.84l-0.15,2.87l-0.81,1.14l0.06,2.46l-0.51,1.94l-0.21,3.61l0.14,1.38l-0.47,1.01l0.32,0.67l0.82,0.31l0.51,-0.15l0.23,-0.44l-0.2,1.74l-0.54,0.38l-0.37,0.91l-0.26,5.62l0.68,2.24l2.36,4.2l-0.32,0.51l-0.0,1.49l-1.69,1.55l0.07,1.66l1.42,1.9l1.32,3.51l0.63,0.46l-0.02,1.12l0.72,1.53l2.59,2.91l3.08,1.78l1.45,1.67l0.68,1.96l-0.04,1.33l0.92,3.24l3.01,2.58l0.46,1.23l-19.43,3.1l-0.27,0.52l0.39,1.15l-0.17,1.13l-0.52,0.92l-2.15,2.63l-3.41,2.77l0.05,0.8l1.63,2.75l0.72,1.93l0.29,1.73l-0.26,6.63l0.44,1.9l-0.07,1.24l-1.11,1.64l-2.18,8.02l0.3,1.25l1.24,3.06l4.33,3.69l2.73,2.83l4.21,0.97l0.89,-0.14l0.54,-0.79l-0.05,-1.58l1.86,-0.25l0.8,-0.42l-0.13,14.47l-0.78,-0.2l-0.33,-1.4l-1.09,-0.72l-4.33,1.77l-1.91,-0.31l-0.68,-0.59l-0.27,-1.11l-2.28,-3.49l-0.67,-0.76l-1.44,-0.37l-0.83,-2.38l-0.86,-1.41l-6.59,-2.81l-2.52,-0.23l-0.73,-0.42l-1.62,-3.2l-2.18,-1.96l-0.46,-2.0l-0.6,-0.54l-1.07,0.11l-0.86,0.5l-1.11,3.3l-1.21,0.61l-2.55,0.07l-6.62,-0.96l-4.76,-1.73l-1.22,0.08l-1.73,-1.38l-0.71,-2.37l0.41,-1.85l-0.74,-0.81l-7.38,1.68l-1.8,1.02l-1.28,-0.22l-0.2,-0.22l0.58,-1.46l-0.43,-1.64l-0.73,-0.83l-1.97,-0.54l-0.92,-1.61l-1.3,-0.23l-0.71,0.27l-0.5,1.17l-0.51,0.23l-4.31,-0.52l-4.53,1.4l-6.0,-0.38l-3.1,1.67l-0.45,-0.63l-0.53,-2.57l1.16,-1.19l0.31,-1.1l-0.28,-2.86l0.24,-0.82l-0.33,-1.63l-0.95,-2.72l-1.27,-2.11l-2.71,-3.15l-0.47,-1.36l0.19,-3.45l0.89,-5.67l-0.11,-4.16l-1.12,-2.79l-0.23,-2.79l0.72,-5.25l-0.44,-1.25l-0.46,-0.37l-13.84,-0.49l-0.57,-0.79l0.72,-2.73l-0.47,-0.7l-8.49,0.79l-2.52,0.6l-1.84,1.53l-0.51,1.59l-0.05,2.25l-1.28,2.29l-0.33,3.35l-4.27,0.35l-4.49,-0.77l-4.42,1.04l-2.03,0.97l-1.18,-0.46l-3.83,0.36l-4.74,-7.36l-1.95,-2.34l-0.33,-1.03l0.13,-1.22l-0.54,-1.51l-2.07,-3.71l-0.38,-1.66l0.1,-2.59l-0.25,-1.07l-1.95,-2.48l-1.44,-0.9l-1.48,-0.42l-22.47,0.32l-7.45,-0.44l-5.46,0.3l-3.52,-0.52l-2.56,0.51l-1.35,0.99l-1.81,0.47l-0.95,-0.16l-1.94,-2.08Z", "name": "Dem. Rep. Congo"}, "GA": {"path": "M400.47,467.86l1.76,-0.1l0.68,-0.62l1.11,-0.24l2.58,-3.26l0.57,-3.7l-0.33,-3.99l0.42,1.18l0.79,0.61l1.38,0.19l2.48,1.16l0.62,-0.25l0.14,-0.73l2.0,-0.74l0.26,-0.36l-0.91,-0.67l-2.07,0.27l-2.54,-1.14l-2.4,-2.83l1.62,-0.75l1.0,1.07l0.8,-0.39l0.1,-2.43l-0.51,-2.64l1.44,-0.44l0.67,0.9l1.36,0.46l1.38,-0.51l15.3,0.05l0.4,-0.4l-0.08,-13.67l0.28,-1.19l11.42,0.05l5.92,0.58l4.03,-0.12l0.58,0.78l-0.05,0.66l-1.36,3.55l-0.13,1.73l0.98,3.32l-0.48,0.7l-0.08,0.59l0.31,0.36l1.09,0.21l6.7,-2.07l3.65,0.53l0.52,0.42l0.71,2.25l1.48,2.57l0.06,0.78l-1.25,2.13l-0.89,0.7l-1.58,0.16l-0.5,0.37l-0.52,1.07l-0.91,0.92l-0.8,2.11l-0.18,4.88l0.67,0.58l1.92,0.31l1.46,1.73l1.95,0.58l1.15,1.38l-0.81,4.08l0.52,5.26l-0.09,1.18l-0.53,0.93l0.22,1.4l-0.42,1.89l-1.5,1.25l-0.61,2.11l-0.51,0.67l0.43,1.42l-1.14,1.14l-0.88,0.22l-1.01,-0.24l-0.02,-1.48l-1.06,-1.88l-0.78,-0.48l-0.53,0.16l-1.27,1.54l-1.68,1.28l-1.09,0.1l-4.03,-1.0l-2.35,-4.46l-1.01,-0.78l-1.59,-0.54l-1.71,0.94l-0.58,0.65l0.14,1.47l0.4,0.75l-0.35,2.16l-4.06,0.88l-1.43,-0.77l-2.53,0.56l-1.69,-0.52l-0.5,0.52l0.3,2.78l-0.75,2.72l0.31,0.5l1.08,0.2l1.21,1.31l-0.83,1.39l0.34,0.89l2.49,1.66l-1.15,2.37l0.58,1.2l-0.15,0.27l-1.56,-0.11l-1.67,-1.76l-0.87,-0.13l-3.24,2.06l-1.11,2.25l-0.67,-0.61l-1.03,-1.96l-3.56,-3.08l-0.67,-1.42l-2.79,-3.11l-6.22,-5.17l2.01,0.83l0.83,-0.53l-0.07,-0.64l-2.39,-1.27l-2.18,-0.36l-0.43,-0.4l-1.06,-2.36l-1.88,-2.18l0.78,0.38l0.54,-0.19l0.02,-1.08l-1.87,-1.01l-0.79,-0.07l-0.01,-0.96l-0.87,-1.72l1.17,1.19l1.11,0.03l1.47,-0.44l0.24,-0.57l-0.26,-0.51l-0.71,-0.66l-1.75,0.09l0.66,-1.79l-0.47,-0.54l-1.49,0.64l-1.42,-0.86l-3.38,-6.36Z", "name": "Gabon"}, "GN": {"path": "M141.71,352.29l0.24,-1.06l-1.47,-1.71l-0.56,-1.34l-1.55,-1.46l-1.15,-0.05l0.22,-2.42l-0.48,-0.96l0.11,-0.77l-0.48,-0.45l-0.82,0.62l-0.47,-0.12l-1.47,-0.9l-0.67,-0.8l-0.31,-1.14l-1.73,-0.05l-2.82,-1.33l-2.03,-3.39l0.19,-2.52l-0.67,-0.22l-0.51,0.48l-1.17,-2.5l-1.69,-0.42l-0.61,0.48l-0.49,1.4l-0.2,-0.14l0.07,-0.91l1.13,-1.55l1.92,-3.92l0.92,-1.04l2.68,-0.58l2.16,-1.21l3.61,-0.06l2.68,-0.87l0.27,-0.36l-0.07,-3.33l-2.46,-2.14l0.84,-0.42l1.18,-0.05l0.78,-0.82l0.42,-2.05l-0.67,-1.95l7.04,0.45l-0.17,0.92l0.49,0.79l0.87,0.11l0.82,-0.57l1.42,0.91l3.08,0.91l0.88,-0.02l0.75,0.45l1.44,0.12l2.83,-0.81l2.77,0.12l2.7,-0.46l1.39,0.12l-0.92,2.0l0.08,0.69l2.33,2.0l0.68,0.21l0.85,-0.26l1.8,-1.8l1.12,-0.32l2.17,3.28l0.63,0.37l1.27,-0.57l1.83,-2.36l1.99,-0.78l5.18,1.97l1.51,0.01l0.83,-1.29l3.56,-1.41l0.37,-1.11l-0.67,-1.38l1.56,-0.04l1.84,0.87l0.44,0.57l2.07,4.93l0.15,3.21l1.17,0.55l0.65,1.31l2.95,1.51l-1.34,1.23l-1.7,2.4l0.03,0.83l1.07,0.37l1.51,-0.69l1.26,0.55l0.25,0.81l-0.2,1.83l0.74,3.29l0.55,0.69l2.51,1.32l0.17,0.36l-0.05,1.08l-1.58,1.5l-0.35,0.75l0.19,5.81l0.64,0.99l0.8,0.5l1.36,-0.08l-0.23,2.15l1.47,1.18l-1.59,1.07l-0.26,2.57l2.11,1.1l0.65,0.78l0.4,2.48l-1.27,-1.01l-2.66,-0.33l-2.16,0.26l-0.43,0.55l-0.09,2.74l1.44,0.91l1.14,0.2l0.16,0.6l-1.33,2.39l0.09,1.33l-1.0,1.89l-2.23,-0.32l-0.72,0.4l-0.94,-1.27l-1.3,-0.1l-0.73,0.54l-0.38,1.88l-1.6,2.52l-0.9,-0.0l-1.32,0.53l-1.81,-1.85l-1.08,-0.37l-0.95,0.1l0.87,-1.56l0.17,-1.75l-0.89,-2.34l-0.07,-1.39l-0.7,-1.96l-0.08,-1.77l-1.91,-1.88l-0.85,-0.04l-0.63,-0.76l-3.15,1.15l-0.29,-0.57l-0.83,-0.36l-1.2,0.36l-1.56,-0.05l-2.28,2.08l-1.1,-0.15l0.74,-1.76l1.41,-1.48l0.14,-0.56l-1.23,-2.26l-0.12,-2.22l-0.32,-0.34l-1.24,-0.26l0.71,-1.67l-0.05,-0.82l-6.32,-8.12l-0.91,-0.24l-7.48,0.04l-0.49,0.9l-2.19,0.48l-1.71,-0.62l-1.86,0.41l-1.07,0.67l-0.62,1.76l-2.29,3.88l-0.78,0.75l-1.41,0.43l-0.71,1.58l-0.76,0.74l-1.95,0.03Z", "name": "Guinea"}, "GM": {"path": "M100.95,304.31l-0.62,-2.32l1.36,-1.21l1.03,1.81l2.06,0.55l2.56,-0.15l0.45,-0.42l0.18,-0.82l6.11,-0.87l1.77,0.01l0.51,-0.12l0.24,-0.62l-0.4,-0.34l-1.65,-0.2l-6.6,0.61l-2.59,1.24l-0.77,-0.09l-0.89,-1.06l-0.24,-0.98l11.84,0.03l1.25,-1.76l1.67,-0.67l1.8,-0.26l1.84,0.29l1.93,1.34l2.32,0.66l2.07,1.38l1.09,0.18l2.1,-0.56l1.82,-0.08l1.23,0.65l0.21,0.58l-0.15,0.52l-4.38,1.11l-2.13,-0.37l-6.84,-2.9l-1.81,-0.49l-0.66,0.46l-0.9,1.43l-6.12,0.84l-0.31,0.35l-0.19,1.66l-9.2,0.03l-1.0,0.59Z", "name": "Gambia"}, "XS": {"path": "M870.84,327.12l-0.01,20.86l-11.07,16.91l-11.42,0.0l-34.59,-11.65l-4.62,-4.08l-1.65,-0.54l-0.96,-1.1l-1.04,-1.49l-1.39,-3.12l-1.43,-0.74l-2.61,-3.2l-0.65,-1.9l-1.44,-2.61l6.6,-10.04l1.89,1.5l2.19,3.63l2.7,3.09l5.03,3.72l1.48,0.56l6.71,-0.13l4.61,-2.52l5.45,-2.16l7.45,1.19l1.36,-0.13l4.91,-2.16l3.04,-2.08l1.94,-0.83l3.56,0.74l3.6,-0.32l6.5,-2.15l1.09,-0.02l2.75,0.8Z", "name": "Somaliland"}, "CV": {"path": "M28.84,267.68l1.39,0.08l0.47,0.44l-0.15,1.03l-1.06,0.56l-1.06,-0.44l0.41,-1.67ZM28.19,260.4l0.01,0.82l0.07,0.36l-0.26,-1.07l0.19,-0.11ZM25.22,280.01l-0.28,-0.24l0.06,-0.77l0.23,-0.43l0.34,0.03l0.14,1.18l-0.48,0.22ZM19.01,279.11l1.9,1.57l0.86,1.27l-0.44,0.68l-1.23,-0.07l-0.64,-0.36l-0.81,-1.2l0.35,-1.89ZM11.49,262.35l0.91,0.29l-0.49,0.6l-0.43,-0.74l0.02,-0.15ZM11.76,283.5l-1.0,0.16l-0.47,-0.36l-0.06,-0.74l0.96,-0.54l0.38,0.12l0.2,1.37ZM3.48,259.84l1.06,-0.47l0.31,0.54l-0.53,0.16l-0.84,-0.23ZM0.42,257.15l2.3,-1.09l0.63,0.14l0.4,0.61l-1.9,1.44l-0.97,0.21l-0.46,-1.31Z", "name": "Cape Verde"}, "GH": {"path": "M262.02,399.49l0.83,0.05l1.7,-0.53l0.77,-3.59l-0.62,-2.21l-1.9,-0.53l-0.37,-0.63l-2.62,-8.49l-0.12,-4.16l2.86,-4.55l0.36,-3.07l0.72,-2.66l1.23,-2.82l1.87,-1.22l0.36,-0.65l-0.17,-0.62l0.83,-0.31l0.47,-0.77l-1.1,-6.96l-0.63,-2.01l-0.48,-0.81l-0.61,-0.32l0.84,-2.44l-0.33,-0.54l0.19,-1.39l-0.24,-1.21l-0.85,-2.35l0.34,-0.69l-0.45,-4.6l0.24,-0.72l-0.63,-1.09l0.35,-1.17l-1.07,-1.04l-0.37,-0.87l0.08,-1.47l0.78,-2.87l20.69,-0.14l3.81,0.23l0.51,0.61l0.57,0.13l1.74,-0.99l0.75,-0.93l1.08,-0.1l0.55,-0.75l2.23,0.5l0.7,0.8l-1.13,3.45l0.09,0.86l3.6,3.42l1.74,1.15l-0.58,6.67l-0.65,0.37l0.23,0.93l-0.64,1.71l0.76,0.7l1.38,-0.72l0.53,0.04l0.76,1.06l-0.73,2.89l-0.07,1.67l0.35,1.29l-1.2,0.93l-0.1,0.83l1.32,1.93l1.55,1.14l0.73,1.31l-1.2,2.26l0.24,4.93l-1.23,2.23l0.19,1.57l1.36,0.89l-0.47,3.5l-0.79,1.08l0.04,1.34l2.13,3.32l0.47,1.52l2.08,1.48l0.77,0.13l0.8,1.32l1.46,0.78l-1.48,1.1l-1.15,2.09l-2.15,0.54l-5.86,0.07l-4.5,2.21l-2.58,0.78l-1.69,1.29l-2.11,0.87l-1.51,1.07l-3.1,0.52l-5.16,1.71l-5.81,3.21l-0.82,-0.02l-3.64,-1.93l-7.18,-1.54Z", "name": "Ghana"}, "SZ": {"path": "M658.82,780.66l0.07,-4.13l2.66,-3.92l0.66,-1.48l1.33,-1.64l1.4,-1.03l0.63,-0.09l5.29,2.91l1.03,-0.19l0.99,0.55l-0.24,3.09l0.76,3.04l0.07,3.34l-0.71,-0.14l-0.66,0.4l-0.57,4.53l0.11,1.32l-5.23,-0.14l-2.19,-0.69l-2.35,-1.51l-2.04,-3.9l-1.02,-0.31Z", "name": "Swaziland"}, "MG": {"path": "M853.67,633.45l0.24,0.85l-0.77,2.09l0.28,0.45l0.83,0.15l0.76,-0.4l1.68,-2.95l1.01,-1.09l2.0,0.4l0.46,-0.19l-0.09,-0.49l-1.69,-1.44l-0.39,-1.81l2.54,-4.79l-0.06,-0.45l-1.05,-1.16l-0.03,-1.17l0.86,-1.19l0.4,-0.13l1.7,1.27l1.16,0.04l1.77,-2.17l2.52,-1.33l2.05,-1.89l1.44,-4.12l0.13,-1.24l-0.32,-1.57l-1.15,-2.76l0.76,0.15l0.76,-0.37l3.13,-4.13l0.3,0.0l1.01,1.69l2.02,2.3l1.19,2.47l3.46,5.1l0.34,2.28l1.26,3.72l1.17,5.47l0.72,8.28l0.97,2.6l1.46,2.49l0.46,2.67l-0.88,2.8l-2.08,3.7l-0.91,-0.61l-0.8,-1.07l-1.68,-4.3l-0.67,-0.26l-1.29,0.12l-1.28,1.14l-0.18,0.72l0.73,6.08l1.39,2.24l0.09,2.65l-0.29,1.27l-0.94,1.41l0.32,1.27l-1.9,1.26l-1.76,3.88l-0.14,1.39l0.66,3.86l-0.18,2.69l-1.34,5.26l-5.21,14.49l-5.28,16.74l-1.38,5.51l-2.04,6.04l-3.14,7.68l-1.23,6.53l-2.34,7.91l-0.54,2.98l-2.17,4.27l-1.17,4.31l-1.1,2.72l-1.61,2.3l-3.44,2.03l-3.98,0.28l-2.67,0.72l-6.59,3.76l-1.02,0.39l-3.41,0.09l-0.93,-0.3l-3.61,-2.63l-5.34,-1.29l-1.12,-1.39l-2.45,-1.42l-1.45,-4.36l-2.77,-4.12l-0.28,-6.85l0.2,-1.27l0.68,-1.46l-1.81,-5.63l-2.04,-2.46l-0.44,-1.1l-1.07,-4.95l0.29,-5.37l0.61,-1.75l1.12,-1.81l0.72,-3.43l0.79,-0.65l1.47,-0.5l1.23,-1.05l0.68,-1.34l0.63,-2.51l3.85,-5.95l1.29,-2.91l0.68,-2.79l0.52,-6.07l-2.48,-4.42l-0.06,-3.97l-1.49,-3.0l-0.78,-2.52l-0.31,-5.85l-0.8,-2.68l0.38,-2.1l5.14,-8.25l0.12,-5.12l0.35,-0.57l5.08,-0.53l3.57,-2.63l1.47,0.99l1.63,-0.59l1.18,0.08l0.41,-0.2l0.98,-1.95l3.49,-0.38l1.74,-0.51l1.69,1.96l1.37,0.19l0.49,-0.35l0.03,-0.63l-1.21,-1.29l0.62,-1.73l5.66,-4.31l0.79,0.06l0.36,2.17l0.34,0.46l1.09,-0.27l0.6,-1.2l-0.47,-2.39l2.11,-2.4l0.83,-2.09l0.73,-0.54ZM863.67,615.59l0.19,1.33l-0.78,-0.09l-0.12,-0.76l0.72,-0.48Z", "name": "Madagascar"}, "MA": {"path": "M111.55,174.08l0.87,-0.82l2.29,-1.53l4.61,-5.0l1.83,-0.96l1.58,-2.13l0.64,-2.12l0.15,-4.31l0.54,-2.21l3.21,-6.6l0.6,-2.92l0.57,-0.97l1.17,-0.55l1.63,-1.44l2.55,-0.94l4.55,-3.25l0.97,-1.81l1.0,-3.42l1.79,-3.61l0.93,-2.75l1.51,-1.38l1.09,-1.81l1.65,-0.74l3.81,-0.4l5.66,-1.52l5.19,-2.35l1.53,-0.99l4.03,-4.16l6.97,-4.48l3.42,-4.1l5.39,-7.44l0.96,-2.1l0.51,-3.13l-0.35,-1.39l-1.47,-2.13l-0.93,-0.57l-0.18,-0.67l0.49,-1.68l0.27,-7.37l1.52,-3.6l3.87,-4.95l0.73,-2.09l0.48,-4.21l4.69,-4.44l3.76,-4.32l2.43,-1.56l8.66,-3.5l4.9,-2.5l2.99,-1.94l1.74,-2.22l4.72,-8.51l4.99,-13.29l3.36,-0.55l2.57,-1.29l0.51,0.13l-0.27,0.42l0.05,1.69l1.04,1.81l1.78,2.01l3.24,2.54l2.53,1.02l3.5,0.6l4.2,-1.08l2.23,-0.02l1.08,-0.42l1.19,0.64l2.3,0.22l2.32,-0.37l2.46,-1.79l1.42,3.08l2.75,0.4l4.57,0.08l1.03,1.67l3.86,2.86l-0.6,1.9l1.29,1.6l-0.64,1.51l0.97,2.48l-0.08,5.17l0.95,2.82l-0.52,3.35l1.5,3.22l0.46,2.49l0.75,1.34l4.0,3.09l0.35,0.73l-1.93,1.71l-0.25,1.1l0.41,1.75l-13.96,-0.43l-4.91,0.72l-1.1,0.68l-0.9,2.5l-4.79,1.63l-3.95,0.23l-0.87,0.56l-0.27,0.68l0.67,3.3l-0.5,2.12l0.31,0.69l2.13,1.25l-0.34,0.84l-3.71,0.64l-3.92,2.74l-5.29,1.87l-2.27,1.14l-2.62,3.95l-3.02,2.58l-6.39,1.58l-5.73,0.19l-0.43,0.39l-0.23,1.86l-0.99,0.91l-6.07,-0.61l-4.01,2.89l-2.44,0.61l-6.8,4.71l-4.58,3.31l-0.43,0.7l-0.06,12.74l-1.18,-0.0l-0.4,0.43l0.5,2.41l-0.32,1.33l0.57,2.17l-0.25,0.45l-2.28,0.36l-4.87,0.03l-3.88,2.88l-0.82,0.12l-0.84,0.0l-1.68,-0.76l-2.46,0.63l-3.43,-1.6l-2.64,-0.4l-2.01,0.14l-5.47,1.59l-0.29,0.51l0.87,1.77l-0.18,1.02l-2.02,2.05l-2.06,3.28l-0.38,1.28l-3.45,0.81l-0.57,0.65l-2.99,11.13l-1.34,3.36l-2.26,1.8l-4.28,2.67l-0.88,0.94l-2.85,5.11l-5.33,2.33l-1.55,1.39l-1.55,3.53l-0.95,3.88l-0.83,4.25l-0.57,5.45l-4.71,5.41l0.11,1.58l-0.65,1.71l-0.85,1.11l-0.91,0.53l-1.42,0.11l-5.7,-0.12l-6.83,-0.61l-8.12,0.37l-2.68,0.51l0.76,-5.27l1.56,-3.09l1.18,-1.3l2.11,-0.87l1.83,-3.22l0.66,-2.98l1.13,-1.29l0.45,-1.2l-0.38,-0.93l4.64,-7.95l0.06,-1.38l-0.73,-0.14Z", "name": "Morocco"}, "KE": {"path": "M696.13,456.91l1.2,-1.94l0.9,-2.52l1.23,-0.89l1.69,-2.18l0.87,-2.1l1.3,-1.23l2.39,-1.11l-0.06,-1.76l2.06,-2.98l0.2,-1.72l-0.17,-3.41l-0.94,-4.11l0.23,-0.9l-0.46,-1.29l-0.65,-0.47l-0.86,-2.33l-1.78,-1.27l-0.73,-2.16l-0.9,-0.64l-0.52,-2.66l0.44,-2.85l-0.65,-0.74l-1.55,-0.55l-0.89,-0.7l0.13,-0.45l-0.73,-0.65l-1.64,-3.48l14.24,-14.05l0.92,0.87l1.84,-0.59l3.03,0.82l0.38,0.54l0.09,1.28l-0.5,2.4l0.08,1.75l3.18,4.28l0.95,0.31l9.51,0.42l13.93,8.98l6.14,0.58l7.22,1.42l3.36,0.26l0.68,-0.24l1.44,-1.33l2.14,-3.16l10.47,-4.79l4.37,3.57l2.19,0.25l5.87,-0.41l-5.9,8.46l-4.23,4.19l-0.29,0.61l0.17,43.23l6.42,8.43l0.09,1.09l-1.59,1.87l-1.29,0.85l-1.74,0.4l-1.14,-0.34l-0.49,0.17l-0.43,0.9l-0.24,-0.17l-0.63,0.38l0.36,1.94l-0.21,0.67l-0.83,0.7l-0.2,0.76l-1.77,1.54l-2.85,0.23l-2.23,1.63l-0.61,1.84l0.17,2.25l-0.89,2.57l-1.42,1.19l-1.49,2.6l-0.57,2.6l-1.01,2.38l-2.81,5.67l-1.16,1.5l-1.16,-0.05l-0.72,0.71l-16.23,-11.7l-0.96,-1.51l-1.12,-0.47l0.93,-2.7l-0.34,-2.17l-0.38,-0.57l-41.77,-23.33l0.6,-0.4l0.53,-1.22l-1.1,-2.04l-0.08,-0.78l1.21,-1.79l0.85,-0.2l2.27,0.58l0.47,-0.54l-0.1,-1.15l3.66,-0.65l0.42,-0.81l-1.12,-2.16l-0.47,-0.2l-3.55,1.24l-0.7,0.63l-0.5,1.16l-1.84,-2.03l-0.07,-1.02l-0.85,-0.13l-0.41,-0.45l-0.29,-2.46ZM779.14,483.65l0.05,-0.04l0.01,0.0l-0.07,0.03Z", "name": "Kenya"}, "SS": {"path": "M581.04,357.13l1.37,-1.12l2.93,-1.06l0.24,-1.49l1.15,-2.04l0.29,-2.42l1.3,-1.74l0.04,-2.89l2.49,-3.21l0.28,-2.18l0.39,-0.53l8.3,-1.41l0.43,0.1l0.2,0.45l0.08,1.69l0.41,0.58l2.98,2.46l4.44,5.17l1.42,0.61l1.53,-0.19l3.52,-1.32l9.24,0.18l1.18,2.38l0.97,0.82l9.33,0.03l0.39,-0.49l-0.07,-1.29l1.52,-1.48l2.94,-1.39l2.87,-0.69l1.6,-1.89l0.08,-1.72l4.26,-2.24l5.29,3.38l3.41,3.0l4.95,-0.48l0.96,-0.42l5.07,-5.03l2.36,-3.09l0.89,-2.12l5.78,-5.15l0.05,-0.67l-0.97,-2.24l-0.02,-4.76l-2.62,-3.02l6.91,-0.03l0.4,-0.37l-0.19,-2.16l4.79,0.06l-0.71,2.77l-0.16,2.99l-0.58,1.11l1.15,8.97l-0.49,1.2l0.39,0.52l2.63,0.98l0.99,1.18l5.16,4.28l0.53,1.37l0.07,2.18l-0.79,1.64l-0.28,2.62l0.47,0.85l1.95,0.04l0.29,8.87l-0.26,1.32l-1.23,1.06l-8.0,0.16l-0.65,0.61l-2.58,5.22l-0.17,1.0l1.09,1.04l1.77,0.78l5.15,1.06l2.69,1.85l1.26,1.5l0.61,1.81l2.52,2.63l2.42,1.26l0.95,1.41l1.64,1.33l2.86,7.13l0.33,2.27l1.2,2.25l1.92,1.85l-20.42,20.03l-3.67,-0.22l-2.17,-1.21l-1.83,0.94l-5.96,1.12l-1.69,1.2l-0.49,0.91l-1.94,-0.92l-1.73,-2.29l-0.45,-0.03l-2.79,1.41l-3.63,-1.25l-0.95,-0.02l-2.86,1.86l-0.8,1.15l-0.84,-1.09l-0.88,-0.25l-1.11,0.2l-0.72,-2.26l-3.78,-1.85l-3.73,-3.98l-1.03,-1.76l-1.27,-1.32l-1.6,-0.67l-1.23,0.27l-1.16,1.42l-1.73,1.15l-0.63,0.03l-2.46,-1.13l-2.59,-0.23l-2.61,1.61l-1.59,0.57l-1.98,-0.36l-2.41,-2.09l-1.61,-0.77l-1.98,-2.82l-2.06,-1.47l-2.65,-3.66l-0.32,-3.16l-1.07,-2.03l-4.97,-3.31l-1.65,-0.29l-0.78,-0.51l-1.11,-2.4l-1.04,-1.31l-0.15,-0.54l0.59,-2.01l-0.13,-0.42l-2.24,-1.72l-1.59,-2.06l-1.73,-1.29l-5.96,-3.17l-1.15,-1.07l-1.0,-1.17l0.59,-0.94l0.16,-1.06l-0.6,-1.22l-2.34,-1.95l-1.78,-2.01l-1.6,-0.77l-5.07,-1.13l-0.84,-0.79l-0.27,-0.87l0.45,-1.63l-0.67,-1.05Z", "name": "S. Sudan"}, "ML": {"path": "M158.55,301.7l-0.54,-1.32l-1.75,-2.1l0.09,-0.89l0.69,-0.68l0.3,-1.15l-0.68,-1.35l-0.07,-2.89l-2.36,-2.87l0.46,-2.09l-0.6,-1.27l1.44,0.3l1.94,-1.71l0.9,-1.49l0.52,-3.0l0.75,-2.02l2.76,-2.33l6.42,5.8l0.97,-0.19l2.15,-3.09l3.15,-0.17l5.53,0.77l2.29,-0.34l3.6,-0.68l0.33,-0.35l0.0,-1.39l0.39,-0.65l0.32,1.53l2.03,0.41l43.0,-0.0l0.39,-0.33l1.79,-9.46l-3.16,-3.69l-11.26,-102.64l20.21,-0.01l69.78,48.0l0.27,3.49l1.54,1.35l3.72,1.92l0.77,2.02l0.93,0.73l2.19,0.78l3.38,0.31l2.16,2.22l5.44,1.34l2.99,1.24l0.68,0.58l-0.02,2.61l0.63,2.09l-0.65,0.69l-1.08,2.33l0.35,0.81l1.56,1.07l1.96,0.38l9.28,-1.79l0.08,25.36l-0.37,0.53l-0.24,4.56l-0.69,2.6l-1.27,2.05l-1.6,5.2l-0.56,0.78l-1.29,0.44l-2.22,1.9l-0.27,1.36l-4.9,-0.79l-0.82,0.33l-0.19,0.72l-19.62,0.81l-4.18,3.48l-2.63,0.33l-5.06,-0.3l-0.79,0.21l-0.32,0.48l-4.9,-1.63l-2.05,0.51l-0.55,-0.52l-0.96,-0.22l-1.71,0.1l-1.25,0.34l-3.34,2.7l-5.19,2.31l-2.34,1.4l-3.22,0.61l-1.21,3.23l-0.36,0.17l-3.89,-1.22l-1.82,0.58l-2.32,1.88l-1.18,1.54l-0.67,2.08l-0.11,1.41l-2.82,-0.31l-0.86,0.46l-0.57,4.31l-2.32,1.06l-3.6,-2.2l-1.4,-0.4l-1.39,0.31l-3.31,3.19l0.13,1.16l0.98,2.02l-0.01,0.7l-2.75,1.34l-0.18,0.54l0.65,1.04l-0.07,2.61l-1.78,2.08l-1.19,0.84l-4.76,1.29l-1.52,0.95l-0.84,0.99l-0.03,1.86l0.71,1.88l-0.23,1.63l-1.03,2.7l-1.62,1.02l-0.16,0.4l0.38,3.12l-0.64,3.57l-1.85,0.07l-1.86,0.57l-2.16,2.23l-1.82,-0.57l0.52,-1.59l-0.54,-1.75l-0.14,-1.95l-0.64,-0.39l-2.03,0.66l-0.25,0.5l0.18,0.76l-1.15,-0.27l-0.99,-0.78l-0.54,0.04l-0.49,1.17l0.1,2.31l-3.13,0.29l-0.54,1.2l0.3,0.79l-0.28,0.19l-0.85,-0.69l-2.82,-0.62l-0.19,-0.71l-1.74,-1.48l-2.16,0.26l-1.82,2.27l-1.24,0.67l-0.36,-1.58l-3.03,-1.94l-0.64,-2.98l0.13,-2.4l-0.34,-0.64l-1.85,-0.87l-1.94,0.69l1.58,-2.24l1.16,-0.87l0.35,-1.13l-0.32,-0.44l-2.85,-1.43l-0.59,-1.25l-1.17,-0.59l-0.0,-2.92l-2.1,-5.0l-0.68,-0.86l-2.2,-1.02l-1.09,-0.08l-1.23,0.34l-0.2,0.66l0.64,1.04l-0.06,0.77l-1.45,0.34l-2.04,1.03l-0.95,1.28l-6.22,-2.14l-2.42,1.0l-1.78,2.32l-0.64,0.39l-1.8,-2.9l-0.67,-0.63l-1.1,-0.14l-0.94,0.49l-1.69,1.73l-0.72,0.09l-2.06,-1.77l1.29,-2.46l0.08,-0.89l-0.8,-0.97l0.61,-4.85l-1.78,-2.61l-0.38,-1.41l-0.67,-1.04l-1.72,-0.47l-0.82,0.85Z", "name": "Mali"}, "KM": {"path": "M817.5,603.11l0.61,-0.24l0.5,-0.86l0.49,1.37l-0.0,1.05l-1.59,-1.3ZM809.46,604.09l0.26,0.03l0.6,0.37l-0.69,-0.09l-0.17,-0.31ZM806.8,599.18l-1.42,-0.7l-0.71,-0.87l0.32,-3.55l0.29,-0.43l0.51,0.21l-0.15,2.23l1.15,3.1Z", "name": "Comoros"}, "ST": {"path": "M383.99,440.62l-0.33,-0.08l0.53,-0.7l0.05,0.23l-0.25,0.55ZM375.07,457.57l-1.05,0.63l-0.5,-1.61l0.52,-1.0l1.46,-0.64l0.52,0.65l0.0,0.69l-0.94,1.28Z", "name": "S\u00e3o Tom\u00e9 and Principe"}, "MW": {"path": "M681.13,619.76l1.74,-1.46l1.44,-2.96l0.38,-3.9l-0.61,-1.2l0.73,-1.72l4.31,-1.64l1.54,-1.88l-0.35,-0.69l-1.7,-0.22l-0.93,-2.11l0.55,-2.61l0.03,-2.37l-0.19,-1.02l-0.71,-0.92l0.05,-1.02l0.39,-0.27l1.32,-2.96l-1.29,-3.24l0.68,-0.62l1.52,-0.44l2.28,-2.28l0.14,-0.7l-1.31,-2.14l-0.33,-1.91l-2.41,-2.19l0.32,-2.22l-1.17,-1.21l-0.79,-1.69l-1.23,-0.32l-0.55,0.4l-0.41,-0.09l-0.68,-1.96l1.71,1.11l2.38,0.31l1.15,1.07l3.32,-0.1l2.2,0.84l-0.11,1.28l1.3,3.56l2.72,3.57l-0.7,2.02l0.63,6.18l-0.24,0.8l1.15,5.72l-3.03,4.51l-0.36,2.15l0.6,1.96l1.16,0.77l0.18,2.55l0.83,1.15l0.72,2.39l0.16,2.45l-0.26,2.73l1.16,2.0l1.6,0.84l0.58,0.7l0.15,0.79l-0.96,2.74l0.39,1.72l1.87,2.05l0.5,0.06l1.31,-0.89l0.42,-2.09l0.51,1.42l1.09,0.39l2.18,2.65l0.8,0.07l0.45,-0.87l-2.17,-6.4l8.0,10.32l0.46,2.59l-0.56,1.56l-0.41,2.77l0.29,1.92l-0.12,3.09l-0.7,4.33l-1.57,0.66l-3.01,0.52l-0.86,1.14l-1.49,3.84l0.75,1.26l0.57,1.91l0.08,3.32l-1.41,0.08l-0.46,-0.39l-0.14,-0.42l0.52,-0.56l0.21,-0.91l-0.41,-1.04l-1.81,-1.01l-4.7,-5.26l-1.29,-0.85l-0.14,-1.96l-1.78,-2.3l0.32,-0.97l0.94,-0.93l0.91,-2.74l1.26,-2.27l0.2,-3.44l-0.69,-5.22l-1.53,-2.08l-0.87,-0.35l-2.75,0.5l-0.65,0.42l-4.09,0.54l-0.52,0.37l-2.66,-3.09l-1.7,-2.92l-1.14,-1.26l-0.48,-0.13l-1.48,0.93l-1.35,-2.28l-0.96,-0.53l0.3,-0.65l-0.16,-0.35l-1.1,-0.81ZM707.94,620.9l-1.35,-0.14l-0.08,-1.18l1.13,0.99l0.3,0.33ZM704.22,601.65l0.03,-0.32l0.11,-0.2l0.13,0.19l-0.28,0.32ZM703.11,600.89l-0.08,0.18l-0.2,-0.25l0.11,-0.06l0.17,0.12Z", "name": "Malawi"}, "SO": {"path": "M784.81,478.05l-6.52,-8.7l-0.07,-43.18l4.26,-4.23l6.72,-9.72l1.17,-1.15l2.26,-0.71l6.71,-1.1l1.31,-0.88l1.43,-2.38l1.21,-0.9l5.27,-2.43l4.69,-1.11l10.76,0.6l0.66,-0.27l17.38,-18.64l18.24,-17.68l11.31,-17.26l0.07,-21.27l4.96,-0.97l3.0,-1.29l5.57,-0.97l4.18,-2.36l2.01,-2.56l1.6,-0.41l4.95,1.72l-0.32,1.61l-1.57,3.84l0.43,3.23l0.12,5.56l-0.39,1.09l-0.71,0.59l0.19,0.58l-1.22,0.58l-0.57,1.2l-0.8,6.56l-0.09,3.22l-1.57,2.11l-0.59,1.6l-2.45,3.14l-1.7,3.98l-2.09,3.57l-3.01,2.94l-1.06,3.55l-1.04,2.2l-3.75,5.6l-1.38,2.6l-1.67,4.35l-0.52,2.76l-4.65,7.91l-4.85,6.35l-3.04,5.37l-12.82,14.18l-9.68,9.49l-2.59,1.91l-10.64,5.88l-6.89,4.92l-10.19,9.06l-10.64,11.06l-4.03,4.91l-2.84,2.8l-2.92,5.38l-1.57,2.2ZM897.88,336.12l0.13,-0.45l1.54,0.9l-0.87,-0.13l-0.8,-0.32Z", "name": "Somalia"}, "SN": {"path": "M92.84,285.0l-0.36,0.43l-0.22,-0.26l0.58,-0.18ZM93.02,284.95l3.4,-1.72l3.59,-4.5l3.2,-5.29l0.83,-2.25l0.67,-3.33l0.45,-0.33l1.82,-3.52l0.62,-0.14l2.37,0.65l2.36,0.09l4.53,-1.16l3.09,-0.27l0.35,-0.55l0.8,0.03l0.52,-0.36l0.48,0.3l1.66,0.09l2.93,-0.12l2.61,0.87l3.62,3.07l0.54,1.33l0.83,0.74l0.88,0.21l0.96,-0.38l0.52,0.52l0.72,0.1l1.12,-0.25l1.15,0.85l0.67,0.94l1.01,3.19l0.65,1.11l0.91,0.33l0.76,1.11l1.05,0.13l0.55,0.46l0.73,1.24l0.27,1.4l2.27,1.89l1.38,0.54l0.87,0.69l0.68,1.09l1.46,0.95l0.95,1.66l-0.4,2.43l2.4,2.94l-0.02,2.6l0.68,1.29l-0.2,0.74l-0.77,0.84l-0.04,1.49l1.78,2.16l0.23,0.95l0.62,0.7l0.78,-0.04l0.6,-0.73l0.96,0.19l0.53,0.8l0.41,1.47l1.75,2.61l-0.67,4.5l0.76,1.32l-1.77,-0.18l-2.77,0.46l-2.77,-0.12l-2.95,0.83l-5.72,-1.44l-1.63,-0.97l-1.35,0.55l0.12,-1.1l-0.62,-0.67l-7.61,-0.48l-17.22,-0.07l-4.58,2.28l-3.0,0.6l-3.6,-0.23l-4.38,1.29l-2.05,-0.11l-0.58,-0.98l0.14,-0.31l2.13,-0.82l1.2,0.26l0.48,-0.65l-0.22,-0.52l-1.7,-1.1l-0.53,-0.05l-0.94,1.15l-0.44,0.05l0.09,-4.89l1.05,-0.83l9.43,-0.03l0.4,-0.35l0.2,-1.73l5.87,-0.78l0.8,-0.6l0.79,-1.29l8.18,3.38l2.32,0.41l4.84,-1.19l0.53,-1.39l-0.5,-1.06l-1.46,-0.77l-2.19,0.04l-2.08,0.56l-0.8,-0.15l-1.96,-1.35l-2.24,-0.62l-1.93,-1.35l-1.24,-0.32l-2.96,0.2l-1.94,0.77l-1.05,1.65l-11.81,-0.02l-0.29,-1.04l-1.99,-2.29l1.65,-1.45l-0.38,-0.61l-1.62,0.42l-0.12,-0.88l-2.03,-3.65l-1.29,-1.05l-1.0,-1.81l-1.31,-0.91l-1.89,-0.3Z", "name": "Senegal"}, "MR": {"path": "M98.1,207.95l0.48,-2.23l45.99,-0.06l0.4,-0.43l-0.92,-14.29l-0.73,-2.46l0.03,-1.39l1.33,-2.06l4.72,-3.28l2.88,-0.57l3.44,-1.47l0.9,-0.72l0.08,-31.14l38.71,-0.0l0.4,-0.4l-0.01,-15.52l43.54,27.63l-19.44,0.01l-0.4,0.44l11.32,103.21l3.12,3.52l-1.69,8.94l-42.64,0.0l-1.49,-0.2l-0.16,-1.61l-0.51,-0.35l-1.15,0.88l-0.23,1.79l-5.46,0.96l-5.49,-0.77l-3.39,0.19l-0.7,0.5l-2.02,2.76l-5.86,-5.58l-0.75,-0.24l-1.45,0.84l-1.96,1.81l-0.9,2.33l-0.51,2.96l-0.74,1.2l-1.69,1.48l-2.04,-0.76l-1.13,-0.78l-0.65,-1.06l-3.18,-1.85l-1.35,-1.32l-0.05,-0.99l-0.93,-1.58l-0.74,-0.62l-0.99,-0.08l-0.3,-0.72l-1.2,-0.59l-1.54,-4.08l-0.86,-1.2l-1.31,-0.99l-1.93,0.12l-1.04,-0.58l-1.17,0.32l-0.96,-1.08l-0.18,-0.79l-1.34,-1.33l-2.52,-1.94l-2.86,-0.98l-3.09,0.1l-2.42,-0.37l-0.53,0.38l-0.81,-0.1l-0.5,0.66l-2.77,0.2l-4.5,1.16l-2.18,-0.08l-2.44,-0.66l-0.97,0.2l-0.97,1.11l-2.02,4.02l-0.0,-1.73l0.84,-3.76l4.5,-11.36l0.59,-4.22l-0.64,-7.78l-1.51,-5.89l-1.14,-1.95l-2.02,-1.65l-0.27,-0.56l1.52,-0.5l0.77,-1.25l-0.02,-0.45l-0.43,-0.14l-0.76,0.22l1.52,-3.1l0.84,-5.34l-2.7,-5.63l-1.28,-0.76l-0.55,0.34l-0.15,0.78l-0.25,-0.13l-2.9,-5.41l-0.77,-0.52l-0.79,0.35ZM104.46,225.57l-0.06,-0.38l0.55,-0.92l-0.13,0.74l-0.35,0.56Z", "name": "Mauritania"}, "UG": {"path": "M644.58,475.13l-0.21,-4.33l0.98,-5.43l2.6,-2.48l0.22,-1.53l-0.22,-0.42l-1.22,-0.6l-0.84,-0.05l0.28,-2.03l0.69,-0.8l1.8,-3.83l0.06,-3.66l1.17,-0.51l1.59,-1.29l0.76,-1.6l0.83,-0.85l1.38,-0.47l0.26,2.06l0.79,0.38l0.73,-0.26l3.63,-4.87l0.83,-0.85l2.25,-0.89l1.27,-1.01l1.68,-2.63l-0.16,-4.31l1.05,-1.66l-0.5,-0.47l-0.7,0.27l-1.73,2.27l-0.78,-0.98l-1.15,-0.25l-1.29,-1.26l-1.7,-0.06l-0.88,-0.48l1.43,-4.87l-0.39,-1.09l-0.71,-0.78l0.79,-2.54l0.91,-1.47l-0.08,-0.92l-0.5,-0.42l0.8,-1.23l2.43,-1.66l4.5,1.27l2.93,-1.38l1.56,2.17l2.34,1.05l0.49,-0.11l0.65,-1.06l1.46,-1.03l5.84,-1.07l1.74,-0.88l1.82,1.17l3.98,0.23l1.21,-0.78l4.38,-4.39l1.59,3.37l0.5,0.31l-0.0,0.73l1.2,0.94l1.86,0.85l-0.46,2.66l0.57,2.95l0.94,0.7l0.9,2.36l1.65,1.11l0.83,2.28l0.67,0.53l0.35,0.97l-0.24,0.79l0.95,4.18l0.14,3.91l-0.34,1.21l-1.85,2.57l0.13,1.65l-2.14,0.88l-1.5,1.41l-0.88,2.11l-1.6,2.07l-1.35,1.04l-0.96,2.65l-1.04,1.69l-1.19,0.34l-1.1,-0.21l-0.21,-0.9l-0.68,-0.4l-0.89,0.33l-0.62,0.82l-0.73,0.02l0.25,-0.52l-0.15,-0.55l-1.55,-0.47l0.27,-1.15l-0.54,-0.3l-1.08,0.11l-1.0,0.4l-0.72,2.09l-0.52,0.11l-0.37,0.73l-1.1,0.83l-1.07,-0.75l-1.5,0.72l-0.04,-0.81l-0.53,-0.67l-0.55,-0.16l-0.84,0.83l-0.52,1.32l-0.47,0.13l-0.78,-0.41l-0.88,0.85l-1.74,0.2l-2.94,1.58l-0.4,0.78l0.76,1.1l-0.05,0.53l-1.46,1.84l-1.71,3.66l0.56,2.24l-10.98,-0.08l-2.43,0.87l-2.24,-0.06l-0.8,0.24l-2.48,2.91l-1.77,1.39l-0.71,0.2l-0.54,-1.28l-0.59,-0.26l-2.39,0.57ZM687.18,457.18l0.12,-0.82l1.06,-0.02l-0.55,0.44l-0.16,0.59l-0.47,-0.19ZM673.83,462.4l0.46,0.01l-0.02,0.46l-0.21,-0.11l-0.24,-0.35ZM675.29,463.38l0.55,-0.04l-0.4,1.17l-0.61,0.23l0.55,-0.77l-0.09,-0.59Z", "name": "Uganda"}, "SD": {"path": "M636.92,346.14l-1.71,1.58l-0.17,1.46l-8.66,-0.03l-1.72,-2.99l-0.48,-0.24l-9.48,-0.14l-4.74,1.51l-1.07,-0.42l-4.41,-5.13l-2.98,-2.46l-0.61,-2.66l-1.15,-0.4l-5.95,1.19l-2.18,0.09l-0.69,0.37l-0.58,0.87l-0.22,2.05l-2.53,3.29l-0.06,2.98l-1.28,1.68l-0.28,2.41l-1.15,2.04l-0.13,1.24l-3.63,1.38l-0.82,1.09l-6.16,-1.05l-0.35,-0.38l0.06,-1.63l-0.94,-1.06l0.04,-0.55l1.41,-1.64l0.39,-1.07l0.41,-4.45l-0.15,-1.56l-1.21,-2.49l-2.74,-4.26l-4.11,-4.35l-1.09,-1.77l0.88,-3.16l-0.19,-1.94l-1.0,-0.91l-0.83,-0.15l-2.09,-1.83l-0.35,-0.93l0.26,-3.9l-0.51,-0.76l-0.73,-0.14l-0.95,-4.58l0.22,-1.18l-0.73,-1.36l-1.8,-0.79l-3.43,0.38l-0.89,-0.97l0.9,-2.28l0.9,-1.24l2.0,-1.26l0.88,-1.46l-0.06,-1.96l-1.32,-3.07l-0.01,-0.67l0.67,-1.12l4.31,-3.03l-0.04,-0.84l-0.94,-1.07l-0.7,-2.9l0.77,-0.75l2.42,-1.1l0.24,-1.72l0.92,-1.67l2.02,-2.04l0.46,-1.89l-0.39,-2.6l1.72,-1.74l4.03,-0.14l1.72,-0.38l3.9,0.5l0.75,-0.53l0.12,-51.43l11.17,0.01l0.55,-0.49l0.01,-24.02l72.66,0.01l0.96,-0.31l1.31,-2.23l0.55,0.29l-0.56,1.71l0.38,0.53l63.39,-0.01l0.12,2.49l0.56,2.35l1.81,3.2l1.93,2.41l-0.62,-0.25l-0.55,0.34l-0.11,1.49l0.37,3.13l0.63,2.12l-0.45,1.97l0.06,3.35l0.81,4.03l-0.15,2.62l1.33,5.96l1.31,3.36l0.89,1.02l2.35,0.74l2.16,1.61l3.24,3.67l1.17,-0.15l0.46,0.59l2.73,1.71l0.22,0.43l-1.99,2.04l-0.62,1.36l-1.37,1.52l-5.34,1.43l-2.9,1.71l-0.54,0.6l-0.97,2.46l-2.64,0.23l-1.9,-0.2l-0.36,0.27l-0.38,3.16l-1.06,2.25l0.3,3.86l-1.16,3.57l-1.58,3.23l-1.82,5.63l-1.16,1.66l1.14,10.41l-0.92,3.13l0.02,1.82l-0.64,2.5l-2.08,4.21l-0.63,2.17l-0.4,3.98l-4.35,0.9l-0.91,0.57l-0.91,1.08l-4.01,6.87l-1.69,1.76l-1.79,6.45l-0.37,4.87l-1.41,1.11l-1.86,-1.32l-0.74,-0.18l-1.68,1.12l-1.12,1.63l-0.86,1.83l0.42,3.87l-1.77,3.95l-0.96,4.36l-1.64,-0.19l0.26,-2.3l0.82,-1.84l-0.09,-2.39l-0.66,-1.65l-5.28,-4.41l-1.07,-1.24l-2.59,-0.99l0.4,-1.09l-1.16,-8.77l0.56,-1.07l0.17,-3.01l0.68,-2.33l0.07,-0.98l-0.39,-0.43l-5.6,-0.07l-0.44,0.42l0.22,2.12l-7.41,0.03l-0.3,0.67l3.05,3.42l-0.01,4.63l0.97,2.46l-5.6,4.89l-1.71,3.36l-6.56,6.83l-5.16,0.74l-3.2,-2.87l-5.53,-3.54l-0.42,-0.0l-4.7,2.54l-0.17,1.9l-1.33,1.56l-4.06,1.1l-1.75,1.06Z", "name": "Sudan"}, "MZ": {"path": "M682.61,781.45l-5.86,0.15l-2.46,-0.31l-0.07,-3.6l-0.75,-2.96l0.22,-3.37l-1.36,-0.96l-0.28,-2.0l0.75,-1.85l0.01,-14.7l-2.2,-7.12l-2.99,-5.12l-0.14,-2.42l-2.83,-10.56l1.53,-1.18l11.71,-12.29l0.1,-0.46l-0.8,-1.77l1.38,-2.29l0.16,-3.4l2.08,-1.71l3.82,-6.63l0.14,-1.59l-2.06,-3.84l-0.57,-1.9l0.6,-1.72l0.19,-1.93l-0.43,-0.72l-1.15,-0.63l-0.14,-0.51l0.15,-1.01l1.44,-0.73l0.55,-0.64l1.3,-4.59l-0.44,-3.4l0.16,-10.06l-1.0,-2.64l-0.09,-1.68l0.83,-2.1l-0.32,-0.45l-2.3,-0.38l-1.29,-1.07l-4.63,-1.71l-3.52,-0.25l-2.86,-2.5l-2.47,-0.5l-3.08,-1.89l-9.33,-0.38l-0.14,-3.84l-0.54,-3.55l-1.17,-2.06l-0.33,-1.85l5.01,-1.99l10.13,-2.9l19.34,-6.68l1.96,3.1l2.92,3.37l5.14,-0.87l1.93,-0.74l1.62,-0.05l1.4,1.9l0.6,4.86l-0.19,3.24l-1.2,2.08l-0.89,2.71l-1.31,1.51l-0.04,0.93l1.8,2.36l-0.07,1.37l0.34,0.83l1.34,0.92l4.78,5.33l1.68,0.91l0.08,1.13l-0.61,0.86l0.32,0.88l0.99,0.73l1.83,-0.11l0.54,-0.67l-0.11,-3.49l-0.62,-2.13l-0.67,-0.93l1.38,-3.52l0.6,-0.83l4.04,-0.77l0.81,-0.7l0.44,-1.29l0.34,-3.37l0.12,-3.14l-0.29,-1.86l0.39,-2.67l0.61,-1.67l-0.59,-3.02l-7.04,-9.27l-2.76,-3.05l-1.69,-1.39l-0.18,-1.71l-0.42,-0.53l-0.11,-3.29l-0.35,-1.0l0.44,-2.32l-0.22,-1.58l-1.07,-2.47l0.09,-2.62l1.74,-1.65l0.42,-0.79l0.53,-1.44l0.29,-3.15l6.72,0.29l0.99,-0.31l1.75,-1.46l1.22,0.02l2.84,1.67l0.42,0.88l1.44,0.44l2.5,0.12l1.92,-0.39l1.26,-0.92l2.18,-0.46l2.72,1.39l2.04,0.3l2.08,-0.46l2.24,-1.19l1.23,-1.17l0.93,-2.13l2.82,-0.17l1.52,0.36l2.43,1.18l3.51,-2.16l2.16,-0.7l2.09,-0.0l1.88,-0.54l2.84,-1.71l3.04,-0.82l2.06,-1.12l5.19,-3.94l1.31,1.73l-1.13,0.91l0.03,0.67l0.9,0.54l-0.75,1.01l-0.12,0.82l0.41,0.85l-1.61,3.06l0.7,1.57l-0.34,2.52l1.12,4.02l-0.34,1.37l0.24,3.2l-0.39,1.08l0.76,0.81l0.32,1.07l-0.27,1.97l-1.26,1.04l-0.15,1.09l0.39,0.39l1.18,0.01l-0.21,3.2l0.32,1.05l-0.41,1.14l0.59,7.87l0.25,0.8l1.14,0.55l-0.88,1.76l0.07,1.85l0.3,0.34l0.43,-0.17l1.0,-1.23l0.27,0.3l0.32,2.9l-0.08,0.64l-1.51,1.6l-0.21,1.61l-0.78,0.64l0.32,1.89l-1.03,2.43l-5.24,6.03l-0.18,1.13l-1.22,1.74l-2.24,0.85l-0.16,0.48l0.5,1.34l-6.81,4.22l-1.83,2.13l-2.22,0.79l-2.44,0.1l-6.24,2.34l-1.25,0.99l-2.41,0.86l-3.86,2.16l-3.14,2.05l-3.64,3.12l-0.53,1.72l-4.19,4.69l-1.5,2.12l-0.14,0.86l-0.39,0.12l-0.58,-0.69l-0.7,0.19l-0.27,1.45l-1.13,-0.25l-3.22,1.86l-2.46,2.15l-3.33,3.99l-4.78,3.79l-0.8,0.08l-1.65,-1.35l-1.24,0.12l0.06,0.45l1.13,1.31l-0.58,7.87l3.29,4.23l1.55,4.65l0.16,2.57l1.6,3.06l0.72,4.68l-0.16,4.36l0.92,1.04l0.63,-0.13l0.29,-0.64l0.32,-3.09l0.36,1.14l0.13,1.44l-0.6,3.55l0.97,3.72l-0.92,2.66l-1.46,7.65l0.4,0.74l0.99,0.33l0.61,-0.67l-0.58,2.82l-2.69,4.42l-1.11,1.33l-1.85,1.31l-4.46,2.1l-9.03,3.07l-5.76,2.42l-4.59,2.9l-2.05,1.98l-0.89,2.3l-1.54,2.29l0.0,0.41l1.35,1.98l1.8,1.47l0.6,-0.22l0.28,-0.92l-0.58,7.72Z", "name": "Mozambique"}}, "height": 1054.4456598737515, "projection": {"type": "mill", "centralMeridian": 0.0}, "width": 900.0});
jQuery.fn.vectorMap('addMap', 'asia_mill',{"insets": [{"width": 900, "top": 0, "height": 555.5409752358405, "bbox": [{"y": -6895749.143810256, "x": 2858903.2260101754}, {"y": 1365383.966806244, "x": 16242290.106516164}], "left": 0}], "paths": {"BD": {"path": "M468.23,273.61l0.71,0.28l0.58,-0.17l1.03,-2.27l3.07,-0.06l0.75,-0.99l-1.01,-0.97l-0.42,-1.03l-2.11,-0.48l-1.82,-1.98l-1.04,-0.37l0.36,-1.52l2.2,-2.38l-0.03,-0.74l-0.59,-0.55l1.28,0.98l0.67,1.23l1.03,0.3l1.31,0.04l0.39,-0.56l-0.29,-0.74l1.12,2.32l1.6,0.95l1.55,0.0l0.55,-0.72l0.06,-0.94l0.91,1.84l-0.18,4.52l0.45,0.95l4.71,1.15l12.05,-0.09l2.87,1.64l-1.68,-0.08l-1.11,3.94l-1.09,0.36l-0.53,1.16l-0.92,-0.13l-1.3,0.83l-1.65,0.27l-1.04,1.45l-0.55,2.17l1.25,4.63l0.87,0.36l0.23,-0.76l0.39,0.99l1.03,0.54l1.43,-0.82l0.06,-1.92l1.33,-1.61l-0.02,-1.25l1.1,-0.2l0.56,0.3l0.57,2.45l0.21,3.12l0.98,1.98l0.95,10.27l-1.52,-0.91l-0.91,0.13l-0.83,1.18l0.19,1.46l-0.37,-0.53l-0.38,-4.02l-1.31,-4.1l0.26,-0.9l-0.55,-0.43l-0.24,0.13l-1.76,-2.79l-0.59,-1.56l-2.33,1.96l-1.63,0.27l-1.96,-3.12l-0.37,-4.39l-0.56,-0.29l-0.45,0.36l-0.06,0.92l-1.76,-0.24l-0.44,0.23l0.12,0.48l0.92,0.7l1.01,0.22l0.34,0.42l0.02,0.68l-0.97,0.9l0.32,0.89l-0.51,0.67l-0.05,0.75l0.49,1.55l0.74,1.1l-0.04,1.05l-1.67,1.56l-1.04,1.67l-0.41,-0.63l0.95,-1.34l0.03,-0.48l-0.94,-0.02l-1.11,0.67l-0.25,-1.52l0.63,-1.15l-0.09,-0.5l-0.51,-0.01l-0.91,0.83l-0.49,3.08l-1.12,0.91l-0.6,-3.09l-0.39,-0.32l-0.5,0.81l0.23,2.33l-0.91,1.25l-0.47,0.01l-0.88,-0.99l-0.34,-3.13l-0.94,-2.74l-0.52,-3.11l0.52,-1.04l-0.11,-0.49l-1.5,-0.56l0.17,-1.34l-1.2,-1.65l0.96,-2.52l0.18,-2.32l-0.78,-0.65l-1.19,-0.22l-1.51,-1.02l-0.65,0.08l-0.78,-0.54l-0.29,-0.57l0.77,-1.7ZM492.82,292.48l0.02,0.04l-0.02,-0.03l0.0,-0.01ZM490.12,294.53l0.06,-0.71l0.06,0.24l-0.11,0.47ZM486.34,295.46l0.98,-1.76l-0.25,-1.76l-0.63,-0.69l-0.22,-1.31l1.7,2.68l-0.27,2.27l-0.25,0.35l-1.07,0.23Z", "name": "Bangladesh"}, "MN": {"path": "M465.38,65.23l0.89,-0.91l-0.34,-1.28l0.62,-0.06l1.36,-0.89l0.63,-1.89l2.96,-0.29l1.6,0.36l0.59,-0.65l0.58,0.39l1.04,-0.28l0.59,-0.33l0.38,-0.81l1.04,0.09l2.05,-1.05l0.37,-0.57l-0.19,-1.38l2.27,-0.66l0.58,-1.07l4.59,-1.32l0.78,-0.78l1.87,-1.05l2.78,-0.49l3.01,-2.22l2.88,-0.07l1.04,-1.55l2.11,1.67l0.67,-0.01l0.8,-0.92l0.67,0.01l0.42,1.04l1.07,0.72l8.35,0.44l0.71,3.17l2.29,2.08l2.21,-0.2l1.29,1.02l2.11,-0.02l1.12,0.3l2.16,-0.99l1.09,0.49l0.76,-0.36l1.92,0.95l4.87,0.16l1.67,1.45l1.56,-0.13l1.37,-1.0l0.41,-0.68l1.71,-0.25l1.36,-0.75l0.85,-0.75l1.1,-2.2l0.25,-2.54l-1.91,-1.23l-0.53,-1.95l-0.94,-1.28l0.05,-0.46l0.57,-1.2l0.23,-1.64l0.63,-0.95l1.29,-0.51l0.99,-2.1l2.22,-0.91l1.25,-1.62l0.49,-1.34l0.6,0.61l2.94,1.23l2.31,0.52l1.62,1.19l4.13,0.3l6.74,2.7l1.5,-0.12l3.88,1.08l0.63,4.99l0.71,1.02l-0.09,1.5l0.6,0.53l0.85,0.15l1.69,1.38l3.6,0.96l1.12,0.89l2.42,0.6l1.42,-0.35l2.09,0.2l0.92,-0.22l2.0,-1.27l4.65,-0.82l2.11,-0.81l3.62,0.66l2.55,0.98l3.66,-0.08l3.83,3.12l5.14,0.45l-0.06,2.11l0.27,0.58l3.44,2.64l1.66,0.76l4.72,-0.1l7.17,1.59l1.72,-0.47l1.38,0.73l0.9,-0.0l4.66,-2.03l5.53,-0.68l3.09,-1.04l1.45,0.23l1.07,-0.2l1.83,-0.89l0.96,-1.85l2.96,-1.98l5.22,-2.55l3.2,0.36l1.84,0.88l2.02,1.84l1.38,0.6l2.35,0.12l3.03,-1.24l1.43,0.3l1.44,0.54l0.71,0.62l-4.84,9.93l-1.54,2.03l-0.25,2.98l-1.78,1.03l-0.19,0.39l0.24,1.78l0.55,0.9l2.15,1.83l1.08,-0.17l1.76,-1.38l1.99,0.18l1.85,-0.29l2.16,0.57l2.17,1.49l3.44,-3.22l2.57,-0.35l2.54,0.41l1.8,2.03l2.38,0.99l0.65,1.24l0.93,0.52l1.8,2.04l1.36,0.99l0.52,1.52l0.76,1.05l-0.01,1.06l-1.13,0.84l-2.67,-0.08l-3.79,-1.36l-0.93,0.6l-2.89,-0.2l-1.99,0.49l-1.2,0.45l-1.18,0.92l-1.41,-0.65l-1.01,0.08l-0.42,0.37l-0.4,1.72l-3.39,-0.28l-2.33,0.96l-2.4,3.23l-0.39,0.71l-0.06,1.29l-1.88,0.99l-1.87,1.53l-3.74,0.61l-1.74,0.11l-1.43,-0.38l-1.43,0.3l-1.21,1.84l-2.52,2.13l-3.44,1.97l-6.46,-1.24l-2.32,-1.64l-3.93,-0.05l-1.35,1.02l-0.99,1.34l-1.71,4.41l0.96,1.92l2.38,2.38l0.66,1.54l-1.14,0.39l-1.55,1.43l-4.17,1.53l-4.52,5.09l-7.72,2.96l-4.84,0.2l-3.84,-0.28l-10.6,1.44l-11.84,4.97l-1.46,1.22l-0.95,-0.4l-2.3,-0.1l0.0,-1.59l-0.48,-0.39l-5.77,1.1l-4.75,-2.26l-6.83,-1.36l-1.26,-0.48l-2.32,-2.54l-1.39,-0.42l-3.06,-0.12l-8.31,-1.14l-3.92,0.98l-16.87,-2.0l-6.05,0.61l-0.42,-1.63l-3.28,-3.13l-0.15,-1.01l-2.38,-5.24l-1.45,-0.72l0.29,-1.8l-0.2,-0.51l-2.52,0.02l-2.39,-0.79l-2.56,-1.53l-1.19,-1.11l-1.93,-0.36l-2.15,-2.01l-1.23,-0.49l-5.48,-0.85l-2.76,0.24l-2.97,-0.55l-3.26,-0.07l-1.18,-0.45l-0.88,0.06l-1.89,-0.9l-1.14,0.11l-1.48,-2.67l0.33,-1.69l2.14,-2.77l0.03,-0.89l-0.63,-1.57l0.87,-2.78l-0.36,-1.84l-0.87,-1.94l-1.26,-0.64l-1.54,-2.5l-0.52,-2.03l-0.88,-1.72l-1.6,-0.72l-0.81,-1.38l-0.52,-0.08l-1.29,0.57l-1.61,-1.67l-1.89,-0.23l-1.51,0.36l-3.73,-2.07l-0.11,-0.9l-0.63,-0.83l-3.77,-1.57l0.57,-0.74l-0.01,-0.67l-1.71,-0.88l-0.5,-0.67Z", "name": "Mongolia"}, "BN": {"path": "M669.68,427.4l0.73,0.87l0.54,2.47l-0.75,-0.21l-0.52,-3.13ZM663.3,429.66l2.55,-1.0l3.15,-2.12l-2.11,1.53l0.21,2.24l0.34,0.55l-0.41,1.43l-0.75,0.81l-1.24,-1.48l-0.84,-0.24l-0.9,-1.73Z", "name": "Brunei"}, "BH": {"path": "M186.05,263.08l0.03,-0.01l0.0,0.12l-0.03,-0.12ZM186.08,263.2l0.33,0.5l-0.01,1.54l-0.25,-0.46l-0.07,-1.59Z", "name": "Bahrain"}, "BT": {"path": "M479.26,258.41l-0.68,-0.6l-1.59,-0.42l-1.49,0.21l-0.67,-0.33l-1.21,-0.69l-0.18,-0.78l-0.61,-0.7l0.98,-0.78l0.47,-1.27l1.11,-1.01l0.49,-1.02l2.35,-2.77l2.96,-1.79l1.35,-0.05l1.57,0.4l-0.19,0.88l0.51,0.52l2.68,0.07l2.39,0.83l1.8,-0.86l2.35,0.97l-0.39,2.29l0.21,0.81l1.39,1.06l1.61,-0.11l0.49,0.91l-0.62,1.49l0.57,1.2l-0.19,0.44l-2.46,0.43l-0.91,-0.03l-0.85,-0.49l-1.14,0.61l-4.0,0.16l-3.09,-0.93l-1.21,0.46l-0.53,0.64l-3.27,0.27Z", "name": "Bhutan"}, "HK": {"path": "M661.58,292.96l0.56,-0.57l0.79,-0.15l0.37,0.12l0.23,0.69l-0.18,0.38l-1.77,-0.47Z", "name": "Hong Kong"}, "JO": {"path": "M73.44,221.31l0.32,-1.94l0.71,-1.81l-0.18,-2.7l0.4,-4.54l0.81,-0.34l0.91,0.11l1.09,1.36l1.36,0.46l1.2,0.92l3.65,0.53l14.19,-8.55l1.88,6.47l-0.46,0.56l0.45,1.39l0.49,0.26l1.18,-0.3l0.12,0.32l-2.13,1.8l-14.99,4.17l-0.18,0.66l7.3,7.79l-2.14,1.24l-1.23,2.64l-5.25,1.04l-0.54,0.35l-1.77,2.81l-2.92,2.3l-7.72,-1.2l0.79,-4.67l0.53,-1.3l0.03,-2.42l2.2,-5.75l-0.11,-1.66Z", "name": "Jordan"}, "PS": {"path": "M69.37,220.61l0.5,-1.44l1.93,-1.52l-0.75,-0.82l-0.89,-0.22l-0.2,-2.28l0.38,-1.39l0.34,-0.86l0.71,-0.46l1.04,0.19l1.21,0.91l0.0,4.78l-0.74,2.04l-2.36,0.96l-1.18,0.1ZM64.36,221.37l0.26,-0.24l-0.2,0.39l-0.05,-0.15Z", "name": "Palestine"}, "LB": {"path": "M71.41,206.16l3.41,-7.3l0.31,-1.87l1.06,-1.44l1.32,-0.97l0.1,-0.56l2.44,-0.29l-0.58,1.07l1.36,0.72l0.51,1.51l-0.27,0.54l-1.73,1.43l-0.21,0.89l-1.1,0.06l-1.03,0.79l-0.41,0.85l0.43,0.87l-1.83,1.74l-1.46,0.66l-0.46,1.19l-0.37,0.22l-1.46,-0.12Z", "name": "Lebanon"}, "LA": {"path": "M558.12,308.97l0.8,-2.48l0.9,-0.56l1.21,-0.03l0.58,-0.32l0.14,-0.59l-0.68,-0.32l0.06,-0.31l0.54,-0.46l0.92,-1.8l1.27,-0.46l1.32,-0.98l0.33,1.83l0.41,0.49l2.23,-0.25l1.45,0.64l0.79,-0.52l0.23,-0.51l-0.59,-0.81l0.09,-3.9l-1.05,-1.43l-0.46,-1.67l1.09,-1.67l0.5,0.65l1.96,-0.09l2.85,3.44l0.75,0.49l0.74,1.87l0.55,0.12l0.79,-0.61l0.59,0.27l-0.72,3.25l2.08,3.11l4.25,1.55l3.34,-1.92l3.23,2.09l-1.48,1.18l0.07,0.59l1.87,0.54l0.4,1.12l1.34,0.22l0.42,0.91l-1.29,1.97l-1.05,0.95l-2.28,-0.55l-2.03,0.27l-0.16,0.6l0.32,1.04l-1.08,0.87l-0.12,0.82l6.31,4.01l3.0,0.99l-0.42,1.03l0.28,0.95l1.72,1.75l0.92,0.28l0.85,1.15l0.86,2.02l2.37,2.5l1.98,1.54l1.67,1.97l0.28,2.13l0.96,1.49l0.83,0.4l0.66,-0.34l0.63,1.05l3.36,2.31l-1.56,1.09l-0.2,0.64l0.94,1.54l2.13,1.74l0.53,0.81l-1.24,1.92l0.26,2.05l-0.64,0.9l-0.88,-0.18l-1.3,1.28l-0.72,0.04l-0.59,0.63l-0.63,0.09l-2.18,-1.88l-0.59,0.03l-0.89,0.79l-0.78,-0.14l-0.68,0.79l-1.22,0.15l-0.43,0.59l1.04,2.11l-0.26,0.59l-0.82,-0.02l-1.24,-1.21l-1.56,-0.54l-1.34,0.34l-0.62,-0.55l-0.32,-0.6l1.56,-0.89l0.71,-1.11l0.39,-2.8l-0.42,-2.39l0.93,-1.73l0.17,-1.54l-0.28,-0.5l-1.57,-0.92l-0.05,-1.29l-2.57,-1.25l-0.75,-1.37l-0.96,-0.96l-0.46,-1.25l-0.05,-1.74l0.51,-3.38l-0.65,-1.35l-2.34,-1.84l-3.57,-4.78l-1.35,-0.09l-2.3,-0.79l-1.67,0.07l-0.48,0.38l-0.07,0.74l-1.19,1.15l-0.3,0.82l-1.62,0.51l-1.04,0.72l-0.47,-0.8l-1.53,-0.65l-1.54,-1.23l-0.79,-0.06l-1.18,1.01l-1.29,0.38l-0.67,1.12l-2.05,1.33l-1.8,1.65l-1.16,-0.32l1.6,-4.28l-0.05,-1.21l-0.67,-1.09l0.86,-1.3l0.92,-2.92l-0.66,-2.72l0.1,-1.75l-0.63,-0.53l-1.54,-0.29l-1.85,0.75l-0.71,0.09l-0.67,-0.33l-0.57,-0.57l-0.12,-0.62l1.05,-2.53l-0.19,-0.97l-1.62,-1.77l-0.72,-0.02l-0.52,0.36Z", "name": "Lao PDR"}, "TW": {"path": "M709.3,291.82l-1.83,-4.59l0.51,-1.89l-0.08,-2.0l3.67,-6.43l3.03,-4.34l3.7,-1.83l2.14,1.56l0.09,0.35l-0.77,1.26l0.06,2.28l-1.59,3.77l-1.03,5.01l-0.91,2.74l-2.57,3.52l-0.85,1.94l-0.35,3.19l-0.44,-0.46l-0.11,-1.02l-0.74,-1.59l-1.92,-1.47Z", "name": "Taiwan"}, "TR": {"path": "M7.99,161.66l1.03,0.22l1.78,-0.37l0.63,-0.86l-1.88,-0.41l-0.87,-1.59l0.93,-0.42l0.78,-0.97l-0.38,-0.84l-1.04,-0.26l0.22,-1.4l-1.11,-1.38l1.53,-1.64l-0.01,-0.66l-0.98,-0.39l-5.01,0.73l0.43,-1.17l0.14,-2.62l0.96,-0.37l3.02,-3.17l1.89,0.03l0.94,-0.5l0.88,-0.02l0.41,0.66l1.26,0.53l2.03,-0.11l0.96,-0.5l0.06,-0.48l0.2,0.52l0.44,0.12l2.4,-0.29l5.37,0.12l0.62,-0.4l-0.05,-0.64l-1.48,-0.65l0.7,-0.47l6.52,-0.93l0.35,-0.33l-0.36,-0.66l-4.21,-0.72l-1.38,-1.17l0.51,-1.42l5.55,0.63l3.22,-0.4l3.54,0.99l3.33,-0.2l1.01,-0.65l0.77,-1.35l4.6,-2.35l1.66,-1.26l7.24,-2.43l10.86,0.44l1.96,-0.93l0.54,0.16l-0.03,1.2l1.48,1.59l2.21,0.87l2.62,-0.69l0.67,0.19l0.96,2.25l1.79,1.43l0.93,0.16l1.2,-0.81l0.79,-0.08l1.41,0.69l0.74,0.89l5.19,0.94l1.14,0.69l3.53,0.69l7.87,-1.6l2.82,1.08l2.54,0.35l1.02,-0.16l6.24,-2.71l2.51,-1.47l0.64,-0.71l2.14,0.68l0.98,-0.56l3.85,0.49l1.25,-1.25l0.91,0.03l0.44,0.73l2.22,1.53l0.02,0.52l0.51,0.51l1.61,0.31l0.22,0.85l1.28,1.16l0.57,2.17l-1.04,1.78l0.93,2.48l-0.04,0.84l2.19,0.95l2.59,-0.14l2.28,1.66l-1.27,0.98l-0.54,2.14l-2.31,0.12l-0.46,0.66l0.51,1.54l0.64,0.58l-0.24,1.25l0.2,0.53l0.71,0.9l0.23,3.83l1.0,0.49l-1.64,3.72l0.43,0.51l0.73,0.06l1.56,1.01l-0.24,0.46l0.21,1.92l1.62,1.39l-0.23,0.51l-0.93,-0.02l-2.34,1.61l-0.2,-2.01l-0.87,-0.72l-0.84,-0.11l-1.42,0.77l-1.09,-0.03l-4.28,-1.2l-1.3,0.34l-1.32,-0.37l-2.72,2.18l-0.63,-1.23l-0.91,-0.31l-1.16,0.82l-3.93,0.97l-6.05,-0.08l-5.27,2.36l-4.83,1.22l-4.33,-0.1l-2.35,-1.43l-1.98,-0.36l-5.77,2.22l-2.57,-0.08l-0.96,-0.89l-2.18,-0.39l-0.64,0.48l-0.7,2.82l0.69,1.64l-1.76,0.56l-0.32,1.45l-0.99,0.56l-0.34,0.73l-1.01,-0.55l0.15,-0.53l-1.01,-2.49l2.77,-3.03l-0.16,-1.54l-1.04,-0.94l-0.43,-0.04l-2.94,1.62l-0.88,1.05l-0.89,0.15l-4.31,-1.91l-1.02,-0.13l-3.12,1.87l-2.57,2.64l-1.88,0.93l-5.61,0.72l-1.03,0.48l-1.75,-0.5l-1.08,-0.65l-2.65,-2.99l-5.1,-2.34l-5.46,-0.6l-0.89,0.96l-0.17,2.23l-0.71,2.0l-1.51,-0.37l-3.86,1.25l-3.28,-1.34l-0.48,-0.5l-0.77,-2.47l-0.76,-0.44l-1.22,0.32l-2.38,-1.06l-1.51,-0.11l-1.53,1.41l0.18,-0.25l-0.34,-0.64l-0.34,0.02l1.78,-1.56l0.13,-0.28l-0.36,-0.57l-7.0,0.23l0.11,-0.26l1.71,-0.35l0.29,-0.44l-0.31,-1.03l-2.07,-1.09l-0.87,-2.1l0.93,-0.51l0.06,-2.34l-2.86,-1.01l-1.45,-1.17l-1.04,0.34l-1.56,-0.72l0.81,-0.68l0.07,-0.85l-0.38,-1.15l0.83,0.48l0.08,1.22l0.49,0.71l0.25,0.15l0.66,-0.5ZM15.22,175.57l-0.41,0.2l-0.33,-0.03l0.31,-0.13l0.43,-0.04ZM16.6,143.61l0.01,-0.05l-0.46,-0.47l0.7,0.08l-0.24,0.44ZM3.34,140.98l2.15,-2.44l-0.15,-2.09l1.72,-0.87l0.46,-0.67l-0.31,-2.04l-1.93,-1.23l1.34,-0.44l0.56,-1.08l2.01,-0.26l1.03,-0.61l1.74,-0.22l1.82,1.43l3.3,-0.46l-0.1,0.85l0.47,1.13l1.24,1.74l1.18,0.83l5.0,2.06l-0.52,1.31l-1.07,0.25l-4.52,-0.94l-1.96,0.79l-1.34,-0.18l-1.86,0.36l-1.98,2.61l-3.22,1.51l0.3,-0.41l-0.33,-0.64l-4.89,0.12l-0.18,-0.41ZM7.44,143.02l-1.73,1.59l-1.03,1.2l0.09,-1.2l1.25,-0.99l1.41,-0.61ZM0.74,145.85l0.89,-0.3l0.19,0.13l-1.08,0.17Z", "name": "Turkey"}, "LK": {"path": "M405.27,403.82l0.63,-0.48l0.31,-2.67l0.69,-2.19l-0.1,-1.45l1.26,-2.36l0.05,-2.28l1.32,0.61l0.71,-0.1l0.29,-0.53l1.52,1.26l1.62,2.89l0.68,0.41l1.3,1.94l0.18,1.09l1.12,0.66l0.37,2.11l1.82,2.76l1.26,2.7l0.27,0.91l-0.09,2.77l-1.05,2.78l-2.37,1.92l-4.81,1.92l-1.57,0.21l-1.55,-0.41l-1.15,-0.96l-1.7,-4.93l-1.0,-8.59ZM409.2,391.24l-1.76,-0.39l-0.41,-0.44l1.57,0.08l0.6,0.76Z", "name": "Sri Lanka"}, "TL": {"path": "M743.75,531.36l1.77,-2.37l1.4,-0.5l3.12,-0.62l6.11,-0.25l2.56,-1.05l1.81,0.43l-2.38,1.79l-1.88,0.51l-1.38,1.0l-2.37,0.62l-1.6,0.93l-4.02,1.15l-2.18,1.48l-0.65,-1.32l0.98,-0.19l0.44,-1.35l-0.59,-0.65l-1.14,0.38ZM737.32,534.04l0.79,-0.42l1.17,-0.31l-0.74,0.83l-1.22,-0.09Z", "name": "Timor-Leste"}, "TM": {"path": "M203.1,134.81l-0.97,-1.38l-0.75,-1.96l2.58,-2.29l1.35,-0.76l-1.16,0.96l-1.2,2.45l0.48,0.84l-0.32,2.14ZM206.04,128.16l3.88,-1.05l3.1,-0.34l5.29,3.23l2.91,4.49l1.91,1.78l0.68,0.13l2.88,-0.54l8.07,0.54l1.16,-1.25l-0.76,-0.98l-0.26,-2.09l0.85,0.12l1.5,1.43l2.63,-0.58l1.07,-0.61l0.51,-0.81l-0.12,-0.87l-1.1,-0.81l-0.57,-1.62l1.36,-0.37l1.43,-2.54l1.56,0.47l0.76,1.14l1.07,0.04l0.16,-0.96l-2.22,-2.29l2.06,-0.02l0.81,-0.77l1.85,1.68l2.07,0.43l0.74,1.24l0.76,0.47l3.79,0.28l0.85,0.67l-0.35,2.11l1.55,0.99l-0.65,0.67l0.44,1.43l-0.5,1.54l0.38,0.61l2.88,1.63l3.07,-0.24l2.91,0.53l0.65,-0.05l1.18,-0.72l1.0,0.29l1.8,1.21l1.39,3.57l2.06,3.05l0.85,3.23l7.75,5.38l1.95,1.91l3.03,1.84l1.19,-0.12l2.24,1.84l7.43,4.52l2.76,-0.01l3.1,1.66l1.36,0.35l0.19,0.22l-0.77,1.34l-0.06,3.42l-2.52,-0.56l-2.87,-1.32l-1.09,1.01l-0.59,1.71l-3.23,0.11l-2.21,0.96l-2.42,6.9l-1.05,0.9l-1.93,0.94l-0.56,0.81l-1.11,0.03l-4.14,1.3l-1.34,0.12l-0.43,0.76l0.37,0.94l-0.74,1.84l-2.56,1.51l-1.65,0.02l-1.01,0.51l-0.49,-0.76l-1.74,-1.33l-2.84,0.04l-1.86,-1.54l-0.71,-0.1l0.1,-1.7l-0.68,-1.07l0.38,-0.89l-0.32,-4.03l-0.44,-0.84l-6.02,-0.15l-1.99,-2.71l-4.53,-2.48l-0.55,-0.59l-0.67,-1.69l-3.71,-1.53l-1.3,0.25l-0.99,-0.27l-1.02,0.41l-0.75,-0.21l-2.17,-1.45l-4.57,-1.19l-0.25,-1.22l-1.0,-0.91l-5.86,-0.35l-1.13,0.6l-0.29,0.89l-5.02,-0.19l-1.6,0.44l-3.74,2.45l-1.46,2.63l-3.62,1.13l-1.71,-0.08l-0.61,-4.69l0.33,-8.95l-1.59,-2.61l-2.68,-1.14l-1.3,0.25l0.55,-1.59l1.9,0.43l0.79,-0.12l0.32,-0.51l-0.29,-0.73l-0.73,-0.5l0.06,-2.12l-0.93,-0.58l-3.08,-0.24l-0.51,0.58l-0.94,-2.3l-0.07,-1.47l1.32,-4.71l1.22,1.25l1.6,0.4l1.86,-0.34l0.99,1.22l1.24,0.3l2.26,-0.61l1.46,0.23l0.32,-0.57l-0.35,-0.92l1.37,0.24l1.14,-0.41l0.37,-0.43l0.06,-1.24l-0.39,-1.08l-0.65,-0.72l-2.36,-1.57l-1.3,-1.27l-1.97,-5.25l-1.88,-0.49l-3.37,0.39Z", "name": "Turkmenistan"}, "TJ": {"path": "M312.6,153.86l0.49,-1.67l0.75,-0.73l1.15,-0.49l4.28,0.72l1.47,-0.06l0.98,-0.92l0.43,-1.72l0.68,-0.04l1.02,-0.65l0.05,-0.52l-0.48,-0.67l1.1,-0.28l0.2,-0.47l-0.55,-0.7l2.53,0.2l0.5,-1.43l-0.62,-2.01l0.6,-0.54l0.29,-1.15l0.59,0.04l1.33,0.95l0.68,0.04l4.34,-2.09l0.69,-1.18l1.41,1.4l0.16,0.81l0.48,0.2l-2.49,2.0l-0.24,0.95l0.31,0.46l1.01,0.36l0.69,1.04l0.79,0.09l-0.57,0.34l-0.55,1.08l-0.56,-0.81l-3.63,-1.35l-3.51,0.92l-0.7,0.87l0.01,0.65l-0.71,-0.36l-0.52,0.2l-0.23,0.5l-0.38,1.42l0.51,2.2l0.44,0.36l2.29,-0.43l2.59,0.18l1.71,-0.22l0.58,0.29l1.77,-0.37l0.57,0.13l0.89,1.24l0.85,0.31l1.54,-0.15l0.69,-0.8l2.64,-0.87l0.14,1.01l1.56,0.42l-0.06,0.72l0.58,0.64l0.59,0.04l1.42,-0.63l1.34,1.18l0.41,0.04l0.98,-1.13l1.43,-0.33l4.05,0.14l2.7,-0.86l0.79,0.04l-0.15,1.79l1.41,2.05l-0.78,0.93l0.93,2.59l1.55,0.72l0.72,-0.27l0.58,-0.82l0.9,0.0l3.72,1.57l-0.34,2.11l1.2,3.66l-0.24,1.67l1.57,1.55l-1.23,0.9l-1.56,-1.23l-3.22,-0.24l-0.9,0.78l-2.94,0.8l0.31,-0.94l-0.4,-0.66l-2.66,-0.38l-3.85,1.77l-1.04,0.82l-0.75,1.19l-2.16,0.4l-4.14,2.46l-0.73,-0.02l-0.79,-1.05l-0.7,-2.31l1.11,-6.72l-0.64,-0.61l-1.63,0.26l0.38,-1.82l-0.6,-1.47l-1.67,-1.13l-1.62,-0.38l-1.22,0.38l-0.9,0.77l-1.53,2.3l-1.6,1.44l0.26,2.26l-0.36,0.54l-0.71,0.2l-0.83,-0.46l-0.97,-0.08l-2.56,0.51l-0.8,0.87l-0.03,2.31l-0.63,0.6l-2.15,-1.75l-0.7,-0.14l-0.87,0.62l-0.93,0.03l-2.25,1.1l-0.9,0.97l-1.34,0.56l-0.57,-0.13l-1.25,-1.25l0.38,-2.72l3.53,-4.61l0.49,-1.81l-1.99,-2.39l-0.27,-1.51l0.72,-1.85l-0.39,-1.0l-0.72,-0.35l-2.42,-0.06l-0.36,-1.16l-2.04,-0.68Z", "name": "Tajikistan"}, "TH": {"path": "M537.74,324.01l2.04,-0.59l0.45,-0.42l-0.28,-2.76l0.73,-1.57l0.08,-2.38l1.18,-1.35l0.27,-0.79l1.75,0.63l4.69,-0.67l0.85,-0.91l0.34,-1.57l0.78,-0.19l1.13,0.28l1.04,-0.35l0.57,-0.75l-0.14,-0.95l1.52,0.11l1.48,-0.7l0.99,0.61l0.38,0.69l0.44,-0.05l0.96,-0.98l1.39,1.65l-1.06,2.91l0.28,1.07l0.7,0.71l1.17,0.53l1.0,-0.15l1.15,-0.68l1.82,0.3l-0.13,1.56l0.65,2.57l-0.87,2.67l-0.9,1.41l0.67,1.48l0.03,0.9l-1.74,4.23l0.45,0.78l1.2,0.54l0.78,-0.12l4.07,-3.13l0.69,-1.12l1.14,-0.27l1.06,-0.94l1.58,1.2l1.52,0.65l0.32,0.84l0.8,0.31l1.15,-1.0l1.89,-0.68l0.79,-1.54l0.91,-0.51l0.04,-0.84l1.24,-0.05l2.26,0.78l1.17,0.08l2.58,3.67l3.09,2.7l0.49,1.06l-0.52,3.18l0.05,1.82l0.54,1.52l1.05,1.09l0.81,1.45l2.36,1.1l-0.1,0.63l0.34,0.79l1.66,1.09l-0.17,1.07l-0.78,1.05l-0.17,0.77l0.4,2.55l-0.48,2.9l-2.18,1.37l-0.64,0.74l-0.46,-1.02l-1.49,-0.49l-6.07,0.52l-2.88,-0.48l-3.04,0.68l-1.37,0.65l-1.02,0.96l-1.4,2.3l-1.3,1.31l-0.09,0.53l-1.54,0.29l-0.11,2.45l0.98,2.09l0.27,2.51l1.86,1.89l-0.26,1.54l-0.86,-0.06l-0.14,0.32l-1.06,-0.8l-0.59,-1.02l-0.56,0.06l-1.2,-1.2l-2.43,-1.27l-2.27,0.49l-2.58,-0.4l-1.21,0.26l0.58,-5.56l-0.62,-0.66l-2.72,-0.77l-0.4,0.33l-3.09,0.59l-1.02,0.94l-0.2,0.84l0.71,1.59l-0.91,2.64l0.19,3.93l-1.05,1.63l-0.35,1.5l-1.27,2.17l-1.08,4.38l-1.47,2.35l-0.92,2.27l-0.07,4.25l0.92,2.45l-0.22,1.06l0.22,0.41l1.15,0.42l2.57,-0.74l0.54,0.13l1.06,5.07l1.12,1.35l0.69,-0.03l1.1,4.65l-0.71,-0.32l-0.96,0.72l0.38,1.87l1.85,2.56l1.25,0.14l3.14,2.29l2.99,-0.24l1.37,0.96l1.45,2.16l1.99,1.54l-0.2,0.8l-1.73,2.19l-0.57,0.01l-0.62,-0.83l-0.58,-0.14l-2.26,0.9l-0.77,1.07l-0.71,-0.69l0.68,-1.21l-0.18,-2.32l-0.75,-0.38l-0.78,0.05l-0.54,-1.24l-0.66,-0.46l-0.85,0.18l-1.85,-0.67l-0.86,-1.07l-1.03,0.3l-0.26,1.05l-1.38,-1.7l-1.18,-0.89l0.16,-1.5l-1.21,-0.97l0.27,-0.83l-0.53,-0.49l-1.31,-0.03l-0.73,-1.83l-0.6,-0.75l-0.9,-0.15l-0.12,-1.17l-1.94,-1.31l-0.71,-1.5l-1.29,-0.72l-0.59,0.2l-0.76,0.98l-0.68,-1.48l0.03,-2.42l0.63,-1.55l0.33,-2.39l2.81,-8.01l0.09,-2.34l3.14,-3.22l3.28,-5.36l-1.16,-3.29l-0.48,-2.8l-1.36,-1.43l-0.7,-2.18l0.42,-1.38l-0.33,-3.85l-1.57,-2.62l-2.74,-2.39l-2.36,-3.38l-0.3,-1.14l-0.11,-1.46l2.77,-1.37l0.24,-5.08l1.99,-1.43l0.23,-1.3l-0.53,-0.67l-0.48,0.01l-0.77,0.61l-1.26,-2.81l-0.32,-1.92l-5.49,-6.4l0.28,-0.94l-0.82,-2.56l-0.24,-0.48l-0.82,-0.09l-0.57,-0.75ZM559.45,406.63l0.01,0.05l-0.04,-0.01l0.03,-0.04ZM556.62,392.44l0.03,-0.28l0.21,0.01l-0.06,0.19l-0.18,0.08ZM544.21,404.66l-0.1,-0.43l0.18,-0.99l0.21,0.06l-0.29,1.36Z", "name": "Thailand"}, "XC": {"path": "M54.11,189.32l0.71,-1.69l3.58,0.38l4.65,-1.22l-1.47,1.07l-0.12,1.43l-1.57,0.62l-1.16,-0.11l-0.33,-0.76l-0.7,-0.35l-1.48,-0.08l-2.13,0.7Z", "name": "N. Cyprus"}, "NP": {"path": "M410.28,243.11l-2.55,-1.76l0.5,-1.57l0.84,-0.96l0.17,-1.86l0.43,-1.13l1.67,-2.57l2.53,-2.12l0.36,0.0l0.71,0.97l1.05,0.04l0.69,-0.55l1.13,-1.86l1.45,-0.35l2.74,0.45l1.31,2.1l2.04,1.05l2.81,2.14l1.2,0.53l1.08,0.07l3.06,3.39l1.08,0.07l1.86,-0.7l0.91,0.36l1.07,2.57l4.26,2.86l2.43,-0.32l-0.44,1.39l0.29,0.76l0.99,0.39l3.39,0.13l2.33,2.94l1.09,-0.49l0.13,-1.05l0.41,0.62l1.7,0.81l1.0,-0.37l0.52,-1.03l3.86,2.13l3.7,0.19l1.83,-0.58l1.62,0.11l-1.18,5.52l0.99,1.89l0.33,1.4l-0.85,2.37l-1.11,-0.4l-1.63,0.3l-1.53,-0.18l-1.06,0.47l-1.13,-0.44l-0.63,-1.02l-2.53,0.89l-2.42,-1.08l-2.71,-0.61l-1.59,0.35l-0.56,-1.32l-0.61,-0.49l-0.81,-0.06l-2.2,0.7l-0.76,-0.85l-3.21,-1.41l-0.5,-1.97l-1.16,-0.57l-2.9,-1.14l-1.72,0.42l-0.54,0.41l-2.88,-0.65l-1.06,0.69l-3.82,-1.07l-0.63,-1.31l-1.72,-0.01l-3.45,-1.93l-1.06,0.34l-3.87,-2.4l-1.13,-1.33l-4.32,-2.53l-0.65,-0.19l-0.62,0.45Z", "name": "Nepal"}, "PK": {"path": "M269.48,270.83l0.52,-4.2l0.67,-0.75l0.57,-2.85l2.01,-1.0l0.97,-0.08l0.52,-1.04l0.77,-0.46l2.52,-0.65l2.87,-0.06l0.36,-0.47l0.11,-1.17l0.45,-0.39l-0.03,-1.58l0.47,-0.86l-0.52,-0.74l-0.77,-0.41l-2.77,0.13l0.39,-1.76l-0.54,-4.07l0.04,-2.2l-1.6,-0.09l-1.51,-1.37l-3.47,-1.08l-1.91,-1.91l-2.05,-3.71l-0.19,-0.94l-2.65,-2.99l10.89,3.26l8.22,-0.72l3.87,0.84l2.43,-1.24l5.25,-0.12l8.22,-2.31l1.17,-1.25l-0.51,-1.27l0.49,-1.74l-0.13,-2.39l0.42,-1.5l0.32,-0.75l1.44,-0.87l1.7,-1.97l1.13,-0.25l0.74,0.48l1.28,0.21l1.43,-0.15l2.17,-0.92l0.23,-0.41l-0.28,-0.62l-0.84,-0.53l0.92,-0.14l2.08,-1.08l1.11,-1.01l1.85,0.42l1.11,-0.38l1.19,1.17l1.06,0.19l1.7,-0.92l1.54,-1.71l-0.18,-4.32l1.19,-1.99l0.71,-2.75l2.97,-0.66l2.75,-1.73l0.12,-0.99l-1.13,-2.12l-1.89,-2.23l0.09,-0.52l0.46,-0.22l2.4,0.73l2.52,0.08l1.59,-0.27l1.74,-0.77l0.34,-0.78l0.03,-2.08l-0.91,-1.17l2.28,-2.78l1.25,-0.9l1.26,-1.87l-0.52,-1.21l0.4,-0.97l-0.21,-1.16l-1.35,-2.98l-1.47,-1.22l2.92,-2.92l1.05,0.02l3.08,-2.38l3.32,-1.04l8.46,-0.5l2.11,0.54l4.23,-1.81l1.89,0.66l1.45,-0.23l1.96,0.57l0.66,1.53l1.84,-0.02l1.15,0.7l0.89,2.05l-0.04,1.63l-0.48,0.91l0.16,0.54l1.26,0.65l0.79,1.44l0.87,0.06l1.8,-0.54l0.21,0.8l1.45,0.92l1.99,4.42l-0.25,0.7l-1.59,0.77l-1.22,1.27l-1.07,-0.14l-2.06,0.72l-1.13,0.04l-2.35,1.35l-1.72,-0.27l-2.12,-0.88l-1.69,-0.06l-5.08,-0.99l-2.74,1.13l-1.28,2.39l0.11,0.68l1.22,0.82l-0.53,0.92l0.26,0.83l0.45,0.32l1.89,0.13l-1.7,1.09l-0.33,0.76l0.06,0.8l1.21,1.19l-0.19,0.79l-0.96,1.3l0.16,0.78l1.0,1.03l1.2,0.61l0.09,1.56l0.37,0.35l2.14,0.21l0.01,1.64l0.32,0.43l1.07,0.42l1.4,-0.03l1.71,0.69l0.54,0.53l-0.41,0.71l-3.79,1.57l-1.57,1.26l-0.36,1.18l0.6,1.91l-0.55,2.25l0.18,0.66l0.63,0.48l-2.05,1.08l-3.26,3.73l-0.26,0.91l0.35,1.04l-0.24,0.33l-0.5,0.49l-3.35,1.5l-1.12,3.11l-2.36,4.12l-4.24,2.31l-1.61,3.3l-1.4,1.47l-0.56,1.59l-2.17,0.66l-2.71,0.32l-2.75,0.97l-0.54,-0.33l-0.39,-1.18l-0.59,-0.61l-0.85,-0.41l-0.84,0.03l-2.03,1.49l-1.89,3.07l-2.77,2.99l-0.51,2.6l0.37,0.82l1.92,1.06l2.4,0.39l0.41,0.36l-0.14,2.08l-0.42,1.24l0.25,1.53l1.41,1.76l2.65,0.16l0.04,1.91l2.84,5.54l-0.51,1.0l0.38,1.32l-1.88,0.98l-0.72,-0.22l-0.2,-0.99l-0.83,-0.16l-3.03,1.01l-0.66,0.78l-1.39,0.17l-1.84,-0.86l-5.29,0.01l-0.66,-0.31l-0.65,0.61l-0.06,2.13l-3.01,0.31l-1.21,1.0l-0.25,-0.26l-0.77,0.04l-0.58,-0.5l-1.41,0.59l-0.05,-0.45l-0.57,-0.33l-0.36,0.17l-0.45,-0.88l-1.14,-1.08l-1.04,-4.6l-0.84,-0.57l-2.73,-0.5l-0.04,-2.81l-1.28,-2.11l-0.79,-0.73l-0.95,-0.3l-1.12,0.15l-0.56,0.45l-0.14,0.63l-3.17,0.73l-1.97,-0.15l-2.65,0.5l-2.1,0.03l-0.99,0.92l-3.43,-1.07l-0.78,-0.57l-1.09,0.44l-1.53,-0.33l-1.4,0.26l-0.65,0.55l-0.13,0.54l-5.86,-0.39l-2.45,0.99l-1.15,-0.64l-0.84,0.54l-1.21,0.17l-1.92,-0.28Z", "name": "Pakistan"}, "PH": {"path": "M728.0,406.82l-0.36,-1.38l-0.85,-0.45l-0.93,0.16l-1.15,1.02l-2.46,5.15l-0.73,-0.16l-0.33,-0.59l0.11,-0.69l0.93,-1.32l0.61,-3.27l0.76,-0.92l0.9,-0.65l4.06,-0.9l0.64,-0.48l0.18,-1.27l0.58,-0.71l1.78,-0.64l0.67,-0.86l1.5,0.51l1.05,1.19l0.18,1.61l-0.78,0.77l0.18,0.69l0.35,0.07l3.3,-1.43l1.49,-2.74l1.27,0.56l1.14,-0.29l0.99,-3.03l1.85,0.74l0.43,-0.17l0.47,-1.0l1.03,0.24l0.92,-0.17l0.58,-1.41l-0.86,-3.85l0.23,-0.35l2.55,1.76l0.99,1.46l0.61,0.45l0.63,0.02l0.02,0.82l0.91,1.89l-1.33,1.93l0.36,0.57l1.35,0.53l0.09,1.0l0.58,1.01l-0.17,2.72l1.02,1.26l0.13,2.5l-1.03,2.12l-1.88,1.25l0.29,1.17l-0.14,1.8l-0.55,-2.81l-1.64,-3.69l-0.84,-0.17l-0.91,0.67l-0.34,1.13l-1.8,2.36l-0.19,0.91l0.45,0.91l1.14,1.03l0.58,1.69l-0.02,1.68l-1.46,2.17l-0.55,0.33l-0.44,-1.09l0.26,-1.7l-0.39,-0.57l-0.86,0.04l-1.06,1.35l-0.53,-0.03l-5.2,-2.61l-0.91,-1.16l-0.67,-4.15l1.48,-1.94l0.23,-0.75l-0.31,-1.0l-1.65,-1.77l-2.44,-1.24l-0.93,-0.12l-0.84,0.47l-0.61,2.56l-1.07,-0.63l-0.58,-1.24l-0.67,0.04l-0.67,0.99l-0.69,0.09ZM751.98,389.95l-0.18,-0.26l0.18,-0.69l0.14,0.94l-0.14,0.0ZM745.51,369.73l0.42,0.49l0.16,1.05l1.39,0.75l-0.5,1.78l0.06,1.37l0.32,1.81l0.73,1.51l-0.22,0.62l0.63,0.5l-2.56,-0.11l-0.47,-0.75l-0.93,-0.6l-0.74,-1.33l0.4,-0.56l0.14,-1.09l-0.98,-0.39l-1.49,-1.79l-1.73,-1.01l-0.94,-2.42l1.55,0.24l4.29,-0.34l0.49,0.25ZM748.54,386.17l-0.11,0.68l0.34,1.55l-0.61,-0.86l0.39,-1.37ZM739.46,377.82l1.66,1.21l0.85,-0.07l0.75,-0.56l0.45,0.12l0.62,1.05l-0.07,3.26l1.13,1.12l0.7,2.2l-0.69,0.15l-0.74,-0.82l-0.65,0.35l0.22,1.71l-0.96,-0.38l0.05,-1.08l-0.37,-0.87l0.42,-1.7l-0.12,-1.02l-0.99,-1.46l-0.64,-0.13l-0.92,0.39l-0.72,-3.46ZM741.83,394.7l0.21,0.21l0.02,0.05l-0.32,-0.14l0.09,-0.12ZM738.84,387.8l1.52,0.83l0.11,1.43l-0.73,0.19l-0.69,0.75l-1.65,0.22l-1.56,-0.43l-0.3,-0.72l0.22,-0.29l1.36,-0.84l0.84,-1.0l0.88,-0.14ZM740.7,376.89l-0.46,0.02l-0.5,-0.74l0.4,0.01l0.56,0.71ZM738.03,358.15l1.13,1.2l-0.08,1.14l-1.32,0.79l-0.56,-0.45l0.53,-0.81l0.29,-1.86ZM705.26,340.87l2.47,2.04l1.41,-0.15l0.67,-0.97l-0.6,-3.01l0.11,-1.65l0.63,-1.44l0.12,-1.17l0.03,-2.73l-0.49,-1.5l1.77,-6.46l1.32,-0.62l2.0,-0.1l3.6,1.82l2.76,0.73l1.03,-0.47l0.93,-1.16l0.42,0.95l-1.01,1.96l-0.19,3.22l0.71,1.92l0.97,0.75l0.23,1.08l0.76,0.5l-2.68,6.69l-2.48,0.82l-1.67,1.35l-0.26,0.82l0.33,1.21l-1.44,2.23l-0.12,1.02l2.1,3.92l-0.4,0.52l0.02,0.84l1.09,3.29l1.19,1.24l2.47,0.77l0.97,-1.01l-0.57,-0.9l1.81,-1.08l0.87,0.03l2.06,0.87l0.92,1.55l-0.08,1.24l0.44,0.57l1.57,-0.04l0.57,-0.88l-0.17,-1.26l0.65,0.61l2.8,0.96l-1.64,0.38l-0.5,0.9l1.98,2.8l-0.23,0.96l0.4,0.54l1.09,0.06l1.14,0.57l-0.03,1.33l-0.44,1.29l-0.68,-0.57l0.47,-1.43l-0.11,-0.49l-0.54,-0.26l-1.98,0.22l-2.2,-0.99l-0.07,-1.15l-1.0,-1.74l-2.27,-1.38l-2.18,-2.32l-0.91,-0.19l-0.54,0.57l0.27,1.97l1.2,2.03l-0.11,0.92l-1.4,-2.27l-2.36,-2.11l-2.3,-1.17l-1.29,0.2l-1.17,0.64l-0.51,1.04l-1.37,0.37l-1.88,-0.91l-0.84,-0.94l-1.27,0.09l-0.06,-1.93l2.25,-2.25l0.18,-1.37l-0.61,-0.85l-1.39,-0.49l-0.76,-0.67l-0.69,0.13l-0.29,1.08l0.3,1.96l-0.52,-0.01l-1.22,-2.35l-1.29,-0.55l-1.08,-4.3l-0.32,-3.15l-0.92,-1.36l0.09,-1.8ZM730.9,372.85l0.47,-2.32l-0.19,-0.94l1.67,0.72l2.65,2.11l0.94,1.95l-1.57,-0.81l-0.13,-0.48l-2.08,-1.69l-0.86,0.3l-0.91,1.16ZM731.8,392.09l0.51,-3.17l2.34,-3.7l1.75,-4.53l0.06,3.43l-0.31,1.27l-2.26,2.03l-1.54,4.05l-0.54,0.62ZM733.28,394.82l0.52,-0.32l0.02,0.02l0.03,0.32l-0.57,-0.03ZM729.86,395.26l-0.73,0.04l-0.95,-1.93l-2.17,-1.16l-1.04,-1.46l-0.07,-0.78l0.39,-0.76l1.78,-0.22l1.23,-0.96l0.09,-1.64l-0.32,-1.54l0.97,-1.36l0.18,-1.36l1.68,-0.66l1.65,0.46l0.3,0.71l-3.01,6.84l-0.11,2.09l1.29,2.24l-0.6,1.16l-0.53,0.31ZM721.54,384.46l0.08,-2.36l0.65,-1.73l0.41,-4.26l-0.36,-0.84l-1.14,-0.42l0.2,-0.25l2.11,0.9l2.44,1.59l1.7,-0.22l0.29,0.21l-0.12,0.52l0.57,0.41l1.39,-0.68l-0.56,1.97l-1.94,1.45l-0.31,1.24l-1.72,0.97l-2.45,0.54l-1.25,0.95ZM725.79,384.74l0.1,-0.57l0.69,-0.72l-0.33,1.11l-0.47,0.17ZM725.34,370.08l0.51,0.0l0.32,0.32l-0.09,0.37l-0.74,-0.68ZM720.66,414.08l1.28,-0.48l1.17,0.52l-0.4,0.68l-1.29,0.41l-0.76,-1.13ZM721.62,371.25l-0.28,-0.34l0.74,-1.88l-0.26,1.6l-0.2,0.62ZM720.72,362.06l1.2,0.4l0.06,0.49l-0.5,0.8l-0.89,-0.63l0.12,-1.06ZM720.92,351.28l-0.31,-0.65l0.56,-0.04l0.08,0.05l-0.33,0.63ZM709.61,362.34l0.4,-0.1l2.09,0.38l1.26,-0.21l1.33,0.83l0.82,-0.23l2.08,2.06l-0.43,1.29l0.47,2.2l-1.03,2.1l-0.97,0.66l-0.4,-0.1l-1.19,-1.44l-0.47,-1.51l-0.77,-0.79l-0.21,-1.61l-0.66,-1.28l-1.3,-1.01l-0.48,-1.08l-0.55,-0.15ZM714.98,418.53l0.26,0.35l-0.6,0.22l-1.1,-0.11l0.83,-0.57l0.6,0.1ZM716.05,419.0l0.09,-0.02l0.4,0.07l-0.27,0.16l-0.22,-0.21ZM705.98,371.66l1.18,0.87l0.96,-0.01l0.47,0.43l-1.79,0.03l-0.83,-1.33ZM705.87,425.31l0.15,-0.09l-0.05,0.07l-0.1,0.02ZM707.64,424.35l0.2,-0.16l0.09,0.18l-0.07,0.15l-0.22,-0.17ZM706.04,374.1l0.59,0.45l-0.2,0.86l-0.04,-0.42l-0.35,-0.89ZM705.7,384.54l-0.46,0.12l-0.04,-0.14l0.31,-0.32l0.42,0.15l-0.23,0.19ZM686.27,399.97l0.72,-1.41l1.79,-1.9l2.11,-1.98l0.99,-0.21l0.79,-0.65l6.81,-7.61l1.57,-1.03l0.72,-1.72l-0.35,-1.29l1.36,-3.0l-0.17,2.33l1.17,3.14l-0.52,0.53l-1.72,0.64l-0.72,0.68l-0.59,1.28l-3.03,1.1l-0.35,0.57l0.08,0.83l-2.38,3.62l-2.22,1.15l-1.14,1.74l-2.96,1.68l-0.61,0.88l-1.33,0.63ZM684.24,404.1l0.0,0.29l-0.02,-0.03l0.01,-0.26Z", "name": "Philippines"}, "-99": {"path": "M383.52,185.67l4.19,1.15l0.92,0.04l-3.62,2.11l-1.48,-3.3Z", "name": "Siachen Glacier"}, "AE": {"path": "M194.39,278.76l0.73,0.08l0.22,1.31l1.15,0.87l2.69,-0.08l2.96,-1.26l9.41,0.59l3.95,-1.73l2.56,-4.17l2.65,-1.86l3.18,-3.64l3.09,-2.34l1.07,-2.06l-0.1,2.81l0.48,0.5l1.07,0.36l0.03,1.78l-0.57,-0.2l-0.39,0.23l-0.21,0.84l0.56,0.47l0.63,-0.33l0.03,1.52l-1.79,1.71l-0.31,-0.4l0.09,-0.97l-0.49,-0.37l-1.04,0.15l-0.73,0.82l-0.26,3.17l0.28,1.09l-0.3,0.77l0.18,0.5l1.19,0.25l0.25,0.52l-2.94,0.49l-0.73,0.46l0.14,1.92l-2.3,5.42l-0.13,2.62l-0.3,0.38l-18.8,-2.42l-7.07,-8.89l-0.12,-0.91ZM210.56,279.01l0.06,-0.02l-0.04,0.02l-0.02,-0.0ZM210.81,278.92l0.07,-0.02l0.01,0.01l-0.07,0.02Z", "name": "United Arab Emirates"}, "CN": {"path": "M365.41,172.16l1.93,-0.79l0.8,0.45l0.58,-0.03l1.6,-1.06l0.43,-0.78l-0.29,-0.77l-1.35,-1.08l0.27,-1.56l-1.1,-2.86l-0.11,-1.26l0.45,-1.34l-0.29,-0.65l-2.33,-1.28l-1.95,-0.56l-1.36,0.09l-0.9,1.0l-0.98,-0.49l-0.3,-0.68l-0.39,-1.26l0.69,-0.6l0.09,-0.46l-1.45,-2.26l0.19,-1.53l1.3,-0.4l0.68,-0.85l0.11,-0.56l-0.57,-1.51l1.04,-1.95l2.98,-0.74l2.05,-1.55l1.31,-0.33l-0.07,-1.23l1.05,0.36l1.84,-0.28l2.1,-1.29l0.52,2.3l0.55,0.54l1.46,0.02l2.76,-1.01l0.79,0.52l1.36,-1.01l1.34,-2.89l1.67,-2.04l4.86,0.3l1.85,-0.56l2.31,-0.19l1.9,-1.96l0.18,-0.83l2.68,-1.58l4.03,-1.95l3.58,-1.07l0.68,-0.91l2.92,-0.44l0.25,-0.55l-0.22,-0.96l0.32,-0.57l-0.71,-3.75l0.51,-0.97l2.29,-0.97l-0.24,-0.77l-0.99,-0.5l1.46,-0.67l1.2,0.13l0.41,-0.8l-0.89,-1.63l0.26,-0.97l-0.41,-1.27l-2.18,-4.85l-0.02,-3.97l0.89,-1.82l-0.41,-0.45l-1.46,-0.56l-2.01,0.06l-0.52,-0.32l1.06,-0.83l4.21,-1.09l1.68,-0.04l6.15,-1.96l0.53,1.0l1.26,0.66l2.52,-0.51l1.4,0.82l0.8,-0.08l0.85,-1.74l-0.07,-1.41l-2.19,-1.08l-0.03,-0.33l1.78,-5.22l3.14,-7.6l0.39,-1.94l4.63,1.67l2.32,0.49l2.47,-0.24l2.33,0.22l0.45,0.9l0.68,0.43l1.8,-0.78l1.62,-1.17l2.02,-0.37l1.39,-2.04l0.08,-0.98l-0.6,-1.42l-0.45,-3.93l1.19,-3.6l0.77,-0.73l3.25,-0.45l2.36,-0.85l1.29,-1.65l0.29,-3.02l0.79,-0.62l2.36,-0.13l1.58,0.27l2.52,-0.84l0.3,1.27l-0.63,0.38l-0.25,0.6l0.94,1.34l1.39,0.54l-0.65,1.04l0.38,0.7l2.38,0.77l1.49,0.83l0.5,1.57l3.63,2.12l1.18,0.22l2.09,-0.46l2.1,1.87l0.74,0.07l1.12,-0.53l0.57,1.23l1.53,0.67l1.28,3.58l1.64,2.65l1.19,0.55l0.79,1.76l0.33,1.76l-0.89,2.6l0.67,2.13l-2.13,2.76l-0.41,2.07l1.63,3.21l0.63,0.31l0.99,-0.22l1.89,0.9l1.02,-0.03l1.13,0.44l3.3,0.07l3.02,0.55l2.72,-0.24l5.34,0.82l0.96,0.37l2.24,2.07l1.85,0.32l1.15,1.07l2.73,1.63l2.56,0.85l1.99,-0.13l-0.13,2.0l1.51,0.81l2.29,5.05l0.18,1.08l3.31,3.2l0.69,1.92l6.41,-0.51l16.91,2.0l3.94,-0.98l8.21,1.13l3.03,0.12l1.08,0.31l2.26,2.49l1.52,0.61l6.88,1.38l4.74,2.27l5.67,-1.01l0.0,1.47l0.37,0.4l2.66,0.14l1.13,0.41l1.7,-1.31l11.66,-4.91l10.41,-1.41l3.86,0.28l4.94,-0.21l7.99,-3.04l4.65,-5.2l4.07,-1.44l1.61,-1.47l0.83,-0.18l0.58,-0.54l-0.07,-1.24l-0.79,-1.18l-2.28,-2.25l-0.82,-1.48l1.58,-3.99l1.88,-2.0l3.55,0.07l1.21,1.17l1.03,0.45l6.82,1.27l3.8,-2.14l2.62,-2.22l0.93,-1.63l1.11,-0.23l1.42,0.38l1.82,-0.11l4.12,-0.73l1.86,-1.53l2.09,-1.18l0.37,-0.81l-0.17,-0.73l0.97,-1.75l1.14,-1.01l0.39,-0.77l1.9,-0.8l3.64,0.23l0.44,-0.45l0.38,-1.65l2.28,0.62l2.45,-1.39l1.7,-0.45l3.01,0.22l0.98,-0.62l2.2,1.09l1.38,0.27l2.89,0.08l1.36,-0.66l0.42,-0.79l-0.01,-1.52l-0.83,-1.16l-0.58,-1.61l-1.47,-1.11l-1.85,-2.1l-0.88,-0.45l-0.64,-1.25l-2.39,-0.99l-1.95,-2.14l-2.92,-0.51l-2.87,0.4l-3.15,3.15l-1.88,-1.41l-2.46,-0.62l-1.86,0.29l-2.09,-0.18l-2.41,1.59l-1.87,-1.6l-0.37,-0.56l-0.2,-1.43l1.92,-1.29l0.24,-3.01l1.51,-1.96l4.75,-9.76l3.9,1.76l1.78,0.17l3.07,0.94l4.54,-3.28l2.18,-1.11l2.92,-0.5l1.09,-0.71l0.55,-1.02l0.15,-1.22l-0.37,-0.95l-0.7,-0.36l0.55,-1.35l1.21,-1.37l0.54,-1.66l1.7,-2.34l0.5,-1.58l1.13,-1.51l0.76,-1.79l4.55,-3.66l0.6,-1.37l-0.01,-1.26l-0.61,-1.07l0.23,-1.97l-0.32,-0.74l-1.34,-0.73l-2.61,0.11l-0.48,-0.19l-0.1,-0.51l4.76,-4.34l1.99,-1.08l3.13,-0.33l6.78,-1.67l1.46,0.26l1.76,-0.12l3.07,-0.78l3.35,0.02l3.91,1.85l0.58,-0.06l1.7,1.35l1.37,0.23l1.22,0.74l0.7,0.1l0.53,-0.55l0.9,-0.2l3.43,1.55l0.68,0.02l0.53,1.46l1.13,0.28l1.21,1.21l-0.23,1.29l1.31,0.91l1.03,1.41l1.33,4.47l1.4,2.18l0.09,1.43l0.69,0.57l0.23,1.91l0.73,2.23l2.84,3.84l0.26,1.27l-0.31,1.03l0.33,1.29l1.69,1.29l-0.63,2.16l0.49,1.84l1.34,1.43l2.23,1.04l1.9,0.12l3.44,-0.39l0.69,1.23l1.5,0.44l0.48,0.5l2.05,0.2l1.04,-0.33l0.28,0.55l1.11,0.51l2.6,2.84l1.28,0.86l2.66,0.35l0.27,0.48l-0.44,1.57l1.87,2.66l-0.63,1.79l0.12,1.26l0.95,1.05l0.8,2.01l0.48,0.35l2.6,-0.29l1.75,0.43l1.71,0.01l5.1,-0.34l0.97,-0.59l0.99,-1.59l1.3,-0.37l1.9,-1.17l2.51,0.05l2.79,-1.68l3.24,-0.92l1.8,0.44l0.68,0.74l-0.82,1.93l1.31,2.75l-1.38,1.91l-1.77,0.61l-1.07,1.16l0.13,1.79l-0.94,1.69l-0.37,2.24l-1.12,1.92l0.19,1.39l-0.26,1.0l-1.13,0.94l-0.42,1.75l-1.06,0.82l-0.49,2.38l-1.96,1.19l-0.56,1.69l-0.04,1.63l-0.95,0.67l-0.5,-0.19l-0.1,-0.71l-0.73,-0.85l-2.53,-0.96l-1.5,0.01l-1.59,0.8l-1.29,-0.76l-1.5,1.14l-1.57,2.05l-2.71,0.69l-0.86,0.69l-0.15,0.9l0.85,1.78l1.22,4.66l-0.58,3.36l0.06,1.87l0.53,0.57l0.03,0.49l-0.58,2.05l-0.7,1.11l-0.07,0.94l-4.14,1.05l-0.65,0.58l-0.03,0.7l-0.59,-0.73l-0.01,-1.18l-0.31,-0.41l-1.13,-0.73l-1.86,-0.14l-0.96,2.12l-0.46,2.74l-0.99,0.52l-0.82,-0.43l-1.06,0.26l-0.85,1.04l-0.2,0.87l-1.83,1.42l-4.49,0.11l-2.3,0.6l-0.07,1.14l1.87,2.53l-0.82,1.45l-0.79,-0.53l-2.49,0.07l-3.67,-0.8l-0.72,-1.27l-1.0,-0.87l-0.72,-0.04l-1.3,0.54l-1.1,0.89l-0.72,2.33l-3.69,4.02l-2.02,0.41l-2.24,1.77l-2.61,1.03l-0.65,0.71l-0.77,0.09l-3.8,3.18l-0.88,1.57l-1.07,0.65l-2.36,0.15l-0.71,-0.45l-0.52,0.08l-0.5,0.75l-1.65,0.2l-0.91,0.64l-1.3,0.1l-1.6,0.69l-3.78,2.06l-2.63,2.74l-0.86,0.47l-1.56,0.08l-0.33,0.43l0.11,0.72l-2.19,0.42l-0.92,0.53l-0.13,-0.29l-0.07,-0.57l4.01,-1.54l0.22,-0.52l-0.31,-0.79l1.22,-1.18l-0.06,-0.68l-0.47,-0.17l-3.25,0.2l-0.06,-0.93l1.74,-0.99l-0.29,-1.01l0.19,-0.48l2.16,-1.03l2.89,-3.56l0.71,-1.79l-1.18,-1.72l-1.96,-1.27l-0.15,-1.0l-0.5,-0.33l-0.86,1.13l-4.24,-0.41l-3.06,2.81l-2.15,3.11l-6.55,2.87l-1.62,1.4l-1.06,1.8l-0.29,1.35l-1.66,1.8l-2.61,0.05l-2.19,0.87l-0.95,-0.95l-1.18,-0.38l-1.31,0.31l-0.87,0.71l-1.75,3.93l0.04,0.86l0.74,1.75l0.99,1.17l1.99,1.17l3.96,0.77l1.87,-0.27l0.87,0.6l0.96,2.56l-0.66,0.56l-0.29,2.76l1.44,1.5l2.65,0.69l2.41,-0.26l1.17,-0.95l0.09,-0.91l3.1,-2.29l0.03,-0.55l2.97,-1.14l2.03,0.85l1.23,1.04l1.38,0.26l1.86,1.0l2.57,0.17l0.84,-0.7l0.59,0.59l1.26,0.44l1.79,-0.09l-0.29,0.5l0.08,0.95l-0.94,0.91l-0.01,0.5l0.48,0.56l-1.09,0.82l-1.15,-1.08l-1.81,-0.01l-6.7,3.02l-1.68,-0.21l-0.45,0.45l0.75,1.29l-0.79,-0.14l-0.62,0.55l-0.37,2.19l-1.61,0.56l-0.14,-1.17l-0.39,-0.27l-1.33,0.32l-0.74,0.8l0.02,0.46l0.97,1.03l-1.13,0.58l-0.68,1.11l-0.81,0.79l-1.15,0.53l-1.43,1.93l-0.66,0.44l-0.69,1.69l-1.07,1.0l-0.38,1.38l0.27,1.08l0.38,0.28l1.03,-0.01l1.65,1.37l2.88,1.15l2.1,1.34l1.78,5.33l2.69,5.12l0.01,3.15l1.12,0.84l2.52,1.12l0.31,0.31l0.11,1.46l0.69,0.76l1.93,1.05l0.68,1.25l0.04,0.49l-0.31,0.01l-3.09,-1.32l-2.66,-0.06l-1.4,-1.34l-2.11,-0.64l-3.93,1.47l0.15,0.72l1.17,0.25l2.43,-0.92l1.32,0.24l0.62,1.36l2.02,0.84l2.18,1.92l2.25,1.33l0.86,1.19l0.56,1.61l-3.15,0.91l-0.86,0.76l-2.29,1.14l-1.2,1.61l-2.92,-0.2l-1.6,0.91l-0.46,0.83l1.46,0.15l1.0,-0.36l1.22,1.3l2.19,-0.28l1.82,-1.1l1.07,0.13l2.4,2.39l2.18,0.81l-3.43,2.67l-0.11,0.47l0.43,0.23l1.38,-0.22l1.47,-0.89l-0.17,3.07l-1.0,-0.86l-1.54,0.12l-0.7,0.55l-0.3,0.5l0.27,0.6l1.37,0.93l-0.97,0.15l0.14,0.48l0.67,0.48l-1.27,1.36l0.88,2.44l-1.79,0.73l-0.3,-0.73l-1.02,-0.07l-0.61,0.52l-0.97,1.92l-1.31,0.12l-0.34,0.56l0.6,0.64l-1.69,2.36l0.04,1.5l-1.57,1.94l-0.86,0.57l-1.09,1.77l-0.4,1.67l-0.76,0.38l-0.45,-0.81l0.02,-0.72l-0.56,-0.43l-0.78,0.86l-0.61,-0.34l-0.62,0.35l0.39,1.4l1.15,0.72l0.58,1.26l-2.78,2.07l-2.21,-0.53l-0.42,0.18l0.03,0.46l1.09,1.3l1.33,0.19l1.18,-0.41l-0.7,2.87l0.55,1.27l-1.1,-0.57l-2.04,0.21l-0.33,0.69l0.86,1.11l-1.36,-0.12l-0.71,0.28l-0.47,0.66l0.03,1.46l-1.86,0.71l-0.31,0.44l0.55,0.71l-0.3,0.65l-2.35,0.26l-1.61,-0.4l-0.83,0.65l-0.15,0.55l-0.9,0.02l-0.35,0.45l0.13,0.53l0.5,0.44l0.87,0.1l0.09,0.53l-1.42,1.61l-0.81,0.11l-0.79,1.15l-1.32,0.28l-0.25,1.38l-0.67,-0.56l-1.52,1.02l-1.31,-0.48l-0.47,0.3l-0.34,1.39l-1.77,0.94l0.48,0.64l-1.03,0.52l-0.45,1.76l-1.73,-0.15l-0.55,0.62l-2.18,0.65l-1.7,-0.36l-0.59,0.23l-0.53,0.81l-2.2,-0.75l-2.07,1.04l-0.44,0.51l-0.39,-0.04l-0.21,-0.64l-0.71,-0.39l-0.84,0.55l-0.46,1.11l-1.09,-0.4l-0.68,0.36l-1.01,-0.14l-1.26,0.3l-2.13,-2.38l-0.23,-1.15l0.2,-0.62l-0.46,-0.57l-0.87,0.25l-0.56,0.37l-0.12,0.91l-0.62,0.17l-0.28,0.49l1.65,2.52l0.24,1.88l-0.75,0.82l-1.87,0.83l-0.33,-0.77l-0.67,-0.1l-0.7,0.91l-0.26,1.4l-1.03,-0.33l-1.55,1.19l-0.69,-0.45l-0.17,-0.81l-0.8,-0.23l-0.35,0.51l0.19,1.14l-0.28,0.19l-2.61,-0.83l-0.77,1.07l-0.81,0.08l-1.15,1.15l-1.48,0.18l-0.61,0.37l-2.15,-0.19l-0.49,0.72l-1.63,0.37l-1.41,1.26l-0.31,-0.01l-0.52,-0.93l-0.57,0.3l-0.23,1.14l-1.23,0.94l-0.45,1.17l0.53,0.96l1.17,0.14l-0.41,0.45l0.04,0.79l1.36,1.09l-0.39,0.78l-0.62,0.37l-1.52,0.22l-1.17,-0.21l0.5,-0.6l-0.12,-0.35l-0.9,-0.7l-0.38,-0.62l0.04,-0.8l-1.0,-1.46l0.15,-1.56l0.65,-1.38l1.11,-0.59l0.07,-0.82l-0.39,-0.44l-0.58,-0.02l-0.41,-0.47l-0.65,0.09l-0.66,-1.03l-0.75,-0.24l-0.42,0.45l0.13,0.95l-2.47,0.67l0.17,-0.72l-0.39,-0.5l-0.73,-0.33l-1.8,-0.04l-0.98,-0.95l0.02,-0.73l-0.49,-0.43l-0.85,-0.03l-0.41,0.4l0.28,1.81l-1.09,-0.56l-0.72,1.04l-1.76,0.38l-1.62,-1.11l-2.08,0.41l-0.94,-0.16l-0.4,-0.55l-1.64,-0.72l-0.67,-1.01l-2.21,-0.67l-0.05,-1.66l-0.85,-1.11l0.23,-1.03l0.85,-0.53l0.68,-1.22l-0.12,-0.55l-1.84,-1.05l-2.07,0.36l-0.61,-0.73l-1.03,-0.2l-1.55,0.41l-2.03,-1.1l-0.83,-1.24l-1.34,-0.95l-3.55,1.72l-0.4,0.52l-0.2,1.34l-0.59,0.51l-1.18,0.15l-1.14,0.75l-1.15,-0.81l-1.33,0.5l-0.71,1.62l-2.1,-1.83l-0.89,0.42l-0.34,0.84l-0.66,-0.95l-0.63,-0.28l-2.47,2.5l-0.96,-1.02l-2.81,-1.34l-0.72,0.28l-1.91,2.51l-0.8,-0.35l-1.25,0.29l-0.63,-0.68l-0.72,0.09l-1.52,2.27l0.6,2.11l0.99,1.28l-0.12,3.86l0.49,0.66l-0.21,0.19l-1.25,-0.61l-1.95,0.36l-0.72,-3.85l-0.68,-0.58l-2.1,0.82l-1.69,1.42l-1.7,-0.24l-1.38,0.2l-0.21,-1.14l-1.18,-0.84l0.08,-1.61l-0.3,-0.58l-2.69,-0.64l-2.81,-0.24l1.23,-2.56l0.32,-2.41l0.95,-1.33l-0.39,-0.85l-0.53,-0.32l-3.83,-0.86l0.06,-1.37l-0.58,-1.01l0.2,-0.92l-1.13,-2.02l1.18,-1.77l-0.43,-0.41l-1.68,0.35l-0.79,-0.3l-2.18,0.04l-1.61,0.4l-2.81,1.32l0.84,-1.22l0.22,-0.96l-0.41,-1.54l-0.9,-0.73l-0.01,-0.93l0.33,-0.93l1.19,-0.86l-0.14,-1.39l0.61,-1.38l0.71,0.03l0.73,-0.48l0.79,-1.13l0.31,-1.17l1.26,-0.02l1.09,-1.65l1.23,-0.37l0.32,-0.55l-0.67,-1.69l0.86,-0.76l0.43,-4.22l-0.66,-7.13l-1.8,-1.02l-0.57,0.17l-0.4,0.7l-1.44,-4.65l-1.61,-1.77l-0.96,-0.11l-0.91,-1.15l-1.37,0.09l-1.35,2.06l-1.61,-1.06l-0.9,0.21l-1.36,-0.21l-1.36,-0.76l-1.94,0.67l0.2,-0.69l1.76,-1.77l0.1,-0.45l-1.17,-2.46l-1.06,0.09l-1.05,0.71l-0.08,-0.57l1.44,-0.92l0.25,-0.5l-0.29,-0.57l-0.99,-0.04l-1.3,-1.5l-1.5,0.45l-2.8,1.52l-0.86,1.33l-4.2,-1.08l-0.75,-0.94l-0.89,-0.16l-2.52,1.41l-1.3,1.3l-0.57,0.11l-1.02,1.34l-1.01,0.57l-3.9,0.88l-1.06,1.91l-3.46,2.48l0.09,1.15l-1.65,0.89l-1.35,-0.09l-1.97,0.85l-2.08,-0.24l-0.06,-1.23l-2.85,-1.31l-0.73,0.08l-1.25,0.75l-2.26,-0.8l-2.52,-0.06l0.13,-0.91l-0.36,-0.43l-1.9,-0.49l-1.67,0.07l-3.31,1.99l-2.43,2.86l-0.47,0.99l-1.06,0.94l-0.36,0.83l-0.47,-0.95l0.7,-3.01l-0.46,-1.27l-1.45,-0.74l-3.94,1.17l-0.48,0.51l-1.46,-0.05l-1.76,0.57l-3.44,-0.17l-0.89,-0.71l-1.94,-0.74l-0.44,-0.54l-0.79,-0.17l-0.62,0.16l-0.51,1.14l-0.41,0.1l-1.18,-0.63l-0.68,-0.79l-0.42,-0.01l-0.64,0.58l-0.21,0.98l-0.87,-1.65l-1.27,-1.21l-4.14,-0.33l0.41,-1.76l-0.28,-0.52l-0.91,-0.15l-1.8,0.4l-4.06,-2.75l-1.11,-2.6l-1.55,-0.5l-2.33,0.75l-3.12,-3.41l-2.3,-0.61l-2.71,-2.08l-2.01,-1.02l-1.48,-2.22l-3.04,-0.5l-1.83,0.42l-1.42,2.12l-0.6,0.33l-0.93,-1.59l-2.82,-1.74l-2.92,-0.99l0.03,-1.27l-0.49,-0.51l-0.64,-0.03l-2.05,-1.46l-1.84,0.08l-1.16,-0.84l-2.21,-2.86l-0.78,-0.2l-0.62,0.71l-1.06,0.34l-0.1,-1.14l0.46,-0.91l-0.04,-0.48l-0.73,-0.9l0.3,-1.79l-1.83,-2.23l-0.67,-2.27l1.73,-0.24l0.39,0.91l1.42,1.02l1.21,-0.27l1.4,-1.33l-0.13,-3.73l-0.73,-0.85l0.2,-1.15l-2.48,-2.76l-0.55,-4.19l1.72,-1.52l0.09,-0.95l-0.44,-0.7l-1.95,-1.37l-2.81,-1.04l-1.98,-4.96l0.26,-1.64l-0.3,-0.58l-1.28,0.21l-0.77,-0.36l-2.5,0.16l-2.61,-0.64l-3.32,-1.46l-0.35,-0.26l-0.07,-0.79l-0.48,-0.35l-2.59,0.64l-0.62,-1.33l-1.12,-0.49l0.45,-0.83l0.03,-1.94l-0.34,-1.28l-0.81,-1.23l-1.46,-0.87l-1.58,0.1l-0.77,-1.56l-2.25,-0.65l-1.24,0.26l-1.4,-0.66l-1.17,0.05l-0.72,-0.59ZM784.71,123.62l0.4,0.07l0.21,0.23l-0.36,-0.13l-0.25,-0.17ZM723.42,232.07l-1.54,-0.41l-0.17,-0.27l0.52,0.01l1.19,0.67ZM716.28,217.72l0.89,0.27l0.35,0.57l1.35,0.76l-2.09,-1.02l-0.5,-0.58ZM715.46,247.46l0.02,-0.03l0.0,0.02l-0.02,0.01ZM704.67,268.77l-0.0,-0.09l0.08,-0.21l0.02,0.22l-0.1,0.07ZM704.8,268.19l-0.02,-0.24l-0.07,-0.11l0.19,0.14l-0.1,0.2ZM626.1,313.41l0.45,-0.31l1.5,-0.02l0.99,-0.61l1.85,0.16l1.43,-0.24l0.73,-0.47l0.93,0.1l0.73,0.49l0.25,-0.45l0.9,0.43l0.57,-0.36l0.13,-0.8l1.76,1.26l0.46,1.85l-1.34,0.72l-1.36,2.07l-0.57,1.05l-0.86,3.16l-2.89,1.77l-0.1,0.61l-1.5,0.17l-1.06,1.16l-1.01,0.2l-3.6,-1.12l-2.23,-1.17l-0.45,-2.39l0.16,-3.13l4.5,-3.46l0.1,-0.45l-0.47,-0.24Z", "name": "China"}, "AF": {"path": "M263.13,194.66l1.33,-0.91l1.1,-1.84l0.56,-2.35l-0.33,-1.15l0.64,-0.51l0.68,-2.24l2.02,1.52l2.71,-0.08l1.58,1.21l0.79,1.07l1.38,-0.62l1.85,-0.09l2.97,-1.9l0.83,-2.18l-0.38,-0.98l1.1,-0.05l4.17,-1.31l1.19,-0.03l0.71,-0.9l1.92,-0.94l1.23,-1.03l2.34,-6.82l1.81,-0.8l3.41,-0.11l1.57,-2.69l2.48,1.27l2.72,0.6l2.73,-0.22l1.64,0.29l0.86,0.78l1.11,0.31l1.4,-0.46l1.44,0.32l0.85,1.3l0.93,0.79l0.99,0.28l1.84,-0.67l0.82,-0.97l2.16,-1.04l1.07,-0.09l0.54,-0.51l2.73,1.92l1.42,-1.18l-0.1,-1.72l0.51,-0.98l2.24,-0.43l2.22,0.57l0.76,-0.4l0.65,-1.03l-0.33,-2.03l1.5,-1.31l1.47,-2.23l0.78,-0.67l0.88,-0.24l1.13,0.29l1.38,0.87l0.46,0.95l-0.35,1.35l0.2,1.16l0.51,0.18l1.53,-0.27l-1.09,6.68l0.76,2.5l0.5,0.96l0.78,0.52l1.31,-0.02l4.09,-2.44l2.19,-0.39l1.93,-2.11l3.52,-1.63l2.11,0.32l-0.71,0.81l0.06,0.5l1.16,0.37l3.23,-0.85l0.78,-0.74l3.04,0.38l-2.53,1.09l-0.19,0.6l0.87,0.8l-3.12,1.43l-1.91,-0.55l-8.59,0.51l-3.63,1.14l-2.93,2.3l-1.2,0.04l-2.87,2.67l-0.48,0.82l0.3,0.78l1.32,1.02l1.26,2.8l0.16,0.92l-0.39,1.09l0.52,0.89l-1.08,1.56l-1.15,0.81l-2.41,2.82l-0.1,0.83l0.86,1.05l-0.03,1.85l-0.18,0.37l-2.73,0.74l-2.35,-0.07l-2.43,-0.75l-1.31,0.69l-0.06,1.27l1.94,2.25l1.04,1.99l-0.09,0.34l-2.33,1.35l-2.61,0.41l-0.64,0.44l-0.88,3.06l-1.19,2.0l0.24,4.16l-0.58,0.69l-0.74,0.79l-1.38,0.76l-1.78,-1.33l-1.45,0.33l-2.07,-0.39l-1.26,1.1l-3.3,1.43l0.0,0.89l0.73,0.66l-0.53,0.31l-2.14,0.46l-1.14,-0.18l-0.79,-0.49l-1.68,0.34l-1.85,2.08l-1.41,0.83l-0.55,1.09l-0.47,1.65l0.12,2.44l-0.5,1.81l0.43,1.28l-0.65,0.55l-7.99,2.23l-4.32,-0.04l-1.96,0.48l-1.27,0.86l-3.88,-0.8l-8.12,0.73l-11.54,-3.48l6.64,-7.54l0.32,-2.24l-0.46,-1.86l-1.04,-1.1l-5.98,-0.83l-0.21,-2.89l0.3,-3.19l-1.99,-7.16l2.65,-3.31l-0.38,-0.57l-2.37,-0.37l-0.45,-0.7l0.29,-1.15l-0.29,-1.99l0.97,-1.49l1.66,-0.09l0.29,-0.64l-0.98,-1.34Z", "name": "Afghanistan"}, "IQ": {"path": "M125.37,172.77l1.95,-1.22l0.78,-0.94l1.16,0.37l1.24,-0.35l4.35,1.19l1.2,0.03l1.46,-0.77l0.5,0.07l0.44,0.53l0.09,1.72l0.79,0.56l2.58,-1.7l0.69,0.07l0.9,2.88l1.07,0.96l0.23,1.88l0.57,0.71l0.86,0.33l1.15,3.11l1.42,0.29l1.68,1.36l3.14,0.13l-1.41,0.56l-0.54,1.37l0.08,0.71l0.99,1.29l0.2,1.22l-1.54,0.83l-1.82,1.95l-0.25,1.77l-0.74,-0.06l-0.45,0.37l-0.45,1.3l0.76,1.82l-1.02,2.28l2.56,3.1l1.08,-0.0l-0.11,0.57l0.29,0.52l0.85,0.46l0.87,1.45l-0.48,1.1l0.35,1.36l2.11,0.33l5.49,3.81l1.79,0.29l1.01,2.18l2.3,2.86l-1.06,3.07l-0.02,3.42l0.38,0.4l2.1,0.09l0.03,3.94l1.72,1.49l0.78,0.29l0.81,2.06l-1.95,-0.76l-1.42,0.35l-2.08,-0.8l-2.62,0.13l-0.97,0.37l-0.93,0.76l-1.6,3.52l-2.66,3.43l-1.13,0.23l-12.17,-1.05l-19.68,-15.44l-12.8,-7.12l-8.45,-1.44l0.59,-0.87l-0.34,-0.89l-0.45,-0.25l-1.2,0.28l-0.2,-0.63l0.45,-0.55l-2.04,-7.04l14.03,-7.89l1.79,-0.45l0.56,-0.45l1.68,-3.13l0.16,-4.4l1.03,-3.03l-0.03,-1.6l-0.78,-2.18l0.35,-2.43l0.73,-0.93l2.85,-0.77l4.37,-4.38Z", "name": "Iraq"}, "JP": {"path": "M869.1,98.66l1.75,-0.84l3.26,3.32l3.55,4.25l6.71,5.04l2.54,0.27l2.9,1.4l1.9,0.2l1.33,-0.56l3.0,-2.78l-1.69,3.31l-0.21,1.25l1.8,4.23l1.68,0.42l-1.41,0.23l-3.12,1.57l-2.16,0.49l-3.23,-0.24l-1.9,0.92l-2.95,2.59l-1.18,1.68l-1.26,3.56l-5.13,-2.24l-4.91,-2.89l-3.56,0.24l-3.12,1.79l-1.8,-1.77l-2.05,-0.12l-1.27,1.37l-0.29,0.99l0.17,0.69l1.58,1.52l1.6,0.19l2.73,2.36l-1.19,0.22l-2.17,-0.56l-1.32,1.32l-0.75,1.34l-1.78,0.69l-0.46,-0.91l0.82,-3.12l-0.47,-1.54l-1.58,-1.77l0.18,-2.51l0.16,-0.42l2.41,-1.29l1.69,-1.6l0.38,-1.25l-0.63,-1.01l-0.05,-0.81l0.91,0.01l1.81,0.98l2.53,0.25l1.29,-0.2l0.83,-0.99l0.3,-1.08l-0.11,-2.27l1.83,-3.39l0.14,-2.29l0.75,-2.08l0.15,-2.27l-0.5,-2.16l-0.97,-1.91l0.52,-1.84ZM797.15,199.72l-2.57,-1.61l-2.21,0.27l-1.69,0.57l-1.02,-0.53l-1.02,0.12l-0.16,-1.76l0.63,-0.77l2.7,-0.24l1.86,-1.68l1.91,-0.98l3.04,-2.52l2.67,-2.39l0.63,-0.98l1.51,-0.69l2.29,-0.37l1.09,0.82l1.69,-0.43l2.79,0.03l1.83,-0.29l1.79,-0.74l3.12,-0.29l2.19,-0.7l0.26,0.06l-0.18,1.1l0.85,0.68l2.74,0.22l1.11,-0.42l2.39,-1.97l-0.57,-2.1l0.4,-0.94l2.14,-2.04l2.55,-3.28l0.45,-1.95l-0.2,-2.13l0.78,-1.34l3.05,-1.07l-1.26,1.28l-1.65,0.92l-0.36,0.67l0.73,1.13l0.3,1.76l0.95,0.6l1.0,0.19l1.03,-0.3l1.18,-1.46l6.0,-2.29l1.79,-1.56l1.26,-1.52l1.25,-2.38l2.64,-1.4l1.29,-1.28l0.94,-3.21l2.1,-3.3l0.85,-3.08l0.92,-1.59l0.24,-1.99l-0.07,-1.16l-0.49,-1.08l-0.5,-0.42l-0.89,-0.06l0.74,-0.65l0.81,-2.26l-0.66,-2.93l0.62,-0.94l1.24,-0.36l0.75,-0.77l0.52,-1.54l-0.08,-1.59l1.48,0.12l0.32,2.43l0.68,0.84l0.91,-0.09l0.69,-0.8l1.64,0.42l0.94,-1.16l0.28,-1.02l-0.12,-1.08l-0.8,-0.68l-2.52,0.82l0.41,-1.91l0.27,-0.42l2.22,1.27l1.07,-0.21l-0.29,2.18l0.24,3.4l0.32,1.16l1.4,1.26l1.05,1.5l1.42,4.28l-0.1,3.09l-0.56,2.58l-1.66,1.14l-0.97,2.0l-0.54,2.99l-2.66,0.62l-1.2,1.82l-0.27,1.84l0.81,4.19l-0.25,2.97l-0.22,0.85l-1.25,1.25l-0.55,1.12l-0.77,1.97l-0.42,2.39l0.41,1.75l1.51,2.46l-1.28,0.42l-1.4,1.32l-0.76,2.79l-3.37,2.17l0.16,-2.7l1.76,-1.96l0.18,-0.57l-0.98,-1.12l-0.81,-0.07l-0.86,0.22l-0.46,0.57l-0.11,0.87l-0.77,0.64l0.28,2.04l-1.35,-1.19l-1.76,0.18l-0.84,0.66l-0.47,1.16l-0.21,2.14l-1.23,1.57l-0.41,-0.3l0.29,-2.03l0.55,-0.31l0.08,-0.64l-1.53,-0.93l-1.49,0.44l-2.44,3.02l-0.4,0.92l-2.16,-0.39l-4.01,0.1l0.08,-0.5l-0.5,-0.63l-1.57,0.08l-0.59,-0.56l-0.49,0.08l0.01,-1.77l-1.08,-0.14l-1.03,0.73l-1.2,2.64l0.69,1.14l1.89,1.24l-0.11,0.44l-2.17,0.49l-1.78,0.83l-3.03,5.07l-1.4,0.53l-1.55,-0.48l-2.28,-3.54l-0.16,-2.19l1.06,-0.6l0.93,-1.05l0.29,-0.62l-0.14,-0.95l-0.68,-0.38l-2.31,0.19l-2.27,-1.13l-3.88,0.47l-2.11,1.59l-3.9,0.79l-2.17,1.03l-0.97,-0.18l-2.53,0.68l-1.6,-0.83l-1.15,0.19l-0.84,1.15l-0.63,2.77ZM865.75,100.56l-0.16,0.02l-0.34,-0.3l0.21,-0.05l0.29,0.33ZM852.34,128.05l-0.01,-0.06l0.07,-0.12l-0.06,0.17ZM843.87,165.83l0.27,-1.03l-0.54,-0.64l0.99,-1.22l-0.26,1.06l0.73,0.5l-0.33,0.78l-0.86,0.54ZM817.81,195.39l0.11,0.97l-0.91,0.42l-0.18,-0.21l0.98,-1.19ZM799.43,203.31l2.14,-1.59l1.03,-2.45l0.92,-0.71l1.41,1.39l3.48,-0.79l0.56,-0.72l0.01,-1.08l2.1,-0.96l0.82,-0.08l3.06,1.19l0.79,-0.04l0.42,2.93l-2.28,1.59l-1.02,1.44l-0.37,1.1l-1.12,-1.23l-0.91,-0.46l-2.01,-0.15l-2.79,1.49l-1.02,2.25l-0.9,0.74l-0.38,1.27l-0.61,0.55l-0.91,-0.13l0.24,-0.55l-0.3,-0.55l-1.28,-0.14l-0.37,-0.85l0.5,-1.92l-0.78,-0.48l0.04,-0.61l-0.46,-0.44ZM806.3,180.01l-0.4,0.05l-0.11,-0.36l0.22,-0.13l0.29,0.44ZM779.3,207.59l0.61,0.97l1.43,0.4l0.37,-0.57l-0.55,-1.19l-2.44,-2.04l0.11,-0.44l1.3,0.29l0.51,-0.3l-0.03,-0.87l1.56,-0.56l0.61,-0.58l1.53,-0.34l1.02,-1.74l1.24,-0.61l1.69,0.3l0.71,1.52l1.14,0.82l1.52,0.28l1.66,-0.66l0.51,0.26l0.05,0.4l-1.27,1.89l0.29,0.6l2.08,0.18l-0.1,0.69l0.71,0.75l-0.05,0.84l0.5,0.31l-1.93,2.27l-0.62,1.2l-1.5,4.83l-0.01,1.79l-0.79,1.89l-1.25,-0.29l-0.84,0.25l-0.28,0.85l0.34,0.72l-1.19,0.96l-0.58,0.29l0.35,-1.29l-0.62,-2.27l0.59,-0.38l0.08,-0.63l-0.47,-0.69l-1.31,0.06l-0.77,1.34l-0.24,1.11l0.7,1.77l-2.46,-0.77l-0.16,-0.39l0.94,-0.5l0.22,-1.32l-0.96,-1.54l0.01,-2.43l0.83,-0.31l0.6,-0.67l1.88,-3.4l-0.33,-0.56l-0.48,-0.05l0.3,-0.59l-0.17,-0.81l-1.26,-2.24l-1.27,-0.93l-1.28,0.67l0.23,2.45l0.36,0.37l0.9,-0.08l-0.06,0.75l-1.61,-0.78l-1.42,0.81l-1.2,-2.07ZM788.9,226.85l0.01,-0.11l0.07,-0.14l-0.02,0.14l-0.05,0.1ZM785.8,229.65l-0.74,0.03l-0.25,-0.58l0.36,-0.28l0.79,0.45l-0.17,0.38ZM781.9,213.3l-0.19,-0.64l0.25,-1.01l0.49,-0.07l0.06,1.08l-0.6,0.64ZM776.05,246.41l0.46,-0.51l1.07,-0.27l-0.66,0.48l-0.27,0.75l-0.59,-0.45ZM776.4,195.67l0.0,0.07l-0.02,-0.02l0.02,-0.04ZM776.72,194.79l0.02,-0.76l0.3,-0.22l0.03,0.45l-0.35,0.53ZM775.75,197.51l0.11,-0.75l0.18,0.13l-0.28,0.62ZM774.64,207.53l0.05,-0.12l0.05,0.07l-0.1,0.05ZM773.52,250.21l0.09,0.15l-0.02,0.05l-0.05,-0.02l-0.03,-0.18ZM771.75,209.72l0.65,-0.12l0.16,0.27l-0.66,0.42l-0.16,-0.58ZM764.44,262.78l0.09,0.4l-0.31,0.21l0.02,-0.29l0.2,-0.32ZM764.79,261.99l0.01,-0.59l0.25,-0.07l0.06,0.35l-0.31,0.3ZM766.32,260.11l-0.04,-0.54l0.94,0.06l-0.09,0.16l-0.81,0.33ZM767.58,259.28l0.76,-0.83l0.14,-0.26l-0.37,0.82l-0.53,0.27ZM737.71,277.3l0.12,0.01l0.12,-0.02l-0.11,0.13l-0.12,-0.12ZM734.91,277.92l0.11,-0.19l0.44,0.15l-0.29,0.11l-0.26,-0.06Z", "name": "Japan"}, "IR": {"path": "M137.98,152.91l1.82,0.03l0.6,-0.28l0.67,-2.32l0.59,-0.59l1.55,0.95l2.35,3.38l2.65,2.25l5.45,1.21l1.03,-0.36l1.99,-0.04l2.17,-2.07l1.11,-0.37l1.44,-1.36l4.32,-2.67l1.33,-0.27l2.06,2.03l-1.19,0.63l-0.3,0.88l0.19,0.73l1.15,0.75l0.06,0.33l-1.67,0.54l-0.47,0.49l0.0,0.74l2.41,2.2l0.82,0.23l1.45,1.6l1.81,-0.16l0.68,4.4l1.03,2.14l2.34,1.36l5.61,0.96l1.48,2.17l4.46,2.95l1.55,0.63l4.82,1.1l3.39,-0.06l10.69,-2.45l0.21,0.44l0.67,0.3l1.71,0.03l0.55,-0.35l0.21,-0.71l-0.72,-3.44l1.67,0.06l3.89,-1.22l0.54,-0.48l1.08,-2.26l3.46,-2.28l1.38,-0.39l4.89,0.22l0.66,-0.25l0.51,-1.1l2.06,-0.24l1.77,0.38l2.05,-0.02l0.63,0.56l0.52,1.51l4.7,1.24l2.54,1.59l3.86,-0.27l3.36,1.38l0.49,1.51l0.66,0.7l4.56,2.51l2.11,2.82l5.87,0.06l0.51,3.54l-0.43,1.67l0.74,1.14l-0.1,1.69l0.31,1.07l-0.64,1.6l-0.71,0.64l0.34,1.44l-0.5,1.97l-0.93,1.56l-1.67,1.22l0.81,1.48l-1.39,0.22l-1.2,1.82l0.15,4.16l1.31,0.92l1.52,0.1l-2.39,2.82l-0.07,0.91l2.0,6.8l-0.31,3.03l0.25,3.24l0.59,0.43l5.89,0.81l0.55,0.62l0.38,2.82l-0.16,0.53l-6.99,7.93l0.0,0.53l3.52,3.93l0.14,0.86l2.14,3.86l2.05,2.06l3.58,1.15l1.47,1.37l1.37,-0.01l-0.16,1.7l0.53,3.99l-0.38,2.1l0.61,0.45l0.9,0.12l1.9,-0.26l0.6,0.48l-0.4,0.47l0.03,1.5l-0.45,0.44l-0.12,1.22l-2.53,-0.02l-2.68,0.69l-1.06,0.62l-0.58,0.96l-0.53,-0.06l-2.39,1.21l-0.42,0.76l-0.4,2.49l-0.69,0.76l-0.48,4.16l-1.09,0.73l-5.32,-1.37l-0.4,-0.8l-0.83,-0.45l-1.11,0.94l-2.58,-0.53l-0.97,0.15l-2.07,-0.31l-1.4,-0.61l-2.88,0.49l-1.9,-1.09l-4.44,-0.29l-1.86,-0.74l-1.13,0.19l-0.55,-0.51l-2.79,-0.5l-0.83,-1.7l-0.06,-1.04l-0.7,-1.65l-0.54,-3.52l-1.01,-1.66l-1.57,-1.19l-2.93,-0.59l-1.84,0.47l-1.36,0.86l-2.28,0.55l-1.54,1.56l-1.04,-0.07l-3.01,1.85l-1.55,0.34l-3.03,-1.5l-1.33,-0.29l-2.66,0.07l-1.33,-0.91l-0.5,-0.81l-3.55,-1.61l-2.09,-1.4l-0.66,-1.36l-1.1,-1.09l-2.08,-0.8l-1.34,-0.91l-2.73,-0.17l-0.9,-0.43l-1.66,-1.66l-0.08,-0.75l-1.31,-2.27l-0.3,-1.86l-1.47,-1.22l-0.02,-1.62l-1.45,-0.7l-0.17,-2.14l-3.57,-4.08l-1.03,-2.45l-0.88,-0.06l-2.97,1.37l-3.63,-2.19l0.69,0.2l0.8,-0.36l0.15,-0.46l-0.39,-0.73l-1.84,-0.31l-0.29,0.69l-0.72,0.48l-0.21,0.77l0.19,1.5l-0.24,0.32l-1.22,0.16l-0.84,0.51l-0.58,-0.43l-0.21,-1.14l-0.59,-0.91l-2.27,-1.56l-0.03,-3.98l-0.38,-0.4l-2.1,-0.09l0.0,-2.84l1.05,-3.56l-2.38,-2.97l-1.03,-2.21l-0.83,-0.6l-1.27,0.02l-5.5,-3.8l-1.96,-0.28l0.44,-1.85l-1.0,-1.8l-0.91,-0.72l-0.27,-1.04l-1.1,-0.07l-2.2,-2.72l0.96,-1.89l-0.74,-1.81l0.4,-0.91l1.01,-0.19l0.31,-1.89l1.71,-1.83l1.74,-1.07l0.13,-0.86l-0.38,-1.15l-0.94,-1.18l0.13,-0.84l0.21,-0.37l1.58,-0.58l0.3,-0.49l-0.2,-0.48l-0.95,-0.45l-3.11,-0.08l-1.23,-1.19l-1.38,-0.31l-0.92,-2.84l-1.37,-0.93l-0.23,-1.89l-1.06,-0.97l-0.82,-2.74l0.21,-1.31l-1.65,-1.47l-0.19,-1.57l0.23,-0.78l-1.97,-1.48l-0.74,-0.13l1.74,-3.57l-0.44,-0.59l-0.74,-0.15l-0.16,-3.61l-0.8,-1.09l0.1,-1.67l-0.76,-0.8l-0.29,-1.01ZM225.11,258.62l0.64,-0.41l0.16,-0.69l0.73,0.1l1.56,-0.62l-1.41,1.46l-0.78,-0.16l-0.9,0.32Z", "name": "Iran"}, "AM": {"path": "M133.7,137.72l5.31,-0.87l4.6,0.01l0.35,-0.5l0.62,-0.08l0.81,0.74l-1.29,0.59l0.3,0.87l0.61,0.07l0.36,-0.45l2.27,0.69l1.11,1.07l-1.31,0.9l-0.18,1.02l1.58,2.09l2.78,1.54l-0.52,1.31l-1.74,0.0l-0.63,0.66l4.82,3.73l1.1,-0.1l0.87,0.4l-0.9,0.95l0.15,0.5l1.2,1.02l-0.8,0.03l-0.28,0.45l0.61,0.92l0.05,1.15l-2.11,0.32l-1.07,-2.31l0.02,-0.85l-1.37,-0.97l0.06,-1.45l-0.44,-0.43l-0.76,-0.06l-1.65,0.57l-1.24,-0.74l-0.65,-0.01l-0.29,-0.86l-0.79,-0.69l-1.99,0.45l-1.49,-1.5l-2.11,-1.4l-2.29,0.19l-1.95,-0.72l-0.84,-2.96l0.94,-1.34l0.1,-0.93l-0.76,-2.01l-1.14,-1.0Z", "name": "Armenia"}, "SY": {"path": "M76.3,209.24l0.78,-1.3l-0.28,-1.24l0.26,-0.62l-0.51,-1.46l0.2,-0.69l1.24,-1.34l-0.07,-0.47l-0.54,-0.44l0.11,-0.31l0.73,-0.65l2.14,-0.14l0.12,-0.49l-0.59,-0.51l1.79,-1.52l0.45,-1.13l-0.6,-1.78l-1.0,-0.69l0.39,-0.45l-0.39,-0.91l-0.84,-0.28l-0.58,0.38l-1.63,0.02l-0.56,-2.32l0.4,-2.21l-0.29,-1.85l-0.99,-1.32l0.72,-2.42l1.8,0.68l0.65,-1.04l1.15,-0.75l0.19,-1.28l1.65,-0.36l0.34,-0.34l-0.72,-2.03l0.63,-2.49l1.73,0.32l1.19,0.96l2.75,0.08l5.74,-2.21l1.65,0.3l2.47,1.47l4.61,0.11l4.99,-1.25l5.14,-2.33l4.7,0.24l4.18,-0.76l1.3,-0.43l0.93,-0.75l0.49,0.36l0.27,1.06l-1.9,1.93l-2.13,1.89l-2.86,0.78l-1.02,1.32l-0.39,2.74l0.81,2.35l0.01,1.26l-1.03,3.02l-0.16,4.36l-1.75,2.99l-1.84,0.48l-14.35,8.07l-14.53,8.74l-3.06,-0.53l-1.12,-0.87l-1.17,-0.34l-0.76,-1.06l-1.01,-0.56Z", "name": "Syria"}, "VN": {"path": "M576.93,298.51l-0.51,-1.64l-0.78,-0.54l-2.47,-2.91l1.98,-2.57l2.48,1.12l1.27,1.17l1.55,-0.8l1.17,-1.62l1.09,1.31l0.65,-0.23l0.5,-1.12l1.92,1.68l0.6,0.06l0.44,-0.27l0.57,-1.49l0.49,-0.28l1.54,0.77l1.39,-0.82l1.27,-0.19l0.96,-0.95l0.37,-1.53l2.86,-1.51l1.3,1.08l0.6,0.99l2.08,1.11l2.44,-0.29l0.92,0.86l2.07,-0.36l1.29,0.73l-0.37,0.74l-0.94,0.61l-0.37,1.51l0.14,0.59l0.74,0.75l0.07,2.04l2.56,0.79l0.53,0.89l0.93,0.65l0.72,0.11l0.48,0.65l1.26,0.24l2.14,-0.43l0.58,0.42l-3.39,1.7l-0.6,1.9l-1.14,0.67l-0.66,-0.37l-1.43,0.37l-1.44,-0.38l-0.4,0.33l0.48,2.03l-1.38,1.48l0.04,1.26l-0.31,0.6l-2.5,2.19l-0.82,0.09l-0.73,0.54l-1.27,2.74l-0.21,2.38l-1.13,1.84l-0.08,0.98l2.05,3.67l4.39,4.08l-0.15,1.1l-0.77,0.02l0.12,0.62l1.13,0.7l1.67,2.29l2.79,2.32l0.58,1.32l2.52,1.78l2.47,2.7l1.33,-0.09l1.66,1.84l2.36,3.76l1.82,1.62l0.84,2.77l1.06,2.16l0.03,1.23l1.48,4.85l-0.3,0.38l0.19,4.34l1.14,2.62l-0.02,1.22l-0.47,-0.11l-0.95,0.87l0.34,1.63l-0.52,0.39l0.13,2.81l-0.5,1.52l0.29,0.85l-0.32,0.62l-0.86,0.38l-0.33,1.65l-1.2,0.23l-3.99,2.79l-1.28,0.28l-0.85,1.36l-1.1,0.17l-4.12,2.16l-1.15,-0.64l-0.46,-1.04l-0.71,-0.02l-0.4,1.85l-1.03,-0.97l-0.51,-0.09l-0.91,0.54l-0.19,0.4l0.3,0.33l0.82,0.08l0.14,0.43l-1.8,-0.07l-0.52,0.39l0.22,0.41l2.1,0.89l-0.78,0.82l-0.25,0.82l-3.09,-2.61l-0.52,-0.02l-0.09,0.51l0.35,0.6l2.45,2.47l0.4,0.99l-0.92,0.37l-3.22,-2.94l-0.84,-0.39l-0.48,0.13l0.02,0.49l2.41,3.01l0.28,0.55l-0.16,0.45l-4.87,2.23l-1.49,2.3l-1.45,1.2l-1.48,0.31l0.36,-0.57l-0.07,-0.58l-0.42,-0.3l0.2,-5.8l0.38,-1.4l1.47,-0.88l-0.07,-0.82l-0.63,-0.81l-1.13,-0.38l-0.44,-0.54l-1.28,0.05l-1.11,-1.3l0.48,-0.48l2.26,-0.26l1.53,-1.37l-0.09,-1.32l1.55,0.42l0.51,-0.11l0.48,-0.65l2.3,-0.3l0.84,0.96l0.69,-0.1l1.72,0.63l0.4,-0.5l-0.03,-1.85l-2.26,-1.96l-0.13,-2.15l0.54,-0.17l0.52,-0.66l2.19,0.55l0.8,-0.12l0.28,-1.97l1.77,-0.16l0.63,-0.58l1.29,-0.26l2.0,-1.65l0.57,-0.1l0.87,0.38l0.99,-0.95l0.4,-1.53l-0.59,-3.65l0.97,-3.21l-2.04,-5.21l0.23,-1.67l0.6,-0.64l0.66,-1.54l-0.36,-2.67l1.06,-1.4l0.15,-0.9l-0.78,-1.17l-2.07,-1.68l-0.7,-1.11l1.52,-0.9l0.14,-1.1l-3.61,-2.58l-0.66,-1.29l-1.33,0.28l-0.77,-1.14l-0.47,-2.49l-1.68,-1.97l-2.01,-1.57l-2.31,-2.43l-0.76,-1.89l-0.98,-1.33l-1.09,-0.41l-1.47,-1.51l0.18,-1.98l-3.34,-1.26l-4.49,-3.01l-1.41,-0.59l1.2,-1.11l-0.22,-1.32l1.3,-0.05l2.58,0.51l1.41,-1.22l1.32,-1.98l0.14,-0.79l-0.44,-0.98l-0.67,-0.44l-0.82,0.04l-0.47,-1.14l-1.38,-0.48l1.04,-0.77l0.02,-0.94l-1.79,-1.39l-1.94,-1.01l-1.95,0.68l-1.62,1.22l-3.75,-1.41l-1.74,-2.66l0.78,-2.71l-0.18,-0.78l-1.48,-1.06l-0.68,1.05ZM612.85,302.64l0.02,-0.06l0.03,0.02l-0.05,0.04ZM586.24,386.06l0.57,-0.22l-0.01,1.11l-0.18,-0.47l-0.38,-0.42Z", "name": "Vietnam"}, "GE": {"path": "M119.33,133.54l1.55,-2.34l0.06,-1.52l-2.13,-6.46l-0.7,-0.85l-2.04,-0.77l-0.55,-0.94l-1.69,-1.2l-2.83,-0.77l-3.29,-2.29l0.5,-0.74l2.93,0.42l1.01,-0.17l3.16,1.41l2.05,0.38l1.79,1.06l3.52,0.26l2.68,-0.31l1.23,0.63l1.39,-0.12l1.41,0.57l0.93,1.03l5.02,2.11l-0.32,1.13l0.82,0.54l1.12,0.07l4.19,-1.65l1.05,0.25l0.55,0.78l0.68,-0.05l0.49,-0.97l1.9,0.63l1.55,1.34l2.19,0.09l0.23,0.11l-0.65,2.11l0.22,0.56l2.45,1.57l1.94,0.42l1.21,0.63l-0.59,0.69l-0.95,0.41l-0.11,1.25l1.02,1.29l2.55,1.75l-0.26,0.81l-0.91,0.61l-1.98,-1.08l-1.24,0.22l-1.58,-0.46l-0.45,-0.31l-0.17,-0.72l-3.31,-1.02l-2.5,1.54l-1.15,0.15l-0.35,0.43l-4.03,-0.02l-3.27,0.74l-2.21,0.14l-0.49,-0.52l-1.43,-0.2l-0.32,-0.87l-3.2,-2.55l-1.35,0.05l-0.97,1.16l-3.92,-0.47l-0.86,0.54l-1.57,-0.52Z", "name": "Georgia"}, "IL": {"path": "M66.48,219.04l1.37,-2.38l3.17,-9.66l2.15,0.04l0.79,-0.61l0.24,-0.89l0.53,-0.01l1.02,-0.76l0.48,1.35l-0.25,0.5l0.28,1.14l-0.8,1.43l-1.61,0.91l-0.2,1.83l-0.83,-0.82l-1.7,-0.23l-1.12,0.8l-0.83,2.52l0.04,3.07l0.41,0.3l1.09,0.02l-1.48,1.09l-0.64,2.32l0.63,0.44l1.45,-0.12l2.1,-0.83l-0.28,1.47l0.26,0.89l-2.2,5.75l-0.02,2.36l-1.23,4.69l-4.6,-13.31l1.92,-2.46l-0.14,-0.82Z", "name": "Israel"}, "IN": {"path": "M322.9,278.6l0.38,0.21l5.32,-0.07l1.27,0.8l1.68,0.01l0.94,-0.3l0.53,-0.69l2.75,-0.92l0.43,1.03l1.13,0.35l2.74,-1.35l0.18,-0.55l-0.52,-0.57l-0.04,-0.58l0.56,-1.05l-1.29,-3.03l-1.64,-2.78l-0.04,-1.94l-0.86,-0.61l-2.16,0.04l-1.11,-1.47l-0.14,-1.05l0.41,-1.17l0.1,-2.48l-0.84,-0.83l-2.48,-0.42l-1.61,-0.88l0.35,-2.6l2.65,-2.76l1.84,-3.01l1.72,-1.27l1.22,0.52l0.56,1.44l1.1,0.59l2.99,-1.0l2.67,-0.31l2.47,-0.76l0.79,-1.89l1.73,-2.0l1.14,-2.58l4.28,-2.34l2.48,-4.31l1.09,-3.03l3.16,-1.31l0.98,-1.11l-0.21,-1.77l3.1,-3.58l2.24,-1.23l-0.01,-1.1l-0.66,-0.51l0.54,-2.18l-0.6,-2.16l0.25,-0.62l1.24,-0.97l3.79,-1.56l0.7,-0.74l0.09,-1.02l-0.92,-0.91l-1.85,-0.75l-2.18,-0.23l-0.22,-2.22l-2.33,-0.13l-0.3,-1.78l-1.32,-0.69l-0.82,-0.85l0.89,-1.3l0.26,-1.1l-1.3,-1.79l0.56,-0.69l1.19,-0.57l0.31,-0.72l-0.28,-0.71l-2.31,-0.44l0.48,-0.63l0.03,-0.68l-1.31,-1.12l1.1,-2.01l2.31,-0.86l4.75,0.99l1.75,0.07l1.98,0.85l2.17,0.26l2.44,-1.38l1.0,-0.01l2.0,-0.7l1.22,0.1l0.88,-0.54l0.56,-0.86l1.6,-0.77l0.5,-1.08l5.25,-3.06l0.64,0.29l0.82,-0.26l-0.18,1.74l2.41,5.55l2.69,0.85l2.04,1.59l-0.17,0.52l-1.42,0.96l-0.24,0.93l0.64,4.48l2.39,2.53l-0.22,1.03l0.75,0.99l0.1,3.18l-0.99,0.98l-0.73,0.16l-0.9,-0.75l-0.54,-1.09l-0.42,-0.13l-2.1,0.32l-0.52,0.68l0.83,2.72l1.35,1.61l-0.09,0.54l0.34,0.47l-0.15,1.2l0.72,1.02l-0.45,1.05l0.16,1.56l0.34,0.35l0.83,0.02l1.28,-0.47l0.37,-0.43l1.67,2.36l1.26,1.02l0.84,0.43l1.54,-0.15l2.02,1.45l0.71,0.09l-0.05,1.4l0.35,0.35l3.03,0.96l2.35,1.5l-2.46,1.88l-1.66,1.96l-1.12,2.54l-0.17,1.84l-1.11,1.66l-0.1,1.64l2.76,1.95l0.62,0.12l0.69,-0.39l4.26,2.5l1.1,1.3l4.1,2.53l1.21,-0.31l3.26,1.89l1.59,-0.04l0.61,1.31l4.11,1.18l1.39,-0.72l2.72,0.69l2.05,-0.86l3.61,1.43l0.49,1.96l3.51,1.64l0.5,0.74l1.03,0.2l2.34,-0.71l0.48,1.29l0.77,0.54l1.62,-0.34l2.57,0.56l2.67,1.13l2.21,-0.87l0.46,0.84l1.56,0.62l1.12,-0.47l1.56,0.17l1.58,-0.3l1.31,0.4l0.67,-0.62l0.82,-2.52l-0.4,-1.75l-0.92,-1.53l0.29,-2.13l0.92,-2.77l0.03,-0.85l-0.34,-0.44l2.12,-0.51l1.16,-0.64l1.2,0.53l0.28,0.95l-0.73,2.81l0.22,0.95l0.65,0.67l-0.76,0.6l-0.14,0.72l1.05,1.87l2.18,1.17l1.5,-0.2l1.71,0.47l0.4,0.55l1.23,0.14l2.71,-0.43l0.77,-0.78l0.82,-0.28l1.5,0.71l1.43,0.22l4.09,-0.15l1.16,-0.6l0.6,0.46l1.15,0.04l2.62,-0.46l0.58,-0.34l0.23,-0.55l-0.59,-1.48l0.63,-1.69l-0.97,-1.51l-1.82,0.06l-0.5,-0.33l-0.44,-0.65l0.28,-0.8l2.3,0.24l1.06,-0.64l2.23,-0.13l1.16,-0.49l1.04,-0.73l0.18,-1.47l2.52,-1.5l0.73,-0.75l0.82,-1.63l3.81,-0.83l1.13,-0.65l0.98,-1.24l0.63,-0.2l1.29,-1.3l2.31,-1.27l0.96,1.07l4.73,1.13l1.16,-0.99l0.17,-0.56l3.46,-1.75l1.52,1.58l-1.24,1.01l0.31,1.59l0.61,0.08l1.68,-1.02l0.74,1.78l-1.74,1.79l-0.44,1.09l0.18,0.4l1.05,0.43l1.61,-0.73l1.24,0.74l1.5,0.23l0.76,-0.22l1.42,0.99l0.16,1.89l-2.66,1.8l-0.78,1.08l0.23,1.55l1.41,2.08l-0.95,-0.48l-0.57,-0.88l-0.78,-0.46l-4.19,0.57l-1.17,0.47l-1.14,1.34l-3.26,2.32l-2.65,1.43l-0.51,0.98l-0.11,1.18l0.58,2.4l-0.76,0.85l-0.54,1.73l-1.12,1.36l-0.94,0.54l-0.72,1.21l-0.19,1.18l1.11,1.09l-0.87,2.1l-2.18,3.55l-1.16,3.34l-2.89,-1.02l-1.55,0.22l-0.79,-0.68l-0.86,0.21l-0.16,0.59l0.79,2.67l-0.36,4.18l-0.29,0.55l-0.89,-0.06l-0.42,0.54l0.05,0.78l-0.61,1.6l0.57,3.58l-0.72,0.29l-0.7,1.4l-1.45,-1.11l-0.57,0.22l-0.23,0.52l-0.5,-4.73l-0.99,-2.06l-0.2,-3.04l-0.66,-2.83l-1.11,-0.62l-1.71,0.29l-0.35,0.4l0.05,1.35l-1.33,1.63l0.0,1.78l-0.68,0.4l-0.43,-0.23l-0.76,-1.47l-0.87,0.09l-0.91,-2.82l0.47,-2.4l0.92,-1.22l1.06,0.04l1.44,-0.89l1.27,0.01l0.59,-1.27l1.19,-0.51l1.03,-3.6l1.2,0.25l0.62,-0.44l-0.19,-1.02l-2.02,-1.36l-1.38,-0.52l-12.03,0.09l-4.39,-1.08l0.12,-4.95l-1.2,-2.28l-0.97,-0.04l-0.36,0.44l-0.14,1.2l-0.96,-0.05l-1.22,-0.71l-0.47,-0.63l-0.34,-1.43l-0.48,-0.42l-1.07,0.08l-0.22,0.73l0.2,0.33l-0.52,0.04l-0.76,-0.22l-0.54,-1.04l-0.89,-0.81l-1.01,-0.48l-0.67,0.31l-0.15,0.89l0.69,0.62l-2.11,2.2l-0.56,2.02l0.59,0.77l0.85,0.23l0.71,0.63l1.1,1.34l0.92,0.42l1.12,0.03l0.31,0.89l0.81,0.56l-1.06,0.32l-2.19,-0.15l-0.38,0.27l-0.89,2.16l-0.8,-0.29l-0.59,0.27l-0.98,2.39l1.18,1.58l1.15,0.1l0.7,0.65l2.25,0.79l-0.21,1.8l-0.98,2.86l1.24,1.83l-0.23,0.96l0.19,0.58l1.36,0.51l-0.45,1.06l0.55,3.31l0.94,2.74l-0.12,2.18l-0.58,0.61l0.67,1.68l-0.38,-0.01l-0.68,-0.76l-0.73,1.06l0.28,-2.83l-1.13,-1.2l-0.38,0.3l-0.56,2.28l0.19,1.14l-0.63,0.22l-1.33,-1.07l-0.47,1.03l-0.53,-0.06l-0.19,-0.18l0.97,-3.34l-2.42,-2.28l-0.28,0.45l0.15,0.94l1.34,1.05l-1.35,2.0l-1.85,1.23l-4.35,1.21l-1.97,2.2l-0.18,1.39l0.89,3.07l-1.45,1.96l-0.07,0.76l-1.77,1.04l-0.81,1.11l-0.9,-0.24l-0.28,0.68l0.35,0.38l-0.41,0.19l-4.39,1.43l-0.28,-1.19l-0.79,-0.25l-1.88,1.14l-0.76,1.19l0.01,0.43l0.52,0.37l-3.38,2.95l-0.65,1.3l-4.35,5.15l-3.35,1.73l-3.41,3.56l-4.46,2.54l-1.82,1.41l-0.7,1.18l0.53,1.54l-0.64,1.44l-3.49,1.65l-2.6,-0.26l-1.0,0.23l-0.64,0.82l-0.76,2.21l-1.11,1.39l-0.62,-0.14l-0.45,-0.67l-1.08,-0.23l-2.16,0.81l-0.81,0.71l-1.53,3.09l-0.39,2.01l0.93,4.64l-0.49,2.1l0.99,3.49l-0.57,-0.03l-0.71,0.82l-0.03,0.48l2.01,1.74l-0.82,4.92l-0.62,1.73l-2.16,3.59l-0.79,3.19l0.26,0.98l-0.61,0.79l-0.06,0.48l0.93,0.07l0.18,0.65l-0.07,6.26l-1.97,-0.13l-1.06,0.18l-0.82,0.53l-0.53,0.87l0.03,0.92l-2.37,3.6l-0.11,1.12l0.64,0.82l-4.13,1.22l-1.23,0.94l-0.76,0.97l-0.5,2.85l-0.41,0.79l-2.04,1.38l-1.79,0.76l-1.36,-0.42l-1.69,-1.23l-3.75,-4.35l-1.66,-4.01l0.77,-0.17l0.23,-0.48l-0.84,-2.92l-1.12,-1.22l-0.01,-0.98l-2.05,-4.35l-1.49,-4.39l-1.57,-2.72l-2.42,-2.65l-1.84,-3.76l-1.3,-3.86l-0.75,-4.53l-1.29,-2.91l-0.9,-3.48l-3.22,-4.41l-0.58,-1.89l0.38,-0.67l-0.96,-1.15l0.25,-0.36l-0.34,-0.63l-0.8,-0.21l-1.49,-2.59l-1.02,-3.05l-1.38,-9.0l-1.2,-3.62l-0.89,-4.27l0.97,-2.9l-0.6,-1.33l-0.85,1.12l-0.06,-0.21l-0.03,-1.21l0.96,0.12l0.44,-0.29l-0.22,-0.47l-1.36,-0.6l0.04,-1.22l-0.43,-0.36l-0.4,-1.77l1.68,-6.59l-0.61,-3.55l-0.95,-0.59l-0.4,-1.19l0.62,-0.56l0.12,-0.49l-0.26,-0.13l2.93,-1.55l0.16,-0.51l-0.5,-0.21l-1.93,0.47l-1.69,-0.06l0.22,-0.85l0.82,-1.06l-1.25,-0.23l0.14,-0.86l1.66,-0.45l0.29,-0.38l-0.29,-0.39l-1.7,-0.37l-1.07,0.22l-2.04,-0.16l-0.39,0.32l0.86,0.84l-0.16,0.52l-1.7,1.97l0.13,0.63l0.93,0.36l0.47,0.66l-0.02,0.8l-1.63,2.72l-7.28,3.2l-2.07,-0.01l-1.67,-0.74l-3.29,-2.58l-2.17,-2.59l-4.15,-3.8l-1.53,-2.11l0.29,-0.67l1.05,0.94l0.71,0.17l1.95,-0.92l0.69,0.03l0.69,-0.46l0.75,0.03l1.32,-0.72l1.25,-0.2l2.15,-3.21l0.45,-0.21l0.23,-0.4l-0.21,-0.79l-0.88,-0.15l-0.75,1.0l-1.63,0.03l-3.3,1.46l-3.07,-0.68l-3.05,-1.58l-1.24,-1.01l-1.52,-2.74l2.46,-1.91l0.13,-0.51l-0.49,-0.2l-1.04,0.36l-2.61,1.58l-0.36,-1.42l1.25,-0.53l2.48,-0.1l0.41,-0.39l0.03,-2.19ZM510.38,409.89l0.46,1.53l-0.26,0.91l-0.96,-1.53l0.07,-0.64l0.69,-0.26ZM502.0,376.41l-0.73,-2.04l0.46,-0.43l0.48,-1.76l0.55,-0.06l-0.74,1.46l0.36,0.73l-0.38,2.09ZM502.93,370.91l-0.34,-0.32l0.01,-1.24l0.16,-1.82l0.51,-0.85l0.37,0.44l0.17,2.11l-0.94,0.92l0.06,0.77ZM503.37,365.59l0.26,-2.41l0.75,-0.98l-0.3,1.27l0.32,0.54l-1.03,1.58ZM500.23,384.16l-0.24,-0.02l-0.13,-1.21l0.57,-0.59l0.25,0.86l-0.45,0.96Z", "name": "India"}, "AZ": {"path": "M146.29,137.61l0.31,-0.42l-0.14,-0.46l-1.19,-0.85l1.66,-1.14l2.69,0.83l0.36,0.77l1.56,0.71l0.87,0.19l1.08,-0.25l2.09,1.1l0.96,-0.25l0.8,-0.8l0.28,-1.52l-2.74,-1.99l-0.84,-1.11l0.05,-0.36l0.72,-0.2l0.89,-1.05l0.62,0.68l1.35,-0.09l2.92,2.63l0.77,1.61l0.58,0.49l3.73,0.81l0.9,-0.29l1.4,-2.1l2.48,-1.29l1.21,-1.93l3.16,3.87l1.28,3.05l1.8,2.12l2.06,1.78l3.01,0.66l1.38,1.34l-2.81,-0.15l-3.0,1.27l-0.6,1.06l-1.13,4.18l0.28,2.16l-0.7,0.7l-0.48,1.73l-0.85,-0.64l-0.9,0.58l-0.89,2.3l0.09,3.19l-1.31,0.29l-1.44,-1.56l-0.89,-0.28l-0.7,-0.92l-1.38,-0.93l1.64,-0.6l0.54,-0.51l-0.11,-1.04l-1.24,-1.09l1.48,-1.09l0.08,-0.54l-2.77,-2.68l-1.81,0.33l-2.3,1.36l-2.2,1.41l-1.46,1.36l-1.09,0.35l-2.04,1.96l-0.32,-1.72l0.88,-0.3l0.06,-0.59l-1.44,-1.33l0.73,-0.52l0.03,-0.84l-1.43,-0.86l-0.97,0.13l-3.58,-2.86l1.32,-0.16l0.78,-1.51l0.01,-0.7l-3.09,-1.91l-0.78,-0.93l0.78,-0.43l-0.1,-0.73l-0.66,-0.19l0.95,-0.7l-0.04,-0.82l-1.37,-1.31l-1.8,-0.5ZM148.08,141.25l-0.07,0.14l0.0,-0.02l0.07,-0.12ZM143.77,150.11l1.2,-0.38l0.53,0.63l0.19,0.87l0.88,0.02l1.49,0.8l2.24,-0.57l-0.06,1.5l1.4,1.03l-0.08,0.63l0.93,1.93l-3.87,-0.93l-2.44,-2.08l-2.4,-3.44Z", "name": "Azerbaijan"}, "ID": {"path": "M789.33,474.14l1.38,-1.54l0.5,-1.3l-0.0,-0.92l3.92,-1.03l2.44,-1.87l1.87,-0.69l3.25,0.45l4.58,2.3l3.81,0.16l0.65,0.47l-0.17,1.23l1.36,2.55l-1.13,2.76l0.68,4.46l2.0,3.96l0.4,0.23l0.59,-1.18l-0.04,-0.97l0.35,-0.17l0.49,2.77l0.33,0.3l0.81,0.01l0.32,1.91l1.81,1.2l2.12,0.2l1.17,-0.34l2.83,-2.66l1.11,-1.9l1.81,-1.25l0.97,-2.14l3.21,-0.53l1.82,-0.72l0.99,-0.93l-0.34,-1.22l4.78,-2.47l6.06,2.27l1.21,0.95l7.33,3.23l2.8,0.05l0.74,0.46l2.75,0.25l1.04,1.22l1.3,0.02l0.01,27.59l-0.84,2.98l0.84,1.43l0.01,15.75l-2.99,-3.29l-3.59,-3.15l0.9,-1.62l-0.14,-0.51l-0.53,0.08l-1.2,1.2l-3.92,0.65l-1.0,-1.54l-2.46,2.02l0.42,-1.96l0.52,-0.65l0.64,-1.89l-0.34,-0.77l-0.85,-0.46l-1.09,-1.32l1.83,0.12l0.86,-0.28l0.27,-0.48l-2.71,-0.68l-1.41,-1.08l1.45,-0.24l0.25,-0.65l-3.14,-3.8l-1.0,-2.81l0.55,-0.88l-1.13,-0.38l0.86,-0.89l-0.44,-0.28l-1.59,0.29l-0.05,-1.54l-2.46,-1.85l-3.26,-1.75l-0.15,-0.38l-0.61,-0.18l-0.32,0.21l-0.69,-0.41l-3.54,-0.8l-4.86,-2.18l-3.99,-0.66l-1.85,0.06l-3.13,-1.82l-0.43,-0.67l0.08,-0.46l1.09,-0.1l0.36,-0.39l-0.35,-0.4l-1.06,-0.12l-1.47,0.42l-1.05,-0.47l-1.01,0.18l-1.02,-1.07l-1.09,0.17l-1.99,-2.23l0.11,-1.47l1.05,-1.42l-0.28,-0.61l-0.83,-0.02l-0.83,0.78l-0.2,1.78l-0.6,0.13l-0.41,0.49l0.16,0.67l-0.93,1.58l-0.06,1.1l-0.99,1.07l-2.04,0.03l-1.03,-2.27l0.81,-1.34l-0.94,-2.03l-3.11,-2.49l-2.21,-0.48l-0.28,-0.36l1.45,-0.65l3.86,0.73l2.32,-2.25l0.92,-0.29l2.94,0.8l0.71,0.55l0.57,-0.31l0.3,-1.04l1.11,-0.47l0.09,-0.97l-0.4,-0.37l0.57,-1.11l-0.55,-0.38l-1.54,0.64l-3.61,0.19l-1.92,0.42l-3.32,-0.4l-1.43,0.17l-1.92,-1.74l-0.62,-2.99l-0.39,-0.38l-1.41,-0.13l-3.25,-1.1l-1.9,0.36ZM839.2,526.43l1.24,-2.99l1.27,-2.13l1.22,-1.0l2.52,-0.81l1.51,0.07l1.22,1.28l0.14,0.58l-1.4,2.52l-1.81,1.56l-1.64,0.91l-4.26,0.02ZM846.09,526.2l0.98,-0.72l0.56,0.91l-1.54,-0.19ZM825.18,476.4l2.6,0.11l1.48,0.5l2.3,0.09l-3.37,0.37l-3.0,-1.07ZM822.33,469.12l1.47,0.16l0.45,0.26l-0.52,0.3l-1.4,-0.73ZM824.31,469.56l1.05,-0.04l3.09,2.59l-1.2,0.32l-1.42,-0.3l-1.0,-2.39l-0.52,-0.18ZM818.29,471.77l-0.21,-0.04l-0.17,-0.42l0.16,-0.02l0.22,0.48ZM813.05,509.18l0.58,0.0l0.41,-0.43l0.29,-1.17l-0.44,-0.67l1.84,-2.07l0.83,1.72l-0.21,1.93l0.3,1.44l-0.27,0.81l-0.38,0.3l-1.15,-0.18l-1.79,-1.67ZM812.51,512.73l0.68,-0.38l-0.5,-0.69l-0.07,-1.13l2.32,1.74l-1.23,2.35l-0.79,0.47l-0.67,-0.65l0.27,-1.71ZM801.88,507.73l-0.08,-0.13l0.08,-0.65l0.16,0.53l-0.16,0.25ZM791.1,523.43l-0.89,-0.08l-0.19,-0.61l0.31,-1.04l0.85,-1.69l0.66,-0.35l1.27,-1.43l0.18,-0.61l0.39,-0.12l0.2,0.11l-0.55,0.73l0.32,1.17l-0.44,1.23l-1.78,1.74l-0.35,0.94ZM785.68,465.9l-0.54,-0.57l-1.3,-0.15l0.15,-0.41l1.73,-0.18l0.72,0.99l-0.75,0.32ZM787.02,466.29l0.59,0.08l0.14,0.13l-0.57,0.11l-0.15,-0.32ZM787.04,464.3l2.01,0.13l1.67,0.73l0.19,0.68l-0.29,0.25l-0.91,-0.29l-0.96,0.12l-1.72,-1.62ZM789.08,524.99l0.05,-0.05l0.02,0.01l-0.07,0.04ZM786.92,471.18l1.16,-0.36l0.96,0.27l-0.49,2.26l-0.95,-0.47l-0.68,-1.7ZM766.27,488.64l-0.3,-0.69l2.11,-2.36l5.81,-0.26l0.94,0.8l1.35,-0.39l1.07,-0.71l0.68,0.0l3.32,1.4l2.85,0.08l1.28,0.95l0.69,1.82l0.9,0.44l0.47,0.8l-0.29,1.53l-5.37,-2.63l-1.33,-1.11l-2.56,-0.1l-0.53,0.55l0.05,0.41l-3.38,-0.88l-0.29,-0.67l-0.42,-0.11l-1.12,0.34l-1.17,1.21l-0.72,0.09l-0.48,-0.16l-1.4,-1.59l-0.89,-0.41l-0.85,0.41l-0.42,1.23ZM780.17,477.84l3.58,-1.0l0.41,0.54l-0.24,0.82l-1.38,0.56l-2.37,-0.92ZM778.8,522.63l0.94,0.13l-0.18,0.93l-0.79,-0.7l0.03,-0.36ZM763.29,456.66l-0.79,-2.23l0.82,-1.51l0.7,-2.8l2.1,-2.2l-0.75,1.07l-0.18,0.98l0.94,1.15l0.0,2.49l-0.83,1.09l-1.69,1.08l-0.32,0.87ZM763.89,457.48l0.97,0.44l0.99,-0.17l0.68,-1.6l1.34,-0.77l0.14,-1.37l0.36,-0.47l1.41,-0.82l1.5,-0.35l0.03,2.9l-2.85,1.55l-0.49,0.89l0.2,0.84l2.85,1.59l0.21,0.87l-1.41,-0.63l-3.46,-0.6l-0.67,0.3l-0.37,0.77l-0.08,2.61l0.69,2.29l1.8,3.22l-0.66,-0.29l-1.13,-2.05l-1.42,-1.29l0.15,-3.72l-1.16,-1.71l-0.12,-0.79l0.52,-1.65ZM769.72,447.96l-0.89,0.1l-0.34,-1.46l0.71,-1.09l1.54,-0.83l0.41,0.59l-0.43,1.63l-0.48,0.8l-0.53,0.26ZM770.98,517.22l0.07,-0.02l-0.01,0.06l-0.06,-0.04ZM766.39,491.38l0.34,-0.3l0.21,-0.03l-0.29,0.14l-0.26,0.19ZM767.55,490.94l0.67,-0.35l-0.17,0.61l-0.49,-0.27ZM766.43,525.21l0.01,0.0l0.11,-0.0l-0.03,0.03l-0.08,-0.03ZM767.16,475.96l-3.99,0.3l-0.88,-0.4l0.4,-0.99l1.11,-0.75l3.36,1.84ZM761.78,466.79l0.31,0.27l0.62,-0.11l0.26,-0.47l0.61,0.79l-0.45,0.83l0.4,0.98l-0.85,0.24l0.16,-0.66l-1.25,-1.34l0.2,-0.52ZM764.02,469.29l0.79,0.03l0.27,0.36l-0.41,0.22l-0.64,-0.6ZM760.63,469.19l0.05,-0.12l0.05,0.15l-0.09,-0.02ZM760.49,467.14l-0.3,0.09l-0.05,-0.4l0.25,-0.77l0.11,1.08ZM757.75,487.23l1.12,0.53l1.5,1.99l-0.08,0.85l-1.95,0.95l-1.71,0.4l-0.93,-0.35l-2.61,-1.35l-0.99,-1.48l0.06,-1.37l0.81,0.26l2.66,-0.6l2.11,0.14ZM757.21,433.23l0.01,-0.01l-0.0,0.01l-0.01,0.0ZM757.81,431.67l-0.55,-0.64l0.14,-0.88l0.5,1.37l-0.1,0.14ZM750.41,523.01l1.0,-1.32l1.73,0.26l2.79,-0.97l0.69,0.53l-1.13,0.53l-0.7,0.9l-2.53,-0.45l-1.85,0.52ZM747.5,477.65l0.38,-0.04l1.32,0.09l-1.63,0.15l-0.07,-0.2ZM750.49,477.62l1.14,-0.09l0.2,0.02l-0.72,0.12l-0.62,-0.06ZM750.92,479.55l-0.08,-0.27l0.13,-0.24l-0.06,0.52ZM748.22,437.51l0.03,0.04l-0.03,-0.01l0.0,-0.03ZM743.62,476.88l0.82,0.28l0.59,-0.2l0.46,0.47l-1.5,0.42l-1.42,-0.31l-2.24,0.81l-0.5,-0.01l-0.45,-0.75l0.3,-0.99l0.47,-0.16l1.27,-0.06l2.21,0.5ZM745.7,477.42l0.14,-0.02l0.02,0.01l-0.16,0.01ZM704.86,464.54l0.67,-0.32l0.35,-0.64l-0.38,-1.56l0.7,-1.38l0.9,-0.91l0.22,-1.01l1.46,-1.75l0.61,0.71l0.88,0.3l0.92,-0.29l1.28,-1.46l0.85,-1.63l0.55,-0.33l0.65,-0.1l0.97,0.48l1.35,0.12l0.78,1.0l0.7,0.33l2.14,-0.14l4.23,0.52l2.94,1.27l1.84,-0.7l5.9,0.77l3.32,-1.42l1.09,-1.24l1.03,-0.48l0.49,-1.14l1.28,-0.5l1.4,-1.67l0.9,0.27l0.37,0.77l-0.72,0.71l-1.14,2.23l-2.02,1.93l-1.35,1.98l-0.59,0.59l-1.4,0.6l-5.09,0.6l-1.77,-0.16l-1.34,-1.15l-0.84,-0.13l-8.69,0.42l-2.46,-0.46l-3.77,0.42l-3.29,-0.64l-1.86,0.64l-1.29,1.45l-1.42,3.65l0.37,2.87l1.43,2.52l2.03,1.25l0.64,1.6l0.81,1.04l2.66,0.26l1.16,-0.55l1.08,-1.76l1.97,-1.99l1.09,0.7l1.85,0.06l2.35,-1.32l4.52,-0.01l0.37,-0.44l-0.16,-0.5l1.88,-0.43l1.27,0.47l0.28,0.68l-0.26,1.25l-0.33,0.19l-1.76,-1.11l-1.42,0.24l-0.83,0.58l-2.23,2.84l-1.83,1.48l-2.87,1.01l-1.54,1.51l-1.64,-0.44l-0.46,0.1l-0.39,0.56l0.2,0.92l1.67,1.53l1.36,0.61l2.3,3.75l1.54,1.18l0.08,0.97l0.62,0.86l-0.56,0.67l-0.39,2.87l2.47,2.01l0.76,1.42l0.7,0.29l0.61,-0.26l0.18,1.66l-0.74,-0.33l-0.61,0.56l-1.54,0.02l-2.74,0.91l-0.68,0.93l0.08,1.25l-0.69,0.09l-2.23,-0.59l-0.59,-1.03l0.39,-2.11l0.54,-1.02l-0.07,-0.81l-0.6,-0.58l-1.72,-0.75l-3.0,-2.79l1.22,-2.49l-0.1,-3.4l-0.7,-0.76l-0.83,-0.19l-1.98,0.21l-2.36,1.53l-0.78,0.9l-0.02,0.97l1.01,2.13l0.32,2.63l-0.55,2.79l0.43,4.03l-1.05,3.95l1.04,2.72l-3.1,0.14l-1.67,0.86l-1.69,-1.16l-0.56,-0.63l-0.09,-0.63l1.15,-3.15l0.0,-1.13l0.72,-2.42l0.09,-2.92l-1.08,-2.37l0.04,-1.47l-1.22,-0.88l-2.77,0.54l-0.33,-0.25l-0.58,-1.33l0.17,-2.69l-0.53,-1.3l2.28,-1.74l0.6,-2.56l1.14,-1.64l0.2,-0.97l-0.28,-2.97l1.44,-3.6l1.14,-1.35l0.69,1.01l0.45,0.18l0.3,-0.38l-0.89,-5.64ZM736.59,534.43l0.65,0.46l1.5,0.02l1.11,-0.94l0.32,-0.91l2.8,-1.45l0.68,0.57l1.03,-0.38l-0.17,0.55l-0.73,0.03l-0.51,0.53l0.75,2.11l-2.51,2.9l-2.0,1.7l-1.75,0.24l-2.44,1.21l-0.67,0.02l-0.7,-0.31l0.76,-1.13l-0.16,-0.53l-0.73,-0.47l0.54,-1.87l2.23,-2.34ZM739.69,526.62l0.3,-0.38l-0.09,-0.61l0.49,-0.44l0.74,0.46l1.0,-0.28l2.39,0.23l0.02,0.44l-4.84,0.58ZM738.25,526.06l-0.87,1.35l-0.81,-0.7l1.04,0.05l0.63,-0.7ZM731.61,527.45l1.11,-0.79l0.05,-0.48l0.71,0.19l1.02,-0.53l-0.5,0.72l-0.64,0.17l-0.4,0.77l-0.89,0.22l-0.47,-0.27ZM733.01,475.86l0.15,0.17l-0.02,0.09l-0.13,-0.02l0.01,-0.25ZM728.24,475.03l-0.26,-0.63l0.5,-1.4l1.79,-0.17l-2.03,2.2ZM730.66,474.31l0.09,0.01l-0.08,0.05l-0.01,-0.07ZM731.28,474.11l0.47,-0.63l0.45,-0.08l0.46,0.35l-0.47,0.81l-0.91,-0.45ZM728.06,545.35l0.04,-0.38l1.57,-0.49l1.76,-1.46l0.19,0.55l-1.26,1.05l-2.31,0.73ZM729.8,526.35l0.37,-0.31l0.87,0.03l-0.08,0.29l-1.15,-0.01ZM726.57,505.77l-0.28,-0.74l1.35,-2.24l0.65,-4.35l0.9,-1.29l0.76,0.85l0.09,0.81l-1.0,0.33l-0.65,3.17l0.07,0.35l0.84,0.13l0.74,0.68l-0.7,0.43l-0.85,0.03l-0.97,1.82l-0.95,-0.0ZM729.17,494.09l1.2,-0.03l0.04,0.33l-0.68,0.62l-0.57,-0.92ZM705.88,527.5l2.53,-1.18l2.61,-0.3l1.0,0.55l1.9,0.32l3.37,1.63l4.0,-0.89l1.97,1.18l0.65,0.09l1.14,-0.33l0.87,-1.23l2.69,-1.32l-1.25,1.05l0.03,0.87l-2.49,0.92l-0.98,0.08l-1.0,-0.06l-0.77,0.11l-3.09,1.08l-0.63,-0.51l-1.32,-0.05l-0.8,0.74l-0.94,-0.13l-1.11,0.29l-3.54,-1.0l-1.78,0.13l-1.63,-0.31l-1.31,0.48l-0.52,-0.79l0.4,-1.43ZM728.29,525.01l-0.42,-0.09l0.33,0.02l0.09,0.07ZM724.05,503.6l0.27,-1.16l0.54,-0.75l-0.3,-1.92l2.04,-0.94l0.18,1.77l-1.01,1.42l0.03,1.48l-0.38,0.24l-0.79,-0.36l-0.58,0.23ZM720.93,502.15l0.62,0.76l-0.12,1.31l-0.94,-1.15l0.45,-0.92ZM720.23,543.0l0.44,-0.43l0.34,-0.02l-0.55,0.41l-0.23,0.04ZM706.07,534.07l1.84,1.37l0.47,0.99l1.4,0.16l0.62,0.43l1.7,1.8l0.11,0.63l-0.67,0.63l-1.69,0.55l-1.31,-0.32l-1.32,-0.78l-0.92,-1.19l-2.54,-1.52l-3.9,-0.54l-0.69,-0.98l1.35,-0.7l3.1,-0.23l1.3,0.2l1.15,-0.51ZM702.37,528.21l0.22,-0.47l0.21,0.05l-0.06,0.15l-0.36,0.27ZM693.04,526.41l0.72,0.45l1.53,-0.65l0.67,0.05l0.64,0.92l0.65,-0.13l0.38,-0.6l0.71,-0.04l1.18,2.42l-1.95,-0.07l-0.56,0.18l-0.25,0.54l-1.8,0.36l-0.09,-0.98l-0.75,-0.28l-1.32,1.18l-2.33,0.64l-1.08,-0.05l-1.64,0.65l-2.17,0.19l-1.07,0.47l-1.71,-0.58l0.33,-2.98l2.29,-1.13l1.29,0.44l1.51,-0.01l1.57,1.98l1.43,0.27l2.25,-0.78l0.15,-0.9l-1.07,-0.93l-0.98,-0.17l-1.11,-0.8l-0.4,-0.87l0.92,-0.34l1.29,0.22l0.79,1.34ZM624.73,453.92l0.32,-1.2l1.4,-1.48l0.79,-1.6l0.57,-0.24l0.23,0.98l0.47,0.31l0.21,1.21l0.61,0.69l4.36,3.97l1.76,1.11l4.44,-1.41l2.81,0.41l2.57,-0.14l0.92,-0.77l1.34,-0.42l0.81,-2.15l1.88,-0.75l3.35,-0.06l0.1,0.67l0.44,0.33l4.78,1.45l2.12,-1.48l3.43,-0.44l1.13,0.3l1.1,-1.45l0.44,-1.58l0.82,-0.52l0.22,-0.91l-0.41,-1.57l2.94,-2.09l-0.01,-0.9l-0.63,-0.47l0.22,-1.45l0.71,-0.74l1.04,0.04l0.82,-0.43l0.87,-3.2l0.01,-3.59l0.74,-1.77l1.17,-1.05l0.92,0.4l1.13,-0.45l1.83,0.33l0.96,-0.41l4.28,0.22l1.22,0.26l1.37,0.81l-0.09,0.78l2.13,2.46l-0.52,0.13l-0.74,-0.59l-0.66,0.21l-0.19,0.44l-2.01,-0.06l-0.87,0.12l-0.34,0.39l2.26,1.73l-0.23,0.93l0.24,0.77l1.88,0.96l-0.32,0.83l0.66,0.44l0.04,0.65l0.97,0.48l0.77,1.52l1.29,1.56l-0.09,0.39l-1.72,1.31l-0.07,0.72l2.13,2.4l4.18,2.87l2.38,2.1l-1.34,0.78l-1.57,0.18l-2.4,-0.43l-1.29,-1.21l-0.78,-0.45l-0.48,0.07l0.3,1.69l-1.62,1.18l-1.71,3.82l-0.45,4.24l0.8,3.1l-2.33,1.11l-2.24,2.13l-0.51,-0.17l-0.74,-1.17l-0.38,0.3l0.13,2.03l-1.38,0.97l-0.34,0.98l-1.85,1.46l0.38,0.6l0.71,-0.03l0.17,0.7l-0.16,0.71l-0.71,0.57l0.12,0.69l1.44,0.48l0.05,1.1l-0.1,0.51l-0.99,-0.02l-0.65,0.55l-0.07,0.39l0.49,0.41l-0.28,1.72l-0.35,0.31l-0.29,-0.21l-0.62,0.23l-0.07,0.63l0.5,0.77l-1.21,1.63l-0.68,1.71l-9.18,4.19l-0.25,-3.08l-0.6,-2.47l-0.29,-0.35l-0.87,0.73l-0.51,-0.29l0.29,-0.99l-0.2,-0.48l-0.51,0.12l-0.63,0.76l-0.92,-0.59l-1.23,0.91l-1.59,0.4l-0.66,-1.92l-0.54,-0.16l-1.55,0.4l-2.09,-2.12l-0.67,0.19l-0.43,1.75l-1.45,0.92l-1.04,0.52l-2.45,-0.55l-1.19,0.45l-1.71,1.25l-0.04,-3.42l-1.1,-1.47l-0.52,0.04l-0.45,0.52l-1.8,-0.3l-3.15,1.01l-0.34,-0.21l0.41,-0.79l-0.48,-0.19l-1.4,0.72l-0.99,-0.86l-2.02,0.63l-1.1,-7.06l-0.99,-1.09l0.56,-2.28l-0.43,-2.1l-0.89,-1.4l-1.51,-1.24l-2.88,-0.7l-0.03,-0.39l0.77,-0.78l-1.83,-1.67l-0.05,-1.14l0.99,-2.44l-2.34,-2.49l-0.27,-3.07l0.36,-2.36l1.15,-0.76l0.16,-0.42l-0.77,-0.31ZM689.33,432.89l1.07,-0.1l0.09,0.26l-0.8,0.22l-0.36,-0.38ZM688.52,438.39l0.19,-0.01l-0.04,0.25l-0.08,-0.07l-0.06,-0.17ZM688.18,525.84l-0.09,-0.44l0.43,-0.1l-0.34,0.54ZM676.77,529.94l0.76,-0.55l-0.1,-2.16l1.02,-0.92l1.12,-0.58l2.02,0.78l-1.52,3.24l0.09,0.45l-0.76,0.16l-2.62,-0.43ZM677.43,493.41l0.1,-1.05l-0.41,-1.51l0.63,-1.84l0.39,-0.25l0.37,3.12l-0.14,0.7l-0.94,0.84ZM665.5,525.06l3.09,0.52l1.84,-0.9l2.51,0.99l0.95,1.06l-2.63,1.44l-0.74,1.27l-0.04,-0.59l-0.76,-1.07l-1.72,-1.15l-1.67,-0.38l-0.83,-1.18ZM671.74,515.64l-0.41,0.09l-0.2,-0.1l0.96,-0.2l-0.35,0.21ZM596.42,514.63l0.11,-0.17l0.13,-0.12l0.08,0.21l-0.32,0.08ZM598.18,514.76l1.14,-1.95l1.0,-0.35l0.73,-2.71l1.15,-1.24l5.69,1.33l1.0,-0.27l0.85,-1.03l1.75,0.39l0.99,1.02l1.54,0.76l3.59,0.62l1.25,-0.16l1.32,1.32l0.6,1.81l0.87,0.74l4.61,0.57l1.64,-0.38l2.33,0.65l2.82,-0.05l1.94,0.34l1.32,-1.19l1.09,-2.43l1.31,-0.19l1.72,1.9l1.29,0.09l1.34,-0.38l1.51,0.93l1.77,0.23l0.81,0.67l3.18,0.2l0.76,2.06l1.03,0.6l0.02,1.75l1.86,1.11l1.83,0.48l1.96,0.06l4.21,-0.69l2.22,0.99l0.26,1.37l-0.42,3.1l0.54,1.37l0.91,0.84l-1.69,-1.01l-2.59,-0.38l-5.27,-2.14l-4.31,0.92l-4.16,-0.64l-4.53,-0.14l-6.69,-1.16l-4.26,-1.95l-5.75,-1.42l-4.09,-0.29l-1.47,0.35l-0.85,0.62l-3.75,-0.53l-2.7,-1.34l-2.03,-0.56l-6.08,-0.73l-0.14,-0.52l0.74,-1.34l-0.22,-0.54l-4.35,-1.48l-3.17,-0.03ZM654.92,517.5l-2.42,-0.71l0.79,-0.92l1.33,-0.13l6.62,-0.05l0.29,0.26l-0.93,0.28l-0.47,0.51l-1.37,0.03l-1.21,0.72l-2.63,0.02ZM651.59,507.15l0.02,-0.02l-0.0,0.02l-0.01,-0.0ZM629.22,472.23l-1.34,0.69l-0.13,-0.04l0.21,-1.38l1.22,0.14l0.23,0.38l-0.19,0.23ZM618.17,435.89l0.02,-0.02l0.08,-0.01l-0.1,0.03ZM618.38,435.83l0.47,-0.55l-0.28,-0.49l-1.07,-0.29l-0.43,-0.7l1.13,-1.07l1.0,1.28l0.01,0.85l-0.47,0.88l-0.36,0.1ZM613.87,485.59l0.62,-2.31l0.83,-0.17l1.71,0.45l0.91,0.65l0.42,0.73l-0.67,1.89l-0.81,0.66l-1.12,-1.0l-1.46,0.78l-0.43,-1.68ZM601.61,476.32l0.87,1.51l0.39,2.48l1.18,2.07l2.78,0.8l-0.96,2.1l0.31,1.02l-2.53,-1.29l-1.77,-0.49l-0.5,-1.02l0.14,-1.35l-0.58,-0.6l-0.68,-1.84l-1.77,-0.78l-1.76,0.29l-1.15,-0.49l1.64,-1.12l0.11,-1.3l0.47,-0.44l0.59,-0.22l0.69,1.26l0.66,0.02l0.4,-0.54l-0.09,-0.9l0.29,-0.08l0.93,0.17l0.35,0.75ZM530.39,424.92l2.72,-0.33l2.48,0.49l2.53,-0.04l2.62,2.37l0.68,1.61l1.82,1.83l-0.03,1.66l0.5,0.76l2.69,1.32l0.98,1.31l2.78,1.33l4.3,2.95l5.9,7.42l1.3,0.61l1.52,1.27l0.6,-0.39l-0.48,-1.94l0.42,-0.2l0.65,0.22l1.77,1.7l0.75,1.83l0.64,0.64l2.38,0.59l1.69,1.29l0.93,1.25l0.63,2.04l1.23,1.23l0.72,0.54l3.47,0.81l0.66,0.9l-0.25,0.33l-3.29,1.42l-0.26,0.47l0.44,0.31l2.65,-0.48l3.25,-1.74l0.79,0.19l1.35,1.33l0.7,1.44l-2.59,1.79l-0.16,1.25l0.67,0.82l-0.37,0.32l-0.08,0.69l0.83,1.57l1.47,1.03l2.67,1.06l2.12,0.17l1.02,5.6l0.54,0.93l1.88,1.11l-0.1,0.7l-1.34,1.48l0.01,1.56l0.96,0.2l1.38,-1.36l0.89,-0.36l2.6,0.15l1.24,0.75l3.36,4.47l0.08,0.58l-1.14,1.39l-0.45,1.58l0.05,1.0l0.58,0.85l-0.73,2.28l0.4,3.06l0.0,3.37l-0.52,4.94l-0.35,0.75l-0.52,-0.09l-0.7,-0.92l-1.3,-0.93l-0.74,0.12l-1.53,1.25l-3.08,-1.61l-0.57,0.22l-0.16,0.5l0.41,2.14l-3.87,-3.78l-1.82,-2.35l-6.85,-4.58l-2.81,-2.35l-3.04,-4.11l-4.1,-3.23l-1.59,-2.69l-1.88,-1.68l-1.65,-2.44l-0.27,-2.38l-2.75,-4.74l-1.36,-3.58l-3.35,-3.83l-1.51,-2.78l-2.58,-1.27l-1.15,-0.94l-2.67,-8.45l-1.56,-2.88l-3.96,-2.61l-2.73,-1.1l-0.8,-3.58l-1.59,-1.11l-3.15,-4.48l-1.34,-1.07l-2.6,-0.77l-1.59,-1.89l-5.47,-5.13l-2.06,-3.75l0.28,-0.92l-0.16,-0.88l0.93,-0.33l2.34,0.34l2.94,2.12l2.82,0.53ZM599.87,441.75l-0.0,-0.09l-0.01,-0.06l0.07,0.03l-0.06,0.12ZM590.63,465.03l0.37,-0.91l0.85,0.78l-0.91,0.24l-0.31,-0.11ZM593.0,465.4l0.03,-0.01l0.04,0.04l-0.06,-0.03ZM588.93,455.69l0.63,-0.44l1.15,-0.05l0.48,0.5l-0.01,0.7l-0.48,0.59l-0.37,-1.29l-0.46,-0.23l-0.95,0.22ZM589.16,467.04l1.01,-0.3l0.43,0.45l-0.4,0.65l-0.62,-0.01l-0.43,-0.79ZM586.69,455.6l0.28,-0.16l0.2,0.1l-0.19,0.32l-0.3,-0.26ZM583.2,466.09l0.26,-0.26l0.73,0.22l-0.47,0.13l-0.51,-0.09ZM580.69,459.3l0.04,-0.25l0.07,-0.11l0.18,0.35l-0.29,0.01ZM577.43,455.57l0.12,-0.16l1.43,0.67l0.68,0.71l-1.09,-0.85l-1.14,-0.36ZM575.86,455.84l3.0,1.71l0.05,0.24l-3.31,-0.81l0.26,-1.13ZM572.44,452.08l1.35,0.36l-0.78,-0.08l-0.57,-0.28ZM573.94,452.48l0.99,0.27l0.07,0.32l-0.4,-0.32l-0.66,-0.27ZM573.82,453.77l0.81,0.9l-0.12,1.3l-0.51,-0.94l-0.18,-1.26ZM573.27,503.85l0.97,0.44l-0.04,0.13l-0.23,0.01l-0.7,-0.58ZM569.22,448.44l0.36,0.65l-0.35,0.99l-0.59,0.37l-0.51,-0.09l-0.49,-0.96l0.03,-0.67l1.55,-0.3ZM558.51,485.09l1.28,1.34l-0.14,0.64l-1.01,-1.14l-0.13,-0.84ZM556.91,483.15l0.93,0.83l-0.3,0.47l-0.45,-0.01l-0.18,-1.3ZM553.83,479.28l0.22,0.16l0.51,1.03l-0.84,-0.6l0.11,-0.59ZM550.38,476.64l-0.51,0.03l-1.55,-1.07l-1.64,-2.92l0.45,-1.36l1.25,-0.2l1.51,3.63l0.96,1.31l0.02,0.4l-0.48,0.18ZM544.85,467.45l-0.26,0.08l0.72,-1.91l-0.06,0.84l-0.4,0.99ZM537.07,452.74l3.73,3.74l-0.54,2.57l-0.49,-0.11l-0.75,-1.78l-1.43,-0.9l-0.76,-1.62l-1.06,-1.18l0.55,-0.07l0.75,-0.64ZM529.81,445.7l-2.67,-1.77l-1.57,-0.47l-0.46,-0.71l0.65,-0.33l3.82,2.73l0.22,0.54Z", "name": "Indonesia"}, "OM": {"path": "M223.78,281.06l3.38,-0.67l0.29,-0.3l-0.45,-1.47l-1.1,-0.27l0.26,-4.83l0.69,-0.3l-0.25,0.67l1.14,1.14l2.12,-1.71l1.76,3.66l2.12,2.65l1.62,1.38l3.75,1.45l3.82,0.7l1.61,0.75l1.8,-0.16l1.27,0.87l1.96,3.07l2.97,3.68l1.01,0.78l1.88,0.47l-0.19,1.8l-3.17,5.6l-2.23,1.61l-1.3,1.38l-3.11,5.43l-1.27,0.02l0.2,-1.11l-0.45,-0.45l-0.63,0.09l-0.72,0.31l-1.78,2.51l-1.2,4.67l0.69,4.92l-4.45,0.72l-2.69,1.19l-1.36,1.35l-0.86,3.35l-1.11,1.22l-5.59,0.74l-1.26,0.47l-1.68,1.99l-0.21,0.8l0.41,1.01l-1.54,2.31l-1.94,0.51l-1.56,-0.49l-3.77,0.2l-3.53,1.9l-3.58,0.74l-1.98,-4.43l-0.59,-0.39l-5.4,-12.58l22.31,-7.89l4.97,-15.7l-3.38,-5.75l0.09,-2.41l2.31,-5.46l0.18,-0.91l-0.28,-0.81ZM247.35,309.88l0.0,-0.41l0.54,-0.61l-0.3,0.79l-0.24,0.24ZM248.53,308.01l0.2,-0.4l0.07,0.18l-0.27,0.22ZM228.41,263.74l0.31,-0.57l0.82,-0.1l0.38,-0.43l-0.33,3.33l-0.56,1.17l-0.36,-0.22l0.15,-2.76l-0.42,-0.43Z", "name": "Oman"}, "KG": {"path": "M333.84,133.42l1.81,-1.22l1.29,-1.33l1.2,-0.39l0.51,-0.99l2.75,-1.2l0.24,-0.51l-0.33,-0.57l-1.37,-0.73l-0.83,-0.02l0.93,-1.66l1.6,-1.66l3.59,-0.75l3.76,0.58l3.43,1.04l0.93,0.74l3.01,0.46l1.0,0.76l0.75,0.15l0.44,-0.52l-0.5,-1.57l0.95,-3.48l2.24,-1.01l0.53,-0.54l1.34,-0.0l0.6,-0.3l4.25,2.23l4.21,1.31l2.21,0.17l1.38,-1.08l5.05,0.16l3.55,-0.49l1.82,0.55l5.94,0.5l3.66,-0.07l2.7,0.81l1.83,0.02l0.38,0.88l1.76,1.69l3.68,0.64l1.99,1.86l0.2,0.82l-2.73,0.34l-0.69,0.92l-3.46,1.02l-4.15,2.01l-2.87,1.7l-0.29,0.97l-1.48,1.63l-2.25,0.18l-1.64,0.53l-4.35,-0.4l-0.86,0.18l-0.77,0.51l-1.24,1.84l-0.61,1.77l-1.46,1.67l-0.76,-0.52l-2.82,1.09l-1.14,-0.02l-0.54,-2.38l-0.56,-0.45l-3.42,1.52l-1.94,-0.32l-0.64,0.57l0.07,0.85l-0.9,0.24l-1.97,1.51l-3.29,0.96l-1.18,2.16l0.52,1.92l-0.49,0.68l-2.52,0.22l-2.64,0.86l-4.11,-0.13l-1.78,0.47l-0.72,0.87l-1.36,-1.13l-1.83,0.66l-0.31,-1.25l-1.47,-0.33l-0.05,-0.87l-0.65,-0.43l-3.16,1.0l-0.52,0.7l-1.26,0.12l-1.35,-1.46l-0.85,-0.22l-1.88,0.33l-0.56,-0.29l-1.73,0.26l-2.68,-0.18l-1.89,0.39l-0.45,-1.69l0.33,-1.19l1.21,0.22l0.53,-1.61l3.03,-0.86l0.66,0.22l2.71,1.05l0.49,0.78l-0.25,0.76l0.56,0.68l0.65,0.16l0.89,-0.38l0.19,-0.59l-0.27,-0.32l-1.06,-0.21l0.68,-0.5l0.21,-0.75l1.71,-0.69l0.01,0.93l0.46,0.52l-0.18,0.53l0.29,0.52l1.63,0.02l0.33,-0.32l-0.17,-0.81l0.26,-0.43l-0.29,-0.61l-0.9,-0.2l-0.78,-0.86l2.17,-0.26l1.43,0.63l0.91,0.01l0.78,0.5l1.93,-0.92l1.38,-1.61l1.76,0.26l0.46,-0.69l-0.19,-0.66l1.48,0.32l1.4,-1.17l2.73,-1.47l-0.24,-0.8l-3.56,-0.38l-2.13,-1.51l-1.14,0.14l-0.4,-1.32l-1.91,-0.17l-0.64,-1.78l-0.65,-0.42l-0.48,-0.9l-0.93,0.42l-0.15,1.53l-0.73,-0.17l-0.58,0.33l-0.07,1.45l-1.73,-0.13l-1.82,-0.62l-0.41,-0.24l-0.38,-1.21l-0.54,-0.58l-1.68,0.27l-1.78,-0.81ZM345.71,147.85l0.12,-0.51l-0.43,-0.47l-1.23,0.66l0.09,0.46l0.8,0.44l0.65,-0.58Z", "name": "Kyrgyzstan"}, "UZ": {"path": "M235.01,135.19l-0.38,0.4l-7.22,-0.5l-0.01,-32.71l18.68,-5.07l-1.24,2.18l-1.29,3.39l0.43,2.39l-0.39,1.23l0.7,1.14l0.78,0.02l1.18,-0.62l1.48,-2.22l0.55,-0.33l-0.18,-1.56l0.55,-1.23l-0.28,-0.48l-0.7,0.18l0.81,-1.1l-0.46,-0.93l-0.05,-1.12l4.44,2.62l-1.62,3.88l0.88,1.36l2.38,2.12l-0.8,1.35l0.51,0.69l2.08,-0.32l1.06,-0.65l0.04,-0.74l0.85,-0.92l-0.25,-2.44l0.36,-1.11l6.56,3.85l1.11,2.04l6.47,6.3l9.14,-1.24l9.21,0.7l3.4,-1.45l2.55,2.56l1.67,0.98l2.24,3.85l0.51,0.16l1.6,-0.74l-0.63,8.25l0.39,0.41l3.32,0.08l1.24,6.2l0.32,0.86l0.57,0.44l8.82,-0.28l1.03,1.2l-0.43,1.73l0.59,0.83l2.42,1.29l1.4,-0.01l0.52,-0.77l-0.32,-0.99l0.15,-0.68l1.09,-1.4l1.89,-1.48l0.64,-1.48l2.02,-0.94l2.24,-1.63l3.29,-1.36l2.33,-2.27l1.37,0.3l1.01,-1.21l2.11,-0.91l0.93,0.49l-2.53,1.07l-0.44,0.94l-1.23,0.44l-1.34,1.36l-2.01,1.35l-0.2,0.57l0.26,0.52l2.11,0.99l1.62,-0.31l0.55,1.44l0.77,0.57l2.02,0.69l2.03,0.24l0.65,-0.47l0.06,-1.22l1.11,-0.24l0.4,-1.1l0.62,0.37l0.89,2.05l1.85,0.11l0.32,1.36l1.44,-0.1l2.12,1.51l2.97,0.22l-2.11,1.0l-1.2,1.07l-1.66,-0.38l-0.4,0.63l0.2,0.8l-0.82,-0.42l-0.88,0.16l-1.5,1.67l-1.55,0.74l-0.4,-0.41l-0.89,0.03l-1.76,-0.69l-4.82,0.75l-0.78,-1.06l-0.95,-0.31l2.37,-2.04l0.47,-0.8l-0.25,-0.53l-0.5,-0.2l-0.31,-0.85l0.28,-0.59l-0.77,-0.87l-0.64,0.33l-0.71,-0.45l-0.47,0.06l-0.75,1.28l-4.15,1.99l-2.01,-1.2l-0.79,0.29l-0.44,0.45l-0.08,0.91l-0.78,0.89l0.66,1.91l-0.54,0.61l0.12,0.23l-1.83,-0.23l-2.24,0.35l-0.48,0.4l0.13,0.72l1.32,0.17l-0.28,0.55l0.25,0.62l-0.42,0.55l-0.95,0.33l-0.38,1.71l-0.49,0.52l-0.55,0.2l-5.24,-0.78l-1.43,0.63l-0.99,0.99l-0.57,1.96l0.25,0.69l2.09,0.69l0.1,0.82l0.46,0.48l2.06,0.03l0.94,0.36l-0.68,2.1l0.3,1.76l1.99,2.53l-0.76,1.55l-2.87,3.49l-0.41,0.88l-0.12,2.0l-1.76,-0.47l-1.47,0.47l-0.7,-0.17l-1.07,-0.89l-1.91,-0.32l-1.89,0.16l0.06,-3.23l0.78,-1.43l-0.54,-0.95l-1.52,-0.43l-3.17,-1.69l-0.85,-0.21l-1.77,0.28l-7.35,-4.47l-2.31,-1.91l-1.29,0.09l-2.83,-1.72l-1.93,-1.9l-7.31,-4.97l-0.51,-0.65l-0.49,-2.55l-0.61,-1.3l-0.87,-0.74l-0.64,-1.16l-1.1,-3.16l-1.28,-1.31l-2.48,-1.06l-1.9,0.77l-2.81,-0.53l-2.94,0.25l-2.59,-1.5l0.47,-1.53l-0.46,-1.25l0.64,-0.07l0.29,-0.56l-0.78,-1.1l-1.03,-0.46l0.27,-2.1l-1.15,-0.98l-3.9,-0.33l-1.34,-1.62l-2.16,-0.49l-2.12,-1.93l-0.62,0.13l-0.54,0.81l-1.74,-0.18l-0.89,0.6l-0.12,0.44l1.2,1.15l-1.99,-0.33l-0.69,0.68l-0.89,1.97l-1.02,0.19l-0.54,-0.82l-1.18,-0.67l-1.43,0.42l-1.4,3.21l-0.97,1.06l0.41,3.65l0.6,0.81ZM339.66,146.55l0.91,0.56l0.05,0.74l-0.49,-0.01l0.12,-0.53l-0.59,-0.76Z", "name": "Uzbekistan"}, "MM": {"path": "M501.87,308.34l-2.26,-2.73l-1.05,-3.71l0.63,-0.77l1.51,1.13l0.9,0.03l0.33,-0.59l-0.38,-5.03l0.64,-0.95l0.86,0.88l1.08,0.06l0.8,-1.56l0.88,-0.54l0.09,-1.09l-0.62,-2.76l0.58,-1.39l-0.03,-0.73l0.87,-0.01l0.58,-0.69l0.33,-2.1l0.18,-2.73l-0.73,-2.47l0.78,0.52l1.48,-0.24l3.04,1.06l0.73,-0.28l1.24,-3.53l2.17,-3.53l0.94,-2.27l-0.28,-1.07l-0.85,-0.49l0.17,-0.6l0.54,-0.94l0.93,-0.53l1.22,-1.47l0.58,-1.77l0.83,-0.97l-0.54,-2.69l0.49,-1.72l2.44,-1.24l3.25,-2.3l1.21,-1.39l0.86,-0.31l3.81,-0.56l1.57,1.55l1.42,0.2l0.31,-0.38l-0.06,-0.62l-1.47,-2.17l-0.16,-0.97l0.5,-0.65l2.83,-1.98l-0.02,-2.36l1.48,-2.18l0.46,0.06l0.7,1.04l1.0,0.12l1.42,1.56l1.51,4.79l0.65,0.32l0.41,-0.14l0.5,-0.79l1.08,0.52l0.63,6.78l-0.41,4.04l-0.56,0.28l-0.34,0.65l0.68,1.61l-1.38,0.54l-0.91,1.5l-0.85,-0.14l-0.57,0.27l-1.0,2.23l-1.52,0.44l-0.83,1.9l0.14,1.26l-1.1,0.7l-0.4,1.14l-0.01,1.25l1.02,1.05l0.29,1.08l-0.09,0.56l-0.85,1.05l-0.12,0.85l0.97,0.6l2.95,-1.43l1.39,-0.34l2.03,-0.04l0.79,0.35l0.91,-0.25l-0.5,0.55l-0.18,1.14l1.11,1.71l-0.19,1.0l0.59,1.0l-0.14,1.34l0.27,0.45l3.62,0.77l0.88,0.49l-0.78,1.01l-0.41,1.19l-0.02,1.49l-1.22,2.41l0.2,0.88l5.52,0.9l0.07,1.97l0.5,0.62l0.65,0.23l0.22,1.16l0.92,0.49l1.14,-0.27l1.21,0.31l0.84,-0.13l1.79,-1.47l1.57,-0.69l0.12,0.86l-0.39,0.69l-2.43,1.24l-0.4,0.48l-0.39,1.03l-0.95,1.18l0.11,1.06l-1.42,0.17l-0.71,0.59l-0.99,2.9l-1.37,-0.61l-1.41,0.77l-2.17,-0.17l-0.16,0.52l0.31,1.19l-0.81,0.38l-1.0,-0.28l-1.17,0.21l-0.5,0.57l-0.59,1.91l-3.95,0.64l-0.85,-0.01l-1.03,-0.56l-0.98,0.16l-0.33,0.86l-1.35,1.68l-0.11,2.5l-0.72,1.6l0.34,2.47l-1.49,0.55l-0.93,-0.17l-0.39,0.51l0.69,1.42l0.55,0.49l0.63,0.07l0.73,1.76l0.01,2.02l5.42,6.28l0.27,1.82l1.46,3.22l0.73,0.21l0.84,-0.59l-0.39,0.92l-1.82,1.25l-0.22,5.02l-0.66,0.03l-2.01,1.22l-0.22,0.78l0.18,1.31l0.4,1.41l2.42,3.46l2.76,2.42l1.43,2.38l0.28,3.46l-0.48,0.95l0.1,0.8l0.73,2.25l1.35,1.44l0.46,2.72l1.12,3.05l-0.96,1.03l-2.14,3.82l-3.26,3.39l0.03,1.89l-0.44,1.56l-0.67,0.72l0.06,-1.69l-0.4,-2.26l1.49,-2.26l0.57,-2.2l-0.01,-2.49l0.82,-0.74l-0.02,-0.69l-0.92,-0.45l-0.71,0.36l0.44,-1.37l0.03,-1.9l-0.53,-0.52l0.37,-0.74l-0.31,-0.53l0.25,-1.66l-0.66,-3.84l-1.23,-2.64l-1.24,-1.8l-0.14,-1.67l-0.29,-0.35l-0.7,0.2l-0.05,0.34l0.04,-1.87l-0.73,-1.27l-0.52,-1.99l0.6,-0.05l0.02,-0.49l-1.47,-1.44l-0.76,-7.75l-0.91,-1.16l0.39,-1.7l-0.05,-1.47l0.64,-1.12l-0.47,-0.2l-2.21,0.33l-1.14,-2.55l-0.24,-1.78l-1.72,-1.71l-0.89,-0.65l-0.49,0.01l-0.12,0.47l0.32,0.63l-0.34,0.87l0.38,1.18l-0.96,2.24l-0.99,1.04l-1.18,0.38l-0.79,-0.51l-0.41,-1.44l-0.79,-0.04l-0.23,0.5l0.87,2.31l-1.72,0.47l-0.36,0.71l-1.73,0.6l-0.85,1.65l-1.91,1.73l-0.12,-0.68l0.43,-0.98l-0.13,-0.86l-0.39,-0.34l-1.43,2.06l-1.33,0.03l-0.25,-2.39l-0.34,-0.35l-0.43,0.25l-0.35,1.13l-0.66,0.53l0.47,-3.19l-0.13,-0.93l-0.38,-0.31l-0.4,0.29l-0.28,1.27l-1.6,1.76l-0.96,0.53l0.36,-3.3l0.61,-0.99l0.91,-3.82l0.66,-1.3l0.21,-2.27l-0.71,-2.01l-0.47,-2.85l-1.68,-3.76l0.29,-0.25l-0.15,-0.42l-1.16,-0.97l-0.18,-2.93l-0.62,-0.3l0.17,-1.18l-1.22,-0.77l-0.64,-1.12l-0.81,-0.55l0.51,-0.72l-0.32,-0.65l-0.8,0.02l-1.26,-0.97l-1.31,-0.28l-0.87,0.25l-0.16,0.86l-0.41,-0.72l0.51,-0.56l-0.36,-0.73l0.26,-0.99l-0.35,-0.61l-0.66,0.19l-0.12,0.44l-0.32,0.57l-0.2,-1.16l-1.2,-1.37l-0.61,0.47l0.15,0.71ZM511.54,317.64l-0.59,1.02l0.13,1.32l-1.21,-0.74l-1.27,-2.11l0.87,0.82l0.88,0.31l1.18,-0.61ZM503.54,309.93l-0.24,0.32l-0.03,-0.02l0.15,-0.21l0.13,-0.09ZM545.29,376.32l-0.21,-0.96l0.34,-0.03l-0.06,1.01l-0.07,-0.02ZM544.52,369.1l0.3,0.29l-0.24,0.63l0.04,-0.45l-0.1,-0.47ZM538.23,340.2l-0.05,-0.68l0.11,-0.08l0.04,0.12l-0.1,0.65ZM509.61,315.91l1.12,0.49l0.2,0.28l-0.64,0.23l-0.68,-1.0ZM509.32,321.7l-0.47,-0.39l-0.2,-0.27l0.82,0.06l-0.15,0.6Z", "name": "Myanmar"}, "SG": {"path": "M585.95,453.53l-0.64,0.28l-0.67,-0.24l0.65,-0.28l0.66,0.24Z", "name": "Singapore"}, "KH": {"path": "M574.51,361.92l1.66,-0.41l0.12,-0.61l3.37,-4.31l3.71,-1.2l3.21,0.46l5.93,-0.52l1.08,0.34l0.57,1.07l0.57,0.1l0.63,-0.48l1.18,1.3l1.61,-0.24l1.3,0.45l1.26,1.22l1.44,0.1l0.37,-0.24l0.45,-1.27l-0.97,-1.85l1.11,-0.15l0.48,-0.66l0.95,0.03l0.88,-0.67l2.44,1.8l2.36,-0.87l1.16,-1.19l0.89,0.17l-0.8,1.05l-0.24,1.95l2.04,5.15l-0.97,3.16l0.51,2.51l-0.03,1.91l-0.66,0.91l-0.49,-0.33l-1.01,0.13l-2.18,1.73l-1.13,0.17l-0.63,0.58l-2.02,0.22l-0.32,0.43l-0.03,1.57l-2.6,-0.56l-1.56,1.19l0.08,2.96l2.22,1.94l-0.12,1.13l-0.94,-0.53l-0.65,0.09l-0.64,-0.81l-0.81,-0.16l-2.31,0.37l-0.59,0.64l-2.19,-0.27l-0.28,0.53l0.26,1.06l-1.38,1.2l-1.93,0.08l-0.92,0.75l-1.07,-0.86l-2.44,-0.4l-0.61,-0.53l-1.67,1.04l-0.56,-0.58l1.05,-0.75l0.31,-1.0l-0.63,-1.7l-0.96,-0.7l-0.49,0.05l-1.25,1.62l-1.01,0.05l-0.36,-1.87l0.15,-2.16l-0.77,-0.87l-0.14,-1.03l-0.42,-0.48l-0.35,0.04l-1.16,-2.31l-0.2,-1.12l0.28,-1.55l-1.85,-1.81l-0.28,-2.48l-0.98,-2.09l-0.07,-1.62Z", "name": "Cambodia"}, "CY": {"path": "M52.44,189.37l1.85,0.77l2.04,-0.71l1.37,0.09l0.52,1.29l1.4,-0.11l-1.77,1.53l-2.23,0.47l-0.92,0.87l-0.57,-0.55l-1.44,0.04l-1.81,-0.89l-0.72,-1.76l2.3,-1.04ZM61.14,190.36l0.36,-0.24l0.39,0.2l-0.02,0.0l-0.74,0.04Z", "name": "Cyprus"}, "QA": {"path": "M191.62,275.3l-1.7,0.32l-0.94,-0.72l-0.29,-0.65l0.27,-0.89l-0.68,-3.97l1.8,-4.45l1.49,-1.1l1.85,1.74l0.16,0.7l-0.61,2.21l0.9,3.61l-1.28,2.84l-0.98,0.35Z", "name": "Qatar"}, "KR": {"path": "M753.99,193.32l1.41,0.11l0.77,-1.18l-0.16,-0.67l-1.06,0.07l-0.87,-2.37l1.33,-2.74l0.95,-0.67l-0.16,-0.61l-0.43,-0.18l1.23,-0.79l0.46,-1.12l-0.69,-0.79l0.15,-0.9l-1.0,-1.05l0.03,-2.59l-0.46,-1.89l-0.52,-0.32l-0.69,0.31l-1.16,-0.29l-0.06,-0.26l0.32,-0.64l1.87,-1.06l1.8,0.49l0.69,1.02l0.63,-0.26l0.75,-0.88l-0.05,-0.43l-0.86,-0.41l-0.49,-0.88l-0.24,-0.71l0.21,-1.04l-0.97,-1.25l-0.02,-0.95l-0.61,-1.14l0.73,-0.78l0.02,-0.84l2.94,-3.01l7.06,-0.2l1.16,-0.57l1.11,-1.88l1.63,3.45l3.24,4.33l2.09,3.42l0.59,1.76l0.4,2.63l-0.59,3.62l0.08,2.32l0.41,0.65l0.8,-0.05l-1.07,3.98l-1.43,2.52l-1.54,0.6l-3.68,0.07l-0.8,0.84l0.15,1.0l-1.97,-0.42l-0.36,-0.62l-0.82,-0.17l-2.72,1.01l-0.15,0.64l0.66,0.86l-0.22,0.18l-0.9,-1.18l-1.06,0.16l-0.38,0.99l0.54,1.03l-0.65,0.91l-0.63,-0.39l0.57,-0.75l0.01,-0.74l-0.76,-0.42l-1.62,1.25l-0.93,1.29l-0.72,-0.54l-0.43,0.06l-1.2,1.11l-0.35,-0.97l-1.31,-1.11ZM771.49,190.93l0.08,1.06l-0.29,0.22l-0.66,-0.49l0.86,-0.78ZM765.7,192.18l0.1,-0.56l0.61,0.23l0.08,0.65l-0.79,-0.32ZM753.88,205.05l-0.4,0.13l-0.34,-0.44l1.03,-0.9l2.57,-0.72l1.17,0.22l-0.17,0.82l-1.1,0.52l-2.75,0.38ZM754.66,166.8l0.29,0.31l-0.02,0.58l-0.05,-0.07l-0.22,-0.82ZM752.75,195.37l0.75,-0.75l0.33,0.12l-0.79,0.68l-0.29,-0.06Z", "name": "Korea"}, "KP": {"path": "M739.6,147.16l0.14,-0.66l3.53,-2.94l0.73,-0.05l0.7,-0.77l2.64,-1.04l1.79,-1.14l0.46,-0.63l2.08,-0.45l3.82,-4.13l0.8,-2.45l0.81,-0.6l1.35,-0.45l1.79,2.16l2.94,0.69l2.65,-0.05l1.43,0.64l0.6,-0.11l1.12,-1.65l0.03,-0.6l-1.93,-3.06l6.28,-0.39l2.31,-1.74l0.26,-0.98l0.6,-0.76l0.46,-0.12l0.94,0.46l1.56,-0.74l1.33,-4.79l1.16,0.23l0.9,0.63l0.05,1.25l0.9,1.09l1.06,0.61l1.01,1.58l0.03,0.25l-1.33,-0.07l-1.59,1.03l-0.54,0.84l-1.29,0.97l-1.02,1.7l-0.93,0.9l-0.57,1.22l-0.03,0.9l0.62,1.68l-0.39,1.55l0.05,2.17l-2.69,1.16l-1.75,2.08l-2.92,1.48l-1.5,1.69l-1.47,0.78l-2.52,0.37l-0.87,0.93l-2.36,1.18l-0.33,0.96l0.16,1.96l-0.92,0.66l-0.24,1.65l3.07,1.36l1.43,1.65l2.59,1.82l-0.83,1.83l-0.7,0.63l-7.56,0.36l-0.78,0.49l-2.53,2.77l-0.15,0.99l-1.95,-0.73l-1.25,0.43l-0.37,0.46l-0.62,-0.84l-0.69,-0.03l-1.57,-0.95l-0.56,0.2l-1.0,1.37l-0.98,0.69l-0.68,-1.04l-1.65,-0.42l1.24,-0.68l0.08,-0.69l-0.74,-0.38l-2.63,-0.13l0.57,-0.37l0.23,-1.18l1.23,-1.65l1.71,-0.89l1.78,-0.17l0.16,-0.72l-1.08,-0.59l-0.97,0.01l-0.74,-0.65l1.87,-3.69l-0.37,-2.17l-0.26,-0.33l-1.97,-0.58l-2.32,-1.41l-0.69,0.12l-0.28,0.95l-0.54,-1.23l-1.46,-0.96l0.07,-0.75Z", "name": "Dem. Rep. Korea"}, "KW": {"path": "M167.69,235.06l-0.94,-0.06l-1.81,1.62l-0.16,0.46l0.3,0.43l2.23,0.19l0.93,2.92l1.65,3.04l-4.92,0.07l-1.91,-3.71l-5.99,-0.78l2.32,-3.08l1.56,-3.47l0.65,-0.51l3.13,-0.41l1.92,0.77l1.03,2.52ZM168.51,233.33l0.2,-0.32l0.75,1.05l-0.02,0.41l-0.58,0.53l-0.55,-1.16l0.2,-0.51Z", "name": "Kuwait"}, "KZ": {"path": "M172.6,48.91l0.9,0.03l3.88,-2.48l1.29,-2.26l2.33,-0.47l3.78,-1.94l3.63,-3.95l2.37,0.74l0.63,0.42l0.18,0.79l0.68,0.55l2.22,-0.14l2.95,-1.86l1.41,-0.32l0.62,0.21l1.14,1.57l0.7,0.43l1.96,-0.09l1.71,0.31l2.14,-0.2l1.31,0.73l1.23,1.52l2.02,0.91l1.27,1.11l2.02,2.46l0.45,2.04l0.86,0.61l0.55,-0.18l0.52,-0.7l0.01,-2.02l-0.64,-1.53l0.32,-0.24l2.51,1.3l2.63,2.04l2.58,0.87l1.09,-0.23l1.92,-1.12l0.81,-1.36l2.35,-1.56l1.04,0.32l2.77,-0.8l1.08,0.25l2.19,1.49l1.71,-0.39l1.32,-1.6l3.67,0.24l1.29,0.84l2.53,2.74l4.39,0.81l0.18,0.98l0.58,0.27l2.31,-0.95l1.57,-2.53l1.48,1.33l1.19,0.33l1.74,0.16l2.36,-0.33l2.13,-0.78l1.45,-1.06l1.44,-3.61l-0.18,-1.24l-1.75,-1.46l-2.4,-0.46l-0.47,-0.47l-3.68,-1.1l-0.59,-1.19l-2.45,-1.29l2.68,-1.56l1.87,-0.28l2.52,-1.96l-0.1,-1.05l-1.45,-2.62l1.84,-2.62l2.4,-0.21l4.25,0.52l1.19,-0.76l0.08,-0.8l-0.76,-0.88l-2.56,-1.18l-3.42,-0.64l0.2,-0.91l1.93,-0.37l0.51,-0.66l-0.13,-0.57l-0.65,-0.52l-1.74,0.28l-1.53,-0.53l0.84,-0.91l0.25,-2.16l0.51,-0.45l0.58,-0.23l4.51,1.03l0.91,-0.57l3.3,-0.1l1.14,-0.59l3.19,-0.36l0.96,-0.67l3.77,-0.75l1.12,0.06l2.66,-1.15l1.79,-0.35l1.52,0.31l1.98,-0.42l1.43,0.51l0.73,-0.49l0.53,-1.42l1.64,-0.98l1.56,0.04l1.46,-0.68l0.42,0.25l2.01,-0.08l4.05,-0.74l7.0,-1.39l1.13,-0.75l2.4,-0.34l0.91,-0.99l-0.15,-1.07l1.96,-0.31l1.56,-1.14l1.81,-0.78l3.75,0.33l5.15,2.03l1.1,-0.26l1.4,-1.0l1.59,-0.2l1.09,1.6l2.0,5.33l-0.22,2.29l-0.68,0.98l0.51,1.11l1.97,0.57l4.11,-0.64l0.78,0.15l0.73,-0.32l0.6,-0.87l1.2,1.76l0.14,1.58l0.48,0.49l0.43,0.03l1.22,-0.77l-0.04,-1.15l1.95,0.25l1.45,1.23l1.06,0.33l1.3,-0.08l1.86,-1.02l-0.1,0.73l-1.95,1.12l-0.92,1.37l-0.1,1.36l0.6,1.33l0.56,0.4l0.83,-0.3l1.25,-1.06l1.43,-0.39l2.39,0.39l1.44,0.92l0.59,-0.38l0.33,-1.35l2.69,-1.72l1.54,0.01l1.42,-0.75l1.17,-0.78l0.38,-1.17l1.89,-0.27l4.3,-2.03l1.77,-0.27l1.82,-0.97l-0.98,2.17l-1.56,-0.06l-0.41,0.4l0.55,1.55l0.79,0.92l8.43,5.75l1.1,1.06l4.59,6.36l5.04,7.73l6.5,11.03l0.6,0.16l0.5,-0.35l0.09,-0.58l0.86,-0.62l1.5,-0.34l0.42,-0.72l-0.09,-1.71l1.85,-0.96l0.89,0.1l0.79,0.91l0.93,0.01l-0.46,1.28l0.16,0.85l0.65,0.27l1.62,-0.15l0.32,1.74l0.56,0.45l3.42,-0.26l1.35,0.54l3.1,-0.2l0.97,-0.49l0.98,-1.1l1.82,-0.04l1.15,-0.91l1.29,-0.05l2.57,1.01l1.58,1.03l1.67,2.39l0.61,2.25l0.59,0.64l2.26,0.45l1.67,1.05l0.97,0.21l0.07,1.51l1.98,2.96l5.14,0.63l0.59,0.53l1.47,0.0l3.64,-2.68l-0.67,0.96l0.01,0.79l1.47,0.91l1.45,1.98l2.0,1.07l-2.66,0.15l-1.2,0.9l-0.36,3.14l-1.13,1.45l-6.08,1.5l-0.96,1.82l-0.76,2.8l0.45,4.09l0.61,1.53l-0.07,0.57l-1.1,1.62l-1.93,0.31l-2.97,1.82l-0.39,-0.9l-0.63,-0.4l-2.48,-0.23l-2.39,0.24l-2.17,-0.46l-4.68,-1.78l-0.74,0.25l-0.61,2.3l-3.13,7.56l-1.83,5.41l0.31,1.09l1.95,0.76l0.03,0.93l-0.52,1.22l-1.62,-0.86l-2.46,0.52l-0.88,-0.45l-0.34,-0.87l-0.92,-0.39l-6.12,1.99l-1.69,0.04l-4.31,1.11l-1.6,1.24l0.06,0.82l0.97,0.62l2.04,-0.05l1.07,0.43l-0.38,0.34l-0.41,2.18l0.14,3.17l2.24,5.03l0.35,1.1l-0.24,1.1l0.87,1.41l-1.02,-0.13l-1.69,0.77l-0.34,0.96l0.72,0.7l-1.42,0.56l-0.57,0.78l-0.33,1.2l0.71,3.27l-2.01,-1.79l-3.53,-0.57l-2.33,-2.68l-1.92,-0.03l-2.75,-0.82l-3.74,0.06l-5.84,-0.49l-1.92,-0.56l-3.62,0.5l-5.04,-0.17l-0.64,0.18l-0.91,0.93l-1.89,-0.19l-4.02,-1.25l-4.54,-2.38l-0.73,0.39l-1.36,-0.01l-3.25,1.86l-1.12,3.91l0.33,1.19l-0.86,-0.69l-3.16,-0.51l-0.81,-0.69l-3.56,-1.08l-3.49,-0.6l-2.34,0.48l-0.84,-0.12l-1.24,0.45l-1.88,1.87l-1.05,1.86l0.09,0.95l-1.3,0.47l-0.89,1.12l-0.6,-0.38l-0.76,0.09l-2.43,2.34l-3.9,1.67l-1.56,1.26l-2.24,1.13l-0.61,1.47l-1.85,1.44l-1.2,1.53l-0.29,1.22l0.32,0.85l-0.38,0.14l-1.35,-0.38l-1.57,-1.14l0.45,-1.71l-1.39,-1.84l-9.18,0.12l-1.51,-7.1l-0.39,-0.35l-3.27,-0.08l0.67,-8.49l-0.57,-0.39l-1.9,0.88l-2.11,-3.62l-1.8,-1.1l-2.72,-2.7l-1.13,0.14l-2.67,1.26l-9.15,-0.69l-8.97,1.25l-6.08,-6.05l-1.18,-2.1l-7.01,-4.12l0.16,-4.09l-0.32,-2.03l-0.55,-0.81l-1.7,-0.05l0.79,-2.36l4.16,0.6l3.04,-2.59l2.71,-1.03l0.78,-1.31l0.09,-0.76l-0.31,-0.59l-3.08,-0.71l-0.31,-1.74l-0.64,-0.6l-0.91,-0.15l-0.5,0.03l-0.32,0.58l1.13,0.99l-0.33,0.23l-1.16,-0.19l-0.4,0.28l-0.45,-0.86l-0.82,-0.28l-1.65,0.88l-0.66,1.3l0.28,0.84l0.66,0.56l2.26,-0.05l1.37,0.79l1.08,-0.56l0.53,1.15l-0.81,0.93l-4.22,-0.5l-1.77,0.48l-0.37,-2.0l-2.18,-0.48l-0.35,0.74l1.13,1.75l0.17,0.88l-0.58,1.96l-0.93,0.41l-0.51,-0.21l-0.53,0.4l-0.13,-0.6l0.7,-1.38l-0.33,-0.61l-0.63,-0.13l-0.95,0.42l-1.25,-0.14l-2.13,1.31l-0.9,2.61l-19.46,5.2l-0.29,0.39l0.01,32.99l-2.83,0.53l-0.57,-0.2l-1.35,-1.41l-2.96,-4.54l-1.41,-1.09l-4.37,-2.37l-3.36,0.36l-4.75,1.36l-1.5,0.85l-2.33,2.04l-0.09,-2.01l1.15,-2.89l0.17,-1.24l-0.41,-2.16l-0.95,-0.67l-1.69,0.1l-0.71,-0.56l-1.98,0.04l-2.08,-2.59l-2.26,-0.17l0.03,-2.63l-1.79,-2.47l-1.73,-4.01l-1.3,-0.88l-2.65,-0.56l-0.35,-0.85l0.23,-0.83l0.64,-0.3l3.16,-0.04l2.45,1.17l3.15,-0.49l-0.43,-0.87l-1.43,-0.45l-2.03,-1.99l0.08,-0.75l1.54,-1.3l1.11,-2.04l0.9,0.09l1.37,-0.5l5.13,-0.05l3.59,0.79l2.3,-0.12l0.16,-0.7l-2.99,-1.97l1.93,-3.52l0.7,-2.09l-0.18,-2.25l-0.32,-0.62l0.75,-1.88l-0.81,-1.87l-1.25,-1.02l-3.38,-0.4l-2.67,1.51l-1.0,-0.67l-1.73,-0.26l-1.03,-0.92l-3.56,-0.77l-2.01,0.69l-2.49,1.47l-1.33,0.11l-3.84,2.59l-4.01,0.71l-0.31,0.81l-0.94,0.66l-4.0,-1.89l-0.55,-0.56l0.02,-0.42l0.32,-0.14l1.13,0.48l1.1,0.05l0.75,-0.51l0.02,-0.71l-3.06,-5.19l-2.97,-3.78l-0.64,-0.44l-4.69,-0.56l-1.42,0.55l-1.14,-1.56l0.18,-1.65l-0.51,-1.3l-0.62,-0.61l-2.35,-1.11l-0.32,-1.28l0.65,-2.06l1.91,-2.2l0.57,-1.21l-0.2,-0.85l-1.49,-1.44l0.62,-2.97l0.71,-1.41l2.29,-2.06l0.24,-2.1l1.15,-1.1l1.13,0.2l3.84,4.33l0.94,0.79l1.03,0.29l2.46,-0.98l0.83,-1.02l-1.33,-5.63ZM248.32,97.54l1.41,-1.65l0.64,-0.08l0.28,-0.6l1.51,1.9l0.45,2.98l-4.3,-2.54ZM201.9,97.61l0.06,0.13l-0.08,-0.1l0.02,-0.02Z", "name": "Kazakhstan"}, "SA": {"path": "M67.56,247.08l1.06,-2.61l1.21,-6.57l8.14,1.18l3.22,-2.48l1.76,-2.79l5.69,-1.31l1.39,-2.79l2.37,-1.31l0.11,-0.62l-7.19,-7.71l14.36,-3.99l1.39,-1.04l8.92,1.5l12.67,7.05l19.68,15.46l12.58,1.15l1.36,-0.26l6.48,0.83l0.99,2.68l0.74,0.93l5.85,0.06l1.24,3.08l1.36,1.9l0.02,1.54l0.92,0.84l1.96,0.85l-0.09,0.58l1.74,2.09l1.07,0.33l1.25,1.48l2.47,1.51l-0.38,0.48l0.15,1.27l1.23,1.15l0.15,0.54l-0.3,1.16l-0.68,-0.02l-0.35,0.56l1.61,4.02l1.62,1.6l0.79,2.71l2.88,4.0l1.44,0.3l1.24,-0.31l0.58,0.29l-0.56,1.24l0.27,0.54l1.64,0.42l0.26,1.52l7.21,9.07l19.35,2.6l0.62,-0.35l3.01,4.88l-4.85,15.33l-22.24,7.7l-22.07,3.25l-6.65,3.39l-4.44,5.48l-1.05,2.59l-1.98,1.12l-0.97,-0.04l-2.04,-2.41l-3.15,0.26l-5.76,-0.54l-2.94,-0.97l-7.47,0.22l-1.72,0.54l-1.36,-0.25l-1.4,-1.05l-1.17,-0.12l-1.94,1.53l0.2,0.75l-0.46,0.41l-0.3,2.08l0.52,1.22l-0.09,0.47l-2.09,2.0l-0.74,-2.32l-2.34,-2.97l-0.72,-2.45l-4.07,-3.48l-1.74,-2.75l-0.63,-1.61l-1.43,-1.65l-0.88,-3.14l-2.67,-5.22l-1.18,-0.68l-1.03,-1.34l-3.01,-2.12l-1.56,-0.27l-1.05,-0.68l-3.32,-4.48l-1.26,-2.42l0.36,-1.64l-1.18,-2.86l0.78,-3.89l-0.25,-1.73l-0.41,-1.31l-0.77,-0.8l0.17,-0.38l-1.0,-1.2l-0.69,-2.03l-1.87,-3.31l-1.37,-1.63l-2.72,-2.14l-0.88,-0.15l-0.94,-0.69l-1.05,-0.1l-2.46,-3.84l0.54,-1.19l-0.93,-2.77l-1.71,-2.8l-1.2,-0.94l-0.59,-2.11l-1.27,-0.76l-1.95,-3.81l-3.0,-3.86l-0.72,-1.58l-1.32,-1.36l-1.19,-2.44l-1.82,-2.44l-1.05,-0.58l-2.95,-0.27ZM121.15,336.6l0.4,-0.33l0.04,0.83l-0.42,-0.42l-0.03,-0.07Z", "name": "Saudi Arabia"}, "MY": {"path": "M641.05,446.05l0.71,0.36l0.8,-0.15l0.31,-0.63l-0.05,-1.52l1.13,-1.14l8.26,-1.87l2.45,-1.08l3.07,-4.07l3.61,-3.82l0.56,-2.37l1.04,0.65l0.74,1.61l0.77,0.18l1.45,1.69l0.83,-0.12l1.04,-1.16l0.49,-1.72l-0.65,-2.41l1.27,-0.83l0.6,3.28l1.34,0.6l0.79,-0.16l0.23,-0.69l-1.05,-3.38l1.72,-0.53l1.0,-0.99l0.28,-0.89l-0.2,-0.46l-0.76,-0.4l-0.24,-0.75l0.85,-0.95l1.6,0.28l0.86,-0.69l1.46,-2.15l0.59,-1.82l2.63,-2.91l1.82,-3.25l0.07,1.03l-0.4,1.27l0.42,0.49l1.23,-0.56l1.41,-2.12l0.39,0.11l0.49,1.95l2.54,1.44l0.3,1.12l-0.58,0.84l0.21,1.26l-1.06,1.1l0.45,0.27l2.37,-0.42l1.26,-0.69l0.4,0.75l-1.28,0.7l0.39,0.84l0.8,0.12l1.71,-0.81l0.54,0.09l1.09,0.52l0.73,1.09l2.73,1.23l1.7,0.01l0.25,0.23l-0.17,1.1l-2.14,0.94l-1.73,0.42l-2.17,-0.4l-1.23,0.45l-0.5,1.64l1.11,1.27l1.74,1.22l-0.31,0.37l-3.61,0.82l-2.24,-0.68l-0.65,0.38l-0.47,0.91l-1.98,-0.95l-1.4,-0.29l-4.28,-0.24l-0.9,0.41l-1.26,-0.36l-1.67,0.49l-0.93,-0.39l-0.65,0.17l-1.34,1.23l-0.86,2.06l-0.01,3.59l-0.75,2.89l-1.52,0.08l-1.28,1.48l-0.09,1.78l0.74,0.64l-2.9,2.03l-0.23,0.94l0.5,1.26l-0.87,0.78l-1.12,2.74l-1.0,-0.3l-3.61,0.49l-1.97,1.43l-0.64,-0.42l-3.69,-1.0l-0.07,-0.54l-0.57,-0.44l-3.66,0.03l-2.38,0.96l-0.86,2.2l-1.16,0.28l-0.79,0.7l-2.19,0.08l-3.0,-0.4l-4.31,1.39l-5.53,-4.81l-0.52,-0.59l-0.12,-1.09l-0.67,-0.63l0.15,-0.41l0.53,0.81l2.05,1.09l2.87,0.04l2.35,1.25l1.7,0.14l1.46,0.96l1.09,0.05l0.35,-0.32l-0.2,-0.43l-1.23,-0.89l0.83,-1.07l0.2,-1.39l0.73,-1.77l-0.46,-0.71l0.0,-1.02ZM684.91,409.61l0.41,-0.56l0.41,-0.05l-0.11,0.45l-0.71,0.16ZM560.8,415.59l1.25,-0.03l0.88,1.55l1.37,0.16l0.1,1.64l-0.72,1.49l1.08,1.33l0.76,0.04l0.91,-1.13l1.92,-0.77l0.73,0.88l1.24,0.0l0.78,-0.51l0.47,-1.13l0.82,-0.81l0.26,-0.92l1.31,0.38l1.47,2.32l4.16,3.36l2.32,4.07l0.27,1.27l0.11,2.01l-0.8,4.74l0.67,1.89l-0.05,4.51l0.79,1.27l2.02,1.44l3.01,6.32l0.41,2.01l-0.51,-0.09l-0.34,-0.92l-1.12,-0.76l-0.17,1.27l-1.91,0.01l-1.28,0.88l-0.97,-1.56l-4.68,-2.31l-1.38,-1.41l-2.98,-1.53l-2.64,-2.36l-2.02,-0.89l-1.43,-1.29l0.34,-0.91l-0.49,-2.0l-4.16,-5.01l0.43,-0.68l-1.32,-2.52l-0.02,-2.17l-1.05,-2.92l-0.88,-3.99l-0.08,-3.02l-1.65,-3.37l0.29,-1.42l0.84,0.97l1.64,0.62ZM558.59,423.72l0.04,-0.52l0.15,0.07l-0.19,0.45ZM554.87,416.01l0.61,-0.22l0.15,0.23l-0.64,0.21l-0.12,-0.22Z", "name": "Malaysia"}, "YE": {"path": "M210.22,368.93l3.31,-0.15l1.6,0.56l-2.1,0.96l-2.93,0.3l-0.74,-0.15l-1.64,-1.15l1.07,-0.91l1.43,0.54ZM128.17,348.79l0.44,-0.21l0.08,-0.52l-0.6,-2.52l0.88,-2.78l-0.26,-2.55l2.7,-2.53l0.16,-1.06l-0.5,-1.03l0.13,-1.2l0.71,-1.07l-0.29,-0.74l0.95,-0.8l1.11,-0.07l1.35,1.04l1.75,0.31l1.77,-0.56l7.3,-0.22l2.88,0.97l5.8,0.55l2.98,-0.27l1.72,2.26l1.74,0.18l2.31,-1.32l1.14,-2.71l4.35,-5.36l7.46,-3.52l20.53,-2.86l5.51,12.84l0.6,0.39l1.9,4.24l-3.44,1.26l-1.95,1.39l-0.81,1.14l-0.47,1.65l0.32,2.18l-4.38,2.32l-4.33,1.48l-3.64,0.78l-2.72,1.43l-1.96,0.18l-4.21,1.47l-2.35,1.44l-0.94,1.48l-1.79,1.54l-2.77,0.39l-2.36,-0.34l-2.76,1.51l-1.63,1.45l-4.57,1.47l-6.42,0.52l-2.01,0.43l-2.12,2.11l-1.79,0.61l-0.9,1.3l-1.82,0.34l-1.28,-0.34l-2.53,1.26l-1.88,0.27l-2.61,-1.01l-0.88,0.19l-0.1,-0.73l-1.76,-3.14l0.35,-3.27l-0.45,-1.43l-0.97,-1.04l0.01,-1.45l-1.28,-4.7l0.07,-0.99l-0.57,-1.41l-0.93,-0.61Z", "name": "Yemen"}}, "height": 555.5409752358405, "projection": {"type": "mill", "centralMeridian": 0.0}, "width": 900.0});
jQuery.fn.vectorMap('addMap', 'europe_mill',{"insets": [{"width": 900, "top": 0, "height": 790.3360148034734, "bbox": [{"y": -9690291.808548316, "x": -4159652.5301950974}, {"y": -3201145.6268246872, "x": 3229902.613642692}], "left": 0}], "paths": {"BE": {"path": "M400.73,433.08l-0.52,-2.25l-0.56,-0.57l-4.28,-0.9l-0.52,-2.3l-0.72,-1.23l-1.11,-0.96l-1.47,0.14l-2.34,0.95l-0.92,-0.59l-2.1,-2.13l0.06,-1.42l-0.94,-2.11l5.63,-2.88l4.83,-1.89l0.35,1.28l1.0,1.0l0.79,0.0l1.32,-0.72l1.22,0.17l1.92,1.09l1.13,0.14l2.05,-0.73l1.86,-1.11l0.78,-1.23l1.7,0.4l0.63,-0.24l0.21,-0.45l-0.2,-0.84l1.02,-0.55l1.09,0.83l0.82,0.06l1.67,-1.16l0.71,1.31l0.55,0.19l1.3,-0.08l1.17,-1.0l0.54,1.83l1.68,1.4l1.62,0.43l2.18,-0.42l1.56,1.44l2.54,0.82l0.16,0.74l-0.9,1.69l-0.1,0.88l-1.21,1.21l-0.17,0.9l0.73,1.23l0.43,0.19l1.64,-0.55l0.67,0.81l1.43,0.18l1.66,1.17l1.24,1.25l-0.57,0.57l0.11,0.94l0.57,0.56l1.13,0.22l0.42,0.41l0.27,2.03l-2.32,1.34l-0.73,1.47l-2.05,-0.25l-1.48,1.5l-1.78,3.11l-0.26,2.02l2.04,2.91l-0.89,1.46l-3.56,0.48l-3.15,-2.93l-1.99,-0.73l-1.61,-1.01l-1.76,-0.23l-0.27,-1.86l-0.65,-0.86l0.89,-2.91l-0.19,-0.47l-0.91,-0.33l-0.73,0.31l-1.0,0.88l-0.65,1.57l-1.29,0.64l-2.28,0.26l-2.49,-0.26l-0.25,-0.23l0.75,-1.69l-0.73,-1.1l0.42,-1.16l-0.09,-0.82l-1.77,-1.33l-1.44,-0.33l-2.31,-0.2l-1.24,0.59Z", "name": "Belgium"}, "FR": {"path": "M467.41,568.7l0.77,-0.77l0.94,-1.92l1.23,-0.85l3.09,-0.88l1.24,-1.13l1.71,0.56l0.82,-0.34l0.45,-1.04l-0.08,-2.97l0.33,-0.92l0.66,0.38l0.24,2.71l-0.35,2.37l0.98,1.89l0.4,6.29l-2.07,3.66l-0.12,3.28l-1.87,4.27l-0.66,0.89l-3.62,-1.94l-0.93,-0.91l0.99,-1.66l-0.25,-0.45l-2.03,-0.85l0.51,-1.36l-0.22,-1.18l-0.41,-0.29l-1.25,-0.03l1.06,-1.23l0.08,-1.13l-1.58,-1.27l-0.2,-0.63l1.2,-0.8l0.16,-0.59l-0.67,-0.97l-0.55,-0.18ZM313.21,482.01l0.65,-0.84l-0.12,-0.59l-0.73,-0.41l-2.58,0.36l-1.17,-0.3l-1.49,-1.3l-1.38,0.14l-0.87,-0.45l-1.52,-0.0l-0.86,-0.67l-5.41,-1.47l-2.3,-0.18l-2.17,0.65l-0.93,-0.18l-1.64,-2.53l-2.86,-1.03l3.52,-0.98l0.83,-0.83l-0.09,-0.62l-1.43,-0.83l-1.1,-0.24l-0.48,-0.52l4.03,0.01l0.24,-0.69l-0.82,-0.75l-1.49,-0.46l-4.19,0.09l-0.42,-1.11l0.47,-1.3l2.39,-1.3l6.29,-1.5l2.69,0.22l2.0,-0.28l2.39,-0.99l1.02,-0.81l3.06,-0.46l2.9,0.82l2.77,3.22l1.41,1.17l0.45,0.04l3.24,-1.89l4.69,0.05l0.91,0.97l0.66,-0.11l1.04,-1.64l1.04,1.03l6.16,-0.4l0.3,-0.33l-0.2,-0.4l-1.32,-0.73l-1.04,-1.7l-0.24,-6.84l-3.16,-5.21l-0.74,-1.78l0.1,-1.05l3.43,0.27l2.91,-0.67l1.05,0.35l-0.06,1.26l0.44,1.82l1.68,2.19l2.38,-0.09l2.65,0.59l3.28,0.09l5.0,1.0l2.17,-0.63l1.94,-1.22l3.74,-0.81l0.55,-0.6l-0.36,-0.63l-2.1,0.17l-1.75,-0.69l-0.18,-0.57l0.93,-2.27l5.65,-2.74l4.18,-0.84l4.36,-1.56l2.29,-1.65l1.52,-2.13l0.98,-0.76l0.11,-0.58l-0.47,-0.63l0.37,-7.74l0.38,-1.32l0.77,-1.06l3.1,-1.8l7.88,-1.69l0.89,1.98l-0.23,0.88l0.24,0.64l2.37,2.44l1.4,0.75l3.42,-1.17l1.46,1.79l0.67,2.53l0.79,0.51l3.63,0.5l1.16,2.95l0.53,0.06l1.11,-0.65l2.15,0.19l1.16,0.24l1.51,1.13l-0.49,1.57l0.74,1.06l-0.73,1.84l0.74,0.77l2.77,0.32l2.61,-0.31l1.51,-0.75l0.83,-1.78l1.17,-0.81l-0.75,2.87l0.69,1.08l0.35,2.16l0.4,0.31l1.75,0.15l1.55,0.99l2.02,0.76l3.1,2.91l3.88,-0.4l0.56,0.58l2.56,1.05l1.01,-0.16l1.41,-0.77l0.66,0.06l1.34,0.7l1.53,0.18l0.9,0.74l0.57,1.33l2.4,2.92l0.83,0.07l1.34,-0.87l1.18,0.37l0.34,0.99l0.66,0.25l0.87,-0.21l1.22,0.23l3.14,-0.67l0.9,1.02l1.32,0.54l5.32,0.9l1.54,0.57l0.05,1.07l-4.07,4.38l-1.79,6.17l-1.23,2.2l-0.44,1.6l0.31,1.21l-0.19,1.55l-0.73,2.24l-0.14,1.82l0.62,1.44l-1.04,0.58l-0.92,1.45l-0.88,0.32l-1.65,0.02l-0.4,-0.65l-0.67,-0.35l-1.31,0.06l-1.26,0.7l-0.98,1.46l0.57,0.78l0.73,0.14l-4.42,4.94l-2.89,1.4l-0.65,3.28l-3.37,2.5l-1.41,3.23l0.82,1.07l-0.3,1.32l-1.75,1.33l0.3,1.45l1.86,0.05l1.53,-0.78l1.1,-1.08l0.06,-0.49l-0.55,-0.89l1.09,-0.96l1.33,-0.57l1.91,-0.11l2.26,0.34l0.17,1.45l0.39,0.63l-0.48,2.05l2.49,2.54l0.73,1.16l-2.84,1.86l-0.18,1.53l0.36,0.71l0.96,0.63l1.82,2.88l1.7,1.48l-0.9,2.31l-1.21,0.37l-1.75,1.24l-1.95,-0.12l-1.05,0.48l-0.22,0.4l0.1,0.84l0.84,0.96l0.72,1.77l0.97,0.7l2.2,0.58l0.6,1.76l-0.88,0.55l-1.6,2.79l0.62,1.54l-0.2,0.75l0.43,1.08l1.01,1.0l4.78,2.37l0.96,0.2l3.03,-0.67l0.61,0.99l-2.55,3.41l0.06,1.58l-1.05,-0.07l-0.48,0.65l-2.48,1.14l-4.33,3.66l-1.97,1.05l-0.96,1.97l-1.06,0.92l-3.53,0.96l-2.42,1.03l-1.16,-0.44l-2.87,0.05l-1.9,-1.3l-3.43,-0.8l-1.08,-1.78l-3.35,-0.43l-0.12,-1.01l-0.5,-0.38l-2.08,0.32l-0.81,0.45l-0.79,-0.06l-0.3,0.4l-0.61,0.05l-6.52,-1.74l-2.24,-1.83l-2.23,0.45l-1.85,1.74l-7.11,4.41l-2.95,4.72l-0.16,1.53l0.65,4.05l1.42,2.15l-2.56,-0.58l-1.25,0.17l-2.71,0.83l-0.83,1.03l-5.69,-1.28l-2.78,1.04l-0.81,-1.08l-2.69,-1.15l0.34,-0.96l-0.7,-0.84l-2.87,-0.64l-0.99,0.54l-0.97,-1.3l-1.99,-0.4l-6.05,-2.05l-1.12,-0.09l-0.58,0.37l-0.39,2.16l-4.75,-0.06l-0.9,-0.43l-3.17,0.48l-3.51,-2.22l-3.8,0.42l-2.47,-2.29l-2.3,-0.16l-4.56,-1.73l-0.58,-0.75l-1.12,1.09l-0.39,-0.03l-0.36,-0.23l0.9,-1.92l-0.24,-1.16l-0.96,-0.5l-3.17,-0.62l-0.85,-0.97l2.08,-0.55l2.09,-2.26l1.89,-7.6l1.35,-8.91l0.9,-1.51l1.14,-0.42l0.17,-0.63l-1.03,-1.24l-0.59,-0.03l-0.43,0.42l0.62,-6.75l1.3,-5.66l2.93,2.19l0.74,1.02l1.11,3.82l1.99,1.61l0.49,-0.04l0.08,-0.49l-1.25,-1.54l-1.22,-4.82l-0.82,-1.5l-1.35,-1.33l-4.12,-2.8l-0.07,-0.37l1.77,0.46l0.54,-0.47l-0.98,-3.09l-0.57,-6.56l-0.32,-0.32l-3.25,-0.63l-5.23,-2.74l-4.03,-5.76l0.93,-3.09l-0.86,-1.27l-1.37,-0.73l0.46,-0.73l0.44,-0.53l0.88,-0.15l3.8,0.98l0.44,-0.27l-0.2,-0.48l-3.38,-1.67l-5.06,0.54l-1.01,-0.19l-0.72,-0.28l-0.23,-0.74l1.26,-1.47l-0.06,-0.51l-0.75,-0.7l-1.25,-0.37l-2.76,0.2ZM332.31,508.2l1.88,1.81l-0.15,0.48l-1.62,-1.85l-0.11,-0.43Z", "name": "France"}, "BG": {"path": "M662.06,585.15l0.29,-3.94l0.71,-1.75l-0.05,-0.72l-0.86,-0.68l-1.48,-3.54l-0.69,-0.61l-2.8,-1.24l-2.73,-2.84l0.66,-0.27l1.35,-1.8l0.2,-0.83l-1.28,-2.51l0.35,-1.29l-0.28,-1.38l0.24,-0.54l0.99,-0.47l2.26,-0.25l3.25,-3.58l0.5,-1.6l-1.7,-1.41l-1.32,-1.73l-2.83,-1.63l-0.65,-0.92l-1.73,-4.25l-0.05,-1.22l0.63,-2.11l2.3,-1.11l0.53,-2.08l0.71,-0.5l3.99,2.37l-2.14,1.89l-0.0,1.56l1.15,0.79l4.1,-0.65l4.13,0.33l5.62,1.1l3.78,0.39l2.81,-0.5l9.82,1.78l4.63,0.26l2.69,-0.69l1.88,-0.94l1.63,-1.76l3.74,-2.22l3.65,-1.25l7.88,-1.36l4.53,2.38l3.3,0.38l0.99,0.7l1.96,-0.44l2.27,2.66l4.46,1.3l2.5,0.06l-0.28,3.44l-1.08,1.52l-1.9,-0.54l-2.52,0.52l-1.56,2.22l-1.43,1.35l-0.55,2.99l-0.1,4.22l-1.73,0.67l-3.65,3.91l0.11,0.63l2.91,1.84l3.87,5.45l-1.3,-0.19l-1.15,0.47l-1.76,-0.06l-1.68,0.63l-3.01,-2.44l-0.84,-0.32l-3.33,0.55l-1.81,1.11l-3.72,0.47l-0.64,0.45l-0.8,1.79l-2.11,0.49l-0.68,1.13l-1.29,-0.3l-1.48,0.43l-0.64,1.22l1.04,2.44l-0.05,1.85l-2.58,1.05l-1.96,-0.27l-7.03,1.36l-1.54,-1.11l-1.96,-0.82l-1.99,-0.47l-1.13,0.51l-2.12,-1.23l-0.94,-1.63l-0.73,-0.26l-1.48,0.51l-4.43,-0.06l-0.74,1.11l-1.79,0.08l-3.22,1.09l-2.63,-0.19l-2.7,0.22l-1.27,1.01l-2.52,-0.16Z", "name": "Bulgaria"}, "DK": {"path": "M554.98,347.03l-0.27,0.17l-2.03,-0.48l-2.42,-1.16l0.34,-2.19l0.45,-0.72l4.46,2.58l0.04,0.75l-0.57,1.04ZM521.14,336.77l-0.22,-0.59l0.73,-0.83l0.32,0.89l-0.83,0.53ZM520.72,332.89l0.03,1.74l-0.25,0.39l-3.02,1.28l-1.05,0.95l-0.5,1.54l0.9,1.36l1.45,0.59l0.29,1.42l-0.97,0.73l-3.08,0.91l-0.28,0.33l-0.5,6.78l-2.01,0.63l-1.43,-2.33l-0.04,-1.11l-1.16,-4.03l-2.77,-0.74l-2.34,0.21l-1.42,-2.13l0.24,-2.46l-0.86,-1.5l-0.07,-1.09l-0.84,-0.87l-0.75,-0.28l-0.25,-0.91l2.9,-0.04l1.44,-0.44l2.06,-2.53l0.15,-1.11l1.62,-0.2l0.65,0.66l-0.05,3.29l0.25,0.34l1.84,0.62l0.44,-0.26l0.83,-1.98l0.58,-0.6l0.15,-1.49l-0.66,-1.19l4.25,-2.53l1.27,-0.06l3.23,1.02l0.2,0.29l-1.04,2.06l0.58,2.72ZM517.34,347.25l1.62,0.28l1.26,0.71l-1.94,-0.19l-2.4,1.26l-0.36,-0.17l1.82,-1.88ZM504.49,350.08l2.48,1.22l1.72,-0.02l0.86,0.38l0.26,1.85l-0.8,0.33l-1.36,-0.13l-1.59,0.57l-5.33,-2.52l0.22,-2.53l2.27,-0.18l1.27,1.03ZM500.25,304.31l-0.34,0.28l-1.08,-0.37l0.33,-0.36l1.93,-0.37l-0.83,0.82ZM495.95,352.06l-0.81,-1.41l2.94,-3.53l-1.8,4.22l-0.33,0.72ZM468.61,349.15l-0.42,-2.39l-0.69,-1.33l0.85,-0.26l0.28,-0.41l-0.25,-3.27l-0.49,-1.78l-6.52,-3.55l0.92,-7.01l-1.09,-3.15l0.55,-8.59l1.14,-0.12l3.56,1.07l0.64,0.76l1.02,0.47l0.49,-0.15l0.69,-1.1l0.23,-1.47l1.93,-1.94l2.11,-1.0l1.52,1.58l0.43,0.13l0.28,-0.35l0.79,-5.97l-0.27,-0.44l-1.96,-0.62l-1.84,0.54l-1.79,2.66l-1.35,2.98l-2.07,0.26l-1.77,0.83l-2.33,-1.48l0.18,-1.51l1.88,-2.48l2.46,-2.33l2.46,0.02l2.01,-0.79l1.05,-0.09l3.53,0.17l2.07,-0.61l1.73,-1.22l3.52,-4.77l1.89,-1.89l4.04,-0.74l3.41,-2.12l-0.98,1.01l-0.52,1.77l1.23,2.37l-0.16,3.79l-1.14,1.36l-1.29,2.84l-0.65,0.68l-0.18,7.31l1.5,1.58l1.55,0.73l4.81,0.01l0.84,1.17l-0.84,2.52l-2.95,1.65l-0.87,0.03l-1.4,-1.34l-0.5,-0.05l-0.79,0.52l-0.85,0.91l-1.81,6.51l-1.88,-0.35l-1.7,0.66l-0.08,0.69l1.36,1.25l-1.46,0.7l-1.73,1.9l-1.54,1.01l-0.95,1.22l0.98,4.54l-0.31,0.95l-1.8,1.6l-0.79,1.57l0.37,0.57l1.54,-0.02l1.37,0.66l0.38,0.38l-0.27,0.76l0.33,1.37l-1.23,-0.49l-3.7,0.92l-0.99,-0.03l-0.97,-0.68l-3.84,-0.98l-2.88,-0.13ZM494.78,336.56l2.16,5.08l-0.38,0.82l0.26,1.43l-0.26,1.07l-1.97,1.37l-2.27,0.06l-5.9,-2.06l-1.67,-3.44l0.02,-2.6l5.4,-1.72l1.83,0.94l1.1,0.04l1.67,-1.0ZM494.14,332.71l-0.34,-0.12l0.24,-1.95l-0.31,-1.07l1.07,1.5l-0.65,1.64ZM490.96,349.9l0.79,0.15l0.49,0.27l-0.27,0.06l-1.01,-0.48ZM483.63,346.94l2.33,1.33l0.69,1.28l-0.87,0.16l-1.78,-0.57l-0.36,-2.2Z", "name": "Denmark"}, "HR": {"path": "M540.52,517.06l1.22,0.46l4.0,-0.1l0.92,-0.53l1.59,-2.35l0.82,1.3l2.12,1.67l1.03,0.14l1.21,-0.48l2.01,0.79l1.9,0.18l1.48,-0.45l0.26,-0.49l-0.74,-1.79l0.98,-1.18l-0.98,-1.19l4.32,-1.54l0.65,-0.75l0.33,-2.14l-0.13,-1.17l-0.95,-1.16l0.13,-0.69l0.25,-0.33l4.9,-1.78l0.95,-1.14l2.19,-0.05l0.5,-0.65l-0.2,-1.45l0.85,-0.55l3.1,0.8l2.36,1.14l1.59,1.24l0.96,1.48l1.26,1.13l2.81,1.85l1.03,1.44l1.3,0.76l2.64,0.6l1.39,1.47l1.44,0.67l7.73,0.66l2.52,-0.79l1.72,-1.78l2.6,-0.25l-0.75,1.25l1.37,2.81l-0.3,1.16l0.68,0.87l0.9,0.34l-0.43,0.82l0.1,1.43l1.31,1.12l3.14,1.15l0.78,0.85l-2.14,0.07l-0.85,-0.44l-0.57,0.26l-0.1,0.53l-0.62,0.17l-0.29,0.46l0.49,2.66l-0.15,0.57l-0.99,0.12l-0.22,0.72l-0.35,0.03l-1.74,-0.65l-0.59,-1.84l-1.46,-1.06l-2.32,-0.14l-2.74,-0.81l-2.1,0.23l-1.83,-0.36l-1.83,1.07l-0.59,-0.01l-1.56,-1.26l-0.68,-0.17l-2.04,0.71l-2.45,-0.72l-2.59,-0.11l-2.75,-1.72l-0.46,0.02l-1.61,1.24l-3.67,-0.22l-3.04,3.34l-1.49,-0.9l-1.72,-1.94l-1.03,-0.46l-1.26,-0.1l-1.52,0.7l-0.82,5.66l0.14,1.89l1.92,1.38l2.27,2.38l0.73,0.32l1.41,4.88l1.26,1.68l3.93,3.5l1.7,2.26l5.03,4.33l2.43,1.02l0.02,1.54l0.34,0.88l1.53,1.81l2.97,2.53l0.33,0.71l-0.53,0.3l-3.22,-2.75l-2.74,-1.61l-3.2,-3.05l-4.08,-1.17l-2.77,-1.3l-3.78,0.58l-1.68,-0.17l-0.41,-0.57l-0.18,-1.66l-5.98,-4.16l-4.2,-4.32l-0.57,-0.94l1.66,-0.36l2.37,0.27l0.45,-0.22l-0.12,-0.48l-2.73,-1.86l-3.85,-3.6l-1.08,-1.61l0.16,-4.25l-0.73,-2.03l-4.37,-3.88l-2.23,-0.75l-1.46,0.24l-0.65,1.06l-0.42,1.98l-3.52,5.22l-0.94,-0.0l-3.02,-4.37l-1.43,-5.94l0.28,-0.2l0.5,0.51l3.57,0.82l1.03,-0.39l0.69,-0.9ZM587.09,559.57l2.86,1.2l-0.65,-0.13l-2.2,-1.07ZM591.3,561.05l-0.27,-0.82l0.24,-0.07l0.56,0.15l0.73,1.02l-1.27,-0.27ZM599.03,565.39l1.29,0.47l0.05,0.42l-0.83,-0.52l-0.5,-0.37ZM574.06,555.07l2.29,0.14l0.72,0.66l0.72,0.07l-0.88,-0.02l-1.68,-0.33l-1.18,-0.53ZM577.19,558.94l1.74,0.32l1.9,-0.2l1.59,0.28l-1.61,-0.19l-1.63,0.5l-1.35,-0.25l-0.64,-0.46ZM578.24,553.5l-2.04,0.04l-2.36,-0.62l0.18,-0.53l1.76,0.07l3.32,0.71l-0.86,0.32ZM552.42,532.01l1.48,1.22l2.64,2.63l-0.28,0.25l-3.01,-2.61l-0.83,-1.49ZM551.01,528.89l-1.01,-0.23l0.11,-0.55l0.35,0.02l0.55,0.76ZM547.01,523.61l0.87,-0.6l0.52,-0.96l2.47,3.21l-0.92,0.2l-1.06,-1.14l-1.25,-0.15l-0.64,-0.56ZM545.04,522.83l0.07,0.67l-0.21,-0.6l0.14,-0.08ZM545.55,524.84l0.91,0.95l-0.18,1.58l0.44,3.22l-1.56,-3.9l0.39,-1.86Z", "name": "Croatia"}, "DE": {"path": "M430.54,420.84l0.92,-0.06l2.69,-2.09l-0.09,-0.78l-0.62,-0.26l-0.01,-0.35l1.2,-2.32l0.46,-1.8l-0.14,-0.96l-1.33,-1.91l-0.18,-0.88l-1.75,-2.06l0.0,-0.39l2.55,-1.2l2.73,0.97l0.9,-0.57l1.27,0.05l3.04,-1.03l1.09,-1.59l-1.19,-1.26l0.08,-0.38l3.33,-2.18l0.69,-1.23l0.26,-2.25l-0.57,-1.0l-0.78,-0.57l-1.72,0.03l-0.99,-0.34l-0.56,-0.77l0.32,-0.81l-0.14,-0.63l0.26,-0.15l3.48,0.01l0.58,-0.47l1.2,-4.4l0.87,-1.53l0.25,-5.88l-0.69,-1.09l-1.23,-0.85l0.66,-2.97l1.24,-1.67l0.91,-0.42l4.57,-0.29l4.95,0.12l1.86,2.37l-0.66,1.17l0.16,0.55l1.25,0.65l0.93,-0.22l1.1,-2.84l1.71,1.34l0.03,2.08l0.36,0.39l0.43,-0.32l0.59,-3.01l-0.42,-2.2l0.28,-1.9l0.99,-1.44l3.67,0.69l4.06,-0.37l1.41,0.7l3.63,3.98l1.33,0.69l1.5,0.2l0.44,-0.29l-0.24,-0.47l-1.99,-0.81l-4.4,-4.83l-1.43,-0.63l-1.94,-0.18l-1.77,-1.03l-0.25,-5.57l-0.75,-0.72l-1.14,-0.35l-1.62,0.32l-0.16,-0.68l0.18,-0.5l2.27,-0.51l1.72,-0.78l0.31,-1.67l-3.74,-4.94l-0.12,-1.54l2.65,0.11l3.74,0.96l1.1,0.72l1.31,0.02l3.51,-0.89l1.75,0.87l1.88,0.47l1.57,1.79l0.07,1.44l-2.01,1.88l-0.12,0.46l0.4,0.25l3.46,-0.28l0.85,1.3l0.43,0.15l1.87,-0.51l4.9,2.22l3.72,-1.12l0.53,1.41l-0.65,1.61l-2.59,1.91l-0.12,0.5l0.59,1.22l1.1,0.48l2.61,-0.23l4.21,1.16l0.93,-0.43l3.21,-2.73l1.19,-0.54l4.49,-0.58l0.73,-1.01l1.74,-1.1l3.62,-3.29l5.8,1.01l1.62,2.36l4.08,2.65l3.73,-0.15l1.18,2.22l0.71,3.25l2.21,1.63l3.05,0.68l0.48,2.97l1.56,5.02l-0.04,1.42l-0.54,1.61l-0.94,1.33l-1.28,0.77l-0.85,1.0l-0.23,1.2l1.81,2.09l3.53,2.51l1.27,1.91l-0.81,3.15l0.34,0.97l1.43,1.19l0.26,2.35l0.57,0.56l-0.95,2.89l-1.01,1.59l0.34,1.21l1.36,1.97l-0.22,1.81l0.22,0.65l2.57,1.24l1.33,3.49l-1.29,4.18l-1.87,3.2l-1.46,-0.48l0.11,-0.81l-1.26,-1.82l-3.37,-0.82l-0.7,0.29l-0.4,0.92l1.31,1.41l-5.96,2.33l-2.6,0.78l-2.07,0.25l-1.5,1.77l-0.94,-0.31l-2.04,0.96l-0.67,1.03l-2.06,0.33l-0.98,1.46l-2.31,-0.41l-3.18,0.72l-1.4,0.85l-2.01,2.57l-1.77,-1.93l-0.72,-0.08l-0.44,0.32l-0.04,1.02l1.14,1.65l0.52,1.47l1.03,1.06l2.35,1.46l0.63,0.91l-1.61,2.81l1.52,1.82l2.46,3.98l1.87,1.57l1.49,0.06l2.95,2.95l2.61,1.64l0.92,1.52l0.79,0.46l1.3,-0.06l3.29,3.0l-0.16,2.44l-0.83,1.09l-0.5,0.23l-2.76,-0.87l-0.49,0.51l-0.66,2.87l-0.38,0.46l-6.37,2.67l-1.17,0.77l-0.83,1.02l-0.01,1.03l2.54,3.11l0.01,1.18l-0.74,1.46l0.24,0.51l1.68,0.35l0.18,0.48l-0.4,2.61l-2.26,-1.03l-0.43,-1.57l-1.34,-0.68l-2.77,0.52l-1.62,-0.86l-2.11,-0.53l-0.57,0.25l-0.13,1.46l-6.22,0.61l-4.4,1.66l-1.31,1.07l-1.45,0.0l-1.91,0.52l-0.6,-0.06l-1.66,-2.12l-5.79,-0.52l-0.56,0.34l-0.83,3.01l-0.69,0.81l-1.08,0.46l0.2,-0.9l-0.26,-0.48l-1.5,-0.34l-0.22,-1.01l-1.29,-1.05l-3.11,-1.25l-0.84,0.49l-7.44,-4.01l-0.69,0.18l-0.13,0.52l0.63,1.16l-3.25,0.23l-0.69,-0.77l-0.81,-0.23l-0.59,0.27l-1.41,-1.07l-0.93,-0.24l-2.0,0.82l-0.58,0.89l0.1,0.75l0.97,0.47l-0.22,0.19l-3.28,-0.22l-1.51,0.54l-2.18,0.2l-3.02,-0.1l-1.57,-0.55l-0.38,-0.91l0.11,-1.58l0.74,-2.31l0.21,-1.68l-0.31,-1.12l0.4,-1.44l1.21,-2.16l1.76,-6.1l4.05,-4.32l0.04,-1.82l-0.29,-0.36l-1.85,-0.66l-5.27,-0.89l-1.02,-0.38l-1.24,-1.21l-3.4,0.67l-2.1,-0.1l-0.44,-1.02l-1.73,-0.51l-1.82,0.86l-2.04,-2.62l-0.66,-1.44l-1.19,-0.93l-1.22,-0.27l0.41,-1.96l1.46,-1.99l0.04,-1.7l-3.27,-1.56l-1.51,-1.71l-0.36,-1.88l0.82,-2.22l2.46,-1.42l0.19,-0.42l-0.31,-2.35l-0.75,-0.87l-1.5,-0.57l0.7,-0.84l-0.06,-0.62l-3.08,-2.45l0.64,-2.95l-0.69,-0.92l-1.76,-0.94ZM538.5,364.74l4.43,2.81l-0.02,0.85l-1.71,0.2l-1.36,-0.24l-0.07,-2.1l-1.21,-1.13l-0.06,-0.38ZM536.24,359.59l0.19,1.05l-1.4,-0.89l-1.53,0.01l-1.16,1.66l-0.34,0.03l-2.16,-1.36l-0.36,-1.05l0.29,-2.61l0.72,-0.83l0.1,-0.88l1.09,-0.91l0.75,-0.03l0.89,1.43l2.04,0.8l0.23,0.34l-1.13,1.59l0.47,0.93l1.31,0.71ZM503.18,358.26l-1.43,0.03l-1.18,-0.81l0.48,-0.55l1.69,0.5l0.45,0.83ZM463.5,350.42l0.29,-1.31l0.49,0.91l0.99,0.04l-1.77,0.36ZM466.66,353.0l-0.22,0.19l-1.35,-0.23l0.93,-0.31l0.63,0.36Z", "name": "Germany"}, "BA": {"path": "M608.48,527.74l3.07,-0.74l1.2,0.42l-0.79,2.63l-1.93,2.88l-0.46,3.03l0.51,1.08l2.62,1.37l3.17,2.88l-0.23,0.39l-1.2,0.13l-2.07,-0.23l-0.97,0.56l0.15,0.91l3.04,3.85l0.08,0.83l-0.38,0.94l-1.06,-0.49l-0.81,0.03l-0.9,0.24l-0.68,0.71l-1.4,0.25l-1.35,-0.37l-0.66,0.34l-0.25,0.99l1.25,2.21l-0.08,0.64l-0.78,-0.82l-1.48,-0.05l-2.53,2.08l-0.73,1.8l0.01,1.34l-1.64,0.26l-0.76,0.89l0.27,3.36l1.07,2.1l-1.07,0.99l-1.63,-0.59l-2.39,-1.46l-3.77,-2.5l-0.73,-1.04l-2.18,-0.15l0.47,-0.54l-0.1,-0.84l-4.84,-4.93l-0.31,-2.37l-0.52,-0.52l-2.14,-0.74l-4.93,-4.25l-1.71,-2.26l-3.91,-3.48l-1.1,-1.42l-1.51,-5.08l-0.87,-0.45l-2.23,-2.34l-1.83,-1.33l0.67,-6.52l0.28,-0.24l0.73,-0.18l1.63,0.37l1.74,1.95l1.96,1.12l1.37,-0.9l2.12,-2.55l3.36,0.32l1.8,-1.25l2.69,1.66l1.16,0.26l1.55,-0.13l2.52,0.74l2.08,-0.71l2.1,1.42l1.04,-0.04l1.55,-1.0l1.73,0.34l2.04,-0.24l2.68,0.79l2.34,0.15l0.97,0.73l0.49,1.68l0.79,0.76l2.6,0.32Z", "name": "Bosnia and Herz."}, "HU": {"path": "M574.1,479.74l1.55,-0.97l2.58,1.22l3.97,-0.49l0.32,-0.51l-0.38,-2.54l0.54,-0.63l0.13,-0.94l0.82,-0.63l1.72,0.33l4.27,3.09l1.92,0.75l5.23,0.12l7.85,-0.41l1.05,-1.32l-0.32,-1.6l0.46,-0.86l1.48,-0.78l4.68,-0.38l2.8,-0.66l1.42,-1.79l0.61,-0.13l3.87,1.55l5.93,-2.86l2.25,-4.04l1.81,-0.35l2.94,0.07l2.8,0.69l5.06,-0.81l1.4,0.91l2.13,2.58l0.79,0.23l6.37,-1.27l1.33,2.56l2.34,0.93l0.97,1.3l1.37,0.54l1.12,-0.08l0.79,0.7l0.31,1.75l-3.23,2.7l-1.51,-0.12l-2.92,0.86l-2.41,2.67l-1.56,1.19l-0.16,1.98l-1.62,1.48l-1.18,2.9l-1.73,1.75l-0.13,1.34l-2.12,2.95l-0.24,0.62l0.18,0.84l-2.28,1.58l-0.95,2.12l0.13,1.13l-0.95,0.47l-0.52,1.42l-1.26,0.86l-2.62,-0.28l-1.17,0.24l-0.9,1.34l-0.99,0.54l-1.52,-0.54l-3.55,0.89l-1.03,-0.47l-3.08,-0.33l-1.29,0.26l-3.03,-0.39l-1.28,0.24l-1.63,1.6l-1.88,1.0l-1.5,0.24l-1.07,-0.47l-1.04,0.98l-1.05,0.42l-2.71,0.54l-0.7,-0.13l-2.05,1.92l-2.19,0.68l-7.36,-0.61l-2.08,-1.2l-0.59,-0.87l-1.18,-0.5l-1.58,-0.16l-1.15,-0.67l-0.95,-1.37l-4.05,-2.96l-0.99,-1.51l-1.75,-1.36l-3.01,-1.38l-1.73,-2.2l-0.02,-0.77l-0.66,-0.74l-0.73,-2.3l-1.88,-0.24l2.28,-1.61l1.33,0.05l0.62,-0.39l0.55,-2.05l-0.16,-0.54l-0.64,-0.29l-0.2,-0.91l0.58,-1.02l-0.33,-1.71l2.32,-0.86l0.87,-1.68l-0.74,-1.83l-2.35,-0.68Z", "name": "Hungary"}, "JE": {"path": "M322.87,452.86l-0.06,0.38l-0.56,-0.27l-1.49,0.09l0.08,-0.64l2.02,0.44Z", "name": "Jersey"}, "FI": {"path": "M642.77,218.25l1.12,-0.27l0.17,-0.8l-3.01,-6.76l-1.66,-1.51l1.26,-4.66l-0.13,-1.29l-0.44,-1.65l-2.0,-1.41l-0.81,-4.2l0.5,-2.29l0.65,-0.99l3.52,-3.35l0.3,-1.68l2.07,-0.11l0.31,-0.63l-1.08,-1.53l-0.27,-1.43l3.0,-0.62l1.43,0.56l3.05,-0.72l2.8,-1.45l0.17,-1.13l-0.91,-1.85l1.24,0.03l-0.36,-1.06l1.03,0.05l1.76,-1.91l0.16,-1.42l2.91,-0.77l3.47,-2.96l3.21,-1.64l3.23,-2.9l1.63,-0.39l0.7,-1.93l2.7,-2.58l0.99,-0.5l1.28,-2.37l3.5,-2.87l2.18,-3.57l1.19,-1.25l0.4,-1.27l1.07,-0.09l1.37,-1.04l2.49,-0.66l2.47,0.18l1.24,0.48l1.0,-0.15l0.34,-0.43l-0.1,-1.23l-0.59,-0.75l1.83,-1.31l-0.47,-2.07l-1.07,-0.98l1.19,-7.23l-1.66,-1.93l-5.46,-2.54l-2.15,-0.22l-1.08,-1.64l0.59,-2.18l-0.41,-0.44l-0.76,0.14l-0.76,0.77l-1.54,0.82l-2.1,-0.66l-0.96,0.1l-1.35,-3.86l-1.94,-3.6l-2.51,-1.5l-0.6,-3.55l0.1,-1.33l0.2,-0.66l0.88,-0.57l1.4,-1.77l0.39,-2.96l1.27,-2.55l-0.7,-1.67l-3.55,-4.29l-0.46,-1.32l-0.2,-2.19l1.99,-2.12l-0.54,-2.44l-1.32,-0.69l-2.46,-0.23l0.14,-1.03l1.05,-2.32l-0.56,-2.01l0.01,-3.87l1.64,-1.24l0.06,-1.15l-2.2,-1.44l-1.54,-1.59l-0.47,-0.92l-1.92,-0.34l-1.17,-2.76l-3.36,-2.61l-1.06,-0.59l-5.7,-1.72l-2.28,-0.33l-2.6,-0.97l-7.13,-3.97l-0.62,-0.81l-3.28,-2.49l-3.42,-1.76l-0.17,-1.37l-0.37,-0.48l-3.13,-1.15l2.86,-0.25l2.65,0.65l0.68,-0.47l0.33,-0.96l-0.97,-2.39l0.11,-0.4l2.45,-1.26l4.54,0.04l9.08,9.74l1.07,1.8l0.37,1.29l0.39,0.29l8.8,1.06l1.17,0.77l2.44,-0.15l5.27,-1.54l2.05,-2.15l1.69,0.15l4.54,2.05l4.94,1.36l1.47,1.13l2.14,0.27l2.15,-1.3l1.14,-2.92l0.96,-1.23l1.35,-0.9l3.04,-0.64l2.41,-2.51l0.36,-2.25l-0.26,-3.73l0.23,-1.11l1.13,-2.04l1.5,-5.3l0.64,-1.46l0.73,-0.83l3.2,-2.19l2.92,-3.19l2.69,-0.38l5.31,0.64l3.11,-1.34l3.28,-1.98l2.0,-0.52l1.71,0.07l2.06,2.1l4.99,3.64l5.33,2.23l4.51,1.41l2.41,4.42l-1.13,1.66l-2.89,2.52l-2.42,2.65l-0.24,1.85l1.38,1.94l-6.81,2.58l-0.22,0.62l0.84,0.92l3.36,0.16l0.61,0.39l0.04,0.39l-0.3,0.87l-3.67,5.48l-0.16,1.52l2.92,7.03l9.06,3.17l2.4,3.03l4.03,4.07l2.13,1.71l-0.59,2.59l-4.94,5.07l-4.47,5.24l-2.13,2.89l-0.36,2.03l0.45,1.23l2.7,3.48l2.31,3.68l2.8,5.79l3.13,4.14l2.47,6.75l0.12,1.92l-2.63,0.33l-2.15,0.65l-0.35,0.42l0.09,0.48l1.16,1.03l-1.13,2.01l-0.17,2.9l-1.24,1.49l-0.21,0.7l0.62,0.87l2.25,0.39l0.09,0.91l-0.16,0.59l-2.59,1.65l-0.27,1.72l1.38,2.88l1.19,1.01l3.95,0.91l0.37,0.52l0.12,1.59l-1.73,1.8l-0.07,1.16l1.84,3.66l3.8,1.8l1.2,0.91l0.47,1.84l-0.02,1.31l-0.27,1.1l-3.85,4.54l-2.72,1.17l-0.31,0.89l5.84,5.02l7.58,4.38l2.72,1.92l2.09,2.95l2.32,2.38l0.27,1.15l-3.32,6.63l-1.3,1.77l-3.37,3.29l-5.05,4.15l-11.85,12.11l-2.68,2.11l-3.26,3.24l-6.92,4.7l-1.08,1.18l-3.43,2.16l-8.21,7.34l-1.68,0.75l-1.87,0.16l-0.84,0.47l-3.55,-1.54l-1.89,0.43l-1.61,1.04l-3.07,0.33l-2.14,0.65l0.29,-1.94l0.65,-0.96l0.13,-0.85l-0.45,-0.43l-0.5,0.07l-1.28,1.66l-0.55,1.73l-0.89,0.73l-2.1,0.32l-2.16,-1.32l-1.3,-0.04l-0.33,0.63l1.05,2.05l-1.03,-0.03l-2.52,1.57l-0.89,-1.14l-0.5,-0.16l-2.71,1.45l-2.64,0.33l-1.46,1.06l-7.46,1.6l-1.27,1.45l-0.76,0.39l-1.42,-0.39l-8.4,1.55l-3.69,-0.35l-3.8,2.83l-1.98,0.53l2.58,-2.49l0.22,-1.21l-0.2,-0.4l-1.63,-0.55l-1.02,-0.91l-1.36,-2.4l-1.04,0.08l-0.67,2.35l-0.77,0.71l-1.25,0.53l-2.16,-0.02l-0.21,-0.77l0.41,-1.08l-0.13,-0.82l1.1,-0.12l0.67,-0.88l-0.37,-0.93l-0.65,-0.1l0.93,-1.94l-0.28,-0.49l-4.43,-0.42l-4.34,-2.0l-0.96,-0.12l-0.58,-1.58l-0.46,-0.25l-1.2,0.29l-1.32,0.91l-2.1,-1.16l-0.93,-7.31l0.22,-1.74l1.36,-2.29l0.49,-2.36l0.11,-2.75l-0.24,-1.14l0.43,0.0l0.38,-0.53l-0.76,-1.2ZM687.44,144.29l-1.79,0.65l-1.22,-0.34l-0.02,-0.9l0.76,-0.51l1.66,-0.25l1.7,0.47l-1.08,0.89ZM651.46,242.91l1.58,0.43l0.67,-0.11l0.37,0.48l-1.17,0.78l-0.1,0.84l0.63,0.93l-0.71,-0.0l-0.85,-1.35l-1.17,-0.85l0.4,-0.98l0.37,-0.17ZM646.99,242.06l0.23,-0.82l0.48,0.41l-0.15,0.7l0.64,0.51l-1.2,-0.79ZM646.46,246.89l-1.07,0.55l-0.05,-0.02l0.08,-0.67l0.56,-0.37l0.66,-0.03l-0.18,0.54ZM643.72,247.48l-0.79,0.13l-0.32,-0.25l1.18,-0.39l-0.07,0.51ZM641.16,239.43l-0.07,0.33l-1.37,0.07l-0.55,-0.69l-0.31,-1.48l2.3,1.77ZM638.04,182.53l0.17,0.59l0.43,0.26l0.96,-0.17l0.89,-0.6l0.27,0.45l-0.56,-0.04l-1.2,1.04l-1.18,-0.84l-0.53,-1.0l0.8,-0.0l-0.05,0.32Z", "name": "Finland"}, "BY": {"path": "M670.47,410.28l-0.13,-0.27l0.06,-1.46l1.09,-1.97l-0.23,-1.17l0.56,-1.59l0.0,-1.53l-0.91,-1.32l-1.93,-1.22l-3.4,-1.52l-0.13,-0.47l3.0,-3.66l5.77,-2.64l0.89,-0.8l0.33,-2.39l-0.79,-5.49l-3.54,-9.02l-1.36,-5.56l2.79,0.28l1.97,-0.44l4.12,-0.26l1.99,1.03l4.06,-1.59l1.9,0.09l0.64,-0.62l0.52,-2.25l0.36,-0.3l2.44,0.18l1.03,-0.51l0.87,-1.04l1.25,-0.61l1.3,-0.06l0.98,-0.62l0.5,0.91l-0.32,0.99l0.36,0.45l1.01,0.4l2.51,-0.34l0.49,-0.81l-0.35,-1.77l-0.8,-0.73l-1.79,-0.35l0.92,-2.21l1.46,-2.06l-0.02,-2.89l0.75,-2.06l0.97,-1.47l2.97,-0.75l1.28,-0.84l1.11,-2.33l0.33,-0.17l4.09,0.17l1.26,-1.87l1.39,-0.94l0.08,-0.49l-0.47,-0.58l-3.74,-0.67l1.4,-3.61l0.38,-2.21l2.87,-0.65l1.83,-1.99l1.15,-0.29l3.4,0.5l3.99,-0.04l0.92,-2.18l3.35,-3.06l1.75,-1.04l1.25,-0.18l1.76,1.58l0.64,0.16l1.24,-0.67l2.07,-0.07l0.81,0.47l1.37,1.98l0.92,0.38l3.4,-1.49l3.19,1.0l1.29,0.81l-0.51,2.56l1.82,1.98l0.47,0.03l2.62,-1.56l1.96,-0.52l1.42,-0.92l3.92,-0.0l2.83,1.04l2.24,2.21l1.47,0.96l2.03,0.41l0.22,0.33l-0.08,3.01l-1.07,1.29l-0.11,1.14l1.99,2.8l0.22,1.35l-1.98,2.56l-0.54,2.11l0.11,0.59l4.8,3.05l-1.06,2.24l0.22,0.44l1.4,0.68l1.5,2.95l1.42,1.79l5.69,3.04l-0.04,1.47l-0.94,2.24l0.22,0.54l1.06,0.37l5.02,0.19l3.1,1.5l-0.32,1.27l0.64,1.39l3.16,2.26l0.01,1.08l-3.01,1.21l-0.7,1.17l-3.65,2.08l-3.72,-0.26l-1.43,-1.43l-1.18,-0.32l-3.43,0.09l-0.75,0.46l-1.71,3.0l0.04,0.52l4.03,4.54l-0.61,1.04l0.17,1.42l0.95,1.23l-0.33,4.38l1.6,1.88l0.82,1.53l-5.16,-0.05l-1.77,0.96l-1.99,-0.42l-1.46,0.63l-3.05,2.73l-1.29,1.6l-1.83,3.95l1.26,4.37l-0.98,1.32l-0.92,-0.12l-1.36,-0.8l-0.44,-1.39l-2.23,-1.49l-8.28,0.78l-2.69,0.89l-2.12,-3.38l-0.52,-0.66l-0.8,-0.34l-0.77,0.12l-1.1,0.93l-1.76,0.6l-0.87,0.66l-0.7,1.15l-0.62,-0.26l-0.83,-1.64l-5.66,-1.19l-2.43,0.84l-2.32,-0.52l-1.82,1.98l0.15,-1.24l-0.24,-0.41l-1.34,-0.56l-4.0,0.09l-2.18,-2.8l-5.0,-0.34l-4.26,-0.76l-0.91,-0.58l-8.26,-1.44l-9.81,-0.12l-2.74,0.57l-6.86,0.57l-0.74,0.64l-0.63,1.19l-2.0,1.92l-1.94,1.27l-1.28,-0.61l-2.2,-0.32l-1.06,0.29l-0.7,0.7Z", "name": "Belarus"}, "GR": {"path": "M728.08,670.66l-0.79,0.26l-0.27,-0.39l0.51,-1.56l-0.52,-1.53l2.47,-2.52l3.7,-1.26l-1.12,2.79l-1.0,1.2l0.08,0.93l-1.45,0.33l-1.59,1.75ZM727.96,660.69l0.31,-0.19l-0.05,0.46l-0.26,-0.27ZM717.45,657.54l2.45,-1.2l0.79,0.06l-1.92,1.05l-1.31,0.09ZM718.65,675.52l0.9,2.17l-0.84,0.63l0.1,-1.01l-0.53,-1.15l0.37,-0.64ZM711.88,642.87l1.58,-0.77l0.98,-0.02l2.64,0.58l0.06,0.28l-2.41,0.93l-1.62,-0.93l-1.23,-0.07ZM716.41,654.11l0.54,0.48l-0.03,0.04l-0.63,0.1l0.12,-0.63ZM708.43,617.81l-0.05,1.13l1.83,1.52l0.65,1.19l-0.81,-0.3l-0.49,0.49l0.43,0.99l-0.37,0.12l-3.89,-0.79l-0.36,-0.44l1.99,-1.7l-0.34,-0.63l-1.6,0.18l-1.24,1.38l-1.92,-0.59l-0.59,-0.58l0.65,-1.02l1.36,0.04l0.99,-0.34l1.05,-0.45l0.25,-0.65l1.92,-0.12l0.56,0.56ZM623.87,612.82l0.81,0.1l0.84,-0.47l0.47,-0.56l0.3,-1.23l0.8,-0.02l0.42,-0.51l-0.08,-0.84l-0.89,-1.74l1.18,-1.04l2.5,-0.46l0.86,-0.63l2.04,-5.25l1.85,-0.75l0.87,-1.26l0.46,-1.74l-1.01,-1.95l0.07,-0.75l4.52,-0.26l1.17,-0.64l2.45,0.55l2.71,-1.28l2.13,-2.58l0.71,-0.31l2.57,-0.43l4.21,0.63l3.19,-0.98l0.81,-2.47l4.88,0.17l1.31,-1.02l5.3,-0.03l3.31,-1.11l1.87,-0.11l0.72,-1.05l4.19,0.07l1.53,-0.5l1.02,1.67l2.5,1.47l1.25,-0.53l1.82,0.43l3.69,1.98l7.19,-1.39l1.97,0.27l2.96,-1.23l0.46,-1.18l-0.61,-2.89l-0.57,-0.89l0.35,-0.54l1.04,-0.24l2.68,0.72l2.17,1.52l0.5,2.84l-0.19,0.48l-0.81,0.19l-2.79,1.69l-0.26,1.91l0.38,2.25l-3.16,3.73l-0.56,0.18l-0.34,-0.5l-2.25,-1.26l-4.82,-0.7l-2.28,-0.88l-1.1,0.12l-2.16,-0.96l-1.44,0.48l-2.75,1.7l-1.32,-0.16l-1.58,-1.02l-1.46,-0.22l-1.39,0.65l-1.98,1.99l-1.88,0.91l-1.8,-0.37l-2.49,0.01l-0.39,0.31l-0.22,1.44l1.67,1.98l-0.49,1.12l0.47,1.01l0.99,0.39l-1.39,-0.11l-1.3,0.61l-0.33,1.0l1.52,1.65l1.88,1.38l0.37,1.18l-0.35,0.48l-1.18,-0.71l-2.27,-3.16l-3.48,-0.8l-0.39,0.14l-0.6,1.06l0.63,1.71l0.62,0.86l2.45,1.61l-2.93,-0.93l-0.8,-1.4l-0.43,-2.26l-5.5,-2.86l-0.45,-1.08l0.86,-1.57l-0.43,-0.54l-1.68,0.27l-2.63,1.64l0.16,2.07l-0.97,3.91l0.31,1.49l3.35,3.9l1.1,2.68l0.87,1.13l1.73,1.2l1.71,2.07l0.7,1.04l0.44,1.49l-1.17,0.88l-0.56,0.03l0.43,-1.37l-0.31,-1.06l-2.29,-1.17l-1.38,0.42l-1.12,0.76l-0.14,0.5l1.36,2.35l0.34,1.2l0.45,0.29l-2.36,1.26l-2.76,0.18l-0.61,0.48l0.16,0.67l1.6,0.3l1.19,0.76l3.27,0.91l1.74,1.2l1.38,0.09l1.7,2.15l2.57,0.54l1.7,2.19l2.02,0.42l1.63,0.73l0.65,1.86l0.5,5.06l-0.07,1.48l-0.27,0.28l-0.29,0.01l-1.21,-1.49l-4.01,-3.64l-1.32,-0.49l-1.28,0.69l-3.11,0.54l-1.92,0.86l-0.41,0.62l0.17,0.49l1.31,1.11l0.04,1.25l0.68,1.51l1.09,0.59l1.64,0.17l1.16,1.61l-3.98,1.51l-0.47,-0.26l-0.24,-1.31l-2.13,-1.2l-1.23,-0.26l-0.96,-0.77l-0.53,0.03l-0.67,0.67l0.43,2.7l1.21,1.72l2.8,6.72l0.16,1.11l-0.37,2.26l1.29,2.3l-1.48,-1.02l-1.97,-2.38l-0.69,-1.5l-1.16,-0.35l-1.89,0.44l-1.62,3.29l-0.04,1.39l-0.21,-0.11l-0.53,-0.44l-0.06,-2.98l-1.96,-2.81l-0.93,-0.41l-1.11,-1.88l-0.41,-0.16l-1.04,0.23l-0.97,0.71l-0.56,3.35l-1.68,-1.57l-2.02,-3.26l-0.05,-1.6l1.53,-1.91l-0.24,-1.37l-1.56,-2.52l-2.1,-1.55l-1.1,-0.44l-0.63,-1.66l-2.03,-1.46l2.41,-2.02l1.21,-2.49l1.74,0.55l1.49,-0.17l2.34,-2.4l1.5,0.09l3.86,2.05l4.28,1.21l2.03,1.0l1.29,1.08l1.71,0.38l0.46,-0.42l-0.23,-1.23l2.57,-0.15l0.74,-0.53l0.42,-1.05l-0.47,-0.67l-1.03,-0.49l-1.47,-0.29l-0.73,0.18l-1.18,-0.46l-5.55,-3.19l-0.57,0.13l-0.44,0.74l-0.71,0.36l-1.11,0.06l-3.71,-0.92l-2.15,0.71l-4.25,0.68l-1.88,-2.53l-0.6,0.34l-0.26,1.46l-1.28,0.35l-0.68,-0.45l-1.66,-4.25l-1.61,-1.93l-1.24,-0.53l-0.08,-0.77l0.07,-0.5l1.17,-0.16l2.36,0.85l0.88,-0.23l0.71,-0.78l-0.49,-1.83l-2.98,-0.34l-1.94,0.42l-0.66,-0.31l-3.3,-3.44l-2.27,-1.18l-1.43,-3.35l-1.02,-1.26ZM675.16,600.88l1.34,-0.04l2.3,1.22l1.04,1.37l-1.41,-1.3l-3.27,-1.24ZM707.89,661.28l-0.16,0.18l-0.36,-0.27l0.41,0.1l0.11,-0.02ZM708.79,660.68l0.03,-0.08l0.05,0.06l-0.08,0.03ZM703.69,645.69l0.95,-0.85l2.01,-0.19l-0.72,0.46l-2.24,0.58ZM672.76,675.97l0.47,1.17l1.83,0.46l1.71,-0.13l0.86,-0.89l0.55,-0.01l0.13,0.28l-0.96,0.59l0.02,0.55l1.05,0.63l0.84,-0.04l0.27,0.97l0.84,0.59l1.91,-0.04l3.7,-0.9l3.66,0.22l1.49,0.98l2.58,0.12l2.39,0.5l3.4,-0.62l-0.05,2.83l0.84,0.58l0.89,-0.12l0.88,-0.75l1.68,-0.51l1.84,0.0l1.35,-1.09l-0.21,1.46l-0.45,1.56l-0.8,0.3l-4.51,-0.1l-13.88,1.39l-0.4,-0.13l-0.14,-1.43l-0.43,-0.64l-3.49,-1.22l-7.93,-1.34l-2.54,0.18l-1.23,-0.27l-0.31,-0.42l-0.17,-1.7l0.27,-1.65l0.87,0.49l0.43,-0.08l0.58,-0.56l0.16,-1.18ZM702.17,634.63l0.83,-0.47l0.56,-1.18l-0.51,-1.11l-1.37,-1.35l-0.04,-0.53l1.75,-0.34l1.57,0.89l0.07,3.17l-0.61,0.53l-0.14,0.76l-0.95,0.65l-1.15,-1.03ZM698.48,599.9l-0.88,0.24l-0.94,-0.74l0.76,-0.25l1.05,0.74ZM696.85,654.58l-0.82,0.4l-0.91,-1.59l1.84,-1.64l0.35,0.34l-0.04,1.56l-0.43,0.92ZM695.75,663.45l0.09,0.3l-0.33,0.43l0.19,-0.35l0.05,-0.37ZM695.08,647.43l-0.75,0.06l0.03,-0.54l1.08,0.27l-0.36,0.21ZM690.86,607.38l1.89,-0.07l0.57,0.64l0.49,0.09l1.51,-1.04l-0.9,1.57l-0.18,1.09l-0.59,-0.12l-0.12,-0.89l-0.43,-0.38l-0.69,0.27l-0.36,0.77l-1.05,-0.22l-0.14,-1.72ZM694.65,659.11l-0.68,-0.65l-0.17,-0.27l0.96,0.71l-0.11,0.21ZM693.06,653.23l-0.77,0.86l-0.66,-0.29l0.4,-0.81l0.94,-0.5l0.09,0.74ZM690.94,644.63l1.66,0.25l0.15,0.17l-0.25,0.51l-0.46,-0.08l-1.1,-0.84ZM689.21,642.46l-0.12,0.31l-1.78,-1.57l-1.08,-1.15l-0.1,-0.51l0.59,-0.25l0.74,1.01l1.24,0.26l0.52,1.9ZM686.25,596.85l-1.26,0.42l-1.41,-0.87l0.01,-0.29l1.17,-1.42l0.98,0.08l0.69,0.96l-0.17,1.13ZM685.69,654.47l0.32,0.59l-0.13,0.1l-0.14,-0.27l-0.05,-0.42ZM682.97,623.8l0.52,0.29l0.25,0.92l-0.86,-0.54l0.1,-0.68ZM684.19,625.48l0.31,0.27l-0.27,0.07l-0.04,-0.34ZM661.67,625.04l3.09,-1.8l1.96,-0.47l1.2,1.04l0.73,1.64l0.92,0.78l4.78,2.0l3.0,0.27l1.17,1.85l-0.19,1.13l1.22,3.9l1.43,1.15l2.67,0.25l-0.01,1.43l-0.63,0.53l-1.01,-0.67l-0.75,-0.06l-1.88,-1.44l-0.34,-1.37l-2.27,-3.04l-3.76,-0.18l-1.21,-0.55l-0.6,-1.8l-4.92,-3.91l-3.14,-1.2l-1.46,0.5ZM681.22,658.91l0.47,0.25l-0.55,0.09l0.08,-0.34ZM682.34,659.06l0.37,-0.41l0.36,-0.09l0.0,0.38l-0.73,0.12ZM682.94,652.14l-0.52,-0.06l0.36,-0.53l0.24,0.11l-0.07,0.48ZM681.96,648.45l-0.28,-0.62l0.24,-0.28l0.32,0.46l-0.27,0.44ZM680.69,645.1l-0.29,0.25l0.39,-1.2l0.31,-0.03l-0.41,0.98ZM672.52,621.17l-0.6,-0.11l-0.2,-0.37l0.8,0.47ZM668.93,639.82l0.26,-0.51l0.33,0.09l-0.09,0.46l-0.5,-0.04ZM661.94,664.62l1.47,1.53l-0.51,0.98l-0.83,-0.28l-0.27,-0.48l0.14,-1.75ZM633.7,642.06l0.48,0.52l-1.17,0.88l-1.26,-1.0l-0.97,-1.4l0.5,-0.6l0.61,0.8l1.24,0.33l0.56,0.47ZM627.1,635.32l0.7,-1.67l0.81,0.42l0.52,-0.22l0.62,-1.26l0.25,1.95l1.11,0.64l1.1,1.42l-0.07,0.54l-1.85,-0.68l-0.97,0.24l-0.29,-1.09l-0.71,-0.88l-0.52,0.0l-0.69,0.6ZM630.95,631.66l0.08,0.09l-0.0,0.18l-0.08,-0.27ZM629.87,628.81l0.45,-1.93l0.83,-0.95l0.06,2.57l-0.21,0.26l-1.14,0.06ZM620.81,615.4l-0.15,-0.1l-1.04,-1.97l-2.08,-2.4l2.14,-0.65l0.9,0.56l-1.09,1.26l0.72,1.12l0.59,2.18Z", "name": "Greece"}, "RU": {"path": "M726.11,290.03l1.44,0.47l1.4,1.79l1.34,0.66l1.83,0.02l1.0,-1.42l-1.01,-2.65l-1.75,-1.83l-1.79,-0.93l-3.39,0.01l-0.29,-1.23l0.24,-0.8l2.94,-2.83l0.33,-0.93l-0.98,-8.52l-0.89,-1.42l0.98,-1.16l1.86,-4.42l1.6,-0.5l0.55,-0.74l1.26,-0.69l-0.24,-1.11l-1.43,-1.46l0.6,-1.35l-0.65,-3.35l0.42,-0.82l0.57,-0.06l1.12,1.2l2.03,0.6l1.21,-0.84l0.54,-1.72l0.56,-0.46l1.07,0.55l1.95,0.23l2.87,-0.46l2.72,-3.42l6.88,0.87l6.12,1.65l0.89,-0.77l0.29,-1.23l-0.19,-0.42l-2.61,-1.39l-1.44,-1.91l-2.05,-1.51l-2.27,-0.21l-2.75,0.52l-3.91,-0.3l-3.38,-2.77l-2.3,-0.91l-1.57,-2.17l0.85,0.47l0.58,-0.26l0.39,-2.49l-2.07,-1.74l-4.84,2.14l-3.82,0.53l7.28,-6.51l3.44,-2.16l1.07,-1.18l6.97,-4.75l3.26,-3.23l2.7,-2.13l11.86,-12.12l5.03,-4.13l3.4,-3.32l1.38,-1.87l3.45,-6.95l-0.01,-0.97l-0.42,-0.8l-2.34,-2.4l-2.18,-3.05l-2.83,-1.99l-7.52,-4.34l-5.48,-4.63l2.72,-1.22l4.0,-4.72l0.38,-1.46l-0.17,-2.73l-0.38,-0.9l-1.51,-1.2l-3.71,-1.77l-1.54,-3.23l-0.01,-0.49l1.82,-2.02l-0.21,-2.19l-0.75,-0.87l-3.83,-0.84l-0.98,-0.81l-1.23,-2.52l0.19,-1.23l2.4,-1.41l0.44,-1.18l-0.26,-1.49l-2.69,-0.77l1.34,-1.73l0.27,-3.17l1.19,-2.04l-0.08,-0.5l-1.02,-0.91l4.61,-0.92l0.39,-1.34l-0.21,-1.45l-2.56,-6.99l-3.15,-4.16l-2.8,-5.79l-2.34,-3.73l-2.68,-3.45l-0.31,-0.84l0.25,-1.57l2.07,-2.8l4.43,-5.2l5.01,-5.15l0.73,-3.16l-0.28,-0.7l-2.11,-1.5l-3.99,-4.03l-2.62,-3.21l-8.77,-2.94l-2.79,-6.73l0.1,-0.97l3.69,-5.53l0.3,-1.8l-1.15,-0.93l-3.46,-0.31l9.02,-3.32l0.82,-0.57l0.66,-0.76l2.29,-4.62l8.22,-2.29l1.33,-1.04l1.09,-1.73l0.48,-2.01l-0.34,-0.97l5.48,2.43l2.48,0.12l1.09,-0.25l0.77,-0.81l0.37,-1.19l-0.59,-3.81l1.82,0.26l5.43,1.91l1.55,-0.18l1.81,-0.72l1.58,-2.18l0.98,-0.31l1.48,0.49l0.45,-0.15l0.48,-1.01l-0.7,-2.17l5.05,1.88l2.44,1.53l5.02,1.3l0.69,0.55l-0.14,1.85l-0.82,0.45l-2.04,-0.09l-8.15,-1.55l-1.16,1.0l-0.01,0.6l1.05,0.94l2.14,0.95l0.58,1.64l0.41,0.27l3.46,-0.24l3.3,0.68l1.42,-0.18l-0.88,1.41l0.08,0.55l0.89,0.44l3.73,-1.44l1.6,-0.36l0.6,0.25l0.09,0.86l-0.58,1.41l-0.09,1.2l-1.07,2.55l-1.81,0.91l-0.74,1.6l0.43,0.15l2.61,-0.7l1.48,-0.8l2.69,-3.85l0.61,-0.4l7.25,-0.07l8.54,2.02l2.04,0.17l2.33,-0.23l1.51,-1.05l7.57,1.96l10.28,4.47l15.04,7.36l8.43,6.46l1.18,1.5l3.07,0.79l0.85,-0.48l1.46,0.4l10.12,5.95l3.45,0.31l0.41,-0.54l-0.6,-1.55l0.93,0.68l1.87,2.27l2.36,1.76l2.33,2.53l1.51,0.78l0.0,30.64l-5.15,3.01l-10.98,3.76l-8.56,1.41l-3.42,0.1l-6.69,-0.7l-3.63,-0.75l-4.48,-2.13l-4.29,-1.1l-2.98,-0.49l-5.35,-0.2l-11.6,-2.1l-1.97,-0.72l-7.29,-4.12l-3.2,1.13l-1.46,0.18l-0.78,-0.94l0.53,-0.72l-0.24,-0.58l-4.14,-1.18l-3.43,-0.09l-4.02,-1.75l-1.59,0.44l-4.38,-1.76l-1.93,-1.41l-1.89,-2.33l0.92,-1.16l-0.19,-0.68l-7.27,-1.52l-6.84,-0.2l-0.4,0.29l0.18,0.46l1.19,0.72l3.05,0.43l3.73,2.29l-0.44,1.73l0.17,0.43l5.18,3.73l0.29,0.74l4.18,0.93l0.44,1.29l-0.47,0.94l0.67,1.15l5.49,1.86l-0.52,0.8l-1.44,0.78l-1.53,0.38l-0.3,0.36l0.24,0.4l0.93,0.34l1.98,-0.12l7.3,2.13l3.81,2.13l3.89,3.9l1.2,1.84l-0.12,1.89l-2.15,5.68l-0.9,1.09l-1.83,1.32l-0.1,0.55l3.58,5.02l1.76,3.94l0.38,3.98l1.24,0.96l-0.89,1.1l0.25,3.45l2.37,2.71l3.37,1.69l2.28,0.38l2.79,-0.66l1.95,0.87l4.57,3.12l2.06,3.28l1.09,0.86l8.27,2.02l5.37,1.99l1.05,0.1l2.82,-1.76l4.45,-1.19l1.69,-2.08l-0.15,-1.55l-1.13,-2.46l-0.48,-2.68l-2.94,-1.7l-4.41,0.47l-1.79,-0.09l-1.31,-0.61l-1.88,-1.7l-3.66,-4.27l-1.98,-1.45l-0.57,-0.81l-0.62,-1.12l0.06,-1.49l1.44,-0.01l1.8,-1.14l1.41,-4.09l3.11,-0.43l5.13,1.86l6.59,5.08l1.56,0.56l3.82,-0.04l0.42,0.59l1.34,0.79l7.02,1.73l7.13,3.16l2.91,-0.34l1.23,-2.43l2.64,-1.63l1.82,-0.27l2.7,0.62l0.94,-0.91l0.0,400.07l-4.46,-0.79l-1.09,0.42l-1.26,1.88l-5.84,-4.82l-2.57,-2.84l-8.3,-6.49l-7.29,-2.21l-4.42,-4.6l-2.32,0.5l-2.63,-0.52l-1.78,-1.42l-0.9,-1.9l-1.27,-1.31l-3.61,-1.66l-3.84,-0.92l-0.2,-0.37l3.1,-1.0l1.03,-0.69l-0.05,-0.69l-2.45,-1.01l1.22,-0.52l3.01,1.98l1.61,0.58l1.01,-0.66l5.08,-1.09l0.64,-1.13l0.01,-1.14l-0.83,-0.39l0.02,-0.79l0.7,-1.38l2.37,-2.55l1.21,-3.3l0.78,-0.55l0.38,0.25l0.1,1.27l0.32,0.31l0.41,-0.18l1.33,-2.52l3.98,0.07l0.24,-0.67l-2.44,-2.61l-3.22,-2.59l-1.55,0.09l-0.65,-0.3l-1.32,-2.0l-0.39,-1.18l2.35,0.25l3.37,-1.37l3.64,0.63l0.44,-0.46l-0.69,-2.28l4.53,-1.44l4.37,-1.99l2.18,-0.55l0.33,-1.4l-0.68,-1.65l-1.0,-1.4l-2.33,-0.06l-1.52,1.69l-3.33,0.51l-0.55,-0.04l1.8,-0.89l0.38,-0.89l-0.41,-0.19l-2.5,0.39l-1.4,1.14l-3.14,1.23l-0.09,-0.82l0.81,-0.93l0.26,-0.87l-1.06,-0.72l0.72,-1.44l0.38,-2.47l0.91,-0.72l1.93,-0.23l1.85,-0.8l1.15,-0.93l1.32,-2.0l0.85,-0.25l6.6,0.37l4.71,-0.19l0.87,-0.89l0.05,-1.5l1.42,-3.4l0.99,-1.16l0.05,-0.83l-1.49,-0.71l0.56,-0.88l-0.75,-3.25l-1.15,-0.75l-1.32,-0.29l0.66,-2.07l0.97,-0.98l1.32,0.21l1.24,-0.24l0.55,-0.79l-0.46,-0.76l-3.06,-1.05l-0.67,-1.1l2.56,-0.9l2.44,-2.39l0.59,-0.98l0.29,-2.27l-0.93,-1.24l0.0,-0.89l0.48,-1.04l-0.19,-0.6l-1.1,-0.63l-2.1,0.51l-1.12,-0.07l-4.23,-2.7l-2.19,-0.27l-1.68,-1.96l-2.3,0.57l-1.31,-0.1l-3.56,-2.2l-2.76,-0.26l-2.75,-1.58l-0.96,0.15l-0.52,0.67l-0.27,1.26l-1.02,0.25l-4.44,-3.21l-1.26,-1.76l-0.43,-1.51l-2.37,-2.21l-1.25,-0.09l-2.83,1.16l-5.07,1.07l-1.8,1.39l-1.55,-1.19l-1.78,-0.29l-0.86,0.24l-2.57,-2.23l-3.28,-0.48l-2.83,1.54l-0.78,-0.28l-0.55,-1.12l-0.87,-0.5l-0.93,-1.27l-0.22,-1.05l0.59,-1.13l0.05,-1.01l-1.71,-4.09l0.2,-1.4l-0.59,-0.56l-1.82,-0.2l-1.28,-2.54l-1.35,-0.09l-3.1,0.57l-3.49,-1.19l-3.32,-0.13l0.6,-0.53l0.05,-0.87l-0.67,-0.61l-0.34,-3.22l-1.12,-1.88l3.23,-0.64l0.56,-0.61l0.0,-0.97l-3.92,-3.8l-1.29,-3.12l-1.31,-1.82l-1.47,-1.24l-1.22,-0.59l-3.98,0.16l-2.32,-0.36l-1.88,0.24l-3.42,1.53l-1.14,0.06l-3.97,-1.0l-1.1,0.01l-1.27,0.77l-1.12,2.88l-1.96,1.03l-1.84,0.07l-2.57,-0.95l-1.02,-2.05l-1.46,-1.55l0.1,-3.66l0.34,-0.73l-1.14,-1.49l-0.07,-0.9l0.58,-0.74l-0.03,-0.72l-3.97,-4.57l1.74,-2.87l3.23,-0.09l0.87,0.25l1.61,1.49l4.18,0.24l3.9,-2.22l0.67,-1.14l2.96,-1.12l0.33,-0.34l-0.01,-1.77l-0.42,-0.68l-2.85,-1.78l-0.46,-0.98l0.32,-0.71l-0.24,-1.09l-3.52,-1.68l-5.55,-0.36l0.81,-2.04l0.17,-1.22l-0.27,-0.89l-0.58,-0.55l-5.18,-2.56l-1.33,-1.67l-0.71,-1.81l-0.87,-1.24l-1.36,-0.72l0.98,-1.81l-0.1,-0.74l-4.73,-2.94l0.42,-2.01l2.06,-2.77l-0.33,-1.87l-1.9,-2.6l0.05,-0.61l1.13,-1.47l0.09,-3.31l-0.53,-0.83l-2.18,-0.5l-1.26,-0.82l-2.4,-2.34l-3.18,-1.14l-4.12,0.02l-2.58,1.41l-1.63,0.4l-1.8,1.14l-1.34,-1.49l0.57,-1.78l-0.08,-0.77l-0.47,-0.67l-4.06,-1.61l-2.03,0.38l-1.99,1.08l-0.45,-0.15l-1.32,-1.91l-1.12,-0.71l-2.42,0.01l-1.23,0.67l-1.72,-1.43l0.66,-2.19l-1.34,-5.49l-1.34,-1.21l-0.23,-0.86l-1.31,-1.81l-0.13,-1.47l-0.53,-0.78l-0.98,-0.41l-1.57,0.36l0.75,-1.97l0.11,-1.54l0.56,-1.41l0.95,-1.24l0.0,-2.13l-0.62,-0.75l-3.35,-2.1l-0.53,-1.63l-1.92,-0.42l0.57,-2.1l1.17,-1.07l0.68,-1.42l2.7,-0.77l0.62,-0.66l-0.15,-0.75l-1.29,-1.03l-0.25,-1.0ZM899.6,149.08l-0.91,-2.5l-1.31,-2.3l-1.94,-1.53l-3.3,-4.18l-1.3,-2.04l-0.62,-2.02l0.83,-3.04l6.79,-3.36l1.76,-1.43l0.0,22.4ZM836.18,140.74l0.44,1.89l-0.38,0.82l0.1,0.76l-0.3,0.19l-1.12,-1.49l-0.96,-0.18l-0.66,-0.6l-0.26,-0.83l0.79,0.0l1.49,-0.81l0.85,0.25ZM617.41,357.73l1.54,-1.2l1.41,-1.73l1.16,-2.18l0.41,-3.11l1.52,-0.56l4.03,0.06l1.68,-0.82l1.35,-1.25l-0.8,0.85l0.13,0.64l1.12,0.5l1.36,0.19l1.62,0.72l1.47,0.13l2.74,-0.62l0.3,-0.33l0.62,-5.87l1.57,-0.18l2.24,1.46l4.31,1.78l2.75,0.72l6.56,0.09l0.88,1.63l2.49,1.72l-1.93,5.57l-0.04,1.47l0.9,2.13l-41.39,-1.79Z", "name": "Russia"}, "NL": {"path": "M408.11,413.92l-2.98,-1.02l-2.63,0.56l-1.62,-0.68l-1.47,-0.1l-1.43,-1.16l0.86,-0.49l2.54,-0.12l1.81,0.37l3.4,2.1l2.12,-0.24l0.2,-0.64l-0.47,-0.58l-2.47,-1.11l1.44,-0.16l0.27,-0.65l-0.68,-1.17l-2.31,-2.26l1.63,-2.96l1.7,-1.22l3.79,-4.66l1.1,-2.5l1.57,-6.68l1.04,-2.07l1.58,0.51l2.03,-0.83l0.61,2.01l1.68,1.87l-0.05,0.7l-2.4,1.06l0.04,3.13l-0.72,1.49l0.08,0.43l0.54,0.48l6.52,1.61l4.07,-3.2l1.17,-1.38l-0.04,-1.42l-0.47,-1.01l-2.62,-0.56l-0.29,-0.33l0.01,-1.58l0.57,-0.88l-0.05,-0.97l-0.42,-0.31l-1.44,0.1l-1.38,-0.36l-0.26,-2.87l-0.67,-0.7l1.23,-2.18l1.06,-0.92l4.54,-1.93l2.49,-0.57l10.02,-0.62l2.06,2.07l2.84,0.79l-0.08,4.83l-1.86,4.59l-0.24,1.67l-3.48,0.08l-0.9,0.62l0.09,0.93l-0.34,0.86l0.88,1.38l1.41,0.52l1.7,-0.01l0.65,0.86l-0.19,1.84l-0.5,0.96l-3.49,2.4l-0.14,0.98l1.13,1.12l-0.6,0.77l-2.87,0.97l-1.44,-0.0l-0.68,0.49l-2.7,-0.95l-2.28,0.91l-0.97,0.89l0.08,0.97l1.84,2.22l0.1,0.74l1.31,1.87l0.06,0.56l-0.41,1.55l-1.26,2.5l0.11,0.92l0.53,0.33l-2.24,1.64l-0.78,-0.07l-0.53,0.48l0.1,0.74l0.47,0.55l1.53,0.64l0.41,0.58l-0.61,2.28l-2.95,-0.15l-0.55,-0.2l-0.58,-0.97l1.24,-1.33l0.21,-1.07l0.9,-1.71l0.16,-0.82l-0.5,-0.82l-2.67,-0.92l-1.82,-1.56l-2.38,0.42l-1.15,-0.3l-1.39,-1.09l-0.5,-1.77l-0.54,-0.52l-0.49,0.01l-1.11,1.02l-1.05,0.07l-0.27,-0.74l-0.84,-0.78l-0.46,0.02l-1.54,1.17l-1.76,-0.94l-1.73,0.91l0.02,1.2l-1.77,-0.51ZM421.28,396.41l4.65,-3.0l1.5,-0.51l0.91,0.09l0.98,0.62l-0.3,0.84l-3.92,2.87l-0.85,0.06l-2.96,-0.97ZM416.5,383.47l-1.03,1.0l-0.51,-0.26l0.29,-0.71l1.25,-1.07l-0.0,1.03ZM407.31,414.89l-2.06,1.54l-1.75,0.66l-0.79,-0.07l-2.0,-1.12l-1.46,-0.21l-1.9,0.74l-0.5,-0.59l-0.29,-1.12l2.71,-0.27l3.99,0.8l1.77,-0.71l1.2,0.56l1.08,-0.22ZM401.26,408.39l0.8,-0.2l1.99,0.12l1.27,0.97l-1.02,0.24l-1.64,-1.11l-1.39,-0.02Z", "name": "Netherlands"}, "PT": {"path": "M226.07,631.38l0.09,-1.3l-0.52,-1.53l1.89,-0.52l1.05,-0.88l0.66,-1.19l-0.29,-1.44l0.72,-1.29l1.9,-1.22l0.16,-0.48l-0.45,-0.25l-1.03,0.19l-1.33,0.85l-2.54,4.33l-2.69,0.63l-1.22,-0.39l0.0,-1.58l0.59,-1.75l0.23,-2.35l0.81,-2.11l-0.23,-1.47l1.55,-1.26l1.45,-1.94l4.21,-9.14l-0.16,-0.87l-0.43,-0.47l0.16,-1.05l1.34,-5.47l1.22,-2.52l0.34,-5.43l-1.08,-3.3l-0.9,-4.39l-0.06,-1.28l0.63,-0.63l-0.25,-0.68l-1.03,-0.09l-0.39,-0.67l0.1,-0.85l2.5,-2.7l1.86,-0.94l3.64,-1.08l0.35,0.03l0.97,1.44l-1.22,1.94l0.7,1.49l0.68,0.39l0.93,-0.07l2.18,-1.03l3.06,-0.14l2.4,0.83l1.69,0.04l2.74,-1.05l0.62,-1.31l1.58,0.47l2.24,0.09l0.56,-0.29l1.51,0.44l1.18,-0.08l0.55,0.78l-0.02,2.66l0.26,0.7l3.35,0.69l0.74,0.55l0.28,0.69l-2.34,2.39l-2.17,1.14l-1.76,1.49l-1.17,1.72l-1.44,0.74l-0.73,1.02l1.23,3.94l0.23,1.9l-0.45,3.46l0.52,1.45l-2.57,1.96l-0.37,0.82l0.17,0.84l1.64,1.7l-1.02,3.33l-0.78,1.27l-0.86,0.37l-4.59,0.03l-1.11,0.3l-0.24,0.59l1.23,2.01l1.47,1.18l0.41,1.96l1.81,3.22l1.87,0.6l0.43,0.57l-0.58,2.04l-3.14,2.99l-0.94,4.28l3.28,4.65l1.82,-0.01l-0.66,1.6l-2.21,0.66l-3.59,4.5l-0.83,2.42l1.24,5.98l-0.9,0.16l-4.53,2.49l-1.25,0.0l-2.72,-1.12l-6.2,-0.68l-2.07,0.72l-1.41,-0.02l-1.47,0.83l2.33,-5.99l-0.06,-2.49l0.35,-2.3l-0.42,-2.18l-0.73,-1.34l1.01,-3.52l-0.12,-1.83l-0.72,-1.81l2.21,0.27l0.41,-0.22l-0.07,-0.46l-0.89,-0.92l-1.23,-0.68l-1.65,0.12l-3.48,1.12ZM117.56,718.32l1.56,0.67l1.81,-0.33l2.3,1.05l-1.15,1.04l-2.21,-0.2l-2.57,-1.4l0.26,-0.82ZM10.64,654.82l-1.1,0.02l-0.19,-0.31l0.92,-0.12l0.37,0.41ZM2.49,641.55l1.09,0.17l5.02,-0.12l-0.06,0.57l-0.57,0.32l-2.41,0.29l-3.86,-0.72l-1.16,-0.85l-0.14,-0.53l0.41,-0.13l1.67,1.01Z", "name": "Portugal"}, "NO": {"path": "M728.73,12.12l0.23,0.63l1.37,0.34l2.91,-0.91l0.43,0.5l-0.87,2.15l-0.5,5.32l0.03,1.92l0.75,1.21l0.37,-0.28l1.54,-4.63l1.79,-1.59l0.63,-2.84l1.64,-3.37l1.81,-1.92l0.96,-0.48l3.49,0.08l1.42,0.68l1.34,1.62l1.13,0.76l3.32,0.75l1.46,1.46l1.05,0.06l2.14,-1.24l1.18,-0.17l2.0,1.7l-0.39,1.45l0.53,0.75l2.78,-0.09l2.24,0.55l4.31,2.89l0.39,1.18l-0.18,1.34l-6.19,1.79l-2.83,1.78l-4.44,0.67l-15.48,-1.19l-0.42,0.49l0.6,1.58l10.68,2.78l0.42,0.55l-0.32,1.59l0.21,2.36l1.07,1.15l1.47,0.42l2.61,-0.21l1.62,0.37l1.06,-0.95l0.31,-2.12l0.45,-0.29l1.14,0.5l0.61,2.27l0.6,0.49l0.57,-0.18l0.65,-1.49l4.65,0.21l0.66,2.86l-0.33,1.93l-1.15,0.59l-2.23,-0.09l-3.11,-1.22l-2.04,-1.17l-1.03,-0.06l-0.46,0.65l0.46,1.08l-0.11,0.77l-1.24,2.44l-1.18,0.9l-2.11,0.74l-6.01,1.49l-0.74,0.88l-1.92,4.09l-1.08,0.98l-1.79,0.57l-1.49,-1.94l0.15,-1.12l2.32,-2.54l2.91,-2.55l1.33,-1.95l0.02,-0.42l-2.6,-4.77l-10.07,-3.82l-4.86,-3.54l-2.12,-2.17l-2.31,-0.18l-2.22,0.59l-3.29,1.99l-2.88,1.26l-2.52,-0.53l-2.63,-0.12l-3.06,0.46l-3.09,3.3l-3.22,2.21l-0.89,1.04l-0.68,1.54l-1.52,5.34l-1.15,2.08l-0.26,1.33l0.26,3.66l-0.25,1.89l-2.12,2.23l-2.9,0.58l-1.59,1.03l-1.19,1.51l-1.11,2.84l-1.73,0.96l-1.64,-0.27l-1.4,-1.1l-5.01,-1.38l-4.52,-2.05l-2.06,-0.21l-2.25,2.22l-5.05,1.49l-2.23,0.14l-1.05,-0.74l-8.72,-1.08l-1.51,-3.09l-9.21,-9.88l-5.12,-0.19l-1.9,0.71l-1.2,1.0l-0.17,0.91l0.95,2.35l-0.45,0.52l-2.35,-0.67l-2.89,0.05l-0.9,0.78l-6.7,0.37l-0.25,0.69l2.88,2.76l0.13,1.02l-0.37,2.12l-1.03,1.82l-1.19,1.48l-2.37,1.5l0.06,0.71l3.06,1.26l-3.0,2.32l-12.25,-3.18l-3.88,-0.18l-5.25,-1.45l-1.26,0.17l-2.17,0.96l-0.21,1.5l0.39,6.19l-0.64,1.44l-2.61,3.64l-7.75,-3.12l-7.69,4.89l-2.94,6.47l-1.5,1.49l-3.45,1.03l-1.17,2.04l0.05,0.43l3.13,3.96l0.93,2.08l-0.36,2.0l-2.18,1.74l-9.23,9.65l-1.79,1.39l-0.15,0.39l0.78,3.92l-1.25,1.03l-4.43,1.86l-6.68,0.85l-0.35,0.48l1.23,7.36l-1.15,3.32l-0.93,7.54l-4.89,7.78l-6.29,7.98l0.14,0.61l5.66,2.51l0.87,4.15l-0.09,1.74l-1.0,1.6l-1.2,1.56l-10.12,-1.3l-3.0,0.54l-2.79,1.15l-1.83,1.34l-4.9,5.82l-1.7,1.6l0.35,2.44l-2.78,4.15l1.85,4.71l0.95,1.67l-1.39,1.81l0.42,4.16l-0.34,2.72l2.56,6.56l-0.15,2.34l-1.85,9.33l2.03,1.82l4.12,2.33l3.65,3.7l-0.65,2.4l-1.65,3.3l-4.52,0.59l-1.11,0.86l0.31,2.38l3.23,7.09l0.44,1.8l-0.98,2.96l-0.38,3.87l-2.51,2.69l-1.57,1.04l-2.34,0.41l-0.95,0.63l-1.44,3.47l-2.02,2.05l-0.04,1.14l1.51,5.23l-1.14,5.29l-0.86,1.68l-1.08,0.53l-0.66,-0.22l-1.62,-3.96l-7.05,-1.56l-2.46,-3.92l-0.13,-4.22l-0.52,-3.2l-0.31,-0.36l-0.44,0.18l-0.83,1.39l0.39,2.25l-2.28,1.54l0.12,1.28l0.55,0.47l-0.21,2.89l-3.22,5.07l-1.36,-0.24l-1.59,1.15l-1.18,0.14l-0.57,-1.25l-2.24,-1.81l-1.35,0.01l-0.24,0.69l1.66,1.79l-0.34,0.49l-4.57,2.18l-0.1,0.66l0.87,0.76l-0.63,0.74l-1.2,0.24l-0.9,1.31l-3.32,2.06l-5.48,5.29l-2.79,1.48l-1.93,1.51l-1.6,-0.04l-2.35,1.35l-5.42,1.13l-3.62,-0.52l-2.54,0.44l-1.12,-0.74l0.13,-0.99l-0.23,-0.57l-0.48,-0.15l-1.42,0.03l-0.43,0.44l-0.3,1.11l-1.65,-0.49l-0.19,-0.21l0.48,-0.73l1.13,-0.9l0.02,-0.61l-0.66,-0.86l-3.61,-0.1l-4.41,-2.06l-1.12,-1.16l-3.59,-1.77l-1.55,-1.81l-0.87,-1.97l0.49,-4.68l0.5,-0.49l3.02,0.98l3.54,1.8l0.77,-0.24l0.99,-1.33l1.95,-1.08l-0.0,-0.7l-0.92,-0.33l-2.81,1.2l-2.49,-1.9l0.0,-0.39l0.79,-0.82l0.27,-1.01l-0.4,-1.12l0.16,-1.06l4.66,-4.01l1.45,-0.81l0.15,-0.54l-0.62,-0.47l-1.78,0.56l-5.83,3.61l-3.78,1.24l-1.46,1.82l-1.27,0.66l-2.2,0.07l-0.41,-0.93l0.7,-4.41l0.75,-2.16l0.75,-1.38l1.39,-0.37l0.82,-1.01l3.8,1.04l1.57,-1.49l1.65,-0.23l3.06,-1.49l0.15,-0.72l-0.45,-0.3l-5.05,0.73l-0.67,-0.19l-0.29,-0.73l4.44,-4.25l0.62,-1.06l0.39,-2.03l2.7,-2.33l1.96,-0.95l0.44,0.56l-0.61,2.9l0.01,1.23l0.32,0.39l0.45,-0.24l1.8,-4.31l0.74,-0.96l0.8,-0.65l2.32,-0.59l0.69,-1.14l-0.39,-0.22l-2.64,0.24l-6.23,1.67l-2.72,1.52l-3.5,4.09l-0.42,1.66l-0.85,0.74l-1.49,0.42l-1.92,2.07l-0.87,1.66l-3.08,2.3l-1.17,1.31l-0.32,-1.44l0.18,-1.94l0.87,-1.41l0.48,-1.55l-0.55,-1.47l0.23,-0.46l2.09,0.41l1.6,-0.06l2.77,-1.1l0.18,-0.59l-0.72,-0.8l-3.19,-0.01l-1.6,-0.94l-1.3,-1.95l-0.58,-2.58l0.3,-0.56l5.03,-2.8l1.46,-1.36l-0.21,-0.69l-1.12,-0.04l-1.87,1.53l-2.49,0.88l-1.51,-1.18l-0.83,-1.34l-0.5,-2.97l-0.01,-3.47l0.81,-0.47l2.52,0.47l3.01,-0.18l6.47,-1.26l4.11,0.74l1.79,-0.06l2.68,-1.09l2.11,-0.1l1.55,0.76l0.78,0.8l0.21,1.37l0.79,0.85l0.48,0.08l0.53,-0.28l0.19,-0.51l-0.46,-2.11l6.53,-1.69l0.97,-0.77l-0.22,-0.7l-2.49,-0.22l-0.59,-1.22l1.35,-2.63l-0.14,-0.32l-0.63,-0.15l-1.62,1.45l-0.74,1.82l0.08,1.93l-1.16,0.26l-3.03,0.11l-3.76,-0.93l-0.35,-0.26l0.16,-0.79l-0.54,-0.64l-0.52,0.09l-0.77,0.93l-0.68,1.78l-1.2,0.35l-4.09,-0.68l-5.91,0.41l-2.68,0.93l-1.55,-0.11l-2.82,-1.56l-1.03,-1.16l-0.28,-3.28l3.31,-0.44l1.09,-0.62l-0.04,-0.72l-2.18,-1.12l-0.87,-1.51l-1.48,-0.65l-0.81,-1.18l-0.22,-1.9l0.22,-1.2l0.47,-0.29l1.73,0.29l4.65,-0.24l7.55,2.28l6.23,-0.44l3.58,-1.3l0.06,-0.73l-0.93,-0.4l-3.85,0.74l-3.51,-0.03l-8.9,-1.94l-2.82,0.2l-1.23,-0.38l-0.7,-1.19l0.55,-2.45l0.89,-0.41l0.79,0.65l1.21,-0.11l1.76,-1.91l0.61,-1.39l2.32,-1.33l2.5,-0.75l0.72,0.14l1.38,1.17l2.02,-0.0l5.03,-1.15l1.71,-1.38l0.08,-0.46l-0.41,-0.22l-7.2,1.24l-0.09,-0.31l1.55,-1.5l0.43,-1.2l0.86,-0.45l5.24,-0.57l2.87,0.23l4.31,0.51l2.77,1.23l1.27,-0.08l1.2,-0.35l0.66,-0.54l-0.17,-0.69l-1.96,-0.46l0.08,-0.64l3.4,-0.97l3.9,-0.23l0.29,-0.65l-1.05,-0.98l-8.54,1.25l-2.16,-0.82l-1.92,-0.02l-1.28,0.51l-3.32,0.42l0.48,-1.11l2.15,-2.94l0.74,-0.46l5.1,-1.38l2.53,-1.63l3.76,-0.26l3.04,0.43l1.55,2.02l5.55,3.15l0.45,-0.02l-0.16,-1.34l-3.67,-3.44l-1.39,-0.85l-0.91,-1.47l0.3,-1.32l0.99,-0.9l4.06,-0.56l0.95,-0.71l0.22,-1.35l-0.74,-1.02l-2.79,-0.46l-0.24,-0.78l0.35,-0.54l2.3,-1.35l3.43,-0.91l3.72,1.05l-0.85,1.42l0.03,1.1l0.36,0.34l0.97,0.09l2.5,-2.4l2.53,-0.31l2.2,-0.78l1.72,2.01l1.34,0.96l0.53,1.63l0.88,0.37l1.1,-0.94l3.3,-0.73l3.35,0.47l2.32,-0.3l0.39,-0.56l-1.06,-1.99l0.54,-1.1l2.88,-1.45l2.34,-0.5l3.37,-1.82l0.2,-0.52l-0.89,-1.59l-1.46,-0.24l3.35,-1.94l0.12,-0.61l-0.57,-0.59l-1.9,-0.53l-3.2,1.34l-2.23,1.48l0.02,0.68l1.46,1.29l-1.23,1.3l-7.99,4.24l-3.74,1.22l-1.44,-0.16l-2.06,-3.63l-0.37,-0.22l-2.26,0.2l0.56,-1.66l1.17,-1.4l2.19,-1.22l1.06,-1.46l0.91,-2.09l3.05,-2.1l4.41,-5.13l3.56,-1.63l1.42,-1.85l2.14,-0.82l1.74,-1.35l1.46,-0.17l2.61,-1.28l1.59,-1.61l-0.25,-0.68l-0.97,-0.1l-3.2,1.24l0.63,-2.53l1.77,-1.44l8.82,-4.35l2.09,1.98l2.74,-0.3l3.33,-2.63l2.45,-2.81l0.03,-0.49l-0.47,-0.15l-1.3,0.48l-4.18,2.7l-1.12,0.22l-0.44,-0.12l-0.57,-1.09l-0.96,-0.34l-0.9,0.17l-0.6,-0.51l-0.14,-1.58l1.98,-4.43l4.76,-5.24l0.87,-2.16l1.51,-0.99l2.11,0.24l0.9,-0.37l0.18,-0.55l-0.77,-1.41l-2.49,-1.33l7.75,-1.75l3.85,0.06l1.35,-0.96l2.16,-0.63l1.61,-1.13l-0.02,-0.67l-1.14,-0.54l-6.37,1.52l-4.78,0.46l-0.62,-4.09l0.41,-2.05l0.84,0.04l0.41,-0.35l0.25,-2.21l1.17,-1.2l1.9,-0.35l2.23,-1.72l2.18,0.26l2.33,-0.27l0.24,-0.68l-0.58,-0.57l-2.9,-0.8l-0.45,-0.8l1.71,-0.96l1.18,-0.24l2.91,-3.35l1.39,0.1l1.69,-1.01l1.64,0.34l4.23,-1.18l8.65,-0.18l0.38,-0.3l0.26,-1.02l-0.34,-0.5l-8.31,-0.5l-4.78,0.14l4.07,-4.74l2.62,-1.62l1.91,0.39l2.4,1.68l1.53,0.19l0.6,0.42l1.45,2.41l0.56,0.07l0.45,-0.44l-0.23,-2.02l1.45,-1.66l0.01,-0.52l-0.82,-0.63l-2.24,0.61l-1.61,-0.6l-1.3,-1.22l-0.31,-0.94l1.52,-1.58l0.08,-0.57l-0.57,-0.72l-0.5,-0.1l-3.51,1.89l-2.88,0.28l0.42,-1.34l-0.25,-1.37l3.16,-3.18l0.98,-0.33l1.73,0.25l1.89,0.97l3.07,-0.68l0.26,-0.47l-0.56,-1.23l-3.25,-0.35l-0.56,-0.49l0.13,-0.32l2.23,-0.78l2.23,-1.39l2.56,-0.4l2.05,-1.03l0.41,0.39l0.79,4.05l1.9,3.28l0.98,0.31l0.45,-0.5l-0.68,-2.59l1.33,-1.19l0.41,-0.88l-0.28,-0.53l-0.85,-0.21l-0.68,-0.84l-1.07,-2.98l0.28,-0.58l2.33,-1.59l2.94,-0.37l3.25,1.17l1.3,0.04l8.52,-1.9l0.25,-0.5l-0.23,-0.56l-2.0,-0.82l-3.16,0.52l-8.21,-0.17l-0.57,-0.4l-0.1,-0.67l0.77,-1.23l0.88,-0.71l3.04,-1.36l3.48,-0.26l3.52,-2.5l1.5,-2.11l0.74,-2.81l2.0,-2.19l5.55,-1.56l0.2,-0.9l-0.53,-1.14l0.04,-2.02l1.39,-2.44l0.86,-0.79l1.14,0.66l1.52,1.87l2.21,1.03l3.04,0.21l1.02,-0.57l-0.05,-0.7l-2.21,-1.01l-1.53,-1.21l-0.1,-0.98l0.53,-0.47l2.73,-0.08l1.64,-0.97l0.77,-2.5l2.01,-1.97l6.3,-1.3l0.22,0.25l-0.34,3.86l-0.77,2.7l0.02,1.91l0.29,0.38l0.45,-0.16l1.34,-2.01l1.72,-5.22l1.26,-2.39l1.36,-1.31l3.1,-1.38l0.59,1.45l-0.72,4.51l0.06,1.44l-0.77,1.82l-3.14,4.28l0.08,0.89l0.5,0.28l2.12,-1.02l3.78,-3.96l3.22,0.49l0.46,-0.35l-0.06,-0.66l-2.39,-2.32l-0.35,-1.26l0.17,-3.66l0.84,-1.24l4.41,-0.04l0.96,0.67l1.78,-0.05l0.35,-0.24l1.13,-2.54l2.03,-0.2l2.09,1.77l2.52,1.2l2.02,1.73l0.51,0.0l0.58,-0.48l0.13,-0.41l-1.11,-4.11l-1.29,-1.65l-2.78,-0.9l-2.72,-1.79l-0.53,-0.8l2.15,-0.51l3.46,0.62l2.73,-1.45l0.94,0.35l2.03,-0.73l1.6,1.01l1.09,-0.57l0.42,-1.26l3.24,-0.82l2.1,0.78l1.07,0.76l1.38,4.8l1.87,1.95l1.31,0.98l1.7,0.08l0.63,-0.88l-0.06,-0.53l-1.14,-0.99l-0.26,-0.79l0.54,-2.31l0.62,-0.89l3.76,-3.66l3.08,-1.86l2.11,-0.31l3.32,-4.31l0.84,-0.7l0.78,-0.16l0.31,-0.47l-0.22,-1.07l-1.84,-0.88l-0.04,-0.83l2.28,-1.52l2.84,-2.62l1.15,-0.15l0.87,0.7l2.81,1.2l3.03,2.11l1.09,-0.1l1.51,-1.52l1.59,0.24l2.48,1.05l0.09,0.44l-1.4,0.88l-5.34,5.55l-0.92,1.62l-0.88,4.07l-2.09,2.72l-0.04,2.12l1.23,0.95l2.43,-0.75l2.81,-2.41l0.8,-2.66l6.95,-6.9l3.3,-3.87l3.66,-3.14l1.68,-0.53l0.78,1.68l-0.73,2.55l-1.53,1.7l0.07,0.6l0.98,0.67l-0.8,4.29l0.01,1.07l0.5,0.38l5.56,-2.51l2.31,-4.33l0.49,-1.52l1.51,-1.3l3.07,-0.01l0.39,-0.32l-0.08,-1.02l-3.77,-1.98l-0.27,-0.54l4.51,-3.24l1.64,0.23l1.19,0.54l4.36,0.4l3.1,1.53l-0.11,2.24l-0.67,0.96l-0.67,0.6l-4.3,1.96l-0.87,1.1ZM756.8,33.48l-2.19,0.6l-0.05,-0.09l1.06,-2.35l0.65,0.05l1.44,1.11l-0.91,0.68ZM694.5,3.24l3.24,-1.93l3.48,0.91l1.18,-0.0l1.68,1.66l0.73,0.04l-0.05,0.28l-1.54,0.43l-3.26,0.51l-2.15,-0.15l-1.48,-1.46l-1.85,-0.29ZM676.11,14.77l-2.24,0.85l-1.26,-0.71l-0.51,-0.7l-0.08,-1.73l0.28,-0.94l0.87,-0.43l3.59,2.07l-0.64,1.59ZM670.58,15.65l0.31,1.83l-1.11,1.19l-2.87,1.76l-0.12,0.61l-0.64,0.29l-1.35,0.3l-0.41,-0.17l0.09,-1.24l-0.29,-0.67l-0.54,-0.17l-0.94,0.5l-0.82,-0.53l0.24,-1.01l0.99,-0.93l1.66,-0.64l1.41,0.18l3.74,-2.54l0.64,1.25ZM668.13,9.06l-0.57,1.15l-4.23,3.85l-1.79,0.48l-1.29,0.76l-2.24,-0.41l-1.54,1.06l-2.45,0.03l-2.48,-1.12l-1.76,-1.58l2.44,-0.24l1.51,0.21l1.19,-1.09l1.94,0.11l3.8,-0.75l1.7,0.33l3.15,-2.48l1.07,0.02l1.3,-0.61l0.25,0.27ZM632.13,26.52l-1.42,0.6l-1.43,-0.54l-0.88,0.07l-0.57,-0.73l0.06,-0.58l0.93,-1.0l2.01,-0.61l1.59,0.25l-0.3,2.55ZM618.46,23.91l0.85,0.4l1.16,0.04l1.08,1.22l1.16,0.66l-0.83,0.46l-2.68,-0.01l-0.82,-1.9l-1.32,-1.37l-0.11,-0.62l0.52,-0.08l0.99,1.21ZM611.42,27.32l1.31,1.58l1.41,0.0l0.98,-0.71l1.05,0.5l-0.13,0.73l-2.0,1.5l-1.38,2.01l-1.62,0.43l-1.14,-0.16l-1.71,1.26l-2.75,2.91l-0.3,1.36l-6.62,1.0l-1.74,-0.48l-0.67,-0.77l1.82,-0.35l0.35,-0.37l0.05,-0.86l1.11,-0.95l0.41,-1.1l0.5,-0.21l1.67,0.18l1.11,-0.91l0.51,0.57l0.68,-0.15l0.32,-1.04l-0.18,-1.5l1.77,-1.6l0.83,-1.23l0.97,-0.66l0.97,0.11l0.43,-0.29l0.32,-1.16l-0.2,-1.95l0.85,-1.63l0.54,-0.04l0.39,1.32l0.08,2.68ZM588.18,39.31l1.24,1.04l2.37,-0.47l1.73,1.23l1.09,0.15l0.79,2.15l-0.6,0.87l-1.19,0.73l-0.29,1.48l0.32,1.44l-4.59,0.78l-0.96,-0.77l-0.48,-0.01l-2.23,1.59l-2.19,2.45l-0.49,0.13l-0.3,-0.65l-1.59,-0.54l-1.71,-0.05l2.13,-1.1l0.35,-1.26l-0.3,-2.33l0.35,-1.67l0.84,-0.67l3.6,0.4l0.4,-0.21l0.46,-0.84l-0.29,-0.91l-1.77,-0.93l1.26,-0.6l1.26,-0.07l0.78,-1.35ZM564.03,63.2l0.26,0.57l0.6,-0.03l1.78,-2.18l1.94,-0.67l1.19,-1.96l-0.08,-1.16l0.3,-0.74l1.54,-0.58l0.51,-0.13l1.1,0.7l1.51,2.7l-0.32,1.68l-2.27,1.42l-2.05,0.76l-1.97,1.76l-0.98,1.4l-0.62,0.23l-0.99,-0.45l-1.0,-0.0l-1.33,1.3l-3.11,0.95l-0.9,-0.2l-0.04,-0.94l-0.45,-0.38l-0.78,0.1l-1.44,1.55l-1.76,0.57l-1.75,-0.49l-3.97,2.48l-3.63,0.45l-0.87,-0.2l-0.0,-1.04l4.21,-3.17l6.82,-0.95l4.52,-4.21l1.14,-4.61l0.98,-1.56l-0.46,-1.31l-1.13,-0.33l-0.05,-0.99l0.54,-1.38l3.49,-3.01l2.0,-2.51l0.83,-0.49l0.9,0.0l0.78,0.48l-0.15,1.02l-1.58,2.35l-2.55,2.45l0.3,1.51l0.99,1.32l0.28,3.88l-1.79,2.64l-0.46,1.42ZM556.54,54.46l2.5,3.67l-0.58,2.34l-1.51,1.17l-4.24,0.12l-0.93,-0.51l-0.38,-0.83l-0.68,-0.21l-2.02,0.91l-1.06,0.11l-1.33,-0.6l-0.27,-0.72l2.17,-2.25l1.51,0.08l1.57,0.56l0.44,-0.22l0.64,-1.34l0.13,-1.3l1.99,0.41l0.48,-0.39l0.0,-2.2l0.64,-0.04l0.9,1.25ZM538.67,70.65l0.96,0.42l1.95,-0.11l-0.84,0.76l-1.83,0.42l-1.5,1.47l-2.63,0.27l-1.11,0.86l-0.71,-0.54l-0.6,0.13l-0.45,1.35l-1.52,0.4l-0.29,-1.54l1.17,-1.47l1.83,-0.2l1.4,-1.9l1.86,-0.52l2.31,0.17ZM526.33,79.08l-1.04,0.64l1.42,-3.36l1.2,-1.04l0.24,0.17l-0.26,1.89l-1.56,1.71ZM520.21,124.0l-0.58,0.03l0.0,-0.36l1.34,-1.14l2.38,-0.19l-3.14,1.65ZM519.02,120.83l-0.67,0.08l1.06,-1.26l0.6,-1.36l0.56,-0.36l0.86,0.5l0.02,0.92l-0.5,0.9l-1.93,0.59ZM512.64,130.29l-0.68,0.52l-1.32,-0.35l0.37,-0.91l0.78,-0.38l1.19,0.26l-0.35,0.85ZM502.61,147.16l-0.44,0.38l-1.54,-0.44l-3.0,0.37l-0.68,-0.32l0.6,-0.7l2.65,-1.15l1.27,0.05l1.27,1.24l-0.12,0.58ZM465.49,173.05l-1.51,-0.0l4.89,-1.52l0.48,-0.61l0.39,0.44l-0.14,0.94l-4.11,0.75ZM460.35,180.13l-2.56,-0.29l-0.84,-0.71l3.06,-1.01l0.58,0.58l0.05,1.08l-0.3,0.36ZM418.13,241.28l1.08,2.55l0.03,1.89l-0.6,-0.09l-0.57,-1.19l-0.17,-2.75l0.22,-0.42ZM417.53,227.52l-1.35,0.07l0.25,-1.42l0.69,-0.25l0.54,0.73l-0.13,0.88ZM229.04,8.0l-1.2,-0.01l1.39,-1.16l5.98,-2.82l2.44,-2.71l4.12,-0.83l0.21,1.05l-0.27,1.57l-3.83,1.4l-4.49,1.0l-4.36,2.51Z", "name": "Norway"}, "LI": {"path": "M479.66,489.8l0.02,-1.42l0.15,-0.43l0.74,1.46l-0.19,0.45l-0.72,-0.06Z", "name": "Liechtenstein"}, "LV": {"path": "M693.81,289.47l3.55,1.99l1.99,0.57l1.08,0.9l2.53,0.56l0.49,0.96l3.62,3.6l2.41,1.22l1.17,0.26l5.65,-1.51l2.97,1.36l4.19,0.48l0.5,1.6l3.78,2.51l0.01,1.64l-0.9,1.1l-0.62,1.56l-0.11,1.55l-0.95,2.51l0.51,0.58l2.08,-0.43l0.37,0.17l0.31,0.4l0.24,1.72l1.27,1.73l0.34,1.03l1.18,0.95l1.31,5.24l-0.59,1.84l-1.52,0.28l-1.91,1.15l-3.42,3.12l-0.81,2.06l-7.03,-0.58l-1.55,0.46l-1.71,1.91l-2.96,0.71l-2.36,-0.64l-1.52,-0.83l-2.67,-2.8l-5.8,-4.02l-1.15,-0.52l-6.83,-1.31l-1.59,-2.24l-0.54,-1.35l-1.1,-0.49l-2.14,0.57l-3.02,1.85l-4.67,0.37l-4.2,-1.24l-8.35,-0.73l-1.97,0.8l-1.07,-1.05l-1.26,-0.31l-1.54,0.36l-2.45,0.04l-6.91,-0.6l-5.95,1.81l-7.73,4.37l-0.35,-2.96l0.22,-7.21l0.51,-3.44l2.41,-2.01l1.33,-1.71l0.8,-2.32l0.72,-3.67l3.52,-4.67l2.8,-0.51l7.98,-2.39l1.23,2.38l6.53,5.21l2.21,4.68l4.89,2.3l4.09,-0.69l4.9,-3.24l1.55,-1.77l0.29,-1.57l-0.55,-6.25l-0.82,-2.71l0.2,-1.21l10.32,-3.79l1.64,1.26l0.73,-0.15l0.24,-0.81Z", "name": "Latvia"}, "LT": {"path": "M639.02,342.33l-0.39,-1.13l0.47,-2.2l-2.37,-6.79l-0.19,-4.61l7.95,-4.51l5.74,-1.75l6.79,0.61l2.53,-0.04l1.39,-0.36l1.04,0.26l1.27,1.12l1.22,-0.19l0.91,-0.62l8.2,0.71l4.28,1.25l4.86,-0.4l3.12,-1.88l1.75,-0.52l0.54,0.16l0.53,1.3l1.95,2.56l6.96,1.34l0.97,0.45l5.67,3.93l2.72,2.84l1.7,0.92l2.31,0.66l-0.34,1.84l-1.48,3.87l0.12,0.41l0.75,0.57l3.29,0.4l-1.48,1.08l-0.6,1.26l-4.13,-0.12l-0.74,0.49l-0.95,2.16l-0.97,0.67l-1.73,0.29l-1.62,0.68l-1.11,1.7l-0.79,2.17l0.04,2.82l-1.39,1.93l-1.03,2.49l0.51,0.92l1.76,0.29l0.48,0.48l0.08,1.37l-2.03,0.25l-0.64,-0.28l0.32,-0.85l-0.29,-0.93l-0.72,-0.7l-0.47,-0.03l-1.13,0.71l-1.24,0.04l-1.41,0.69l-1.0,1.14l-0.71,0.33l-2.58,-0.13l-0.73,0.71l-0.6,2.36l-1.96,-0.05l-3.92,1.55l-1.77,-1.04l-4.31,0.27l-1.89,0.43l-3.01,-0.41l0.02,-2.29l-0.39,-1.31l-1.24,-1.24l-2.8,-1.58l-1.61,-0.43l-0.45,-0.8l-1.72,-0.82l-1.06,-0.13l-0.74,0.5l-0.85,-1.99l0.06,-1.19l1.96,-5.08l-0.06,-0.83l-1.32,-1.32l-1.45,-0.78l-1.11,-1.78l-6.66,-0.08l-2.63,-0.68l-4.3,-1.77l-2.12,-1.44l-2.03,0.1Z", "name": "Lithuania"}, "LU": {"path": "M433.15,437.03l-0.02,1.54l0.46,1.19l0.9,1.05l1.71,1.44l2.06,0.7l-0.04,1.05l-1.43,1.94l-0.47,2.14l-1.81,-0.59l-2.33,0.93l-2.45,-1.16l1.0,-2.17l-2.04,-2.82l0.23,-1.64l1.61,-2.82l1.29,-1.3l1.16,0.19l0.17,0.33Z", "name": "Luxembourg"}, "FO": {"path": "M263.24,203.53l-0.39,0.92l-0.69,-0.21l-0.02,-1.73l1.1,1.03ZM260.24,213.24l-2.12,-1.39l-0.34,-0.59l2.22,0.79l0.37,0.54l-0.11,0.65ZM259.07,209.25l-3.26,-2.64l-1.87,-3.49l2.24,-0.5l4.06,1.71l-0.25,2.13l-1.84,-0.94l-0.67,0.61l-0.01,0.73l1.6,2.38ZM257.22,217.52l1.57,0.48l0.55,2.18l-1.8,-1.85l-0.31,-0.8ZM252.95,206.27l1.28,0.96l-1.0,0.36l-0.92,-0.12l-1.48,-0.53l-0.27,-0.64l1.89,-0.23l0.51,0.19Z", "name": "Faeroe Is."}, "PL": {"path": "M543.65,368.02l2.24,0.2l4.48,-1.73l7.75,-2.26l8.26,-2.12l3.9,-0.68l5.16,-4.95l4.31,-0.78l5.16,-2.51l7.82,-1.63l3.25,-0.36l3.12,-0.04l2.21,1.0l-0.57,-0.04l-0.39,0.57l2.05,4.35l1.16,1.6l2.4,1.27l2.0,0.42l5.97,-0.69l2.69,-1.31l8.11,0.66l26.59,1.14l7.65,0.18l1.4,-0.84l1.75,0.49l1.01,1.2l3.12,1.15l2.17,1.68l0.33,1.05l-0.04,2.27l1.64,6.67l2.6,6.11l1.31,4.41l0.39,3.77l-0.18,1.9l-0.61,0.58l-4.89,2.03l-1.01,0.69l-2.89,3.33l-0.47,1.1l0.51,0.99l3.51,1.58l1.85,1.18l0.6,0.91l-0.02,1.06l-0.57,1.63l0.2,1.32l-1.03,1.7l-0.08,2.01l1.61,3.05l0.13,2.59l2.67,3.26l1.68,3.35l1.47,1.21l-1.11,0.52l-0.48,0.6l1.52,3.27l-0.05,1.28l-1.46,1.98l-3.57,0.67l-4.09,3.59l-5.08,4.9l-5.28,6.4l1.06,4.51l-0.36,2.22l1.95,1.75l-0.24,0.41l-2.87,-0.93l-1.5,-0.09l-5.93,-2.17l-0.67,-1.45l-1.17,-0.92l-3.61,-1.28l-3.95,-0.3l-3.67,0.18l-1.34,1.47l-1.49,0.35l-1.84,-0.96l-1.53,-0.38l-3.52,0.1l-3.01,1.33l-0.84,0.92l-0.53,1.22l-1.56,-0.57l-1.82,0.42l0.34,-0.9l-0.2,-1.86l-0.8,-0.59l-1.18,-0.23l-2.68,-3.4l-0.49,0.01l-2.67,1.6l-1.25,1.8l-1.91,0.05l-0.36,-1.5l-1.45,-0.45l-0.45,-1.77l-2.8,-2.47l-0.57,-2.25l-0.76,-0.46l-2.28,-0.49l-0.66,0.22l-3.69,-2.09l-0.89,0.68l-1.68,0.28l-1.96,-2.02l-0.78,-0.32l-0.18,-0.17l1.22,-0.48l0.56,-0.84l-0.17,-1.46l-0.42,-0.42l-2.29,0.71l-1.7,0.16l-3.57,-2.18l-3.74,-0.88l-0.39,0.17l-0.17,0.62l1.62,2.71l-1.84,0.82l-1.61,1.27l-0.79,0.19l-3.93,-4.52l-1.56,-0.77l0.71,-0.74l1.08,-0.38l0.91,-1.37l-0.16,-0.72l-1.84,-1.31l-3.84,0.66l-0.82,-0.97l-2.85,-1.21l-5.03,-1.25l-0.92,-1.11l-0.5,-1.57l-3.64,-1.01l-0.61,0.61l0.01,1.78l-1.35,0.36l1.83,-3.66l0.72,-3.12l-1.56,-3.9l-2.48,-1.15l0.28,-1.67l-1.8,-3.51l0.94,-1.3l1.05,-3.2l-0.68,-0.86l0.02,-1.7l-0.35,-0.77l-0.98,-0.65l-0.68,-1.21l0.8,-3.27l-1.53,-2.24l-3.5,-2.48l-1.54,-1.59l0.1,-0.7l0.63,-0.77l1.41,-0.89l1.02,-1.45l0.65,-1.93l0.03,-1.7l-1.56,-5.02l-0.4,-2.5l3.71,1.43l0.56,-0.46l-0.4,-1.21l0.07,-2.13l-0.31,-0.36l-4.44,-0.86l-0.11,-0.47ZM603.71,353.39l0.66,0.35l-0.21,-0.08l-0.46,-0.27Z", "name": "Poland"}, "XK": {"path": "M623.28,565.63l0.23,-1.37l-0.65,-1.57l1.63,0.09l0.64,-0.79l3.48,-1.07l0.27,-0.76l-0.2,-0.76l1.93,-1.27l0.5,-0.84l0.09,-0.77l-0.53,-1.12l1.95,-0.93l0.57,1.38l2.88,1.35l2.09,2.07l0.37,0.86l2.01,1.19l-0.14,1.07l0.28,0.43l4.62,1.2l-1.88,4.12l-1.1,0.72l-0.15,0.66l0.36,0.88l-1.97,0.42l-0.92,0.69l-0.55,1.2l-1.4,-1.12l-1.41,-0.04l-3.96,1.67l-0.59,1.07l-0.11,1.91l-0.39,0.51l-1.14,-0.15l0.02,-2.13l-1.26,-3.53l-1.98,-1.52l-1.41,-0.49l-2.18,-3.23Z", "name": "Kosovo"}, "CH": {"path": "M474.98,480.14l0.93,1.21l2.74,1.45l1.43,0.09l0.68,0.53l-1.86,4.76l-0.08,1.49l0.52,0.93l1.74,0.08l2.81,0.78l0.54,1.22l3.54,1.51l1.02,-0.27l2.12,-1.93l0.51,0.2l0.41,1.32l-0.75,3.44l0.56,0.97l-0.02,0.65l-1.65,-0.23l-1.29,-0.99l-1.55,0.38l-0.6,1.17l-0.22,1.86l0.55,0.63l0.74,2.52l-0.69,0.02l-1.59,-2.16l-0.91,-0.09l-3.3,1.21l-1.21,-0.13l-0.52,-0.58l-0.68,-2.14l-0.42,-0.32l-1.84,-0.17l-0.8,0.69l-0.12,3.09l-3.34,4.57l-0.07,0.81l0.58,1.67l-0.72,0.36l-0.75,-1.36l-1.21,-1.09l0.49,-0.82l-0.08,-0.63l-2.59,-0.79l-2.33,-2.15l-0.24,-3.0l-0.6,-0.57l-0.93,0.09l-1.91,1.79l-1.9,1.26l-0.23,0.68l0.55,1.27l-1.71,2.33l-2.51,1.44l-3.3,-0.92l-3.01,1.12l-2.56,0.51l-0.83,-0.33l-1.26,-1.8l-2.35,-2.36l0.54,-1.67l-0.64,-1.73l0.1,-0.55l-0.58,-0.62l-2.44,-0.37l-2.11,0.11l-1.59,0.66l-1.5,1.42l0.49,1.3l-0.73,0.74l-1.4,0.72l-1.06,0.03l-0.01,-0.52l1.69,-1.25l0.38,-1.74l-0.82,-1.03l1.23,-2.71l3.31,-2.41l0.66,-3.3l2.81,-1.32l3.99,-4.25l0.72,-1.16l-0.34,-0.8l-0.94,-0.37l0.69,-0.76l1.01,-0.54l0.9,-0.01l0.97,0.98l2.09,-0.03l1.04,-0.38l1.17,-1.66l1.37,-0.65l1.08,0.36l3.11,0.1l2.31,-0.21l1.45,-0.53l3.48,0.18l1.83,-0.89l0.01,-0.53l-0.38,-0.39l-1.8,-0.11l0.3,-0.51l1.54,-0.64l2.09,1.29l1.19,-0.13l0.95,0.88l3.86,-0.25Z", "name": "Switzerland"}, "AD": {"path": "M373.44,566.17l-1.46,0.73l-1.49,0.29l-0.26,-1.45l0.13,-0.56l0.71,-0.55l2.52,0.57l0.23,0.31l-0.38,0.67Z", "name": "Andorra"}, "EE": {"path": "M681.02,292.17l1.82,-4.13l0.34,-3.01l0.83,-0.92l-0.26,-1.25l-2.11,-0.9l-0.93,0.07l-1.54,1.86l-1.37,0.39l-1.34,-0.75l-3.16,-1.02l-0.72,-1.23l-0.33,-1.62l-1.67,-1.33l-0.63,-1.43l0.21,-0.83l1.41,-0.67l0.61,-0.79l-0.35,-0.63l-2.02,0.06l-0.86,-2.23l1.02,-1.49l-0.57,-0.94l0.62,-1.45l-0.25,-1.46l3.54,-1.43l4.03,-0.33l0.36,-0.5l-0.29,-1.14l1.37,-0.12l2.65,-1.86l2.78,0.31l3.93,-1.31l7.61,0.02l1.28,-0.85l-0.01,-1.46l3.45,0.02l9.0,1.62l2.2,0.01l2.99,1.6l1.75,0.46l4.98,0.02l7.53,0.73l1.76,-1.2l1.2,1.24l0.06,0.35l-0.81,0.25l-0.7,0.83l-0.89,0.08l-0.75,0.46l-2.01,4.63l-1.0,1.16l-1.86,-0.45l-3.15,0.26l-2.71,0.88l-1.96,1.68l-0.01,1.85l2.53,3.07l1.06,3.8l1.27,1.16l1.32,1.87l0.64,1.7l2.36,4.15l0.34,1.32l1.41,1.24l-3.15,1.13l-0.66,1.42l-1.29,1.24l-0.65,2.49l-1.76,-0.23l-3.1,-1.39l-1.03,0.03l-4.85,1.48l-0.81,-0.22l-2.13,-1.06l-3.53,-3.51l-0.79,-1.2l-2.57,-0.57l-0.91,-0.82l-2.12,-0.63l-3.1,-1.88l-0.9,-0.23l-0.43,0.19l-0.22,0.83l-1.92,-1.29l-2.69,1.15l-6.13,1.9l-1.25,0.77ZM666.97,278.74l-0.76,0.14l-2.16,-1.14l0.85,-0.76l1.89,0.49l0.18,1.27ZM647.68,284.33l1.21,-1.0l0.33,-0.88l-1.4,-2.14l1.14,-0.04l1.0,0.59l1.87,-0.79l0.73,0.23l0.47,-0.18l0.75,-1.3l2.77,-0.86l1.92,0.59l1.76,-0.47l1.78,0.29l4.32,2.36l-2.29,0.37l-1.11,1.14l-0.83,0.23l-3.35,2.53l-2.91,-0.1l-1.98,0.46l-1.39,1.11l-0.69,2.3l-0.93,1.54l-0.87,0.51l-0.69,0.06l-0.04,-0.64l2.71,-3.11l-0.23,-0.59l-1.05,-0.32l-2.99,-1.89ZM661.53,273.2l-1.11,0.89l-0.64,-0.61l-0.66,0.02l-1.35,2.09l-1.33,0.31l-0.56,-0.26l0.03,-0.74l-1.12,-2.39l-1.41,-0.64l-2.39,-0.33l4.37,-0.49l1.83,-2.15l0.62,-0.09l0.4,0.14l0.6,1.28l2.34,0.45l0.84,1.22l0.26,1.21l-0.72,0.09Z", "name": "Estonia"}, "IS": {"path": "M31.07,119.93l0.78,-1.15l1.61,-0.28l4.07,2.06l0.46,0.86l-0.12,0.97l0.59,0.58l1.15,-0.26l1.6,0.23l1.28,-1.18l0.53,0.18l0.52,0.85l-0.08,2.47l0.67,0.18l0.77,-0.74l1.34,-0.06l0.57,-0.82l-0.3,-3.42l-5.08,-2.02l-1.59,-1.09l2.14,-0.53l3.31,0.02l0.54,-0.25l0.04,-0.67l-0.81,-0.56l-1.45,-0.29l-0.78,-0.84l-1.8,0.29l-3.49,-0.24l2.65,-1.57l2.25,0.17l2.17,-0.28l1.66,0.32l3.37,2.7l2.76,1.16l4.63,3.74l2.86,1.41l-1.29,0.67l-0.13,0.64l1.85,0.74l0.89,0.81l-0.88,3.03l-0.82,0.75l-2.59,-0.54l-0.41,0.17l0.0,0.45l0.8,1.08l1.88,0.98l0.21,1.15l1.01,-0.03l-0.8,1.9l0.1,0.7l1.67,0.26l0.95,0.72l1.35,3.36l0.72,-0.03l0.75,-2.67l0.28,-0.71l0.75,-0.57l0.78,-2.62l1.71,-1.48l1.4,-0.51l1.72,1.83l1.05,0.29l0.7,-0.3l1.38,-3.46l0.17,-2.52l-0.4,-2.63l0.22,-1.76l0.73,-0.96l0.91,-0.28l1.25,0.39l0.94,0.63l2.01,2.62l3.17,2.99l0.89,0.55l1.58,0.24l0.92,-0.75l-0.16,-4.45l0.82,-1.73l2.45,-0.49l2.78,-1.42l1.76,-0.48l1.69,0.98l3.36,3.79l2.41,1.8l1.51,3.25l0.57,0.25l0.7,-0.5l0.28,-0.64l0.06,-1.56l-2.91,-5.85l0.12,-0.95l4.9,0.32l1.06,0.59l2.5,2.56l1.27,0.86l2.2,-1.44l3.52,-3.91l0.88,0.12l1.88,1.21l1.36,0.43l1.36,-0.19l3.5,-1.42l1.05,-2.16l-1.46,-3.81l0.41,-0.5l3.14,-0.9l2.77,-0.07l4.05,3.55l0.28,1.79l2.4,1.38l1.69,0.07l2.54,-0.77l3.73,-2.29l1.42,-0.45l1.92,0.1l-1.26,0.29l-1.68,1.06l-2.97,3.92l0.2,0.85l1.53,0.97l1.58,0.53l1.58,-0.44l0.86,0.67l0.33,1.12l-0.24,1.28l-1.95,2.46l0.08,0.82l1.38,0.42l4.66,-0.73l0.73,2.3l-1.88,1.76l-0.05,0.52l0.51,0.13l2.27,-1.14l1.71,-0.31l3.01,0.56l1.14,0.59l0.7,1.09l0.47,0.16l1.26,-0.35l0.48,0.46l0.02,0.45l-0.66,1.81l-1.5,0.63l-0.34,0.8l1.16,1.48l1.0,0.19l-0.24,0.7l-1.16,0.7l0.08,0.68l2.27,1.05l0.19,0.64l-0.48,1.12l-0.53,0.32l-1.6,0.06l-1.19,0.49l-0.2,0.53l0.29,1.51l-0.28,1.02l-1.26,1.62l-1.18,0.86l-1.1,0.53l-2.03,-0.19l-1.14,-0.44l-0.54,0.41l0.11,1.26l-1.04,0.78l-0.14,0.44l0.6,1.18l-0.67,1.57l-0.9,0.98l-3.26,1.43l-1.83,1.28l-1.16,0.47l-3.2,-0.01l-3.29,0.86l-4.61,1.78l-3.14,1.45l-5.52,4.21l-2.25,1.06l-3.96,0.53l-11.96,2.76l-1.63,1.96l-0.06,0.36l0.49,0.61l-0.73,0.94l-1.63,0.77l-2.27,-0.71l-0.55,0.49l0.36,0.92l-5.26,1.22l-8.0,-0.75l-7.17,-2.03l-5.63,-0.41l-3.77,-2.65l0.22,-0.77l1.52,-0.44l-0.0,-0.49l-0.69,-0.87l-0.47,-0.12l-2.39,1.47l-0.55,-0.03l-0.77,-0.45l-0.38,-0.76l-1.96,-0.22l-3.31,-1.72l0.52,-0.39l0.0,-0.65l-0.33,-0.19l-2.03,0.09l-2.76,1.66l-16.08,0.58l-1.0,-3.65l0.36,-0.95l1.51,1.48l0.97,0.46l6.2,-1.75l2.75,-2.48l1.93,-3.05l1.4,-0.87l1.88,-0.27l0.34,-0.36l-0.28,-0.41l-1.27,-0.41l-1.34,-0.02l-4.72,1.83l1.48,-0.95l0.18,-0.44l-1.34,-0.54l-0.03,-0.6l0.62,-1.17l3.21,-1.73l1.31,-0.36l0.35,-0.36l-0.06,-0.61l-1.56,-0.48l-3.34,1.84l-2.33,0.61l-1.77,-0.77l-0.77,-0.91l1.13,-1.61l-0.17,-0.76l-3.1,-1.61l-3.64,0.07l-8.59,-0.77l-6.31,1.85l-1.28,-0.73l-1.11,-1.62l0.13,-0.38l1.65,-0.52l2.39,0.23l5.12,-0.99l1.5,-0.94l1.31,0.76l2.88,-0.83l1.42,-0.89l2.48,0.42l1.48,-0.31l8.37,-0.29l1.38,-1.45l0.5,-1.5l-0.27,-0.67l-0.47,-0.14l-3.45,1.35l-4.68,-0.73l-1.02,-0.57l2.26,-1.62l5.53,-2.4l0.77,-0.48l0.26,-0.86l-0.23,-0.42l-2.19,-1.02l-4.15,0.23l-1.15,-1.19l-3.44,-0.72l-2.3,0.42l-1.42,-0.69l-2.96,1.01l-6.52,1.47l-3.87,1.32l-4.32,-1.72l-3.0,-0.29l1.48,-1.5l1.08,-0.26l1.12,0.14l2.43,1.18l1.66,0.37l0.45,-0.21l-0.1,-0.48l-1.92,-1.6l-0.12,-1.55l-1.18,-1.48l2.13,0.26l4.18,1.93l1.95,-0.34l2.6,-1.25l0.09,-0.71l-0.41,-0.27l-3.61,-0.1l-1.73,-0.37l-1.39,-1.18l0.81,-0.36l2.86,0.1l0.39,-0.25l-0.11,-0.45l-3.27,-2.81l0.21,-0.7l3.27,0.93l1.13,-0.2l-0.78,-1.08l-1.26,-0.79Z", "name": "Iceland"}, "AL": {"path": "M613.48,601.01l0.69,0.32l0.52,-0.18l0.25,-0.48l-0.24,-1.33l-1.36,-2.98l1.67,-4.38l-0.07,-2.75l0.32,-2.07l-0.52,-3.06l0.7,-2.05l1.07,-1.3l0.08,-2.58l-1.64,-1.44l-1.53,-0.24l0.23,-2.82l0.99,0.15l0.61,-0.73l-1.54,-3.11l4.15,-5.4l0.14,1.73l0.81,0.95l1.33,-0.11l2.5,-1.0l2.2,3.21l2.39,1.18l1.42,1.53l0.69,2.49l0.08,1.45l-1.02,3.38l0.14,2.01l-0.9,1.2l0.57,2.04l-0.01,2.05l1.13,2.44l1.16,1.07l0.79,2.19l0.74,0.47l2.32,-0.02l0.26,0.54l-0.07,1.35l0.98,2.21l-0.97,1.82l-2.03,0.9l-1.22,2.51l-0.81,2.73l-0.5,0.4l-2.66,0.53l-1.35,1.13l-0.18,0.98l0.92,1.95l-0.95,0.1l-0.49,1.55l-0.64,0.55l-2.31,-0.88l-0.5,-2.34l-1.56,-2.8l-5.09,-2.79l-1.09,-1.11l-0.61,-1.18Z", "name": "Albania"}, "IT": {"path": "M460.72,503.99l1.78,-1.15l1.8,-1.71l0.38,-0.01l0.0,2.36l0.39,0.92l2.52,2.32l2.27,0.58l-0.51,0.85l0.07,0.5l1.37,1.23l0.36,1.05l1.03,0.61l0.95,-0.27l0.54,-0.68l-0.54,-2.47l3.32,-4.52l0.17,-3.17l0.27,-0.16l1.28,0.23l0.67,1.99l0.92,0.97l1.6,0.19l2.15,-0.87l1.7,-0.27l1.26,1.94l0.98,0.35l0.84,-0.3l0.31,-0.66l-0.49,-1.87l-0.93,-1.88l0.56,-1.7l1.03,-0.25l1.08,0.92l1.23,0.3l1.4,-0.33l0.12,-1.32l-0.53,-0.86l0.59,-2.76l2.77,0.16l0.85,0.81l1.18,0.42l2.32,-0.03l0.73,-0.56l1.38,-2.24l1.33,-0.6l3.78,-0.37l3.34,0.19l5.15,-1.58l-0.68,0.99l0.28,1.2l3.4,4.2l1.31,0.54l9.36,1.7l4.38,0.3l2.39,0.51l-0.11,0.38l-3.72,2.46l-0.42,1.14l0.72,1.28l1.07,-0.01l1.62,0.59l-1.85,1.75l-0.19,0.73l0.54,0.98l1.22,0.01l-0.54,1.93l0.36,0.78l-1.48,0.98l-3.63,-0.93l-2.36,2.24l-1.64,0.43l-2.0,1.15l-3.31,1.29l0.8,-1.08l-1.15,-0.24l-1.93,0.95l-1.23,1.0l-0.67,3.49l0.91,0.9l1.39,2.73l1.66,1.19l-0.66,1.62l-0.77,0.57l-0.89,-0.5l-0.92,0.33l-0.41,1.84l0.76,5.04l1.33,3.62l1.28,1.54l2.77,2.32l2.99,1.26l5.23,3.87l2.91,1.25l0.66,0.58l1.71,2.92l1.49,3.41l1.62,5.38l1.23,2.79l2.39,3.05l4.89,4.31l4.41,3.13l4.29,2.0l3.27,0.34l7.54,-0.42l2.4,0.6l0.24,0.98l-0.38,0.67l-3.18,2.21l-0.18,2.39l1.61,1.3l7.31,3.29l7.47,2.74l2.27,1.37l2.76,2.21l6.43,2.94l1.11,1.44l3.92,3.08l1.71,2.29l0.3,1.65l-1.72,4.11l-1.31,-0.39l-1.79,-1.26l-3.15,-5.62l-5.22,-0.55l-1.02,-0.38l-1.68,-0.84l-0.59,-1.34l-0.79,-0.46l-2.02,-0.17l-1.65,0.95l-3.66,5.33l-1.89,4.44l-0.14,1.92l1.31,2.14l3.02,0.95l2.29,1.49l1.42,1.46l0.11,3.72l0.65,2.1l-0.75,0.9l-1.95,-0.28l-2.66,0.79l-2.01,1.48l-0.94,1.69l0.2,3.43l-0.33,1.13l-3.55,2.53l-1.88,2.57l-1.09,2.11l-4.07,0.04l-0.87,-1.22l-0.03,-1.99l0.65,-1.15l1.75,-0.82l1.12,-2.85l-0.3,-2.11l0.54,-0.76l0.52,-0.55l2.91,-0.7l0.32,-0.37l0.18,-2.88l-1.43,-1.55l-1.14,-5.21l-2.28,-4.31l-1.22,-3.85l-0.99,-1.98l-1.82,-1.22l-3.79,-0.25l-4.54,-2.64l-0.17,-0.69l0.76,-1.36l-1.08,-2.88l-1.08,-1.38l-1.28,-0.67l-4.64,0.8l0.89,-1.13l-0.46,-1.01l-1.89,-0.99l-2.76,-0.23l-0.43,0.22l-0.03,-0.73l-2.55,-4.19l-1.92,-1.88l-1.09,-0.32l-1.46,0.34l-4.14,-0.9l-2.16,0.68l-0.35,-0.2l-0.31,-0.6l-2.37,-1.75l-2.99,-1.02l-5.69,-5.49l-1.76,-2.07l-3.66,-2.33l-2.37,-3.39l-1.97,-1.27l-2.74,-0.99l-2.14,0.48l0.88,-0.72l-0.33,-1.49l-3.12,-3.34l-1.85,-1.11l-1.41,-2.23l-2.37,-0.46l0.05,-3.7l-0.99,-2.76l-1.72,-2.37l-1.03,-5.63l-0.93,-1.74l-1.9,-1.2l-4.34,-1.38l-5.95,-3.6l-1.39,-0.12l-3.65,-1.41l-2.23,-0.24l-3.23,1.38l-3.52,3.49l-2.85,3.6l-0.94,0.63l-3.61,1.2l-2.78,0.5l-0.11,-1.05l2.2,-2.66l0.4,-0.9l-0.55,-1.68l-0.96,-0.28l-3.01,0.66l-0.58,-0.14l-4.66,-2.31l-0.81,-0.82l-0.26,-0.71l0.21,-0.75l-0.61,-1.26l1.42,-2.43l1.01,-0.77l-0.46,-2.18l-0.92,-0.77l-1.88,-0.41l-0.68,-0.51l-0.19,-0.83l-1.24,-2.01l0.54,-0.27l2.17,0.07l1.81,-1.29l1.33,-0.43l1.23,-2.96l-0.1,-0.39l-1.86,-1.65l-1.79,-2.85l-1.02,-0.7l-0.03,-1.21l2.63,-1.65l1.53,0.64l2.74,-0.55l2.8,-1.08l3.49,0.9l2.81,-1.61l1.89,-2.55l0.07,-0.89l-0.5,-0.93ZM518.47,542.68l-0.02,0.45l0.8,0.86l1.1,-0.35l0.42,-1.12l-0.15,-0.61l-0.45,-0.3l-1.11,0.28l-0.6,0.79ZM536.34,512.54l1.58,1.41l0.32,0.86l-0.4,0.08l0.05,-0.55l-1.56,-1.8ZM561.64,634.95l-1.42,2.54l-3.32,4.46l-1.83,5.11l0.22,2.17l1.35,1.24l-0.42,0.3l-0.08,0.57l1.5,1.71l0.07,0.48l-0.01,0.44l-2.03,1.93l-0.54,1.75l0.13,1.17l-2.54,-0.51l-1.61,0.18l-3.5,-1.28l-1.85,-2.71l-3.09,-2.07l-3.36,-0.01l-7.24,-3.82l-2.59,-2.04l-1.81,-0.46l-1.69,-1.03l-2.3,0.05l-1.38,-0.37l-1.44,-1.1l-1.12,-2.08l1.41,-3.4l1.55,-0.85l0.7,-0.8l1.23,1.47l1.07,0.59l2.12,-0.82l0.29,-0.86l1.15,-0.77l1.62,-0.02l0.59,0.12l0.56,0.87l1.47,0.38l2.51,1.57l1.64,0.37l3.58,-0.93l3.17,0.37l3.02,-0.45l1.89,-0.64l2.03,-1.27l4.49,0.21l0.95,-0.35l0.59,-0.62l1.54,-0.09l2.07,-1.12l1.04,0.08l-0.37,0.35ZM539.0,595.31l0.02,-0.06l0.31,0.09l-0.19,0.04l-0.15,-0.08ZM512.96,657.33l0.48,0.16l0.18,0.38l-0.64,-0.31l-0.02,-0.24ZM491.6,561.34l-0.16,0.88l-0.71,-0.33l-2.41,0.32l-0.12,-0.3l2.9,-0.24l0.5,-0.33ZM462.39,592.89l0.87,0.72l2.19,0.38l3.34,-1.01l1.8,-0.98l2.33,-2.52l1.52,-0.57l1.25,-1.67l0.83,0.82l0.84,0.09l1.28,0.67l1.77,2.0l-0.54,1.02l0.07,0.46l1.67,1.74l1.62,4.91l-2.19,3.79l0.86,3.95l-1.21,10.52l-0.69,2.78l-0.7,0.28l-2.83,-1.16l-1.72,0.25l-1.03,-0.57l-0.63,0.27l-0.45,3.03l-0.67,1.12l-0.99,0.69l-0.92,0.04l-1.96,-0.27l-0.55,-0.46l-2.33,-3.7l-0.25,-4.19l0.64,-1.31l0.09,-2.38l0.53,0.16l0.66,-0.55l0.1,-1.66l-0.78,-1.22l-1.15,-0.39l0.02,-1.42l0.64,-0.73l0.21,-0.85l0.02,-2.69l-0.87,-1.15l-0.82,-2.45l-2.13,-2.32l-0.11,-1.75l0.39,-1.75ZM464.42,621.63l0.71,0.35l-0.34,0.68l-0.36,-0.48l-0.02,-0.54ZM462.96,589.81l0.1,-0.19l0.15,-0.08l-0.06,0.11l-0.19,0.16Z", "name": "Italy"}, "GG": {"path": "M315.47,448.51l0.52,-0.25l-0.15,0.36l-0.37,-0.12Z", "name": "Guernsey"}, "CZ": {"path": "M515.02,433.92l1.19,1.02l0.6,1.08l0.65,0.07l2.33,-2.94l1.17,-0.7l2.89,-0.65l2.52,0.38l1.09,-1.49l2.02,-0.32l0.92,-1.17l1.6,-0.76l0.75,0.3l0.81,-0.32l1.06,-1.52l1.96,-0.22l2.67,-0.8l6.38,-2.46l0.37,-0.51l-0.15,-0.48l-1.0,-0.66l-0.25,-0.73l2.98,0.56l0.95,1.48l0.08,1.06l1.76,0.8l0.83,-0.18l0.54,-0.62l2.25,-0.51l0.25,-0.32l0.04,-1.87l2.95,0.83l0.28,1.28l1.19,1.4l5.17,1.32l2.81,1.22l0.78,0.97l3.93,-0.66l0.9,0.52l0.57,0.52l-0.42,0.79l-1.8,1.04l-0.5,1.04l0.46,0.7l1.33,0.49l2.02,2.0l1.45,2.2l0.85,0.53l0.79,0.04l4.42,-2.78l-0.02,-0.68l-1.44,-2.28l3.1,0.77l3.73,2.23l1.99,-0.18l1.8,-0.62l-0.09,1.16l-1.49,0.59l-0.24,0.49l0.61,0.9l0.8,0.34l2.0,2.05l0.71,0.26l1.73,-0.47l0.64,-0.55l0.67,0.66l2.73,1.37l0.83,-0.21l2.07,0.44l0.44,0.29l0.4,2.02l2.9,2.63l0.27,1.24l-2.96,0.35l-2.55,1.84l-0.7,0.94l-2.65,1.33l-0.88,1.57l-0.32,1.96l-2.18,1.02l-2.09,1.93l-1.71,0.77l-1.83,0.23l-3.9,-0.57l-0.98,0.38l-1.15,1.21l-1.28,2.46l-0.71,-1.3l-2.27,-0.52l-2.33,-1.09l-1.21,-0.03l-1.45,1.01l-3.92,-0.26l-3.07,-1.87l-1.85,0.01l-5.24,-1.97l-1.92,0.46l-1.3,-0.85l-1.15,-0.1l-0.71,0.65l-0.56,3.35l-1.36,0.07l-1.6,1.82l-0.23,1.07l-2.5,-0.4l-0.95,0.24l-0.75,0.61l-2.23,-0.04l-1.69,-0.37l-0.86,-1.54l-2.34,-1.31l-3.63,-3.34l-1.58,-0.02l-1.91,-2.37l-2.02,-1.08l-3.04,-3.02l-1.53,-0.08l-1.63,-1.37l-2.41,-3.91l-1.35,-1.5l1.34,-1.87l0.16,-1.15l-0.82,-1.15l-2.46,-1.54l-0.83,-0.87l-1.55,-3.17Z", "name": "Czech Rep."}, "IM": {"path": "M286.48,364.63l0.75,-2.12l1.13,-0.81l1.38,-1.97l1.16,-0.38l0.45,1.97l-0.91,1.44l-2.48,2.14l-1.47,-0.27Z", "name": "Isle of Man"}, "GB": {"path": "M268.15,314.94l0.76,-0.51l2.22,-0.36l1.99,-1.42l-0.04,-0.68l-1.33,-0.72l1.39,-0.78l1.97,-2.75l0.47,-2.7l-1.51,-2.4l-1.71,-0.79l-0.08,-1.24l3.04,-1.75l-0.26,-0.39l-1.22,-0.45l-0.73,-1.5l0.65,-2.06l1.01,-1.76l3.3,0.06l0.77,-0.52l1.74,0.44l0.45,-0.58l-3.37,-3.5l0.78,-1.43l0.07,-1.57l4.32,-0.43l0.23,-0.54l-1.07,-2.23l0.29,-2.53l0.57,-0.77l0.99,-0.34l1.4,0.28l1.48,1.26l2.81,-1.1l1.07,1.04l3.29,-0.87l9.93,-1.18l2.64,-0.65l2.45,0.26l-0.8,1.82l-0.05,2.13l-1.24,1.58l-10.66,7.29l-0.65,2.2l0.34,0.47l1.91,0.38l-2.81,2.5l-0.76,1.94l0.39,0.55l3.69,-0.45l6.29,-2.1l1.36,-0.03l3.54,0.74l2.46,-0.39l8.29,0.22l2.29,-0.41l1.34,0.44l1.17,1.15l1.11,2.32l-3.2,4.12l-0.97,3.1l-2.28,4.57l-2.22,2.52l-2.23,3.23l-2.32,1.42l-3.73,0.67l-3.51,1.63l-0.28,0.45l0.41,0.33l1.52,-0.05l1.56,-0.45l2.59,-0.15l2.77,1.34l-0.19,0.79l-1.06,0.82l-2.98,0.24l-2.66,2.16l-2.31,0.93l-4.35,-0.66l-1.23,-0.59l-0.51,0.14l0.07,0.52l1.15,1.0l1.42,0.59l7.67,1.25l3.04,-1.42l3.05,-0.02l5.98,2.32l4.24,4.35l2.33,1.89l3.11,10.2l1.78,4.76l0.84,1.39l1.25,1.09l6.45,2.77l4.06,4.18l3.44,2.72l-0.61,0.48l-0.71,1.43l0.53,1.56l3.18,5.0l-1.41,-0.06l-2.86,-1.74l-2.54,0.37l-2.7,-0.14l-0.39,0.36l0.31,0.43l2.37,0.55l2.55,0.05l5.58,4.04l1.86,2.36l1.07,3.01l-0.66,1.22l-3.41,3.22l0.1,0.61l3.4,1.83l1.62,-0.4l2.3,-2.51l1.81,-0.17l4.73,0.34l4.27,1.16l3.61,2.48l0.73,1.26l0.39,3.6l-2.05,6.22l-2.29,2.13l-1.08,0.57l-1.18,-0.21l-0.37,0.34l0.56,2.13l-0.93,0.61l-1.03,0.28l-2.15,-0.35l-2.75,1.41l0.05,0.73l1.83,0.67l0.25,0.48l-0.38,1.04l-1.05,0.51l-3.94,0.66l-1.21,0.68l-0.17,0.49l0.47,0.24l1.3,-0.31l0.71,0.22l0.54,0.99l0.71,0.48l2.88,0.54l6.8,-0.18l-0.22,2.81l-0.29,0.32l-4.28,1.91l-1.27,2.12l-2.49,-0.05l-1.14,0.82l-6.33,2.15l-5.55,-0.91l-3.41,0.08l-4.48,0.79l-4.59,-1.4l-2.08,-0.24l-1.73,-0.69l-0.47,0.14l0.01,0.49l0.8,0.98l-1.99,1.06l-4.61,0.55l-2.19,-0.18l-0.41,0.53l0.75,1.52l-0.44,0.12l-4.2,-0.6l-0.74,0.12l-0.59,0.52l-1.26,-0.25l-3.19,-1.61l-1.68,-0.3l-1.51,0.11l-5.71,1.65l-1.16,1.64l-1.3,3.91l-1.15,1.29l-1.24,0.15l-5.49,-2.9l-1.51,0.61l-2.85,0.32l-3.11,0.94l-3.9,2.36l-1.47,2.12l-1.08,0.22l-1.33,-1.05l-1.51,-0.38l-2.58,0.83l-0.13,-0.77l0.97,-0.96l3.15,-0.92l2.75,-2.3l1.87,-2.16l1.57,-0.78l0.41,-0.8l3.82,-3.57l0.78,-3.42l3.09,-1.03l1.41,-2.79l4.41,-0.65l3.12,0.04l3.18,0.57l3.47,-0.2l1.38,-0.88l2.17,-2.81l3.94,-3.66l2.13,-2.39l0.01,-0.52l-0.51,-0.1l-1.44,0.82l-2.73,2.04l-3.23,0.78l-4.11,2.62l-3.45,-0.4l-2.63,-2.2l-1.94,-1.02l-3.92,0.43l1.54,-1.33l-0.33,-0.33l-2.46,-0.4l-1.59,-1.07l-3.01,0.07l-4.0,1.97l-3.22,-1.79l-0.02,-1.23l-0.45,-0.97l-0.54,-0.33l0.67,-0.79l1.19,-0.77l2.84,-0.84l6.68,-2.81l2.33,-1.5l1.06,-1.03l1.34,-2.7l0.92,-1.18l-0.2,-0.63l-0.75,-0.24l-0.29,-0.65l0.5,-1.83l-1.03,-2.09l0.21,-1.57l-0.4,-0.48l-3.51,0.34l-3.15,1.52l-0.81,0.1l0.49,-0.83l3.19,-2.29l1.77,-2.32l2.07,-1.33l4.53,-1.59l1.66,0.17l4.2,-0.9l3.0,1.55l0.45,-0.06l0.11,-0.44l-0.79,-2.12l0.75,-0.33l1.97,2.14l0.94,0.25l1.56,-0.33l0.31,-0.32l-0.78,-0.79l-1.62,-0.37l-0.67,-0.62l-1.2,-2.13l0.06,-1.14l1.75,-2.6l-0.2,-0.62l-1.2,-0.59l0.05,-1.98l1.75,-1.15l0.72,-3.51l-0.69,-1.04l-1.82,0.15l-2.04,0.77l-1.98,-1.77l-3.27,-4.34l-0.27,-1.6l1.65,-3.73l2.54,-2.39l3.05,-0.85l0.29,-0.39l-0.29,-0.39l-5.5,-0.22l-1.66,0.32l-1.58,1.06l-1.72,0.45l-2.24,1.6l-2.19,0.01l-1.01,-1.05l-0.84,-0.18l-3.47,1.62l-3.9,-1.59l-0.98,0.57l-0.72,2.0l-1.09,-0.89l-1.34,-1.73l-0.45,-2.0l0.37,-0.24l0.61,0.34l0.56,-0.2l1.22,-3.01l3.27,-5.08l0.68,-1.8l-0.1,-1.0l-0.6,-1.02l-2.21,-1.89l0.26,-3.02l0.63,-1.0l2.88,0.03l0.39,-0.31l-0.22,-0.45l-3.28,-1.99l0.55,-1.71l-0.12,-0.45l-0.46,-0.04l-1.82,2.56l-2.04,0.67l-0.55,0.96l-1.04,0.34l0.28,-2.25l0.57,-0.88l2.4,-2.19l0.05,-0.53l-0.52,-0.11l-1.23,0.72l-2.72,2.09l-1.84,1.98l-0.11,1.04l0.59,2.29l-0.16,0.98l-2.29,7.16l-0.67,0.9l-1.14,-0.06l-0.3,-0.73l1.15,-4.26l2.4,-3.66l-0.54,-0.36l-1.04,0.13l0.17,-4.38l0.74,-1.58l0.27,-2.18l1.9,-4.94l0.89,-0.94l0.21,-1.12l1.66,-2.66l-0.05,-0.45l-0.94,0.08l-5.74,4.13l-2.6,-0.52l-0.82,-0.71l-0.4,-1.51l-0.37,-0.3l-1.52,-0.14ZM339.59,233.48l-0.57,2.19l-0.53,-0.03l-0.06,-1.74l0.74,-0.02l0.42,-0.4ZM336.19,239.14l-0.93,-1.46l0.79,-1.92l0.63,0.04l0.08,0.26l-0.75,0.66l0.18,2.42ZM329.81,239.86l0.8,-0.37l1.06,-1.32l0.87,-0.15l0.23,2.57l0.58,0.28l0.4,-0.21l1.17,1.27l0.92,-0.16l-1.6,5.89l-0.26,2.06l-0.62,0.77l-0.43,1.4l-0.23,-0.2l1.02,-3.91l-0.25,-1.08l-0.77,-0.9l-1.96,0.22l-0.43,-1.0l-1.48,-0.05l-0.32,-0.39l2.04,-0.14l1.63,-0.82l0.19,-0.49l-1.02,-2.77l-1.52,-0.49ZM330.39,426.85l1.55,-0.47l0.95,-0.66l2.54,0.99l-0.75,0.49l-0.48,0.83l-0.59,0.15l-0.6,0.0l-2.6,-1.33ZM315.95,265.12l-0.68,0.01l0.29,-0.44l0.71,-0.23l0.87,0.07l-1.2,0.59ZM309.8,263.74l0.37,-0.11l1.34,1.02l-1.51,-0.67l-0.2,-0.25ZM312.26,265.65l1.03,0.29l-0.03,0.18l-0.75,0.32l-0.25,-0.79ZM308.85,269.28l-0.26,0.62l0.38,0.54l3.29,0.45l0.39,0.27l-0.24,0.56l-0.56,0.19l-1.93,-0.96l-2.24,0.39l-0.45,-0.22l-0.26,-1.19l-0.58,-0.1l-0.8,0.43l0.01,-1.32l0.41,-1.08l0.57,-0.18l1.09,0.13l1.3,0.68l0.27,0.34l-0.41,0.45ZM310.59,274.73l-0.03,-0.02l-0.47,-0.75l0.7,-0.11l-0.21,0.88ZM306.77,274.1l-0.45,-0.01l-1.04,-1.0l-0.33,-0.85l1.05,0.15l0.78,1.72ZM293.4,379.3l0.66,0.42l0.9,0.03l-3.55,2.22l-0.41,-0.54l-0.84,-0.13l-0.91,-1.28l-0.16,-1.93l1.09,-0.46l1.73,0.03l1.49,1.64ZM281.03,338.84l-1.32,0.01l-1.07,-0.49l-0.75,-2.35l0.78,-1.35l0.65,-0.11l0.96,0.74l0.71,1.66l0.05,1.88ZM243.78,353.56l2.07,-0.03l2.55,-1.09l1.48,-2.17l0.71,-2.43l2.02,-1.34l0.58,0.54l1.33,0.1l1.08,-0.74l1.04,-1.76l3.18,-0.18l3.04,-0.9l1.25,-0.01l3.21,0.46l1.09,1.18l0.71,2.2l1.58,2.14l2.0,1.81l0.06,0.77l-2.05,1.18l-0.22,1.17l0.55,0.37l1.78,-0.56l1.9,0.16l0.59,0.65l0.71,2.04l-0.07,0.41l-0.62,-0.99l-1.5,-0.75l-0.51,0.48l0.32,1.28l-0.13,1.73l0.21,0.38l0.95,0.23l-0.41,1.14l-3.01,0.79l-1.46,2.65l-0.91,0.58l-3.72,-0.8l-1.47,0.62l-2.99,0.05l0.16,-1.49l-0.39,-0.71l-1.84,-0.6l-0.68,-0.91l-0.33,-1.22l-2.04,-1.58l-0.85,0.07l-2.1,2.02l0.45,1.34l-2.25,1.86l-3.2,-0.35l-1.07,-0.82l-2.16,-0.48l-0.53,-1.29l-3.24,-2.77l1.07,-0.79l3.35,-1.09l0.67,-0.52l0.24,-0.59l-0.22,-0.47l-1.93,-1.02ZM261.43,298.81l2.77,-0.68l0.52,-1.27l0.92,0.27l0.98,1.15l0.26,1.42l-0.24,1.96l0.61,2.1l1.02,0.63l2.54,0.4l2.31,-0.1l0.21,0.31l-3.17,2.99l-0.73,0.23l-0.24,-2.65l-0.48,-0.35l-2.97,0.32l-0.61,-0.28l-1.79,-2.5l-3.04,-0.66l-0.76,-0.83l-0.17,-0.38l0.46,-0.56l0.82,0.18l0.99,-0.58l-0.19,-1.09ZM269.34,332.0l-0.57,-0.07l-0.12,-1.03l1.96,-1.32l-0.03,-0.72l-0.51,-0.21l0.28,-0.48l1.95,-1.22l-2.97,5.06ZM271.87,321.8l-5.06,1.0l-1.54,-0.08l1.84,-0.73l0.62,-2.57l-0.21,-0.45l-2.19,-1.11l0.09,-0.39l2.26,-0.75l1.96,2.01l2.42,0.81l-0.19,2.27ZM263.06,333.89l0.29,-1.39l0.53,-0.68l0.58,-0.27l0.79,0.24l1.95,-1.18l0.87,3.48l-0.29,0.85l-2.16,0.88l0.34,-0.95l-0.39,-0.99l0.18,-0.72l-0.36,-0.57l-0.93,0.13l-1.39,1.16ZM255.41,289.78l0.69,-0.49l-0.15,-0.72l-1.04,-0.51l-0.13,-0.82l0.1,-0.64l0.69,-0.72l1.74,0.87l2.02,-0.12l0.46,-0.5l-0.77,-1.87l6.87,-3.75l0.25,2.18l-1.59,3.18l-0.74,0.23l-0.54,0.78l-1.75,0.9l-0.21,0.45l0.38,0.31l1.48,0.02l-0.0,0.7l-1.99,1.51l-1.52,0.67l-1.42,1.52l-0.92,0.18l-1.21,1.34l-0.95,-0.76l2.62,-1.89l0.17,-0.55l-2.55,-1.49ZM265.16,309.88l-0.49,0.1l-0.68,-0.67l0.84,-0.36l0.47,0.45l-0.13,0.47ZM261.42,316.68l0.29,-0.28l0.09,-0.02l-0.03,0.04l-0.35,0.27ZM249.11,297.53l0.35,-0.38l1.04,0.14l2.36,-0.64l1.01,0.73l-0.88,1.33l-1.56,-0.01l-2.31,-1.17ZM251.9,306.91l-1.08,-0.23l-0.4,-1.03l0.09,-3.19l1.15,0.03l0.25,4.42ZM248.75,309.97l0.68,-0.43l0.37,0.2l-0.96,0.26l-0.09,-0.03Z", "name": "United Kingdom"}, "AX": {"path": "M628.45,248.96l0.16,-0.05l0.84,0.08l0.31,0.32l-0.63,0.06l-0.68,-0.41ZM621.7,243.28l1.25,-0.06l2.02,1.49l-0.63,0.99l-0.8,-0.15l-1.25,0.46l-0.31,1.74l-2.69,0.2l-0.49,-0.23l-0.9,-2.45l0.11,-0.4l0.54,-0.21l0.06,1.05l0.47,0.37l0.85,-0.15l0.32,-0.29l0.34,-1.72l-1.05,-1.12l0.26,-0.39l0.48,-0.17l0.58,0.75l0.84,0.28ZM616.9,246.18l-0.55,0.17l-0.39,0.42l0.16,-1.31l0.49,-0.02l0.28,0.74Z", "name": "Aland"}, "IE": {"path": "M245.03,355.16l-3.75,1.4l-1.46,1.19l0.42,1.3l3.09,2.41l0.65,1.39l2.3,0.51l1.07,0.82l3.69,0.38l2.79,-2.26l0.09,-0.46l-0.49,-0.95l1.71,-1.63l0.31,0.02l1.52,1.24l0.25,1.06l0.91,1.22l1.92,0.73l-0.18,1.51l0.56,0.74l3.32,-0.04l1.44,-0.63l0.91,0.09l0.42,0.48l-0.42,0.31l-1.28,-0.03l-0.65,0.73l-0.03,0.85l0.37,1.24l0.72,0.86l0.99,3.59l0.72,1.21l0.15,3.22l-0.29,0.63l1.44,5.06l0.23,2.86l-1.89,3.4l-0.67,3.58l-1.65,2.45l-1.46,0.94l-0.11,0.65l1.47,1.41l-0.98,0.51l-1.53,0.23l-1.77,-0.43l-1.27,0.04l-1.49,0.84l-1.01,-1.55l-0.81,1.63l-0.82,0.37l-1.8,-0.09l-4.31,0.86l-1.41,1.96l-3.3,1.03l-1.16,1.3l-1.31,0.67l-0.96,0.18l-1.89,-1.34l-1.79,-0.0l-0.38,0.32l0.85,0.97l-0.0,1.57l-1.61,0.5l-1.42,0.95l-1.89,0.26l-1.2,0.96l-6.42,1.53l-2.25,-0.55l-4.26,0.91l1.21,-1.55l2.33,-1.17l0.24,-0.3l-0.24,-0.64l-0.89,-0.15l-4.33,0.76l-2.09,0.72l3.76,-2.46l0.67,-0.74l1.97,-0.87l0.21,-0.5l-0.49,-0.25l-6.5,1.85l-1.48,-0.2l-0.69,-0.54l-1.03,0.19l-0.29,-0.71l1.78,-1.71l1.09,-0.77l2.7,-1.09l0.66,-0.93l-0.19,-0.58l-0.79,-0.28l-5.41,0.07l0.29,-0.66l1.82,-1.08l0.94,-0.17l2.67,0.8l2.24,-0.23l0.34,-0.28l-0.13,-0.43l-0.81,-0.65l-0.15,-1.37l-0.45,-0.48l1.55,-0.82l1.69,-1.42l7.69,-1.32l3.73,-1.08l0.29,-0.38l-0.28,-0.39l-1.82,-0.57l-0.85,-0.73l-0.56,0.03l-1.42,1.55l-0.93,0.54l-2.82,0.31l-2.45,-0.63l-2.94,1.35l4.74,-3.85l0.97,-1.34l0.03,-0.41l-0.67,-0.88l1.87,-2.34l0.63,-0.41l3.34,-0.71l1.03,-0.9l-0.13,-0.67l-2.92,-0.82l-5.04,0.23l-0.67,-0.44l-0.24,-0.84l-0.5,-0.44l-2.93,0.12l0.68,-0.6l-0.2,-0.69l-3.7,-0.25l0.42,-0.63l-0.05,-0.58l-0.65,-0.76l4.97,-0.87l0.35,-0.37l-0.29,-0.42l-2.29,-0.83l0.06,-0.78l1.91,-0.9l2.21,-0.43l0.31,-0.49l-0.01,-1.2l-0.35,-0.48l-2.29,-0.21l-1.8,0.38l0.68,-2.04l-0.0,-1.8l-0.53,-0.33l-0.58,0.2l-0.57,-1.73l-0.49,-0.19l-1.01,0.38l0.02,-0.42l0.33,-0.58l0.59,-0.24l2.28,0.12l1.54,-0.59l2.01,-0.15l3.2,0.18l2.21,1.59l1.01,-0.26l1.2,-1.12l5.49,1.04l0.81,-0.19l0.26,-0.48l-0.31,-1.17l-0.59,-0.71l1.72,-1.42l3.26,-1.22l1.45,-2.62l-0.38,-0.63l-4.29,0.58l-3.57,-1.16l1.07,-0.91l1.46,-0.4l0.38,-0.61l1.96,-1.47l-0.31,-1.75l0.19,-0.79l0.94,-0.8l0.56,-1.44l3.44,-0.89l2.64,-0.09l0.63,0.24l0.54,-0.43l-0.11,-0.78l0.78,-0.09l1.02,1.41l0.13,0.66l-0.89,1.03l-0.02,0.6l0.31,0.29l-0.67,0.73l-0.03,0.5l0.48,0.14l2.52,-1.47l0.1,-1.18l-0.63,-1.97l0.14,-0.76l0.61,-0.48l2.02,-0.31l0.26,-0.64l-0.46,-0.62l4.01,2.13l-5.21,3.62l-1.07,2.92l-1.25,1.91l-2.31,0.96l-1.79,-0.12l-0.73,0.44l-0.03,0.88l1.98,1.2ZM212.65,366.62l-0.13,-0.02l0.03,-0.02l0.09,0.04ZM213.87,366.77l1.05,0.02l0.27,0.15l0.07,0.94l-0.8,-0.9l-0.59,-0.21Z", "name": "Ireland"}, "ES": {"path": "M408.55,609.24l-3.95,-1.75l-1.35,-0.22l-0.04,-0.91l2.43,-0.17l2.05,0.62l1.1,1.67l-0.24,0.75ZM392.9,610.25l0.24,0.47l1.3,0.53l1.55,-0.44l0.59,0.12l0.47,0.17l0.11,0.64l-2.84,4.76l-2.01,1.18l-3.51,-1.26l-0.53,-1.7l-0.91,-0.82l-1.18,-0.19l-1.55,1.01l-0.31,-0.47l-1.13,-0.56l0.01,-0.33l5.42,-3.73l1.57,-0.82l3.07,-0.89l-0.06,0.57l0.37,0.41l-0.66,1.32ZM246.2,546.17l1.24,0.54l1.33,-0.16l1.25,0.65l2.0,1.73l2.73,0.67l2.32,-0.51l11.05,-0.15l3.17,-0.81l2.44,1.01l4.71,0.48l2.86,0.85l7.97,1.43l2.93,0.01l5.69,-1.37l1.66,0.32l2.22,-0.66l0.92,0.12l1.48,0.98l5.05,1.32l1.62,-1.15l0.81,-0.2l3.51,0.67l3.75,1.41l1.98,0.1l2.79,-0.38l2.24,-0.92l0.61,1.08l0.69,0.42l3.9,1.0l-0.15,1.08l-0.77,1.27l0.05,0.44l0.81,0.66l1.09,0.03l0.6,-0.74l0.3,0.36l4.79,1.82l2.22,0.15l2.37,2.24l1.74,0.09l2.29,-0.44l3.47,2.21l3.37,-0.44l0.82,0.42l5.11,0.05l0.53,-0.55l0.4,-1.99l8.53,2.45l0.9,1.31l0.03,2.1l0.64,0.81l1.32,-0.09l2.19,-0.97l2.73,1.14l1.03,1.21l0.88,0.03l2.11,-1.03l6.05,1.3l0.84,-1.12l2.56,-0.78l0.93,-0.16l3.02,0.58l1.09,1.68l-1.81,0.71l-0.22,1.53l1.19,1.45l0.12,2.0l-3.11,2.7l-9.38,4.87l-3.07,2.88l-6.93,1.47l-7.25,2.16l-4.47,3.93l0.14,0.7l1.0,0.28l0.97,0.99l-1.94,1.07l-1.87,0.41l-3.14,4.73l-5.95,7.1l-3.44,5.71l-0.07,1.96l1.73,5.74l1.03,1.55l1.35,1.24l2.56,1.08l0.41,0.67l-3.16,2.45l-4.44,2.36l-1.99,1.94l-0.48,1.83l-1.34,0.98l-0.48,2.47l-1.8,3.57l-0.11,0.91l1.16,1.29l-0.27,0.21l-2.08,0.35l-5.27,0.16l-4.46,2.79l-2.28,2.59l-1.9,4.42l-2.24,2.53l-0.75,0.35l-1.61,-1.09l-2.0,-0.18l-2.05,0.39l-1.14,0.96l-1.39,0.45l-1.52,-0.42l-3.39,-0.24l-1.6,0.06l-2.23,0.71l-1.96,-0.48l-3.38,-0.25l-7.46,0.61l-1.12,0.41l-3.08,2.87l-3.54,0.09l-3.2,1.22l-1.0,0.94l-1.35,2.14l-0.35,1.21l-0.96,-0.07l-0.5,1.3l-1.83,0.61l-2.33,-0.91l-2.03,-1.42l-1.11,-0.16l-2.36,-3.47l-0.56,-2.6l-1.61,-0.81l-0.29,-1.07l1.02,-1.66l1.6,-1.37l-0.41,-0.31l-1.41,0.08l-0.96,0.94l-1.11,-1.59l-5.06,-3.56l0.19,-1.23l-0.7,-0.22l-1.27,1.12l-2.71,-0.15l-2.77,0.4l-1.23,-5.85l0.75,-2.07l2.03,-2.77l1.34,-1.45l2.36,-0.79l0.91,-2.31l-0.45,-0.59l-1.76,0.15l-2.97,-4.04l0.81,-3.79l3.11,-2.96l0.63,-1.46l0.03,-1.41l-0.83,-0.95l-1.59,-0.4l-1.69,-3.02l-0.39,-1.96l-1.57,-1.32l-0.92,-1.49l5.21,-0.2l1.22,-0.59l0.9,-1.43l0.9,-2.28l0.23,-1.44l-0.4,-0.92l-1.43,-1.44l0.17,-0.44l2.07,-1.45l0.76,-1.07l-0.54,-1.45l0.45,-3.48l-0.24,-1.99l-0.33,-1.74l-0.89,-1.96l1.97,-1.35l1.13,-1.68l1.61,-1.38l2.17,-1.14l1.61,-1.34l1.17,-1.66l-0.43,-1.19l-1.01,-0.82l-1.25,-0.44l-1.89,-0.09l-0.11,-3.06l-0.36,-0.8l-0.88,-0.56l-1.06,0.12l-1.76,-0.47l-0.61,0.3l-2.06,-0.08l-1.78,-0.47l-0.82,0.53l-0.24,0.98l-2.34,0.86l-1.37,-0.03l-2.55,-0.85l-3.24,0.12l-2.87,1.11l-0.62,-1.02l1.23,-2.07l-1.13,-1.88l-1.06,-0.33l-4.57,1.41l-2.58,1.82l-0.72,0.16l-0.18,-2.32l2.53,-2.61l-0.12,-0.66l-1.4,-0.22l1.06,-1.45l-0.13,-0.55l-0.92,-0.75l-0.01,-2.74l-0.53,-0.28l-2.47,0.81l-0.02,-0.67l1.45,-2.27l-0.32,-0.5l-1.46,-0.24l-1.05,-0.76l-1.33,-1.66l0.71,-2.85l2.0,-1.02l1.92,-1.48l2.78,0.27l1.74,-0.34l2.56,-1.02l1.67,-1.08l-0.05,-0.95l-0.41,-0.69l0.23,-0.35l3.27,-1.81l2.1,-0.23l1.93,-0.88ZM370.1,623.83l-0.59,0.91l-1.82,-0.41l0.26,-0.64l0.7,-0.46l0.03,-0.65l0.46,-0.58l2.6,-0.57l0.4,0.32l0.08,0.41l-1.53,1.47l-0.58,0.19ZM370.18,627.26l0.43,0.46l-0.55,0.0l0.12,-0.46ZM164.44,776.55l-0.91,0.89l-0.44,-0.15l0.76,-2.18l3.27,-1.23l0.83,-1.23l-0.52,2.64l-2.99,1.26ZM155.44,788.95l2.37,-1.46l2.87,-6.04l0.34,-1.27l0.46,-0.35l0.91,0.01l0.27,0.45l-0.01,1.42l-0.47,2.52l-0.8,2.08l-3.47,1.18l-1.83,1.61l-0.64,-0.14ZM141.28,788.62l0.11,1.32l-4.04,0.0l0.8,-1.44l3.13,0.12ZM128.81,784.44l-1.25,3.48l-1.5,1.58l-1.26,0.29l-1.66,-1.86l-1.25,-2.48l4.27,-0.62l3.26,-2.31l2.13,-0.21l-2.74,2.13ZM117.34,789.64l-0.75,-0.17l-0.52,-0.88l0.58,-0.83l1.31,0.57l0.26,0.48l-0.88,0.82ZM108.62,782.59l-1.69,-3.37l0.7,-0.91l1.39,-0.03l0.72,1.33l-0.36,2.16l-0.76,0.82Z", "name": "Spain"}, "ME": {"path": "M601.12,565.85l1.19,-0.97l0.28,-0.68l-0.09,-0.72l-1.0,-1.62l-0.28,-2.93l0.34,-0.41l1.75,-0.24l0.34,-0.4l0.06,-1.92l0.56,-1.18l2.2,-1.75l0.74,0.07l0.92,0.94l0.98,-0.46l0.08,-1.33l-1.22,-2.13l0.14,-0.28l1.2,0.35l1.26,-0.26l0.56,1.35l2.58,1.71l2.74,2.82l2.42,1.12l2.14,0.45l5.15,2.95l0.06,0.52l-1.49,0.41l-0.45,0.68l-1.62,-0.06l-0.66,0.62l0.72,1.91l-0.2,0.93l-3.37,1.17l-0.38,-0.47l-0.16,-1.85l-0.88,-0.44l-0.81,0.44l-3.97,5.49l-0.67,0.29l-2.58,-0.2l-0.31,0.65l1.59,1.94l1.69,0.85l-0.04,2.92l-1.44,-0.88l-0.9,-1.83l-3.09,-3.08l-3.53,-2.11l0.23,-0.58l-0.34,-0.59l-1.53,0.19l-0.92,-1.43Z", "name": "Montenegro"}, "MD": {"path": "M712.53,469.1l2.31,-1.33l5.14,0.23l1.53,-1.02l1.05,0.19l1.72,-0.95l3.49,0.95l0.98,0.89l2.03,0.79l0.72,1.12l1.09,0.35l1.68,-0.01l0.39,0.23l-0.18,0.59l0.23,0.62l1.14,0.03l0.57,0.96l0.6,-0.0l0.78,-0.88l2.88,0.47l1.16,1.99l0.96,0.93l0.99,0.32l1.65,-0.6l0.82,1.24l0.21,1.74l-0.32,1.87l-0.84,2.17l0.18,1.06l0.34,0.59l2.44,1.48l0.73,0.86l1.98,0.87l-0.38,2.89l0.67,0.88l0.19,1.52l2.11,1.48l2.08,0.9l0.74,1.53l-0.07,3.43l2.44,1.72l-0.33,0.32l-2.9,0.39l-1.0,-1.27l-0.81,-0.32l-1.41,0.82l-2.03,-0.92l-1.01,0.26l-0.87,-0.4l-0.6,0.12l-0.62,1.15l-0.1,-1.82l-0.5,-0.51l-0.54,-0.05l-2.77,1.21l-0.63,0.95l0.04,1.05l0.21,1.4l0.77,1.72l-0.71,1.95l-1.2,1.09l-1.45,0.68l-0.35,1.64l-3.15,3.06l0.03,2.49l-2.33,0.22l-1.08,0.59l-1.37,-1.89l0.96,-0.86l-0.81,-5.49l0.26,-2.73l1.68,-5.26l-0.27,-1.14l0.22,-2.18l-2.29,-5.93l-3.05,-2.49l-1.16,-1.93l-2.06,-1.92l-2.23,-3.64l-1.53,-1.5l-2.47,-5.46l-2.41,-3.5l-1.17,-1.03l-1.54,-0.78l-1.64,-0.15Z", "name": "Moldova"}, "RO": {"path": "M631.66,512.33l-1.62,-2.15l-2.98,-1.78l-1.3,-1.89l3.0,-0.64l1.59,0.53l1.44,-0.77l0.67,-1.16l0.81,-0.18l2.69,0.29l1.42,-0.78l0.52,-0.55l0.45,-1.28l1.09,-0.68l-0.15,-1.22l0.78,-1.78l2.38,-1.66l0.06,-1.57l2.13,-2.96l0.14,-1.37l1.69,-1.68l1.11,-2.8l1.64,-1.49l0.18,-2.0l1.41,-1.04l2.32,-2.6l2.53,-0.74l1.81,0.04l3.7,-3.16l2.29,-0.96l1.16,-1.36l0.58,0.03l2.92,1.64l3.46,-0.04l4.49,0.97l0.86,-0.12l1.63,0.64l4.11,-0.7l1.11,0.24l4.5,3.72l2.52,-0.5l1.41,-1.38l3.87,-1.47l9.43,-1.41l1.84,-2.27l0.38,-1.46l5.19,-0.97l2.33,0.84l0.99,0.89l2.29,3.34l2.51,5.52l1.57,1.55l2.19,3.59l2.1,1.97l1.18,1.95l2.93,2.32l2.21,5.6l-0.22,2.16l0.27,1.0l-1.66,5.2l-0.28,2.9l0.8,5.36l-1.04,0.73l0.01,0.55l1.84,2.47l1.43,1.74l1.94,1.03l4.29,1.01l0.85,-0.41l-0.23,-0.86l1.39,0.33l1.88,-0.54l2.59,-1.35l2.28,-0.26l2.07,0.77l1.65,1.62l-0.91,4.49l-0.93,2.04l-5.84,1.21l-0.37,-2.16l0.52,-0.66l-0.24,-0.64l-1.85,-0.24l-1.32,1.35l0.37,1.96l-0.97,1.47l-0.08,1.37l-0.53,1.29l0.45,0.45l0.39,-0.06l-2.26,2.65l-0.78,1.52l0.18,5.12l-0.96,3.66l-2.42,-0.04l-4.24,-1.23l-2.16,-2.64l-0.42,-0.14l-1.86,0.48l-0.84,-0.66l-3.33,-0.39l-4.73,-2.44l-8.15,1.39l-3.76,1.29l-3.9,2.3l-1.6,1.74l-1.7,0.86l-2.46,0.65l-4.49,-0.25l-9.87,-1.78l-2.85,0.5l-3.67,-0.38l-5.67,-1.11l-4.2,-0.34l-4.08,0.63l-0.45,-0.32l0.03,-0.96l2.02,-1.54l0.02,-1.12l-4.47,-2.72l-0.15,-0.7l-1.44,-0.93l-0.99,-1.35l0.08,-0.66l0.56,-0.68l2.39,-0.47l0.2,-0.47l-0.33,-0.8l-3.36,-1.74l-1.99,0.5l-2.13,1.95l-1.09,0.23l-0.9,-1.21l-1.6,-0.77l-3.63,-0.72l-0.58,-0.76l-1.0,-0.58l-2.03,-0.57l1.83,-0.2l0.48,-0.55l-0.18,-0.85l-2.12,-0.97l0.62,-0.23l0.99,-1.51l0.07,-1.02l-0.99,-0.87l-2.71,-0.8l-1.0,-0.8l-1.74,-0.54l-3.06,-2.42l-0.11,-4.46l-0.37,-0.46l-0.8,0.27Z", "name": "Romania"}, "RS": {"path": "M607.42,509.85l1.42,-0.57l0.68,-0.8l0.8,0.44l1.93,-0.29l2.06,-1.11l1.45,-1.49l0.91,-0.19l3.1,0.39l1.26,-0.26l3.53,0.55l2.01,2.55l2.91,1.72l1.76,2.28l0.78,-0.01l-0.05,3.73l0.4,0.78l3.18,2.52l1.76,0.56l1.1,0.84l2.71,0.8l0.59,0.54l-0.89,1.5l-0.59,0.16l-0.38,0.59l0.52,0.87l1.89,0.81l-2.09,0.34l-0.26,0.39l0.32,0.95l2.16,0.6l1.56,1.34l1.5,0.52l2.22,0.24l1.44,0.7l1.25,1.38l1.66,-0.41l1.95,-1.86l1.75,-0.44l2.73,1.51l-2.07,0.47l-0.95,1.17l-0.06,1.13l0.49,0.96l1.72,1.18l0.39,0.86l-0.82,0.68l-0.41,1.88l-2.37,1.2l-0.78,2.48l0.04,1.46l1.83,4.56l0.75,1.06l2.95,1.73l1.3,1.71l1.38,0.92l-0.36,1.07l-3.08,3.35l-1.91,0.1l-1.5,0.81l-0.37,0.83l0.32,0.93l-0.37,2.03l0.49,1.4l0.79,0.91l-1.33,2.11l-0.79,0.18l-1.6,-0.67l-2.39,0.83l-2.13,-0.25l-2.26,0.89l-1.99,0.33l-0.42,-0.94l1.19,-0.89l1.63,-3.37l0.31,-1.03l-0.21,-0.67l-4.66,-1.26l-0.05,-1.37l-2.13,-1.28l-0.24,-0.7l-2.28,-2.26l-2.83,-1.32l-0.6,-1.42l-1.02,-0.04l-2.04,1.13l-0.19,0.7l0.51,1.45l-0.26,0.47l-2.08,1.44l-0.22,0.83l0.25,0.57l-1.01,0.3l-0.25,-0.85l-0.97,-0.7l-4.43,-2.42l-2.27,-0.5l-2.24,-1.04l-2.64,-2.74l-2.6,-1.74l-0.26,-0.89l0.64,-0.67l1.1,-0.11l1.32,0.51l0.77,-0.71l0.28,-1.06l-0.17,-1.2l-3.14,-4.01l3.69,-0.06l0.68,-0.49l0.14,-0.84l-3.45,-3.32l-2.76,-1.62l0.3,-2.93l1.92,-2.86l0.89,-2.97l-0.3,-0.61l-1.61,-0.6l-1.79,0.3l0.22,-0.99l-0.44,-2.38l0.55,-0.15l0.3,-0.53l0.63,0.27l2.51,-0.09l0.48,-0.45l0.05,-0.62l-1.26,-1.31l-3.09,-1.11l-1.01,-0.88l0.03,-0.83l0.71,-1.15l-1.87,-1.28l0.32,-1.03l-1.29,-2.79l0.59,-0.56l0.11,-0.78Z", "name": "Serbia"}, "MK": {"path": "M629.75,577.29l1.84,0.12l0.78,-0.95l0.41,-2.59l3.61,-1.54l0.89,-0.05l1.45,1.15l0.65,0.06l0.91,-1.54l0.63,-0.43l3.04,-0.35l3.84,-1.29l2.05,0.27l2.48,-0.84l1.15,0.64l3.21,3.37l3.37,1.74l1.43,3.5l0.79,0.71l-0.73,1.84l-0.29,3.95l-1.62,0.11l-0.61,0.4l-0.51,2.19l-2.82,0.86l-4.13,-0.64l-2.65,0.45l-1.15,0.53l-1.97,2.46l-2.56,1.2l-2.25,-0.57l-1.24,0.65l-4.44,0.26l-0.63,-0.83l-2.8,-0.25l-0.69,-2.05l-1.24,-1.16l-1.01,-2.21l0.03,-1.94l-0.54,-1.92l0.88,-0.94l-0.14,-2.11l0.57,-2.22Z", "name": "Macedonia"}, "SK": {"path": "M655.85,455.69l-1.87,2.97l-1.26,3.23l-2.02,2.0l-0.31,2.96l-4.93,0.82l-2.05,-2.5l-1.8,-1.11l-5.19,0.8l-2.74,-0.69l-3.03,-0.07l-2.16,0.4l-2.33,4.11l-5.08,2.53l-0.54,0.2l-3.78,-1.56l-1.02,0.28l-1.32,1.71l-2.52,0.6l-4.73,0.38l-1.81,0.92l-0.78,1.39l0.31,1.5l-0.48,0.75l-7.63,0.4l-5.12,-0.11l-1.62,-0.65l-4.25,-3.08l-2.48,-0.39l-0.57,-0.4l-2.93,-5.87l-0.03,-0.76l1.03,-1.78l0.6,-2.25l1.91,-2.7l0.53,-0.25l3.99,0.56l2.05,-0.28l1.81,-0.81l2.23,-2.01l1.68,-0.56l0.66,-0.61l0.43,-2.19l0.57,-1.15l2.67,-1.34l0.77,-1.01l2.29,-1.67l3.09,-0.34l1.14,0.17l0.33,1.5l0.41,0.33l2.46,-0.07l1.61,-2.02l2.36,-1.35l2.4,3.23l1.74,0.5l0.15,1.45l-0.41,1.13l0.26,0.48l0.62,0.21l1.69,-0.45l1.76,0.65l0.5,-0.22l0.65,-1.5l0.65,-0.68l2.55,-1.15l3.34,-0.11l1.37,0.34l1.03,0.74l2.12,0.22l1.03,-0.56l0.94,-1.22l3.47,-0.19l3.82,0.29l3.33,1.18l0.92,0.68l0.88,1.68l6.68,2.35Z", "name": "Slovakia"}, "MT": {"path": "M547.69,672.17l-1.11,0.1l-0.87,-0.6l-0.01,-0.92l0.72,0.18l1.27,1.23ZM543.86,669.2l0.21,-0.04l0.18,0.07l-0.23,0.07l-0.16,-0.09Z", "name": "Malta"}, "SI": {"path": "M558.4,514.15l-0.58,0.36l-0.27,0.83l0.66,1.7l-0.87,0.29l-1.65,-0.15l-2.27,-0.83l-1.46,0.52l-0.51,-0.13l-1.82,-1.48l-0.69,-1.19l-0.57,-0.36l-0.96,0.41l-1.36,2.21l-0.59,0.31l-3.71,0.06l-1.44,-0.5l-1.47,1.32l-3.3,-0.75l1.3,-1.09l1.85,-0.21l0.49,-0.85l-0.67,-1.21l-1.48,-1.37l-1.87,-0.9l0.48,-2.4l-0.56,-0.5l-1.19,-0.12l1.78,-1.87l0.27,-0.99l-2.23,-1.02l-1.0,-0.0l-0.2,-0.4l0.21,-0.69l3.61,-2.34l0.41,-0.89l11.45,1.94l2.8,-1.69l1.79,-1.78l4.25,-0.61l3.12,0.21l2.65,-1.17l1.66,-0.2l2.52,0.56l0.72,-0.63l0.04,-1.7l0.63,-0.57l0.61,-0.26l2.29,0.09l0.53,2.01l0.65,0.71l0.07,0.9l1.15,1.33l-1.93,-0.14l-1.22,0.94l0.08,1.71l-2.19,0.06l-1.02,1.18l-0.8,0.41l-4.21,1.44l-0.67,1.31l0.16,0.75l0.85,0.93l-0.17,2.79l-4.89,2.01l-0.16,0.91l0.87,0.78Z", "name": "Slovenia"}, "SM": {"path": "M519.71,543.1l-0.45,-0.16l0.66,-0.49l0.03,0.12l-0.25,0.53Z", "name": "San Marino"}, "UA": {"path": "M653.07,467.62l-0.48,-1.02l-1.33,-0.03l0.12,-2.22l2.03,-2.04l1.29,-3.29l1.97,-3.29l3.27,0.94l0.74,-0.39l0.29,-0.58l-0.19,-0.78l-1.79,-1.47l0.38,-2.03l-1.1,-4.13l0.67,-1.03l4.45,-5.14l5.01,-4.84l4.05,-3.55l3.41,-0.56l1.93,-2.52l0.04,-1.69l-0.66,-1.89l-0.81,-1.03l1.48,-0.7l0.01,-0.92l-1.58,-1.38l-1.65,-3.31l-2.63,-3.21l0.21,-1.48l-0.93,-2.11l-0.01,-1.46l0.96,-0.36l1.05,0.07l2.34,0.93l2.54,-1.53l2.08,-1.99l1.03,-1.59l6.71,-0.55l2.72,-0.57l11.52,0.31l11.49,2.58l4.85,0.31l2.07,2.74l4.3,0.01l0.86,0.38l-0.14,1.19l0.77,0.66l0.82,-0.23l1.34,-1.79l2.04,0.55l0.94,-0.1l1.34,-0.76l5.35,1.07l0.77,1.59l1.26,0.46l1.86,-1.96l1.65,-0.54l1.52,-0.99l0.71,0.66l1.69,3.01l0.73,0.64l3.15,-0.84l8.03,-0.78l1.78,1.25l0.48,1.45l1.58,0.92l1.44,0.22l1.63,-2.14l-0.44,-2.15l-0.87,-2.05l0.63,-1.52l1.11,-2.22l1.14,-1.4l2.99,-2.68l1.16,-0.48l2.04,0.41l1.65,-0.95l2.97,-0.05l2.74,0.15l2.68,0.97l2.06,-0.07l2.35,-1.21l1.22,-3.0l0.71,-0.46l4.98,0.99l1.41,-0.1l3.32,-1.51l1.76,-0.22l2.24,0.36l3.78,-0.19l2.3,1.56l1.21,1.66l1.4,3.3l3.75,3.5l-0.11,0.61l-3.32,0.63l-0.34,0.35l-0.02,0.88l1.11,1.58l0.4,3.4l0.62,0.53l-0.82,1.11l0.12,0.5l0.5,0.29l3.42,0.12l3.05,1.17l4.64,-0.55l1.25,2.5l0.76,0.36l1.36,0.04l-0.19,1.29l0.94,2.76l0.76,1.25l-0.65,2.08l0.27,1.27l1.11,1.57l0.8,0.42l0.78,1.34l1.47,0.37l2.77,-1.54l2.87,0.47l2.51,2.23l1.11,-0.21l1.55,0.25l0.81,0.78l1.22,0.44l1.88,-1.45l4.96,-1.04l2.8,-1.15l0.83,0.08l2.01,1.97l0.34,1.37l1.43,1.96l4.69,3.37l1.87,-0.44l0.48,-1.59l0.62,-0.26l2.67,1.56l2.59,0.2l3.77,2.27l1.65,0.09l1.78,-0.6l1.55,1.86l2.32,0.35l4.21,2.69l1.5,0.14l2.03,-0.5l0.42,0.22l-0.38,2.28l0.93,1.25l0.02,0.88l-0.71,1.68l-2.33,2.28l-1.74,0.48l-0.99,0.5l-0.2,0.47l0.33,0.98l0.8,0.9l3.08,1.14l-2.66,0.06l-1.31,1.36l-0.82,2.61l0.3,0.5l2.33,0.73l0.65,2.74l-0.56,1.14l0.38,0.56l1.14,0.33l-0.98,1.32l-1.48,3.53l0.0,1.35l-0.38,0.48l-4.48,0.18l-6.63,-0.37l-1.19,0.33l-1.59,2.23l-0.97,0.76l-1.66,0.71l-2.07,0.29l-1.24,1.08l-0.43,2.63l-0.72,1.43l0.07,0.65l0.94,0.53l-1.01,1.32l0.1,1.34l-4.77,-0.22l-3.93,0.37l-2.89,2.7l-1.6,0.01l-2.4,0.74l-1.66,0.94l-1.64,1.67l-1.38,-0.75l-1.76,0.02l-1.92,0.57l-2.01,1.22l-1.01,0.2l-2.4,-0.34l-2.68,0.72l-5.92,4.2l-0.85,1.26l-0.06,-0.98l-0.84,-1.19l-0.64,-0.01l-2.18,2.85l-2.86,1.3l-0.28,2.37l0.9,3.43l1.61,3.06l3.22,4.28l1.58,1.61l1.23,0.7l1.53,0.14l2.77,-1.34l0.99,-0.18l2.36,0.49l1.18,-0.93l1.12,-0.43l1.51,-0.06l3.32,0.89l-1.49,2.39l-0.71,2.57l-1.95,0.58l-2.39,-0.07l-2.35,0.4l-2.62,-1.59l-1.47,-0.29l-1.5,0.36l-1.71,2.08l-2.67,1.33l-0.94,1.5l-2.45,-0.32l-2.42,0.27l-3.46,1.46l-2.67,3.13l-2.71,1.84l-2.1,0.57l-1.96,-0.18l-1.25,-0.53l-2.53,-1.83l1.01,-1.84l1.11,-3.8l-0.15,-1.47l-0.78,-2.16l-2.21,-1.51l-1.96,0.2l-0.87,-0.34l-3.79,-2.62l-2.11,-0.17l-2.05,0.49l-0.9,-0.76l8.2,-5.54l1.9,-0.29l2.58,-1.26l2.69,-1.85l0.16,-0.43l-0.38,-1.45l-0.61,-1.16l-0.44,-0.2l-2.12,0.61l-3.21,-1.95l-3.47,0.87l-2.0,-0.12l-4.23,0.79l-5.91,-2.98l-1.5,-0.45l-1.23,0.07l-0.17,-0.18l0.26,-0.11l2.25,-0.47l0.37,-0.66l-0.06,-0.73l-0.3,-0.35l-2.07,-0.55l-1.91,-0.16l-1.14,-0.62l9.74,1.35l2.9,-2.06l0.45,-0.95l-0.45,-0.17l-2.95,0.84l-2.9,-0.52l-1.01,-0.69l-0.86,-1.03l-0.34,-1.11l0.24,-1.25l-0.37,-2.3l-1.35,-2.95l-1.18,-1.12l-0.51,-0.02l-0.12,0.49l2.04,4.82l-0.14,3.34l-0.31,0.96l-0.98,0.24l-2.85,-0.46l0.34,-1.53l-0.17,-0.42l-0.46,0.01l-1.0,0.76l-1.19,1.74l-0.91,0.23l-2.56,-0.19l-4.62,1.24l-2.15,5.06l-1.92,2.66l-3.91,3.98l-4.21,1.88l-0.96,0.3l-1.74,-0.36l-1.2,0.75l-0.41,0.86l-0.01,1.39l0.97,1.2l0.63,3.62l-1.51,-1.33l-2.41,-0.85l-2.58,0.32l-2.62,1.37l-1.64,0.47l-1.56,-0.31l-0.55,0.61l0.02,0.59l-3.8,-0.88l-1.69,-0.86l-1.12,-1.36l0.85,-0.48l2.64,-0.36l0.43,-1.31l-0.26,-1.46l3.09,-2.98l0.2,-1.44l1.39,-0.67l1.45,-1.41l0.77,-2.41l-0.83,-1.85l-0.2,-2.07l0.28,-0.4l2.58,-1.04l0.09,2.09l0.34,0.39l0.96,-0.28l0.59,-0.99l0.99,0.29l0.82,-0.29l2.2,0.94l1.43,-0.79l1.79,1.6l3.15,-0.45l1.01,-0.9l-0.07,-0.59l-2.61,-1.84l0.21,-3.09l-0.93,-1.9l-4.09,-2.24l-0.11,-1.31l-0.67,-0.88l0.48,-2.47l-0.27,-0.75l-2.11,-0.98l-0.72,-0.85l-2.54,-1.77l-0.12,-0.51l0.82,-2.15l0.35,-2.11l-0.29,-2.08l-1.12,-1.57l-0.78,-0.17l-1.42,0.65l-1.15,-0.9l-1.49,-2.29l-3.33,-0.54l-0.94,0.81l-0.37,-0.7l-0.98,-0.21l-0.04,-0.93l-0.76,-0.44l-2.59,-0.27l-0.22,-0.69l-0.56,-0.44l-1.12,-0.28l-1.94,-1.43l-4.0,-1.06l-1.85,1.0l-1.09,-0.18l-1.37,0.99l-5.24,-0.22l-2.8,1.62l-0.38,0.61l-4.06,0.92l-0.67,1.8l-1.39,1.88l-9.41,1.42l-4.0,1.52l-1.37,1.36l-2.09,0.42l-4.14,-3.56l-1.48,-0.38l-4.17,0.7l-1.51,-0.63l-0.93,0.12l-4.48,-0.97l-3.48,0.03l-2.69,-1.58l-1.04,-0.1l-1.43,1.47l-2.08,0.85l0.02,-1.1l-1.22,-1.43l-1.5,-0.07l-1.1,-0.44l-0.93,-1.27l-2.27,-0.88l-0.94,-1.63Z", "name": "Ukraine"}, "SE": {"path": "M520.76,323.75l2.31,0.87l1.42,-0.61l0.14,-0.52l-1.76,-2.91l2.49,-0.3l0.9,-1.54l-0.49,-1.97l-2.39,-1.12l-1.88,-2.97l-2.08,-1.66l-3.6,-6.12l-1.32,-4.24l-0.51,-0.26l-0.86,0.28l-0.98,-4.47l-1.97,-1.01l-0.41,-4.77l-0.3,-0.35l-1.93,-0.51l-1.22,-2.08l-0.43,-4.6l-1.38,-0.8l-0.89,0.07l0.29,-1.68l-0.86,-7.72l-0.81,-2.41l0.49,-1.42l0.99,-0.13l1.05,0.84l1.08,2.44l1.23,0.55l1.65,-0.68l1.12,-2.03l1.2,-5.71l-1.57,-5.83l2.04,-2.13l1.28,-3.25l0.59,-0.43l2.52,-0.49l1.73,-1.15l2.66,-2.86l0.5,-4.2l0.98,-2.97l-0.5,-2.21l-3.21,-7.03l-0.24,-1.94l1.98,-0.63l2.88,-0.11l0.56,-0.37l1.78,-3.52l0.73,-2.76l-1.76,-2.27l-2.22,-2.02l-1.56,-0.72l-4.24,-2.89l1.8,-9.09l0.16,-2.55l-2.56,-6.53l0.33,-2.72l-0.41,-4.04l1.37,-1.57l0.05,-0.47l-2.85,-5.97l2.76,-4.11l-0.39,-2.32l6.46,-7.29l1.66,-1.21l2.57,-1.06l2.85,-0.52l10.18,1.32l0.91,-0.69l0.88,-1.26l1.06,-1.69l0.15,-2.08l-0.38,-2.85l-0.59,-1.74l-5.55,-2.58l6.02,-7.64l5.01,-8.02l0.94,-7.63l1.16,-3.36l-1.16,-7.19l6.39,-0.83l4.58,-1.92l1.56,-1.27l-0.64,-4.3l1.68,-1.31l4.43,-4.91l7.14,-6.7l0.4,-2.56l-1.05,-2.31l-3.01,-3.81l0.7,-1.43l3.43,-1.05l1.77,-1.7l2.84,-6.35l5.14,-3.08l1.96,-1.6l7.81,3.15l0.47,-0.13l2.84,-3.95l0.73,-1.63l-0.2,-7.55l1.64,-0.55l0.91,-0.15l5.22,1.45l3.88,0.18l11.04,3.05l1.69,0.08l3.69,-2.87l-0.1,-0.68l-2.97,-1.22l1.87,-1.21l2.42,-3.65l0.39,-2.24l-0.15,-1.32l-2.42,-2.49l5.83,-0.32l3.49,1.28l0.41,1.76l3.54,1.83l3.19,2.43l0.7,0.87l7.17,3.99l2.75,1.04l2.32,0.34l5.63,1.69l0.91,0.52l3.19,2.48l1.11,2.74l1.96,0.38l2.08,2.53l2.08,1.38l-1.82,1.61l-0.02,4.22l0.55,1.9l-1.01,2.11l-0.15,1.45l0.57,0.6l3.27,0.52l0.47,1.84l-1.41,1.11l-0.54,0.92l0.17,2.66l0.56,1.56l3.57,4.32l0.53,1.22l-1.21,2.31l-0.38,2.92l-1.22,1.48l-0.86,0.53l-0.43,1.07l-0.12,1.6l0.36,2.86l0.77,1.59l2.15,1.04l1.83,3.4l1.28,3.66l-3.01,0.43l-2.89,-1.0l-1.28,0.49l-5.02,0.43l-1.55,1.09l-2.27,-1.04l-2.3,-1.86l-0.51,0.01l-1.64,1.38l-0.76,0.19l-1.06,-1.24l-1.24,-0.12l-1.65,2.67l-0.35,3.09l-1.94,-0.25l-0.44,0.48l0.14,0.6l0.53,0.47l-2.9,0.43l-0.18,0.93l0.46,0.62l-0.61,0.63l-4.41,0.46l-0.55,0.67l-0.09,0.87l0.3,0.61l0.77,0.46l0.08,0.6l-1.88,-1.4l-0.5,0.08l-0.3,0.57l1.85,2.46l0.35,1.44l-1.93,2.38l-3.11,2.99l-0.85,1.59l0.1,0.49l1.82,1.74l1.54,3.9l1.61,1.71l-0.59,1.44l-2.79,1.72l-3.32,2.76l-3.43,6.64l-1.04,0.81l-2.98,1.11l-1.22,1.15l-2.17,1.25l-4.05,1.19l-1.79,1.56l-0.81,1.54l-0.53,0.07l-2.04,-1.05l-0.54,0.31l-0.16,1.14l-1.25,-0.75l-0.51,0.08l-0.97,1.16l-0.67,1.65l-2.53,2.16l-2.77,-0.4l-0.7,0.56l0.41,0.72l-2.6,0.41l-0.39,0.27l-0.94,2.25l-2.29,0.6l-0.72,0.96l0.32,0.59l2.05,0.13l-0.3,1.29l-2.74,0.93l-1.07,1.24l-0.71,-0.02l0.17,-0.42l-0.38,-0.55l-1.69,0.04l-0.49,-0.91l-0.6,-0.13l-0.37,0.29l0.08,1.31l1.02,2.21l-0.79,1.02l-0.03,0.58l1.47,0.79l-0.87,0.37l-1.41,1.48l-1.42,0.04l-1.13,1.05l-0.71,-0.0l-2.16,-1.18l-0.52,0.21l-0.53,1.86l0.78,2.11l2.2,1.98l-1.12,1.3l-1.84,6.3l0.91,3.42l-2.8,-0.75l-0.53,0.45l0.23,1.26l-1.12,1.82l0.44,2.39l-0.34,1.5l0.79,1.46l-0.42,0.9l0.53,6.73l0.99,2.76l-0.36,2.22l1.62,1.58l3.13,0.25l0.85,1.75l0.4,0.25l1.24,-0.12l2.49,-0.95l0.7,1.43l2.09,2.15l1.35,1.02l1.94,0.48l1.89,1.5l-0.11,2.2l1.01,0.75l2.41,0.77l1.86,2.64l0.72,2.14l-0.21,1.13l-3.27,1.95l-1.93,1.86l-3.29,1.82l-0.78,0.74l-0.61,0.26l-0.88,-0.13l-2.7,1.43l-0.19,0.48l0.54,0.87l2.07,0.26l1.22,-0.32l0.88,-0.73l1.45,-0.01l1.59,-0.76l0.43,0.17l0.48,0.84l-2.58,0.83l-0.54,2.14l-1.03,1.23l-2.47,0.91l-3.56,2.1l-1.06,-0.11l-1.26,0.94l-2.84,1.13l-1.56,1.59l-3.24,1.35l-1.66,1.1l-8.84,-0.19l-1.55,0.56l-0.25,0.42l2.6,0.99l1.39,-0.17l4.0,0.51l1.35,1.35l-3.09,0.88l-0.3,0.52l1.51,4.14l-0.88,1.13l-0.06,4.42l-1.32,0.36l-0.56,1.98l0.4,1.19l0.25,3.77l0.62,1.3l-0.25,1.17l-2.12,3.38l0.05,1.51l0.64,2.28l-2.37,6.77l-1.76,2.26l-0.93,1.78l-2.08,5.31l-1.98,1.63l-2.71,-1.1l-1.67,0.06l-2.41,0.6l-3.73,-0.4l-3.83,0.25l-0.92,0.53l-0.18,0.46l0.43,1.51l-0.8,0.15l-1.56,-0.48l-2.19,1.42l-1.9,1.7l-0.71,1.14l-0.17,2.38l1.76,3.55l-2.0,2.18l-1.06,0.07l-3.83,-0.68l-6.49,1.54l-5.29,-1.1l0.53,-1.06l0.42,-5.2l-0.52,-1.24l-1.43,-1.42l-3.24,-4.83l-1.03,-2.15ZM610.35,291.1l-0.44,1.16l-0.16,-0.02l-0.35,-0.5l0.95,-1.01l0.99,0.04l-0.99,0.33ZM608.6,293.08l-0.69,0.4l-0.58,1.21l-1.9,1.01l-0.31,4.36l1.23,1.47l-1.23,0.69l-1.15,2.25l-2.03,0.82l-0.99,0.77l-1.3,1.61l-0.6,1.99l-1.6,0.85l1.52,-2.4l-0.04,-0.53l-0.96,-0.91l-1.29,-2.5l0.57,-1.33l-0.21,-4.03l3.53,-3.79l1.7,-1.37l2.27,-0.59l0.99,0.53l0.56,-0.21l0.42,-1.14l0.49,-0.18l1.6,1.03ZM602.8,260.19l0.1,-0.33l0.6,-0.21l-0.46,0.3l-0.23,0.24ZM600.15,269.23l0.11,-0.28l0.27,-0.3l-0.36,0.57l-0.02,0.01ZM574.47,322.99l-0.65,0.71l-0.32,-0.99l0.14,-4.77l2.86,-5.75l1.39,-0.63l3.64,-8.06l0.2,-0.26l0.38,0.11l-0.59,0.73l0.06,1.24l-2.27,4.27l-0.62,2.77l-0.83,0.77l-3.37,9.86Z", "name": "Sweden"}, "AT": {"path": "M481.24,489.9l0.13,-0.58l-1.06,-2.68l1.05,-2.02l0.09,-1.67l1.32,-0.27l0.2,-0.84l3.5,1.6l0.51,1.42l1.54,0.43l-0.16,1.17l0.45,0.42l1.9,-0.64l0.89,-1.0l0.56,-1.07l0.32,-1.9l2.68,-0.0l2.56,0.45l1.56,1.96l1.23,0.23l3.45,-0.54l1.5,-1.13l4.2,-1.6l6.32,-0.62l0.56,-0.68l-0.02,-0.91l1.71,0.39l1.72,0.89l2.72,-0.54l0.93,0.41l0.03,1.0l0.54,0.69l2.21,1.18l0.81,-0.01l0.6,-0.84l0.29,-2.75l-0.54,-1.0l-1.45,-0.25l0.66,-1.25l-0.01,-1.43l-2.62,-3.34l0.61,-1.04l3.51,-1.91l3.25,-0.97l0.81,-0.58l0.62,-0.8l0.73,-2.89l2.33,0.93l1.08,-0.42l0.94,-0.96l0.25,-2.75l1.82,1.08l1.04,1.69l1.99,0.43l2.41,0.04l1.64,-0.85l2.7,0.45l0.45,-0.33l0.19,-1.16l1.34,-1.55l1.2,0.04l0.39,-0.27l0.74,-3.74l0.73,0.04l1.42,0.91l2.0,-0.47l5.16,1.96l1.7,-0.05l3.21,1.91l4.25,0.28l1.59,-1.06l5.12,1.61l0.79,1.59l-1.13,2.46l0.03,1.3l1.48,3.33l1.49,2.65l0.58,0.5l-0.55,0.63l-0.13,0.95l-0.66,1.21l0.38,2.0l-3.35,0.39l-2.64,-1.21l-0.78,0.17l-1.67,1.19l-0.17,0.52l0.4,0.53l2.63,0.76l0.36,0.9l-0.61,1.28l-2.51,1.02l0.22,2.14l-0.57,1.05l0.29,1.33l0.71,0.37l-0.38,1.52l-1.55,0.13l-1.08,0.52l-3.02,2.24l-0.95,1.05l-0.06,1.65l-2.43,-0.52l-1.83,0.22l-2.62,1.17l-3.01,-0.22l-4.42,0.64l-0.86,0.49l-1.18,1.41l-2.58,1.56l-9.66,-1.84l-4.61,-0.75l-4.38,-0.3l-9.29,-1.69l-1.1,-0.46l-3.08,-3.86l-0.22,-0.59l0.9,-1.44l-0.7,-0.65l-5.54,1.63l-3.29,-0.2l-4.01,0.41l-1.66,0.81l-1.47,2.36l-1.02,0.33l-2.05,-0.36l-1.13,-0.95l-2.83,-0.17l-0.56,-1.63l-1.1,-0.55l-3.07,2.23l-3.13,-1.32l-0.64,-1.3l-3.07,-0.87Z", "name": "Austria"}}, "height": 790.3360148034734, "projection": {"type": "mill", "centralMeridian": 11.5}, "width": 900.0});
jQuery.fn.vectorMap('addMap', 'north_america_mill',{"insets": [{"width": 900, "top": 0, "height": 543.9752077221104, "bbox": [{"y": -12658749.920443352, "x": -19602744.043810368}, {"y": -805507.5274078546, "x": 8293.375346519799}], "left": 0}], "paths": {"PR": {"path": "M615.15,486.14l0.49,-0.54l4.41,0.24l0.53,0.27l0.25,-0.21l1.74,0.55l-1.52,1.25l-4.61,0.12l-1.07,-0.1l0.09,-0.95l-0.31,-0.64Z", "name": "Puerto Rico"}, "DO": {"path": "M591.08,485.11l1.01,-0.94l0.06,-0.79l-0.32,-0.52l0.75,-0.93l-0.5,-0.96l0.16,-2.32l0.47,-0.33l1.59,0.25l1.43,-0.34l1.49,0.7l1.0,0.03l1.26,0.7l1.15,-0.16l0.52,1.4l1.08,0.56l-0.11,0.58l0.36,0.4l3.61,0.67l1.01,0.41l1.54,1.28l-1.42,1.56l-0.98,-0.9l-2.01,-0.22l-2.55,-0.02l-1.32,0.39l-0.84,0.63l-1.29,0.15l-0.9,-0.61l-2.07,0.34l-0.5,0.35l-0.18,0.93l-1.27,1.96l-0.79,-0.55l-0.56,-1.27l0.01,-1.51l-0.9,-0.91Z", "name": "Dominican Rep."}, "DM": {"path": "M644.58,500.93l0.23,0.18l0.09,0.55l-0.06,-0.22l-0.26,-0.5Z", "name": "Dominica"}, "LC": {"path": "M646.75,509.74l-0.11,-0.11l0.12,-0.26l-0.02,0.37Z", "name": "Saint Lucia"}, "NI": {"path": "M510.73,514.44l0.06,-0.06l0.48,0.45l-0.55,-0.39ZM511.29,514.84l2.51,-0.37l0.5,-0.47l0.25,-0.88l0.89,-0.25l-0.14,-2.33l1.96,-0.04l1.21,-1.35l1.24,0.92l0.61,-0.04l0.37,-0.69l2.63,-1.95l0.14,-1.0l0.59,-0.38l0.22,-0.7l0.41,-0.19l0.96,0.74l1.13,0.1l3.04,-0.79l2.07,-1.05l-0.18,0.72l0.59,0.49l0.48,1.81l-1.11,1.68l-0.43,1.39l-0.38,2.18l0.2,2.87l-1.09,1.22l0.44,1.35l-0.1,0.78l-0.47,0.37l-0.28,0.9l0.84,1.13l-1.07,1.87l0.22,1.13l0.74,1.26l-0.8,0.2l-1.1,-0.22l-0.86,-0.95l-1.68,-0.44l-1.48,0.48l-3.23,-1.18l-0.9,0.36l-3.52,-3.12l-1.96,-2.65l-3.47,-2.91Z", "name": "Nicaragua"}, "PA": {"path": "M534.6,538.28l0.75,-0.82l-0.31,-1.31l0.78,-0.58l0.11,-0.46l-1.07,-0.96l0.0,-1.44l0.4,-0.43l0.54,0.28l0.65,-0.15l0.56,0.42l0.14,1.01l0.51,0.34l0.2,0.83l0.77,0.44l1.65,0.03l0.34,-0.32l0.89,0.92l1.09,0.25l2.75,-0.57l1.51,-1.01l2.12,-0.65l2.77,-1.97l2.26,0.3l0.98,0.56l2.07,0.1l3.27,1.65l2.03,1.89l-0.23,1.03l1.29,2.33l-0.63,0.53l-0.17,0.77l-0.68,0.51l-0.58,-0.69l-0.66,0.08l-0.06,1.09l-0.55,0.84l-1.99,-3.13l0.67,-0.54l-0.02,-0.64l0.32,-0.26l1.8,1.09l0.45,-0.2l-0.09,-0.48l-1.26,-0.97l-0.37,-0.76l-1.96,-0.04l-0.28,-0.79l-0.59,-0.47l-2.4,-1.47l-0.94,-0.16l-1.58,0.3l-1.08,0.76l-0.56,1.42l-3.31,1.77l-0.0,1.28l2.11,2.54l-1.18,0.19l-0.73,0.74l-1.04,0.23l-0.76,-0.04l-0.82,-3.08l-1.01,-0.08l-0.44,1.11l-0.93,-0.37l-1.33,-2.2l-2.25,-0.36l-0.53,-0.53l-2.23,-0.06l-1.12,0.36Z", "name": "Panama"}, "CA": {"path": "M656.78,311.04l0.24,-0.16l0.13,0.16l-0.06,0.01l-0.31,0.0ZM658.78,310.96l1.32,-2.86l1.52,0.67l0.57,-0.05l-0.0,-0.7l-0.32,-0.25l0.55,-0.85l-0.37,-0.55l-0.78,-0.11l-0.01,-0.43l0.68,-0.71l0.52,0.35l0.69,-0.05l0.26,-0.5l-0.68,-1.17l2.47,-5.27l0.34,-0.49l1.01,-0.41l-0.52,-0.58l1.07,-0.85l0.3,-1.08l0.98,-0.87l0.58,-1.21l3.2,-1.5l1.41,0.61l-1.62,0.22l-0.31,0.33l0.09,1.0l0.56,0.37l0.56,-0.09l-0.02,0.65l-0.32,0.74l-1.15,0.94l-0.25,0.86l-1.47,1.64l-1.55,2.62l-0.63,1.68l0.3,1.48l0.79,-0.27l2.58,-2.87l-0.18,0.68l0.61,0.29l1.02,-0.45l1.08,0.35l-1.88,0.97l-0.63,0.66l-0.05,0.46l0.42,0.2l0.82,-0.39l-0.88,0.8l-0.11,0.47l0.42,0.23l1.26,-0.37l0.85,0.48l1.18,-0.25l0.13,0.51l0.46,0.11l-0.52,1.07l0.29,0.91l0.78,-0.34l0.4,-0.82l0.44,-0.27l0.43,0.17l2.09,-1.46l0.24,0.94l0.61,-0.04l0.38,-0.45l1.78,-0.12l1.47,0.69l0.15,0.68l-3.03,2.63l0.37,0.32l0.62,-0.03l0.27,0.54l0.87,0.13l-0.19,0.41l-1.53,0.81l0.06,0.7l2.53,-0.72l0.75,0.1l2.07,-0.91l-0.6,0.93l-0.76,0.12l-1.38,0.96l0.04,0.81l-1.32,0.41l-0.3,0.4l0.91,0.43l-0.87,0.95l-1.5,-0.7l-1.22,2.12l-1.09,0.78l-1.18,0.26l-2.01,2.83l-2.45,0.37l-0.43,-0.19l2.21,-0.99l1.54,-1.84l1.6,-0.78l0.59,-0.81l-0.53,-0.5l-0.67,0.25l-2.11,-0.25l-0.43,0.23l-0.29,0.96l-1.25,-0.11l-0.27,-0.14l0.07,-1.7l-0.58,-0.22l-1.36,0.21l-0.6,0.79l-2.63,0.59l-7.46,-0.68l-0.64,-0.33l-1.29,0.62l-2.78,0.2l-0.5,-1.6l3.64,-2.99l1.54,-0.89l-0.39,-0.58l-1.45,-0.08ZM683.12,317.23l0.46,0.3l1.12,-0.2l1.62,-2.14l0.85,-0.39l-0.85,1.7l0.07,1.94l0.68,0.3l0.34,-0.18l1.28,-1.47l0.07,1.34l-1.15,2.05l0.08,0.93l-0.93,1.78l-0.88,-0.43l-1.1,0.47l0.18,-2.74l-0.24,-0.4l-0.74,0.07l-1.14,1.28l-0.93,0.54l1.64,-3.37l-0.42,-1.38ZM673.85,292.06l0.2,-0.08l-0.12,0.07l-0.08,0.01ZM674.16,291.85l0.09,-0.48l0.22,-0.03l-0.24,0.43l-0.06,0.08ZM256.05,238.13l-0.69,-2.13l-5.23,-4.12l-0.56,-1.06l-2.14,-1.13l0.48,-1.39l0.0,-0.49l-0.42,-0.4l-3.05,0.12l-1.57,1.06l-2.25,-0.82l-0.7,0.54l-1.85,-0.48l0.0,-77.04l2.6,0.35l2.21,-0.17l3.93,0.93l2.45,1.75l4.29,2.06l5.91,1.83l3.08,0.07l4.41,1.76l0.43,-0.14l0.11,-0.58l-1.11,-1.39l-2.21,-0.71l1.21,-0.07l0.39,-0.4l-0.33,-0.56l-1.23,-0.44l0.75,-1.21l2.32,-0.3l0.47,-1.23l3.54,-0.11l0.18,-1.79l0.56,0.08l0.76,0.92l0.78,0.27l-1.35,1.86l0.49,0.7l2.46,-1.04l2.68,-0.58l1.62,-1.94l2.06,-0.0l0.47,-0.6l-0.18,-0.29l1.17,0.37l3.66,-1.92l1.51,0.1l1.25,-1.39l1.23,-0.64l3.52,0.35l1.28,-0.92l0.43,0.52l-0.42,0.53l-5.94,3.1l-5.64,1.06l-2.08,2.08l-1.86,0.46l-3.86,3.86l0.39,1.1l1.17,0.42l0.3,-0.06l0.08,-0.79l2.01,0.19l0.99,-0.42l0.31,-0.66l-1.07,-0.46l0.04,-0.94l3.95,-1.82l0.83,-0.85l0.03,-0.48l1.67,0.02l0.4,0.71l1.09,-0.84l0.27,1.88l0.34,0.34l2.66,-3.37l1.91,-1.28l4.38,-1.24l0.14,0.8l0.56,0.59l1.44,-0.45l2.44,-1.95l0.62,-1.38l2.98,-1.38l-0.18,-0.7l-1.35,-0.27l-0.12,-0.64l-0.69,-0.34l0.5,-0.82l3.64,2.43l1.47,2.07l1.28,2.66l2.25,2.14l1.83,1.2l2.05,0.64l1.02,-0.03l1.1,-0.71l0.15,-1.01l-0.88,-1.25l0.55,-0.55l0.12,-0.66l0.6,-0.11l1.52,-1.44l-0.12,-0.81l0.98,-0.67l0.39,3.18l1.31,0.85l-1.65,1.97l0.15,0.73l0.82,0.39l4.5,-0.29l1.65,-1.42l0.86,-2.34l4.68,-0.02l2.67,0.36l2.84,1.02l4.28,2.56l6.5,1.11l3.89,1.9l4.54,1.19l5.97,0.68l0.44,-0.47l-0.48,-0.7l1.35,-0.17l4.04,1.2l2.85,1.63l2.05,2.24l-0.32,0.55l-0.78,0.14l-2.46,-0.19l-0.74,0.73l-1.42,0.6l-0.41,0.59l0.05,0.56l-1.1,0.63l-0.23,0.45l0.26,0.46l1.6,0.75l6.39,0.99l7.16,0.22l1.38,-0.43l3.43,-0.24l1.7,-0.54l1.33,0.23l3.11,-1.4l1.32,-0.29l2.18,2.18l2.91,0.28l0.39,1.57l0.66,0.85l0.65,-0.14l0.62,-1.35l1.27,1.61l1.81,1.27l0.28,0.53l-0.22,0.24l-0.99,0.32l-1.34,-0.35l-0.34,0.65l5.23,5.2l1.33,0.89l0.44,-0.55l-2.32,-2.96l-0.13,-1.58l2.37,0.95l0.58,-0.6l-0.85,-1.22l0.17,-0.74l-1.4,-1.4l-0.46,-2.13l-1.51,-1.59l0.01,-0.65l0.99,-0.81l0.07,-0.92l4.4,-0.79l0.8,-0.75l1.29,0.12l0.33,-1.19l0.52,-0.43l1.15,-0.22l1.11,-0.72l0.47,-0.61l0.09,-0.93l-1.14,-0.54l-0.69,0.11l-2.28,0.98l-0.76,1.31l-1.19,-0.18l-2.15,0.78l-1.63,-0.3l-0.88,0.46l-0.02,0.94l-2.44,0.19l-1.81,-0.99l1.71,-2.3l4.42,-0.69l6.43,-2.05l1.7,0.45l0.83,0.62l1.24,3.34l1.45,1.05l2.14,0.56l0.26,0.98l1.54,0.77l2.48,0.01l2.08,-0.6l3.85,2.58l2.05,0.7l2.17,-0.09l1.68,0.45l5.8,-1.27l3.33,0.21l3.16,0.79l1.37,-0.02l2.63,-0.72l0.25,-0.43l-1.57,-1.85l3.48,3.12l2.53,0.84l1.91,-1.1l-0.03,-1.34l-2.23,-1.35l-1.14,-0.15l-2.0,0.53l-1.11,-1.1l0.26,-0.61l-1.12,-1.54l1.75,0.48l2.12,-0.6l0.18,-0.68l-0.54,-0.57l1.0,0.43l1.15,-0.12l2.05,2.05l2.0,0.12l-0.88,1.3l0.47,0.56l1.08,-0.24l0.56,-0.81l1.47,-0.6l-0.87,3.95l-0.83,1.32l-0.06,0.62l0.95,1.28l0.32,1.05l0.94,0.13l1.01,-0.29l-0.19,0.76l0.5,0.26l0.96,-0.24l0.41,0.33l-0.02,0.83l-1.39,0.18l-1.23,-0.44l-0.92,0.18l-0.94,-0.62l-0.58,0.27l-0.1,0.44l2.85,2.78l0.8,1.19l0.36,-0.26l0.21,-0.94l-1.43,-1.65l1.71,0.28l1.42,-0.42l0.8,-2.84l-0.69,-2.51l-1.27,-1.73l0.9,-2.3l1.37,-0.33l1.28,0.34l0.82,-0.28l4.22,-3.58l2.53,-1.36l-0.26,-0.68l-0.7,-0.04l-0.12,-2.04l-0.93,-1.24l-0.82,0.14l-0.79,1.74l-2.13,0.17l0.15,-0.74l2.48,-2.05l-0.38,-0.56l-0.54,-0.0l-0.03,-0.91l1.89,-0.48l-0.37,0.6l0.15,0.48l0.81,0.23l1.56,-1.19l0.19,-0.28l-0.67,-1.5l-0.9,-0.39l-1.4,0.56l-1.55,0.02l-1.86,-1.76l-0.66,0.01l-0.49,0.58l-3.72,-1.55l-1.9,-0.42l-2.51,-2.79l-0.26,-0.67l0.03,-0.82l1.19,-1.59l2.19,-0.44l-0.46,-0.75l0.38,-0.53l-0.2,-0.62l-1.88,0.48l-1.23,-1.3l0.55,-3.8l1.6,-1.31l1.58,0.79l1.07,-0.11l0.96,-1.59l-0.11,-0.57l-2.13,-0.39l3.16,-2.83l2.78,-0.75l0.45,1.21l0.87,0.79l2.71,0.1l0.12,1.13l2.55,1.65l1.11,1.14l0.66,2.24l-0.42,2.27l3.22,2.05l1.49,2.17l0.08,0.87l0.73,0.28l0.7,-0.47l0.71,0.99l-1.48,0.02l-1.34,-0.79l-0.76,0.11l-0.98,1.21l0.13,0.57l2.33,0.31l-4.26,2.97l-0.03,0.67l0.7,0.22l2.37,-0.2l0.47,0.61l1.73,0.68l1.12,-0.19l1.37,-0.78l-0.48,0.42l0.42,0.6l3.63,0.13l-0.89,1.34l-0.8,-0.38l-0.89,0.14l-0.43,0.33l0.12,0.56l2.43,1.56l1.21,1.84l-0.26,0.42l-0.12,3.3l2.08,2.08l0.54,-0.16l1.51,-2.05l0.11,-1.28l1.08,-3.4l1.81,-2.01l0.82,-0.07l2.04,1.79l2.1,1.27l1.2,1.65l0.76,3.06l-0.13,0.49l-0.37,0.07l-0.46,-0.06l-0.68,-0.78l-0.93,0.52l-0.21,0.66l0.25,2.77l0.67,1.73l3.55,3.57l0.8,1.62l0.95,-0.07l3.66,-2.63l0.88,-2.84l2.31,-2.45l1.14,-3.32l-0.01,-1.62l0.33,-0.44l0.63,-0.57l1.05,0.29l2.08,-0.29l0.35,-0.39l-0.25,-0.53l-0.93,-0.36l0.9,-0.63l0.22,-1.42l-2.63,-1.37l-0.12,-2.73l-0.41,-0.85l0.2,-1.35l1.84,0.36l1.94,-0.41l1.6,0.05l3.26,1.29l5.39,0.09l0.83,0.3l-0.33,0.38l-1.25,0.33l-0.07,0.73l2.21,0.76l0.25,1.19l0.43,0.32l1.43,-0.24l2.63,0.7l-1.12,1.01l-1.68,0.81l-0.27,0.54l0.38,0.46l2.78,0.26l0.44,0.61l-0.08,0.49l-1.13,0.81l-1.87,0.8l-1.52,-0.4l-1.76,0.34l-0.29,0.53l1.76,2.93l0.7,0.23l-0.15,0.92l0.28,0.77l3.89,3.71l-0.82,3.23l-0.71,0.5l-1.49,0.23l-1.75,2.04l-1.9,1.27l-1.67,0.38l-2.16,1.45l-0.54,-0.03l-2.12,-2.9l-1.55,-0.39l0.14,-0.56l-1.48,-1.23l-1.69,-0.52l-1.72,1.18l-0.09,0.44l0.74,0.5l1.04,-0.56l0.77,0.23l2.11,1.88l1.96,3.3l-2.07,-0.67l-0.75,0.35l-0.32,0.53l-0.49,-0.15l-2.31,-0.96l-1.67,-1.72l-1.01,-0.39l-2.48,0.39l-3.36,-0.02l-0.3,0.17l-0.2,1.0l0.36,0.83l3.64,1.76l-0.32,0.62l-5.29,4.88l-1.66,0.74l-2.5,-0.08l-3.43,-2.12l-0.51,-0.63l-1.7,-0.48l-3.46,-1.69l-1.19,0.02l-0.13,0.43l-5.19,-0.71l-2.41,0.2l0.02,0.69l2.02,1.02l0.5,-0.71l5.21,1.13l4.96,3.65l3.97,0.57l4.12,0.16l1.55,0.38l-0.0,0.68l-1.25,1.92l-3.07,3.48l-1.06,1.72l-3.4,1.48l-1.03,-0.28l-0.67,-0.6l-0.65,0.15l0.12,0.68l-0.61,-0.29l-1.07,0.08l-0.57,-0.39l-0.32,-0.75l-1.57,0.22l-0.28,0.14l0.02,0.71l0.71,0.65l-1.07,-0.19l-0.26,0.62l0.7,1.09l-0.59,0.76l-0.8,0.4l-1.21,-0.29l-1.09,0.65l-3.61,-1.16l-1.71,-0.23l-0.52,-0.55l-1.85,0.27l-5.48,-1.93l-1.31,-0.93l-0.5,0.03l-0.08,0.5l0.44,0.75l-0.23,0.99l0.72,0.74l1.61,0.22l0.34,-0.54l4.56,1.46l-1.17,0.81l0.4,0.59l1.07,-0.12l2.07,-1.02l2.44,1.47l1.85,0.53l1.11,0.86l0.1,1.45l-0.31,0.8l-1.57,0.34l-1.62,0.92l-2.98,-0.47l-1.69,0.35l-0.39,0.27l-0.04,0.59l0.94,0.99l-1.63,0.36l-1.31,1.88l-1.87,-0.48l-0.25,0.69l1.26,0.76l-0.68,0.6l0.09,0.44l-1.47,0.33l-0.01,0.6l-0.82,-0.08l-0.39,0.58l1.08,1.25l-1.64,0.94l-1.13,1.07l0.05,1.11l-0.84,0.17l-0.03,1.45l-2.23,4.08l-1.17,0.68l0.04,0.68l0.37,0.34l-0.7,3.5l-0.01,5.16l-0.3,1.07l-0.57,0.49l1.02,0.63l0.53,1.11l0.62,0.13l1.29,1.07l-0.25,2.83l0.31,0.39l0.76,-0.81l0.7,-2.56l4.24,0.09l0.33,1.62l3.37,8.51l-0.53,1.32l-1.14,1.18l-0.15,0.57l0.82,0.14l1.49,-0.76l0.08,0.44l0.41,0.02l6.25,-1.94l2.47,0.12l4.07,1.77l4.85,1.18l3.83,2.51l3.13,3.27l9.15,2.98l2.17,1.67l-0.75,1.54l0.23,0.54l1.78,-1.44l2.7,0.19l3.05,-0.4l3.54,0.71l1.2,-0.11l0.61,0.5l1.37,0.06l0.83,0.51l0.74,1.46l-1.04,4.04l0.98,1.59l0.46,1.45l-0.25,1.45l0.17,2.22l-0.69,1.78l0.29,0.77l3.29,3.54l-0.0,0.28l-1.05,0.64l0.01,0.64l1.82,0.13l2.56,1.59l1.5,1.37l1.01,2.14l-1.96,1.65l-0.07,0.46l0.86,0.1l1.98,-1.26l1.2,0.29l1.23,0.67l2.44,2.71l0.51,0.12l0.19,-0.49l-0.21,-0.57l-1.74,-2.01l0.2,-1.08l0.87,-1.35l0.49,-0.24l1.27,0.9l0.64,1.69l0.44,0.24l1.21,-2.46l-1.2,-1.65l0.61,-1.19l1.76,-1.94l0.1,-0.73l-0.45,-1.48l-0.89,-1.02l0.11,-1.38l-0.9,-1.3l-1.03,-4.24l0.24,-0.73l0.57,-0.34l-0.59,-0.76l0.3,-0.66l-0.8,-0.63l0.03,-0.54l-1.48,-1.22l-1.03,-2.08l6.63,-2.52l2.75,-1.62l2.33,-1.91l3.53,-4.05l0.69,-3.04l-0.23,-5.08l-1.67,-4.35l-1.46,-2.05l-2.07,-1.67l-2.34,-1.18l-2.38,-1.8l0.34,-1.38l3.43,-3.62l-0.34,-0.91l0.52,-0.69l-0.0,-0.5l1.1,0.73l0.62,0.0l0.12,-0.71l-0.48,-0.53l0.73,-0.78l-0.2,-0.92l0.37,-0.63l-0.14,-0.59l-0.79,-0.22l0.09,-0.54l-1.07,-1.89l0.66,-0.61l0.11,-0.65l-1.31,-0.5l0.71,-0.88l0.13,-0.69l-2.51,-0.14l1.87,-2.46l-0.03,-1.74l1.04,-0.86l-0.06,-0.65l-2.44,-2.01l-0.55,-2.03l0.01,-1.22l1.01,-0.91l2.5,-1.09l2.42,0.36l5.34,1.64l0.02,0.98l0.49,0.08l2.07,-0.99l1.55,0.36l1.89,1.12l0.46,-0.02l0.05,-0.79l4.4,-1.95l4.02,2.66l1.01,0.05l-0.03,0.81l-0.51,0.86l0.32,0.6l1.38,-0.62l1.18,0.61l0.73,0.85l-0.72,0.26l0.06,0.82l1.3,-0.12l0.69,-0.56l0.74,0.36l-1.03,1.04l0.6,0.65l0.07,0.56l1.7,1.44l3.75,0.87l2.24,-0.1l0.33,0.16l0.37,1.14l0.86,0.33l1.48,-0.45l0.66,-1.1l0.15,0.15l0.31,0.95l-1.13,1.09l-0.66,1.77l0.06,1.31l0.56,0.95l-0.11,0.65l-1.22,0.34l-3.47,-0.06l-0.39,0.59l0.48,0.52l4.32,0.42l0.64,1.5l-0.57,1.4l0.08,1.31l1.62,0.28l-0.46,0.71l0.13,0.78l-0.48,1.39l-0.17,0.13l-0.55,-0.84l-0.42,-0.04l-0.52,0.8l-1.31,0.42l-0.31,0.44l0.35,0.56l2.09,0.51l2.62,-1.45l2.77,-0.13l1.28,0.95l0.27,1.05l0.46,0.5l-0.39,2.0l-0.65,0.93l-2.88,1.11l-0.2,0.44l0.55,0.43l3.32,-1.18l1.62,-3.09l0.4,0.88l-0.81,1.02l-0.02,0.48l0.74,0.05l1.06,-1.18l0.08,2.11l0.79,0.03l0.47,-1.5l2.7,-1.56l1.58,-0.47l1.75,-2.18l1.1,1.16l0.11,1.17l0.41,0.37l0.42,-0.23l0.44,-1.26l-0.61,-1.55l0.95,-0.31l-0.12,-0.77l2.09,-0.44l0.43,-0.42l-0.22,-0.52l-1.22,-0.49l0.57,-0.79l0.75,-0.19l-0.26,-0.9l1.38,0.68l0.55,-0.04l-0.01,-0.81l-1.73,-0.99l-0.27,-0.46l0.18,-0.84l1.88,0.24l0.04,-0.77l-0.54,-0.57l1.18,-2.54l0.73,-0.46l0.9,0.45l0.21,0.29l-0.36,0.38l-1.22,0.63l0.02,0.67l0.54,0.14l1.95,-0.48l0.33,0.44l-0.04,1.96l0.96,-0.46l1.12,1.85l-0.73,0.43l-0.04,0.78l0.86,0.35l0.36,0.62l0.96,-0.45l0.39,0.65l-0.8,0.51l-1.66,0.19l-0.21,0.63l0.47,0.35l0.75,0.0l2.14,-0.4l0.42,1.6l1.14,-0.04l0.52,0.98l-2.36,1.42l-0.92,1.42l0.7,0.24l1.4,-1.0l0.38,0.4l2.2,-0.61l-0.85,1.46l-2.32,1.41l0.11,0.66l0.57,0.08l1.19,-0.66l2.15,-0.43l1.05,1.35l1.62,0.38l-0.28,0.54l0.17,1.08l-2.74,1.0l0.08,0.46l0.74,0.41l2.29,0.17l-0.36,1.21l0.76,0.45l1.11,0.09l1.27,1.06l-0.18,1.92l-3.04,-0.21l-1.02,-0.32l0.12,-0.37l-0.75,-0.31l-0.88,0.31l-0.07,0.62l0.68,0.62l2.26,1.04l-0.38,0.25l0.01,0.67l1.7,0.46l-0.37,0.79l0.32,0.42l1.53,0.09l0.12,0.57l-0.61,0.46l0.28,0.58l1.31,0.29l0.63,0.66l0.73,-0.04l0.69,-0.53l0.91,1.27l0.7,0.15l0.32,-0.31l-0.12,0.91l0.84,0.96l-0.69,0.62l-1.3,2.52l0.73,0.16l1.8,-1.21l2.09,-0.48l0.33,0.75l0.56,0.16l-1.39,1.57l0.03,0.96l0.49,-0.09l2.8,-2.58l0.86,0.21l1.34,2.32l2.01,0.47l1.95,-0.75l0.26,0.68l0.55,0.41l1.85,0.64l-1.09,0.97l-2.28,0.26l-1.71,1.02l-0.88,1.11l-1.35,0.1l-2.96,1.39l-1.64,0.0l-1.4,0.81l-0.33,0.82l-1.41,-0.26l0.04,0.76l1.13,0.68l-0.73,0.54l-0.18,1.19l0.47,0.2l1.05,-0.34l1.55,-1.32l2.63,-0.99l3.39,-2.32l3.51,-0.77l0.4,-0.32l-0.25,-0.51l2.26,0.29l1.26,2.19l-1.96,1.23l1.01,1.23l0.6,0.16l2.4,-1.83l1.49,-0.17l0.72,0.96l1.2,0.27l0.6,0.66l0.78,1.63l-0.44,1.24l0.27,2.43l-1.96,0.29l-0.47,0.35l0.26,0.65l1.4,0.05l1.33,0.34l-0.97,-0.15l-0.5,0.47l1.71,1.31l-1.59,1.48l-4.84,3.17l-2.37,-0.11l-1.65,0.32l-1.29,0.7l-2.55,0.22l-3.41,3.52l-2.25,1.91l-0.97,0.46l-0.48,0.73l-0.8,0.33l-3.77,0.05l-4.42,0.89l-1.11,-0.81l-4.08,-0.46l-2.14,0.05l-0.64,0.34l-3.0,-0.47l-1.69,0.29l-5.65,-0.32l-2.45,0.39l-0.91,-0.22l-1.05,0.58l-1.88,-0.04l-2.55,1.65l-2.07,4.12l-4.56,0.99l-0.13,0.55l-1.32,0.44l-0.71,0.8l-1.32,0.75l-2.3,2.93l-1.33,1.09l-3.44,-1.1l-3.24,-0.58l-0.45,0.28l0.22,0.48l1.04,0.61l1.7,0.09l3.09,1.13l0.23,0.25l-0.56,1.43l-2.75,2.62l-1.27,1.77l-2.82,2.17l-3.13,0.72l-1.57,0.78l-0.43,0.56l-2.01,1.18l-1.57,0.52l-2.55,2.99l-1.26,0.24l-1.49,1.23l-1.29,-0.17l-0.42,0.25l0.49,0.71l1.03,0.33l-3.3,2.06l-2.49,0.72l-4.4,3.31l-3.91,1.27l-0.96,-0.27l-1.58,0.17l-2.14,1.04l-6.38,0.99l-2.53,1.38l-1.68,2.1l0.01,0.6l0.45,0.44l1.11,0.28l1.08,0.06l0.91,-0.36l0.04,0.88l0.42,0.72l-3.34,0.06l-2.12,0.38l-1.07,0.45l-0.95,0.9l-2.64,-0.5l-1.98,0.21l-1.83,1.2l-0.6,0.82l-2.32,0.91l-1.0,0.92l-0.54,-0.22l-1.37,0.2l-0.61,-0.26l0.18,-0.8l2.53,-0.09l0.68,-0.39l0.13,-1.1l-0.79,-0.44l0.78,-2.45l1.55,-0.69l1.92,-1.75l0.1,-4.34l0.78,-1.67l1.41,-1.59l0.12,-1.23l0.36,0.43l0.8,-0.25l0.02,1.05l0.6,0.02l0.81,-0.51l1.0,0.84l2.05,0.6l0.55,-0.25l0.31,-0.62l0.03,-0.68l-0.45,-0.69l0.92,0.49l0.89,-0.02l0.21,-1.13l-1.71,-1.38l-0.3,-2.04l-1.42,-0.13l-0.26,-1.25l-0.29,-0.24l-0.28,0.2l-1.61,-2.21l-1.6,-0.04l-0.32,-0.43l-1.74,0.11l-0.13,-0.57l-0.61,-0.22l-0.47,0.28l-3.25,-0.75l-3.4,0.07l-2.15,-0.35l-3.0,-0.71l0.1,-0.66l-0.59,-0.67l-1.78,0.27l0.89,-2.17l-0.58,-0.52l-1.42,-0.24l0.86,-1.76l-0.23,-0.63l-1.85,-1.48l0.76,-2.22l-0.95,-0.36l-3.27,0.13l-1.34,-0.5l-0.87,-1.06l-0.89,-2.49l-0.68,-1.02l-1.66,-0.59l-2.78,0.19l-4.12,-1.47l-1.46,0.2l-0.04,1.04l-1.15,-0.12l-0.86,1.84l-0.5,-0.21l-2.39,1.05l-0.65,2.02l-1.0,0.71l-1.56,0.04l-1.03,-0.79l-3.19,0.08l-0.92,-0.67l-3.05,0.98l-2.47,-1.58l-1.0,-0.25l-0.98,0.29l-0.49,-0.89l-2.57,-1.17l-2.14,-0.05l-1.59,0.59l-1.69,-0.85l-2.84,-0.54l-0.73,-1.49l-0.37,-2.15l-1.76,-0.53l-0.45,0.39l-0.03,2.1l-140.63,-0.01l-0.67,-0.48l-0.6,-0.01l-0.59,-0.64l1.16,-0.19l0.43,-0.84l-0.17,-0.47l-0.9,0.44l-0.84,-0.16l0.25,-2.07l-0.58,-0.02l-0.81,0.86l-0.02,0.58l-0.68,0.29l-1.29,-0.43l1.19,-0.58l0.22,-0.64l-1.15,-0.05l-0.34,-0.33l-0.1,-1.34l0.61,-0.84l-0.65,-0.85l-0.73,-0.1l-0.15,0.61l0.3,0.38l-0.51,1.13l-0.66,0.48l-1.08,0.07l-1.61,-1.39l-1.33,-2.45l0.92,-1.44l-0.19,-2.02l-0.86,0.5l-0.14,1.13l-0.46,0.8l-1.75,0.06l-0.06,-0.67l-0.7,-0.23l-0.41,1.1l-0.46,-0.29l-1.61,0.07l-0.5,-0.12l1.52,-0.34l0.29,-0.63l-0.74,-0.35l-2.24,0.29l0.53,-0.54l-0.2,-0.57l-0.39,-0.11l-0.09,-1.1l-0.37,-0.3l-0.78,0.97l-1.94,0.31l-1.4,-0.48l-1.6,-1.25l0.33,-1.43l1.02,-1.15l3.36,-0.5l0.5,-0.51l-0.38,-0.35l-3.35,-0.03l-0.82,0.33l-0.86,1.11l-0.53,-0.9l-0.06,-0.81l0.63,-1.05l-0.55,-0.62l0.21,-0.7l1.66,-1.02l0.64,-0.17l0.45,0.48l0.74,0.14l1.48,1.57l0.56,-0.56l-1.16,-1.72l-1.26,-0.93l1.22,-1.51l-0.29,-1.21l-0.41,-0.21l-0.39,0.44l-0.11,0.97l-2.27,1.99l-1.47,0.56l-1.2,2.62l-0.8,-1.38l1.28,-0.86l0.08,-1.11l0.46,-0.49l0.08,-0.49l-0.48,-0.23l-1.0,0.62l0.86,-2.47l-0.35,-0.64l-1.64,0.41l-0.44,-1.87l-0.76,-0.8l-2.1,-0.85l-0.32,-0.81l0.75,-0.84l-0.19,0.51l0.3,0.54l1.84,0.96l1.12,-0.26l0.82,0.23l1.03,0.96l0.48,0.03l0.05,-0.83l-1.03,-1.04l-0.64,-0.31l-1.46,0.06l-0.64,-0.41l-0.38,-1.0l1.0,-0.53l0.02,-0.67l-1.11,-0.5l-1.6,0.67l-1.29,1.41l-0.32,1.64l-1.24,0.75l-1.65,-1.89l-1.61,-0.63l-0.17,-0.22l1.09,-1.44l0.21,-1.03l1.2,-0.23l0.84,-0.45l0.2,-0.44l-1.23,-0.35l-1.45,0.35l-1.39,-1.23l0.33,-1.48l0.66,-0.51l1.68,-3.09l1.64,-2.07l0.04,-0.46l-0.93,-0.05l-0.59,-0.84l-0.47,0.43l-0.13,1.4l-0.55,-1.98l0.36,-2.76l-0.45,-0.87l-1.65,-0.2l-0.52,-0.83l-0.76,-0.21l-0.59,-0.59l-1.71,-0.46l-2.46,-1.38l-1.1,-0.01l-0.44,-1.43l-0.87,-0.33l0.27,-0.88l-0.29,-0.5l-1.03,-0.25l0.25,-0.83l-5.99,-8.32l-0.05,-0.73l-2.12,-2.18l-2.41,-1.43l-0.86,-1.5l-2.47,-1.46l-0.53,-0.94l-0.07,-1.29l-2.58,-1.69l-2.31,0.98l-1.94,0.43l-0.24,0.62l0.24,0.43l-0.63,0.05l-0.42,0.4l-0.0,1.25l-0.4,0.68l-1.15,0.06l-2.87,1.59ZM487.59,210.08l0.47,0.08l0.0,0.0l-0.21,0.06l-0.27,-0.14ZM564.27,340.47l-1.87,-0.22l-0.02,-0.17l0.48,-0.17l0.59,0.26l0.41,-0.33l0.41,0.64ZM507.25,309.52l0.4,0.45l-0.55,0.63l0.24,-0.47l-0.09,-0.61ZM325.09,304.42l-0.29,-0.32l-0.04,-0.19l0.27,0.37l0.06,0.14ZM543.35,335.39l-0.36,-0.67l-0.03,-0.4l0.7,0.69l-0.31,0.37ZM542.65,333.85l-0.26,-0.09l-0.68,-0.9l0.67,0.03l0.27,0.96ZM645.85,327.78l0.37,0.89l-0.43,0.9l0.52,0.4l-1.01,0.11l-0.61,-0.67l-0.15,-1.92l3.02,-4.56l1.57,-1.23l0.49,1.27l-0.86,3.02l-2.9,1.79ZM646.83,329.86l1.35,-0.19l1.4,-1.28l0.15,-0.27l-0.66,-0.51l0.08,-0.49l0.84,-0.82l0.61,0.61l1.45,0.12l-0.28,0.33l0.09,0.64l-2.28,1.6l-1.36,0.38l-1.4,-0.1ZM578.3,333.68l3.21,-1.7l1.2,-0.29l0.55,-1.42l1.51,-2.31l2.14,-1.07l3.12,-2.31l4.24,-1.28l3.95,-1.86l2.29,-2.22l3.11,-3.86l3.21,-2.52l2.97,-1.72l8.34,-3.28l2.08,-0.56l3.3,-0.35l3.38,0.48l2.6,1.56l-0.83,-0.03l-0.4,0.31l1.35,1.26l-0.38,1.24l-1.45,0.45l-0.88,1.01l-2.17,1.12l-3.51,-1.04l-0.71,0.49l-1.93,-0.05l-1.31,0.63l-0.22,0.41l0.69,0.42l1.33,-0.33l2.57,0.96l1.21,1.55l0.9,-0.07l2.03,-0.95l0.15,0.27l1.09,0.15l-0.78,2.0l-1.95,1.61l0.01,0.65l0.74,0.38l1.49,-0.17l-0.14,1.41l0.34,0.8l0.48,0.31l0.54,2.07l0.72,0.8l2.8,0.42l-0.46,0.22l0.02,0.73l1.73,1.0l1.12,-0.04l1.26,0.79l2.45,-0.03l0.32,0.69l1.55,0.11l2.33,-1.33l0.83,1.1l1.74,0.01l0.56,0.78l-0.84,0.82l1.18,0.35l-10.3,3.71l-1.72,-0.13l0.09,1.16l-0.72,-0.13l-0.89,-0.83l-0.79,0.48l-1.03,0.07l-0.5,0.89l0.21,0.69l-2.83,2.82l-0.95,0.73l-0.87,0.09l-1.07,1.15l-0.84,-0.05l-0.86,-1.44l-0.69,-0.28l-0.49,0.19l-0.31,-1.51l0.43,-1.55l1.12,-1.2l-0.1,-0.27l1.32,-0.37l0.62,-0.48l0.04,-0.54l3.68,-2.1l1.43,-0.44l0.36,0.72l1.41,0.69l0.23,-1.23l1.62,-0.55l1.6,-0.12l0.66,-0.7l-0.33,-0.32l-3.78,-0.29l-2.54,0.0l-1.02,0.43l2.79,-2.54l-0.4,-0.59l-0.65,0.11l-0.63,-0.7l-0.68,0.19l0.13,0.86l-0.69,0.82l-5.53,2.61l-0.5,-0.27l0.14,-0.85l-0.48,-0.07l-0.8,0.52l0.01,0.77l-1.08,0.62l-0.55,-0.2l-1.52,0.43l-0.32,-0.46l-1.68,-0.35l-0.49,0.18l-0.33,-0.33l0.18,-0.5l-0.25,-0.66l0.32,-0.53l-0.35,-0.98l-0.89,0.02l-0.65,-0.52l-0.24,-8.63l-2.39,-1.79l-3.51,0.89l-0.33,-0.21l-0.29,-1.19l-0.99,-0.24l-0.41,0.15l-3.9,4.86l-0.37,1.79l-0.94,1.31l-0.23,2.12l-0.64,1.04l-1.36,1.13l-0.1,0.78l-0.68,0.6l-2.43,0.29l-0.93,1.64l-14.28,0.02ZM496.0,27.1l3.35,-1.66l0.31,-0.49l-0.37,-0.56l-4.18,-0.25l-3.36,1.02l-1.46,-0.71l3.39,-1.64l2.27,-0.6l5.68,-0.49l4.18,-1.79l2.5,-0.43l3.17,0.48l1.97,1.18l1.27,-0.9l0.94,-0.19l2.24,0.3l2.65,0.9l3.16,-0.35l0.35,-0.65l-0.85,-0.63l-6.44,-1.82l3.18,-0.74l2.72,-1.44l1.82,-0.52l2.56,0.92l3.91,0.58l2.93,2.27l2.03,0.85l1.5,0.16l0.55,-0.56l-0.19,-0.52l-1.84,-1.01l0.55,-0.15l4.81,1.56l7.31,1.77l3.91,1.53l0.19,-0.69l-1.15,-1.03l-2.61,-1.21l-6.82,-2.03l-2.67,-1.05l-2.04,-1.28l3.74,-1.06l-0.11,-0.68l-1.68,-0.72l1.97,-0.08l3.97,0.83l0.32,-0.81l-1.67,-1.59l0.42,-0.15l1.68,0.12l3.01,0.8l5.37,0.4l1.46,-0.06l0.36,-0.27l-0.51,-0.7l-4.3,-1.14l-1.87,-1.04l0.54,-0.14l3.53,0.07l3.32,0.53l2.91,-0.19l2.37,0.28l5.32,2.65l1.29,1.42l1.15,0.33l2.32,-0.94l0.12,-0.62l-7.44,-4.47l6.23,-0.44l6.73,0.43l1.02,0.28l2.48,1.72l2.24,1.04l3.22,0.66l0.45,-0.23l-0.13,-0.48l-2.97,-1.57l-0.86,-0.63l0.11,-0.46l2.8,-1.2l3.69,-0.31l5.68,2.59l0.48,-0.26l-0.15,-0.59l-1.92,-0.97l2.09,-0.67l4.54,-0.23l2.46,1.27l5.48,0.15l2.51,0.62l7.0,0.21l-1.54,0.77l-7.83,1.81l-0.78,0.73l0.37,0.32l5.55,-0.19l8.49,-2.2l2.16,0.53l1.18,-1.17l0.77,-0.12l2.14,1.56l2.67,-0.64l1.92,0.29l-0.53,0.59l0.08,0.48l2.72,1.77l-0.84,1.08l0.51,0.56l3.88,-0.86l3.89,0.38l1.02,0.24l1.1,1.25l-0.2,0.46l-4.48,2.84l-7.16,2.42l-4.93,1.36l-3.46,-0.09l-2.36,1.18l-4.67,0.35l-1.61,1.63l-9.01,2.31l-0.43,0.62l0.3,0.55l1.04,0.16l14.35,-2.99l4.25,-0.03l-3.19,1.81l-4.21,1.66l-2.15,1.28l-9.73,4.33l-4.68,3.48l-0.81,0.17l-1.92,-0.33l-2.54,-1.54l-0.82,-0.03l0.18,0.86l2.15,2.64l-5.97,1.0l-2.29,0.07l-1.02,0.52l0.21,0.65l2.39,0.43l3.84,-0.6l1.0,0.18l-0.61,0.51l-2.99,0.99l-0.27,0.42l1.14,0.6l-1.05,0.73l-2.88,0.69l-2.27,0.08l-5.2,-1.54l-3.52,-0.6l-1.39,0.06l-1.46,0.47l-0.27,0.37l0.94,0.63l5.35,0.66l1.06,1.12l-0.04,0.66l-0.83,0.46l-2.08,-0.07l-1.67,0.42l-6.62,0.57l-2.83,-0.67l-4.28,-0.45l-0.34,0.65l0.49,0.42l2.68,0.8l1.07,1.06l2.53,0.96l2.69,0.44l2.76,-0.31l-0.17,1.34l-3.18,0.09l-3.57,-0.93l-7.56,0.68l-6.05,-0.2l-0.34,0.58l0.43,0.45l3.38,1.26l7.04,-0.91l2.17,0.42l1.56,1.1l3.46,0.34l2.97,1.2l-0.4,0.83l-1.44,0.72l-7.92,0.41l-0.22,0.42l0.33,0.33l5.66,1.6l-1.51,1.01l-1.54,2.23l-0.36,0.13l-1.87,0.02l-3.17,0.7l-2.47,-0.22l-3.19,0.21l-0.42,1.31l0.06,3.42l-0.89,0.96l-0.99,0.44l-7.1,0.73l-3.31,-0.16l-5.54,-2.28l-0.47,0.72l1.48,1.45l-3.14,0.31l-0.43,0.41l0.13,0.44l1.2,0.78l1.8,0.05l2.11,-0.59l2.11,0.25l2.39,1.07l1.64,-0.5l2.02,-0.02l0.58,0.29l0.15,1.92l0.64,0.56l2.29,0.59l2.47,-1.02l1.24,1.14l0.06,0.77l-1.34,1.71l-6.19,2.73l-5.96,1.39l-1.06,-0.05l0.8,-1.99l-0.92,-1.01l-1.24,-0.51l-2.63,0.2l-1.61,-1.42l-1.35,-0.25l-1.14,-0.73l-0.48,0.09l-0.03,0.49l1.53,2.13l-7.97,0.13l-1.55,-2.18l-0.43,-0.17l-0.3,0.36l-0.24,3.06l-4.06,0.5l-2.63,-0.45l-2.16,-0.88l-1.79,-1.62l-0.99,0.87l-0.53,1.25l-2.93,-0.64l-0.61,-1.28l-0.45,-0.22l-0.32,0.38l-0.03,1.69l-3.89,-0.18l-0.42,-3.51l-0.32,-0.38l-0.44,0.22l-0.6,1.3l0.28,2.07l-4.37,-0.54l0.1,-1.41l0.2,-1.56l5.37,-2.86l5.22,-0.34l2.97,-0.57l-0.01,-0.7l-1.38,-1.26l-1.84,-0.54l-1.6,-1.42l-1.46,-2.24l0.22,-0.39l1.18,-0.5l3.6,-0.59l3.11,0.88l1.0,0.63l3.01,3.13l4.6,1.16l3.97,-0.33l1.98,-0.6l3.69,-3.23l1.32,-1.87l0.37,-1.18l-0.15,-0.42l-0.44,-0.02l-4.29,4.09l-1.7,0.92l-1.79,0.09l-1.82,-0.41l-1.82,0.65l-1.75,-0.49l-0.01,-1.99l-1.13,-1.69l4.32,-2.68l1.82,0.22l0.45,-0.29l-0.24,-0.48l-1.61,-0.81l-1.55,0.04l0.55,-2.69l-0.26,-0.46l-0.49,0.19l-1.2,2.35l-1.9,1.78l-0.74,0.32l-2.32,0.23l1.08,-2.27l-0.13,-0.48l-4.31,2.07l-3.09,0.19l-0.7,-0.32l0.24,-2.29l2.65,-2.66l0.7,-1.15l8.93,-1.51l8.82,1.59l1.6,-0.83l4.3,-0.24l1.99,-1.01l0.31,-0.44l-0.36,-0.59l-3.55,0.81l-8.63,-0.63l-1.2,-0.36l-0.52,-0.52l1.06,-0.17l2.23,0.72l1.66,-0.19l-0.53,-0.86l-2.77,-1.56l-5.5,-5.05l-4.02,-0.72l-1.73,-1.25l-0.35,-1.87l-0.57,-1.18l0.49,-1.3l0.76,-0.56l5.71,0.54l5.62,0.11l1.62,0.37l5.29,2.74l5.07,3.57l3.47,0.87l3.03,0.07l1.86,-0.76l0.21,-0.42l-1.17,-0.44l-3.62,-0.15l-4.24,-3.0l-2.43,-1.29l-3.08,-2.41l1.89,-0.48l7.98,-0.83l4.75,-0.99l2.3,-1.45l6.21,-1.59l7.78,-0.96l0.37,-0.4l-0.31,-0.54l-9.12,-0.71l0.29,-0.64l1.63,-1.39l3.78,-1.83l2.67,-0.83l0.74,-0.54l0.13,-0.49l-0.45,-0.23l-5.56,1.21l-3.99,2.21l-2.4,0.42l-1.15,1.07l-0.74,1.53l-0.97,0.69l-1.86,0.91l-4.42,1.28l-6.9,1.1l-1.79,-0.07l2.84,-1.74l0.1,-0.46l-0.4,-0.24l-6.14,0.72l-4.12,2.07l-4.64,0.19l-2.86,-0.69l-2.72,0.17l-1.51,-0.55l1.64,-1.37l5.04,-2.33l2.85,-0.64l6.78,-0.73l0.61,-0.74l-0.38,-0.6l-12.82,1.37l-2.39,1.05l-5.53,3.31l-1.82,0.15l-6.07,-1.76l-1.32,-0.81l3.82,-0.73l5.23,0.13l4.71,-0.57l7.2,-2.57l0.96,-0.95l-0.36,-0.3l-2.47,0.02l-2.47,0.55l-3.78,1.42l-3.27,0.49l-8.21,0.27l-2.62,0.4l-1.03,-0.08l-1.47,-0.87l1.76,-0.68l1.63,-0.19l0.5,-0.53l-0.29,-0.35l-1.77,-0.51l4.73,-1.76l5.06,-0.09l0.48,-0.42l-0.3,-0.57l-4.61,-0.48l-2.61,0.29l-6.71,1.69l-0.8,-0.14ZM501.93,137.7l3.09,0.16l4.35,0.94l3.48,-0.41l0.44,-0.35l-0.17,-0.65l-3.69,-1.82l-6.24,-0.77l-3.05,-1.24l-0.6,-0.47l-0.86,-3.8l0.37,-1.05l1.44,-1.22l-0.29,-0.64l-0.71,-0.42l-0.02,-1.35l2.55,-3.74l0.65,-2.9l1.17,-1.3l1.05,-0.56l0.38,-0.95l2.67,-1.85l2.22,-1.22l4.78,-1.08l4.09,-0.16l4.19,0.41l0.43,0.27l0.07,0.2l-3.53,2.24l-1.71,1.54l-3.23,4.34l-0.27,1.35l0.41,1.1l1.34,1.84l-0.09,3.18l0.71,2.35l2.45,2.51l3.44,2.33l-1.55,0.89l-2.75,0.6l-2.76,1.15l-0.59,0.3l-0.11,0.64l0.58,0.31l1.17,-0.26l3.43,-1.26l2.62,0.0l0.12,0.78l0.99,0.59l0.7,-0.34l0.27,-0.77l0.64,-4.92l-0.43,-0.63l-0.72,-0.26l-2.46,-0.32l-1.25,-1.54l-1.23,-0.95l1.4,-0.68l1.0,-1.19l1.39,0.13l3.42,1.58l0.35,0.08l0.49,-0.5l-0.44,-0.64l-2.25,-1.66l0.81,-0.36l-0.16,-0.8l-1.26,-0.3l-1.49,0.22l-0.99,-0.47l-1.09,-1.48l-0.09,-1.36l0.82,-1.22l0.71,-0.19l5.04,1.5l0.51,-0.47l-0.34,-0.67l-5.67,-2.19l1.93,-1.95l1.95,-0.5l1.04,-0.65l1.5,-0.03l1.52,0.4l0.52,-0.41l-0.56,-0.88l2.15,-0.83l3.77,-0.96l3.56,-0.0l1.65,0.32l1.14,0.81l1.03,2.85l0.65,0.68l2.07,1.12l0.1,1.93l1.46,1.5l-4.78,4.17l0.12,0.73l0.44,-0.01l2.48,-1.63l-1.43,1.64l-0.09,0.52l0.57,0.55l-0.63,0.78l0.25,1.67l1.07,-0.18l2.16,-2.12l0.94,-0.52l1.43,0.32l0.26,-0.66l-1.02,-1.19l1.01,-0.71l1.08,1.21l1.07,-0.19l0.5,-0.41l1.16,0.83l0.11,2.32l1.26,1.12l1.16,0.53l0.35,-0.73l-1.35,-1.84l0.19,-1.34l0.38,-0.51l1.21,0.61l1.54,0.0l2.07,0.96l1.07,0.02l0.4,-0.5l-0.4,-0.68l-3.73,-1.32l-0.8,-0.79l0.49,-0.83l2.92,-1.16l4.25,0.04l3.59,1.43l2.46,0.01l1.98,0.83l0.75,0.84l0.32,1.07l-1.6,1.63l-0.85,0.41l-1.93,2.71l0.21,0.68l0.86,-0.35l1.18,-1.67l2.16,-1.28l1.15,-0.33l1.84,0.13l1.02,0.29l0.23,0.42l-0.39,0.87l-2.78,1.05l-1.56,0.15l-0.33,0.55l0.36,0.4l1.87,0.2l-0.53,1.05l0.13,0.93l-0.93,1.54l0.33,0.69l0.47,-0.05l1.21,-1.13l0.88,-2.39l0.48,-0.5l1.57,-0.24l1.43,-0.84l0.25,0.05l-2.3,2.75l-0.04,0.48l1.14,-0.04l1.63,-1.32l0.91,0.71l0.52,1.05l1.52,0.88l0.16,-1.02l-0.51,-1.46l1.66,-1.15l1.4,0.58l3.67,0.46l2.01,0.87l0.96,0.88l0.17,0.67l-1.27,1.13l-2.28,0.12l-3.44,2.34l-0.27,0.61l0.37,0.25l1.88,-0.1l1.5,-1.64l1.14,-0.26l1.79,0.63l1.09,-0.0l1.67,-1.16l0.62,0.32l0.1,1.09l-0.52,0.81l-1.25,1.03l-2.92,1.03l-1.49,1.2l-0.02,0.7l1.05,0.39l1.45,-1.41l0.44,0.19l-0.77,3.17l0.41,0.51l0.44,-0.19l2.15,-4.12l0.58,-0.51l1.42,-0.84l2.96,-0.95l1.24,0.54l2.57,0.17l3.44,1.42l0.46,0.69l-1.99,1.23l-2.51,0.41l-2.13,0.84l-1.85,1.09l-0.18,0.63l0.33,0.37l1.51,-0.05l1.6,-1.04l3.34,-0.39l-1.32,1.39l0.14,0.64l1.7,0.32l1.26,-1.09l1.5,-0.59l-0.04,-0.73l-0.31,-0.17l0.85,-0.81l0.9,0.28l2.4,2.17l0.78,1.46l-0.03,0.73l-2.63,-0.5l-1.29,0.07l-1.77,1.13l-1.52,0.02l-2.41,0.66l-0.85,0.79l0.4,0.54l3.69,-0.58l3.08,1.05l3.4,-0.01l2.27,1.06l0.29,0.84l-4.27,-0.1l-1.89,-0.66l-1.22,0.38l-1.14,-0.24l-1.09,0.24l-2.23,1.0l-0.06,0.69l0.58,0.22l2.88,-0.81l1.33,0.33l1.63,0.7l-0.47,1.62l-2.02,-0.5l-2.05,0.3l-3.11,-0.58l-0.35,0.15l0.11,0.71l2.42,0.95l3.33,0.49l0.22,0.7l1.19,0.9l1.56,-0.19l1.03,0.46l2.34,0.29l-0.5,0.68l0.99,1.27l-0.44,1.06l0.3,0.51l0.86,-0.33l0.03,0.31l0.66,0.28l0.51,-0.87l-0.06,-0.86l1.2,-0.32l-0.21,1.5l-1.3,1.79l0.69,0.52l0.89,-0.22l1.29,-1.46l0.17,0.58l0.57,0.3l1.61,-0.48l-0.16,1.58l0.81,0.98l0.52,0.07l0.23,-0.52l-0.18,-1.38l1.97,-1.21l-0.93,1.33l0.32,0.71l1.28,0.18l1.01,-0.45l2.19,1.76l0.87,-0.12l0.25,0.23l-0.85,0.8l0.21,0.76l-3.03,-0.01l-0.36,0.31l0.2,0.44l1.53,0.44l0.42,0.42l2.65,-0.07l1.29,-0.93l2.11,0.83l-0.79,1.56l-2.15,1.63l-0.15,0.44l0.37,0.28l3.8,-1.08l2.91,0.36l1.48,-1.16l3.67,3.06l-0.64,0.26l-2.04,-1.0l-1.26,0.34l-0.09,0.67l2.37,1.19l0.27,0.54l-1.13,0.39l-1.26,-0.19l-1.15,-0.63l-1.19,0.04l-0.14,0.65l0.48,0.49l-0.44,0.58l0.19,0.55l2.13,1.06l-2.16,-0.19l-0.53,0.24l0.07,0.65l0.99,0.95l-1.02,0.89l-0.25,0.61l-2.12,-0.14l-1.37,-1.54l-0.7,0.18l0.23,0.97l-0.92,0.22l-0.3,0.4l0.29,0.48l1.23,0.31l-0.05,2.88l-0.91,2.0l-1.18,-1.28l-1.07,-0.17l-0.5,0.33l-0.54,-0.49l0.34,-1.64l-0.4,-0.52l-0.66,0.47l-0.95,1.65l-2.3,-2.46l-1.41,-2.39l0.9,-1.07l1.78,-0.73l0.94,-1.52l1.04,-0.94l-0.12,-0.73l-1.43,0.35l-1.73,1.73l-1.96,0.66l-1.89,-0.02l1.0,-1.08l-0.12,-0.65l-2.08,0.59l-1.99,-1.15l-1.6,-2.36l-1.4,-0.7l-0.26,0.8l-1.08,-0.28l-0.58,0.3l0.59,1.89l-2.91,-1.53l-0.6,0.42l1.03,2.14l2.39,1.76l-0.47,0.43l-2.13,-0.3l-3.17,-2.37l-1.83,0.38l-0.26,0.37l0.26,0.38l1.42,0.23l1.08,0.68l-0.25,0.95l0.42,0.77l1.48,0.81l-0.39,1.36l0.23,0.45l0.64,0.1l1.48,-0.62l0.65,0.36l0.88,1.06l-0.63,0.45l0.26,0.61l1.15,0.72l0.44,1.24l0.76,0.22l0.64,2.03l0.42,0.23l0.45,-0.38l0.04,-1.04l1.41,0.85l-0.29,0.67l0.55,0.58l0.69,-0.04l1.04,-1.19l0.6,0.18l1.3,1.2l0.53,-0.04l0.32,0.31l-1.08,0.88l0.44,0.57l1.82,0.1l-0.47,0.73l-1.8,-0.03l-0.24,0.71l1.3,0.66l0.83,0.92l0.06,0.72l1.01,0.25l1.27,-0.18l-0.33,0.21l0.02,0.69l1.02,0.09l0.54,1.06l-0.55,0.45l0.32,1.79l-0.13,1.31l-1.67,-3.08l-1.07,-1.02l-0.48,-0.05l-0.18,0.44l0.81,2.6l0.12,0.78l-0.29,0.73l1.74,2.49l-1.53,-0.51l-0.61,0.24l0.48,2.23l-2.05,-1.77l-0.89,-0.52l-0.62,0.05l-1.83,-1.44l-0.33,-0.08l-0.27,0.86l-0.35,-0.14l-1.16,-1.82l-0.43,-0.14l-0.29,0.85l-1.18,-1.16l-1.01,-0.04l-3.54,-3.39l-0.48,0.04l-0.1,0.47l0.65,1.65l-3.16,-2.1l-2.39,-0.09l-0.26,0.85l0.62,0.88l3.36,3.46l2.03,0.71l0.18,0.69l1.8,0.72l2.0,1.72l1.65,0.74l1.85,2.36l1.35,0.62l-0.7,0.77l0.38,1.15l-0.89,0.2l-5.64,-2.19l-5.62,-0.84l-2.88,-1.26l-2.49,-2.77l-1.26,-0.24l-2.09,0.22l-3.89,-1.71l0.53,-0.93l-0.38,-0.23l-1.57,0.59l-1.02,-0.56l-1.72,-1.75l1.13,-0.15l1.36,-1.37l-2.05,-1.47l-2.51,-0.05l0.55,-0.9l-0.22,-0.54l-1.66,0.53l-0.82,-1.46l-3.72,-3.06l0.74,-1.05l-0.4,-0.66l-3.33,0.05l-0.47,1.13l-0.39,-1.36l-1.65,-0.29l-0.76,-1.36l-0.66,-0.22l-1.51,0.68l1.27,2.12l-1.63,0.27l-2.21,-0.69l-1.16,0.14l-0.55,1.14l-1.55,0.08l-3.64,1.12l-4.63,-1.01l-1.79,-1.88l-0.06,-0.8l0.63,-1.8l0.77,-0.63l2.67,-1.06l0.16,-0.56l-0.47,-0.93l0.45,-0.62l4.02,0.71l3.25,1.16l1.42,1.27l-0.39,1.07l0.9,0.85l0.6,-0.17l0.44,-1.74l-0.53,-0.86l-1.32,-1.06l2.51,0.21l1.0,-0.82l2.45,0.08l1.46,-0.98l1.09,-0.23l2.21,0.27l0.39,-0.44l-0.05,-0.48l-0.99,-2.03l-1.58,-1.06l-1.84,-1.95l4.12,-2.74l1.54,-1.43l1.36,-0.55l1.21,-2.54l2.06,-0.83l0.89,-1.17l-0.01,-0.6l-0.65,-0.61l-1.9,-4.07l-1.79,-2.67l-1.25,-1.3l0.09,-0.94l-0.53,-0.15l-1.49,0.61l-0.65,-0.44l-0.21,-0.51l0.47,-1.62l-0.67,-1.02l-1.63,0.04l-0.13,0.58l0.55,0.77l-1.54,-0.25l-1.08,-1.06l-0.25,-0.86l-0.46,-0.14l0.29,-0.49l-0.51,-0.62l0.52,-0.35l-0.12,-0.68l-1.08,-0.13l-1.61,1.28l-1.66,-0.33l-0.66,0.63l-3.05,1.4l-1.4,0.24l0.21,-2.1l0.63,-0.26l2.34,0.13l1.56,-1.22l0.21,-0.68l-0.94,-1.4l-3.33,-1.26l-0.18,-0.65l1.18,-0.37l0.29,-0.46l-0.32,-0.39l-1.54,-0.21l-1.18,0.96l-1.08,-0.33l0.86,-0.72l-0.08,-0.65l-1.0,-0.64l-2.72,-0.05l-0.84,-3.39l-0.63,-0.31l-2.15,0.2l-1.7,-1.14l-2.32,-2.32l-1.41,0.72l-0.89,1.47l0.59,0.7l1.94,0.63l0.53,0.9l0.03,1.14l-1.23,0.66l-2.01,0.32l-5.81,-1.49l-4.62,-0.55l-0.63,0.17l-0.1,0.71l2.32,1.02l1.57,1.46l-3.02,-1.77l-3.89,0.91l-4.36,-1.56l-3.67,0.42l-8.0,-1.35l-1.86,0.66l-2.49,-0.88l-0.77,-1.54l0.43,-1.34l-0.5,-0.11l-1.44,0.65l-2.24,-0.16l-0.46,0.63l0.13,0.26l-2.08,-0.06l-1.24,0.63l-2.52,-1.72l-2.21,-0.69l-1.79,-2.13l-0.83,-2.2ZM642.14,249.05l0.51,0.1l0.23,0.22l-0.22,-0.01l-0.52,-0.3ZM629.46,302.55l1.09,-0.1l5.26,1.11l5.31,2.54l1.43,1.16l-2.13,0.12l-4.1,-0.94l-2.56,-1.1l-0.55,-0.87l-1.11,-0.85l-2.62,-1.06ZM629.68,323.28l1.26,-1.52l-0.45,0.81l0.07,0.5l0.91,0.84l0.15,0.83l-0.5,-0.02l-0.05,-0.79l-0.34,-0.4l-1.05,-0.26ZM632.84,325.02l0.28,-0.41l3.0,0.84l-1.39,0.87l-1.41,-0.37l-0.44,-0.4l-0.03,-0.52ZM636.6,325.42l1.51,-0.21l2.49,-0.17l-2.13,1.22l-0.14,1.26l-0.98,-0.07l-0.74,-2.04ZM627.42,226.93l0.4,-0.02l0.8,0.7l-0.91,-0.39l-0.29,-0.29ZM627.36,210.92l1.2,0.03l0.12,0.12l-0.74,0.41l-0.77,-0.15l0.2,-0.41ZM624.41,217.96l2.61,-0.02l0.37,0.33l-0.08,0.66l-0.49,0.5l-2.42,-1.47ZM625.39,215.77l0.41,0.44l0.34,0.21l-0.55,-0.23l-0.2,-0.42ZM610.36,150.7l0.61,-0.25l0.5,0.01l-0.41,0.46l-0.69,-0.21ZM609.36,228.23l1.11,-1.87l0.81,0.55l-0.29,0.6l-1.62,0.71ZM596.07,208.6l2.01,0.81l0.63,0.78l-1.77,-0.33l-0.86,-1.26ZM582.09,330.79l-0.0,0.03l-0.03,0.01l0.03,-0.03ZM576.77,164.83l1.43,-0.2l4.02,0.68l0.45,0.16l0.16,1.01l-5.0,-0.11l-0.8,-0.72l-0.26,-0.83ZM575.49,161.59l-2.1,-1.37l0.39,-0.89l1.05,0.26l0.79,1.27l-0.13,0.72ZM571.51,162.6l2.53,0.74l0.23,0.33l-0.27,1.64l0.19,2.88l-0.49,1.32l-0.88,0.7l-1.86,0.69l-4.58,0.4l-1.32,-0.19l-0.67,-1.07l-0.72,-2.37l0.36,-1.14l1.4,-2.03l1.61,-1.53l1.08,-0.32l3.4,-0.05ZM545.75,114.47l0.28,-0.67l-0.52,-0.86l0.04,-1.09l0.8,-0.19l6.33,1.24l6.63,-0.07l4.23,1.41l0.99,1.37l1.3,0.5l0.97,1.47l1.23,0.59l-0.0,0.89l0.87,0.84l-1.04,0.25l-7.34,-0.74l-2.5,0.15l-4.2,1.07l-1.71,0.14l-2.03,-0.94l-1.4,-3.6l-2.22,-0.46l-0.62,-0.47l-0.11,-0.84ZM566.12,203.45l-0.75,-0.12l-1.69,-1.08l0.5,-0.32l1.63,0.76l0.38,0.37l-0.06,0.39ZM563.44,152.77l0.74,-0.14l1.9,0.36l-1.12,1.34l-0.77,0.25l-0.67,-0.36l-0.09,-1.46ZM557.5,203.63l2.67,-0.08l0.89,0.36l0.66,1.02l-1.65,0.71l-2.57,-2.0ZM556.46,151.27l0.48,-0.47l1.58,-0.39l0.29,-0.5l0.61,0.36l-2.24,1.01l-0.71,-0.01ZM552.97,156.94l0.69,-0.92l1.53,-0.62l0.73,-1.08l0.76,-0.31l-0.03,-0.68l1.33,-0.17l-0.02,0.37l-1.26,1.06l-1.54,1.99l-1.95,0.64l-0.25,-0.26ZM555.85,258.16l0.06,-0.43l0.03,-0.1l0.01,0.14l-0.1,0.38ZM550.22,260.33l0.64,-0.78l0.31,-0.3l-0.84,0.99l-0.11,0.09ZM552.29,259.02l0.63,-0.68l0.7,-1.76l0.83,0.74l0.12,0.7l-0.35,0.61l-0.25,-0.31l-0.61,0.02l-1.6,2.29l0.71,-1.15l-0.17,-0.45ZM554.51,162.98l-0.4,-0.19l0.05,-0.34l0.56,-0.09l0.25,0.23l-0.46,0.39ZM553.88,89.25l0.02,0.22l-1.19,0.39l-1.16,-0.11l3.25,-2.3l-0.89,1.18l-0.03,0.62ZM552.35,288.12l0.2,-0.08l-0.07,0.07l-0.13,0.01ZM551.71,212.06l1.1,1.37l-0.24,1.16l-2.01,3.11l-2.04,-1.54l0.04,-2.0l1.51,-1.99l1.65,-0.11ZM547.12,149.9l0.49,-0.51l0.69,-0.03l0.65,0.55l2.62,-0.65l0.67,0.46l-0.59,0.38l-1.51,0.18l-0.77,-0.21l-0.46,0.58l0.24,0.44l-2.02,-1.19ZM464.85,80.8l0.83,-0.21l0.24,-0.83l-1.88,-0.98l0.13,-0.29l5.34,-0.89l6.87,1.62l2.42,-0.02l2.64,1.35l0.21,0.7l-1.44,1.87l-0.19,0.94l1.04,-0.2l2.11,-1.5l3.49,0.03l3.81,-0.73l2.04,0.23l2.59,1.28l-3.88,-0.44l-0.6,0.64l0.43,0.72l2.91,0.21l7.84,1.4l-0.51,0.43l-4.51,0.32l-4.91,-0.75l-0.75,0.1l-0.22,0.68l0.87,0.74l2.92,0.88l2.26,0.23l2.18,1.24l0.63,0.83l1.03,0.02l1.02,0.55l0.19,0.18l-0.62,0.72l-1.57,0.98l0.37,0.59l1.69,-0.02l1.99,1.17l0.8,-0.34l0.2,-0.65l-0.27,-0.95l0.4,-0.19l2.33,1.44l2.58,-0.55l0.86,0.86l0.5,-0.1l1.12,-1.17l2.19,1.25l2.92,0.87l1.54,0.13l0.63,-0.71l-0.44,-0.73l1.77,-0.47l1.17,0.04l1.92,-0.73l2.03,-0.12l3.42,-1.67l3.43,0.7l5.47,-0.84l4.45,0.77l0.25,0.73l0.49,0.29l4.06,0.3l0.62,0.37l-0.53,0.34l-0.04,0.64l0.33,0.2l2.86,0.25l0.64,1.45l-4.39,2.26l0.14,0.58l0.72,0.36l3.05,-0.18l0.87,0.56l-2.17,0.53l-2.18,-0.68l-0.27,0.6l0.83,0.81l-0.36,1.85l-4.7,0.15l-3.54,0.94l-4.89,-0.89l-0.74,-1.01l0.05,-1.28l-2.42,-1.14l-0.48,0.17l-0.11,0.45l0.99,1.16l-0.8,1.48l-4.32,0.71l-1.86,-0.31l-1.35,-0.68l-0.44,0.33l-0.09,0.57l-1.47,-0.84l-0.68,0.7l-1.24,0.33l-1.52,-0.41l-1.16,0.25l-1.96,-0.42l-0.27,0.79l-8.31,-0.15l-0.36,-0.24l0.07,-0.38l1.0,-1.77l-0.22,-0.53l-1.1,-0.5l-0.95,0.33l-0.57,0.85l-0.62,-0.75l-1.54,0.56l-0.12,1.18l-1.53,0.64l-1.38,0.06l-3.51,-0.65l-1.71,-0.94l0.31,-0.78l-0.62,-0.3l-1.28,0.83l-0.33,0.76l-1.38,0.04l-1.99,-1.26l-0.99,-2.38l0.34,-0.19l0.1,-0.71l-1.68,-1.74l-0.04,-0.87l1.77,-2.67l-0.61,-2.22l-4.68,-5.41l-1.48,-0.22l-1.99,0.92l-4.51,-0.26l-3.31,0.35l-0.97,-1.04l-2.55,-0.9l1.38,-0.5l0.38,-0.75l-1.9,-0.05l-3.1,-1.29ZM513.14,201.88l1.19,-1.91l2.54,-1.17l0.97,-0.79l-0.53,-3.73l0.94,-3.63l0.58,-4.35l1.23,-2.33l1.03,-0.58l1.6,1.24l0.28,0.77l-0.66,1.04l1.02,0.84l0.81,1.55l0.9,-0.04l1.32,-1.56l1.08,0.69l1.05,1.31l3.01,0.71l1.42,1.39l2.8,1.52l3.03,1.05l1.25,1.67l0.54,1.66l-1.01,1.08l-0.01,0.66l1.23,0.14l1.92,-0.43l1.68,0.35l0.75,-0.5l0.92,0.78l-0.33,0.36l0.29,0.41l1.56,0.55l-3.34,2.23l-4.6,-1.62l-2.03,-0.34l-0.49,-1.77l-2.7,-0.72l-0.0,-0.83l-0.55,-0.39l-1.29,0.13l-1.59,0.77l-0.8,2.04l-1.44,1.19l-1.52,0.66l-1.6,2.17l-1.6,0.86l-2.04,0.58l-0.52,-0.92l-0.75,-3.11l-0.56,-0.64l-4.22,0.29l-1.52,0.72l-1.23,-0.06ZM539.59,280.92l0.58,-0.54l3.34,-0.15l1.73,1.79l0.23,0.65l-5.87,-1.75ZM534.48,328.45l0.17,-0.1l0.15,0.24l-0.13,-0.01l-0.19,-0.13ZM536.92,329.16l0.04,-0.58l0.39,-0.25l1.17,0.66l0.88,-0.68l0.46,1.16l-0.8,0.6l-2.13,-0.91ZM530.86,213.12l-0.96,-1.73l2.58,-3.32l1.87,0.3l1.38,-0.56l2.4,-0.27l0.97,0.19l-0.7,1.72l-4.49,3.43l-1.65,-0.25l-1.4,0.48ZM527.23,181.66l2.67,1.22l0.3,0.27l-0.26,0.56l-1.12,0.19l-0.25,-1.22l-1.35,-1.02ZM532.16,184.95l0.17,0.02l-0.06,0.03l-0.11,-0.04ZM529.08,326.21l0.37,0.1l0.17,0.1l-0.27,0.23l-0.26,-0.42ZM525.38,185.5l-1.58,-1.37l-0.33,-1.63l0.57,0.05l0.81,1.14l0.72,1.54l-0.19,0.27ZM466.13,40.6l1.5,-0.38l2.39,0.19l0.28,-0.68l-0.33,-0.35l-2.62,-1.77l0.07,-1.15l0.74,-0.25l3.41,0.41l0.86,0.39l0.95,0.97l4.92,0.14l0.38,-0.29l-0.69,-0.77l-2.89,-0.67l-1.08,-1.33l-3.31,-0.95l0.98,-1.32l1.28,-0.51l2.38,0.21l3.5,-0.88l2.63,0.18l0.75,-0.86l-0.46,-0.95l-0.81,-0.41l-3.5,-0.18l-0.33,-0.61l4.19,-0.28l1.45,0.21l3.13,0.81l1.99,1.05l3.69,4.01l3.0,1.95l0.35,1.19l4.01,1.14l1.85,-0.46l1.23,0.26l0.33,0.39l-0.31,0.61l0.25,0.43l-0.22,1.29l1.96,1.38l3.38,0.65l0.54,-0.33l-1.03,-1.64l-1.18,-0.41l-0.1,-0.96l0.41,-0.25l1.85,-0.11l2.06,0.6l0.17,1.58l-1.22,0.67l-0.27,0.42l0.19,0.59l3.61,0.65l0.92,1.39l-0.77,2.43l-0.75,0.94l0.19,0.59l2.13,-0.11l1.4,-0.62l1.44,0.12l0.59,0.23l0.81,1.34l0.46,0.21l1.57,-1.47l2.82,3.16l-0.97,0.65l-4.09,1.23l-3.13,1.38l-1.3,0.04l-0.75,1.3l-2.55,2.0l-1.11,-0.55l-0.18,-1.44l0.68,-1.45l-0.08,-0.51l-0.46,-0.17l-1.16,0.6l-0.82,0.97l-0.02,2.17l-0.38,1.06l1.3,0.68l0.04,0.48l-0.47,0.39l-0.5,-0.16l-1.74,-1.22l-1.04,0.29l-0.13,0.44l0.66,1.98l-0.82,1.94l-1.06,-0.2l-4.91,-4.48l-0.51,0.26l-0.15,0.98l2.59,3.35l-2.4,-1.3l-1.79,-0.23l-1.29,0.37l0.11,0.65l1.34,0.86l-4.97,-0.29l-4.72,-1.36l-2.07,-1.13l4.43,-0.67l0.35,-0.31l-0.53,-0.64l-6.89,-0.57l-1.38,-1.1l1.91,-0.01l0.29,-0.36l-0.25,-0.39l-3.79,-1.09l-1.09,-0.74l4.15,-1.52l2.37,-0.21l0.99,-0.49l0.6,-0.94l5.99,-0.88l0.53,-0.64l-0.4,-0.28l-4.71,-0.0l-1.27,-0.75l-1.79,-0.13l-5.73,1.82l-0.24,-0.02l0.47,-0.32l0.08,-0.61l-1.17,-0.31l-1.61,0.14l-3.36,1.12l-1.1,-0.71l-1.65,-0.39l0.12,-0.93l5.62,-1.5l0.83,-0.97l-0.39,-0.61l-4.55,0.96l-2.69,-0.22l-2.96,-1.93l-0.54,-0.67l-0.6,-1.87l4.31,0.69l5.83,0.21l0.57,-0.38l0.02,-0.77l1.4,-0.48l0.36,-0.59l-0.36,-0.28l-1.67,-0.08l-4.03,0.78l-1.12,-1.02l-2.12,0.01l-1.53,-0.73ZM514.35,164.16l1.01,-1.37l0.82,0.5l0.29,2.36l-0.8,1.31l-1.04,-0.66l0.24,-1.2l-0.52,-0.94ZM512.66,146.44l0.56,-0.22l2.28,0.31l0.23,0.29l-0.66,0.13l-2.4,-0.5ZM495.93,80.57l1.8,-0.54l0.8,0.01l0.78,0.51l0.24,0.27l-0.65,1.02l0.18,1.0l-1.3,-0.2l-1.84,-2.07ZM499.04,74.64l-1.76,0.55l-3.79,-1.23l-0.73,-0.77l0.09,-1.68l1.23,-0.33l3.25,0.62l2.11,1.5l0.05,1.02l-0.45,0.31ZM496.34,152.96l0.42,-0.22l0.29,0.15l-0.33,0.55l-0.38,-0.47ZM482.1,107.73l2.92,0.77l1.84,1.09l3.2,-0.52l2.7,0.18l2.28,0.56l1.07,0.6l-0.92,1.4l-1.88,1.57l-1.59,2.17l-1.42,0.58l-0.04,0.74l0.3,0.34l-1.63,2.17l-1.6,1.49l-1.17,0.28l-4.87,-0.81l-4.5,0.44l-0.34,0.3l0.16,0.42l2.24,0.86l0.92,0.96l0.08,0.86l-1.56,1.57l-1.16,2.27l-1.77,-0.39l-3.12,0.21l-0.34,-4.29l-1.79,-3.69l-0.19,-7.7l0.86,-0.39l3.57,0.9l0.39,-0.32l-0.26,-0.55l-0.9,-0.37l-1.09,-1.47l-0.04,-0.52l0.38,-0.42l2.67,-0.83l3.66,-0.08l1.77,-0.57l1.15,0.17ZM494.98,153.24l0.12,-0.01l0.22,0.31l-0.07,-0.09l-0.27,-0.21ZM470.31,69.69l1.39,0.41l8.36,-0.18l1.67,0.6l-0.76,0.35l-0.86,1.57l-1.37,0.15l-10.84,-0.34l-1.16,-1.0l0.41,-0.74l3.16,-0.81ZM465.05,98.52l0.92,-1.47l1.18,-0.48l0.34,-1.24l2.08,-1.55l3.08,-0.94l1.91,-0.01l1.85,0.76l2.48,1.93l1.17,1.94l-0.23,0.95l0.44,1.88l-0.43,1.6l-5.4,0.21l-2.89,-1.49l-2.98,-0.4l-1.19,-1.03l-0.97,-0.05l-0.72,-0.66l-0.64,0.07ZM473.82,89.36l1.34,-0.39l0.77,1.62l-1.59,-0.03l-0.51,-1.2ZM456.17,58.61l1.09,-0.2l3.31,0.24l4.51,1.28l0.95,0.7l0.54,0.84l1.33,0.3l2.01,-0.12l2.56,0.91l0.48,0.39l-1.65,0.76l-0.48,0.55l0.16,0.61l1.78,1.15l-1.03,0.93l-1.29,0.07l-2.84,0.83l-2.35,0.17l-2.45,0.71l-0.05,-1.03l-2.77,-1.34l2.62,-0.3l0.65,-0.56l-0.3,-0.57l-4.23,-0.84l-1.11,-0.93l-0.22,-0.75l-1.13,-0.82l1.06,-0.42l0.21,-0.58l-1.35,-1.98ZM449.92,155.81l0.31,-0.43l2.78,-0.35l2.15,-1.3l0.43,-0.67l-0.39,-0.8l0.38,-0.28l-0.13,-0.41l1.09,0.76l1.1,-0.09l-1.3,-2.22l0.34,-0.7l1.82,-0.52l1.54,0.91l-0.17,0.69l0.41,0.43l0.96,-0.33l1.77,1.43l2.9,1.47l1.73,2.82l1.12,1.22l0.85,0.56l1.34,-0.3l-1.87,0.53l-2.94,2.0l-1.44,0.36l-2.02,-0.66l-2.36,-0.05l-3.83,-1.71l-0.39,-0.87l-2.4,0.18l-0.84,-1.07l-1.72,0.62l-0.75,-0.39l-0.48,-0.8ZM469.24,103.1l0.86,-0.16l0.76,0.56l-0.22,-0.03l-1.4,-0.37ZM468.22,152.22l-0.06,-0.28l0.14,-0.43l0.05,0.18l-0.12,0.52ZM469.52,151.1l0.96,0.7l-0.2,0.73l-0.46,0.24l-0.29,-1.66ZM465.94,92.56l1.34,0.58l-0.53,0.4l-1.48,-0.18l-1.4,1.18l-0.77,-0.16l-0.11,-0.49l2.22,-0.71l0.73,-0.63ZM439.92,114.01l0.73,-0.44l1.56,-0.25l2.2,1.43l0.57,-0.2l-0.46,-1.59l-1.56,-0.91l-0.29,-0.75l2.12,-0.39l2.51,0.47l0.74,-0.67l-0.06,-0.43l3.71,1.72l5.09,-0.85l1.65,-0.61l1.17,-0.08l1.68,0.4l0.92,1.24l-0.57,0.53l-2.0,0.52l-0.59,0.57l0.35,0.8l1.55,0.18l-2.66,1.01l-3.2,2.6l-0.18,0.94l0.63,0.59l1.78,-0.85l1.93,-0.07l1.3,0.71l-0.25,0.39l0.25,0.48l1.27,0.81l-0.39,0.85l0.27,0.56l2.96,-0.68l0.41,1.18l-0.11,0.9l-1.69,1.37l1.04,1.05l-0.86,1.59l0.72,0.79l0.04,0.8l-1.53,0.39l-1.34,1.08l-1.66,0.38l-2.94,-0.3l-0.28,-0.28l-0.08,-1.13l-0.3,-0.36l-0.43,0.04l-0.83,1.2l1.34,2.78l-2.02,1.12l-1.51,-0.6l-0.95,-0.0l-2.7,-3.53l-4.51,-3.87l-2.02,-0.59l-1.23,-1.03l-1.58,0.34l-0.93,-0.29l-1.31,-1.65l-2.14,-1.02l-1.41,-1.45l0.74,-1.7l1.47,-0.8l1.23,0.16l0.73,0.99l1.13,0.65l0.91,1.23l0.71,0.43l1.03,0.08l3.12,-0.58l0.49,-0.55l0.18,-1.08l0.61,0.47l0.82,-0.35l0.2,-0.78l-0.78,-1.47l-1.49,-0.62l0.63,-0.41l1.83,0.61l0.86,-0.12l0.33,-0.37l-0.29,-0.41l-2.74,-1.42l-2.71,0.8l-2.9,-1.7ZM447.4,110.0l-0.39,0.1l-0.35,-0.0l0.55,-0.19l0.19,0.09ZM463.64,119.03l-0.62,0.07l-0.5,-0.45l0.22,-1.04l0.52,-0.2l0.98,0.81l-0.26,0.69l-0.35,0.12ZM438.14,87.59l1.51,-1.04l0.12,-0.58l-0.47,-0.36l-1.76,0.02l-0.72,-0.31l1.14,-1.09l0.69,-0.08l1.58,0.39l0.92,0.62l0.53,1.12l4.86,3.0l2.02,0.36l0.61,-0.39l-0.14,-0.68l-1.78,-1.12l2.4,-0.08l0.36,-0.39l-0.34,-0.4l-3.46,-0.62l1.25,-0.22l0.3,-0.43l-0.19,-0.42l-1.07,-0.53l-2.45,-0.4l-0.88,-0.47l0.12,-0.2l2.07,-0.87l2.82,-0.19l0.63,0.07l2.43,1.72l1.73,-0.03l0.32,-0.59l-0.56,-1.24l1.16,-0.57l2.27,1.22l2.41,0.74l-0.11,1.6l0.87,1.21l0.17,0.84l-0.61,1.42l0.23,1.28l-1.23,0.73l-0.18,0.57l0.38,0.41l2.02,0.52l0.12,1.54l-1.23,-0.37l-1.15,0.95l-0.01,1.95l0.88,1.0l-1.64,-0.8l-0.44,0.75l0.59,0.87l-3.31,0.35l-2.31,-0.1l-0.95,-0.34l-1.58,0.66l-2.89,-0.23l-0.93,-1.41l1.26,-0.14l0.37,-0.39l-0.23,-0.49l-2.64,-0.97l2.03,-0.55l2.76,-1.79l2.51,-0.3l0.44,-0.61l-0.41,-0.49l-3.68,0.18l-6.59,0.94l-1.36,-0.17l-5.49,0.97l-0.52,-0.23l-0.15,-0.34l1.63,-0.79l0.81,-0.68l0.47,-0.94l0.81,-0.07l3.41,1.29l1.77,-0.44l0.22,-0.41l-0.31,-0.34l-1.49,0.13l-0.55,-0.51l-0.37,-0.58l0.3,-0.43l-0.27,-0.64l-1.37,-0.16l-0.49,-0.43ZM459.54,103.72l0.63,-0.49l0.46,-0.03l-0.1,0.13l-1.0,0.4ZM451.16,109.99l2.23,-0.87l5.4,-0.9l-2.77,1.63l-2.01,0.11l-1.45,0.43l-1.4,-0.42ZM453.05,44.6l0.11,1.44l-0.45,1.08l-1.49,-0.53l-0.33,-0.75l-0.93,-0.55l-2.56,-0.01l-0.36,-0.99l0.21,-0.72l1.41,-0.52l3.51,0.36l0.49,0.27l0.4,0.93ZM422.32,57.55l1.07,-1.41l0.01,-0.7l-1.22,-0.61l-2.97,0.21l-0.02,-1.02l0.7,-1.49l2.64,0.13l5.74,-0.47l2.55,0.63l1.3,0.67l1.24,1.43l-0.33,0.94l0.7,1.43l0.58,0.21l0.42,-0.24l0.69,-1.28l1.9,-0.7l1.14,0.01l3.13,1.37l-0.54,0.97l0.39,0.8l1.22,0.21l2.34,-0.4l1.97,0.95l1.86,1.54l-1.08,1.14l0.46,1.95l1.13,0.43l2.1,1.71l0.54,0.92l-0.64,1.31l-3.81,0.65l-3.01,-1.01l-0.75,-0.82l-0.33,-1.17l-1.61,-1.4l-4.99,-0.95l-2.86,0.33l-0.49,-0.41l0.18,-0.34l-0.39,-0.6l-4.83,0.57l-1.41,0.65l-2.67,-0.35l-1.2,-0.59l-1.0,-1.36l0.95,-0.44l4.88,0.66l1.12,-0.24l0.68,-0.76l-0.11,-0.58l-0.64,-0.36l1.18,-0.54l0.09,-0.65l-1.03,-0.47l-2.7,0.0l1.12,-0.78l0.15,-0.45l-1.7,-1.25l-1.45,0.39l-1.85,1.52l-0.52,0.11ZM446.42,155.7l0.23,-0.19l0.22,0.6l-0.3,-0.13l-0.15,-0.28ZM444.47,157.69l0.11,-1.39l0.44,0.02l0.91,0.82l-0.21,0.74l-0.41,0.29l-0.36,-0.46l-0.47,-0.01ZM440.82,81.98l0.4,-0.09l-0.29,0.09l-0.11,0.0ZM441.49,81.81l1.02,-0.71l1.67,-0.16l-0.86,0.32l-1.83,0.55ZM444.23,141.37l1.03,0.39l-0.04,0.35l-0.88,-0.33l-0.11,-0.41ZM353.8,138.14l2.52,-1.34l9.81,-2.1l0.21,-0.65l-0.22,-0.22l2.1,0.09l1.11,-0.38l-0.2,-0.73l-1.6,-0.43l-10.9,1.46l-2.02,-0.34l1.59,-0.62l0.7,-0.93l-0.31,-0.64l-4.24,0.1l-1.32,-0.32l-0.42,-0.5l0.14,-1.73l1.71,-1.64l1.15,-0.39l0.96,-0.83l-0.06,-0.54l-1.27,-1.15l0.4,-0.69l5.58,-3.6l13.25,-4.44l1.91,0.62l0.67,1.98l-0.25,1.81l-2.0,2.32l0.11,0.84l1.12,0.04l3.16,-0.77l0.77,0.17l0.7,-0.7l0.2,-1.5l0.74,-0.77l0.89,-0.35l1.53,0.08l3.56,0.94l3.75,1.58l-0.41,0.86l-1.22,1.23l-1.45,0.77l0.12,0.71l0.99,0.47l0.48,0.01l1.36,-1.16l0.42,0.62l0.86,-0.03l1.93,-1.67l2.79,-1.17l0.31,-0.42l-0.11,-1.23l-1.82,-1.0l-0.49,-0.67l2.9,0.18l4.44,2.46l0.53,0.44l0.14,0.82l1.12,0.36l2.83,7.8l1.63,1.04l0.89,0.08l0.68,-0.9l1.81,-1.08l0.15,-1.2l-1.92,-2.33l-0.62,-2.67l-0.54,-0.77l-1.57,-5.69l0.06,-0.39l1.25,-0.28l0.04,-0.71l-0.49,-0.52l1.3,0.16l3.02,1.31l0.47,-0.02l0.63,-0.74l0.42,0.07l5.08,2.45l0.89,0.75l0.96,1.21l0.95,3.63l2.17,4.91l2.14,3.05l0.15,1.63l-1.09,2.64l0.36,0.66l1.81,1.32l1.19,1.6l1.93,1.24l2.55,1.14l0.77,-0.19l0.18,-0.53l4.66,2.77l1.57,0.06l0.44,1.2l2.5,0.08l0.43,0.76l0.33,1.83l-0.23,0.88l-0.84,-0.05l-0.7,-0.45l-0.48,-0.98l-0.6,0.02l-0.66,1.21l-2.92,-1.29l-2.08,1.24l0.02,1.4l-1.29,-0.11l-2.22,-1.08l-0.84,0.3l-0.14,0.7l0.24,0.3l1.85,1.28l-0.42,2.09l0.56,0.42l1.78,-1.57l1.65,-0.86l1.3,-0.09l0.48,0.25l-0.38,0.67l0.14,0.91l1.28,0.63l-0.27,1.03l-5.03,1.68l-2.87,0.13l-2.98,-0.5l-1.41,-0.54l-1.35,0.46l-2.44,-0.39l0.65,-0.84l-0.38,-0.63l-5.65,-0.71l-0.79,-0.42l-0.06,-1.26l-0.41,-0.49l-1.52,-0.35l-1.28,0.96l-0.9,1.47l-1.94,1.52l-4.71,0.6l-2.99,1.57l-2.62,0.72l-6.93,0.86l-1.47,-0.08l-1.01,0.42l-8.59,0.53l-0.87,-0.39l-1.57,-1.97l-0.23,-2.24l-0.72,-1.76l-3.27,-0.68l-6.63,-0.13l-4.44,-1.24l-2.86,-3.29l-0.4,-2.0l2.94,-0.79l9.97,-1.26l9.99,0.8l2.36,-0.46l1.98,0.02l0.98,-0.38l0.06,-0.65l-0.48,-0.4l-2.13,-0.95l-8.49,-2.27l-11.43,0.97l-1.68,-0.34l-3.45,0.18l-2.9,-0.23l-3.71,-2.81ZM435.02,68.68l3.8,-0.1l2.6,0.95l-4.73,0.45l-1.36,-0.35l-0.31,-0.94ZM441.45,151.89l-0.06,-0.26l0.16,0.18l-0.1,0.08ZM436.25,158.94l0.9,-0.75l0.91,0.47l-0.44,0.76l-1.37,-0.48ZM431.04,90.56l0.96,-0.93l-0.1,-0.64l-1.09,-0.45l-2.78,0.66l-0.45,-0.18l0.57,-0.66l-0.26,-0.66l-2.16,-0.11l-0.5,-0.38l0.11,-0.3l6.14,-1.3l2.26,0.22l0.42,1.75l2.04,1.41l-1.49,0.52l-0.78,0.9l-2.88,0.16ZM431.02,65.13l0.56,-0.51l0.9,-0.15l-0.76,0.55l-0.71,0.11ZM424.16,82.36l2.23,-0.5l0.22,0.87l1.51,-0.17l0.7,0.63l2.33,0.78l-1.68,0.66l-4.25,-0.02l-1.05,-2.25ZM422.82,97.28l0.97,-1.75l1.3,-0.71l1.26,0.05l0.97,0.47l0.92,1.69l-0.64,0.63l-2.33,0.46l-1.55,-0.29l-0.9,-0.55ZM422.07,160.33l1.5,0.12l0.58,0.52l-0.77,0.01l-1.31,-0.65ZM416.93,70.17l1.65,0.11l1.4,0.95l1.31,1.32l0.31,1.01l1.15,0.25l1.01,0.71l0.34,0.74l-0.14,0.62l-0.76,0.25l-2.4,-0.59l-1.6,-1.71l-2.27,-3.67ZM412.25,113.78l1.36,-1.43l6.44,-0.69l3.2,1.42l0.35,1.14l-0.14,1.01l-0.98,1.68l-1.41,1.63l-1.03,0.68l-3.46,-2.58l-0.69,-1.15l-1.83,-1.11l-1.81,-0.6ZM360.07,92.18l0.64,-0.68l0.77,-0.24l6.75,-0.72l2.54,-0.59l0.27,-0.44l-0.4,-0.34l-7.32,0.07l-0.68,-0.25l0.37,-0.47l-0.2,-0.8l2.36,-0.95l6.58,0.3l0.36,-0.33l-0.75,-0.67l-4.6,-0.6l-0.0,-0.32l1.03,-0.9l2.86,-0.61l2.26,-0.04l1.55,0.46l0.6,1.49l1.37,1.13l3.49,-0.5l2.25,0.55l3.87,2.52l-0.83,0.57l0.13,0.67l2.75,0.24l1.22,2.03l1.31,0.8l10.7,0.37l0.78,-1.07l-0.21,-1.42l-4.52,-2.02l1.9,-0.92l0.26,-0.7l-0.15,-0.69l-1.53,-1.18l-2.51,-0.82l-0.38,-0.56l2.11,-1.23l2.7,-2.53l1.08,-0.49l1.21,-0.09l1.5,0.67l-0.77,1.0l-0.0,0.48l0.65,1.72l1.63,1.17l0.25,0.71l-1.24,1.17l-0.01,0.84l0.82,0.32l2.14,-0.02l0.39,0.39l-1.45,1.63l0.23,0.62l0.76,0.02l1.87,-1.02l1.49,0.1l0.61,0.32l1.0,1.9l0.44,-0.33l0.06,-0.83l1.07,-0.59l-0.84,-1.28l0.72,-0.62l1.21,-0.33l2.41,0.51l1.26,0.6l0.63,1.83l-1.9,5.46l-1.0,0.89l-5.22,1.62l-3.49,-0.74l-3.24,0.54l-0.6,-0.13l0.02,-0.52l-0.34,-0.28l-1.17,-0.21l-3.34,1.81l-4.55,0.72l-2.83,1.78l-3.99,1.37l-3.98,0.85l-2.48,0.15l-3.22,-0.49l-2.51,-1.19l-0.73,-0.65l0.91,-0.59l4.12,-1.11l2.46,-1.01l5.99,-0.46l3.11,-1.85l0.27,-0.93l-1.0,-0.46l-2.35,0.95l-2.98,0.36l-2.05,-0.8l-1.78,1.06l-3.77,0.39l-0.38,-0.28l-0.02,-1.1l1.72,-1.31l0.25,-0.64l-1.01,-0.18l-1.38,0.34l-0.68,-0.56l-0.66,0.41l-0.47,1.54l-1.3,-0.42l-0.44,0.16l-0.12,0.62l0.74,0.93l-0.32,0.37l-2.66,1.06l-1.05,-1.15l-1.09,-0.23l-0.76,0.42l-0.71,1.05l-1.94,-0.69l-1.65,-1.29l-2.9,0.08l-2.4,-0.46l-0.28,-0.44l1.47,-1.45l6.03,-0.35l4.27,-1.53l0.7,-0.54l0.17,-0.6l-0.48,-0.31l-6.59,1.24l-3.23,-0.23ZM406.58,174.16l0.29,-0.0l-0.11,0.21l-0.19,-0.21ZM406.05,169.16l0.47,0.8l-0.03,0.24l-0.49,-0.34l0.05,-0.7ZM379.81,63.23l2.96,-1.41l4.78,-0.84l3.27,-1.5l2.22,-0.53l0.95,0.01l4.5,1.91l0.66,1.56l-0.16,0.52l-1.34,0.27l-5.27,-0.07l-2.08,-0.83l-1.94,1.22l-1.08,-0.08l-2.05,-0.93l-4.46,0.82l-0.94,-0.12ZM380.01,68.35l9.99,-1.93l3.8,-0.17l3.78,0.24l-0.48,0.6l-5.55,1.35l-0.18,0.64l0.9,0.67l2.76,0.1l0.1,1.22l-0.3,0.81l-2.3,0.78l-2.78,0.19l-3.66,0.9l-1.95,-0.19l-1.33,-0.83l-2.59,-0.93l0.3,-0.97l-0.75,-1.56l0.2,-0.94ZM372.18,80.09l1.45,-0.48l2.61,-0.2l1.65,0.7l-0.76,0.46l-4.94,-0.48ZM373.77,66.63l0.46,0.72l2.52,1.09l0.43,0.48l-2.05,0.75l-0.81,-0.01l-1.51,-0.48l-1.77,-1.5l2.74,-1.04ZM315.79,128.42l0.18,-1.02l0.7,-0.33l-0.04,-0.76l1.18,-1.63l1.99,-1.57l0.16,-2.54l2.1,-1.04l-0.13,-0.98l-0.94,-0.36l-0.16,-0.4l1.05,-1.14l0.85,-1.68l1.5,-1.01l0.55,-1.27l1.24,-1.45l-0.49,-0.85l-1.62,-0.74l-2.25,-3.88l15.66,-1.9l4.76,1.92l4.33,1.14l-0.39,0.55l0.11,0.66l0.52,0.05l1.22,-0.86l1.07,0.02l0.18,1.52l0.54,0.31l2.57,-2.19l2.03,-0.31l2.43,0.14l3.73,1.46l5.05,3.5l1.68,0.83l0.99,1.02l-0.01,0.45l-0.38,0.28l-4.9,1.61l-13.33,6.01l-2.22,3.25l-1.17,0.51l-1.68,0.16l-0.73,0.5l-1.34,5.47l-0.73,0.94l-4.09,1.04l-0.79,-0.54l-0.78,0.04l-2.18,1.72l-1.94,0.66l-1.48,0.89l-1.08,0.02l-0.94,-0.6l-1.82,-2.98l-1.85,-1.89l-6.58,-2.81l-2.33,0.07ZM331.11,86.43l1.94,-1.77l4.18,-0.58l2.4,-2.24l3.08,-1.37l0.96,-1.22l6.17,-4.28l5.38,-0.8l2.99,0.69l0.93,-0.01l0.58,-0.41l1.56,0.16l0.84,-0.5l-0.03,-0.66l-1.41,-0.51l0.64,-0.38l1.55,-0.19l1.36,0.31l3.43,1.78l-3.41,1.14l-0.71,0.51l-0.11,0.52l0.34,0.51l2.04,1.34l-1.44,-0.03l-0.58,0.64l1.46,1.88l-1.08,0.72l-3.89,0.82l-0.32,0.3l-0.21,1.61l-0.71,0.74l-1.14,0.08l-2.29,-1.24l0.18,-1.43l0.95,-2.26l-0.28,-0.58l-0.61,-0.14l-2.34,0.77l-0.73,0.97l-0.25,1.09l-1.7,0.48l-0.05,0.87l0.85,0.85l-1.03,0.88l-0.7,1.15l-0.77,-0.12l-1.37,-1.87l-0.92,0.17l-0.42,0.71l0.06,1.11l-0.49,0.76l1.06,0.86l-1.7,1.31l-2.17,0.33l-0.66,-1.68l-1.56,-2.01l-0.76,0.24l-0.67,1.51l-0.79,0.3l-3.54,-0.53l-2.47,0.93l-0.73,-0.32l0.43,-0.73l-0.25,-0.93l-0.41,-0.33l-0.65,0.07ZM348.7,92.43l3.57,-2.6l2.53,-0.94l1.85,-1.17l0.69,0.04l-1.82,2.53l-2.11,2.24l-1.34,0.61l-3.36,-0.71ZM304.86,299.15l1.07,-0.29l1.02,0.45l0.21,-0.39l-0.18,-1.54l-1.55,-0.18l-0.41,0.63l-1.09,0.1l-1.17,-1.05l0.33,-0.4l1.43,-0.18l6.14,2.3l5.93,1.15l2.89,3.93l0.54,1.34l1.13,0.82l3.21,1.31l0.8,0.81l1.63,3.26l0.75,0.03l0.21,0.5l-0.6,0.03l-0.45,0.51l-1.58,-0.33l-5.53,-2.1l-0.37,-0.22l1.39,-1.34l0.22,-1.44l-0.66,-0.25l-0.51,1.23l-2.02,0.09l-0.73,0.36l-0.78,-0.59l0.33,-0.33l-0.02,-0.57l-1.48,-0.65l0.11,-0.46l-0.58,-0.39l-2.6,-0.28l-0.03,-0.3l1.98,-0.46l-0.22,-0.8l-1.0,0.07l-0.87,-0.39l-0.7,-0.99l-1.15,-0.46l-1.1,0.41l-0.47,-1.57l-0.6,-0.11l-0.28,0.36l-0.63,-0.58l-1.48,0.18l-0.12,-0.94l-0.42,-0.25ZM318.16,299.33l0.52,0.81l-0.22,0.34l-0.39,-0.94l0.09,-0.21ZM310.07,303.42l0.08,-0.47l0.61,0.92l-0.33,-0.16l-0.36,-0.29ZM303.82,290.72l0.36,0.38l0.0,0.31l-0.15,-0.13l-0.21,-0.56ZM302.31,283.9l-0.01,-0.41l0.12,-0.19l-0.12,0.6ZM299.11,279.79l1.47,0.95l0.36,1.05l0.21,2.68l-0.35,0.56l-0.06,-2.08l-0.63,-0.36l-0.43,0.52l-1.17,-1.77l0.6,-1.55ZM298.52,283.66l0.24,0.22l0.04,0.06l-0.23,-0.2l-0.05,-0.08ZM297.76,280.11l-0.0,-0.01l0.01,-0.02l0.0,0.03l-0.01,-0.0ZM291.81,277.37l2.12,1.18l0.77,1.05l-0.22,0.1l-2.66,-2.33ZM291.2,274.44l0.56,-0.34l0.49,0.5l-0.31,0.35l-0.74,-0.51ZM282.34,280.67l1.98,-0.59l0.39,0.17l0.49,1.27l-1.3,0.07l-0.28,0.2l0.13,0.71l1.99,0.98l-0.32,0.6l0.26,0.58l-2.53,-2.18l-0.31,-0.48l0.53,-0.71l-1.03,-0.62ZM286.48,285.6l0.38,0.11l-0.07,0.33l-0.24,-0.3l-0.07,-0.14ZM287.53,286.56l0.18,0.0l-0.07,0.06l-0.11,-0.06ZM278.62,273.61l1.57,0.19l0.72,0.41l1.03,-0.24l0.31,0.34l0.22,0.84l-2.06,1.23l0.02,0.44l0.54,0.32l2.12,-0.45l0.42,-1.38l-0.08,-0.87l1.48,-0.4l-1.02,2.12l-0.47,2.92l-1.55,0.48l-1.38,-0.43l1.02,0.21l0.39,-0.53l-2.4,-1.57l-0.93,-1.88l0.04,-1.75ZM247.18,150.81l0.14,-0.08l0.06,0.0l-0.14,0.11l-0.06,-0.03Z", "name": "Canada"}, "SV": {"path": "M498.24,510.01l2.69,-2.02l0.04,-0.83l0.4,-0.08l1.42,0.34l1.29,1.21l1.56,0.72l0.45,0.73l1.73,-0.66l0.63,0.49l1.16,0.09l-0.53,2.53l-0.3,0.29l-1.07,0.07l-2.13,-0.61l-1.27,0.01l-2.07,-1.0l-2.7,-0.44l-1.31,-0.83Z", "name": "El Salvador"}, "HT": {"path": "M580.72,487.14l-0.81,-0.67l-1.65,-0.68l0.21,-0.8l7.95,1.07l0.97,-0.61l1.22,-0.15l0.35,-0.43l-0.14,-0.81l-2.01,-1.72l0.36,-1.85l-0.18,-0.49l-1.81,-0.91l-1.63,-0.4l2.36,-0.52l3.23,0.95l2.16,0.25l-0.0,1.87l0.48,0.56l-0.78,1.07l0.39,0.84l-0.45,0.62l-0.82,0.19l-0.05,0.51l1.21,1.38l-0.07,0.46l-1.12,-0.52l-4.14,0.4l-2.65,-0.52l-1.45,0.14l-1.12,0.76Z", "name": "Haiti"}, "TT": {"path": "M643.52,528.92l0.93,-0.6l0.17,-1.53l-0.28,-0.7l1.93,-0.33l-0.23,0.49l0.15,2.42l-2.67,0.25Z", "name": "Trinidad and Tobago"}, "JM": {"path": "M563.41,485.93l1.71,0.33l1.05,0.69l1.72,0.54l0.44,0.7l-1.0,0.07l-1.76,-0.57l-0.62,0.65l-0.64,-0.23l-0.7,0.66l-1.05,-0.44l-1.41,-0.09l-1.43,-1.54l-1.29,-0.34l0.31,-0.37l1.7,-0.38l2.99,0.33Z", "name": "Jamaica"}, "GT": {"path": "M487.5,505.99l0.25,-2.03l0.38,-0.47l-0.62,-1.16l2.22,-3.83l6.37,-0.01l0.39,-0.45l0.03,-1.91l-0.98,-0.53l-0.55,-1.15l-1.38,-0.86l-1.27,-1.3l0.96,0.01l0.4,-0.4l0.02,-2.57l8.53,0.01l-0.29,9.94l1.99,0.17l1.41,0.63l0.77,-0.52l0.62,0.38l-4.44,3.3l-0.33,1.31l0.26,0.98l-0.81,0.76l-1.08,0.27l-0.12,0.92l-1.83,1.18l-0.93,1.04l-2.11,-0.78l-2.79,0.01l-1.09,-0.31l-3.99,-2.61Z", "name": "Guatemala"}, "HN": {"path": "M502.26,506.51l0.75,-0.7l-0.22,-1.4l0.22,-0.76l0.93,-0.43l3.59,-2.89l0.67,0.01l1.18,-0.86l0.79,-0.15l0.82,0.55l1.25,-0.15l2.04,0.36l2.93,-0.16l2.22,-1.15l2.06,0.59l2.56,-0.46l2.09,0.97l1.4,-0.13l1.06,0.86l-0.51,0.53l0.45,0.84l0.71,0.01l1.02,0.94l0.74,-0.23l0.64,0.22l0.13,-0.28l0.44,0.62l-0.9,0.17l-1.73,0.96l-1.9,0.25l-1.12,0.53l-0.66,-0.08l-1.15,-0.79l-0.91,0.32l-1.1,1.41l-0.19,0.93l-2.71,2.24l-1.32,-0.93l-0.76,0.41l-0.87,1.1l-2.16,0.14l-0.23,0.62l0.25,1.74l-0.89,0.4l-0.51,1.1l-0.93,0.04l-1.08,-1.91l-0.97,-0.13l-0.21,-0.55l0.26,-1.52l-0.56,-0.53l-1.13,-0.04l-1.02,-0.52l-1.26,0.55l-0.33,-0.51l-0.89,-0.23l-2.12,-1.76l-0.83,-0.15Z", "name": "Honduras"}, "BZ": {"path": "M502.69,498.61l0.37,-10.07l1.09,0.23l0.57,-0.32l1.77,-2.64l0.22,0.62l0.94,0.05l0.11,0.31l-0.92,3.07l0.26,0.66l-0.37,1.02l-0.11,3.45l-1.14,1.6l-0.74,0.32l-1.16,1.71l-0.88,-0.02Z", "name": "Belize"}, "BS": {"path": "M582.19,471.96l0.6,-0.57l1.63,0.08l-0.22,0.3l-2.01,0.18ZM564.14,442.52l0.07,0.5l-0.12,0.1l-0.02,-0.38l0.08,-0.22ZM560.35,454.98l0.39,-0.1l0.0,0.48l0.37,0.24l0.5,-0.1l0.02,1.4l-0.36,-0.03l-0.92,-1.9ZM558.49,452.88l0.34,-0.69l-0.2,-0.32l0.53,-0.85l0.04,-1.03l1.41,2.26l0.04,0.9l-1.0,0.58l-0.29,-0.54l-0.87,-0.31ZM556.78,441.65l0.13,-0.32l0.39,0.16l-0.34,0.1l-0.18,0.07Z", "name": "Bahamas"}, "CR": {"path": "M520.07,525.02l0.84,-1.08l3.35,1.21l1.27,-0.52l1.6,0.38l1.02,1.02l1.33,0.23l1.32,-0.39l1.24,2.39l2.84,3.21l-0.83,1.04l-0.0,2.02l0.93,0.65l-0.76,0.8l0.32,1.39l-0.64,0.41l-0.37,-1.17l-1.44,-0.72l-0.4,0.06l-0.3,0.59l0.63,0.83l-0.72,-0.17l-0.38,-0.4l0.46,-0.81l-0.0,-1.05l-0.7,-1.14l-2.53,-1.66l-1.86,-0.57l-0.68,-1.7l-2.7,-1.79l-0.72,0.35l0.14,0.77l0.47,0.65l1.25,0.66l-0.38,0.41l-0.37,0.3l-0.87,-0.94l-1.49,-0.44l-0.95,-1.69l0.89,-1.55l0.03,-0.73l-0.85,-0.82Z", "name": "Costa Rica"}, "US": {"path": "M321.51,312.91l3.17,1.24l3.48,0.32l0.75,-0.21l0.58,0.45l1.06,-0.08l0.45,0.94l-0.72,0.39l-1.17,1.57l-0.52,1.54l0.45,0.4l0.64,-0.1l-0.43,0.79l0.26,0.67l1.68,0.18l0.71,-0.37l0.44,-0.83l1.04,-0.86l-0.23,-2.77l0.76,-1.59l-1.0,-1.26l0.19,-0.48l-0.73,-0.93l0.28,-0.43l-0.26,-1.75l-0.77,-0.33l-0.29,-0.68l140.63,0.01l0.4,-0.39l0.03,-2.05l0.58,0.07l1.0,3.41l0.67,0.6l2.89,0.55l1.75,0.87l0.97,-0.07l1.0,-0.52l1.68,0.04l2.33,1.07l0.74,1.14l0.81,-0.36l1.09,0.16l2.69,1.63l0.8,-0.02l2.28,-0.96l0.91,0.68l3.16,-0.07l1.02,0.77l-3.65,1.26l-1.88,1.09l-5.91,4.78l-0.02,0.76l0.69,0.46l2.78,-0.39l3.13,-1.26l-0.7,1.57l0.14,0.63l1.36,-0.29l1.13,0.51l0.83,-0.11l2.57,-1.26l2.59,-0.58l2.09,-1.04l1.08,-0.99l0.82,1.06l0.15,1.4l0.54,0.07l1.08,-0.9l1.98,0.39l0.58,0.32l1.68,2.04l1.72,-0.09l0.47,0.34l1.54,0.21l2.57,-1.47l3.57,-0.16l1.77,-0.47l-0.21,1.21l0.42,0.55l2.58,0.45l0.83,-0.41l0.48,1.05l-0.12,0.72l0.94,0.3l0.18,0.5l-2.01,-0.13l-0.7,-0.37l-0.64,0.33l-0.26,0.71l-1.43,-0.98l-2.06,-0.41l-1.26,0.77l-2.63,0.21l-1.2,1.11l-0.53,-0.65l-1.14,0.22l-0.57,0.76l0.03,-0.97l-0.68,-0.11l-0.66,1.39l-2.54,3.44l-0.15,0.83l-1.04,0.6l-0.86,1.58l-0.15,1.01l0.74,0.45l1.13,-0.74l0.82,-1.12l0.5,-0.14l0.26,0.25l-0.93,2.31l0.0,1.2l-0.88,1.36l-0.01,1.59l-1.04,3.06l0.08,1.53l0.52,1.33l-0.03,3.71l1.28,2.82l1.31,0.91l1.6,-0.18l2.06,-1.18l1.85,-2.94l0.65,-2.21l0.06,-1.63l-1.62,-4.6l0.51,-1.02l-0.37,-1.57l1.05,-1.53l0.25,-2.31l0.6,-0.28l0.29,-0.9l1.01,-0.36l0.59,-0.61l0.01,1.5l1.03,0.24l0.87,-1.74l0.03,-1.45l2.16,-0.77l0.11,-0.55l-0.79,-0.68l0.66,-0.98l0.67,-0.11l2.45,0.87l0.87,0.85l3.02,1.07l0.59,0.99l-0.47,0.25l-0.18,0.57l0.78,1.4l-0.16,2.39l-0.89,0.6l-0.43,1.17l-1.46,0.8l-0.33,1.56l0.64,0.78l1.29,0.3l1.2,-0.84l0.93,-1.39l1.36,-0.51l0.89,0.62l1.44,5.57l-0.32,1.53l-0.1,0.24l-0.61,-0.26l-0.79,0.4l-0.58,1.63l-1.04,0.7l-0.46,1.52l-0.85,0.97l-0.47,1.25l2.1,1.0l0.32,0.94l2.04,-0.01l0.77,0.36l2.0,-0.57l2.15,-0.15l2.51,-1.58l4.58,-1.66l4.22,-2.16l2.03,-1.39l1.41,-1.42l-0.18,-1.92l-0.77,-0.34l0.02,-0.49l4.11,-0.6l3.26,0.79l3.09,0.0l1.33,-0.54l1.21,-0.98l1.17,-0.25l0.47,-0.54l-0.21,-1.52l0.78,-0.89l-0.82,-1.14l2.0,-1.3l0.39,-0.78l1.78,-1.55l1.97,-1.19l17.64,-0.21l1.11,-1.73l0.86,0.11l0.68,-0.41l0.8,0.35l0.43,-0.86l0.64,-0.25l0.03,-0.88l1.31,-1.05l0.69,-1.13l0.3,-2.3l0.95,-1.3l0.29,-1.62l3.69,-4.59l0.38,0.09l0.16,0.96l0.77,0.52l0.79,0.03l2.53,-0.94l2.15,1.54l0.17,7.28l-0.35,1.42l1.9,1.06l0.04,1.81l0.98,0.94l0.74,-0.17l0.1,1.55l0.37,0.37l-0.54,0.49l-1.79,0.22l-0.49,0.51l-0.99,-0.07l-0.9,0.94l-0.85,-0.56l-1.66,0.31l-0.39,0.98l-0.32,-0.11l-0.12,-1.11l-0.63,-0.34l-0.98,0.84l-0.74,2.29l-0.51,0.44l-1.21,0.3l-1.16,-0.2l-0.88,1.04l-0.53,-0.28l-1.31,0.69l-0.46,0.59l0.1,0.56l-1.35,1.42l-1.19,1.91l-0.48,1.49l0.56,1.36l-1.58,1.56l0.05,0.59l1.52,0.6l1.05,2.4l0.85,0.62l-0.79,0.4l-0.05,-0.56l-0.51,-0.39l-2.2,1.14l0.22,-0.77l-0.39,-0.56l-0.51,0.21l-0.57,-0.49l-0.52,0.47l-0.5,2.09l-7.21,0.62l-3.28,1.55l-1.05,0.89l0.01,-1.67l-0.51,-0.54l-0.49,-0.02l0.07,2.24l-1.71,2.32l0.42,0.98l1.07,0.15l-0.34,1.93l-1.07,2.38l-0.83,0.71l-0.12,0.72l-0.79,0.46l-0.88,1.57l-0.11,-0.76l-1.29,-0.44l-1.72,-1.43l0.41,-1.38l1.16,-0.37l0.49,-0.53l0.05,-0.87l-2.07,0.88l-1.07,1.23l0.02,1.47l0.78,1.11l0.14,1.17l1.52,1.94l-0.49,1.01l0.74,0.44l-1.58,2.35l-1.26,2.95l-0.97,0.67l1.4,-2.64l-0.26,-0.53l-0.5,-0.13l-0.39,-0.9l0.13,-0.87l-0.47,-0.52l-0.93,0.36l-0.78,-0.8l0.09,-0.29l0.99,0.09l0.34,-0.6l-1.07,-0.91l0.45,-1.98l-0.51,-0.35l0.55,-0.74l0.92,-0.05l0.35,-0.34l-0.41,-1.27l-0.56,-0.42l-0.73,0.32l-0.2,0.75l-1.12,0.13l-0.44,0.81l-0.87,0.18l0.42,0.9l-0.32,0.59l0.25,0.51l-0.08,1.95l-0.53,-0.33l-0.29,0.43l0.19,1.0l0.91,0.92l-0.93,-0.24l-0.42,-0.62l-0.58,0.01l-0.46,-0.52l-0.79,0.22l1.1,-1.65l-0.03,-0.86l-0.39,-0.36l-0.6,1.12l-0.96,0.89l-0.2,1.56l0.61,0.47l0.84,-0.12l0.33,0.44l-0.8,0.22l0.12,0.44l4.21,3.97l-0.74,0.48l-1.12,-1.13l-0.45,-0.09l-0.19,0.7l0.75,0.95l-1.53,-0.55l-1.37,-0.09l-0.39,0.24l0.09,0.45l2.92,0.99l1.22,1.66l1.32,-0.3l0.96,0.18l0.27,0.87l-0.37,1.44l0.56,1.01l-0.77,-0.33l-2.22,1.47l-0.99,-1.23l-0.38,0.38l0.04,1.57l0.34,0.43l0.59,0.08l2.45,-0.21l-0.1,1.26l0.41,0.43l0.66,-0.27l0.52,-1.24l0.04,1.15l-1.73,1.51l-1.34,-0.29l-0.24,-0.53l-0.47,-0.2l-0.8,0.57l-1.36,-0.51l-0.49,0.12l0.34,0.9l2.11,0.88l-0.35,0.83l-0.53,0.33l-1.16,-0.84l-0.52,0.01l-0.07,0.52l0.49,0.75l1.43,0.66l1.34,-0.09l-1.45,0.66l-2.06,0.08l-0.56,0.49l-0.26,-0.54l-0.45,-0.16l-0.28,0.38l0.04,1.03l-2.19,1.99l-0.25,-0.18l-0.37,0.36l-0.16,1.11l-1.75,-0.03l-1.1,0.32l-1.41,0.9l-1.53,1.82l-0.52,0.1l-0.28,0.51l0.1,0.93l-1.44,0.68l-1.06,1.17l-0.5,-0.1l-0.4,0.91l-1.91,0.82l-1.5,-0.02l-0.25,0.37l0.24,0.34l-0.83,-0.36l-0.24,0.88l0.43,0.81l-0.63,0.37l-0.33,0.87l-0.88,0.33l-0.08,0.71l-0.46,0.37l-0.37,1.03l0.17,0.38l-0.82,0.89l0.35,0.47l-0.66,0.25l-0.1,0.41l-0.29,1.98l1.37,5.68l2.47,5.28l-0.38,0.46l0.46,2.11l3.22,7.28l0.34,1.36l-0.37,4.82l-0.85,1.44l-0.34,1.55l-0.41,0.38l-1.84,0.31l-0.23,-0.6l-0.69,-0.34l-1.2,-2.31l-1.88,-1.04l-0.41,-0.75l-0.27,-1.52l-0.34,-0.36l0.45,-1.21l-0.47,-0.11l-0.65,0.47l0.2,-1.38l-0.32,-0.63l-0.99,0.16l-0.22,0.38l-0.63,-0.87l-1.06,-2.1l1.14,-1.46l0.15,-0.73l-0.3,-0.42l-1.44,-0.52l-0.37,0.66l0.29,0.7l-0.38,-0.3l0.45,-2.01l0.46,-1.47l-0.02,-2.46l-0.68,-1.0l-2.63,-2.2l-2.16,-2.72l-2.05,-1.04l-1.55,0.31l-0.46,0.77l-1.88,0.76l-2.12,0.41l-0.27,-0.77l-1.32,-1.1l0.02,-0.78l-0.37,-0.62l-0.98,0.5l-1.5,-0.63l0.24,-0.27l-0.18,-0.37l-0.92,-0.39l-3.24,0.63l-0.14,-0.83l-0.55,-0.2l-0.71,0.14l-0.84,1.18l-0.74,-0.33l-1.24,0.74l-0.63,-0.84l-0.22,-1.09l-0.85,-0.45l-0.7,1.78l-2.49,0.05l-1.18,-0.33l-2.09,0.39l-1.41,0.98l-3.19,-1.17l-0.94,0.78l-0.41,0.77l0.14,0.53l0.74,0.46l0.77,0.22l1.47,-0.52l0.36,0.94l0.78,0.28l0.43,-0.07l0.44,-0.71l0.22,0.59l-1.41,0.71l-0.38,0.86l1.28,1.3l1.63,0.5l0.47,0.51l-0.24,0.22l-0.63,0.04l-0.48,-0.71l-1.66,-0.76l-0.56,-0.7l-1.57,-0.51l-0.52,0.36l0.54,0.81l-0.29,1.12l-0.39,-0.7l-0.57,-0.27l-1.21,0.16l-0.71,0.74l-1.16,-0.31l-0.62,-0.23l0.04,-0.51l-0.82,-1.35l-1.12,0.09l-0.69,-0.93l-1.58,-0.65l-1.06,0.47l-0.36,0.42l0.03,0.56l-0.38,0.09l-1.99,-0.21l-2.62,-1.02l-2.87,0.08l0.09,-0.92l-0.64,-0.28l-0.9,1.12l0.09,0.55l-2.58,0.9l-0.77,-0.22l-0.06,-0.74l-0.38,-0.33l-1.55,0.28l-0.29,0.45l0.59,1.7l-1.05,0.91l-0.69,1.13l-3.33,1.9l-2.03,-0.28l-0.36,0.27l-0.59,-0.59l-0.6,0.07l-0.18,0.53l0.69,1.3l-0.41,0.13l-0.34,-0.3l-0.66,0.22l-0.19,1.02l-1.47,0.21l-0.3,0.4l0.41,0.73l-0.32,0.38l-1.36,0.28l-0.05,0.55l0.59,0.75l-0.58,1.47l-1.66,-0.69l-0.13,0.47l0.39,0.94l1.07,0.44l-0.37,1.32l0.58,2.54l1.3,2.5l-0.7,0.35l-1.96,-0.86l-2.36,-0.36l-4.13,-1.76l-0.57,-1.63l-1.11,-1.55l-0.36,-2.86l-1.3,-1.03l-2.68,-3.2l-0.18,-0.96l-2.19,-3.83l-3.3,-3.22l-1.04,-0.43l-2.25,0.07l-1.89,-0.39l-1.64,0.74l-0.61,0.61l-0.81,2.36l-1.49,1.11l-3.68,-1.77l-2.02,-1.36l-1.01,-1.41l-0.3,-1.55l-1.27,-2.62l-6.36,-4.95l-1.58,-1.82l-9.2,-0.1l-0.4,0.4l-0.01,2.15l-13.99,0.03l-18.83,-6.51l0.31,-0.83l-0.42,-0.54l-11.88,1.0l-0.14,-0.52l-0.49,-0.26l-0.33,-2.13l-0.81,-1.22l-3.32,-2.59l-1.39,-0.06l-0.02,-0.56l-0.83,-1.09l-1.7,-0.05l-1.47,-0.47l-0.59,-0.81l-1.77,-0.95l-4.19,-0.28l-0.84,-0.52l-0.16,-3.08l-1.06,-0.64l-0.18,-1.14l-2.0,-1.55l-2.99,-3.75l-0.16,-1.06l0.6,-0.89l-0.05,-0.97l-0.68,-0.82l-1.32,-0.28l-1.0,-1.08l-0.52,-1.9l-0.0,-0.28l1.75,1.15l0.39,-0.59l-1.42,-2.56l3.89,-0.26l0.36,-0.35l-0.79,-0.59l-2.16,-0.25l-0.74,0.33l-1.08,-0.45l-0.93,0.58l-0.05,1.01l-1.32,-0.83l-0.02,-0.82l-1.1,-1.53l-2.94,-2.75l-0.58,-2.59l0.17,-1.5l-0.3,-1.11l-2.51,-2.91l-0.2,-1.18l0.86,-1.55l0.66,-4.41l-0.83,-2.11l0.12,-1.1l-0.77,-1.03l-0.25,-2.78l-0.63,-1.33l0.91,-2.99l0.68,-0.45l-0.16,-0.7l0.55,-1.26l1.12,-11.92l-0.09,-3.42l1.79,-0.24l1.06,0.48l0.86,-0.38l-0.2,-0.43l-1.45,-0.8l-2.57,-0.17l0.0,-0.28l0.5,-0.08l0.3,-1.51l-1.06,-1.14l1.07,-0.5l0.23,-0.41l-1.68,-0.81l-1.09,-3.83l-1.44,-1.99l-0.08,-1.99ZM600.53,354.34l0.0,-0.0l0.0,0.0l-0.0,0.0ZM565.54,376.21l1.34,0.45l1.32,1.05l-0.23,0.72l-0.34,-0.01l-2.09,-2.21ZM567.19,381.69l0.47,0.2l0.38,0.46l-0.19,-0.03l-0.65,-0.63ZM546.58,409.31l0.07,0.07l-0.02,0.1l-0.05,-0.17ZM330.49,318.83l-0.57,-0.55l1.23,-1.11l0.38,1.87l-1.04,-0.21ZM609.34,337.99l0.0,-0.0l0.0,0.0l-0.0,-0.0ZM580.89,360.6l2.41,-0.95l3.91,-0.3l0.1,0.27l-3.11,0.99l-2.68,0.36l-0.62,-0.36ZM530.89,327.73l0.08,-0.11l0.08,0.12l-0.17,-0.0ZM512.06,334.57l0.33,-0.38l-0.28,0.55l-0.04,-0.17ZM512.71,333.56l0.11,-0.21l0.12,-0.04l0.02,0.06l-0.24,0.19ZM505.9,320.05l0.92,-0.89l1.35,-0.49l0.06,0.31l-1.31,1.22l-0.1,-0.29l-0.92,0.14ZM99.81,185.08l0.47,0.25l1.71,-0.65l0.93,-0.84l1.72,-0.19l1.69,-1.48l1.69,-0.75l3.92,0.11l0.54,-0.43l-0.14,-0.62l-1.01,-0.61l1.53,-0.71l2.02,-0.26l2.97,-1.25l2.51,-0.2l0.47,0.44l-0.54,0.96l-0.02,0.78l-0.59,0.53l0.07,0.62l1.94,1.18l4.1,-0.12l1.54,0.4l4.04,-0.03l1.78,-1.88l2.33,0.69l0.21,-0.44l-0.51,-1.4l-1.87,-0.62l1.31,-0.11l2.59,1.04l2.27,-0.4l0.33,-0.38l0.0,-0.89l-0.84,-1.09l-1.59,-0.01l-1.28,-0.55l-2.69,0.98l-1.95,-1.09l-0.07,-0.52l1.16,-1.31l-0.03,-0.63l-0.65,-0.42l-1.38,-0.25l-1.83,0.22l0.01,-0.28l-0.66,-0.32l-0.75,0.62l-1.99,-0.05l-2.56,-0.61l-0.84,-0.7l-1.07,-2.33l-1.1,-1.32l-6.44,-3.84l-2.95,-0.99l-1.36,-1.04l-1.1,-0.35l0.99,-1.81l0.48,-2.5l5.5,0.0l4.72,-0.74l3.2,-1.91l1.87,-1.93l0.55,-2.25l0.66,-1.22l3.87,-3.74l0.79,0.16l5.1,-1.28l4.49,-2.62l-0.32,0.43l0.3,0.69l-0.3,0.69l0.36,0.56l0.7,0.01l0.53,0.48l0.34,-0.34l0.12,-1.58l2.04,-0.35l0.29,-0.43l-0.38,-0.35l-1.69,-0.05l-0.88,-0.77l1.26,-0.86l1.3,-0.59l0.1,0.79l0.7,0.2l1.33,-0.48l1.79,0.02l0.91,-0.39l2.84,-0.19l3.11,-1.74l3.35,-2.92l0.66,0.62l4.09,1.02l-0.02,0.48l-2.7,1.5l1.23,1.21l0.67,0.06l1.59,-0.59l1.99,-1.85l0.95,0.13l1.0,0.62l-0.36,0.47l0.12,0.64l3.05,0.88l1.67,-0.7l3.39,-0.49l2.19,0.5l1.51,-0.04l0.73,0.24l-0.76,0.65l-0.04,1.13l1.27,0.87l1.75,0.1l-0.33,0.28l0.23,0.7l3.68,0.31l2.9,-0.82l2.05,0.68l2.09,-0.69l1.53,-0.03l4.26,0.88l1.21,0.92l1.61,-0.35l1.3,0.46l1.01,0.81l3.28,0.43l1.7,-0.19l4.6,0.29l3.26,1.38l2.96,0.24l1.18,-0.53l3.37,-0.57l2.71,-0.1l2.39,0.69l2.15,1.51l3.01,0.89l1.58,1.09l1.74,-0.04l0.0,77.5l0.3,0.39l2.44,0.63l0.65,-0.52l2.14,0.78l1.79,-1.09l2.51,-0.1l-0.42,1.87l0.85,0.77l1.57,0.64l0.43,0.94l5.21,4.11l0.63,2.49l0.75,0.02l1.65,-1.05l-0.13,1.32l1.03,-0.02l1.22,0.49l0.72,0.66l0.18,0.83l1.07,0.06l0.68,1.12l-1.71,0.19l-0.72,0.59l-0.28,-0.1l-4.18,-2.27l-2.54,-2.74l-2.4,-1.35l-0.26,-0.41l-1.8,-0.51l-4.02,-1.92l1.05,-1.13l-0.23,-1.64l0.44,0.5l0.15,1.81l0.71,0.17l0.34,-1.56l0.94,0.01l0.33,-0.36l-2.46,-1.73l-0.88,-0.02l-1.98,1.58l-2.41,0.68l-2.05,-0.27l-2.34,-0.89l0.32,-0.8l-0.29,-0.75l-0.54,-0.36l-0.5,0.16l-0.09,0.63l-0.9,0.3l-4.41,-0.87l-2.08,-0.09l-5.47,0.66l-0.73,-1.04l-2.26,-0.55l-1.12,-0.6l0.97,-2.69l-0.72,-0.06l-2.25,1.91l-0.78,0.14l-1.79,-0.61l0.57,-0.89l-0.37,-0.53l-2.13,-0.06l-0.36,-0.56l-0.97,-0.05l-0.1,-0.54l-0.97,-0.43l0.1,-0.73l1.42,-0.41l0.29,-0.37l-0.27,-0.39l-1.68,-0.14l-1.98,1.13l-1.16,-0.11l-0.8,0.59l-1.34,-0.47l-0.39,0.6l-0.82,0.12l-0.23,-0.41l1.1,-1.52l-0.36,-0.63l-1.6,1.06l-1.08,0.01l-0.79,0.42l-0.22,0.32l0.19,0.56l0.4,0.04l-0.22,0.56l-0.82,0.07l-0.34,0.38l0.17,0.53l1.32,0.72l-0.11,0.34l-0.85,0.05l-0.66,0.45l-0.22,0.26l0.2,0.64l2.85,-0.62l0.28,0.24l-1.03,0.56l-0.16,1.68l-0.51,0.28l-0.51,0.95l-1.78,0.26l-1.63,-0.61l-0.54,0.2l-0.39,-0.59l-0.49,-0.15l-0.97,1.8l-0.8,-0.26l-0.54,1.05l-0.94,-0.04l0.06,0.82l-0.87,0.69l-0.62,-0.1l-0.79,0.34l-0.58,-0.2l-0.62,1.15l-1.26,1.17l-0.93,-0.32l-0.47,0.19l-0.02,0.32l-0.63,-0.1l-1.3,0.43l-1.19,-0.5l1.03,-0.8l1.61,-0.47l1.89,-2.03l0.0,-0.46l-0.42,-0.28l-2.04,1.04l-1.57,-0.61l0.52,-1.35l1.77,-2.29l0.44,-1.6l-0.22,-1.78l4.36,-2.11l1.6,0.7l2.38,-0.15l2.88,0.59l0.41,-0.29l-0.67,-0.96l-2.2,-0.42l-1.81,-0.93l1.15,-1.25l2.01,-1.01l0.23,-0.44l-0.37,-0.32l-1.58,0.09l-1.19,0.63l-0.71,0.99l-2.22,0.13l-0.95,-0.31l-3.49,2.03l-1.69,0.54l-1.07,1.06l0.01,0.75l-2.43,1.7l-0.32,0.76l0.14,0.44l-1.11,0.76l-0.74,0.18l-1.02,-0.43l-0.87,0.16l0.12,0.62l1.37,0.82l0.48,0.64l-0.5,0.66l-2.34,0.63l0.15,0.69l0.52,0.28l-0.79,0.27l-0.29,-0.46l-0.87,0.08l-1.09,0.74l0.07,0.42l-0.51,0.53l-1.62,1.04l-0.64,1.79l0.33,0.66l2.56,0.71l1.42,0.82l-1.29,1.35l-1.23,0.49l-0.87,0.75l-0.34,0.93l-0.93,0.41l-0.2,0.53l0.21,0.6l-1.39,0.23l-0.36,0.5l-1.82,0.25l-0.91,1.08l-2.22,1.07l-1.03,1.24l-1.1,0.17l-0.38,0.57l-0.72,0.07l-1.12,0.71l-0.39,0.64l0.4,0.72l-1.01,1.11l-0.62,0.07l-1.92,1.33l-1.56,0.28l-0.72,1.12l-1.44,-0.08l-0.94,0.48l-0.18,0.51l-1.65,0.52l-0.92,1.1l0.2,0.53l1.01,0.25l-0.39,0.46l-0.63,-0.54l-1.25,1.47l-3.18,1.01l-0.73,0.51l-0.6,-0.51l-0.61,0.07l-3.02,1.5l-0.53,0.61l-0.61,-0.1l-0.67,0.44l-0.79,-0.14l-1.34,0.85l-1.05,0.09l0.28,-0.5l0.66,0.09l0.42,-0.59l-0.19,-0.25l-0.86,-0.43l-1.07,-0.02l-0.88,0.55l-0.44,1.22l-1.17,1.32l-1.58,0.92l-0.72,-1.22l-0.68,-0.15l2.61,-2.67l2.26,-1.29l1.98,-0.66l0.41,0.35l0.58,-0.02l1.27,1.41l0.7,-0.12l0.14,-0.68l2.0,0.47l0.41,-0.39l-0.04,-0.46l-1.27,-0.97l1.09,-1.96l2.54,-1.72l2.52,-0.91l1.46,-1.2l1.62,0.43l0.34,-0.55l0.0,-1.45l1.62,-1.75l2.32,-1.63l1.37,0.35l0.61,-0.2l0.17,-0.59l-1.12,-1.08l0.43,-2.63l0.19,-0.45l1.59,-0.31l0.35,-0.35l-0.25,-0.42l-1.32,-0.39l-0.11,-0.83l1.34,-1.41l1.26,-0.69l-0.06,-0.7l1.08,-2.48l-0.16,-0.51l-0.53,0.11l-1.59,1.82l-5.12,1.91l-1.2,-1.43l0.09,-0.44l0.41,-0.27l1.22,0.23l0.4,-0.28l-0.17,-0.46l-1.82,-0.88l-0.72,0.12l-0.82,1.01l-0.82,-0.2l-0.42,2.15l0.44,1.6l-0.44,0.39l-3.5,-3.66l-0.75,0.06l-0.73,0.51l-2.47,-1.68l-2.3,1.32l-2.09,0.54l-0.87,1.03l-2.03,0.33l0.75,-0.62l-0.19,-1.8l0.71,-1.03l-1.72,-0.31l-0.15,-0.75l0.72,-1.08l0.21,-1.49l-2.11,-4.47l-0.79,-0.77l1.23,-2.15l0.89,-0.49l0.01,-0.71l-1.5,0.1l-2.66,3.1l0.02,0.73l0.58,0.29l-0.09,1.06l-0.82,0.06l-2.35,1.06l-3.31,0.29l-0.91,-0.52l-0.12,-0.84l-1.69,-1.15l-0.94,-1.14l-1.91,-0.77l-0.1,-0.86l-0.93,-0.22l1.68,-1.95l2.42,0.74l-0.3,1.35l0.45,0.12l1.89,-1.29l0.95,1.18l0.51,0.1l1.15,-0.68l0.55,-0.72l-0.09,-0.57l-0.88,-0.47l0.04,-0.65l-0.88,-0.55l-1.56,0.77l-5.11,-0.44l0.91,-0.52l0.24,-0.48l-0.37,-0.47l-0.98,0.1l0.03,-0.29l-0.76,-0.3l-0.26,-0.76l-0.75,0.22l-0.31,1.14l-0.32,-0.0l-0.5,-1.28l-0.96,-0.49l0.35,-0.64l-0.23,-0.83l-0.84,-0.28l-0.68,0.24l1.67,-0.7l-0.14,-0.66l-0.83,-0.32l1.78,-0.28l0.19,-0.68l-0.47,-0.54l0.07,-0.81l2.52,-2.85l0.74,-0.36l0.94,0.36l0.59,-0.22l-0.19,-0.67l0.56,-0.24l0.58,-0.97l-0.57,-0.43l-0.62,0.34l0.11,-1.53l0.42,-0.57l1.71,-0.37l-0.1,-0.6l-0.47,-0.36l0.24,-0.25l2.09,-0.24l1.3,0.7l-0.5,0.39l0.01,0.55l0.59,0.14l0.98,-0.6l1.18,0.43l1.82,-0.58l1.67,-1.22l1.8,-2.13l1.35,0.66l3.67,-0.36l1.05,-0.59l1.42,-1.41l0.33,-1.13l-1.16,-3.68l-1.93,-1.54l1.41,-0.11l0.73,-0.42l0.64,-1.0l-0.1,-0.97l-1.13,-1.33l-0.94,-0.3l-1.55,1.07l-1.66,-0.05l-0.49,0.53l-1.54,0.54l-2.74,2.39l-0.42,-1.06l-1.67,-1.12l-0.97,0.39l0.07,0.74l-1.82,-0.66l-3.13,0.02l-1.91,0.59l-0.61,-0.1l-0.93,0.59l-5.84,-1.05l-1.43,-0.96l0.37,-0.68l-0.31,-1.19l-1.56,-0.99l0.91,-0.13l0.62,-0.82l1.77,-0.27l-0.28,-0.71l-6.51,-1.21l-2.87,-1.18l-0.17,-0.49ZM131.96,178.57l-0.62,0.13l-0.11,-0.08l0.08,-0.39l0.65,0.34ZM129.77,176.2l-1.57,-0.58l-0.42,-0.77l1.02,-0.09l1.03,1.14l-0.05,0.31ZM126.91,265.27l-0.23,1.67l-0.56,0.25l-0.57,-0.56l-0.83,-0.24l-0.47,0.31l0.07,0.71l-0.19,0.28l-0.01,-1.02l0.71,-0.43l1.02,-0.0l1.07,-0.98ZM258.69,237.55l1.95,-0.47l0.57,-0.96l0.06,-1.14l0.94,-0.43l0.07,-0.83l3.61,-1.24l1.88,1.41l-0.11,1.0l0.77,1.29l2.52,1.51l0.74,1.4l2.46,1.48l1.96,2.02l0.03,0.67l5.91,8.15l-0.41,0.66l0.24,0.6l1.16,0.29l-0.25,0.84l0.24,0.49l0.88,0.34l0.3,1.26l0.42,0.37l1.16,-0.06l2.42,1.35l1.71,0.46l1.29,0.78l0.51,0.83l1.56,0.18l0.15,0.98l-0.63,1.85l0.56,2.42l-0.92,1.9l-1.5,1.44l-1.05,-0.13l-0.86,-2.16l1.22,-0.56l0.29,-0.5l-0.57,-0.48l-0.34,-2.73l-1.04,-1.57l0.41,-1.02l-0.46,-0.11l-3.87,1.54l-0.91,2.35l-0.45,-0.22l-0.26,-0.66l1.76,-2.77l1.38,-0.36l0.27,-0.42l-0.35,-0.35l-1.53,-0.19l-0.6,-0.9l-0.87,-0.36l-0.83,-1.4l-0.56,-0.22l-0.33,-0.97l-1.39,-0.79l-0.08,-1.11l-3.2,-0.96l0.09,-1.05l-0.84,-2.02l1.77,0.89l0.53,-0.09l0.02,-0.66l-1.94,-1.57l1.5,-0.03l-0.1,-0.76l-1.96,-0.36l-0.67,0.6l-1.39,-1.53l-0.03,-1.27l0.84,-1.67l-0.42,-0.55l-0.61,0.3l-1.1,1.75l-2.52,-1.43l-1.05,-2.29l-0.72,-0.55l-1.28,-4.45l-0.65,0.14l-0.67,2.01l0.55,0.8l1.62,5.81l-0.62,-0.11l-1.42,-1.16l-1.42,0.07l0.15,-1.09l-0.85,-1.46l0.84,-0.44l0.21,-0.43l-0.36,-0.32l-0.87,0.06l-0.57,-1.11l-0.64,0.29l0.06,1.73l-1.69,-1.29l-1.76,-0.53ZM285.0,265.19l-0.1,-0.78l1.01,-1.3l0.1,-1.53l1.43,-0.7l1.16,1.68l-0.52,2.55l-0.36,0.23l-0.75,-0.38l-0.07,-0.78l-0.72,-0.03l-1.18,1.04ZM286.27,266.56l0.09,-0.38l-0.06,-0.26l0.39,0.85l-0.41,-0.22ZM286.98,267.33l0.17,0.3l-0.22,-0.01l0.05,-0.29ZM275.68,261.7l0.04,-0.0l0.35,0.19l-0.18,0.01l-0.22,-0.2ZM276.58,261.93l0.6,-0.38l0.57,-0.95l-0.52,-1.01l-1.4,0.11l0.43,-0.76l-0.32,-0.84l1.45,0.1l0.56,1.63l1.67,0.66l1.03,0.99l0.59,1.2l-0.35,-0.01l-0.67,0.92l0.14,0.69l1.1,-0.03l1.02,0.83l-0.19,0.77l1.11,0.22l-0.11,2.84l-1.09,-1.3l-1.09,-0.39l-0.45,-1.29l-0.56,-0.04l-0.31,0.43l-1.08,-1.32l0.47,-0.38l-0.58,-1.05l0.03,-0.85l-1.31,-0.12l-0.73,-0.65ZM280.54,258.81l1.39,-1.79l1.0,1.39l-0.27,1.62l-0.68,0.12l-0.09,-0.57l-1.27,-0.38l-0.08,-0.39ZM276.74,265.42l0.24,-0.06l0.29,0.23l-0.23,-0.04l-0.31,-0.12ZM277.71,265.94l0.52,0.7l0.14,0.61l-0.46,-0.77l-0.2,-0.55ZM278.46,267.38l0.07,0.09l0.3,0.55l-0.25,-0.35l-0.13,-0.28ZM279.22,268.42l0.87,-0.18l-0.08,0.6l-0.23,0.13l-0.56,-0.54ZM278.87,257.49l0.32,-0.26l0.85,0.03l-0.07,0.49l-0.35,0.18l-0.74,-0.44ZM279.27,256.0l0.38,-0.91l0.64,0.64l-0.67,0.28l-0.35,-0.01ZM274.16,252.77l3.87,0.62l0.4,0.45l-0.02,1.22l-1.3,-1.33l-0.59,0.26l0.9,2.33l-1.72,0.04l-0.26,-2.27l-1.29,-1.32ZM275.48,263.85l0.19,0.04l0.47,0.03l-0.41,0.53l-0.26,-0.6ZM272.76,258.99l0.09,-1.62l0.4,-0.22l0.12,-0.6l-0.91,-0.82l-0.56,-1.06l0.06,-0.47l0.73,-0.44l0.85,0.95l0.62,0.16l0.23,0.49l-0.55,0.46l-0.45,3.0l-0.62,0.17ZM269.79,244.57l1.99,0.27l-0.26,0.42l0.22,1.2l1.68,2.24l0.04,1.38l-0.81,0.33l-0.78,1.07l-0.96,0.62l-0.18,-0.56l0.67,-2.22l-0.91,-1.32l-0.7,-3.43ZM264.84,252.18l-0.27,-1.27l0.91,-0.4l0.71,-1.18l2.01,1.19l1.65,4.18l-0.02,3.29l-0.97,-1.71l0.47,-1.25l-0.94,-0.11l-0.41,-0.29l-0.1,-0.68l-0.86,-0.09l0.68,-1.38l-0.73,-0.48l-0.23,-0.8l-0.41,-0.45l-0.6,-0.08l-0.9,1.52ZM261.72,244.6l0.54,0.46l0.66,-0.3l0.05,-0.34l1.32,-0.49l0.66,0.62l-0.48,0.84l0.58,0.51l1.53,-0.93l1.54,0.47l0.06,1.07l-1.21,-0.0l-0.55,0.35l0.01,0.68l1.83,0.37l0.2,0.92l-2.95,-1.28l-0.66,0.45l-0.19,1.33l-0.73,-0.13l-0.84,-1.63l-2.31,-1.95l0.18,-0.54l0.74,-0.49ZM208.99,227.43l0.32,-0.25l0.78,0.33l-0.85,0.37l-0.26,-0.45ZM203.17,231.47l1.01,-1.0l0.66,-0.42l-0.7,0.99l-0.96,0.43ZM205.79,229.04l0.61,-0.95l0.34,0.18l-0.95,0.77ZM202.92,228.29l0.13,-0.2l0.12,-0.48l0.06,0.13l-0.25,0.63l-0.06,-0.08ZM201.4,229.75l0.03,-0.01l-0.02,0.01l-0.02,-0.0ZM175.19,244.72l1.4,-1.03l0.98,0.13l0.36,-0.39l-0.12,-0.81l0.25,-0.08l1.16,0.65l0.72,-0.26l1.17,0.65l-0.23,0.26l-0.76,-0.62l-0.64,0.44l-0.11,0.49l-1.08,-0.25l-0.58,0.81l-1.04,0.42l-1.49,-0.41ZM168.94,251.96l-0.92,-1.76l0.72,-1.11l1.22,-0.55l0.86,0.01l1.15,1.97l0.71,0.46l0.48,-0.12l-0.58,-2.33l0.63,-0.59l-1.03,-0.91l0.19,-0.23l1.49,1.08l0.69,-0.53l1.05,-0.17l0.28,-0.98l0.61,0.15l0.02,0.9l0.49,0.35l1.84,-0.56l-0.15,0.92l1.11,0.69l-0.48,0.48l-2.71,-0.34l-0.49,0.32l0.12,0.7l1.22,0.29l-2.7,0.75l-2.55,1.63l-0.78,-0.33l-0.48,-0.66l-1.46,0.02l-0.58,0.47ZM168.99,252.11l0.34,0.43l0.53,0.07l-0.11,0.45l-0.68,-0.68l-0.08,-0.26ZM172.59,252.88l0.13,0.05l-0.15,0.19l0.01,-0.24ZM172.34,253.43l-0.11,0.14l-0.15,0.08l0.26,-0.23ZM174.9,252.33l0.03,-0.27l0.32,-0.15l-0.35,0.42ZM162.0,476.41l2.89,1.32l0.52,1.03l1.24,1.17l-0.94,0.68l-1.37,0.36l-1.15,0.8l-0.4,0.68l-0.86,-0.52l0.05,-1.42l-0.72,-1.78l1.03,-1.21l-0.28,-1.11ZM157.93,472.28l0.09,0.07l0.31,0.38l-0.45,-0.35l0.05,-0.1ZM158.79,472.87l0.75,-0.17l1.0,0.67l-1.39,0.38l-0.37,-0.88ZM156.39,472.94l0.0,0.0l-0.0,0.0l-0.0,-0.01ZM149.99,469.25l0.86,-0.5l0.49,0.96l0.64,0.47l-1.17,-0.55l-0.3,0.32l-0.52,-0.7ZM142.16,466.42l0.69,-0.53l0.91,0.11l-0.44,0.89l-1.16,-0.47ZM140.51,266.38l0.09,-0.12l0.02,-0.0l-0.09,0.11l-0.03,0.01ZM136.74,264.95l0.58,0.44l0.16,0.32l-0.75,-0.07l0.01,-0.69ZM135.34,240.76l0.42,-0.41l0.25,-0.09l-0.38,0.6l-0.29,-0.1ZM122.47,267.59l0.61,1.3l-0.73,0.57l-2.68,0.09l-2.03,1.38l-1.56,-0.05l-0.13,-0.58l0.85,-0.57l1.05,-1.44l1.1,0.01l2.23,-1.0l0.91,-0.01l0.38,0.3ZM103.3,229.09l2.32,0.09l0.71,-0.79l2.59,-0.58l0.74,0.47l1.36,0.05l-0.03,1.53l0.56,0.91l-1.51,0.13l-1.13,0.7l-4.64,-1.6l-0.98,-0.92ZM109.88,273.55l0.27,-0.32l0.5,0.19l-0.23,0.11l-0.54,0.01ZM101.42,279.05l0.19,-0.06l0.45,-0.04l-0.56,0.13l-0.08,-0.03ZM104.34,277.95l0.65,-1.12l0.97,0.33l0.38,-0.49l0.04,-0.66l-1.68,-0.5l-0.03,-0.27l1.68,-0.54l0.32,0.88l0.38,0.09l-0.33,0.71l0.34,0.32l-1.32,0.95l-1.4,0.31ZM95.96,281.16l0.47,-1.15l1.1,-0.14l-0.62,0.74l-0.96,0.54ZM98.16,279.26l-0.1,-0.69l0.39,-0.43l0.93,-0.34l0.8,0.21l-2.02,1.25ZM81.67,202.06l0.43,0.35l2.12,0.24l3.04,-0.91l1.29,0.53l0.72,1.13l1.92,0.48l0.43,0.47l3.9,0.43l-0.31,0.41l-2.74,0.09l-1.06,0.96l-0.18,0.59l-0.64,-1.17l-1.93,-0.65l-1.21,-1.2l-2.21,-0.79l-1.25,-0.03l-1.8,0.87l-0.91,-0.07l-0.63,-0.45l-0.02,-0.94l0.35,-0.83l0.67,0.5ZM74.39,226.48l-0.16,-0.06l0.01,-0.05l0.08,-0.04l0.06,0.15ZM66.52,287.35l1.04,-0.28l0.21,-0.15l0.01,0.11l-1.27,0.32ZM67.96,286.34l-0.26,-0.44l0.8,0.03l-0.05,0.21l-0.49,0.2ZM54.59,290.07l0.81,-0.77l0.42,0.4l-0.89,0.5l-0.34,-0.13ZM55.41,288.96l-0.0,-0.03l0.02,-0.05l-0.02,0.08ZM55.43,288.86l0.07,-0.19l0.04,0.0l-0.11,0.19ZM48.47,289.12l0.89,0.46l-0.35,0.6l0.03,-0.51l-0.57,-0.54ZM36.26,288.51l0.19,-0.11l0.18,0.1l-0.13,0.05l-0.24,-0.05ZM5.93,285.16l0.05,-0.02l-0.01,0.05l-0.04,-0.02ZM1.03,281.63l2.02,0.1l0.77,0.4l-1.6,0.43l-1.19,-0.92Z", "name": "United States"}, "GL": {"path": "M598.7,69.97l1.63,-0.74l0.09,-0.71l-1.9,-0.19l-1.15,0.49l-1.8,0.08l-5.77,-1.76l-3.11,-2.09l1.12,-1.04l-0.56,-1.19l1.29,-1.04l3.77,-1.32l3.78,-0.16l4.75,-1.56l5.05,-0.91l0.6,-0.42l-0.3,-0.74l2.82,-0.87l5.16,-0.96l6.51,0.06l1.49,-0.7l2.14,-1.96l0.73,-1.18l2.47,-6.42l2.94,-1.06l0.21,-0.66l-1.67,-0.63l-2.76,0.69l-2.12,0.06l-2.11,0.62l-3.18,-0.65l-2.01,0.04l-0.89,-0.44l-0.59,-0.94l0.69,-1.6l3.31,-2.23l3.77,-1.23l5.68,-3.71l3.89,-0.67l1.26,0.46l1.93,1.51l0.52,0.02l0.23,-0.58l-0.99,-2.17l0.07,-0.44l0.93,-0.64l3.31,0.18l3.37,0.94l1.28,-0.24l1.56,-1.92l0.38,-1.53l-0.56,-4.14l1.67,-1.2l2.01,-0.77l1.62,-0.2l4.06,0.65l4.29,2.36l4.71,1.83l3.29,1.91l1.42,0.28l0.37,-0.6l-1.4,-1.33l-5.09,-2.47l-4.9,-3.16l-1.73,-0.58l2.14,-0.82l5.07,-0.93l5.72,-0.73l5.34,-0.23l1.11,-0.68l3.92,-0.63l2.72,0.84l1.47,1.31l0.4,1.12l-0.04,4.69l0.24,0.49l0.56,0.12l2.13,-1.82l0.66,-1.07l0.6,-2.09l-0.89,-1.25l-0.04,-1.4l0.29,-0.57l0.91,0.0l5.13,2.98l2.08,0.67l2.29,1.58l5.5,0.1l1.81,-0.34l0.09,-0.67l-0.78,-0.67l-3.61,-1.87l-1.55,-1.38l-1.22,-2.22l4.34,-0.06l5.94,0.83l7.64,2.88l3.79,0.96l6.74,3.3l3.0,0.64l0.89,-0.47l0.57,-0.76l-0.53,-3.14l0.41,-1.71l1.08,-0.67l0.53,-1.07l-0.6,-1.5l-1.34,-0.93l-4.4,-2.03l1.74,-0.26l12.31,0.55l4.03,0.77l2.65,-0.31l0.35,-0.44l-0.17,-0.8l-0.6,-0.49l-17.03,-1.33l-6.91,0.32l-1.23,-0.83l1.08,-0.98l3.89,0.54l1.46,-0.76l2.3,-0.63l2.38,-0.24l5.1,-1.38l4.61,0.3l2.21,1.07l2.67,0.61l3.44,-2.28l1.54,-0.67l2.25,0.4l2.85,1.2l1.98,0.38l3.27,2.21l0.85,0.07l0.93,-0.77l0.49,-1.98l-0.46,-0.42l-2.74,-0.92l-0.85,-0.75l0.3,-0.37l2.85,-0.11l1.76,-1.1l4.75,0.4l0.59,-0.18l0.41,-0.72l5.83,-0.02l3.96,-0.42l2.67,0.54l1.61,-0.01l4.38,-0.91l11.61,0.08l3.8,0.37l4.86,0.77l2.56,0.89l7.47,0.77l5.3,1.07l-20.87,0.96l-9.71,0.92l-0.39,0.34l-0.2,1.3l0.37,0.46l1.07,0.07l9.55,-1.69l9.21,0.6l5.95,-0.04l9.4,-1.15l3.23,3.47l2.88,-0.0l1.23,0.83l1.6,-0.11l4.43,0.51l4.11,1.3l0.61,0.73l-2.1,1.33l-2.39,0.96l-3.25,0.74l-3.77,0.47l-29.21,1.57l-1.11,0.4l-0.79,1.11l0.35,1.56l1.69,0.47l8.79,-1.34l13.62,0.59l2.69,1.38l1.85,2.32l3.36,-0.5l0.85,-0.43l1.99,-2.93l2.63,-0.48l6.03,-0.2l0.71,0.86l0.21,1.23l-0.14,2.04l-0.39,1.05l-2.41,2.95l-6.98,5.17l-0.63,0.95l-0.1,0.89l0.72,0.54l1.12,-0.74l0.71,-0.91l3.71,-1.27l3.28,-1.91l2.9,-1.21l4.47,-3.5l1.85,-0.86l1.66,-0.0l0.29,1.25l0.35,0.31l3.57,0.18l5.27,1.2l1.28,-0.45l4.85,-3.92l3.97,-0.98l8.88,0.58l6.46,1.3l4.69,2.28l-3.7,1.5l-1.25,0.96l-4.94,2.29l-5.1,0.54l-0.43,0.38l0.07,0.57l1.16,1.03l-1.09,0.77l-3.48,0.49l-1.82,0.85l-4.02,0.03l-2.26,0.91l-0.11,0.68l0.88,0.74l3.04,0.95l-2.44,1.43l-2.5,0.69l-5.4,0.22l-5.75,-1.04l-1.23,0.04l-2.48,1.42l-1.51,1.63l-0.23,2.05l0.7,1.23l1.39,0.42l2.23,-0.0l0.26,0.43l-0.57,2.09l-0.08,1.72l0.32,0.33l1.17,0.2l0.71,1.1l-3.65,1.23l-0.91,1.82l-0.66,0.63l-2.82,0.42l-2.76,1.68l-0.22,0.44l0.2,0.44l0.75,0.5l-1.21,1.96l-1.01,3.34l-1.79,3.12l0.05,1.12l0.92,0.9l0.43,0.05l1.16,-0.62l1.21,-1.57l1.18,-0.61l2.59,0.52l4.13,1.53l0.77,0.82l-0.59,0.07l-3.48,-1.3l-2.71,0.79l-0.2,0.58l1.11,1.87l1.46,1.05l2.13,0.38l2.56,1.18l2.26,-0.6l2.06,0.18l0.57,1.06l-0.21,2.11l-1.04,1.41l-6.33,-1.61l-3.29,-0.07l-2.33,0.36l-0.38,0.6l-3.08,1.52l-2.67,-1.1l-0.92,-0.03l-1.33,0.75l-0.47,0.63l0.18,0.55l0.91,0.64l2.74,0.51l0.62,1.76l1.49,1.45l1.76,0.09l1.45,-0.35l1.66,0.65l2.24,0.2l0.93,0.78l-0.33,1.41l2.24,2.42l0.71,3.71l-0.04,0.81l-0.6,0.95l-0.98,0.19l-2.02,-1.51l-1.66,-0.13l-2.32,1.63l-1.67,0.24l-2.01,1.11l-2.79,-0.94l-0.5,0.16l0.1,0.52l2.48,1.6l1.08,-0.0l2.41,-1.0l0.65,0.05l0.63,1.44l-0.04,0.68l-1.25,1.67l0.32,0.39l0.9,0.18l1.6,-1.01l1.06,-2.53l0.74,-0.32l0.91,0.35l2.19,3.44l1.31,0.85l0.16,1.15l-0.45,0.88l-1.23,0.22l-3.12,-0.25l-0.4,0.47l0.07,0.44l-1.79,0.56l-2.33,0.25l-3.68,-1.13l0.81,-2.1l-0.12,-0.41l-1.36,-0.96l-0.42,0.49l0.14,1.41l-1.86,1.02l0.6,1.12l-0.69,1.38l1.22,1.12l5.8,0.53l3.14,0.87l-0.79,2.9l-5.04,0.49l-3.27,1.58l-0.68,0.01l-4.41,-1.23l-2.62,-1.39l-1.98,-2.14l-0.57,-0.01l-1.42,1.28l-0.91,0.21l-4.2,-2.44l-0.54,0.25l0.08,0.52l3.35,2.7l-2.16,0.71l-1.83,1.36l-1.83,0.33l-6.03,-1.77l-0.47,0.14l0.02,0.49l0.52,0.61l2.9,1.0l-0.46,0.34l-2.63,-0.06l-1.67,0.41l-0.18,0.57l0.22,0.35l1.22,0.54l0.96,-0.64l2.2,0.1l6.9,-1.51l0.81,-0.89l0.92,-0.29l2.33,-0.25l3.35,0.23l3.3,1.97l1.26,0.24l0.78,0.85l3.95,1.49l0.14,2.5l-0.31,2.02l-0.86,0.43l-0.22,0.43l0.06,1.57l-8.56,-3.46l-1.38,-1.7l-1.7,-3.6l-2.02,0.26l-0.91,0.32l-0.53,0.57l-4.75,1.23l-2.31,0.77l-0.27,0.37l0.25,0.38l1.59,0.44l7.81,-2.18l0.59,2.64l-0.16,0.47l-2.47,1.05l-0.07,0.62l0.44,0.44l2.87,-0.63l0.85,0.71l4.2,1.98l5.47,2.12l0.83,1.44l1.5,0.21l-2.37,1.69l0.04,1.46l0.32,1.27l0.38,0.3l0.39,-0.28l0.53,-1.55l1.46,-0.58l0.69,0.18l0.35,2.24l-0.01,3.23l0.7,3.0l-1.62,0.44l-1.9,-0.19l-0.27,-3.28l-0.69,-0.26l-0.56,0.73l-0.62,3.04l-2.98,-0.1l-2.25,-0.91l-0.83,-0.78l-1.24,-2.4l-0.24,-1.25l-0.67,-1.05l-1.0,-0.76l-6.82,-3.3l-4.19,-0.13l-1.73,-0.44l-0.94,0.32l-0.16,0.5l0.59,0.89l6.35,0.48l0.52,0.79l0.13,0.79l-0.27,0.55l-1.98,1.16l-2.75,0.9l-3.05,-0.02l-2.87,-0.46l-2.72,0.1l-0.13,0.71l1.95,0.87l-0.37,1.32l-1.61,1.03l-3.11,1.01l-0.44,0.68l0.39,0.26l2.65,-0.3l2.75,0.69l6.49,-0.68l0.62,0.23l-3.16,1.04l-1.87,1.23l-0.49,1.06l0.27,0.53l1.25,0.33l0.91,-0.49l1.22,-1.45l1.24,-0.33l1.65,0.18l1.44,-0.23l3.13,-0.98l3.91,0.52l5.57,1.44l6.94,0.13l-0.77,0.51l-3.1,0.8l-0.28,0.16l-0.02,0.77l-3.84,0.52l-0.13,0.72l0.58,0.69l-0.74,0.19l-1.88,-0.24l-0.14,1.37l-2.8,1.28l-1.69,0.31l-0.16,0.64l0.36,0.4l-2.19,1.0l-0.71,1.32l-3.85,1.84l-9.64,2.05l-4.52,1.3l-3.17,-0.11l-1.74,0.99l-2.42,-0.46l-0.49,0.46l0.52,0.82l-1.45,0.37l-2.1,-0.55l-4.63,-2.72l-0.57,0.42l0.67,1.38l-0.82,0.34l0.99,1.99l-0.83,0.75l-3.9,2.06l-1.23,1.87l-0.88,0.72l-0.11,1.0l-2.89,4.51l-0.58,0.64l-1.04,0.15l-1.02,1.61l-2.61,1.46l-1.03,-0.08l-2.18,-1.45l-0.63,0.37l0.03,0.3l1.09,2.07l-0.68,0.51l-2.33,1.58l-0.17,-0.75l-0.71,-0.41l-0.6,0.38l-0.49,1.37l-0.66,0.18l-1.44,-0.74l-1.44,0.95l-0.34,0.85l-1.57,0.42l-0.74,-0.45l0.92,-1.12l0.06,-1.04l2.62,-3.11l-0.38,-0.42l-2.63,-0.52l-1.93,-0.01l-0.31,0.32l0.18,0.41l1.52,0.83l-0.73,0.77l-0.65,1.62l-1.65,-0.75l-0.44,0.11l-0.05,0.45l0.54,0.9l1.03,0.63l0.0,0.51l-1.89,0.63l-7.78,0.57l-0.38,0.28l0.12,0.77l2.69,1.26l-1.87,1.53l-0.99,0.38l-2.0,-0.47l-2.16,0.06l-0.46,0.38l-0.02,0.54l0.65,1.52l0.42,0.28l1.43,-0.32l0.88,1.67l1.2,1.34l-1.19,0.85l-1.04,0.11l-0.5,0.87l-1.88,-0.47l-2.06,-0.14l-0.41,0.3l0.21,0.46l2.77,1.43l1.89,-0.12l-0.12,1.49l0.46,1.34l-0.92,0.66l-0.18,0.78l-0.98,0.06l-0.43,0.38l-0.52,1.46l0.14,0.44l-1.08,1.33l-2.06,-0.03l-1.7,-1.09l-0.52,0.51l0.58,0.95l2.07,1.04l-1.12,1.27l-0.67,0.32l-3.97,-0.25l-0.81,0.34l0.7,0.84l3.2,0.81l-0.72,2.84l0.87,1.41l0.14,0.93l-0.41,0.39l-1.35,0.14l-0.5,0.42l0.21,0.67l0.92,0.24l-1.53,4.34l-0.36,2.25l-1.49,1.67l-1.27,0.02l-2.35,-0.58l-1.04,0.25l0.07,0.7l0.55,0.35l3.06,0.93l0.35,2.12l-0.75,0.76l-1.22,-0.05l-1.72,-0.66l-0.51,0.52l0.96,0.9l-0.39,0.15l-0.51,-0.06l-0.3,-0.76l-1.38,0.18l-0.12,-0.39l1.33,-1.63l-0.32,-0.72l-0.52,-0.01l-1.73,1.86l-3.48,-1.27l0.04,-0.68l1.24,-0.35l1.24,-0.94l0.64,-1.04l-0.14,-0.56l-0.52,-0.04l-1.63,1.18l-1.22,0.41l-3.2,-1.21l-0.36,-0.92l1.45,-3.05l-0.12,-0.52l-0.48,-0.25l-0.59,0.25l-0.27,0.75l-2.89,1.04l-1.43,1.06l-1.68,0.25l-1.74,-0.48l-1.12,0.14l-0.41,0.47l0.08,0.34l-1.46,-0.32l2.11,-1.05l-0.08,-0.73l-2.85,-0.1l-0.37,-1.3l-1.07,-0.56l-1.42,-0.2l-0.57,-1.72l-0.97,-0.4l0.25,-0.57l-0.9,-1.63l2.5,-1.22l0.29,-0.39l-0.3,-0.38l-1.68,-0.26l-1.22,0.81l-1.1,0.07l-0.01,-0.61l0.51,-0.56l-0.12,-0.63l-2.0,-0.73l-1.57,-1.0l0.07,-1.79l2.35,-2.28l0.1,-0.51l-0.48,-0.18l-1.53,0.54l-1.2,1.09l-0.55,-0.8l-1.44,-1.08l-3.63,-5.13l0.39,-1.05l-0.26,-0.72l3.83,-1.03l1.75,-0.16l0.66,-0.46l0.1,-0.47l-0.99,-0.16l0.11,-0.38l-0.5,-0.49l-1.49,0.75l-4.06,0.99l-0.36,-0.37l1.4,-1.96l0.74,-0.68l1.77,0.03l0.46,-0.49l-0.08,-0.32l1.44,-0.29l0.49,0.06l0.87,1.41l0.95,0.52l0.57,-0.39l-0.72,-2.4l-0.98,-0.67l-1.14,0.04l-1.88,-3.34l-0.47,-0.25l-0.46,0.5l1.02,3.39l-1.31,0.68l0.16,-0.62l-0.53,-0.47l-0.59,0.23l-0.67,0.53l-2.35,3.81l-0.59,-0.71l-0.12,-2.7l-0.87,-3.91l-1.01,-0.64l-0.32,-0.63l1.57,-0.73l2.79,-2.22l2.57,-0.3l0.37,-0.62l-0.7,-0.47l-3.04,0.54l-3.19,2.19l-0.77,-0.0l-1.31,-1.08l-1.79,0.14l-0.14,-1.21l0.62,-1.65l-0.37,-0.54l-0.79,-0.21l6.36,-3.55l0.92,-1.04l1.86,-0.89l1.62,-1.43l-0.25,-0.56l-0.58,-0.05l-8.95,5.88l-2.44,0.46l-0.05,-1.84l1.02,-1.79l1.41,-0.81l0.45,-0.61l2.97,-0.28l0.37,-0.26l-0.03,-0.65l-1.04,-0.3l-4.55,-0.15l-1.01,-0.43l-0.84,-1.07l0.39,-2.11l4.03,-2.23l2.16,-0.6l3.03,0.85l3.64,0.22l2.39,1.09l0.77,-0.15l0.22,-0.56l-0.33,-0.46l-2.03,-0.88l0.78,-0.35l0.01,-0.72l-0.42,-0.2l-4.21,0.56l-3.06,-0.86l-3.3,0.71l-2.31,1.62l-0.85,0.27l0.58,-1.99l1.15,-1.19l0.97,-1.92l5.25,1.2l2.4,0.18l1.02,-0.67l1.55,-2.51l-0.61,-0.84l-1.47,0.31l-0.86,1.02l-2.72,0.43l-2.37,-0.34l-0.58,-0.45l-2.31,0.1l1.3,-2.09l1.96,-0.75l1.39,0.06l2.59,1.32l0.93,0.16l2.66,-0.57l1.12,-0.84l0.79,-1.02l0.04,-0.54l-0.57,-0.3l-1.56,0.63l0.55,-2.64l3.34,-0.1l0.85,-0.72l-0.32,-0.5l-1.37,-0.57l-2.22,0.35l0.87,-1.37l0.45,-2.19l2.33,-1.31l-0.64,-1.3l0.79,-0.43l-0.01,-0.64l-0.9,-0.3l-1.89,0.32l-1.65,-0.48l-1.91,0.64l-3.81,-0.64l-3.93,-2.23l-5.01,-1.09l-2.31,-2.03l0.65,-0.64l0.78,-0.25l6.85,0.64l1.93,0.56l4.61,2.32l3.01,0.7l1.46,-0.32l0.34,-0.39l-0.16,-0.53l-1.45,-0.37l-1.74,-1.08l0.35,-2.16l-0.17,-0.4l-1.34,-0.69l2.38,0.16l0.32,-0.37l-0.19,-0.51l-1.98,-1.14l-3.48,-0.03l-2.4,-0.73l-2.21,0.22l-0.4,-0.89l1.01,-1.06l4.52,-1.24l1.14,-0.75l0.14,-0.49l-0.49,-0.34l-2.05,0.49l-2.46,-0.38l-2.6,1.27l-1.02,-0.3l1.54,-1.28l0.07,-0.61l-0.47,-0.36l-0.62,0.11l-0.35,-1.69l-1.42,-1.59l-0.49,-1.05l0.65,-0.42l0.06,-0.46l-0.41,-0.21l-1.27,0.2l-0.41,0.4l0.02,0.45l0.64,1.67l1.45,1.56l0.17,0.8l-1.19,0.88l-0.33,0.7l-0.86,0.06l-0.38,0.59l0.48,1.04l-0.15,0.36l-1.59,0.59l-1.8,0.15l-3.16,-0.54l-1.14,-1.05l-0.31,-0.98l0.6,-0.71l1.13,-3.12l2.23,-2.04l0.27,-0.79l-0.51,-0.5l-0.44,0.05l-2.08,1.79l-1.02,0.15l-0.06,-0.5l0.93,0.06l0.73,-0.53l-0.01,-0.58l-0.9,-0.74l1.78,-0.07l1.71,-1.39l0.37,-0.81l-0.02,-1.87l-0.74,-1.05l-1.18,-0.55l-1.19,0.75l-1.66,-0.54l-0.08,-0.57l1.08,-0.41l0.89,-1.1l-0.15,-1.64l-0.67,-0.77l-0.49,-0.08l-1.01,0.57l-0.71,-0.94l-1.06,-0.52l0.56,-1.25l0.51,-0.08l0.29,-0.48l-0.49,-1.43l-1.98,-2.8l-0.74,-0.28l-1.24,0.18l0.36,-0.85l-0.27,-1.35l1.6,-0.37l0.48,-0.37l-0.02,-0.65l-3.09,-1.67l-1.64,-2.02l-3.24,-1.54l-2.2,-2.41l-1.41,-0.69l1.2,-0.65l0.33,-0.55l-0.7,-1.47l-0.89,-0.96l-2.86,-0.78l-1.87,-0.98l-8.98,-3.16l-4.7,-0.9l-3.31,-0.11l-1.28,-0.69l-1.62,-0.35l-0.91,0.2l-1.97,1.23l-0.38,0.05l-1.31,-0.96l-0.68,-0.14l-3.09,1.52l-2.33,0.42l-0.79,-0.12l-1.65,-1.01l-1.45,0.21l-1.63,0.82l-1.88,-0.78l-0.94,0.04l-0.44,0.19l-0.1,0.92l1.27,1.37l-6.39,-0.97l-3.06,-1.23l-3.36,-1.79l2.81,-1.44l3.68,-0.8l0.29,-0.24l-0.09,-0.65l-0.76,-0.33l-5.18,-0.09l-2.09,-0.51l-0.81,-0.7l0.85,-1.27l-0.01,-0.67l-0.46,-0.06l-3.68,1.89l-0.72,-0.13l-0.62,-0.29l0.04,-0.84l-1.88,-1.04l1.19,-0.85l1.25,-0.19l4.79,-0.38l3.43,0.36l2.14,-1.61l2.24,-0.39l6.02,0.16l2.72,0.89l0.6,-0.39l-0.37,-1.08l0.89,-1.26l-0.18,-0.88l-2.14,-1.48l-0.84,-0.11l-4.51,1.78l-2.17,-0.07l-2.46,-0.77l-2.07,1.22l-1.68,0.24l-3.11,-0.85l-0.49,-0.26l-0.22,-0.69l-1.47,-0.66ZM868.11,46.03l-2.0,1.23l-3.02,-0.1l-1.69,-0.55l-0.33,-0.57l0.5,-0.71l2.15,-0.77l2.79,-0.5l2.31,0.27l0.2,0.58l-0.9,1.11ZM866.15,95.15l0.55,1.88l0.94,0.75l1.08,-0.07l0.26,0.56l-0.54,0.24l-5.36,-0.09l-0.83,-0.53l0.15,-2.09l0.75,-0.48l1.1,0.53l1.91,-0.7ZM866.52,70.52l-0.75,-0.01l1.35,-1.66l0.58,0.02l-0.21,1.06l-0.96,0.59ZM862.98,87.68l-1.73,-3.8l0.1,-2.36l0.41,-0.04l0.52,0.45l0.7,5.76ZM862.47,22.09l-1.21,-0.05l-1.63,-1.05l-1.0,-0.79l-0.05,-0.69l0.98,-0.33l2.36,1.99l0.54,0.91ZM860.98,67.01l-0.81,-2.13l-0.08,-1.53l1.1,-0.81l-0.06,2.1l0.34,1.07l-0.49,1.29ZM815.5,142.48l0.34,-0.68l0.76,-0.35l0.47,-0.66l0.17,-1.68l1.92,0.41l3.19,-0.08l4.15,-1.56l1.5,0.87l0.18,0.5l-0.22,1.0l0.35,0.51l-2.53,0.72l-1.49,1.05l-0.43,-0.49l-1.5,-0.4l-6.88,0.84ZM768.9,185.81l-0.3,0.0l-0.09,-0.66l0.57,0.07l-0.18,0.58ZM728.75,18.92l-0.63,0.13l-2.09,-1.26l-6.4,-2.19l-2.68,-2.19l-0.15,-0.55l0.22,-0.39l4.2,-0.42l4.93,1.41l2.42,1.17l0.7,0.81l-0.51,3.48ZM720.41,224.31l0.99,-0.49l0.23,-0.06l-0.48,1.13l-0.74,-0.57ZM696.91,151.06l-0.52,-1.51l0.01,-0.96l0.83,-0.37l1.45,0.44l-0.9,0.55l-0.34,1.59l-0.54,0.26ZM692.3,138.73l0.41,-0.21l0.83,0.34l-1.25,-0.13ZM682.11,152.65l2.11,-0.27l0.15,-0.72l-1.13,-0.75l-4.46,-0.62l-0.66,-0.63l0.5,-1.73l1.82,0.27l0.55,-0.24l-0.11,-0.69l-1.65,-0.62l-0.69,-0.8l0.44,-0.73l1.55,-0.51l5.28,0.98l2.9,2.39l3.43,1.24l0.1,0.97l0.42,0.43l-0.83,0.78l-7.33,2.05l-0.91,-0.05l-1.48,-0.77ZM684.63,137.12l-0.3,0.04l-1.3,-0.54l1.33,-1.07l0.5,0.74l-0.23,0.83ZM671.71,121.68l0.62,-0.36l2.38,0.02l1.89,-0.49l-2.17,1.77l-1.42,-0.89l-1.29,-0.05ZM592.02,73.97l-1.72,0.09l-2.03,-0.62l1.64,-0.21l2.49,0.62l-0.39,0.12Z", "name": "Greenland"}, "MX": {"path": "M362.47,413.39l0.23,-0.35l-0.15,-0.86l-1.05,-0.75l-1.25,-2.44l11.15,-0.93l-0.28,0.47l0.19,0.62l19.52,6.73l14.45,-0.03l0.4,-0.4l0.01,-2.14l8.47,0.05l1.4,1.69l6.24,4.83l1.14,2.37l0.33,1.63l1.21,1.69l2.2,1.48l3.77,1.81l0.83,-0.01l1.55,-1.36l0.32,-1.33l0.93,-1.49l1.51,-0.63l1.42,0.41l2.78,0.12l3.32,3.19l2.01,3.53l0.31,1.19l2.78,3.32l1.2,0.93l0.27,2.72l0.8,0.97l1.13,2.52l4.35,1.88l2.45,0.39l2.13,0.92l0.85,-0.4l-0.33,1.42l-1.45,3.13l-0.83,3.43l-0.51,5.92l0.1,1.96l-0.56,1.64l0.08,0.81l1.05,4.87l0.67,0.83l1.68,4.01l3.71,4.48l0.82,2.69l1.64,1.74l0.42,1.29l1.6,0.73l2.25,-0.04l0.9,0.68l0.96,0.26l1.22,1.69l0.72,0.2l1.56,-0.17l3.2,-1.22l3.41,-0.21l1.09,-0.8l1.16,-0.28l2.2,-0.2l0.25,0.93l0.71,0.35l1.48,0.07l1.66,-1.3l-0.33,-1.4l1.84,-1.09l1.22,-1.3l0.23,-1.91l1.04,-1.24l0.04,-3.26l0.61,-2.19l2.48,-1.28l4.82,-0.75l2.05,-0.82l2.23,-0.19l3.89,0.84l0.71,-0.35l0.11,-0.51l1.02,0.85l0.23,1.26l-0.68,1.65l-2.53,2.96l-0.31,0.92l0.16,1.07l-1.21,1.17l0.27,0.96l0.81,-0.0l-1.01,0.79l0.01,0.5l0.55,0.4l-1.21,4.05l-0.57,-0.63l0.1,-1.68l-0.65,-0.3l-0.83,0.69l-0.49,1.19l-1.3,0.43l-1.51,2.51l-0.95,-0.38l-0.66,0.38l-0.18,0.57l-8.94,-0.01l-0.4,0.4l-0.02,2.57l-1.73,-0.01l-0.31,0.66l3.58,2.89l0.45,1.08l0.94,0.48l-0.2,1.11l-6.48,0.2l-2.42,4.23l0.53,1.19l-0.3,0.44l-0.12,1.68l-2.56,-2.75l-5.66,-4.79l-2.58,-1.32l-0.84,0.49l-0.13,-0.69l-0.88,0.03l-0.89,-0.52l-0.86,0.68l-0.09,0.54l-2.07,1.14l-3.76,1.45l-1.43,0.2l-3.39,-1.33l-2.82,-0.29l-1.88,-1.2l-1.96,-0.54l-1.41,-1.25l-4.63,-0.95l-1.73,-1.06l-4.17,-1.46l-3.77,-2.35l-1.67,-1.63l-4.08,-0.58l-3.66,-1.34l-2.42,-2.65l-5.2,-2.53l-1.74,-2.06l-0.95,-1.36l-0.82,-1.99l1.21,-0.31l0.78,-0.6l-0.04,-0.84l-0.87,-0.65l1.04,-1.46l0.14,-1.94l-0.19,-0.43l-1.03,-0.62l-1.02,-1.82l-0.02,-1.86l-0.75,-1.62l-3.18,-3.15l-2.76,-3.73l-2.83,-2.2l0.1,-0.57l-0.33,-0.59l-2.13,-0.62l-0.89,-1.5l0.54,-0.65l-0.22,-0.33l-3.45,-1.85l-0.15,-0.5l-0.73,-0.29l0.24,-0.68l-0.67,-0.27l-1.29,0.65l-0.6,-0.48l-0.18,-1.41l0.68,-0.98l0.43,0.08l0.41,-0.58l-0.79,-1.49l-1.16,-1.13l-1.48,-0.05l-1.04,-2.07l-2.06,-0.76l-0.97,-1.51l0.27,-1.45l-0.24,-0.61l-2.9,-0.53l-1.67,-2.18l-1.13,-0.58l-2.37,-2.92l-0.28,-1.27l-0.83,-0.66l-0.15,-0.87l-1.65,-2.52l-0.45,-1.76l-1.21,-2.02l-0.22,-0.66l0.34,-1.63l-0.16,-0.81l-2.82,-0.91l-0.5,-1.02l-1.38,-0.67l-1.11,0.65l-2.24,-1.39l-1.66,-0.78l-0.49,0.08l0.6,1.67l-0.44,2.77l1.26,3.75l0.07,2.09l1.48,1.99l3.04,2.49l0.99,1.37l0.25,0.97l0.79,0.19l0.14,0.48l0.63,0.2l0.66,1.62l0.99,0.44l0.7,3.15l2.1,1.8l0.7,1.79l0.88,0.58l0.87,2.3l0.89,0.73l0.47,-0.15l0.09,-0.55l-0.36,-0.52l0.32,0.27l1.18,3.07l0.27,1.95l0.73,1.19l0.57,0.32l0.7,1.95l1.04,1.47l-0.25,1.37l0.48,1.63l1.56,1.37l0.75,-0.23l0.22,-0.77l1.77,1.77l0.88,1.66l1.07,0.75l-0.28,1.3l-1.95,1.36l-1.88,-3.72l-1.43,-0.79l-2.04,-1.95l-3.29,-2.43l-0.63,-0.13l-1.34,-1.41l-0.21,-0.83l0.29,-2.97l-0.55,-1.92l-1.08,-1.73l-1.58,-0.71l-1.75,-1.38l-0.91,-2.11l-0.84,0.84l-1.45,0.33l-0.98,-1.14l-3.09,-1.42l-0.46,-1.12l-2.11,-1.59l1.67,0.27l0.99,-0.26l1.21,0.88l0.7,-0.3l-0.69,-1.7l0.78,-2.75l-0.6,-1.12l-3.99,-4.09l-1.3,-0.54l-2.44,-1.72l-0.58,-1.13l-0.15,-1.91l-0.9,-0.68l-0.3,-2.0l-1.21,-1.06l-0.24,-1.32l-1.61,-1.95l-0.03,-0.59ZM384.21,429.35l-0.58,-0.3l0.26,-1.28l0.34,-0.13l0.24,0.83l-0.26,0.88ZM378.19,425.87l0.19,0.17l0.13,0.37l-0.28,-0.39l-0.04,-0.15ZM379.15,427.07l0.28,0.07l0.03,0.24l-0.31,-0.31Z", "name": "Mexico"}, "CU": {"path": "M526.78,466.91l0.86,-0.32l-0.06,-1.77l1.1,-1.14l4.28,-1.81l3.02,-0.41l2.78,-0.77l2.61,0.39l1.41,-0.12l0.81,0.45l2.49,-0.25l1.42,0.83l1.49,0.02l1.02,0.39l3.0,2.45l3.16,0.29l5.23,2.99l0.75,0.14l0.33,-0.24l0.44,0.38l-0.33,0.18l0.11,0.47l0.79,0.78l0.89,-0.4l1.25,1.2l0.48,-0.14l0.46,0.4l1.89,0.29l1.05,0.52l1.73,0.12l0.28,0.17l-0.18,0.61l-0.57,0.69l0.33,0.57l4.07,0.3l2.21,1.51l1.66,0.49l-0.35,0.37l-1.87,0.12l-2.05,0.73l-0.14,-0.26l-0.71,0.01l-0.44,0.39l-4.36,-0.51l-7.17,0.69l2.68,-2.28l0.03,-0.82l-0.67,-0.9l-4.65,-0.75l-1.75,-1.39l-0.46,-1.95l-1.01,-1.15l-2.83,0.15l-3.2,-0.95l-1.56,-0.66l-1.23,-1.29l-2.67,0.26l-0.42,-0.16l-0.45,-0.82l-0.72,0.15l-0.33,0.55l-0.57,-0.41l-1.92,-0.11l-0.6,-0.4l1.1,-0.27l0.53,-0.82l-0.42,-0.69l-0.72,-0.33l-4.86,-0.02l-3.27,2.49l-2.67,0.3l-0.65,1.17l-1.77,0.65l-0.14,-0.35ZM534.15,467.72l0.23,-0.31l0.93,0.15l0.65,1.21l-1.53,0.5l0.22,-0.59l-0.5,-0.96Z", "name": "Cuba"}}, "height": 543.9752077221104, "projection": {"type": "mill", "centralMeridian": -11.5}, "width": 900.0});
jQuery.fn.vectorMap('addMap', 'south_america_mill',{"insets": [{"width": 900, "top": 0, "height": 905.8723093907364, "bbox": [{"y": -1391900.644539083, "x": -12188330.527048683}, {"y": 6974170.643481547, "x": -3876492.223609794}], "left": 0}], "paths": {"PY": {"path": "M617.96,397.13l0.51,1.91l1.38,1.97l0.3,2.45l1.0,1.01l-0.05,1.74l0.83,1.52l0.04,1.56l-0.79,2.14l0.2,0.71l-0.84,1.85l0.34,2.51l-0.39,1.88l0.17,0.76l-0.61,1.7l0.39,1.02l1.95,0.65l1.21,-0.52l1.83,1.03l2.79,0.41l1.23,-0.23l3.66,0.95l3.93,-0.58l1.27,-1.62l0.68,-0.25l2.31,2.35l4.74,0.56l0.93,1.05l0.07,1.18l0.56,1.17l0.98,0.9l-0.38,2.67l0.61,2.74l0.48,0.79l0.07,1.93l0.43,1.23l-0.23,2.16l0.98,1.51l0.19,2.21l0.44,1.29l0.79,0.59l2.22,0.34l2.64,-0.58l4.14,-2.0l1.99,1.02l1.98,1.6l-0.65,0.98l0.44,2.31l-0.37,2.72l-1.7,6.89l0.19,0.79l-2.08,4.0l-0.26,7.36l-0.54,3.86l-0.91,2.83l-0.75,1.36l-1.31,0.69l-0.41,0.81l-1.98,1.6l-0.15,0.58l-3.31,0.93l-0.92,1.42l-0.93,0.58l-0.44,0.95l0.04,0.94l-1.19,1.34l-0.63,0.01l-2.02,-1.17l-1.4,-0.23l-1.29,0.18l-1.17,0.72l-1.52,2.14l-0.42,0.11l-0.91,-0.8l-1.12,-0.26l-1.47,0.32l-0.9,-0.1l-0.93,-0.59l-1.23,-0.06l-1.71,0.44l-3.26,-0.5l-5.11,-1.49l-4.29,-0.56l-5.03,0.5l-0.32,-1.1l0.2,-0.59l0.84,-0.63l1.26,-2.01l1.43,-0.89l0.0,-0.67l0.66,-0.53l0.44,-1.29l0.59,-0.7l-0.14,-3.19l1.09,-2.51l2.55,-2.09l1.75,-4.11l2.13,-2.02l0.17,-1.15l-1.03,-1.97l-2.17,-2.5l-1.74,-1.19l-2.27,-0.98l-1.4,-0.3l-0.78,0.28l-0.42,-0.16l-0.74,-0.85l-1.17,-0.66l-2.51,-0.75l-5.54,-2.85l-8.55,-6.02l-2.63,-1.08l-1.95,0.03l-2.86,-0.63l-3.98,-1.33l-2.19,-1.23l-0.67,-1.28l-1.49,-1.27l-2.41,-1.31l-1.98,-1.74l-2.72,-1.73l-1.52,-1.52l-1.64,-2.37l-1.82,-3.31l-1.91,-2.2l-2.96,-1.82l-0.24,-0.59l4.43,-14.56l0.02,-6.33l4.27,-6.28l1.89,-5.0l20.85,-4.31l10.9,-0.14l10.79,6.54l0.38,1.99l-0.23,2.03Z", "name": "Paraguay"}, "CO": {"path": "M382.29,58.03l1.56,1.88l0.98,-0.25l2.33,-1.73l0.19,-1.72l1.79,-1.65l-1.04,-2.95l-0.78,-1.05l-0.8,-1.99l-0.67,-0.67l0.8,-1.35l0.99,1.69l1.67,1.23l1.6,1.76l0.66,1.21l0.85,0.55l-0.61,0.55l-0.15,0.73l0.42,0.74l0.73,0.4l1.24,-0.35l0.59,-1.11l-0.36,-3.74l-0.58,-1.95l-1.11,-1.22l2.52,-1.13l4.97,-3.58l1.8,-3.44l1.22,-1.13l1.32,-0.71l1.84,0.16l1.66,-0.66l0.45,-1.32l-0.86,-2.26l0.99,-3.06l-0.02,-1.6l0.61,-0.86l-0.23,-0.83l-0.47,-0.08l0.57,-0.7l0.72,-2.4l0.5,-0.9l1.92,-1.37l0.46,-0.73l3.88,-3.31l0.74,-0.51l4.13,1.29l-0.32,0.28l-0.23,1.24l0.86,1.06l1.13,0.18l0.71,-0.74l1.56,-3.51l0.25,-1.96l0.51,-0.5l0.81,-0.19l3.06,0.77l1.53,0.07l4.63,-0.37l7.08,-5.05l3.26,-1.08l2.13,-1.09l1.48,-2.23l0.37,-1.53l0.73,-0.46l1.16,-0.09l0.7,-0.9l2.26,-1.24l2.45,-0.14l2.61,1.11l1.18,1.92l0.17,1.15l-2.04,2.08l-0.88,0.44l-6.86,2.03l-3.47,5.68l-2.36,1.01l-2.99,3.45l-2.24,4.36l-1.65,8.53l-4.17,6.75l-0.05,0.91l0.7,0.41l1.73,-0.32l1.57,-0.75l1.08,1.47l1.73,0.21l1.53,5.67l3.03,3.09l0.28,1.03l0.37,2.2l-1.05,1.57l-0.28,5.55l0.35,0.84l0.7,0.64l2.22,0.57l1.42,3.15l1.16,0.98l1.59,0.53l3.22,-0.51l5.94,0.56l1.52,-0.12l3.19,-1.13l0.89,0.08l3.23,1.33l3.11,0.24l8.1,9.77l0.58,0.26l0.74,-0.25l1.13,0.56l1.03,-0.25l1.18,-0.78l1.68,-0.15l2.44,0.5l3.24,-0.0l4.0,-0.5l2.46,-0.54l0.98,-0.57l3.23,0.55l0.85,0.61l0.46,1.64l-0.34,0.94l-1.24,1.23l-0.71,1.63l-0.13,1.75l-0.56,1.19l-1.19,1.0l-0.44,1.27l0.23,1.82l-0.61,7.54l0.53,0.81l0.35,2.99l1.52,4.17l0.71,1.15l1.29,1.0l2.13,3.14l-0.36,0.75l-5.79,5.18l-0.45,0.76l0.03,0.74l0.56,0.35l0.98,-0.42l1.57,0.43l0.66,1.25l4.09,3.45l-0.07,1.32l1.17,2.57l-0.12,0.84l1.66,3.72l0.07,0.9l1.15,2.95l0.01,1.28l-1.7,0.4l0.02,-4.85l-0.37,-1.18l-2.84,-4.69l-0.9,-0.57l-0.84,-0.04l-1.3,0.64l-3.15,3.42l-1.23,0.42l-0.83,-0.34l-1.13,-1.95l-0.94,-0.54l-0.78,0.46l-0.53,1.5l0.58,1.21l-13.01,0.01l-2.73,-0.63l-3.63,0.78l-0.43,0.4l-0.04,7.83l0.53,0.38l0.58,-0.2l4.28,0.47l1.36,-0.17l0.52,0.34l1.04,1.68l0.07,2.24l-1.95,-0.23l-1.53,-0.92l-4.05,1.48l-2.91,0.34l-0.36,0.39l-0.16,8.83l0.4,0.81l1.46,1.46l3.45,2.29l0.41,1.31l-0.22,1.57l0.91,2.04l1.07,0.93l-0.03,0.91l0.57,1.24l-6.52,35.85l-2.02,-1.67l-0.8,-1.87l-1.34,-1.01l-2.43,0.56l-1.95,-0.86l7.71,-12.05l0.15,-0.77l-0.67,-0.91l-1.66,-0.57l-2.19,-1.44l-2.71,-1.02l-0.69,-0.74l-3.29,-1.68l-1.92,0.47l-1.09,0.84l-2.1,0.23l-1.96,-1.3l-2.57,-0.87l-0.78,0.26l-2.04,1.82l-0.94,0.05l-1.83,0.85l-2.05,0.32l-2.9,-0.91l-1.1,0.49l-2.39,0.05l-0.67,-0.68l-1.79,-0.66l-0.14,-0.55l0.53,-1.63l-0.9,-3.15l-0.53,-0.68l-1.58,-0.08l-1.53,-0.94l-0.23,-0.43l0.32,-1.31l-0.33,-1.05l-1.79,-2.55l-1.0,-0.53l-1.48,-0.19l-2.25,-1.97l-2.36,-0.75l-0.88,-1.2l-1.1,-3.4l-2.43,-2.59l-1.65,-0.86l-0.51,-1.08l-1.95,-0.35l-2.39,-1.67l-1.12,-0.11l-0.83,0.71l-1.87,-0.71l-1.81,-1.2l-2.0,-0.37l-1.13,-0.68l-2.27,-2.35l-2.6,-1.21l-0.77,-0.07l-1.02,0.6l-0.42,0.57l-0.11,1.15l-0.53,0.2l-2.73,-0.44l-0.54,0.36l-0.64,-0.06l-3.31,-1.25l-2.26,-0.1l-1.1,-0.36l-0.8,-2.85l-2.15,-1.04l-0.63,-1.31l-1.83,-0.07l-2.4,-0.85l-3.25,-1.74l-2.39,-1.83l-2.03,-1.02l-2.09,-2.02l-0.43,-0.89l-1.37,-1.0l0.6,-1.14l1.73,-1.01l2.43,0.84l0.53,-0.31l0.32,-1.81l-0.93,-1.77l0.38,-3.3l0.62,-0.73l1.16,-0.61l0.77,0.24l0.83,-0.56l1.92,0.24l0.84,-0.28l1.77,-1.55l0.54,-1.01l0.53,0.08l0.45,-0.32l1.74,-2.05l-0.35,-1.59l1.65,-0.61l1.61,-3.0l0.86,-0.36l0.37,-1.45l2.97,-5.29l-0.41,-0.58l-1.18,0.59l-0.58,-0.19l0.15,-1.51l-0.55,-0.6l-0.53,0.11l-0.61,0.87l-0.47,-0.79l0.23,-2.17l-0.57,-0.33l1.22,-1.33l0.81,-4.16l-0.63,-1.42l-0.41,-5.85l-0.46,-1.29l-1.22,-1.12l2.21,-1.49l0.95,-1.66l-1.15,-2.6l-1.47,-2.16l-0.02,-0.62l0.88,-0.37l0.46,-2.78l-0.16,-1.13l-0.85,-1.39l-1.15,-0.22l-3.27,-5.22l-1.04,-1.0l0.75,-2.21l0.65,-0.42l0.41,-0.84l-0.26,-1.77ZM377.29,119.74l-0.18,-0.14l-0.03,-0.35l0.19,0.19l0.03,0.3Z", "name": "Colombia"}, "VE": {"path": "M451.67,10.36l0.06,2.29l1.39,2.81l1.8,1.73l-0.62,0.51l0.49,1.94l1.11,1.39l0.04,0.63l-0.8,2.44l-3.51,4.12l-1.87,3.97l1.4,2.05l0.27,1.17l2.47,2.5l-0.19,1.07l0.57,1.54l0.81,0.86l0.95,0.32l1.12,-0.02l2.97,-0.98l0.82,-0.56l1.93,-2.47l0.4,-4.32l-0.36,-1.69l-2.29,-3.98l-1.44,-1.4l-1.54,-4.23l-0.28,-1.64l0.97,-0.9l-0.08,-1.21l2.22,-0.4l5.31,-2.53l3.32,-0.65l3.78,-1.36l2.02,-1.88l2.17,1.0l1.19,-0.57l0.4,-1.09l1.36,1.25l4.73,-0.46l2.15,0.69l2.65,0.35l5.0,3.19l1.34,3.16l-0.53,0.96l0.38,1.55l0.85,1.59l1.36,1.02l3.34,0.25l8.88,-1.19l1.76,-0.49l8.81,-0.26l1.44,0.59l0.26,1.24l2.88,2.62l2.52,0.45l2.03,0.84l4.45,1.1l3.53,-0.39l7.89,-4.33l4.17,0.11l1.46,-0.74l-0.07,-0.7l-1.58,-0.67l-3.12,-0.25l2.84,-0.27l4.51,0.25l3.78,-0.81l2.95,0.02l2.89,-0.51l5.49,0.61l3.11,-0.35l-2.98,0.35l-1.85,1.06l-3.74,-0.19l-2.65,0.38l-0.34,0.36l0.85,0.62l0.19,1.15l0.8,0.28l0.93,1.07l0.25,0.96l-0.89,1.93l0.42,0.22l1.28,-0.28l0.61,-0.56l0.15,-0.95l2.61,4.93l0.92,0.06l0.67,-0.75l0.66,0.39l0.49,-0.5l0.07,-1.45l0.36,0.08l1.86,1.18l0.76,0.95l0.16,0.71l1.52,1.36l0.32,-0.37l0.05,-0.87l-0.36,-0.99l1.26,-0.02l0.61,-0.77l3.03,2.97l3.58,0.95l2.35,2.07l-0.4,0.8l-1.42,0.53l-0.85,0.93l-1.22,3.83l-1.36,2.68l-4.25,0.03l-0.38,0.3l0.19,0.45l3.76,2.25l0.46,0.0l1.23,-0.87l1.95,-0.11l2.67,-1.15l3.78,0.54l1.8,-0.98l1.94,0.13l1.65,0.75l2.11,2.79l-1.52,0.97l-0.82,1.63l-1.68,0.71l-2.36,1.95l-1.73,0.27l-0.6,0.63l-0.63,1.46l-1.23,1.27l-0.07,0.98l1.25,1.92l-0.32,0.81l0.14,0.8l0.82,0.79l2.76,0.04l-0.25,1.24l-0.42,0.56l-3.74,2.04l-1.78,-0.2l-0.95,0.67l-2.64,0.61l-0.76,1.63l0.62,1.69l0.25,2.62l-3.06,3.2l0.19,0.9l7.65,8.53l0.82,0.46l0.73,1.86l-0.23,0.96l-1.25,1.3l-1.96,1.05l-1.21,1.85l-1.0,0.3l-2.38,-0.03l-0.98,0.94l-1.48,0.51l-0.83,1.27l-6.99,2.2l-3.19,-0.67l-2.41,1.37l-1.28,0.33l-0.57,1.26l-0.28,3.07l-0.88,0.76l-1.01,-0.0l-4.47,-4.19l-2.45,0.55l-1.55,-0.55l-4.26,0.14l-1.07,-1.54l-1.06,-0.83l-4.62,-0.17l-1.63,-1.56l-1.35,0.09l-0.33,1.0l1.81,2.68l5.29,4.98l0.04,4.53l2.2,4.98l0.32,1.43l-0.47,1.81l0.15,0.53l1.72,0.71l6.15,0.46l-0.11,1.78l-0.6,0.8l-1.36,0.24l-3.19,1.68l-2.09,0.6l-0.5,0.57l-0.92,3.32l-1.0,0.99l-1.08,0.81l-2.24,0.07l-2.88,2.35l-1.09,-0.01l-3.51,1.83l-1.96,2.15l-1.26,0.87l-1.23,1.95l-0.42,0.02l0.4,-1.64l-0.52,-1.0l-1.81,-0.9l-1.67,0.59l-2.95,1.81l-3.18,0.24l-6.2,-5.36l-0.09,-1.58l-1.14,-2.89l-0.1,-0.97l-1.66,-3.77l0.15,-0.68l-1.18,-2.59l0.18,-0.77l-0.28,-0.89l-4.27,-3.63l-0.63,-1.21l-1.95,-0.59l-0.86,0.26l6.02,-5.53l0.6,-1.29l-2.32,-3.65l-1.29,-1.0l-0.64,-1.04l-1.45,-3.99l-0.37,-3.08l-0.48,-0.67l0.62,-7.4l-0.24,-1.65l0.37,-1.06l1.15,-0.95l0.67,-1.49l0.13,-1.75l0.62,-1.36l1.27,-1.27l0.42,-1.16l-0.66,-2.33l-1.17,-0.81l-1.92,-0.52l-1.68,-0.07l-1.13,0.6l-2.38,0.52l-3.92,0.49l-3.13,-0.0l-2.5,-0.5l-1.84,0.17l-2.0,0.99l-1.1,-0.54l-0.83,0.22l-7.84,-9.65l-0.56,-0.3l-3.16,-0.25l-3.21,-1.33l-1.09,-0.11l-3.46,1.16l-1.32,0.09l-5.9,-0.56l-3.26,0.5l-1.21,-0.45l-0.82,-0.68l-1.44,-3.22l-2.44,-0.76l-0.72,-1.05l0.31,-5.13l1.07,-1.65l-0.4,-2.46l-0.43,-1.36l-2.93,-2.91l-1.55,-5.75l-0.89,-0.58l-1.19,0.02l-0.51,-1.1l-0.81,-0.44l-3.41,1.04l4.24,-6.94l1.67,-8.58l2.13,-4.13l2.81,-3.27l2.52,-1.15l2.87,-4.97ZM545.6,22.4l-0.48,0.2l-0.11,-0.2l0.47,0.01l0.12,-0.01ZM477.95,9.05l-1.38,-0.12l-3.1,0.53l-0.93,-2.76l0.89,-2.29l2.03,-0.82l0.87,0.63l0.89,1.27l0.73,3.57ZM451.82,10.18l0.36,-0.43l0.42,-0.11l-0.29,0.15l-0.5,0.39ZM457.21,8.44l0.52,-0.19l-0.25,0.13l-0.26,0.06ZM583.99,43.13l-0.26,0.09l-0.05,-0.57l1.3,-1.07l0.44,0.72l-1.43,0.84ZM543.68,17.62l0.28,-0.37l1.2,-0.33l1.08,0.82l-2.55,-0.13ZM546.28,17.77l1.28,0.14l0.62,-0.99l1.03,-0.91l0.16,0.14l0.33,1.34l-0.97,1.02l-1.39,0.03l-1.06,-0.78ZM531.54,18.25l0.57,0.0l0.46,0.27l-0.95,-0.22l-0.07,-0.05Z", "name": "Venezuela"}, "CL": {"path": "M517.81,894.4l-0.79,0.6l-0.46,-0.09l0.86,-0.87l0.51,0.17l-0.13,0.19ZM421.18,761.07l-2.03,-0.3l-1.45,-0.97l-2.2,-0.83l-0.44,-1.36l0.76,-1.63l-0.34,-0.57l-0.7,0.08l-1.47,1.3l-3.87,0.91l-1.03,0.73l-0.3,0.45l0.13,0.56l1.37,0.37l0.57,1.35l-0.32,0.68l-0.48,0.05l-1.49,-1.05l-0.77,-1.17l0.02,-0.86l0.53,-1.27l4.9,-3.62l2.05,-2.01l1.78,-1.11l0.08,-0.61l-1.69,-2.18l0.07,-1.51l3.28,-0.69l3.63,0.25l3.78,-1.12l0.91,-0.86l0.27,-0.74l-0.46,-2.78l0.79,-0.87l0.81,-0.17l1.1,0.44l-1.54,5.48l-1.13,1.55l0.35,1.85l-0.57,0.88l-3.56,1.23l-0.28,0.59l0.62,0.64l1.97,-0.11l1.65,-0.32l1.47,-1.03l1.2,-4.69l1.18,-0.37l0.27,0.4l-0.15,3.02l-1.2,4.5l-1.44,1.8l-0.25,0.78l0.06,0.58l0.43,0.36l1.46,-0.22l0.97,-1.09l1.32,-3.1l0.41,-4.74l0.46,-1.41l-0.17,-2.14l-1.88,-1.11l-0.21,-0.82l0.49,-1.81l2.11,-0.03l2.03,-1.48l1.21,-0.49l3.23,1.51l0.71,0.07l0.41,-0.46l-0.63,-1.13l-3.04,-2.07l-2.39,-0.3l0.38,-1.57l0.44,-1.61l3.33,-0.88l4.09,-2.77l0.88,-2.38l0.2,-2.34l-0.28,-0.42l-1.91,-0.59l-5.02,-3.18l0.42,-3.5l1.89,-0.74l0.87,-3.39l-1.23,-2.75l0.26,-1.68l1.55,-1.55l0.75,-2.29l1.19,-0.1l0.36,-0.38l-0.1,-1.98l-0.95,-1.54l-0.03,-1.83l0.76,-2.02l1.31,0.11l0.47,-0.71l-1.0,-1.42l-0.67,-1.77l1.28,-0.63l0.77,0.62l1.39,2.52l0.73,-0.07l0.22,-0.66l-1.03,-6.09l-0.51,-0.33l-1.42,0.4l-1.16,-0.19l-0.76,-0.9l0.79,-1.26l0.88,-0.73l1.98,-0.28l1.69,-1.12l0.67,-2.4l-0.55,-0.46l-0.5,0.21l-0.97,1.97l-1.14,0.53l-1.24,-0.38l-1.71,-1.69l-1.92,-0.46l-1.1,0.6l-1.87,2.85l-0.66,0.4l-3.21,0.22l-1.16,-0.32l-0.99,-0.33l0.39,-0.93l0.87,-0.68l0.01,-0.44l-0.36,-0.41l-0.95,-0.1l-1.04,-0.7l-1.79,-5.56l-0.2,-1.9l0.74,-1.44l1.64,-5.77l0.51,-2.94l0.87,-2.54l0.01,-1.61l2.1,-1.43l1.02,-1.12l1.94,-5.2l0.31,-2.9l-3.54,-10.18l-0.14,-1.9l0.81,-4.57l-0.68,-2.04l-1.7,-2.87l-0.03,-1.31l0.71,-1.78l-0.67,-1.8l0.56,-1.65l2.57,0.44l1.43,-0.32l0.79,-0.74l0.54,-1.66l0.63,-4.83l1.36,-0.77l1.6,-3.54l1.14,-5.58l2.26,-2.95l-0.34,-2.53l1.38,-1.84l1.38,-2.73l2.04,-2.14l0.49,-2.37l1.54,-4.22l0.77,-4.4l-0.12,-1.7l2.02,-4.56l2.04,-2.38l0.34,-1.8l-0.71,-1.4l-0.02,-1.86l-0.51,-2.37l1.7,-1.62l1.73,-4.25l-0.08,-1.75l0.47,-1.97l-1.1,-2.58l-0.16,-5.34l-1.63,-8.46l0.09,-2.38l-0.66,-4.75l0.45,-3.75l3.26,-2.6l1.03,-6.55l-0.14,-2.86l-0.39,-1.37l-1.53,-1.91l-0.38,-3.37l0.24,-0.73l1.31,-1.02l0.93,-1.39l0.53,-2.24l0.99,-1.8l0.38,-4.07l0.81,-3.21l0.38,-1.04l1.57,-1.94l0.33,-5.2l3.01,-11.05l-0.16,-1.5l0.32,-2.95l-0.93,-2.7l0.92,-2.9l1.7,-2.14l0.53,-1.81l0.07,-1.15l-1.54,-6.68l0.8,-6.51l0.0,-3.12l1.39,-4.07l-0.39,-0.78l-1.16,-0.66l-0.8,-1.28l-0.06,-1.27l0.35,-2.24l1.28,-0.35l0.8,-0.92l0.72,-1.61l0.87,-3.71l0.38,-4.64l1.7,-8.88l-0.01,-3.08l-1.31,-6.65l0.6,-6.19l-0.12,-6.61l-1.43,-5.53l-0.71,-5.45l-0.02,-2.92l-0.58,-2.84l2.15,-0.1l1.58,-0.56l1.71,-1.07l1.05,-1.4l0.53,-1.52l-0.57,-3.4l1.84,-0.52l1.55,-1.29l0.18,0.86l1.59,1.82l0.67,2.27l2.42,1.24l-0.54,1.06l0.63,1.71l1.55,8.66l1.39,1.64l4.58,3.84l-2.7,3.49l0.06,0.76l1.37,1.39l0.16,1.07l-0.35,0.72l-1.34,0.27l-0.66,0.6l0.3,1.93l0.44,0.84l-0.64,0.6l-0.13,0.91l0.33,0.72l2.88,1.88l-0.85,1.02l0.06,2.43l0.59,0.58l1.03,0.27l2.73,4.21l0.13,3.93l0.9,1.79l0.43,2.87l1.1,1.08l0.45,3.44l0.8,1.96l0.03,4.19l1.15,0.93l1.31,0.22l1.61,0.03l4.44,-0.85l1.92,1.96l-4.06,12.75l-10.62,4.51l-3.31,3.25l-0.66,1.51l0.01,1.51l0.42,0.79l0.74,0.43l0.43,1.46l0.45,0.51l-1.25,0.6l-0.58,1.04l-0.63,2.41l-0.08,1.02l1.07,3.27l1.13,5.09l-1.87,2.49l-0.24,1.73l1.34,2.79l1.95,2.61l0.0,1.02l-0.22,0.48l-2.13,0.68l-0.74,0.72l-1.3,-0.48l-1.76,0.68l-1.3,3.38l-0.74,0.69l-2.09,6.08l-0.88,0.62l-2.14,2.75l-0.79,0.32l-0.43,1.04l-1.62,1.82l-0.36,1.88l-0.59,1.15l-0.1,1.83l-0.98,4.01l-1.97,1.91l-0.45,1.09l1.17,6.05l-0.38,3.95l1.33,1.24l-1.15,2.19l-1.43,0.32l-0.48,-0.28l-0.54,0.14l-0.17,1.2l-2.21,6.04l0.43,1.59l-0.8,1.11l-1.02,-0.06l-0.7,0.73l-0.79,5.6l1.77,3.99l0.68,0.56l0.88,0.06l0.6,0.64l-0.27,0.6l-0.89,0.43l-0.1,0.69l0.53,2.48l0.78,0.71l0.31,1.47l0.71,0.66l-0.06,2.0l0.73,2.44l1.08,1.06l-0.81,1.74l0.11,2.49l1.11,1.24l0.84,0.08l0.71,-0.31l0.57,0.27l0.21,1.22l-0.99,2.68l-0.16,1.85l0.49,6.59l-1.6,0.48l-0.79,0.6l-0.56,1.68l-2.27,4.09l-1.25,5.6l-1.9,1.34l0.2,1.23l0.82,0.44l0.16,0.41l-0.05,1.17l0.45,0.88l0.42,3.31l-0.41,1.53l0.13,2.36l-0.47,0.73l-1.36,0.31l-1.85,1.82l-0.42,1.55l-1.61,0.26l-1.93,1.48l-0.41,0.99l0.05,0.89l-1.48,2.77l0.86,3.83l-0.95,2.47l0.74,2.23l-0.59,2.43l0.22,1.99l1.68,3.94l0.73,5.66l1.42,1.4l-0.51,1.61l-0.53,0.65l-1.61,0.29l-2.37,1.23l-1.52,1.36l-0.39,1.01l0.07,4.14l-1.39,4.21l-1.17,-0.16l-0.98,0.72l0.5,3.12l0.39,0.76l-0.23,1.72l-0.39,0.77l-0.74,0.1l-0.46,0.43l-0.32,1.12l0.35,1.18l1.1,1.06l-1.27,1.28l-1.51,3.54l-0.16,1.56l0.82,1.61l-0.22,7.08l0.24,2.36l-0.44,1.53l1.9,5.57l-0.09,0.53l-0.99,0.56l-0.76,0.21l-0.43,-0.35l-0.83,0.15l-1.13,1.62l-0.22,1.14l0.52,0.81l0.25,1.4l-1.06,1.69l0.36,2.84l-0.39,3.07l0.57,1.33l0.81,0.74l3.12,0.91l0.26,0.72l-0.11,0.56l-1.74,1.02l0.07,1.58l1.83,2.19l0.13,1.3l-0.59,0.61l-0.05,0.49l1.28,2.37l-1.55,2.63l-0.27,3.3l0.19,0.89l0.35,0.31l7.17,0.83l0.53,0.55l-0.08,0.69l-0.75,1.1l-0.42,1.74l-0.81,0.23l-1.26,-0.5l-5.97,0.61l-1.22,-0.28l-0.48,0.33l-0.09,0.89l0.7,1.53l5.17,1.06l1.78,2.71l1.01,0.89l0.04,1.16l-1.57,1.46l-0.28,1.06l-1.95,0.29l-0.97,1.0l-0.32,2.18l0.27,1.84l0.94,0.81l0.45,0.86l-0.5,1.04l-2.29,1.8l-0.03,0.5l1.31,2.28l0.74,4.81l-0.33,0.68l-2.57,2.1l-0.28,2.9l0.11,1.09l0.61,1.37l-1.46,0.58l-0.87,1.63l-2.88,2.26l-0.08,1.42l-2.1,4.61l0.08,1.66l1.34,0.93l0.86,1.31l0.38,1.65l-0.65,1.84l-1.67,0.79l-1.02,0.9l-0.41,0.82l0.23,2.39l-0.31,1.85l-1.23,1.43l-2.97,1.21l-0.76,0.67l-1.48,2.83l0.09,1.55l-3.52,0.18l-0.37,0.32l-0.25,1.21l-0.87,1.16l-0.27,1.86l1.25,3.35l-0.68,1.9l0.33,3.34l1.44,1.86l0.87,1.99l0.74,3.14l1.17,2.79l1.46,0.59l2.56,-1.67l2.76,-0.05l1.43,-0.63l1.1,0.34l0.52,0.62l0.73,3.43l-0.33,1.73l-0.64,0.52l-0.23,0.77l0.21,1.2l0.68,0.92l-0.01,1.01l-1.19,4.16l1.67,2.41l1.69,0.95l2.02,1.99l-0.0,1.56l0.85,0.47l23.55,0.3l5.63,2.04l3.47,0.02l5.87,1.91l2.84,0.53l0.04,0.2l-6.15,-1.37l-1.64,-0.85l-1.48,-0.07l-2.68,1.21l-1.96,3.01l-1.59,0.61l-1.8,0.15l-5.78,2.37l-2.14,0.23l-2.86,1.58l-0.7,2.2l0.19,1.27l-1.54,4.21l-0.41,2.48l0.43,3.31l-0.54,3.2l-0.87,0.63l-2.4,0.89l-4.63,-1.27l-2.09,-1.29l-3.6,-1.46l-2.34,-2.54l-0.37,-1.67l1.08,-1.33l4.07,-0.27l0.81,0.64l0.25,1.57l-0.81,1.43l0.08,0.8l0.57,0.24l1.21,-0.64l0.79,-4.22l3.92,-1.96l1.43,-1.26l1.42,-2.0l0.33,-1.31l-0.18,-0.39l-0.94,-0.61l-2.3,-0.72l-6.12,3.85l-2.82,1.04l-1.86,1.16l-2.23,2.07l-0.46,0.69l-0.63,2.4l-1.65,-0.51l-3.18,-2.06l-0.43,-0.51l1.56,-1.94l0.29,-3.92l1.77,-1.6l0.58,0.04l0.46,0.9l2.09,-0.05l4.17,-2.68l1.49,-0.06l2.3,0.59l2.63,-0.41l1.06,-0.99l-0.16,-0.63l-3.69,-1.13l-5.05,-0.27l-1.38,0.4l-1.23,1.19l-0.65,-0.93l-1.69,-0.5l-0.98,0.09l-0.99,0.78l-0.37,2.24l-1.58,1.18l-1.07,1.8l-0.07,2.14l-0.9,0.62l-2.33,-0.28l-2.01,-2.42l-1.0,-0.65l4.2,-1.87l2.13,-2.89l-0.0,-0.5l-0.61,-0.76l-1.03,-0.15l-0.4,0.42l0.06,1.06l-0.53,0.67l-1.72,-0.36l-2.31,1.39l-1.52,-0.36l-2.3,0.41l-0.94,-0.62l-0.19,-0.73l0.4,-1.18l-0.45,-1.78l-0.85,-0.67l-0.62,-0.01l-1.49,-3.58l5.13,2.0l1.66,-0.6l0.44,-1.81l1.49,1.11l3.29,0.07l1.62,-0.5l2.34,-1.34l1.61,-1.5l0.79,0.35l0.07,0.98l1.27,1.62l0.16,0.7l-0.11,0.66l-1.55,1.66l0.06,0.48l0.87,0.54l1.41,-0.88l0.68,-1.48l0.0,-1.51l-1.1,-2.27l-0.11,-1.11l1.06,-0.78l0.47,-0.84l0.03,-1.75l-0.72,-1.01l-2.64,-2.13l-4.82,-2.19l-0.99,0.71l0.07,0.59l4.91,2.19l2.28,1.79l-0.1,0.52l-3.84,0.97l-5.31,3.29l-1.32,-0.38l-1.5,-2.81l-1.35,-1.12l-0.91,-0.0l-1.21,-0.65l-0.77,0.35l-2.13,-1.26l1.06,-1.13l1.44,0.54l0.54,-0.34l0.41,-4.59l-0.57,-1.26l-2.37,-1.31l-2.61,-0.04l-5.69,-2.07l-2.77,-4.22l-0.32,-1.11l2.64,-0.04l2.1,-0.45l0.47,-1.08l-1.39,-2.21l1.16,-1.24l2.95,1.81l2.09,4.52l0.63,0.67l3.67,2.08l0.71,0.02l0.38,-0.45l-0.2,-1.52l0.92,-2.01l1.15,-0.58l0.45,-0.71l-0.88,-1.08l0.37,-0.98l-0.32,-0.54l-0.63,0.06l-0.94,0.92l-1.66,3.75l-0.65,0.44l-2.31,-3.05l0.1,-1.37l2.41,0.34l0.43,-0.25l-0.15,-0.48l-5.71,-2.55l-2.08,-2.13l3.1,-3.01l3.56,0.71l1.02,-0.49l0.14,-0.55l-0.63,-1.04l-1.07,0.08l-0.96,-0.53l-1.68,-1.78l0.35,-2.4l1.9,-0.61l2.68,1.03l0.67,-0.22l0.23,-0.56l-0.87,-1.53l-2.17,-1.28l0.83,-2.65l0.12,-2.34l0.92,-0.78l0.04,-0.39l-0.43,-0.43l-1.47,0.36l-0.56,2.48l-0.79,1.02l-0.84,3.42l-1.1,-1.04l-0.2,-9.35l0.47,-2.9l1.67,-1.35l1.39,0.12l0.82,-0.53l-0.1,-0.69l-1.96,-0.74l-2.28,0.95l-1.17,-0.33l-0.32,-1.48l-0.88,-1.27l-0.09,-3.66l3.65,0.67l4.67,-0.04l4.11,2.4l1.73,-0.32l0.32,-0.46l-0.31,-0.78l-1.21,-0.55l-1.24,-1.65l-1.24,-5.08l-0.47,-0.28l-0.68,0.36l-1.14,3.03l-0.99,0.83l-1.62,0.36l-1.62,0.21l-1.22,-0.31l-0.37,-1.75l-0.78,-0.53l-1.98,-0.56l-0.36,-0.55l1.14,-1.62l1.18,0.4l1.13,1.08l0.96,0.19l1.41,-0.88l0.35,-0.73l-0.19,-0.5l-2.26,-0.9l-1.6,-1.29l0.74,-1.21l2.85,-2.14l0.17,-0.49l-0.54,-1.37l0.6,-1.84l-0.75,-1.44l-1.48,-1.6l-2.08,-0.19l-0.46,0.65l0.09,1.01ZM510.37,893.33l-0.97,1.27l-1.7,0.73l-0.49,-0.23l-0.73,-1.45l-0.62,-0.23l-1.31,0.26l-2.05,1.11l-3.5,-0.62l-0.57,-0.61l-0.56,-1.81l-1.09,-1.08l1.69,-0.62l2.71,0.0l7.45,0.79l1.47,1.28l0.27,1.2ZM505.41,902.73l1.67,-1.52l1.07,2.27l-0.22,0.12l-2.52,-0.88ZM502.27,905.06l0.32,-0.07l2.45,0.16l-0.62,0.32l-2.15,-0.4ZM476.34,893.09l0.57,-1.17l0.37,-2.55l11.47,2.16l3.11,-1.0l2.05,0.03l0.42,0.83l-2.07,1.26l-0.27,1.07l0.59,0.5l2.35,0.22l0.85,0.75l-0.38,1.45l2.88,2.49l0.31,0.55l0.12,1.69l-1.5,-0.69l-0.72,-1.27l-0.71,-0.43l-3.28,-0.98l-3.12,-0.05l-0.53,-0.99l0.51,-1.73l-0.35,-0.75l-1.46,0.22l-2.11,-1.36l-1.37,-0.13l-0.4,0.25l-0.78,2.38l1.71,2.55l-1.78,-0.47l-1.18,-1.23l-1.47,-0.72l-0.27,-1.64l-0.55,-0.22l-1.56,0.27l-0.57,-0.89l-0.89,-0.4ZM485.33,852.61l1.5,0.19l3.38,-1.53l1.48,0.98l-0.27,35.73l-1.42,0.0l-0.65,0.41l-2.7,0.52l-4.73,-0.83l-2.72,-2.35l-0.53,-0.04l-3.54,1.65l-1.12,0.05l-1.72,-1.11l-2.71,0.93l-5.05,-1.55l-3.67,-0.34l-2.67,-1.25l-4.61,0.11l-0.59,-0.29l-0.11,-1.18l0.84,-0.28l0.4,-0.61l2.12,1.01l2.96,-1.68l2.26,0.88l1.14,-0.08l1.65,-0.58l0.68,-1.21l1.0,-0.14l0.85,0.26l-0.06,1.91l0.32,0.45l3.43,0.29l1.22,0.42l0.52,-0.29l0.04,-1.1l-2.99,-3.08l-1.27,-0.73l-1.32,-0.31l-1.1,-1.92l-0.04,-3.37l2.41,-0.91l0.23,-0.52l-0.53,-1.36l1.25,-1.16l0.95,3.93l0.59,1.21l-2.45,0.15l-0.35,0.59l1.14,2.16l2.0,0.89l1.44,1.43l0.23,1.34l1.09,0.58l2.22,0.03l1.49,-0.23l1.38,-0.98l1.29,0.86l3.01,1.16l0.56,2.06l0.51,0.28l0.89,-0.36l1.4,-1.56l1.03,-0.51l0.18,-0.67l-0.23,-0.37l-11.3,-4.9l-1.08,-1.49l-0.74,-1.91l0.02,-1.85l0.53,-0.49l8.91,-3.99l0.13,-1.39l-0.52,-0.9l-1.74,-0.7l-2.98,-0.08l-1.57,0.25l-2.52,1.07l-1.31,-0.06l-1.25,-0.53l-0.93,-1.07l-0.49,-1.48l0.18,-1.75l0.53,-0.81l2.31,-0.59l0.93,-1.2l-0.47,-0.86l-1.19,-0.72l-1.09,-1.31l1.56,-0.15l2.22,1.5l1.14,0.02l2.18,-1.55l3.08,-3.78l0.68,-0.06l2.85,2.82ZM458.81,889.3l0.04,-0.8l1.28,0.06l-0.34,0.09l-0.98,0.65ZM460.72,888.6l0.33,0.03l1.27,0.37l1.04,0.02l0.74,1.15l1.65,0.51l4.58,-0.94l1.4,2.27l-0.11,0.49l-1.77,0.89l-0.4,-0.13l-0.16,-0.7l-0.67,-0.66l-1.7,0.31l-2.48,-0.71l-0.56,-1.12l-3.17,-1.79ZM458.58,875.06l2.71,1.34l1.54,0.03l0.2,1.77l-1.23,1.74l-4.09,-2.32l-0.93,0.22l-2.48,-0.25l-0.87,0.82l-1.04,0.27l-0.32,-1.34l-2.67,-2.48l0.58,-1.36l1.6,-0.8l5.07,1.12l1.93,1.24ZM438.65,864.65l1.03,0.56l0.79,2.23l2.68,-0.15l2.32,0.47l2.9,3.18l-0.97,0.77l-0.8,1.95l-2.08,1.35l-1.35,0.09l-2.16,0.77l-0.61,-0.39l0.72,-0.36l1.21,-1.44l0.31,-1.69l-0.31,-0.45l-3.75,-0.34l-0.6,1.48l0.13,1.14l-1.08,-0.26l-0.95,-0.58l0.16,-2.27l-0.37,-1.33l-0.41,-0.2l-1.6,0.2l-1.15,-1.14l-0.69,-1.35l-1.99,-0.49l1.28,-1.3l2.55,-0.24l1.05,0.96l3.21,0.69l0.48,-0.46l-0.18,-0.99l0.25,-0.42ZM439.33,729.48l-2.73,1.11l-1.19,-0.32l-0.46,-0.71l-0.5,-1.71l1.87,-2.12l0.27,-1.98l2.3,0.57l2.16,1.05l0.67,0.63l0.08,0.3l-1.49,2.26l-0.98,0.92ZM419.21,853.86l2.7,1.87l0.72,1.21l3.81,0.62l3.46,1.49l1.44,0.21l1.26,0.9l1.17,0.32l3.01,2.72l-4.07,-0.81l-0.51,-1.2l-2.13,-1.78l-0.98,-0.45l-1.61,-0.37l-3.31,0.05l-3.27,-2.45l-0.7,-1.33l-0.99,-1.0ZM427.21,686.6l3.24,1.04l2.21,0.26l0.85,3.61l0.35,0.46l-0.13,0.83l-1.17,0.84l0.1,1.13l0.46,0.84l-2.58,1.0l-0.9,0.6l-0.13,0.52l1.47,1.82l1.25,0.84l1.43,2.3l-1.07,1.68l-2.38,1.18l-0.25,0.4l0.13,1.82l-0.3,0.56l-1.44,0.31l-2.32,-0.2l-2.93,-1.55l1.12,-2.0l0.98,-3.0l0.64,-4.2l-0.5,-1.69l0.34,-3.03l1.17,-2.29l0.64,-3.09l-0.28,-0.96ZM431.41,730.15l-1.49,-2.32l0.34,-0.97l0.45,-0.15l0.56,0.72l0.14,2.72ZM428.94,737.79l-2.39,-0.13l-0.1,-1.99l-1.2,-0.71l-1.78,-3.35l-2.95,-3.65l1.21,-0.69l0.2,-0.41l-0.21,-1.38l1.98,-0.93l1.14,0.42l0.96,-0.16l0.63,-0.49l0.26,-3.05l0.84,-0.54l0.79,-0.05l0.9,1.31l1.3,0.6l-0.33,1.3l-0.44,0.47l-2.38,0.87l-0.37,0.96l-0.07,0.79l1.53,2.24l0.99,3.12l0.08,1.32l0.72,1.35l-0.26,1.83l-0.65,0.11l-0.38,0.86ZM427.8,716.68l-1.72,-0.45l-0.06,-0.22l1.71,-0.05l1.27,-0.44l0.33,0.61l-0.8,-0.1l-0.73,0.66ZM422.28,837.67l0.49,0.19l2.74,2.06l-0.3,0.24l-1.75,-0.62l-0.88,-0.73l-0.3,-1.14ZM423.33,743.11l-0.65,0.64l-0.93,0.26l-1.03,-0.46l-1.22,0.14l-0.08,-0.6l2.3,-3.45l-0.04,-2.1l0.85,-1.09l0.75,-0.25l0.2,1.05l-0.35,2.73l1.02,2.25l-0.82,0.88ZM421.18,796.33l0.11,2.25l-0.66,5.2l0.08,0.57l0.67,0.5l-0.41,2.43l-0.99,2.09l-1.58,0.1l-0.47,-1.05l-0.16,-1.88l-0.67,-1.3l0.2,-1.1l0.62,-0.66l0.08,-1.29l1.01,-1.22l-0.39,-0.76l-0.5,0.04l-2.74,1.88l-0.41,1.25l-0.04,2.29l-0.6,1.25l-2.57,-0.07l-1.74,-1.16l-1.09,0.16l-0.15,-0.91l0.42,-0.83l1.96,0.09l0.41,-0.33l0.38,-2.1l-1.86,-2.16l1.36,-1.04l1.27,0.38l1.58,-0.35l0.31,-0.42l-0.09,-1.32l-1.31,-0.78l0.16,-0.5l2.77,-1.9l0.18,-1.38l-0.4,-1.13l0.82,-0.97l1.46,-0.33l1.08,0.6l1.11,0.15l0.8,5.73ZM417.08,836.08l0.53,2.87l0.6,0.57l1.09,0.2l1.17,1.4l-1.52,2.77l-0.33,1.71l-1.29,-0.09l-1.89,-3.53l-0.98,-3.74l0.82,-0.73l0.92,0.19l0.48,-0.37l0.05,-1.14l0.34,-0.1ZM420.19,829.96l-0.02,1.13l-0.3,0.28l-1.31,-0.42l-1.6,1.06l-2.12,-0.54l-0.48,0.17l-1.18,1.99l-1.08,1.09l1.53,-4.25l1.28,0.47l1.92,-0.62l1.74,-1.13l1.2,-0.01l0.43,0.77ZM420.06,787.59l-1.35,-0.18l-2.34,0.36l-0.88,-1.15l-0.46,-2.14l-1.95,-3.9l-0.34,-1.58l0.38,-0.52l2.56,-0.76l1.01,-1.22l0.23,0.05l-0.15,2.5l1.55,1.86l0.62,2.36l0.62,0.76l-0.08,1.15l0.58,2.42ZM418.79,712.15l-1.08,0.16l-0.14,-0.16l0.73,-0.31l0.49,0.3ZM414.38,813.99l-2.1,1.13l-0.73,-0.45l-1.15,0.0l1.18,-4.31l4.87,1.37l0.26,0.81l-1.27,0.55l-1.07,0.9ZM413.76,775.65l-0.43,0.1l-0.62,-0.81l1.54,-0.76l1.55,0.37l-2.04,1.1ZM414.42,731.21l-0.29,-0.22l-0.04,-0.55l0.22,0.22l0.1,0.54ZM413.58,791.47l-0.09,1.08l-1.69,2.26l-2.78,2.39l-0.89,-0.2l1.64,-1.82l-0.42,-1.3l-1.33,-0.92l0.13,-0.52l0.69,-0.51l0.61,0.14l2.33,-0.62l0.77,-0.49l0.94,-0.06l0.08,0.58ZM411.23,820.33l-0.25,1.09l-0.47,-0.06l-0.54,-1.41l0.6,-2.3l2.67,0.23l-1.89,1.17l-0.11,1.29ZM408.98,789.92l-0.87,0.01l-0.28,-2.31l1.59,-4.01l0.11,-1.51l-0.74,-2.09l1.62,-0.71l2.58,5.86l-0.03,2.8l-0.61,0.58l-2.43,0.75l-0.93,0.64ZM368.15,572.05l0.38,-0.32l0.5,0.2l-0.87,0.12ZM1.37,485.84l-0.92,0.2l0.24,-0.38l0.68,0.18Z", "name": "Chile"}, "SR": {"path": "M630.17,84.15l0.35,-0.04l1.45,-4.82l0.82,-0.52l5.91,0.65l2.74,0.63l3.38,1.03l0.43,0.99l0.44,0.23l0.32,-0.38l-0.12,-2.19l0.73,-0.62l2.0,-0.27l3.19,0.4l2.87,-0.49l3.73,0.06l5.71,0.94l3.37,1.1l0.06,2.07l-0.39,1.21l-0.86,1.63l-2.1,2.06l-1.49,2.14l-0.32,1.39l0.03,2.07l0.54,1.95l-0.27,1.27l0.61,3.33l0.66,0.91l-0.03,1.12l1.19,1.9l1.7,1.59l1.37,1.96l-0.2,1.55l-2.31,3.72l0.36,1.9l-0.28,1.97l-2.39,4.14l-0.91,0.49l-0.63,0.83l-1.15,0.19l-0.77,-1.36l-1.74,-0.06l-1.53,-1.83l-1.2,0.61l-1.43,0.03l-1.78,0.68l-0.62,0.59l-3.9,0.38l-2.9,-1.35l-0.63,0.39l-0.4,1.35l-1.23,1.03l-0.21,0.69l2.66,2.86l-0.36,1.71l-0.5,0.13l-5.12,-1.07l-1.35,-0.88l-1.53,-0.33l-2.61,-4.14l-2.1,-4.49l-1.17,-1.15l-0.33,-2.82l-0.58,-0.87l-0.35,-2.56l-1.82,-0.18l-1.43,0.27l-0.9,-0.38l-0.08,-1.49l-2.15,-1.87l-0.91,-2.15l-1.48,-1.73l-0.24,-1.06l-0.0,-0.68l1.22,-2.08l1.28,-3.91l-0.81,-1.91l0.64,-0.92l1.59,-0.82l4.71,-0.47l0.36,-1.17l1.19,-1.16l-0.16,-0.71l-0.8,-0.35l-0.28,-0.65l1.21,-2.21Z", "name": "Suriname"}, "BO": {"path": "M481.86,363.93l-0.21,-1.65l-1.26,-1.21l0.02,-0.65l2.3,-1.5l2.8,-3.83l2.14,-1.55l0.02,-0.91l1.11,0.37l0.77,-0.25l0.19,-0.99l-0.51,-0.9l1.73,-0.47l0.58,-0.69l1.21,-0.3l0.26,-0.47l-0.32,-1.04l-2.78,-0.6l-0.49,-0.84l1.01,-1.29l-0.11,-0.53l-0.63,-0.37l-1.83,-0.26l-0.33,-1.39l-3.24,-2.34l-0.58,-1.06l2.22,-3.47l-2.41,-3.34l0.15,-1.72l1.02,-0.74l0.47,-1.71l2.61,-2.67l0.2,-1.48l1.26,-0.63l0.35,-0.61l-2.38,-6.1l1.04,-2.26l0.06,-7.46l1.18,-1.34l1.33,-0.85l0.11,-1.16l0.88,-1.61l-10.45,-18.37l3.51,0.07l4.51,0.67l1.37,1.31l1.63,-0.14l3.87,-1.71l2.83,-3.26l0.83,-0.3l3.51,-0.07l1.61,-2.08l1.92,-1.36l3.68,-1.48l4.62,-3.59l1.77,-0.87l3.72,-0.89l4.04,-0.49l2.49,-0.2l0.99,0.48l0.95,-0.14l0.97,-0.85l0.72,-0.19l0.84,1.57l-0.16,1.89l0.31,1.46l-0.15,1.15l-1.43,2.29l-0.19,0.88l0.1,1.14l1.27,3.72l0.11,1.43l-0.82,1.92l0.03,0.89l0.63,1.05l0.24,1.47l1.7,2.39l-0.1,1.25l0.44,0.48l0.86,-0.25l1.28,2.87l1.94,0.67l2.56,2.08l1.11,0.55l1.33,2.4l5.84,1.11l1.96,-0.72l1.04,0.09l4.11,2.47l1.17,0.34l1.1,-0.52l0.89,-0.03l0.72,1.68l3.03,2.37l1.08,0.03l4.06,1.69l2.55,0.23l0.32,0.99l1.84,2.04l1.92,1.5l3.64,0.25l5.13,-0.61l6.65,3.58l1.09,2.5l-0.82,2.12l0.27,1.16l0.71,0.79l0.67,2.82l0.47,0.65l0.28,5.26l-3.33,0.11l-0.36,0.27l4.1,5.0l0.79,9.64l0.38,0.37l19.75,0.73l1.97,-0.5l-0.1,1.98l-1.37,1.87l-0.16,0.81l0.99,6.73l0.78,0.89l4.27,2.85l1.18,0.31l0.8,-0.18l0.43,1.68l2.34,5.61l0.68,1.01l-0.54,0.67l-2.52,7.93l0.63,0.53l0.1,0.87l-0.91,0.62l-3.99,8.31l0.09,0.47l3.01,2.72l-1.73,0.63l-0.82,1.1l-0.15,-3.41l-0.43,-0.75l-11.19,-6.72l-11.14,0.15l-21.08,4.35l-2.23,5.36l-4.3,6.32l-0.08,6.51l-4.26,14.13l-0.68,-0.53l-1.41,-2.18l-10.12,0.08l-0.61,0.29l-1.77,-0.23l-1.61,1.02l-3.5,6.73l-0.46,2.17l-1.91,-5.07l-1.19,-2.03l-4.8,-1.55l-9.25,-0.11l-3.98,-3.34l-1.59,-0.44l-0.74,0.64l-1.29,3.36l-4.25,1.41l-1.05,2.39l-2.8,1.82l-0.35,1.35l-1.55,1.99l-4.43,0.85l-1.48,-0.03l-0.91,-0.11l-0.84,-0.59l0.02,-3.95l-0.82,-2.06l-0.48,-3.53l-1.09,-1.06l-0.4,-2.73l-0.9,-1.77l-0.19,-4.12l-2.87,-4.43l-1.45,-0.57l-0.05,-1.9l0.83,-0.91l0.04,-0.69l-3.11,-2.12l-0.12,-0.34l0.82,-1.46l-0.77,-2.37l1.56,-0.39l0.8,-1.36l-0.24,-1.54l-1.39,-1.46l2.68,-3.41l0.02,-0.7l-4.8,-4.15l-1.19,-1.38l-1.5,-8.5l-0.6,-1.61l0.58,-1.29l-2.69,-1.51l-0.59,-2.16l-1.57,-1.8l-0.17,-1.28ZM486.75,346.77l0.46,0.22l0.77,0.76l-1.43,-0.14l0.2,-0.84Z", "name": "Bolivia"}, "EC": {"path": "M351.85,191.66l1.45,-0.54l2.45,-2.11l2.84,-7.02l-0.16,-1.37l-0.93,-1.61l-0.24,-3.45l-0.73,-0.13l-0.62,0.94l0.09,3.51l-0.46,1.28l-0.51,0.17l0.25,-2.18l-0.2,-0.4l-0.44,0.04l-0.66,0.57l-0.86,1.59l-1.41,1.18l-0.32,0.73l-1.61,-0.8l-2.8,-2.73l-1.94,-0.65l-1.01,-0.87l-0.22,-0.49l2.26,-1.55l0.12,-1.71l-0.06,-1.52l-0.83,-2.2l0.39,-3.03l-1.17,-3.56l0.56,-0.96l2.49,-0.87l0.95,-0.67l1.14,-2.98l1.0,0.37l0.92,-0.06l0.37,-0.34l-0.26,-0.43l-1.09,-0.39l-1.02,-2.17l1.78,-2.24l2.28,-1.95l1.12,-2.03l0.3,-3.34l-0.73,-4.29l0.4,-0.38l1.61,-0.33l1.92,-1.38l1.59,0.04l1.72,-1.04l6.8,-1.76l1.07,-1.21l-0.1,-1.21l1.36,1.47l2.02,1.0l4.03,2.8l4.28,1.74l1.43,-0.1l0.65,1.28l2.05,0.92l0.52,2.44l0.59,0.67l1.33,0.42l2.12,0.08l3.42,1.27l0.96,0.06l0.59,-0.33l2.57,0.42l1.22,-0.63l0.33,-1.5l1.04,-0.35l2.36,1.09l2.19,2.28l1.32,0.81l1.98,0.36l3.17,1.71l-1.28,0.15l-1.85,-0.4l-0.39,0.33l0.12,0.83l1.57,1.0l0.77,1.85l1.95,1.98l-0.28,1.41l0.37,2.77l-0.61,-0.0l-0.67,-0.46l-0.58,0.22l-1.94,7.25l-6.17,7.17l-7.02,5.12l-14.19,5.04l-1.12,0.92l-2.95,3.66l-0.2,0.76l0.39,0.66l-0.22,0.09l-0.77,-1.05l-1.0,-0.0l-0.87,2.64l-0.28,2.18l-1.56,2.57l-1.54,4.05l-0.1,0.81l0.37,0.91l-0.32,1.01l-2.62,1.84l-0.31,0.83l0.1,0.87l-0.66,0.3l-0.63,1.05l-3.05,-0.51l-1.42,-1.84l-0.86,-2.87l-1.45,-1.0l-2.06,0.17l-4.33,-2.15l-0.89,0.3l-1.11,1.23l-0.93,0.48l-0.72,-0.26l1.5,-2.18l-0.31,-0.63l-1.26,-0.29l-0.07,-1.44l0.36,-0.21l1.55,0.28l1.86,-1.75l-0.53,-1.83l0.08,-1.57l-0.86,-2.63ZM367.75,135.25l-0.11,-0.03l0.13,-0.1l-0.01,0.13ZM353.01,186.43l-0.93,0.17l0.51,-2.41l1.47,-0.87l1.33,0.35l-0.78,0.7l-0.97,0.33l-0.64,1.74ZM239.56,161.54l2.01,-1.78l1.29,-0.3l-1.73,1.91l-1.15,0.4l-0.42,-0.23ZM230.19,159.62l-1.94,-0.96l0.08,-0.76l0.56,-0.58l2.12,-0.35l0.7,0.5l-0.07,1.02l-0.66,0.81l-0.8,0.31ZM229.08,166.48l-0.46,-0.21l0.18,-0.33l0.5,0.31l-0.21,0.23ZM227.12,154.48l-0.32,0.21l-2.0,-0.37l-0.4,-0.39l0.64,-0.84l1.09,0.28l1.08,0.84l-0.1,0.27ZM215.69,150.78l0.98,-0.97l1.2,-0.19l1.54,1.76l0.5,2.31l2.33,2.26l0.2,2.12l1.8,1.75l-1.07,1.91l-2.51,0.88l-2.75,-0.03l-1.06,-0.9l-0.09,-0.51l0.33,-0.54l1.4,-1.05l2.24,-0.99l0.5,-1.0l-0.96,-1.14l-0.73,-1.56l-1.32,-0.95l-0.69,-3.03l-0.75,-0.45l-1.09,0.32ZM214.83,154.5l1.78,-0.28l0.48,0.53l-0.01,0.91l-1.08,0.4l-0.8,-0.32l-0.38,-1.24Z", "name": "Ecuador"}, "AR": {"path": "M473.96,528.95l0.46,0.15l2.01,-0.59l1.39,-2.75l-0.23,-0.72l-1.1,-0.6l0.35,-3.93l-1.18,-5.81l0.31,-0.8l2.07,-2.06l1.02,-4.17l0.11,-1.86l0.57,-1.07l0.35,-1.83l1.49,-1.59l0.45,-1.02l0.64,-0.19l2.22,-2.83l1.05,-0.85l2.06,-6.05l0.72,-0.66l1.12,-3.14l1.2,-0.48l0.86,0.54l0.72,-0.11l0.82,-0.75l2.23,-0.72l0.55,-0.92l-0.04,-1.64l-2.0,-2.68l-1.22,-2.41l0.17,-1.34l1.97,-2.76l-1.17,-5.37l-1.06,-3.23l0.09,-0.73l1.02,-3.03l1.2,-0.52l0.28,-0.62l-0.98,-2.35l-1.14,-1.13l0.0,-0.97l0.57,-1.31l3.05,-3.0l10.9,-4.77l4.19,-13.16l-2.11,-2.45l1.48,-1.86l0.32,-1.31l2.81,-1.83l0.94,-2.25l4.28,-1.44l1.58,-3.75l1.06,0.33l4.14,3.41l9.37,0.13l4.45,1.42l3.34,7.52l0.68,-0.05l0.74,-2.9l3.44,-6.6l0.54,-0.46l0.95,-0.24l1.32,0.27l0.61,-0.3l9.74,-0.09l1.03,1.86l1.02,0.82l0.51,0.95l3.04,1.88l1.84,2.11l3.5,5.73l3.04,2.7l1.89,1.08l0.22,0.5l3.58,2.1l1.4,1.19l0.75,1.36l2.4,1.34l4.03,1.35l2.97,0.65l1.85,-0.05l2.51,1.03l8.51,6.0l5.59,2.87l2.49,0.74l1.88,1.5l2.78,0.24l3.65,1.96l2.73,3.33l0.17,1.32l-2.12,1.99l-1.73,4.07l-2.27,1.67l-1.21,2.2l-0.31,1.14l0.16,3.0l-0.54,0.62l-0.12,0.78l-0.83,0.78l-0.17,0.89l-1.2,0.66l-1.34,2.09l-0.95,0.79l-0.28,1.07l0.45,1.54l0.42,0.29l5.22,-0.53l4.22,0.55l5.05,1.47l3.42,0.53l1.77,-0.44l1.05,0.05l0.9,0.58l1.08,0.12l1.4,-0.32l0.92,0.21l1.19,0.88l1.05,-0.4l0.7,-1.25l1.58,-1.38l2.31,0.06l2.07,1.19l1.14,-0.1l1.1,-0.88l0.76,-2.58l0.82,-0.47l0.87,-1.35l3.35,-0.94l0.3,-0.78l1.92,-1.53l0.38,-0.77l1.34,-0.71l0.88,-1.61l0.95,-2.96l0.56,-3.95l0.18,-5.15l1.57,0.61l3.51,-1.28l0.68,0.52l0.92,0.15l0.59,0.76l0.76,0.34l0.79,3.64l1.78,3.33l0.02,0.61l-0.51,0.9l-0.51,5.12l0.42,1.72l-1.35,2.85l-3.01,1.84l-0.78,-0.14l-1.97,2.14l-2.74,0.4l-1.41,0.97l-1.88,0.28l-0.78,0.84l-0.43,1.4l-1.48,0.69l-0.64,1.2l-1.73,0.44l-1.24,0.74l-1.56,1.73l-3.02,1.52l-0.41,0.87l0.8,1.42l-1.74,-0.39l-0.79,0.44l-0.2,0.99l-0.87,0.46l-0.66,1.28l-2.26,1.99l-1.22,1.59l-0.83,1.85l-0.91,1.14l-1.07,0.56l-0.89,0.94l-0.49,1.19l-3.15,3.95l-1.76,1.55l-1.69,0.93l-0.92,0.98l-0.28,1.19l-0.96,1.13l-1.88,1.37l-1.05,1.21l-0.15,1.03l-2.07,2.5l-0.58,1.4l0.63,1.84l0.09,1.8l-1.04,1.5l0.33,0.94l-0.26,1.96l-1.64,2.86l-0.3,1.17l0.77,1.71l-0.6,1.84l-1.37,1.24l-0.42,0.89l0.32,1.06l-0.05,2.63l0.53,0.9l-1.2,4.04l0.57,5.32l-0.77,1.29l-1.56,0.0l-0.71,0.77l-1.48,7.43l0.2,1.36l1.47,4.18l0.18,1.62l-0.36,0.56l-1.07,0.61l-0.14,0.44l0.75,2.26l2.24,3.13l6.39,2.98l2.56,1.67l2.88,2.27l1.51,2.24l0.12,1.7l-2.34,3.03l-0.26,2.47l0.5,1.89l0.96,1.8l2.38,2.17l1.86,0.81l2.04,-0.08l0.44,0.8l0.35,4.18l-0.04,1.5l-0.62,1.38l-4.32,6.74l-3.74,4.2l-1.34,2.3l-0.5,2.47l-1.07,1.05l-6.36,3.69l-9.93,3.32l-9.89,2.31l-15.4,2.17l-3.23,-0.17l-2.65,0.25l-5.41,-1.08l-1.39,-1.41l-2.0,-0.3l-0.86,0.93l0.78,2.17l-0.37,2.39l0.52,1.31l2.39,1.35l-0.65,0.04l-0.29,0.65l1.14,1.1l-0.61,4.69l-1.86,1.06l-1.43,4.43l-0.29,2.43l0.44,1.56l1.69,2.93l-0.58,1.74l-1.0,0.98l-6.7,3.09l-2.98,0.6l-4.88,0.1l-1.73,-0.13l-7.32,-3.25l-5.0,-1.43l-0.08,-0.95l-0.88,-0.32l-0.82,-0.01l-1.84,1.06l-0.9,1.19l-0.33,3.53l1.65,6.64l0.13,2.48l-0.62,3.2l0.91,2.16l1.29,1.08l3.25,1.4l1.05,-0.01l-0.58,0.82l-0.04,1.13l0.34,0.38l1.82,0.26l3.99,-0.57l0.71,-0.75l0.1,-1.51l-0.36,-0.4l-1.24,-0.12l4.3,-1.27l1.11,0.91l0.61,1.26l0.39,1.71l-0.25,4.05l-0.77,1.36l-3.88,1.04l-0.91,-0.23l-0.94,-1.35l-0.41,-1.69l-0.92,-1.08l-2.33,-0.99l-1.96,0.26l-2.07,1.51l-2.09,0.67l-0.68,1.35l0.19,0.54l4.86,2.21l3.18,0.66l-0.89,0.79l-3.35,1.1l-1.64,0.86l-1.82,1.6l-3.26,4.16l-0.41,0.97l-0.25,2.32l0.77,3.84l-0.81,1.79l0.49,1.69l-1.06,2.66l-3.52,2.87l-0.61,2.0l1.17,1.45l-0.33,1.41l-6.58,-0.59l-1.94,1.05l-2.77,2.17l-3.52,0.65l-0.85,0.5l-3.91,4.88l-4.18,7.24l-0.14,1.85l0.28,1.65l1.05,2.81l1.48,1.71l7.35,6.86l1.76,0.71l7.78,0.73l1.59,0.87l0.93,1.39l0.33,1.21l-0.43,3.28l-0.42,0.96l-2.56,2.08l-2.17,0.65l-0.12,0.7l0.91,0.55l2.79,-0.45l0.6,0.29l0.41,0.85l-0.86,0.38l-1.39,1.74l-4.48,3.93l-7.74,4.44l-5.32,5.15l-2.69,4.75l-0.11,0.89l0.36,0.73l-1.43,7.88l-0.45,0.84l-0.98,0.95l-2.69,1.62l-1.13,0.18l-1.61,-0.88l-0.93,-0.94l-2.16,-3.52l-0.43,-0.17l-0.36,0.99l0.39,1.16l-0.19,0.77l-2.77,0.48l-0.96,0.6l-0.15,0.47l0.41,0.27l2.68,-0.24l1.75,0.32l0.66,0.35l1.1,1.56l-3.63,1.63l-2.35,1.64l-1.41,2.02l-0.57,1.39l-0.78,4.41l-2.45,2.86l0.68,0.51l1.37,-0.7l1.48,4.57l0.36,2.8l-0.19,0.64l-3.33,0.16l-1.39,0.42l-0.09,0.72l0.94,0.47l1.02,-0.13l1.48,0.91l1.89,-0.33l0.64,0.52l3.27,5.36l2.93,3.8l-2.82,-0.52l-5.89,-1.92l-3.46,-0.02l-5.75,-2.06l-23.82,-0.5l0.07,-1.42l-2.24,-2.22l-1.59,-0.86l-1.49,-2.15l1.2,-3.82l0.02,-1.21l-0.72,-1.02l-0.18,-0.99l0.82,-0.95l0.37,-1.96l-0.78,-3.81l-0.86,-1.01l-1.53,-0.46l-1.45,0.63l-2.26,-0.13l-3.28,1.88l-0.47,-0.19l-1.15,-2.68l-0.74,-3.15l-0.9,-2.07l-1.36,-1.66l-0.32,-3.17l0.68,-1.98l-1.25,-3.28l0.23,-1.63l0.78,-0.95l0.29,-1.18l3.63,-0.19l0.38,-0.44l-0.15,-1.65l1.3,-2.52l0.52,-0.49l3.11,-1.3l1.45,-1.7l0.4,-2.2l-0.26,-2.18l1.14,-1.3l1.89,-1.0l0.74,-2.11l-0.47,-2.19l-0.96,-1.45l-1.17,-0.68l-0.08,-1.18l2.08,-4.55l-0.0,-1.23l2.75,-2.14l0.81,-1.58l1.74,-0.87l0.05,-0.87l-0.66,-1.04l-0.09,-0.95l0.25,-2.56l2.39,-1.85l0.54,-1.11l0.05,-1.2l-0.82,-3.96l-1.24,-2.26l2.0,-1.48l0.79,-1.5l-0.59,-1.49l-0.84,-0.64l-0.23,-1.49l0.29,-2.0l0.45,-0.47l2.1,-0.31l0.33,-0.32l0.19,-0.99l1.61,-1.49l0.07,-1.82l-1.18,-1.19l-2.03,-2.93l-5.17,-1.09l-0.24,-1.12l1.0,0.2l5.95,-0.6l1.34,0.5l1.17,-0.33l0.74,-2.18l0.77,-1.17l-0.0,-1.3l-0.96,-0.9l-7.07,-0.84l0.17,-3.57l1.56,-2.91l-1.25,-2.39l0.59,-0.74l-0.17,-1.81l-1.85,-2.23l0.0,-0.95l1.51,-0.72l0.33,-1.32l-0.66,-1.29l-3.17,-0.91l-0.9,-1.35l0.38,-3.09l-0.34,-2.79l1.06,-1.66l-0.3,-1.67l-0.52,-0.87l1.04,-1.82l0.81,0.36l1.09,-0.32l1.2,-0.67l0.33,-1.08l-1.15,-4.16l-0.76,-1.67l0.46,-1.3l-0.25,-2.38l0.23,-7.15l-0.81,-1.6l0.09,-1.19l1.5,-3.54l1.18,-0.92l0.16,-0.66l-0.38,-0.82l-0.91,-0.79l-0.16,-0.74l0.4,-0.78l0.92,-0.21l0.58,-1.19l0.26,-1.88l-0.94,-3.56l0.36,-0.25l1.46,0.09l0.31,-0.32l1.44,-4.49l-0.06,-4.24l0.23,-0.56l1.26,-1.13l2.32,-1.2l1.81,-0.4l0.72,-0.9l0.62,-2.06l-1.48,-1.62l-0.72,-5.62l-1.66,-3.84l-0.21,-1.7l0.61,-2.54l-0.75,-2.08l0.96,-2.64l-0.86,-3.73l1.39,-2.5l0.17,-1.65l1.68,-1.34l1.87,-0.39l0.51,-1.65l1.76,-1.73l1.41,-0.35l0.63,-0.98l-0.06,-2.7l0.41,-1.58l-0.42,-3.32l-0.49,-1.07l-0.2,-1.79l-0.8,-0.42l-0.14,-0.43l1.89,-1.38l1.26,-5.65l2.24,-4.03l0.58,-1.68l1.82,-0.5l0.63,-0.84l-0.5,-6.64l0.14,-1.69l1.02,-2.88l-0.26,-1.54l-1.15,-0.74l-1.45,0.27l-0.63,-0.75l-0.08,-2.03l0.62,-0.91l0.24,-1.06l-1.17,-1.35l-0.68,-2.27l0.09,-2.0l-0.76,-0.8l-0.31,-1.47l-0.79,-0.73l-0.48,-2.22l0.84,-0.54l0.42,-1.35l-1.02,-1.13l-0.87,-0.06l-0.48,-0.39l-1.55,-3.48l0.76,-5.32l1.29,-0.18l1.15,-1.42l0.08,-0.71l-0.42,-1.13l2.2,-6.0l-0.02,-0.61ZM571.67,647.98l1.23,0.43l0.29,0.6l-1.36,-0.77l-0.16,-0.25ZM541.48,886.55l1.2,0.32l3.93,-0.29l0.99,0.34l2.02,-0.31l-1.35,0.62l-0.7,-0.27l-3.55,0.07l-2.46,0.8l-1.34,0.91l-0.82,-0.48l-0.13,-0.25l0.51,-0.54l0.82,-0.08l0.87,-0.83ZM492.22,887.65l0.26,-34.63l2.78,3.31l0.75,1.5l-0.52,-0.13l-1.18,0.58l-0.75,1.11l-0.56,1.25l0.45,1.58l1.47,0.75l2.65,0.18l1.72,4.11l8.65,8.05l5.23,2.91l4.86,3.63l2.79,1.57l5.91,2.01l4.67,-0.34l1.27,0.09l0.53,0.4l-1.76,2.89l-1.36,0.55l-5.76,0.07l-1.38,0.64l-2.74,0.36l-2.57,0.87l-4.9,-1.76l-2.46,-0.38l-8.05,-0.59l-5.18,-0.86l-4.82,0.28Z", "name": "Argentina"}, "GY": {"path": "M598.52,50.1l0.76,0.22l0.42,-0.4l0.34,0.08l5.53,3.44l4.64,4.08l3.57,4.02l0.35,0.75l-0.04,3.3l-1.23,2.39l-0.37,4.09l-0.67,1.27l0.1,0.49l0.5,0.01l0.95,-0.74l0.44,-2.3l1.71,-2.5l1.14,-0.28l3.62,1.06l4.43,3.98l0.78,1.37l2.53,0.88l1.27,1.03l0.38,0.84l0.27,2.46l-0.41,4.02l-1.38,2.79l0.47,1.07l0.8,0.3l-1.11,0.99l-0.16,0.92l-4.43,0.32l-2.29,1.47l-0.51,1.1l0.82,1.74l-1.2,3.69l-1.22,2.07l-0.06,1.16l0.35,1.38l1.48,1.73l0.85,2.07l2.18,1.95l-0.05,1.1l0.3,0.58l1.37,0.55l2.73,-0.29l0.14,2.2l0.56,0.74l0.44,3.14l1.17,1.17l2.07,4.42l2.75,4.35l2.21,0.78l-3.46,0.45l-1.99,-0.46l-1.32,-1.11l-2.68,0.63l-1.31,0.8l-1.51,2.09l-2.8,0.25l-2.26,0.62l-0.77,1.56l-0.96,0.03l-0.44,-0.37l-2.19,-0.49l-0.91,1.33l-1.28,0.56l-0.05,1.78l-1.84,0.03l-1.69,0.96l-1.63,-1.23l-3.07,-0.84l-3.57,-3.8l-1.47,-0.57l-0.22,-1.23l-0.86,-0.46l0.0,-4.44l-1.67,-1.27l-1.21,-3.79l0.26,-3.48l1.71,-4.39l-0.24,-2.7l1.89,-1.21l1.72,-3.26l-2.23,-3.51l0.45,-1.51l-0.18,-0.59l-1.8,-1.24l-3.38,-0.49l1.36,-2.28l0.33,-4.49l-0.98,-0.69l-0.77,-1.12l-1.39,-0.36l-1.34,0.67l-4.68,-0.05l-7.5,-8.41l3.02,-3.15l-0.19,-3.05l-0.61,-1.7l0.53,-0.98l2.28,-0.39l0.88,-0.66l1.99,0.14l3.81,-2.09l0.73,-0.93l0.38,-1.24l-0.19,-0.78l-1.05,-0.46l-2.1,0.14l-0.42,-0.47l0.3,-1.31l-1.33,-2.28l1.23,-1.3l1.02,-1.86l1.67,-0.24l2.39,-1.98l1.71,-0.7l0.91,-1.72l1.48,-0.8l0.2,-1.14Z", "name": "Guyana"}, "BR": {"path": "M468.22,283.24l0.06,-13.55l0.81,-1.43l-0.35,-1.23l0.59,-2.44l-0.45,-0.11l-1.19,0.51l-7.26,5.93l-4.28,0.45l-6.49,-0.01l-0.05,-1.87l-0.91,-0.74l-0.72,-2.6l-0.86,-0.74l-5.41,-1.29l-3.99,-0.01l2.34,-2.87l-0.05,-2.06l-2.76,-3.32l-1.21,-0.82l-0.54,-0.87l-0.26,-1.32l-2.07,-1.47l-1.19,-3.29l-1.52,-1.65l0.7,-1.0l-0.23,-1.04l-1.22,-0.54l-1.87,-1.82l0.4,-0.6l-0.07,-1.31l2.23,-0.42l0.71,-0.74l-1.0,-2.74l0.51,-1.93l2.98,-2.61l2.01,-1.21l1.1,-0.18l1.36,-1.31l0.09,-1.76l-1.17,-2.94l3.04,-5.5l1.02,-5.98l2.2,-0.64l4.18,-3.39l6.02,-3.36l3.84,-0.41l3.49,-0.98l3.15,-0.46l2.19,-2.16l4.48,-0.24l1.87,1.73l1.49,-0.08l1.03,0.53l0.8,-0.16l0.53,-0.59l6.88,-37.63l-0.57,-1.26l-0.0,-1.07l-1.18,-1.12l-0.82,-1.85l0.26,-1.39l-0.54,-1.66l-3.58,-2.44l-1.64,-1.93l0.19,-8.2l2.73,-0.33l3.83,-1.42l0.87,0.7l1.46,0.51l1.49,-0.13l0.5,-0.59l-0.22,-2.81l-1.11,-1.78l-0.75,-0.54l-6.33,-0.34l0.04,-6.84l3.26,-0.81l2.7,0.62l13.8,0.02l0.34,-0.62l-0.86,-1.35l0.42,-1.15l1.58,2.21l0.74,0.52l0.75,0.04l1.7,-0.65l3.03,-3.33l1.52,-0.47l0.42,0.27l2.74,4.5l0.32,0.96l-0.04,4.81l0.38,0.68l2.53,-0.39l5.23,4.7l1.68,0.92l3.18,-0.41l4.38,-2.35l1.13,0.57l0.38,0.73l-0.41,0.98l0.05,0.92l0.41,0.36l1.0,-0.04l1.64,-2.26l1.15,-0.76l1.93,-2.12l3.24,-1.69l1.19,-0.02l2.83,-2.34l2.14,-0.04l1.4,-0.97l1.23,-1.28l1.16,-3.58l1.88,-0.49l3.29,-1.72l1.35,-0.23l1.03,-1.32l0.23,-1.57l-0.52,-1.18l-6.42,-0.49l-1.17,-0.4l0.46,-1.94l-0.38,-1.66l-2.14,-4.77l-0.1,-4.77l-0.73,-0.99l-3.5,-2.84l-1.15,-1.28l-1.57,-2.57l0.98,0.35l1.19,1.25l4.64,0.17l1.34,1.77l0.9,0.65l4.37,-0.13l1.72,0.54l2.05,-0.58l4.24,4.08l1.65,0.15l1.51,-1.32l0.55,-3.91l1.13,-0.25l2.2,-1.31l3.0,0.68l4.2,-1.2l3.24,-1.1l1.03,-1.42l1.37,-0.43l0.92,-0.88l1.99,0.13l1.39,-0.41l1.29,-1.9l1.94,-1.04l1.49,-1.58l0.31,-1.39l-0.91,-2.28l2.24,0.35l1.73,-0.2l0.97,-0.61l0.95,0.19l0.73,1.07l0.86,0.61l-0.47,3.84l-1.41,2.53l0.64,0.69l3.42,0.47l1.33,0.96l-0.4,1.85l2.18,3.3l-1.48,2.63l-1.97,1.26l-0.18,0.4l0.28,2.69l-1.37,3.17l-0.62,3.96l0.04,1.08l1.26,3.94l1.62,1.19l0.03,4.46l1.02,0.73l0.25,1.3l1.5,0.54l3.61,3.84l3.24,0.94l1.47,1.26l1.01,-0.07l1.28,-0.86l2.3,-0.24l0.34,-0.87l-0.18,-1.04l0.97,-0.28l0.82,-1.3l2.14,0.88l1.36,-0.04l0.59,-0.46l0.33,-1.1l2.0,-0.61l2.5,-0.08l0.71,-0.35l2.07,-2.51l2.82,-0.81l1.09,1.04l2.18,0.52l2.72,-0.48l0.86,0.13l0.79,-0.35l5.5,1.17l0.87,-0.18l0.7,-0.72l0.08,-2.13l-1.88,-2.35l-0.64,-0.31l1.25,-1.09l0.47,-1.39l2.79,1.36l4.13,-0.41l0.68,-0.61l1.78,-0.68l1.39,-0.01l0.72,-0.46l1.26,1.55l1.84,0.14l0.32,0.95l1.78,0.82l0.52,0.62l2.7,1.11l1.95,0.39l4.41,-2.72l0.4,0.47l2.78,0.68l2.1,-0.96l1.38,1.54l3.31,0.22l3.22,-2.19l0.71,-0.87l1.15,-1.82l0.1,-0.99l1.63,-3.07l1.04,-3.24l1.98,-2.21l2.12,-4.08l1.85,-1.94l0.77,-1.5l1.44,-0.93l1.27,-2.82l0.57,-0.02l1.46,0.97l1.21,1.48l1.69,4.98l0.3,4.74l2.71,7.6l0.46,2.11l1.33,3.2l-0.34,0.58l0.29,0.66l0.96,0.24l0.38,1.2l1.44,2.08l3.49,0.67l2.54,1.38l0.84,2.68l-0.21,2.92l-4.61,3.78l-0.66,1.08l-1.48,1.43l-1.41,2.58l-2.04,2.33l-0.62,0.51l-1.84,0.54l-1.67,1.95l-2.35,0.93l-0.19,1.07l-1.22,2.49l-1.81,1.87l-1.78,2.57l-0.29,3.15l-2.23,1.78l-0.33,1.85l-0.44,0.45l-0.32,0.25l-2.58,-0.38l-5.2,2.27l-0.27,0.44l0.39,0.34l4.14,0.09l1.59,0.97l3.0,-0.64l3.73,-2.35l4.23,-2.07l4.56,-3.3l0.37,0.57l-0.91,1.23l0.88,1.37l0.69,3.11l1.29,1.88l-0.04,1.56l3.48,3.09l0.49,0.04l1.67,-1.09l2.94,-1.05l3.57,1.09l4.03,-1.91l-2.02,5.74l-0.54,2.81l-0.98,1.63l0.06,0.45l0.45,0.1l1.42,-0.76l0.9,-1.21l2.96,-7.06l2.64,-1.06l3.27,-3.98l0.96,0.01l1.6,1.44l0.62,-0.26l0.17,-0.91l0.95,-0.38l0.02,-0.74l-1.2,-0.8l-0.09,-0.64l0.74,-1.01l-0.31,-1.12l1.46,-1.08l0.05,-1.17l1.21,-1.38l0.81,-0.36l0.35,-0.79l0.54,-0.22l0.71,0.64l0.55,-0.01l1.57,-1.14l1.52,0.7l1.44,-0.57l1.61,1.05l0.51,-0.5l-0.41,-0.91l0.34,-0.24l1.37,0.2l1.81,1.22l2.11,-0.01l0.73,0.43l0.79,-0.0l2.44,2.29l2.42,0.73l2.1,0.05l0.33,0.78l1.99,0.08l0.91,0.97l2.27,0.74l1.57,1.13l2.2,0.12l1.16,2.33l0.28,1.75l0.56,0.3l0.74,-0.4l1.17,-2.19l0.89,-0.34l3.58,3.06l-0.25,0.67l1.09,0.13l0.67,-0.4l0.99,1.95l0.09,1.08l-1.32,1.88l-1.09,0.44l-0.1,0.64l1.09,1.25l0.67,-0.03l0.96,-1.65l1.2,-0.56l0.45,1.62l-1.35,0.39l-0.29,1.14l-0.82,1.19l-1.6,6.86l-0.03,0.83l0.62,0.34l1.28,-0.86l2.23,-2.34l1.61,-4.97l0.76,-0.61l0.96,0.17l-0.07,0.78l-1.34,1.87l0.39,1.07l0.62,0.09l2.96,-2.6l0.92,0.07l1.56,-0.89l3.2,-0.19l0.99,-1.51l1.64,0.11l3.44,0.93l3.1,1.48l1.06,0.89l4.15,1.58l3.13,0.2l1.53,-0.68l1.64,0.66l1.1,0.88l1.98,0.47l1.95,0.24l1.63,-0.61l3.83,-0.2l4.79,-0.88l5.98,0.77l11.37,6.33l3.96,3.18l2.53,0.79l5.16,6.0l3.02,2.25l2.17,2.35l3.79,1.42l1.75,2.48l2.61,0.29l1.03,0.33l1.44,1.04l1.89,0.57l5.27,-0.03l2.22,-0.47l5.05,0.88l0.71,0.39l0.99,0.94l1.85,3.72l1.67,7.41l1.3,2.58l0.7,4.67l0.6,1.52l0.04,1.08l0.53,0.5l0.32,2.94l-0.88,5.53l0.53,2.67l-3.86,11.56l-2.17,3.59l-4.98,5.61l-1.61,-0.11l0.35,1.33l-0.35,0.71l-2.0,2.72l-2.07,1.87l-2.04,3.06l-4.4,2.27l-2.1,1.85l-1.92,2.9l-1.17,0.43l0.02,1.32l-0.93,1.32l0.03,-0.87l-0.68,-0.27l-0.45,0.46l-1.02,1.81l0.25,1.44l-0.64,1.78l-2.62,5.41l-3.97,5.99l-2.6,3.03l-1.82,1.39l-0.67,-0.05l-0.4,-2.34l-2.08,-1.75l-0.57,0.19l-0.6,1.43l-1.02,0.36l-0.2,0.71l0.88,1.08l-0.76,1.39l-0.07,1.43l-2.28,2.6l-0.78,2.9l1.18,0.47l-0.6,1.7l-0.07,3.41l0.54,1.02l0.53,-0.05l-1.21,6.7l0.76,7.39l1.38,7.47l-2.18,7.84l-1.69,8.41l-0.15,1.8l0.7,4.67l-1.32,1.59l-1.55,0.84l-0.98,0.94l-2.09,3.47l-1.08,4.92l0.48,7.96l-0.36,2.11l-0.59,1.39l-0.67,0.87l-1.96,1.26l-1.69,2.84l-0.75,2.98l-1.2,1.24l-0.23,1.61l-0.88,1.7l-2.33,2.6l-1.51,0.75l-0.86,0.83l-0.56,1.7l-1.53,2.64l-1.12,3.38l0.58,6.14l-1.29,0.95l-5.5,2.0l-1.63,0.93l-3.42,3.61l-0.08,2.12l0.43,0.62l-0.95,1.59l-6.26,-0.06l-4.45,0.34l-1.24,-0.69l0.23,-1.57l-0.25,-0.6l-1.2,-0.22l-1.28,0.58l-0.16,0.76l0.55,1.71l-0.19,0.34l-5.02,0.85l0.16,-0.43l-0.53,-0.72l-2.18,-0.72l-2.19,0.43l-1.25,0.83l-2.61,-0.07l-3.25,0.64l-0.76,0.8l0.0,1.55l1.06,0.82l-0.7,0.4l-3.56,0.66l-3.11,2.42l-1.42,0.38l-1.18,1.09l-0.44,1.4l-2.19,-0.49l-2.15,-0.01l-1.66,0.42l-10.89,5.67l-3.31,3.32l-5.47,3.68l-3.37,2.71l-1.36,0.52l-0.11,0.63l0.78,0.52l-0.14,0.69l-2.38,2.24l-0.33,-0.59l-2.52,-0.47l-1.02,0.56l0.15,1.38l-0.28,0.25l-1.7,-0.07l-0.97,-0.8l-0.48,-0.02l-0.16,0.45l0.79,1.86l2.19,0.38l0.92,0.58l-1.53,2.47l-1.57,0.57l-0.16,0.4l0.37,0.55l0.56,-0.0l0.26,0.45l-0.47,2.86l-1.5,1.12l-0.03,0.44l1.11,1.72l-0.31,3.7l0.76,2.36l0.72,3.97l-0.47,1.03l0.26,1.31l-0.83,2.49l0.44,3.44l-0.18,3.2l-0.83,2.92l-1.23,1.69l-0.1,1.74l-5.53,3.79l-2.83,2.75l-3.0,3.82l-3.47,5.76l-3.23,8.28l-5.37,8.46l-4.82,5.43l-5.34,4.0l2.3,-2.36l2.19,-1.18l1.24,-1.96l0.17,-2.82l0.38,-0.28l1.76,-0.05l0.48,-2.47l1.91,-1.11l1.11,-1.57l-0.22,-3.55l0.57,0.38l0.83,-0.23l0.61,-1.85l-0.2,-1.03l-1.3,-0.52l-3.62,1.8l-0.68,-0.05l-0.14,-1.1l-1.79,-0.92l-0.93,-2.02l-0.58,-0.33l-0.6,0.36l0.2,2.8l1.4,1.6l-0.96,1.19l-0.49,2.72l-0.25,-0.18l-0.63,0.29l-0.2,2.13l-0.88,0.77l-0.43,1.02l0.2,1.05l-2.83,2.28l-2.5,1.25l-0.67,0.69l-0.73,2.95l-1.14,1.34l-0.89,2.55l0.01,1.3l0.69,2.51l-1.61,1.95l-0.84,1.61l-2.03,5.88l-1.7,3.48l-3.17,3.48l-5.27,4.47l-1.37,-0.72l-0.13,-0.48l0.03,-0.51l0.97,-0.6l0.2,-0.8l-0.17,-1.74l0.49,-2.41l0.56,-0.71l1.62,-0.69l1.14,-2.74l0.59,-0.39l0.68,0.11l1.17,1.27l1.4,-0.15l2.4,-3.78l0.3,-2.0l-1.17,-2.14l-0.02,-1.47l-0.4,-0.71l-0.61,0.0l-0.79,0.94l-0.41,1.7l-1.6,0.91l-0.96,1.78l-1.4,0.79l-2.15,-1.05l-2.73,-2.26l-2.11,-4.77l-1.92,-1.4l-3.56,-1.27l-1.72,-1.41l-2.78,-3.56l-3.64,-1.23l-1.63,-1.44l-0.97,0.31l-0.75,-0.34l-0.87,-0.64l-1.36,-2.39l-2.39,-2.33l-0.55,-0.33l-0.63,0.06l-0.65,0.99l-1.65,1.44l-1.86,0.49l0.2,-2.78l-0.65,-1.1l-1.63,-2.02l-7.93,-6.91l-2.7,-0.05l-1.18,0.49l-1.1,1.8l-3.72,-0.27l-0.4,-0.57l2.25,-1.8l1.06,-1.25l0.27,-1.16l0.79,-0.85l1.65,-0.89l1.86,-1.64l2.03,-2.36l1.67,-2.84l1.9,-1.42l1.0,-1.25l0.89,-1.94l1.11,-1.43l2.32,-2.07l0.52,-1.12l1.06,-0.69l0.16,-0.92l1.65,0.33l0.86,-0.32l0.18,-0.78l-0.79,-1.12l0.11,-0.29l2.93,-1.46l1.59,-1.75l1.12,-0.67l1.83,-0.49l0.69,-1.23l1.62,-0.83l0.21,-0.92l0.73,-1.09l1.87,-0.28l1.27,-0.91l2.9,-0.47l0.93,-0.68l0.94,-1.38l0.64,0.16l0.89,-0.4l2.63,-1.77l1.47,-3.13l-0.4,-1.95l0.49,-4.94l0.46,-0.74l0.03,-1.04l-1.85,-3.55l-0.82,-3.73l-0.9,-0.49l-0.62,-0.8l-2.09,-0.86l-3.5,1.27l-1.6,-0.59l0.05,-1.33l2.08,-3.99l-0.18,-0.87l1.68,-6.76l0.4,-2.89l-0.44,-2.19l0.77,-0.85l-0.03,-0.65l-2.4,-1.86l-2.28,-1.16l-5.75,2.34l-1.28,0.24l-1.89,-0.31l-0.42,-0.36l-0.47,-3.21l-0.96,-1.38l0.24,-2.08l-0.42,-1.26l-0.09,-2.06l-0.51,-0.87l-0.57,-2.57l0.35,-2.84l-1.08,-1.1l-0.42,-0.82l-0.16,-1.44l-0.59,-0.75l-0.88,-0.7l-4.55,-0.49l-1.2,-1.01l-0.47,-0.99l-0.87,-0.42l-1.36,0.47l-1.16,1.51l-3.46,0.47l-3.59,-0.95l-1.19,0.23l-2.73,-0.4l-1.84,-1.03l-1.97,0.44l-0.72,-0.26l-0.24,-0.53l0.58,-1.48l-0.15,-0.96l0.38,-1.8l-0.33,-2.62l0.82,-1.63l-0.18,-0.88l0.79,-2.1l-0.04,-1.71l-0.82,-1.54l0.05,-1.76l-0.29,-0.72l-0.78,-0.47l-0.28,-2.38l-1.47,-2.18l-0.29,-1.14l0.63,-0.26l0.76,-1.06l1.5,-0.41l0.55,-0.68l-0.07,-0.51l-3.04,-2.75l3.85,-8.01l1.06,-0.72l-0.17,-1.54l-0.5,-0.39l2.35,-7.38l0.94,-0.81l-1.1,-1.49l-2.3,-5.53l-0.17,-1.36l-0.53,-0.76l-2.07,-0.13l-4.68,-3.27l-0.97,-6.42l1.54,-2.61l0.06,-2.59l-0.75,-0.37l-1.97,0.55l-19.38,-0.72l-0.78,-9.41l-3.51,-4.3l2.75,-0.09l0.39,-0.42l-0.31,-5.79l-0.5,-0.75l-0.69,-2.85l-0.78,-0.94l-0.14,-0.77l0.82,-2.12l-0.24,-1.09l-1.19,-2.0l-6.9,-3.69l-5.38,0.59l-3.26,-0.18l-1.7,-1.35l-1.73,-1.93l-0.47,-1.18l-0.91,-0.35l-1.98,-0.01l-3.97,-1.67l-1.0,-0.0l-2.8,-2.21l-0.81,-1.79l-0.82,-0.23l-1.57,0.65l-0.94,-0.28l-2.83,-1.94l-1.42,-0.56l-1.39,-0.08l-1.7,0.69l-5.5,-1.03l-1.22,-2.33l-1.15,-0.56l-2.63,-2.12l-1.82,-0.62l-1.2,-2.78l-0.55,-0.26l-0.58,0.22l0.12,-1.08l-1.74,-2.48l-0.26,-1.53l-0.56,-0.8l0.2,-1.42l0.6,-1.23l-0.15,-1.72l-1.33,-4.54l1.56,-2.91l0.23,-1.44l-0.31,-1.56l0.16,-1.96l-0.4,-1.11l-1.0,-1.11l-1.32,0.26l-0.85,0.8l-0.68,0.1l-0.95,-0.48l-2.64,0.21l-4.09,0.49l-3.89,0.94l-1.93,0.96l-4.58,3.55l-0.85,0.46l-1.22,0.15l-1.63,0.87l-2.06,1.47l-1.61,2.04l-1.17,-0.26l-2.96,0.51l-2.98,3.37l-3.62,1.57l-1.1,0.13l-0.57,-0.88l-0.92,-0.45l-4.62,-0.68l-8.83,-0.31l-3.27,1.46l-1.32,0.21l-1.09,-0.43l-0.96,-0.92l-1.19,0.28ZM790.43,433.84l-0.02,0.0l-0.01,-0.01l0.03,0.0ZM696.21,547.6l-2.86,2.1l-1.1,1.28l0.26,-1.22l-0.22,-1.57l1.88,0.51l1.04,-0.9l1.0,-0.2ZM853.5,308.31l0.11,-0.19l0.08,-0.48l0.14,0.42l-0.34,0.25ZM849.97,314.42l-0.36,-0.63l0.15,-0.14l0.39,0.01l-0.18,0.75ZM786.3,434.46l0.48,0.39l-1.39,0.38l0.65,-0.45l0.26,-0.33ZM782.69,186.02l-0.18,-0.98l0.33,-0.72l0.05,0.32l-0.21,1.37ZM777.56,166.79l0.08,-0.36l0.35,0.04l-0.43,0.32ZM773.52,444.28l-1.38,0.1l1.31,-1.56l0.35,0.64l-0.29,0.83ZM734.68,493.07l0.06,-1.19l1.05,-1.79l-0.22,1.43l-0.89,1.54ZM721.16,153.87l2.85,-0.17l1.13,-0.57l2.22,-0.04l6.36,0.82l1.64,0.46l0.51,0.55l-1.36,3.62l-0.86,0.53l0.31,1.32l-0.32,0.92l-1.57,2.51l-1.61,1.42l0.28,1.49l-1.28,1.53l-1.1,0.32l-1.33,-1.09l-0.69,0.22l-0.54,1.9l-1.01,-0.04l-1.91,-0.98l-0.56,0.3l-0.21,1.33l-0.62,0.82l-2.43,0.84l-3.04,-1.01l-0.73,0.54l-2.6,0.09l-1.3,0.52l-0.54,-0.11l-0.97,-0.93l-1.85,-5.31l0.25,-0.95l1.68,0.09l0.21,-0.98l-0.56,-0.58l-1.24,0.05l-0.66,-0.6l-0.13,-1.07l0.27,-2.96l0.63,-0.81l0.31,-2.62l0.5,-0.96l2.06,-1.29l2.43,-0.47l7.4,1.35ZM733.71,476.03l-0.38,-0.82l1.01,-1.02l-0.24,1.09l-0.39,0.75ZM723.29,151.69l-2.97,0.35l-0.92,-0.38l1.02,-0.78l2.31,-0.76l0.97,0.25l0.2,0.4l-0.62,0.92ZM719.68,147.83l0.23,0.29l-1.47,2.18l-0.77,0.3l-0.85,0.06l-1.44,-0.74l-2.34,-0.03l-0.04,-0.67l0.66,-0.89l1.67,0.04l2.89,-0.91l1.46,0.38ZM714.69,145.63l-0.92,0.26l0.24,-1.86l1.84,-0.51l0.03,0.75l-1.2,1.37ZM712.79,127.06l-1.24,0.28l-0.51,-1.16l0.16,-0.87l1.1,-0.17l0.5,1.91ZM711.3,148.79l-0.24,1.48l-1.41,-0.49l0.11,-1.28l0.93,-0.49l1.0,-1.14l0.44,-2.79l0.2,3.38l-1.03,1.32ZM708.5,152.08l-2.92,2.09l-0.9,-0.75l0.37,-1.12l1.64,-0.59l1.72,0.06l0.09,0.32ZM694.54,167.62l-0.4,0.07l1.22,-2.23l1.43,-1.36l0.14,-2.96l1.49,-2.31l1.32,-0.91l1.73,-0.25l0.86,1.15l-1.25,3.83l-2.26,2.38l-2.01,1.52l-2.26,1.07Z", "name": "Brazil"}, "PE": {"path": "M375.3,192.04l0.75,1.03l0.88,0.05l0.64,-0.63l-0.35,-1.15l3.74,-4.3l14.18,-5.04l7.27,-5.3l6.25,-7.25l1.89,-6.98l1.43,0.29l0.66,-0.63l-0.4,-2.91l0.24,-1.86l-2.01,-1.96l-0.9,-2.03l-0.91,-0.63l0.92,0.25l1.6,-0.18l1.55,-1.21l0.69,0.08l2.31,1.64l1.68,0.22l0.6,1.11l1.65,0.85l1.75,1.71l0.52,0.69l1.02,3.28l1.1,1.49l2.41,0.8l2.37,2.04l2.28,0.58l1.63,2.33l0.26,0.83l-0.31,1.42l0.35,0.65l1.94,1.26l1.14,-0.09l0.51,0.46l0.8,2.82l-0.52,1.48l0.22,1.04l2.15,0.98l0.71,0.7l1.72,0.15l2.17,-0.63l2.66,0.89l2.35,-0.33l2.01,-0.9l0.96,-0.06l2.54,-2.0l2.14,0.79l2.16,1.38l2.5,-0.26l1.1,-0.84l1.59,-0.42l2.9,1.53l0.88,0.85l2.65,0.99l4.05,2.32l-8.02,12.69l0.24,0.6l2.55,1.04l2.21,-0.61l0.98,0.67l0.86,1.96l1.86,1.42l0.51,0.73l-0.04,0.48l-0.51,0.18l-1.08,-0.54l-1.13,0.16l-2.17,-1.81l-4.78,0.28l-2.22,2.17l-3.12,0.46l-3.39,0.96l-3.98,0.45l-6.23,3.48l-4.04,3.3l-2.31,0.7l-0.41,0.58l-0.91,5.83l-3.08,5.61l1.19,3.22l-0.02,1.21l-1.0,0.96l-1.1,0.17l-2.15,1.3l-3.17,2.79l-0.65,2.46l1.0,2.53l-2.66,0.63l-0.27,0.38l0.09,1.39l-0.47,0.99l2.2,2.25l1.16,0.51l-0.69,1.6l1.63,1.89l1.26,3.43l2.17,1.57l0.05,1.01l0.65,1.06l1.27,0.88l2.64,3.18l0.04,1.25l-2.79,3.43l0.32,0.65l4.71,-0.01l5.12,1.19l0.58,0.44l0.78,2.71l0.88,0.71l-0.09,1.76l0.38,0.41l6.96,0.03l4.52,-0.5l7.47,-6.04l-0.26,1.41l0.35,1.05l-0.81,1.46l-0.07,14.46l0.64,0.32l1.0,-0.61l1.58,1.23l0.83,0.15l1.61,-0.26l3.06,-1.4l4.29,0.27l10.53,18.52l-0.79,1.08l-0.04,1.03l-1.19,0.74l-1.45,1.8l-0.05,7.48l-1.05,2.18l1.17,3.89l1.22,2.28l-1.47,0.89l-0.22,1.5l-2.52,2.55l-0.6,1.9l-1.06,0.81l-0.14,2.32l2.33,3.1l-2.03,2.92l-3.75,-2.91l-1.85,0.58l-1.43,1.2l-0.1,0.39l1.31,2.69l-0.54,-0.27l-0.74,0.13l-0.77,0.93l-0.27,0.96l0.25,1.04l1.74,1.12l0.78,0.04l0.26,-0.33l-0.11,-0.58l2.01,1.5l2.04,0.73l-0.54,1.41l0.4,0.58l2.6,0.85l2.57,-0.4l-0.3,1.9l-0.53,1.18l0.69,0.68l0.16,0.94l-1.99,1.4l-2.93,3.94l-0.73,0.23l-1.58,1.34l-0.25,0.91l1.48,1.75l0.11,1.12l-1.86,1.58l-1.35,0.17l-0.77,0.58l0.46,3.8l-0.41,1.16l-0.96,1.29l-1.5,0.9l-1.4,0.48l-2.65,0.2l-4.66,-3.51l-1.47,-1.48l-4.73,-3.08l-0.74,-3.19l-1.7,-1.69l-3.0,-1.23l-2.33,-1.68l-1.69,-0.74l-4.29,-3.64l-3.99,-1.19l-7.35,-3.85l-3.92,-1.26l-4.97,-3.52l-2.77,-1.01l-2.2,-1.66l-6.57,-3.51l-1.96,-2.76l-1.53,-1.13l-1.61,-2.34l-4.84,-3.31l-2.85,-4.9l-1.35,-1.19l-0.09,-2.09l-0.76,-0.98l1.21,-0.7l0.91,-3.53l-0.48,-1.97l-3.38,-4.81l-0.63,-1.93l-2.47,-3.69l-0.88,-2.16l-2.05,-1.73l-0.92,-1.44l-0.88,-0.46l-0.06,-1.52l-0.81,-3.31l-1.17,-1.69l-3.75,-2.88l-0.37,-3.1l-0.89,-2.35l-5.42,-9.12l-3.13,-8.71l-2.65,-4.89l-1.06,-2.74l-0.17,-1.66l-1.94,-2.54l-1.1,-2.43l-4.35,-4.48l-2.52,-4.98l-0.39,-1.57l-4.6,-6.45l-1.49,-1.52l-8.45,-4.44l-3.84,-2.61l-0.39,-1.17l0.14,-0.58l0.58,-0.5l1.27,0.49l0.96,-0.42l0.63,-1.19l0.01,-1.5l-0.81,-2.17l-2.6,-3.58l0.62,-1.8l-2.68,-4.2l0.61,-3.99l0.55,-0.96l4.07,-4.22l1.13,-1.81l1.74,-1.12l1.77,-1.69l1.9,-1.15l0.24,0.18l0.63,2.19l-0.09,1.48l0.55,1.57l-1.27,1.15l-1.61,-0.26l-0.81,0.6l-0.24,0.97l0.34,1.3l0.42,0.48l0.76,0.15l-1.19,1.62l0.24,1.03l1.53,0.41l2.73,-1.96l3.94,2.09l2.03,-0.17l1.2,0.83l0.15,1.4l0.59,1.29l1.55,2.03l0.9,0.48l2.66,0.4l2.11,-1.91l0.1,-1.58l2.71,-1.94l0.4,-1.46l-0.31,-1.41l1.52,-3.97l1.54,-2.52l0.96,-4.49Z", "name": "Peru"}, "UY": {"path": "M649.15,535.28l2.55,2.37l1.33,2.36l1.09,0.85l1.06,0.5l0.8,-0.32l1.59,1.36l3.62,1.22l2.54,3.37l1.86,1.53l3.64,1.33l1.83,1.36l1.97,4.62l2.94,2.44l1.94,0.89l-1.36,1.08l-0.54,2.05l-1.42,0.45l-1.55,1.63l-0.37,0.89l1.1,7.23l0.32,0.56l1.21,0.7l-0.81,1.17l-0.73,2.21l-2.47,3.09l-0.54,1.78l-2.59,1.78l-1.85,2.02l-1.33,0.04l-1.08,0.86l-6.31,2.66l-2.2,-0.49l-1.68,-0.0l-1.69,-1.2l-3.65,-0.44l-2.49,0.51l-3.0,1.29l-1.43,-0.08l-1.51,-0.5l-1.04,-1.21l-4.65,-1.32l-3.99,-3.09l-4.5,-0.06l-3.34,0.38l-1.44,-2.2l-2.95,-2.67l-2.24,-2.57l-0.43,-2.45l1.01,-6.11l-0.09,-0.94l1.58,-0.63l1.66,-2.4l0.11,-1.16l-1.38,-5.53l0.87,-1.86l0.08,-1.13l-0.56,-1.02l0.07,-2.53l-0.31,-0.82l1.66,-1.82l0.72,-2.13l-0.01,-0.86l-0.72,-1.04l1.88,-3.77l0.31,-1.31l-0.33,-1.74l0.73,-0.6l0.28,-0.78l-0.07,-2.1l-0.62,-1.59l0.41,-1.05l1.42,-1.47l0.75,-1.18l0.14,-0.98l0.66,0.72l4.12,0.3l0.7,-0.47l0.74,-1.46l0.87,-0.37l2.16,-0.04l7.77,6.78l1.56,1.95l0.45,0.65l-0.22,1.96l0.21,1.32l0.98,0.24l1.15,-0.2l2.52,-1.93l0.51,-0.88Z", "name": "Uruguay"}, "FK": {"path": "M609.94,830.2l1.99,0.93l2.23,-0.32l0.75,0.2l0.23,0.72l-1.24,0.15l-0.28,0.43l0.12,0.96l0.66,0.72l2.54,1.08l0.45,0.06l0.45,-0.47l-0.63,-1.8l0.21,-0.38l3.07,-0.45l1.39,1.46l-0.92,0.3l-0.54,0.79l0.21,0.61l1.59,0.61l-0.34,0.71l-3.51,0.83l-0.97,0.98l-1.32,0.62l-4.16,1.16l-0.25,0.57l0.46,0.88l-0.06,1.06l-5.34,-1.36l-0.96,0.15l-0.26,0.6l1.29,2.11l-2.79,0.17l-0.77,1.58l-1.18,-0.83l-1.28,-1.5l-0.0,-0.64l1.27,-1.61l-0.2,-0.86l3.45,-2.81l2.42,-0.84l0.17,-0.38l-0.48,-1.56l0.03,-1.31l2.39,-2.02l-0.11,-1.3l0.21,-0.01ZM614.6,841.93l0.03,0.54l-0.38,-0.4l0.35,-0.14ZM590.03,837.03l2.86,-0.67l0.53,-0.32l0.11,-0.57l-0.69,-0.94l-1.46,-0.67l-1.0,-0.87l-0.3,-1.2l2.45,1.44l1.86,0.34l2.79,-1.46l1.59,0.91l3.43,-0.77l0.68,0.11l0.74,-0.64l0.91,0.7l-7.63,8.27l-2.3,0.34l-1.44,-0.11l-1.53,2.58l-1.79,0.78l-1.86,-0.09l-1.4,-0.61l-1.36,-1.1l1.87,-1.4l2.17,0.0l3.16,-1.86l1.26,-1.35l-0.19,-0.96l-0.69,-0.33l-2.78,0.48ZM599.15,844.3l0.46,0.33l-0.3,0.48l-0.15,-0.36l-0.01,-0.44ZM594.57,831.41l-1.18,0.0l-0.14,-1.08l0.79,-0.07l0.85,0.38l-0.31,0.77ZM584.01,838.51l1.03,0.14l-0.56,1.58l-0.59,-0.04l-0.95,-1.06l1.07,-0.62Z", "name": "Falkland Is."}}, "height": 905.8723093907364, "projection": {"type": "mill", "centralMeridian": 0.0}, "width": 900.0});
$(document).ready(function(){

  $(function(){
    $('#north-america-map').vectorMap({
    map: 'north_america_mill',
    backgroundColor: ['white'],
    regionStyle: {
                  initial: {
                    fill: 'grey',
                    "fill-opacity": 1,
                    stroke: 'none',
                    "stroke-width": 0,
                    "stroke-opacity": 1
                  },
                  hover: {
                    "fill-opacity": 0.5,
                    cursor: 'pointer'
                  },
                  selected: {
                    fill: 'red'
                  },
                  selectedHover: {
                  }
                },
    series: {
              regions: [{
                values: gon.percent,
                scale: ['#C8EEFF', '#0071A4'],
                min: -0.15,
                max: 0.5,
                normalizeFunction: 'linear'
              }]
            },
    onRegionTipShow: function(e, el, code){
      el.html(el.html()+' (Change: '+gon.percent[code]*100+'%)');
    }
    });
  })
});
$(document).ready(function(){

  $(function(){
    $('#south-america-map').vectorMap({
    map: 'south_america_mill',
    backgroundColor: ['white'],
    regionStyle: {
                  initial: {
                    fill: 'grey',
                    "fill-opacity": 1,
                    stroke: 'none',
                    "stroke-width": 0,
                    "stroke-opacity": 1
                  },
                  hover: {
                    "fill-opacity": 0.5,
                    cursor: 'pointer'
                  },
                  selected: {
                    fill: 'red'
                  },
                  selectedHover: {
                  }
                },
    series: {
              regions: [{
                values: gon.percent,
                scale: ['#C8EEFF', '#0071A4'],
                min: -0.15,
                max: 0.5,
                normalizeFunction: 'linear'
              }]
            },
    onRegionTipShow: function(e, el, code){
      el.html(el.html()+' (Change: '+gon.percent[code]*100+'%)');
    }
    });
  })
});
$(document).ready(function(){

  $(function(){
    $('#world').vectorMap({
    map: 'world_mill',
    backgroundColor: ['white'],
    regionStyle: {
                  initial: {
                    fill: 'grey',
                    "fill-opacity": 1,
                    stroke: 'none',
                    "stroke-width": 0,
                    "stroke-opacity": 1
                  },
                  hover: {
                    "fill-opacity": 0.5,
                    cursor: 'pointer'
                  },
                  selected: {
                    fill: 'red'
                  },
                  selectedHover: {
                  }
                },
    series: {
              regions: [{
                values: gon.percent,
                scale: ['#C8EEFF', '#0071A4'],
                min: -15,
                max: 50,
                normalizeFunction: 'linear'
              }]
            },
    // Sets the pop-up descriptions when hovering over a country
    onRegionTipShow: function(e, el, code){
      if (gon.percent[code].to_i > 0) {
        el.html(el.html()+'\'s currency has become '+gon.percent[code]+'% cheaper');
      } else if (gon.percent[code] < 0) {
        el.html(el.html()+'\'s currency has become '+gon.percent[code]*(-1)+'% more expensive');
      } else if (gon.percent[code].to_i === 0) {
        el.html(el.html()+'\ uses the same currency');
      } else {
        el.html(el.html() + ' N/A');
      }
    }
    });
    var mapObject = $('#world').vectorMap('get', 'mapObject');

    $('#update').on('click', function() {
      var mapObject = $('#world').vectorMap('get', 'mapObject');
      var r=mapObject.series.regions[0];
      mapObject.series.regions[0].clear();
      r.params.min = 0.1;
      r.params.max = 0.5;

      r.setValues(gon.relative_prices);

      // clearMap();
    });
  })

});

// if (gon.relative_prices[code]*10 > 4) {
//   el.html(el.html()+' is very cheap for you');
// } else if (gon.relative_prices[code]*10 < 4 && gon.relative_prices[code]*10 >1.5) {
//   el.html(el.html()+' is fairly fairly cheap for you');
// } else if (gon.relative_prices[code]*10 < 1.5  && gon.relative_prices[code]*10 > 0.9) {
//   el.html(el.html()+' has prices similar to your home country');
// } else {
//   el.html(el.html() + ' is more expensive than your country');
// }

// $(".slider").slider({
//   value: val,
//   min: 2013,
//   max: 2015,
//   step: 1,
//   slide: function( event, ui ) {
//     val = ui.value;
//     mapObject.series.regions[0].setValues(gon.test);
//   }
// });
// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//






$(document).ready(function(){
  $('#blank-map').delay( 300 ).fadeTo('slow', 0.7);
  $('.circle').delay( 1500 ).fadeTo('slow', 0.9);
  $('.left-card').delay( 100 ).slideDown( 1000, function() {
    // Animation complete.
  });
  $('.right-card').delay( 100 ).slideDown( 1500, function() {
    // Animation complete.
  });
  // Potential code for selection box reaction
  // $('.selectChange').change(function() {
  //   updateAllCSS($(this).attr('data-element'), $(this).attr('data-property'), $(this).val() + $(this).attr('data-unit'))
  // });
});
