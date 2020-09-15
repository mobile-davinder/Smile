Pod::Spec.new do |s|
  s.name             = "Smile"
  s.summary          = "Emoji in Swift"
  s.version          = "2.1.0"
  s.homepage         = "https://github.com/onmyway133/Smile"
  s.license          = 'MIT'
  s.author           = { "Davinder Singh" => "mobile.davinder.11@gmail.com" }
  s.source           = {
    :git => "https://github.com/mobile-davinder/Smile.git",
    :tag => s.version.to_s
  }
  s.social_media_url = 'https://www.linkedin.com/in/davinder-singh-9326221b0/'

  s.ios.deployment_target = '8.0'
  s.osx.deployment_target = '10.9'
  s.tvos.deployment_target = '9.2'

  s.requires_arc = true
  s.source_files = 'Sources/**/*'
  s.pod_target_xcconfig = { 'SWIFT_VERSION' => '5.0' }
end
