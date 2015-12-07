var system = require('system'),
    stdout = system.stdout,
    page = require('webpage').create(),
    url = system.args[1],
    format = system.args[2],
    opts = system.args[3],
    args = { cutoff: 5000 };
    defaultPaperSize = { format: 'A4', orientation: 'portrait' };

if( !url || !format ) {
  stdout.write('Error: A URL and a file type must be given');
  phantom.exit(1);
}

function extend() {
  var obj, key, i = 1,
      len = arguments.length,
      baseObj = arguments[0];

  for (; i < len; i++) {
    obj = arguments[i];

    for (key in obj) {
      if (obj.hasOwnProperty(key)) {
        baseObj[key] = obj[key];
      }
    }
  }

  return baseObj;
}

function timeout() {
  stdout.write('Error: Request to ' + url + ' exceeded ' + args.cutoff + 'ms');
  phantom.exit(1);
}

function setCutoff() {
  setTimeout( timeout, args.cutoff );
}

function parseArguments() {
  function camelize( string ) {
    return  string.replace(/_([a-z])/g, function (g) { return g[1].toUpperCase(); });
  }

  var systemArgs = opts ? JSON.parse( opts ) : {};

  for ( var arg in systemArgs ) {
    if ( systemArgs.hasOwnProperty(arg) ) {
      args[camelize( arg )] = systemArgs[arg];
    }
  }
}

function addCookies() {
  if ( !args.cookies ) { return; }
  args.cookies.forEach(phantom.addCookie);
}

function setViewport() {
  if ( args.height ) {
    page.viewportSize = { height: args.height, width: args.width };
  }
}

function setPaperSize() {
  if ( args.paperSize && format === 'pdf' ) {
    if ( args.paperSize.width || args.paperSize.height ) {
      page.paperSize = { width: args.paperSize.width, height: args.paperSize.height, margin: args.paperSize.margin };
    } else {
      page.paperSize = extend( {}, defaultPaperSize, args.paperSize );
    }
  }
}

function getClipRect() {
  if ( args.el ) {
    page.clipRect = page.evaluate(function( sel ) {
      return document.querySelector( sel ).getBoundingClientRect();
    }, args.el);
  }
}

// either get the base64 encoded file directly if the type is supported, or write the file to stdout
function render() {
  if ( format === 'pdf' ) {
    page.render( '/dev/stdout', {format: format} );
  } else {
    stdout.write(page.renderBase64( format ));
  }

  phantom.exit();
}

function openPage() {
  page.open(url, function( status ) {
    if( status !== 'success' ) {
      stdout.write('Error: Unable to load: ' + url);
      phantom.exit(1);
    } else {
      getClipRect();
      render();
    }
  });

  setCutoff();
}

parseArguments();
addCookies();
setViewport();
setPaperSize();
openPage();
