module Api
  class TasksController < ApplicationController
    before_action :set_task, only: [:show, :update, :destroy]

    def index
      tasks = Task.order(created_at: :desc)
      render json: { status: 'SUCCESS', message: 'Loaded tasks', data: tasks }
    end

    def show
      render json: { status: 'SUCCESS', message: 'Loaded the task', data: @task}
    end

    def create
      task = Task.new(task_params)
      if task.save
        render json: { status: 'SUCCESS', data: task }
      else
        render json: { status: 'ERROR', data: task.errors }
      end
    end

    def destroy
      @task.destroy
      render json: { status: 'SUCCESS', message: 'Deleted the task', data: @task }
    end

    def update
      if @task.update(task_params)
        render json: { status: 'SUCCESS', message: 'Updated the task', data: @task }
      else
        render json: { status: 'ERROR', message: 'Not updated', data: @task.errors }
      end
    end

    private

      def set_task
        @task = Task.find(params[:id])
      end

      def task_params
        params.require(:task).permit(:title, :description, :width, :height, :x, :y, :deadline, :category )
      end
  end
end
