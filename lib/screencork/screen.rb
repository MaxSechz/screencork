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
      Screencork.render(@url, format, @opts)
    end
  end
end
