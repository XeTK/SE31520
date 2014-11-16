json.array!(@users) do |user|
  json.extract! user, :surname, :firstname, :phone, :grad_year, :jobs, :email
  json.url user_url(user, format: :json)
end
