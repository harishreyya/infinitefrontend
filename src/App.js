import InfiniteScroll from 'react-infinite-scroll-component';
import './App.css';
import { useEffect, useState } from 'react';


function App() {
const db = "http://localhost:8000/contents"
const [items, setItems] = useState([])
const [hasMore, sethasMore] = useState(true);

const [page, setpage] = useState(2);
useEffect(()=>{
  const getContents = async ()=>{
   
    const res = await fetch(
      `${db}?page=1&limit=5`
    );
    const data = await res.json()
    
setItems(data)
  }
getContents()
},[])

const getContentsfetch = async ()=>{
   
  const res = await fetch(
    `${db}?page=${page}&limit=5`
  );
  const data = await res.json()
  
return data
}

// console.log(items)
const fetchData= async()=>{
const conentfromserver = await getContentsfetch()
setItems([...items,...conentfromserver])
if(conentfromserver.length===0 || conentfromserver.length < 5){
  sethasMore(false)
}
setpage(page+1)
}

  return (
    <div >
<div className='h2'><h2> <i>Class 4th Maths & Science Topics and Videos</i></h2>

</div>
<br/>
<br/>
<br/>

<div className='fixed-message'>Infinite <br/> scrolling <br/> &#128073;</div>

     <InfiniteScroll
  dataLength={items.length} 
  next={fetchData}
  hasMore={hasMore}
  loader={<h4>Loading...</h4>}
  endMessage={
    <p style={{ textAlign: 'center' }}>
      <b>Yay! You have seen it all</b>
    </p>
  }
 
 >
  {items.map((item)=>{
         return <>
         <div className='flex' key={item.id}>
          
          <div className='display-card' >
              
              <h3>{item.title}</h3>
              <p><i>{item.desc}</i></p>
              <div className='flex' >
                <a target="_blank" rel="noopener noreferrer" href={item.video}>
              <iframe width="250" height="210" src={item.video} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
              </a>
              </div>
              </div>
              
          
         </div>
         <br/>
         </>
  })}
</InfiniteScroll>
    </div>
  );
}

export default App;
