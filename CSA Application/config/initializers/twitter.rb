require 'oauth'

# Twitter OAuth settings for 2-legged authentication
TWOAUTH_SITE = 'https://api.twitter.com/1.1/'


# To use Twitter OAuth you will need to:
# 1. create a Twitter application (see http://dev.twitter.com/apps). Since 2-legged
#    authentication (rather than 3) you don't need to specify a callback url
# 2. obtain the consumer key and secret and assign appropriately below
# 3. since 2-legged oauth you can avoid all the redirect to authenticate
#    and access Twitter directly with your own access token and secret. These
#    can be obtained from your Twitter application access token page. Assign these
#    to the appropriate constants below.
# I suggest you read about OAuth to understand what the protocol etc does. See
# http://hueniverse.com/

# Consumer key and secret for general access to Twitter site
TWOAUTH_CONSUMER_KEY = 'z1GETcQePsltafyvbidNmw'
TWOAUTH_CONSUMER_SECRET = 'sUGsgm6FzzqZmswsDNozfeuKZYLYzEu9Ziz18xlI'

# Access token and secret used for single access use
TWOAUTH_ACCESS_TOKEN = '62477426-hbz5jMcOegnqTPsumygoiSzcQNJadiiMVFhrUmcEB'
TWOAUTH_ACCESS_SECRET = 'PHOwSU6rWzGZaNJJXkksdop6f0NR84wrxbZWwyXXMGA'

# Prepare the access token here
consumer = OAuth::Consumer.new(TWOAUTH_CONSUMER_KEY, TWOAUTH_CONSUMER_SECRET,
                               {site: TWOAUTH_SITE,
                                scheme: :header
                               })

# Now create the access token object from passed values
token_hash = {oauth_token: TWOAUTH_ACCESS_TOKEN,
              oauth_token_secret: TWOAUTH_ACCESS_SECRET
}
TWITTER_ACCESS_TOKEN = OAuth::AccessToken.from_hash(consumer, token_hash)
