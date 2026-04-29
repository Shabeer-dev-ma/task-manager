import 'dotenv/config'
import app from './src/app.js'

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
  console.log(`Health: http://localhost:${PORT}/api/health`)
  console.log(`Tasks:  http://localhost:${PORT}/api/tasks`)
})
