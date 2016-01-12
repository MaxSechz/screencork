# Screencork

A gem for grabbing screenshots OR pdfs of webpages. It uses PhantomJS to load and render pages to strings.

## Basic Usage

Either pass in the page's url to a new instance of Screencork::Screen, or to the ::screen method.
Then just call #to_your-format-here to return the string content of the file in that format.
Supported file formats are bmp, jpg, jpeg, png, ppm, xbm, xpm, and pdf.

```ruby
  require 'screencork'

  screen = Screencork.screen('http://google.com')
  screenshot = screen.to_png
```

You can pass in any of the allowed options like so:

```ruby
  screen = Screencork.screen('http://google.com', height: 300, cutoff: 5000)

  screen.to_pdf
```

## Advanced Usage

Options with defaults will have their defaults displayed below. All nested arrays/hashes will not have a default,
but do have default options for when only some of the nested options are supplied. These will be shown with the
shape of the required array/hash. If there are multiple ways to submit an option they are demonstrated together.

```ruby
  screen = Screencork.screen('google.com',
    height: 300, # the height of the viewport itself
    width: 400, # the width of the viewport itself
    cutoff: 5000, # the amount of time (in ms) allowed before considering the request failed
    el: '#example-id', # the sole element to render. will not be resized. has no default
    cookies: {'my-cookie' => 'my-cookie-val'}, # a hash of key => val pairs. the domain will be the domain passed to ::screen
    cookies: [{ name: 'my-cookie', value: 'my-cookie-val', domain: 'google.com' }], # the array version, allows other domains
    paper_size: { width: 400, height: 300, margin: 0 }, # the page size of a pdf file. Either width or height must be supplied
    paper_size: { format: 'A4', orientation: 'portrait', margin: 0 }, # either format or orientation must be supplied
  )

  screen.to_pdf
```

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Added some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request
