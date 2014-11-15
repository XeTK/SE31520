json.array!(@feeds)  do |json, feed|
	json.extract! feed, :name, :email, :content, :created, :modified
end
