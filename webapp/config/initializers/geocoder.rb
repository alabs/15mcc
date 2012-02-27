# geocoding service (see below for supported options):
Geocoder::Configuration.lookup = :google

# to use an API key:
#Geocoder::Configuration.api_key = "..."

# geocoding service request timeout, in seconds (default 3):
Geocoder::Configuration.timeout = 5

# use HTTPS for geocoding service connections:
#Geocoder::Configuration.use_https = true

# language to use (for search queries and reverse geocoding):
Geocoder::Configuration.language = :es

# use a proxy to access the service:
#Geocoder::Configuration.http_proxy  = "127.4.4.1"
#Geocoder::Configuration.https_proxy = "127.4.4.2" # only if HTTPS is needed

# caching (see below for details)
#Geocoder::Configuration.cache = Redis.new
#Geocoder::Configuration.cache_prefix = "..."