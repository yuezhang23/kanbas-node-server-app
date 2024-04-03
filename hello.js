export default function Hello(app1) {
    app1.get('/hello', (req, res) => {
      res.send('Life is good!')
    })
    // send back HTML
    // req is a big object
    app1.get('/', (req, res) => {
      res.send('<h1>Welcome to Full Stack Development!<h1>')
    })
  }
  