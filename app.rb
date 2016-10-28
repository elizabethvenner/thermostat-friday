require 'sinatra/base'
require 'json'

class Thermostat < Sinatra::Base

    enable :sessions

post '/' do
  session[:city] = params[:city]
  session[:temperature] = params[:temperature]
end

  get '/' do
    headers "Access-Control-Allow-Origin": "*"
    { temperature: params[:temperature],  city: params:[city]}.to_json
  end

  # start the server if ruby file executed directly
  run! if app_file == $0
end
