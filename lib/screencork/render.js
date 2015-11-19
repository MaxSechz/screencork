var system = require('system'),
    stdout = system.stdout,
    page = require('webpage').create(),
    url = system.args[1],
    fileType = system.args[2],
    opts = system.args[3],
    args = { cutoff: 5000 };

if( !url || !fileType ) {
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
  args.cookies.forEach(phantom.addCookie);
}

function setViewport() {
  if ( args.height ) {
    page.viewportSize = { height: args.height, width: args.width };
  }
}

function render() {
  var image = page.renderBase64( fileType );
  stdout.write( image );
  phantom.exit();
}

function openPage() {
  page.open(url, function( status ) {
    if( status !== 'success' ) {
      stdout.write('Unable to load: ' + url);
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
