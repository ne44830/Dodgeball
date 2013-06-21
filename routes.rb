require 'sinatra'

get '/newgame' do
  @action = '/dodge'

  erb :playerform
end

get '/dodge' do


  erb :game
end


