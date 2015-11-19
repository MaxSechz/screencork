module Screencork
  class Screen
    def initialize(url, opts = {})
      @url = url
      @opts = opts
    end

    def to_png
      render('PNG')
    end

    def to_pdf
      render('PDF')
    end

    def to_jpeg
      render('JPEG')
    end

    private

    def render(file_type)
      Screencork.render(@url, file_type, @opts)
    end
  end
end
