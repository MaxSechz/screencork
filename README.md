# Screencork

A gem for grabbing screenshots of webpages. It Uses PhantomJS to load and render pages to strings.

## Usage

Either pass in options to a new instance of Screencork::Screen with the options, or to the ::screen method.

Supported file formats are bmp, jpg, jpeg, png, ppm, xbm, xpm, and pdf.
Calling #to_your-format-here will return the string content of the file.

```ruby
  require 'screencork'

  screen = Screencork.screen('http://google.com')
  screenshot = screen.to_png
```


You can pass in several options

```ruby
  screen = Screencork.screen('http://google.com',
  	:width => 400, # default phantomjs width
    :height => 300, # default phantomjs height
    :cutoff => 5000, # the amount of time to wait before giving up on the page load, defaults to 5000 ms
    :cookies => [{ name: 'my-cookie', value: 'my-cookie-val', domain: 'http://google.com' }]
  )

  screen.to_pdf
```

The cookies option must be an array of hashes that have a name, value, and a proper domain.

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Added some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request
