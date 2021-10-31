import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import EditBtn from "./buttons/EditBtn";
import ShowBtn from "./buttons/ShowBtn";
import DeleteBtn from "./buttons/DeleteBtn";
import axios from "axios";
import { STATUS_WORD, STATUS_COLOR } from "../config/status";
import { API_URL } from "../config/config";

const TodoList = () => {
  const [todos, setTodos] = useState([{}, {}, {}]);

  // 當需要用到一堆ifElse時，可以用查表法
  // const STATUS_WORD = {
  //   A: "進行中",
  //   B: "已完成",
  //   C: "已暫停",
  // };

  // const STATUS_COLOR = {
  //   A: "is-info",
  //   B: "is-success",
  //   C: "is-danger",
  // };

  // 拿到初始資料
  useEffect(async () => {
    let res = await axios.get(`${API_URL}/todos`);
    setTodos(res.data);
  }, []);

  return (
    <div className="column is-three-fifths">
      <nav
        className="pagination is-success"
        role="navigation"
        aria-label="pagination"
      >
        <ul className="pagination-list"></ul>
      </nav>
      <div className="level">
        <div className="level-item">
          <div className="buttons">
            <button className="button is-info">進行中</button>
            <button className="button is-success">已完成</button>
            <button className="button is-danger">已暫停</button>
          </div>
        </div>
      </div>
      TODO: 列表
      {todos &&
        todos.map((item) => {
          return (
            <section className={"message " + STATUS_COLOR[item.status]}>
              <header className="message-header">
                <p>
                  TODO: {STATUS_WORD[item.status]} {item.title}
                </p>
              </header>
              <div className="message-body">{item.content}</div>
              <footer className="card-footer">
                <ShowBtn todoId={item.id} />
                <a href="#" className="card-footer-item">
                  <FontAwesomeIcon icon={faCheck} className="mr-2" />
                  Done
                </a>
                <EditBtn todoId={item.id} />
                <DeleteBtn todoId={item.id} />
              </footer>
            </section>
          );
        })}
    </div>
  );
};

export default TodoList;
