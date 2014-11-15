class Broadcast < ActiveRecord::Base

  # The only restriction is that broadcasts must have some data to
  # be valid and an associated broadcaster (user_id)
  validates_presence_of :content

  belongs_to :user
  has_and_belongs_to_many :feeds

  def to_s
    result = "id: " + id.to_s + " content: " + content
    if user
      result += " user: " + user.id.to_s
    end
    result
  end

  def self.per_page
    8
  end
end

