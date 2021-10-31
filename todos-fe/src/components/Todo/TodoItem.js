import React, { useState, useEffect } from "react";
import { withRouter, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPen, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import EditBtn from "./buttons/EditBtn";
import DeleteBtn from "./buttons/DeleteBtn";
import axios from "axios";
import { STATUS_WORD, STATUS_COLOR } from "../config/status";
import { API_URL } from "../config/config";

const TodoList = (props) => {
  const [initRender, setInitRender] = useState(true);
  const [item, setItem] = useState([{}]);
  const [updator, setUpdator] = useState([{}]);

  // 以下兩種方法都可以拿到網址列後方 /:todoId 的值
  // let { todoId } = props.match.params;
  let { todoId } = useParams();

  // 拿到初始資料
  useEffect(async () => {
    // 拿到 todo detail 資料
    let res = await axios.get(`${API_URL}/todos/${todoId}`);
    setItem(res.data);
    console.log(res.data);

    // 拿到 updator 資料
    let updatorId = res.data.updator_id;
    let updator = await axios.get(
      `http://localhost:3502/api/member/${updatorId}`
    );
    setUpdator(updator.data);
  }, []);

  return (
    <>
      <div className="column is-three-fifths">
        {item && (
          <article className="panel">
            <p className="panel-heading">TODO: {item.title}</p>
            <div className="card-image">
              <figure className="image is-4by3">
                <img src="#" alt="Placeholder image" />
              </figure>
            </div>
            <div className="panel-block">TODO: {item.content}</div>
            <ul>
              <li className="panel-block">到期日: {item.deadline}</li>
              <li className="panel-block">
                {item.name} 於： {item.created_at} 建立
              </li>
              <li className="panel-block">
                {updator.name} 於 {item.updated_at} 更新
              </li>
            </ul>
            <footer className="card-footer">
              <a href="#" className="card-footer-item">
                <FontAwesomeIcon icon={faCheck} className="mr-2" />
                Done
              </a>
              <EditBtn />
              <DeleteBtn />
            </footer>
          </article>
        )}
      </div>
      <div className="column is-two-fifths">
        <article className="panel is-link">
          <p className="panel-heading">共享</p>
          <div className="field has-addons">
            <div className="control is-expanded">
              <input className="input" type="email" placeholder="輸入帳號" />
            </div>
            <div className="control">
              <a className="button is-info">新增</a>
            </div>
          </div>
        </article>
      </div>
    </>
  );
};

export default withRouter(TodoList);
