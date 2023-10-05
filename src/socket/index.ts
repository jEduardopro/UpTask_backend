import { Socket } from "socket.io";

const sockets = (socket: Socket) => {

	socket.on('open project', (id) => {
		socket.join(id)
	})

	socket.on('new task', (task) => {
		socket.to(task.project).emit('task created', task)
	})

	socket.on('update task', (task) => {		
		socket.to(task.project).emit('task updated', task)
	})

	socket.on('delete task', (task) => {
		socket.to(task.project).emit('task deleted', task)
	})

	socket.on('change status task', (task) => {
		socket.to(task.project._id).emit('task status changed', task)
	})
	
}

export default sockets