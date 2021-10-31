import { useState } from "react";
import axios from "axios";
import { API_URL } from "./config/config";

const Login = () => {
  const [member, setMember] = useState({
    email: "ian@fake.com",
    password: "00000000",
  });

  // input 即時更動
  const handleChange = (e) => {
    // let newMember = { ...member };
    // newMember[e.target.name] = e.target.value;
    setMember({ ...member, [e.target.name]: e.target.value });
  };

  // 送出表單
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await axios.post(`${API_URL}/auth/login`, member);
      console.log(res);
    } catch (err) {
      console.log(err.response);
    }
  };

  return (
    <div className="column is-three-fifths">
      <form className="box" onSubmit={handleSubmit}>
        <div className="field">
          <label className="label">帳號</label>
          <div className="control">
            <input
              name="email"
              className="input"
              type="email"
              onChange={handleChange}
              value={member.email}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">密碼</label>
          <div className="control">
            <input
              name="password"
              className="input"
              type="password"
              onChange={handleChange}
              value={member.password}
            />
          </div>
        </div>
        <div className="field is-grouped">
          <div className="control">
            <button className="button is-link">登入</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
