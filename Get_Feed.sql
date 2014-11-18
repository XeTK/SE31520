CREATE OR REPLACE VIEW extension_feeds as

/* Get our data from the database */
select us.firstname || ' ' || us.surname 'Name',
       us.email                          'Email',
       bc.content                        'Content',
       bc.created_at                     'Created',
       bc.updated_at                     'Modified'

/* Tables we want to retrive from */
from   users            us,
       broadcasts       bc,
       feeds            fe,
       broadcasts_feeds fb

/* Joins between tables */
where  us.id = bc.user_id
and    bc.id = fb.broadcast_id
and    fe.id = fb.feed_id

/* Query the data */
and    fe.name in ('extension')