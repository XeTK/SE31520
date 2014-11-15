class HomeController < ApplicationController
  skip_before_action :login_required

  before_action :unforce_ssl
  
  def index
  end

end
