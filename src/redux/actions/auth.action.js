import axios from "axios";

export const login = (e,credentials,history) => {
    return (dispatch)=>{
        e.preventDefault();
        const err = {};
        for (let key in credentials) {
          if (!credentials[key]) {
            err[key] = `${key} is empty`;
          }
        }
    
        if (Object.keys(err).length < 1) {
          fetch("http://localhost:8001/auth")
            .then((r) => r.json())
            .then((data) => {
              if (
                data.login !== credentials.login ||
                data.password !== credentials.password
              ) {
                return (err["server_message"] = "Login or password are wrong");
              } else {
                let token = "";
                let characters =
                  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
                let charactersLength = characters.length;
                for (let i = 0; i < 20; i++) {
                  token += characters.charAt(
                    Math.floor(Math.random() * charactersLength)
                  );
                }
                fetch("http://localhost:8001/auth", {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    login: credentials.login,
                    password: credentials.password,
                    token: token,
                  }),
                })
                  .then((r) => r.json())
                  .then((result) => {
                    localStorage.token = result.token;
                    dispatch(setUser(result))
                    history.push("/profile");
                  });
              }
            });
        }
    }
};

export const setUser = (data) =>{
    return { type:'setUser', data }
}

export const checkCred = (cred) =>{
  return (dispatch)=>{
    dispatch(setLoad())
    fetch("http://localhost:8001/auth")
      .then((r) => r.json())
      .then(r=>{
        if(cred.login === r.login && cred.password === r.password){
          dispatch(setDisabled(false))
        }else{
          dispatch(setDisabled(true))
        }
        dispatch(setLoad())
      })
  }
}

const setLoad = () =>{
  return {type:'setLoad'}
}

const setDisabled = (state) =>{
  return {type:'setDisabled',state}
}

export const getAuth = (token, history) =>{
  return (dispatch)=>{
    axios.get("http://localhost:8001/auth").then(r=>{
      if(token!==r.data.token){
        localStorage.removeItem('token')
        history.push('/')
      }else{
        dispatch(setUser(r.data))
      }
    })
  }
}