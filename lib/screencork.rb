require 'screencork/version'
require 'screencork/image_formats'
require 'screencork/screen'
require 'phantomjs'
require 'json'

module Screencork
  class ScreencorkError < StandardError; end;

  class << self
    def screen(*args)
      Screen.new(*args)
    end

    def render(url, format, opts = {})
      result = run_phantom(url, format, opts)
      raise_if_error! result
      format == :pdf ? result : Base64.decode64(result)
    end

    def run_phantom(url, format, opts = {})
      format, opts = format.to_s, opts.to_json
      log_command(url, format, opts)
      Phantomjs.run(render_script_path, url, format, opts)
    end

    private

    def log_command(url, format, opts = {})
      puts [Phantomjs.path, render_script_path, url, format, opts.inspect.inspect].join(' ')
    end

    def raise_if_error!(result)
      return if !result.valid_encoding?
      error_match = /Error: /.match(result)
      return if error_match.nil?
      raise ScreencorkError.new(error_match.post_match)
    end

    def render_script_path
      @render_script_path ||= File.expand_path('../screencork/render.js', __FILE__)
    end
  end
end
