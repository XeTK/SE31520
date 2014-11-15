module BroadcastsHelper

  def display_feeds(broadcast)
    result = ""
    broadcast.feeds.each_with_index do |feed, i|
      result += h feed.name.humanize
      if i < broadcast.feeds.length-1
        result += ", "
      end
    end
    result
  end
end
