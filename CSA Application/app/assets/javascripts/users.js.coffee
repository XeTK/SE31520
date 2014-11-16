# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/
DROP_LIST_SURNAME_CLASS = '.drop-list-surname'
USER_DETAIL_ID = '#user-detail'
CLOSE_USER_DETAIL_ID = '#close-user-detail'
IMAGE_TAG_CLASS = '.image-tag'
SEARCH_FIELD_ID = '#q'
UI_AUTOCOMPLETE_CLASS = '.ui-autocomplete'
SURNAME_SPINNER_ID = '#surname-spinner'
USER_CHECKBOX_CLASS = '.user_search_checkbox'

checkboxClicked = { }

bindAll = ->
  # Called when user clicks on close-user-detail link
  # Simply replace div content with empty HTML
  $(CLOSE_USER_DETAIL_ID).click ->
    $(USER_DETAIL_ID).html ''

  # Called when our Ajax request from an element containing the
  # IMAGE_TAG_CLASS has completed. Here we update the USER_DETAIL_ID
  # element with the returned HTML content: the user details
  $(IMAGE_TAG_CLASS).bind 'ajax:complete', (et, e)->
    $(USER_DETAIL_ID).html e.responseText

  # Each row in the autocomplete droplist has an image
  # and a span containing the user's surname. When a user
  # clicks on the span we update the input field with the
  # selected text and hide the dropdown list
  $(DROP_LIST_SURNAME_CLASS).click (event) ->
    $(SEARCH_FIELD_ID).val event.target.textContent
    $(UI_AUTOCOMPLETE_CLASS).hide()

  # If user clicks on the input field we close the dropdown list
  $(SEARCH_FIELD_ID).click ->
    $(UI_AUTOCOMPLETE_CLASS).hide()

  # If a user clicks on a checkbox we re-run the autocomplete
  # search.
  $(USER_CHECKBOX_CLASS).click ->
    value = $(@).attr 'name'
    secondTime = false

    if $(@).is(':checked')
      secondTime = true if checkboxClicked[value]
      checkboxClicked[value] = true
    else
      secondTime = true if !checkboxClicked[value]
      checkboxClicked[value] = false
    $(SEARCH_FIELD_ID).autocomplete 'search' unless secondTime

$(document).on "ready page:change", ->
  searchField = $(SEARCH_FIELD_ID)
  if searchField.length

    autocompOptions =
      source: (request, response)->
        # Build the query string to include checkbox selection
        urlStr = "/users/search.json"
        firstTime = true
        $.each(checkboxClicked, (key, value)->
          if value
            if firstTime
              urlStr += '?'
              firstTime = false
            else
              urlStr += '&'
            urlStr += key + "=1"
        )
        $.ajax(
          url: urlStr
          dataType: "json"
          data: { q: request.term }   # Ensures ?q=value sent as url
          success: (data)->
            response data

            # Needed to do this otherwise elements in
            # Ajax generated dropdown list were not
            # visible to IMAGE_TAG_CLASS event handler
            bindAll()
            $(SURNAME_SPINNER_ID).hide()
        )

      search: ->
        $(SURNAME_SPINNER_ID).show()

      select: (event)->
          false

    # Use the jQuery-ui autocomplete function.
    # We override the _renderItem function because we need
    # to customize what we display for each menu item
    searchField.autocomplete(autocompOptions).data("ui-autocomplete")._renderItem = (ul, item)->
          $("<li class='ui-menu-item'></li>")
          .data("item.autocomplete", item)
          .append(item.html)
          .appendTo ul

    # We override close to stop it from closing the dropdown menu. We will do
    # that explicitly ourselves in a click handler
    searchField.autocomplete(autocompOptions).data("ui-autocomplete").close = -> false

    # Initialize the event handlers
    bindAll()


