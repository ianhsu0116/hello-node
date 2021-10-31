import { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { API_URL } from "./config/config";
const Register = () => {
  const [member, setMenber] = useState({
    email: "ian@fake.com",
    password: "00000000",
    confirmPassword: "00000000",
    name: "ian",
    photo: null,
  });

  // input 即時更動
  const handleChange = (e) => {
    // let newMember = { ...member };
    // newMember[e.target.name] = e.target.value;
    setMenber({ ...member, [e.target.name]: e.target.value });
  };

  // photo 即時更新
  const handleFileChange = (e) => {
    console.log("還沒做ㄎㄎ");
  };

  // 送出表單
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await axios.post(`${API_URL}/auth/register`, member);
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
              value={member.email}
              onChange={handleChange}
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
              value={member.password}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">確認密碼</label>
          <div className="control">
            <input
              name="confirmPassword"
              className="input"
              type="password"
              value={member.confirmPassword}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">暱稱</label>
          <div className="control">
            <input
              name="name"
              className="input"
              type="text"
              value={member.name}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="file is-primary is-boxed has-name mb-3">
          <label className="file-label">
            <input
              name="photo"
              className="file-input"
              type="file"
              onChange={handleFileChange}
            />
            <span className="file-cta">
              <FontAwesomeIcon icon={faUpload} />
              <span className="file-label">選擇檔案</span>
            </span>
            <span className="file-name">TODO: 檔名</span>
          </label>
          <figure className="image is-128x128 ml-5">
            <img src="#" />
          </figure>
        </div>
        <div className="field is-grouped">
          <div className="control">
            <button className="button is-link">註冊</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
