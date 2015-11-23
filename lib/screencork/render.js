var system = require('system'),
    stdout = system.stdout,
    page = require('webpage').create(),
    url = system.args[1],
    format = system.args[2],
    opts = system.args[3],
    args = { cutoff: 5000 };

if( !url || !format ) {
  stdout.write('Error: A URL and a file type must be given');
  phantom.exit(1);
}

function timeout() {
  stdout.write('Error: Request to ' + url + ' exceeded ' + args.cutoff + 'ms');
  phantom.exit(1);
}

function setCutoff() {
  setTimeout( timeout, args.cutoff );
}

function parseArguments() {
  var systemArgs = opts ? JSON.parse( system.args[3] ) : {};

  for ( var arg in systemArgs ) {
    if ( systemArgs.hasOwnProperty(arg) ) {
      args[arg] = systemArgs[arg];
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
      render();
    }
  });

  setCutoff();
}

parseArguments();
addCookies();
setViewport();
openPage();
