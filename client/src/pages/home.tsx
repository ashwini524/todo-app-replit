import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { type Task } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Plus, CheckCircle2, Circle, Trash2, ClipboardList } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const [newTaskText, setNewTaskText] = useState("");
  const { toast } = useToast();

  const { data: tasks = [], isLoading } = useQuery<Task[]>({
    queryKey: ['/api/tasks'],
  });

  const addTaskMutation = useMutation({
    mutationFn: async (text: string) => {
      return apiRequest("POST", "/api/tasks", { text, completed: false });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/tasks'] });
      setNewTaskText("");
      toast({
        title: "Task added",
        description: "Your task has been added successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to add task. Please try again.",
        variant: "destructive",
      });
    },
  });

  const toggleTaskMutation = useMutation({
    mutationFn: async (task: Task) => {
      return apiRequest("PUT", `/api/tasks/${task.id}`, { completed: !task.completed });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/tasks'] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update task. Please try again.",
        variant: "destructive",
      });
    },
  });

  const deleteTaskMutation = useMutation({
    mutationFn: async (taskId: string) => {
      return apiRequest("DELETE", `/api/tasks/${taskId}`, undefined);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/tasks'] });
      toast({
        title: "Task deleted",
        description: "Your task has been removed.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete task. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTaskText.trim()) {
      addTaskMutation.mutate(newTaskText.trim());
    }
  };

  const activeTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-semibold text-foreground mb-2">
            My Tasks
          </h1>
          <p className="text-muted-foreground">
            Stay organized and get things done
          </p>
        </div>

        {/* Add Task Form */}
        <form onSubmit={handleAddTask} className="mb-6">
          <Card className="p-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <Input
                type="text"
                placeholder="Add a new task..."
                value={newTaskText}
                onChange={(e) => setNewTaskText(e.target.value)}
                className="flex-1 h-12"
                disabled={addTaskMutation.isPending}
                data-testid="input-new-task"
              />
              <Button
                type="submit"
                disabled={!newTaskText.trim() || addTaskMutation.isPending}
                className="h-12 px-6 gap-2"
                data-testid="button-add-task"
              >
                <Plus className="w-5 h-5" />
                <span className="hidden sm:inline">Add Task</span>
                <span className="sm:hidden">Add</span>
              </Button>
            </div>
          </Card>
        </form>

        {/* Task List */}
        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="p-4 animate-pulse">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-muted rounded-full"></div>
                  <div className="flex-1 h-4 bg-muted rounded"></div>
                  <div className="w-8 h-8 bg-muted rounded"></div>
                </div>
              </Card>
            ))}
          </div>
        ) : tasks.length === 0 ? (
          <Card className="p-12">
            <div className="flex flex-col items-center justify-center text-center min-h-[300px]">
              <ClipboardList className="w-16 h-16 text-muted-foreground mb-4" />
              <h2 className="text-xl font-medium text-foreground mb-2">
                No tasks yet
              </h2>
              <p className="text-muted-foreground">
                Add your first task above to get started
              </p>
            </div>
          </Card>
        ) : (
          <div className="space-y-6">
            {/* Active Tasks */}
            {activeTasks.length > 0 && (
              <div>
                <h2 className="text-sm font-medium text-muted-foreground mb-3 px-1">
                  Active ({activeTasks.length})
                </h2>
                <div className="space-y-3">
                  {activeTasks.map((task) => (
                    <Card
                      key={task.id}
                      className="p-4 hover-elevate transition-all duration-200"
                      data-testid={`card-task-${task.id}`}
                    >
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => toggleTaskMutation.mutate(task)}
                          disabled={toggleTaskMutation.isPending}
                          className="flex-shrink-0 text-muted-foreground hover:text-primary transition-colors"
                          data-testid={`button-toggle-${task.id}`}
                        >
                          <Circle className="w-5 h-5" />
                        </button>
                        <span
                          className="flex-1 text-foreground font-normal break-words"
                          data-testid={`text-task-${task.id}`}
                        >
                          {task.text}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => deleteTaskMutation.mutate(task.id)}
                          disabled={deleteTaskMutation.isPending}
                          className="flex-shrink-0 text-muted-foreground hover:text-destructive"
                          data-testid={`button-delete-${task.id}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Completed Tasks */}
            {completedTasks.length > 0 && (
              <div>
                <h2 className="text-sm font-medium text-muted-foreground mb-3 px-1">
                  Completed ({completedTasks.length})
                </h2>
                <div className="space-y-3">
                  {completedTasks.map((task) => (
                    <Card
                      key={task.id}
                      className="p-4 hover-elevate transition-all duration-200 opacity-75"
                      data-testid={`card-task-${task.id}`}
                    >
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => toggleTaskMutation.mutate(task)}
                          disabled={toggleTaskMutation.isPending}
                          className="flex-shrink-0 text-primary transition-colors"
                          data-testid={`button-toggle-${task.id}`}
                        >
                          <CheckCircle2 className="w-5 h-5" />
                        </button>
                        <span
                          className="flex-1 text-muted-foreground font-normal line-through break-words"
                          data-testid={`text-task-${task.id}`}
                        >
                          {task.text}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => deleteTaskMutation.mutate(task.id)}
                          disabled={deleteTaskMutation.isPending}
                          className="flex-shrink-0 text-muted-foreground hover:text-destructive"
                          data-testid={`button-delete-${task.id}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Task Summary */}
        {tasks.length > 0 && (
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              {activeTasks.length === 0
                ? "All tasks completed! 🎉"
                : `${activeTasks.length} ${activeTasks.length === 1 ? 'task' : 'tasks'} remaining`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
