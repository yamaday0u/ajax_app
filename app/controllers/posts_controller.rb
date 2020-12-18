class PostsController < ApplicationController

  def index
    @posts = Post.all.order(id: "DESC")
  end

  #メモ投稿機能
  def create
    post = Post.create(content: params[:content], checked: false)
    render json:{ post: post }#memo.jsにJSONデータを返却（レスポンス）
  end

  #既読機能
  def checked
    post = Post.find(params[:id])
    if post.checked
      post.update(checked: false)
    else
      post.update(checked: true)
    end

    item = Post.find(params[:id])
    render json: { post: item }#checked.jsにJSONデータを返却（レスポンス）
  end
end
