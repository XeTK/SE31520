Csa::Application.configure do
  # Settings specified here will take precedence over those in config/application.rb.

  # In the development environment your application's code is reloaded on
  # every request. This slows down response time but is perfect for development
  # since you don't have to restart the web server when you make code changes.
  config.cache_classes = false

  # Do not eager load code on boot.
  config.eager_load = false

  # Show full error reports and disable caching.
  config.consider_all_requests_local       = true
  config.action_controller.perform_caching = false

  # Don't care if the mailer can't send.
  config.action_mailer.raise_delivery_errors = false

  # Print deprecation notices to the Rails logger.
  config.active_support.deprecation = :log

  # Raise an error on page load if there are pending migrations
  config.active_record.migration_error = :page_load

  # Actually don't really want to send
  config.action_mailer.delivery_method = :test

  #config.action_mailer.perform_deliveries = true
  #config.action_mailer.delivery_method = :smtp

  # These settings work for staff over exchange outside
  # of network
  #config.action_mailer.smtp_settings = {
  #address: "smtphost.aber.ac.uk",
  #port: 587,
  #user_name: 'cwl',
  #password: '******', # Put password here, although rather dangerous
  #authentication: :login,
  #enable_starttls_auto: true
  #}

  # This should work within the network
  config.action_mailer.smtp_settings = {
      address: "smtphost.aber.ac.uk",
      port: 25
  }

  ADMIN_EMAIL="admin@host.ac.com" # Change to your email

  # Debug mode disables concatenation and preprocessing of assets.
  # This option may cause significant delays in view rendering with a large
  # number of complex assets.
  config.assets.debug = true
  Paperclip.options[:command_path] = '/usr/local/bin/'

  #config.use_ssl = true
  config.use_ssl = false
  config.ssl_port = 3001
  NON_SSL_PORT = 3000
end
