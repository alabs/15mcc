How to setup the environment
============================

First of all you need to install [Ruby Version Manager (RVM)](http://beginrescueend.com/rvm/install/).

Once you have RVM installed open a system terminal window, there we have to intall ruby interpreter as follow:

```shell
$ rvm install ruby-1.9.2-p136
/Users/erubion/.rvm/rubies/ruby-1.9.2-p136, this may take a while depending on your cpu(s)...

ruby-1.9.2-p136 - #fetching 
ruby-1.9.2-p136 - #downloading ruby-1.9.2-p136, this may take a while depending on your connection...
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100 8612k  100 8612k    0     0  60863      0  0:02:24  0:02:24 --:--:-- 59281
ruby-1.9.2-p136 - #extracting ruby-1.9.2-p136 to /Users/erubion/.rvm/src/ruby-1.9.2-p136
ruby-1.9.2-p136 - #extracted to /Users/erubion/.rvm/src/ruby-1.9.2-p136
ruby-1.9.2-p136 - #configuring 
ruby-1.9.2-p136 - #compiling 
ruby-1.9.2-p136 - #installing 
ruby-1.9.2-p136 - updating #rubygems for /Users/erubion/.rvm/gems/ruby-1.9.2-p136@global
ruby-1.9.2-p136 - updating #rubygems for /Users/erubion/.rvm/gems/ruby-1.9.2-p136
ruby-1.9.2-p136 - adjusting #shebangs for (gem).
ruby-1.9.2-p136 - #importing default gemsets (/Users/erubion/.rvm/gemsets/)
Install of ruby-1.9.2-p136 - #complete 
```

Now we have to set this ruby version as used and default, for this we have to run next command:

```shell
$ rvm use 1.9.2 --default
Using /Users/erubion/.rvm/gems/ruby-1.9.2-p136
```

We can check if we made it in the right way checking ruby version as follow.
```shell
$ ruby -v
ruby 1.9.2p136 (2010-12-25 revision 30365) [x86_64-darwin10.8.0]
```

Once we have the correct ruby version we have to install rails...

```shell
$ gem install rails
Fetching: multi_json-1.0.4.gem (100%)
Fetching: activesupport-3.1.3.gem (100%)
Fetching: builder-3.0.0.gem (100%)
Fetching: i18n-0.6.0.gem (100%)
Fetching: activemodel-3.1.3.gem (100%)
Fetching: rack-1.3.6.gem (100%)
Fetching: rack-cache-1.1.gem (100%)
Fetching: rack-test-0.6.1.gem (100%)
Fetching: rack-mount-0.8.3.gem (100%)
Fetching: hike-1.2.1.gem (100%)
Fetching: tilt-1.3.3.gem (100%)
Fetching: sprockets-2.0.3.gem (100%)
Fetching: erubis-2.7.0.gem (100%)
Fetching: actionpack-3.1.3.gem (100%)
Fetching: arel-2.2.1.gem (100%)
Fetching: tzinfo-0.3.31.gem (100%)
Fetching: activerecord-3.1.3.gem (100%)
Fetching: activeresource-3.1.3.gem (100%)
Fetching: mime-types-1.17.2.gem (100%)
Fetching: polyglot-0.3.3.gem (100%)
Fetching: treetop-1.4.10.gem (100%)
Fetching: mail-2.3.0.gem (100%)
Fetching: actionmailer-3.1.3.gem (100%)
Fetching: thor-0.14.6.gem (100%)
Fetching: rack-ssl-1.3.2.gem (100%)
Fetching: json-1.6.4.gem (100%)
Building native extensions.  This could take a while...
Fetching: rdoc-3.12.gem (100%)
```

Depending on your version of ruby, you may need to install ruby rdoc/ri data:

```shell
<= 1.8.6 : unsupported
 = 1.8.7 : gem install rdoc-data; rdoc-data --install
 = 1.9.1 : gem install rdoc-data; rdoc-data --install
>= 1.9.2 : nothing to do! Yay!
Fetching: railties-3.1.3.gem (100%)        
Fetching: bundler-1.0.21.gem (100%)
Fetching: rails-3.1.3.gem (100%)
Successfully installed multi_json-1.0.4
Successfully installed activesupport-3.1.3
Successfully installed builder-3.0.0
Successfully installed i18n-0.6.0
Successfully installed activemodel-3.1.3
Successfully installed rack-1.3.6
Successfully installed rack-cache-1.1
Successfully installed rack-test-0.6.1
Successfully installed rack-mount-0.8.3
Successfully installed hike-1.2.1
Successfully installed tilt-1.3.3
Successfully installed sprockets-2.0.3
Successfully installed erubis-2.7.0
Successfully installed actionpack-3.1.3
Successfully installed arel-2.2.1
Successfully installed tzinfo-0.3.31
Successfully installed activerecord-3.1.3
Successfully installed activeresource-3.1.3
Successfully installed mime-types-1.17.2
Successfully installed polyglot-0.3.3
Successfully installed treetop-1.4.10
Successfully installed mail-2.3.0
Successfully installed actionmailer-3.1.3
Successfully installed thor-0.14.6
Successfully installed rack-ssl-1.3.2
Successfully installed json-1.6.4
Successfully installed rdoc-3.12
Successfully installed railties-3.1.3
Successfully installed bundler-1.0.21
Successfully installed rails-3.1.3
30 gems installed
Installing ri documentation for multi_json-1.0.4...
Installing ri documentation for activesupport-3.1.3...
Installing ri documentation for builder-3.0.0...
unable to convert "\xF1" from ASCII-8BIT to UTF-8 for README, skipping
unable to convert "\xF1" from ASCII-8BIT to UTF-8 for README.rdoc, skipping
Installing ri documentation for i18n-0.6.0...
Installing ri documentation for activemodel-3.1.3...
Installing ri documentation for rack-1.3.6...
Installing ri documentation for rack-cache-1.1...
Installing ri documentation for rack-test-0.6.1...
Installing ri documentation for rack-mount-0.8.3...
Installing ri documentation for hike-1.2.1...
Installing ri documentation for tilt-1.3.3...
Installing ri documentation for sprockets-2.0.3...
Installing ri documentation for erubis-2.7.0...
Installing ri documentation for actionpack-3.1.3...
Installing ri documentation for arel-2.2.1...
Installing ri documentation for tzinfo-0.3.31...
Installing ri documentation for activerecord-3.1.3...
Installing ri documentation for activeresource-3.1.3...
Installing ri documentation for mime-types-1.17.2...
Installing ri documentation for polyglot-0.3.3...
Installing ri documentation for treetop-1.4.10...
Installing ri documentation for mail-2.3.0...
Installing ri documentation for actionmailer-3.1.3...
Installing ri documentation for thor-0.14.6...
Installing ri documentation for rack-ssl-1.3.2...
Installing ri documentation for json-1.6.4...
Installing ri documentation for rdoc-3.12...
Installing ri documentation for railties-3.1.3...
Installing ri documentation for bundler-1.0.21...
Installing ri documentation for rails-3.1.3...
Installing RDoc documentation for multi_json-1.0.4...
Installing RDoc documentation for activesupport-3.1.3...
Installing RDoc documentation for builder-3.0.0...
unable to convert "\xF1" from ASCII-8BIT to UTF-8 for README, skipping
unable to convert "\xF1" from ASCII-8BIT to UTF-8 for README.rdoc, skipping
Installing RDoc documentation for i18n-0.6.0...
Installing RDoc documentation for activemodel-3.1.3...
Installing RDoc documentation for rack-1.3.6...
Installing RDoc documentation for rack-cache-1.1...
Installing RDoc documentation for rack-test-0.6.1...
Installing RDoc documentation for rack-mount-0.8.3...
Installing RDoc documentation for hike-1.2.1...
Installing RDoc documentation for tilt-1.3.3...
Installing RDoc documentation for sprockets-2.0.3...
Installing RDoc documentation for erubis-2.7.0...
Installing RDoc documentation for actionpack-3.1.3...
Installing RDoc documentation for arel-2.2.1...
Installing RDoc documentation for tzinfo-0.3.31...
Installing RDoc documentation for activerecord-3.1.3...
Installing RDoc documentation for activeresource-3.1.3...
Installing RDoc documentation for mime-types-1.17.2...
Installing RDoc documentation for polyglot-0.3.3...
Installing RDoc documentation for treetop-1.4.10...
Installing RDoc documentation for mail-2.3.0...
Installing RDoc documentation for actionmailer-3.1.3...
Installing RDoc documentation for thor-0.14.6...
Installing RDoc documentation for rack-ssl-1.3.2...
Installing RDoc documentation for json-1.6.4...
Installing RDoc documentation for rdoc-3.12...
Installing RDoc documentation for railties-3.1.3...
Installing RDoc documentation for bundler-1.0.21...
Installing RDoc documentation for rails-3.1.3...
```

Then we have to be sure that we are in the correct folder(webapp folder of the project) and run bundle install to install all needed gems

```shell
$ cd webapp/
$ bundle install
Fetching source index for https://rubygems.org/
Using rake (0.9.2.2) 
Using i18n (0.6.0) 
Using multi_json (1.0.4) 
Installing activesupport (3.2.0.rc2) 
Using builder (3.0.0) 
Installing activemodel (3.2.0.rc2) 
Using erubis (2.7.0) 
Installing journey (1.0.0) 
Installing rack (1.4.0) 
Using rack-cache (1.1) 
Using rack-test (0.6.1) 
Using hike (1.2.1) 
Using tilt (1.3.3) 
Installing sprockets (2.1.2) 
Installing actionpack (3.2.0.rc2) 
Using mime-types (1.17.2) 
Using polyglot (0.3.3) 
Using treetop (1.4.10) 
Using mail (2.3.0) 
Installing actionmailer (3.2.0.rc2) 
Installing arel (3.0.0) 
Using tzinfo (0.3.31) 
Installing activerecord (3.2.0.rc2) 
Installing activeresource (3.2.0.rc2) 
Installing bson (1.5.2) 
Installing bson_ext (1.5.2) with native extensions 
Using bundler (1.0.21) 
Installing coffee-script-source (1.2.0) 
Installing execjs (1.2.13) 
Installing coffee-script (2.2.0) 
Using rack-ssl (1.3.2) 
Using json (1.6.4) 
Using rdoc (3.12) 
Using thor (0.14.6) 
Installing railties (3.2.0.rc2) 
Installing coffee-rails (3.2.1) 
Installing jquery-rails (2.0.0) 
Installing kgio (2.7.2) with native extensions 
Installing mongo (1.5.2) 
Installing mongoid (2.4.0) 
Installing mysql2 (0.3.11) with native extensions 
Installing rails (3.2.0.rc2) 
Installing raindrops (0.8.0) with native extensions 
Installing sass (3.1.12) 
Installing sass-rails (3.2.3) 
Installing uglifier (1.2.2) 
Installing unicorn (4.1.1) with native extensions 
Your bundle is complete! Use `bundle show [gemname]` to see where a bundled gem is installed.
```

Once this finishes we can start our rails server, in my case i get an error due to mysql2 and I had to make a little change in my local configuration

```shell
$ rails server
/Users/erubion/.rvm/gems/ruby-1.9.2-p136/gems/mysql2-0.3.11/lib/mysql2.rb:9:in `require': dlopen(/Users/erubion/.rvm/gems/ruby-1.9.2-p136/gems/mysql2-0.3.11/lib/mysql2/mysql2.bundle, 9): Library not loaded: libmysqlclient.16.dylib (LoadError)
Referenced from: /Users/erubion/.rvm/gems/ruby-1.9.2-p136/gems/mysql2-0.3.11/lib/mysql2/mysql2.bundle
Reason: image not found - /Users/erubion/.rvm/gems/ruby-1.9.2-p136/gems/mysql2-0.3.11/lib/mysql2/mysql2.bundle
from /Users/erubion/.rvm/gems/ruby-1.9.2-p136/gems/mysql2-0.3.11/lib/mysql2.rb:9:in `<top (required)>'
from /Users/erubion/.rvm/gems/ruby-1.9.2-p136/gems/bundler-1.0.21/lib/bundler/runtime.rb:68:in `require'
from /Users/erubion/.rvm/gems/ruby-1.9.2-p136/gems/bundler-1.0.21/lib/bundler/runtime.rb:68:in `block (2 levels) in require'
from /Users/erubion/.rvm/gems/ruby-1.9.2-p136/gems/bundler-1.0.21/lib/bundler/runtime.rb:66:in `each'
from /Users/erubion/.rvm/gems/ruby-1.9.2-p136/gems/bundler-1.0.21/lib/bundler/runtime.rb:66:in `block in require'
from /Users/erubion/.rvm/gems/ruby-1.9.2-p136/gems/bundler-1.0.21/lib/bundler/runtime.rb:55:in `each'
from /Users/erubion/.rvm/gems/ruby-1.9.2-p136/gems/bundler-1.0.21/lib/bundler/runtime.rb:55:in `require'
from /Users/erubion/.rvm/gems/ruby-1.9.2-p136/gems/bundler-1.0.21/lib/bundler.rb:122:in `require'
from /Users/erubion/Documents/projects/15mcc/webapp/config/application.rb:13:in `<top (required)>'
from /Users/erubion/.rvm/gems/ruby-1.9.2-p136/gems/railties-3.2.0.rc2/lib/rails/commands.rb:53:in `require'
from /Users/erubion/.rvm/gems/ruby-1.9.2-p136/gems/railties-3.2.0.rc2/lib/rails/commands.rb:53:in `block in <top (required)>'
from /Users/erubion/.rvm/gems/ruby-1.9.2-p136/gems/railties-3.2.0.rc2/lib/rails/commands.rb:50:in `tap'
from /Users/erubion/.rvm/gems/ruby-1.9.2-p136/gems/railties-3.2.0.rc2/lib/rails/commands.rb:50:in `<top (required)>'
from script/rails:6:in `require'
from script/rails:6:in `<main>'
```

I fixed this problem running this.	
```shell
$ export DYLD_LIBRARY_PATH="/usr/local/mysql/lib:$DYLD_LIBRARY_PATH"
```

And finally we can start our server. 

```shell
$ rails server
=> Booting WEBrick
=> Rails 3.2.0.rc2 application starting in development on http://0.0.0.0:3000
=> Call with -d to detach
=> Ctrl-C to shutdown server

Mongoid config not found. Create a config file at: config/mongoid.yml
to generate one run: rails generate mongoid:config

[2012-01-14 20:06:09] INFO  WEBrick 1.3.1
[2012-01-14 20:06:09] INFO  ruby 1.9.2 (2010-12-25) [x86_64-darwin10.8.0]
[2012-01-14 20:06:09] INFO  WEBrick::HTTPServer#start: pid=26706 port=3000
```


And that's it.

PS: This wiki was based in the environment setup with OSX Snow Leopard.
