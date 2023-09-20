
import axios from 'axios';
import { useEffect, useState } from 'react';


function List({data,setData}){
  const remove =(id)=>{

    axios.delete(`${process.env.REACT_APP_SERVER}/abc/${id}`)
    .then(res=>{

      // 서버로부터 삭제된 데이터 목록을 받아옴
      const updatedData = res.data;

      // 업데이트된 데이터의 id 값 조정
      // 삭제된 id 이상의 id 값들을 -1씩 조정
      for (let i = 0; i < updatedData.length; i++) {
        if (updatedData[i].id >= id) {
          updatedData[i].id--;
        }
      }
      
      setData(res.data)
    });
  }
  return(
    <>
      {
       data.map(obj=>(
        <li key={obj.id}>
          {obj.msg}
          <button onClick={()=>{remove(obj.id)}}>삭제</button>
        </li>
       )) 
      }
    </>
  );
}

function Write({setData}){

  const insert = (e) =>{
    e.preventDefault();
    let msg = e.target.msg.value;
    axios.post(`${process.env.REACT_APP_SERVER}/insert`,{
      msg
    }).then(res=>{
      e.target.msg.value = '';
      setData(res.data)
    })
  }

  function popdown(){
    const pop = document.querySelector('.pop');
    pop.classList.remove('active');
  }

  return(
    <div>
      <form onSubmit={insert}>
        <input type='text' name='msg'/>
        <input type='submit' value='저장' onClick={popdown}/>
      </form>
    </div>
  );
}

function Chat() {
  const [data,setData] = useState([]);

  const getData =()=>{
    axios.get(`${process.env.REACT_APP_SERVER}/abc?id=100`)
    .then(res=>{
      setData(res.data);
    });
  }

  useEffect(()=>{
    getData();
  },[])

  // axios.post('http://localhost:3030/insert',{id:1000,name:'신규데이터'})
  // .then(res=>{
  //   console.log(res);
  // })

  function popup(){
    const pop = document.querySelector('.pop');
    pop.classList.add('active');
  }
  
  return (
    <article className='writepage'>
        <div className='con'>
            <h2>게시글({data.length})</h2>
            <div className='ani'>
                <span>고양이</span>
                <span>강아지</span>
            </div>
            <div className='writepop' onClick={popup}>
                글쓰기버튼
            </div>
            <ul>
                <List data={data} setData={setData}/>
            </ul>
        </div>
        <div className='pop'>
            <Write setData={setData}/>
        </div>
    </article>

  );
}

export default Chat;
