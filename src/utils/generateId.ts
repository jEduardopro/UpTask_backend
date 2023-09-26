export default function generateID() {
	const random = Math.random().toString(30).substring(2)
	const date = Date.now().toString(33)
	return random + date
}