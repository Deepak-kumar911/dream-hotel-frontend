const initialState ={
    payload:"",
    login:false
}

const reducer = (state,action)=>{
  if(action.type==="login"){
    return state = {payload:action.payload,login:true}
  }else if(action.type==="logout"){
    return state = {payload:"",login:false}
  }
}


export {initialState,reducer}