class ImageService
  attr_reader :user, :image

  # Keep hold of the user and image ready for later use
  def initialize(user, image)
    @image = image
    @user = user
  end
  # We try and save both the user and the image objects
  def save
    # We first need to check that both the user and image
    # objects have valid data. If not return false
    return false unless valid?
    begin
      # I'll talk about transactions later
      User.transaction do
        # Only if we have an image and it's a
        # new image do we save it. We have to
        # remove any existing image first
        if !@image.blank? && @image.new_record?
          @user.image.destroy if @user.image
          # This is how we tie the image to the user, i.e.
          # by setting the belongs_to link (and hence the
          # foreign key)
          @image.user = @user
          # Raised an exception if the image cannot be saved
          @image.save!
        end
        # Raised an exception if the user cannot be saved
        @user.save!
        # If we get here then they were both saved successfully so
        # we return true
        true
      end
    rescue => e
      puts "ImageService exception: #{e.message}"
      false
    end
  end
  # We run the validation methods on the User model and if
  # we have an image, we check its validation methods as well
  def valid?
    @user.valid? && (@image.blank? || @image.valid?)
  end

  def update_attributes(user_attributes, image_file)
    # This is a quick way to update all user attributes
    # in one go from a hash
    @user.attributes = user_attributes
    # If we have a new image, create a new image object
    unless image_file.blank?
      @image = Image.new(photo: image_file)
    end
    # Now save everything by calling the above save method
    save
  end
end