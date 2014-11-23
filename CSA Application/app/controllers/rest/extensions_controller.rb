class Rest::ExtensionsController < ApplicationController

	def index
		@feeds = ExtensionFeed.paginate(page: params[:page],
                           per_page: params[:per_page])

		respond_to do |format|
      		format.json { render :json => @feeds }
    	end
	end


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