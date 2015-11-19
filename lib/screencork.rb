require 'screencork/version'
require 'screencork/screen'
require 'phantomjs'

module Screencork
  class ScreencorkError < StandardError; end;

  class << self
    def screen(*args)
      Screen.new(*args)
    end

    def render(*args)
      result = run_phantom(*args)
      raise_if_error! result
      Base64.decode64 result
    end

    def run_phantom(url, file_type, opts = {})
      Phantomjs.run(render_script_path, url, file_type, opts.to_json)
    end

    private

    def raise_if_error!(result)
      error_match = /Error: /.match(result)
      return if error_match.nil?
      raise ScreencorkError.new(error_match.post_text)
    end

    def render_script_path
      File.expand_path('../screencork/render.js', __FILE__)
    end
  end
end
