require "sinatra"
require "sinatra/json"
require "sinatra/reloader"
require "mongo"

set :bind, "0.0.0.0"
set :port, 18650
set :root, File.dirname(__FILE__)
set :public_folder, Proc.new { File.join(root, "static") }

client = Mongo::Client.new(["localhost:27017"],user: "admin",password: "123456")

db = client.use("community")

topics = db[:topics]
replys = db[:replys]
users = db[:users]

get "/api/topics" do
  result = topics.aggregate([
    {
      "$project": {
        "_id": {
          "$toString": "$_id",
        },
        "title": "$title",
        "author": "$author",
        "avatar": "$avatar",
        "time": "$time",
      },
    },
    {
      "$lookup": {
        "from": "replys",
        "localField": "_id",
        "foreignField": "topicId",
        "as": "replys",
      },
    },
    {
      "$addFields": {
        "numOfreplys": {
          "$size": "$replys",
        },
      },
    },
    {
      "$project": {
        "id": "$_id",
        "title": "$title",
        "author": "$author",
        "avatar": "$avatar",
        "time": "$time",
        "numOfreplys": "$numOfreplys",
      },
    },
    {
      "$sort": {
        "time": -1,
      },
    },
  ])
  json result.to_a
end

get "/api/topic/:id" do
  # params.to_json
  id = params["id"]
  # results = topics.find({_id:BSON::ObjectId(id)}).first
  result = topics.aggregate([
    {
      "$project": {
        "_id": {
          "$toString": "$_id",
        },
        "title": "$title",
        "author": "$author",
        "avatar": "$avatar",
        "time": "$time",
      },
    },
    {
      "$match": {
        "_id": id,
      },
    },
    {
      "$lookup": {
        "from": "replys",
        "localField": "_id",
        "foreignField": "topicId",
        "as": "replys",
      },
    },
  ]).first
  json result
end

get "/api/user/random" do
  result = users.aggregate([
    {
      "$sample": {
        "size": 1,
      },
    },
  ]).first
  json result
end

post "/api/topic" do
  data = JSON.parse(request.body.read.to_s)
  author = data["author"]
  avatar = data["avatar"]
  title = data["title"]
  text = data["text"]
  time = Time.now.to_i
  topics.insert_one({
    "title": title,
    "text": text,
    "time": time,
    "author": author,
    "avatar": avatar,
  })
  json true
end

post "/api/reply" do
  data = JSON.parse(request.body.read.to_s)
  author = data["author"]
  avatar = data["avatar"]
  text = data["text"]
  topicId = data["topicId"]
  time = Time.now.to_i
  replys.insert_one({
    "text": text,
    "topicId": topicId,
    "time": time,
    "author": author,
    "avatar": avatar,
  })
  json true
end
