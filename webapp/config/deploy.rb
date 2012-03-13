# RVM bootstrap
# $:.unshift(File.expand_path("/home/tim/.rvm/lib"))
$:.unshift(File.expand_path('./lib', ENV['rvm_path']))
require 'rvm/capistrano'
set :rvm_ruby_string, '1.9.2'
set :rvm_type, :user

# bundler bootstrap
require 'bundler/capistrano'

# main details
set :application, "15mcc"
role :web, "15mcc.alabs.es"
role :app, "15mcc.alabs.es"
set :rails_env, "production"

default_run_options[:pty] = true
ssh_options[:forward_agent] = true
set :deploy_to, "/var/www/15mcc.alabs.es"
set :deploy_via, :remote_cache
set :user, "ruby-data"
set :use_sudo, false

# repo details
set :scm, :git
set :repository, "git://github.com/alabs/15mcc.git"
set :branch, "master"
#set :deploy_subdir, "15mcc/webapp"
set :deploy_subdir, "webapp"
set :git_enable_submodules, 1
set :keep_releases, 5

# # server details
set :unicorn_pid, "/tmp/unicorn.15mcc.pid"

after "deploy", "deploy:cleanup"

namespace :unicorn do
  desc "start unicorn"
  task :start, :roles => :app, :except => {:no_release => true} do
    run "cd #{current_path} && bundle exec unicorn_rails -c config/unicorn.rb -D"
  end
  desc "stop unicorn"
  task :stop, :roles => :app, :except => {:no_release => true} do
    run "kill -s QUIT `cat /tmp/unicorn.15mcc.pid`"
  end
  desc "restart unicorn"
  task :restart, :roles => :app, :except => {:no_release => true} do
    run "kill -s USR2 `cat /tmp/unicorn.15mcc.pid`"
  end

  after "deploy:restart", "unicorn:restart"
end

after "deploy:update_code", "deploy:config_symlink"

namespace :deploy do

  task :config_symlink do
    #run "ln -s #{shared_path}/mongoid.yml #{release_path}/config/mongoid.yml"
    run "ln -s #{shared_path}/recaptcha.rb #{release_path}/config/initializers/recaptcha.rb"
    run "ln -s #{shared_path}/app_config.yml #{release_path}/config/app_config.yml"
  end
end

namespace :deploy do
  task :restart do
  end
end

desc "remotely console"
task :console, :roles => :app do
  input = ''
  run "cd #{current_path} && bundle exec rails console #{ENV['RAILS_ENV']}" do |channel, stream, data|
    next if data.chomp == input.chomp || data.chomp == ''
    print data
    channel.send_data(input = $stdin.gets) if data =~ /:\d{3}:\d+(\*|>)/
  end
end
