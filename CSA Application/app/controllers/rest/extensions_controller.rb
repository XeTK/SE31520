class Rest::ExtensionsController < ApplicationController

	# This returns the page when it is viewed as a http page.
	def index
		@feeds = ExtensionFeed.paginate(page: params[:page],
                           per_page: params[:per_page])

		respond_to do |format|
      		format.json { render :json => @feeds }
    	end
	end

	# This returns the json object for the browser extensions.
	def show
		@feeds = ExtensionFeed.paginate(page: params[:page],
                           per_page: params[:per_page])

		respond_to do |format|

			format.html { 
				render locals: {
					feeds: @feeds
				},
				layout: false
			}
			
			format.json # show.json.builder
		end
	end

end