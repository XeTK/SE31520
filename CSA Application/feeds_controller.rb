class Rest::ExtensionsController < ApplicationController

	def index
		respond_to do |format|
      		format.json { render :json => nil }
    	end

	end

end