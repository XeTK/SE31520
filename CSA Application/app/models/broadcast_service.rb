class BroadcastService

  # The content in the broadcast object will be broadcast to each feed in
  # the feeds hash. Any communication failures will be flagged with an
  # error message in the value of the corresponding feed in the feeds hash
  # and false will be returned, otherwise true is returned
  # Really this should be more OO and the case statement replaced by
  # polymorphic calls. This is left to the reader as an exercise, but ideally
  # you would want to make this a singleton rather than use class scope methods. The
  # error handling mechanism is also a bit clunky and non-user friendly.
  def self.broadcast(broadcast, feeds)
    puts "feeds: #{feeds.inspect}"
    result = []
    feeds.each do |feed, value|
      case feed
        when "twitter"
          result.concat(via_twitter(broadcast))
        when "email"
          result.concat(via_email(broadcast, feeds[:alumni_email]))
        when "facebook"
        when "RSS"
        when "atom"
          # Added in the new extension type.
        when "extension"
          result.concat(via_extension(broadcast))
      end
    end
    result
  end

  private

  # Added in the new feeds type.
  def self.via_extension(broadcast)
     add_feed(broadcast, 'extension')
     return []
  end 

  def self.via_email(broadcast, email_list)
    # Iterate across all users sending an email to each.
    users = User.all

    users.each do |user|
      NewsBroadcast.send_news(user, broadcast, email_list).deliver
    end
    add_feed broadcast, 'email'
    return []
  rescue => e
    return [feed: email_list, code: 500, message: e.message]
  end

  def self.via_twitter(broadcast)
    result = []
    begin
      # SINCE AUG 2010 TWITTER REQUIRES OAUTH, SO BASIC AUTH NO LONGER SUPPORTED.
      # Now using two-legged OAuth authentication (see initializers/twitter.rb) to
      # obtain an access token object
      response = TWITTER_ACCESS_TOKEN.post('/statuses/update.json', {status: broadcast.content})

      case response
        when Net::HTTPSuccess
          # Now wire up with the correct feed
          add_feed broadcast, 'twitter'
        else # Something went wrong
          result = [feed: 'twitter', code: response.code, message: response.message]
      end
    rescue => e
      result = [feed: 'twitter', code: 500, message: e.message]
    end
    result
  end

  def self.add_feed(broadcast, feed_name)
    feed = Feed.find_by_name(feed_name)
    broadcast.feeds << feed if feed
  end
end
