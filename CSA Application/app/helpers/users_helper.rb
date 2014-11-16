module UsersHelper
  # We display either the image associated user or if there
  # isn't one we display a dfault image
  def image_for(user, size = :medium)
    if user.image
      # I wanted to create a clickable link so that the image
      # could be shown full size. To do this we get a URL to an
      # image of the right size, and also create an image_text
      # variable that is used as the HTML title and as
      # alternative text if the image cannot be displayed.
      # user.image.photo.url is the URL to the full size
      # image. Setting the border to "0" removes the border.
      user_image = user.image.photo.url(size)
      image_text = "Image of #{user.firstname} #{user.surname}"
      link_to image_tag(user_image, class: "image-tag",
                        alt: image_text,
                        title: image_text, border: "0"),
              user.image.photo.url
    else
      # Creates a non-clickable default image
      image_tag("blank-cover_#{size}.png",
                alt: "No photo available",
                title: "No photo available", border: "0")
    end
  end

  def remote_image_for(user, page, size = :medium)
    if user.image
      link_to_rem user, page, user.image.photo.url(size),
                  "Image of #{user.firstname} #{user.surname}"
    else
      link_to_rem user, page, "blank-cover_#{size}.png", "No photo available"
    end
  end

  def checkbox_search_fields
    result = ""
    count = 1
    User.search_columns.each do |column|
      result += "<p>"
      #result += check_box_tag column.sub!(/^.*\./, ""), "1", false,
      result += check_box_tag column, "1", false,
                              #id: "User#{count}" ,
                              class: "user_search_checkbox",
                              title: "Select to focus search. All blank is same as all selected"
      result += "\n"
      result += label column, column
      result += "</p>"
      count += 1
    end
    result.html_safe
  end

  private

  def link_to_rem(user, page, image_path, text_info)
    link_to image_tag(image_path, alt: text_info,
                      title: text_info, border: "0"),
            user_path(user, page: page),
            class: 'image-tag',
            method: :get,
            remote: true
    #update: id,
    #before: "q_auto_completer.setToBeHidden(false)"
  end

end