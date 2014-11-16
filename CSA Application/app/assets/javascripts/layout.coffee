SUBMIT_LOCALE_ID = '#locale-submit'
AUTOFOCUS = "[autofocus]"

$(document).on "ready page:change", ->
  $(SUBMIT_LOCALE_ID).hide()

  $(AUTOFOCUS).focus()