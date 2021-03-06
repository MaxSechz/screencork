# coding: utf-8
require File.expand_path('../lib/screencork/version', __FILE__)

Gem::Specification.new do |gem|
  gem.name          = "screencork"
  gem.version       = Screencork::VERSION
  gem.authors       = ['Maxwell Sechzer']
  gem.email         = ['maxwell at sechzer.com']
  gem.description   = 'A gem for grabbing screenshots of webpages.'
  gem.summary       = 'Uses PhantomJS to load and render pages to strings.'
  gem.homepage      = 'https://github.com/MaxSechz/screencork'
  gem.license       = 'MIT'

  gem.files         = `git ls-files`.split($\)
  gem.executables   = gem.files.grep(%r{^bin/}).map{ |f| File.basename(f) }
  gem.test_files    = gem.files.grep(%r{^(test|spec|features)/})
  gem.require_paths = ["lib"]

  gem.add_dependency 'phantomjs', '~> 1.9'
  gem.add_development_dependency 'rspec'
  gem.add_development_dependency 'rake'
end
