
import axios from 'axios';
import { useEffect, useState } from 'react';


function List({ data, setData }) {
  console.log(data);
  const remove = (id) => {

    axios.delete(`${process.env.REACT_APP_SERVER}/abc/${id}`)
      .then(res => {
        // 서버로부터 삭제된 데이터 목록을 받아옴
        const updatedData = res.data;

        // 업데이트된 데이터의 id 값 조정
        // 삭제된 id 이상의 id 값들을 -1씩 조정
        for (let i = 0; i < updatedData.length; i++) {
          if (updatedData[i].id >= id) {
            updatedData[i].id--;
          }
        }

        setData(updatedData);
      });
  }

  return(
    <>
      {
       data.map(obj=>(
        <li key={obj.id} className='listt'>
          <h2>{obj.title}</h2>
          <hr/>
          <p>{obj.msg}</p>
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
    let ani = e.target.ani.value;

    let msg = e.target.msg.value;
    let title = e.target.title.value;
    axios.post(`${process.env.REACT_APP_SERVER}/insert`,{
      msg,title,ani
    }).then(res=>{
      e.target.msg.value = '';
      e.target.title.value = '';
      setData(res.data)
    })
  }

  function popdown(){
    const pop = document.querySelector('.pop');
    const write_whole = document.querySelector('.whole');
    pop.classList.remove('active');
    write_whole.classList.remove('active');
  }

  return(
    <div>
      <div className='write_title'>글쓰기</div>
      <form onSubmit={insert}>
        <fieldset className='anisel'>
          <label>
            <input type='radio' name='ani' value='dog'/>강아지
          </label>
          <label>
            <input type='radio' name='ani' value='cat'/>고양이
          </label>
        </fieldset>
        <fieldset className='con'>
          <input type='text' name='title' />
          <input type='text' name='msg' />
          <input type='submit' value='게시글 올리기' onClick={popdown}/>
        </fieldset>
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
    const write_whole = document.querySelector('.whole');
    pop.classList.add('active');
    write_whole.classList.add('active');
  }

  function selsub(){
  }
  let click = document.querySelectorAll('.animal span');
  console.log(click.value);
  
  return (
    <article className='writepage'>
      <div className='writecon'>
          <h2>게시글({data.length})</h2>
          <div className='animal'>
              <span onClick={selsub}>전체</span>
              <span onClick={selsub} value='dog'>강아지</span>
              <span onClick={selsub} value='cat'>고양이</span>
          </div>
          <div className='whole'></div>
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