Rails.application.routes.draw do
  namespace 'api' do
    resources :tasks
  end
end

# == Route Map
#
#                    Prefix Verb   URI Pattern                                                                              Controller#Action
#                 api_tasks GET    /api/tasks(.:format)                                                                     api/tasks#index
#                           POST   /api/tasks(.:format)                                                                     api/tasks#create
#                  api_task GET    /api/tasks/:id(.:format)                                                                 api/tasks#show
#                           PATCH  /api/tasks/:id(.:format)                                                                 api/tasks#update
#                           PUT    /api/tasks/:id(.:format)                                                                 api/tasks#update
#                           DELETE /api/tasks/:id(.:format)                                                                 api/tasks#destroy
#        rails_service_blob GET    /rails/active_storage/blobs/:signed_id/*filename(.:format)                               active_storage/blobs#show
# rails_blob_representation GET    /rails/active_storage/representations/:signed_blob_id/:variation_key/*filename(.:format) active_storage/representations#show
#        rails_disk_service GET    /rails/active_storage/disk/:encoded_key/*filename(.:format)                              active_storage/disk#show
# update_rails_disk_service PUT    /rails/active_storage/disk/:encoded_token(.:format)                                      active_storage/disk#update
#      rails_direct_uploads POST   /rails/active_storage/direct_uploads(.:format)                                           active_storage/direct_uploads#create
