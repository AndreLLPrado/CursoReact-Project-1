import './App.css';
import { Component } from 'react';

class App extends Component{
  state = {
    counter: 0,
    posts:[
      {
        id: 1,
        title: 'O titulo 1',
        body: 'O Corpo 1'
      },
      {
        id: 2,
        title: 'O titulo 2',
        body: 'O Corpo 2'
      },
      {
        id: 3,
        title: 'O titulo 3',
        body: 'O Corpo 3'
      }
    ]
  }

  timeoutUpdate = null

  componentDidMount(){
    this.loadPosts()
  }

  componentDidUpdate(){
  }

  componentWillUnmount(){
  }

  loadPosts = async () => {
    const postsResponse = fetch('https://jsonplaceholder.typicode.com/posts')
    const photosResponse = fetch('https://jsonplaceholder.typicode.com/photos')

    const [posts,photos] = await Promise.all([postsResponse,photosResponse])

    const postsJson = await posts.json()
    const photosJson = await photos.json()

    const postsAndPhotos = postsJson.map((post,index) => {
      return{
        ...post,
        cover: photosJson[index].url
      }
    })

    this.setState({posts: postsAndPhotos})
  }  

  render(){
    const {posts} = this.state

    return(
      <section className="container">
        <div className="posts">
            {posts.map(post => (
              <div className="post">
                <img src={post.cover} alt={post.title} />
                <div key={post.id} className="post-content">
                  <h1>{post.title}</h1>
                  <p>{post.body}</p>
                </div>
              </div>
              ))}
        </div>
      </section>
    )
  }
}
// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
//}

export default App;
