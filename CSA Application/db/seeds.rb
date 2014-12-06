# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
User.transaction do
  1..40.times do |i|
    user = User.create!(surname: "Surname#{i}",
                       firstname: "Firstname#{i}",
                       email: "cwl#{i}@aber.ac.uk",
                       phone: '01970 622422',
                       jobs:      true,
                       grad_year: 1985)
    UserDetail.create!(login: "cwl#{i}",
                       password: 'secret',
                       user: user)
  end
  # Create one special admin user
  user = User.create!(surname: 'Loftus',
                      firstname: 'Chris',
                      email: 'cwl@aber.ac.uk',
                      phone: '01970 622422',
                      grad_year: 1985)
  UserDetail.create!(login: 'admin',
                     password: 'password', #Changed for my forgetfulness
                     user: user)

  # Create some dummy feeds
  Feed.create!(name: 'twitter')
  Feed.create!(name: 'facebook')
  Feed.create!(name: 'email')
  Feed.create!(name: 'RSS')
  Feed.create!(name: 'atom')
  # Added in new feed that we can send information to.
  Feed.create!(name: 'extension')

  # Create the database view that we use to get the broadcasts information.
  User.connection.execute(
    'CREATE VIEW extension_feeds as
    select us.firstname || \' \' || us.surname \'name\',
           us.email                          \'email\',
           bc.content                        \'content\',
           bc.created_at                     \'created\',
           bc.updated_at                     \'modified\'
    from   users            us,
           broadcasts       bc,
           feeds            fe,
           broadcasts_feeds fb
    where  us.id = bc.user_id
    and    bc.id = fb.broadcast_id
    and    fe.id = fb.feed_id
    and    fe.name = \'extension\'
    order  by bc.created_at desc'
  )

end