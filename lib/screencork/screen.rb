module Screencork
  class Screen
    def initialize(url, opts = {})
      @url = url
      @opts = opts
    end

    IMAGE_FORMATS.each do |format|
      define_method "to_#{format}" do
        render format
      end
    end

    private

    def render(format)
      Screencork.render(@url, format, proccessed_opts)
    end

    def proccessed_opts
      if (cookies = @opts[:cookies]) && cookies.is_a?(Hash)
        array_cookies = cookies.map { |name, value| {domain: URI(@url).host, name: name, value: value} }
        @opts.merge(cookies: array_cookies)
      else
        @opts
      end
    end
  end
end
