json.extract! board, :id, :user, :title, :sections, :created_at, :updated_at
json.url board_url(board, format: :json)
