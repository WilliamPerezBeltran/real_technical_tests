$LOAD_PATH.unshift File.expand_path('../lib', __dir__)

require 'letterboard'
require 'types'
require 'json'
require 'minitest/autorun'
require 'minitest/reporters'

Minitest::Reporters.use! [Minitest::Reporters::SpecReporter.new, Minitest::Reporters::JUnitReporter.new] unless ENV['RM_INFO']
