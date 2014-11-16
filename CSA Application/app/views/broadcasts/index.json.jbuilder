json.array!(@broadcasts) do |broadcast|
  json.extract! broadcast, :content, :user_id
  json.url broadcast_url(broadcast, format: :json)
end
